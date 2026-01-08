# Branch Naming Conventions

Consistent branch naming improves clarity, automation, and team collaboration. This guide covers naming strategies for different Git workflows.

## Quick Reference

| Workflow | Main Branch | Feature Branches | Release Branches |
|----------|-------------|------------------|------------------|
| **Trunk-Based** | `main` | `feature/description` | None (use tags) |
| **GitHub Flow** | `main` | `descriptive-name` | None (use tags) |
| **GitFlow** | `main` + `develop` | `feature/description` | `release/x.y.z` |

## General Principles

### Universal Rules

1. **Use lowercase** - Easier to type, no case sensitivity issues
2. **Use hyphens** - Separate words with `-` not `_` or spaces
3. **Be descriptive** - Name should explain what the branch does
4. **Keep it short** - Aim for 2-4 words after prefix
5. **Avoid special characters** - Stick to `a-z`, `0-9`, `-`, `/`
6. **No periods** - Avoid `.` (can cause issues with git refs)

### Pattern

```
<type>/<description>
│       └─ Brief description (2-4 words, kebab-case)
└────────── Branch type (feat, fix, docs, etc.)
```

**Examples:**
```
feature/user-authentication
fix/null-pointer-error
docs/api-reference
refactor/payment-service
chore/update-dependencies
```

## Branch Types

### Development Branches

| Type | Purpose | Examples | Merges To |
|------|---------|----------|-----------|
| `feature/` | New features | `feature/user-dashboard` | `main` or `develop` |
| `feat/` | Alias for feature | `feat/add-charts` | `main` or `develop` |
| `fix/` | Bug fixes | `fix/login-redirect` | `main` or `develop` |
| `bugfix/` | Alias for fix | `bugfix/payment-error` | `main` or `develop` |
| `hotfix/` | Urgent production fixes | `hotfix/security-patch` | `main` AND `develop` |
| `refactor/` | Code refactoring | `refactor/api-client` | `main` or `develop` |
| `perf/` | Performance improvements | `perf/optimize-queries` | `main` or `develop` |
| `test/` | Test additions | `test/integration-suite` | `main` or `develop` |
| `docs/` | Documentation | `docs/setup-guide` | `main` or `develop` |
| `chore/` | Tooling, deps, config | `chore/update-eslint` | `main` or `develop` |
| `style/` | Code style | `style/format-css` | `main` or `develop` |

### Workflow-Specific Branches

**GitFlow Only:**
```
develop                    # Integration branch
release/1.2.0             # Release preparation
release/1.2.0-rc.1        # Release candidate
hotfix/1.2.1              # Production hotfix
support/2.x               # Long-term support
```

**Feature Flags (Trunk-Based):**
```
feature/new-dashboard     # Behind feature flag
experiment/ab-test        # A/B test variant
spike/investigation       # Research/spike
```

## Naming Patterns

### With Issue Numbers

**Format**: `<type>/<issue-number>-<description>`

```
feature/123-user-authentication
fix/456-login-redirect
docs/789-api-reference
```

**When to use:**
- Projects with issue tracking integration
- Need to automatically link branches to issues
- Team prefers explicit traceability

### With Ticket Prefixes

**Format**: `<type>/<ticket-id>-<description>`

```
feature/PROJ-123-user-auth
fix/BUG-456-null-error
chore/MAINT-789-deps
```

**Common prefixes:**
- JIRA: `PROJ-123`
- GitHub: `#123`
- Linear: `APP-123`
- Azure DevOps: `AB#123`

### Personal Branches

**Format**: `<username>/<description>` or `wip/<username>/<description>`

```
alice/prototype-new-ui
bob/experimental-feature
wip/carol/refactor-api
```

**When to use:**
- Experimental work
- Personal prototypes
- Work-in-progress not ready to share
- Collaborative debugging

### Without Prefixes (GitHub Flow Style)

**Simple descriptive names:**

```
user-authentication
fix-login-bug
update-readme
improve-performance
```

**Guidelines:**
- Start with verb (add, fix, update, improve, remove)
- Use present tense
- 2-4 words max
- Self-explanatory

## Examples by Scenario

### New Feature

```bash
# GitFlow
feature/user-dashboard
feature/PROJ-123-dashboard
feature/add-user-dashboard

# GitHub Flow
add-user-dashboard
user-dashboard
implement-dashboard

# Trunk-Based
feature/dashboard
feat/user-dashboard
```

### Bug Fix

```bash
# GitFlow
fix/login-redirect
fix/BUG-456-redirect
bugfix/null-pointer

# GitHub Flow
fix-login-redirect
correct-redirect-logic
handle-null-session

# Trunk-Based
fix/login-redirect
fix/session-null
```

### Production Hotfix

```bash
# GitFlow (version based)
hotfix/1.2.1
hotfix/security-patch
hotfix/1.2.1-auth-bug

# GitHub Flow (same as regular fix)
fix-critical-auth-bug
emergency-security-patch

# Trunk-Based (same as regular fix)
hotfix/auth-vulnerability
hotfix/session-timeout
```

### Refactoring

```bash
# All workflows
refactor/payment-service
refactor/api-client
refactor/database-layer
simplify-auth-logic
```

### Documentation

```bash
# All workflows
docs/api-reference
docs/setup-guide
docs/architecture
update-readme
document-api-endpoints
```

### Dependencies

```bash
# All workflows
chore/update-fastify
chore/deps-security
chore/bump-node-20
update-dependencies
upgrade-typescript
```

### Experimental Work

```bash
# Research/spikes
spike/graphql-migration
spike/performance-test
experiment/ab-test-variant
prototype/new-architecture

# WIP
wip/alice/feature-exploration
wip/refactor-in-progress
draft/new-api-design
```

## Bad Examples (Anti-Patterns)

❌ **Too vague:**
```
feature/updates
fix/bug
improve/stuff
my-branch
test
wip
```

❌ **Too long:**
```
feature/implement-comprehensive-user-authentication-system-with-jwt
fix/resolve-the-critical-bug-where-users-cannot-login-after-password-reset
```

❌ **Wrong separators:**
```
feature_user_auth        # Use hyphens, not underscores
feature.user.auth        # Avoid periods
feature user auth        # Spaces not allowed
featureUserAuth          # Use kebab-case, not camelCase
```

❌ **Special characters:**
```
feature/#123-auth        # Don't include # in branch name
fix/bug@urgent           # Avoid @ symbol
feature/auth(new)        # No parentheses
```

❌ **Version conflicts:**
```
feature/v1.2.3          # Confusing with release tags
fix/2024-01-15          # Use semantic names, not dates
```

## Automation & Conventions

### Auto-Delete Merged Branches

```bash
# .github/workflows/cleanup.yml
name: Auto-delete Merged Branches
on:
  pull_request:
    types: [closed]
jobs:
  delete:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - run: gh api -X DELETE repos/${{ github.repository }}/git/refs/heads/${{ github.head_ref }}
```

### Branch Protection by Pattern

```yaml
# Protect specific patterns
Protected patterns:
  - main
  - develop
  - release/*
  - hotfix/*
```

### CI/CD Triggers by Branch Name

```yaml
# .github/workflows/ci.yml
on:
  push:
    branches:
      - 'feature/**'
      - 'fix/**'
      - 'hotfix/**'
```

### Auto-Label PRs by Branch Name

```yaml
# .github/workflows/auto-label.yml
name: Auto Label
on: [pull_request]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - if: startsWith(github.head_ref, 'feature/')
        run: gh pr edit ${{ github.event.pull_request.number }} --add-label "feature"
      - if: startsWith(github.head_ref, 'fix/')
        run: gh pr edit ${{ github.event.pull_request.number }} --add-label "bug"
```

## Workflow-Specific Guidelines

### Trunk-Based Development

**Philosophy**: Short-lived branches (1-3 days max)

**Recommended:**
```bash
feature/description       # 1-3 day feature
fix/description          # Bug fix
hotfix/description       # Urgent fix
```

**Rules:**
- Max 3 days lifetime
- Delete immediately after merge
- No long-running branches
- Use feature flags for incomplete work

### GitHub Flow

**Philosophy**: Simple, descriptive names

**Recommended:**
```bash
add-feature              # Verb-based
fix-bug                  # Clear purpose
update-docs              # Action-oriented
```

**Rules:**
- Any naming works
- Keep it descriptive
- Delete after merge
- No strict conventions required

### GitFlow

**Philosophy**: Structured, hierarchical branches

**Required:**
```bash
develop                  # Integration branch
main                     # Production branch
feature/description      # Features
release/x.y.z           # Releases
hotfix/x.y.z            # Hotfixes
```

**Rules:**
- Strict prefixes required
- Version numbers for releases
- Merge to multiple branches
- Longer branch lifetimes acceptable

## Best Practices

### 1. Be Consistent

Pick a convention and stick to it across your team:

```bash
# ✅ Consistent
feature/user-auth
feature/api-client
feature/payment-gateway

# ❌ Inconsistent
feature/user-auth
feat/api-client
add-payment-gateway
```

### 2. Make it Scannable

Branch names should be easy to scan in lists:

```bash
# ✅ Good - Clear type prefix
feature/dashboard
fix/login-bug
docs/api-guide

# ❌ Bad - Hard to categorize
user-dashboard-new
login-bug-fix-urgent
api-documentation-update
```

### 3. Include Context

When helpful, include ticket/issue numbers:

```bash
# ✅ Good - Linked to tracking
feature/PROJ-123-user-auth
fix/456-null-pointer

# ✅ Also good - Self-explanatory
feature/user-authentication
fix/handle-null-user
```

### 4. Avoid Redundancy

Don't repeat information:

```bash
# ✅ Good
feature/authentication

# ❌ Redundant
feature/add-new-authentication-feature
```

### 5. Use Present Tense

```bash
# ✅ Good
fix/handle-timeout
add/user-dashboard

# ❌ Past tense
fix/handled-timeout
add/added-user-dashboard
```

## Tools & Enforcement

### Git Hooks

Enforce naming with a pre-push hook:

```bash
# .git/hooks/pre-push
#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
VALID_PATTERN="^(feature|fix|hotfix|docs|refactor|test|chore)\/[a-z0-9-]+$"

if [[ ! $BRANCH =~ $VALID_PATTERN ]]; then
  echo "❌ Branch name '$BRANCH' doesn't follow convention"
  echo "Expected: <type>/<description>"
  echo "Example: feature/user-auth"
  exit 1
fi
```

### GitHub Actions

```yaml
# .github/workflows/branch-name-check.yml
name: Branch Name Check
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Validate branch name
        run: |
          BRANCH="${{ github.head_ref }}"
          if [[ ! $BRANCH =~ ^(feature|fix|hotfix|docs)/[a-z0-9-]+$ ]]; then
            echo "Invalid branch name: $BRANCH"
            exit 1
          fi
```

### Commitlint Configuration

```javascript
// commitlint.config.js
module.exports = {
  rules: {
    'branch-name': [
      2,
      'always',
      /^(feature|fix|hotfix|docs|refactor|test|chore)\/[a-z0-9-]+$/
    ]
  }
};
```

## Migration Strategy

### Adopting New Conventions

**Step 1: Document** - Write down your conventions

**Step 2: Communicate** - Share with team

**Step 3: Enforce** - Add git hooks or CI checks

**Step 4: Migrate** - Rename active branches:

```bash
# Rename branch locally
git branch -m old-name new-name

# Delete old remote branch
git push origin --delete old-name

# Push new branch
git push origin -u new-name
```

**Step 5: Update** - Update branch protection rules

## See Also

- [../workflows/](../workflows/) - Git workflow strategies
- [../commit-templates/](../commit-templates/) - Commit message formats
- [../pr-templates/](../pr-templates/) - Pull request templates
