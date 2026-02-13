# Wave Execution Checklist

Reusable checklist the orchestrator reads for each wave transition. All items must pass before proceeding.

## Pre-Wave

### Common (Both Modes)

- [ ] All blocking tasks from previous wave are completed and verified
- [ ] Quality gate from previous wave passes (`pnpm build && npx vitest run && pnpm lint`)
- [ ] Git status is clean (no uncommitted changes from previous wave)
- [ ] `pnpm install` is current (no new dependencies pending)
- [ ] Task ledger is up to date (no stale in_progress tasks)

### Headless Mode Only

- [ ] Session directory exists (`/tmp/orchestrate/{session-id}/`)
- [ ] No file overlap between concurrent tasks (serialized if overlapping)
- [ ] Prompts generated for all tasks in the wave (inspect with `--dry-run`)
- [ ] Per-task budgets within session cap
- [ ] `git.lock` file exists for flock-based locking

### Interactive Mode Only

- [ ] All agents are idle and ready for assignment
- [ ] Team is active (TeamCreate completed, no stale agents)

## During Wave

### Common (Both Modes)

- [ ] No scope creep detected (agents staying within assigned files)
- [ ] Status reported to user periodically
- [ ] Each completed task has a verified commit (hash + verify command)

### Headless Mode Only

- [ ] All `claude -p` processes spawned (PIDs recorded in session directory)
- [ ] Monitor polling running at 10s intervals
- [ ] No process exceeded timeout threshold (2x estimated duration by default)
- [ ] No budget exceeded events (`total_cost_usd` within per-task cap)
- [ ] Completed task outputs are valid JSON and parseable

### Interactive Mode Only

- [ ] All agents acknowledged their assignments within 60s
- [ ] QA watcher is running and reporting after each file change
- [ ] Stall detection running (progressive escalation: 60s/120s/180s)
- [ ] Status reported to user every 3 minutes

## Post-Wave

### Common (Both Modes)

- [ ] All tasks in the wave are marked completed in the ledger
- [ ] Each task has a corresponding commit with conventional message format
- [ ] Full quality gate passes:
  - `pnpm build` (production build succeeds)
  - `npx vitest run` (all tests pass)
  - `pnpm lint` (no lint errors)
- [ ] Type checks pass per workspace:
  - `cd packages/shared && npx tsc --noEmit`
  - `cd apps/api && npx tsc --noEmit`
  - `cd apps/frontend && npx svelte-check --tsconfig ./tsconfig.json --threshold error`
- [ ] Security scan on changed files:
  - `semgrep scan --config auto <changed-files>` (no high/critical findings)
- [ ] Wave summary printed with task count, duration, and issues
- [ ] Next wave's dependencies are now unblocked in the ledger

### Headless Mode Only

- [ ] All output JSON files present in session directory and parseable
- [ ] Each task has exactly one new commit (scope-verified)
- [ ] No commits touch files outside task scope (revert any violations)
- [ ] Cumulative cost within session budget
- [ ] Failed tasks have been escalated through all tiers or user-resolved

### Interactive Mode Only

- [ ] All agents confirmed task completion via SendMessage
- [ ] No stalled agents remaining (reassigned or shut down)
- [ ] Agent idle state is clean (ready for next wave assignment)
