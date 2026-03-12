---
name: health-check
description: "Use when running codebase quality gates (typecheck, lint, tests, security, dead code, circular deps, audits). Reports pass/fail across all checks without making edits or suggesting fixes. Keywords: health check, pre-PR validation, quality gates, repo diagnostics, CI gates."
---

# Health Check

Full codebase diagnostic: typecheck, tests, security scans, dead code, circular deps, package health. Reports a summary table.

**This skill is headless.** Run each step as a single Bash command, capture the exit code and key output lines, then print the summary table. Do NOT analyze output, suggest fixes, or spawn agents. Just report what passed and what failed.

## NEVER

- Never stop after the first failing gate — report the full picture even with failures.
- Never analyze failures or suggest fixes in the output.
- Never spawn subagents for interpretation.
- Never silently skip missing tools — mark them as `SKIP`.
- Never use this skill to commit, push, or mutate files.

## Scripts

Use the helper instead of retyping the command matrix:

```bash
bash scripts/run-health-check.sh
bash scripts/run-health-check.sh --quick
bash scripts/run-health-check.sh --security-only
bash scripts/run-health-check.sh --code-quality
```

## Gates

Run all gates. Capture exit code and summary line. Do NOT stop on failure.

### TypeCheck (all workspaces)

```bash
npx tsc --noEmit 2>&1; echo "EXIT:$?"
```

Run for each workspace. Capture exit code + error count.

### Tests

```bash
npx vitest run --reporter=dot 2>&1; echo "EXIT:$?"
```

Use `dot` reporter to minimize output. Capture exit code + pass/fail counts.

### Lint

```bash
npx eslint . 2>&1; echo "EXIT:$?"
```

Capture exit code + error/warning counts.

### Semgrep Security Scan

```bash
semgrep scan --config auto --severity ERROR --severity WARNING --quiet 2>&1; echo "EXIT:$?"
```

If `semgrep` not installed: record as `SKIP`.

### Circular Dependencies

```bash
npx madge --circular --ts-config tsconfig.json src/ 2>&1; echo "EXIT:$?"
```

Record `FAIL` if any cycles found.

### Dead Code / Unused Exports

```bash
npx knip --no-progress 2>&1; echo "EXIT:$?"
```

Record `WARN` (not `FAIL`) — knip can be noisy on first run.

### Dependency Vulnerabilities

```bash
npm audit --production 2>&1; echo "EXIT:$?"
# or: pnpm audit --prod
```

`WARN` for low/moderate. `FAIL` for high/critical.

## Summary Table

After all gates complete, print:

```
## Health Check Results

| Gate         | Status | Details                          |
|--------------|--------|----------------------------------|
| TypeCheck    | PASS   | 0 errors                         |
| Tests        | PASS   | 1200 passed, 0 failed            |
| Lint         | PASS   | 0 errors, 3 warnings             |
| Semgrep      | PASS   | 0 findings                       |
| Circular     | PASS   | 0 circular dependencies          |
| Dead Code    | WARN   | 3 unused exports                 |
| Audit        | PASS   | 0 vulnerabilities                |
```

Status values: `PASS`, `FAIL`, `SKIP` (tool not installed), `WARN` (non-zero but non-blocking).

**That's it.** Do not suggest fixes, do not analyze errors, do not read files. Just print the table.

## Arguments

- `--quick`: Skip Semgrep + knip (saves time)
- `--security-only`: Only Semgrep + audit
- `--code-quality`: Only knip + madge + typecheck (skip security + tests)
- If empty: Run all gates

## Customization

Common additions for project-specific gates:

- **OpenAPI lint**: `npx spectral lint openapi.json`
- **Bundle size check**: `npx bundlesize`
- **Package exports**: `npx publint && npx attw --pack`
- **Secret scanning**: `trufflehog git "file://$(pwd)" --only-verified`
