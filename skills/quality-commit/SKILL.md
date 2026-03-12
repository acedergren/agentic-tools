---
name: quality-commit
description: "Use when committing code changes. Runs lint, typecheck, Semgrep security scan, optional CodeRabbit review, and related tests before creating a quality-gated commit. Flags: --review, --push, --dry-run, --message. Keywords: commit, quality gates, lint, typecheck, semgrep, coderabbit, stage, push."
---

# Quality Commit

Run all quality gates on staged changes, then commit. Replaces manual multi-step commit prep that frequently causes pre-commit hook friction.

## NEVER

- Never run `git add .` or `git add -A` — always stage specific files by name.
- Never commit after partial gate failures by bypassing hooks — gates exist for correctness.
- Never let optional tools (CodeRabbit, Semgrep) block the workflow when not installed — skip with warning.
- Never widen scope to unrelated repo cleanup during commit prep.
- Never attempt to auto-fix gate failures and retry — report errors, let the agent fix first.

## Decision: What Gates to Run

```
Has staged files?
├─ No → Print warning, exit
└─ Yes →
    ├─ Always: Lint → TypeCheck → Semgrep → Tests → Commit
    ├─ --review or --full: Add CodeRabbit (slow, ~30s) before commit
    └─ --push: After commit, Semgrep committed files, push to remote
```

## Gate Execution

### Scope detection
```bash
STAGED=$(git diff --cached --name-only --diff-filter=ACMR)
bash scripts/classify-staged-files.sh  # categorizes into frontend/api/shared
```

### Semgrep: file-at-a-time (critical workaround)
Semgrep 1.146.0+ crashes with multiple file arguments (`Invalid_argument: invalid path`). Always loop:
```bash
for f in $STAGED_FILES; do
  semgrep scan --config auto --json "$f" 2>/dev/null || true
done
```
Block on critical/high findings. Warn on medium/low. Skip if not installed.

### TypeCheck workspace commands
- **frontend**: `npx svelte-check --tsconfig ./tsconfig.json --threshold error` (11 pre-existing errors in test files are known baseline — ignore)
- **api**: `npx tsc --noEmit`
- **shared**: `npx tsc --noEmit`

### Related test discovery
```bash
node scripts/find-related-tests.js <staged-file>
# src/lib/server/auth/rbac.ts → src/lib/server/auth/rbac.test.ts
```
Run discovered tests: `npx vitest run <test-files> --reporter=verbose`

### Commit message format
```
type(scope): description

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```
Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
Scopes: `security`, `phaseX.Y`, `api`, `frontend`, `database`, `auth`, `workflows`

## Push flow (--push only)

1. Re-run Semgrep on committed files (same file-at-a-time loop, use `git diff --name-only HEAD~1`)
2. Detect upstream: `git rev-parse --abbrev-ref @{u} 2>/dev/null`
3. If no upstream: `git push -u origin $BRANCH`, else `git push`
4. Abort push on critical/high Semgrep findings — commit stays intact, do NOT undo it

## Summary table

```
| Gate       | Status | Details                    |
|------------|--------|----------------------------|
| Lint       | PASS   | 5 files, 0 errors          |
| TypeCheck  | PASS   | api + frontend             |
| Semgrep    | PASS   | 0 findings                 |
| CodeRabbit | SKIP   | (use --review to enable)   |
| Tests      | PASS   | 3 test files, 12 tests     |
| Commit     | DONE   | abc1234                    |
| Push       | SKIP   | (use --push to enable)     |
```

## Arguments

- (empty): lint + typecheck + semgrep + tests + commit
- `--review` / `--full`: Add CodeRabbit review
- `--dry-run`: Run all gates, skip actual commit and push
- `--push`: Commit then semgrep + push to remote
- `--message "..."`: Use custom commit message
