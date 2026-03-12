---
name: iam-identity-management
description: "Use when writing IAM policies, troubleshooting 403/404 permission errors, setting up dynamic groups, or debugging IDCS federation. Covers OCI-specific policy syntax gotchas, principal type confusion, compartment hierarchy rules, verb hierarchy, and common authorization failures. KEYWORDS: IAM, policy, permission denied, dynamic group, compartment, IDCS, federation, 403, 404."
---

# OCI IAM and Identity Management - Expert Knowledge

## NEVER Do This

**NEVER use overly broad policies in production**
```
# WRONG - grants admin to everyone, instant security audit failure
Allow any-user to manage all-resources in tenancy

# RIGHT - explicit group, specific resource, specific compartment
Allow group AppDevelopers to manage instance-family in compartment AppDev
  where target.instance.name =~ 'dev-*'
```

**NEVER place policy in a child compartment when the target resource is in a parent**
```
# WRONG - policy in A/B/C cannot grant access to resources in A
Policy location: Compartment A/B/C
"Allow group X to read buckets in compartment A"  # Fails silently

# RIGHT - policy must be AT OR ABOVE the target compartment
Policy location: Compartment A (or root tenancy)
"Allow group X to read buckets in compartment A"
```
This is the single most common policy misconfiguration in OCI — no error is thrown, access just fails.

**NEVER use `any-user` in production policies**
- Grants access to ALL future users, including compromised accounts
- Always fails SOC2/HIPAA/CIS audits
- Use explicit group membership: `Allow group DataReaders to read buckets in compartment SharedData`

**NEVER grant access to instances using user principal syntax**
```
# WRONG - instances are NOT users
Allow user <instance-ocid> to read buckets in compartment X

# RIGHT - use dynamic groups for instances
Allow dynamic-group app-instances to read buckets in compartment X
```

**NEVER hardcode resource OCIDs in dynamic group rules**
```
# WRONG - breaks when instance is replaced
ALL {instance.id = 'ocid1.instance.oc1.phx.xxxxx'}

# RIGHT - use compartment or tag matching (survives instance replacement)
ALL {instance.compartment.id = '<compartment-ocid>'}
ANY {instance.freeform-tags.environment = 'production'}
```

## IAM Permission Troubleshooting

### "404 NotAuthorizedOrNotFound"

This error is intentionally ambiguous — OCI returns 404 whether the resource doesn't exist OR the caller lacks `inspect` permission. This prevents enumeration attacks.

```
404 NotAuthorizedOrNotFound?
│
├─ Does the resource definitely exist?
│  ├─ YES → Permission issue
│  │  └─ Does caller have at least 'inspect' on that resource type?
│  │  └─ Is policy at or above the target compartment?
│  └─ NO → Verify OCID, compartment, region
│
├─ Using dynamic group / instance principal?
│  └─ oci compute instance get --instance-id <ocid>  (check compartment + tags)
│  └─ Does instance's compartment/tags match the dynamic group rule?
│
└─ Cross-compartment access?
   └─ Policy must be in the compartment containing BOTH source and target
      OR in root (tenancy)
```

### "403 NotAuthorized"

Caller is identified but explicitly lacks permission.

**Common causes:**
1. **Wrong verb**: Policy grants `read` but action requires `use` or `manage`
2. **Wrong resource-type**: Granted `instance-family` but accessing `volume-family`
3. **Condition doesn't match**: `where target.instance.name = 'prod-*'` but instance is `dev-web-1`
4. **Propagation lag**: Policies take 10–60 seconds to take effect after creation/update

**Verb hierarchy** (each includes those below it):
```
inspect < read < use < manage
```

## Policy Syntax Gotchas

### Resource Type Families (Often Confused)

| Family | Includes | Common Mistake |
|--------|----------|----------------|
| `instance-family` | instances, console-connections, vnics, vnic-attachments | Does NOT include volumes |
| `volume-family` | volumes, volume-backups, volume-attachments | Separate from instance-family |
| `object-family` | buckets, objects | Objects are a separate resource type from buckets |
| `database-family` | db-systems, databases, autonomous-databases | Very broad — scope carefully |

### Conditions (WHERE clause)

```
# Tag-based
where target.resource.tag.environment = 'production'
where target.resource.freeform-tags.CostCenter = 'Engineering'

# Resource name (regex)
where target.instance.name =~ 'web-*'

# Request properties
where request.operation = 'LaunchInstance'

# Combined conditions
where all {target.resource.tag.env = 'prod', target.compartment.name = 'AppProd'}
where any {target.instance.shape = 'VM.Standard.E4.Flex', target.instance.shape = 'VM.Standard.A1.Flex'}
```

### Location Syntax

```
in compartment <name-or-ocid>          # Specific compartment only
in tenancy                             # Root — applies everywhere
in resource <resource-ocid>            # Rare; used for delegation
```

Note: there is no built-in syntax for "compartment + all descendants" — to cover a subtree, put the policy in the parent compartment.

## Dynamic Group Patterns

**By compartment** (most common — covers all current and future instances):
```
ALL {instance.compartment.id = '<compartment-ocid>'}
```

**By tag** (flexible — survives instance replacement):
```
ANY {instance.freeform-tags.app = 'webserver'}
```

**Restrictive AND rule** (production workloads):
```
ALL {instance.compartment.id = '<comp-ocid>', instance.freeform-tags.environment = 'production'}
```

### Testing Dynamic Group Membership

```bash
# 1. Get instance details (compartment + tags)
oci compute instance get --instance-id <instance-ocid>

# 2. Check dynamic group rule
oci iam dynamic-group get --dynamic-group-id <group-ocid>

# 3. Verify rule matches — if rule is "instance.compartment.id = X",
#    confirm the instance's compartment_id field equals X

# 4. Test from the instance (SSH in and run):
oci os ns get  # Works only if instance principal is correctly configured
```

## Authentication Methods

| Method | Use Case | Key Constraint |
|--------|----------|----------------|
| **API Key** | Local dev, CI/CD outside OCI | Manual rotation required |
| **Instance Principal** | Apps on OCI compute | Only works on OCI compute |
| **Resource Principal** | OCI Functions, Data Flow | Limited to specific services |
| **Session Token** | Console federation via IDCS | Short-lived (~1 hour) |

## IDCS Federation Gotchas

- OCI group names must **exactly match** IDCS group names (case-sensitive)
- User can log in to console but can't see resources → Missing OCI IAM policy for the federated group
- "Invalid credentials" → IDCS federation not configured in OCI tenancy settings
- Group membership doesn't sync → OCI group name doesn't match IDCS group name

## Compartment Hierarchy Design

```
# WRONG: Flat structure — no IAM boundary between dev/prod
Tenancy
├─ Application1  (mix of dev/test/prod resources)
└─ SharedServices

# RIGHT: Environment-based hierarchy — clear blast radius, cost reporting
Tenancy
├─ Production
│  ├─ App1
│  └─ App2
├─ Development
│  ├─ App1
│  └─ App2
└─ SharedServices
   ├─ Networking
   └─ Security
```

## Progressive Loading Reference

Load [`references/oci-iam-policies-reference.md`](references/oci-iam-policies-reference.md) when:
- Writing complex policies with multiple conditions
- Need service-specific verbs and permission lists
- Troubleshooting policy evaluation order
- Implementing least-privilege access for a specific service

Do NOT load for quick syntax examples, troubleshooting 403/404, or dynamic group rules — this file covers those.
