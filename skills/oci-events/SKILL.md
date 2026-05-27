---
name: oci-events
description: "Use when the user asks to \"create OCI Events rule\", \"trigger Functions from events\", \"route events to Streaming\", \"debug Events delivery\", or \"filter CloudEvents\"."
version: 2.0.0
keywords:
  - "OCI Events"
  - "CloudEvents"
  - "Functions"
  - "Streaming"
  - "Notifications"
  - "event rule"
  - "event filter"
  - "FAAS"
  - "ONS"
  - "serverless"
aliases:
  - "oracle-cloud-events"
  - "events-service"
domains:
  - "oci"
  - "events"
---
# OCI Events Service - Event-Driven Architecture

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.
When the request is only asking to find or install skills, use `find-skills` instead.

## When to Use

Load this skill for: the user asks to "create OCI Events rule", "trigger Functions from events", "route events to Streaming", "debug Events delivery", or "filter CloudEvents".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `best-practices` as the router.

## Events vs Alarms — First Decision

| Situation | Use |
|-----------|-----|
| Resource state changed (created, deleted, stopped) | **Events** |
| Metric threshold exceeded (CPU > 80%, disk full) | **Alarms** |
| User or policy was modified | **Events** |
| Performance degradation detected | **Alarms** |
| Automate response to lifecycle change | **Events** |

If you're trying to monitor a metric — stop, use Alarms. Events only fire on state changes.

## NEVER Do This

**NEVER use Events for metric threshold monitoring (use Alarms instead)**
```
BAD - Events for CPU threshold:
Event Rule: "CPU utilization > 80%"
Problem: Events don't monitor metrics!

CORRECT tool: Alarms
oci monitoring alarm create \
  --metric-name CpuUtilization \
  --threshold 80
```

**Why critical**: Events are for **state changes** (instance created, bucket deleted), NOT continuous metrics. Using Events for thresholds wastes time — the rule will never fire.

**Events vs Alarms:**
| Use Case | Tool | Example |
|----------|------|---------|
| State change | Events | Instance terminated, bucket created, database stopped |
| Metric threshold | Alarms | CPU > 80%, disk full, memory pressure |
| Resource lifecycle | Events | VCN created, policy updated, user added |
| Performance | Alarms | Query latency > 2s, error rate > 5% |

**NEVER assume Events has built-in failed-delivery DLQ behavior**
```bash
# RISKY - no durable copy of matching events before function delivery
oci events rule create \
  --display-name "Invoke-Function" \
  --condition '{"eventType": "com.oraclecloud.objectstorage.createobject"}' \
  --actions '{"actions": [{"actionType": "FAAS","isEnabled": true,"functionId": "ocid1.fnfunc.oc1..xxx"}]}'
# If downstream processing fails, you need your own replay/compensation path

# GOOD - add a Streaming action when the architecture needs durable capture/replay
# Treat Streaming as event capture, not as proof of built-in failed-delivery DLQ semantics
```

**Cost impact**: Lost events = lost business transactions. E-commerce: 1 lost order event = $50-500 revenue loss. Healthcare: 1 lost patient record event = compliance violation.

**NEVER use overly broad event filters (noise + cost)**
```json
// BAD - matches ALL compute events
{
  "eventType": "com.oraclecloud.computeapi.*"
}
// Fires for: launch, terminate, reboot, resize, metadata change
// Result: 1000s of events/day, function invocations cost $$$

// GOOD - specific event types
{
  "eventType": [
    "com.oraclecloud.computeapi.terminateinstance",
    "com.oraclecloud.computeapi.launchinstance"
  ]
}
// Fires only for critical lifecycle events
```

**Cost impact**: 10,000 unnecessary function invocations/day × $0.0000002/GB-second × 256MB × 5s = $2.56/day = $77/month wasted.

**NEVER send sensitive data in event notification (security risk)**
```json
// BAD - event includes passwords, keys
{
  "data": {
    "resourceName": "db-prod-1",
    "adminPassword": "SecurePass123!",  // EXPOSED!
    "apiKey": "sk_live_xxxxx"           // EXPOSED!
  }
}

// GOOD - reference-only events
{
  "data": {
    "resourceId": "ocid1.database.oc1..xxx",
    "resourceName": "db-prod-1"
    // Function retrieves secrets from Vault using resourceId
  }
}
```

**Security impact**: Notification emails/webhooks log event payload. Secrets in logs = credential exposure = breach.

**NEVER use Events for real-time streaming (use Streaming service)**
```
BAD use case: Process 10,000 transactions/second via Events
Events service limits: 50 requests/second per rule
Result: Throttling, dropped events

CORRECT: OCI Streaming
- Throughput: 1 MB/second per partition
- Retention: 7 days (vs Events = deliver-once)
- Consumer groups: Multiple consumers per stream
```

**Why critical**: Events deliver to actions once (best-effort). Streaming is for high-throughput, durable messaging.

**NEVER assume Events are delivered in order**
```
Event Timeline:
1. Object created at 10:00:00
2. Object updated at 10:00:01
3. Object deleted at 10:00:02

Events may arrive:
- Delete event at 10:00:03
- Create event at 10:00:04  // Out of order!
- Update event at 10:00:05
```

**Solution**: Include timestamp in event, check resource state before acting, or use idempotent operations.

**NEVER use more than 5 actions per rule (hard limit)**
```
BAD:  Event Rule → 10 functions (serial)  = 50+ second latency
GOOD: Event Rule → 1 function → Streaming → 10 parallel consumers = 5s
```

Design for fan-out via Streaming when >5 destinations are needed.

**NEVER forget IAM policy for event actions**
```bash
# Event rule shows "active" but function never triggers, no error → missing IAM policy

# Required policy statement:
"Allow service cloudEvents to use functions-family in compartment <compartment-name>"
```

Create this policy in the compartment where the event rule lives, or events silently fail with 403.

## Progressive Loading References

### Event Architecture Patterns and Filter Syntax

Load [`events-patterns.md`](references/events-patterns.md) only when:
- Designing event-driven architecture (Object Storage → Function, Instance Lifecycle → Notification)
- Writing complex event filter syntax (compartment, tags, resource attributes)
- Looking up common event types by OCI service
- Understanding fan-out patterns and event chaining
- Choosing between action types (ONS vs FAAS vs OSS)

**Do NOT load** for:
- Quick anti-pattern reference (NEVER list above covers it)
- Events vs Alarms decision (covered above)
- Quick CLI examples (use events-cli.md instead)

### OCI CLI for Events

Load [`events-cli.md`](references/events-cli.md) only when:
- Creating event rules with filters
- Configuring actions (Functions, Notifications, Streaming)
- Troubleshooting event delivery failures
- Listing available event types
- Testing event rule patterns

**Example**: Create event rule for object upload
```bash
oci events rule create \
  --display-name "Process-CSV-Uploads" \
  --condition '{
    "eventType": "com.oraclecloud.objectstorage.createobject",
    "data": {"resourceName": "*.csv"}
  }' \
  --actions '{
    "actions": [{
      "actionType": "FAAS",
      "isEnabled": true,
      "functionId": "ocid1.fnfunc.oc1..xxx"
    }]
  }' \
  --compartment-id $COMPARTMENT_ID
```

**Do NOT load** for:
- Function implementation details (covered in oci-functions skill)
- Notification topic setup (covered in monitoring-operations skill)
- Streaming configuration (covered in streaming skill when available)

### OCI Events Reference (Official Oracle Documentation)

Load [`oci-events-reference.md`](references/oci-events-reference.md) only when:
- Need official links for OCI service event types
- Understanding CloudEvents 1.0 specification in OCI
- Implementing complex event patterns and filtering
- Need official Oracle guidance on Events service architecture
- Troubleshooting event delivery and action failures

**Do NOT load** for:
- Quick event rule creation (CLI examples above)
- Common event patterns (architecture patterns in this skill)
- Events vs Alarms decision (decision table above)

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
