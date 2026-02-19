---
name: migrate
description: Monorepo migration orchestrator — scripted bulk import path changes, package renames, and file moves with deduplication, type verification, and atomic commits. Use for @portal/* package migrations, import path refactors, and module reorganizations.
---

# Migrate

Orchestrates monorepo migrations: import path changes, package renames, module moves. Uses scripted bulk operations (never file-by-file edits), deduplicates against existing work, verifies types at each step, and commits atomically.

## Pipeline

### Step 1: Deduplication Check (always first)

Before writing a single line, check if this migration was already done:

```bash
git log --oneline -20
grep -r "<new-import-path>" apps/ packages/ --include="*.ts" --include="*.svelte" -l | head -10
```

If the migration is already complete (or partially done), report what exists and ask the user whether to verify/clean up or skip.

### Step 2: Build Migration Manifest

Produce a complete inventory before touching any files:

```bash
# Find all files needing migration
grep -rl "<old-import-path>" apps/ packages/ --include="*.ts" --include="*.tsx" --include="*.svelte" > /tmp/migration-manifest.txt
echo "Files to migrate: $(wc -l < /tmp/migration-manifest.txt)"
cat /tmp/migration-manifest.txt
```

Group files by workspace for parallel execution planning:

- `apps/api/` — backend
- `apps/frontend/` — frontend + SvelteKit
- `packages/` — shared libraries

Print summary:

```
Migration: @portal/shared/server/auth → @portal/server/auth
  apps/api: 12 files
  apps/frontend: 8 files
  packages/server: 3 files
  Total: 23 files
```

Ask the user to confirm before proceeding if total > 20 files or if the change touches `packages/server` or `packages/types` (shared across workspaces).

### Step 3: Scripted Bulk Replacement

Use `sed -i` for each workspace (NOT file-by-file Edit calls):

```bash
# API workspace
grep -rl "@portal/shared/server/auth" apps/api/ --include="*.ts" | \
  xargs sed -i '' "s|@portal/shared/server/auth|@portal/server/auth|g"

# Frontend workspace
grep -rl "@portal/shared/server/auth" apps/frontend/ --include="*.ts" --include="*.svelte" | \
  xargs sed -i '' "s|@portal/shared/server/auth|@portal/server/auth|g"
```

Note: macOS `sed` requires `sed -i ''` (empty string for in-place edit without backup).

### Step 4: Verification Gate

After bulk replacement, verify each workspace compiles:

```bash
# API typecheck
cd apps/api && npx tsc --noEmit 2>&1 | head -30

# Frontend typecheck
cd apps/frontend && npx svelte-check --threshold error 2>&1 | tail -20

# Shared packages
cd packages/server && npx tsc --noEmit 2>&1 | head -20
```

Fix any type errors introduced by the migration. Common causes:

- Import path changed but the exported symbol name also differs → check the actual export
- Package hasn't been built yet → `pnpm --filter @portal/server build`
- Circular dependency introduced → check with `pnpm run check:circular`

### Step 5: Residual Check

Verify no old import paths remain:

```bash
grep -r "<old-import-path>" apps/ packages/ --include="*.ts" --include="*.svelte" -l
```

If any remain, they may be in:

- Dynamically constructed import strings (require manual inspection)
- Test fixture data (strings, not imports — may be intentional)
- Comments or docs (update if they describe the API)

### Step 6: Run Tests

```bash
npx vitest run apps/api --reporter=dot
npx vitest run apps/frontend --reporter=dot
```

If tests fail, determine if it's a mock issue (mock path still points to old module) or a real regression.

### Step 7: Atomic Commit

Stage only the migrated files. Commit with a scope that identifies the migration:

```
refactor(imports): migrate @portal/shared/server/auth → @portal/server/auth

Affects 23 files across apps/api, apps/frontend, packages/server.
All typechecks pass. Full test suite green.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## Common Migration Patterns

Before running, map out your project's source-to-target pairs. Document these in your project-level CLAUDE.md. Examples:

| Pattern             | From (old)          | To (new)           |
| ------------------- | ------------------- | ------------------ |
| Package rename      | `@company/old-pkg`  | `@company/new-pkg` |
| Path restructure    | `@app/shared/utils` | `@app/core/utils`  |
| Index consolidation | `./auth/helpers`    | `./auth/index`     |
| Framework alias     | `$lib/server/*`     | `src/lib/server/*` |

## Arguments

- `$ARGUMENTS`: Migration description
  - `"@old/pkg/utils → @new/pkg/utils"` — import path migration
  - `"move packages/server/src/auth.ts to packages/server/src/auth/index.ts"` — file move
  - `"rename @company/old-shared → @company/core"` — package rename
  - If empty, ask for source and target

## Anti-Patterns

- **Never use Edit tool file-by-file** for bulk migrations — use `grep | xargs sed` instead
- **Never migrate before deduplication check** — duplicate migrations cause import conflicts
- **Never commit without typecheck** — silent import breakage is worse than a failed commit
- **Never skip the residual check** — 2 files left pointing to the old path can cause subtle runtime errors
