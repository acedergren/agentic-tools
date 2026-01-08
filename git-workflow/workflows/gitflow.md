# GitFlow

Structured branching model with dedicated branches for development, releases, and hotfixes. Ideal for scheduled releases and versioned software.

## Overview

**Philosophy**: Parallel development tracks for features, releases, and production.

**Best For**:
- Scheduled release cycles
- Versioned software products
- Multiple production versions
- Teams needing strict release control

**Not Ideal For**:
- Continuous deployment
- High-velocity teams
- Simple web applications
- Microservices

## Branch Strategy

```
main (production)
  ↓
release/1.0.0 (stabilization)
  ↓
develop (integration)
  ↓
feature/new-feature (development)
```

### Branch Types

1. **`main`** - Production-ready code
   - Protected branch
   - Only release/* and hotfix/* merge here
   - Tagged with version numbers
   - Auto-deploys to production

2. **`develop`** - Integration branch
   - Protected branch
   - Feature branches merge here
   - Always ahead of main
   - Deployed to dev environment

3. **`feature/*`** - Feature development
   - Created from: `develop`
   - Merged to: `develop`
   - Lifetime: Until feature complete
   - Can be long-lived

4. **`release/*`** - Release preparation
   - Created from: `develop`
   - Merged to: `main` AND `develop`
   - Bug fixes only, no new features
   - Version bumps and changelog

5. **`hotfix/*`** - Production emergency fixes
   - Created from: `main`
   - Merged to: `main` AND `develop`
   - Version bump (patch)
   - Immediate deployment

## Workflow Steps

### 1. Feature Development

```bash
# Start from latest develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/user-dashboard

# Develop feature
git commit -m "feat(dashboard): add user stats widget"
git commit -m "feat(dashboard): add data visualization"
git commit -m "test(dashboard): add widget tests"

# Keep up to date with develop
git checkout develop
git pull origin develop
git checkout feature/user-dashboard
git merge develop

# Create PR to develop
gh pr create --base develop \
  --title "feat(dashboard): add user dashboard" \
  --body "$(cat .github/PULL_REQUEST_TEMPLATE.md)"
```

### 2. Release Preparation

```bash
# When ready for release, create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/1.2.0

# Bump version
npm version 1.2.0 --no-git-tag-version
git commit -m "chore(release): bump version to 1.2.0"

# Update changelog
cat > CHANGELOG-1.2.0.md << EOF
# Release 1.2.0

## Features
- User dashboard with stats widgets
- Data visualization charts

## Bug Fixes
- Fixed login redirect issue
- Resolved API timeout errors

## Breaking Changes
- None
EOF
git add CHANGELOG-1.2.0.md
git commit -m "docs(release): add changelog for 1.2.0"

# Deploy to staging for final testing
git push origin release/1.2.0
# Trigger staging deployment
```

### 3. Bug Fixes During Release

```bash
# Fix bugs found during release testing
git checkout release/1.2.0
git commit -m "fix(dashboard): handle empty data gracefully"

# These fixes will be merged to both main and develop
```

### 4. Complete Release

```bash
# Merge to main
git checkout main
git pull origin main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin main --tags

# Merge back to develop (include release bug fixes)
git checkout develop
git pull origin develop
git merge --no-ff release/1.2.0
git push origin develop

# Delete release branch
git branch -d release/1.2.0
git push origin --delete release/1.2.0

# Auto-deploys to production via tag
```

### 5. Hotfix Process

```bash
# Critical bug found in production
git checkout main
git pull origin main
git checkout -b hotfix/1.2.1

# Fix the bug
git commit -m "fix(auth): prevent null pointer in session validation"

# Bump patch version
npm version 1.2.1 --no-git-tag-version
git commit -m "chore(hotfix): bump version to 1.2.1"

# Merge to main
git checkout main
git merge --no-ff hotfix/1.2.1
git tag -a v1.2.1 -m "Hotfix 1.2.1 - Critical auth bug"
git push origin main --tags

# Merge to develop
git checkout develop
git merge --no-ff hotfix/1.2.1
git push origin develop

# Delete hotfix branch
git branch -d hotfix/1.2.1
git push origin --delete hotfix/1.2.1

# Auto-deploys hotfix to production
```

## Branch Naming Conventions

```bash
feature/short-description       # New features
feature/PROJ-123-description    # Feature with ticket
bugfix/issue-description        # Non-urgent bug fixes
release/1.2.0                   # Release preparation (version number)
hotfix/1.2.1                    # Production hotfixes (version number)
support/2.x                     # Long-term support branches
```

## Versioning Strategy

**Semantic Versioning**: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.x.x): Breaking changes
- **MINOR** (x.1.x): New features (backward compatible)
- **PATCH** (x.x.1): Bug fixes

**Examples:**
```bash
v1.0.0 → v1.1.0   # New feature release
v1.1.0 → v1.1.1   # Hotfix release
v1.1.1 → v2.0.0   # Major release with breaking changes
```

## Commit Message Format

**Conventional Commits** with scope:

```bash
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
refactor(scope): code refactoring
test(scope): add tests
chore(scope): build/config changes
perf(scope): performance improvements
```

**Breaking Changes:**
```bash
feat(api)!: redesign authentication endpoints

BREAKING CHANGE: The /login endpoint now returns a different response format.
Clients must update to handle the new structure.
```

## Pull Request Templates

### Feature PR (to `develop`)

```markdown
## Feature Description
What does this feature do? Why is it needed?

## Related Issues
Closes #123

## Type of Change
- [x] New feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation

## Testing
- [x] Unit tests added
- [x] Integration tests added
- [x] Manual testing completed

## Checklist
- [x] Code follows project style guidelines
- [x] Self-review completed
- [x] Documentation updated
- [x] No breaking changes
```

### Release PR (to `main`)

```markdown
## Release Notes

### Version
v1.2.0

### Release Type
- [ ] Major (breaking changes)
- [x] Minor (new features)
- [ ] Patch (bug fixes)

### Changes Included
- User dashboard with stats widgets
- Data visualization charts
- Bug fixes for login and API timeouts

### Breaking Changes
None

### Migration Guide
No migration needed

### Deployment Notes
- [ ] Database migrations required: No
- [x] Configuration changes: Added DASHBOARD_ENABLED env var
- [x] Deploy to staging: ✅ Passed
- [ ] Rollback plan documented: See docs/rollback.md

### Checklist
- [x] All tests passing
- [x] Changelog updated
- [x] Version bumped
- [x] Staging deployment verified
- [x] Documentation updated
```

## Branch Protection Rules

### Main Branch

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["test", "lint", "build", "security-scan"]
  },
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  },
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "restrictions": {
    "users": ["release-manager"],
    "teams": ["tech-leads"]
  }
}
```

### Develop Branch

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["test", "lint"]
  },
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "required_linear_history": false,
  "allow_force_pushes": false
}
```

## CI/CD Pipeline

### Feature Branch Pipeline

```yaml
# .github/workflows/feature.yml
name: Feature Branch CI
on:
  pull_request:
    branches: [develop]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run build

  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy:preview
```

### Release Branch Pipeline

```yaml
# .github/workflows/release.yml
name: Release Branch CI
on:
  push:
    branches: ['release/*']
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run build
      - run: npm run test:integration
      - run: npm run test:e2e

  deploy-staging:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy:staging
```

### Production Deployment

```yaml
# .github/workflows/production.yml
name: Production Deployment
on:
  push:
    tags: ['v*']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm run deploy:production

  create-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Create GitHub Release
        run: gh release create ${{ github.ref_name }} --notes-file CHANGELOG-${{ github.ref_name }}.md
```

## Release Calendar

Example schedule for predictable releases:

```
Sprint 1 (2 weeks)  → Feature development
Sprint 2 (2 weeks)  → Feature development
Sprint 3 (2 weeks)  → Feature development
Week 7 (1 week)     → Release stabilization (release/1.0.0)
Week 8              → Production deployment
```

**Timeline:**
- **Day 1-42**: Features merged to `develop`
- **Day 43-49**: Release branch created, bug fixes only
- **Day 50**: Merge to `main`, deploy to production
- **Day 50+**: Hotfixes as needed

## Multiple Version Support

Managing multiple production versions:

```bash
# Main development
main (v3.0.0)
develop (v3.1.0-dev)

# Long-term support
support/2.x (v2.5.0)
  ↓
feature/2.x-security-patch
hotfix/2.5.1
```

**Example:**
```bash
# Create LTS branch from last 2.x release
git checkout -b support/2.x v2.5.0

# Apply security patches
git checkout -b feature/2.x-security-patch support/2.x
git commit -m "fix(security): patch CVE-2024-1234"
gh pr create --base support/2.x

# Release LTS version
git checkout -b release/2.5.1 support/2.x
git tag -a v2.5.1 -m "LTS Release 2.5.1"
```

## Changelog Management

### Automated Changelog

```bash
# .github/workflows/changelog.yml
name: Generate Changelog
on:
  push:
    branches: ['release/*']
jobs:
  changelog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Generate changelog
        run: |
          VERSION=$(echo ${{ github.ref }} | sed 's/refs\/heads\/release\///')
          npx conventional-changelog-cli -p angular -i CHANGELOG.md -s -r 0
          git add CHANGELOG.md
          git commit -m "docs: update changelog for $VERSION"
          git push
```

### Manual Changelog Template

```markdown
# Changelog

## [1.2.0] - 2026-01-08

### Added
- User dashboard with interactive widgets
- Data visualization with Chart.js integration
- Export functionality for user data

### Changed
- Improved API response times by 40%
- Updated UI design for better accessibility

### Fixed
- Login redirect loop on session expiry
- API timeout errors on large datasets
- Dashboard crash with empty user data

### Security
- Updated dependencies to patch CVE-2024-1234

### Breaking Changes
None

### Migration Guide
No migration required
```

## Best Practices

1. **Feature Branches** - One feature per branch, merge when complete
2. **Release Branches** - Bug fixes only, no new features
3. **Hotfixes** - Merge to both main and develop immediately
4. **Version Tags** - Always tag main after merge
5. **Changelog** - Update with every release
6. **Code Reviews** - 2 approvals for main, 1 for develop
7. **Clean History** - Use `--no-ff` for release/hotfix merges

## Common Patterns

### Emergency Hotfix During Release

```bash
# Release branch exists: release/1.2.0
# Critical bug found in production

# Create hotfix from main (not release)
git checkout main
git checkout -b hotfix/1.1.1

# Fix and merge to main
git commit -m "fix: critical auth bug"
git checkout main
git merge --no-ff hotfix/1.1.1
git tag v1.1.1
git push origin main --tags

# Merge to develop AND release branch
git checkout develop
git merge hotfix/1.1.1
git push origin develop

git checkout release/1.2.0
git merge hotfix/1.1.1
git push origin release/1.2.0
```

### Long-Running Feature Development

```bash
# Feature takes 3 weeks to complete
git checkout -b feature/complex-reporting develop

# Week 1: Core functionality
git commit -m "feat(reports): add report generation engine"

# Week 2: Sync with develop regularly
git checkout develop
git pull origin develop
git checkout feature/complex-reporting
git merge develop  # Keep feature branch up to date

# Week 3: Complete feature
git commit -m "feat(reports): add export functionality"

# Merge to develop when ready
gh pr create --base develop
```

## Metrics & KPIs

- **Release Frequency**: Every 2-4 weeks
- **Hotfix Frequency**: < 2 per release
- **Feature Branch Lifetime**: < 2 weeks average
- **Release Branch Duration**: 3-7 days
- **Production Incidents**: < 1 per release

## Migration from Trunk-Based

1. **Create develop branch** from main
2. **Redirect feature PRs** to develop instead of main
3. **Establish release schedule** (bi-weekly/monthly)
4. **Create first release branch** from develop
5. **Train team** on new workflow
6. **Update CI/CD pipelines** for new branches

## Anti-Patterns to Avoid

❌ **Long-Lived Features** - Break down into smaller features
❌ **Cherry-Picking** - Merge properly to avoid conflicts
❌ **Skipping Develop** - Never merge features directly to main
❌ **New Features in Release** - Bug fixes only
❌ **Forgetting Develop Merge** - Always merge hotfix/release back
❌ **Manual Deployments** - Automate based on tags/branches

## Resources

- [Original GitFlow Article](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitFlow CLI Tool](https://github.com/nvie/gitflow)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
