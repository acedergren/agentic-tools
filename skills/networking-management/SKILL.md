---
name: networking-management
description: "Use when the user asks to \"design OCI networking\", \"debug VCN connectivity\", \"configure Service Gateway\", \"choose NSG vs security list\", or \"plan FastConnect or VPN\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "VCN"
  - "subnet"
  - "NSG"
  - "security list"
  - "Service Gateway"
  - "DRG"
  - "FastConnect"
  - "VPN"
  - "Terraform"
  - "route table"
  - "private endpoint"
  - "DNS resolver"
  - "NAT Gateway"
  - "ZPR"
  - "OCI Bastion"
aliases:
  - "oci-networking"
  - "vcn-management"
domains:
  - "oci"
  - "networking"
---
# OCI Networking

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.
When the request is only asking to find or install skills, use `find-skills` instead.

## When to Use

Load this skill for: the user asks to "design OCI networking", "debug VCN connectivity", "configure Service Gateway", "choose NSG vs security list", or "plan FastConnect or VPN".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `best-practices` as the router.

When the network symptom includes ZPR security attributes or OCI Bastion sessions, load the specialist skill as well: `oci/zpr-security` for ZPR and `oci/managed-bastion-access` for Bastion.

## NEVER Do This

**NEVER route Oracle service traffic via Internet Gateway when Service Gateway is the right path**
```
Without Service Gateway (via Internet Gateway):
- Oracle service traffic can take public internet paths and may create avoidable data-transfer cost or exposure.

With Service Gateway:
- Keep supported Oracle service traffic on the Oracle Services Network path.
- Verify current service-specific pricing before calling any transfer path free.

Service Gateway covers: Object Storage (all tiers), ADB private endpoints, Oracle Services Network
```
```bash
# Add to private subnet route table
# Destination: <oci-services-cidr>  (query: oci network service list --all)
# Target: Service Gateway OCID
```

❌ **NEVER rely on VCN CIDR edits as an address-planning strategy**
```bash
# WRONG - 256 IPs, exhausted quickly, hard to expand safely later
oci network vcn create --cidr-block "10.0.0.0/24"

# RIGHT - /16 gives 65,536 IPs, room for 256 /24 subnets
oci network vcn create --cidr-block "10.0.0.0/16"
```
Oracle supports adding and modifying VCN CIDR ranges with restrictions. Treat edits as a controlled change: check subnet fit, route-table overlap, peer overlap, and DNS/security-rule blast radius before changing an existing VCN.

❌ **NEVER use /27 or smaller for Load Balancer subnets**
```bash
# WRONG - only 32 IPs (27 usable after OCI reserves 5)
oci network subnet create --cidr-block "10.0.1.0/27"
# LB creation FAILS: "Insufficient IP space"

# RIGHT - /24 minimum (hard requirement)
oci network subnet create --cidr-block "10.0.1.0/24"
# LB needs 2 subnets in different ADs for HA, each /24 minimum
# OCI reserves IPs for future LB scaling even when not yet used
```

❌ **NEVER assume VCN peering supports transitive routing**
```
VCN-A ↔ VCN-B ↔ VCN-C peered

# WRONG: A can reach C via B
VCN-A instance → VCN-C instance = FAILS

# OCI peering is NON-TRANSITIVE
VCN-A can reach: VCN-B only
VCN-C can reach: VCN-B only

# Fix option 1: Explicit peer (VCN-A ↔ VCN-C direct)
# Fix option 2: Hub-and-spoke with DRG (preferred for 3+ VCNs)
```

❌ **NEVER add redundant egress rules for stateful Security Lists (AWS NACL habit)**
```
OCI Security Lists are STATEFUL (like AWS Security Groups, unlike AWS Network ACLs)

# WRONG - unnecessary egress rule
Security List ingress: Allow TCP 443 from 0.0.0.0/0
Security List egress:  Allow TCP 1024-65535 to 0.0.0.0/0  # Not needed!

# RIGHT - ingress only
Security List ingress: Allow TCP 443 from 0.0.0.0/0
# Response traffic auto-allowed
```

❌ **NEVER try to add a 6th Security List to a subnet (hard limit: 5)**
```
# OCI hard limit: max 5 security lists per subnet
# Complex apps with many tiers will hit this

# WRONG - fails at 6th
oci network subnet update --security-list-ids '["<sl1>","<sl2>","<sl3>","<sl4>","<sl5>","<sl6>"]'
# Error: "Maximum security lists (5) exceeded"

# RIGHT - use NSGs for application-specific rules
# NSGs: 5 per resource, 120 rules per NSG, unlimited NSGs per VCN
```

## Security List vs NSG Decision Matrix

| Use Case | Security List | NSG |
|----------|:-------------:|:---:|
| Subnet-wide baseline (DNS, NTP, ICMP) | Yes | |
| Internet egress for all resources | Yes | |
| App tier → DB tier isolation | | Yes |
| Rules for specific instances only | | Yes |
| Complex app exceeding 5 SL limit | | Yes |

**Recommended pattern**:
- 1 Security List per subnet: allow egress, ICMP, DNS, NTP
- NSGs per tier: Web (80/443 from internet), App (from Web NSG), DB (from App NSG)
- Assign instances to their tier NSG; subnet Security List applies to all automatically

## Transitive Routing: VCN Peering vs DRG

**Local peering** (same region, FREE):
- Create Local Peering Gateway (LPG) in each VCN
- Connect LPGs; add explicit routes in both route tables
- Limitation: no transitivity — A↔B and B↔C does NOT give A↔C

**Remote peering** (cross-region, $0.01/hr per DRG connection = $7.30/month):
- DRG in each region, Remote Peering Connection on each DRG

**Hub-and-spoke with DRG** (supports transitivity for on-premises):
```
VCN-A → DRG ← On-Premises
VCN-B → DRG ← On-Premises

# DRG routes between all attached VCNs AND on-premises
# This is the ONLY pattern where transitive routing works in OCI
```

3-region mesh (A↔B, B↔C, A↔C): 3 remote DRG connections = $21.90/month.

## FastConnect vs VPN Selection

```
VPN Site-to-Site:
- Tunnel cost: $0.05/hr = $36.50/month
- Data: FREE (no per-GB charge for VPN processing)
- Egress: 500 GB × $0.0085 = $4.25/month
Total: ~$41/month

FastConnect (1 Gbps):
- Port: $1,100/month flat
- Data transfer: FREE
Total: $1,100/month

Decision:
- <500 GB/month or dev/test → VPN
- Production with latency SLA (5-20ms vs VPN's 30-50ms) → FastConnect
- >500 GB/month predictable → FastConnect for economics
```

## Subnet Sizing Guide

| Application | CIDR | Usable IPs | Notes |
|-------------|------|-----------|-------|
| Small app tier | /26 | 59 | Basic workload |
| Standard app tier | /24 | 251 | Recommended default |
| Large app tier | /23 | 507 | High-density |
| Load Balancer subnet | /24 minimum | 251 | Hard requirement, 2 subnets needed |

OCI reserves 5 IPs per subnet (first 3 + broadcast + reserved). Factor this in.

## VCN Design Anti-Patterns

**Single subnet for all tiers** — breaks blast radius containment, fails compliance:
```
# RIGHT - one subnet per tier
10.0.1.0/24 (web tier, public subnet)
10.0.2.0/24 (app tier, private subnet)
10.0.3.0/24 (DB tier, private subnet)

NSG web:  Allow 80/443 from internet
NSG app:  Allow 8080 from web NSG only
NSG db:   Allow 1521 from app NSG only
```

**Gotcha**: The default VCN route table cannot be deleted (while VCN exists) — only modified. Create custom route tables and associate subnets to them; leave default unused.

## Reference Files

**Load** [`references/oci-networking-reference.md`](references/oci-networking-reference.md) when you need:
- DRG, FastConnect, or VPN detailed configuration
- Complex routing troubleshooting
- Network Firewall setup
- VCN CIDR add/modify docs or subnet CLI reference

**Load** [`references/oci-terraform-networking-patterns.md`](references/oci-terraform-networking-patterns.md) when Terraform manages VCNs, subnets, route tables, NSGs, security lists, DRGs, Service Gateway, NAT Gateway, DNS resolver settings, or private endpoints.

Load [`../oci/zpr-security/references/zpr-reference.md`](../oci/zpr-security/references/zpr-reference.md) when routes, NSGs, or security lists appear correct but ZPR security attributes or ZPL policy may be blocking traffic.

Load [`../oci/managed-bastion-access/references/managed-bastion-reference.md`](../oci/managed-bastion-access/references/managed-bastion-reference.md) when a Bastion session depends on target-side NSGs, security lists, routes, DNS, or VCN placement.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
