---
name: fastify-better-auth-bridge
description: |
  Bridge Better Auth into Fastify 5 with auth.api.getSession, onRequest session lookup, decorateRequest auth state, cookie forwarding, and Web Request bridging.

  Triggers when user mentions:
  - "bridge Better Auth into Fastify"
  - "read Better Auth session in Fastify"
  - "decorateRequest auth.api.getSession onRequest"
---

# Fastify Better Auth Bridge

Use this skill when Better Auth exists already but Fastify still needs the framework bridge.

## Load this skill when

- auth state must be resolved inside Fastify 5
- `auth.api.getSession()` is the right source of truth
- `onRequest` session lookup, cookie forwarding, or `decorateRequest()` behavior is in scope
- IDCS users have session state but downstream Fastify code still lacks org context

## Do NOT load this skill when

- the root problem is callback URL, trusted origins, or provider bootstrap order
- the root problem is IDCS group mapping or `org_members` provisioning rules
- the task is to invent a new session system beside Better Auth

## Required bridge shape

### 1. Convert Fastify request headers into a Web `Request`

Better Auth session lookup needs cookie-bearing headers. Build a `Request` from:

- protocol + hostname + URL
- original method
- full incoming headers

### 2. Decorate request state once

Standardize:

- `request.user`
- `request.session`
- `request.permissions`
- `request.apiKeyContext`

For Fastify 5 array state, use a Symbol-backed getter/setter instead of shared mutable defaults.

### 3. Normalize path exclusions

Skip only routes that should truly bypass session work, such as:

- health
- metrics
- Better Auth handler routes

Normalize query strings and trailing slashes before matching.

### 4. Resolve session first, authorize later

The bridge should resolve identity context. Route guards should decide access.

If session lookup throws:

- log it
- continue as anonymous

### 5. Patch missing org context from `org_members`

IDCS-provisioned users may never have called Better Auth's explicit organization-switch flow. If `activeOrganizationId` is missing, resolve membership from `org_members` and patch downstream session state.

## NEVER

- Never build a parallel session layer if header forwarding solves it.
- Never enforce RBAC policy inside the bridge `onRequest` hook.
- Never share mutable array decorator defaults in Fastify 5.
- Never skip cookie header forwarding and then debug the wrong layer.

## Scripts

```bash
node scripts/check-fastify-auth-bridge.js /path/to/auth-plugin.ts
```

With no argument, the script scans `apps/api/src/plugins/auth.ts` in the current repo.

## Nonstandard layouts

If auth lives outside the default path, point the checker at the real plugin file. Keep the same bridge shape even if the file layout differs.

## Common gotchas

- `reply.send(undefined)` throws in Fastify 5.
- Missing cookie forwarding makes login and session resolution look unrelated.
- Broken URL normalization creates auth misses that only happen on some routes.
- Bridge logic and authorization logic drift if they are mixed together.

## First-time setup

1. Add the Web `Request` bridge helper.
2. Decorate auth request state once.
3. Resolve sessions in `onRequest`.
4. Patch missing org membership only when org context is absent.
5. Keep authorization in explicit route guards.
6. Run `node scripts/check-fastify-auth-bridge.js`.

## Arguments

- `$ARGUMENTS`: Optional path to the Fastify auth plugin file to inspect or align
  - Example: `/fastify-better-auth-bridge apps/api/src/plugins/auth.ts`
  - If empty: use the repo-default auth plugin path and evaluate the bridge shape there
