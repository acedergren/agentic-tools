# OCI Cost Management CLI Reference

## Cost Analysis

### Usage Reports
```bash
# List usage reports (requires tenancy-level permissions)
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2024-01-01T00:00:00Z" \
  --time-usage-ended "2024-01-31T23:59:59Z" \
  --granularity "DAILY"

# Get usage by service
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2024-01-01T00:00:00Z" \
  --time-usage-ended "2024-01-31T23:59:59Z" \
  --granularity "MONTHLY" \
  --group-by '["service"]'

# Get usage by compartment
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2024-01-01T00:00:00Z" \
  --time-usage-ended "2024-01-31T23:59:59Z" \
  --granularity "MONTHLY" \
  --group-by '["compartmentPath"]'

# Get usage by tag
oci usage-api usage-summary request-summarized-usages \
  --tenant-id <tenancy-ocid> \
  --time-usage-started "2024-01-01T00:00:00Z" \
  --time-usage-ended "2024-01-31T23:59:59Z" \
  --granularity "MONTHLY" \
  --group-by '["tagKey"]' \
  --filter '{"operator":"AND","dimensions":[{"key":"tagNamespace","value":"Organization"}]}'
```

## Budget Management

### Create Budgets
```bash
# Create monthly compartment budget
oci budgets budget create \
  --compartment-id <compartment-ocid> \
  --target-type "COMPARTMENT" \
  --targets '["<target-compartment-ocid>"]' \
  --amount 10000 \
  --reset-period "MONTHLY" \
  --display-name "dev-monthly-budget"

# Create tag-based budget
oci budgets budget create \
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
oci budgets alert-rule create \
  --budget-id <budget-ocid> \
  --type "ACTUAL" \
  --threshold 80 \
  --threshold-type "PERCENTAGE" \
  --recipients "team@example.com,alerts@example.com" \
  --display-name "80-percent-alert"

# Create forecast alert
oci budgets alert-rule create \
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
oci budgets budget list --compartment-id <tenancy-ocid> --all

# Get budget status
oci budgets budget get --budget-id <budget-ocid>

# List alert rules for a budget
oci budgets alert-rule list --budget-id <budget-ocid>
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
```bash
# Create limit increase request
oci support incident create \
  --compartment-id <tenancy-ocid> \
  --csi "<customer-support-identifier>" \
  --problem-type "tech" \
  --severity "normal" \
  --title "Service Limit Increase Request: Compute Cores" \
  --description "Request to increase VM.Standard.E4.Flex core count from 100 to 200"
```

## Resource Discovery for Cost Optimization

### Find Idle Resources
```bash
# Find stopped instances (still charged for boot volumes)
oci compute instance list \
  --compartment-id <compartment-ocid> \
  --lifecycle-state STOPPED \
  --query "data[].{Name:\"display-name\",Shape:shape,Created:\"time-created\"}"

# Find unattached block volumes
oci bv volume list \
  --compartment-id <compartment-ocid> \
  --lifecycle-state AVAILABLE \
  --query "data[?!\"volume-attachments\"].{Name:\"display-name\",SizeGB:\"size-in-gbs\"}"

# Find orphaned boot volumes (no instance)
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
  --start-time "$(date -v-7d +%Y-%m-%dT%H:%M:%SZ)" \
  --end-time "$(date +%Y-%m-%dT%H:%M:%SZ)"

# Get memory utilization
oci monitoring metric-data summarize-metrics-data \
  --compartment-id <compartment-ocid> \
  --namespace "oci_computeagent" \
  --query-text 'MemoryUtilization[1d].mean()' \
  --start-time "$(date -v-7d +%Y-%m-%dT%H:%M:%SZ)" \
  --end-time "$(date +%Y-%m-%dT%H:%M:%SZ)"
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
# Cost reports are stored in Object Storage at:
# oci://oci-{tenancy-name}/reports/cost-csv/{date}/

# List available cost reports
oci os object list \
  --bucket-name "oci-<tenancy-name>" \
  --prefix "reports/cost-csv/"

# Download cost report
oci os object get \
  --bucket-name "oci-<tenancy-name>" \
  --name "reports/cost-csv/2024-01/cost-report.csv" \
  --file cost-report-2024-01.csv
```

## Committed Use Pricing

### View Committed Use Discounts
```bash
# List subscribed services
oci onesubscription subscription list \
  --compartment-id <tenancy-ocid>

# Check commitment utilization
oci onesubscription commitment list \
  --compartment-id <tenancy-ocid> \
  --subscribed-service-id <service-id>
```
