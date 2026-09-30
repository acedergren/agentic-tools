---
name: finops-cost-optimization
description: "Use when the user asks to \"optimize OCI cost\", \"investigate an OCI bill\", \"estimate egress cost\", \"right-size OCI resources\", or \"plan Resource Scheduler savings\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Oracle Cloud"
  - "FinOps"
  - "billing"
  - "budget"
  - "egress"
  - "FastConnect"
  - "Resource Scheduler"
  - "ECPU"
  - "boot volume"
  - "quota"
  - "service limits"
  - "Terraform plan"
aliases:
  - "oci-finops"
  - "oci-cost"
domains:
  - "oci"
  - "finops"
---
# OCI FinOps - Expert Knowledge

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.

## When to Use

Load this skill for: the user asks to "optimize OCI cost", "investigate an OCI bill", "estimate egress cost", "right-size OCI resources", or "plan Resource Scheduler savings".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `oci/best-practices` as the router.

## NEVER Do This

**NEVER assume terminate keeps (or deletes) the boot volume without saying so**
```bash
# OCI default (CLI and API): the boot volume is DELETED on terminate
# (--preserve-boot-volume defaults to false)
oci compute instance terminate --instance-id <ocid> --force

# Keep it on purpose (e.g. forensic copy) — and then track it, because it keeps billing
oci compute instance terminate --instance-id <ocid> --preserve-boot-volume true --force

# Terraform: preserve_boot_volume is optional and unset means the API default (delete).
resource "oci_core_instance" "dev" {
  preserve_boot_volume = false   # be explicit either way
}
```
Orphaned boot volumes come from explicit `--preserve-boot-volume true`, boot volume replacement, or
detached volumes. Find them with the audit commands below.

**NEVER leave reserved public IPs unattached**
```
The Oracle price list has no public IP SKU (checked 2026-09-30): the cost of a stray reserved IP is
service-limit exhaustion and an exposed, forgotten address, not a line item.
Ephemeral public IPs are released with the instance lifecycle.

Use RESERVED only when you need a static IP that survives instance termination.
Use EPHEMERAL for everything else.

Detection: oci network public-ip list --scope REGION --lifetime RESERVED
```

**NEVER assume stopped resources = zero cost**
```
Stopped Compute Instance:
  Standard shapes (and VM.GPU.A10): compute billing pauses while stopped
  Dense I/O and most GPU shapes: billing CONTINUES while stopped — terminate to stop it
  Boot volumes continue charging
  Block volumes can continue charging
  Reserved public IPs can continue charging

Stopped Autonomous Database:
  ECPU billing stops while stopped
  Storage continues charging
  Backups continue charging for their retention period

Rule: Stopped = compute paused, storage still charged.
For long-term idle (>30 days): terminate + backup, restore when needed.
```

**NEVER send large data via internet egress without calculating cost first**
```
Look up current OCI data transfer tiers before giving an egress estimate.
Calculate with live tiers:
  chargeable_gb = max(0, transferred_gb - included_allowance_gb)
  egress_cost = sum(tier_gb * live_tier_rate)

Cheaper alternatives:
1. OCI FastConnect: useful for private connectivity and predictable throughput; calculate port/provider costs before claiming egress savings
2. Intra-region transfer between OCI services: verify current service-specific pricing before calling it free
3. Cross-region transfer: verify current Oracle price list and source/destination services before calling it free
```

**NEVER over-commit Universal Credits**
```
Universal Credits (annual commit) can be spent on any eligible IaaS/PaaS service in any region —
they are not locked to a service category. The risk is the other direction:
unused credits are forfeited at the end of the commitment term (no rollover).

RIGHT: Analyze 6+ months of historical usage (oci usage-api usage-summary request-summarized-usages).
       Commit to a conservative baseline, not peak; pay-as-you-go covers the rest.
       Track burn-down against the commitment monthly (query-type CREDIT / EXPIREDCREDIT).
```

**NEVER rely on FORECAST budget alerts as your primary alert**
```
Forecast alerts can be skewed by one-time migrations, month-start spikes, and seasonal usage.
Week 1 includes one-time data migration → forecast can overstate the monthly run rate.

RIGHT: Set ACTUAL spend alerts at 50%, 75%, 90%, 100%.
Use FORECAST for trend awareness only, not budget enforcement.
Budgets are ALERTING only — cannot block spending.
```

**NEVER put public IPs on private workloads "to save NAT cost"**
```
NAT Gateway has no SKU in the Oracle price list (checked 2026-09-30) — it is free.
Outbound data through NAT is billed as normal outbound data transfer (first 10 TB/month free in
most regions), the same as through an internet gateway.
Oracle service traffic (Object Storage, etc.) should go via a Service Gateway instead of NAT.
```

---

## Shape Migration Savings

**Fixed → Flex (right-size RAM separately from OCPU):**
```
Current fixed shape:
  monthly_cost = hours * live_fixed_shape_rate

Candidate flexible shape:
  monthly_cost = hours * ((ocpus * live_ocpu_rate) + (gb_memory * live_memory_rate))

Savings:
  current_monthly_cost - candidate_monthly_cost
```

**AMD/Intel → Arm:**
```
Compare current x86 shape pricing against current Arm shape pricing for the target region and subscription.
Do not promise a fixed percentage reduction without a live price lookup.

Gotcha: ARM64 architecture — verify Docker images, compiled binaries, and language runtimes support arm64 before migrating.
```

---

## Free Tier Maximization

Use the current Oracle Always Free docs before quoting limits or savings:
```
1. Inventory current Always Free resources already consumed in the tenancy.
2. Confirm regional availability and service-specific eligibility.
3. Calculate avoided spend with the current Oracle price list.
4. Document the lookup date and source with every savings estimate.
```

**Critical gotcha**: verify whether each Always Free limit is tenancy-wide, region-scoped, or service-specific before counting savings.

---

## Terraform Plan Cost and Capacity Guardrail

Terraform plans do not prove OCI quota, limit, capacity, or price availability. Before presenting cost or apply confidence:

1. Check current Oracle pricing for the exact region, currency, subscription model, and service.
2. Check service limits and compartment quotas for the exact resource family.
3. Distinguish service-limit exhaustion from transient host capacity.
4. Include non-obvious adjacent costs such as boot volumes, backups, load balancers (flexible LB bandwidth), Network Firewall, Object Storage requests and retrieval, and outbound/cross-region data transfer.
5. Use Resource Scheduler as the default supported stop/start mechanism for dev/test savings; use custom Functions only when Scheduler cannot express the policy.

---

## Storage Lifecycle Optimization

```
10 TB compliance data, accessed quarterly:

Without tiering (Standard all year):
  gb * live_standard_rate * 12

With lifecycle rule (Archive after 30 days):
  (gb * live_standard_rate * 1) + (gb * live_archive_rate * 11)

Savings:
  standard_all_year_cost - lifecycle_policy_cost

Also check current retrieval, minimum-retention, operation, and replication charges before recommending Archive.
```

Lifecycle policy: Day 0-30 Standard → Day 31+ Archive.

---

## Dev/Test Auto-Shutdown Savings

```
10 dev instances, 2 OCPU each:
24/7 compute:
  instance_count * ocpus * live_ocpu_rate * 730

Weekdays 9am-6pm only (195 hours/month):
  instance_count * ocpus * live_ocpu_rate * 195

Savings:
  always_on_cost - scheduled_cost

Implementation:
  Tag instances: Environment=Development
  OCI Resource Scheduler for supported start/stop resources
  Custom Functions only when Resource Scheduler cannot express the policy
```

---

## Hidden Cost Detection (Monthly Audit)

```bash
# 1. Orphaned boot volumes: boot volumes minus attached boot volumes (per AD)
oci bv boot-volume list -c "$C" --availability-domain "$AD" --all \
  --query 'data[?"lifecycle-state"==`AVAILABLE`].id' > /tmp/bv.json
oci compute boot-volume-attachment list -c "$C" --availability-domain "$AD" --all \
  --query 'data[?"lifecycle-state"==`ATTACHED`]."boot-volume-id"' > /tmp/bva.json
jq -n --slurpfile a /tmp/bv.json --slurpfile b /tmp/bva.json '$a[0] - $b[0]'

# 2. Unattached block volumes: same pattern with
oci bv volume list -c "$C" --all --lifecycle-state AVAILABLE
oci compute volume-attachment list -c "$C" --all

# 3. Reserved IPs without attachment
oci network public-ip list -c "$C" --scope REGION --lifetime RESERVED --all \
  | jq '.data[] | select(."assigned-entity-id" == null)'

# 4. Stopped instances still paying for volumes
oci compute instance list -c "$C" --all --lifecycle-state STOPPED

# 5. Old backups (filter by date)
# export CUTOFF_DATE=2026-01-01
oci bv backup list -c "$C" --all \
  | jq --arg cutoff "$CUTOFF_DATE" '.data[] | select(.["time-created"] < $cutoff)'

# 6. Load balancers with no backends
oci lb load-balancer list -c "$C" --all

# 7. Object Storage buckets that may be empty
for b in $(oci os bucket list -c "$C" --all --query 'data[].name' --raw-output | jq -r '.[]'); do
  oci os bucket get --bucket-name "$b" --fields approximateCount --fields approximateSize \
    --query 'data.{name:name,count:"approximate-count",bytes:"approximate-size"}'
done
```

---

Last verified: 2026-09-30 (Oracle price list API; OCI CLI 3.94.1; terraform-provider-oci source; docs.oracle.com "Resource Billing for Stopped Instances", Universal Credits billing FAQ)

## Reference Files

**Load [`references/oci-cost-cli.md`](references/oci-cost-cli.md) when:**
- Setting up budgets and multi-threshold alert rules
- Querying usage reports via CLI (`oci usage-api`)
- Managing service limits and quotas
- Downloading detailed cost and usage reports

Load [`../infrastructure-as-code/references/oci-terraform-realms-regions.md`](../infrastructure-as-code/references/oci-terraform-realms-regions.md) when Terraform cost or quota claims depend on region, realm, government cloud, FIPS, or service availability.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
