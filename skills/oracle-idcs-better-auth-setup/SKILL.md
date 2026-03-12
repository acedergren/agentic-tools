---
name: oracle-idcs-better-auth-setup
description: "Use when setting up Better Auth with Oracle IDCS/OCI IAM, configuring OIDC callback URLs, trusted origins, provider bootstrap order, or sharing an auth model between Fastify and Next.js. Entry point for the full auth foundation — routes to bridge or provisioning skills when narrowed. Keywords: Oracle IDCS, OCI IAM, Better Auth, OIDC, Fastify auth, Next.js auth, callback URL, trusted origins, provider bootstrap."
---

# Oracle IDCS + Better Auth Setup

Entry skill for the full auth foundation: Oracle adapter, OIDC config, trusted origins, callback URLs, provider bootstrap, and cross-app consistency.

This is a router, not a deep implementation guide. Use it to diagnose where the problem lives, then hand off to the right skill.

## NEVER

- Never mix full-stack setup guidance with Fastify bridge internals or org provisioning internals — each skill owns its domain.
- Never bootstrap providers from DB on cold-start — seed from env first, then reflect into Oracle provider tables for operator visibility.
- Never write provider bootstrap that overwrites existing operator-managed rows — idempotent create-if-missing only.
- Never skip `urn:opc:idm:__myscopes__` from IDCS scopes — its absence silently removes the `groups` claim from tokens, breaking all role-based logic downstream.
- Never trust that OAuth success means local session success — wrong callback URL produces OAuth success followed by local session failure, a misleading failure mode.

## Decision Tree: Which Skill Owns This?

```
Is the problem in the auth foundation (setup, config, bootstrap)?
├── Yes → Stay in this skill

Is the problem in runtime request/session handling in Fastify?
├── Yes → Switch to: fastify-better-auth-bridge

Is the problem in post-login membership, groups, or org_members writes?
├── Yes → Switch to: oracle-idcs-org-provisioning

Is the user unsure which layer the bug is in?
├── Yes → Use this skill to verify setup checklist first
```

## Foundation Verification Order

When diagnosing setup issues, verify in this exact order (later items depend on earlier ones):

1. Oracle adapter and Better Auth tables exist in DB
2. IDCS confidential application uses the correct callback URL
3. Scopes include `openid,email,profile,urn:opc:idm:__myscopes__`
4. Trusted origins and cookie attributes match the deployed app topology
5. Env config can cold-start auth before DB-managed provider settings are edited
6. Env-to-DB bootstrap is idempotent and never overwrites existing provider rows

## Non-Obvious Setup Rules

**Env-first bootstrap:** Auth must be functional from env vars alone before provider rows exist in DB. Provider rows are for operator visibility, not for cold-start. If you invert this, auth breaks on first deploy before any DB seed runs.

**Shared building blocks:** Oracle adapter, cookie rules, IDCS profile mapper, and session hook behavior must be shared across Fastify and Next.js apps. Diverging these two causes subtle token/session inconsistencies that are hard to trace.

**Naming stability:** When the codebase already uses IDCS and `OCI_IAM_*` env var naming, keep it. Mixing naming schemes (e.g., introducing `ORACLE_*` vars) breaks scripts and makes the env matrix confusing.

**Callback URL failure mode:** A wrong callback URL looks like OAuth flow succeeds (IDCS redirects back) but local session creation fails immediately after. Check this before debugging anything else if login appears to "complete" but the user isn't authenticated.

## Common Gotchas

| Symptom | Likely Cause |
|---------|-------------|
| No `groups` claim in token | Missing `urn:opc:idm:__myscopes__` scope |
| OAuth succeeds, session fails | Wrong callback URL in IDCS app config |
| Provider rows wiped on deploy | Bootstrap logic not idempotent |
| Auth works locally, fails in prod | Trusted origins missing prod domain |

## Scripts

```bash
# Validate all required env vars are set
node scripts/validate-idcs-env.js

# Print full setup checklist with current state
node scripts/print-auth-checklist.js
```

## Arguments

- `$ARGUMENTS`: Optional setup focus
  - Example: `/oracle-idcs-better-auth-setup callback-url`
  - Example: `/oracle-idcs-better-auth-setup trusted-origins`
  - If empty: audit the full shared auth setup flow
