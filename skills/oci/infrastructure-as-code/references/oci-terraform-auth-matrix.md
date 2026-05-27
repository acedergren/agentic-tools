# OCI Terraform Auth Matrix

Use this reference when Terraform auth is the real problem, especially for 401, 403, `NotAuthorizedOrNotFound`, or environment-specific failures.

## Official Sources

- OCI provider configuration: https://docs.oracle.com/en-us/iaas/Content/terraform/configuring.htm
- Terraform provider registry: https://registry.terraform.io/providers/oracle/oci/latest/docs
- OCI dynamic groups: https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingdynamicgroups.htm
- Resource Manager security: https://docs.oracle.com/en-us/iaas/Content/Security/Reference/resourcemanager_security.htm
- Resource Manager policy reference: https://docs.oracle.com/en-us/iaas/Content/Identity/Reference/resourcemanagerpolicyreference.htm

## Context Matrix

| Execution context | Prefer | Avoid |
| --- | --- | --- |
| Local laptop | API key config profile for durable work; `SecurityToken` profile for short interactive work | Committing private keys, OCIDs, or credentials in provider blocks |
| Cloud Shell | Use current Oracle Cloud Shell/provider guidance and short-lived profile behavior | Assuming a laptop `~/.oci/config` exists unchanged |
| GitHub Actions or external CI | Organization-approved OIDC/federation if configured; otherwise scoped API key secret | Long-lived administrator API keys or unscoped tenancy policies |
| OCI DevOps build pipeline | Resource principal/dynamic group policies for the pipeline resource | User credentials copied into build specs |
| OCI Compute instance | `auth = "InstancePrincipal"` plus dynamic group and IAM policy | API key files on the instance |
| OCI Functions or supported service | `auth = "ResourcePrincipal"` plus required resource principal env and policies | Instance principal syntax |
| OKE workload | `auth = "OKEWorkloadIdentity"` when the provider/resource supports it | Node instance principal for app workload identity |
| OCI Resource Manager | Provider block normally needs only `region`; Resource Manager supplies execution context | Local API key provider blocks inside Resource Manager configs |

## Provider Auth Methods

OCI Terraform provider auth methods to check in current docs:

- `APIKey`
- `InstancePrincipal`
- `ResourcePrincipal`
- `SecurityToken`
- `OKEWorkloadIdentity`

When parameters are set in multiple supported provider locations, Oracle documents precedence among environment variables, non-default OCI config profiles, and the `DEFAULT` profile. Also inspect explicit provider arguments in HCL because they can lock a configuration to the wrong user, tenancy, region, or auth method.

## 403 Triage

1. Identify the caller: user, group, identity-domain group, dynamic group, CI principal, Resource Manager user/job, instance principal, resource principal, or OKE workload identity.
2. Identify target resource family and compartment.
3. Check policy location is at or above the target resource compartment.
4. Check verb is high enough: `inspect < read < use < manage`.
5. Check resource family is correct: `virtual-network-family`, `instance-family`, `volume-family`, `object-family`, `orm-family`, etc.
6. Check condition clauses and dynamic-group matching rules.
7. Allow for IAM propagation lag before rerunning.

## Pressure Scenarios

- "Terraform apply gets 403 creating a VCN": verify caller and `manage virtual-network-family` scope before changing HCL.
- "Compute instance Terraform cannot list buckets": use instance principal dynamic-group membership and `object-family` policy.
- "Resource Manager cannot create a stack from Git": check `orm-config-source-providers`, `orm-stacks`, and source provider permissions.
- "IDCS group can log in but Terraform fails": map identity-domain/IDCS group membership to the OCI IAM policy subject and compartment scope.
