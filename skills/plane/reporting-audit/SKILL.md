---
name: reporting-audit
description: "Use when the user asks to \"report on Plane\", \"audit Plane work\", \"find stale Plane issues\", \"summarize Plane activity\", or \"show Plane sprint health\"."
version: 1.0.0
keywords:
  - "Plane reporting"
  - "audit"
  - "stale work"
  - "sprint health"
  - "activity"
  - "worklogs"
aliases:
  - "plane-reporting"
  - "plane-audit"
domains:
  - "plane"
  - "plane-content"
---
# Plane Reporting and Audit

Use this skill for read-only reporting, auditing, stale-work review, sprint health, activity summaries, and worklog analysis.

## When to Use

Load this skill for: the user asks to "report on Plane", "audit Plane work", "find stale Plane issues", "summarize Plane activity", "show Plane sprint health", or "list overdue Plane tasks".

## Do NOT load this skill when

Do not load this skill when the user asks to create or update Plane content. Produce the report first, then route any requested mutations to the relevant write skill.

## Reporting Workflow

1. Confirm the report scope: workspace, project, cycle, module, epic, customer, assignee, label, state group, or date range.
2. Use read-only list/search endpoints with pagination.
3. Resolve "me", project identifiers, state groups, labels, and assignees before filtering.
4. Deduplicate by work item UUID.
5. Separate observed facts from inferred recommendations.
6. Report source filters, record counts, stale assumptions, and any partial data.

## Useful Report Types

- Stale high-priority work by state group and assignee.
- Sprint/cycle health by incomplete work item count and priority mix.
- Module delivery inventory with unassigned or unlabeled work.
- Overdue work items by target date.
- Recently completed work from activity or state transition data.
- Worklog totals by user or work item.
- Customer-linked work summary.

## Output Shape

Prefer concise tables with:

- Human identifier.
- Name.
- State group or state.
- Priority.
- Assignee.
- Target date or age.
- Link or UUID when useful.

## References

- `../references/api-foundation.md`
- `../references/content-model.md`

## NEVER Do This

- NEVER mutate Plane content during a read-only report unless the user explicitly changes the task.
- NEVER report from a single page of paginated results unless the limitation is stated.
- NEVER treat missing archived or deleted resources as proof they never existed.
- NEVER expose sensitive customer request content in broad reports.
- NEVER combine multiple workspaces without labeling the source workspace.

## Arguments

$ARGUMENTS: Optional workspace slug, project identifier, cycle/module/epic/customer scope, assignee, state group, priority, label, date range, or report format.
