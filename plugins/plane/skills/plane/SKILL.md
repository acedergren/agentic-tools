---
name: plane
description: "Use when the user asks to \"manage Plane content\", \"route Plane API work\", \"use Plane MCP\", \"create Plane work items\", \"publish Plane pages\", or \"build Plane agent automation\"."
version: 1.0.0
keywords:
  - "Plane"
  - "Plane API"
  - "Plane MCP"
  - "work items"
  - "pages"
  - "cycles"
  - "modules"
  - "epics"
  - "customers"
  - "agents"
aliases:
  - "plane-skills"
  - "plane-skill-pack"
  - "plane-api"
domains:
  - "plane"
  - "plane-api"
  - "project-management"
---
# Plane Skill Pack

Use this skill as the routing and ownership boundary for Plane-related content, API, MCP, and agent automation work. All Plane specialists live under `skills/plane/<skill-name>/` and are installed with skill IDs such as `plane/work-item-management`.

Plane has a broad REST API, an official MCP server, SDKs, webhooks, OAuth flows, and content resources such as work items, pages, epics, initiatives, customers, and intake queues. Treat this pack as the workflow layer that turns user intent into safe operations; treat REST, SDK, and MCP as transport choices.

## When to Use

Load this skill for: the user asks to "manage Plane content", "route Plane API work", "use Plane MCP", "create Plane work items", "publish Plane pages", "build Plane agent automation", "plan Plane sprint work", or "report on Plane work".

Use it when the task is about skill routing, pack governance, install coverage, or selecting the correct Plane specialist.

## Do NOT load this skill when

Do not load this skill for a narrow Plane task that maps directly to one specialist. Load that specialist directly:

| User intent | Load |
| --- | --- |
| Auth, base URL, API keys, OAuth tokens, MCP setup, OpenAPI export, pagination, HTTP errors | `plane/api-operations` |
| Create, search, update, comment on, link, attach to, or log time on work items | `plane/work-item-management` |
| Projects, cycles, modules, epics, milestones, initiatives, roadmap structure, sprint rollover | `plane/planning-structure` |
| Workspace/project pages, wiki docs, runbooks, specs, durable notes | `plane/pages-content` |
| Intake issues, customers, customer requests, customer properties, customer-to-work-item links | `plane/intake-customer-triage` |
| Plane OAuth apps, webhooks, mentionable agents, agent runs, activity responses | `plane/agent-webhook-automation` |
| Read-only reports, audits, stale-work review, sprint health, activity summaries | `plane/reporting-audit` |

## Skill Pack Rules

1. Resolve the operation class before selecting tools: read-only, low-risk write, high-risk write, or irreversible delete.
2. Prefer read-before-write. Fetch the current Plane object and related IDs before constructing payloads.
3. Prefer human identifiers in user conversation and UUIDs in API calls. For example, resolve `ENG-42` to a work item UUID before mutation.
4. Prefer narrow writes. Patch only the fields the user asked to change.
5. Keep high-drift facts in references and official docs. Plane API surfaces, scopes, MCP tools, and self-hosted behavior can change.
6. Keep secrets out of files, prompts, PR bodies, screenshots, browser console logs, and generated examples.

## Transport Choice

Use the smallest working transport for the task:

- MCP: Best for interactive agent sessions where Plane tools are already configured.
- REST API: Best for deterministic scripts, smoke checks, bulk operations, and reproducible evidence.
- SDK: Best for application code using OAuth helpers and typed clients.
- OpenAPI schema: Best for code generation, endpoint inventory, and drift checks against self-hosted Plane.

Before executing writes through any transport, confirm the base URL, workspace slug, auth mode, and target project or resource identifiers.

## References

- `references/api-foundation.md` - REST base URL, auth, pagination, errors, OpenAPI, and safety patterns.
- `references/content-model.md` - Plane content resources and ID resolution guidance.
- `references/automation-and-agents.md` - OAuth apps, webhooks, agent runs, and safe event handling.
- `references/tool-transports.md` - REST vs SDK vs MCP vs OpenAPI selection.
- `USE_CASES.md` - Example prompts, routing, and multi-skill workflows.
- `manifest.json` - Canonical Plane skill-pack inventory.

## Scripts

Use `node scripts/plane-smoke-check.mjs` from inside this skill directory to verify Plane API credentials without exposing token material. The script reads `PLANE_BASE_URL`, `PLANE_TOKEN` as the Plane API key, optional compatibility fallback `PLANE_API_KEY`, optional OAuth `PLANE_ACCESS_TOKEN`, optional `PLANE_WORKSPACE_SLUG`, and optional `PLANE_PROJECT_ID`.

## NEVER Do This

- NEVER create, update, archive, delete, or bulk-move Plane content before resolving the exact workspace and resource IDs.
- NEVER assume a Plane Cloud base URL when the user is working with self-hosted Plane.
- NEVER copy API keys, OAuth client secrets, bearer tokens, webhook secrets, or Cloudflare Access credentials into skill files, docs, comments, or PR bodies.
- NEVER overwrite `description_html`, page content, comments, or rich text fields without reading the current content first.
- NEVER use this router as a duplicate API reference. Route to the owning specialist and load the focused reference only when needed.

## Arguments

$ARGUMENTS: Optional Plane workspace, project identifier, work item identifier, page name, API symptom, automation goal, or reporting question. When empty, infer the target specialist from the user's request and current repository context.
