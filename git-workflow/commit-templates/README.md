# Commit Message Templates

Pre-filled templates for writing consistent, informative commit messages following Conventional Commits specification.

## Available Templates

| Template | Type | Use When |
|----------|------|----------|
| **feature-template.txt** | `feat:` | Adding new features or functionality |
| **fix-template.txt** | `fix:` | Fixing bugs or incorrect behavior |
| **breaking-change-template.txt** | `feat!:` | Making breaking changes to API/behavior |
| **refactor-template.txt** | `refactor:` | Restructuring code without changing behavior |
| **chore-template.txt** | `chore:` | Dependencies, build config, CI/CD changes |
| **docs-template.txt** | `docs:` | Documentation updates only |
| **perf-template.txt** | `perf:` | Performance optimizations |

## Quick Start

### Option 1: Copy Template Content

```bash
# Copy a template for one-time use
cat git-workflow/commit-templates/feature-template.txt

# Write commit with the template structure
git commit
# Then paste the template and fill in the details
```

### Option 2: Set as Git Commit Template

Configure git to use a template for all commits in a project:

```bash
# Set feature template as default for this repo
git config commit.template git-workflow/commit-templates/feature-template.txt

# Or set globally for all your repos
git config --global commit.template ~/path/to/feature-template.txt
```

When you run `git commit`, your editor will open with the template pre-filled.

### Option 3: Use with Git Aliases

Create git aliases for quick access:

```bash
# Add to ~/.gitconfig
[alias]
    feat = "!git commit --template=git-workflow/commit-templates/feature-template.txt"
    fix = "!git commit --template=git-workflow/commit-templates/fix-template.txt"
    docs = "!git commit --template=git-workflow/commit-templates/docs-template.txt"
    refactor = "!git commit --template=git-workflow/commit-templates/refactor-template.txt"
    chore = "!git commit --template=git-workflow/commit-templates/chore-template.txt"
    perf = "!git commit --template=git-workflow/commit-templates/perf-template.txt"
    breaking = "!git commit --template=git-workflow/commit-templates/breaking-change-template.txt"
```

Usage:
```bash
git feat    # Opens feature template
git fix     # Opens fix template
git docs    # Opens docs template
```

### Option 4: Shell Functions

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Commit with template selection
gct() {
  local template_dir="git-workflow/commit-templates"
  local template="$1"

  case "$template" in
    feat|feature)
      git commit --template="$template_dir/feature-template.txt"
      ;;
    fix)
      git commit --template="$template_dir/fix-template.txt"
      ;;
    break|breaking)
      git commit --template="$template_dir/breaking-change-template.txt"
      ;;
    refactor)
      git commit --template="$template_dir/refactor-template.txt"
      ;;
    chore)
      git commit --template="$template_dir/chore-template.txt"
      ;;
    docs)
      git commit --template="$template_dir/docs-template.txt"
      ;;
    perf)
      git commit --template="$template_dir/perf-template.txt"
      ;;
    *)
      echo "Usage: gct {feat|fix|breaking|refactor|chore|docs|perf}"
      return 1
      ;;
  esac
}
```

Usage:
```bash
gct feat      # Commit with feature template
gct fix       # Commit with fix template
gct breaking  # Commit with breaking change template
```

## Template Structure

Each template includes:

1. **Subject Line** - Format: `type(scope): description`
2. **Comment Sections** - Guidance on what to include (lines starting with `#`)
3. **Body** - Detailed explanation (optional but recommended)
4. **Footer** - Issue references, breaking changes

**Comment lines** (starting with `#`) are **automatically removed** by git. They're there to guide you, not appear in the final commit.

## Template Guidelines

### Subject Line

```
type(scope): brief description
│    │       └─ Present tense, imperative mood, lowercase
│    └─────────── Optional: component/module affected
└──────────────── feat, fix, docs, refactor, chore, perf, test
```

**Examples:**
```
feat(auth): add JWT token refresh
fix(api): handle null database response
docs(readme): update installation steps
```

### Body

Use the body to explain:
- **Why** the change was needed
- **What** was changed
- **How** it was implemented (if complex)

**Wrap at 72 characters** for readability in git log.

### Footer

Use footer for:
- **Issue references**: `Fixes #123`, `Closes #456`
- **Breaking changes**: `BREAKING CHANGE: description`
- **Co-authors**: `Co-authored-by: Name <email>`

## Real-World Examples

### Feature Addition

```
feat(dashboard): add user activity chart

Implements interactive chart showing daily active users over time.
Uses LayerChart + D3 for smooth animations and responsive design.

The chart supports:
- Date range selection (7d, 30d, 90d, 1y)
- Hover tooltips with detailed metrics
- Export to PNG/SVG

Closes #234
```

### Bug Fix

```
fix(auth): prevent session timeout during active use

Users were getting logged out after 30 minutes even while actively
using the app. Modified session middleware to extend expiration on
each authenticated request.

Root cause: Session expiration was set once at login and never
refreshed, causing timeouts regardless of activity.

Fixes #567
```

### Breaking Change

```
feat(api)!: change pagination format in list endpoints

BREAKING CHANGE: All list endpoints now return paginated results.

Before:
{
  "users": [...]
}

After:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 50,
    "total": 250
  }
}

Migration: Update API clients to handle new response format.
All list endpoints (/users, /posts, /workouts) are affected.

Closes #789
```

### Performance Optimization

```
perf(db): optimize workout queries with composite index

Added composite index on (user_id, workout_date) columns in workouts
table to speed up the most common query pattern.

Before: 450ms average query time
After:  12ms average query time
Improvement: 97% faster (37.5x speedup)

Benchmark: 10,000 queries against production-like dataset (1M rows)
using hyperfine for timing measurements.

Closes #456
```

## Enforcement with Commitlint

To enforce conventional commits in your project:

```bash
# Install
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Configure (.commitlintrc.json)
{
  "extends": ["@commitlint/config-conventional"]
}

# Add pre-commit hook (.husky/commit-msg)
#!/bin/bash
npx --no -- commitlint --edit "$1"
```

## See Also

- [conventional-commits.md](./conventional-commits.md) - Full specification and guide
- [../workflows/](../workflows/) - Git workflow strategies
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
