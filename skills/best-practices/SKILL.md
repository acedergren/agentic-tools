---
name: best-practices
description: "Use when architecting OCI solutions, migrating from AWS/Azure, designing multi-AD deployments, evaluating Always-Free tier, or avoiding OCI anti-patterns. Covers VCN CIDR immutability, AD-specific subnet deprecation, Security List vs NSG confusion, Cloud Guard auto-remediation danger, tenancy-specific AD name prefixes, compartment hierarchy, and Flex shape cost savings."
---

# OCI Best Practices

## NEVER Do This

❌ **NEVER create a VCN with /24 or smaller CIDR — it cannot be expanded**
```bash
# WRONG - only 256 IPs, exhausted quickly, cannot expand
oci network vcn create --cidr-block "10.0.0.0/24"

# RIGHT - start with /16 (65,536 IPs, room for 256 /24 subnets)
oci network vcn create --cidr-block "10.0.0.0/16"
# OCI supports /16 to /30
```
Migration cost: Must create new VCN and migrate everything — hours of downtime, IP changes, security rule updates.

❌ **NEVER use AD-specific subnets (deprecated, breaks multi-AD HA)**
```bash
# WRONG - subnet tied to a single AD
oci network subnet create --availability-domain "fMgC:US-ASHBURN-AD-1" ...
# Cannot launch instances in other ADs; no HA possible

# RIGHT - omit --availability-domain for regional subnet
oci network subnet create --vcn-id <vcn-ocid> --cidr-block "10.0.1.0/24"
# Instances can be in any AD in region
```
Some old OCI guides still show AD-specific subnets — this is a deprecated pattern.

❌ **NEVER hardcode AD names — they are tenancy-specific, not portable**
```python
# WRONG - only works in YOUR tenancy
availability_domain = "fMgC:US-ASHBURN-AD-1"
# Another tenant's prefix for the SAME physical AD: "xYzA:US-ASHBURN-AD-1"

# RIGHT - query dynamically
data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}
# OCI generates unique prefixes per tenant for security isolation
```

❌ **NEVER enable Cloud Guard auto-remediation without testing first**
```
Detector: "Public bucket detected"
Auto-remediation: Make bucket private → breaks public website immediately!

Detector: "Security list allows 0.0.0.0/0"
Auto-remediation: Removes rule → breaks internet access!

Safe approach:
1. Enable detectors in read-only mode
2. Review findings for 1-2 weeks
3. Tune responders to eliminate false positives
4. Enable auto-remediation only for trusted patterns
```
Cloud Guard is enabled by default in some tenancies — check before assuming it's inactive.

❌ **NEVER deploy all resources in a single AD (no SLA)**
```
Single-AD: Oracle refuses SLA claims in 3-AD regions
Multi-AD:  99.95% SLA

Correct pattern:
AD-1, AD-2, AD-3: web instances (distribute evenly)
Load Balancer:    automatically multi-AD
Database:         ADB (auto 3-AD) or RAC (2+ nodes in separate ADs)
```

## OCI vs AWS/Azure Terminology

| OCI Term | AWS | Azure |
|----------|-----|-------|
| VCN | VPC | Virtual Network |
| Security List (subnet-level, stateful) | VPC Security Group | NSG (network-level) |
| NSG (resource-level, stateful) | Security Group | Application Security Group |
| DRG | Virtual Private Gateway | VPN Gateway |
| Compartment | Resource Group / OU | Resource Group |
| Tenancy | Account | Subscription |
| Availability Domain | Availability Zone | Availability Zone |
| Fault Domain | (within AZ) | Availability Set |
| Dynamic Group | IAM Role (for EC2) | Managed Identity |
| Instance Principal | EC2 Instance Profile | Managed Identity |
| OCIR | ECR | Container Registry |
| OKE | EKS | AKS |

**Critical difference**: OCI has BOTH Security Lists (subnet-scope) AND NSGs (resource-scope). AWS has only resource-scope Security Groups. This causes confusion when migrating.

## Always-Free Tier (Exact Limits)

### Compute
- **2 AMD VMs**: VM.Standard.E2.1.Micro (1/8 OCPU, 1 GB RAM)
- **Arm**: 4 OCPUs total, 24 GB RAM — VM.Standard.A1.Flex only (A2 is paid)
  - Example: 4× 1OCPU/6GB instances, free forever

### Database
- **2 Autonomous Databases**: 1 OCPU, 20 GB each — ATP or ADW
- **Limit is tenancy-wide** (not per region): 1 ATP Phoenix + 1 ADW Ashburn = limit reached
- Stopped ADB still counts toward the 2-ADB limit — must DELETE to free slot

### Storage / Networking
- 200 GB block volumes, 10 GB Object Storage, 10 GB Archive
- 1 flexible Load Balancer (10 Mbps), 1 reserved public IP per region

**Free tier vs trial**: Free tier is permanent; trial is $300 credit for 30 days. These are separate.

## Compartment Hierarchy

```
Root (tenancy)
├─ SharedServices
│  ├─ Network  (VCNs, DRGs)
│  └─ Security (Vault, KMS, Cloud Guard)
├─ Production
│  ├─ App1 (Compute / Database / Storage)
│  └─ App2
├─ NonProduction
│  ├─ Development
│  ├─ Testing
│  └─ Staging
└─ Sandbox (auto-cleanup policies)
```

Key OCI-specific property: **deleting a compartment deletes all resources inside** — use this for Sandbox lifecycle management. IAM policies scoped to compartments enforce least privilege without account/subscription proliferation.

## Multi-AD and Fault Domain Patterns

OCI regions with 3 ADs: US-Phoenix, US-Ashburn, UK-London, DE-Frankfurt, AU-Sydney, AU-Melbourne.

**Gotcha**: Some shapes are only available in specific ADs — check before distributing:
```bash
oci compute shape list --compartment-id <ocid> --availability-domain "fMgC:US-ASHBURN-AD-1"
```

Fault Domains (3 per AD, separate power/cooling/network): Use for extra-critical apps only — adds operational complexity. Spread across ADs first; add FD distribution only if single-instance impact matters.

## Cost: Flex Shapes and Storage Tiering

**Flex shapes** (OCI-unique): Decouple OCPU and RAM billing.
- Fixed shape VM.Standard2.4: 4 OCPUs, 60 GB RAM, $218/month
- Flex VM.Standard.E4.Flex: 4 OCPUs, 16 GB RAM, $109/month (50% savings)
- Arm VM.Standard.A1.Flex: $0.01/OCPU-hr vs AMD $0.03/OCPU-hr (67% cheaper)

**Object Storage tiering** (exact prices):

| Tier | Cost/GB/Month | Retrieval |
|------|--------------|-----------|
| Standard | $0.0255 | Free, instant |
| Infrequent Access | $0.0125 | $0.01/GB, instant |
| Archive | $0.0024 | $0.01/GB, 1-hour delay |

1 TB data for 1 year — lifecycle policy (30d Standard → 60d Infrequent → Archive): $72/year vs $306/year flat Standard (76% savings).

## Security Zones (OCI-Unique Enforcement)

Security Zones enforce policies at the API level — requests that violate are **rejected**, not just flagged:
- All storage encrypted
- No public buckets
- No internet gateways
- Databases private-endpoint only

```bash
# This fails if compartment is in a Security Zone
oci os bucket create --public-access-type ObjectRead
# → HTTP 400: Security Zone violation
```

Test Security Zone policies in dev before applying to production — they can break existing automation.

## Reference Files

**Load** [`references/oci-well-architected-checklist.md`](references/oci-well-architected-checklist.md) when you need:
- CIS OCI Foundations Benchmark audit checklist
- Automated security scanning scripts
- Remediation scripts for common findings
- Drift detection monitoring setup
