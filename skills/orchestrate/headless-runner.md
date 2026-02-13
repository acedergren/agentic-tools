# Headless Runner Protocol

Reference documentation for the `claude -p` headless execution mode used by `/orchestrate --headless`.

## Overview

Headless mode spawns independent `claude -p` processes instead of in-session agents. Each process receives a self-contained prompt with all context pre-loaded, executes autonomously, and exits. The orchestrator monitors processes via PID polling and verifies results via git history and quality gates.

This eliminates the O(n^2) inter-agent communication overhead (SendMessage, TaskUpdate, idle detection) by replacing it with O(n) prompt injection.

## claude -p Command Reference

### Flags Used

```bash
claude -p \
  --model {sonnet|haiku|opus} \         # Model selection from agent-roles.md
  --system-prompt "$(cat template.md)" \ # Role-specific system prompt
  --allowedTools "Bash Edit Write Read Glob Grep" \  # Restricted tool set
  --dangerously-skip-permissions \       # Required for non-interactive execution
  --max-budget-usd {budget} \           # Per-task budget cap
  --output-format json \                # Structured output for parsing
  --no-session-persistence \            # Don't save session to disk
  "{task prompt}"                       # The full task description
```

### Flag Purposes

| Flag                             | Purpose                                                 |
| -------------------------------- | ------------------------------------------------------- |
| `--model`                        | Match the role's model from agent-roles.md              |
| `--system-prompt`                | Inject role-specific knowledge (Fastify patterns, etc.) |
| `--allowedTools`                 | Restrict to safe tools (no TeamCreate/SendMessage/Task) |
| `--dangerously-skip-permissions` | Non-interactive — no permission prompts                 |
| `--max-budget-usd`               | Hard budget cap prevents runaway spending               |
| `--output-format json`           | Parseable output for verification                       |
| `--no-session-persistence`       | Clean process — no session files left behind            |

## Output JSON Format

When `--output-format json` is used, the output is a JSON object:

```json
{
	"type": "result",
	"subtype": "success",
	"is_error": false,
	"duration_ms": 45200,
	"duration_api_ms": 38100,
	"num_turns": 12,
	"result": "Implemented rate limiter plugin with Oracle-backed storage...",
	"session_id": "abc-123",
	"total_cost_usd": 0.42,
	"usage": {
		"input_tokens": 85000,
		"output_tokens": 12000,
		"cache_creation_tokens": 0,
		"cache_read_tokens": 45000
	}
}
```

### Key Fields for Verification

| Field            | Use                                                       |
| ---------------- | --------------------------------------------------------- |
| `is_error`       | `true` if the process errored out                         |
| `result`         | Text summary of what the agent did                        |
| `total_cost_usd` | Actual spend — track against budget                       |
| `duration_ms`    | Wall-clock time — compare against timeout                 |
| `num_turns`      | Number of agentic turns — high count may indicate looping |

### Error and Exhaustion Output

**Important**: Budget exhaustion sets `is_error: false` with an error subtype. Do NOT rely solely on `is_error` — always check `subtype` too.

Budget exceeded (note `is_error: false`):

```json
{
	"type": "result",
	"subtype": "error_max_budget_usd",
	"is_error": false,
	"result": "",
	"total_cost_usd": 0.21
}
```

Actual errors (`is_error: true`):

```json
{
	"type": "result",
	"subtype": "error_max_turns",
	"is_error": true,
	"result": "Hit max turns limit...",
	"total_cost_usd": 2.1
}
```

Error subtypes: `error_max_turns`, `error_tool`, `error_max_budget_usd`

Detection logic:

```
if subtype starts with "error_":
  task failed (regardless of is_error value)
if subtype == "success":
  task completed normally
```

### Output Formats

- **`--output-format json`**: Single JSON object after process exits. Simpler to parse, preferred for headless mode.
- **`--output-format stream-json`**: NDJSON (one JSON per line) streamed during execution. Includes system messages, hook outputs, tool calls, and a final `type: "result"` line. Use with `--verbose` for real-time agent activity.

## Session Directory Structure

```
/tmp/orchestrate/{session-id}/
├── git.lock                    # flock target for atomic git operations
├── task-{id}.prompt            # Generated prompt (for debugging/retry)
├── task-{id}.json              # Output JSON from claude -p
├── task-{id}.pid               # PID of running process
├── task-{id}.start             # ISO timestamp of process start
├── task-{id}.status            # pending | running | completed | failed | timed_out
└── session.log                 # Aggregated orchestrator log
```

## Concurrency Model

### Semaphore-Based Slot Management

The orchestrator maintains N slots (from `--max-agents`). Each slot can run one `claude -p` process.

```
Slot allocation:
1. Count running PIDs (status = running)
2. If running < max_agents:
   a. Pick next unblocked task from wave
   b. Generate prompt from template + task context
   c. Spawn process, record PID
   d. Mark slot occupied
3. If running >= max_agents:
   a. Wait for any PID to exit (poll every 10s)
   b. Process completed task (verify, mark done)
   c. Reclaim slot
```

### File Overlap Prevention

Before spawning concurrent tasks, check for file overlap:

```
For tasks T1 and T2 in the same wave:
  If T1.files ∩ T2.files ≠ ∅:
    Serialize T1 and T2 (T2 waits for T1)
```

This prevents merge conflicts from parallel edits to the same file.

## Git Safety

### flock-Based Locking

All agent system prompts include instructions to use flock for git operations:

```bash
flock /tmp/orchestrate/{session-id}/git.lock \
  bash -c 'git add {files} && git commit -m "{message}"'
```

This prevents concurrent git index corruption when multiple agents commit simultaneously.

### Post-Hoc Scope Verification

After each task completes, the orchestrator verifies the commit only touches allowed files:

```bash
CHANGED=$(git diff --name-only HEAD~1)
ALLOWED="{task.files}"
# If CHANGED contains files not in ALLOWED → scope violation
```

## Timeout Policy

Default timeout: `2 × estimated_duration` from task metadata.

With `--timeout-multiplier N`: `N × estimated_duration`.

```
Timeout actions:
1. Send SIGTERM to PID
2. Wait 10s for graceful exit
3. Send SIGKILL if still running
4. Mark task as timed_out
5. Enter failure escalation (see SKILL.md 3H.3)
```

## Budget Tracking

Per-task budget is enforced by `--max-budget-usd`. The orchestrator also tracks cumulative spend:

```
After each task completes:
  session_spent += task.total_cost_usd
  if session_spent > session_budget:
    Pause and ask user: "Budget ${session_budget} exceeded. Continue? [y/N]"
```

## Error Classification

| Error Type          | Detection                                                | Action                       |
| ------------------- | -------------------------------------------------------- | ---------------------------- |
| Budget exceeded     | subtype `error_max_budget_usd` (note: `is_error: false`) | Retry with higher budget     |
| Timeout             | PID exited after timeout, or killed                      | Retry with longer timeout    |
| Verification failed | Commit exists but `verify_command` fails                 | Retry with error context     |
| No commit           | No new commit found after process exit                   | Retry with explicit reminder |
| Scope violation     | Commit touches files outside task scope                  | Revert commit, retry         |
| Process crash       | Non-zero exit, `is_error: true`                          | Retry with error context     |
| Looping             | `num_turns` > 50 with no commit                          | Kill, escalate model         |
