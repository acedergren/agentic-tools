---
name: managed-bastion-access
description: "Use when the user asks to \"use OCI Bastion\", \"create Managed SSH\", \"debug a port forwarding session\", \"configure dynamic port forwarding\", or \"update client CIDR allowlist\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "OCI Bastion"
  - "Bastion"
  - "Managed SSH"
  - "port forwarding session"
  - "dynamic port forwarding"
  - "SOCKS5"
  - "client CIDR allowlist"
  - "Bastion plugin"
  - "Oracle Cloud Agent"
  - "private instance"
aliases:
  - "oci-bastion"
  - "managed-bastion"
domains:
  - "oci"
  - "security"
---
# OCI Managed Bastion Access

Use this skill for OCI Bastion access to private targets, Managed SSH, port forwarding, dynamic SOCKS5 sessions, client CIDR allowlists, Bastion plugin issues, session TTLs, and private-instance access troubleshooting.

## When to Use

Load this skill for: the user asks to "use OCI Bastion", "create Managed SSH", "debug a port forwarding session", "configure dynamic port forwarding", "update client CIDR allowlist", "enable Bastion plugin", or "access a private OCI instance".

For broad security-control selection, start with `oci/oci-security-control-plane`. For Terraform-created bastions or sessions, also load `infrastructure-as-code`.

## Do NOT load this skill when

Do not load this skill for generic SSH, public bastion hosts outside OCI Bastion, IAM-only problems, or network connectivity that does not use the OCI Bastion service. Use `compute-management` for instance lifecycle and `networking-management` for target-side route, NSG, and security-list rules.

## NEVER Do This

**NEVER create public SSH as a shortcut around Bastion.**
Use OCI Bastion, VPN/FastConnect, private endpoints, or another approved private-access pattern.

**NEVER assume an ACTIVE Bastion session means SSH will succeed.**
Also verify the client CIDR allowlist, target-side network rules, OS username, private key, plugin state, target IP/port, and copied SSH command.

**NEVER use Managed SSH without checking Oracle Cloud Agent and Bastion plugin state.**
Managed SSH requires a supported Linux target, OpenSSH, Oracle Cloud Agent, and the Bastion plugin enabled on the target instance.

**NEVER request session TTL below 30 minutes or above 180 minutes.**
Oracle docs currently require at least 30 minutes and at most 180 minutes for session TTL.

**NEVER update a Bastion client CIDR allowlist with stale state.**
Read the current bastion and ETag immediately before update, retry on ETag mismatch, and verify the final allowlist.

## Session Choice

| Need | Prefer |
| --- | --- |
| SSH into supported Linux Compute with agent/plugin | Managed SSH |
| Reach a specific TCP target such as SSH, RDP, database listener, or ADB private endpoint | Port forwarding |
| Reach multiple private targets through a subnet-level tunnel | Dynamic port forwarding (SOCKS5) |
| Target is Ubuntu/Ampere with plugin problems | Port forwarding first, then repair Oracle Cloud Agent/plugin |

## Preflight Checklist

1. Confirm the bastion is in the same VCN as the target resource.
2. Confirm the client public IP is in the bastion client CIDR allowlist.
3. Confirm IAM allows the caller to use bastions and sessions.
4. Confirm target-side NSG/security list rules allow traffic from the bastion.
5. For Managed SSH, confirm Oracle Cloud Agent and the Bastion plugin are enabled and healthy.
6. Confirm the session target IP, port, OS username, SSH key, and TTL.
7. Delete temporary sessions and temporary allowlist entries after use.

## Reference Files

- Load [`references/managed-bastion-reference.md`](references/managed-bastion-reference.md) for official docs, session choices, TTLs, plugin gotchas, allowlist updates, CLI/session quirks, and troubleshooting.
- Load [`../../infrastructure-as-code/references/oci-terraform-bastion.md`](../../infrastructure-as-code/references/oci-terraform-bastion.md) when Terraform manages bastions, sessions, IAM, allowlists, or guardrails against public SSH.
- Load `../../networking-management/references/oci-networking-reference.md` only when target-side routes, NSGs, security lists, DNS, or private connectivity are part of the failure.

## Arguments

$ARGUMENTS: Optional user-provided bastion OCID, session OCID, target instance, VCN, subnet, client CIDR, SSH command, OS username, error text, Terraform path, or cleanup deadline. When empty, infer the narrowest safe access path and ask only if a security-impacting allowlist or public exposure change is ambiguous.
