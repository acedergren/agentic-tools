# GitHub Flow

Simple, lightweight workflow centered around pull requests. Ideal for continuous deployment and web applications.

## Overview

**Philosophy**: Deploy from main frequently. Use feature branches and PRs for all changes.

**Best For**:
- Web applications
- Continuous deployment
- Small to medium teams
- SaaS products

**Not Ideal For**:
- Scheduled releases
- Multiple production versions
- Complex release coordination

## Branch Strategy

```
main (always deployable)
  ↓
feature-branch (development)
  ↓
Pull Request (review + CI)
  ↓
main (merge + deploy)
```

### Branch Types

1. **`main`** - Production code
   - Protected branch
   - Always deployable
   - Auto-deploys on merge
   - Required PR reviews

2. **`<descriptive-name>`** - Feature/fix branches
   - Created from: `main`
   - Merged to: `main`
   - Deleted after merge
   - Any naming convention

## Workflow Steps

### 1. Create Branch

```bash
# Start from main
git checkout main
git pull origin main

# Create descriptive branch
git checkout -b add-user-authentication
# OR
git checkout -b fix-login-redirect
# OR
git checkout -b update-api-docs
```

### 2. Make Changes & Commit

```bash
# Develop with frequent commits
git add src/auth/
git commit -m "Add JWT token generation"

git add tests/auth/
git commit -m "Add authentication tests"

git add docs/
git commit -m "Document new auth endpoints"
```

### 3. Open Pull Request Early

```bash
# Push to remote
git push origin add-user-authentication

# Create PR immediately (even if not ready)
gh pr create --title "Add user authentication" \
  --body "## Description
  Implements JWT-based user authentication

  ## Status
  🚧 Work in Progress

  ## TODO
  - [x] Add token generation
  - [ ] Add token validation
  - [ ] Add integration tests
  - [ ] Update documentation"
```

**Benefits of Early PR:**
- Get feedback early
- Show progress to team
- Enable discussion
- CI runs on every push

### 4. Discuss and Review

```bash
# Team reviews and comments
# Make changes based on feedback

git commit -m "Add token validation per review"
git push origin add-user-authentication

# PR automatically updates
```

### 5. Deploy to Staging

```bash
# Automatic staging deployment from PR
# Review app URL: https://pr-123.staging.example.com

# Manual staging deploy if needed
gh pr deploy --environment staging
```

### 6. Merge and Deploy

```bash
# Once approved and CI passes
gh pr merge --squash --delete-branch

# Automatic production deployment triggered
# Monitor deployment and rollback if needed
```

## Branch Naming

**Simple, descriptive names:**

```bash
# Good examples
add-user-authentication
fix-payment-bug
update-readme
refactor-api-client
improve-performance

# Also acceptable
feature/user-auth
fix/payment-issue
docs/api-reference

# Avoid
PROJ-123
my-changes
wip
test
```

**Guidelines:**
- Use lowercase with hyphens
- Descriptive of the change
- No strict convention required
- Delete immediately after merge

## Commit Messages

**Simple format (not strictly enforced):**

```bash
# Good commits
Add JWT authentication
Fix null pointer in payment processor
Update API documentation
Refactor database connection logic

# Also acceptable (Conventional Commits)
feat: add JWT authentication
fix: handle null payment
docs: update API reference
refactor: simplify db connection
```

**For breaking changes:**
```bash
BREAKING CHANGE: Redesign authentication API

The /login endpoint now requires email instead of username.
All clients must be updated.
```

## Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactor

## How to Test
1. Checkout branch
2. Run `npm install`
3. Run `npm test`
4. Visit http://localhost:3000/login

## Screenshots (if applicable)
[Add screenshots of UI changes]

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] CI passing
- [ ] Ready for review
```

## Review Process

### Review Requirements

- **1 approval** minimum (small changes)
- **2 approvals** for large/critical changes
- **CI must pass** before merge
- **Conflicts resolved** with main

### Review Guidelines

**What to check:**
- Code quality and readability
- Test coverage
- Documentation updates
- Performance impact
- Security concerns

**Comment examples:**
```markdown
✅ LGTM! (Looks good to me)
💭 Consider extracting this into a helper function
❓ Why did we choose this approach over X?
🐛 This might cause a bug when...
🎨 Nit: Small style suggestion
```

## Deployment Strategy

### Automatic Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm run deploy:production

  notify:
    runs-on: ubuntu-latest
    needs: deploy
    steps:
      - name: Notify team
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -d '{"text":"🚀 Deployed to production: ${{ github.event.head_commit.message }}"}'
```

### Manual Deployment (if needed)

```bash
# Deploy specific commit
git checkout main
git pull origin main
npm run deploy:production

# Or use GitHub Actions
gh workflow run deploy.yml
```

## CI/CD Pipeline

### PR Checks

```yaml
# .github/workflows/pr-checks.yml
name: PR Checks
on:
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit
      - run: npm run security-scan

  preview-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy:preview
      - name: Comment preview URL
        run: |
          gh pr comment ${{ github.event.pull_request.number }} \
            --body "Preview deployed: https://pr-${{ github.event.pull_request.number }}.preview.example.com"
```

## Branch Protection Rules

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["test", "lint", "security"]
  },
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false
  },
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

## Hotfix Process

**Same as regular features** - GitHub Flow doesn't distinguish:

```bash
# Critical bug found
git checkout main
git pull origin main
git checkout -b fix-critical-auth-bug

# Fix immediately
git commit -m "Fix null pointer in auth"

# Fast-track PR
gh pr create --title "HOTFIX: Fix critical auth bug" \
  --label "hotfix" \
  --label "urgent"

# Review and merge quickly
gh pr merge --squash --delete-branch

# Auto-deploys to production
```

## Rollback Strategy

### Quick Rollback

```bash
# Option 1: Revert commit
git revert HEAD
git push origin main
# Auto-deploys fixed version

# Option 2: Deploy previous version
git checkout <previous-commit>
npm run deploy:production
```

### Via GitHub

```bash
# Create revert PR
gh pr create --title "Revert: Add user authentication" \
  --body "Reverting due to production issue"

# Merge immediately
gh pr merge --squash
```

## Best Practices

1. **Deploy Frequently** - Multiple times per day
2. **Keep Main Green** - Never break the build
3. **Small PRs** - Easier to review and safer to deploy
4. **Review Quickly** - Don't block team progress
5. **Delete Branches** - Clean up immediately after merge
6. **Monitor Production** - Watch deployments, rollback quickly
7. **Use Feature Flags** - Hide incomplete features

## Feature Flags Integration

```javascript
// Hide incomplete features
if (featureFlags.newDashboard) {
  return <NewDashboard />;
} else {
  return <OldDashboard />;
}
```

```bash
# Deploy code merged to main
git checkout main
git merge new-dashboard-feature
git push origin main
# Deploys with feature flag OFF

# Enable gradually
# 1% of users
featureFlags.set('newDashboard', { rollout: 1 });

# 10% of users
featureFlags.set('newDashboard', { rollout: 10 });

# 100% of users
featureFlags.set('newDashboard', { rollout: 100 });
```

## Common Patterns

### Work in Progress PR

```bash
# Create PR early with WIP marker
gh pr create --title "WIP: Add user dashboard" \
  --draft \
  --body "Early PR for feedback. Not ready to merge."

# Convert to ready when complete
gh pr ready
```

### Collaborative Development

```bash
# Developer A creates PR
gh pr create --title "Add payment integration"

# Developer B pulls branch to help
git fetch origin
git checkout payment-integration

# Both push commits
git commit -m "Add Stripe integration"
git push origin payment-integration
# PR updates automatically
```

### Long-Running Features

```bash
# Use feature flag instead of long-lived branch
git checkout -b add-new-api

# Merge behind feature flag (disabled)
git push origin add-new-api
gh pr create
gh pr merge --squash

# Continue development in new branches
git checkout -b improve-new-api
# All changes behind same feature flag

# Enable when ready
featureFlags.set('newApi', true);
```

## Metrics & KPIs

- **Deploy Frequency**: > 10 per day
- **Lead Time**: < 24 hours from commit to production
- **PR Review Time**: < 2 hours average
- **Build Success Rate**: > 95%
- **Rollback Rate**: < 5% of deployments
- **Mean Time to Recovery**: < 30 minutes

## Migration from GitFlow

1. **Merge develop to main** - Make main the integration branch
2. **Delete release branches** - Deploy main directly
3. **Remove hotfix convention** - Treat all fixes the same
4. **Enable CD pipeline** - Deploy on every merge
5. **Add feature flags** - Control rollout without branches
6. **Simplify branch protection** - Less strict rules

## Anti-Patterns to Avoid

❌ **Long-Lived Branches** - Merge frequently
❌ **Manual Deployments** - Automate everything
❌ **Skipping Reviews** - Always require approval
❌ **Large PRs** - Break into smaller changes
❌ **Broken Main** - Fix immediately, top priority
❌ **Keeping Merged Branches** - Delete after merge

## Tools & Automation

### Auto-Delete Branches

```yaml
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
      - name: Delete branch
        run: gh api -X DELETE repos/${{ github.repository }}/git/refs/heads/${{ github.head_ref }}
```

### PR Size Check

```yaml
# .github/workflows/pr-size.yml
name: PR Size Check
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check PR size
        run: |
          LINES=$(git diff --stat origin/main | tail -1 | awk '{print $4}')
          if [ $LINES -gt 500 ]; then
            echo "⚠️ PR is large ($LINES lines). Consider breaking into smaller PRs."
            exit 1
          fi
```

## Resources

- [GitHub Flow Guide](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Understanding GitHub Flow](https://guides.github.com/introduction/flow/)
- [Feature Flags](https://martinfowler.com/articles/feature-toggles.html)
