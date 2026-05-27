# OCI Skill Pressure Scenarios

Use these scenarios before and after editing Oracle-related skills. A passing answer routes to the right skill, avoids stale claims, and cites current Oracle docs for high-drift facts.

## Scenarios

| Scenario | Expected behavior |
| --- | --- |
| "Can I resize this /24 OCI VCN?" | Do not answer "impossible." Explain that OCI supports adding/modifying VCN CIDRs with restrictions, then route detailed networking work to `oci/networking-management`. |
| "Set up Terraform state in OCI Object Storage for Terraform 1.12." | Prefer the native OCI backend. Mention S3-compatible Object Storage backend only as a deprecated legacy fallback. |
| "Should this run in Resource Manager or local Terraform?" | Explain state ownership, job execution, variables, source providers, private endpoints, provider retrieval, and auth boundaries; route Resource Manager-specific work to `oci/oci-resource-manager`. |
| "Terraform apply gets 403 creating a VCN." | Identify the caller first, then check policy location, principal type, verb, resource family, and compartment scope before changing HCL. |
| "Use Vault for this generated DB password in Terraform." | Explain that Vault does not prevent Terraform state capture; prefer secret OCIDs and runtime retrieval unless protected state exposure is accepted. |
| "Import this existing OCI VCN into Terraform." | Prefer provider pinning, official import ID lookup, `terraform import` or import blocks, moved blocks, and plan reconciliation over delete/recreate. |
| "Can we use the official OCI Terraform module?" | Check release recency, provider constraints, examples, issue activity, feature coverage, generated plan shape, and upgrade path. |
| "Write Terraform for OCI government cloud." | Verify realm, region, service availability, FIPS/provider guidance, dedicated endpoints, and Resource Manager availability before writing HCL. |
| "Terraform plan passed, so capacity is fine, right?" | Explain that plans do not prove quota, service limits, host capacity, or live prices; route compute/cost details to `oci/compute-management` and `oci/finops-cost-optimization`. |
| "Which OCI GenAI model should I use for a RAG assistant?" | Do not recommend only Command R or Llama 2. Check the current model catalog and consider embeddings/reranking before generation. |
| "Should I cache OCI Vault secret reads to save request cost?" | Do not claim per-request secret retrieval cost savings. Cache for latency, resilience, throttling, and rotation behavior. |
| "Can OCI Events send failures to a DLQ?" | Do not claim built-in failed-delivery DLQ semantics without a source. Use Streaming as durable event capture/replay when appropriate. |
| "What does a stopped ADB cost?" | Use Autonomous AI Database / ADB and ECPU-first language. Distinguish stopped CPU billing from storage, backups, and retained resources. |
| "I need IDCS groups in Better Auth." | Use current OCI IAM Identity Domains wording while retaining IDCS as legacy compatibility terminology. |
| "I enabled ZPR and added a security attribute; now the DB is unreachable." | Route to `oci/zpr-security`; check ZPL policy, attributes, route tables, NSGs/security lists, supported traffic path, and rollback. |
| "Can ZPR replace NSGs/security lists?" | Answer no; ZPR layers with route tables and NSG/security-list rules. |
| "Does ZPR apply to internet/on-prem traffic?" | Verify current Oracle docs before answering; do not overstate coverage. |
| "Managed SSH session is ACTIVE but SSH closes immediately." | Route to `oci/managed-bastion-access`; check plugin, Oracle Cloud Agent, OS username, key, target port/IP, allowlist, and target-side network rules. |
| "Bastion session creation fails on Ubuntu/Ampere." | Route to `oci/managed-bastion-access`; mention known Managed SSH plugin support issues and consider port forwarding. |
| "Temporarily add my current IP to the Bastion allowlist." | Use ETag-safe allowlist update, preserve unrelated CIDRs, verify final state, and clean up temporary access. |
| "Which OCI security control owns this: Cloud Guard, Security Zone, ZPR, IAM, Vault, or Bastion?" | Route to `oci/oci-security-control-plane` and classify the failure plane before choosing a specialist. |
| "Terraform should add ZPR attributes to production resources." | Route to `oci/infrastructure-as-code` plus `oci/zpr-security`; require policy-first sequencing, canary rollout, imports, and rollback. |
| "Terraform should create a Bastion for private instance access." | Route to `oci/infrastructure-as-code` plus `oci/managed-bastion-access`; avoid public SSH, protect keys/state, and scope allowlists/IAM. |

## Hot Word Routing

| Hot words | Expected skill |
| --- | --- |
| `OCI VCN`, `Service Gateway`, `DRG`, `FastConnect` | `oci/networking-management` |
| `OCI Resource Manager`, `ORM stack`, `Resource Manager job`, `private endpoint`, `source provider` | `oci/oci-resource-manager` |
| `Terraform state on OCI`, `native OCI backend`, `Terraform import OCI`, `terraform-provider-oci` | `oci/infrastructure-as-code` |
| `Zero Trust Packet Routing`, `ZPR`, `security attribute`, `ZPL policy`, `protected resource` | `oci/zpr-security` |
| `OCI Bastion`, `Managed SSH`, `port forwarding session`, `dynamic port forwarding`, `client CIDR allowlist`, `Bastion plugin` | `oci/managed-bastion-access` |
| `Cloud Guard vs Security Zones`, `ZPR vs NSG`, `Bastion vs public SSH`, `choose OCI security control` | `oci/oci-security-control-plane` |
| `IDCS groups`, `identity domain`, `dynamic group`, `OIDC` | `oci/iam-identity-management` or the relevant identity auth skill |
| `ADB wallet`, `SQLcl`, `ECPU`, `Autonomous AI Database` | `oci/oracle-dba` |
| `Vault secret rotation`, `BASE64`, `Secret Management` | `oci/secrets-management` |
| `OCI GenAI model`, `Command A`, `Llama`, `Gemini`, `gpt-oss` | `oci/genai-services` |
