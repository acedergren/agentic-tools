# OCI Events Service - Patterns Reference

## Event-Driven Architecture Patterns

### Pattern 1: Object Storage Upload → Function Processing

```
┌─────────────────┐
│ Object Storage  │
│  - User uploads │
│    file.csv     │
└────────┬────────┘
         │ Event: createObject
         ▼
┌─────────────────┐
│   Events Rule   │
│  Filter: .csv   │
└────────┬────────┘
         │ Invoke
         ▼
┌─────────────────┐
│   Function      │
│  - Parse CSV    │
│  - Store in DB  │
│  - Send email   │
└─────────────────┘

Event Filter:
{
  "eventType": "com.oraclecloud.objectstorage.createobject",
  "data": {
    "additionalDetails": {
      "eTag": "*"
    },
    "resourceName": "*.csv"
  }
}

Use case: Data ingestion pipeline, document processing
```

### Pattern 2: Compute Instance Lifecycle → Compliance Check

```
┌──────────────────┐
│ Compute Instance │
│  - Terminated    │
│  - Created       │
└────────┬─────────┘
         │ Event: terminateInstance
         ▼
┌──────────────────┐
│   Events Rule    │
│  Filter: Prod    │
└────────┬─────────┘
         │ Notify
         ▼
┌──────────────────┐     ┌──────────────────┐
│   Notification   │────▶│   PagerDuty     │
│   Topic          │     │   (On-call)      │
└──────────────────┘     └──────────────────┘

Event Filter:
{
  "eventType": "com.oraclecloud.computeapi.terminateinstance",
  "data": {
    "compartmentName": "Prod"
  }
}

Use case: Security monitoring, audit trail, incident response
```

### Pattern 3: Fan-Out (1 Event → Multiple Actions)

```
┌─────────────────┐
│  Database       │
│  - Stopped      │
└────────┬────────┘
         │ Event: stopAutonomousDatabase
         ▼
┌─────────────────────────────────────┐
│   Events Rule                       │
│  Actions:                           │
│   1. Notification → Email SRE      │
│   2. Function → Log to Splunk      │
│   3. Streaming → Analytics         │
└─────────────────────────────────────┘

Use case: Multi-channel alerting, compliance logging, analytics
Max actions: 5 per rule
```

### Pattern 4: Event Chaining (Event → Function → Event)

```
┌──────────────┐
│ IAM Policy   │
│  - Changed   │
└──────┬───────┘
       │ Event 1
       ▼
┌──────────────┐
│ Function 1   │
│ - Audit log  │
│ - Create     │
│   ticket     │
└──────┬───────┘
       │ Custom Event
       ▼
┌──────────────┐
│ Function 2   │
│ - Compliance │
│   check      │
└──────────────┘

Implementation: Functions can emit custom events using Events API
Use case: Complex workflows, approval chains
```

## Event Filter Syntax Decision Tree

```
"How should I filter events?"
│
├─ Filter by event type only (all occurrences)?
│   └─ Simple filter
│       {
│         "eventType": "com.oraclecloud.computeapi.launchinstance"
│       }
│
├─ Filter by compartment or tag?
│   └─ Compartment filter
│       {
│         "eventType": "com.oraclecloud.computeapi.launchinstance",
│         "data": {
│           "compartmentName": "Prod"
│         }
│       }
│
├─ Filter by resource attribute (name pattern)?
│   └─ Attribute filter
│       {
│         "eventType": "com.oraclecloud.objectstorage.createobject",
│         "data": {
│           "resourceName": "*.pdf"
│         }
│       }
│
├─ Filter by multiple event types?
│   └─ Array of event types
│       {
│         "eventType": [
│           "com.oraclecloud.computeapi.launchinstance",
│           "com.oraclecloud.computeapi.terminateinstance"
│         ]
│       }
│
└─ Complex logic (AND/OR conditions)?
    └─ Use Cloud Events JSONPath
        {
          "eventType": "com.oraclecloud.computeapi.*",
          "data": {
            "freeformTags": {
              "Environment": "Prod"
            },
            "definedTags": {
              "Operations.CostCenter": "Engineering"
            }
          }
        }
```

## Common Event Types by Service

```
Compute (com.oraclecloud.computeapi.*):
├─ launchinstance              # Instance created
├─ terminateinstance           # Instance deleted
├─ instanceaction              # Reboot, stop, start
├─ changeinstanceshape         # Shape changed (resize)
└─ attachvnic                  # Network interface attached

Database (com.oraclecloud.databaseservice.*):
├─ createautonomousdatabase    # ADB created
├─ stopautonomousdatabase      # ADB stopped
├─ startautonomousdatabase     # ADB started
├─ deleteautonomousdatabase    # ADB deleted
└─ updateautonomousdatabase    # ADB scaled/modified

Object Storage (com.oraclecloud.objectstorage.*):
├─ createobject                # File uploaded
├─ deleteobject                # File deleted
├─ updateobject                # File modified
└─ createbucket                # Bucket created

IAM (com.oraclecloud.identityControlPlane.*):
├─ CreateUser                  # User added
├─ UpdateUser                  # User modified
├─ CreatePolicy                # Policy created
├─ UpdatePolicy                # Policy changed
└─ DeleteUser                  # User removed

VCN (com.oraclecloud.virtualnetwork.*):
├─ CreateVcn                   # VCN created
├─ DeleteVcn                   # VCN deleted
├─ CreateSubnet                # Subnet created
├─ CreateSecurityList          # Security list created
└─ CreateNetworkSecurityGroup  # NSG created

Complete list: 100+ event types across all OCI services
Use: oci events event-type list --all
```

## Action Types and Use Cases

| Action Type | Target | Use Case | Cost | Max Actions |
|-------------|--------|----------|------|-------------|
| **ONS** | Notification Topic | Email, PagerDuty, webhook | $0.60/million | 5 |
| **FAAS** | Function | Data processing, API calls | $0.0000002/GB-sec | 5 |
| **OSS** | Streaming | High-volume event buffer | $0.025/stream-hour | 5 |

**Choosing Action Type:**
- **1-10 events/minute** → ONS (notifications)
- **10-1000 events/minute** → FAAS (processing)
- **>1000 events/minute** → OSS (streaming buffer)
