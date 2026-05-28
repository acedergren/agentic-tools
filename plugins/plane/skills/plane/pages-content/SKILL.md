---
name: pages-content
description: "Use when the user asks to \"publish Plane page\", \"update Plane wiki\", \"create Plane runbook\", \"write Plane project page\", or \"sync docs to Plane\"."
version: 1.0.0
keywords:
  - "Plane pages"
  - "wiki"
  - "runbook"
  - "project pages"
  - "workspace pages"
  - "documentation"
aliases:
  - "plane-pages"
  - "plane-wiki"
domains:
  - "plane"
  - "plane-content"
---
# Plane Pages Content

Use this skill for creating and updating Plane workspace pages, project pages, wiki docs, runbooks, specs, decision records, and durable notes.

## When to Use

Load this skill for: the user asks to "publish Plane page", "update Plane wiki", "create Plane runbook", "write Plane project page", "sync docs to Plane", or "store this in Plane docs".

## Do NOT load this skill when

Do not load this skill for work item comments, roadmap structures, customer request fields, or agent webhook responses unless the final artifact must become a Plane page.

## Page Workflow

1. Decide workspace page vs project page.
2. Resolve workspace slug and optional project UUID.
3. Search/list existing pages for the intended title.
4. If creating, construct `name` and `description_html`.
5. If updating, fetch current `description_html` first and compute the intended change.
6. Preserve existing content unless the user explicitly asks to replace it.
7. Re-read the page and report page name, UUID, scope, and changed sections.

## Content Conversion

Plane page content uses `description_html`. Convert markdown into conservative HTML:

- Headings: `h1`, `h2`, `h3`.
- Paragraphs and lists for prose.
- Code blocks as `pre` and `code`.
- Links with explicit `href`.
- Tables only when they are small and readable.

Avoid app-specific editor internals unless the current API response requires them.

## Update Policy

Prefer append or section replacement over full-page overwrite. For runbooks and living docs, add a short generated timestamp or source note only when the user wants provenance.

## References

- `../references/api-foundation.md`
- `../references/content-model.md`

## NEVER Do This

- NEVER overwrite page HTML without reading the current page first.
- NEVER publish secrets, tokens, raw customer PII, or internal credentials into Plane pages.
- NEVER assume a page title is unique across workspace and project scopes.
- NEVER convert large markdown files into one unreadable wall of HTML.
- NEVER use Plane pages for ephemeral status that belongs as a work item comment.

## Arguments

$ARGUMENTS: Optional workspace slug, project identifier, page title, source markdown path, content text, update mode, destination scope, or section name.
