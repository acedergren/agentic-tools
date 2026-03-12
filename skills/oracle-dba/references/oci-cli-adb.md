# OCI CLI for Autonomous Database Operations

Direct OCI CLI commands for ADB management. Use these instead of MCP server calls.

## Prerequisites

```bash
# Verify OCI CLI is configured
oci --version

# Test connectivity
oci iam region list --output table

# Set default profile (optional)
export OCI_CLI_PROFILE=DEFAULT
```

## List and Discover

### List All Autonomous Databases
```bash
# In specific compartment
oci db autonomous-database list \
  --compartment-id ocid1.compartment.oc1..xxx \
  --output table

# Filter by display name
oci db autonomous-database list \
  --compartment-id ocid1.compartment.oc1..xxx \
  --display-name "prod-adb" \
  --output json | jq '.data[] | {id, name: .["display-name"], state: .["lifecycle-state"]}'

# All compartments (requires tenancy permissions)
oci db autonomous-database list \
  --compartment-id ocid1.tenancy.oc1..xxx \
  --all \
  --output table
```

### Get ADB Details
```bash
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --output json | jq '{
    name: .data["display-name"],
    ecpu: .data["cpu-core-count"],
    storage: .data["data-storage-size-in-tbs"],
    state: .data["lifecycle-state"],
    version: .data["db-version"],
    autoscaling: .data["is-auto-scaling-enabled"]
  }'
```

### List Backups
```bash
# Automatic backups
oci db autonomous-database-backup list \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --output table

# Filter by type
oci db autonomous-database-backup list \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq '.data[] | select(.type == "FULL")'
```

## Create and Provision

### Create Autonomous Database
```bash
oci db autonomous-database create \
  --compartment-id ocid1.compartment.oc1..xxx \
  --display-name "prod-adb" \
  --db-name "PRODADB" \
  --cpu-core-count 2 \
  --data-storage-size-in-tbs 1 \
  --admin-password 'SecurePass123!' \
  --db-version "19c" \
  --license-model LICENSE_INCLUDED \
  --is-auto-scaling-enabled false \
  --wait-for-state AVAILABLE

# With auto-scaling and specific version
oci db autonomous-database create \
  --compartment-id ocid1.compartment.oc1..xxx \
  --display-name "dev-adb-23ai" \
  --db-name "DEVADB" \
  --cpu-core-count 2 \
  --data-storage-size-in-tbs 1 \
  --admin-password 'SecurePass123!' \
  --db-version "23ai" \
  --license-model LICENSE_INCLUDED \
  --is-auto-scaling-enabled true \
  --wait-for-state AVAILABLE
```

### Create Clone
```bash
# Full clone
oci db autonomous-database create-from-clone \
  --compartment-id ocid1.compartment.oc1..xxx \
  --source-id ocid1.autonomousdatabase.oc1..xxx \
  --display-name "prod-adb-clone" \
  --db-name "PRODCLONE" \
  --clone-type FULL \
  --wait-for-state AVAILABLE

# Metadata clone (70% cheaper - no data)
oci db autonomous-database create-from-clone \
  --compartment-id ocid1.compartment.oc1..xxx \
  --source-id ocid1.autonomousdatabase.oc1..xxx \
  --display-name "dev-schema-only" \
  --db-name "DEVSCHEMA" \
  --clone-type METADATA \
  --wait-for-state AVAILABLE
```

## Scale and Update

### Scale ECPUs
```bash
# Scale from 2 to 4 ECPUs
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --cpu-core-count 4 \
  --wait-for-state AVAILABLE

# Enable auto-scaling (1-3x base ECPU, cannot configure max via CLI)
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --is-auto-scaling-enabled true \
  --wait-for-state AVAILABLE

# IMPORTANT: Auto-scaling limits are FIXED (cannot change via CLI):
# - Min: 1x base ECPU
# - Max: 3x base ECPU (hard limit)
# - Scaling trigger: CPU > 80% for 5+ minutes
# - Scale-down: CPU < 60% for 10+ minutes
#
# Cost impact example (Base 2 ECPU):
# - Without auto-scaling: 2 × $0.36 × 730 = $526/month (fixed)
# - With auto-scaling peak: 6 × $0.36 × 730 = $1,578/month (if sustained)
#
# To limit costs: Start with higher base ECPU, disable auto-scaling
```

### Scale Storage
```bash
# Scale from 1TB to 2TB
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --data-storage-size-in-tbs 2 \
  --wait-for-state AVAILABLE
```

### Change License Type
```bash
# Switch to BYOL (50% cost reduction)
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --license-model BRING_YOUR_OWN_LICENSE \
  --wait-for-state AVAILABLE
```

## Lifecycle Management

### Stop ADB
```bash
oci db autonomous-database stop \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --wait-for-state STOPPED

# IMPORTANT: Storage charges continue even when stopped!
# 1TB ADB stopped = $25/month storage cost
```

### Start ADB
```bash
oci db autonomous-database start \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --wait-for-state AVAILABLE
```

### Delete ADB
```bash
# Delete immediately
oci db autonomous-database delete \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --force

# Delete with final backup
oci db autonomous-database-backup create \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --display-name "final-backup-before-delete" \
  --retention-days 30

oci db autonomous-database delete \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --force
```

## Backup Operations

### Create Manual Backup
```bash
# With retention (CRITICAL - prevents forever storage)
oci db autonomous-database-backup create \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --display-name "pre-upgrade-backup" \
  --retention-days 30 \
  --wait-for-state ACTIVE

# NEVER create without retention - costs $0.025/GB/month FOREVER
# 1TB backup × $0.025 × ∞ = $300/year perpetually
```

### Restore from Backup
```bash
oci db autonomous-database restore \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --timestamp "2026-01-28T10:00:00Z" \
  --wait-for-state AVAILABLE
```

### Delete Manual Backup
```bash
oci db autonomous-database-backup delete \
  --autonomous-database-backup-id ocid1.autonomousdatabasebackup.oc1..xxx \
  --force
```

## Wallet Management

### Download Wallet
```bash
# Regional wallet (one wallet for this ADB)
oci db autonomous-database generate-wallet \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --password 'WalletPass123!' \
  --file ~/wallets/adb_wallet.zip

# Extract and use
mkdir ~/wallets/adb_wallet
unzip ~/wallets/adb_wallet.zip -d ~/wallets/adb_wallet
export TNS_ADMIN=~/wallets/adb_wallet
```

### Rotate Wallet
```bash
# Generate new wallet (invalidates old ones)
oci db autonomous-database generate-wallet \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --password 'NewWalletPass123!' \
  --file ~/wallets/adb_wallet_new.zip
```

## Monitoring and Metrics

### Get Connection Strings
```bash
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq '.data["connection-strings"]'

# Extract specific service
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq -r '.data["connection-strings"]["profiles"][] | select(.["consumer-group"] == "HIGH") | .value'
```

### Check ECPU Usage (requires monitoring API)
```bash
# Query metrics namespace
oci monitoring metric-data summarize-metrics-data \
  --namespace oci_autonomous_database \
  --compartment-id ocid1.compartment.oc1..xxx \
  --query-text 'CpuUtilization[1m].mean()' \
  --start-time "2026-01-28T00:00:00Z" \
  --end-time "2026-01-28T23:59:59Z" \
  --output table
```

## Cost Management

### Check Current Cost Configuration
```bash
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq '{
    ecpu: .data["cpu-core-count"],
    storage_tb: .data["data-storage-size-in-tbs"],
    license: .data["license-model"],
    autoscaling: .data["is-auto-scaling-enabled"],
    state: .data["lifecycle-state"]
  }'

# Calculate monthly cost
# License-Included: ECPU × $0.36/hr × 730 hrs + Storage_TB × 1000 × $0.025
# BYOL: ECPU × $0.18/hr × 730 hrs + Storage_TB × 1000 × $0.025
```

### Switch to BYOL (50% compute savings)
```bash
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --license-model BRING_YOUR_OWN_LICENSE \
  --wait-for-state AVAILABLE

# Savings: 2 ECPU × ($0.36 - $0.18) × 730 = $263/month
```

## Advanced Operations

### Update to Latest Version
```bash
# Update to 23ai
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --db-version "23ai" \
  --wait-for-state AVAILABLE

# CRITICAL: Cannot downgrade! Test in clone first.
```

### Change Workload Type
```bash
# Switch from OLTP to Data Warehouse
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --db-workload "DW" \
  --wait-for-state AVAILABLE
```

### Enable/Disable Features
```bash
# Enable operations insights
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --is-operations-insights-enabled true \
  --wait-for-state AVAILABLE

# Enable database management
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --is-database-management-enabled true \
  --wait-for-state AVAILABLE
```

## High Availability and Disaster Recovery

### Create Autonomous Data Guard (Standby Database)
```bash
# Enable Autonomous Data Guard (creates standby in different region)
oci db autonomous-database create-autonomous-database-dataguard-association \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --protection-mode MAXIMUM_PERFORMANCE \
  --wait-for-state AVAILABLE

# Check Data Guard status
oci db autonomous-database-dataguard-association list \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --output table
```

### Failover (Disaster Recovery)
```bash
# Failover to standby (makes standby the new primary)
# Use when primary is unavailable
oci db autonomous-database failover \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --wait-for-state AVAILABLE

# CRITICAL: This is a disaster recovery operation
# Primary must be unavailable or you'll get an error
```

### Switchover (Planned Maintenance)
```bash
# Switchover to standby (makes standby the new primary)
# Use for planned maintenance
oci db autonomous-database switchover \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --wait-for-state AVAILABLE

# After switchover:
# - Old primary becomes new standby
# - Old standby becomes new primary
# - Zero data loss
```

### Reinstate Failed Primary
```bash
# After failover, reinstate old primary as new standby
oci db autonomous-database reinstate-autonomous-database-dataguard-association \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --wait-for-state AVAILABLE
```

## Version-Specific Features

### Check Available Versions
```bash
# List all available DB versions
oci db autonomous-db-version list \
  --compartment-id ocid1.compartment.oc1..xxx \
  --db-workload OLTP \
  --output table

# Check features available in specific version
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq '.data["db-version"]'
```

### Version-Specific Feature Matrix
```
Version-specific features (enabled by upgrading to version):

19c:
- Standard Oracle Database features
- Basic JSON support

21c:
- Property Graphs (CREATE PROPERTY GRAPH)
- Blockchain Tables (CREATE BLOCKCHAIN TABLE)
- Enhanced JSON (JSON_VALUE, JSON_QUERY)

23ai:
- JSON Relational Duality Views
- AI Vector Search (VECTOR data type, VECTOR_DISTANCE)
- SELECT AI (natural language queries)
- SQL Domains (domain data types)
- Annotations (metadata tags)

26ai:
- JavaScript Stored Procedures
- True Cache (application-consistent read cache)
- Enhanced vector search (hybrid search)
- All 23ai features

IMPORTANT: Features are enabled by database version, not OCI CLI flags.
To use 23ai features, upgrade database to version "23ai".
```

### Upgrade Path Example
```bash
# Check current version
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq -r '.data["db-version"]'

# 1. Create clone for testing
oci db autonomous-database create-from-clone \
  --source-id ocid1.autonomousdatabase.oc1..xxx \
  --display-name "test-23ai-upgrade" \
  --db-name "TEST23AI" \
  --clone-type FULL \
  --wait-for-state AVAILABLE

# 2. Upgrade clone to 23ai
oci db autonomous-database update \
  --autonomous-database-id <clone-id> \
  --db-version "23ai" \
  --wait-for-state AVAILABLE

# 3. Test application with 23ai features

# 4. If successful, upgrade production
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --db-version "23ai" \
  --wait-for-state AVAILABLE

# CRITICAL: Cannot downgrade! Always test in clone first.
```

## Troubleshooting

### Get ADB State and Issues
```bash
# Check lifecycle state
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq -r '.data["lifecycle-state"]'

# Possible states:
# PROVISIONING, AVAILABLE, STOPPING, STOPPED, STARTING,
# TERMINATING, TERMINATED, UNAVAILABLE, RESTORE_IN_PROGRESS,
# BACKUP_IN_PROGRESS, SCALE_IN_PROGRESS, UPGRADE_IN_PROGRESS
```

### Common Errors

#### Insufficient Quota
```bash
# Error: "Service limit exceeded for resource autonomous-database"
# Check quota:
oci limits quota list --compartment-id ocid1.tenancy.oc1..xxx

# Request increase via console or support ticket
```

#### Invalid Parameter
```bash
# Error: "InvalidParameter: cpu-core-count must be between 1 and 128"
# Check valid ranges:
oci db autonomous-database create --generate-param-json-input
```

#### Concurrent Operation
```bash
# Error: "ConflictingOperationException: Another operation is in progress"
# Wait for current operation to complete:
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq -r '.data["lifecycle-state"]'

# Poll until state returns to AVAILABLE
```

## Scripting Patterns

### Batch Operations with JQ
```bash
# Scale all dev ADBs to 1 ECPU
oci db autonomous-database list \
  --compartment-id ocid1.compartment.oc1..xxx \
  --all \
  | jq -r '.data[] | select(.["display-name"] | startswith("dev-")) | .id' \
  | while read adb_id; do
      echo "Scaling $adb_id to 1 ECPU"
      oci db autonomous-database update \
        --autonomous-database-id "$adb_id" \
        --cpu-core-count 1 \
        --wait-for-state AVAILABLE
    done
```

### Get Cost Summary
```bash
# Calculate total monthly cost for all ADBs in compartment
oci db autonomous-database list \
  --compartment-id ocid1.compartment.oc1..xxx \
  --all \
  | jq -r '.data[] | select(.["lifecycle-state"] != "TERMINATED") | [
    .["display-name"],
    .["cpu-core-count"],
    .["data-storage-size-in-tbs"],
    .["license-model"],
    (.["cpu-core-count"] * 0.36 * 730 + .["data-storage-size-in-tbs"] * 1000 * 0.025)
  ] | @tsv' \
  | awk '{print $1, "\t", $2, "ECPU\t", $3, "TB\t$" $5 "/month"}'
```

## Best Practices

### Always Use --wait-for-state
```bash
# ✅ GOOD - waits for operation to complete
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --cpu-core-count 4 \
  --wait-for-state AVAILABLE

# ❌ BAD - returns immediately, operation may fail silently
oci db autonomous-database update \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  --cpu-core-count 4
```

### Use JQ for JSON Parsing
```bash
# ✅ GOOD - robust JSON parsing
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | jq -r '.data["display-name"]'

# ❌ BAD - fragile grep/sed parsing
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx \
  | grep display-name | sed 's/.*: "\(.*\)".*/\1/'
```

### Store OCIDs in Variables
```bash
# ✅ GOOD - reusable, readable
COMPARTMENT_ID="ocid1.compartment.oc1..xxx"
ADB_ID="ocid1.autonomousdatabase.oc1..xxx"

oci db autonomous-database get \
  --autonomous-database-id "$ADB_ID"

# ❌ BAD - error-prone, hard to maintain
oci db autonomous-database get \
  --autonomous-database-id ocid1.autonomousdatabase.oc1..xxx
```

## When to Use OCI CLI

**Use OCI CLI when you need to:**
- Provision or delete ADB instances
- Scale ECPUs or storage
- Create backups or clones
- Download wallets
- Change configuration (auto-scaling, license type)
- Batch operations across multiple ADBs

**Don't use OCI CLI for:**
- SQL queries (use SQLcl instead - see `sqlcl-workflows.md`)
- Performance troubleshooting (use SQLcl + v$sql)
- Cost calculations (exact formulas in main SKILL.md)
