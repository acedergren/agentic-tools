# Agent Role Registry

Maps task characteristics to specialist roles with model selection, budget caps, and domain-specific system prompts.

## Role Definitions

| Role                | Model  | Budget | Prompt Template                         | Description                             |
| ------------------- | ------ | ------ | --------------------------------------- | --------------------------------------- |
| `backend-impl`      | sonnet | $5     | `prompt-templates/backend-impl.md`      | Fastify 5 routes, plugins, services     |
| `frontend-impl`     | sonnet | $5     | `prompt-templates/frontend-impl.md`     | SvelteKit pages, components, stores     |
| `mastra-impl`       | sonnet | $5     | `prompt-templates/mastra-impl.md`       | Mastra agents, RAG, tools, workflows    |
| `security-reviewer` | opus   | $8     | `prompt-templates/security-reviewer.md` | OWASP + Oracle security review          |
| `qa-lead`           | haiku  | $2     | `prompt-templates/qa-lead.md`           | TDD, test writing, QA watching          |
| `doc-sync`          | haiku  | $2     | `prompt-templates/doc-sync.md`          | Documentation, README, migration guides |

## Assignment Rules

The orchestrator assigns roles based on file paths and task metadata. Rules are evaluated top-to-bottom; first match wins.

### By File Path

```
apps/api/src/routes/**          → backend-impl
apps/api/src/plugins/**         → backend-impl
apps/api/src/services/**        → backend-impl
apps/api/src/app.ts             → backend-impl
apps/frontend/src/**            → frontend-impl
apps/api/src/mastra/**          → mastra-impl
packages/shared/src/tools/**    → mastra-impl (tool wrappers)
packages/shared/src/server/**   → backend-impl (shared server utilities)
packages/shared/src/workflows/**→ backend-impl
docs/**                         → doc-sync
*.test.ts                       → qa-lead
```

### By Task Metadata

```
tag: "security"                 → security-reviewer
tag: "test"                     → qa-lead
tag: "docs"                     → doc-sync
verify_command contains "semgrep"→ security-reviewer
```

### By Task Content

```
title contains "migration"      → backend-impl (Oracle migrations)
title contains "review"         → security-reviewer
title contains "audit"          → security-reviewer
```

## Fallback

If no rule matches, assign `backend-impl` (sonnet, $5) as the default — it has the broadest knowledge of the monorepo.

## Budget Overrides

The `--budget-per-task N` flag overrides the role-based budget for all tasks. Per-session budget cap is calculated as:

```
session_budget = sum(task_budgets) * 1.5  (50% headroom for retries)
```

## Model Escalation Path

When a task fails and requires model escalation:

```
haiku  → sonnet  (qa-lead, doc-sync tasks that fail)
sonnet → opus    (backend-impl, frontend-impl, mastra-impl tasks that fail)
opus   → opus    (security-reviewer stays at opus, gets extended budget: $12)
```

Budget is also escalated: failed task budget × 1.5 for the retry.

## Interactive Mode Naming

When spawning in-session agents (interactive mode), use role-based names:

```
backend-impl   → "backend-{N}"      (e.g., backend-1, backend-2)
frontend-impl  → "frontend-{N}"
mastra-impl    → "mastra-{N}"
security-reviewer → "security-{N}"
qa-lead        → "qa-{N}"
doc-sync       → "docs-{N}"
```

This replaces the old generic `sonnet-impl-N` / `haiku-deps-N` naming, making status reports immediately readable.
