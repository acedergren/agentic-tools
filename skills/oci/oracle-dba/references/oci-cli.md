# OCI CLI Commands for Autonomous Database

Complete reference for managing Autonomous Database via OCI CLI.

## Prerequisites

```bash
# Install OCI CLI
bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"

# Configure credentials
oci setup config

# Verify setup
oci iam region list
```

## Environment Variables

```bash
# Set compartment (use in all commands)
export C="ocid1.compartment.oc1..your_compartment_id"

# Set database ID for operations
export ADB_ID="ocid1.autonomousdatabase.oc1..your_db_id"
```

## Autonomous Database Operations

### List and Query

```bash
# List all ADBs in compartment
oci db autonomous-database list --compartment-id $C

# List with specific workload type
oci db autonomous-database list --compartment-id $C \
  --db-workload DW

# Get specific ADB details
oci db autonomous-database get --autonomous-database-id $ADB_ID

# Query output with jq
oci db autonomous-database list --compartment-id $C \
  --query 'data[*].{name:"display-name",state:"lifecycle-state",ecpu:"compute-count"}'
```

### Create Autonomous Database

```bash
# Create ATP (Transaction Processing)
oci db autonomous-database create \
  --compartment-id $C \
  --db-name "MYATP" \
  --display-name "My ATP Database" \
  --db-workload OLTP \
  --compute-count 2 \
  --data-storage-size-in-tbs 1 \
  --admin-password "ComplexPass123#"

# Create ADW (Data Warehouse)
oci db autonomous-database create \
  --compartment-id $C \
  --db-name "MYADW" \
  --display-name "My ADW Database" \
  --db-workload DW \
  --compute-count 2 \
  --data-storage-size-in-tbs 1 \
  --admin-password "ComplexPass123#"

# Create with auto-scaling enabled
oci db autonomous-database create \
  --compartment-id $C \
  --db-name "AUTOSCALE" \
  --display-name "Auto-Scaling DB" \
  --db-workload OLTP \
  --compute-count 2 \
  --data-storage-size-in-tbs 1 \
  --is-auto-scaling-enabled true \
  --admin-password "ComplexPass123#"

# Create Free Tier ADB
oci db autonomous-database create \
  --compartment-id $C \
  --db-name "FREEADB" \
  --display-name "Free Tier ADB" \
  --db-workload OLTP \
  --is-free-tier true \
  --admin-password "ComplexPass123#"
```

### Start/Stop/Terminate

```bash
# Stop ADB (saves costs)
oci db autonomous-database stop --autonomous-database-id $ADB_ID

# Start ADB
oci db autonomous-database start --autonomous-database-id $ADB_ID

# Terminate ADB (irreversible!)
oci db autonomous-database delete --autonomous-database-id $ADB_ID \
  --force
```

### Scaling

```bash
# Scale ECPU (compute)
oci db autonomous-database update --autonomous-database-id $ADB_ID \
  --compute-count 4

# Scale storage
oci db autonomous-database update --autonomous-database-id $ADB_ID \
  --data-storage-size-in-tbs 2

# Enable auto-scaling
oci db autonomous-database update --autonomous-database-id $ADB_ID \
  --is-auto-scaling-enabled true

# Disable auto-scaling
oci db autonomous-database update --autonomous-database-id $ADB_ID \
  --is-auto-scaling-enabled false

# Scale compute and storage together
oci db autonomous-database update --autonomous-database-id $ADB_ID \
  --compute-count 8 \
  --data-storage-size-in-tbs 4
```

### Wallet Management

```bash
# Download wallet (regional)
oci db autonomous-database generate-wallet \
  --autonomous-database-id $ADB_ID \
  --password "WalletPass123#" \
  --file wallet.zip

# Download instance wallet
oci db autonomous-database generate-wallet \
  --autonomous-database-id $ADB_ID \
  --password "WalletPass123#" \
  --generate-type SINGLE \
  --file wallet_instance.zip

# Rotate wallet
oci db autonomous-database rotate-wallet \
  --autonomous-database-id $ADB_ID
```

## Backup and Recovery

### Backup Operations

```bash
# List backups
oci db autonomous-database-backup list \
  --autonomous-database-id $ADB_ID

# Create manual backup
oci db autonomous-database-backup create \
  --autonomous-database-id $ADB_ID \
  --display-name "pre-upgrade-backup"

# Create long-term backup (retained beyond automatic policy)
oci db autonomous-database-backup create \
  --autonomous-database-id $ADB_ID \
  --display-name "quarterly-backup" \
  --retention-period-in-days 365

# Get backup details
oci db autonomous-database-backup get \
  --autonomous-database-backup-id $BACKUP_ID

# Delete backup
oci db autonomous-database-backup delete \
  --autonomous-database-backup-id $BACKUP_ID
```

### Point-in-Time Recovery

```bash
# Restore to specific timestamp
oci db autonomous-database restore \
  --autonomous-database-id $ADB_ID \
  --timestamp "2024-01-15T10:30:00Z"

# Restore from backup
oci db autonomous-database restore-from-backup \
  --autonomous-database-id $ADB_ID \
  --autonomous-database-backup-id $BACKUP_ID
```

## Cloning

```bash
# Create full clone
oci db autonomous-database create-clone \
  --source-autonomous-database-id $ADB_ID \
  --compartment-id $C \
  --clone-type FULL \
  --db-name "CLONE01" \
  --display-name "Dev Clone"

# Create metadata clone (schema only)
oci db autonomous-database create-clone \
  --source-autonomous-database-id $ADB_ID \
  --compartment-id $C \
  --clone-type METADATA \
  --db-name "SCHEMA01" \
  --display-name "Schema Clone"

# Create refreshable clone
oci db autonomous-database create-clone \
  --source-autonomous-database-id $ADB_ID \
  --compartment-id $C \
  --clone-type REFRESHABLE_CLONE \
  --db-name "REFRESH01" \
  --display-name "Refreshable Clone"

# Refresh a refreshable clone
oci db autonomous-database refresh \
  --autonomous-database-id $CLONE_ID

# Disconnect refreshable clone (make independent)
oci db autonomous-database update \
  --autonomous-database-id $CLONE_ID \
  --is-refreshable-clone false
```

## Data Guard

```bash
# Enable Autonomous Data Guard
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --is-local-data-guard-enabled true

# Enable cross-region Data Guard
oci db autonomous-database create-cross-region-data-guard-standby \
  --source-autonomous-database-id $ADB_ID \
  --compartment-id $REMOTE_COMPARTMENT_ID \
  --region $REMOTE_REGION

# Switchover (planned)
oci db autonomous-database switchover \
  --autonomous-database-id $ADB_ID

# Failover (unplanned)
oci db autonomous-database failover \
  --autonomous-database-id $ADB_ID

# Disable Data Guard
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --is-local-data-guard-enabled false
```

## Networking

```bash
# Configure private endpoint
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --subnet-id $SUBNET_OCID \
  --nsg-ids '["ocid1.networksecuritygroup..."]'

# Configure ACL (IP allowlist)
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --whitelisted-ips '["192.168.1.0/24","10.0.0.5"]'

# Remove ACL (allow all)
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --whitelisted-ips '[]'
```

## Maintenance

```bash
# List maintenance schedules
oci db autonomous-database-maintenance-schedule list \
  --compartment-id $C

# Update maintenance window
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --scheduled-operations '[{"day-of-week":"SUNDAY","scheduled-start-time":"02:00","scheduled-stop-time":"06:00"}]'
```

## Monitoring and Metrics

```bash
# Get CPU utilization
oci monitoring metric-data summarize-metrics-data \
  --compartment-id $C \
  --namespace oci_autonomous_database \
  --query-text 'CpuUtilization[1h]{resourceId="'$ADB_ID'"}.mean()'

# Get storage utilization
oci monitoring metric-data summarize-metrics-data \
  --compartment-id $C \
  --namespace oci_autonomous_database \
  --query-text 'StorageUtilization[1d]{resourceId="'$ADB_ID'"}.max()'

# Get session count
oci monitoring metric-data summarize-metrics-data \
  --compartment-id $C \
  --namespace oci_autonomous_database \
  --query-text 'Sessions[1h]{resourceId="'$ADB_ID'"}.mean()'
```

## Work Requests

```bash
# List work requests for ADB
oci work-requests work-request list \
  --compartment-id $C \
  --resource-id $ADB_ID

# Get work request status
oci work-requests work-request get \
  --work-request-id $WORK_REQUEST_ID

# Get work request logs
oci work-requests work-request-log list \
  --work-request-id $WORK_REQUEST_ID
```

## Output Formatting

```bash
# JSON output (default)
oci db autonomous-database get --autonomous-database-id $ADB_ID

# Table output
oci db autonomous-database list --compartment-id $C --output table

# JMESPath query
oci db autonomous-database list --compartment-id $C \
  --query 'data[?lifecycle-state==`AVAILABLE`].{name:"display-name",ecpu:"compute-count"}'

# Raw output (no formatting)
oci db autonomous-database get --autonomous-database-id $ADB_ID --raw-output
```

## Scripting Patterns

### Wait for Operation

```bash
# Create and wait
oci db autonomous-database create \
  --compartment-id $C \
  --db-name "WAITDB" \
  --display-name "Wait DB" \
  --db-workload OLTP \
  --compute-count 2 \
  --data-storage-size-in-tbs 1 \
  --admin-password "ComplexPass123#" \
  --wait-for-state AVAILABLE
```

### Error Handling

```bash
#!/bin/bash
set -e

# Capture output and check status
output=$(oci db autonomous-database start --autonomous-database-id $ADB_ID 2>&1) || {
  echo "Error starting ADB: $output"
  exit 1
}
echo "ADB started successfully"
```

### Batch Operations

```bash
# Stop all ADBs in compartment
for adb_id in $(oci db autonomous-database list --compartment-id $C \
  --query 'data[?lifecycle-state==`AVAILABLE`].id' --raw-output | jq -r '.[]'); do
  echo "Stopping $adb_id"
  oci db autonomous-database stop --autonomous-database-id $adb_id
done
```
