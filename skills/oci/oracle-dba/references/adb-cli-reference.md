# Autonomous AI Database CLI Reference

Last verified: 2026-09-30 against OCI CLI 3.94.1 (`oci db autonomous-database* --help`).
Every flag below exists in that version. Values in `<>` are placeholders.

## Provision

```bash
oci db autonomous-database create \
  --compartment-id "$C" \
  --db-name APPDB01 \
  --display-name app-prod \
  --db-workload OLTP \
  --compute-model ECPU \
  --compute-count 2 \
  --data-storage-size-in-gbs 1024 \
  --is-auto-scaling-enabled true \
  --is-auto-scaling-for-storage-enabled false \
  --license-model LICENSE_INCLUDED \
  --admin-password "$ADMIN_PW" \
  --subnet-id "$PRIVATE_SUBNET" \
  --nsg-ids '["<nsg-ocid>"]' \
  --backup-retention-period-in-days 30 \
  --wait-for-state AVAILABLE
```

`--db-workload`: `OLTP` (Transaction Processing), `DW` / `LH` (Lakehouse), `AJD` (JSON), `APEX`.
Free or developer databases: `--is-free-tier true` / `--is-dev-tier true`.

## Scale, stop, start, shrink

```bash
# Change base ECPUs (compute auto scaling can still use up to 3x this)
oci db autonomous-database update --autonomous-database-id "$ADB_ID" --compute-count 4

# Turn compute auto scaling off (no other cap exists)
oci db autonomous-database update --autonomous-database-id "$ADB_ID" --is-auto-scaling-enabled false

# Stop / start (ECPU billing stops while stopped; storage and backups still bill)
oci db autonomous-database stop  --autonomous-database-id "$ADB_ID" --wait-for-state STOPPED
oci db autonomous-database start --autonomous-database-id "$ADB_ID" --wait-for-state AVAILABLE

# Reduce allocated storage after deleting data
oci db autonomous-database shrink --autonomous-database-id "$ADB_ID"
```

For scheduled stop/start, use OCI Resource Scheduler, or `--scheduled-operations` on the database.

## Network access and wallets

```bash
# Public endpoint with an ACL, allow walletless TLS
oci db autonomous-database update --autonomous-database-id "$ADB_ID" \
  --whitelisted-ips '["203.0.113.0/24","<vcn-ocid>"]' \
  --is-mtls-connection-required false

# Instance wallet (preferred for apps)
oci db autonomous-database generate-wallet --autonomous-database-id "$ADB_ID" \
  --password "$WALLET_PW" --file wallet.zip --generate-type SINGLE

# Regional wallet: covers every ADB in the region; rotating it affects all of them
oci db autonomous-database generate-wallet --autonomous-database-id "$ADB_ID" \
  --password "$WALLET_PW" --file regional-wallet.zip --generate-type ALL
```

Rotate or inspect wallet state with `oci db autonomous-database-wallet` (`get-metadata`, `rotate`, `get-regional-wallet-metadata`, `rotate-regional-wallet`).

## Backups

```bash
# Automatic backup retention (ECPU model: 1–60 days, billed separately)
oci db autonomous-database update --autonomous-database-id "$ADB_ID" \
  --backup-retention-period-in-days 14

# Long-term backup: 90 days to 10 years; needs one automatic backup first
oci db autonomous-database-backup create --autonomous-database-id "$ADB_ID" \
  --display-name "pre-upgrade" --is-long-term-backup true --retention-period-in-days 90

oci db autonomous-database-backup list --autonomous-database-id "$ADB_ID" --all \
  --query 'data[].{name:"display-name",type:type,state:"lifecycle-state",ended:"time-ended"}' \
  --output table
```

## Clones

```bash
# FULL (data + metadata), METADATA (schema only), PARTIAL
oci db autonomous-database create-from-clone \
  --compartment-id "$C" --source-id "$ADB_ID" --clone-type METADATA \
  --db-name APPTEST --display-name app-test \
  --compute-model ECPU --compute-count 2 --data-storage-size-in-gbs 256 \
  --admin-password "$ADMIN_PW"

# Refreshable clone (read-only copy refreshed from the source)
oci db autonomous-database create-refreshable-clone \
  --compartment-id "$C" --source-id "$ADB_ID" \
  --db-name APPRPT --display-name app-reporting \
  --compute-model ECPU --compute-count 2 --refreshable-mode AUTOMATIC \
  --admin-password "$ADMIN_PW"

oci db autonomous-database list-clones --autonomous-database-id "$ADB_ID"
```

## Metrics (namespace `oci_autonomous_database`)

```bash
oci monitoring metric-data summarize-metrics-data \
  --compartment-id "$C" --namespace oci_autonomous_database \
  --query-text "CpuUtilization[5m]{resourceId = \"$ADB_ID\"}.mean()"
```

- `CpuUtilization` is relative to the ECPU count (with auto scaling on, Database Actions shows it relative to 3x).
- `StorageUtilization` is emitted hourly; alarm on it with a `[1h]` interval.

## Official sources

- Auto scaling: https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/autonomous-auto-scale.html
- Long-term backups: https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/backup-long-term.html
- Backup and recovery: https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/backup-intro.html
- Price list: https://www.oracle.com/cloud/price-list/
- Inside-the-database work: https://github.com/oracle/skills/tree/main/db
