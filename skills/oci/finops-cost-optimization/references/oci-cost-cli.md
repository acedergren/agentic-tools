# OCI Cost Management CLI Reference

Last verified: 2026-09-30 against OCI CLI 3.94.1 (`oci <cmd> --help`). Note the nested
`oci budgets budget budget ...` and `oci budgets budget alert-rule ...` paths in this CLI version.

## Cost Analysis

### Usage Reports
```bash
# List usage reports (requires tenancy-level permissions)
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2026-08-01T00:00:00Z" \
  --time-usage-ended "2026-09-01T00:00:00Z" \
  --granularity "DAILY"

# Get usage by service
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2026-08-01T00:00:00Z" \
  --time-usage-ended "2026-09-01T00:00:00Z" \
  --granularity "MONTHLY" \
  --group-by '["service"]'

# Get usage by compartment
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2026-08-01T00:00:00Z" \
  --time-usage-ended "2026-09-01T00:00:00Z" \
  --granularity "MONTHLY" \
  --group-by '["compartmentPath"]'

# Get usage by tag
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2026-08-01T00:00:00Z" \
  --time-usage-ended "2026-09-01T00:00:00Z" \
  --granularity "MONTHLY" \
  --group-by '["tagKey"]' \
  --filter '{"operator":"AND","dimensions":[{"key":"tagNamespace","value":"Organization"}]}'
```

## Budget Management

### Create Budgets
```bash
# Create monthly compartment budget
oci budgets budget budget create \
  --compartment-id <compartment-ocid> \
  --target-type "COMPARTMENT" \
  --targets '["<target-compartment-ocid>"]' \
  --amount 10000 \
  --reset-period "MONTHLY" \
  --display-name "dev-monthly-budget"

# Create tag-based budget
oci budgets budget budget create \
  --compartment-id <tenancy-ocid> \
  --target-type "TAG" \
  --targets '["Organization.CostCenter.Engineering"]' \
  --amount 50000 \
  --reset-period "MONTHLY" \
  --display-name "engineering-budget"
```

### Budget Alerts
```bash
# Create budget alert rule (80% threshold)
oci budgets budget alert-rule create \
  --budget-id <budget-ocid> \
  --type "ACTUAL" \
  --threshold 80 \
  --threshold-type "PERCENTAGE" \
  --recipients "team@example.com,alerts@example.com" \
  --display-name "80-percent-alert"

# Create forecast alert
oci budgets budget alert-rule create \
  --budget-id <budget-ocid> \
  --type "FORECAST" \
  --threshold 100 \
  --threshold-type "PERCENTAGE" \
  --recipients "finance@example.com" \
  --display-name "forecast-breach-alert"
```

### List and Monitor Budgets
```bash
# List all budgets
oci budgets budget budget list --compartment-id <tenancy-ocid> --all

# Get budget status
oci budgets budget budget get --budget-id <budget-ocid>

# List alert rules for a budget
oci budgets budget alert-rule list --budget-id <budget-ocid>
```

## Service Limits

### View Service Limits
```bash
# List all service limits
oci limits definition list --compartment-id <tenancy-ocid> --all

# Get specific service limits
oci limits definition list \
  --compartment-id <tenancy-ocid> \
  --service-name "compute"

# Check limit values
oci limits value list \
  --compartment-id <tenancy-ocid> \
  --service-name "compute" \
  --scope-type "AD" \
  --availability-domain <ad-name>

# Check resource availability
oci limits resource-availability get \
  --compartment-id <compartment-ocid> \
  --service-name "compute" \
  --limit-name "vm-standard-e4-flex-core-count" \
  --availability-domain <ad-name>
```

### Request Limit Increase
Easiest path: Console → Governance → Limits, Quotas and Usage → "Request a service limit increase".
The CLI equivalent is a support incident with `--problem-type LIMIT`. Limit requests carry item details,
so generate a JSON skeleton and fill it in:
```bash
oci support incident create --generate-full-command-json-input > limit-request.json
# edit problemType=LIMIT, severity (LOW|MEDIUM|HIGH|HIGHEST), title, description, items
oci support incident create --from-json file://limit-request.json
```

## Resource Discovery for Cost Optimization

### Find Idle Resources
```bash
# Find stopped instances (boot volumes still bill; Dense I/O and most GPU shapes bill compute too)
oci compute instance list \
  --compartment-id <compartment-ocid> \
  --lifecycle-state STOPPED \
  --query "data[].{Name:\"display-name\",Shape:shape,Created:\"time-created\"}"

# Find unattached block volumes: AVAILABLE volumes minus attached volume IDs
oci bv volume list --compartment-id <compartment-ocid> --lifecycle-state AVAILABLE --all \
  --query 'data[].id'
oci compute volume-attachment list --compartment-id <compartment-ocid> --all \
  --query 'data[?"lifecycle-state"==`ATTACHED`]."volume-id"'

# Boot volumes (compare with `oci compute boot-volume-attachment list` to find orphans)
oci bv boot-volume list \
  --compartment-id <compartment-ocid> \
  --availability-domain <ad-name> \
  --query "data[].{Name:\"display-name\",SizeGB:\"size-in-gbs\",State:\"lifecycle-state\"}"
```

### Find Over-Provisioned Resources
```bash
# Get CPU utilization for instances
oci monitoring metric-data summarize-metrics-data \
  --compartment-id <compartment-ocid> \
  --namespace "oci_computeagent" \
  --query-text 'CpuUtilization[1d].mean()' \
  --start-time "$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)"  # macOS: date -u -v-7d \
  --end-time "$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# Get memory utilization
oci monitoring metric-data summarize-metrics-data \
  --compartment-id <compartment-ocid> \
  --namespace "oci_computeagent" \
  --query-text 'MemoryUtilization[1d].mean()' \
  --start-time "$(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ)"  # macOS: date -u -v-7d \
  --end-time "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

## Tagging for Cost Allocation

### Create Tag Namespace
```bash
# Create tag namespace
oci iam tag-namespace create \
  --compartment-id <tenancy-ocid> \
  --name "CostAllocation" \
  --description "Tags for cost allocation and chargeback"

# Create required tags
oci iam tag create \
  --tag-namespace-id <namespace-ocid> \
  --name "CostCenter" \
  --description "Finance cost center code"

oci iam tag create \
  --tag-namespace-id <namespace-ocid> \
  --name "Environment" \
  --description "Dev/Test/Prod" \
  --validator '{"validatorType":"ENUM","values":["Dev","Test","Prod","Sandbox"]}'

oci iam tag create \
  --tag-namespace-id <namespace-ocid> \
  --name "Owner" \
  --description "Team or individual owner"
```

### Tag Defaults (Auto-Apply)
```bash
# Create tag default for compartment
oci iam tag-default create \
  --compartment-id <compartment-ocid> \
  --tag-definition-id <tag-definition-ocid> \
  --value "Engineering"

# Create dynamic tag default (uses principal name)
oci iam tag-default create \
  --compartment-id <compartment-ocid> \
  --tag-definition-id <owner-tag-ocid> \
  --value "\${iam.principal.name}"
```

## Cost Reports (Detailed)

### Download Cost Reports
```bash
# Cost and usage reports live in an Oracle-owned bucket: namespace "bling",
# bucket name = your tenancy OCID. Reading it needs the cross-tenancy
# "define tenancy usage-report ... endorse group ... to read objects in tenancy usage-report"
# policy from the Cost and Usage Reports docs.
oci os object list --namespace bling --bucket-name <tenancy-ocid> \
  --prefix "reports/cost-csv/" --all

oci os object get --namespace bling --bucket-name <tenancy-ocid> \
  --name "reports/cost-csv/<object-name>.csv.gz" --file cost-report.csv.gz
```

## Committed Use Pricing

### View Committed Use Discounts
```bash
# List subscribed services
oci onesubscription subscription subscription list \
  --compartment-id <tenancy-ocid>

# Check commitment utilization
oci onesubscription commitment commitment list \
  --compartment-id <tenancy-ocid> \
  --subscribed-service-id <service-id>
```
