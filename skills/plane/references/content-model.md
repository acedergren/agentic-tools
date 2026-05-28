# Plane Content Model

Use this reference when mapping user intent to Plane resources.

## Core Resources

- Project: workspace-scoped delivery space with identifier, features, members, states, labels, cycles, modules, pages, and work items.
- Work item: assignable unit of work with `name`, `description_html`, `priority`, dates, state, labels, assignees, parent, type, module, estimate, and draft/archive flags.
- State: project workflow status. State groups include backlog, unstarted, started, completed, and cancelled.
- Label: project-scoped tag; labels may be hierarchical.
- Work item comment: conversation or update attached to a work item.
- Work item activity: audit trail for work item changes.
- Worklog: time tracking entry attached to a work item.
- Page: workspace or project documentation object with `name` and `description_html`.
- Cycle: time-boxed iteration or sprint.
- Module: project-scoped grouping for related work.
- Epic: larger work item for hierarchical delivery.
- Milestone: project delivery checkpoint.
- Initiative: workspace-scoped strategic goal spanning projects or epics.
- Intake work item: triage queue entry before accepted project work.
- Customer, customer request, and customer property: customer-facing work-management surfaces.

## ID Resolution

Plane user prompts often contain human identifiers while the API generally needs UUIDs.

Resolve in this order:

1. Workspace slug from URL, environment, or app installation.
2. Project identifier or name to project UUID.
3. Work item identifier such as `ENG-42` to work item UUID.
4. State name or group to state UUID.
5. Label names to label UUIDs.
6. Assignee names, emails, or "me" to member/user UUIDs.
7. Module, cycle, epic, milestone, initiative, page, customer, or request name to UUID.

## Rich Text Fields

Plane uses rich description fields such as `description_html`, `description_stripped`, and sometimes binary/editor-specific fields. Preserve existing rich text unless the user explicitly requests replacement. Prefer appending comments or creating pages over overwriting descriptions when the intent is conversational or historical.

## Write Risk Classes

Low-risk writes:

- Add comment.
- Create page from new content.
- Create new work item after duplicate scan.
- Add link or relation after resolving both targets.
- Add worklog with clear duration and description.

Moderate-risk writes:

- Change state, priority, labels, assignees, dates, estimates, module, cycle, or parent.
- Update page or work item descriptions.
- Move work items between modules, cycles, epics, or milestones.

High-risk writes:

- Delete objects.
- Archive or unarchive projects, cycles, modules, or many work items.
- Change workspace/project members.
- Bulk update customers or customer properties.
- Overwrite page or description content without a diff.

## Reporting Defaults

Report both human and machine-stable identifiers when useful:

```text
Updated ENG-42 (work item id: ...): state Todo -> Done, added comment id ...
```

Keep final user reports focused on changed resources, skipped resources, validation commands, and residual risk.
