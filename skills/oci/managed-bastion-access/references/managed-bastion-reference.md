# OCI Managed Bastion Reference

Use this focused reference for OCI Bastion operations and troubleshooting. Verify live limits, service availability, and IAM details against Oracle docs before production changes.

## Official Sources

- Bastion overview: https://docs.oracle.com/iaas/Content/Bastion/Concepts/bastionoverview.htm
- Creating a Managed SSH session: https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/create-session-managed-ssh.htm
- Connecting to Managed SSH: https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/connect-managed-ssh.htm
- Connecting to port forwarding: https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/connect-port-forwarding.htm
- Bastion IAM policies: https://docs.oracle.com/en-us/iaas/Content/Bastion/Reference/bastionpolicyreference.htm
- Bastion known issues: https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/known-issues.htm

## Session Types

| Session type | Use for | Key requirements |
| --- | --- | --- |
| Managed SSH | SSH to supported Linux Compute | OpenSSH, Oracle Cloud Agent, Bastion plugin enabled |
| Port forwarding | One TCP target/port | Client in allowlist, target allows traffic from bastion |
| Dynamic port forwarding | SOCKS5 access to multiple subnet targets | Client SOCKS5 support, target-side network rules |

Oracle docs state that a bastion is associated with a single VCN. Do not design a bastion in one VCN as a direct access path to targets in another VCN unless an officially supported network pattern is confirmed for the exact target.

## Access Checklist

1. Caller has IAM permissions for bastion and session operations.
2. Bastion client CIDR allowlist includes the caller's current public IP or approved range.
3. Target resource is private and reachable from the bastion's VCN path.
4. Target-side NSGs/security lists allow the bastion path and target port.
5. Session is ACTIVE and not expired.
6. SSH private key matches the public key used at session creation.
7. OS username matches the target image, often `opc` for Oracle platform images.
8. For Managed SSH, Oracle Cloud Agent and Bastion plugin are installed, enabled, and running.

## Operational Lessons

- The Console/API minimum session TTL is 30 minutes and maximum is 180 minutes.
- ACTIVE session state is necessary but not sufficient; SSH can still close immediately if plugin, key, username, target port, or network rules are wrong.
- For CLI-created sessions, inspect the returned session OCID and poll the session directly instead of relying only on work-request output shape.
- For temporary client-IP access, read the bastion immediately before update and use ETag-safe mutation. If the update fails with an ETag mismatch, re-read and retry with the new ETag.
- After temporary access, delete sessions and remove temporary CIDRs from the allowlist. Verify the final state.

## Known Managed SSH Pitfalls

| Symptom | Likely checks |
| --- | --- |
| Session creation fails on Ampere A1 Ubuntu | Oracle docs identify Managed SSH support issues; use port forwarding or update/enable Oracle Cloud Agent and plugin |
| Session ACTIVE but SSH closes immediately | Plugin health, OS username, key mismatch, target IP/port, target-side NSG/security list |
| Client cannot connect to session host | Client CIDR allowlist, local firewall/proxy, copied SSH command, private key permissions |
| Port forwarding opens but target protocol fails | Local port mapping, target listener, NSG/security list, database/listener ACL |
| Dynamic SOCKS tunnel connects but app fails | App proxy settings, DNS behavior, target-side rules, route path |

## Allowlist Mutation Guardrail

When temporarily adding a client IP:

1. Resolve the user's current public IP from an approved source.
2. Convert to a single-host CIDR when appropriate.
3. Read current bastion details and ETag.
4. Add the CIDR without removing unrelated CIDRs.
5. Update with the current ETag.
6. Verify final allowlist.
7. Record cleanup time and remove the temporary CIDR after use.

## Pressure Scenarios

- "Managed SSH session is ACTIVE but SSH closes immediately."
- "Bastion session creation fails on Ubuntu/Ampere."
- "Temporarily add my current IP to the Bastion allowlist."
- "Terraform should create a Bastion for private instance access."
