---
name: refactor-module
description: "Use when deciding whether to extract Terraform code into a reusable module, determining module boundaries, or migrating state after modularization. Covers the refactoring decision (modularize vs inline), anti-patterns causing module sprawl, and state migration risk. Keywords: terraform module, refactor terraform, module boundaries, terraform abstraction, module sprawl, state migration, terraform state mv."
---

# Terraform Module Refactoring - Decision Expert

**Assumption**: You know Terraform syntax. This covers when to modularize vs keep inline.

## NEVER

- Never modularize on first usage — wait for the third real instance; premature abstraction locks in the wrong seam.
- Never expose module variables 1:1 with resource arguments — that's not abstraction, it's indirection (the Leaky Abstraction trap).
- Never refactor inline resources to a module without running `terraform state mv` first — Terraform will plan to destroy and recreate every resource.
- Never create a module for frequently-changing code — module API changes cascade across all consumers.
- Never skip `terraform state pull > backup.tfstate` before any state migration.

## The Core Decision

```
Considering creating a module?
│
├─ Used once → NEVER modularize (keep inline, wait for third)
│   WHY: Premature abstraction = wrong seam baked in early
│
├─ Used 2–3 times → MAYBE
│   ├─ >80% identical config → modularize
│   ├─ <50% identical → use locals instead
│   └─ Different teams → DON'T (coordination overhead > benefit)
│
├─ Used 4+ times → Modularize IF config stable (not changing every sprint)
│   WHY: Module changes = N consumer PRs; unstable API kills teams
│
└─ Compliance/security requirement → Modularize immediately
    WHY: Module = single enforcement point across all consumers
```

**Break-even**: Module worth it at 4+ identical usages + stable API + compliance need.
**Time cost**: Simple module = 2 hours. Complex with state migration = 2 days planning + 4 hours execution.

## Before Extracting: Strategic Check

| Question | Threshold | Decision |
|---|---|---|
| How many usages? | <3 | Keep inline |
| How identical? | <50% same | Use locals, not module |
| Change frequency | Weekly | DON'T (unstable API) |
| Test coverage | <50% | TOO RISKY (breaking changes uncaught) |
| Consumer count | 10+ | Every change = 10 PRs, plan migration carefully |

## Anti-Patterns

### Leaky Abstraction (most common)
**Signal**: Module variables match resource arguments 1:1 (50 variables for a VPC module).

**Fix**: Expose *intent*, not resource config:
```hcl
// Instead of 50 variables:
variable "network_config" {
  type = object({ cidr = string, azs = list(string), public_subnets = number, private_subnets = number })
}
```

**Test**: "Does the module consumer need AWS VPC knowledge to use this?" YES = leaky abstraction.

### State Migration Trap (most dangerous)
Moving inline resources into a module changes state addresses:
`aws_vpc.main` → `module.network.aws_vpc.main`

Terraform reads this as "destroy old, create new" — **no warning, identical config, production outage**.

```bash
# Always: backup → move → verify
terraform state pull > backup-$(date +%s).tfstate
terraform state mv aws_vpc.main module.network.aws_vpc.main
terraform plan  # MUST show: No changes
```

**Load `references/error-recovery.md`** if already applied and resources were destroyed.

### Module Version Hell
**Signal**: `grep -r 'source.*?ref=' . | sort | uniq -c` shows 3+ active versions.

**Fix**: Breaking changes require major version + 6-month deprecation + migration guide. Or eliminate versions entirely with monorepo workspace protocol.

## Module Boundaries

```
Where to draw the boundary?
│
├─ By lifecycle → GOOD (VPC rarely changes vs EC2 often changes)
├─ By team ownership → GOOD (clear responsibility)
├─ By technology type → BAD ("database module" cuts across concerns)
└─ By resource type → BAD (aws_vpc module alone loses cohesion)
```

**Good**: VPC + subnets + route tables + NAT gateway (one cohesive networking unit)
**Bad**: Just VPC (consumer must wire subnets manually)

Prefer **composition** (small focused modules wired together) over **monolithic** (one module creates everything). Exception: compliance modules that must enforce standards together.

## Refactoring Checklist

1. `grep -r "resource \"aws_s3_bucket\"" .` — confirm 3+ usages before touching anything
2. `diff app1/s3.tf app2/s3.tf` — confirm >80% identical, not superficially similar
3. Design interface around *intent* (`bucket_type = "data"|"logs"|"artifacts"`), not resource args
4. `terraform state pull > backup.tfstate` — always before state moves
5. `terraform state mv <old-address> <new-address>` — one resource at a time
6. `terraform plan` — must show "No changes" before proceeding

## When to Load References

**Load `references/error-recovery.md`** when:
- State migration already applied and caused destroy/recreate
- Module has grown to 10+ boolean toggles and needs redesign
- Multiple module versions causing maintenance coordination problems

**Do NOT load** for:
- Basic modularization decisions (use Core Decision tree above)
- Single resource state moves (use Refactoring Checklist above)
- Terraform syntax help (see official docs)
