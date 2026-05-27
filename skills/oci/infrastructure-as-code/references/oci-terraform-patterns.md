# OCI Terraform and Resource Manager Reference

Use this as a source map for OCI IaC work.

## Official Oracle Sources

- Terraform with OCI: https://docs.oracle.com/en-us/iaas/Content/dev/terraform/home.htm
- Object Storage backend for Terraform state: https://docs.oracle.com/en-us/iaas/Content/terraform/object-storage-state.htm
- Resource Manager overview: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/resourcemanager.htm
- OCI Terraform provider: https://registry.terraform.io/providers/oracle/oci/latest/docs
- OCI Resource Manager stacks: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/create-stack.htm
- OCI provider configuration: https://docs.oracle.com/en-us/iaas/Content/terraform/configuring.htm
- Resource Manager and Terraform: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/resource-manager-and-terraform.htm
- Terraform sensitive data: https://developer.hashicorp.com/terraform/language/manage-sensitive-data

## Load Guidance

For Terraform v1.12+, prefer the native OCI backend for Object Storage state. Treat S3-compatible Object Storage state as deprecated fallback unless the target environment cannot use the native backend.

Use the focused sibling references first:

- `oci-terraform-state-backends.md` for backend and state-locking choices.
- `oci-terraform-auth-matrix.md` for caller/auth troubleshooting.
- `oci-terraform-secrets-state.md` for Vault, passwords, wallets, keys, and outputs.
- `oci-terraform-import-drift.md` for brownfield adoption.
- `oci-terraform-module-quality.md` for official-module review.
- `oci-terraform-realms-regions.md` for government, FIPS, realm, and endpoint checks.
- `oci-terraform-zpr.md` for ZPR security attributes, policy sequencing, provider support, imports, and rollout safety.
- `oci-terraform-bastion.md` for Bastion resources, sessions, allowlists, IAM, key-state safety, and no-public-SSH guardrails.
