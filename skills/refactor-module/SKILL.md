---
name: refactor-module
version: 3.0.0
license: MIT
description: |
  Terraform module extraction decision framework. Use when: (1) deciding whether to
  create module vs keep inline, (2) determining module boundaries, (3) avoiding
  over-abstraction, (4) handling state migration.

  NOT a Terraform tutorial. Focuses on the refactoring decision (when to modularize,
  when to keep inline) and anti-patterns that create module sprawl.

  Triggers: terraform module, refactor terraform, module boundaries, when to create
  module, terraform abstraction, module sprawl, state migration.
metadata:
  copyright: Copyright IBM Corp. 2026
  version: "0.0.1"
---

# Terraform Module Refactoring - Decision Expert

**Assumption**: You know Terraform syntax. This covers when to modularize vs keep inline.

---

## Critical Decision: Module vs Inline

```
Considering creating a module?
│
├─ Pattern used once → DON'T modularize (keep inline)
│   └─ Wait for second usage
│      WHY: Premature abstraction harder to change
│
├─ Pattern used 2-3 times → MAYBE modularize
│   ├─ Identical config → Modularize
│   ├─ Similar but different → DON'T (use locals instead)
│   └─ Different teams using → DON'T (coordination overhead)
│
├─ Pattern used 4+ times → Modularize
│   └─ IF config is stable (not changing every sprint)
│      WHY: Module changes require updating all consumers
│
└─ Compliance/security requirement → Modularize
    └─ Enforce standards across teams
       WHY: Module = single source of truth for compliance
```

**The trap**: Over-modularization. Modules add indirection, versioning, testing overhead.

**Rule of thumb**: Resist creating modules until pain of duplication > pain of abstraction.

---

## Anti-Patterns

### ❌ #1: Leaky Abstractions
**Problem**: Module exposes 50 variables, just wrapping resources

```hcl
// ❌ WRONG - 1:1 variable mapping
module "vpc" {
  source = "./modules/vpc"

  cidr_block                           = var.cidr_block
  enable_dns_hostnames                 = var.enable_dns_hostnames
  enable_dns_support                   = var.enable_dns_support
  instance_tenancy                     = var.instance_tenancy
  enable_classiclink                   = var.enable_classiclink
  enable_classiclink_dns_support       = var.enable_classiclink_dns_support
  assign_generated_ipv6_cidr_block     = var.assign_generated_ipv6_cidr_block
  // ... 43 more variables
}

// WHY IT'S BAD: Not abstracting anything, just moving code
```

**Fix**: High-level interface
```hcl
// ✅ CORRECT - meaningful abstraction
module "vpc" {
  source = "./modules/vpc"

  network_config = {
    cidr           = "10.0.0.0/16"
    azs            = ["us-east-1a", "us-east-1b"]
    public_subnets = 2
    private_subnets = 2
  }

  // 4 variables instead of 50
}
```

**Test**: If module variables match resource arguments 1:1, it's not a real abstraction.

### ❌ #2: Premature Modularization
**Problem**: Create module after first usage, becomes wrong abstraction

```hcl
// First usage: Simple S3 bucket
resource "aws_s3_bucket" "data" {
  bucket = "company-data"
}

// Developer: "Let's make this a module!"
// Creates module with 1 user

// Second usage: Needs versioning
// Third usage: Needs replication
// Fourth usage: Needs lifecycle rules
// Fifth usage: Needs encryption

// Result: Module has 30 variables, nobody uses all of them
```

**Fix**: Wait for 2-3 real usages, then extract common pattern
```hcl
// After seeing 3 usages, common pattern emerges:
module "s3_bucket" {
  source = "./modules/s3"

  name = "company-data"
  type = "data" | "logs" | "artifacts"  // 3 known patterns

  // Module handles appropriate defaults per type
}
```

**Rule**: First time: inline. Second time: copy-paste. Third time: abstract.

### ❌ #3: State Migration Nightmare
**Problem**: Refactor to module without planning state migration

```hcl
// Before: Inline resources
resource "aws_vpc" "main" { ... }
resource "aws_subnet" "private" { ... }

// After: Module
module "network" {
  source = "./modules/network"
}

// Result: Terraform wants to destroy old resources, create new ones
// State addresses changed: aws_vpc.main → module.network.aws_vpc.main
```

**Fix**: Move state before deploying
```bash
# Plan the move
terraform state list  # See current addresses

# Move resources into module
terraform state mv aws_vpc.main module.network.aws_vpc.main
terraform state mv aws_subnet.private module.network.aws_subnet.private

# Verify no changes
terraform plan  # Should show: No changes
```

**WARNING**: State moves are dangerous. Always backup state first:
```bash
terraform state pull > backup-$(date +%s).tfstate
```

### ❌ #4: Module Version Hell
**Problem**: 20 consumers on different module versions, breaking changes

```hcl
// app1
module "vpc" { source = "git::...?ref=v1.0.0" }

// app2
module "vpc" { source = "git::...?ref=v1.2.0" }

// app3
module "vpc" { source = "git::...?ref=v2.0.0" }  // Breaking changes

// Need bugfix in v1.x but already on v2.x
// Result: Maintain 3 versions or force painful upgrades
```

**Fix**: Semantic versioning + deprecation period
```hcl
// v1.x: Stable, bug fixes only
// v2.x: New features, maintains v1 compatibility mode
// v3.x: Remove deprecated features

// v2 module supports both:
variable "legacy_mode" {
  default = false  // New consumers get new behavior
}

// Gives consumers 6 months to migrate
```

**Rule**: Breaking changes require major version + migration guide.

---

## Decision Frameworks

### When to Extract Common Code

```
Have repeated Terraform code?
│
├─ Repeated data sources → Use locals (NOT module)
│   └─ data "aws_ami" { ... } appears 3 times
│      WHY: Data sources don't benefit from modules
│
├─ Repeated resource patterns → Check usage count
│   ├─ 1 usage → Keep inline
│   ├─ 2-3 usages → Use locals or workspaces
│   └─ 4+ usages → Consider module
│
└─ Compliance requirement → Module immediately
    └─ Must enforce security standards
       WHY: Module = single compliance enforcement point
```

### Module Boundaries

```
Where to draw module boundary?
│
├─ By lifecycle → Good boundary
│   └─ VPC (rarely changes) vs EC2 (often changes)
│      WHY: Separate change frequencies
│
├─ By team ownership → Good boundary
│   └─ Team A owns networking, Team B owns compute
│      WHY: Clear ownership and responsibility
│
├─ By technology → Bad boundary
│   └─ "Database module", "Compute module", "Network module"
│      WHY: Real apps need cross-cutting concerns
│
└─ By Terraform resource type → Bad boundary
    └─ aws_vpc module, aws_subnet module, aws_route_table module
       WHY: Too granular, loses cohesion
```

**Good module**: VPC + subnets + route tables + NAT gateway (cohesive networking unit)
**Bad module**: Just VPC (consumer has to wire up subnets manually)

---

## Module Design Patterns

### Pattern 1: Composition (Preferred)
```hcl
// Small, focused modules
module "vpc" { ... }
module "eks" {
  vpc_id = module.vpc.id  // Compose modules
}
module "rds" {
  subnet_ids = module.vpc.private_subnet_ids
}
```

**Benefit**: Mix and match, replace parts independently.

### Pattern 2: Monolithic (Avoid)
```hcl
// One module does everything
module "infrastructure" {
  // Creates VPC + EKS + RDS + everything
}
```

**Problem**: Can't replace just VPC, all-or-nothing.

**When monolithic is OK**: Compliance module that must enforce standards together.

---

## Refactoring Process

### Step 1: Identify Duplication (Don't Rush)
```bash
# Find repeated patterns
grep -r "resource \"aws_s3_bucket\"" .
# If 1-2 results: keep inline
# If 3+ results: analyze differences
```

### Step 2: Validate True Duplication
```bash
# Are configs actually identical?
diff app1/s3.tf app2/s3.tf

# If > 50% different: NOT true duplication
# Solution: locals or data sources, not module
```

### Step 3: Design Module Interface
```hcl
// ❌ WRONG - expose every resource argument
variable "acl" {}
variable "versioning" {}
variable "lifecycle_rules" {}
variable "replication" {}
// ... 20 more variables

// ✅ CORRECT - expose intent
variable "bucket_type" {
  type = string
  validation {
    condition = contains(["data", "logs", "artifacts"], var.bucket_type)
  }
}

// Module maps type to appropriate settings
```

### Step 4: Extract + Test
```bash
# Create module
mkdir -p modules/s3
mv s3.tf modules/s3/main.tf

# Test in isolation
cd modules/s3
terraform init
terraform plan -var bucket_type=data
```

### Step 5: Migrate State (Critical)
```bash
# Backup state
terraform state pull > backup.tfstate

# Move resources
terraform state mv aws_s3_bucket.data module.s3.aws_s3_bucket.main

# Verify
terraform plan  # Should show: No changes
```

---

## When to Load Full Reference

**LOAD `references/state-migration.md` when:**
- Need detailed state migration procedures
- Complex multi-resource module extraction

**LOAD `references/module-testing.md` when:**
- Setting up automated module tests
- Terratest patterns

**Do NOT load references** for refactoring decisions - use this framework.

---

## Resources

- **Official Docs**: https://developer.hashicorp.com/terraform/language/modules (for syntax)
- **This Skill**: When to modularize, module boundaries, anti-patterns
