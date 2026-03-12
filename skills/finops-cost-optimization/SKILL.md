---
name: finops-cost-optimization
description: "Use when optimizing OCI costs, investigating unexpected bills, right-sizing resources, or planning Universal Credits commitments. Covers OCI-specific hidden cost traps (orphaned boot volumes, reserved IPs, stopped resources), Universal Credits non-transferability gotcha, shape migration savings, free tier maximization, and egress cost surprises. Keywords: cost, billing, budget, ECPU, boot volume, reserved IP, Universal Credits, free tier, egress, shape, FinOps."
---

# OCI FinOps - Expert Knowledge

## NEVER Do This

**NEVER terminate instances without `--preserve-boot-volume false`**
```bash
# DEFAULT OCI behavior: boot volume PRESERVED after instance termination
oci compute instance terminate --instance-id <ocid> --force
# Instance gone, but boot volume keeps charging at $0.025/GB/month FOREVER

# RIGHT: explicitly delete boot volume
oci compute instance terminate \
  --instance-id <ocid> \
  --preserve-boot-volume false

# In Terraform (must set explicitly — default is true):
resource "oci_core_instance" "dev" {
  preserve_boot_volume = false
}
# 20 forgotten boot volumes at 50GB = $25/month = $300/year
```

**NEVER leave reserved public IPs unattached**
```
Reserved IP: $0.01/hour = $7.30/month (charged whether attached or not)
Ephemeral IP: $0 (auto-deleted when instance terminated)

Use RESERVED only when you need a static IP that survives instance termination.
Use EPHEMERAL for everything else.

5 forgotten reserved IPs = $36.50/month = $438/year
Detection: oci network public-ip list --scope REGION --lifetime RESERVED
```

**NEVER assume stopped resources = zero cost**
```
Stopped Compute Instance:
  Compute: $0 (stopped)
  Boot volume: $0.025/GB/month CONTINUES
  Block volumes: $0.025/GB/month CONTINUES
  Reserved IP (if attached): $7.30/month CONTINUES

Stopped Autonomous Database:
  Compute: $0 (stopped)
  Storage: $0.025/GB/month CONTINUES
  Backups: Retention charges CONTINUE

Rule: Stopped = compute paused, storage still charged.
For long-term idle (>30 days): terminate + backup, restore when needed.
```

**NEVER send large data via internet egress without calculating cost first**
```
OCI egress pricing:
  First 10 TB/month: FREE
  10-50 TB: $0.0085/GB
  50+ TB: contact sales

15 TB bulk export = 5 TB chargeable × $0.0085/GB × 1024 = $43,520

Cheaper alternatives:
1. OCI FastConnect (1 Gbps): $1,100/month flat, breakeven at 130 GB/month
2. Intra-region transfer between OCI services: FREE
3. Cross-region transfer (OCI to OCI): FREE (intra-Oracle network)
```

**NEVER over-commit Universal Credits without understanding non-transferability**
```
Credits are NON-TRANSFERABLE between service categories:
  Compute credits → compute only
  Database credits → database only
  Cannot move surplus to another category

Commit $10k/month compute, use $6k → $4k/month waste ($48k/year).
Monthly credits EXPIRE end of month (no rollover = use-it-or-lose-it).

RIGHT: Analyze 6 months historical usage per category.
       Commit to 70-80% of baseline, not peak.
```

**NEVER rely on FORECAST budget alerts as your primary alert**
```
OCI FORECAST uses simple linear projection (30-40% error rate).
Week 1 includes one-time data migration → forecast projects 4× that for month.

RIGHT: Set ACTUAL spend alerts at 50%, 75%, 90%, 100%.
Use FORECAST for trend awareness only, not budget enforcement.
Budgets are ALERTING only — cannot block spending.
```

**NEVER use NAT Gateway for high-traffic applications**
```
NAT Gateway cost: $0.01/hr ($7.30/month) + $0.01/GB processed
5 TB/month outbound: $7.30 + (5000 × $0.01) = $57.30/month

Alternative: Ephemeral public IP on instance
Cost for <10 TB egress: $0/month

NAT Gateway makes sense for:
  - Private subnets with <100 GB/month egress
  - Security requirement (no public IPs on instances)
```

---

## Shape Migration Savings

**Fixed → Flex (right-size RAM separately from OCPU):**
```
VM.Standard2.4: 4 OCPU, 60 GB RAM (fixed 1:15 ratio)
Cost: $0.24/hr = $175/month

VM.Standard.E4.Flex: 4 OCPU, 16 GB RAM (custom ratio)
Cost: ($0.02/OCPU × 4) + ($0.0015/GB × 16) = $0.104/hr = $76/month

Savings: $99/month per instance (56% reduction)
```

**AMD → Arm (50% compute cost reduction):**
```
VM.Standard.E4.Flex: 4 OCPU, 16 GB RAM → $58.40/month
VM.Standard.A1.Flex: 4 OCPU, 16 GB RAM → $29.20/month
Savings: $29.20/month (50% reduction)

Gotcha: ARM64 architecture — verify Docker images, compiled binaries, and language runtimes support arm64 before migrating.
```

---

## Free Tier Maximization

Always-Free tier if fully utilized saves ~$727/month ($8,730/year):
```
Compute:
  2× AMD Micro VMs:     $14/month
  4 Arm OCPU (24 GB):   $29.20/month

Database:
  2× Autonomous Databases: $584/month (2 ECPU each, 20 GB storage)

Storage:
  200 GB block + 10 GB object + 10 GB archive: $5.28/month

Networking:
  1 load balancer + 10 TB egress: $95/month
```

**Critical gotcha**: 2 ADB limit is TENANCY-wide (not per region, not per compartment). Counted across all regions.

---

## Storage Lifecycle Optimization

```
10 TB compliance data, accessed quarterly:

Without tiering (Standard all year):
  10,000 GB × $0.0255/GB/month × 12 = $3,060/year

With lifecycle rule (Archive after 30 days):
  Month 1 (Standard):    $255
  Months 2-12 (Archive): 10,000 GB × $0.0024 × 11 = $264
  Total: $519/year

Savings: $2,541/year (83% reduction)
Retrieval cost: $0.01/GB — acceptable for quarterly access
```

Lifecycle policy: Day 0-30 Standard → Day 31+ Archive.

---

## Dev/Test Auto-Shutdown Savings

```
10 dev instances, 2 OCPU each:
24/7: 10 × 2 × $0.02/hr × 730 = $292/month

Weekdays 9am-6pm only (195 hours/month):
10 × 2 × $0.02 × 195 = $78/month

Savings: $214/month (73% reduction)

Implementation:
  Tag instances: Environment=Development
  OCI Functions for start/stop
  OCI Scheduler: Start weekdays 9am, Stop weekdays 6pm
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
oci bv backup list --all \
  | jq '.data[] | select(.["time-created"] < "2025-01-01")'

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
