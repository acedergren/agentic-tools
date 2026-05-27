<div align="center">

```
    _                    _   _      _____         _
   /_\  __ _ ___ _ _  __| |_(_)__  |_   _|__  ___| |___
  / _ \/ _` / -_) ' \/ _|  _| / _|   | |/ _ \/ _ \ (_-<
 /_/ \_\__, \___|_||_\__|\__|_\__|   |_|\___/\___/_/__/
       |___/
```

**Production-grade AI agent skills, workflows, and automation for Claude Code**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Skills](https://img.shields.io/badge/Skills-46-brightgreen)](#skills)
[![Agents](https://img.shields.io/badge/Agents-2-blue)](#agents)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-blueviolet)](https://claude.com/claude-code)
[![Community Project](https://img.shields.io/badge/Community-Maintained-success)](https://github.com/acedergren/agentic-tools)

</div>

> **Independent Community Project** — No official affiliation with Anthropic or the Claude Code team. Skills are designed for Claude Code but are community-created.

## What This Is

A battle-tested collection of Claude Code skills, custom agents, hooks, and configuration templates that form a complete development workflow pipeline. Built from real production use across 276 sessions, 435 commits, and 1,700+ passing tests.

The core pipeline takes you from requirements to merged PR:

```
/prd → /prd --to-plan → /orchestrate → agents use /implement → /review-all → /health-check → PR
```

## Packages

| Package                             | What it includes                                             |
| ----------------------------------- | ------------------------------------------------------------ |
| **[agentic-tools](.)** (this repo)  | Everything — all skills, agents, hooks, configs              |
| **[team-pipeline](team-pipeline/)** | Pipeline skills + agents only — for agent team orchestration |

```bash
# Install everything
npx agentic-tools init

# Install just the pipeline
npx @acedergren/team-pipeline init
```

## Quick Start

### Via npx (recommended)

```bash
# Install into current project
npx agentic-tools init

# Install into a specific project
npx agentic-tools init ./my-project

# See what's included
npx agentic-tools list
```

### Via git clone

```bash
git clone https://github.com/acedergren/agentic-tools.git
cd agentic-tools
./install.sh /path/to/your/project
```

This copies skills to `.claude/skills/`, agents to `.claude/agents/`, and hook examples to `.claude/hooks/`.

### Install Individual Skills

```bash
# Copy a single skill from a cloned repo
cp -r skills/implement /path/to/project/.claude/skills/

# Or symlink for development
ln -s $(pwd)/skills/implement /path/to/project/.claude/skills/
```

### Try It

```bash
# In your project with Claude Code:
/implement add validation to the user signup endpoint
/tdd add rate limiting to POST /api/search
/bugfix "TypeError: Cannot read property 'userId' of undefined"
/migrate "@old/pkg/utils → @new/pkg/core"
/health-check
/review-all
/prod-readiness
```

---

## Skills

### Development Pipeline

These skills chain together into a full implementation workflow.

| Skill                                         | What It Does                    | Key Feature                                                            |
| --------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| **[/implement](skills/implement/)**           | End-to-end feature pipeline     | Pre-flight → TDD → scope guard → commit                                |
| **[/tdd](skills/tdd/)**                       | Test-driven development cycle   | Mock bootstrap phase catches wiring issues early                       |
| **[/write-tests](skills/write-tests/)**       | Add tests to existing code      | Module-type-aware mock strategy selection                              |
| **[/quality-commit](skills/quality-commit/)** | Quality gates + commit          | Lint, typecheck, test, then commit                                     |
| **[/bugfix](skills/bugfix/)**                 | Autonomous bug fix pipeline     | Evidence → hypothesis → minimal fix → verify → commit, no hand-holding |
| **[/migrate](skills/migrate/)**               | Codebase migration orchestrator | Dedup check → scripted bulk `sed` → typecheck → residual scan → commit |

### Review & Quality

| Skill                                         | What It Does                        | Key Feature                                                                         |
| --------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------- |
| **[/review-all](skills/review-all/)**         | Parallel multi-reviewer pipeline    | Security + API audit + scope check agents                                           |
| **[/health-check](skills/health-check/)**     | Full codebase diagnostic            | 7+ gates: types, tests, lint, security, dead code                                   |
| **[/api-audit](skills/api-audit/)**           | Route-to-type contract validation   | Finds auth gaps, missing schemas, type drift                                        |
| **[/doc-sync](skills/doc-sync/)**             | Documentation drift detection       | Compares docs against actual codebase state                                         |
| **[/prod-readiness](skills/prod-readiness/)** | 5-agent production readiness review | Security + test coverage + perf + observability + code quality → prioritized report |

### Planning & Orchestration

| Skill                                       | What It Does                       | Key Feature                                    |
| ------------------------------------------- | ---------------------------------- | ---------------------------------------------- |
| **[/prd](skills/prd/)**                     | PRD creation with validation gates | 10-gate validation checklist, `--to-plan` mode |
| **[/orchestrate](skills/orchestrate/)**     | Multi-agent team coordination      | Wave-based execution, heartbeat monitoring     |
| **[/phase-kickoff](skills/phase-kickoff/)** | Phase scaffolding                  | Branch + test shells + roadmap entry           |

### Content & Utilities

| Skill                                             | What It Does                | Key Feature                               |
| ------------------------------------------------- | --------------------------- | ----------------------------------------- |
| **[/humanizer](skills/humanizer/)**               | Remove AI writing patterns  | Diagnostic framework + voice injection    |
| **[/firecrawl](skills/firecrawl/)**               | Web scraping CLI            | Parallel scraping, clean markdown output  |
| **[/shadcn-svelte](skills/shadcn-svelte/)** | shadcn-svelte architecture  | Tailwind v4.1 patterns, library selection |
| **[/tanstack-query](skills/tanstack-query/)**     | TanStack Query v5 patterns  | Migration gotchas, performance pitfalls   |
| **[/turborepo](skills/turborepo/)**               | Monorepo architecture       | Build optimization, workspace patterns    |
| **[/refactor-module](skills/refactor-module/)**   | Terraform module extraction | Decision framework for when to extract    |
| **[/write-natural-swedish](skills/write-natural-swedish/)** | Natural Swedish writing | Contemporary Swedish + tech-company presets |
| **[/oracle-idcs-better-auth-setup](skills/oracle-idcs-better-auth-setup/)** | Oracle + IDCS auth setup | Routes setup work across shared Better Auth foundations |
| **[/fastify-better-auth-bridge](skills/fastify-better-auth-bridge/)** | Fastify Better Auth bridge | Web Request forwarding, decorators, and org-context patching |
| **[/oracle-idcs-org-provisioning](skills/oracle-idcs-org-provisioning/)** | IDCS org provisioning | Group gating, tenant-org resolution, MERGE INTO upserts |

### OCI and Oracle Skill Pack

The OCI skills stay individually installable at `skills/<skill-name>/` for compatibility, while [skills/oci](skills/oci/) provides the visible ownership boundary for Oracle-related work. Its [manifest](skills/oci/manifest.json) is validated in CI against skill metadata, the CLI, and the Bash installer.

| Skill | What It Does | Key Feature |
| ----- | ------------ | ----------- |
| **[/oci](skills/oci/)** | OCI and Oracle skill-pack router | Canonical manifest for separation of duties |
| **[/best-practices](skills/best-practices/)** | OCI architecture review router | Cross-domain triage into specialist skills |
| **[/oracle-dba](skills/oracle-dba/)** | Autonomous AI Database operations | ADB, SQLcl, wallet, ECPU, backup, and tuning guidance |
| **[/secrets-management](skills/secrets-management/)** | OCI Vault and secret operations | Rotation, replication, instance principals, and retrieval guardrails |

---

## Complete Skill Directory

The install surfaces expose every skill under `skills/`:

| Skill | Trigger Summary |
| ----- | --------------- |
| **[/api-audit](skills/api-audit/)** | Use when auditing API routes for schema drift, missing auth, or validation gaps. Scans routes against shared TypeScript  |
| **[/best-practices](skills/best-practices/)** | "review OCI architecture", "avoid OCI anti-patterns", "plan an Oracle Cloud migration", "evaluate OCI Well-Architected risks", or "choose which OCI skill applies" |
| **[/bugfix](skills/bugfix/)** | Use when given a bug report, failing test, stack trace, or CI failure that needs diagnosis and repair. Autonomously diag |
| **[/compute-management](skills/compute-management/)** | "launch OCI compute", "choose an OCI shape", "debug compute capacity", "configure instance principals", or "optimize OCI instance cost" |
| **[/database-management](skills/database-management/)** | "create an OCI database", "choose DB System vs ADB", "manage PDB lifecycle", "route ADB work", or "plan Oracle database provisioning" |
| **[/doc-sync](skills/doc-sync/)** | Use when auditing or fixing drift between project documentation and the actual codebase. Detects stale architecture diag |
| **[/fastify-better-auth-bridge](skills/fastify-better-auth-bridge/)** | "bridge Better Auth into Fastify", "fix Fastify session resolution", "forward auth cookies", "patch IDCS org context", or "decorate Fastify request auth" |
| **[/find-skills](skills/find-skills/)** | Use when user asks to find, install, or search for agent skills. Also use when user asks 'can you do X' or 'is there a s |
| **[/finops-cost-optimization](skills/finops-cost-optimization/)** | "optimize OCI cost", "investigate an OCI bill", "estimate egress cost", "right-size OCI resources", or "plan Resource Scheduler savings" |
| **[/firecrawl](skills/firecrawl/)** | Use when scraping web pages, extracting content from JS-rendered sites or SPAs, running search-plus-scrape workflows, or |
| **[/genai-services](skills/genai-services/)** | "call OCI Generative AI", "choose an OCI GenAI model", "debug GenAI 429", "plan OCI RAG", or "compare Command A, Llama, Gemini, or gpt-oss" |
| **[/health-check](skills/health-check/)** | Use when running codebase quality gates (typecheck, lint, tests, security, dead code, circular deps, audits). Reports pa |
| **[/humanizer](skills/humanizer/)** | Use when making text sound human, removing AI tells, or fixing writing that sounds like ChatGPT. Detects and rewrites AI |
| **[/iam-identity-management](skills/iam-identity-management/)** | "write OCI IAM policy", "debug OCI 403", "configure dynamic groups", "use identity domains", or "fix IDCS federation" |
| **[/implement](skills/implement/)** | Use when implementing a feature, adding an endpoint, or making a non-trivial code change that requires pre-flight valida |
| **[/infrastructure-as-code](skills/infrastructure-as-code/)** | "write Terraform for OCI", "debug terraform-provider-oci", "configure OCI Resource Manager", "fix OCI state", or "build OCI IaC" |
| **[/landing-zones](skills/landing-zones/)** | "design an OCI landing zone", "plan compartments", "enable Security Zones", "build hub-spoke OCI", or "meet CIS OCI Foundations" |
| **[/migrate](skills/migrate/)** | Use when bulk-migrating import paths, renaming workspace packages, or reorganizing modules across many files in a monore |
| **[/monitoring-operations](skills/monitoring-operations/)** | "create OCI alarms", "debug missing metrics", "write MQL", "configure Service Connector", or "monitor OCI resources" |
| **[/networking-management](skills/networking-management/)** | "design OCI networking", "debug VCN connectivity", "configure Service Gateway", "choose NSG vs security list", or "plan FastConnect or VPN" |
| **[/oci](skills/oci/)** | "find OCI skills", "route Oracle Cloud work", "install the OCI skill pack", "review OCI skill ownership", or "separate Oracle skills" |
| **[/oci-events](skills/oci-events/)** | "create OCI Events rule", "trigger Functions from events", "route events to Streaming", "debug Events delivery", or "filter CloudEvents" |
| **[/oci-pptx](skills/oci-pptx/)** | "create Oracle slides", "edit an Oracle deck", "build a CloudWorld presentation", "review Oracle-branded PPTX", or "apply Oracle brand to slides" |
| **[/oracle-dba](skills/oracle-dba/)** | "manage Autonomous AI Database", "debug ADB performance", "fix wallet connection", "optimize ECPU cost", or "use SQLcl with Oracle Database" |
| **[/oracle-idcs-better-auth-setup](skills/oracle-idcs-better-auth-setup/)** | "connect Better Auth to OCI IAM", "configure identity domain OIDC", "fix IDCS callback URL", "set trusted origins", or "bootstrap Oracle auth provider" |
| **[/oracle-idcs-org-provisioning](skills/oracle-idcs-org-provisioning/)** | "map IDCS groups to orgs", "provision org_members from identity domains", "fix Better Auth active org", or "bootstrap first admin" |
| **[/orchestrate](skills/orchestrate/)** | Use when executing a multi-task implementation plan with parallel agents. Coordinates task assignment, wave sequencing,  |
| **[/phase-kickoff](skills/phase-kickoff/)** | Use when starting a new development phase or sprint that needs branch creation, TDD test shell, and roadmap entry done t |
| **[/prd](skills/prd/)** | Use when creating, updating, validating, or phasing a PRD. Drives interactive discovery, technical architecture, phasing |
| **[/prod-readiness](skills/prod-readiness/)** | Use when assessing release readiness or running a pre-launch review. Spawns 5 specialist agents in parallel (security, t |
| **[/publish-skill](skills/publish-skill/)** | Use when creating a new skill and publishing it to a GitHub repo for installation via npx skills add. Covers scaffold, s |
| **[/quality-commit](skills/quality-commit/)** | Use when committing code changes. Runs lint, typecheck, Semgrep security scan, optional CodeRabbit review, and related t |
| **[/refactor-module](skills/refactor-module/)** | Use when deciding whether to extract Terraform code into a reusable module, determining module boundaries, or migrating  |
| **[/review-all](skills/review-all/)** | Use when preparing a PR or completing a phase of work and needing a full-spectrum code review. Runs security, API audit, |
| **[/secrets-management](skills/secrets-management/)** | "store OCI secrets", "rotate Vault secrets", "debug secret retrieval 403", "use instance principals for Vault", or "replicate secrets" |
| **[/semgrep-coderabbit](skills/semgrep-coderabbit/)** | Use when reviewing code changes before commit or PR merge. Covers tool sequencing, finding severity priorities, fix orde |
| **[/shadcn-svelte](skills/shadcn-svelte/)** | Use when working with shadcn-svelte components, TanStack Table in Svelte 5, or Tailwind v4.1. Covers non-obvious reactiv |
| **[/sqlite-to-oracle-planner](skills/sqlite-to-oracle-planner/)** | "migrate SQLite to Oracle", "replace better-sqlite3", "plan Oracle migration", "convert SQLite schema", or "find SQLite touch points" |
| **[/stitch-design-system](skills/stitch-design-system/)** | Use when extracting a design system from a Stitch project to create a DESIGN.md source-of-truth for consistent multi-scr |
| **[/stitch-prompt-engineer](skills/stitch-prompt-engineer/)** | Use when enhancing, polishing, or fixing Stitch UI generation prompts. Adds UI/UX keywords, injects design system tokens |
| **[/stitch-to-react](skills/stitch-to-react/)** | Use when converting Stitch designs into production React components. Enforces modular architecture: logic in hooks, data |
| **[/tanstack-query](skills/tanstack-query/)** | Use when debugging TanStack Query / React Query issues: v4→v5 migration errors (gcTime, isPending, throwOnError), infini |
| **[/tdd](skills/tdd/)** | Use when implementing features, fixing bugs, or adding deliberate test coverage. Enforces test-first (red-green-refactor |
| **[/turborepo](skills/turborepo/)** | Use when making Turborepo monorepo architecture decisions: choosing between monorepo vs polyrepo, deciding when to split |
| **[/write-tests](skills/write-tests/)** | Use when adding or improving test coverage for existing source code without changing production behavior. Selects mock s |


## Agents

Custom agents for specialized tasks. Use with Claude Code's Task tool.

| Agent                                                       | Model  | Purpose                                                          |
| ----------------------------------------------------------- | ------ | ---------------------------------------------------------------- |
| **[mock-debugger](claude/agents/mock-debugger.md)**         | Sonnet | Diagnoses Vitest mock wiring failures — 6 anti-pattern checklist |
| **[security-reviewer](claude/agents/security-reviewer.md)** | Opus   | OWASP Top 10 review with file:line references                    |

### Using Agents

Agents are automatically available when placed in `.claude/agents/`. Claude Code uses them via the Task tool:

```
# In Claude Code, the /review-all skill automatically spawns the security-reviewer agent
# Or reference directly: "Use the mock-debugger agent to diagnose why my tests fail"
```

---

## Hooks

Pre-built automation that runs on Claude Code tool events. See [`claude/hooks/README.md`](claude/hooks/README.md) for full documentation.

### Examples (5 production-ready)

| Hook                  | Trigger               | What It Does                  |
| --------------------- | --------------------- | ----------------------------- |
| `commit-preflight.sh` | Pre-Bash (git commit) | Lint + typecheck staged files |
| `security-scan.sh`    | Pre-Bash (git push)   | Semgrep security scan         |
| `cost-tracker.sh`     | Post-Bash             | Track cloud resource costs    |
| `session-summary.sh`  | Session end           | Log session activity          |
| `file-backup.sh`      | Pre-Edit              | Backup files before editing   |

### Templates (4 starters)

Quick-start templates for building your own hooks: `bash-pre.sh`, `edit-pre.sh`, `session-start.sh`, `user-prompt-submit.sh`.

---

## Configuration

### User-Level Permissions (`claude/settings/`)

Global permissions covering 400+ commands across 30+ categories:

- **Languages**: Node.js, Python, Go, Rust, Java, Ruby, PHP, C/C++, Swift
- **Cloud**: AWS, GCP, Azure, OCI, Cloudflare
- **DevOps**: Docker, Kubernetes, Terraform, Ansible
- **Testing**: Vitest, Jest, Playwright, Cypress
- **Security**: Semgrep, Snyk, Trivy

```bash
# Install global permissions
cp claude/settings/user-level/config.json ~/.config/claude/config.json
```

### Git Workflows (`git-workflow/`)

- 3 workflow strategies (Trunk-Based, GitHub Flow, GitFlow)
- 8 commit templates (Conventional Commits)
- 6 PR templates
- Branch naming conventions

---

## The Pipeline

How the skills work together for a complete feature lifecycle:

```
┌─────────────────────────────────────────────────────────────┐
│                    PLANNING PHASE                           │
│                                                             │
│  /prd ──────────► PRD.md ──────────► /prd --to-plan        │
│  (interactive      (validated         (generates            │
│   discovery)       requirements)       task plan)           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXECUTION PHASE                           │
│                                                             │
│  /orchestrate ──► spawn agent team ──► each agent runs:     │
│  (coordinates      (haiku/sonnet       /implement           │
│   waves)            per task)           (full TDD pipeline)  │
│                                                             │
│  /implement phases:                                         │
│    0. Pre-flight (git clean? types compile? tests green?)   │
│    1. Understand & Plan                                     │
│    2. Bootstrap Mock (1 test to validate wiring)            │
│    3. Red — write failing tests                             │
│    4. Green — minimum implementation                        │
│    5. Scope Guard (revert out-of-scope changes)             │
│    6. Full Suite + Quality Gates                            │
│    7. Commit                                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    REVIEW PHASE                             │
│                                                             │
│  /review-all ──► parallel agents:                           │
│                  • security-reviewer (OWASP Top 10)         │
│                  • API route auditor (schema coverage)      │
│                  • scope auditor (drift detection)          │
│                                                             │
│  /health-check ► types ✓ tests ✓ lint ✓ security ✓         │
│                  dead code ✓ circular deps ✓ audit ✓        │
│                                                             │
│  Verdict: READY TO MERGE / NEEDS FIXES / NEEDS DISCUSSION  │
└─────────────────────────────────────────────────────────────┘
```

---

## Customization

These skills are designed to be adapted to your project. Common customizations:

### Project-Specific Paths

Update file paths in skills to match your project structure:

```markdown
# In skills/health-check/SKILL.md, update workspace paths:

cd apps/api && npx tsc --noEmit → cd src && npx tsc --noEmit
```

### Additional Review Agents

Add project-specific reviewers to `/review-all`:

```markdown
# In skills/review-all/SKILL.md, add to the agent table:

| **DB Reviewer** | `oracle-query-reviewer` (custom) | Changed SQL files | Bind params, atomic ops |
```

### Custom Quality Gates

Extend `/health-check` with project-specific checks:

```markdown
# Add to skills/health-check/SKILL.md:

### 8. OpenAPI Lint

npx spectral lint openapi.json --ruleset .spectral.yaml
```

---

## Repository Structure

```
agentic-tools/
├── README.md
├── install.sh                        # One-command installer
├── LICENSE
│
├── skills/                           # Claude Code skills
│   ├── implement/SKILL.md            # Full TDD pipeline
│   ├── tdd/SKILL.md                  # Test-driven development
│   ├── write-tests/SKILL.md          # Test generation
│   ├── bugfix/SKILL.md               # Autonomous bug fix pipeline
│   ├── migrate/SKILL.md              # Bulk import/module migration
│   ├── review-all/SKILL.md           # Parallel review pipeline
│   ├── health-check/SKILL.md         # Codebase diagnostics
│   ├── prod-readiness/SKILL.md       # 5-agent pre-release review
│   ├── api-audit/SKILL.md            # Route-type contract audit
│   ├── doc-sync/SKILL.md             # Documentation drift
│   ├── phase-kickoff/SKILL.md        # Phase scaffolding
│   ├── prd/                          # PRD management
│   │   ├── SKILL.md
│   │   ├── template.md
│   │   ├── validation.md
│   │   └── drift-prevention.md
│   ├── orchestrate/                  # Multi-agent coordination
│   │   ├── SKILL.md
│   │   ├── wave-template.md
│   │   ├── agent-roles.md
│   │   └── headless-runner.md
│   ├── quality-commit/SKILL.md       # Quality gates + commit
│   ├── humanizer/                    # AI pattern removal
│   ├── firecrawl/                    # Web scraping
│   ├── shadcn-svelte/                # shadcn-svelte patterns
│   ├── tanstack-query/               # TanStack Query v5
│   ├── turborepo/                    # Monorepo patterns
│   └── refactor-module/              # Terraform extraction
│   ├── oracle-idcs-better-auth-setup/   # Oracle + IDCS + Better Auth router
│   ├── fastify-better-auth-bridge/      # Fastify session bridge patterns
│   └── oracle-idcs-org-provisioning/    # IDCS org membership provisioning
│
├── claude/
│   ├── agents/                       # Custom agent definitions
│   │   ├── mock-debugger.md
│   │   └── security-reviewer.md
│   ├── hooks/                        # Hook scripts + templates
│   │   ├── README.md
│   │   ├── examples/                 # 5 production-ready hooks
│   │   └── hook-templates/           # 4 starter templates
│   └── settings/                     # Permission configs
│       ├── user-level/config.json    # 400+ command permissions
│       └── templates/                # Platform-specific configs
│
└── git-workflow/                     # Git strategy guides
    ├── workflows/                    # 3 workflow strategies
    ├── commit-templates/             # 8 conventional commit templates
    ├── pr-templates/                 # 6 PR templates
    └── branch-naming/                # Naming conventions
```

---

## Contributing

Found a missing pattern or have a battle-tested skill? PRs welcome.

1. Follow the existing skill format (YAML frontmatter + markdown body)
2. Include anti-patterns with WHY explanations
3. Keep core content under 300 lines (use progressive disclosure with reference files)
4. Test the skill in a real project before submitting

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

**Legal Disclaimer**: This is an independent community project with no official affiliation, partnership, or endorsement from Anthropic or any other mentioned products or services. References indicate compatibility, not affiliation.

---

**Last Updated**: February 2026
**Claude Code Version**: Compatible with latest CLI
