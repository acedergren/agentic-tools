---
name: monitoring-operations
description: "Use when setting up OCI metrics, alarms, or log collection, or troubleshooting missing data and silent alarms. Covers metric namespace naming, MQL dimension requirements, alarm missing-data handling, Service Connector IAM gaps, and Cloud Guard integration. KEYWORDS: monitoring, alarm, metric, MQL, namespace, log, Service Connector, Log Analytics, Cloud Guard, missing data, oci_computeagent."
---

# OCI Monitoring and Observability - Expert Knowledge

## NEVER Do This

**NEVER debug "missing metrics" within the first 15 minutes**
- Metrics are published every 1–5 minutes
- Processing delay adds another 5–10 minutes
- Total lag from event to visible metric: **10–15 minutes**
- Premature debugging creates false investigations

**NEVER use `=` for alarm thresholds with sparse metrics**
```
# WRONG - alarm never fires when metric has data gaps
MetricName[1m].mean() = 0

# RIGHT - handle missing data explicitly
MetricName[1m]{dataMissing=zero}.mean() > 0
```

**NEVER omit the `resourceId` dimension in metric queries**
```
# WRONG - returns no data (required dimension missing)
CPUUtilization[1m].mean()

# RIGHT - filter by instance OCID
CPUUtilization[1m]{resourceId="<instance-ocid>"}.mean()
```
Querying without dimensions returns data for ALL resources — usually not what's intended, and rate-limited at 1000 req/min.

**NEVER set alarm thresholds without a trigger delay**
```
# BAD - fires on every transient CPU spike (alert fatigue)
CPUUtilization[1m].mean() > 80

# BETTER - fires only on sustained breach
CPUUtilization[5m].mean() > 80
# + set trigger delay: 5 minutes (5 consecutive breaches)
```

**NEVER create alarms without notification destinations**
```bash
# WRONG - alarm fires but nobody is notified
oci monitoring alarm create ... --destinations '[]'

# RIGHT - always link to a notification topic
oci monitoring alarm create ... --destinations '["<notification-topic-ocid>"]'
```
Cost impact: undetected production outages = $5,000–50,000+/hour.

**NEVER ignore Cloud Guard findings**
- Cloud Guard detects misconfigurations before they become incidents
- Wire it: Cloud Guard → Notifications → email/Slack/PagerDuty
- Unresolved findings fail CIS/SOC2/HIPAA audits

## Metric Namespace Reference

OCI uses service-specific namespaces — using the wrong namespace returns no data with no error.

| Service          | Namespace                    | Key Metrics                              |
|------------------|------------------------------|------------------------------------------|
| Compute          | `oci_computeagent`           | `CPUUtilization`, `MemoryUtilization`    |
| Autonomous DB    | `oci_autonomous_database`    | `CpuUtilization`, `StorageUtilization`   |
| Load Balancer    | `oci_lbaas`                  | `HttpRequests`, `UnHealthyBackendServers`|
| Object Storage   | `oci_objectstorage`          | `ObjectCount`, `BytesUploaded`           |

Common mistake: using `oci_compute` instead of `oci_computeagent` — the agent namespace requires the OCI Compute Agent to be running on the instance.

## Alarm Missing Data Handling

| Setting | Behavior | Use When |
|---------|----------|----------|
| `treatMissingDataAsBreaching` | Alarm fires if no data arrives | Critical services (silence = outage) |
| `treatMissingDataAsNotBreaching` | Alarm silent if no data | Optional or intermittent monitoring |
| `{dataMissing=zero}` in MQL | Treats gaps as 0 value | Request counters, throughput metrics |

## Log Collection Troubleshooting

```
Logs not appearing in Log Analytics?
│
├─ Is logging enabled on the resource?
│  └─ Compute: is oci-compute-agent running? (systemctl status oracle-cloud-agent)
│  └─ Functions: is logging enabled in function configuration?
│
├─ Is Service Connector configured and ACTIVE?
│  └─ Source: Log Group → Target: Log Analytics
│  └─ Check status: oci sch service-connector get --id <ocid>
│
├─ IAM policy for Service Connector?
│  └─ "Allow any-user to use log-content in tenancy"
│  └─ "Allow service loganalytics to READ logcontent in tenancy"
│  └─ Missing EITHER policy causes silent failure
│
└─ 10–15 minute ingestion lag?
   └─ Wait before concluding logs are missing
```

## Metric Query Performance

Unfiltered queries scan ALL resources in compartment — slow and consumes rate limit budget.

```
# Expensive: scans all instances
CPUUtilization[1m].mean()

# Optimized: filter to specific instance
CPUUtilization[1m]{resourceId='<instance-ocid>'}.mean()
```

Rate limit: 1000 metric queries/minute per tenancy. Dashboard with many unfiltered widgets can exhaust this.

## Progressive Loading Reference

Load [`references/oci-monitoring-reference.md`](references/oci-monitoring-reference.md) when:
- Need the complete list of OCI service metric namespaces and metric names
- Writing complex MQL expressions (composites, functions, grouping)
- Implementing composite alarm conditions
- Setting up Log Analytics workspace, APM, or Service Connector Hub in detail

Do NOT load for alarm threshold patterns, namespace gotchas, or log troubleshooting — this file covers those.
