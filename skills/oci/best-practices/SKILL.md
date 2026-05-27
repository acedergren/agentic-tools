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
| Autonomous AI Database / ADB operations, SQLcl, wallet, ECPU tuning | `oci/oracle-dba` |
| Billing, egress, budgets, Resource Scheduler savings | `oci/finops-cost-optimization` |
| Vault secrets, KMS, rotation, secret replication | `oci/secrets-management` |
| OCI Generative AI, model choice, RAG, rate limits | `oci/genai-services` |
| Events rules, CloudEvents, Functions, Streaming, Notifications | `oci/oci-events` |
| ZPR, Bastion, Cloud Guard vs Security Zones, security-control routing | `oci/oci-security-control-plane` |

When the request is only asking to find or install skills, use `find-skills` instead.

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
| `ADB`, `Autonomous AI Database`, `wallet`, `SQLcl`, `ECPU` | `oci/oracle-dba` |
| `Vault`, `KMS`, `secret rotation`, `BASE64`, `replication` | `oci/secrets-management` |
| `OCI GenAI`, `Command A`, `Llama`, `Gemini`, `gpt-oss`, `RAG` | `oci/genai-services` |
| `Events`, `CloudEvents`, `Functions`, `Streaming`, `Notifications` | `oci/oci-events` |
| `Terraform`, `Resource Manager`, `state`, `import`, `drift` | `oci/infrastructure-as-code` |
| `ZPR`, `Zero Trust Packet Routing`, `Bastion`, `Managed SSH`, `security control` | `oci/oci-security-control-plane` |

## Reference Files

Load [`references/oci-well-architected-checklist.md`](references/oci-well-architected-checklist.md) only when the user asks for a formal OCI architecture review checklist, CIS-style review, or cross-domain risk assessment. Do not load it for narrow service questions.

## Arguments

$ARGUMENTS: Optional architecture scope, workload name, target environment, migration source, or review objective. When empty, infer the narrowest safe review scope from the conversation and route to specialist skills before making service-specific claims.
