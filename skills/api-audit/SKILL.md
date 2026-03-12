---
name: api-audit
description: "Use when auditing API routes for schema drift, missing auth, or validation gaps. Scans routes against shared TypeScript types to find mismatches, missing middleware, and undocumented endpoints. Read-only — produces a severity-grouped report. Keywords: audit routes, schema drift, auth gaps, missing validation, type mismatch, orphaned schemas."
---

# API Route & Type Audit Skill

Read-only cross-reference of API routes against shared type definitions. Do NOT modify any files.

## NEVER

- Never flag a missing schema without first confirming the framework doesn't use inline validation (Fastify schema objects, Zod in middleware, etc.).
- Never report an auth gap without verifying the route should actually be protected — not all routes require auth.
- Never treat orphaned types as critical — they may be planned, transitional, or used by SDK consumers not visible in the route tree.
- Never make assumptions about auth from route path alone — `/admin/*` prefix doesn't guarantee a route requires auth without inspecting the hook chain.

## Decision: What counts as a real mismatch?

**Schema drift** — only if the shared type and the route handler both exist but disagree on shape (field names, required vs optional, type divergence). A route using its own inline schema is not drift.

**Auth gap** — only if: (a) a sibling or parent route has auth hooks AND (b) the route handles mutations or user-scoped data. Public GET endpoints with no sibling pattern are ambiguous — report as Info, not Critical.

**Orphaned type** — only if the schema has no imports, no references in any route file, and is not in a `types/` package that may serve external consumers.

## Parallel Execution Strategy

Spawn two agents simultaneously:

- **Agent A**: Scan routes + plugins → catalog `(method, path, auth hooks, request schema, response schema)` per endpoint
- **Agent B**: Scan type/schema directories → catalog all exported schema names and their shapes

Synthesize after both complete. Never do this serially — the two inventories are independent.

## Scripts

```bash
bash scripts/inventory-api-surface.sh
bash scripts/inventory-api-surface.sh admin   # scope filter
bash scripts/find-shared-schemas.sh packages
```

## What to Collect (Agent A)

Per route: HTTP method, path, auth/permission requirements, request validation schema (name or inline), response schema (name or inline). Check both route registration AND plugin/middleware hooks — auth often lives in the plugin, not the handler.

## What to Collect (Agent B)

Per shared schema: exported name, file location, TypeScript shape summary, and whether it's referenced by any route import.

## Report Format

Severity-grouped markdown table:

| Severity | Category | Route/Type | Issue | File:Line |
|----------|----------|------------|-------|-----------|

Severity levels:
1. **Critical**: Auth gaps on mutation endpoints, missing request validation on write operations
2. **Warning**: Type drift between route handler and shared schema, missing response schemas on documented APIs
3. **Info**: Orphan types, inline schemas that could use shared ones

Include summary counts: total routes, full validation coverage, partial, none, mismatch count.

## Scope Filter

`$ARGUMENTS` — optional path prefix (e.g., `admin` → only audit `/admin/*` routes). Empty = audit all.
