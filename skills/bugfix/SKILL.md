---
name: bugfix
description: Autonomous bug fix workflow — diagnose from evidence, fix root cause, verify with tests, commit. No hand-holding. Use when given a bug report, failing test, error log, or broken CI.
---

# Bugfix

Autonomous end-to-end bug fix pipeline. Diagnoses from evidence, finds root cause, implements minimal fix, verifies correctness, and commits.

## Pipeline

### Step 1: Gather Evidence (no code yet)

Parse `$ARGUMENTS` for:

- Error message / stack trace
- Failing test name / file
- CI log excerpt
- Reproduction steps

Then collect full context autonomously:

1. Run the failing test to see the exact error output:
   ```bash
   npx vitest run apps/api --reporter=verbose 2>&1 | grep -A 20 "FAIL\|Error"
   ```
2. Read the failing test file to understand what it expects
3. Read the source file under test
4. Check git log for recent changes to the affected files:
   ```bash
   git log --oneline -10 -- <affected-file>
   ```
5. If it's a runtime error, check logs and relevant route/plugin/service

Do NOT ask the user for more information unless the bug description is completely ambiguous. Use the tools to find it.

### Step 2: Root Cause Hypothesis

State a clear hypothesis:

- "The test is failing because X, caused by Y"
- "The runtime error is thrown at line N because Z"

Distinguish between:

- **Code bug** — implementation is wrong
- **Test bug** — test expectation is wrong (question the test first)
- **Mock wiring issue** — `mockReset: true` pattern not followed
- **Type error** — TypeScript compilation failure
- **Import error** — wrong package path

If it's a mock wiring issue, reference the mock patterns in CLAUDE.md before writing any fix.

### Step 3: Minimal Fix

Implement the minimum change that fixes the root cause:

- Do NOT refactor unrelated code
- Do NOT fix other bugs you noticed (create a new task instead)
- Do NOT add features
- If the test itself is wrong, fix the test — but explain why the test was wrong

For mock wiring issues, use the correct pattern from CLAUDE.md:

- Forwarding pattern for simple mocks
- Object-bag pattern for plugins with many exports
- Counter-based sequencing for multi-query operations

### Step 4: Verify

1. Run the specific failing test — it must now pass:
   ```bash
   npx vitest run apps/api --reporter=verbose -t "test name"
   ```
2. Run the full workspace test suite to check for regressions:
   ```bash
   npx vitest run apps/api
   ```
3. Run typecheck on the affected workspace:
   ```bash
   cd apps/api && npx tsc --noEmit
   ```

If step 2 reveals a regression caused by your fix, diagnose and resolve before proceeding.

### Step 5: Scope Guard

Run `git diff --name-only` and verify every changed file relates to the bug. Revert anything that doesn't.

### Step 6: Commit

Stage only the changed files (never `git add -A`). Commit:

```
fix(scope): <what was broken and how it was fixed>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## Abort Conditions

Stop and ask the user only if:

- The bug is in a security-sensitive area (auth, RBAC, IDOR) — confirm the fix approach before applying
- The fix requires changing more than 5 files — the scope may be too large for a single fix
- Root cause requires an architectural decision (e.g., changing the mock strategy for an entire test suite)

## Arguments

- `$ARGUMENTS`: Bug description — error message, failing test name, CI log URL, or reproduction steps
- If empty, ask for the error message or failing test name

## Examples

- `/bugfix "TypeError: Cannot read property 'orgId' of undefined in resolveOrgId"`
- `/bugfix apps/api/src/tests/routes/tools.test.ts` — diagnose all failures in that file
- `/bugfix "CI failing on PR #123 — vitest run apps/frontend exits with code 1"`
