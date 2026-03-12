---
name: fastify-better-auth-bridge
description: "Use when integrating Better Auth session resolution into a Fastify 5 application via onRequest hooks, decorateRequest, and Web Request bridging. Covers cookie forwarding, org context patching for IDCS-provisioned users, and Symbol-backed decorator state. Keywords: Better Auth, Fastify 5, decorateRequest, onRequest, auth.api.getSession, session bridge, cookie forwarding, IDCS, org context."
---

# Fastify Better Auth Bridge

Wire Better Auth session resolution into Fastify 5 via the `onRequest` hook. Use this when Better Auth already exists but Fastify lacks the framework bridge.

## Do NOT load this skill when

- The problem is callback URL configuration, trusted origins, or provider bootstrap order
- The problem is IDCS group mapping or `org_members` provisioning rules
- The goal is to build a parallel session system alongside Better Auth

## NEVER

- Never build a parallel session layer when cookie header forwarding is all that's needed — the symptom (no session) and the fix (forward cookies) are separated by two layers, making it easy to misdiagnose.
- Never enforce RBAC policy inside the bridge `onRequest` hook — the bridge resolves identity, route guards enforce access. Mixing them makes both untestable.
- Never share mutable array decorator defaults in Fastify 5 — arrays on the prototype are shared across all requests; use a Symbol-backed getter/setter per-request.
- Never skip the Web `Request` bridge — `auth.api.getSession()` requires a native Web API `Request`, not a Fastify request object. Passing the wrong type silently returns no session.
- Never assume `reply.send(undefined)` is safe in Fastify 5 — it throws.

## The Non-Obvious Parts

### Why cookie forwarding breaks silently

Missing cookie headers make login and session resolution fail in completely different places — the login succeeds (sets cookie in browser) but the next request has no session. There's no error; the session is simply `null`. The bridge and the login flow look unrelated. Always verify cookies are included in the Web `Request` you build.

### Why Fastify 5 decorator arrays share state

`fastify.decorateRequest('permissions', [])` — the `[]` is a prototype default shared across all requests. First request mutates it; second request sees the previous request's permissions. Use a Symbol-keyed getter/setter that allocates a fresh array per request.

### Why IDCS users have no active org

IDCS-provisioned users are created via group sync, not Better Auth's organization-switch flow. Their session has no `activeOrganizationId`. Downstream code expecting org context will silently receive `undefined`. Patch by querying `org_members` when `activeOrganizationId` is absent.

## Required Bridge Shape

**Step 1: Web `Request` bridge**
Build from protocol + hostname + URL + method + full incoming headers. The headers must include `cookie` — that's the only way `auth.api.getSession()` can resolve a session.

**Step 2: Decorate request state once**
Standardize: `request.user`, `request.session`, `request.permissions`, `request.apiKeyContext`. Use Symbol-backed getter/setter for any field that holds an array or mutable object.

**Step 3: Path exclusions**
Skip session resolution only for: health, metrics, Better Auth handler routes. Normalize query strings and trailing slashes before matching — inconsistent normalization creates auth misses on some routes only.

**Step 4: Resolve session, then continue as anonymous on error**
If `auth.api.getSession()` throws: log it, continue with `request.user = null`. Never reject the request at bridge level — that's the route guard's job.

**Step 5: Patch org context**
If `request.session.activeOrganizationId` is absent, query `org_members` by user ID and set the org context downstream. Only do this when org context is genuinely absent — not as a default fallback on every request.

## Diagnostic Script

```bash
node scripts/check-fastify-auth-bridge.js /path/to/auth-plugin.ts
# Defaults to apps/api/src/plugins/auth.ts if no argument given
```

## Arguments

`$ARGUMENTS`: Optional path to the Fastify auth plugin file to inspect. Empty = use repo-default path (`apps/api/src/plugins/auth.ts`).
