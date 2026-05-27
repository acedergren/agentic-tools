---
name: compute-management
description: "Use when the user asks to \"launch OCI compute\", \"choose an OCI shape\", \"debug compute capacity\", \"configure instance principals\", or \"optimize OCI instance cost\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "Compute"
  - "instance"
  - "shape"
  - "OCPU"
  - "ECPU"
  - "boot volume"
  - "capacity"
  - "instance principal"
  - "Terraform"
  - "quota"
  - "service limits"
aliases:
  - "oci-compute"
  - "compute-shapes"
domains:
  - "oci"
  - "compute"
---
# OCI Compute Management - Expert Knowledge

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.
When the request is only asking to find or install skills, use `find-skills` instead.

## When to Use

Load this skill for: the user asks to "launch OCI compute", "choose an OCI shape", "debug compute capacity", "configure instance principals", or "optimize OCI instance cost".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `best-practices` as the router.

## NEVER Do This

**NEVER launch instances without checking service limits first**
```bash
oci limits resource-availability get \
  --service-name compute \
  --limit-name "standard-e4-core-count" \
  --compartment-id <ocid> \
  --availability-domain <ad>
```
Many "out of capacity" launch failures are quota or service-limit problems rather than host-capacity problems. Check limits BEFORE launching to get accurate error messages.

**NEVER use console serial connection as primary access**
- Creates security audit findings (bypasses SSH key controls)
- Use only for boot troubleshooting when SSH fails
- Delete connection immediately after troubleshooting

**NEVER mix regional and AD-specific resources in templates**
- Breaks portability when moving between regions
- Use AD-agnostic designs: spread via fault domains, not hardcoded ADs

**NEVER forget boot volume preservation flag in dev/test**
```bash
oci compute instance terminate --instance-id <id> --preserve-boot-volume false
```
Without `--preserve-boot-volume false`: orphaned boot volumes can keep charging after the instance is gone.

**NEVER enable public IP on production instances**
- Use bastion service or private endpoints for access
- Treat public exposure as a security and incident-response cost driver, not only as a network setting.

**NEVER use fixed shapes when Flex covers the same specs**
- Fixed shapes (e.g., VM.Standard2.1) are often MORE expensive than Flex equivalents
- Always compare Flex pricing first before choosing a fixed shape

## Capacity Error Decision Tree

```
"Out of host capacity for shape X"?
│
├─ Check service limits FIRST
│  └─ oci limits resource-availability get
│     ├─ available = 0 → Request limit increase (NOT a capacity issue)
│     └─ available > 0 → True capacity issue, continue below
│
├─ Same shape, different AD?
│  └─ Query the tenancy's ADs and try each viable AD in the region
│
├─ Different shape, same series?
│  └─ E4 failed → try E5 (newer gen, often more available)
│  └─ Standard failed → try Optimized or DenseIO variants
│
├─ Different architecture?
│  └─ AMD → ARM (A1.Flex often has capacity when Intel/AMD full)
│
└─ All ADs exhausted?
   └─ Create capacity reservation (guarantees future launches)
```

Terraform plans do not prove compute capacity or quota availability. Before applying compute resources, check live service limits, regional availability, shape availability, and compartment quotas; then treat "out of host capacity" separately from service-limit exhaustion.

## Shape Selection: Cost vs Performance

**Budget-critical**:
- Compare Arm flexible shapes against current AMD/Intel alternatives in the Oracle price list.
- Test ARM64 compatibility first; not all Docker images, compiled binaries, agents, or vendor packages support Arm.

**General purpose**:
- Prefer flexible shapes when they meet the workload requirement so CPU and memory can be right-sized separately.
- Start from measured CPU, memory, network, and storage I/O needs; scale based on metrics, not guesses.

**Memory-intensive**:
- Compare flexible shape memory ratios against the workload's actual resident set, cache, and JVM/DB memory needs.
- Verify the current memory-per-OCPU limits in Oracle shape documentation before promising a target ratio.

## Live Cost Check

Do not quote static shape prices from this skill. Before estimating cost:

1. Open the current Oracle Cloud price list for the target region, currency, and subscription model.
2. Confirm the shape family, architecture, OCPU/ECPU terms, memory billing unit, and any Free Tier eligibility in current Oracle docs.
3. Calculate with live unit rates:
   `monthly_compute = hours * ((ocpus * live_ocpu_rate) + (gb_memory * live_memory_rate))`
4. Add non-compute resources separately: boot volume, block volumes, public IPs, load balancers, backups, images, network transfer, and support commitments.
5. State the date and source of the price lookup whenever giving numbers.

## Instance Principal Authentication (Production)

When an instance needs to call OCI APIs, NEVER put user credentials on the instance.

```bash
# 1. Create dynamic group
oci iam dynamic-group create \
  --name "app-instances" \
  --matching-rule "instance.compartment.id = '<compartment-ocid>'"

# 2. Grant permissions (IAM policy)
# "Allow dynamic-group app-instances to read object-family in compartment X"

# 3. Code uses instance principal — no credentials needed:
signer = oci.auth.signers.InstancePrincipalsSecurityTokenSigner()
client = oci.object_storage.ObjectStorageClient(config={}, signer=signer)
```

Benefits: No credential rotation, no secrets to manage, automatic token refresh.

## OCI-Specific Gotchas

**Availability Domain names are tenant-specific**
- Your AD: `fMgC:US-ASHBURN-AD-1`
- Another tenant: `ErKW:US-ASHBURN-AD-1`
- MUST query your own tenant: `oci iam availability-domain list`
- Hardcoding AD names from examples breaks cross-tenant portability

**Boot Volume backups do NOT include instance config**
- Backup captures disk only — NOT shape, networking, or metadata
- For DR: use custom images (captures config) or Terraform for infrastructure

**Instance Metadata Service has 3 versions — always use v2**
- v1: `http://169.254.169.254/opc/v1/` (legacy, vulnerable to SSRF)
- v2: `http://169.254.169.254/opc/v2/` (requires session token, prevents SSRF)
- v1 is still enabled by default on older instances

## Progressive Loading Reference

Load [`references/oci-compute-shapes-reference.md`](references/oci-compute-shapes-reference.md) when:
- Comparing flexible shape specs (E4 vs E5 vs E6 vs A1/A2/A4.Flex)
- Looking up bare metal, GPU, Dense I/O, or HPC shapes
- Need official Oracle specs (memory limits, OCPU counts, network bandwidth)

Do NOT load for quick cost comparisons, capacity troubleshooting, or shape selection — this file covers those.

Load [`../infrastructure-as-code/references/oci-terraform-auth-matrix.md`](../infrastructure-as-code/references/oci-terraform-auth-matrix.md) when Terraform runs on OCI Compute and should use instance principals rather than local API keys.

Load [`../infrastructure-as-code/references/oci-terraform-realms-regions.md`](../infrastructure-as-code/references/oci-terraform-realms-regions.md) when shape availability, government regions, FIPS, or realm-specific endpoints may affect Terraform.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
