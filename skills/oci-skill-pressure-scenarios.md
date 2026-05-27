# OCI Skill Pressure Scenarios

Use these scenarios before and after editing Oracle-related skills. A passing answer routes to the right skill, avoids stale claims, and cites current Oracle docs for high-drift facts.

## Scenarios

| Scenario | Expected behavior |
| --- | --- |
| "Can I resize this /24 OCI VCN?" | Do not answer "impossible." Explain that OCI supports adding/modifying VCN CIDRs with restrictions, then route detailed networking work to `networking-management`. |
| "Set up Terraform state in OCI Object Storage for Terraform 1.12." | Prefer the native OCI backend. Mention S3-compatible Object Storage backend only as a deprecated legacy fallback. |
| "Should this run in Resource Manager or local Terraform?" | Explain state ownership, job execution, variables, source providers, private endpoints, provider retrieval, and auth boundaries; route Resource Manager-specific work to `oci-resource-manager`. |
| "Terraform apply gets 403 creating a VCN." | Identify the caller first, then check policy location, principal type, verb, resource family, and compartment scope before changing HCL. |
| "Use Vault for this generated DB password in Terraform." | Explain that Vault does not prevent Terraform state capture; prefer secret OCIDs and runtime retrieval unless protected state exposure is accepted. |
| "Import this existing OCI VCN into Terraform." | Prefer provider pinning, official import ID lookup, `terraform import` or import blocks, moved blocks, and plan reconciliation over delete/recreate. |
| "Can we use the official OCI Terraform module?" | Check release recency, provider constraints, examples, issue activity, feature coverage, generated plan shape, and upgrade path. |
| "Write Terraform for OCI government cloud." | Verify realm, region, service availability, FIPS/provider guidance, dedicated endpoints, and Resource Manager availability before writing HCL. |
| "Terraform plan passed, so capacity is fine, right?" | Explain that plans do not prove quota, service limits, host capacity, or live prices; route compute/cost details to `compute-management` and `finops-cost-optimization`. |
| "Which OCI GenAI model should I use for a RAG assistant?" | Do not recommend only Command R or Llama 2. Check the current model catalog and consider embeddings/reranking before generation. |
| "Should I cache OCI Vault secret reads to save request cost?" | Do not claim per-request secret retrieval cost savings. Cache for latency, resilience, throttling, and rotation behavior. |
| "Can OCI Events send failures to a DLQ?" | Do not claim built-in failed-delivery DLQ semantics without a source. Use Streaming as durable event capture/replay when appropriate. |
| "What does a stopped ADB cost?" | Use Autonomous AI Database / ADB and ECPU-first language. Distinguish stopped CPU billing from storage, backups, and retained resources. |
| "I need IDCS groups in Better Auth." | Use current OCI IAM Identity Domains wording while retaining IDCS as legacy compatibility terminology. |

## Hot Word Routing

| Hot words | Expected skill |
| --- | --- |
| `OCI VCN`, `Service Gateway`, `DRG`, `FastConnect` | `networking-management` |
| `OCI Resource Manager`, `ORM stack`, `Resource Manager job`, `private endpoint`, `source provider` | `oci-resource-manager` |
| `Terraform state on OCI`, `native OCI backend`, `Terraform import OCI`, `terraform-provider-oci` | `infrastructure-as-code` |
| `IDCS groups`, `identity domain`, `dynamic group`, `OIDC` | `iam-identity-management` or the relevant identity auth skill |
| `ADB wallet`, `SQLcl`, `ECPU`, `Autonomous AI Database` | `oracle-dba` |
| `Vault secret rotation`, `BASE64`, `Secret Management` | `secrets-management` |
| `OCI GenAI model`, `Command A`, `Llama`, `Gemini`, `gpt-oss` | `genai-services` |
