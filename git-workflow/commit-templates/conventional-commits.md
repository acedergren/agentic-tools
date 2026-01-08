# Conventional Commits Guide

Structured commit messages that make changelog generation and versioning easier.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type

**Must** be one of the following:

| Type | Description | Example |
|------|-------------|---------|
| **feat** | New feature | `feat(auth): add JWT token refresh` |
| **fix** | Bug fix | `fix(api): handle null response from database` |
| **docs** | Documentation only | `docs(readme): update installation steps` |
| **style** | Code style (formatting, missing semicolons) | `style(lint): fix eslint warnings` |
| **refactor** | Code refactoring (no feature change) | `refactor(db): extract query logic to repository` |
| **perf** | Performance improvement | `perf(api): optimize database query` |
| **test** | Add or update tests | `test(auth): add JWT validation tests` |
| **chore** | Build process, dependencies, tooling | `chore(deps): update fastify to 5.0.0` |
| **ci** | CI/CD configuration | `ci(github): add security scan workflow` |
| **revert** | Revert previous commit | `revert: feat(auth): add JWT token refresh` |

## Scope

**Optional** but recommended. Indicates what part of the codebase is affected:

```bash
# Examples
feat(api): add new endpoint
fix(ui): correct button alignment
docs(readme): update setup instructions
test(auth): add login integration tests
chore(deps): bump node to 20.x
```

**Common scopes:**
- Component names: `(header)`, `(sidebar)`, `(dashboard)`
- Modules: `(auth)`, `(api)`, `(database)`
- Features: `(payments)`, `(notifications)`, `(search)`
- Areas: `(ui)`, `(backend)`, `(infra)`

## Subject

**Required**. Brief description:

✅ **Do:**
- Use imperative mood ("add" not "added" or "adds")
- Start with lowercase
- No period at the end
- Keep under 72 characters

❌ **Don't:**
- "Added new feature" → `add new feature`
- "Fixes bug." → `fix bug`
- "Adding support for..." → `add support for...`

## Body

**Optional** but recommended for complex changes. Explain:
- What changed and why
- Motivation for the change
- Contrast with previous behavior

**Format:**
- Separate from subject with blank line
- Wrap at 72 characters
- Can have multiple paragraphs

```
feat(api): add rate limiting to authentication endpoints

Implement rate limiting to prevent brute force attacks on login.
Uses @fastify/rate-limit with 5 attempts per 15 minutes.

This addresses security vulnerability found in latest audit.
```

## Footer

**Optional**. Used for:

### Breaking Changes

**Critical**: Always document breaking changes:

```
feat(api)!: redesign authentication endpoints

BREAKING CHANGE: The /login endpoint now requires email instead of username.
All API clients must be updated to send email field.

Migration: Replace username with email in login requests.
Before: { "username": "john" }
After:  { "email": "john@example.com" }
```

### Issue References

Link to issue tracker:

```
fix(auth): prevent null pointer in session validation

Fixes #123
Closes #456, #789
See #321 for related discussion
```

**Keywords that close issues:**
- `Fixes #123`
- `Closes #123`
- `Resolves #123`

## Examples

### Feature Addition

```
feat(dashboard): add user activity chart

Implements interactive chart showing daily active users over time.
Uses LayerChart + D3 for visualization.

Closes #234
```

### Bug Fix

```
fix(api): handle missing user in JWT token

Added validation to check if user exists before processing token.
Returns 401 Unauthorized if user not found.

Fixes #567
```

### Breaking Change

```
feat(api)!: change response format for /users endpoint

BREAKING CHANGE: Users endpoint now returns paginated results.

Before:
{ "users": [...] }

After:
{
  "users": [...],
  "pagination": { "page": 1, "total": 100 }
}
```

### Documentation

```
docs(api): add OpenAPI spec for authentication

Adds comprehensive API documentation for all auth endpoints
including request/response schemas and error codes.
```

### Performance

```
perf(db): optimize workout query with index

Added composite index on (user_id, date) columns.
Reduces query time from 450ms to 12ms for typical requests.

Benchmark results attached in #789
```

### Dependency Update

```
chore(deps): update fastify to 5.0.0

Updates Fastify and related plugins to latest major version.
No breaking changes in our usage patterns.
```

### Refactoring

```
refactor(auth): extract JWT logic to separate service

Moves JWT token generation and validation from routes to
dedicated AuthService class. No functional changes.

This improves testability and separation of concerns.
```

### Multiple Issues

```
fix(ui): correct form validation in multiple components

- Login form: validate email format
- Signup form: check password strength
- Profile form: ensure required fields

Fixes #123, #124, #125
```

## Commit Message Length Guidelines

```
<type>(<scope>): <subject>               ← 72 chars max
                                          ← blank line
<body line 1>                             ← 72 chars max
<body line 2>                             ← 72 chars max
                                          ← blank line
<footer>                                  ← no limit
```

## Tools & Automation

### Commitlint

Enforce conventional commits with commitlint:

```bash
# Install
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# .commitlintrc.json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [2, "always", [
      "feat", "fix", "docs", "style", "refactor",
      "perf", "test", "chore", "ci", "revert"
    ]],
    "scope-case": [2, "always", "lowercase"],
    "subject-case": [2, "always", "lowercase"],
    "subject-max-length": [2, "always", 72]
  }
}
```

### Husky Pre-Commit Hook

```bash
# .husky/commit-msg
#!/bin/bash
npx --no -- commitlint --edit "$1"
```

### Changelog Generation

```bash
# Generate changelog from conventional commits
npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
```

## Common Patterns

### Multi-Part Work

```
feat(dashboard): add user statistics (part 1/3)

Implements data fetching and processing for user stats.
UI components will follow in subsequent commits.

Related to #456
```

### Co-Authored

```
feat(api): add GraphQL support

Implements GraphQL server with Apollo and schema definition.

Co-authored-by: Jane Doe <jane@example.com>
```

### Revert

```
revert: feat(auth): add social login

This reverts commit abc123def456.

Reverting due to production issues with OAuth callback.
Will re-implement after fixing redirect logic.

See #789 for details
```

## Anti-Patterns to Avoid

❌ **Vague messages:**
```
fix: fix bug
update: update stuff
chore: minor changes
```

❌ **Non-imperative mood:**
```
feat: added new feature
fix: fixed the bug
docs: updated readme
```

❌ **Too long subject:**
```
feat(api): add comprehensive user authentication system with JWT tokens, refresh tokens, password reset, email verification, and account lockout after failed attempts
```

❌ **Missing breaking change marker:**
```
feat(api): redesign authentication endpoints
// Should be: feat(api)!: ...
```

❌ **Combining unrelated changes:**
```
feat(api): add rate limiting and fix CORS bug and update dependencies
// Should be 3 separate commits
```

## Integration with Versioning

Conventional commits enable automatic version bumping:

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `fix:` | PATCH (0.0.x) | `1.2.3 → 1.2.4` |
| `feat:` | MINOR (0.x.0) | `1.2.3 → 1.3.0` |
| `feat!:` or `BREAKING CHANGE:` | MAJOR (x.0.0) | `1.2.3 → 2.0.0` |

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Commitlint](https://commitlint.js.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
