---
name: review-all
description: "Use when preparing a PR or completing a phase of work and needing a full-spectrum code review. Runs security, API audit, and scope reviewers in parallel and synthesizes findings into a single go/no-go report. Read-only — no file modifications. Keywords: pre-PR review, security audit, API audit, scope review, code review, merge check."
---

# Review All

Comprehensive pre-PR review: run specialized reviewers in parallel, synthesize into a single report. **Read-only — no changes.**

## NEVER

- Never let any reviewer edit files during this pipeline — read-only is non-negotiable.
- Never report duplicate findings separately when two reviewers flag the same line — merge into one finding.
- Never review the whole repository when the user only changed a narrow diff — scope to changed files.
- Never use this as a substitute for lint, typecheck, or tests — it complements them, runs after them.
- Never run this for implementation tasks or auto-remediation requests — wrong tool.

## Pipeline

### Step 1: Identify changed files

```bash
git diff --name-only main...HEAD
# On main: git diff --name-only HEAD~5
# Or: bash scripts/detect-review-range.sh
```

### Step 2: Launch parallel review agents

Spawn all agents simultaneously via Task tool:

| Agent | Type | Scope | Checks |
|---|---|---|---|
| Security Reviewer | `security-reviewer` (custom) | Changed files only | OWASP Top 10, IDOR, injection, auth gaps |
| API Route Auditor | Explore agent | Routes + types dirs | Schema coverage, type drift, auth hooks |
| Scope Auditor | Explore agent | `git diff` output | Out-of-scope modifications, formatting-only noise |

Add project-specific reviewers as needed (DB query reviewer, framework reviewer).

### Step 3: Synthesize report

```
## Pre-PR Review Report

### Summary
| Reviewer  | Findings | Critical | Warnings |
|-----------|----------|----------|----------|
| Security  | 2        | 0        | 2        |
| API Audit | 3        | 1        | 2        |
| Scope     | 1        | 0        | 1        |

### Critical Issues (must fix before merge)
[CRITICAL/HIGH findings with file:line references]

### Warnings (consider fixing)
[MEDIUM/LOW findings]

### Clean Areas
[What passed with no issues]
```

### Step 4: Verdict

End with one clear statement:

- **READY TO MERGE** — No critical issues, warnings acceptable
- **NEEDS FIXES** — Critical issues found; list exactly what must change
- **NEEDS DISCUSSION** — Architectural concerns or ambiguous scope

## Arguments

- (empty): Review changes vs `main`
- `HEAD~3`: Review last 3 commits
- `--security-only`: Only security reviewer
