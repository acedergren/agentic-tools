# Orchestrate: Execution Steps Reference

## Step 1: Parse Arguments

Extract orchestration target from `$ARGUMENTS`:

- **Phase ID** (e.g., `A`, `B`, `D`): Load tasks from `.claude/reference/phase-10-task-plan.md`
- **Plan file path** (e.g., `docs/plans/my-plan.md`): Parse from the given file
- **Inline task list** (e.g., `"task1; task2; task3"`): Semicolon-separated descriptions

Flags:

- `--headless`: Spawn independent `claude -p` processes
- `--interactive`: In-session TeamCreate-based mode (default)
- `--auto`: Zero-touch mode — plan → implement → validate → review → commit loop. Retries up to 3x with model escalation, then escalates to user
- `--dry-run`: Parse and display tasks without spawning
- `--wave N`: Start from wave N (skip earlier waves, assumes complete)
- `--max-agents N`: Cap agent count (default: 5)
- `--budget-per-task N`: Override per-task budget in USD (default: role-based from `agent-roles.md`)
- `--timeout-multiplier N`: Scale timeout thresholds (default: 2x estimated duration)
- `--no-qa`: Skip QA watcher (interactive mode only)
- `--verbose`: Print all agent messages
- `--scrum-master`: Spawn a dedicated scrum-master agent that owns task tracking and Plane/backlog sync (recommended for plans with >5 tasks)
- `--plane-project <id>`: Plane project ID for backlog sync — enables state transitions, sprint assignment, commit-to-issue linking
- `--plane-cycle <name>`: Sprint cycle name to assign tasks to (creates cycle if it doesn't exist)
- `--commit-no-stall-mins N`: Minutes without a commit before scrum-master pings an in-progress agent (default: 20)

## Step 2: Initialize Task Ledger

For each task use `TaskCreate` with:
- `subject`: Task title
- `description`: Full spec with files, verify command, agent instructions
- `activeForm`: Present-continuous description
- `metadata`:
  ```json
  {
    "role": "backend-impl",
    "agent_type": "sonnet",
    "phase": "A",
    "wave": "1",
    "task_id": "A-1.01",
    "estimated_duration": "20m",
    "verify_command": "pnpm build && pnpm test",
    "files": "apps/api/src/routes/auth.ts",
    "status_detail": "pending",
    "plane_item_id": "",
    "plane_sequence": "",
    "worktree_path": "",
    "worktree_branch": "",
    "last_commit_at": "",
    "commit_hash": ""
  }
  ```

When `--plane-project` is set: populate `plane_item_id` and `plane_sequence` (e.g., `PROJ-12`) after creating the Plane work item. Agents embed `[PLANE_SEQUENCE]` in commit messages; scrum-master verifies via `git log`.

Assign roles using `agent-roles.md`. Set `blockedBy` dependencies via `TaskUpdate`.

Print plan summary: mode, task count by model, wave breakdown, estimated duration, budget.

## Step 3H: Headless Execution

### 3H.1 — Setup

```bash
SESSION_ID=$(date +%s)-$(head -c 4 /dev/urandom | xxd -p)
mkdir -p /tmp/orchestrate/$SESSION_ID
touch /tmp/orchestrate/$SESSION_ID/git.lock
```

### 3H.2 — Wave Execution

**a. Generate Prompts**: Read `prompt-templates/{role}.md`, substitute `{{TASK_DESCRIPTION}}`, `{{TASK_FILES}}`, `{{VERIFY_COMMAND}}`, `{{COMPLETED_CONTEXT}}`, `{{GIT_LOCK_PATH}}`. Keep under 20K tokens.

**b. File Overlap Check**: Run `node scripts/check-file-overlap.js`. If tasks share files, serialize (add blockedBy).

**c. Spawn Processes**:
```bash
claude -p \
  --model {role.model} \
  --system-prompt "$(cat /tmp/orchestrate/$SESSION_ID/task-$TASK_ID.prompt)" \
  --allowedTools "Bash Edit Write Read Glob Grep" \
  --dangerously-skip-permissions \
  --max-budget-usd {budget} \
  --output-format json \
  --no-session-persistence \
  "{task description}" \
  > /tmp/orchestrate/$SESSION_ID/task-$TASK_ID.json 2>&1 &
echo $! > /tmp/orchestrate/$SESSION_ID/task-$TASK_ID.pid
```

**d. Monitor Loop**: Poll every 10s. Check PIDs with `kill -0`. Parse output: check `subtype.startsWith("error_")` (not `is_error`). Timeout = estimated_duration × multiplier → SIGTERM → wait 10s → SIGKILL. Status report every 30s.

**e. Verify Completed Tasks** (two-stage review — spec before quality):

**Stage 0 — Mechanical checks** (fast-fail before review cost):
1. Check `subtype` for error — if error, go to 3H.3
2. `git log --oneline --since="{start_time}" -- {task.files}` — if no commit, go to 3H.3
3. Scope check: `git diff --name-only HEAD~1` — out-of-scope files → `git revert HEAD --no-edit` → go to 3H.3
4. Run `task.verify_command` — if fails, go to 3H.3

**Stage 1 — Spec compliance review** (spawn fresh haiku subagent):
```
Review these changes against the task spec. Check ONLY:
- Does the implementation match exactly what was specified?
- Any required behavior missing?
- Any extra behavior added beyond the spec?
Task spec: {task.description}
Changed files: git diff HEAD~1
```
If spec gaps found → dispatch fix-subagent (NOT retry — context pollution): spawn fresh agent with gap description. Re-run Stage 1 after fix.

**Stage 2 — Code quality review** (only after Stage 1 ✅, spawn fresh haiku):
```
Review these changes for code quality. Check ONLY:
- Correctness and edge cases
- Test coverage of the new behavior
- Obvious maintainability issues
Commit: {commit_hash}
```
If quality issues found → dispatch fix-subagent. Re-run Stage 2 after fix.

**On both stages ✅**: `TaskUpdate` status:completed, record commit hash.

**f. Wave Quality Gate**: `pnpm build && npx vitest run && pnpm lint`. Read full checklist from `wave-template.md`. Fail → create fix task → re-run gate.

### 3H.3 — Failure Escalation

**Tier 1** — Fix-subagent (up to 2, NOT retry-same-agent): Spawn a *fresh* agent with the error output + targeted fix instructions. Re-using the same agent accumulates failed reasoning in context, making the second attempt worse than the first.

**Tier 2** — Model escalation (after 2 fails): haiku→sonnet, sonnet→opus. Budget ×1.5. Add error history prefix.

**Tier 3** — User intervention: Print full failure details. Offer: Skip / Manual fix / Abort.

### 3H.4 — Git Safety

**Default: flock-based locking** — every agent prompt must include `flock /tmp/orchestrate/{session-id}/git.lock` before any `git` command.

**Git worktrees (when tasks have >50% file overlap)**: Give each agent an isolated worktree to eliminate flock contention entirely:

```bash
# Orchestrator — before spawning agent
BRANCH="feat/task-$TASK_ID"
WORKTREE="/tmp/orchestrate/$SESSION_ID/worktree-$TASK_ID"
git worktree add "$WORKTREE" -b "$BRANCH"
# Record in task metadata: worktree_path + worktree_branch
```

After task completes (3H.2e verification passes), orchestrator merges and cleans up:

```bash
git merge --no-ff "$BRANCH" -m "merge: task $TASK_ID complete"
git worktree remove "$WORKTREE"
git branch -d "$BRANCH"
```

If merge produces conflicts → create a conflict-resolution task, assign to sonnet, then re-run merge.

### 3H.5 — Cleanup

```bash
rm -rf /tmp/orchestrate/$SESSION_ID
```

## Step 3I: Interactive Execution

### 3I.1 — Create Team

`TeamCreate` with name derived from phase (e.g., `phase-A-foundation`).

### 3I.2b — Scrum-Master Agent (when `--scrum-master` is set)

Spawn one additional agent named `scrum-master` with this role:

```
You are scrum-master on team "{team_name}". You do NOT implement code.

1. On startup: Read TaskList. For each task without a plane_item_id, create a Plane work item
   in project {plane_project_id}. Store item ID + sequence in task metadata via TaskUpdate.
2. If --plane-cycle given: Create or find the sprint cycle, assign all new items to it.
3. Transition Plane state to match task ledger:
   - task pending     → Plane "backlog"
   - task in_progress → Plane "in_progress"
   - task completed   → Plane "done" (ONLY after verifying commit + tests — see step 4)
4. Before marking any task done in Plane:
   a. Confirm agent reported a commit hash
   b. Run: git log --oneline | grep "{plane_sequence}" to verify commit exists
   c. Run: {verify_command} — only then update Plane state to "done"
5. Stuck-task detection: every {commit_no_stall_mins} minutes, check metadata.last_commit_at
   for all in_progress tasks. If no commit in >{commit_no_stall_mins} mins, ping the agent.
6. Post a Plane comment on each item when agent commits (include commit hash + branch).
7. Report team status to team lead every 5 minutes.
```

### 3I.2 — Spawn Agents

Determine count from wave parallelism (capped by `--max-agents`). Always spawn `qa-1` unless `--no-qa`.

Agent prompt template:
```
You are {name}, a {role} specialist on team "{team_name}".
1. Acknowledge receipt via SendMessage to team lead
2. Read task details with TaskGet
3. Implement following role domain knowledge
4. Run quality gates: lint → typecheck → test
5. Stage specific files and commit with conventional message
6. Report completion with commit hash via SendMessage
7. Check TaskList for next assignment

QA protocol: After every Edit/Write, notify qa-1 with changed file paths.
Scope: ONLY work on assigned task. Discover related work → report it, don't take it.
Git: Stage ONLY specific files. Never git add -A or git add .
```

### 3I.3 — Assign First Wave

Read `TaskList` for unblocked, unassigned tasks in current wave. Match role → agent specialization. `TaskUpdate` owner + status:in_progress. `SendMessage` with task ID, files, verify command, dependency context.

### 3I.4 — Monitor Loop

**On acknowledgment**: Update metadata `status_detail: in_progress, last_heartbeat`.

**On completion claim** (two-stage review — spec before quality):

1. Mechanical check: verify commit hash (`git log --oneline -1 <hash>`), run verify_command. If fails: send failure feedback, keep in_progress.

2. **Stage 1 — Spec compliance** (spawn fresh haiku subagent):
   - Provide: task spec + `git diff {commit_hash}~1 {commit_hash}`
   - Ask: "Does this exactly match the spec? Missing anything? Added anything extra?"
   - If gaps: dispatch fix-subagent (not the original agent — context pollution). Re-review after fix.

3. **Stage 2 — Code quality** (only after Stage 1 ✅, spawn fresh haiku):
   - Provide: `git diff {commit_hash}~1 {commit_hash}`
   - Ask: "Any correctness, coverage, or maintainability issues?"
   - If issues: dispatch fix-subagent. Re-review after fix.

4. Both ✅: `TaskUpdate` status:completed. Assign next unblocked task.

**Progressive stall escalation**:
| Timer | Action |
|---|---|
| 60s | "Status check — what are you working on?" |
| 120s | "No response in 2min. Will reassign in 60s." |
| 180s | Reassign: mark stalled, spawn replacement with task context |

**Scope enforcement**: Agent modifies out-of-scope files → stop message → if repeated, reassign.

### 3I.5 — Shutdown Protocol

1. `SendMessage` shutdown_request to all agents
2. Wait 30s
3. Re-send to non-responders
4. Wait 15s
5. `TeamDelete` to force cleanup

## Step 4: Wave Transition Gate

Run: `pnpm build && npx vitest run && pnpm lint` plus phase-specific gate command.
Read `wave-template.md` for full pre/during/post checklist.
Gate fails → create fix task → re-run.

## Step 5: Phase Completion

Run final phase verification. Run `/health-check --quick`. Print summary with tasks, duration, cost, agents, commits, issues. Shutdown agents (interactive) or clean session dir (headless).

## Step 6: Cross-Phase Handoff

Check which phases are unblocked (Phase Dependency DAG: A→B→C, A→D, A→F, B→E).
For parallel phases, set up git worktrees:
```bash
git worktree add ../portal-phase-{X} phase-10/{X}-{name}
cd ../portal-phase-{X} && pnpm install
```
