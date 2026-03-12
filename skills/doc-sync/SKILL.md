---
name: doc-sync
description: "Use when auditing or fixing drift between project documentation and the actual codebase. Detects stale architecture diagrams, wrong file paths, outdated test counts, and undocumented structural changes. Pass 'fix' to apply repairs; default is report-only. Keywords: doc drift, stale docs, sync docs, documentation audit, update docs, architecture docs outdated."
---

# Documentation Sync Audit

Audit project docs against codebase reality. Report drift or fix it.

## NEVER

- Never update a doc based on what the code *should* look like — only sync to what it *actually* is now.
- Never fix docs for a section you didn't audit — partial fixes create false confidence.
- Never mark a roadmap item complete based on code presence alone — check git log for the deliberate completion commit.
- Never skip auditing CLAUDE.md / agent instructions — stale agent instructions cause cascading errors in future sessions.

## Drift Classification: What Actually Goes Stale

Most doc-code drift falls into four categories with different detection approaches:

| Drift Type | Detection Signal | False Positive Risk |
|------------|-----------------|---------------------|
| **Structural drift** | Directory tree, plugin/middleware chain order | Low — filesystem is ground truth |
| **Path rot** | File paths in docs that no longer exist | Low — use `check-doc-paths.js` |
| **Count drift** | Test counts, permission counts, route counts | Medium — recount from actual files |
| **Roadmap lag** | Completed work not reflected in docs | High — confirm git log intent |

## Decision: Audit vs Fix

- `$ARGUMENTS` = empty or `audit` → report only, no edits
- `$ARGUMENTS` = `fix` → report then apply targeted edits, commit

When fixing: edit the minimum to correct drift. Don't rewrite prose, restructure sections, or add new content — this is sync, not authoring.

## What to Audit

**Architecture docs** — plugin/middleware chain order, route module list, monorepo package list, directory structure tree.

**Security docs** — security plugins listed vs what's registered, permission counts, any security-related commits since last doc update (`git log --oneline --since="$(git log -1 --format=%ai docs/SECURITY.md)"  -- src/`).

**Test docs** — actual test file count vs documented count, pass/fail counts (run suite to get current numbers).

**Roadmap/changelog** — git log for completed work not reflected in any phase. Flag commits with `feat:` or `fix:` prefixes that postdate the last roadmap update.

**CLAUDE.md / agent instructions** — naming conventions match actual patterns, documented file paths exist, anti-patterns section is current.

## Scripts

```bash
bash scripts/list-doc-targets.sh
node scripts/check-doc-paths.js README.md docs/ARCHITECTURE.md
```

## Report Format

```
| Doc | Section | Issue | Severity |
|-----|---------|-------|----------|
```

Severity: **Critical** (broken paths, missing security docs), **Warning** (stale counts, missing routes), **Info** (minor wording drift, outdated roadmap phases).

## Commit (fix mode only)

```
docs: sync documentation with codebase [doc-sync]
```
