# Trunk-Based Development

Fast-paced workflow with a single main branch and short-lived feature branches. Ideal for teams with strong CI/CD and automated testing.

## Overview

**Philosophy**: Small, frequent integrations to main branch. Feature flags for incomplete work.

**Best For**:
- High-velocity teams
- Microservices
- Continuous deployment
- Strong automated testing

**Not Ideal For**:
- Projects requiring long-lived release branches
- Teams without strong CI/CD
- Low test coverage codebases

## Branch Strategy

```
main (protected, always deployable)
  ↓
feature/short-lived-branch (1-3 days max)
  ↓
main (merge quickly)
```

### Branch Types

1. **`main`** - The trunk (always deployable)
   - Protected branch
   - All merges via PR
   - Requires passing CI
   - Auto-deploys to staging

2. **`feature/*`** - Short-lived feature branches
   - Max lifetime: 1-3 days
   - Created from: `main`
   - Merged to: `main`
   - Deleted after merge

3. **`hotfix/*`** - Emergency production fixes
   - Created from: `main`
   - Merged to: `main`
   - High priority CI/CD

## Workflow Steps

### 1. Create Feature Branch

```bash
# Start from latest main
git checkout main
git pull origin main

# Create short-lived feature branch
git checkout -b feature/user-authentication

# Work in small increments
git commit -m "feat(auth): add login endpoint"
git commit -m "feat(auth): add JWT validation"
```

### 2. Keep Branch Fresh

```bash
# Rebase frequently (at least daily)
git checkout main
git pull origin main
git checkout feature/user-authentication
git rebase main

# Fix conflicts immediately
git rebase --continue
```

### 3. Create Pull Request

```bash
# Push to remote
git push origin feature/user-authentication

# Create PR immediately (don't wait for completion)
gh pr create --title "feat(auth): add user authentication" \
  --body "Implements JWT-based auth. **WIP - not ready for review yet**"
```

### 4. Merge Quickly

```bash
# Once CI passes and reviewed, squash merge
gh pr merge --squash --delete-branch
```

## Feature Flags

Use feature flags for incomplete work:

```javascript
// Enable for testing, disable in production
if (featureFlags.newAuth) {
  return authenticateWithJWT(req);
} else {
  return authenticateWithSession(req);
}
```

**Benefits:**
- Merge incomplete code safely
- Test in production incrementally
- No long-lived branches
- Easy rollback

## Branch Naming

```bash
feature/short-description    # New features
fix/bug-description          # Bug fixes
refactor/what-changes        # Code refactoring
docs/what-documented         # Documentation
test/what-tested             # Test additions
chore/what-changed           # Build/config changes
hotfix/critical-issue        # Production hotfixes
```

**Rules:**
- Max 3 words after prefix
- No ticket numbers in branch name (use PR/commits)
- Keep branches alive < 3 days

## Commit Strategy

**Conventional Commits** with optional scope:

```bash
feat(auth): add JWT token generation
fix(api): handle null user gracefully
refactor(db): optimize query performance
docs(readme): update installation steps
test(auth): add login integration tests
chore(deps): bump fastify to 5.0.0
```

**Size Guidelines:**
- Commits: Small, focused changes
- PRs: Should be reviewable in < 30 minutes
- Branches: Merge within 1-3 days

## Pull Request Process

### PR Template

```markdown
## Description
What does this PR do?

## Type of Change
- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Deployment Notes
- [ ] No breaking changes
- [ ] Database migrations required: No
- [ ] Feature flag: `feature.newAuth` (off by default)
```

### Review Requirements

- **Size**: < 400 lines changed
- **Time**: Reviewed within 4 hours
- **CI**: All checks must pass
- **Approvals**: 1 approval (team lead for complex changes)

### Merge Strategy

**Squash Merge** (recommended):
```bash
gh pr merge --squash --delete-branch
```

**Benefits:**
- Clean, linear history
- One commit per feature
- Easy to revert
- Simplified changelog

## CI/CD Integration

### Pre-Merge Checks

```yaml
# .github/workflows/pr-checks.yml
name: PR Checks
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run build
```

### Auto-Deploy on Merge

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm run deploy:staging
```

## Branch Protection Rules

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["test", "lint", "build"]
  },
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "required_linear_history": true,
  "allow_force_pushes": false
}
```

## Metrics & KPIs

Track these metrics to ensure healthy trunk-based development:

- **Branch Age**: < 3 days average
- **PR Size**: < 400 lines average
- **Review Time**: < 4 hours average
- **Merge Frequency**: > 10 merges/day
- **Build Success Rate**: > 95%
- **Deployment Frequency**: > 1/day

## Common Patterns

### Breaking Up Large Features

```bash
# Phase 1: Add new API endpoint (feature flag off)
git checkout -b feature/new-api-endpoint
# Merge to main

# Phase 2: Add client integration (feature flag off)
git checkout -b feature/client-integration
# Merge to main

# Phase 3: Enable feature flag in test environments
git checkout -b feature/enable-test-env
# Merge to main

# Phase 4: Gradual rollout to production
# Update feature flag config (no code change)
```

### Handling Hotfixes

```bash
# Create from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-auth-bug

# Fix and test
git commit -m "fix(auth): prevent null pointer in JWT validation"

# Fast-track PR (skip normal review SLA)
gh pr create --label "hotfix" --priority "urgent"

# Deploy immediately after merge
gh pr merge --squash
# Auto-deploys to production
```

## Migration from GitFlow

1. **Stop creating release branches** - Deploy main directly
2. **Remove develop branch** - Merge to main instead
3. **Enable feature flags** - Control rollout without branches
4. **Improve CI/CD** - Automated testing and deployment
5. **Reduce branch lifetime** - Aim for < 3 days
6. **Train team** - Frequent integration mindset

## Tools & Automation

### Stale Branch Cleanup

```bash
# .github/workflows/cleanup-branches.yml
name: Cleanup Stale Branches
on:
  schedule:
    - cron: '0 0 * * *'  # Daily
jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Delete stale branches
        run: |
          gh api repos/${{ github.repository }}/branches \
            --jq '.[] | select(.name != "main") | .name' \
            | xargs -I {} gh api -X DELETE repos/${{ github.repository }}/git/refs/heads/{}
```

### Branch Age Warning

```bash
# .github/workflows/branch-age-check.yml
name: Branch Age Check
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check branch age
        run: |
          DAYS=$(( ( $(date +%s) - $(git log -1 --format=%ct origin/${{ github.head_ref }}) ) / 86400 ))
          if [ $DAYS -gt 3 ]; then
            echo "⚠️ Branch is $DAYS days old. Consider splitting into smaller PRs."
            exit 1
          fi
```

## Best Practices

1. **Commit Early, Commit Often** - Don't wait for "perfect" code
2. **Rebase Daily** - Keep feature branches fresh
3. **Small PRs** - Aim for < 400 lines, < 30 min review time
4. **Feature Flags** - Allow merging incomplete features
5. **Automated Testing** - Trust CI, not manual QA gates
6. **Monitor Main** - Alert on broken builds immediately
7. **Deploy Frequently** - Reduce deployment risk with small changes

## Anti-Patterns to Avoid

❌ **Long-Lived Branches** - Branches older than 3 days
❌ **Large PRs** - > 1000 lines changed
❌ **Direct Commits to Main** - Always use PRs
❌ **Manual Testing Gates** - Automate or remove
❌ **Waiting for "Perfect"** - Merge behind feature flags
❌ **Cherry-Picking** - Use proper merges instead
❌ **Release Branches** - Deploy main directly

## Resources

- [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/)
- [Feature Flags Best Practices](https://martinfowler.com/articles/feature-toggles.html)
- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
