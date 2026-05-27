# OCI CLI for Events Service Operations

Complete OCI CLI commands for event-driven automation and event rule management.

## Prerequisites

```bash
# Verify OCI CLI and authentication
oci --version
oci iam region list --output table

# Get compartment ID
export COMPARTMENT_ID=$(oci iam compartment list \
  --name "YourCompartment" \
  --query 'data[0].id' \
  --raw-output)

echo "Compartment: $COMPARTMENT_ID"
```

## List Available Event Types

```bash
# List all event types across OCI services
oci events event-type list --all --output table

# Filter by service (e.g., compute)
oci events event-type list \
  --all \
  | jq '.data[] | select(.name | contains("compute"))'

# Common event types by service
oci events event-type list --all \
  | jq -r '.data[] | .name' \
  | grep -E "^com.oraclecloud.(compute|database|objectstorage|iam)"

# Get specific event type details
oci events event-type get \
  --event-type "com.oraclecloud.computeapi.launchinstance"
```

## Create Event Rules

### Basic Event Rule (Single Event Type)

```bash
# Rule: Notify when compute instance is terminated
oci events rule create \
  --display-name "Compute-Instance-Terminated" \
  --description "Alert when any compute instance is terminated" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": "com.oraclecloud.computeapi.terminateinstance"
  }' \
  --actions '{
    "actions": [{
      "actionType": "ONS",
      "isEnabled": true,
      "topicId": "ocid1.onstopic.oc1..xxx",
      "description": "Send notification to SRE team"
    }]
  }'
```

### Event Rule with Compartment Filter

```bash
# Rule: Alert only for production compartment events
oci events rule create \
  --display-name "Prod-Database-Stopped" \
  --description "Alert when production database is stopped" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": "com.oraclecloud.databaseservice.stopautonomousdatabase",
    "data": {
      "compartmentName": "Prod"
    }
  }' \
  --actions '{
    "actions": [{
      "actionType": "ONS",
      "isEnabled": true,
      "topicId": "ocid1.onstopic.oc1..xxx",
      "description": "CRITICAL: Prod database stopped"
    }]
  }'
```

### Event Rule with Resource Name Pattern

```bash
# Rule: Process CSV files uploaded to Object Storage
oci events rule create \
  --display-name "Process-CSV-Uploads" \
  --description "Trigger function for CSV file uploads" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": "com.oraclecloud.objectstorage.createobject",
    "data": {
      "resourceName": "*.csv"
    }
  }' \
  --actions '{
    "actions": [{
      "actionType": "FAAS",
      "isEnabled": true,
      "functionId": "ocid1.fnfunc.oc1..xxx",
      "description": "Parse and load CSV data"
    }]
  }'
```

### Event Rule with Multiple Event Types

```bash
# Rule: Monitor compute instance lifecycle (create + delete)
oci events rule create \
  --display-name "Compute-Lifecycle-Audit" \
  --description "Log all compute instance creates and deletes" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": [
      "com.oraclecloud.computeapi.launchinstance",
      "com.oraclecloud.computeapi.terminateinstance"
    ]
  }' \
  --actions '{
    "actions": [{
      "actionType": "OSS",
      "isEnabled": true,
      "streamId": "ocid1.stream.oc1..xxx",
      "description": "Stream to audit log"
    }]
  }'
```

### Event Rule with Tag Filters

```bash
# Rule: Alert for changes to tagged resources
oci events rule create \
  --display-name "Critical-Resource-Changes" \
  --description "Alert for changes to critical infrastructure" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": "com.oraclecloud.computeapi.*",
    "data": {
      "freeformTags": {
        "Criticality": "High"
      }
    }
  }' \
  --actions '{
    "actions": [{
      "actionType": "ONS",
      "isEnabled": true,
      "topicId": "ocid1.onstopic.oc1..xxx",
      "description": "Critical resource event"
    }]
  }'
```

### Event Rule with Multiple Actions (Fan-Out)

```bash
# Rule: Multiple actions for same event
oci events rule create \
  --display-name "IAM-Policy-Changed-Multi-Action" \
  --description "Multiple responses to IAM policy changes" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": "com.oraclecloud.identityControlPlane.UpdatePolicy"
  }' \
  --actions '{
    "actions": [
      {
        "actionType": "ONS",
        "isEnabled": true,
        "topicId": "ocid1.onstopic.oc1..xxx",
        "description": "Email security team"
      },
      {
        "actionType": "FAAS",
        "isEnabled": true,
        "functionId": "ocid1.fnfunc.oc1..xxx",
        "description": "Log to SIEM"
      },
      {
        "actionType": "OSS",
        "isEnabled": true,
        "streamId": "ocid1.stream.oc1..xxx",
        "description": "Stream for audit compliance"
      }
    ]
  }'

# LIMIT: Maximum 5 actions per rule
```

## Manage Event Rules

### List Event Rules

```bash
# List all event rules in compartment
oci events rule list \
  --compartment-id $COMPARTMENT_ID \
  --lifecycle-state ACTIVE \
  --output table

# Get specific rule details
RULE_ID="ocid1.eventsrule.oc1..xxx"
oci events rule get --rule-id $RULE_ID

# List rules with specific display name
oci events rule list \
  --compartment-id $COMPARTMENT_ID \
  --display-name "Compute-Instance-Terminated" \
  --output json
```

### Update Event Rule

```bash
# Enable/disable rule
oci events rule update \
  --rule-id $RULE_ID \
  --is-enabled false

# Update rule condition
oci events rule update \
  --rule-id $RULE_ID \
  --condition '{
    "eventType": [
      "com.oraclecloud.computeapi.launchinstance",
      "com.oraclecloud.computeapi.terminateinstance",
      "com.oraclecloud.computeapi.changeinstanceshape"
    ]
  }'

# Add new action to existing rule
oci events rule update \
  --rule-id $RULE_ID \
  --actions '{
    "actions": [
      {
        "actionType": "ONS",
        "isEnabled": true,
        "topicId": "ocid1.onstopic.oc1..xxx"
      },
      {
        "actionType": "FAAS",
        "isEnabled": true,
        "functionId": "ocid1.fnfunc.oc1..xxx"
      }
    ]
  }'
```

### Delete Event Rule

```bash
# Delete specific rule
oci events rule delete \
  --rule-id $RULE_ID \
  --force

# Verify deletion
oci events rule list \
  --compartment-id $COMPARTMENT_ID \
  --lifecycle-state DELETED \
  --output table
```

## IAM Policies for Events

### Grant Events Permission to Invoke Functions

```bash
# Policy: Allow Events service to invoke all functions in compartment
oci iam policy create \
  --compartment-id $COMPARTMENT_ID \
  --name "Events-Invoke-Functions-Policy" \
  --description "Allow Events service to trigger Functions" \
  --statements '[
    "Allow service cloudEvents to use functions-family in compartment <compartment-name>"
  ]'

# Policy: Allow Events to invoke specific function
oci iam policy create \
  --compartment-id $COMPARTMENT_ID \
  --name "Events-Invoke-Specific-Function-Policy" \
  --description "Allow Events to invoke CSV processor function" \
  --statements '[
    "Allow service cloudEvents to use fn-function in compartment <compartment-name> where target.function.id = \"ocid1.fnfunc.oc1..xxx\""
  ]'
```

### Grant Events Permission to Publish to ONS

```bash
# Policy: Allow Events to publish to Notification topics
oci iam policy create \
  --compartment-id $COMPARTMENT_ID \
  --name "Events-Publish-ONS-Policy" \
  --description "Allow Events to send notifications" \
  --statements '[
    "Allow service cloudEvents to use ons-topics in compartment <compartment-name>"
  ]'
```

### Grant Events Permission to Write to Streaming

```bash
# Policy: Allow Events to publish to Streaming
oci iam policy create \
  --compartment-id $COMPARTMENT_ID \
  --name "Events-Publish-Streaming-Policy" \
  --description "Allow Events to write to Streaming" \
  --statements '[
    "Allow service cloudEvents to use stream-push in compartment <compartment-name>"
  ]'
```

## Testing and Debugging

### Test Event Rule Condition

```bash
# Get sample event payload for event type
oci events event-type get \
  --event-type "com.oraclecloud.computeapi.launchinstance" \
  | jq '.data."schema"'

# Manually trigger event (for testing)
# Note: OCI Events doesn't support manual event injection
# Test by performing the actual action (e.g., launch instance)

# Check rule execution history (via monitoring)
oci monitoring metric-data summarize-metrics-data \
  --namespace oci_events \
  --compartment-id $COMPARTMENT_ID \
  --query-text 'RulesEvaluated[1m].count()' \
  --start-time "2026-01-28T00:00:00Z" \
  --end-time "2026-01-28T23:59:59Z"
```

### Check Event Rule Metrics

```bash
# Get rule evaluation count
oci monitoring metric-data summarize-metrics-data \
  --namespace oci_events \
  --compartment-id $COMPARTMENT_ID \
  --query-text 'RulesEvaluated[5m]{ruleId="'$RULE_ID'"}.count()' \
  --start-time "2026-01-28T10:00:00Z" \
  --end-time "2026-01-28T11:00:00Z"

# Get action execution count
oci monitoring metric-data summarize-metrics-data \
  --namespace oci_events \
  --compartment-id $COMPARTMENT_ID \
  --query-text 'ActionsExecuted[5m]{ruleId="'$RULE_ID'"}.count()' \
  --start-time "2026-01-28T10:00:00Z" \
  --end-time "2026-01-28T11:00:00Z"

# Get failed action count
oci monitoring metric-data summarize-metrics-data \
  --namespace oci_events \
  --compartment-id $COMPARTMENT_ID \
  --query-text 'ActionsFailed[5m]{ruleId="'$RULE_ID'"}.count()' \
  --start-time "2026-01-28T10:00:00Z" \
  --end-time "2026-01-28T11:00:00Z"
```

## Common Event Patterns

### Pattern 1: Object Storage Upload → Function Processing

```bash
# Create notification topic
ONS_TOPIC=$(oci ons topic create \
  --compartment-id $COMPARTMENT_ID \
  --name "CSV-Processing-Topic" \
  --wait-for-state ACTIVE \
  --query 'data.id' --raw-output)

# Create function (assume already deployed)
FUNCTION_ID="ocid1.fnfunc.oc1..xxx"

# Create event rule
oci events rule create \
  --display-name "Object-Upload-Processing" \
  --description "Process files uploaded to Object Storage" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": "com.oraclecloud.objectstorage.createobject",
    "data": {
      "additionalDetails": {
        "bucketName": "data-ingestion"
      }
    }
  }' \
  --actions '{
    "actions": [{
      "actionType": "FAAS",
      "isEnabled": true,
      "functionId": "'$FUNCTION_ID'",
      "description": "Process uploaded file"
    }]
  }'
```

### Pattern 2: IAM Changes → Security Audit

```bash
# Create streaming for audit trail
STREAM_ID=$(oci streaming admin stream create \
  --compartment-id $COMPARTMENT_ID \
  --name "IAM-Audit-Stream" \
  --partitions 1 \
  --wait-for-state ACTIVE \
  --query 'data.id' --raw-output)

# Create event rule for IAM changes
oci events rule create \
  --display-name "IAM-Changes-Audit" \
  --description "Audit all IAM policy and user changes" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": [
      "com.oraclecloud.identityControlPlane.CreateUser",
      "com.oraclecloud.identityControlPlane.UpdateUser",
      "com.oraclecloud.identityControlPlane.DeleteUser",
      "com.oraclecloud.identityControlPlane.CreatePolicy",
      "com.oraclecloud.identityControlPlane.UpdatePolicy",
      "com.oraclecloud.identityControlPlane.DeletePolicy"
    ]
  }' \
  --actions '{
    "actions": [
      {
        "actionType": "ONS",
        "isEnabled": true,
        "topicId": "'$ONS_TOPIC'",
        "description": "Alert security team"
      },
      {
        "actionType": "OSS",
        "isEnabled": true,
        "streamId": "'$STREAM_ID'",
        "description": "Stream to SIEM"
      }
    ]
  }'
```

### Pattern 3: Database Lifecycle → Compliance Check

```bash
# Create event rule for database operations
oci events rule create \
  --display-name "Database-Lifecycle-Compliance" \
  --description "Compliance checks for database operations" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": [
      "com.oraclecloud.databaseservice.createautonomousdatabase",
      "com.oraclecloud.databaseservice.deleteautonomousdatabase",
      "com.oraclecloud.databaseservice.updateautonomousdatabase"
    ],
    "data": {
      "compartmentName": "Prod"
    }
  }' \
  --actions '{
    "actions": [{
      "actionType": "FAAS",
      "isEnabled": true,
      "functionId": "'$FUNCTION_ID'",
      "description": "Check encryption, backup policy, tags"
    }]
  }'
```

### Pattern 4: Compute Instance State → Cost Optimization

```bash
# Create event rule to detect long-running dev instances
oci events rule create \
  --display-name "Dev-Instance-Running-Alert" \
  --description "Alert when dev instances run beyond business hours" \
  --is-enabled true \
  --compartment-id $COMPARTMENT_ID \
  --condition '{
    "eventType": "com.oraclecloud.computeapi.launchinstance",
    "data": {
      "freeformTags": {
        "Environment": "Dev"
      }
    }
  }' \
  --actions '{
    "actions": [{
      "actionType": "FAAS",
      "isEnabled": true,
      "functionId": "'$FUNCTION_ID'",
      "description": "Schedule auto-shutdown at 6pm"
    }]
  }'
```

## Troubleshooting

### Event Rule Not Firing

```bash
# 1. Check if rule is enabled
oci events rule get --rule-id $RULE_ID \
  | jq '.data."is-enabled"'

# 2. Check if event type is correct
oci events event-type list --all \
  | jq -r '.data[] | .name' \
  | grep -i "compute"

# 3. Check IAM policies
oci iam policy list \
  --compartment-id $COMPARTMENT_ID \
  | jq '.data[] | select(.name | contains("Events"))'

# 4. Check rule metrics (did rule evaluate?)
oci monitoring metric-data summarize-metrics-data \
  --namespace oci_events \
  --compartment-id $COMPARTMENT_ID \
  --query-text 'RulesEvaluated[5m]{ruleId="'$RULE_ID'"}.count()' \
  --start-time "2026-01-28T10:00:00Z" \
  --end-time "2026-01-28T11:00:00Z"
```

### Action Failing (Function Not Invoked)

```bash
# 1. Check action failures metric
oci monitoring metric-data summarize-metrics-data \
  --namespace oci_events \
  --compartment-id $COMPARTMENT_ID \
  --query-text 'ActionsFailed[5m]{ruleId="'$RULE_ID'"}.count()' \
  --start-time "2026-01-28T10:00:00Z" \
  --end-time "2026-01-28T11:00:00Z"

# 2. Check IAM policy for Functions
oci iam policy list \
  --compartment-id $COMPARTMENT_ID \
  | jq '.data[] | select(.statements[] | contains("cloudEvents"))'

# 3. Check function logs
oci logging log list \
  --log-group-id "ocid1.loggroup.oc1..xxx" \
  --output table

# 4. Verify function exists and is active
oci fn function get --function-id $FUNCTION_ID
```

### Event Filter Not Matching

```bash
# Get event type schema to understand available fields
oci events event-type get \
  --event-type "com.oraclecloud.objectstorage.createobject" \
  | jq '.data.schema'

# Common filter fields:
# - compartmentName: Name of compartment
# - compartmentId: OCID of compartment
# - resourceName: Resource name (supports wildcards *)
# - freeformTags: User-defined tags
# - definedTags: Defined tag namespaces

# Test filter specificity
# Too broad: All compute events
{"eventType": "com.oraclecloud.computeapi.*"}

# More specific: Only instance launches in prod
{
  "eventType": "com.oraclecloud.computeapi.launchinstance",
  "data": {"compartmentName": "Prod"}
}
```

## Best Practices

### Use Specific Event Types (Not Wildcards)

```bash
# ❌ BAD - matches all 50+ compute event types
oci events rule create \
  --condition '{"eventType": "com.oraclecloud.computeapi.*"}' \
  ...

# ✅ GOOD - matches only critical lifecycle events
oci events rule create \
  --condition '{
    "eventType": [
      "com.oraclecloud.computeapi.launchinstance",
      "com.oraclecloud.computeapi.terminateinstance"
    ]
  }' \
  ...
```

### Always Set IAM Policies First

```bash
# 1. Create IAM policy
oci iam policy create \
  --compartment-id $COMPARTMENT_ID \
  --name "Events-Functions-Policy" \
  --statements '["Allow service cloudEvents to use functions-family in compartment MyCompartment"]'

# 2. Wait for policy to propagate (30 seconds)
sleep 30

# 3. Create event rule
oci events rule create \
  --condition '...' \
  --actions '...'
```

### Monitor Event Rule Health

```bash
# Create alarm for failed actions
oci monitoring alarm create \
  --compartment-id $COMPARTMENT_ID \
  --display-name "Events-Actions-Failed-Alarm" \
  --namespace "oci_events" \
  --query-text 'ActionsFailed[1m].sum() > 0' \
  --severity "CRITICAL" \
  --destinations '["'$ONS_TOPIC'"]' \
  --is-enabled true
```

### Use Descriptive Names

```bash
# ✅ GOOD - clear purpose
--display-name "Prod-Database-Stopped-Alert"
--description "Critical: Production database stopped - requires immediate investigation"

# ❌ BAD - unclear
--display-name "Rule-1"
--description "Database rule"
```

## When to Use OCI Events CLI

**Use these commands when you need to:**
- Create event-driven automation workflows
- Set up event rules with custom filters
- Troubleshoot event delivery issues
- Test event patterns and actions
- Quick prototypes before Terraform implementation

**Don't use for:**
- Production deployments (use OCI Landing Zone Terraform modules)
- Complex multi-rule architectures (use Terraform)
- When IaC governance is required (use Terraform)
