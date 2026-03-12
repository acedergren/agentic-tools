---
name: prd
description: "Use when creating, updating, validating, or phasing a PRD. Drives interactive discovery, technical architecture, phasing DAG, TDD protocol, and dependency analysis. Keywords: PRD, product requirements, feature planning, acceptance criteria, MoSCoW, phasing, requirements document."
---

# PRD Skill

Produce drift-proof Product Requirements Documents through iterative discovery.

Output: `.claude/reference/PRD.md` (living requirements document for the project).

## Do NOT load when

- user has a final spec and only wants implementation planning (use `/orchestrate` or `/prd --to-plan`)
- task is a code review or repo health check
- request is a lightweight note or issue, not a full requirements document

## NEVER

- **Never generate a PRD without scanning the codebase first** — requirements that contradict existing architecture produce unimplementable specs
- **Never write acceptance criteria as "should work correctly"** — use Given/When/Then; untestable criteria cannot be verified at phase completion
- **Never skip dependency analysis** — untracked dependencies produce phases that can't be parallelized safely
- **Never batch all discovery questions into one wall of text** — max 4 questions per round; users disengage from interrogations
- **Never assume a library version** — check `package.json` and npm; version assumptions produce broken phase plans
- **Never write phasing without dependency arrows** — phases must be a DAG; implicit ordering creates unmergeable parallel work
- **Never leave `[NEEDS CLARIFICATION]` markers in a finalized PRD** — they signal a spec that cannot drive implementation

## Mode routing

| Argument | Mode | Description |
|---|---|---|
| _(empty)_ | Create | Interactive PRD creation from scratch |
| `<feature text>` | Create | Start with context, then iterate |
| `--update` | Update | Incremental update to existing PRD |
| `--validate` | Validate | Run validation checklist on existing PRD |
| `--audit-deps` | Audit | Dependency/drift analysis only |
| `--to-plan` | Plan | Generate orchestrate-ready task plan |

## Create mode

**Phase 1 — Codebase scan (automatic, before any questions)**

Launch an Explore agent to map relevant codebase areas. Read roadmap/changelog for prior decisions. Check for outdated dependencies in scope. This prevents asking questions the codebase already answers.

**Phase 2 — Interactive discovery (2–4 rounds, max 4 questions each)**

- Round 1: Problem, who, success criteria, personas
- Round 2: MoSCoW priorities, explicit out-of-scope, interactions
- Round 3: Architecture constraints, database, auth, performance
- Round 4 (if needed): Phasing, parallelization risks

Never draft before Round 2. Never ask what the codebase scan already answered.

**Phase 3 — Draft**

Read `template.md`. Write to `.claude/reference/PRD.md`. Mark gaps `[NEEDS CLARIFICATION: ...]`. Populate Architecture Decisions (AD-N entries). Build phasing DAG with explicit arrows.

**Phase 4 — Validation**

Read `validation.md`, run every check. Present pass/fail. Iterate until critical gates pass.

**Phase 5 — Finalize**

Remove all markers. Commit: `docs(prd): add <feature-name> requirements`.

## Update mode (`--update`)

1. Read existing PRD
2. Ask what changed (new requirement, scope change, dependency update)
3. Launch Explore agent to detect codebase drift since last PRD update
4. Generate diff-style updates: `[ADDED]`, `[CHANGED]`, `[REMOVED]`, `[DRIFT DETECTED]`
5. Present for approval, apply, re-validate

## Plan mode (`--to-plan`)

Transforms PRD phasing into an `/orchestrate`-ready task plan at `docs/plans/<feature-name>-plan.md`.

Wave assignment rules:
- Wave 1: Schemas, types, migrations, config (foundation)
- Wave 2: Routes, services, repositories (implementation)
- Wave 3: Wiring, UI, end-to-end flows (integration)
- Wave 4: Error handling, edge cases, docs (polish)

Agent assignment rules:
- `haiku`: Type definitions, config, simple CRUD, test writing
- `sonnet`: Business logic, complex integrations, security-sensitive code

Requires V5 (DAG) validation to pass before generating the plan.

## Validate mode (`--validate`)

Read `validation.md` and run all gates. Print pass/fail with line references.

## Audit-deps mode (`--audit-deps`)

Read `drift-prevention.md` and run dependency freshness + architectural drift checks.

## Scripts

```bash
bash scripts/check-prd-assets.sh skills/prd
node scripts/list-prd-phases.js .claude/reference/PRD.md
```

## Arguments

- `/prd` — interactive creation
- `/prd Workflow Designer` — start with context
- `/prd --update` — incremental update
- `/prd --validate` — run validation only
- `/prd --audit-deps` — dependency audit only
- `/prd --to-plan` — generate orchestrate-ready task plan
