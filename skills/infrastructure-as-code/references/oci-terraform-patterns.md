# OCI Terraform and Resource Manager Patterns

## Provider Configuration

### Basic Provider Setup
```hcl
terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 5.0"
    }
  }
}

# API Key authentication
provider "oci" {
  tenancy_ocid     = var.tenancy_ocid
  user_ocid        = var.user_ocid
  private_key_path = var.private_key_path
  fingerprint      = var.fingerprint
  region           = var.region
}

# Instance Principal (for OCI compute)
provider "oci" {
  auth   = "InstancePrincipal"
  region = var.region
}

# Resource Principal (for OCI Functions)
provider "oci" {
  auth   = "ResourcePrincipal"
  region = var.region
}
```

### Multi-Region Configuration
```hcl
provider "oci" {
  alias  = "primary"
  region = "us-ashburn-1"
  # ... auth config
}

provider "oci" {
  alias  = "dr"
  region = "us-phoenix-1"
  # ... auth config
}

# Use provider alias in resources
resource "oci_core_vcn" "primary_vcn" {
  provider       = oci.primary
  compartment_id = var.compartment_id
  cidr_block     = "10.0.0.0/16"
}

resource "oci_core_vcn" "dr_vcn" {
  provider       = oci.dr
  compartment_id = var.compartment_id
  cidr_block     = "10.1.0.0/16"
}
```

## Resource Manager Stack Operations

### CLI Commands
```bash
# Create stack from directory
oci resource-manager stack create \
  --compartment-id <compartment-ocid> \
  --config-source '{"configSourceType":"ZIP_UPLOAD","zipFileBase64Encoded":"<base64-encoded-zip>"}' \
  --display-name "my-infrastructure"

# Create stack from Git
oci resource-manager stack create \
  --compartment-id <compartment-ocid> \
  --config-source '{"configSourceType":"GIT_CONFIG_SOURCE","configurationSourceProviderId":"<provider-ocid>","repositoryUrl":"https://github.com/org/repo","branchName":"main","workingDirectory":"terraform/"}' \
  --display-name "my-infrastructure"

# List stacks
oci resource-manager stack list --compartment-id <compartment-ocid>

# Run plan
oci resource-manager job create-plan-job \
  --stack-id <stack-ocid>

# Run apply
oci resource-manager job create-apply-job \
  --stack-id <stack-ocid> \
  --execution-plan-strategy "AUTO_APPROVED"

# Run destroy
oci resource-manager job create-destroy-job \
  --stack-id <stack-ocid> \
  --execution-plan-strategy "AUTO_APPROVED"

# Get job logs
oci resource-manager job get-job-logs \
  --job-id <job-ocid>
```

## Common Resource Patterns

### VCN with Public and Private Subnets
```hcl
resource "oci_core_vcn" "main" {
  compartment_id = var.compartment_id
  cidr_blocks    = [var.vcn_cidr]
  display_name   = "${var.prefix}-vcn"
  dns_label      = var.dns_label
}

resource "oci_core_internet_gateway" "main" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.prefix}-igw"
}

resource "oci_core_nat_gateway" "main" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.prefix}-natgw"
}

resource "oci_core_service_gateway" "main" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.prefix}-sgw"
  services {
    service_id = data.oci_core_services.all_services.services[0].id
  }
}

# Public subnet (uses IGW)
resource "oci_core_subnet" "public" {
  compartment_id    = var.compartment_id
  vcn_id            = oci_core_vcn.main.id
  cidr_block        = cidrsubnet(var.vcn_cidr, 8, 0)
  display_name      = "${var.prefix}-public-subnet"
  dns_label         = "public"
  route_table_id    = oci_core_route_table.public.id
  security_list_ids = [oci_core_security_list.public.id]
}

# Private subnet (uses NAT)
resource "oci_core_subnet" "private" {
  compartment_id             = var.compartment_id
  vcn_id                     = oci_core_vcn.main.id
  cidr_block                 = cidrsubnet(var.vcn_cidr, 8, 1)
  display_name               = "${var.prefix}-private-subnet"
  dns_label                  = "private"
  prohibit_public_ip_on_vnic = true
  route_table_id             = oci_core_route_table.private.id
  security_list_ids          = [oci_core_security_list.private.id]
}
```

### Compute Instance with Boot Volume Backup
```hcl
resource "oci_core_instance" "main" {
  compartment_id      = var.compartment_id
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  shape               = "VM.Standard.E4.Flex"
  display_name        = "${var.prefix}-instance"

  shape_config {
    ocpus         = var.instance_ocpus
    memory_in_gbs = var.instance_memory_gbs
  }

  create_vnic_details {
    subnet_id        = oci_core_subnet.private.id
    assign_public_ip = false
  }

  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.oracle_linux.images[0].id
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
  }

  freeform_tags = var.freeform_tags
  defined_tags  = var.defined_tags
}

# Backup policy
resource "oci_core_volume_backup_policy_assignment" "main" {
  asset_id  = oci_core_instance.main.boot_volume_id
  policy_id = data.oci_core_volume_backup_policies.predefined.volume_backup_policies[0].id # Bronze/Silver/Gold
}
```

### Autonomous Database
```hcl
resource "oci_database_autonomous_database" "main" {
  compartment_id           = var.compartment_id
  db_name                  = var.adb_name
  display_name             = "${var.prefix}-adb"
  db_workload              = "OLTP"  # or "DW" for data warehouse
  is_auto_scaling_enabled  = true
  cpu_core_count           = var.adb_ocpu_count
  data_storage_size_in_tbs = var.adb_storage_tbs
  admin_password           = var.adb_admin_password

  # Network configuration (private endpoint)
  subnet_id           = oci_core_subnet.private.id
  nsg_ids             = [oci_core_network_security_group.adb.id]
  is_mtls_connection_required = false  # Allow TLS-only connections

  # Backup configuration
  is_auto_backup_enabled = true

  # Maintenance window
  autonomous_maintenance_schedule_type = "REGULAR"

  freeform_tags = var.freeform_tags
  defined_tags  = var.defined_tags
}
```

## State Management

### Remote State in Object Storage
```hcl
terraform {
  backend "http" {
    address       = "https://objectstorage.<region>.oraclecloud.com/p/<par-token>/n/<namespace>/b/<bucket>/o/terraform.tfstate"
    update_method = "PUT"
  }
}

# Alternative: Use S3-compatible backend
terraform {
  backend "s3" {
    bucket                      = "terraform-state"
    key                         = "prod/terraform.tfstate"
    region                      = "us-ashburn-1"
    endpoint                    = "https://<namespace>.compat.objectstorage.<region>.oraclecloud.com"
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    force_path_style            = true
  }
}
```

## Drift Detection

### CLI Commands
```bash
# Detect drift
oci resource-manager stack detect-stack-drift \
  --stack-id <stack-ocid>

# Get drift detection status
oci resource-manager stack get-stack-drift-detection-status \
  --stack-id <stack-ocid>

# List resources with drift
oci resource-manager resource-drift-collection list \
  --stack-id <stack-ocid>
```

## Landing Zone Module Usage

```hcl
module "landing_zone" {
  source  = "oracle-terraform-modules/landing-zone/oci"
  version = "~> 2.0"

  # Required
  tenancy_ocid     = var.tenancy_ocid
  home_region      = var.home_region
  deploy_regions   = ["us-ashburn-1", "us-phoenix-1"]

  # Compartments
  compartments_configuration = {
    enable_delete = false
    compartments = {
      NETWORK = { name = "Network" }
      SECURITY = { name = "Security" }
      WORKLOADS = { name = "Workloads" }
    }
  }

  # Network
  network_configuration = {
    default_compartment_id = module.landing_zone.compartments["NETWORK"].id
    vcns = {
      HUB-VCN = {
        cidr_blocks = ["10.0.0.0/16"]
        subnets = {
          PUBLIC-SUBNET  = { cidr_block = "10.0.0.0/24" }
          PRIVATE-SUBNET = { cidr_block = "10.0.1.0/24" }
        }
      }
    }
  }

  # Security Zones
  security_zones_configuration = {
    default_compartment_id = module.landing_zone.compartments["WORKLOADS"].id
    security_zones = {
      PROD-ZONE = {
        compartment_id = module.landing_zone.compartments["WORKLOADS"].id
        recipe_name    = "PROD_RECIPE"
      }
    }
  }
}
```

## Best Practices

### Module Structure
```
terraform/
├── modules/
│   ├── compute/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── network/
│   └── database/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── test/
│   └── prod/
└── shared/
    └── data.tf
```

### Variable Validation
```hcl
variable "environment" {
  type        = string
  description = "Environment name (dev, test, prod)"

  validation {
    condition     = contains(["dev", "test", "prod"], var.environment)
    error_message = "Environment must be one of: dev, test, prod."
  }
}

variable "instance_shape" {
  type        = string
  description = "Compute instance shape"

  validation {
    condition     = can(regex("^VM\\.", var.instance_shape))
    error_message = "Instance shape must be a VM shape (VM.*)."
  }
}
```
