# Branch Naming Guide

Standards and conventions for naming Git branches across different workflows.

## Contents

- **[conventions.md](./conventions.md)** - Comprehensive branch naming guide
  - General principles and patterns
  - Workflow-specific conventions (Trunk-Based, GitHub Flow, GitFlow)
  - Examples and anti-patterns
  - Automation and enforcement strategies

## Quick Start

### Choose Your Convention

**Trunk-Based / GitHub Flow:**
```bash
feature/short-description
fix/bug-description
docs/documentation-update
```

**GitFlow:**
```bash
feature/description
release/1.2.0
hotfix/1.2.1
```

### Core Rules

1. Use lowercase
2. Separate words with hyphens
3. Use descriptive names (2-4 words)
4. Include type prefix: `feature/`, `fix/`, `docs/`, etc.
5. Keep it short and clear

## Examples

✅ **Good:**
```bash
feature/user-authentication
fix/login-redirect
docs/api-reference
chore/update-deps
```

❌ **Bad:**
```bash
my-branch                # Too vague
feature_user_auth        # Wrong separator
feature/add-comprehensive-user-authentication-with-jwt  # Too long
fix/bug                  # Not descriptive
```

## Enforcement

### Git Hook

```bash
# .git/hooks/pre-push
#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ ! $BRANCH =~ ^(feature|fix|docs)\/[a-z0-9-]+$ ]]; then
  echo "Invalid branch name: $BRANCH"
  exit 1
fi
```

### GitHub Actions

```yaml
# .github/workflows/branch-check.yml
name: Branch Name Check
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: |
          BRANCH="${{ github.head_ref }}"
          [[ $BRANCH =~ ^(feature|fix)/[a-z0-9-]+$ ]] || exit 1
```

## See Also

- [../workflows/](../workflows/) - Git workflow strategies
- [../commit-templates/](../commit-templates/) - Commit message templates
- [../pr-templates/](../pr-templates/) - Pull request templates
