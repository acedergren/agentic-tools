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
| **bugfix**         | Autonomous bug fix pipeline   | Evidence → hypothesis → minimal fix → verify → commit |
| **migrate**        | Codebase migration orchestration | Scripted bulk changes with dedupe and residual scans |

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
| **prod-readiness** | 5-agent release readiness review | Security + tests + perf + observability synthesis |

## Content & Framework Skills

| Skill                   | Description                   | Version |
| ----------------------- | ----------------------------- | ------- |
| **humanizer**           | Remove AI writing patterns    | v3.0.0  |
| **firecrawl**           | Web scraping CLI              | v3.0.0  |
| **shadcn-svelte** | shadcn-svelte + Tailwind v4.1 | v3.0.0  |
| **tanstack-query**      | TanStack Query v5 patterns    | v3.0.0  |
| **turborepo**           | Monorepo architecture         | v3.0.0  |
| **refactor-module**     | Terraform module extraction   | v3.0.0  |
| **write-natural-swedish** | Natural Swedish writing with contemporary and tech-company presets | v1.0.0 |
| **oracle-idcs-better-auth-setup** | Oracle + IDCS auth setup | v1.0.0  |
| **fastify-better-auth-bridge** | Fastify Better Auth bridge | v1.0.0  |
| **oracle-idcs-org-provisioning** | IDCS org provisioning | v1.0.0  |

## OCI and Oracle Skills

The `oci` skill pack is the visible repository boundary for OCI and Oracle-related work. Specialist skills remain top-level for compatibility, while `skills/oci/manifest.json` records the canonical ownership set and CI checks it against metadata, CLI, installer, and docs.

| Skill | Description | Version |
| ----- | ----------- | ------- |
| **oci** | OCI and Oracle skill-pack router | v1.0.0 |
| **best-practices** | OCI architecture review router | v2.0.0 |
| **infrastructure-as-code** | OCI Terraform hub | v2.0.0 |
| **oci-resource-manager** | OCI Resource Manager operations | v2.0.0 |
| **oracle-dba** | Autonomous AI Database operations | v2.0.0 |
| **secrets-management** | OCI Vault and secret operations | v2.0.0 |

## Full Library Coverage

The install surfaces (`bin/cli.js`, `install.sh`, and `npx skills add`) are expected to expose every directory in `skills/`.
CI validates that registry coverage stays in sync with the filesystem and docs.

## Complete Skill Directory

| Skill | Trigger Summary |
| ----- | --------------- |
| **api-audit** | Use when auditing API routes for schema drift, missing auth, or validation gaps. Scans routes against shared TypeScript  |
| **best-practices** | "review OCI architecture", "avoid OCI anti-patterns", "plan an Oracle Cloud migration", "evaluate OCI Well-Architected risks", or "choose which OCI skill applies" |
| **bugfix** | Use when given a bug report, failing test, stack trace, or CI failure that needs diagnosis and repair. Autonomously diag |
| **compute-management** | "launch OCI compute", "choose an OCI shape", "debug compute capacity", "configure instance principals", or "optimize OCI instance cost" |
| **database-management** | "create an OCI database", "choose DB System vs ADB", "manage PDB lifecycle", "route ADB work", or "plan Oracle database provisioning" |
| **doc-sync** | Use when auditing or fixing drift between project documentation and the actual codebase. Detects stale architecture diag |
| **fastify-better-auth-bridge** | "bridge Better Auth into Fastify", "fix Fastify session resolution", "forward auth cookies", "patch IDCS org context", or "decorate Fastify request auth" |
| **find-skills** | Use when user asks to find, install, or search for agent skills. Also use when user asks 'can you do X' or 'is there a s |
| **finops-cost-optimization** | "optimize OCI cost", "investigate an OCI bill", "estimate egress cost", "right-size OCI resources", or "plan Resource Scheduler savings" |
| **firecrawl** | Use when scraping web pages, extracting content from JS-rendered sites or SPAs, running search-plus-scrape workflows, or |
| **genai-services** | "call OCI Generative AI", "choose an OCI GenAI model", "debug GenAI 429", "plan OCI RAG", or "compare Command A, Llama, Gemini, or gpt-oss" |
| **health-check** | Use when running codebase quality gates (typecheck, lint, tests, security, dead code, circular deps, audits). Reports pa |
| **humanizer** | Use when making text sound human, removing AI tells, or fixing writing that sounds like ChatGPT. Detects and rewrites AI |
| **iam-identity-management** | "write OCI IAM policy", "debug OCI 403", "configure dynamic groups", "use identity domains", or "fix IDCS federation" |
| **implement** | Use when implementing a feature, adding an endpoint, or making a non-trivial code change that requires pre-flight valida |
| **infrastructure-as-code** | "write Terraform for OCI", "debug terraform-provider-oci", "configure OCI Resource Manager", "fix OCI state", or "build OCI IaC" |
| **landing-zones** | "design an OCI landing zone", "plan compartments", "enable Security Zones", "build hub-spoke OCI", or "meet CIS OCI Foundations" |
| **migrate** | Use when bulk-migrating import paths, renaming workspace packages, or reorganizing modules across many files in a monore |
| **monitoring-operations** | "create OCI alarms", "debug missing metrics", "write MQL", "configure Service Connector", or "monitor OCI resources" |
| **networking-management** | "design OCI networking", "debug VCN connectivity", "configure Service Gateway", "choose NSG vs security list", or "plan FastConnect or VPN" |
| **oci** | "find OCI skills", "route Oracle Cloud work", "install the OCI skill pack", "review OCI skill ownership", or "separate Oracle skills" |
| **oci-events** | "create OCI Events rule", "trigger Functions from events", "route events to Streaming", "debug Events delivery", or "filter CloudEvents" |
| **oci-pptx** | "create Oracle slides", "edit an Oracle deck", "build a CloudWorld presentation", "review Oracle-branded PPTX", or "apply Oracle brand to slides" |
| **oci-resource-manager** | "configure OCI Resource Manager", "debug Resource Manager job", "create ORM stack", "use Resource Manager private endpoint", or "fix Resource Manager dynamic group" |
| **oracle-dba** | "manage Autonomous AI Database", "debug ADB performance", "fix wallet connection", "optimize ECPU cost", or "use SQLcl with Oracle Database" |
| **oracle-idcs-better-auth-setup** | "connect Better Auth to OCI IAM", "configure identity domain OIDC", "fix IDCS callback URL", "set trusted origins", or "bootstrap Oracle auth provider" |
| **oracle-idcs-org-provisioning** | "map IDCS groups to orgs", "provision org_members from identity domains", "fix Better Auth active org", or "bootstrap first admin" |
| **orchestrate** | Use when executing a multi-task implementation plan with parallel agents. Coordinates task assignment, wave sequencing,  |
| **phase-kickoff** | Use when starting a new development phase or sprint that needs branch creation, TDD test shell, and roadmap entry done t |
| **prd** | Use when creating, updating, validating, or phasing a PRD. Drives interactive discovery, technical architecture, phasing |
| **prod-readiness** | Use when assessing release readiness or running a pre-launch review. Spawns 5 specialist agents in parallel (security, t |
| **publish-skill** | Use when creating a new skill and publishing it to a GitHub repo for installation via npx skills add. Covers scaffold, s |
| **quality-commit** | Use when committing code changes. Runs lint, typecheck, Semgrep security scan, optional CodeRabbit review, and related t |
| **refactor-module** | Use when deciding whether to extract Terraform code into a reusable module, determining module boundaries, or migrating  |
| **review-all** | Use when preparing a PR or completing a phase of work and needing a full-spectrum code review. Runs security, API audit, |
| **secrets-management** | "store OCI secrets", "rotate Vault secrets", "debug secret retrieval 403", "use instance principals for Vault", or "replicate secrets" |
| **semgrep-coderabbit** | Use when reviewing code changes before commit or PR merge. Covers tool sequencing, finding severity priorities, fix orde |
| **shadcn-svelte** | Use when working with shadcn-svelte components, TanStack Table in Svelte 5, or Tailwind v4.1. Covers non-obvious reactiv |
| **sqlite-to-oracle-planner** | "migrate SQLite to Oracle", "replace better-sqlite3", "plan Oracle migration", "convert SQLite schema", or "find SQLite touch points" |
| **stitch-design-system** | Use when extracting a design system from a Stitch project to create a DESIGN.md source-of-truth for consistent multi-scr |
| **stitch-prompt-engineer** | Use when enhancing, polishing, or fixing Stitch UI generation prompts. Adds UI/UX keywords, injects design system tokens |
| **stitch-to-react** | Use when converting Stitch designs into production React components. Enforces modular architecture: logic in hooks, data |
| **tanstack-query** | Use when debugging TanStack Query / React Query issues: v4→v5 migration errors (gcTime, isPending, throwOnError), infini |
| **tdd** | Use when implementing features, fixing bugs, or adding deliberate test coverage. Enforces test-first (red-green-refactor |
| **turborepo** | Use when making Turborepo monorepo architecture decisions: choosing between monorepo vs polyrepo, deciding when to split |
| **write-tests** | Use when adding or improving test coverage for existing source code without changing production behavior. Selects mock s |

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

**Last Updated**: May 2026
