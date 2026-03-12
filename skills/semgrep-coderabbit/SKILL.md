---
name: semgrep-coderabbit
description: "Use when reviewing code changes before commit or PR merge. Covers tool sequencing, finding severity priorities, fix ordering strategy, and conflict resolution between tools. Keywords: code review, semgrep, coderabbit, security scan, pre-commit review, PR review, hardcoded secrets, SQL injection, XSS."
---

# Semgrep + CodeRabbit Review

Two-stage code review: fast deterministic pattern detection first, then semantic AI analysis. Order is non-negotiable.

## NEVER

- Never run CodeRabbit before Semgrep passes — Semgrep failures are blockers, not suggestions.
- Never skip re-running both tools after fixes — fixes can introduce new issues.
- Never treat LOW findings as blocking — they are optional polish.
- Never do more than 3 review cycles on the same PR — if still failing after 3, break the PR into smaller pieces.
- Never context-switch between issue types mid-fix — batch similar issues together.

## Execution Order

```
Stage 1: Semgrep (10-20 seconds)
  └─ FAIL → fix ALL violations → re-run until PASS
  └─ PASS → proceed to Stage 2

Stage 2: CodeRabbit (5-30 minutes)
  └─ Evaluate findings by priority
  └─ Fix CRITICAL + HIGH before merge
  └─ Consider MEDIUM if reasonable
  └─ LOW is optional

Stage 3: Verify
  └─ Re-run both tools after fixes
  └─ Confirm no new issues introduced
```

## Commands

```bash
# Stage 1 — run on each changed file (loop required for Semgrep 1.146.0+)
for f in $(git diff --name-only HEAD); do
  semgrep scan --config auto --json "$f" 2>/dev/null
done

# Stage 2
coderabbit review --diff uncommitted

# Verify after fixes (repeat both)
semgrep scan --config auto <changed-files>
coderabbit review --diff uncommitted
```

If a project has a `.semgrep.yaml`, use `--config .semgrep.yaml` instead of `--config auto`.

## Priority Reference

| Priority | Level        | Examples                                                         | Deadline              |
|----------|--------------|------------------------------------------------------------------|-----------------------|
| CRITICAL | Blocking     | Hardcoded secrets, auth bypass, SQL injection, XSS, data leakage | Must fix before merge |
| HIGH     | Architectural| Missing auth guards, schema mismatch, breaking changes, race conditions | Fix before merge |
| MEDIUM   | Quality      | Weak crypto, poor error handling, type safety violations, duplication | Fix if reasonable |
| LOW      | Polish       | Suggestions, optimization opportunities, style                   | Consider optional    |

## What Each Tool Catches (non-obvious)

**Semgrep:** Hardcoded secrets/API keys, missing auth guards on routes, weak crypto (MD5/SHA1), debug statements in prod, unsafe `any` types, SQL injection patterns.

**CodeRabbit:** N+1 query patterns, multi-tenant isolation gaps, API contract drift between services, test coverage gaps on behavioral changes — things that require semantic understanding of the codebase.

## Fix Strategy

**Batch by type, not by file.** Fix all secrets issues, then all auth issues, then all injection issues. Run unit tests after each batch.

**CRITICAL fixes first** — security and auth bypass issues must be resolved before anything else. They are non-negotiable blockers.

**3-pass rule** — if the review-fix-reverify cycle exceeds 3 iterations, the PR scope is too large. Split it.

## Conflict Resolution

When Semgrep and CodeRabbit give conflicting feedback on the same line: trust Semgrep. Its rules are deterministic and explicit. Validate CodeRabbit's concern with context before acting on it.

## When to Use Each Mode

| Situation | Use |
|-----------|-----|
| Pre-commit quick check | `--semgrep-only` (10-20s) |
| Before creating PR | (empty) full two-stage |
| Review specific recent commits | `--since HEAD~3` |
| Only staged files (partial work) | `--staged` |
| CodeRabbit not installed/available | `--semgrep-only` + manual checklist |
