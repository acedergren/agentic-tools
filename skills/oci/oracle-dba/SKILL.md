---
name: oracle-dba
description: "Use when the user asks to \"provision Autonomous AI Database\", \"estimate ADB ECPU cost\", \"configure ADB auto scaling\", \"fix ADB wallet or mTLS connection\", or \"manage ADB backups and clones\"."
version: 3.0.0
keywords:
  - "Autonomous AI Database"
  - "ADB"
  - "ECPU"
  - "auto scaling"
  - "wallet"
  - "mTLS"
  - "long-term backup"
  - "refreshable clone"
  - "oci db autonomous-database"
aliases:
  - "autonomous-database"
  - "oracle-autonomous-database"
  - "adb"
domains:
  - "oracle"
  - "database"
---
# Autonomous AI Database: Control-Plane Operations

Scope: the OCI side of **Autonomous AI Database Serverless** — provisioning, ECPU and storage billing,
auto scaling, stop/start, wallets and network access, backups, clones, and ADB metrics.

For everything *inside* the database — SQL, SQLcl, tuning, wait events, users and privileges,
auditing, drivers, Select AI — use Oracle's official skills pack
**[oracle/skills `db`](https://github.com/oracle/skills/tree/main/db)**. This skill does not
duplicate it.

## Do NOT load this skill when

- The question is SQL, PL/SQL, SQLcl, optimizer/AWR, or schema security → `oracle/skills` `db` pack.
- The database is Base Database Service / Exadata DB systems → `oci/database-management`.
- Unrelated general programming or non-Oracle cloud work.

## When to Use

Load for: "provision Autonomous AI Database", "estimate ADB ECPU cost", "configure ADB auto scaling",
"fix ADB wallet or mTLS connection", "manage ADB backups and clones", "stop ADB to save money".

## NEVER Do This

**NEVER promise a "max ECPU cap" for compute auto scaling**
```
Compute auto scaling (on by default for ECPU databases) lets the database use up to 3x the base
ECPU count. There is no configurable ceiling below 3x — the only controls are the base ECPU count
and turning auto scaling off (--is-auto-scaling-enabled false).
```
Billing: usage is measured per second in whole ECPUs and averaged over each hour; you pay the base
plus any extra averaged usage. Example from Oracle's docs: base 4 ECPU, running at 8 ECPU for half
an hour, bills as 6 ECPU for that hour. Minimum billing is 1 minute.
With auto scaling on, CPU% in Database Actions is relative to 3x the base ECPU count.

**NEVER assume storage stops growing (or shrinks) by itself**
- Storage auto scaling is **off** by default; when on, the database can grow to 3x reserved base storage.
- Beyond base, allocated storage is billed rounded up to the TB (Lakehouse) or GB (Transaction
  Processing, APEX, JSON) per hour.
- Deleting data does not lower allocated storage; run a shrink (`oci db autonomous-database shrink`)
  to bring allocated storage (and the bill) back down.

**NEVER assume stopped ADB = zero cost**
```
Stopped: ECPU billing stops.
Still billed: database storage, and (ECPU model) automatic backup storage for the retention period,
plus any long-term backups.
```

**NEVER keep a long-term backup "just in case" without a retention period**
Long-term backups require `--is-long-term-backup true --retention-period-in-days N`, where the
retention is 3 months to 10 years; they incur additional backup storage cost. At least one automatic
backup must exist first, and long-term backups can't be created more than once in 7 days.
```bash
oci db autonomous-database-backup create \
  --autonomous-database-id "$ADB_ID" \
  --display-name "pre-upgrade-2026-09" \
  --is-long-term-backup true \
  --retention-period-in-days 90
```
Automatic backups (ECPU model): retention configurable from 1 to 60 days
(`--backup-retention-period-in-days`), billed separately from database storage.

**NEVER rotate a regional wallet casually**
`generate-wallet --generate-type ALL` returns a *regional* wallet covering every ADB in the region;
rotating it invalidates connections for all of them. Use `--generate-type SINGLE` (instance wallet)
for applications.

**NEVER disable mTLS without a network boundary**
`--is-mtls-connection-required false` allows walletless TLS, but only makes sense with an access
control list (`--whitelisted-ips`) or a private endpoint (`--subnet-id`, `--nsg-ids`). A public
endpoint with no ACL and TLS is open to the internet.

## Provisioning checklist

| Decision | Flag (OCI CLI 3.94.1) | Notes |
|----------|------------------------|-------|
| Workload | `--db-workload OLTP\|DW\|AJD\|APEX\|LH` | OLTP = Transaction Processing, DW/LH = Lakehouse |
| Compute | `--compute-model ECPU --compute-count N` | `--cpu-core-count` is the legacy OCPU field |
| Auto scaling | `--is-auto-scaling-enabled`, `--is-auto-scaling-for-storage-enabled` | compute on by default; storage off |
| Storage | `--data-storage-size-in-gbs` or `--data-storage-size-in-tbs` | |
| License | `--license-model LICENSE_INCLUDED\|BRING_YOUR_OWN_LICENSE` | BYOL ECPU rate is ~24% of LI |
| Network | `--subnet-id`, `--nsg-ids` (private endpoint) or `--whitelisted-ips` (ACL) | |
| Free/dev | `--is-free-tier true` or `--is-dev-tier true` | |

## Price anchors (Oracle price list API, USD pay-as-you-go, checked 2026-09-30)

| SKU | Item | Price |
|-----|------|-------|
| B95701 / B95702 | Lakehouse / Transaction Processing ECPU, license included | $0.336 per ECPU-hour |
| B95703 / B95704 | Lakehouse / Transaction Processing ECPU, BYOL | $0.0807 per ECPU-hour |
| B95706 | ADB storage for Transaction Processing | $0.1953 per GB-month |
| B95754 | "Oracle Autonomous AI Database Storage" | $0.0299 per GB-month |

Quick math: 2 ECPU base, LI, 730 h, no scaling ≈ 2 × 0.336 × 730 ≈ $490/month compute, before storage.
Re-check the price list (and your contract discounts) before quoting; these change.

## Common connection errors

| Symptom | Check |
|---------|-------|
| `ORA-12506` / `ORA-12170` from outside OCI | ACL (`whitelisted-ips`) or private-endpoint routing/NSG |
| Handshake/SSL errors with a wallet | Wallet regenerated/rotated? `TNS_ADMIN` points at the unzipped wallet dir? |
| Works with wallet, fails without | `is-mtls-connection-required` still true, or no ACL/private endpoint for TLS |
| `ORA-01017` | Wrong database user/password (the wallet password only protects the wallet files) |

## Reference Files

Load [`references/adb-cli-reference.md`](references/adb-cli-reference.md) for verified CLI commands
(provision, scale, stop/start, wallets, backups, clones, metrics).

Last verified: 2026-09-30 (OCI CLI 3.94.1 `--help`; docs.oracle.com ADB auto scaling, long-term backups,
backup retention; Oracle price list API)

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
