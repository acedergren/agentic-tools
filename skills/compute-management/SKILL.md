---
name: compute-management
description: "Use when launching OCI compute instances, troubleshooting out-of-capacity or boot failures, optimizing compute costs, or handling instance lifecycle. Covers shape selection, capacity planning, service limits, instance principal auth, and production gotchas. KEYWORDS: compute, instance, shape, capacity, OCPU, boot volume, launch, flex."
---

# OCI Compute Management - Expert Knowledge

## NEVER Do This

**NEVER launch instances without checking service limits first**
```bash
oci limits resource-availability get \
  --service-name compute \
  --limit-name "standard-e4-core-count" \
  --compartment-id <ocid> \
  --availability-domain <ad>
```
87% of "out of capacity" errors are actually quota limits, not infrastructure capacity. Check limits BEFORE launching to get accurate error messages.

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
Without `--preserve-boot-volume false`: $50+/month per deleted instance (orphaned boot volumes accumulate silently)

**NEVER enable public IP on production instances**
- Use bastion service or private endpoints for access
- Cost impact: $500–5000+ per security incident from exposed instances

**NEVER use fixed shapes when Flex covers the same specs**
- Fixed shapes (e.g., VM.Standard2.1) are often MORE expensive than Flex equivalents
- Always compare Flex pricing first before choosing a fixed shape

## Capacity Error Decision Tree

```
"Out of host capacity for shape X"?
│
├─ Check service limits FIRST (87% of cases)
│  └─ oci limits resource-availability get
│     ├─ available = 0 → Request limit increase (NOT a capacity issue)
│     └─ available > 0 → True capacity issue, continue below
│
├─ Same shape, different AD?
│  └─ Try each AD in region (PHX/IAD each have 3, all independent)
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

## Shape Selection: Cost vs Performance

**Budget-critical** (save ~66%):
- VM.Standard.A1.Flex (ARM): $0.01/OCPU/hr vs $0.03 AMD
- Caveat: test ARM compatibility — not all software runs on ARM

**General purpose** (balanced):
- VM.Standard.E4.Flex: 2:16 CPU:RAM ratio, $0.03/OCPU/hr
- Start with 2 OCPUs, scale based on metrics — not guesses

**Memory-intensive** (databases, caches):
- VM.Standard.E4.Flex with custom ratio: up to 1:64 CPU:RAM
- Cost: $0.03/OCPU + $0.0015/GB RAM

## Quick Cost Reference

| Shape Family      | $/OCPU/hr | $/GB RAM/hr | Best For                        |
|-------------------|-----------|-------------|---------------------------------|
| A1.Flex (ARM)     | $0.01     | $0.0015     | Cost-critical, ARM-compatible   |
| E4.Flex (AMD)     | $0.03     | $0.0015     | General purpose                 |
| E5.Flex (AMD)     | $0.035    | $0.0015     | Latest gen, premium performance |
| Optimized3.Flex   | $0.025    | $0.0015     | Network-intensive               |

**Free Tier**: 2x AMD VM (1/8 OCPU, 1GB) + 4 ARM cores (24GB total) — always free

**Formula**: (OCPUs × $/OCPU + GB × $0.0015) × 730 hrs/month
Example: 2 OCPU, 16GB E4 = (2×$0.03 + 16×$0.0015) × 730 = **$61.32/month**

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
