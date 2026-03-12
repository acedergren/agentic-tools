---
name: oracle-idcs-org-provisioning
description: "Use when mapping IDCS claims to org membership after OAuth login succeeds. Covers mapProfileToUser, session.create.before, session.create.after hooks, MERGE INTO upserts, tenant-org mapping, and first-admin bootstrap. Keywords: IDCS groups, org_members, provisioning, session hooks, tenant map, MERGE INTO."
---

# Oracle IDCS Org Provisioning

Use when login succeeds but tenant, role, or org membership still has to become real in Oracle.

## Do NOT load when

- problem is Fastify header bridging or cookie/session forwarding
- problem is base OIDC setup, callback URLs, or trusted origins
- task is renaming IDCS concepts across an existing codebase

## Three-stage flow

1. Capture IDCS claims during OAuth profile mapping (`mapProfileToUser`)
2. Gate session in `session.create.before` when explicit allow-rules exist
3. Resolve org and upsert `org_members` in `session.create.after`

## NEVER

- Never combine access gating with role mapping — they are separate decisions with separate failure modes
- Never `SELECT` then `INSERT` into `org_members` — use atomic `MERGE INTO` or concurrent logins corrupt membership
- Never consume cached claims in `before` and expect them still available in `after` — use stash/peek/consume pattern
- Never bypass existing membership precedence with a newer fallback — re-login instability follows
- Never assume missing `groups` claim is a provisioning bug — check scope config and IDCS app first

## Expert decision trees

### Access gate vs. role mapping

These answer different questions:
- **Access gate** (`before` hook): can this user enter at all? Controlled by DB-configured allow-groups. Fail closed only when explicit allow-groups exist; fail open otherwise.
- **Role mapping** (`after` hook): which role do they get? Controlled by group→role mapping and env defaults.

Mixing them produces false lockouts: a user passes the access gate but gets the wrong role because the gating logic short-circuited role resolution.

### Org resolution precedence

Always use this order — never skip a level for "simplicity":
1. Existing membership in `org_members`
2. Tenant-name → org map (DB-configured)
3. DB-configured default org
4. Env default org

Changing this order mid-deployment breaks re-login for users who were previously assigned via a higher-precedence rule.

### First-admin bootstrap

Fresh installs have zero admin-group config. If an org has no admin yet, promote the first provisioned user to `admin` once. Without this gate, the system is unbootstrappable — no one can configure allow-groups because no one has admin rights.

### Claims cache across hook boundary

Hooks run in separate request lifecycles. The claim set from `mapProfileToUser` is not available in `session.create.after` without explicit passing:
- `stash(sub, claims)` in profile mapping
- `peek(sub)` in `before` (read without clearing)
- `consume(sub)` in `after` (read and clear)

Using a short-lived in-memory cache keyed by `sub` is the standard pattern. TTL of ~30s is sufficient.

## Failure modes by decision point

| Situation | Decision |
|---|---|
| No `groups` claim | Check scope and IDCS app config before touching provisioning code |
| No explicit DB allow-groups | Fail open — no lockout |
| DB lookup or write fails | Fail open for login, log it — lockout must never be the default outcome |
| Org has no admin yet | Promote first provisioned user once |

## Scripts

```bash
# Preview group → role mapping
node scripts/preview-group-role-mapping.js "PortalAdmins,Developers"

# Preview org resolution
node scripts/verify-org-resolution.js --tenant sandbox --map "sandbox:org-123,prod:org-999" --default-org org-000
```

## Arguments

- `$ARGUMENTS`: Optional provisioning focus
  - `tenant-map` — focus on tenant→org resolution
  - `first-admin` — focus on bootstrap logic
  - (empty) — evaluate the full IDCS claim → org membership flow
