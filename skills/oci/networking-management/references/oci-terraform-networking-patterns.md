# OCI Terraform Networking Patterns

Use this reference when Terraform manages OCI VCNs, subnets, route tables, gateways, DRGs, private endpoints, DNS, NSGs, or security lists.

## Official Sources

- OCI Networking overview: https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/overview.htm
- VCN management: https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingVCNs.htm
- Security rules: https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securityrules.htm
- Service Gateway: https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm
- Dynamic Routing Gateways: https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingDRGs.htm
- OCI Terraform provider networking resources: https://registry.terraform.io/providers/oracle/oci/latest/docs
- Resource Manager private endpoints: https://docs.oracle.com/iaas/Content/ResourceManager/Tasks/private-endpoints.htm

## Terraform Design Rules

- Use `for_each` with stable keys for subnets, route rules, NSGs, and security rules. Avoid `count` when list reorder could replace resources.
- Attach explicit route tables, DHCP options, security lists, and NSGs. Do not rely on defaults except intentionally.
- Use NSGs for application-tier policy and security lists for subnet baseline rules.
- Keep route table ownership clear. A subnet can have one route table association, so module boundaries must not compete for it.
- Treat VCN CIDR add/modify as supported but controlled. Check overlap with subnets, peers, DRG routes, DNS, and security rules before changing.
- Import existing VCN, subnet, gateway, DRG, and route resources before applying modules to brownfield networks.

## Common Traps

| Trap | Safer behavior |
| --- | --- |
| NSG vs security list confusion | NSG for workload-specific rules; security list for subnet baseline |
| Default route table drift | Create custom route tables and associate subnets explicitly |
| Service Gateway missing route | Add OSN/service CIDR route to the private subnet route table |
| NAT Gateway overuse | Use live pricing and consider Service Gateway/private endpoints first |
| DRG v2 route distribution ignored | Model attachments, route tables, route distributions, and imports explicitly |
| Private endpoint unreachable | Verify DNS, route table, subnet, NSG/security list, and endpoint-specific docs |
| VCN CIDR treated as immutable | OCI supports add/modify with restrictions; plan the blast radius |

## Resource Manager Private Endpoint Note

Resource Manager private endpoints are Resource Manager resources, not generic VCN endpoints. Use them when Resource Manager jobs must reach private Git, private compute, or private services. Route Resource Manager-specific troubleshooting to `oci/oci-resource-manager`.

## Cost and Limit Rules

- Do not quote static NAT Gateway, FastConnect, VPN, public IP, or egress prices from memory.
- Check live Oracle pricing for the target region and subscription model.
- Check service limits and quotas before assuming a Terraform plan can be applied.
- Distinguish "out of host capacity" from service-limit exhaustion and regional availability.

## Pressure Scenarios

- "Terraform created the subnet but traffic fails": inspect route table association, security list/NSG, gateway route, DNS, and stateful rule assumptions.
- "Can Terraform resize this VCN?": do not say impossible; check OCI CIDR add/modify restrictions and overlap blast radius.
- "Resource Manager cannot remote-exec into a private instance": route to Resource Manager private endpoint checks plus subnet security rules.
