---
name: landing-zones
description: "Use when designing multi-tenant OCI environments, standing up landing zone Terraform stacks, enforcing Security Zones, or planning hub-spoke network topology. Covers OCI-specific compartment hierarchies, multi-tenant IAM decision trees, Security Zone automation, CIS Foundations compliance, and DRG routing. Keywords: landing zone, compartments, Security Zone, hub-spoke, DRG, CIS, multi-tenant, tenancy, IAM policy."
---

# OCI Landing Zones - Expert Architecture

## NEVER Do This

**NEVER create a flat compartment structure**
```
BAD:
tenancy/ app1-dev, app1-test, app1-prod, app2-dev ...

Problems:
- Cannot apply a single policy to all dev environments
- Cannot delegate administration per team
- Cost reports are unstructured
- Policy duplication grows O(n) with team count

GOOD - hierarchical:
tenancy/
  Network/ (Hub, Spokes)
  Security/ (Vault, Logging)
  Workloads/
    App1/ (Dev, Test, Prod)
    App2/ (Dev, Test, Prod)
  Shared-Services/ (Identity, Monitoring)
```

Policy inheritance flows DOWN the tree. One policy at `Workloads/` applies to all workloads.

**NEVER reuse 10.0.0.0/16 across VCNs**
```
BAD - same CIDR everywhere:
Dev VCN:  10.0.0.0/16
Test VCN: 10.0.0.0/16   # Cannot peer with Dev
Prod VCN: 10.0.0.0/16   # Cannot peer with either

VCN CIDR is IMMUTABLE. Wrong CIDR = complete rebuild + downtime.

GOOD - non-overlapping allocation:
Hub VCN:  10.0.0.0/16
Dev VCN:  10.10.0.0/16
Test VCN: 10.20.0.0/16
Prod VCN: 10.30.0.0/16
```

**NEVER skip Security Zones for production compartments**
```bash
# BAD: Compartment with no guardrails
oci iam compartment create --compartment-id $PARENT --name "Prod"
# Result: Anyone can create public IPs, unencrypted buckets, etc.

# GOOD: Security Zone enforces policies BEFORE resource creation
oci cloud-guard security-zone-recipe create \
  --compartment-id $TENANCY_ID \
  --display-name "CIS-Prod-Recipe" \
  --security-policies '["deny-public-ip","deny-public-bucket"]'

oci cloud-guard security-zone create \
  --compartment-id $PROD_COMPARTMENT_ID \
  --display-name "Prod-Security-Zone" \
  --security-zone-recipe-id $RECIPE_ID
```

Security Zones prevent violations BEFORE resource creation. Auditing finds them AFTER compromise.

**NEVER put workload resources in the root compartment**
```
Root compartment is for tenancy-wide IAM only (users, groups, policies).
Resources in root bypass governance, cannot be delegated, violate CIS OCI Foundations Benchmark.

Root should contain ONLY:
- Top-level child compartments
- Tenancy-wide IAM policies
Nothing else.
```

**NEVER mix dev and prod resources in the same compartment**

Developers with dev access can accidentally delete prod resources. Cannot set different backup policies, tagging strategies, or budget alerts per environment.

**NEVER skip tagging strategy**
```bash
# Without tags: "oci.compute.instance: $5,234/month" — which team? which project?
# Cannot chargeback, cannot identify waste.

# RIGHT: Create tag namespace with mandatory defaults
oci iam tag-namespace create --compartment-id $TENANCY_ID --name "Organization"
# Create: CostCenter, Environment, Owner tags
# Apply tag-defaults at compartment level (auto-applied to all resources)
oci iam tag-default create \
  --compartment-id $WORKLOAD_COMPARTMENT_ID \
  --tag-definition-id $COSTCENTER_TAG_ID \
  --value '${iam.principal.name}'
```

**NEVER allow internet egress from spoke VCNs directly**
```
BAD: Spoke subnet → Internet Gateway
- Data exfiltration undetectable
- Egress cost $3k-5k/month per spoke (unmetered)
- No DPI or egress filtering

GOOD - hub-spoke with centralized control:
Spoke → DRG → Hub VCN → Network Firewall → NAT Gateway → Internet
- Single egress point with firewall policies
- Complete visibility via VCN Flow Logs
```

**NEVER use single-region for production workloads requiring SLA**
```
Region outage = complete downtime. No automatic failover without DR.

Multi-region pattern:
Primary: us-ashburn-1 + DR: us-phoenix-1
- Autonomous Data Guard for database (near-zero RPO)
- Traffic Manager for DNS failover (RTO ~15 minutes)
- Object Storage cross-region replication
- Mirror compartment structure in DR region
```

---

## Multi-Tenant IAM Decision Tree

```
Workloads single-tenant?
│
├─ YES → Environment-centric model
│        Compartments: Network, Shared-Services, Workloads/App/Dev-Test-Prod
│        IAM: Per-env groups (DevAdmins, ProdOps) scoped to env compartment
│
└─ NO (Multi-tenant SaaS)?
    │
    ├─ Strict tenant isolation required?
    │  ├─ YES → Tenant-per-compartment: Org/TenantA, Org/TenantB
    │  │        Dynamic Group per tenant VCN for instance principal auth
    │  │        Policy: `allow dynamic-group TenantA-VMs to manage all-resources
    │  │                  in compartment TenantA`
    │  └─ NO → Shared compartment + per-tenant tagging
    │           (faster setup, shared blast radius)
    │
    ├─ Multiple environments per tenant?
    │  └─ Nest: TenantA/Dev, TenantA/Test, TenantA/Prod
    │           Policies inherit down the tree automatically
    │
    └─ Centralized shared services?
         └─ Shared-Services compartment (Logging, Monitoring, Identity)
            Grant tenancy-level Ops group least-privileged read access
```

**IAM policy template for multi-tenant:**
```
Allow group TenantA-Admins to manage all-resources in compartment TenantA
Allow dynamic-group TenantA-VCN to manage virtual-network-family in compartment TenantA
Allow group Shared-Network to use virtual-network-family in compartment Shared-Services
```

Guardrails:
- Never grant tenant-specific policies at root; scope to tenant compartment hierarchy
- Require DRG route approval workflow before adding new tenants
- Refer to `iam-identity-management` skill for fine-grained policy verb syntax

---

## Security Zone Rollout Checklist

1. **Inventory compartments** — export JSON filtered by tag `Environment=Prod`
2. **Create/update recipe** — clone Oracle CIS recipe, append custom policies (no public LB, require CMEK). See `references/security-zone-automation.md`
3. **Apply via CLI/Terraform** — loop compartments or use Terraform module
4. **Detect drift nightly** — `oci cloud-guard security-zone list-problems`; alert on `PROBLEM` state
5. **Rollback procedure** — only remove zones with CISO approval; delete recipe only after all zones removed

Full scripts in `references/security-zone-automation.md`. Treat as MANDATORY for bulk Security Zone changes.

---

## Reference Files

**Load [`references/landing-zone-patterns.md`](references/landing-zone-patterns.md) when:**
- Choosing compartment hierarchy pattern (workload-centric vs environment-centric vs tenant-centric)
- Designing hub-spoke network topology with DRG
- Setting up tagging strategy and cost allocation across compartments

**Load [`references/landing-zone-cli.md`](references/landing-zone-cli.md) when:**
- Creating compartment hierarchies via CLI
- Configuring Security Zones and Cloud Guard in bulk
- Setting up tag defaults and tag namespaces
- Creating budgets with cost tracking

**Load [`references/security-zone-automation.md`](references/security-zone-automation.md) when (MANDATORY for bulk changes):**
- Rolling out or updating Security Zone recipes across multiple compartments
- Remediating drift (compartment lost Security Zone enforcement)
- Writing Terraform automation for Cloud Guard recipes

**Load [`references/oci-well-architected-framework.md`](references/oci-well-architected-framework.md) when:**
- Starting a new landing zone design from scratch
- Preparing architectural review or compliance audit
- Comparing Core Landing Zone vs Operating Entities Landing Zone
- Need official Oracle guidance on all five pillars (Security, Reliability, Performance, Cost, Operations)
