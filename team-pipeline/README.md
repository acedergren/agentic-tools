# team-pipeline

Agent team orchestration pipeline for [Claude Code](https://claude.com/claude-code). Takes you from requirements to merged PR using coordinated agent teams.

```
/prd → /prd --to-plan → /orchestrate → /implement → /review-all → /health-check → PR
```

Part of [agentic-tools](https://github.com/acedergren/agentic-tools). This package contains only the pipeline skills and agents — see the parent repo for standalone utilities (humanizer, firecrawl, shadcn-svelte, etc.).

## Install

```bash
npx @acedergren/team-pipeline init
```

This drops 11 skills and 2 agents into your project's `.claude/` directory.

## What's in the box

### Pipeline Skills

| Skill             | What it does                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| `/prd`            | Interactive requirements discovery → validated PRD with 10-gate checklist |
| `/prd --to-plan`  | Converts a PRD into a phased task plan                                    |
| `/orchestrate`    | Spawns agent teams, assigns tasks in waves, monitors heartbeats           |
| `/implement`      | Full feature pipeline per agent: pre-flight → TDD → scope guard → commit  |
| `/tdd`            | Test-driven cycle with mock bootstrap phase                               |
| `/write-tests`    | Adds tests to existing code with module-type-aware mock strategy          |
| `/review-all`     | Parallel review: security + API audit + scope check                       |
| `/health-check`   | 7+ quality gates: types, tests, lint, security, dead code, circular deps  |
| `/quality-commit` | Runs lint + typecheck + tests, then commits                               |
| `/phase-kickoff`  | Scaffolds branch, test shells, roadmap entry                              |
| `/api-audit`      | Validates routes against shared type contracts                            |
| `/doc-sync`       | Detects documentation drift against codebase                              |

### Agents

| Agent               | Model  | Purpose                                                 |
| ------------------- | ------ | ------------------------------------------------------- |
| `mock-debugger`     | Sonnet | Diagnoses vitest mock wiring — 6 anti-pattern checklist |
| `security-reviewer` | Opus   | OWASP Top 10 review with file:line references           |

## How the pipeline works

**Planning phase** — You describe what you want. `/prd` walks you through requirements, validates them against 10 gates, and produces a structured PRD. `/prd --to-plan` breaks it into tasks with dependencies.

**Execution phase** — `/orchestrate` reads the plan, spawns agent teams (sonnet for implementation, haiku for docs), and assigns tasks in dependency-ordered waves. Each agent runs `/implement`, which follows a strict TDD cycle: pre-flight checks → understand the code → bootstrap one mock test → red (failing tests) → green (implementation) → scope guard → commit.

**Review phase** — `/review-all` runs parallel review agents: security reviewer (OWASP Top 10), API auditor (route-type contracts), and scope checker (drift detection). `/health-check` runs 7+ quality gates across the entire codebase. The pipeline produces a go/no-go verdict.

## Customization

Skills use generic patterns — customize paths for your project:

```markdown
# In skills/health-check/SKILL.md, update workspace paths:

cd apps/api && npx tsc --noEmit → cd src && npx tsc --noEmit
```

Add project-specific review agents to `/review-all`:

```markdown
# In skills/review-all/SKILL.md, add to the agent table:

| **DB Reviewer** | oracle-query-reviewer | Changed SQL files | Bind params, atomic ops |
```

## Requirements

- [Claude Code](https://claude.com/claude-code) CLI
- Node.js >= 18 (for install script only — skills are plain markdown)

## License

MIT
