---
name: health-check
description: |
  Run all quality gates across the codebase and print pass/fail results without analysis or edits.

  Use when user mentions:
  - "run the full health check"
  - "validate the repo before PR"
  - "run types tests lint and security gates"
---

# Health Check

Full codebase diagnostic: typecheck, tests, security scans, dead code, circular deps, package health. Reports a summary table.

**This skill is headless.** Run each step as a single Bash command, capture the exit code and key output lines, then print the summary table. Do NOT analyze output, suggest fixes, or spawn agents. Just report what passed and what failed.

## Load this skill when

- the user wants one command-style report across standard repo gates
- the goal is pass/fail visibility, not diagnosis
- the task is pre-PR validation, phase closeout, or routine repo monitoring

## Scripts

Use the helper instead of retyping the command matrix:

```bash
bash scripts/run-health-check.sh
bash scripts/run-health-check.sh --quick
bash scripts/run-health-check.sh --security-only
bash scripts/run-health-check.sh --code-quality
```

## Do NOT load this skill when

- the user wants root-cause analysis or a bugfix plan
- the task is a focused review like API drift or security-only review
- the workflow should commit, push, or mutate files

## NEVER

- Never stop after the first failing gate; this skill is meant to report the full picture.
- Never analyze failures or suggest fixes in the output.
- Never spawn subagents for interpretation; this skill is intentionally headless.
- Never silently skip missing tools without marking them as `SKIP`.

## Steps

Run all steps. Capture exit code and summary line from each. Do NOT stop on failure — run everything and report at the end.

### 1. Type Check (all workspaces)

```bash
npx tsc --noEmit 2>&1; echo "EXIT:$?"
```

Run for each workspace in the project. Capture exit code + error count.

### 2. Full Test Suite

```bash
npx vitest run --reporter=dot 2>&1; echo "EXIT:$?"
```

Use `dot` reporter to minimize output. Capture exit code + pass/fail counts.

### 3. Lint

```bash
npx eslint . 2>&1; echo "EXIT:$?"
```

Capture exit code + error/warning counts.

### 4. Semgrep Security Scan

```bash
semgrep scan --config auto --severity ERROR --severity WARNING --quiet 2>&1; echo "EXIT:$?"
```

If `semgrep` is not installed, record as SKIP.

### 5. Circular Dependency Check

```bash
npx madge --circular --ts-config tsconfig.json src/ 2>&1; echo "EXIT:$?"
```

Capture exit code + cycle count. Record FAIL if any cycles found.

### 6. Dead Code / Unused Exports

```bash
npx knip --no-progress 2>&1; echo "EXIT:$?"
```

Record WARN (not FAIL) — knip can be noisy on first run.

### 7. Dependency Vulnerabilities

```bash
npm audit --production 2>&1; echo "EXIT:$?"
```

Or `pnpm audit --prod` for pnpm projects. Record WARN for low/moderate, FAIL for high/critical.

## Summary Table

After all steps complete, print:

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

Status values: `PASS`, `FAIL`, `SKIP` (tool not installed), `WARN` (non-zero findings but non-blocking).

**That's it.** Do not suggest fixes, do not analyze errors, do not read files. Just print the table.

## Arguments

- `$ARGUMENTS`: Optional flags:
  - `--quick`: Skip Semgrep + knip (saves time)
  - `--security-only`: Only Semgrep + audit
  - `--code-quality`: Only knip + madge + typecheck (skip security + tests)
  - If empty: Run all gates

## Customization

Add project-specific gates by extending the steps list. Common additions:

- **OpenAPI lint**: `npx spectral lint openapi.json`
- **Bundle size check**: `npx bundlesize`
- **Package exports**: `npx publint && npx attw --pack`
- **Secret scanning**: `trufflehog git "file://$(pwd)" --only-verified`
