---
name: monitoring-operations
description: "Use when the user asks to \"create OCI alarms\", \"debug missing metrics\", \"write MQL\", \"configure Service Connector\", or \"monitor OCI resources\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Monitoring"
  - "MQL"
  - "alarm"
  - "metric namespace"
  - "Logging"
  - "Service Connector"
  - "Log Analytics"
  - "Cloud Guard"
  - "oci_computeagent"
aliases:
  - "oci-monitoring"
  - "oci-observability"
domains:
  - "oci"
  - "observability"
---
# OCI Monitoring and Observability - Expert Knowledge

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.

## When to Use

Load this skill for: the user asks to "create OCI alarms", "debug missing metrics", "write MQL", "configure Service Connector", or "monitor OCI resources".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `oci/best-practices` as the router.

## NEVER Do This

**NEVER alert on "no data" with a threshold query — use `absent()`**
```
# WRONG - a threshold alarm never evaluates when the metric stops arriving,
# so a dead host / dead agent stays silent
CpuUtilization[1m]{resourceId = "<instance-ocid>"}.mean() > 0

# RIGHT - absence alarm (default absence detection period: 2h, range 1m–3d)
CpuUtilization[1m]{resourceId = "<instance-ocid>"}.groupBy(resourceId).absent()
CpuUtilization[1m]{resourceId = "<instance-ocid>"}.groupBy(resourceId).absent(20m)
```
OCI has no `treatMissingData` setting and no `{dataMissing=...}` MQL option (those are CloudWatch-isms).
Use `groupBy(resourceId)` with `absent()`: without it, a new metric stream (new dimension value) can
cause false triggers because the alarm watches every stream.

**NEVER use MQL syntax in IAM policies (or vice versa)**
- `=~` fuzzy matching (`{resourceDisplayName =~ "web-*"}` or `"a|b"`) is valid **only** in MQL dimension filters.
- IAM policy conditions use `=`/`!=` and `/pattern*/` — see `oci/iam-identity-management`.
- `&&` / `||` join whole queries, never dimension sets:
  `CpuUtilization[1m]{faultDomain =~ "FAULT-DOMAIN-1|FAULT-DOMAIN-2" || resourceDisplayName = "x"}` is invalid.

**NEVER fire on a single 1-minute sample**
```
# BAD - pages on every transient spike
CpuUtilization[1m].mean() > 80

# BETTER - 5-minute window, plus a pending duration so the breach must persist
CpuUtilization[5m]{resourceId = "<instance-ocid>"}.mean() > 80
```
```bash
oci monitoring alarm create \
  --compartment-id "$ALARM_COMPARTMENT" \
  --metric-compartment-id "$METRIC_COMPARTMENT" \
  --display-name "web-01 CPU > 80% for 10m" \
  --namespace oci_computeagent \
  --query-text 'CpuUtilization[5m]{resourceId = "<instance-ocid>"}.mean() > 80' \
  --pending-duration PT10M \
  --severity CRITICAL \
  --destinations '["<notification-topic-ocid>"]' \
  --is-enabled true
```
The interval (`[5m]`) must be ≥ the metric's emission frequency (e.g. ADB `StorageUtilization` is
hourly — use `[1h]`). `--pending-duration` is OCI's "trigger delay".

**NEVER create alarms without notification destinations**
An alarm with `--destinations '[]'` changes state in the console and notifies nobody.

**NEVER expect `oci_computeagent` metrics from an instance that can't reach Monitoring**
They are emitted by the Oracle Cloud Agent's *Compute Instance Monitoring* plugin. The plugin must be
enabled and the instance needs a route to OCI services (service gateway, NAT, or public IP).
Check on the host: `systemctl status oracle-cloud-agent`.

**NEVER hand-write an unconditioned `any-user` policy for Connector Hub**
`Allow any-user to ... in tenancy` with no `where` grants every principal in the tenancy.
Accept the Console's default connector policy, or scope it yourself with
`where all {request.principal.type = 'serviceconnector', request.principal.compartment.id = '<connector-compartment-ocid>'}`.

## Metric Namespace Reference

Using the wrong namespace or metric-name casing returns no data rather than an error.

| Service | Namespace | Example metrics (exact casing) |
|---------|-----------|--------------------------------|
| Compute (agent) | `oci_computeagent` | `CpuUtilization`, `MemoryUtilization` |
| Autonomous DB | `oci_autonomous_database` | `CpuUtilization` (relative to ECPUs), `StorageUtilization` (hourly) |
| Load Balancer | `oci_lbaas` | `httpRequests`, `unhealthyBackendServers`, `backendTimeouts` |
| Object Storage | `oci_objectstorage` | `ObjectCount`, `StoredBytes`, `AllRequests` |

List what actually exists before writing a query:
```bash
oci monitoring metric list --compartment-id "$C" --namespace oci_computeagent
```

## Log Collection Troubleshooting

```
Logs not arriving at the target (Logging Analytics, bucket, stream)?
│
├─ Is the log enabled? (service log on the resource, or custom log via agent config)
│  └─ Compute custom logs: Oracle Cloud Agent "Custom Logs Monitoring" plugin + agent configuration
│
├─ Is the connector ACTIVE and moving data?
│  └─ oci sch service-connector get --service-connector-id <ocid>
│  └─ Enable the connector's own logs to see per-run errors
│  └─ Connectors that fail for a long time are deactivated automatically
│
├─ Connector policies present? (Console offers default policies at create time;
│  they remain after the connector is deleted — clean them up)
│
└─ Failed runs recover data only within the Logging source's 24-hour retention period
```

## Progressive Loading Reference

Load [`references/oci-monitoring-reference.md`](references/oci-monitoring-reference.md) for the MQL
grammar (intervals, statistics, predicates, fuzzy matching, joins, grouping) and verified examples.
It is not a complete catalog of service metrics; use `oci monitoring metric list` or the service's
metrics page for that.

Last verified: 2026-09-30 (docs.oracle.com Monitoring MQL reference, absence alarms, Connector Hub; OCI CLI 3.94.1)

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
