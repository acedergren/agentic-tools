# OCI Terraform State Backends

Use this reference when deciding where Terraform state lives for OCI work.

## Official Sources

- Terraform native OCI backend: https://developer.hashicorp.com/terraform/language/backend/oci
- Terraform backend configuration: https://developer.hashicorp.com/terraform/language/backend
- Terraform sensitive data: https://developer.hashicorp.com/terraform/language/manage-sensitive-data
- Oracle Terraform provider: https://docs.oracle.com/en-us/iaas/Content/terraform/home.htm
- Oracle Object Storage state legacy path: https://docs.oracle.com/en-us/iaas/Content/terraform/object-storage-state.htm

## Decision Tree

| Situation | Backend choice |
| --- | --- |
| Terraform v1.12+ and OCI Object Storage allowed | Prefer native `backend "oci"` |
| OCI Resource Manager stack | Let Resource Manager manage stack state |
| Terraform older than v1.12 or incompatible runtime | S3-compatible Object Storage fallback, explicitly marked legacy |
| One-person disposable experiment | Local state is acceptable only if no team or production resources are managed |
| HCP Terraform/Terraform Enterprise is the chosen control plane | Use that product's remote state model, not OCI Object Storage by default |

## Native OCI Backend Baseline

```hcl
terraform {
  backend "oci" {
    bucket    = "terraform-state"
    namespace = "object-storage-namespace"
    key       = "prod/network/terraform.tfstate"
    region    = "us-ashburn-1"
  }
}
```

Add optional `workspace_key_prefix` for workspace separation and `kms_key_id` when a specific OCI KMS key is required. Prefer partial backend configuration and environment/config-file credentials rather than embedding secrets in HCL.

## Safety Rules

- Enable Object Storage bucket versioning for state recovery.
- Grant the state principal only the bucket/object operations needed for state and lock objects.
- Treat state, lock files, plan files, and `.terraform/` as sensitive.
- Do not pass plaintext credentials through `-backend-config`; Terraform can persist backend configuration under `.terraform/` and in saved plans.
- Do not use customer secret keys for new Terraform v1.12+ state unless a legacy fallback is explicitly required and documented.
- Separate state by environment and blast radius: tenancy/bootstrap, networking, security, workloads, and databases should not all share one state file.

## Legacy S3-Compatible Fallback

Use only when the runtime cannot use native `backend "oci"`. Document:

1. Terraform/OpenTofu version and why native OCI backend is unavailable.
2. Customer secret key owner and rotation procedure.
3. Bucket versioning, encryption, and lifecycle policy.
4. Locking limitations and concurrent apply control.
5. Migration path back to native `backend "oci"`.

## Pressure Scenario

User asks: "Set up Terraform state in OCI Object Storage for Terraform 1.12."

Passing answer: choose native `backend "oci"`, enable bucket versioning, avoid hardcoded credentials, and mention S3-compatible Object Storage only as a legacy fallback.
