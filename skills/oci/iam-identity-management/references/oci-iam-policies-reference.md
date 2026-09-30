# OCI IAM Policy Reference: Conditions, Variables, Pitfalls

Last verified: 2026-09-30 against docs.oracle.com (Subjects, Conditions, General Variables,
Policy Inheritance, Managing Dynamic Groups, Using Tags to Manage Access). This file covers the
general rules only. Per-service verbs, permissions and extra variables live on each service's
policy reference page. It is not a complete list.

## Statement shape

```
Allow <subject> to <verb> <resource-type> in <location> [where <conditions>]
```

- Subject: `group 'Domain'/'Group'`, `group id <ocid>`, `dynamic-group 'Domain'/'Dg'`, `any-group`,
  `any-user`, `service <name>`. The domain prefix can be omitted only for the Default domain.
- Verbs: `inspect < read < use < manage` (each includes the previous).
- Location: `tenancy`, `compartment <name>`, `compartment id <ocid>`, `compartment A:B` (path from the attachment point).
- Policies only allow. There is no deny statement.

## Condition syntax

| Rule | Example |
|------|---------|
| Operators: `=` and `!=` only | `where request.operation != 'DeleteBucket'` |
| Pattern: slashes | `/logs-*/`, `/*-prod/`, `/*web*/` |
| Case-insensitive matching | `target.bucket.name = 'BucketA'` also matches `bucketA` |
| Combine with `all {}` / `any {}` | `where all {cond1, cond2}` |
| **Invalid** | `=~`, `like`, regex, a quoted `'logs-*'` wildcard (literal), freeform tags |

## General variables (all requests)

| Variable | Type | Notes |
|----------|------|-------|
| `request.user.id` / `request.user.name` | OCID / string | Requesting user |
| `request.groups.id` | list of OCIDs | Groups of the requesting user |
| `request.permission` | string | Underlying permission, e.g. `BUCKET_DELETE` |
| `request.operation` | string | API operation, e.g. `ListUsers` |
| `request.networkSource.name` | string | Network source group name (restrict by source IP) |
| `request.utc-timestamp` (+ `.month-of-year`, `.day-of-month`, `.day-of-week`, `.time-of-day`) | string | Time-bounded access |
| `request.region` | string | 3-letter key: `ARN` Stockholm, `FRA` Frankfurt, `AMS` Amsterdam, `LHR` London, `IAD` Ashburn, `PHX` Phoenix … (quota policies use region names instead) |
| `request.ad` | string | Availability domain name |
| `request.principal.type` | string | e.g. `user`, `instance`, `serviceconnector`, `resource` |
| `request.principal.compartment.tag` | tag | Tags on the requesting resource's compartment |
| `request.principal.group.tag` | tag | Tags on the requesting user's groups |
| `target.compartment.id` / `target.compartment.name` | OCID / string | Compartment of the target resource; **cannot filter List operations** |
| `target.resource.tag.<ns>.<key>` | tag | Defined tag on the target resource |
| `target.resource.compartment.tag.<ns>.<key>` | tag | Defined tag on the target's compartment |

Services add their own variables (e.g. `target.bucket.name` for Object Storage, `target.secret.name`
for Vault secrets). Check the service's policy reference before using one.

## Pitfalls

1. **A variable that isn't present on a request makes the condition false.** `use groups where
   target.group.name != 'Administrators'` grants nothing for `ListGroups`. Add a separate unconditioned
   `inspect groups` statement.
2. **Tag conditions and List/Create.** With `manage <type> where target.resource.tag...`, List calls
   (no single target) and Create calls (resource not yet tagged) don't match. Grant `inspect` separately.
3. **Defined tags only.** Freeform tags cannot be used in policy conditions or dynamic-group rules.
4. **Attachment scope.** A policy can only reference its own compartment and descendants; referencing
   a compartment outside that scope is rejected when the policy is created. Grants inherit downward.
5. **`404 NotAuthorizedOrNotFound` is deliberately ambiguous.** Treat it as "missing inspect permission
   or wrong OCID/region" until proven otherwise.
6. **Identity-domain prefix.** Non-default domain groups need `'Domain'/'Group'`; without it the
   statement refers to a Default-domain group of the same name (or nothing).

## Dynamic group matching rules

```
instance.compartment.id = '<compartment-ocid>'
instance.id = '<instance-ocid>'
tag.<namespace>.<key>.value                    # tag key present
tag.<namespace>.<key>.value = '<value>'        # tag key with value
resource.type = '<resource-type>'              # non-instance resources
resource.compartment.id = '<compartment-ocid>'
All {instance.compartment.id = '<ocid>', tag.Operations.Environment.value = 'prod'}
```

## Verified examples

```
# Default-domain group, compartment path from tenancy
Allow group 'Default'/'NetworkAdmins' to manage virtual-network-family in compartment Shared:Network

# Secondary domain group
Allow group 'Partners'/'Auditors' to inspect all-resources in tenancy

# Only buckets whose name starts with logs-
Allow group 'Default'/'LogWriters' to manage objects in compartment Logs where target.bucket.name = /logs-*/

# Autonomous DB (not database-family)
Allow group 'Default'/'DBUsers' to use autonomous-database-family in compartment AppProd

# Tag-scoped admin + the inspect statement it needs
Allow group 'Default'/'ProjectA' to manage instance-family in compartment Apps where target.resource.tag.Operations.Project = 'A'
Allow group 'Default'/'ProjectA' to inspect instance-family in compartment Apps
```

## Official sources

- Subjects: https://docs.oracle.com/en-us/iaas/Content/Identity/policysyntax/subject.htm
- Conditions: https://docs.oracle.com/en-us/iaas/Content/Identity/policysyntax/conditions.htm
- General variables: https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference_topic-General_Variables_for_All_Requests.htm
- Policy inheritance: https://docs.oracle.com/en-us/iaas/Content/Identity/policieshow/Policy_Inheritance.htm
- Using tags to manage access: https://docs.oracle.com/en-us/iaas/Content/Tagging/Tasks/managingaccesswithtags.htm
- Managing dynamic groups: https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingdynamicgroups.htm
- Core services policy reference: https://docs.oracle.com/en-us/iaas/Content/Identity/Reference/corepolicyreference.htm
- Common policies: https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm
