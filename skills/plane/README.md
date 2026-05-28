# Plane Skill Pack

This folder is the repository boundary for Plane-related skill ownership.

All Plane specialist skills live under `skills/plane/<skill-name>/` and are installed with skill IDs such as `plane/work-item-management`. The canonical Plane inventory lives in [`manifest.json`](manifest.json), and [`SKILL.md`](SKILL.md) is the user-facing router.

For concrete example prompts, routing guidance, and multi-skill workflows, see [`USE_CASES.md`](USE_CASES.md).

## Core Plane Operations

- `plane/api-operations`
- `plane/work-item-management`
- `plane/planning-structure`
- `plane/pages-content`
- `plane/reporting-audit`

## Automation and Triage

- `plane/intake-customer-triage`
- `plane/agent-webhook-automation`

## Shared References

- `references/api-foundation.md`
- `references/content-model.md`
- `references/automation-and-agents.md`
- `references/tool-transports.md`

## Helper Scripts

- `scripts/plane-smoke-check.mjs` verifies Plane API credentials plus optional workspace and project connectivity without printing secrets. Export `PLANE_TOKEN` for the Plane API key; `PLANE_API_KEY` remains a compatibility fallback. Set `PLANE_WORKSPACE_SLUG` and `PLANE_PROJECT_ID` for deeper checks.
