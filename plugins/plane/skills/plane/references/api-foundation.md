# Plane API Foundation

Use this reference for Plane REST API setup, auth, pagination, OpenAPI, and error handling.

## Official Docs

- API introduction: https://developers.plane.so/api-reference/introduction
- OAuth token flows: https://developers.plane.so/dev-tools/build-plane-app/choose-token-flow
- OAuth scopes: https://developers.plane.so/dev-tools/build-plane-app/oauth-scopes
- SDKs: https://developers.plane.so/dev-tools/build-plane-app/sdks
- OpenAPI specification: https://developers.plane.so/dev-tools/openapi-specification

## Base URL

Plane Cloud API calls use `https://api.plane.so/` as the base URL. Self-hosted Plane uses the instance domain and may differ by deployment. Confirm the exact base URL before running scripts or configuring MCP.

Common path shape:

```text
GET /api/v1/workspaces/{workspace_slug}/projects/
GET /api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/
```

## Auth Modes

Use one auth mode per client:

- Personal access token: read `PLANE_TOKEN` from the environment and send `X-API-Key: <token>`. Accept `PLANE_API_KEY` only as a compatibility fallback when older tooling already uses it.
- OAuth bot or user token: send `Authorization: Bearer <token>`.

Use personal access tokens for local operator automation and smoke checks. Use OAuth bot tokens for autonomous Plane apps, webhook handlers, agents, and background automation. Use OAuth user tokens only when actions must be attributed to a specific user.

## Scopes

Request the narrowest scopes that match the work. Important scope families include:

- `projects:*`
- `projects.work_items:*`
- `projects.work_items.comments:*`
- `projects.cycles:*`
- `projects.modules:*`
- `projects.epics:*`
- `projects.milestones:*`
- `wiki.pages:*`
- `customers:*`
- `initiatives:*`
- `agents.runs:*`
- `agents.run_activities:*`

## Pagination

Plane uses cursor pagination for large list endpoints. Use `per_page` with a maximum of 100 and follow `next_cursor` while `next_page_results` is true.

Response objects commonly include:

- `results`
- `next_cursor`
- `prev_cursor`
- `next_page_results`
- `prev_page_results`
- `count`
- `total_results`

## OpenAPI

Self-hosted Plane can expose an OpenAPI 3.0 schema when `ENABLE_DRF_SPECTACULAR=1` is set for the API server. Useful endpoints:

```text
GET /api/schema/
GET /api/schema/?format=openapi-json
GET /api/schema/swagger-ui/
GET /api/schema/redoc/
```

Prefer a freshly exported schema when generating clients or checking endpoint drift for self-hosted instances.

## Error Handling

Map HTTP status codes to operator guidance:

- `400`: validate required fields and enum values.
- `401`: check missing, expired, or revoked API key/token.
- `403`: check workspace, project, and OAuth scope permissions.
- `404`: verify workspace slug, UUID, human identifier, and deletion/archive status.
- `429`: back off and retry; do not loop aggressively.
- `500`, `502`, `503`, `504`: verify Plane service health and retry only after confirming the operation is idempotent.

## Safe Write Pattern

1. Verify `PLANE_BASE_URL`, auth mode, and workspace slug.
2. Fetch current user with `/api/v1/users/me/`, using `PLANE_TOKEN` as the API key when a PAT is required.
3. Fetch the target workspace, project, and object.
4. Resolve human names or identifiers to UUIDs.
5. Build a minimal PATCH or POST payload.
6. Run the write once.
7. Re-read the object and report stable identifiers, changed fields, and residual risk.
