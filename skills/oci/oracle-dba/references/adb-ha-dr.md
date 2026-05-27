# Autonomous Database HA/DR Reference

High Availability and Disaster Recovery patterns for Oracle Autonomous Database.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ADB HA/DR Options                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐  │
│  │  Auto HA    │         │  Local DG   │         │ Cross-Region│  │
│  │  (Built-in) │         │  (Same AD)  │         │ DG/Backup   │  │
│  ├─────────────┤         ├─────────────┤         ├─────────────┤  │
│  │ RTO: mins   │         │ RTO: mins   │         │ RTO: mins   │  │
│  │ RPO: 0      │         │ RPO: 0      │         │ RPO: ~secs  │  │
│  │ Auto        │         │ Configurable│         │ Manual      │  │
│  └─────────────┘         └─────────────┘         └─────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Built-in High Availability

ADB includes automatic HA features requiring no configuration:

### Automatic Features
| Feature | Description | Impact |
|---------|-------------|--------|
| Auto Failover | Automatic failover to standby infrastructure | Transparent to applications |
| Storage Redundancy | Triple-mirrored storage | Zero data loss |
| Auto Patching | Security patches applied automatically | Minimal downtime |
| Auto Recovery | Automatic instance restart on failure | Seconds to minutes |

### SLA Guarantees
- **Availability**: 99.995% (Shared), 99.995% (Dedicated)
- **Data Durability**: 99.999999999% (11 nines)

## Autonomous Data Guard

Real-time disaster recovery with synchronous standby.

### Enable Local Data Guard

```bash
# Enable via OCI CLI
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --is-local-data-guard-enabled true

# Verify status
oci db autonomous-database get --autonomous-database-id $ADB_ID \
  --query 'data.{"standby-lag-time":"standby-lag-time-in-seconds","standby-state":"standby-db.lifecycle-state"}'
```

### Cross-Region Data Guard

```bash
# Create cross-region standby
oci db autonomous-database create-cross-region-data-guard-standby \
  --source-autonomous-database-id $ADB_ID \
  --compartment-id $REMOTE_COMPARTMENT_ID \
  --region $REMOTE_REGION \
  --display-name "ADB-Standby-Frankfurt"

# Monitor replication lag
oci db autonomous-database get --autonomous-database-id $STANDBY_ID \
  --query 'data.standby-lag-time-in-seconds'
```

### Switchover (Planned)

```bash
# Switchover to standby (makes standby primary)
oci db autonomous-database switchover \
  --autonomous-database-id $ADB_ID

# Verify new primary
oci db autonomous-database get --autonomous-database-id $ADB_ID \
  --query 'data.role'
```

### Failover (Unplanned)

```bash
# Failover to standby (when primary unavailable)
oci db autonomous-database failover \
  --autonomous-database-id $STANDBY_ID

# Note: After failover, old primary needs manual reinstatement
```

### Reinstate Failed Primary

```bash
# Reinstate old primary as standby
oci db autonomous-database reinstate \
  --autonomous-database-id $OLD_PRIMARY_ID
```

## Backup-Based Disaster Recovery

Cross-region backup replication for cost-effective DR.

### Configure Cross-Region Backup

```bash
# Enable cross-region backup
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --is-remote-data-guard-enabled false \
  --remote-disaster-recovery-type BACKUP_BASED

# Set backup destination region
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --backup-destination '{"type":"REMOTE_REGION","region":"eu-frankfurt-1"}'
```

### Cross-Region Restore

```bash
# List backups available in remote region
oci db autonomous-database-backup list \
  --autonomous-database-id $ADB_ID \
  --region $REMOTE_REGION

# Create new ADB from backup in remote region
oci db autonomous-database create-from-backup \
  --compartment-id $REMOTE_COMPARTMENT_ID \
  --autonomous-database-backup-id $BACKUP_ID \
  --db-name "RESTORED_ADB" \
  --display-name "Restored from Backup" \
  --region $REMOTE_REGION
```

## Point-in-Time Recovery (PITR)

Restore to any point within retention period.

### PITR Capabilities
| Tier | Retention | Granularity |
|------|-----------|-------------|
| Standard | 60 days | 1 second |
| Extended | 95 days | 1 second |

### Perform PITR

```bash
# Restore to specific timestamp
oci db autonomous-database restore \
  --autonomous-database-id $ADB_ID \
  --timestamp "2024-01-15T10:30:00Z"

# Wait for restore to complete
oci db autonomous-database get --autonomous-database-id $ADB_ID \
  --query 'data.lifecycle-state'
```

### PITR via SQL

```sql
-- Check available restore range
SELECT * FROM v$restore_range;

-- Note: PITR itself is performed via OCI Console/CLI
-- But you can verify flashback capabilities
SELECT flashback_on FROM v$database;
```

## Backup Management

### Automatic Backups
- **Incremental**: Daily
- **Full**: Weekly
- **Retention**: 60 days (standard), up to 95 days

### Manual Backups

```bash
# Create manual backup
oci db autonomous-database-backup create \
  --autonomous-database-id $ADB_ID \
  --display-name "Pre-Upgrade-Backup-$(date +%Y%m%d)"

# Long-term backup (1 year)
oci db autonomous-database-backup create \
  --autonomous-database-id $ADB_ID \
  --display-name "Annual-Backup-2024" \
  --retention-period-in-days 365

# List backups
oci db autonomous-database-backup list \
  --autonomous-database-id $ADB_ID \
  --query 'data[*].{name:"display-name",state:"lifecycle-state",type:"type",time:"time-ended"}'
```

### Restore from Backup

```bash
# Restore from specific backup
oci db autonomous-database restore-from-backup \
  --autonomous-database-id $ADB_ID \
  --autonomous-database-backup-id $BACKUP_ID

# Monitor restore progress
oci db autonomous-database get --autonomous-database-id $ADB_ID \
  --query 'data.lifecycle-state'
```

## Cloning for DR Testing

### Refreshable Clones

Create read-only clones that auto-refresh from source.

```bash
# Create refreshable clone
oci db autonomous-database create-clone \
  --source-autonomous-database-id $ADB_ID \
  --compartment-id $C \
  --clone-type REFRESHABLE_CLONE \
  --db-name "DR_TEST" \
  --display-name "DR Test Clone"

# Manual refresh
oci db autonomous-database refresh \
  --autonomous-database-id $CLONE_ID

# Disconnect clone (for DR drill - makes it read-write)
oci db autonomous-database update \
  --autonomous-database-id $CLONE_ID \
  --is-refreshable-clone false
```

### Point-in-Time Clone

```bash
# Clone from specific point in time
oci db autonomous-database create-clone \
  --source-autonomous-database-id $ADB_ID \
  --compartment-id $C \
  --clone-type FULL \
  --timestamp "2024-01-15T10:30:00Z" \
  --db-name "PITR_CLONE" \
  --display-name "PITR Clone"
```

## Connection Management During Failover

### Connection Strings

ADB provides multiple connection services for HA:

| Service | Use Case | Failover Behavior |
|---------|----------|-------------------|
| `_high` | OLTP, high priority | Fast connect, first to reconnect |
| `_medium` | Batch operations | Standard priority |
| `_low` | Reporting, analytics | Background priority |
| `_tp` | Transaction Processing | Optimized for OLTP |
| `_tpurgent` | Urgent TP workloads | Highest priority |

### Application Configuration

```java
// JDBC with Fast Connection Failover
String url = "jdbc:oracle:thin:@" +
  "(DESCRIPTION=" +
  "(CONNECT_TIMEOUT=90)(RETRY_COUNT=20)(RETRY_DELAY=3)" +
  "(ADDRESS=(PROTOCOL=tcps)(HOST=adb.region.oraclecloud.com)(PORT=1522))" +
  "(CONNECT_DATA=(SERVICE_NAME=adbname_high.adb.oraclecloud.com)))";

// Connection properties
Properties props = new Properties();
props.setProperty("oracle.net.CONNECT_TIMEOUT", "90000");
props.setProperty("oracle.jdbc.ReadTimeout", "120000");
props.setProperty("oracle.net.READ_TIMEOUT", "120000");
```

### TAF (Transparent Application Failover)

```sql
-- Check TAF configuration (enabled by default in ADB)
SELECT username, failover_type, failover_method, failed_over
FROM v$session
WHERE username = 'APP_USER';

-- TAF is configured in the connection descriptor
-- ADB connection strings include TAF by default
```

## Monitoring HA/DR Status

### Data Guard Status

```sql
-- Check Data Guard status
SELECT name, database_role, protection_mode, protection_level
FROM v$database;

-- Check standby lag
SELECT name, value, time_computed
FROM v$dataguard_stats
WHERE name IN ('transport lag', 'apply lag');

-- Check log shipping
SELECT sequence#, first_time, next_time, applied
FROM v$archived_log
WHERE dest_id = 2
ORDER BY sequence# DESC
FETCH FIRST 10 ROWS ONLY;
```

### OCI Monitoring

```bash
# Data Guard lag metric
oci monitoring metric-data summarize-metrics-data \
  --compartment-id $C \
  --namespace oci_autonomous_database \
  --query-text 'StandbyLagInSeconds[1h]{resourceId="'$ADB_ID'"}.mean()'

# Backup status
oci monitoring metric-data summarize-metrics-data \
  --compartment-id $C \
  --namespace oci_autonomous_database \
  --query-text 'BackupStatus[24h]{resourceId="'$ADB_ID'"}.latest()'
```

## DR Runbook

### Pre-Failover Checklist
- [ ] Verify standby database status
- [ ] Check replication lag (should be minimal)
- [ ] Notify stakeholders
- [ ] Document current primary state

### Failover Steps
1. **Assess**: Confirm primary is truly unavailable
2. **Communicate**: Notify stakeholders of planned failover
3. **Execute**: Run failover command
4. **Verify**: Confirm new primary is operational
5. **Update**: Update DNS/connection strings if needed
6. **Test**: Validate application connectivity

### Post-Failover Tasks
- [ ] Verify all applications reconnected
- [ ] Check for data consistency
- [ ] Plan reinstatement of old primary
- [ ] Document incident and timeline

## Best Practices

### Architecture
- Enable Autonomous Data Guard for production workloads
- Use cross-region for regional disaster scenarios
- Implement backup-based DR for cost-sensitive workloads

### Testing
- Perform quarterly DR drills
- Use refreshable clones for DR testing
- Test application failover behavior
- Document and update runbooks

### Monitoring
- Alert on standby lag exceeding threshold
- Monitor backup completion status
- Track failover events
- Set up notifications for DR events

### Application Design
- Use ADB connection strings (include retry logic)
- Implement proper connection pooling
- Handle transient errors gracefully
- Design for idempotency where possible
