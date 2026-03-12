---
name: implement
description: "Use when implementing a feature, adding an endpoint, or making a non-trivial code change that requires pre-flight validation, TDD cycle, scope enforcement, and a clean commit. Combines pre-flight + tdd + scope-check + quality-commit into one flow. Keywords: implement feature, add endpoint, TDD, new functionality, code change."
---

# Implement

End-to-end feature implementation pipeline. Runs pre-flight validation, TDD cycle, scope enforcement, and quality commit as a single orchestrated flow.

Do NOT load this skill when the user only wants a focused subflow like `/tdd` or `/quality-commit`, or when the work is already finished and only needs verification or commit handling.

## NEVER

- Never skip pre-flight — writing code on a broken baseline wastes the whole TDD cycle.
- Never add features not covered by tests during the Green phase — that's scope creep inside a test cycle.
- Never use `git add -A` or `git add .` — stage specific files only.
- Never proceed past bootstrap mock failure — it means your mock wiring is broken, not a Red/Green issue.
- Never commit with pre-existing lint errors in files you didn't touch — note them in the commit message instead.
- Never treat a passing test during Red as "good enough" — a test that passes before implementation isn't testing new behavior.

## Abort Conditions

STOP the pipeline and ask the user if:

- Pre-flight finds the workspace in a broken state (typecheck fails before your changes)
- More than 5 files need modification (scope may be too large for one commit)
- Bootstrap mock test fails after 2 attempts
- Full suite regression caused by your changes

## Decision Tree: Which Phase to Start From

```
Is the workspace clean and green?
├── No → Pre-flight: fix or ask before any code
└── Yes → Proceed

Does a test file already exist for the target module?
├── Yes → Run it first; confirm green baseline
└── No → Bootstrap mock is your first step

Does the task touch > 5 files?
├── Yes → Ask user to confirm scope before writing
└── No → Proceed
```

## Pipeline

### Phase 0: Pre-flight (< 30 seconds)

```bash
git status --short
npx tsc --noEmit 2>&1 | head -20
```

If monorepo: check if shared/library packages need rebuild (source newer than compiled output).

If any check fails: report and ask how to proceed before writing code.

### Phase 1: Understand & Plan

Read target files. Identify module type (route handler, repository, plugin, utility, service, component). Check nearest test files for established mock patterns.

Brief summary: "I'll add X tests covering Y, then implement Z." Wait for confirmation if scope > 3 files.

### Phase 2: Bootstrap Mock (1 test)

Write ONE minimal test that imports the module and verifies mocks resolve. Run it — must pass.

If it fails after 2 attempts: STOP. Mock wiring is broken (wrong module path, incorrect mock factory, missing type shim). Fix that before Red/Green.

### Phase 3: Red — Write Failing Tests

Write tests for: happy path, edge cases, error cases.

Run the file — ALL new tests MUST fail. If any pass unexpectedly, the tests aren't testing new behavior.

### Phase 4: Green — Minimum Implementation

Write the minimum code to make all tests pass. Then run — all tests MUST pass.

Do NOT add features not covered by tests. Do NOT optimize. Do NOT refactor existing code.

### Phase 5: Scope Guard

```bash
git diff --name-only
```

Flag files that don't relate to the task:
- Formatting-only changes → revert with `git checkout -- <file>`
- Unrelated refactors → revert or split into separate commit
- Docstring additions to untouched code → revert

### Phase 6: Full Suite + Quality Gates

```bash
npx vitest run --reporter=dot
npx tsc --noEmit
npx eslint <changed files only>
```

Triage failures:
- Test failure in your files → regression, fix it
- Type error → fix it
- Lint in your files → fix it
- Lint in files you didn't touch → note in commit message, do not fix

### Phase 7: Commit

```bash
git add <specific files>
git commit -m "type(scope): description

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Arguments

- `$ARGUMENTS`: What to implement
  - Example: `/implement add rate limiting to POST /api/search`
  - Example: `/implement src/routes/admin/settings.ts — add PATCH endpoint for theme`
  - If empty: ask the user what to implement
