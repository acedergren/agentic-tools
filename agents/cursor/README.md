# Cursor Configuration

Configuration and best practices for using this repository's tools with **Cursor IDE**.

---

## 📦 What's Available

Cursor can leverage all the agent-agnostic tooling in this repository:

- ✅ [Review Tooling](../../review-tooling/) - Code review checklists and guidelines
- ✅ [Git Workflows](../../git-workflow/) - Commit templates, PR templates, branching strategies
- ✅ [Commit Templates](../../git-workflow/commit-templates/) - Conventional commit formats
- ✅ [PR Templates](../../git-workflow/pr-templates/) - Pull request descriptions

---

## 🚀 Quick Start

### Prerequisites

1. **Cursor IDE** installed ([cursor.sh](https://cursor.sh))
2. **Cursor Pro** subscription (optional but recommended for advanced features)
3. **Git** installed and configured

### Setup

#### Option 1: Clone as Reference

```bash
# Clone to a central location
git clone https://github.com/acedergren/solutionsedge-agentic-tools.git ~/.solutionsedge-tools
```

#### Option 2: Add to Project

```bash
# Add as submodule
cd your-project
git submodule add https://github.com/acedergren/solutionsedge-agentic-tools.git .solutionsedge-tools
```

#### Option 3: Cursor Rules File

Create `.cursorrules` in your project:

```
# Code Review Standards
When reviewing code, use the checklist from .solutionsedge-tools/review-tooling/code-review-checklist.md

# Commit Message Format
Follow conventional commits as defined in .solutionsedge-tools/git-workflow/commit-templates/conventional-commits.md

# PR Descriptions
Use templates from .solutionsedge-tools/git-workflow/pr-templates/
```

---

## 💬 Using Cursor AI for Code Reviews

### Basic Review Commands

```typescript
// In Cursor Chat (Cmd+L or Ctrl+L)
Review this file using the code review checklist at .solutionsedge-tools/review-tooling/code-review-checklist.md

// Quick review
Review this code for quality and security

// With context
I'm about to submit a PR. Review my changes using .solutionsedge-tools/review-tooling/pr-review-guidelines.md
```

### Focused Reviews

```typescript
// Security review
Check this authentication code for security issues per the security section in .solutionsedge-tools/review-tooling/code-review-checklist.md

// Performance review
Analyze this function for performance issues using the performance section of our review checklist

// Test coverage
Evaluate test coverage using the testing section from code-review-checklist.md
```

### Using Cmd+K (Inline Editing)

```typescript
// Select code, then Cmd+K:
Refactor this following the maintainability guidelines in our review checklist

// Or for quick improvements:
Improve this code based on our code quality standards
```

---

## 🎯 Cursor-Specific Features

### 1. Cursor Rules (.cursorrules)

Create project-specific rules that reference the tooling:

```
# .cursorrules

## Code Review
Always check:
- Security (reference: .solutionsedge-tools/review-tooling/code-review-checklist.md#security)
- Performance (reference: .solutionsedge-tools/review-tooling/code-review-checklist.md#performance)
- Testing (reference: .solutionsedge-tools/review-tooling/code-review-checklist.md#testing)

## Commit Messages
Use conventional commit format:
- feat: New features
- fix: Bug fixes
- docs: Documentation changes
- refactor: Code refactoring
See: .solutionsedge-tools/git-workflow/commit-templates/

## PR Templates
Use appropriate template from:
.solutionsedge-tools/git-workflow/pr-templates/
```

### 2. Composer Mode (Cmd+I)

Use Composer for multi-file changes with review:

```typescript
// In Composer mode
Apply improvements across all files based on review checklist:
.solutionsedge-tools/review-tooling/code-review-checklist.md

// For refactoring
Refactor this module to improve maintainability per our standards
```

### 3. Context Awareness (@-mentions)

```typescript
// Reference specific files
@.solutionsedge-tools/review-tooling/code-review-checklist.md Review this file

// Reference entire directories
@review-tooling Review my code using these guidelines
```

---

## 📝 Workflow Integration

### Pre-Commit Workflow

1. **Stage changes**: `git add .`
2. **Open Cursor Chat**: `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux)
3. **Request review**:
   ```
   Review my staged changes using .solutionsedge-tools/review-tooling/code-review-checklist.md
   ```
4. **Generate commit message**:
   ```
   Generate a commit message for these changes following conventional commits
   ```
5. **Commit**: `git commit`

### PR Creation Workflow

1. **Push branch**: `git push`
2. **Generate PR description**:
   ```
   Create a PR description for my changes using .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md
   ```
3. **Copy description** to GitHub/GitLab
4. **Create PR**

### PR Review Workflow

1. **Checkout PR branch**: `git checkout pr-branch`
2. **Open Cursor Chat**: `Cmd+L`
3. **Request review**:
   ```
   I'm reviewing a PR. Help me follow the guidelines in .solutionsedge-tools/review-tooling/pr-review-guidelines.md
   ```
4. **Review each file**:
   ```
   Review this file section by section using our checklist
   ```
5. **Generate review comments**

---

## 🔧 Configuration Files

### .cursor/settings.json

Create `.cursor/settings.json` in your project:

```json
{
  "cursor.rules": {
    "enabled": true,
    "path": ".cursorrules"
  },
  "cursor.context": {
    "alwaysInclude": [
      ".solutionsedge-tools/review-tooling/code-review-checklist.md",
      ".solutionsedge-tools/review-tooling/pr-review-guidelines.md"
    ]
  }
}
```

### .cursorrules (Extended Example)

```
# Project: [Your Project Name]
# Cursor Rules for AI-Assisted Development

## 1. Code Review Standards

When reviewing code, systematically check:

### Security (CRITICAL)
Reference: .solutionsedge-tools/review-tooling/code-review-checklist.md#security
- Input validation and sanitization
- No hardcoded secrets
- Authentication/authorization
- SQL injection prevention
- XSS prevention

### Code Quality
Reference: .solutionsedge-tools/review-tooling/code-review-checklist.md#code-quality
- Readability: Clear variable/function names
- Maintainability: DRY principle
- Performance: Efficient algorithms

### Testing
Reference: .solutionsedge-tools/review-tooling/code-review-checklist.md#testing
- Unit tests for new functionality
- Edge cases covered
- All tests passing

## 2. Commit Message Format

Always follow Conventional Commits:
Reference: .solutionsedge-tools/git-workflow/commit-templates/conventional-commits.md

Format: <type>(<scope>): <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance

Examples:
- feat(auth): add JWT token validation
- fix(api): handle null response in getUserData
- docs(readme): update installation instructions

## 3. Code Style

- Use TypeScript for type safety
- Prefer functional programming
- Write self-documenting code
- Add comments only for complex logic
- Keep functions small and focused

## 4. Pull Request Guidelines

Reference: .solutionsedge-tools/git-workflow/pr-templates/

Before creating PR:
- [ ] Self-review completed
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Security review done

Use appropriate template:
- feature-pr.md for new features
- bugfix-pr.md for bug fixes
- docs-pr.md for documentation

## 5. AI Assistant Instructions

When I ask you to:

"Review" → Use code-review-checklist.md systematically
"Commit" → Generate conventional commit message
"PR" → Help with PR template and description
"Refactor" → Improve code quality per our standards
"Test" → Suggest test cases per testing guidelines

Always reference our standards and explain your reasoning.
```

---

## 💡 Pro Tips

### 1. Use Context Effectively

```typescript
// Good: Specific and contextual
@.solutionsedge-tools/review-tooling Review this authentication code for security issues

// Better: Even more specific
Review this code for SQL injection vulnerabilities using the security section of @code-review-checklist.md
```

### 2. Iterative Review

```typescript
// Step 1: Broad review
Do a high-level review of this file

// Step 2: Specific areas
Now focus on the error handling in the submitForm function

// Step 3: Get suggestions
Suggest improvements for the error handling
```

### 3. Learning Mode

```typescript
// Ask Cursor to explain
Explain why this code violates the DRY principle from our review checklist

// Get examples
Show me a better way to structure this following our maintainability guidelines
```

### 4. Batch Operations

```typescript
// In Composer mode (Cmd+I)
Review all TypeScript files in the src/ directory using our code review checklist and apply suggested improvements
```

---

## 🎓 Team Adoption

### Onboarding New Team Members

1. **Install Cursor IDE**
2. **Clone the repository**:
   ```bash
   git clone [your-repo]
   cd [your-repo]
   git submodule update --init
   ```
3. **Show the .cursorrules file**
4. **Demonstrate key workflows** (above)
5. **Share team-specific prompts**

### Team Prompts Library

Create `docs/cursor-prompts.md`:

```markdown
# Team Cursor Prompts

## Daily Use

**Before Committing:**
```
Review my staged changes using .solutionsedge-tools/review-tooling/code-review-checklist.md
```

**Writing Commits:**
```
Generate a conventional commit message for these changes
```

**Creating PRs:**
```
Help me fill out the feature PR template for these changes
```

## Code Reviews

**Initial Review:**
```
Review this PR following .solutionsedge-tools/review-tooling/pr-review-guidelines.md
```

**Security Focus:**
```
Security review using the security section of our checklist
```

**Performance Focus:**
```
Check for performance issues per our review guidelines
```
```

---

## 🔗 Integration Examples

### Git Hook Integration

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "🤖 Cursor AI Review Available"
echo ""
echo "In Cursor, run:"
echo "  Review staged changes using .solutionsedge-tools/review-tooling/code-review-checklist.md"
echo ""
echo "Generate commit message:"
echo "  Generate conventional commit message"
echo ""

# Continue with commit
exit 0
```

### CI/CD Integration

Add to `.github/workflows/cursor-review-reminder.yml`:

```yaml
name: Cursor Review Reminder

on:
  pull_request:
    types: [opened]

jobs:
  reminder:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: `## 🤖 Cursor AI Review\n\nIn Cursor IDE, you can review this PR with:\n\n\`\`\`\nReview this PR using .solutionsedge-tools/review-tooling/pr-review-guidelines.md\n\`\`\`\n\nChecklist: [code-review-checklist.md](.solutionsedge-tools/review-tooling/code-review-checklist.md)`
            });
```

---

## 📊 Measuring Impact

Track effectiveness:

| Metric | Measurement |
|--------|-------------|
| Review Quality | Issues caught before merge |
| Review Speed | Time to complete review |
| Consistency | Variation in review standards |
| Adoption | Team members using Cursor for reviews |
| Learning | New patterns discovered |

---

## 🤝 Contributing

Improve Cursor integration:

1. **Share effective .cursorrules**
2. **Document useful prompts**
3. **Create integrations**
4. **Submit PRs with improvements**

---

## 🔗 Resources

### Official Documentation
- [Cursor Documentation](https://cursor.sh/docs)
- [Cursor Rules](https://cursor.sh/docs/rules)
- [Cursor Features](https://cursor.sh/features)

### In This Repository
- [Review Tooling](../../review-tooling/)
- [Git Workflows](../../git-workflow/)
- [Main README](../../README.md)

---

**Last Updated**: January 2026
**Cursor Version**: Compatible with all versions
