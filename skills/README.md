# Agent Skills

Agent-agnostic skills compatible with Claude Code. Follow standard format (YAML frontmatter + markdown body).

## Development Pipeline Skills

These skills chain into a complete implementation workflow:

| Skill              | Description                   | Key Differentiator                                      |
| ------------------ | ----------------------------- | ------------------------------------------------------- |
| **implement**      | End-to-end feature pipeline   | Pre-flight → TDD → scope guard → commit in one flow     |
| **tdd**            | Test-driven development cycle | Mock bootstrap phase validates wiring before full suite |
| **write-tests**    | Add tests to existing code    | Module-type-aware mock strategy selection               |
| **quality-commit** | Quality gates + atomic commit | Lint, typecheck, test gates before every commit         |

## Review & Quality Skills

| Skill            | Description                       | Key Differentiator                                  |
| ---------------- | --------------------------------- | --------------------------------------------------- |
| **review-all**   | Parallel multi-reviewer pipeline  | Spawns security + API + scope agents simultaneously |
| **health-check** | Full codebase diagnostic          | 7+ gates with pass/fail/skip/warn status table      |
| **api-audit**    | Route-to-type contract validation | Detects auth gaps, missing schemas, type drift      |
| **doc-sync**     | Documentation drift detection     | Compares docs against actual codebase state         |

## Planning & Orchestration Skills

| Skill             | Description                   | Key Differentiator                                  |
| ----------------- | ----------------------------- | --------------------------------------------------- |
| **prd**           | PRD creation + validation     | 10-gate checklist, `--to-plan` generates task plans |
| **orchestrate**   | Multi-agent team coordination | Wave-based execution with heartbeat monitoring      |
| **phase-kickoff** | Phase scaffolding             | Creates branch, test shells, roadmap entry          |

## Content & Framework Skills

| Skill                   | Description                   | Version |
| ----------------------- | ----------------------------- | ------- |
| **humanizer**           | Remove AI writing patterns    | v3.0.0  |
| **firecrawl**           | Web scraping CLI              | v3.0.0  |
| **shadcn-svelte-skill** | shadcn-svelte + Tailwind v4.1 | v3.0.0  |
| **tanstack-query**      | TanStack Query v5 patterns    | v3.0.0  |
| **turborepo**           | Monorepo architecture         | v3.0.0  |
| **refactor-module**     | Terraform module extraction   | v3.0.0  |

## Skill Quality Standards

All skills follow these principles:

- Expert-only knowledge (not Claude's base knowledge)
- Decision frameworks with clear criteria
- Anti-patterns with WHY explanations
- Core content under 300 lines (progressive disclosure for details)

## Installation

```bash
# Install all skills
./install.sh /path/to/your/project

# Or copy individual skills
cp -r skills/implement /path/to/project/.claude/skills/
```

Skills placed in `.claude/skills/` are automatically available as `/skill-name` slash commands in Claude Code.

---

**Last Updated**: February 2026
