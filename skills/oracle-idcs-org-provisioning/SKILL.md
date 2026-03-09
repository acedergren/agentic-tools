---
name: oracle-idcs-org-provisioning
description: |
  Provision Oracle org membership from IDCS claims with mapProfileToUser, session.create.before, session.create.after, tenant-org mapping, DB fallback handling, and MERGE INTO upserts.

  Triggers when user mentions:
  - "map IDCS groups to org roles"
  - "provision org_members from IDCS login"
  - "session.create.before session.create.after MERGE INTO"
---

# Oracle IDCS Org Provisioning

Use this skill when login succeeds but tenant, role, or organization membership still has to become real in Oracle.

## Load this skill when

- the issue is in `mapProfileToUser`, `session.create.before`, or `session.create.after`
- the user is mapping IDCS groups to `admin` or `user`
- org resolution depends on existing membership, tenant mapping, or default org fallback
- `org_members` must be written idempotently

## Do NOT load this skill when

- the problem is Fastify header bridging or cookie/session forwarding
- the problem is base OIDC setup, callback URLs, or trusted origins
- the task is to rename IDCS concepts across an existing codebase

## Three-stage flow

1. Capture IDCS claims during OAuth profile mapping.
2. Gate session creation in `before` hooks when explicit allow-rules exist.
3. Resolve org and upsert `org_members` in `after` hooks.

## Decision table

| Situation | Decision |
| --- | --- |
| No `groups` claim | check scopes and IDCS app config before blaming provisioning |
| No explicit DB allow-groups | fail open for access gate |
| Existing membership found | reuse it before tenant/default fallbacks |
| Tenant map match found | use mapped org |
| No tenant match but default org exists | use default org |
| Org has no admin yet | promote first provisioned user once |
| DB lookup or write fails | fail open for login, log it, and avoid lockout while preserving precedence rules |

## Core decisions

### 1. Cache claims across the hook boundary

Use a short-lived cache keyed by `sub`:

- `stash` during profile mapping
- `peek` during `session.create.before`
- `consume` during `session.create.after`

### 2. Separate access gating from role mapping

These are different decisions:

- **Access gate**: can the user enter the portal?
- **Role mapping**: if yes, which role do they get?

DB-configured allow-groups should control access. Env defaults should influence role mapping only.

### 3. Resolve org by precedence

Use this order:

1. existing membership
2. tenant-name map
3. DB-configured default org
4. env default org

### 4. Use `MERGE INTO` for membership writes

Do not do `SELECT` then `INSERT` for `org_members`. Use one atomic `MERGE INTO` so retries and concurrent logins remain safe.

### 5. Bootstrap first admin deliberately

Fresh installs can have zero admin-group config. If the org has no admin yet, promote the first provisioned user to admin once so the system can finish setup.

## NEVER

- Never combine access gating with role mapping.
- Never `SELECT` then `INSERT` into `org_members` for this flow.
- Never consume cached claims in `before` and expect them to exist in `after`.
- Never bypass existing membership precedence with a newer fallback.

## Scripts

### Preview role mapping

```bash
node scripts/preview-group-role-mapping.js "PortalAdmins,Developers"
```

### Preview org resolution

```bash
node scripts/verify-org-resolution.js --tenant sandbox --map "sandbox:org-123,prod:org-999" --default-org org-000
```

## Common gotchas

- No `groups` claim usually means wrong scope or IDCS app setup.
- Consuming the cache too early breaks later provisioning.
- Membership writes can look successful but disappear if commit behavior is misunderstood.
- Re-login behavior becomes unstable if fallback order changes.

## First-time setup

1. Capture `sub`, tenant, and groups in profile mapping.
2. Add `before` hook allow-check logic.
3. Add `after` hook org resolution and membership upsert.
4. Use `MERGE INTO` for `org_members`.
5. Add first-admin bootstrap for fresh orgs.
6. Verify expected outcomes with the helper scripts.

## Arguments

- `$ARGUMENTS`: Optional provisioning focus
  - Example: `/oracle-idcs-org-provisioning tenant-map`
  - Example: `/oracle-idcs-org-provisioning first-admin`
  - If empty: evaluate the full IDCS claim → org membership flow
