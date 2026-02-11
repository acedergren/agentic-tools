# quality-commit - Standardized Quality Gates for Git

**Version**: 1.0.0
**Status**: Production-Ready
**Framework**: OCI Self-Service Portal (SvelteKit + Fastify + shared packages)

## What This Skill Does

Automates the multi-step commit workflow: lint staged changes, run type checks, security scan (Semgrep), execute tests, and commit with conventional message format — all in one command. Replaces manual multi-step processes that frequently cause pre-commit hook friction.

## Problem It Solves

**Before**: Developers manually run:
1. eslint on staged files
2. tsc/svelte-check for types
3. semgrep for security
4. vitest for affected tests
5. git commit with message
6. (optional) git push

Each step can fail silently, miss files, or require manual recovery. Pre-commit hooks catch failures after work is already done.

**After**: Single command runs all quality gates in order, with clear exit on first failure.

## Key Features

### Scoped Quality Gates
- **Lint**: Only checks staged files, workspace-specific (frontend/api/shared)
- **TypeCheck**: Only affected workspaces (not entire monorepo)
- **Semgrep**: Scans one file at a time (bug workaround in Semgrep 1.146.0+)
- **Tests**: Discovers colocated `.test.ts` files and runs only those
- **Commit**: Conventional message format with Co-Authored-By trailer

### Workspace Intelligence
- Detects which packages have staged changes (frontend, api, shared)
- Runs lint/tsc/tests only on affected workspaces
- Avoids full monorepo builds

### Optional Enhancements
- `--review`: Include CodeRabbit code review (slower, ~30s)
- `--push`: After successful commit, run semgrep on committed files and push
- `--dry-run`: Validate all gates but skip commit/push
- `--message "..."`: Custom commit message instead of auto-generate

### Error Recovery
- Prints specific errors on gate failure
- Stops immediately (no auto-fix attempts)
- Leaves staged changes intact for manual remediation
- Re-run `/quality-commit` after fixing

## Usage Examples

**Standard flow** (lint, typecheck, semgrep, tests, commit):
```bash
/quality-commit
```

**Full validation with CodeRabbit review**:
```bash
/quality-commit --review
```

**Validate everything but don't commit**:
```bash
/quality-commit --dry-run
```

**Commit and push**:
```bash
/quality-commit --push
```

**Full flow with review and push**:
```bash
/quality-commit --review --push
```

**Custom commit message**:
```bash
/quality-commit --message "fix(security): add IPv6 SSRF checks"
```

## Technical Details

### Monorepo Workspace Detection
```bash
STAGED=$(git diff --cached --name-only --diff-filter=ACMR)
# Categorize into frontend, api, shared
```

### Semgrep Bug Workaround
Semgrep 1.146.0–1.151.0+ crashes with `Invalid_argument: invalid path` when given multiple files.
**Solution**: Scan each file individually and aggregate findings.

### Test Discovery
For each staged `.ts`/`.svelte` file, looks for colocated `.test.ts`:
- `src/lib/auth/rbac.ts` → `src/lib/auth/rbac.test.ts`
- `src/routes/chat.ts` → `src/routes/chat.test.ts`

### Commit Message Format
```
type(scope): description

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

**Types**: feat, fix, refactor, test, docs, chore
**Scopes**: security, phaseX.Y, api, frontend, database, auth, workflows

## Gate Details

### 1. Lint
- **Frontend**: `cd apps/frontend && npx eslint <files>`
- **API**: `cd apps/api && npx eslint <files>`
- **Shared**: `cd packages/shared && npx eslint <files>`

### 2. Type Check
- **Frontend**: `npx svelte-check --tsconfig ./tsconfig.json --threshold error`
- **API**: `npx tsc --noEmit`
- **Shared**: `npx tsc --noEmit`

### 3. Semgrep Security
- Config: `auto` (uses default rules)
- Scans one file at a time
- Blocks on critical/high findings
- Warns on medium/low findings

### 4. CodeRabbit (Optional)
- Command: `coderabbit review --plain -t uncommitted`
- Blocks on critical findings
- Requires `--review` flag to enable

### 5. Tests
- Discovers colocated `.test.ts` files
- Runs: `npx vitest run <test-files> --reporter=verbose`
- Blocks on test failures

### 6. Commit
- Stages all changes
- Commits with conventional message format

### 7. Push (Optional)
- Requires `--push` flag
- Re-scans committed files with Semgrep (security gate)
- Pushes to remote: `git push` or `git push -u origin $BRANCH`

## Installation

```bash
# Copy to Claude Code skills directory
cp -r quality-commit ~/.agents/skills/

# Or for Cursor
cp -r quality-commit ~/.cursor/skills/
```

## Requirements

- **pnpm** (monorepo manager)
- **eslint** (frontend, api, shared)
- **svelte-check** (frontend type check)
- **tsc** (api, shared type check)
- **vitest** (test runner)
- **semgrep** (optional, security scanning)
- **coderabbit** CLI (optional, requires `--review` flag)

## Anti-Patterns & Gotchas

### NEVER
1. **Run without staging first** - Ensure changes are staged with `git add` before calling `/quality-commit`
2. **Auto-fix lint errors you didn't introduce** - Let hook failures happen, fix them cleanly, then retry
3. **Commit unrelated changes** - Stage only the feature/fix you're working on
4. **Skip Semgrep on security changes** - Always review Semgrep findings before pushing
5. **Push with critical CodeRabbit findings** - Address critical issues first

### Be Aware
- Lint is workspace-scoped, not global
- Tests are file-discovery based (look for `.test.ts` colocated with source)
- Semgrep has a known multi-file bug (scans one file at a time)
- Pre-existing lint errors in unrelated files won't block you
- TypeCheck errors will block commit (as intended)

## Framework Integration

Designed for:
- **Frontend**: SvelteKit (adapter-node)
- **API**: Fastify 5
- **Testing**: Vitest 4
- **Monorepo**: pnpm
- **CI/CD**: GitHub Actions (compatible with pre-push hooks)

## Exit Status

- **0**: All gates passed, commit created (and pushed if `--push` was used)
- **1**: A gate failed (see error output for details)
- **1**: No staged changes found

## Summary Output

On success, prints a gate summary table:
```
| Gate        | Status | Details                    |
|-------------|--------|----------------------------|
| Lint        | PASS   | 5 files, 0 errors          |
| TypeCheck   | PASS   | api + frontend             |
| Semgrep     | PASS   | 0 findings                 |
| CodeRabbit  | SKIP   | (use --review to enable)   |
| Tests       | PASS   | 3 test files, 12 tests     |
| Commit      | DONE   | abc1234                    |
| Push        | SKIP   | (use --push to enable)     |
```

## See Also

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semgrep Rules](https://semgrep.dev/r)
- [Vitest Documentation](https://vitest.dev/)
- [ESLint Configuration](https://eslint.org/docs/rules/)

