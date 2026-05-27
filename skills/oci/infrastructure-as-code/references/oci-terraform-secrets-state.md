# OCI Terraform Secrets and State Safety

Use this reference when Terraform interacts with OCI Vault, passwords, wallets, private keys, generated secrets, stack variables, or sensitive outputs.

## Official Sources

- Terraform sensitive data: https://developer.hashicorp.com/terraform/language/manage-sensitive-data
- Terraform OCI backend credential warning: https://developer.hashicorp.com/terraform/language/backend/oci
- OCI provider configuration: https://docs.oracle.com/en-us/iaas/Content/terraform/configuring.htm
- OCI Vault and secrets: https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm
- Resource Manager configuration requirements: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/terraformconfigresourcemanager.htm

## Core Rule

Terraform state and plan files can contain sensitive values. `sensitive = true` hides values in CLI/UI output but still stores values in state unless Terraform ephemeral/write-only behavior is supported in that exact context.

## High-Risk Values

Avoid putting these in Terraform state:

- Database admin passwords and generated passwords.
- ADB wallets, wallet passwords, and connection strings with credentials.
- Private keys, SSH keys, API signing keys, and customer secret keys.
- Secret contents read from OCI Vault or supplied as variables.
- User data or cloud-init that embeds credentials.
- Sensitive root-module outputs consumed by `terraform_remote_state`.

## Safer Patterns

- Store and rotate secret material in OCI Vault; Terraform should usually manage vault/key/secret metadata and pass secret OCIDs, not secret contents.
- Let applications retrieve secrets at runtime through instance principals, resource principals, or workload identity.
- Use generated secret/password features outside Terraform state when supported by OCI service workflows.
- Use `sensitive = true` to reduce accidental display, but still protect backend state as secret material.
- Use Terraform `ephemeral` variables or write-only arguments only after verifying Terraform version and OCI provider/resource support.
- For Resource Manager, do not put user credentials or confidential values in Terraform configuration files. Treat stack variables, job logs, config zips, plans, and state as sensitive review surfaces.

## State Review Checklist

Before approving Terraform that touches secrets:

1. Run `terraform plan` and inspect which attributes are written.
2. Search for `random_password`, `tls_private_key`, `oci_vault_secret`, wallet files, `private_key`, `password`, and sensitive outputs.
3. Check whether any data source reads actual secret content.
4. Confirm state backend access is least-privilege and versioned.
5. Confirm outputs do not expose values to `terraform_remote_state` consumers.
6. Document any unavoidable state exposure and the rotation/remediation plan.

## Pressure Scenario

User asks: "Use Vault for the DB password in Terraform."

Passing answer: explain that Vault alone does not prevent Terraform state capture, prefer runtime retrieval or secret OCID references, and only use Terraform-managed secret content if state exposure is explicitly accepted and protected.
