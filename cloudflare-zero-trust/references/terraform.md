
## Terraform / Infrastructure as Code

**Manage Cloudflare Tunnel and Access with code** - version controlled, repeatable, auditable.

### Terraform Provider Setup

```hcl
# versions.tf
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# variables.tf
variable "cloudflare_api_token" {
  description = "Cloudflare API token with Zero Trust permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "zone_id" {
  description = "Cloudflare zone ID for DNS"
  type        = string
}
```

### Creating Tunnel with Terraform

```hcl
# tunnel.tf
resource "random_id" "tunnel_secret" {
  byte_length = 35
}

resource "cloudflare_tunnel" "app_tunnel" {
  account_id = var.cloudflare_account_id
  name       = "app-tunnel-${var.environment}"
  secret     = random_id.tunnel_secret.b64_std
}

resource "cloudflare_tunnel_config" "app_tunnel_config" {
  account_id = var.cloudflare_account_id
  tunnel_id  = cloudflare_tunnel.app_tunnel.id

  config {
    ingress_rule {
      hostname = "app.${var.domain}"
      service  = "http://localhost:8080"
    }

    ingress_rule {
      service = "http_status:404"
    }
  }
}

resource "cloudflare_record" "app_tunnel_dns" {
  zone_id = var.zone_id
  name    = "app"
  value   = "${cloudflare_tunnel.app_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}

# Output tunnel token for cloudflared
output "tunnel_token" {
  description = "Tunnel token for cloudflared command"
  value       = cloudflare_tunnel.app_tunnel.tunnel_token
  sensitive   = true
}
```

### Access Application with Terraform

```hcl
# access.tf
resource "cloudflare_access_application" "app" {
  zone_id          = var.zone_id
  name             = "Internal Application"
  domain           = "app.${var.domain}"
  type             = "self_hosted"
  session_duration = "24h"
}

# Allow policy - company email domain
resource "cloudflare_access_policy" "allow_company" {
  application_id = cloudflare_access_application.app.id
  zone_id        = var.zone_id
  name           = "Allow company domain"
  precedence     = "1"
  decision       = "allow"

  include {
    email_domain = ["company.com"]
  }
}

# Require policy - MFA for admins
resource "cloudflare_access_policy" "require_mfa_admins" {
  application_id = cloudflare_access_application.app.id
  zone_id        = var.zone_id
  name           = "Require MFA for admins"
  precedence     = "2"
  decision       = "allow"

  include {
    group = [cloudflare_access_group.admins.id]
  }

  require {
    auth_method = "warp"
  }
}

# Access group for admins
resource "cloudflare_access_group" "admins" {
  account_id = var.cloudflare_account_id
  name       = "Administrators"

  include {
    email = ["admin@company.com", "security@company.com"]
  }
}
```

### Service Token with Terraform

```hcl
# service-token.tf
resource "cloudflare_access_service_token" "ci_pipeline" {
  account_id = var.cloudflare_account_id
  name       = "CI/CD Pipeline - ${var.environment}"
  duration   = "8760h"  # 1 year
}

resource "cloudflare_access_policy" "service_auth" {
  application_id = cloudflare_access_application.api.id
  zone_id        = var.zone_id
  name           = "API Service Authentication"
  precedence     = "1"
  decision       = "non_identity"

  include {
    service_token = [cloudflare_access_service_token.ci_pipeline.id]
  }
}

# Store in secrets manager (example: AWS)
resource "aws_secretsmanager_secret" "cf_service_token" {
  name = "cloudflare/service-token/${var.environment}"
}

resource "aws_secretsmanager_secret_version" "cf_service_token" {
  secret_id = aws_secretsmanager_secret.cf_service_token.id
  secret_string = jsonencode({
    client_id     = cloudflare_access_service_token.ci_pipeline.client_id
    client_secret = cloudflare_access_service_token.ci_pipeline.client_secret
  })
}

output "service_token_secret_arn" {
  value = aws_secretsmanager_secret.cf_service_token.arn
}
```

### Multi-Environment Pattern

```hcl
# environments/dev/main.tf
module "cloudflare_zero_trust" {
  source = "../../modules/cloudflare-zero-trust"

  environment          = "dev"
  cloudflare_account_id = var.cloudflare_account_id
  zone_id              = var.zone_id
  domain               = "dev.company.com"

  # Dev-specific settings
  session_duration     = "8h"
  allowed_email_domains = ["company.com"]
  require_mfa          = false  # Dev environment
}

# environments/prod/main.tf
module "cloudflare_zero_trust" {
  source = "../../modules/cloudflare-zero-trust"

  environment          = "prod"
  cloudflare_account_id = var.cloudflare_account_id
  zone_id              = var.zone_id
  domain               = "company.com"

  # Prod-specific settings
  session_duration     = "24h"
  allowed_email_domains = ["company.com"]
  require_mfa          = true   # Prod requires MFA
  allowed_ip_ranges    = ["10.0.0.0/8"]  # VPN or office IPs
}
```

### Deploying Tunnel with Terraform Output

```bash
# Apply Terraform
terraform apply

# Get tunnel token (sensitive output)
TUNNEL_TOKEN=$(terraform output -raw tunnel_token)

# Run cloudflared with token
cloudflared tunnel run --token $TUNNEL_TOKEN

# Or in Docker
docker run cloudflare/cloudflared:latest tunnel run --token $TUNNEL_TOKEN

# Or in Kubernetes
kubectl create secret generic tunnel-credentials \
  --from-literal=token=$TUNNEL_TOKEN
```

### Complete Module Example

```hcl
# modules/cloudflare-zero-trust/main.tf
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

variable "environment" {
  type = string
}

variable "applications" {
  type = map(object({
    hostname = string
    service  = string
    session_duration = string
    allowed_groups = list(string)
  }))
}

# Create tunnel
resource "cloudflare_tunnel" "main" {
  account_id = var.cloudflare_account_id
  name       = "tunnel-${var.environment}"
  secret     = random_id.tunnel_secret.b64_std
}

# Configure ingress rules dynamically
resource "cloudflare_tunnel_config" "main" {
  account_id = var.cloudflare_account_id
  tunnel_id  = cloudflare_tunnel.main.id

  config {
    dynamic "ingress_rule" {
      for_each = var.applications

      content {
        hostname = ingress_rule.value.hostname
        service  = ingress_rule.value.service
      }
    }

    # Catch-all rule
    ingress_rule {
      service = "http_status:404"
    }
  }
}

# Create Access applications for each
resource "cloudflare_access_application" "apps" {
  for_each = var.applications

  zone_id          = var.zone_id
  name             = each.key
  domain           = each.value.hostname
  session_duration = each.value.session_duration
  type             = "self_hosted"
}

# Create policies
resource "cloudflare_access_policy" "app_policies" {
  for_each = var.applications

  application_id = cloudflare_access_application.apps[each.key].id
  zone_id        = var.zone_id
  name           = "Allow ${each.key}"
  precedence     = "1"
  decision       = "allow"

  include {
    group = each.value.allowed_groups
  }
}
```

**Usage:**
```hcl
module "zero_trust" {
  source = "./modules/cloudflare-zero-trust"

  environment = "prod"
  applications = {
    "internal-app" = {
      hostname         = "app.company.com"
      service          = "http://localhost:8080"
      session_duration = "24h"
      allowed_groups   = ["admins", "developers"]
    }
    "api" = {
      hostname         = "api.company.com"
      service          = "http://localhost:3000"
      session_duration = "168h"  # 1 week for APIs
      allowed_groups   = ["api-users"]
    }
  }
}
```

### State Management Best Practices

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "company-terraform-state"
    key            = "cloudflare/${var.environment}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

# Remote state for secrets
data "terraform_remote_state" "secrets" {
  backend = "s3"

  config = {
    bucket = "company-terraform-state"
    key    = "secrets/terraform.tfstate"
    region = "us-east-1"
  }
}
```

