---
name: orchestrate
description: "Use when executing a multi-task implementation plan with parallel agents. Coordinates task assignment, wave sequencing, heartbeat monitoring, git safety, and quality gates. Supports interactive (TeamCreate/Task) and headless (claude -p) modes. Keywords: parallel agents, wave execution, orchestrate, headless, phase execution, task plan."
---

# Orchestrate

Coordinate a team of parallel agents to execute a phase from a task plan. Manages task assignment, monitoring, scope enforcement, and wave-transition quality gates.

**Modes:**
- **Interactive** (default): In-session agents via TeamCreate/Task/SendMessage — use for complex tasks needing inter-agent coordination
- **Headless** (`--headless`): Independent `claude -p` processes — use for parallelizable tasks with clear scope boundaries (~54% less coordination overhead)

## Do NOT load when

- task is small enough for one agent to finish directly
- no written plan or no separable workstreams exist
- parallel execution would create more overlap than speedup

## NEVER

- **Never let parallel agents `git add && git commit` without flock** — git's index is process-global. Concurrent writes silently mix staged files between commits. Every agent system prompt must include `flock /tmp/orchestrate/{session-id}/git.lock`. Symptom: commit A contains files from task B.

- **Never skip file overlap check** — two agents editing the same file produces merge conflicts neither can resolve (they have no knowledge of each other). Detect overlap at plan time, serialize conflicting tasks.

- **Never trust `is_error` field alone for failure detection** — budget exhaustion sets `is_error: false` with `subtype: "error_max_budget_usd"`. Always check `subtype.startsWith("error_")`. Confirmed via live testing of `claude -p --output-format json`.

- **Never reuse PID files across waves** — OS recycles process IDs. Always clear `/tmp/orchestrate/{session-id}/task-*.pid` between waves or a stale PID matches an unrelated process, causing the monitor loop to wait indefinitely.

- **Never spawn headless agents without `--no-session-persistence`** — each `claude -p` writes a session file to `~/.claude/`. 22 parallel tasks = 22 orphaned session files polluting session history.

- **Never use `--dangerously-skip-permissions` without `--allowedTools`** — the flag alone gives unrestricted tool access including TeamCreate/SendMessage/Task (recursive agents). Always pair with `--allowedTools "Bash Edit Write Read Glob Grep"`.

- **Never retry a failed agent by re-spawning the same one with appended errors** — accumulated failed reasoning makes the second attempt worse. Always spawn a fresh fix-subagent with targeted instructions.

- **Never run code quality review before spec compliance passes** — quality review on spec-incorrect code wastes tokens and produces misleading results. Spec compliance first, always.

- **Never consider a headless task done without running the full verification chain** — even `subtype: "success"` doesn't guarantee: correct branch, in-scope files, passing build. Always: commit exists → scope check → verify command.

## Mode selection decision tree

```
Is task count > 10 AND tasks have clear file boundaries?
  YES → Headless: ~54% less overhead, simpler monitoring
  NO → Interactive: better for coordination, cross-task decisions

Do tasks share many files (>50% overlap)?
  YES → Add git worktrees OR serialize into sequential waves
  NO → Standard parallel execution with flock
```

## Resource loading (mandatory)

- **Before spawning any agent**: Read `agent-roles.md` for role assignments and model selection
- **Headless mode, before each task prompt**: Read `prompt-templates/{role}.md` for that task's role
- **At every wave transition**: Read `wave-template.md` for the pre/during/post checklist
- **For `claude -p` flag details or error classification**: `headless-runner.md`

**Do NOT load prompt templates in interactive mode** — interactive agents invoke `/quality-commit` and `/tdd` directly.

## Scripts

```bash
bash scripts/setup-session-dir.sh
node scripts/check-file-overlap.js "apps/api/src/a.ts,apps/api/src/b.ts" "apps/api/src/b.ts,apps/web/src/c.ts"
```

## Failure escalation (headless)

1. **Retry with context** (up to 2): Append error output, re-spawn same model
2. **Model escalation** (after 2 fails): haiku→sonnet, sonnet→opus. Budget ×1.5
3. **User intervention**: Print full failure history. Offer: Skip / Manual fix / Abort

## Progressive stall escalation (interactive)

| Timer | Action |
|---|---|
| 60s | Ping: "Status check — what are you working on?" |
| 120s | Warning: "No response in 2min. Will reassign in 60s." |
| 180s | Reassign: spawn replacement with task context |

## Integration map

| File | Load when |
|---|---|
| `agent-roles.md` | Assigning roles to tasks (Step 2) |
| `prompt-templates/{role}.md` | Building headless agent prompts |
| `wave-template.md` | Running wave transition gate |
| `headless-runner.md` | Debugging `claude -p` flags or output format |
| `execution-steps.md` | Full step-by-step execution reference (3H/3I) |

## Arguments

`$ARGUMENTS` accepts: Phase ID, plan file path, or inline task list.

Key flags: `--headless`, `--interactive`, `--dry-run`, `--wave N`, `--max-agents N`, `--budget-per-task N`, `--timeout-multiplier N`, `--no-qa`, `--verbose`

## Examples

```
/orchestrate A                          # Phase A, interactive
/orchestrate A --headless               # Phase A, headless
/orchestrate A --headless --dry-run     # Preview prompts without spawning
/orchestrate A --wave 2                 # Resume from wave 2
/orchestrate docs/plans/custom.md       # Custom plan file
/orchestrate "add auth; write tests"    # Inline task list
```
