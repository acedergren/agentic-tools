# OCI Terraform Module Quality Checklist

Use this reference before recommending official or community Terraform modules for OCI.

## Official Sources

- Terraform module sources: https://developer.hashicorp.com/terraform/language/modules/sources
- Terraform provider dependency lock file: https://developer.hashicorp.com/terraform/language/files/dependency-lock
- Oracle Terraform provider examples: https://github.com/oracle/terraform-provider-oci/tree/master/examples
- Oracle Terraform modules organization: https://github.com/oracle-terraform-modules

## Checklist

Review every module, including Oracle-branded modules, against these criteria:

| Check | Passing signal |
| --- | --- |
| Release freshness | Recent release or commit compatible with current OCI provider behavior |
| Provider constraints | Explicit `oracle/oci` provider source and version range that fits the target Terraform version |
| Terraform version | Compatible with the target CLI and Resource Manager supported versions |
| Examples | Examples cover the target use case, not only a toy happy path |
| Issues and PRs | Open issues do not show unresolved provider drift or broken resources |
| Supported resources | Module supports required OCI features, regions, realms, and new service options |
| State shape | Outputs are stable, sensitive outputs are minimized, and module addresses are acceptable |
| Brownfield adoption | Module can import/adopt existing resources without replacement surprises |
| Security | Least-privilege IAM, no broad admin defaults, no secret content outputs |
| Upgrade path | Changelog explains breaking changes and migration steps |

## When to Avoid a Module

- The module pins an old provider or references deprecated provider source addresses.
- The module hides resource addresses that need precise import or moved-block control.
- The module creates broad IAM, networking, or tagging defaults that conflict with tenant governance.
- The module has no clear support for the target realm, region, identity-domain model, or Resource Manager runtime.
- The module adds more abstraction than the workload needs.

## Recommendation Pattern

When recommending a module, include:

1. Module name and exact version/ref.
2. Provider and Terraform version constraints.
3. Last release or commit date checked.
4. Known gaps and resources still written directly.
5. Import and state migration impact.
6. A minimal plan-review gate before apply.

## Pressure Scenario

User asks: "Can we use the official OCI landing zone module?"

Passing answer: do not answer yes because it is official. Check release recency, provider constraints, brownfield risk, examples, issue activity, generated plan, and whether `landing-zones` should own the architecture decision.
