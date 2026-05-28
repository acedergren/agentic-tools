# Plane Skill Catalog and Use Cases

Use this catalog to route Plane work to the right specialist skill before loading large references or making API calls.

## Routing Table

| User prompt | Skill |
| --- | --- |
| "Verify my Plane API token and tell me which workspace it can see." | `plane/api-operations` |
| "Create work items for these TODOs and link them to ENG-42." | `plane/work-item-management` |
| "Roll incomplete Sprint 14 work into Sprint 15." | `plane/planning-structure` |
| "Publish this deployment runbook as a Plane project page." | `plane/pages-content` |
| "Turn new customer requests into triaged work items." | `plane/intake-customer-triage` |
| "Build a Plane agent that responds to @mentions." | `plane/agent-webhook-automation` |
| "Show stale high-priority bugs assigned to me." | `plane/reporting-audit` |

## Multi-Skill Workflows

### Publish a planning pack

1. Use `plane/api-operations` to confirm credentials, base URL, workspace slug, and project identifiers.
2. Use `plane/planning-structure` to create or update modules, cycles, epics, and milestones.
3. Use `plane/work-item-management` to create the work item set and assign states, labels, and owners.
4. Use `plane/pages-content` to publish the durable plan or runbook.
5. Use `plane/reporting-audit` to verify the resulting structure without additional writes.

### Create an automation app

1. Use `plane/api-operations` to choose REST, SDK, or MCP and verify token behavior.
2. Use `plane/agent-webhook-automation` to choose bot-token or user-token OAuth flow, webhook handling, and agent activity behavior.
3. Use `plane/work-item-management` for the exact write operations the automation will perform.
4. Use `plane/reporting-audit` to design read-only observability and reconciliation checks.

### Triage customer requests

1. Use `plane/intake-customer-triage` to inspect intake issues, customers, customer requests, and properties.
2. Use `plane/work-item-management` to create or link work items after triage rules are explicit.
3. Use `plane/pages-content` when the triage outcome should become a customer-facing note, internal runbook, or decision record.

## Safety Defaults

- Read first, then patch only the intended fields.
- Prefer identifiers like `ENG-42` for human reporting and UUIDs for API calls.
- Treat deletes, bulk archive operations, membership changes, and customer data mutation as high-risk writes.
- Look for `PLANE_TOKEN` in the environment when a Plane personal access token or API key is needed.
- Keep API keys, OAuth secrets, bearer tokens, webhook secrets, and customer-sensitive payloads out of committed files.
