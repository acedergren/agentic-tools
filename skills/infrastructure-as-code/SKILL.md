---
name: infrastructure-as-code
description: "Use when writing Terraform for OCI, troubleshooting provider errors, managing state files, or implementing Resource Manager stacks. Covers terraform-provider-oci gotchas, resource lifecycle anti-patterns, state drift/corruption recovery, authentication precedence, and OCI Landing Zones. KEYWORDS: Terraform, OCI provider, state, Resource Manager, lifecycle, drift, import, 409, availability domain, boot volume, flex shape."
---

# OCI Infrastructure as Code - Expert Knowledge

## NEVER Do This

**NEVER hardcode OCIDs in Terraform (breaks portability)**
```hcl
# WRONG - breaks when moving between regions/tenancies
resource "oci_core_instance" "web" {
  compartment_id = "ocid1.compartment.oc1..aaaaaa..."  # Hardcoded!
  subnet_id      = "ocid1.subnet.oc1.phx.bbbbbb..."   # Hardcoded!
}

# RIGHT - variables or data sources
resource "oci_core_instance" "web" {
  compartment_id = var.compartment_ocid
  subnet_id      = data.oci_core_subnet.existing.id
}
```

**NEVER hardcode availability domain names**
```hcl
# WRONG - AD names are tenant-specific (fMgC: prefix differs per tenancy)
availability_domain = "fMgC:US-ASHBURN-AD-1"

# RIGHT - query dynamically
data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}
resource "oci_core_instance" "web" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
}
```

**NEVER use `preserve_boot_volume = true` in dev/test (default behavior is true!)**
```hcl
# WRONG - default! Orphans boot volumes when instance is destroyed
resource "oci_core_instance" "dev" {
  # preserve_boot_volume not set = defaults to true
}

# RIGHT - explicit cleanup in dev/test
resource "oci_core_instance" "dev" {
  preserve_boot_volume = false
}
```
Cost impact: dev team with 10 instances cycling through testing = $50–500/month in silent orphaned volumes.

**NEVER skip `lifecycle` blocks on production databases**
```hcl
# RIGHT - protect production resources from accidental destroy
resource "oci_database_autonomous_database" "prod" {
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [defined_tags]  # Ignore tag edits made via console
  }
}
```
Without this: a mistyped `terraform destroy -target` deletes a production database permanently.

**NEVER use `count` for resources that shouldn't be replaced on list reorder**
```hcl
# WRONG - reordering instance_names from ["web1","web2"] to ["web0","web1","web2"]
#         causes Terraform to RECREATE all instances
resource "oci_core_instance" "web" {
  count        = length(var.instance_names)
  display_name = var.instance_names[count.index]
}

# RIGHT - for_each with stable keys
resource "oci_core_instance" "web" {
  for_each     = toset(var.instance_names)
  display_name = each.value
}
```

**NEVER store Terraform state locally for team use**
```hcl
# WRONG - no locking, no collaboration
terraform { backend "local" {} }

# RIGHT - OCI Object Storage with S3-compatible backend
terraform {
  backend "s3" {
    bucket                      = "terraform-state"
    key                         = "prod/terraform.tfstate"
    region                      = "us-phoenix-1"
    endpoint                    = "https://<namespace>.compat.objectstorage.us-phoenix-1.oraclecloud.com"
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    use_path_style              = true
  }
}
```

## OCI Provider Authentication Gotchas

**Authentication precedence** (silent override is a common footgun):
1. Explicit provider block credentials
2. `TF_VAR_*` environment variables
3. `~/.oci/config` file (DEFAULT profile)
4. Instance Principal (`auth = "InstancePrincipal"`)

Common mistake: setting env vars but an explicit provider block overrides them without any warning.

**Instance Principal for Terraform running on OCI compute:**
```hcl
provider "oci" {
  auth   = "InstancePrincipal"
  region = var.region
}
```
Critical: the instance must be in the dynamic group BEFORE Terraform runs. If added after, auth fails with the cryptic error: `"authorization failed or requested resource not found"`.

## State Management

### Fixing State Drift

State drift happens when resources are modified outside Terraform (console, CLI, API).

```bash
terraform plan    # Shows unexpected changes — identifies drift
terraform refresh # Updates state to match actual OCI reality (safe read-only op)

# For new resources created outside Terraform:
terraform import oci_core_vcn.main ocid1.vcn.oc1.phx.xxxxx
```

Suppress drift from console tag edits (common source of noise):
```hcl
lifecycle {
  ignore_changes = [defined_tags, freeform_tags]
}
```

### Fixing "409 Conflict — Resource Already Exists"

Cause: resource exists in OCI but not in state file (e.g., created manually or previous import failure).

```bash
terraform import oci_core_vcn.main ocid1.vcn.oc1.phx.xxxxx
terraform plan   # Should now show no changes for that resource
```

### State File Corruption Recovery

```bash
# 1. Backup first
cp terraform.tfstate terraform.tfstate.backup

# 2. Try state pull repair
terraform state pull > recovered.tfstate
mv recovered.tfstate terraform.tfstate

# 3. If that fails, restore from Object Storage versioning
# 4. Last resort: reconstruct with terraform import for each resource
```

Prevention: enable Object Storage bucket versioning on the state backend.

## Destroy Failures (Dependency Order)

```
Error: Resource still in use
```

OCI enforces strict dependency order on destroy: instances must be terminated before subnets, subnets before VCN, etc.

```bash
# Visualize the dependency graph
terraform graph | dot -Tpng > graph.png

# Destroy in reverse dependency order
terraform destroy -target=oci_core_instance.web
terraform destroy -target=oci_core_subnet.private
terraform destroy -target=oci_core_vcn.main
```

## Timeouts for Long-Running OCI Resources

OCI resource provisioning times vary significantly. Default Terraform timeouts often cause false failures:

```hcl
# Autonomous Database: 15-30 min to provision (default 20m is borderline)
resource "oci_database_autonomous_database" "prod" {
  timeouts {
    create = "60m"
    update = "60m"
    delete = "30m"
  }
}

# Compute: usually fast, but capacity issues can cause retries
resource "oci_core_instance" "web" {
  timeouts {
    create = "30m"
  }
}
```

## OCI Landing Zones

Use [oracle-terraform-modules/terraform-oci-landing-zones](https://github.com/oracle-terraform-modules/terraform-oci-landing-zones) for:
- Greenfield tenancy setup requiring CIS OCI Foundations Benchmark compliance
- Multi-environment (dev/test/prod) with hub-and-spoke networking
- Centralized logging, Cloud Guard, and Security Zones

**Do NOT use Landing Zone for:**
- Brownfield (existing infrastructure) — too opinionated, causes state conflicts
- Simple single-app deployments — the module overhead exceeds the value

## Progressive Loading Reference

Load [`references/oci-terraform-patterns.md`](references/oci-terraform-patterns.md) when:
- Setting up provider configuration (multi-region, auth methods)
- Resource Manager stack operations via CLI
- Common resource patterns with full HCL examples (VCN, compute, ADB)
- Landing Zone module usage examples

Do NOT load for NEVER-list gotchas, lifecycle management, or state troubleshooting — this file covers those.
