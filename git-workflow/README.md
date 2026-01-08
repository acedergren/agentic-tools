# Git Workflow Templates & Guides

Comprehensive collection of Git workflow strategies, commit templates, PR templates, and branch naming conventions for modern software development.

## 📦 What's Included

### 🔄 Workflow Guides
Detailed documentation for popular Git branching strategies:

| Workflow | Best For | Deployment |
|----------|----------|------------|
| **[Trunk-Based](workflows/trunk-based.md)** | High-velocity teams, microservices | Continuous deployment |
| **[GitHub Flow](workflows/github-flow.md)** | Web apps, small teams | Deploy from main |
| **[GitFlow](workflows/gitflow.md)** | Scheduled releases, versioned software | Release branches |

### 📝 Commit Templates
Pre-structured commit message templates following Conventional Commits:

- **[conventional-commits.md](commit-templates/conventional-commits.md)** - Full specification guide
- **[feature-template.txt](commit-templates/feature-template.txt)** - New features
- **[fix-template.txt](commit-templates/fix-template.txt)** - Bug fixes
- **[breaking-change-template.txt](commit-templates/breaking-change-template.txt)** - Breaking changes
- **[refactor-template.txt](commit-templates/refactor-template.txt)** - Code refactoring
- **[chore-template.txt](commit-templates/chore-template.txt)** - Dependencies, tooling
- **[docs-template.txt](commit-templates/docs-template.txt)** - Documentation
- **[perf-template.txt](commit-templates/perf-template.txt)** - Performance optimizations

### 🔀 Pull Request Templates
Pre-filled PR descriptions for different change types:

- **[feature-pr.md](pr-templates/feature-pr.md)** - New features
- **[bugfix-pr.md](pr-templates/bugfix-pr.md)** - Bug fixes
- **[breaking-change-pr.md](pr-templates/breaking-change-pr.md)** - Breaking changes
- **[docs-pr.md](pr-templates/docs-pr.md)** - Documentation
- **[hotfix-pr.md](pr-templates/hotfix-pr.md)** - Critical production fixes
- **[minimal-pr.md](pr-templates/minimal-pr.md)** - Simple changes

### 🌿 Branch Naming
Conventions and automation for consistent branch naming:

- **[conventions.md](branch-naming/conventions.md)** - Comprehensive naming guide
- Workflow-specific patterns
- Enforcement strategies (git hooks, CI/CD)

---

## 🚀 Quick Start

### Choose Your Workflow

**High-velocity continuous deployment?** → [Trunk-Based Development](workflows/trunk-based.md)
- Short-lived branches (1-3 days)
- Feature flags for incomplete work
- Deploy main multiple times per day

**Simple web application?** → [GitHub Flow](workflows/github-flow.md)
- Feature branches + Pull Requests
- Deploy main branch directly
- Minimal overhead

**Scheduled releases with versions?** → [GitFlow](workflows/gitflow.md)
- Parallel development tracks
- Release branches for stabilization
- Support multiple versions

### Set Up Commit Templates

```bash
# Configure git to use a commit template
git config commit.template commit-templates/feature-template.txt

# Or create git aliases for different types
git config alias.feat "!git commit --template=commit-templates/feature-template.txt"
git config alias.fix "!git commit --template=commit-templates/fix-template.txt"
```

### Set Up PR Templates

```bash
# Single default template (auto-fills all PRs)
mkdir -p .github
cp pr-templates/feature-pr.md .github/pull_request_template.md

# Multiple templates (users choose)
mkdir -p .github/PULL_REQUEST_TEMPLATE
cp pr-templates/*.md .github/PULL_REQUEST_TEMPLATE/
```

### Enforce Branch Naming

```bash
# Add pre-push git hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ ! $BRANCH =~ ^(feature|fix|hotfix|docs)/[a-z0-9-]+$ ]]; then
  echo "❌ Invalid branch name: $BRANCH"
  echo "Expected: <type>/<description> (e.g., feature/user-auth)"
  exit 1
fi
EOF

chmod +x .git/hooks/pre-push
```

---

## 📖 Workflow Comparison

| Aspect | Trunk-Based | GitHub Flow | GitFlow |
|--------|-------------|-------------|---------|
| **Complexity** | Low | Low | High |
| **Branch Types** | 2 (main + feature) | 2 (main + feature) | 5 (main, develop, feature, release, hotfix) |
| **Branch Lifetime** | 1-3 days | 1-7 days | 1-4 weeks |
| **Release Process** | Tag + deploy | Tag + deploy | Release branch |
| **Hotfix Process** | Same as features | Same as features | Special hotfix branch |
| **CI/CD Requirements** | Strong | Moderate | Light |
| **Test Coverage Need** | High | High | Moderate |
| **Deploy Frequency** | > 10/day | Multiple/day | Every 2-4 weeks |
| **Best For** | Microservices, SaaS | Web apps, continuous delivery | Desktop apps, scheduled releases |

---

## 🎯 Usage Examples

### Feature Development (Any Workflow)

```bash
# 1. Create branch with proper naming
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# 2. Make changes with conventional commits
git add src/auth/
git commit  # Uses commit template if configured
# Template opens, fill in:
# feat(auth): add JWT token generation

# 3. Push and create PR
git push origin feature/user-authentication
gh pr create --body-file git-workflow/pr-templates/feature-pr.md

# 4. After review, merge and delete
gh pr merge --squash --delete-branch
```

### Bug Fix (Trunk-Based / GitHub Flow)

```bash
# 1. Create fix branch
git checkout main
git pull
git checkout -b fix/login-redirect

# 2. Fix and commit
git commit  # Use fix template
# fix(auth): handle null user in session

# 3. Fast-track PR
gh pr create --label "bug" --body-file git-workflow/pr-templates/bugfix-pr.md
gh pr merge --squash --delete-branch
```

### Breaking Change (Any Workflow)

```bash
# 1. Create feature branch with breaking change
git checkout -b feature/api-redesign

# 2. Make changes
git commit  # Use breaking-change template
# feat(api)!: redesign authentication endpoints
# BREAKING CHANGE: /login now requires email instead of username

# 3. Create PR with migration guide
gh pr create --body-file git-workflow/pr-templates/breaking-change-pr.md --label "breaking-change"
```

### Hotfix (GitFlow)

```bash
# 1. Create hotfix from main
git checkout main
git pull
git checkout -b hotfix/1.2.1

# 2. Fix critical issue
git commit -m "fix(auth): prevent null pointer in JWT validation"

# 3. Bump version and merge to both main and develop
npm version patch
git checkout main
git merge --no-ff hotfix/1.2.1
git tag v1.2.1

git checkout develop
git merge --no-ff hotfix/1.2.1
```

---

## 🛠️ Automation & Integration

### CI/CD Triggers

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]
    tags: ['v*']
```

### Auto-Label PRs

```yaml
# .github/workflows/auto-label.yml
name: Auto Label PRs
on: [pull_request]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - name: Label by branch name
        run: |
          if [[ "${{ github.head_ref }}" == feature/* ]]; then
            gh pr edit ${{ github.event.pull_request.number }} --add-label "feature"
          elif [[ "${{ github.head_ref }}" == fix/* ]]; then
            gh pr edit ${{ github.event.pull_request.number }} --add-label "bug"
          fi
```

### Enforce Conventions

```yaml
# .github/workflows/conventions.yml
name: Enforce Conventions
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      # Check branch naming
      - name: Validate branch name
        run: |
          BRANCH="${{ github.head_ref }}"
          [[ $BRANCH =~ ^(feature|fix|hotfix|docs)/[a-z0-9-]+$ ]] || exit 1

      # Check commit messages
      - uses: actions/checkout@v4
      - uses: wagoid/commitlint-github-action@v5

      # Check PR description length
      - name: Check PR description
        run: |
          if [ ${#PR_BODY} -lt 50 ]; then
            echo "PR description too short"
            exit 1
          fi
        env:
          PR_BODY: ${{ github.event.pull_request.body }}
```

### Generate Changelog

```bash
# Using conventional commits for automatic changelog
npx conventional-changelog-cli -p angular -i CHANGELOG.md -s

# Or with semantic-release for full automation
npx semantic-release
```

---

## 📚 Resources

### Internal Documentation
- [Workflow Guides](workflows/) - Detailed workflow strategies
- [Commit Templates](commit-templates/) - Conventional commit formats
- [PR Templates](pr-templates/) - Pull request descriptions
- [Branch Naming](branch-naming/) - Branch naming conventions

### External Resources
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Trunk Based Development](https://trunkbaseddevelopment.com/)
- [GitHub Flow Guide](https://docs.github.com/en/get-started/quickstart/github-flow)
- [GitFlow Original Article](https://nvie.com/posts/a-successful-git-branching-model/)

---

## 🤝 Contributing

Found an improvement or missing workflow? PRs welcome!

1. Follow existing structure and formatting
2. Add examples for real-world scenarios
3. Update this README if adding new templates
4. Test templates with actual Git operations

---

## 📁 Repository Structure

```
git-workflow/
├── README.md                    # This file
├── workflows/                   # Git workflow strategies
│   ├── trunk-based.md          # Trunk-Based Development
│   ├── github-flow.md          # GitHub Flow
│   └── gitflow.md              # GitFlow
├── commit-templates/            # Commit message templates
│   ├── README.md
│   ├── conventional-commits.md # Full specification
│   ├── feature-template.txt
│   ├── fix-template.txt
│   ├── breaking-change-template.txt
│   ├── refactor-template.txt
│   ├── chore-template.txt
│   ├── docs-template.txt
│   └── perf-template.txt
├── pr-templates/                # Pull request templates
│   ├── README.md
│   ├── feature-pr.md
│   ├── bugfix-pr.md
│   ├── breaking-change-pr.md
│   ├── docs-pr.md
│   ├── hotfix-pr.md
│   └── minimal-pr.md
└── branch-naming/               # Branch naming conventions
    ├── README.md
    └── conventions.md
```

---

## 🎓 Best Practices Summary

### Commits
- Use conventional commits format: `type(scope): description`
- Keep subject line under 72 characters
- Write in imperative mood (\"add\" not \"added\")
- Reference issues in footer: `Fixes #123`

### Branches
- Use lowercase with hyphens
- Include type prefix: `feature/`, `fix/`, `docs/`
- Keep names short and descriptive (2-4 words)
- Delete branches after merging

### Pull Requests
- Use PR templates appropriate for change type
- Link related issues with keywords
- Provide testing instructions
- Include screenshots for UI changes
- Keep PRs small and focused

### Workflows
- Choose workflow based on deployment frequency
- Trunk-Based for continuous deployment
- GitHub Flow for simple continuous delivery
- GitFlow for scheduled releases

---

**Last Updated**: January 2026
**Compatible With**: Git 2.x, GitHub, GitLab, Bitbucket
