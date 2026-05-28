---
name: api-operations
description: "Use when the user asks to \"call Plane API\", \"debug Plane API\", \"configure Plane MCP\", \"verify Plane credentials\", \"export Plane OpenAPI\", or \"fix Plane pagination\"."
version: 1.0.0
keywords:
  - "Plane API"
  - "Plane MCP"
  - "OpenAPI"
  - "pagination"
  - "OAuth"
  - "API key"
aliases:
  - "plane-api"
  - "plane-mcp"
domains:
  - "plane"
  - "plane-api"
---
# Plane API Operations

Use this skill for Plane API access, auth, MCP setup, OpenAPI export, pagination, and HTTP troubleshooting.

## When to Use

Load this skill for: the user asks to "call Plane API", "debug Plane API", "configure Plane MCP", "verify Plane credentials", "export Plane OpenAPI", "fix Plane pagination", or "choose between REST, SDK, and MCP".

## Do NOT load this skill when

Do not load this skill for content-specific operations after transport is already working. Use `plane/work-item-management`, `plane/pages-content`, `plane/planning-structure`, `plane/intake-customer-triage`, or `plane/reporting-audit` instead.

## Workflow

1. Identify the target Plane instance: Plane Cloud or self-hosted.
2. Confirm `PLANE_BASE_URL`, `PLANE_WORKSPACE_SLUG`, and auth mode.
3. Run a read-only credential check before any write.
4. Choose transport: REST, SDK, MCP, or OpenAPI.
5. For list endpoints, implement cursor pagination and cap `per_page` at 100.
6. For write operations, hand off to the content-specific Plane skill after the transport is proven.
7. Record the evidence: endpoint path, status code, object identifiers, and skipped assumptions.

## Credential Smoke

From the repository root, run:

```bash
cd skills/plane
node ./scripts/plane-smoke-check.mjs
```

Environment:

```bash
PLANE_BASE_URL=https://api.plane.so
export PLANE_TOKEN=...
PLANE_WORKSPACE_SLUG=...
```

Use `PLANE_ACCESS_TOKEN` instead of `PLANE_TOKEN` for OAuth bearer tokens. Accept `PLANE_API_KEY` only as a compatibility fallback for older local tooling.

## Transport Selection

- REST: scripts, CI, exact evidence, high-risk writes, and bulk reads.
- SDK: Plane apps and services that need OAuth helpers.
- MCP: interactive agent sessions with configured Plane tools.
- OpenAPI: client generation, schema drift checks, and self-hosted endpoint inventory.

## Troubleshooting Map

- `401`: missing, expired, or revoked token.
- `403`: token lacks workspace/project permission or OAuth scope.
- `404`: wrong base URL, workspace slug, UUID, identifier, or deleted resource.
- `429`: back off; do not loop aggressively.
- `5xx`: verify Plane health and retry only idempotent reads or explicitly safe operations.

## References

- `../references/api-foundation.md`
- `../references/tool-transports.md`

## NEVER Do This

- NEVER commit real API keys, bearer tokens, OAuth client secrets, MCP headers, or webhook secrets. Look for `PLANE_TOKEN` in env when API key auth is needed.
- NEVER assume `https://api.plane.so` for self-hosted Plane.
- NEVER write content before confirming the current user and target workspace.
- NEVER ignore pagination when producing reports or bulk operations.
- NEVER retry non-idempotent writes after a timeout unless the target resource is re-read first.

## Arguments

$ARGUMENTS: Optional base URL, workspace slug, auth symptom, endpoint path, MCP config, OpenAPI export target, or pagination/reporting goal.
