---
name: zpr-security
description: "Use when the user asks to \"configure ZPR\", \"debug Zero Trust Packet Routing\", \"write ZPL policy\", \"apply security attributes\", or \"protect OCI resources with ZPR\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "Zero Trust Packet Routing"
  - "ZPR"
  - "security attribute"
  - "security attribute namespace"
  - "ZPL policy"
  - "ZPR policy"
  - "protected resource"
  - "network source"
  - "network resource"
aliases:
  - "oci-zpr"
  - "zero-trust-packet-routing"
domains:
  - "oci"
  - "security"
---
# OCI Zero Trust Packet Routing

Use this skill for Zero Trust Packet Routing design, rollout, troubleshooting, ZPL policy review, security attributes, protected resources, and ZPR interactions with OCI network controls.

## When to Use

Load this skill for: the user asks to "configure ZPR", "debug Zero Trust Packet Routing", "write ZPL policy", "apply security attributes", "protect OCI resources with ZPR", "use security attributes", or "fix blocked traffic after enabling ZPR".

For broad security-control selection, start with `oci/oci-security-control-plane`. For Terraform automation of ZPR attributes or policies, also load `infrastructure-as-code`.

## Do NOT load this skill when

Do not load this skill for general IAM policy, Vault/KMS, Cloud Guard, Security Zones, or Bastion access tasks unless ZPR is part of the symptom. Use `networking-management` for route tables, NSGs, security lists, gateways, and DNS when ZPR is not involved.

## NEVER Do This

**NEVER treat ZPR as a replacement for route tables, NSGs, or security lists.**
OCI requires the route table, NSG/security list rules, and ZPR policy to allow the packet. If any one layer blocks it, traffic drops.

**NEVER add security attributes to production resources before policy allows required traffic.**
Enabling ZPR does not affect unattributed resources, but attributed resources are governed by ZPR policy. Create and review policy first, then apply attributes in a controlled rollout.

**NEVER confuse IAM policy with ZPR policy.**
IAM controls who can call OCI APIs. ZPR is a network-layer control over attributed sources, targets, networks, protocols, and ports.

**NEVER assume ZPR applies to every service or traffic path.**
Verify supported resource types, region behavior, internet/on-premises limitations, and peered VCN/DRG behavior in current Oracle docs before giving final guidance.

**NEVER use ZPR names, descriptions, tags, or attributes to store secrets.**
Treat all resource metadata as non-secret operational metadata.

## Decision Rules

### Safe rollout order

1. Confirm the tenancy home region and whether ZPR is already enabled.
2. Inventory protected resources, source resources, VCNs, route paths, NSGs/security lists, and existing access flows.
3. Create or choose a security attribute namespace and attributes.
4. Write ZPL policy that permits known-good flows before assigning attributes.
5. Test in non-production or with a low-risk flow first.
6. Assign attributes to the narrowest source and target set.
7. Validate with Network Path Analyzer, logs, and application checks.
8. Keep a rollback plan: remove the security attribute from the affected resource or revise policy.

### Troubleshooting order

1. Confirm the resource actually has the expected security attributes.
2. Confirm the policy references the correct namespace, attribute, network, protocol, and port.
3. Check the route table, NSG, and security list independently.
4. Check whether the traffic path is internet, on-premises, peered VCN, DRG, private endpoint, or same-VCN.
5. Confirm the resource type is currently supported for security attributes.
6. Review recent policy or attribute changes before changing network rules.

## Reference Files

- Load [`references/zpr-reference.md`](references/zpr-reference.md) for official docs, rollout order, policy/attribute decision trees, troubleshooting, limits, and pressure scenarios.
- Load [`../../infrastructure-as-code/references/oci-terraform-zpr.md`](../../infrastructure-as-code/references/oci-terraform-zpr.md) when Terraform manages ZPR configuration, attributes, policies, imports, or production rollout sequencing.
- Load `../../networking-management/references/oci-networking-reference.md` only when the ZPR task also requires route, NSG, security list, DRG, or private connectivity details.

## Arguments

$ARGUMENTS: Optional user-provided tenancy, compartment, VCN, source, target, policy, attribute namespace, symptom, Terraform path, or rollout stage. When empty, infer the narrowest safe scope and ask only if a production-impacting ZPR change is ambiguous.
