---
name: database-management
description: "Use when the user asks to \"create an OCI database\", \"choose DB System vs ADB\", \"manage PDB lifecycle\", \"route ADB work\", or \"plan Oracle database provisioning\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Database"
  - "Autonomous AI Database"
  - "ADB"
  - "DB System"
  - "PDB"
  - "CDB"
  - "wallet"
  - "ECPU"
  - "OCPU"
aliases:
  - "oci-database-router"
  - "database-management"
domains:
  - "oci"
  - "database"
---
# OCI Database Router

Use this compatibility skill to choose the correct Oracle database lane. Keep detailed Autonomous AI Database operations in `oracle-dba` and DB Systems details in the reference files.

## When to Use

Load this skill for: the user asks to "create an OCI database", "choose DB System vs ADB", "manage PDB lifecycle", "route ADB work", or "plan Oracle database provisioning".

Use it when the database type is unclear or when the request mixes Autonomous AI Database, DB Systems, Exadata, PDB/CDB, licensing, and provisioning decisions.

## Do NOT load this skill when

Do not use this router for already-narrow ADB operations such as wallet failures, SQL tuning, ECPU scaling, backups, clones, or stop/start cost analysis. Load `oracle-dba` directly.

Do not load this skill for unrelated general programming, non-Oracle databases, or skill discovery requests.

## Routing Decision

| User intent | Load |
| --- | --- |
| Autonomous AI Database, ADB, ATP/ADW, wallet, SQLcl, ECPU, wait events | `oracle-dba` |
| OCI DB Systems, VM DB, Bare Metal DB, RAC, Exadata, PDB/CDB lifecycle | `database-management` plus `references/oci-dbcs-cli.md` |
| Database network path, private endpoint, NSG, Service Gateway | `networking-management` |
| IAM policy or dynamic group for database automation | `iam-identity-management` |
| Terraform or Resource Manager database provisioning | `infrastructure-as-code` |
| Database billing, stopped-resource cost, Resource Scheduler | `finops-cost-optimization` |

## NEVER Do This

- NEVER duplicate detailed ADB guidance here. Route to `oracle-dba` so ECPU, wallet, backup, service-name, and billing guidance has one owner.
- NEVER quote static database prices or Always Free limits from memory. Verify current Oracle pricing and Free Tier docs before giving numbers.
- NEVER delete a container database, DB System, or Exadata resource without enumerating dependent PDBs and backups first.
- NEVER assume stopped database resources have no cost. CPU billing can stop, but storage, backups, licenses, or retained resources may continue depending on service and configuration.

## DB Systems / PDB Gotchas

```
DB System or Exadata
└─ Container Database (CDB)
   └─ Pluggable Database (PDB)  <- Application connects here
```

Connect applications to the PDB service, not the CDB root service. Before unplugging or deleting a PDB/CDB, verify the lifecycle operation, retained files, backup impact, and billing behavior for the exact database service.

## Reference Files

Load [`references/oci-dbcs-cli.md`](references/oci-dbcs-cli.md) only when the task is about DB Systems, RAC, Exadata, PDB/CDB lifecycle, patching, maintenance, or Data Guard outside Autonomous AI Database.

For Autonomous AI Database or ADB work, load `oracle-dba` instead of this reference.

## Arguments

$ARGUMENTS: Optional database type, OCID, environment, symptom, provisioning target, or migration source. When empty, first identify whether the work is Autonomous AI Database, DB Systems, or Exadata before giving implementation guidance.
