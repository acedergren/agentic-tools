# OCI Terraform ZPR Automation

Use this reference when Terraform manages Zero Trust Packet Routing (ZPR) enablement, security attributes, ZPR policy, or protected-resource rollout.

## Official Sources

- ZPR overview: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/overview.htm
- Enabling ZPR: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/enable-zpr.htm
- Security attributes: https://docs.oracle.com/en-us/iaas/Content/zero-trust-packet-routing/security-attributes.htm
- ZPR policy overview: https://docs.oracle.com/iaas/Content/zero-trust-packet-routing/zpr-policy-overview.htm
- OCI Terraform provider docs: https://registry.terraform.io/providers/oracle/oci/latest/docs

## Behavioral Rules

- Check current provider support before writing ZPR resources; ZPR support is newer than many examples and modules.
- Sequence policy before attributes. Applying attributes before allow policy can block production flows.
- Treat resource import/adoption as a first-class step for existing namespaces, policies, VCNs, VNICs, databases, and private endpoints.
- Review the plan for large attribute fan-out. A single attribute change can affect multiple flows.
- Keep rollback simple: remove the attribute or correct the ZPL policy before broad network rewrites.
- Do not assume ZPR replaces route tables, NSGs, or security lists.

## Lockout-Safe Apply Sequence

1. Pin Terraform and OCI provider versions.
2. Import or data-source existing namespaces, attributes, policies, and target resources.
3. Add ZPL policy that permits known-good source-to-target flows.
4. Plan and peer-review the policy diff.
5. Apply policy only.
6. Apply attributes to a non-production or canary resource.
7. Validate connectivity and observability.
8. Expand attributes in small batches.

## Plan Review Checklist

- Does the provider version support every ZPR resource or attribute field used?
- Does the plan create policy before assigning attributes?
- Does the plan touch production resources, VNICs, databases, private endpoints, or VCN attributes?
- Are route tables, NSGs, security lists, and DNS unchanged unless intentionally reviewed?
- Are imports and moved blocks used instead of delete/recreate for brownfield ZPR?
- Is there a rollback command or targeted revert path?

## Pressure Scenario

"Terraform should add ZPR attributes to production resources."

Passing answer: stop and require policy-first sequencing, provider support check, import/adoption review, canary rollout, and rollback before applying attributes broadly.
