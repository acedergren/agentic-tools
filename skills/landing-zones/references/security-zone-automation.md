# Security Zone Automation Runbook

Use this playbook when rolling out Security Zones, recipes, and monitoring at
scale across compartments/environments. All commands assume OCI CLI.

## 1. Define Security Policies (Recipe)

```bash
RECIPE_NAME="CIS-Prod-Recipe"
OCI_REGION="us-ashburn-1"

oci cloud-guard security-policy list --all \
  --query 'data[].{"name":"display-name","id":"id"}' --output table

# capture policy OCIDs you want to enforce
# Example filters for specific display names
POLICY_IDS_JSON=$(oci cloud-guard security-policy list --all \
  --query 'data[?"display-name"==`deny-public-ip` || "display-name"==`deny-public-bucket` || "display-name"==`require-encryption`].id')

oci cloud-guard security-zone-recipe create \
  --compartment-id "$TENANCY_OCID" \
  --display-name "$RECIPE_NAME" \
  --security-policies "$POLICY_IDS_JSON"

RECIPE_ID=$(oci cloud-guard security-zone-recipe list --compartment-id "$TENANCY_OCID" \
  --display-name "$RECIPE_NAME" --query 'data[0].id' --raw-output)
```

## 2. Apply Recipe to Compartments

```bash
for COMPARTMENT in $(jq -r '.compartments[].id' compartments.json); do
  oci cloud-guard security-zone create \
    --compartment-id "$COMPARTMENT" \
    --display-name "$(oci iam compartment get --compartment-id "$COMPARTMENT" --query 'data."name"' --raw-output)-SZ" \
    --security-zone-recipe-id "$RECIPE_ID" \
    --wait-for-state ACTIVE
done
```

**Tip:** Generate `compartments.json` via `oci iam compartment list --all --compartment-id $TENANCY_OCID` and filter by tag (e.g., `Environment=Prod`).

## 3. Automate with Terraform

```hcl
resource "oci_cloud_guard_security_zone" "prod" {
  compartment_id         = oci_identity_compartment.prod.id
  display_name           = "${var.compartment_name}-security-zone"
  security_zone_recipe_id = oci_cloud_guard_security_zone_recipe.prod.id
}

data "oci_cloud_guard_security_policies" "all" {
  compartment_id = var.tenancy_ocid
}

locals {
  required_policy_names = ["deny-public-ip", "deny-public-bucket", "require-cmk-encryption"]
}

resource "oci_cloud_guard_security_zone_recipe" "prod" {
  compartment_id   = var.tenancy_ocid
  display_name     = "CIS-Prod"
  security_policies = [
    for policy in data.oci_cloud_guard_security_policies.all.security_policies : policy.id
    if contains(local.required_policy_names, policy.display_name)
  ]
}
```

Apply after any manual change so state remains accurate.

## 4. Verification Commands

```bash
oci cloud-guard security-zone get --security-zone-id $ZONE_ID --query 'data."lifecycle-state"'
oci cloud-guard security-zone list --compartment-id $TENANCY_OCID --all --output table
oci cloud-guard security-zone list-problems --security-zone-id $ZONE_ID --all --output table
```

Alert SRE if any compartment re-enters `PROBLEM` state after remediation.

## 5. Rollback / Removal

```bash
oci cloud-guard security-zone delete --security-zone-id $ZONE_ID --force
oci cloud-guard security-zone-recipe delete --security-zone-recipe-id $RECIPE_ID --force
```

Only remove zones with compliance approval. Document reason in incident ticket.
