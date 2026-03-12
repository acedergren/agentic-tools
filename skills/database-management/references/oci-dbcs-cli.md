# OCI Database Cloud Service CLI Reference

## Database System Operations

### List Database Systems
```bash
# List all DB systems in compartment
oci db system list --compartment-id <compartment-ocid>

# List with filters
oci db system list --compartment-id <compartment-ocid> \
  --lifecycle-state AVAILABLE \
  --display-name "prod-*"
```

### Create Database System
```bash
# Create VM DB System
oci db system launch \
  --compartment-id <compartment-ocid> \
  --availability-domain <ad-name> \
  --subnet-id <subnet-ocid> \
  --shape "VM.Standard2.4" \
  --cpu-core-count 4 \
  --database-edition "ENTERPRISE_EDITION" \
  --admin-password "<secure-password>" \
  --db-name "MYDB" \
  --db-version "19.0.0.0" \
  --display-name "prod-db-1" \
  --hostname "prod-db-1" \
  --initial-data-storage-size-in-gb 256 \
  --node-count 1 \
  --ssh-authorized-keys-file ~/.ssh/id_rsa.pub

# Create RAC DB System (2 nodes)
oci db system launch \
  --compartment-id <compartment-ocid> \
  --availability-domain <ad-name> \
  --subnet-id <subnet-ocid> \
  --shape "VM.Standard2.8" \
  --cpu-core-count 8 \
  --cluster-name "prodrac" \
  --database-edition "ENTERPRISE_EDITION_EXTREME_PERFORMANCE" \
  --admin-password "<secure-password>" \
  --db-name "RACDB" \
  --db-version "19.0.0.0" \
  --display-name "prod-rac-cluster" \
  --hostname "prod-rac" \
  --initial-data-storage-size-in-gb 512 \
  --node-count 2 \
  --ssh-authorized-keys-file ~/.ssh/id_rsa.pub
```

### Scale Database System
```bash
# Scale CPU (online for Flex shapes)
oci db system update \
  --db-system-id <db-system-ocid> \
  --cpu-core-count 8

# Scale storage (online)
oci db system update \
  --db-system-id <db-system-ocid> \
  --data-storage-size-in-gbs 512
```

### Database Operations
```bash
# List databases in a DB system
oci db database list \
  --compartment-id <compartment-ocid> \
  --db-system-id <db-system-ocid>

# Create additional database in existing system
oci db database create \
  --db-system-id <db-system-ocid> \
  --admin-password "<secure-password>" \
  --db-name "NEWDB" \
  --db-version "19.0.0.0"

# Delete database (CAUTION)
oci db database delete \
  --database-id <database-ocid> \
  --perform-final-backup true
```

## Backup and Recovery

### Manual Backups
```bash
# Create manual backup
oci db backup create \
  --database-id <database-ocid> \
  --display-name "pre-upgrade-backup"

# List backups
oci db backup list \
  --compartment-id <compartment-ocid> \
  --database-id <database-ocid>

# Restore from backup
oci db database restore \
  --database-id <database-ocid> \
  --latest true

# Restore to point-in-time
oci db database restore \
  --database-id <database-ocid> \
  --timestamp "2024-01-15T10:30:00.000Z"
```

### Automatic Backup Configuration
```bash
# Enable automatic backups
oci db database update \
  --database-id <database-ocid> \
  --auto-backup-enabled true \
  --recovery-window-in-days 30

# Configure backup destination (custom)
oci db database update \
  --database-id <database-ocid> \
  --auto-backup-enabled true \
  --backup-destination '[{"type":"OBJECT_STORE"}]'
```

## Data Guard Configuration

### Enable Data Guard
```bash
# Create standby database
oci db data-guard-association create \
  --database-id <primary-database-ocid> \
  --creation-type "NewDbSystem" \
  --database-admin-password "<password>" \
  --protection-mode "MAXIMUM_PERFORMANCE" \
  --transport-type "ASYNC" \
  --availability-domain <standby-ad> \
  --display-name "standby-db-1" \
  --hostname "standby-db-1" \
  --subnet-id <standby-subnet-ocid>

# List Data Guard associations
oci db data-guard-association list \
  --database-id <database-ocid>
```

### Switchover and Failover
```bash
# Switchover (planned, no data loss)
oci db data-guard-association switchover \
  --database-id <primary-database-ocid> \
  --data-guard-association-id <association-ocid> \
  --database-admin-password "<password>"

# Failover (emergency, potential data loss)
oci db data-guard-association failover \
  --database-id <standby-database-ocid> \
  --data-guard-association-id <association-ocid> \
  --database-admin-password "<password>"

# Reinstate old primary as standby
oci db data-guard-association reinstate \
  --database-id <new-standby-database-ocid> \
  --data-guard-association-id <association-ocid> \
  --database-admin-password "<password>"
```

## Patching and Maintenance

### View Available Patches
```bash
# List available patches
oci db patch list \
  --db-system-id <db-system-ocid>

# Get patch details
oci db patch get \
  --patch-id <patch-ocid>
```

### Apply Patches
```bash
# Apply patch to DB system
oci db db-system-patch-history-entry list \
  --db-system-id <db-system-ocid>

# Check patch history
oci db patch-history list \
  --db-system-id <db-system-ocid>
```

## ExaDB-D and ExaDB-C@C Operations

### Exadata Infrastructure
```bash
# List Exadata infrastructures
oci db exadata-infrastructure list \
  --compartment-id <compartment-ocid>

# Get Exadata infrastructure details
oci db exadata-infrastructure get \
  --exadata-infrastructure-id <infra-ocid>
```

### VM Clusters
```bash
# List VM clusters
oci db vm-cluster list \
  --compartment-id <compartment-ocid>

# Create VM cluster
oci db vm-cluster create \
  --compartment-id <compartment-ocid> \
  --exadata-infrastructure-id <infra-ocid> \
  --vm-cluster-network-id <network-ocid> \
  --cpu-core-count 8 \
  --display-name "prod-vmcluster" \
  --gi-version "19.0.0.0" \
  --ssh-public-keys-file ~/.ssh/id_rsa.pub
```

## Common Troubleshooting

### Connection Issues
```bash
# Verify DB system is running
oci db system get --db-system-id <ocid> --query "data.\"lifecycle-state\""

# Check listeners
oci db node list --compartment-id <id> --db-system-id <db-system-ocid>

# Verify NSG rules
oci network nsg-security-rule list --nsg-id <nsg-ocid>
```

### Performance Diagnostics
```bash
# Get DB system metrics
oci monitoring metric-data summarize-metrics-data \
  --compartment-id <compartment-ocid> \
  --namespace "oci_database" \
  --query-text 'CpuUtilization[1m]{resourceId="<db-system-ocid>"}.mean()'
```

## Cost Optimization Commands

```bash
# Find stopped DB systems (still incurring storage costs)
oci db system list --compartment-id <id> --lifecycle-state STOPPED

# List DB systems by shape for right-sizing analysis
oci db system list --compartment-id <id> --query "data[].{Name:\"display-name\",Shape:shape,CPUs:\"cpu-core-count\"}"

# Check backup storage usage
oci db backup list --compartment-id <id> --query "data[].{DB:\"database-id\",Size:\"database-size-in-gbs\",Type:type}"
```
