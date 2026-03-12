---
name: networking-management
description: "Use when designing OCI VCN topology, troubleshooting connectivity failures, configuring Service Gateway to eliminate egress costs, choosing between Security Lists and NSGs, debugging transitive routing failures, or sizing Load Balancer subnets. Covers Service Gateway free egress, VCN CIDR immutability, peering non-transitivity, Security List hard limits, and stateful rule behavior."
---

# OCI Networking

## NEVER Do This

❌ **NEVER route Oracle service traffic via Internet Gateway — Service Gateway is FREE**
```
Without Service Gateway (via Internet Gateway):
- 20 TB/month database backups to Object Storage
- Egress: 20,000 GB × $0.0085/GB = $170/month

With Service Gateway:
- Same traffic = $0/month
- Annual savings: $2,040

Service Gateway covers: Object Storage (all tiers), ADB private endpoints, Oracle Services Network
```
```bash
# Add to private subnet route table
# Destination: <oci-services-cidr>  (query: oci network service list --all)
# Target: Service Gateway OCID
```

❌ **NEVER create a VCN with /24 CIDR — it cannot be resized**
```bash
# WRONG - 256 IPs, exhausted quickly, immutable
oci network vcn create --cidr-block "10.0.0.0/24"

# RIGHT - /16 gives 65,536 IPs, room for 256 /24 subnets
oci network vcn create --cidr-block "10.0.0.0/16"
# Migration requires: new VCN + resource migration + DNS + security rules = hours of downtime
```

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
- Comprehensive VCN and subnet CLI reference
