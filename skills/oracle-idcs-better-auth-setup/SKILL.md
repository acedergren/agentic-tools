---
name: oracle-idcs-better-auth-setup
description: |
  Route Oracle Database, OCI IDCS, OIDC callback, trusted-origin, and Better Auth setup work across Fastify and Next.js without duplicating bridge or provisioning logic.

  Triggers when user mentions:
  - "wire IDCS into Better Auth"
  - "configure Fastify + Next.js shared auth model"
  - "bootstrap OCI IAM provider config and callback URL"
---

# Oracle IDCS + Better Auth Setup

Use this as the entry skill when the task spans the whole auth foundation: Oracle adapter, OIDC config, trusted origins, callback URLs, provider bootstrap, and cross-app consistency.

Do **not** use this skill as the deep implementation guide for every auth bug. It is the router.

## Load this skill when

- the user is setting up Better Auth against Oracle for the first time
- Fastify and Next.js must share one auth model
- the user needs to validate callback URLs, trusted origins, or provider bootstrap order
- the user is unsure whether the bug is setup, bridge, or provisioning

## Do NOT load this skill when

- the problem is specifically Fastify request/session bridging → load `fastify-better-auth-bridge`
- the problem is specifically IDCS groups, org mapping, or `org_members` writes → load `oracle-idcs-org-provisioning`
- the issue is purely UI login behavior after auth state already exists

## Decision tree

### If the problem is foundation setup

Stay in this skill and verify, in order:

1. Oracle adapter and Better Auth tables exist.
2. IDCS confidential application uses the right callback URL.
3. Scopes include `openid,email,profile,urn:opc:idm:__myscopes__`.
4. Trusted origins and cookie attributes match the deployed app topology.
5. Env config can cold-start auth before DB-managed provider settings are edited.
6. Env-to-DB bootstrap is idempotent and never overwrites existing provider rows.

### If the problem is runtime request handling

Switch to `fastify-better-auth-bridge`.

### If the problem is post-login membership or role state

Switch to `oracle-idcs-org-provisioning`.

## Non-obvious setup rules

- Seed auth from env first, then reflect it into Oracle provider tables for operator visibility.
- Share building blocks across apps: Oracle adapter, cookie rules, IDCS profile mapper, and session hook behavior.
- Keep naming stable when the codebase already uses IDCS and `OCI_IAM_*` env vars.

## Scripts

### Validate setup env vars

```bash
node scripts/validate-idcs-env.js
```

### Print the setup checklist

```bash
node scripts/print-auth-checklist.js
```

## Common gotchas

- Missing `urn:opc:idm:__myscopes__` usually means no `groups` claim later.
- Wrong callback URL often looks like OAuth success followed by local session failure.
- Provider bootstrap should create missing rows, not replace operator-managed ones.
- Do not mix full-stack setup guidance with Fastify bridge internals or org provisioning internals.

## First-time setup

1. Copy `.env.example` to `.env`.
2. Fill in Better Auth and IDCS values.
3. Run `node scripts/validate-idcs-env.js`.
4. Confirm callback URL and trusted origins.
5. Confirm provider bootstrap is idempotent.
6. Hand off to the bridge or provisioning skill only if the problem is now isolated there.

## Arguments

- `$ARGUMENTS`: Optional setup focus
  - Example: `/oracle-idcs-better-auth-setup callback-url`
  - Example: `/oracle-idcs-better-auth-setup trusted-origins`
  - If empty: audit the full shared auth setup flow
