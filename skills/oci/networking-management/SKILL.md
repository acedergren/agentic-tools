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

## When to Use

Load this skill for: the user asks to "design OCI networking", "debug VCN connectivity", "configure Service Gateway", "choose NSG vs security list", or "plan FastConnect or VPN".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `oci/best-practices` as the router.

When the network symptom includes ZPR security attributes or OCI Bastion sessions, load the specialist skill as well: `oci/zpr-security` for ZPR and `oci/managed-bastion-access` for Bastion.

## NEVER Do This

**NEVER route Oracle service traffic via Internet Gateway when Service Gateway is the right path**
```
Without Service Gateway (via Internet Gateway):
- Oracle service traffic can take public internet paths and may create avoidable data-transfer cost or exposure.

With Service Gateway:
- Keep supported Oracle service traffic on the Oracle Services Network path.
- Verify current service-specific pricing before calling any transfer path free.

Service Gateway CIDR labels: "All <region> Services in Oracle Services Network" or "OCI <region> Object Storage".
It gives private subnets access to Oracle *public* service endpoints (Object Storage, ADB public
endpoints, OS Management, etc.). An ADB *private endpoint* is a private IP inside your own VCN and
does not need the Service Gateway.
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

❌ **NEVER size a Load Balancer subnet with no headroom**
```
There is no /24 requirement. Oracle recommends ONE regional subnet for a load balancer.
- Public LB: uses 2 private IPs from the subnet (primary + standby).
- Private LB: uses 3 private IPs (primary, standby, floating).
- Every subnet also loses 3 addresses to OCI (first two + last).
A /29 (8 addresses, 5 usable) technically fits a private LB, but leave room for more LBs,
NSG-attached resources and future growth; /27–/26 is a sensible default.
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
# NSGs: a VNIC can be in at most 5 NSGs; check Service Limits for rule/NSG counts
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

**Remote peering** (cross-region):
- DRG in each region, Remote Peering Connection (RPC) on each DRG
- DRGs and RPCs have no hourly charge in the Oracle price list (checked 2026-09-30); inter-region
  data transfer is billed as outbound data transfer — check the price list for your source region.

**Hub-and-spoke with DRG** (supports transitivity for on-premises):
```
VCN-A → DRG ← On-Premises
VCN-B → DRG ← On-Premises

# DRG (v2) route tables + import distributions route between attached VCNs,
# RPCs, VPN and FastConnect. Use a DRG, not LPG chains, when you need transit.
```

## FastConnect vs VPN Selection

Prices from the Oracle price list API, USD pay-as-you-go, checked 2026-09-30. Re-check before quoting.
```
Site-to-Site VPN:
- No port-hour charge ("Site-to-Site VPN is a free service").
- Outbound data over the internet counts as normal outbound data transfer
  (first 10 TB/month free in most regions, then per-GB).
- Runs over the public internet: variable latency, no bandwidth guarantee.

FastConnect:
- Billed per port-hour, e.g. 1 Gbps = $0.2125/port-hour (≈ $155/month), SKU B88325.
- No data transfer charges on private virtual circuits.
- Partner/provider and cross-connect charges from third parties come on top.

Decision:
- Dev/test, backup path, or low volume → VPN (free, quick to set up)
- Predictable latency/bandwidth, large steady transfer, or compliance → FastConnect
- Production FastConnect → keep a VPN as the backup path
```

## Subnet Sizing Guide

| Application | CIDR | Usable IPs | Notes |
|-------------|------|-----------|-------|
| Small app tier | /26 | 61 | Basic workload |
| Standard app tier | /24 | 253 | Recommended default |
| Large app tier | /23 | 509 | High-density |
| Load Balancer subnet | /27–/26 typical | 29–61 | 2 IPs (public) or 3 IPs (private) per LB; one regional subnet recommended |

OCI reserves 3 IPs per subnet: the first two and the last address in the CIDR.

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

Last verified: 2026-09-30 (docs.oracle.com VCN/LB docs, Oracle price list API, OCI CLI 3.94.1)

## Reference Files

**Load** [`references/oci-networking-reference.md`](references/oci-networking-reference.md) for verified subnet/LB/limit facts, a connectivity-debug checklist, and links to the Oracle pages for DRG, FastConnect, VPN, and VCN CIDR changes (it does not replace those docs).

**Load** [`references/oci-terraform-networking-patterns.md`](references/oci-terraform-networking-patterns.md) when Terraform manages VCNs, subnets, route tables, NSGs, security lists, DRGs, Service Gateway, NAT Gateway, DNS resolver settings, or private endpoints.

Load [`../zpr-security/references/zpr-reference.md`](../zpr-security/references/zpr-reference.md) when routes, NSGs, or security lists appear correct but ZPR security attributes or ZPL policy may be blocking traffic.

Load [`../managed-bastion-access/references/managed-bastion-reference.md`](../managed-bastion-access/references/managed-bastion-reference.md) when a Bastion session depends on target-side NSGs, security lists, routes, DNS, or VCN placement.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
