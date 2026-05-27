# OCI Terraform and Resource Manager Reference

Use this as a source map for OCI IaC work.

## Official Oracle Sources

- Terraform with OCI: https://docs.oracle.com/en-us/iaas/Content/dev/terraform/home.htm
- Object Storage backend for Terraform state: https://docs.oracle.com/en-us/iaas/Content/terraform/object-storage-state.htm
- Resource Manager overview: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/resourcemanager.htm
- OCI Terraform provider: https://registry.terraform.io/providers/oracle/oci/latest/docs
- OCI Resource Manager stacks: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/create-stack.htm

## Load Guidance

For Terraform v1.12+, prefer the native OCI backend for Object Storage state. Treat S3-compatible Object Storage state as deprecated fallback unless the target environment cannot use the native backend.
