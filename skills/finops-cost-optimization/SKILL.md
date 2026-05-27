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
When the request is only asking to find or install skills, use `find-skills` instead.

## When to Use

Load this skill for: the user asks to "optimize OCI cost", "investigate an OCI bill", "estimate egress cost", "right-size OCI resources", or "plan Resource Scheduler savings".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `best-practices` as the router.

## NEVER Do This

**NEVER terminate instances without `--preserve-boot-volume false`**
```bash
# DEFAULT OCI behavior: boot volume PRESERVED after instance termination
oci compute instance terminate --instance-id <ocid> --force
# Instance gone, but the boot volume can keep charging until deleted

# RIGHT: explicitly delete boot volume
oci compute instance terminate \
  --instance-id <ocid> \
  --preserve-boot-volume false

# In Terraform (must set explicitly — default is true):
resource "oci_core_instance" "dev" {
  preserve_boot_volume = false
}
# Estimate waste with live pricing:
# orphaned_boot_volume_cost = count * gb_per_volume * live_boot_volume_rate
```

**NEVER leave reserved public IPs unattached**
```
Reserved public IPs can keep charging while reserved, whether attached or not.
Ephemeral public IPs are released with the instance lifecycle.

Use RESERVED only when you need a static IP that survives instance termination.
Use EPHEMERAL for everything else.

Detection: oci network public-ip list --scope REGION --lifetime RESERVED
```

**NEVER assume stopped resources = zero cost**
```
Stopped Compute Instance:
  Compute billing may pause while stopped
  Boot volumes can continue charging
  Block volumes can continue charging
  Reserved public IPs can continue charging

Stopped Autonomous Database:
  CPU/ECPU billing may stop while stopped
  Storage can continue charging
  Backups or retention can continue charging

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

**NEVER over-commit Universal Credits without understanding non-transferability**
```
Credits are NON-TRANSFERABLE between service categories:
  Compute credits → compute only
  Database credits → database only
  Cannot move surplus to another category

Monthly credits can expire without rollover depending on the contract.
Unused committed spend in one service category may not offset another category.

RIGHT: Analyze 6 months historical usage per category.
       Commit to 70-80% of baseline, not peak.
```

**NEVER rely on FORECAST budget alerts as your primary alert**
```
Forecast alerts can be skewed by one-time migrations, month-start spikes, and seasonal usage.
Week 1 includes one-time data migration → forecast can overstate the monthly run rate.

RIGHT: Set ACTUAL spend alerts at 50%, 75%, 90%, 100%.
Use FORECAST for trend awareness only, not budget enforcement.
Budgets are ALERTING only — cannot block spending.
```

**NEVER use NAT Gateway for high-traffic applications**
```
NAT Gateway can include both hourly and per-GB processing charges.
Estimate with live pricing:
  nat_gateway_cost = (hours * live_hourly_rate) + (processed_gb * live_processing_rate)

Alternative: Ephemeral public IP on instance
Cost depends on current public IP and data-transfer pricing.

NAT Gateway makes sense for:
  - Private subnets with low outbound traffic
  - Security requirement (no public IPs on instances)
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
# 1. Orphaned boot volumes (most common waste)
oci bv boot-volume list --all --lifecycle-state AVAILABLE \
  | jq '.data[] | select(."attached-instance-id" == null)'

# 2. Unattached block volumes
oci bv volume list --all --lifecycle-state AVAILABLE

# 3. Reserved IPs without attachment
oci network public-ip list --scope REGION --lifetime RESERVED \
  | jq '.data[] | select(."assigned-entity-id" == null)'

# 4. Stopped instances still paying for volumes
oci compute instance list --lifecycle-state STOPPED

# 5. Old backups (filter by date)
# export CUTOFF_DATE=2026-01-01
oci bv backup list --all \
  | jq --arg cutoff "$CUTOFF_DATE" '.data[] | select(.["time-created"] < $cutoff)'

# 6. Load balancers with no backends
oci lb load-balancer list --all

# 7. Object Storage buckets that may be empty
oci os bucket list --all --fields approximateCount,approximateSize
```

---

## Reference Files

**Load [`references/oci-cost-cli.md`](references/oci-cost-cli.md) when:**
- Setting up budgets and multi-threshold alert rules
- Querying usage reports via CLI (`oci usage-api`)
- Managing service limits and quotas
- Downloading detailed cost and usage reports

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
