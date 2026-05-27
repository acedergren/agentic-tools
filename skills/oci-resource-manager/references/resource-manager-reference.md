# OCI Resource Manager Reference

Use this source map and decision reference for Resource Manager-specific Terraform work.

## Official Sources

- Resource Manager overview: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/resourcemanager.htm
- Resource Manager and Terraform: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/resource-manager-and-terraform.htm
- Terraform configurations for Resource Manager: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/terraformconfigresourcemanager.htm
- Managing stacks and jobs: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/managingstacksandjobs.htm
- Creating an apply job: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/create-job-apply.htm
- Getting a job state file: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/get-job-tf-state.htm
- Managing private endpoints: https://docs.oracle.com/iaas/Content/ResourceManager/Tasks/private-endpoints.htm
- Managing configuration source providers: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/managingconfigurationsourceproviders.htm
- Securing Resource Manager: https://docs.oracle.com/en-us/iaas/Content/Security/Reference/resourcemanager_security.htm
- Resource Manager policy reference: https://docs.oracle.com/en-us/iaas/Content/Identity/Reference/resourcemanagerpolicyreference.htm
- Supported Terraform providers: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/providers.htm

## Boundary: Resource Manager vs Local Terraform

| Topic | Local Terraform | Resource Manager |
| --- | --- | --- |
| State | Backend chosen in Terraform config | Stack state stored by Resource Manager |
| Execution | Local/CI runner | Resource Manager job host |
| Provider credentials | Provider auth method chosen by runner context | OCI provider normally needs only `region` |
| Variables | CLI, env, tfvars, workspace | Stack variables injected into job environment |
| Source | Local files, VCS, modules | Uploaded zip, source providers, templates, resource discovery |
| Private access | Runner network path | Resource Manager private endpoints |
| History | Local/CI logs and backend state | Stack/job logs, state, outputs, associated resources |

## Stack Package Requirements

- Working directory must contain at least one `.tf` file.
- Do not include `.terraform/` directories.
- Do not include `.tfstate` files.
- Do not include local API keys, private keys, or other confidential values.
- For uploaded local configurations, package the working directory into a zip.
- For Resource Manager provider config, keep the OCI provider minimal unless official docs for the target case require more.

## IAM Patterns

Resource Manager has its own resource types: `orm-family`, `orm-stacks`, `orm-jobs`, `orm-config-source-providers`, `orm-private-endpoints`, `orm-template`, and `orm-work-requests`.

Common access checks:

- Creating stacks: `manage orm-stacks`.
- Running jobs: `use orm-stacks` plus `manage orm-jobs`.
- Creating stacks from Git source providers: `read orm-config-source-providers` plus stack permissions.
- Viewing state/logs: `read orm-jobs` or stack/job read permissions.
- Managing private endpoints: `manage orm-private-endpoints` plus VCN/subnet permissions.
- Creating target resources: appropriate target service permissions, such as `manage virtual-network-family` for VCNs.

## Private Endpoints

Use private endpoints when Resource Manager must reach nonpublic resources:

- Private Git server or private source repository path.
- Remote exec into a private compute instance.
- Private service endpoint or private database/network target.

Do not assume a subnet route from a developer laptop or CI runner applies to the Resource Manager job host.

## Troubleshooting Flow

1. Identify stack OCID, job OCID, compartment, source provider, and Terraform version.
2. Read job logs and detailed logs before changing Terraform.
3. Check whether the failure happens during source fetch, provider retrieval, plan, apply, destroy, import state, or output/state retrieval.
4. Check Resource Manager IAM separately from target resource IAM.
5. For private network failures, verify private endpoint, subnet route table, NSG/security list, DNS, and reachable IP behavior.
6. For provider drift, check supported providers, dependency lock behavior, and provider constraints.
7. For state mismatch, inspect job state and use import-state or rollback jobs rather than manual state surgery when possible.

## Pressure Scenarios

- "Resource Manager stack cannot create VCN": check `orm-*` permissions and `manage virtual-network-family` in the target compartment.
- "Resource Manager can plan but source fetch fails": check source provider access and private endpoint needs.
- "The same Terraform works locally but fails in Resource Manager": compare state location, auth context, variables, provider versions, private network reachability, and packaged files.
- "Move local Terraform to Resource Manager": remove local backend/working files, create stack, import state, and confirm plan parity before apply.
