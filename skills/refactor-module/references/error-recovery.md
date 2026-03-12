# Error Recovery: Terraform Module Refactoring

## When State Migration Causes Destroy/Create Plan

**Recovery steps**:
1. **STOP**: Do NOT apply. Run `terraform state pull > emergency-backup.tfstate` immediately
2. **Diagnose**: Run `terraform state list` to see current addresses vs expected module addresses
3. **Fix state**: Run `terraform state mv` for each resource that moved into module
4. **Fallback**: If already applied and destroyed, `terraform state push emergency-backup.tfstate` then `terraform import module.network.aws_vpc.main vpc-xxxxx`

**Why this is deceptively hard to debug**: NO ERROR MESSAGE. `terraform apply` shows plan to destroy VPC, create "new" VPC with identical config. Looks like Terraform bug or state corruption. Developers approve the plan thinking it's safe, then production VPC gets destroyed. The fix (state mv) is 2 minutes, but discovering that's the problem takes 20–30 minutes—and by then you may have already caused an outage.

---

## When Module Has Too Many Variables (Leaky Abstraction)

**Recovery steps**:
1. **Audit usage**: Survey all consumers—which variables do they actually use? (Often 20% of variables)
2. **Identify patterns**: Group consumers by usage pattern (data buckets, log buckets, artifact buckets)
3. **Redesign interface**: Replace 50 variables with `bucket_type` enum + sensible defaults per type
4. **Fallback**: If redesign too risky, create `v2` module with clean interface, deprecate `v1` over 6 months

**Why this is deceptively hard to debug**: Module works perfectly—tests pass, apply succeeds. The problem emerges slowly over months: every resource argument becomes a module variable, consumers still need to know AWS internals to use the module (defeating abstraction purpose). Takes 3–6 months of maintenance hell before team realizes. By then, you have 10+ consumers and unwinding is more painful than living with it.

---

## When Premature Module Needs Different Features Per Consumer

**Recovery steps**:
1. **Count feature flags**: If >10 boolean toggles, module is wrong abstraction
2. **Split by usage**: Create separate modules per use case (simple-bucket, versioned-bucket, replicated-bucket)
3. **Migrate incrementally**: New consumers use new modules, old consumers stay on v1 (deprecate over time)
4. **Fallback**: If splitting too complex, add `advanced_config` escape hatch allowing raw HCL passthrough for edge cases

**Why this is deceptively hard to debug**: Each variable addition seems reasonable in isolation. After 6 months, module has 30 variables, 20 boolean flags, complex conditional logic. Nobody uses all features. Every change risks breaking someone. The wrong abstraction was baked in before patterns emerged—reversing it requires coordinating 10+ teams, a 2-month project nobody has time for.

---

## When Multiple Module Versions Cause Maintenance Hell

**Recovery steps**:
1. **Audit versions**: `grep -r 'source.*?ref=' . | sort | uniq -c`
2. **Create migration path**: Write automated migration script (sed/awk) to update HCL from v1 → v2
3. **Coordinate upgrades**: Schedule "module upgrade week" where all teams migrate together
4. **Fallback**: If coordination impossible, use monorepo with workspace protocol (`source = "../../modules/vpc"`) to eliminate versions—all consumers use same code, breaking changes impossible

**Why this is deceptively hard to debug**: Version divergence happens slowly over weeks/months. After 3–6 months you have 5 major versions to support, or you force painful migrations that break production apps.
