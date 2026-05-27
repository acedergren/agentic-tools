# OCI ZPR Reference

Use this focused reference for Zero Trust Packet Routing (ZPR) tasks. Verify high-drift support matrices and limits against Oracle docs before making production claims.

## Official Sources

- ZPR overview: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/overview.htm
- Enabling ZPR: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/enable-zpr.htm
- Security attributes: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/security-attributes.htm
- ZPR policy overview: https://docs.oracle.com/iaas/Content/zero-trust-packet-routing/zpr-policy-overview.htm
- ZPR IAM policies: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/iam-policies.htm

## Control Model

ZPR is an additional network-layer authorization control, not a substitute for OCI networking:

| Layer | Must allow traffic? | Owner skill |
| --- | --- | --- |
| Route table | Yes | `oci/networking-management` |
| Security list or NSG | Yes | `oci/networking-management` |
| ZPR policy for attributed resources | Yes | `oci/zpr-security` |
| IAM policy for API calls | Only for management/API access | `oci/iam-identity-management` |

Oracle's current docs state that ZPR is built on existing NSG, security list, and route table rules. For a packet to arrive, all relevant layers must allow it.

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
| Internet or on-premises path behaves unexpectedly | Verify current Oracle docs for ZPR enforcement boundaries before promising coverage |
| Terraform plan adds attributes to many resources | Stop and review policy-first sequencing, imports, and rollback |

## Pressure Scenarios

- "I enabled ZPR and added a security attribute; now the DB is unreachable."
- "Can ZPR replace NSGs/security lists?"
- "Does ZPR apply to internet/on-prem traffic?"
- "Terraform should add ZPR attributes to production resources."
