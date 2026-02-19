---
name: prod-readiness
description: Autonomous production readiness review pipeline — spawns 5 parallel specialist agents (security, testing, performance, observability, code quality) and synthesizes findings into a prioritized remediation plan. Use before major releases or milestone completions.
---

# Prod-Readiness

Spawns 5 specialist review agents in parallel, each writing findings to a dedicated report file. Synthesizes into a prioritized production readiness report with executive summary, blockers, and remediation plan.

## Pipeline

### Step 1: Pre-flight

Check the workspace is ready for review:

```bash
git status --short  # confirm no uncommitted changes
git log --oneline -5  # confirm recent work is committed
npx vitest run --reporter=dot 2>&1 | tail -5  # confirm baseline green
```

If tests are failing, warn the user — the review will be less meaningful on a broken baseline.

### Step 2: Spawn Specialist Agents

Use TeamCreate then spawn 5 agents via Task tool in parallel:

**Team name**: `prod-review-<YYYYMMDD>`

Agent spawn instructions for each:

---

**Agent 1: security-auditor**

```
Review this codebase for security vulnerabilities. Write ALL findings to REVIEW_SECURITY.md.

Check:
1. OWASP Top 10: injection, broken auth, IDOR, XSS, CSRF, misconfiguration
2. RBAC gaps: endpoints not protected by resolveOrgId() or permission checks
3. Input validation: user input reaching SQL without bind parameters
4. Secrets: hardcoded credentials, missing env var validation at startup
5. Dependency vulnerabilities: npm audit --json | jq '.vulnerabilities | length'
6. Auth flows: session fixation, token validation, logout behavior
7. Webhook security: HMAC validation, SSRF protection in isValidWebhookUrl()

Format findings as: [CRITICAL|HIGH|MEDIUM|LOW] Description — File:Line — Suggested fix
```

**Agent 2: test-coverage-analyst**

```
Analyze test coverage quality across this monorepo. Write ALL findings to REVIEW_TESTING.md.

Check:
1. Run: npx vitest run --reporter=json 2>/dev/null | jq '.testResults[].testFilePath' | wc -l
2. Identify critical paths with ZERO test coverage (routes, services, repositories)
3. Find tests that always pass (no real assertions, only vi.fn() calls with no expectations)
4. Check for missing error path tests (most routes only test happy path)
5. Identify flaky test patterns (time-dependent tests, missing afterEach cleanup)
6. Check mock coverage: are all branches of mocked functions tested?

Format: [CRITICAL|HIGH|MEDIUM|LOW] Area — Current coverage — Risk — Suggested tests
```

**Agent 3: performance-infra**

```
Review performance and infrastructure readiness. Write ALL findings to REVIEW_PERFORMANCE.md.

Check:
1. Database: N+1 queries (loops with SQL inside), missing indexes for frequent queries
2. Unbounded queries: SELECT without LIMIT (check Oracle repositories)
3. Memory: unclosed connections, event listeners without removeListener
4. Docker: resource limits in docker-compose.yml, health check configuration
5. Graceful shutdown: SIGTERM handling in Fastify app, connection drain
6. Rate limiting: all public endpoints covered by rate limiter
7. Caching: Oracle query results that could be cached (check withCachedQuery usage)

Format: [CRITICAL|HIGH|MEDIUM|LOW] Issue — File:Line — Impact — Fix
```

**Agent 4: observability-analyst**

```
Review error handling and observability completeness. Write ALL findings to REVIEW_OBSERVABILITY.md.

Check:
1. Unhandled rejections: async functions without try/catch in route handlers
2. Error boundaries: does the frontend have error.svelte for route errors?
3. PII in logs: user emails, tokens, or sensitive data in Pino log statements
4. Error response consistency: all errors use PortalError hierarchy (toResponseBody)?
5. Structured logging: all log calls use structured objects (not string concatenation)
6. Sentry coverage: errors reaching the global handler vs. swallowed in try/catch
7. Health endpoint: does /health check critical dependencies (Oracle connection)?

Format: [CRITICAL|HIGH|MEDIUM|LOW] Issue — File:Line — Risk — Fix
```

**Agent 5: code-quality**

```
Review code quality and architecture health. Write ALL findings to REVIEW_QUALITY.md.

Check:
1. Dead code: exported functions never imported (use grep -r to verify)
2. Circular dependencies: run pnpm run check:circular if available
3. TODO/FIXME/HACK comments: grep -rn "TODO\|FIXME\|HACK" apps/ packages/ --include="*.ts"
4. Package boundary violations: apps/api importing from apps/frontend or vice versa
5. Inconsistent patterns: routes that don't use buildTestApp(), plugins that bypass fp()
6. packages/shared usage: new code added to shared/ (should be types/ or server/ post-split)
7. Type safety gaps: any casts, @ts-ignore, non-null assertions (!) in production code

Format: [CRITICAL|HIGH|MEDIUM|LOW] Issue — File:Line — Debt impact — Suggested refactor
```

---

### Step 3: Monitor Agents

Wait for all 5 agents to complete their report files. Check progress:

```bash
ls -la REVIEW_*.md  # confirms files are being written
wc -l REVIEW_*.md   # shows progress
```

If an agent stalls (no file update in 2 minutes), send a check-in message.

### Step 4: Synthesize Report

When all 5 REVIEW\_\*.md files exist, synthesize into `PRODUCTION_READINESS_REPORT.md`:

**Structure:**

```markdown
# Production Readiness Report — <date>

## Executive Summary

<1 paragraph: ship / don't ship recommendation with top 3 reasons>

## Quality Gate Results

- Tests: <pass/fail count>
- TypeScript: <clean / N errors>
- Lint: <clean / N warnings>

## Critical Blockers (must fix before deploy)

<items rated CRITICAL from any agent>

## High Priority (fix within first sprint post-launch)

<items rated HIGH from any agent>

## Medium Priority (fix within first month)

<items rated MEDIUM>

## Low Priority / Tech Debt (backlog)

<items rated LOW>

---

Each item format:
**[CATEGORY] Title**

- File: path:line
- Risk: description
- Effort: S (< 2h) / M (2-8h) / L (> 1 day)
- Fix: suggested approach
```

### Step 5: Run Final Quality Gate

```bash
npx vitest run --reporter=dot 2>&1 | tail -10
cd apps/api && npx tsc --noEmit 2>&1 | tail -5
cd apps/frontend && npx svelte-check --threshold error 2>&1 | tail -5
npm audit --audit-level=high 2>&1 | tail -10
```

Append results to the report.

### Step 6: Commit and Shut Down

```bash
git add REVIEW_*.md PRODUCTION_READINESS_REPORT.md
git commit -m "docs(review): production readiness report $(date +%Y-%m-%d)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Shut down all agents, clean up team.

Print final summary:

```
Production Readiness Review Complete
  Critical blockers: N
  High priority: N
  Recommendation: [SHIP / DO NOT SHIP — fix blockers first]
  Report: PRODUCTION_READINESS_REPORT.md
```

## Arguments

- `$ARGUMENTS`: Optional scope filter
  - (empty) — full monorepo review
  - `--quick` — skip agents 3 and 5, focus on security and test coverage only
  - `--security-only` — spawn only the security auditor
  - `--no-commit` — generate reports but don't commit them

## Examples

- `/prod-readiness` — full pre-release review
- `/prod-readiness --quick` — fast security + test coverage check
- `/prod-readiness --security-only` — before merging a security-sensitive PR
