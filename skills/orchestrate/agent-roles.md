# Agent Role Registry

Maps task characteristics to specialist roles with model selection, budget caps, and domain-specific system prompts.

**This file is a template.** On first use in a new project, run the discovery process below to generate project-specific rules. Until then, the generic rules are used as fallback.

---

## Role Definitions

| Role                | Model  | Budget | Prompt Template                         | Description                             |
| ------------------- | ------ | ------ | --------------------------------------- | --------------------------------------- |
| `backend`           | sonnet | $5     | `prompt-templates/backend-impl.md`      | Server-side routes, services, APIs, DB  |
| `frontend`          | sonnet | $5     | `prompt-templates/frontend-impl.md`     | UI components, pages, client state      |
| `security-reviewer` | opus   | $8     | `prompt-templates/security-reviewer.md` | OWASP review, auth, secrets audit       |
| `qa`                | haiku  | $2     | `prompt-templates/qa-lead.md`           | TDD, test writing, QA watching          |
| `docs`              | haiku  | $2     | `prompt-templates/doc-sync.md`          | Documentation, README, changelogs       |

---

## Project Discovery (run once per new project)

At orchestration start, if no `.claude/orchestrate-roles.md` exists:

1. Aggregate all `files` fields from the task plan
2. Scan `package.json` (or equivalent) to detect frameworks
3. Examine top-level directory structure
4. Generate project-specific assignment rules and write to `.claude/orchestrate-roles.md`
5. Use `.claude/orchestrate-roles.md` for this and all future runs in the project

**Discovery prompt to run as a subagent:**
```
Analyze this project and generate agent-roles assignment rules.
Steps:
1. Read package.json (or Cargo.toml / go.mod / pyproject.toml)
2. Run: ls -1 src/ apps/ packages/ 2>/dev/null | head -30
3. Read the task plan file paths from: {task_plan_path}
4. Output a markdown table mapping file glob patterns to roles: backend, frontend, qa, docs, security-reviewer
Format: same as agent-roles.md Assignment Rules section.
Write result to: .claude/orchestrate-roles.md
```

---

## Generic Assignment Rules (fallback)

Rules are evaluated top-to-bottom; first match wins.

### By File Path Pattern

```
# Backend / Server
src/routes/**              → backend
src/api/**                 → backend
src/services/**            → backend
src/controllers/**         → backend
src/server/**              → backend
src/db/**                  → backend
server/**                  → backend
api/**                     → backend

# Frontend / UI
src/components/**          → frontend
src/pages/**               → frontend
src/app/**                 → frontend
src/views/**               → frontend
src/ui/**                  → frontend
*.tsx                      → frontend
*.svelte                   → frontend
*.vue                      → frontend

# Tests
*.test.*                   → qa
*.spec.*                   → qa
__tests__/**               → qa
test/**                    → qa

# Documentation
docs/**                    → docs
*.md                       → docs
README*                    → docs
CHANGELOG*                 → docs

# Infrastructure / Config
terraform/**               → backend
.github/**                 → docs
Dockerfile*                → backend
```

### By Task Metadata

```
tag: "security"            → security-reviewer
tag: "test"                → qa
tag: "docs"                → docs
verify_command has "semgrep"→ security-reviewer
title contains "review"    → security-reviewer
title contains "audit"     → security-reviewer
title contains "migration" → backend
```

### Fallback

If no rule matches → `backend` (sonnet, $5). Broadest coverage of unknown codebases.

---

## Model Escalation Path

When a task fails and requires model escalation:

```
haiku  → sonnet  (qa, docs tasks that fail)
sonnet → opus    (backend, frontend tasks that fail)
opus   → opus    (security-reviewer stays at opus; budget escalates to $12)
```

Budget also escalates: failed task budget × 1.5.

---

## Interactive Mode Naming

```
backend           → "backend-{N}"      (e.g., backend-1, backend-2)
frontend          → "frontend-{N}"
security-reviewer → "security-{N}"
qa                → "qa-{N}"
docs              → "docs-{N}"
```

---

## Customizing for Your Project

Copy the generic rules above into `.claude/orchestrate-roles.md` and replace with your actual paths. Example for a monorepo:

```
apps/api/**                → backend
apps/web/**                → frontend
packages/shared/**         → backend    (shared server utilities)
packages/ui/**             → frontend
e2e/**                     → qa
```

Remove roles that don't apply. Add roles for domain-specific work (e.g., `ml-engineer` for model training tasks).
