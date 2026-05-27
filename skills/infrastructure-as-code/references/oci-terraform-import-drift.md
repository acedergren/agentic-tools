# OCI Terraform Import, Drift, and Adoption

Use this reference when adopting existing OCI resources, repairing state, or diagnosing provider drift.

## Official Sources

- Terraform import command: https://developer.hashicorp.com/terraform/cli/commands/import
- Terraform import blocks: https://developer.hashicorp.com/terraform/language/import
- Terraform moved blocks: https://developer.hashicorp.com/terraform/language/modules/develop/refactoring
- OCI Terraform provider: https://registry.terraform.io/providers/oracle/oci/latest/docs
- Resource Manager import state job: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/resource-manager-and-terraform.htm

## Adoption Flow

1. Pin Terraform and `oracle/oci` provider versions before import.
2. Back up current state or confirm remote state versioning.
3. Write the intended HCL first, matching the real resource shape.
4. Get the official import ID format from the exact provider resource documentation.
5. Import one resource at a time.
6. Run `terraform plan` after each import and reconcile computed/default fields.
7. Use `moved` blocks for address changes after adoption.
8. Use `ignore_changes` only for explicitly console-owned fields, commonly tags, and document the owner.

## OCI-Specific Drift Patterns

- Eventual consistency can make freshly created IAM, networking, and database resources appear missing. Prefer provider timeouts/retries and staged applies over blind retries.
- Some resource IDs are simple OCIDs; others are composite IDs. Always check the provider resource page.
- Identity resources often live at tenancy/root scope even when the workload lives in a compartment.
- Tags, defined tags, default security lists, route rules, and generated names often create noisy drift.
- Provider upgrades can change computed fields; read changelogs before relaxing lifecycle rules.

## Resource Manager Adoption

Use Resource Manager import-state jobs when moving a local Terraform environment into Resource Manager. Do not copy `.terraform/`, local state files, or local backend credentials into a Resource Manager stack zip.

## Pressure Scenarios

- "Import this existing VCN": get the provider import ID, write matching HCL, import, then plan.
- "Terraform wants to replace a subnet": check immutable fields, route/security-list associations, provider version drift, and moved blocks before accepting replacement.
- "Provider schema validation fails locally on darwin_arm64": treat known OCI provider plugin startup failures as environment blockers until confirmed, not as HCL proof.
