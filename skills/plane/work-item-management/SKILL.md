---
name: work-item-management
description: "Use when the user asks to \"create Plane work items\", \"update Plane issue\", \"mark ENG-42 done\", \"add Plane comment\", \"link Plane work items\", or \"log time in Plane\"."
version: 1.0.0
keywords:
  - "Plane work items"
  - "issues"
  - "comments"
  - "labels"
  - "states"
  - "assignees"
  - "worklogs"
aliases:
  - "plane-work-items"
  - "plane-issues"
domains:
  - "plane"
  - "plane-content"
---
# Plane Work Item Management

Use this skill to create, search, update, comment on, link, attach to, or log time against Plane work items.

## When to Use

Load this skill for: the user asks to "create Plane work items", "update Plane issue", "mark ENG-42 done", "add Plane comment", "link Plane work items", "assign a Plane task", "add labels in Plane", or "log time in Plane".

## Do NOT load this skill when

Do not load this skill for pages, sprint structure, customer request triage, webhook app design, or read-only reporting that does not mutate work items. Use the matching sibling skill.

## Safe Work Item Workflow

1. Resolve workspace slug and project identifier.
2. Resolve the work item identifier, such as `ENG-42`, to UUID.
3. Fetch current work item with expanded state, labels, assignees, project, module, and type when relevant.
4. Resolve requested state, label, assignee, type, module, cycle, epic, or milestone names to UUIDs.
5. Check for duplicates before creating new work items.
6. Build the smallest payload possible.
7. Re-read the work item after writing.
8. Report the human identifier, UUID, changed fields, and any skipped requested changes.

## Common Operations

- Create a work item with `name`, `description_html`, `priority`, target dates, labels, assignees, and type.
- Update state by resolving state name or completed group to the project's state UUID.
- Add a comment instead of overwriting description fields when recording status or evidence.
- Link related work items or external URLs after checking existing links.
- Add worklogs only with clear duration and description.
- Preserve rich text unless replacement is explicit.

## Human Identifier Pattern

Use human identifiers for user-facing summaries and UUIDs for API calls:

```text
ENG-42 -> project identifier ENG + sequence id 42 -> work item UUID
```

When the user says "done", "todo", "in progress", or "cancelled", resolve that phrase through project states, not a hardcoded state UUID.

## References

- `../references/api-foundation.md`
- `../references/content-model.md`

## NEVER Do This

- NEVER delete, archive, or bulk-move work items without explicit confirmation and a pre-change list.
- NEVER overwrite `description_html` or binary/editor fields just to add an update; use comments for history.
- NEVER assume state names are shared across projects.
- NEVER assign users by display name alone when duplicate members or similar names exist.
- NEVER create duplicate work items without searching by name, identifier, and relevant labels first.

## Arguments

$ARGUMENTS: Optional workspace slug, project identifier, work item identifier, work item name, state, assignee, labels, comment text, link target, worklog duration, or target date.
