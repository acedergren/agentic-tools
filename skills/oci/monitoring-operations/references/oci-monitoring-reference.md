# OCI Monitoring Query Language (MQL) Reference

Last verified: 2026-09-30 against the Monitoring Query Language (MQL) Reference and "Creating an
Absence Alarm" on docs.oracle.com.

## Shape of a query

```
MetricName[interval]{dimension filters}.groupingFunction(...).statistic() predicate
```

Example: `CpuUtilization[5m]{availabilityDomain = "VeXI:PHX-AD-1"}.groupBy(resourceId).max() > 85`

## Interval

`1m`–`60m`, `1h`–`24h`, or `1d`. For alarms the interval must be at least the metric's emission
frequency (hourly metrics need `[1h]`). Alarm query resolution is always 1 minute.

## Dimension filters

| Form | Meaning |
|------|---------|
| `{resourceId = "ocid1..."}` | exact match |
| `{resourceId != "ocid1..."}` | not equal |
| `{dim1 = "a", dim2 = "b"}` | AND of filters |
| `{resourceDisplayName =~ "web-*"}` | fuzzy match, `*` wildcard |
| `{resourceDisplayName =~ "ol8|ol7"}` | fuzzy match, alternation |

`=~` exists only in MQL. Do not copy it into IAM policies.

## Statistics

`absent()`, `avg()`, `count()`, `first()`, `increment()`, `last()`, `max()`, `mean()`, `min()`,
`percentile(p)` with 0 < p < 1 (e.g. `percentile(0.9)`), `rate()` (per-second rate over the interval), `sum()`.

`absent()` returns 1 when the metric is absent for the whole interval, 0 when present, and stops
producing values after the absence detection period (default 2h; `absent(20m)` … `absent(3d)`).

## Predicates

| Operator | Meaning |
|----------|---------|
| `>`, `>=`, `==`, `!=`, `<`, `<=` | comparison |
| `in (a, b)` | between a and b, inclusive |
| `not in (a, b)` | outside a and b, inclusive |

## Grouping

- `groupBy(dim1, dim2)` — aggregate per distinct combination of the listed dimensions.
- `grouping()` — aggregate all streams into one.

## Arithmetic and joins

- `+ - * / %` between queries or with constants, e.g. `CpuUtilization[1m].mean() * 100`.
- `&&` and `||` join **whole queries**:
  `CpuUtilization[1m]{faultDomain =~ "FAULT-DOMAIN-1|FAULT-DOMAIN-2"}.mean() > 80 || MemoryUtilization[1m]{faultDomain =~ "FAULT-DOMAIN-1|FAULT-DOMAIN-2"}.mean() > 80`
- They are invalid inside a dimension set.

## Verified examples

```
# Sustained CPU on one instance
CpuUtilization[5m]{resourceId = "<instance-ocid>"}.mean() > 80

# Instances named ol8* or ol7* with low minimum CPU
CpuUtilization[1m]{resourceDisplayName =~ "ol8|ol7"}.min() >= 20

# Host (or agent) stopped reporting for 20 minutes
CpuUtilization[1m]{resourceId = "<instance-ocid>"}.groupBy(resourceId).absent(20m)

# ADB storage (hourly metric)
StorageUtilization[1h]{resourceId = "<adb-ocid>"}.max() > 85
```

## Alarm CLI flags worth knowing (OCI CLI 3.94.1)

`--query-text`, `--namespace`, `--metric-compartment-id`, `--pending-duration` (ISO-8601, e.g. `PT5M`),
`--severity`, `--destinations`, `--resolution`, `--repeat-notification-duration`,
`--is-notifications-per-metric-dimension-enabled`, `--evaluation-slack-duration`, `--rule-name`.

## Official sources

- MQL reference: https://docs.oracle.com/en-us/iaas/Content/Monitoring/Reference/mql.htm
- Absence alarms: https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-absence.htm
- Compute agent metrics: https://docs.oracle.com/en-us/iaas/Content/Compute/References/computemetrics.htm
- ADB metrics: https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html
- Load balancer metrics: https://docs.oracle.com/en-us/iaas/Content/Balance/Reference/loadbalancermetrics.htm
