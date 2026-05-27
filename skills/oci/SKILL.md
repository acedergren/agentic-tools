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

Use this skill as the ownership and routing boundary for OCI and Oracle-related skills in this repository. It exists to make Oracle Cloud skills distinct from the general-purpose development skills while preserving the top-level skill folders required by current install tooling.

## When to Use

Load this skill for: the user asks to "find OCI skills", "route Oracle Cloud work", "install the OCI skill pack", "review OCI skill ownership", or "separate Oracle skills".

Use it when the task is about skill governance, ownership, packaging, discovery, or choosing which OCI specialist skill should handle the work.

## Do NOT load this skill when

Do not load this skill for a narrow OCI task that already maps to one specialist skill. Load that specialist skill directly:

| User intent | Load |
| --- | --- |
| Broad OCI architecture review or migration triage | `best-practices` |
| Compute instances, shapes, capacity, boot volumes | `compute-management` |
| VCN, DRG, FastConnect, VPN, NSG, Service Gateway | `networking-management` |
| IAM policies, identity domains, dynamic groups, IDCS | `iam-identity-management` |
| Autonomous AI Database, ADB wallet, SQLcl, ECPU | `oracle-dba` |
| OCI DB Systems, PDB/CDB lifecycle, DB provisioning | `database-management` |
| Terraform, Resource Manager, OCI state, drift | `infrastructure-as-code` |
| Landing zones, compartments, Security Zones, Cloud Guard | `landing-zones` |
| Monitoring, alarms, MQL, Service Connector | `monitoring-operations` |
| Billing, budgets, egress, Resource Scheduler savings | `finops-cost-optimization` |
| Vault, KMS, secret rotation, secret replication | `secrets-management` |
| OCI Generative AI, model catalog, RAG, rate limits | `genai-services` |
| Events rules, CloudEvents, Functions, Streaming, Notifications | `oci-events` |
| Oracle-branded PPTX and slide decks | `oci-pptx` |

## Separation of Duties

Treat [`manifest.json`](manifest.json) as the canonical inventory of Oracle-related skills in this repo. It separates the set into:

- Core OCI operations skills: skills that operate OCI services and should be reviewed for Oracle documentation drift.
- Oracle-adjacent skills: skills that touch Oracle identity, database migration, branded presentations, or app integration but are not core OCI operations.
- Router and compatibility skills: skills kept for discovery, migration, or backward-compatible naming.

## NEVER Do This

- NEVER move OCI specialist skills under `skills/oci/<skill-name>/` unless the installer, external skill publishing flow, docs, and validation scripts support nested skills.
- NEVER duplicate service-specific instructions in this pack. Route to the owning specialist skill so high-drift facts have one owner.
- NEVER add an Oracle-related skill without updating `skills/oci/manifest.json`, `bin/cli.js`, `install.sh`, `README.md`, and `skills/README.md`.
- NEVER treat this pack as current Oracle service documentation. Use the relevant specialist skill and verify drift-prone facts against official Oracle docs.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or ownership question. When empty, infer whether the user needs skill routing, governance, or installation guidance from the current repository context.
