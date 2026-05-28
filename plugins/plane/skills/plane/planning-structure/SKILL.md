---
name: planning-structure
description: "Use when the user asks to \"plan Plane sprint\", \"create Plane cycle\", \"manage Plane module\", \"create Plane epic\", \"roll over incomplete work\", or \"organize Plane roadmap\"."
version: 1.0.0
keywords:
  - "Plane planning"
  - "cycles"
  - "modules"
  - "epics"
  - "milestones"
  - "initiatives"
  - "roadmap"
aliases:
  - "plane-planning"
  - "plane-roadmap"
domains:
  - "plane"
  - "plane-content"
---
# Plane Planning Structure

Use this skill for Plane projects, cycles, modules, epics, milestones, initiatives, and roadmap organization.

## When to Use

Load this skill for: the user asks to "plan Plane sprint", "create Plane cycle", "manage Plane module", "create Plane epic", "roll over incomplete work", "organize Plane roadmap", or "group Plane work".

## Do NOT load this skill when

Do not load this skill for single work item edits, page publication, customer intake triage, or read-only reports unless structure changes are also requested.

## Planning Workflow

1. Read the current project list and resolve the target project UUID.
2. Inventory existing cycles, modules, epics, milestones, and initiatives that may match the requested names.
3. Classify the request as create, update, transfer, archive, or report.
4. For create operations, check for an existing object with the same name and date range.
5. For transfer operations, list source and destination work items before moving anything.
6. For roadmap operations, preserve hierarchy: initiative -> epic or project -> module/cycle -> work item.
7. Re-read affected structures and report counts and identifiers.

## Structure Guidance

- Use cycles for time-boxed sprint or iteration planning.
- Use modules for thematic or feature-area grouping inside a project.
- Use epics for larger objectives that break down into work items.
- Use milestones for checkpoint-style delivery dates.
- Use initiatives for workspace-scoped goals spanning projects or epics.

## Safe Rollover Pattern

1. Resolve old and new cycle UUIDs.
2. List old cycle work items.
3. Filter out completed and cancelled state groups unless the user asks otherwise.
4. Present or log the candidate count.
5. Transfer the resolved work item UUIDs.
6. Re-read both cycles and report movement counts.

## References

- `../references/api-foundation.md`
- `../references/content-model.md`

## NEVER Do This

- NEVER create duplicate cycles, modules, epics, milestones, or initiatives by name without checking existing structures.
- NEVER transfer completed or cancelled work by default during sprint rollover.
- NEVER archive or delete planning structures without explicit confirmation.
- NEVER flatten hierarchy when the user asks for roadmap organization.
- NEVER assume project-level structures exist in every Plane edition or workspace feature configuration.

## Arguments

$ARGUMENTS: Optional project identifier, cycle name, module name, epic name, milestone name, initiative name, date range, work item list, rollover rule, or roadmap goal.
