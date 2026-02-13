# Orchestrate

Coordinate parallel agent teams to execute multi-task implementation plans.

## What It Does

Orchestrate manages teams of specialized AI agents working on implementation plans in parallel. Instead of running 22 tasks sequentially over 4 hours, run them concurrently and finish in ~1 hour.

## Key Features

- **Task dependency graphs** - Parses plans, respects blockers, assigns when ready
- **Role-matched agents** - Frontend, backend, QA, security specialists
- **Heartbeat monitoring** - Progressive stall detection with automatic reassignment
- **Quality gates** - Build/test/lint between waves, verify before transitions
- **Two execution modes**:
  - **Interactive**: In-session agents with message-based coordination
  - **Headless**: Independent `claude -p` processes for max parallelization

## Safety & Coordination

- **File overlap detection** - Serializes tasks touching the same files
- **Git safety** - flock-based locking prevents concurrent staging conflicts
- **Scope enforcement** - Reverts commits that touch out-of-scope files
- **Budget controls** - Per-task caps, session-wide limits

## Usage

```bash
/orchestrate A                    # Run Phase A interactively
/orchestrate A --headless         # Run Phase A with claude -p processes
/orchestrate docs/plans/plan.md  # Custom plan file
/orchestrate --dry-run            # Preview without spawning
```

## How It Works

1. Parse implementation plan into task ledger
2. Spawn role-matched agents (backend-1, frontend-2, qa-1, etc.)
3. Assign tasks respecting dependencies and file overlap
4. Monitor progress with progressive stall escalation (60s ping → 120s warn → 180s reassign)
5. Run quality gates between waves (build + test + lint)
6. Verify commits and scope before marking complete

## Requirements

- Claude Code CLI
- Implementation plan with task structure (see SKILL.md for format)
- For headless mode: `claude -p` available in PATH

## Architecture

Built entirely on Claude Code's native team primitives:

- `TeamCreate` / `TeamDelete` - Team lifecycle
- `TaskCreate` / `TaskUpdate` / `TaskList` - Ledger operations
- `SendMessage` - Agent coordination (DM, broadcast, shutdown)
- `Task` tool - Spawning specialized agents

No external infrastructure needed.

## Example

Given a plan with 22 tasks across 3 waves:

```
Wave 1: 6 parallel tasks (dependency updates)
Wave 2: 12 tasks (8 parallel + 4 serialized due to file overlap)
Wave 3: 4 tasks (final verification + docs)
```

Orchestrate spawns 5 agents, assigns work based on role matching, monitors progress, runs quality gates between waves. Result: ~1 hour wallclock vs 4 hours sequential.

## Documentation

- **SKILL.md** - Full skill specification
- **agent-roles.md** - Role definitions and model selection
- **headless-runner.md** - `claude -p` concurrency model
- **wave-template.md** - Quality gate checklist
- **prompt-templates/** - Role-specific system prompts for headless mode

## License

MIT
