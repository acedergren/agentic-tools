# OCI CLI for Landing Zone Operations

Complete OCI CLI commands for deploying and managing landing zones.

## Prerequisites

```bash
# Verify OCI CLI and authentication
oci --version
oci iam region list --output table

# Get tenancy OCID (needed for root compartment operations)
export TENANCY_ID=$(oci iam compartment list --all \
  --compartment-id-in-subtree true \
  --access-level ACCESSIBLE \
  --include-root \
  --query "data[?name=='root'].id | [0]" \
  --raw-output)

echo "Tenancy ID: $TENANCY_ID"
```

## Compartment Management

### Create Compartment Hierarchy

```bash
# 1. Create top-level compartments
NETWORK_CMP=$(oci iam compartment create \
  --compartment-id $TENANCY_ID \
  --name "Network" \
  --description "Network resources and topology" \
  --query 'data.id' --raw-output)

SECURITY_CMP=$(oci iam compartment create \
  --compartment-id $TENANCY_ID \
  --name "Security" \
  --description "Security services" \
  --query 'data.id' --raw-output)

WORKLOADS_CMP=$(oci iam compartment create \
  --compartment-id $TENANCY_ID \
  --name "Workloads" \
  --description "Application workloads" \
  --query 'data.id' --raw-output)

SHARED_CMP=$(oci iam compartment create \
  --compartment-id $TENANCY_ID \
  --name "Shared-Services" \
  --description "Shared platform services" \
  --query 'data.id' --raw-output)

# 2. Create Network sub-compartments
HUB_CMP=$(oci iam compartment create \
  --compartment-id $NETWORK_CMP \
  --name "Hub" \
  --description "Hub VCN for centralized services" \
  --query 'data.id' --raw-output)

SPOKES_CMP=$(oci iam compartment create \
  --compartment-id $NETWORK_CMP \
  --name "Spokes" \
  --description "Spoke VCNs for workloads" \
  --query 'data.id' --raw-output)

# 3. Create Workload compartments
APP1_CMP=$(oci iam compartment create \
  --compartment-id $WORKLOADS_CMP \
  --name "App1" \
  --description "Application 1" \
  --query 'data.id' --raw-output)

# 4. Create environment compartments under App1
APP1_DEV_CMP=$(oci iam compartment create \
  --compartment-id $APP1_CMP \
  --name "Dev" \
  --description "Development environment" \
  --query 'data.id' --raw-output)

APP1_TEST_CMP=$(oci iam compartment create \
  --compartment-id $APP1_CMP \
  --name "Test" \
  --description "Test environment" \
  --query 'data.id' --raw-output)

APP1_PROD_CMP=$(oci iam compartment create \
  --compartment-id $APP1_CMP \
  --name "Prod" \
  --description "Production environment" \
  --query 'data.id' --raw-output)
```

### List Compartment Hierarchy

```bash
# List all compartments with hierarchy
oci iam compartment list \
  --compartment-id $TENANCY_ID \
  --compartment-id-in-subtree true \
  --access-level ACCESSIBLE \
  --all \
  --output table

# Get compartment OCID by name
oci iam compartment list \
  --compartment-id $TENANCY_ID \
  --name "Prod" \
  --compartment-id-in-subtree true \
  --query 'data[0].id' \
  --raw-output
```

### Move Resources Between Compartments

```bash
# Move compute instance to different compartment
oci compute instance change-compartment \
  --instance-id ocid1.instance.oc1..xxx \
  --compartment-id $APP1_PROD_CMP

# Move VCN to different compartment
oci network vcn change-compartment \
  --vcn-id ocid1.vcn.oc1..xxx \
  --compartment-id $NETWORK_CMP
```

## Tag Namespace and Defaults

### Create Tag Namespace

```bash
# Create organization tag namespace
TAG_NAMESPACE=$(oci iam tag-namespace create \
  --compartment-id $TENANCY_ID \
  --name "Organization" \
  --description "Organization-wide required tags" \
  --query 'data.id' --raw-output)

echo "Tag Namespace ID: $TAG_NAMESPACE"
```

### Create Tag Definitions

```bash
# CostCenter tag (mandatory)
COSTCENTER_TAG=$(oci iam tag create \
  --tag-namespace-id $TAG_NAMESPACE \
  --name "CostCenter" \
  --description "Cost center for chargeback" \
  --is-retired false \
  --query 'data.id' --raw-output)

# Environment tag (mandatory, enum)
ENVIRONMENT_TAG=$(oci iam tag create \
  --tag-namespace-id $TAG_NAMESPACE \
  --name "Environment" \
  --description "Environment type" \
  --is-retired false \
  --validator '{
    "validatorType": "ENUM",
    "values": ["Dev", "Test", "Prod", "Sandbox"]
  }' \
  --query 'data.id' --raw-output)

# Owner tag (mandatory)
OWNER_TAG=$(oci iam tag create \
  --tag-namespace-id $TAG_NAMESPACE \
  --name "Owner" \
  --description "Resource owner email or team" \
  --is-retired false \
  --query 'data.id' --raw-output)

# DataClassification tag
DATACLASS_TAG=$(oci iam tag create \
  --tag-namespace-id $TAG_NAMESPACE \
  --name "DataClassification" \
  --description "Data sensitivity classification" \
  --is-retired false \
  --validator '{
    "validatorType": "ENUM",
    "values": ["Public", "Internal", "Confidential", "Restricted"]
  }' \
  --query 'data.id' --raw-output)

# BackupPolicy tag
BACKUP_TAG=$(oci iam tag create \
  --tag-namespace-id $TAG_NAMESPACE \
  --name "BackupPolicy" \
  --description "Backup retention policy" \
  --is-retired false \
  --validator '{
    "validatorType": "ENUM",
    "values": ["None", "Bronze", "Silver", "Gold"]
  }' \
  --query 'data.id' --raw-output)
```

### Set Tag Defaults (Auto-apply Tags)

```bash
# Make Environment=Prod default in Prod compartment
oci iam tag-default create \
  --compartment-id $APP1_PROD_CMP \
  --tag-definition-id $ENVIRONMENT_TAG \
  --value "Prod"

# Make Environment=Dev default in Dev compartment
oci iam tag-default create \
  --compartment-id $APP1_DEV_CMP \
  --tag-definition-id $ENVIRONMENT_TAG \
  --value "Dev"

# Make Owner default to creator's username
oci iam tag-default create \
  --compartment-id $WORKLOADS_CMP \
  --tag-definition-id $OWNER_TAG \
  --value "\${iam.principal.name}"

# Make DataClassification=Internal default
oci iam tag-default create \
  --compartment-id $WORKLOADS_CMP \
  --tag-definition-id $DATACLASS_TAG \
  --value "Internal"
```

### List Tags

```bash
# List all tag namespaces
oci iam tag-namespace list \
  --compartment-id $TENANCY_ID \
  --all \
  --output table

# List tags in namespace
oci iam tag list \
  --tag-namespace-id $TAG_NAMESPACE \
  --all \
  --output table
```

## Security Zones

### Create Security Zone Recipe

```bash
# Create CIS Foundation recipe
CIS_RECIPE=$(oci cloud-guard security-zone-recipe create \
  --compartment-id $TENANCY_ID \
  --display-name "CIS-Foundation-Recipe" \
  --description "CIS OCI Foundations Benchmark security policies" \
  --security-policies '["deny-public-ip-on-compute", "deny-public-bucket", "require-boot-volume-backup", "require-block-volume-backup"]' \
  --query 'data.id' --raw-output)

# Create production-specific recipe (stricter)
PROD_RECIPE=$(oci cloud-guard security-zone-recipe create \
  --compartment-id $TENANCY_ID \
  --display-name "Production-Recipe" \
  --description "Production security requirements" \
  --security-policies '["deny-public-ip-on-compute", "deny-public-bucket", "deny-public-lb", "require-encryption-at-rest", "require-encryption-in-transit", "require-boot-volume-backup", "require-block-volume-backup", "deny-internet-gateway-in-private-subnet"]' \
  --query 'data.id' --raw-output)
```

### Apply Security Zone to Compartment

```bash
# Apply production recipe to prod compartment
oci cloud-guard security-zone create \
  --compartment-id $APP1_PROD_CMP \
  --display-name "App1-Prod-Security-Zone" \
  --description "Security zone for App1 production" \
  --security-zone-recipe-id $PROD_RECIPE

# Apply CIS recipe to test compartment
oci cloud-guard security-zone create \
  --compartment-id $APP1_TEST_CMP \
  --display-name "App1-Test-Security-Zone" \
  --description "Security zone for App1 test" \
  --security-zone-recipe-id $CIS_RECIPE
```

### List Security Zones

```bash
# List all security zones
oci cloud-guard security-zone list \
  --compartment-id $TENANCY_ID \
  --compartment-id-in-subtree true \
  --all \
  --output table

# Get security zone details
oci cloud-guard security-zone get \
  --security-zone-id ocid1.securityzone.oc1..xxx
```

## Cloud Guard Configuration

### Enable Cloud Guard

```bash
# Enable Cloud Guard for tenancy
oci cloud-guard configuration update \
  --reporting-region us-ashburn-1 \
  --status ENABLED \
  --self-manage-resources true

# Check Cloud Guard status
oci cloud-guard configuration get
```

### Create Cloud Guard Target

```bash
# Create target for workloads compartment
CLOUDGUARD_TARGET=$(oci cloud-guard target create \
  --compartment-id $TENANCY_ID \
  --display-name "Workloads-Target" \
  --description "Cloud Guard monitoring for all workloads" \
  --target-resource-type COMPARTMENT \
  --target-resource-id $WORKLOADS_CMP \
  --target-detector-recipes '[
    {
      "detectorRecipeId": "ocid1.cloudguarddetectorrecipe.oc1..configuration",
      "detector": "IAAS_CONFIGURATION_DETECTOR"
    },
    {
      "detectorRecipeId": "ocid1.cloudguarddetectorrecipe.oc1..activity",
      "detector": "IAAS_ACTIVITY_DETECTOR"
    }
  ]' \
  --query 'data.id' --raw-output)
```

### List Cloud Guard Problems

```bash
# List all open problems
oci cloud-guard problem list \
  --compartment-id $TENANCY_ID \
  --compartment-id-in-subtree true \
  --lifecycle-state OPEN \
  --output table

# List problems by risk level
oci cloud-guard problem list \
  --compartment-id $WORKLOADS_CMP \
  --risk-level CRITICAL \
  --output table
```

## Budget Management

### Create Budget for Compartment

```bash
# Create monthly budget for production
PROD_BUDGET=$(oci budgets budget create \
  --compartment-id $TENANCY_ID \
  --amount 25000 \
  --reset-period MONTHLY \
  --target-type COMPARTMENT \
  --targets "[$APP1_PROD_CMP]" \
  --display-name "App1-Prod-Monthly-Budget" \
  --description "Production environment monthly budget: \$25,000" \
  --query 'data.id' --raw-output)

# Create budget for dev environment (lower threshold)
DEV_BUDGET=$(oci budgets budget create \
  --compartment-id $TENANCY_ID \
  --amount 5000 \
  --reset-period MONTHLY \
  --target-type COMPARTMENT \
  --targets "[$APP1_DEV_CMP]" \
  --display-name "App1-Dev-Monthly-Budget" \
  --description "Dev environment monthly budget: \$5,000" \
  --query 'data.id' --raw-output)

# Create budget for tags (cost center-based)
oci budgets budget create \
  --compartment-id $TENANCY_ID \
  --amount 50000 \
  --reset-period MONTHLY \
  --target-type TAG \
  --targets '["Organization.CostCenter=Engineering"]' \
  --display-name "Engineering-CostCenter-Budget" \
  --description "Engineering cost center budget: \$50,000"
```

### Create Budget Alert Rules

```bash
# Alert at 50% threshold
oci budgets alert-rule create \
  --budget-id $PROD_BUDGET \
  --type ACTUAL \
  --threshold 50 \
  --threshold-type PERCENTAGE \
  --display-name "Prod-50%-Warning" \
  --message "Production budget at 50% (\$12,500)" \
  --recipients "sre-team@example.com"

# Alert at 80% threshold
oci budgets alert-rule create \
  --budget-id $PROD_BUDGET \
  --type ACTUAL \
  --threshold 80 \
  --threshold-type PERCENTAGE \
  --display-name "Prod-80%-Critical" \
  --message "Production budget at 80% (\$20,000) - CRITICAL" \
  --recipients "sre-team@example.com,cfo@example.com"

# Alert at 100% threshold
oci budgets alert-rule create \
  --budget-id $PROD_BUDGET \
  --type ACTUAL \
  --threshold 100 \
  --threshold-type PERCENTAGE \
  --display-name "Prod-100%-Exceeded" \
  --message "Production budget EXCEEDED (\$25,000)" \
  --recipients "sre-team@example.com,cfo@example.com,ceo@example.com"

# Forecast alert (predict 100% in current month)
oci budgets alert-rule create \
  --budget-id $PROD_BUDGET \
  --type FORECAST \
  --threshold 100 \
  --threshold-type PERCENTAGE \
  --display-name "Prod-Forecast-100%" \
  --message "Production forecasted to exceed budget this month" \
  --recipients "sre-team@example.com"
```

### List Budgets

```bash
# List all budgets
oci budgets budget list \
  --compartment-id $TENANCY_ID \
  --target-type COMPARTMENT \
  --output table

# Get budget utilization
oci budgets budget get \
  --budget-id $PROD_BUDGET
```

## Hub-Spoke Network Topology

### Create Hub VCN

```bash
# Create Hub VCN in Hub compartment
HUB_VCN=$(oci network vcn create \
  --compartment-id $HUB_CMP \
  --display-name "Hub-VCN" \
  --cidr-blocks '["10.0.0.0/16"]' \
  --dns-label "hub" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Create Hub subnets
HUB_PUBLIC_SUBNET=$(oci network subnet create \
  --compartment-id $HUB_CMP \
  --vcn-id $HUB_VCN \
  --display-name "Hub-Public-Subnet" \
  --cidr-block "10.0.1.0/24" \
  --prohibit-public-ip-on-vnic false \
  --dns-label "hubpub" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

HUB_PRIVATE_SUBNET=$(oci network subnet create \
  --compartment-id $HUB_CMP \
  --vcn-id $HUB_VCN \
  --display-name "Hub-Private-Subnet" \
  --cidr-block "10.0.2.0/24" \
  --prohibit-public-ip-on-vnic true \
  --dns-label "hubpriv" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)
```

### Create DRG (Dynamic Routing Gateway)

```bash
# Create DRG for hub-spoke connectivity
DRG=$(oci network drg create \
  --compartment-id $NETWORK_CMP \
  --display-name "Hub-Spoke-DRG" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Attach Hub VCN to DRG
HUB_DRG_ATTACHMENT=$(oci network drg-attachment create \
  --drg-id $DRG \
  --display-name "Hub-VCN-Attachment" \
  --vcn-id $HUB_VCN \
  --wait-for-state ATTACHED \
  --query 'data.id' --raw-output)
```

### Create Spoke VCNs

```bash
# Create Spoke VCN for App1 Prod
SPOKE1_VCN=$(oci network vcn create \
  --compartment-id $SPOKES_CMP \
  --display-name "Spoke-App1-Prod-VCN" \
  --cidr-blocks '["10.10.0.0/16"]' \
  --dns-label "app1prod" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Attach Spoke1 to DRG
SPOKE1_DRG_ATTACHMENT=$(oci network drg-attachment create \
  --drg-id $DRG \
  --display-name "Spoke-App1-Prod-Attachment" \
  --vcn-id $SPOKE1_VCN \
  --wait-for-state ATTACHED \
  --query 'data.id' --raw-output)

# Create Spoke VCN for App1 Dev
SPOKE2_VCN=$(oci network vcn create \
  --compartment-id $SPOKES_CMP \
  --display-name "Spoke-App1-Dev-VCN" \
  --cidr-blocks '["10.11.0.0/16"]' \
  --dns-label "app1dev" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Attach Spoke2 to DRG
SPOKE2_DRG_ATTACHMENT=$(oci network drg-attachment create \
  --drg-id $DRG \
  --display-name "Spoke-App1-Dev-Attachment" \
  --vcn-id $SPOKE2_VCN \
  --wait-for-state ATTACHED \
  --query 'data.id' --raw-output)
```

### Configure Hub NAT Gateway (Shared Egress)

```bash
# Create NAT Gateway in Hub VCN
HUB_NAT=$(oci network nat-gateway create \
  --compartment-id $HUB_CMP \
  --vcn-id $HUB_VCN \
  --display-name "Hub-NAT-Gateway" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Create Service Gateway in Hub VCN (free egress to OCI services)
HUB_SGW=$(oci network service-gateway create \
  --compartment-id $HUB_CMP \
  --vcn-id $HUB_VCN \
  --services '[{"serviceId": "ocid1.service.oc1.iad.xxx"}]' \
  --display-name "Hub-Service-Gateway" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Get default route table for Hub VCN
HUB_RT=$(oci network vcn get \
  --vcn-id $HUB_VCN \
  --query 'data["default-route-table-id"]' \
  --raw-output)

# Add route to NAT Gateway for internet egress
oci network route-table update \
  --rt-id $HUB_RT \
  --route-rules '[
    {
      "destination": "0.0.0.0/0",
      "destinationType": "CIDR_BLOCK",
      "networkEntityId": "'$HUB_NAT'"
    },
    {
      "destination": "all-iad-services-in-oracle-services-network",
      "destinationType": "SERVICE_CIDR_BLOCK",
      "networkEntityId": "'$HUB_SGW'"
    }
  ]' \
  --force
```

### Configure DRG Route Tables (Spoke-to-Hub Routing)

```bash
# Get DRG route table ID
DRG_RT=$(oci network drg list-drg-route-tables \
  --drg-id $DRG \
  --query 'data[0].id' \
  --raw-output)

# Add route distribution to allow spokes to reach hub
oci network drg-route-distribution create \
  --drg-id $DRG \
  --distribution-type IMPORT \
  --display-name "Import-All-VCN-Routes"
```

## Resource Manager Stacks

### Upload Landing Zone Terraform Configuration

```bash
# Create ZIP file with Terraform configs
cd landing-zone-terraform/
zip -r ../landing-zone.zip ./*
cd ..

# Create Resource Manager stack
STACK=$(oci resource-manager stack create \
  --compartment-id $TENANCY_ID \
  --display-name "OCI-Landing-Zone-Stack" \
  --description "Complete landing zone deployment" \
  --config-source-type ZIP_UPLOAD \
  --zip-file-base64 "$(base64 landing-zone.zip)" \
  --variables '{
    "tenancy_ocid": "'$TENANCY_ID'",
    "region": "us-ashburn-1",
    "compartment_hierarchy": true,
    "security_zones_enabled": true,
    "hub_spoke_topology": true
  }' \
  --wait-for-state SUCCEEDED \
  --query 'data.id' --raw-output)

# Plan the stack
PLAN_JOB=$(oci resource-manager job create-plan-job \
  --stack-id $STACK \
  --wait-for-state SUCCEEDED \
  --query 'data.id' --raw-output)

# Apply the stack
APPLY_JOB=$(oci resource-manager job create-apply-job \
  --stack-id $STACK \
  --execution-plan-strategy AUTO_APPROVED \
  --wait-for-state SUCCEEDED \
  --query 'data.id' --raw-output)

# Get outputs
oci resource-manager stack get-stack-tf-state \
  --stack-id $STACK \
  --file stack-outputs.tfstate
```

## Multi-Region Setup

### Create DR Region Landing Zone

```bash
# Set DR region
export OCI_CLI_REGION=us-phoenix-1

# Create same compartment hierarchy in DR region
# (Compartments are global, but resources are regional)

# Create DR Hub VCN
DR_HUB_VCN=$(oci network vcn create \
  --compartment-id $HUB_CMP \
  --display-name "Hub-VCN-DR" \
  --cidr-blocks '["10.100.0.0/16"]' \
  --dns-label "hubdr" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Create DR DRG
DR_DRG=$(oci network drg create \
  --compartment-id $NETWORK_CMP \
  --display-name "Hub-Spoke-DRG-DR" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Create Remote Peering Connection (primary to DR)
export OCI_CLI_REGION=us-ashburn-1
PRIMARY_RPC=$(oci network remote-peering-connection create \
  --compartment-id $NETWORK_CMP \
  --drg-id $DRG \
  --display-name "Primary-to-DR-RPC" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

export OCI_CLI_REGION=us-phoenix-1
DR_RPC=$(oci network remote-peering-connection create \
  --compartment-id $NETWORK_CMP \
  --drg-id $DR_DRG \
  --display-name "DR-to-Primary-RPC" \
  --wait-for-state AVAILABLE \
  --query 'data.id' --raw-output)

# Connect the peering
oci network remote-peering-connection connect \
  --remote-peering-connection-id $DR_RPC \
  --peer-id $PRIMARY_RPC \
  --peer-region-name us-ashburn-1
```

## Validation and Reporting

### List All Landing Zone Resources

```bash
# List compartments
oci iam compartment list \
  --compartment-id $TENANCY_ID \
  --compartment-id-in-subtree true \
  --all \
  --output table

# List VCNs across all compartments
oci network vcn list \
  --compartment-id $TENANCY_ID \
  --all \
  --output table

# List Security Zones
oci cloud-guard security-zone list \
  --compartment-id $TENANCY_ID \
  --compartment-id-in-subtree true \
  --all \
  --output table

# List Budgets
oci budgets budget list \
  --compartment-id $TENANCY_ID \
  --output table
```

### Generate Cost Report by Compartment

```bash
# Get usage data for compartment
oci usage-api usage summarized-usage get \
  --tenant-id $TENANCY_ID \
  --time-usage-started "2026-01-01T00:00:00Z" \
  --time-usage-ended "2026-01-31T23:59:59Z" \
  --granularity MONTHLY \
  --query-type COST \
  --group-by "[\"compartmentPath\"]" \
  --output json | jq '.data.items[] | {
    compartment: .tags["Oracle-Tags"]["CreatedBy"],
    cost: .["computed-amount"]
  }'
```

## Best Practices

### Always Use --wait-for-state

```bash
# ✅ GOOD - waits for compartment to be active
oci iam compartment create \
  --compartment-id $TENANCY_ID \
  --name "Prod" \
  --wait-for-state ACTIVE

# ❌ BAD - returns immediately, compartment may not be ready
oci iam compartment create \
  --compartment-id $TENANCY_ID \
  --name "Prod"
```

### Use Environment Variables for OCIDs

```bash
# ✅ GOOD - reusable, maintainable
PROD_CMP=$(oci iam compartment create ... --query 'data.id' --raw-output)
oci network vcn create --compartment-id $PROD_CMP

# ❌ BAD - error-prone
oci network vcn create --compartment-id ocid1.compartment.oc1..xxx
```

### Document CIDR Allocations

```bash
# Maintain CIDR allocation table
cat > cidr-allocation.txt <<EOF
Hub VCN: 10.0.0.0/16
Spoke-App1-Prod: 10.10.0.0/16
Spoke-App1-Test: 10.20.0.0/16
Spoke-App1-Dev: 10.30.0.0/16
Spoke-App2-Prod: 10.40.0.0/16
On-premises: 172.16.0.0/12
Reserved-Future: 10.50.0.0/16 - 10.99.0.0/16
EOF

# Check for overlaps before creating VCN
grep "10.10.0.0" cidr-allocation.txt
```

## When to Use Landing Zone CLI

**Use these commands when you need to:**
- Set up initial OCI tenancy structure
- Create compartment hierarchies
- Implement Security Zones and Cloud Guard
- Configure tagging strategy
- Deploy hub-spoke network topology
- Create budgets and cost controls
- Implement multi-region DR

**Don't use for:**
- Individual resource creation (covered in service-specific skills)
- Day-to-day operations (use service-specific CLIs)
- Troubleshooting (covered in other skills)
