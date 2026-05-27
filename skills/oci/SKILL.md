---
name: oci
description: "Use when the user asks to \"find OCI skills\", \"route Oracle Cloud work\", \"install the OCI skill pack\", \"review OCI skill ownership\", or \"separate Oracle skills\"."
version: 1.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "Oracle"
  - "skill pack"
  - "skill routing"
  - "separation of duties"
  - "ownership"
  - "architecture"
  - "operations"
  - "manifest"
aliases:
  - "oci-skills"
  - "oracle-skills"
  - "oci-skill-pack"
domains:
  - "oci"
  - "oracle"
  - "skill-pack"
---
# OCI Skill Pack

Use this skill as the ownership and routing boundary for OCI and Oracle-related skills in this repository. All OCI and Oracle-related specialist skills live under `skills/oci/<skill-name>/` and are registered as `oci/<skill-name>` skill IDs.

## When to Use

Load this skill for: the user asks to "find OCI skills", "route Oracle Cloud work", "install the OCI skill pack", "review OCI skill ownership", or "separate Oracle skills".

Use it when the task is about skill governance, ownership, packaging, discovery, or choosing which OCI specialist skill should handle the work.

## Do NOT load this skill when

Do not load this skill for a narrow OCI task that already maps to one specialist skill. Load that specialist skill directly:

| User intent | Load |
| --- | --- |
| Broad OCI architecture review or migration triage | `oci/best-practices` |
| Compute instances, shapes, capacity, boot volumes | `oci/compute-management` |
| VCN, DRG, FastConnect, VPN, NSG, Service Gateway | `oci/networking-management` |
| IAM policies, identity domains, dynamic groups, IDCS | `oci/iam-identity-management` |
| Autonomous AI Database, ADB wallet, SQLcl, ECPU | `oci/oracle-dba` |
| OCI DB Systems, PDB/CDB lifecycle, DB provisioning | `oci/database-management` |
| Terraform, native OCI backend, provider auth, import, drift | `oci/infrastructure-as-code` |
| Resource Manager stacks, jobs, source providers, private endpoints | `oci/oci-resource-manager` |
| Broad OCI security control routing, Cloud Guard vs Security Zones, ZPR vs NSG | `oci/oci-security-control-plane` |
| Zero Trust Packet Routing, ZPR security attributes, ZPL policy | `oci/zpr-security` |
| OCI Bastion, Managed SSH, port forwarding, client CIDR allowlists | `oci/managed-bastion-access` |
| Landing zones, compartments, Security Zones, Cloud Guard | `oci/landing-zones` |
| Monitoring, alarms, MQL, Service Connector | `oci/monitoring-operations` |
| Billing, budgets, egress, Resource Scheduler savings | `oci/finops-cost-optimization` |
| Vault, KMS, secret rotation, secret replication | `oci/secrets-management` |
| OCI Generative AI, model catalog, RAG, rate limits | `oci/genai-services` |
| Events rules, CloudEvents, Functions, Streaming, Notifications | `oci/oci-events` |
| Oracle-branded PPTX and slide decks | `oci/oci-pptx` |

## Separation of Duties

Treat [`manifest.json`](manifest.json) as the canonical inventory of Oracle-related skills in this repo. It separates the set into:

- Core OCI operations skills: skills that operate OCI services and should be reviewed for Oracle documentation drift.
- Oracle-adjacent skills: skills that touch Oracle identity, database migration, branded presentations, or app integration but are not core OCI operations.
- Router and compatibility skills: skills kept for discovery, migration, or backward-compatible naming.

## NEVER Do This

- NEVER add an OCI or Oracle-related specialist outside `skills/oci/<skill-name>/`.
- NEVER add an OCI specialist under `skills/oci/<skill-name>/` without registering the `oci/<skill-name>` skill ID in the manifest, CLI, installer, README tables, and validation coverage.
- NEVER duplicate service-specific instructions in this pack. Route to the owning specialist skill so high-drift facts have one owner.
- NEVER add an Oracle-related skill without updating `skills/oci/manifest.json`, `bin/cli.js`, `install.sh`, `README.md`, and `skills/README.md`.
- NEVER treat this pack as current Oracle service documentation. Use the relevant specialist skill and verify drift-prone facts against official Oracle docs.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or ownership question. When empty, infer whether the user needs skill routing, governance, or installation guidance from the current repository context.
