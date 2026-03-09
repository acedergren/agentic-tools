---
name: doc-sync
description: |
  Audit project documentation against the codebase and optionally fix drift in architecture, testing, and workflow docs.

  Use when user mentions:
  - "sync the docs with the codebase"
  - "check for documentation drift"
  - "update docs after this change"
---

# Documentation Sync Audit

Audit all project documentation against the actual codebase and report (or fix) any drift.

## Load this skill when

- the task is specifically about code-to-doc drift
- architecture, security, testing, or roadmap docs may be stale
- the user wants either a report-only audit or targeted doc fixes

## Do NOT load this skill when

- the user wants implementation changes instead of documentation work
- the task is a general repo health sweep with no doc focus
- the request is only to write a brand-new document from scratch

## Scripts

Use the helpers to inventory docs and detect stale path references:

```bash
bash scripts/list-doc-targets.sh
node scripts/check-doc-paths.js README.md docs/ARCHITECTURE.md
```

## Steps

1. **Identify documentation files**: Find all `.md` files in `docs/`, project root, and `.claude/reference/` that describe architecture, security, testing, or roadmap.

2. **Audit architecture docs** against the codebase:
   - Check main entry point — does the plugin/middleware chain match the documented order?
   - Check routes directory — are all route modules listed?
   - Check shared packages — are all exports documented?
   - Check monorepo layout — does the documented tree match actual directory structure?

3. **Audit security docs**:
   - Check security plugins/middleware — are all documented?
   - Check for new security-related commits since last doc update
   - Verify permission counts match actual definitions

4. **Audit test docs**:
   - Count actual test files
   - Run test suite to get current pass counts
   - Compare documented test counts to actual counts

5. **Audit roadmap/changelog**:
   - Check git log for commits not reflected in any documented phase
   - Verify completed phases are marked done

6. **Audit CLAUDE.md / agent instructions**:
   - Check naming conventions match actual code patterns
   - Verify documented file paths still exist
   - Confirm anti-patterns section is current

7. **Report findings**:

   ```
   | Doc | Section | Issue | Severity |
   |-----|---------|-------|----------|
   ```

8. **Fix drift** (if `$ARGUMENTS` contains "fix"):
   - Make targeted edits to fix each drift item
   - Commit with `docs: sync documentation with codebase [doc-sync]`

If `$ARGUMENTS` is empty or "audit", only report — don't edit.

## Arguments

- `$ARGUMENTS`: `audit` (default, report only) or `fix` (report and fix drift)

## When to Run

- Before creating a pull request (`/doc-sync audit`)
- After completing a development phase (`/doc-sync fix`)
- After any structural changes (new plugins, routes, migrations)
