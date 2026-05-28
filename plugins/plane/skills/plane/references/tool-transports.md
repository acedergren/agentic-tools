# Plane Tool Transports

Use this reference when choosing how to access Plane.

## REST API

Use REST when reproducibility, scripts, exact HTTP evidence, or CI automation matter. REST is the best default for smoke checks, one-off migrations, bulk reads, and narrow writes with explicit payloads.

Required context:

- `PLANE_BASE_URL`
- `PLANE_TOKEN` as the Plane API key, compatibility fallback `PLANE_API_KEY`, or OAuth `PLANE_ACCESS_TOKEN`
- `PLANE_WORKSPACE_SLUG`

## SDKs

Use SDKs when building an application or webhook service that needs OAuth helper methods and typed clients. Plane publishes Node.js and Python SDKs. Verify package versions and examples from current upstream docs before adding dependencies.

## MCP

Use MCP when an interactive agent session already has Plane tools available. The official MCP server supports stdio and remote HTTP transports. Treat MCP as the tool execution layer; keep workflow policy in these skills.

Local convention: read the Plane API key from `PLANE_TOKEN`. When a third-party tool expects `PLANE_API_KEY`, pass the value from `PLANE_TOKEN` into that tool's required variable at launch time.

Stdio shape:

```json
{
  "command": "uvx",
  "args": ["plane-mcp-server", "stdio"],
  "env": {
    "PLANE_API_KEY": "<value from PLANE_TOKEN>",
    "PLANE_WORKSPACE_SLUG": "workspace-slug",
    "PLANE_BASE_URL": "https://plane.example.com"
  }
}
```

Remote HTTP with PAT header shape:

```json
{
  "url": "https://mcp.plane.so/http/api-key/mcp",
  "type": "http",
  "headers": {
    "x-api-key": "redacted",
    "x-workspace-slug": "workspace-slug"
  }
}
```

Never commit real headers or tokens.

## OpenAPI

Use OpenAPI when generating clients, auditing endpoint coverage, or comparing a self-hosted Plane instance with upstream docs. Export fresh schemas from the target instance whenever possible.

## Selection Matrix

| Need | Prefer |
| --- | --- |
| Prove credentials work | REST smoke check |
| Interactive agent session | MCP |
| Build a webhook app | SDK plus REST fallback |
| Generate typed client | OpenAPI |
| Bulk read/report | REST or MCP list tools |
| High-risk mutation | REST with explicit payload and re-read |
