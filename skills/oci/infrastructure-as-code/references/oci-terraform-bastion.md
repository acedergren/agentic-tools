# OCI Terraform Bastion Automation

Use this reference when Terraform manages OCI Bastion resources, sessions, allowlists, IAM, or private-access guardrails.

## Official Sources

- Bastion overview: https://docs.oracle.com/iaas/Content/Bastion/Concepts/bastionoverview.htm
- Creating a Managed SSH session: https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/create-session-managed-ssh.htm
- Connecting to port forwarding: https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/connect-port-forwarding.htm
- Bastion IAM policies: https://docs.oracle.com/en-us/iaas/Content/Bastion/Reference/bastionpolicyreference.htm
- Bastion known issues: https://docs.oracle.com/en-us/iaas/Content/Bastion/Tasks/known-issues.htm
- OCI Terraform provider docs: https://registry.terraform.io/providers/oracle/oci/latest/docs

## Behavioral Rules

- Prefer OCI Bastion or private connectivity over public SSH for private instance access.
- Treat client CIDR allowlists as sensitive operational controls. Avoid permanent `0.0.0.0/0`.
- Do not store private keys in Terraform state. Use external key generation and controlled distribution.
- Use Managed SSH only when the target supports Oracle Cloud Agent and Bastion plugin requirements.
- Use port forwarding for unsupported targets, database listeners, RDP, ADB private endpoints, or Managed SSH plugin gaps.
- Treat sessions as ephemeral access objects; clean them up unless the operating model explicitly keeps them.

## Terraform Review Checklist

- Does the plan create or widen a client CIDR allowlist?
- Does the plan create public IPs or public SSH rules as a shortcut?
- Are session TTLs within Oracle's current 30-to-180-minute bounds?
- Are target-side NSGs/security lists scoped to the bastion path and target port?
- Are IAM policies scoped to bastion/session operations and target resource needs?
- Are SSH public keys inputs and private keys kept out of state?
- Does the target image/shape require port forwarding instead of Managed SSH?

## Allowlist Safety

For Terraform-managed allowlists, do not make ad hoc Console changes without reconciling state. For emergency access, prefer a short-lived, reviewed variable change with cleanup, or use CLI/Console with an explicit post-incident import/state reconciliation step.

## Pressure Scenario

"Terraform should create a Bastion for private instance access."

Passing answer: create OCI Bastion with narrow allowlists, target-side network rules, scoped IAM, no public SSH fallback, no private keys in state, and explicit session cleanup behavior.
