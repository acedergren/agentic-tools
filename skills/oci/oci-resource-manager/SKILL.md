---
name: oci-resource-manager
description: "Use when the user asks to \"configure OCI Resource Manager\", \"debug Resource Manager job\", \"create ORM stack\", \"use Resource Manager private endpoint\", or \"fix Resource Manager dynamic group\"."
version: 2.0.0
keywords:
  - "OCI Resource Manager"
  - "Resource Manager"
  - "ORM"
  - "ORM stack"
  - "Resource Manager job"
  - "private endpoint"
  - "source provider"
  - "drift detection"
  - "Resource Manager dynamic group"
  - "import state job"
  - "terraform-provider-oci"
aliases:
  - "oci-rm"
  - "orm"
  - "resource-manager"
domains:
  - "oci"
  - "iac"
---
# OCI Resource Manager

Use this skill for OCI Resource Manager stacks, jobs, state, variables, source providers, private endpoints, provider retrieval, drift detection, rollback, import-state jobs, and Resource Manager IAM.

## When to Use

Load this skill for: the user asks to "configure OCI Resource Manager", "debug Resource Manager job", "create ORM stack", "use Resource Manager private endpoint", "fix Resource Manager dynamic group", "detect Resource Manager drift", "import Terraform state into Resource Manager", or "connect Resource Manager to Git".

For Terraform language, module, backend, import, or provider questions that are not Resource Manager-specific, also load `infrastructure-as-code`.

## Do NOT load this skill when

Do not load this skill for local Terraform only, OCI service operations that do not involve Resource Manager, or generic CI/CD pipeline work. Use `infrastructure-as-code` for local Terraform and use service-specific OCI skills for networking, IAM, compute, databases, secrets, monitoring, or FinOps.

## NEVER Do This

**NEVER treat Resource Manager as local Terraform with a UI.**
Resource Manager stores stack state, runs jobs, locks stack execution, injects stack variables into the Terraform host, retrieves providers, manages source providers, and can use private endpoints.

**NEVER upload local Terraform working directories as-is.**
Do not include `.terraform/`, `.tfstate`, `.tfplan`, local backend credentials, API keys, or private keys in a stack zip or source repository.

**NEVER put user credentials or confidential values in Resource Manager Terraform configuration.**
For Resource Manager, the OCI provider block normally needs only `region`. Treat stack variables, logs, plans, and state as sensitive surfaces.

**NEVER diagnose Resource Manager 403s as Terraform syntax first.**
Check Resource Manager permissions (`orm-stacks`, `orm-jobs`, `orm-config-source-providers`, `orm-private-endpoints`) and target OCI service permissions in the target compartments.

**NEVER assume private resources are reachable from Resource Manager.**
Use Resource Manager private endpoints for private Git servers, private instances, private endpoints, or remote-exec flows that need nonpublic network access.

## Decision Rules

### Resource Manager vs local Terraform

Choose Resource Manager when the user needs centralized OCI-managed state, job history, drift reports, Console/API/CLI job control, source-provider integration, private endpoint access from Oracle-managed execution, or tenancy governance around stack operations.

Choose local Terraform when the user needs local toolchain control, custom wrappers, non-OCI backends, experimental providers not suitable for Resource Manager, or a development loop before handing state to Resource Manager.

### Stack configuration

- Keep provider configuration Resource Manager-friendly: `provider "oci" { region = var.region }`.
- Do not add local backend blocks to Resource Manager stacks.
- Include a `schema.yaml` only when it improves Console variable entry.
- Keep module sources supported by Resource Manager and verify source-provider access for private repositories.
- Pin Terraform and provider constraints in HCL; then review Resource Manager supported versions and provider retrieval behavior.

### Jobs and state

- Run plan before apply unless the workflow explicitly accepts direct apply risk.
- Remember only one job runs on a stack at a time.
- Use job logs, detailed logs, state, outputs, and associated resources for diagnosis.
- Use import-state jobs when migrating local state into Resource Manager.
- Use rollback jobs when returning to a prior known successful apply is safer than manual repair.

### IAM troubleshooting

For users and groups operating Resource Manager, check `orm-family` or specific `orm-*` permissions. For resources created by the stack, check the target resource family permissions in the target compartment. For source providers, include `read orm-config-source-providers` where required. For private endpoints, include `orm-private-endpoints` and the needed VCN/subnet permissions.

## Reference Files

- Load [`references/resource-manager-reference.md`](references/resource-manager-reference.md) for current source links, stack/job lifecycle, private endpoints, provider support, source providers, IAM, state migration, and troubleshooting.
- Load `../../infrastructure-as-code/references/oci-terraform-auth-matrix.md` when the failure is actually provider auth or principal selection.
- Load `../../infrastructure-as-code/references/oci-terraform-secrets-state.md` when stack variables, state, logs, or outputs may contain secret values.

## Arguments

$ARGUMENTS: Optional user-provided stack, job, compartment, source provider, private endpoint, Terraform version, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
