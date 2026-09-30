# OCI ZPR Reference

Last verified: 2026-09-30 against docs.oracle.com ZPR "Policy Syntax" and "Policy Examples" pages.

Use this focused reference for Zero Trust Packet Routing (ZPR) tasks. Verify high-drift support matrices and limits against Oracle docs before making production claims.

## Official Sources

- ZPR overview: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/overview.htm
- Enabling ZPR: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/enable-zpr.htm
- Security attributes: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/security-attributes.htm
- ZPR policy overview: https://docs.oracle.com/iaas/Content/zero-trust-packet-routing/zpr-policy-overview.htm
- ZPR IAM policies: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/iam-policies.htm
- ZPR policy syntax: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/zpr-policy-syntax.htm
- ZPR policy examples: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/zpr-policy-examples.htm

## Control Model

ZPR is an additional network-layer authorization control, not a substitute for OCI networking:

| Layer | Must allow traffic? | Owner skill |
| --- | --- | --- |
| Route table | Yes | `oci/networking-management` |
| Security list or NSG | Yes | `oci/networking-management` |
| ZPR policy for attributed resources | Yes | `oci/zpr-security` |
| IAM policy for API calls | Only for management/API access | `oci/iam-identity-management` |

Oracle's current docs state that ZPR is built on existing NSG, security list, and route table rules. For a packet to arrive, all relevant layers must allow it.

## ZPL (ZPR policy language) syntax

Security attribute format: `namespace.key:value` (namespace and key have no spaces or periods; values
may contain spaces/periods if quoted). Omitting the namespace means the default `oracle-zpr` namespace.

**Same VCN**
```
in <vcn-attribute> VCN allow <source> to connect to <destination> [with protocol='tcp/22'[, connection-state='stateless']]
```
- `<vcn-attribute>`: exactly one security attribute on the VCN.
- Source/destination: a security attribute (`app:web endpoints`), a quoted IP/CIDR (`'10.0.0.0/16'`),
  `all-endpoints`, or `osn-services-ip-addresses` (OCI service IP ranges).
- Source and destination can't both be `all-endpoints`; an IP address/`osn-services-ip-addresses`
  can be on one side only.
- Filters: `protocol`, `protocol.icmp.type`, `protocol.icmp.code`, `connection-state`.

**Two VCNs (same region and tenancy, both attributed)**
```
allow <source-attribute> endpoints in <vcn-a-attribute> VCN to connect to <dest-attribute> endpoints [with protocol='tcp/1521'] in <vcn-b-attribute> VCN
```
Only security attributes are allowed as endpoints here. To reference IPs, CIDRs, other regions,
on-premises networks or the internet, use the single-VCN form with a quoted CIDR.

## Verified examples (from Oracle's ZPR policy examples)

```
# SSH between instances in one VCN
in networks:net1 VCN allow compute:instance1 endpoints to connect to compute:instance2 endpoints with protocol='tcp/22'

# SSH between peered VCNs
allow compute:instance1 endpoints in networks:net1 VCN to connect to compute:instance2 endpoints with protocol='tcp/22' in networks:net2 VCN

# SQL*Net to a database
in networks:net1 VCN allow compute:instance1 endpoints to connect to db:DB-Server endpoints with protocol='tcp/1521'

# Database reaching OCI services (Object Storage backups, etc.)
in VCN-Network:DB VCN allow db:DB-Server endpoints to connect to 'osn-services-ip-addresses'

# Port range
in VCN-Network:DB VCN allow App:App1 to connect to DB-Server:App1 endpoints with protocol='tcp/999-11199'

# Stateless
in finance.network:prod VCN allow app:frontend endpoints to connect to database:server endpoints with protocol = 'tcp/1521', connection-state = 'stateless'

# Internet to a network firewall (and back) — two statements
in sample-namespace.abc:myVcn VCN allow '0.0.0.0/0' to connect to sample-namespace.demo:myFirewall endpoints
in sample-namespace.abc:myVcn VCN allow sample-namespace.demo:myFirewall endpoints to connect to '0.0.0.0/0'
```

Attribute values in these examples are security attribute *values*, not resource display names.

CLI: `oci zpr zpr-policy` (policies), `oci zpr configuration` (enablement), `oci zpr work-request`.

## Attribute And Policy Decision Tree

```
Need ZPR protection?
|
|- Is the resource type supported for security attributes today?
|  |- No -> use NSG/security list/IAM/Vault/Cloud Guard as appropriate
|  `- Yes
|
|- Is there an existing namespace and attribute model?
|  |- No -> design namespace/attribute values first
|  `- Yes
|
|- Does policy already allow required flows?
|  |- No -> create/review ZPL policy before applying attributes
|  `- Yes
|
`- Apply attributes in small batches, validate, then expand
```

## Safe Rollout Checks

- Enable ZPR only from the tenancy home region.
- Confirm enabling ZPR itself does not change unattributed resource traffic.
- Use non-production or low-risk traffic first.
- Create policy before assigning attributes to production endpoints.
- Keep rollback simple: remove or change the security attribute on the affected resource, or correct the policy.
- Avoid confidential text in descriptions, tags, friendly names, or security attributes.
- Verify the latest supported resource list before applying attributes to newer services.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Traffic broke after assigning an attribute | ZPL policy, attribute namespace/value, route table, NSG/security list, and supported traffic path |
| ZPR policy seems ignored | Confirm both source and target resources are attributed as expected |
| "Can ZPR replace NSGs/security lists?" | No. ZPR layers on top of route tables and NSG/security list rules |
| Internet or on-premises path behaves unexpectedly | Traffic to/from unattributed sources (internet, on-prem, other regions) needs a single-VCN statement with a quoted CIDR, in each direction you need |
| Terraform plan adds attributes to many resources | Stop and review policy-first sequencing, imports, and rollback |

## Pressure Scenarios

- "I enabled ZPR and added a security attribute; now the DB is unreachable."
- "Can ZPR replace NSGs/security lists?"
- "Does ZPR apply to internet/on-prem traffic?"
- "Terraform should add ZPR attributes to production resources."
