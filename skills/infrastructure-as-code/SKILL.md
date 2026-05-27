---
name: infrastructure-as-code
description: "Use when the user asks to \"Terraform state on OCI\", \"native OCI backend\", \"Terraform import OCI\", \"Terraform apply 403\", \"Terraform ZPR\", or \"Terraform Bastion\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "Terraform"
  - "terraform-provider-oci"
  - "native OCI backend"
  - "Terraform state"
  - "Resource Manager"
  - "Terraform import"
  - "moved block"
  - "provider pinning"
  - "government cloud Terraform"
  - "OCI Terraform auth"
  - "OCI module quality"
  - "Terraform ZPR"
  - "Terraform Bastion"
aliases:
  - "oci-terraform"
  - "oci-iac"
  - "terraform-oci"
domains:
  - "oci"
  - "iac"
---
# OCI Terraform Hub

Use this skill as the canonical router for Terraform and OpenTofu-style OCI infrastructure work. Keep high-drift provider, backend, region, and cost facts in references and verify official docs before giving current claims.

## When to Use

Load this skill for: the user asks to "Terraform state on OCI", "native OCI backend", "debug terraform-provider-oci", "Terraform import OCI", "OCI Terraform auth", "OCI module quality", "government cloud Terraform", "Terraform apply 403", or "build OCI IaC".

Also load it when Terraform touches an OCI sibling domain, then load the sibling skill only for that domain detail:

| Terraform task | Also load |
| --- | --- |
| Resource Manager stack, job, source provider, or private endpoint | `oci/oci-resource-manager` |
| ZPR policy, security attributes, or protected resources | `oci/zpr-security` |
| Bastion, Managed SSH, port forwarding, or allowlists | `oci/managed-bastion-access` |
| VCN, subnet, route table, DRG, Service Gateway, NAT Gateway | `networking-management` |
| IAM policy, identity domain, dynamic group, 403/404 | `iam-identity-management` |
| Vault secret, wallet, password, private key, sensitive output | `secrets-management` |
| Capacity, quota, shape, boot volume, instance principal | `compute-management` |
| Estimate, budget, Resource Scheduler, egress, quota cost | `finops-cost-optimization` |

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or pure Oracle service operations without Terraform. Use `oci` for OCI skill-pack routing and `best-practices` for broad OCI architecture triage.

## NEVER Do This

**NEVER default new Terraform state on OCI to S3-compatible Object Storage.**
For Terraform v1.12 and later, prefer the native `backend "oci"` with Object Storage, state locking, and bucket versioning. Use S3-compatible Object Storage only as a legacy fallback when the target Terraform runtime cannot use the native OCI backend.

**NEVER put credentials, generated passwords, wallets, or private keys in durable state by accident.**
`sensitive = true` redacts CLI/UI output but does not remove values from state or plan files. Prefer passing secret OCIDs, letting workloads retrieve secrets at runtime, and using Terraform ephemeral or write-only features only when the Terraform version and OCI provider/resource support them.

**NEVER treat Resource Manager as just "Terraform in the console."**
Resource Manager owns stack state, job execution, variables, provider retrieval, source providers, private endpoints, and IAM behavior. Route those cases to `oci/oci-resource-manager`.

**NEVER diagnose `Terraform apply gets 403` before identifying the caller.**
Decide whether the caller is a local API key user, session-token profile, CI principal, instance principal, resource principal, Resource Manager job/user, or OKE workload identity. Then check policy location, principal type, verb, resource family, and compartment scope.

**NEVER trust an Oracle-branded Terraform module just because it is official.**
Check release recency, provider constraints, issue activity, examples, supported resources, sensitive outputs, generated plan shape, and upgrade path before recommending any module.

**NEVER automate ZPR or Bastion as a shortcut around rollout safety.**
ZPR can block traffic when attributes are applied before policy, and Bastion Terraform can widen client allowlists or leak keys into state. Load the focused references before writing HCL.

**NEVER hardcode tenancy-specific values unless the deployment contract requires it.**
Avoid hardcoded availability-domain names, compartment OCIDs, subnet IDs, region domains, and provider endpoints. Query or inject them as variables/data sources and document the owning tenancy boundary.

## Decision Rules

### State backend

1. Terraform v1.12+ and normal team collaboration: use native `backend "oci"`.
2. Resource Manager stack: let Resource Manager manage state; do not force a local backend into the stack.
3. Terraform older than v1.12 or constrained runtime: use S3-compatible Object Storage only as a documented legacy fallback.
4. Local state: use only for disposable experiments; never for team or production state.

### Auth

Choose auth by execution context, not habit:

| Context | Default direction |
| --- | --- |
| Local laptop | API key profile or short-lived security token profile |
| GitHub Actions / external CI | Approved federation/OIDC if configured; otherwise tightly scoped API key secret |
| OCI DevOps | Service/resource principal with dynamic group policies |
| Resource Manager | Region-only provider block; stack/user/job IAM handled by Resource Manager |
| Compute instance | `auth = "InstancePrincipal"` with matching dynamic group and policies |
| Function or supported OCI service | `auth = "ResourcePrincipal"` |
| OKE workload | `auth = "OKEWorkloadIdentity"` when supported |

### Adoption and drift

Prefer provider pinning, `terraform import`, import blocks, moved blocks, lifecycle review, and official import IDs. Treat delete/recreate as a last resort after confirming data-loss, replacement, and downtime risk.

### Realms and regions

Verify region identifier, realm domain, service availability, Resource Manager availability, FIPS requirements, and dedicated endpoint settings before writing Terraform for government, defense, dedicated, or sovereign environments.

## Reference Loading

Load only the narrow reference needed for the task:

- [`references/oci-terraform-state-backends.md`](references/oci-terraform-state-backends.md) for native OCI backend, S3 fallback, locking, state versioning, and backend credential safety.
- [`references/oci-terraform-auth-matrix.md`](references/oci-terraform-auth-matrix.md) for local, CI, OCI DevOps, Resource Manager, Compute, Cloud Shell, resource principal, and OKE auth choices.
- [`references/oci-terraform-secrets-state.md`](references/oci-terraform-secrets-state.md) for state leakage, sensitive values, generated passwords, wallets, private keys, Vault, and outputs.
- [`references/oci-terraform-import-drift.md`](references/oci-terraform-import-drift.md) for imports, moved blocks, provider pinning, eventual consistency, and adoption of existing resources.
- [`references/oci-terraform-module-quality.md`](references/oci-terraform-module-quality.md) for official-module review and stale-module detection.
- [`references/oci-terraform-realms-regions.md`](references/oci-terraform-realms-regions.md) for government cloud, realms, FIPS, dedicated endpoints, and region availability.
- [`references/oci-terraform-zpr.md`](references/oci-terraform-zpr.md) for ZPR policy, security attributes, provider support, imports, and lockout-safe sequencing.
- [`references/oci-terraform-bastion.md`](references/oci-terraform-bastion.md) for Bastion resources, sessions, allowlists, IAM, key-state safety, and no-public-SSH guardrails.
- [`references/oci-terraform-patterns.md`](references/oci-terraform-patterns.md) only for the official source map and compact cross-reference list.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, Terraform version, execution context, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
