---
name: database-management
description: "Use when creating Autonomous Databases, troubleshooting wallet connection failures, managing PDBs, optimizing ADB costs, or selecting clone types. Covers connection service cost impact, password complexity failures, stop/start cost trap, clone type consequences, Always-Free limits, and PDB lifecycle gotchas."
---

# OCI Database Management

## NEVER Do This

❌ **NEVER use HIGH service name for non-critical workloads (3x cost trap)**
```
ADB service names:
- HIGH:   Dedicated OCPU, 1× concurrency per OCPU, highest priority
- MEDIUM: Shared OCPU, 2× concurrency per OCPU
- LOW:    Most sharing, 3× concurrency per OCPU

# WRONG - using HIGH for background jobs
connection_string = adb_connection_strings["high"]  # 3x wasted OCPU-hours!

# RIGHT - match service to workload
connection_string = adb_connection_strings["low"]    # Batch, reporting, data loads
connection_string = adb_connection_strings["high"]   # Interactive OLTP only
```
Cost impact: Using HIGH vs LOW for connection pools wastes 3x OCPU allocation.

❌ **NEVER assume stopped ADB = zero cost**
```
Stopped ADB still charges:
- Storage:  $0.025/GB/month (continues)
- Backups:  Retention charges (continue)
- Compute:  $0 (only part that stops)

Example: 1TB ADB, stopped 16 hrs/day
- Compute saved: ~67% of compute bill
- Storage still: $25/month
- Total savings are less than expected — plan accordingly
```

❌ **NEVER guess ADB password complexity — it always fails validation**
```
Requirements (strict):
- 12-30 characters
- 2+ uppercase, 2+ lowercase
- 2+ numbers, 2+ special chars (#-_ only)
- NO username substring
- NO repeating chars (aaa, 111)

# WRONG - fails validation
--admin-password "MyPass123"  # Too short, only 1 special char

# RIGHT
--admin-password "MyP@ssw0rd#2024"  # 2 upper, 2 lower, 2 num, 2 special
```

❌ **NEVER use full clone for test environments (70% cost waste)**
```
| Clone Type        | Cost           | Refresh capability | When source deleted |
|-------------------|----------------|--------------------|---------------------|
| Full clone        | 100% of source | Cannot refresh     | Clone survives      |
| Refreshable clone | ~30% (storage) | Manual refresh     | Clone auto-deleted! |
| Metadata clone    | Minimal        | N/A                | Clone survives      |

# WRONG - full clone for QA needing weekly prod data
oci db autonomous-database create-from-clone-adb --clone-type FULL
# $500/month, no refresh capability

# RIGHT - refreshable clone for test environments
# $150/month storage only, refresh from prod weekly (70% savings)
```

**Critical gotcha**: Refreshable clone is **silently deleted** when source ADB is deleted — no warning.

❌ **NEVER delete CDB without checking for PDBs first**
```bash
# WRONG - deletes all PDBs with no warning
oci db database delete --database-id <cdb-ocid>

# RIGHT - check first
oci db pluggable-database list --container-database-id <cdb-ocid>
# Then explicitly unplug, clone, or delete each PDB
```

❌ **NEVER forget Always-Free ADB limits**
```
Always-Free limits:
- 1 OCPU max (scale-up fails)
- 20 GB storage max
- 2 ADBs total per TENANCY (not per region) — stopped ADBs count!
- NO private endpoints, NO auto-scaling

# To free a slot: must DELETE, not just STOP the ADB
```

## Wallet Connection Failure Decision Tree

```
"Connection refused" or "Wallet error"?
│
├─ Wallet file issues?
│  ├─ TNS_ADMIN env set? → export TNS_ADMIN=/path/to/wallet
│  ├─ sqlnet.ora has wallet location?
│  │  WALLET_LOCATION=(SOURCE=(METHOD=file)(METHOD_DATA=(DIRECTORY="/path/to/wallet")))
│  └─ Wallet password correct?
│
├─ Network security?
│  ├─ Private endpoint ADB? → Source IP in NSG? VPN/FastConnect for on-prem?
│  └─ Public endpoint ADB? → IP whitelisted in Access Control List?
│
├─ Database state?
│  └─ Lifecycle state = AVAILABLE?
│     oci db autonomous-database get --autonomous-database-id <ocid> \
│       --query 'data."lifecycle-state"'
│
└─ Service name wrong?
   └─ tnsnames.ora entries: <dbname>_high, <dbname>_medium, <dbname>_low
```

## PDB Connection Gotcha

```
DB System or Exadata
└─ Container Database (CDB)
   └─ Pluggable Database (PDB)  ← Application connects HERE
```

```bash
# WRONG - connecting to CDB
sqlplus admin/pass@cdb-host:1521/ORCLCDB

# RIGHT - connect to PDB
sqlplus app_user/pass@cdb-host:1521/PDB1
```

**Unplug gotcha**: Unplugging PDB does NOT delete data — charges continue until you explicitly DELETE. Unplug only creates an XML metadata file for portability.

## Cost Optimization

### Stop vs Always-On Comparison

Stop/start is worth it for dev databases with predictable hours:
- 2 OCPU ADB, used 8 hrs/day weekdays: Stop saves ~48% vs always-on 1 OCPU
- Storage cost ($0.025/GB/month) continues regardless

### License Model (High Impact)

| Model | Cost | Use When |
|-------|------|----------|
| License Included | $0.36/OCPU-hr | No Oracle DB licenses |
| BYOL | $0.18/OCPU-hr | Have Oracle licenses (50% savings) |

4 OCPU production ADB 24/7: BYOL saves $525/month ($6,300/year) if you have licenses.

### Auto-Scaling Cap (Missing from Console)

```hcl
# DANGER - auto-scaling can 3x your bill silently
resource "oci_database_autonomous_database" "prod" {
  cpu_core_count            = 2
  is_auto_scaling_enabled   = true  # Scales to 6 OCPUs = 3x surprise cost!
}
```

Setting max OCPU cap is **not available via API or Terraform** — must be set in console under Manage Scaling. Set to 2x baseline to control costs.

## Reference Files

**Load** [`references/oci-dbcs-cli.md`](references/oci-dbcs-cli.md) when you need:
- Creating or managing DB Systems (VM, RAC, Exadata)
- Configuring Data Guard for disaster recovery
- Patching and maintenance operations
- ExaDB-D and ExaDB-C@C operations
