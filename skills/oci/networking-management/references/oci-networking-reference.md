# OCI Networking Reference

Last verified: 2026-09-30 against docs.oracle.com and OCI CLI 3.94.1. Limits and prices change; re-check
the linked pages before quoting.

## Verified facts

| Topic | Fact |
|-------|------|
| Subnet reserved IPs | 3 per subnet: the first two and the last address of the CIDR |
| VCN CIDR size | /16 to /30 per CIDR block; CIDRs can be added or modified later with restrictions |
| Security lists | Max 5 per subnet; rules are stateful by default, stateless is opt-in per rule |
| NSGs | A VNIC can belong to at most 5 NSGs; NSG rules can reference another NSG as source/destination |
| Load balancer IPs | Public LB uses 2 private IPs; private LB uses 3 (primary, standby, floating). One regional subnet is recommended |
| Service Gateway | Targets the "All <region> Services in Oracle Services Network" or "OCI <region> Object Storage" CIDR label; reaches Oracle public endpoints without an internet gateway |
| Peering | LPG/RPC peering is not transitive; transit routing uses DRG route tables and import distributions |
| Pricing (price list, 2026-09-30) | No charge SKUs exist for NAT gateway, DRG, or Site-to-Site VPN; FastConnect billed per port-hour (1 Gbps $0.2125, SKU B88325) with no data charges on private virtual circuits; first 10 TB/month outbound data free in most regions |

## Connectivity debug checklist

A packet must be allowed by every layer. Check in this order and record which layer fails:

1. **Route table** of the source subnet has a rule for the destination (IGW, NAT, SGW, DRG, LPG, private IP).
2. **Security lists** on both subnets (ingress on the destination, egress on the source; stateless rules need both directions).
3. **NSGs** on both VNICs.
4. **ZPR policy**, if the resource has security attributes (see `../zpr-security`).
5. **OS firewall** on the instance (`firewalld`/`iptables` on Oracle Linux images is on by default).
6. **DNS**: VCN resolver, private views, and on-prem forwarding rules.

Useful commands:

```bash
oci network route-table get --rt-id "$RT_ID"
oci network security-list get --security-list-id "$SL_ID"
oci network nsg rules list --nsg-id "$NSG_ID" --all
oci network service list --all          # Service Gateway CIDR labels
oci network drg-route-table list --drg-id "$DRG_ID" --all
```

Network Path Analyzer (console: Networking > Network Command Center) can evaluate a path end to end.

## Official Oracle Sources

- VCNs and subnets: https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/VCNs.htm
- Add a VCN CIDR block: https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/add_cidr_to_vcn.htm
- Modify a VCN CIDR block: https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/network/vcn/modify-vcn-cidr.html
- Service Gateway: https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm
- Dynamic Routing Gateways: https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingDRGs.htm
- FastConnect: https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/fastconnect.htm
- Load balancer subnets: https://docs.oracle.com/en-us/iaas/Content/Balance/Concepts/balanceoverview.htm
- Price list: https://www.oracle.com/cloud/price-list/
