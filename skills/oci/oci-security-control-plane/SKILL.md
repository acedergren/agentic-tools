---
name: oci-security-control-plane
description: "Use when the user asks to \"choose OCI security control\", \"route OCI security issue\", \"compare Cloud Guard vs Security Zones\", \"decide ZPR vs NSG\", or \"use Bastion vs public SSH\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "security control plane"
  - "Cloud Guard"
  - "Security Zones"
  - "Zero Trust Packet Routing"
  - "ZPR"
  - "Bastion"
  - "Vault"
  - "KMS"
  - "IAM"
  - "Audit"
  - "Logging"
  - "NSG"
  - "security list"
aliases:
  - "oci-security-router"
  - "oracle-cloud-security"
domains:
  - "oci"
  - "security"
---
# OCI Security Control Plane Router

Use this thin router to decide which OCI security control owns a problem. Keep detailed procedures in the specialist skills and load only the one needed for the user's control area.

## When to Use

Load this skill for: the user asks to "choose OCI security control", "route OCI security issue", "compare Cloud Guard vs Security Zones", "decide ZPR vs NSG", "use Bastion vs public SSH", or "harden an OCI environment".

Use it before narrow skills when the control owner is unclear or the user lists several security controls together.

## Do NOT load this skill when

Do not load this skill for a direct, already-known specialist task such as "write ZPL policy", "create Managed SSH", "store OCI secrets", "debug OCI 403", or "choose NSG vs security list". Load the owning skill directly.

## NEVER Do This

**NEVER duplicate specialist procedures in this router.**
Route to the owner skill and keep high-drift facts there.

**NEVER enable broad responders, guardrails, or production ZPR attributes without a lower-environment test.**
Security controls can block traffic, API calls, deployments, or emergency access.

**NEVER pick a control before identifying the failure plane.**
Decide whether the problem is API authorization, network reachability, packet authorization, secret handling, operator access, posture detection, preventive guardrails, audit evidence, or Terraform automation.

**NEVER use public SSH as the default private-instance access answer.**
Route private operator access to `oci/managed-bastion-access`, VPN/FastConnect, or another approved private path.

## Control Routing

| Problem or hot word | Load |
| --- | --- |
| Zero Trust Packet Routing, ZPR, security attributes, ZPL policy, protected resources | `oci/zpr-security` |
| OCI Bastion, Managed SSH, port forwarding, dynamic SOCKS5, client CIDR allowlist | `oci/managed-bastion-access` |
| IAM policy, identity domains, IDCS, dynamic groups, 403/404, principal type | `iam-identity-management` |
| Vault, KMS, secret rotation, replication, secret retrieval 403 | `secrets-management` |
| Cloud Guard, detector/responder recipes, Security Zones, landing-zone guardrails | `landing-zones` |
| NSGs, security lists, route tables, DRG, Service Gateway, DNS, private endpoints | `networking-management` |
| Audit, Logging, Service Connector, alarms, evidence collection | `monitoring-operations` |
| Terraform security automation, Resource Manager, state, imports, drift | `infrastructure-as-code` |
| Compute access posture, public IPs, instance principals, plugin state | `compute-management` |

## Decision Rules

1. API denied or ambiguous 404: start with `iam-identity-management`.
2. Packet path blocked without ZPR: start with `networking-management`.
3. Packet path blocked after security attributes or ZPL change: start with `oci/zpr-security`.
4. Human/operator access to private targets: start with `oci/managed-bastion-access`.
5. Secret lifecycle or retrieval: start with `secrets-management`.
6. Preventive tenancy guardrails: start with `landing-zones`.
7. Detection, response, audit, and evidence: start with `monitoring-operations`.
8. Any of the above encoded in Terraform: also load `infrastructure-as-code`.

## Reference Files

This router intentionally has no deep reference file. Load the owning specialist skill and its focused references instead.

## Arguments

$ARGUMENTS: Optional user-provided control, symptom, resource, compartment, network path, principal, Terraform path, or risk objective. When empty, classify the failure plane first, then load the owner skill.
