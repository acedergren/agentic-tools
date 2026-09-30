---
name: best-practices
description: "Use when the user asks to \"review OCI architecture\", \"avoid OCI anti-patterns\", \"plan an Oracle Cloud migration\", \"evaluate OCI Well-Architected risks\", or \"choose which OCI skill applies\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "architecture review"
  - "Well-Architected"
  - "migration"
  - "anti-patterns"
  - "landing zone"
  - "VCN"
  - "IAM"
  - "Cloud Guard"
  - "Bastion"
  - "ZPR"
aliases:
  - "oci-architecture-review"
  - "oci-router"
  - "oci-best-practices"
domains:
  - "oci"
  - "architecture"
---
# OCI Architecture Review Router

Use this skill as the entry point for broad OCI architecture reviews, migration triage, and "which OCI skill applies?" decisions. Keep service-specific facts in the narrower skills so high-drift guidance has one owner.

## When to Use

Load this skill for: the user asks to "review OCI architecture", "avoid OCI anti-patterns", "plan an Oracle Cloud migration", "evaluate OCI Well-Architected risks", or "choose which OCI skill applies".

Use it first when the request spans more than one OCI domain or the correct specialist skill is unclear.

## Do NOT load this skill when

Do not load this skill for a narrow, already-identified service task:

| User intent | Load instead |
| --- | --- |
| VCN, subnet, peering, DRG, VPN, FastConnect | `oci/networking-management` |
| IAM policy, identity domain, dynamic group, 403/404 auth | `oci/iam-identity-management` |
| Landing zone, compartments, Security Zones, Cloud Guard recipes | `oci/landing-zones` |
| Terraform, Resource Manager, state, imports, drift | `oci/infrastructure-as-code` |
| Compute shapes, capacity, boot volumes, instance principals | `oci/compute-management` |
| Autonomous AI Database control plane: provisioning, ECPU billing, wallet, backups, clones | `oci/oracle-dba` |
| SQL, SQLcl, tuning, database security inside Oracle DB | Oracle's `oracle/skills` `db` pack (not in this repo) |
| Billing, egress, budgets, Resource Scheduler savings | `oci/finops-cost-optimization` |
| Vault secrets, KMS, rotation, secret replication | `oci/secrets-management` |
| OCI Generative AI, model choice, RAG, rate limits | Oracle's official `oracle/skills` pack (`oci/enterprise-ai`) — not in this repo |
| Events rules, CloudEvents, Functions, Streaming, Notifications | `oci/oci-events` |
| ZPR, Bastion, Cloud Guard vs Security Zones, security-control routing | `oci/oci-security-control-plane` |


## OCI Is Not AWS

Habits that break when people bring AWS mental models to OCI. Each row is owned in depth by the linked skill.

| AWS habit | OCI reality | Owner |
| --- | --- | --- |
| Accounts/OUs as the isolation boundary | Compartments (nested, up to the tenancy) are the IAM and billing boundary; policies attached to a compartment inherit to all subcompartments | `landing-zones`, `iam-identity-management` |
| IAM JSON with Allow/Deny, attached to principals or resources | Text statements, **allow only** (no deny), attached to a compartment/tenancy: `Allow group 'Domain'/'Group' to <verb> <resource> in compartment X` | `iam-identity-management` |
| Condition operators like `StringLike` | Only `=` / `!=` with `/pattern*/`; case-insensitive; `=~` is MQL, not IAM | `iam-identity-management` |
| Tags in any policy condition | Only **defined** tags (namespace.key) work in policies and dynamic-group rules; freeform tags don't | `iam-identity-management` |
| Instance roles | Dynamic groups (matching rules) + policy → instance/resource principals | `iam-identity-management` |
| `AccessDenied` tells you it's permissions | `404 NotAuthorizedOrNotFound` is deliberately ambiguous — check policy before assuming the OCID is wrong | `iam-identity-management` |
| NACLs are stateless; SGs stateful | Security lists (per subnet, max 5) are **stateful by default**; NSGs (max 5 per VNIC) are the SG analogue | `networking-management` |
| Subnets live in one AZ, 5 reserved IPs | Subnets are normally **regional** (span ADs); 3 reserved IPs | `networking-management` |
| NAT Gateway and VPN bill per hour + per GB | NAT gateway, DRG and Site-to-Site VPN have no hourly SKU; first 10 TB/month outbound data is free in most regions (price list, 2026-09-30) | `networking-management`, `finops-cost-optimization` |
| Gateway endpoints per service | One Service Gateway reaches all Oracle Services Network public endpoints (or Object Storage only) | `networking-management` |
| CloudWatch `treatMissingData`, metric math | Monitoring MQL: `absent()` for missing data, `--pending-duration` for trigger delay, `groupBy()`, `=~` dimension match | `monitoring-operations` |
| Aurora/RDS auto scaling with a max | ADB compute auto scaling goes up to 3x base ECPU with **no configurable cap** | `oracle-dba` |
| Budgets actions can stop spend | OCI budgets only alert; enforce with quotas and Resource Scheduler | `finops-cost-optimization` |
| Region names in policies | IAM `request.region` uses 3-letter keys (`ARN`, `FRA`, `IAD`); quotas use region names | `iam-identity-management` |
| AZ names are stable strings | AD names carry a tenancy-specific prefix (`fMgC:EU-FRANKFURT-1-AD-1`); query them, don't hardcode | `compute-management` |

Last verified: 2026-09-30 (docs.oracle.com IAM, networking, Monitoring MQL, ADB auto scaling; Oracle price list API).

## Architecture Review Flow

1. Identify the workload boundary: tenancy, compartments, regions, network topology, identity model, data stores, and automation surface.
2. Route each domain to the owner skill above before giving service-specific guidance.
3. Check cross-cutting risks: region/realm support, IAM blast radius, network overlap, private connectivity, data residency, logging/monitoring, cost controls, backup/DR, and supportability.
4. Verify drift-prone facts against current Oracle docs before quoting limits, prices, model catalogs, or service availability.

## NEVER Do This

- NEVER treat this router as the source of truth for pricing, model catalogs, quotas, or service limits. Route to the owner skill and verify current Oracle docs.
- NEVER repeat detailed service guidance here when a narrower skill owns it.
- NEVER state that VCN CIDRs are simply immutable. Oracle supports adding and modifying VCN CIDR ranges with restrictions; the architecture risk is poor upfront address planning and overlap.
- NEVER enable Cloud Guard or Security Zone responders in production before testing the exact recipe and automation impact in a lower environment.
- NEVER hardcode tenancy-specific availability-domain names; query them from OCI APIs or Terraform data sources.

## Hot Word Routing

| Hot words | Route |
| --- | --- |
| `OCI VCN`, `DRG`, `FastConnect`, `Service Gateway`, `NSG` | `oci/networking-management` |
| `identity domain`, `IDCS`, `dynamic group`, `policy`, `403` | `oci/iam-identity-management` |
| `ADB`, `Autonomous AI Database`, `wallet`, `ECPU` | `oci/oracle-dba` |
| `Vault`, `KMS`, `secret rotation`, `BASE64`, `replication` | `oci/secrets-management` |
| `OCI GenAI`, `Command A`, `Llama`, `Gemini`, `gpt-oss`, `RAG` | Oracle's official `oracle/skills` pack (`oci/enterprise-ai`) — not in this repo |
| `Events`, `CloudEvents`, `Functions`, `Streaming`, `Notifications` | `oci/oci-events` |
| `Terraform`, `Resource Manager`, `state`, `import`, `drift` | `oci/infrastructure-as-code` |
| `ZPR`, `Zero Trust Packet Routing`, `Bastion`, `Managed SSH`, `security control` | `oci/oci-security-control-plane` |

## Reference Files

Load [`references/oci-well-architected-checklist.md`](references/oci-well-architected-checklist.md) only when the user asks for a formal OCI architecture review checklist, CIS-style review, or cross-domain risk assessment. Do not load it for narrow service questions.

## Arguments

$ARGUMENTS: Optional architecture scope, workload name, target environment, migration source, or review objective. When empty, infer the narrowest safe review scope from the conversation and route to specialist skills before making service-specific claims.
