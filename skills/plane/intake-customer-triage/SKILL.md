---
name: intake-customer-triage
description: "Use when the user asks to \"triage Plane intake\", \"manage Plane customers\", \"create Plane customer request\", \"link customer to work item\", or \"process customer feedback in Plane\"."
version: 1.0.0
keywords:
  - "Plane intake"
  - "customers"
  - "customer requests"
  - "customer properties"
  - "feedback"
  - "triage"
aliases:
  - "plane-intake"
  - "plane-customers"
domains:
  - "plane"
  - "plane-content"
---
# Plane Intake and Customer Triage

Use this skill for Plane intake issues, customers, customer requests, customer properties, and customer-to-work-item links.

## When to Use

Load this skill for: the user asks to "triage Plane intake", "manage Plane customers", "create Plane customer request", "link customer to work item", "process customer feedback in Plane", or "turn intake into project work".

## Do NOT load this skill when

Do not load this skill for generic work item edits after a request has already been accepted into project work. Use `plane/work-item-management` for the downstream work item operations.

## Triage Workflow

1. Resolve workspace and project context.
2. List intake issues, customers, requests, and relevant properties.
3. Classify each item: duplicate, needs more info, accepted, rejected, or convert to work item.
4. Resolve or create customer records only after duplicate checks.
5. Link accepted customer requests to work items.
6. Preserve the original request context in comments or links.
7. Report triage decisions, created objects, linked work items, and skipped items.

## Customer Data Rules

Treat customer names, emails, request text, contract references, and property values as sensitive business data. Keep summaries concise and avoid copying raw sensitive payloads into PRs, logs, or public pages.

## Conversion Pattern

When turning feedback into work:

1. Read existing customer request and linked work items.
2. Search for matching open work items by title, description keywords, and labels.
3. If no suitable item exists, create a work item with a concise problem statement.
4. Link the work item back to the customer/request.
5. Add a comment summarizing the acceptance decision.

## References

- `../references/api-foundation.md`
- `../references/content-model.md`

## NEVER Do This

- NEVER create duplicate customer records without checking name, domain, and existing requests.
- NEVER expose sensitive customer request text in public docs or PR bodies.
- NEVER convert intake directly into high-priority work without an explicit prioritization rule.
- NEVER delete customer records, requests, or properties without explicit confirmation.
- NEVER unlink customer work items without recording why.

## Arguments

$ARGUMENTS: Optional workspace slug, project identifier, customer name, request id, property name, triage rule, linked work item identifier, or feedback payload.
