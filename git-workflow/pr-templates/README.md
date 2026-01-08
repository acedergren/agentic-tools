# Pull Request Templates

Pre-structured PR description templates for consistent, informative pull requests that speed up code review.

## Available Templates

| Template | Use When | Best For |
|----------|----------|----------|
| **feature-pr.md** | Adding new features | New functionality, enhancements |
| **bugfix-pr.md** | Fixing bugs | Bug fixes, issue resolution |
| **breaking-change-pr.md** | Making breaking changes | API changes, major refactors |
| **docs-pr.md** | Updating documentation | README, guides, API docs |
| **hotfix-pr.md** | Critical production fixes | Urgent fixes, outages |
| **minimal-pr.md** | Simple, straightforward changes | Typos, minor tweaks |

## Quick Start

### Option 1: GitHub Repository Templates

Set up PR templates in your repository so they auto-populate:

```bash
# For a single default template
mkdir -p .github
cp git-workflow/pr-templates/feature-pr.md .github/pull_request_template.md

# For multiple templates (users can choose)
mkdir -p .github/PULL_REQUEST_TEMPLATE
cp git-workflow/pr-templates/*.md .github/PULL_REQUEST_TEMPLATE/
```

**How it works:**
- **Single template**: Automatically fills PR description when creating a PR
- **Multiple templates**: GitHub shows a dropdown menu to choose a template

**Template selection URL format:**
```
https://github.com/owner/repo/compare/main...branch?template=feature-pr.md
```

### Option 2: Manual Copy-Paste

```bash
# View a template
cat git-workflow/pr-templates/feature-pr.md

# Copy and paste into PR description when creating a PR
```

### Option 3: GitHub CLI Integration

Use `gh` CLI to create PRs with templates:

```bash
# Create PR with feature template
gh pr create --body-file git-workflow/pr-templates/feature-pr.md \
  --title "feat: add user authentication"

# Or create an alias
alias gh-pr-feat='gh pr create --body-file git-workflow/pr-templates/feature-pr.md'
alias gh-pr-fix='gh pr create --body-file git-workflow/pr-templates/bugfix-pr.md'
alias gh-pr-docs='gh pr create --body-file git-workflow/pr-templates/docs-pr.md'
```

### Option 4: Git Hooks (Pre-Push)

Auto-suggest PR template based on branch name:

```bash
# .git/hooks/pre-push (or .husky/pre-push)
#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
TEMPLATE=""

case "$BRANCH" in
  feature/*|feat/*)
    TEMPLATE="git-workflow/pr-templates/feature-pr.md"
    ;;
  fix/*|bugfix/*)
    TEMPLATE="git-workflow/pr-templates/bugfix-pr.md"
    ;;
  hotfix/*)
    TEMPLATE="git-workflow/pr-templates/hotfix-pr.md"
    ;;
  docs/*)
    TEMPLATE="git-workflow/pr-templates/docs-pr.md"
    ;;
esac

if [ -n "$TEMPLATE" ]; then
  echo "📝 Suggested PR template: $TEMPLATE"
  echo "Use: gh pr create --body-file $TEMPLATE"
fi
```

## GitHub Setup Guide

### Setting Up Multiple PR Templates

1. **Create template directory:**
   ```bash
   mkdir -p .github/PULL_REQUEST_TEMPLATE
   ```

2. **Copy templates:**
   ```bash
   cp git-workflow/pr-templates/feature-pr.md .github/PULL_REQUEST_TEMPLATE/
   cp git-workflow/pr-templates/bugfix-pr.md .github/PULL_REQUEST_TEMPLATE/
   cp git-workflow/pr-templates/docs-pr.md .github/PULL_REQUEST_TEMPLATE/
   ```

3. **Commit and push:**
   ```bash
   git add .github/PULL_REQUEST_TEMPLATE/
   git commit -m "chore: add PR templates"
   git push
   ```

4. **Usage**: When creating a PR, GitHub will show a template picker

### Setting Up Default PR Template

1. **Create default template:**
   ```bash
   mkdir -p .github
   cp git-workflow/pr-templates/feature-pr.md .github/pull_request_template.md
   ```

2. **Commit and push:**
   ```bash
   git add .github/pull_request_template.md
   git commit -m "chore: add default PR template"
   git push
   ```

3. **Usage**: Template auto-fills for all PRs

## Template Guidelines

### What Makes a Good PR Description?

A good PR description helps reviewers:
1. **Understand context** - Why this change is needed
2. **Review efficiently** - What changed and where to focus
3. **Test thoroughly** - How to verify the changes work
4. **Deploy safely** - What risks or dependencies to consider

### Essential Sections

**Every PR should include:**

1. **Description** - What this PR does (1-2 sentences)
2. **Motivation** - Why this change is needed
3. **Testing** - How to verify it works
4. **Checklist** - Verification steps completed

**Optional but helpful:**

- Screenshots (for UI changes)
- Implementation details (for complex changes)
- Migration guide (for breaking changes)
- Performance impact (for optimization work)

### PR Description Best Practices

✅ **Do:**
- Write clear, scannable descriptions
- Link related issues with keywords (`Fixes #123`, `Closes #456`)
- Include screenshots/GIFs for visual changes
- Provide step-by-step testing instructions
- List breaking changes prominently
- Keep it up-to-date as PR evolves

❌ **Don't:**
- Leave template comments (lines starting with `<!--`)
- Write "updates code" or vague descriptions
- Forget to link related issues
- Skip testing instructions
- Assume reviewers know the context

### Using Markdown Effectively

**Emphasis:**
```markdown
**Bold** for important points
*Italic* for emphasis
~~Strikethrough~~ for deprecated items
```

**Lists:**
```markdown
- Unordered list
- Another item

1. Ordered list
2. Second step
```

**Code blocks:**
```markdown
​```javascript
const example = "syntax highlighted code";
​```
```

**Checkboxes:**
```markdown
- [ ] Incomplete task
- [x] Completed task
```

**Images:**
```markdown
![Alt text](https://example.com/image.png)
```

**Links:**
```markdown
[Link text](https://example.com)
Closes #123
```

## Real-World Examples

### Feature PR Example

````markdown
## Description

Add JWT-based user authentication with token refresh capability.

## Type of Change

- [x] New feature (non-breaking change which adds functionality)

## Motivation and Context

We need secure authentication to protect user data and enable personalized features.
Current session-based auth doesn't scale well for our mobile app requirements.

Closes #234

## Implementation Details

Implemented JWT authentication with:
- Access tokens (15min expiration)
- Refresh tokens (7 day expiration)
- Automatic token rotation
- Secure httpOnly cookies

**Key changes:**
- Added `AuthService` for token management
- Created `/auth/login`, `/auth/refresh`, `/auth/logout` endpoints
- Implemented middleware for protected routes

## How to Test

1. Start the API: `pnpm --filter api dev`
2. Login: `POST /auth/login` with credentials
3. Access protected route: `GET /api/profile`
4. Token should auto-refresh when near expiration

**Expected behavior:** User stays logged in seamlessly for 7 days

## Checklist

- [x] Code follows project style guidelines
- [x] Self-review completed
- [x] Comments added for complex logic
- [x] Documentation updated
- [x] Tests added (unit + integration)
- [x] All tests pass locally
- [x] No new warnings or errors
````

### Bug Fix PR Example

````markdown
## Bug Description

**Fixes**: #567

**Symptoms:**
Users getting logged out after exactly 30 minutes, even while actively using the app.

**Impact:**
All authenticated users affected. Frustrating UX, increased support tickets.

## Root Cause

Session expiration was set once at login time and never refreshed.
The middleware only checked expiration but didn't extend it on activity.

## Solution

Modified session middleware to extend expiration time on each authenticated request.
Sessions now use a "sliding window" approach - each request slides the expiration forward.

## Changes Made

- [x] Code fix in `auth/middleware.ts`
- [x] Test added to prevent regression
- [x] Documentation updated

## How to Verify the Fix

**Before (reproducing the bug):**
1. Login to the app
2. Wait 30 minutes while occasionally using the app
3. Make a request - gets 401 Unauthorized

**After (verifying the fix):**
1. Login to the app
2. Use the app normally for > 30 minutes
3. Stays logged in as long as activity continues

## Test Coverage

- [x] Unit test added: `auth.middleware.test.ts`
- [x] Integration test added: `auth.integration.test.ts`
- [x] Manual testing completed

## Regression Risk

- [x] Low - Isolated change with good test coverage

This only affects session extension logic. No changes to token generation or validation.
````

### Breaking Change PR Example

````markdown
## ⚠️ Breaking Change

Change pagination format in all list endpoints to support better UX and performance.

## Motivation

Current pagination is inconsistent across endpoints and doesn't provide enough metadata
for implementing proper "load more" functionality in the mobile app.

## Breaking Changes

1. **All list endpoints**: Response format changed from array to object
2. **Query parameters**: Changed from `offset/limit` to `page/perPage`

## Before vs After

### API Changes

**Before:**
​```json
GET /api/workouts?offset=0&limit=50

Response: [...]
​```

**After:**
​```json
GET /api/workouts?page=1&perPage=50

Response: {
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 50,
    "total": 250,
    "totalPages": 5
  }
}
​```

## Migration Guide

### For API Users

1. **Update query parameters**:
   ```javascript
   // Before
   fetch('/api/workouts?offset=0&limit=50')

   // After
   fetch('/api/workouts?page=1&perPage=50')
   ```

2. **Update response handling**:
   ```javascript
   // Before
   const workouts = await response.json();

   // After
   const { data: workouts, pagination } = await response.json();
   ```

## Impact Assessment

### Who is Affected?

- [x] API consumers
- [x] Mobile app
- [x] Web dashboard

**Affected endpoints:**
- `/api/workouts`
- `/api/goals`
- `/api/users` (admin only)

### Estimated Migration Effort

- [x] Low (1-4 hours) - Straightforward changes

## Checklist

- [x] Breaking changes documented in commit message
- [x] Migration guide complete
- [x] All tests updated
- [x] API documentation updated
- [x] Mobile app updated
- [x] Web dashboard updated
- [x] CHANGELOG.md updated
````

## Choosing the Right Template

Use this decision tree:

```
Is it a critical production issue?
├─ Yes → Use hotfix-pr.md
└─ No
   ├─ Does it break existing functionality?
   │  ├─ Yes → Use breaking-change-pr.md
   │  └─ No
   │     ├─ Is it fixing a bug?
   │     │  ├─ Yes → Use bugfix-pr.md
   │     │  └─ No
   │     │     ├─ Is it adding a feature?
   │     │     │  ├─ Yes → Use feature-pr.md
   │     │     │  └─ No
   │     │     │     ├─ Is it documentation only?
   │     │     │     │  ├─ Yes → Use docs-pr.md
   │     │     │     │  └─ No → Use minimal-pr.md
```

## Customization

### Creating Custom Templates

1. **Copy an existing template:**
   ```bash
   cp git-workflow/pr-templates/feature-pr.md custom-pr.md
   ```

2. **Modify sections** as needed for your project

3. **Add to your repository:**
   ```bash
   cp custom-pr.md .github/PULL_REQUEST_TEMPLATE/
   ```

### Team-Specific Sections

Add sections relevant to your team:

```markdown
## Security Review

- [ ] No hardcoded secrets
- [ ] Input validation added
- [ ] SQL injection prevented
- [ ] XSS vulnerabilities checked

## Compliance

- [ ] GDPR requirements met
- [ ] Data retention policy followed
- [ ] Audit logging added

## Design Review

- [ ] Design approved by UX team
- [ ] Accessibility guidelines followed
- [ ] Mobile responsive
```

## Integration with CI/CD

### PR Template Linting

Check PR descriptions meet minimum requirements:

```yaml
# .github/workflows/pr-lint.yml
name: PR Lint
on: [pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Check PR description
        run: |
          if [ ${#PR_BODY} -lt 50 ]; then
            echo "PR description too short. Please use a template."
            exit 1
          fi
        env:
          PR_BODY: ${{ github.event.pull_request.body }}
```

### Auto-Label Based on Template

```yaml
# .github/workflows/auto-label.yml
name: Auto Label
on: [pull_request]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - name: Label based on template
        run: |
          if [[ "${{ github.event.pull_request.body }}" == *"Breaking Change"* ]]; then
            gh pr edit ${{ github.event.pull_request.number }} --add-label "breaking-change"
          fi
```

## See Also

- [../workflows/](../workflows/) - Git workflow strategies
- [../commit-templates/](../commit-templates/) - Commit message templates
- [GitHub PR Documentation](https://docs.github.com/en/pull-requests)
