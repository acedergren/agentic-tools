---
name: iam-identity-management
description: "Use when the user asks to \"write OCI IAM policy\", \"debug OCI 403\", \"Terraform apply gets 403\", \"configure dynamic groups\", or \"use identity domains\"."
version: 2.0.0
keywords:
  - "OCI IAM"
  - "OCI IAM Identity Domains"
  - "identity domain"
  - "IDCS"
  - "policy"
  - "dynamic group"
  - "compartment"
  - "tenancy"
  - "federation"
  - "OIDC"
  - "Terraform apply 403"
  - "Resource Manager"
  - "orm-family"
  - "ZPR"
  - "OCI Bastion"
  - "security attribute"
aliases:
  - "oci-iam"
  - "identity-domains"
domains:
  - "oci"
  - "identity"
---
# OCI IAM and Identity Management - Expert Knowledge

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.

## When to Use

Load this skill for: the user asks to "write OCI IAM policy", "debug OCI 403", "Terraform apply gets 403", "configure dynamic groups", "use identity domains", or "fix IDCS federation".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `oci/best-practices` as the router.

## NEVER Do This

**NEVER use overly broad policies in production**
```
# WRONG - grants admin to everyone, instant security audit failure
Allow any-user to manage all-resources in tenancy

# RIGHT - explicit group, specific resource, specific compartment
Allow group 'Default'/'AppDevelopers' to manage instance-family in compartment AppDev
```
Policy conditions support only `=` and `!=` (plus `any {}` / `all {}`). There is no `=~`; that is
MQL. Patterns use slashes: `/dev-*/`, `/*-prod/`, `/*web*/`, and matching is case-insensitive.
A quoted `'dev-*'` is a literal string, not a wildcard.

**NEVER attach a policy below the compartment it grants on**
```
# WRONG - policy attached to A:B:C cannot reference A (outside its scope)
Policy location: Compartment A:B:C
"Allow group X to read buckets in compartment A"   # rejected when you create the policy

# RIGHT - attach at or above the target compartment
Policy location: Compartment A (or the tenancy)
"Allow group X to read buckets in compartment A"

# Attached higher up? Use the compartment path relative to the attachment point:
Policy location: tenancy
"Allow group X to read buckets in compartment A:B"
```
Policies inherit downward: a grant on A also applies to A:B and A:B:C. The attachment
location also decides who can edit the policy — attach it where the right admins own it.

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

# RIGHT - use compartment or defined-tag matching (survives instance replacement)
ALL {instance.compartment.id = '<compartment-ocid>'}
ANY {tag.Operations.Environment.value = 'production'}
```
Dynamic group rules match **defined** tags as `tag.<namespace>.<key>.value`. There is no
`instance.freeform-tags.*` variable.

**NEVER forget that a condition variable that doesn't apply to a request denies it**
```
# This grants nothing for ListUsers/ListGroups: target.group.name is not
# present on those requests, so the condition evaluates false.
Allow group GroupAdmins to use groups in tenancy where target.group.name != 'Administrators'

# Add the list permission in a separate, unconditioned statement:
Allow group GroupAdmins to inspect groups in tenancy
```
`target.compartment.name`/`.id` cannot be used to filter List operations either.

## IAM Permission Troubleshooting

### "404 NotAuthorizedOrNotFound"

This error is intentionally ambiguous — OCI returns 404 whether the resource doesn't exist OR the caller lacks `inspect` permission. This prevents enumeration attacks.

```
404 NotAuthorizedOrNotFound?
│
├─ Does the resource definitely exist?
│  ├─ YES → Permission issue
│  │  └─ Does caller have at least 'inspect' on that resource type?
│  │  │  └─ Is policy at or above the target compartment?
│  │  └─ Does a condition reference a variable the operation doesn't carry?
│  └─ NO → Verify OCID, compartment, region
│
├─ Using dynamic group / instance principal?
│  └─ oci compute instance get --instance-id <ocid>  (check compartment + tags)
│  └─ Does instance's compartment/tags match the dynamic group rule?
│
└─ Cross-compartment access?
   └─ Groups live in an identity domain, not a compartment: the policy must be
      attached at or above the *target* compartment (or in the tenancy)
```

### "403 NotAuthorized"

Caller is identified but explicitly lacks permission.

**Common causes:**
1. **Wrong verb**: Policy grants `read` but action requires `use` or `manage`
2. **Wrong resource-type**: Granted `instance-family` but accessing `volume-family`
3. **Condition doesn't match**: a quoted `'prod-*'` is literal; use `/prod-*/`
4. **Identity domain prefix missing**: a group in a non-default domain must be written `'DomainName'/'GroupName'`
5. **Propagation**: new or edited policies can take a short time to take effect; re-test before rewriting

**Verb hierarchy** (each includes those below it):
```
inspect < read < use < manage
```

### Terraform and Resource Manager 403s

Before changing HCL, identify the principal and scope:

| Symptom | Check first |
| --- | --- |
| Terraform local apply gets 403 | API key user, session-token profile, identity-domain group mapping, and target resource policy |
| Terraform on Compute gets 403 | Instance dynamic group membership and policy on target resource family |
| Resource Manager stack/job gets 403 | `orm-*` permissions plus target service permissions in the target compartment |
| Resource Manager dynamic group cannot create VCN | Whether the principal is actually a Resource Manager/user context, and whether `manage virtual-network-family` is granted where the VCN is created |
| Identity-domain group can log in but cannot apply | Group mapping, exact group name, policy subject, compartment policy location |
| ZPR policy or security attributes cannot be managed | ZPR IAM permissions plus policy location and compartment scope |
| Bastion session creation is denied | Bastion/session permissions plus target resource/network permissions |

## Policy Syntax Gotchas

### Resource Type Families (Often Confused)

| Family | Includes | Common Mistake |
|--------|----------|----------------|
| `instance-family` | instances, instance-images, instance-console-connection, console-histories, app-catalog-listing, volume-attachments (attach only) | Does NOT include VNICs/subnets (`virtual-network-family`) or volumes |
| `volume-family` | volumes, volume-attachments, volume-backups, … | Separate from instance-family |
| `object-family` | objectstorage-namespaces, buckets, objects | Objects are a separate resource type from buckets |
| `database-family` | Base Database / Exadata DB systems, homes, databases, backups | Does NOT cover Autonomous DB — use `autonomous-database-family` (autonomous-databases, autonomous-backups) |

`LaunchInstance` also needs `use vnics`, `use subnets` and `use network-security-groups` in the network compartment.

### Conditions (WHERE clause)

```
# Defined-tag based (freeform tags are NOT usable in policy conditions)
where target.resource.tag.Operations.Environment = 'production'
where request.principal.group.tag.Operations.Project = 'alpha'

# Pattern match: slashes, not quotes, not =~
where target.bucket.name = /logs-*/

# Request properties
where request.operation = 'LaunchInstance'
where request.region = 'ARN'          # 3-letter region key (ARN = Stockholm)

# Combined conditions
where all {target.resource.tag.Operations.Environment = 'prod', request.permission != 'BUCKET_DELETE'}
where any {request.user.name = 'alice', request.user.name = 'bob'}
```
Tag-conditioned `manage` does not cover List or Create (the resource has no tag yet): add
a separate `inspect` statement and create in an untagged scope, or tag via tag defaults.

### Location Syntax

```
in compartment <name>                  # Compartment (and, by inheritance, its subcompartments)
in compartment id <compartment-ocid>   # Same, by OCID
in compartment A:B                     # Path, when the policy is attached above A
in tenancy                             # Whole tenancy
```

## Dynamic Group Patterns

**By compartment** (most common — covers all current and future instances):
```
ALL {instance.compartment.id = '<compartment-ocid>'}
```

**By defined tag** (flexible — survives instance replacement):
```
ANY {tag.Operations.App.value = 'webserver'}
```

**Restrictive AND rule** (production workloads):
```
ALL {instance.compartment.id = '<comp-ocid>', tag.Operations.Environment.value = 'production'}
```
Non-instance resources (functions, etc.) match with `resource.type`, `resource.id`, `resource.compartment.id`.

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
| **Session Token** | `oci session authenticate` (browser/federated login) | Short-lived; refresh with `oci session refresh` |

## Identity Domain Gotchas

- Groups live in identity domains. For the Default domain you may write `group Admins`; for any other
  domain you must write `group 'DomainName'/'GroupName'` (and `dynamic-group 'DomainName'/'DgName'`).
  Oracle recommends prefixing `'Default'/` anyway for readability.
- User can log in but sees nothing → the domain group has no policy, or the policy omits the domain prefix.
- External IdP (SAML/OIDC) users get OCI access through **domain group membership** (JIT provisioning or
  SCIM sync); check the user's group membership inside the domain before touching policies.
- Legacy tenancies not yet migrated to identity domains used IDCS federation with explicit IDCS→OCI
  group mappings; that model does not apply to identity-domain tenancies.

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

Load [`references/oci-iam-policies-reference.md`](references/oci-iam-policies-reference.md) for the
general condition-variable table, pattern syntax, and known pitfalls. It links, rather than copies, the
per-service verb/permission tables — open the service's policy reference page for those.

Last verified: 2026-09-30 (docs.oracle.com: Policy Syntax/Subjects, Conditions, General Variables, Policy Inheritance, Managing Dynamic Groups, Core Services and ADB policy references)

Load [`../infrastructure-as-code/references/oci-terraform-auth-matrix.md`](../infrastructure-as-code/references/oci-terraform-auth-matrix.md) when Terraform, OCI DevOps, Resource Manager, Compute instance principals, resource principals, OKE workload identity, Cloud Shell, or CI/CD federation affect the caller.

Load [`../zpr-security/references/zpr-reference.md`](../zpr-security/references/zpr-reference.md) when the IAM task is specifically about who may configure ZPR, security attributes, or ZPR policies.

Load [`../managed-bastion-access/references/managed-bastion-reference.md`](../managed-bastion-access/references/managed-bastion-reference.md) when the IAM task is specifically about who may create bastions, create sessions, update allowlists, or connect through OCI Bastion.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
