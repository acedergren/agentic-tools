---
name: oracle-dba
description: "Use when managing Oracle Autonomous Database on OCI, troubleshooting performance, optimizing costs, or implementing HA/DR. ADB-specific gotchas, cost traps, SQL_ID debugging workflows, auto-scaling behavior, and version differences (19c/21c/23ai/26ai). Keywords: ADB, Autonomous Database, ECPU, auto-scaling, SQL_ID, wait events, ORA- errors, wallet, BYOL."
---

# Oracle Autonomous Database - Expert Knowledge

## NEVER Do This

**NEVER use ADMIN user in application code**

ADMIN has full database control; audit trail shows all actions as ADMIN (no accountability); ADMIN cannot be locked/disabled without breaking automation.
```sql
-- RIGHT: create app-specific user with least privilege
CREATE USER app_user IDENTIFIED BY :password;
GRANT CREATE SESSION, SELECT ON schema.table TO app_user;
```

**NEVER scale ECPUs without checking wait events first**

Scaling 2→4 ECPU costs $526/month extra. If root cause is bad SQL, that is wasted money.
```
Decision path:
1. Check v$system_event for top wait events
2. High 'CPU time' → Bad SQL, optimize first (do NOT scale)
3. High 'db file sequential read' → Missing indexes (do NOT scale)
4. High 'User I/O' sustained → Scale storage IOPS OR enable auto-scaling
5. Only scale ECPUs if: CPU wait sustained + SQL already optimized
```

**NEVER assume stopped ADB = zero cost**
```
Stopped ADB charges:
  Compute: $0 (stopped)
  Storage: $0.025/GB/month CONTINUES
  Backups: Retention charges CONTINUE

For long-term idle (>60 days): Export via Data Pump, delete ADB, restore from backup.
```

**NEVER create manual backups without retention (kept forever)**
```bash
# WRONG - charged $0.025/GB/month FOREVER
oci db autonomous-database-backup create \
  --autonomous-database-id $ADB_ID \
  --display-name "pre-upgrade-backup"

# RIGHT - set retention
oci db autonomous-database-backup create \
  --autonomous-database-id $ADB_ID \
  --display-name "pre-upgrade-backup" \
  --retention-days 30
# 1TB × $0.025 × 12 months = $300/year if forgotten
```

**NEVER enable auto-scaling without setting a max ECPU limit**
```
Auto-scaling bills for PEAK usage each hour.
Base 2 ECPU → can scale to 6 ECPU (3× hard limit).
Without max cap: $526/month → $1,578/month surprise.

RIGHT: Set Max ECPU = 4 in console (2× base) to cap at $1,052/month.
```

**NEVER use ROWNUM with ORDER BY (wrong results)**
```sql
-- WRONG: ROWNUM applied BEFORE ORDER BY
SELECT * FROM orders WHERE ROWNUM <= 10 ORDER BY created_at DESC;

-- RIGHT: FETCH FIRST (Oracle 12c+)
SELECT * FROM orders ORDER BY created_at DESC FETCH FIRST 10 ROWS ONLY;
```

---

## Performance Troubleshooting Decision Tree

```
"Queries are slow"
│
├─ ONE query slow?
│  └─ Get SQL_ID → check execution plan:
│     SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR('&sql_id'));
│     ├─ TABLE ACCESS FULL on large table → Add index
│     ├─ Wrong join order → SQL hints or SQL Plan Baseline
│     └─ Cartesian join → Fix query logic
│
├─ ALL queries slow (system-wide)?
│  └─ Check wait events:
│     SELECT event, time_waited_micro/1000000 AS wait_sec
│     FROM v$system_event WHERE wait_class != 'Idle'
│     ORDER BY time_waited_micro DESC FETCH FIRST 10 ROWS ONLY;
│     ├─ 'CPU time' → Optimize SQL OR scale ECPU (check SQL first)
│     ├─ 'db file sequential read' → Missing indexes
│     ├─ 'db file scattered read' → Full table scans
│     ├─ 'log file sync' → Too many commits (batch DML)
│     └─ 'User I/O' → Scale storage IOPS or enable auto-scaling
│
└─ When did it start?
   ├─ After schema change → DBMS_STATS.GATHER_TABLE_STATS
   ├─ After data load → Gather stats + check partitioning
   ├─ After version upgrade → Compare execution plans
   └─ Gradual over time → Data growth, need indexing/partitioning
```

---

## SQL_ID Debugging Workflow

**Step 1: Find problem SQL_ID**
```sql
SELECT sql_id, elapsed_time/executions/1000 AS avg_ms,
       executions, sql_text
FROM v$sql
WHERE executions > 0
  AND last_active_time > SYSDATE - 1/24  -- last hour
ORDER BY elapsed_time DESC
FETCH FIRST 10 ROWS ONLY;
```

**Step 2: Get execution plan**
```sql
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR('&sql_id'));
```

**Step 3: Create and run SQL Tuning Task**
```sql
DECLARE task_name VARCHAR2(30);
BEGIN
  task_name := DBMS_SQLTUNE.CREATE_TUNING_TASK(
    sql_id => '&sql_id', task_name => 'tune_slow_query');
  DBMS_SQLTUNE.EXECUTE_TUNING_TASK(task_name);
END;
/
SELECT DBMS_SQLTUNE.REPORT_TUNING_TASK('tune_slow_query') FROM DUAL;
```

**Step 4: Implement fix**
- Recommendation: Add index → create index
- Recommendation: Use hint → test, then fix via SQL Plan Baseline
- Recommendation: Gather stats → `EXEC DBMS_STATS.GATHER_TABLE_STATS('schema','table')`

---

## ADB-Specific Behaviors

**Auto-scaling hard limits (cannot change):**
```
Minimum: 1× base ECPU
Maximum: 3× base ECPU
Scale-up trigger: CPU > 80% for 5+ minutes
Scale-down trigger: CPU < 60% for 10+ minutes
Time to scale: 5-10 minutes
Billing: charged for PEAK usage each hour
```

**ADMIN user restrictions in ADB (differs from on-premises):**
```
CANNOT: Create tablespaces (DATA auto-managed)
CANNOT: Modify SYSTEM/SYSAUX tablespaces
CANNOT: Access OS (no shell, no file system)
CANNOT: Use SYSDBA privileges (not available in ADB)
```

**Service name performance impact:**

| Service | CPU Allocation | Concurrency | Use For |
|---------|---------------|-------------|---------|
| HIGH | Dedicated OCPU | 1× ECPU | Interactive queries, OLTP |
| MEDIUM | Shared OCPU | 2× ECPU | Reporting, batch |
| LOW | Most sharing | 3× ECPU | Background tasks, ETL |

Gotcha: Using HIGH for background jobs starves interactive users with no extra cost benefit.

**Backup retention (automatic vs manual):**
```
Automatic: Daily incremental + weekly full, 60-day default, INCLUDED in storage cost
Manual: On-demand, FOREVER retention until manually deleted, $0.025/GB/month
Cost trap: 10 manual backups × 1TB × $0.025 = $250/month ongoing
```

---

## Version Feature Matrix

| Feature | 19c | 21c | 23ai | 26ai | Use Case |
|---------|-----|-----|------|------|----------|
| JSON Relational Duality | - | - | ✓ | ✓ | REST + SQL modern apps |
| AI Vector Search | - | - | ✓ | ✓ | RAG, semantic search |
| JavaScript Stored Procs | - | - | - | ✓ | Node.js developers |
| SELECT AI (NL→SQL) | - | - | ✓ | ✓ | Natural language queries |
| Property Graphs | - | ✓ | ✓ | ✓ | Fraud detection, social |
| True Cache | - | - | - | ✓ | Read-heavy workloads |
| Blockchain Tables | - | ✓ | ✓ | ✓ | Immutable audit log |

**Upgrade path**: 19c → 21c → 23ai → 26ai (downgrade NOT supported)
**Rule**: Always test in clone before upgrading production.

---

## Common ADB Errors

| Error | Actual Cause | Fix |
|-------|-------------|-----|
| `ORA-01017: invalid username/password` | Wallet password wrong or expired | Re-download wallet |
| `ORA-12170: Connect timeout` | NSG rules blocking OR wrong service name | Check NSG, verify tnsnames.ora |
| `ORA-00604: error at recursive SQL level 1` | Automated task failure (stats, space mgmt) | Check DBA_SCHEDULER_JOB_RUN_DETAILS |
| `ORA-30036: unable to extend segment` | ADB auto-manages DATA; if persists = bug | Contact Oracle Support |
| `ORA-01031: insufficient privileges` | ADMIN attempting restricted operation | See ADMIN restrictions above |

---

## Reference Files

**Load [`references/oci-cli-adb.md`](references/oci-cli-adb.md) when:**
- Provisioning, scaling, or deleting ADB instances
- Creating backups or clones (full vs metadata)
- Downloading wallet files
- Changing auto-scaling, license type, or version

**Load [`references/sqlcl-workflows.md`](references/sqlcl-workflows.md) when:**
- Executing SQL queries via Bash (SQLcl)
- Running DBMS_SQLTUNE tasks
- Data Pump export/import
- Generating DDL for schema objects

**Load [`references/oci-adb-best-practices.md`](references/oci-adb-best-practices.md) when:**
- Designing ADB architecture from scratch
- Planning ATP vs ADW vs APEX vs JSON workload type
- Migrating from on-premises Oracle to ADB

**See [`references/adb-ha-dr.md`](references/adb-ha-dr.md) for:** Autonomous Data Guard setup, cross-region DR, RTO/RPO targets.

**See [`references/adb-security.md`](references/adb-security.md) for:** mTLS wallet configuration, private endpoints, VCN Service Gateway setup.

**Pricing reference:** See [`references/cost-reference.md`](references/cost-reference.md) for ECPU/storage pricing tables and auto-scaling cost calculations.
