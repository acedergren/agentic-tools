# SQLcl Workflows for ADB Operations

SQLcl is Oracle's command-line SQL tool. Use it directly via Bash for database operations.

## Connection Patterns

### Connect to ADB (with wallet)
```bash
# Set wallet location
export TNS_ADMIN=/path/to/wallet

# Connect
sql admin/password@adb_high
```

### Common Connection Services
- `adb_high`: Low latency, high concurrency (OLTP)
- `adb_medium`: Balanced (reporting, batch jobs)
- `adb_low`: Highest parallelism (background tasks, ETL)

## Performance Analysis Workflows

### Find Top SQL by Elapsed Time
```bash
sql admin/password@adb_high <<EOF
SET PAGESIZE 50
SET LINESIZE 200

SELECT sql_id,
       ROUND(elapsed_time/executions/1000, 2) AS avg_ms,
       executions,
       SUBSTR(sql_text, 1, 80) AS sql_text
FROM v\$sql
WHERE executions > 0
  AND last_active_time > SYSDATE - 1/24
ORDER BY elapsed_time DESC
FETCH FIRST 10 ROWS ONLY;
EXIT;
EOF
```

### Get Execution Plan for SQL_ID
```bash
sql admin/password@adb_high <<EOF
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR('&sql_id'));
EXIT;
EOF
```

### Check Wait Events
```bash
sql admin/password@adb_high <<EOF
SELECT event,
       ROUND(time_waited_micro/1000000, 2) AS wait_sec,
       total_waits
FROM v\$system_event
WHERE wait_class != 'Idle'
ORDER BY time_waited_micro DESC
FETCH FIRST 10 ROWS ONLY;
EXIT;
EOF
```

## Schema Discovery

### List Large Tables
```bash
sql admin/password@adb_high <<EOF
SELECT table_name,
       num_rows,
       ROUND(blocks * 8192 / 1024 / 1024, 2) AS size_mb
FROM user_tables
WHERE num_rows > 0
ORDER BY num_rows DESC
FETCH FIRST 20 ROWS ONLY;
EXIT;
EOF
```

### Get Table DDL
```bash
sql admin/password@adb_high <<EOF
SET LONG 100000
SET PAGESIZE 0
SELECT DBMS_METADATA.GET_DDL('TABLE', 'ORDERS') FROM DUAL;
EXIT;
EOF
```

## SQL Tuning Workflow

### Create SQL Tuning Task
```bash
sql admin/password@adb_high <<EOF
DECLARE
  task_name VARCHAR2(30);
BEGIN
  task_name := DBMS_SQLTUNE.CREATE_TUNING_TASK(
    sql_id => '&sql_id',
    task_name => 'tune_slow_query'
  );
  DBMS_SQLTUNE.EXECUTE_TUNING_TASK(task_name);
  DBMS_OUTPUT.PUT_LINE('Tuning task created: ' || task_name);
END;
/

-- Get recommendations
SELECT DBMS_SQLTUNE.REPORT_TUNING_TASK('tune_slow_query') FROM DUAL;
EXIT;
EOF
```

## Data Operations

### Export Table (Data Pump)
```bash
# Create directory (one-time setup)
sql admin/password@adb_high <<EOF
CREATE DIRECTORY export_dir AS '/tmp/exports';
GRANT READ, WRITE ON DIRECTORY export_dir TO ADMIN;
EXIT;
EOF

# Export
expdp admin/password@adb_high \
  tables=ORDERS \
  directory=export_dir \
  dumpfile=orders.dmp \
  logfile=orders_export.log
```

### Import Table
```bash
impdp admin/password@adb_high \
  tables=ORDERS \
  directory=export_dir \
  dumpfile=orders.dmp \
  logfile=orders_import.log \
  table_exists_action=REPLACE
```

## Monitoring

### Check Active Sessions
```bash
sql admin/password@adb_high <<EOF
SELECT sid,
       serial#,
       username,
       status,
       sql_id,
       event
FROM v\$session
WHERE status = 'ACTIVE'
  AND username IS NOT NULL
ORDER BY sid;
EXIT;
EOF
```

### Find Blocking Sessions
```bash
sql admin/password@adb_high <<EOF
SELECT blocking_session,
       sid AS blocked_sid,
       username,
       event,
       seconds_in_wait
FROM v\$session
WHERE blocking_session IS NOT NULL
ORDER BY seconds_in_wait DESC;
EXIT;
EOF
```

## Best Practices

### Use Heredoc for Multi-Line SQL
```bash
# GOOD - heredoc preserves formatting
sql admin/password@adb_high <<EOF
SELECT *
FROM orders
WHERE status = 'PENDING';
EXIT;
EOF
```

### Set Output Formatting
```bash
sql admin/password@adb_high <<EOF
SET PAGESIZE 100       -- Rows per page
SET LINESIZE 200       -- Characters per line
SET FEEDBACK ON        -- Show "N rows selected"
SET TIMING ON          -- Show execution time
SET SQLFORMAT ANSICONSOLE  -- Color output

-- Your query here
EXIT;
EOF
```

### Silent Mode (Scripts)
```bash
sql -S admin/password@adb_high <<EOF
-- Suppress banner and prompts
SELECT COUNT(*) FROM orders;
EXIT;
EOF
```

## Common Errors

### Wallet Not Found
```bash
# Error: ORA-29024: Certificate validation failure
# Fix: Set TNS_ADMIN
export TNS_ADMIN=/path/to/wallet_dir
```

### Connection Timeout
```bash
# Error: ORA-12170: TNS:Connect timeout occurred
# Check: Network connectivity, service name
tnsping adb_high
```

### Insufficient Privileges
```bash
# Error: ORA-01031: insufficient privileges
# Fix: Grant required privileges
sql admin/password@adb_high <<EOF
GRANT SELECT ON v\$sql TO app_user;
EXIT;
EOF
```

## When to Use SQLcl

**Use SQLcl when you need to:**
- Execute ad-hoc SQL queries to troubleshoot issues
- Get execution plans for slow SQL_ID
- Check current wait events or active sessions
- Export/import data for backups or migrations
- Generate DDL for schema objects
- Run SQL tuning tasks

**Don't use SQLcl for:**
- Bulk operations (use Data Pump instead)
- Programmatic automation (use OCI CLI for ADB management)
- Long-running queries (connection may timeout)
