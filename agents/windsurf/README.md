# Windsurf Configuration

Configuration and best practices for using this repository's tools with **Windsurf IDE**.

---

## 📦 What's Available

Windsurf can leverage all the agent-agnostic tooling in this repository:

- ✅ [Review Tooling](../../review-tooling/) - Code review checklists and guidelines
- ✅ [Git Workflows](../../git-workflow/) - Commit templates, PR templates, branching strategies
- ✅ [Commit Templates](../../git-workflow/commit-templates/) - Conventional commit formats
- ✅ [PR Templates](../../git-workflow/pr-templates/) - Pull request descriptions

---

## 🚀 Quick Start

### Prerequisites

1. **Windsurf IDE** installed ([codeium.com/windsurf](https://codeium.com/windsurf))
2. **Codeium account** (free or paid tier)
3. **Git** installed and configured

### Setup

#### Clone as Reference

```bash
# Clone to a central location
git clone https://github.com/acedergren/solutionsedge-agentic-tools.git ~/.solutionsedge-tools
```

#### Add to Project

```bash
# Add as submodule in your project
cd your-project
git submodule add https://github.com/acedergren/solutionsedge-agentic-tools.git .solutionsedge-tools
```

---

## 💬 Using Windsurf AI for Code Reviews

### Basic Review

```typescript
// In Windsurf AI Assistant
Review this file using the checklist from .solutionsedge-tools/review-tooling/code-review-checklist.md

// Quick review
Review my code for quality and security issues

// Full PR review
Review all my changes for this PR using .solutionsedge-tools/review-tooling/pr-review-guidelines.md
```

### Focused Reviews

```typescript
// Security-focused
Check this code for security vulnerabilities using the security section of .solutionsedge-tools/review-tooling/code-review-checklist.md

// Performance-focused
Analyze this function for performance issues

// Testing-focused
Evaluate test coverage using the testing section of our review checklist
```

### Code Improvements

```typescript
// Suggest improvements
Improve this code based on the code quality guidelines in .solutionsedge-tools/review-tooling/code-review-checklist.md

// Refactor for maintainability
Refactor this to improve maintainability per our checklist
```

---

## 🎯 Windsurf-Specific Features

### 1. Cascade Mode (Multi-File Operations)

Windsurf's Cascade mode is perfect for applying review feedback across multiple files:

```typescript
// In Cascade mode
Apply code quality improvements across all files in src/ based on .solutionsedge-tools/review-tooling/code-review-checklist.md

// Fix security issues
Fix all hardcoded secrets across the codebase per our security guidelines

// Improve test coverage
Add missing tests for all functions per our testing standards
```

### 2. Context-Aware Assistance

Windsurf automatically includes relevant files in context:

```typescript
// Windsurf will find and include relevant files
Review my authentication implementation for security issues

// You can be explicit too
Review src/auth/*.ts using .solutionsedge-tools/review-tooling/code-review-checklist.md
```

### 3. Inline Suggestions

Get real-time suggestions as you code:

1. **Type code**
2. **Windsurf suggests improvements** based on patterns
3. **Accept or modify** suggestions
4. **Ask for explanation** if needed

---

## 📝 Workflow Integration

### Pre-Commit Workflow

1. **Make changes** to your code
2. **Stage changes**: `git add .`
3. **Open Windsurf AI Assistant**
4. **Request review**:
   ```
   Review my staged changes using .solutionsedge-tools/review-tooling/code-review-checklist.md
   ```
5. **Apply suggestions** if any
6. **Generate commit message**:
   ```
   Generate a conventional commit message for these changes
   ```
7. **Commit**: `git commit -m "..."`

### PR Creation Workflow

1. **Complete changes** and commit
2. **Push branch**: `git push`
3. **Generate PR description**:
   ```
   Create a PR description using .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md
   ```
4. **Copy description** to GitHub/GitLab/etc.
5. **Create PR**

### PR Review Workflow

1. **Checkout PR branch**: `git checkout pr-branch`
2. **Open Windsurf AI Assistant**
3. **Request comprehensive review**:
   ```
   Review this PR using the guidelines in .solutionsedge-tools/review-tooling/pr-review-guidelines.md
   ```
4. **Review each section**:
   - Code quality
   - Security
   - Testing
   - Documentation
5. **Generate review comments**
6. **Apply approved suggestions** (if you're the author)

---

## 🔧 Configuration

### Project Context

Create `.windsurf/context.md` in your project:

```markdown
# Windsurf Project Context

## Code Review Standards

Follow: .solutionsedge-tools/review-tooling/code-review-checklist.md

Key areas:
- Security (critical)
- Code quality
- Testing
- Documentation

## Commit Message Format

Use Conventional Commits: .solutionsedge-tools/git-workflow/commit-templates/conventional-commits.md

Format: `<type>(<scope>): <description>`

Types: feat, fix, docs, refactor, test, chore

## PR Templates

Use templates from: .solutionsedge-tools/git-workflow/pr-templates/

- feature-pr.md for new features
- bugfix-pr.md for bug fixes
- docs-pr.md for documentation
```

### Workspace Settings

Create `.vscode/settings.json` (Windsurf uses VS Code settings):

```json
{
  "codeium.enabled": true,
  "codeium.enableConfig": true,
  "editor.inlineSuggest.enabled": true,
  "files.associations": {
    "*.cursorrules": "markdown"
  }
}
```

---

## 💡 Pro Tips

### 1. Leverage Cascade for Large Changes

```typescript
// Single file
Review this file for code quality

// Multiple files with same fix
Fix all console.log statements across the project per our review guidelines

// Project-wide refactoring
Refactor all API calls to use our new error handling pattern
```

### 2. Ask for Explanations

```typescript
// After getting a suggestion
Why is this approach better than my current implementation?

// Learn from the checklist
Explain the security risks mentioned in the checklist for this code

// Understand standards
Why does our review checklist recommend this pattern?
```

### 3. Iterative Improvement

```typescript
// Step 1: High-level
Review this file at a high level

// Step 2: Specific concern
Now focus on the error handling - is it sufficient?

// Step 3: Implementation
Show me how to improve the error handling per our guidelines
```

### 4. Use Templates Efficiently

```typescript
// Commit messages
Generate 5 different conventional commit messages for these changes and let me choose

// PR descriptions
Fill out the feature PR template with details from my commits and code changes

// Review comments
Generate review comments for this PR in a professional tone
```

---

## 🎓 Team Adoption

### Getting Started Guide for Team

1. **Install Windsurf**
   ```bash
   # Download from codeium.com/windsurf
   ```

2. **Clone project with tooling**
   ```bash
   git clone [your-repo]
   cd [your-repo]
   git submodule update --init
   ```

3. **First review**
   ```
   Open Windsurf AI Assistant
   Type: Review my code using .solutionsedge-tools/review-tooling/code-review-checklist.md
   ```

4. **Bookmark common prompts** (see below)

### Common Team Prompts

Create `docs/windsurf-prompts.md`:

```markdown
# Windsurf Team Prompts

Copy-paste these into Windsurf AI Assistant:

## Daily Workflow

### Before Committing
```
Review my staged changes using .solutionsedge-tools/review-tooling/code-review-checklist.md
```

### Commit Message
```
Generate a conventional commit message for these changes following .solutionsedge-tools/git-workflow/commit-templates/conventional-commits.md
```

### Creating PR
```
Create a PR description using .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md
```

## Code Review

### Full Review
```
Review this PR systematically using .solutionsedge-tools/review-tooling/pr-review-guidelines.md
```

### Security Review
```
Perform a security review using the security section of .solutionsedge-tools/review-tooling/code-review-checklist.md
```

### Performance Review
```
Check for performance issues using the performance section of our review checklist
```

### Testing Review
```
Evaluate test coverage using the testing section of our checklist
```

## Code Improvements

### Refactoring
```
Suggest refactoring improvements based on .solutionsedge-tools/review-tooling/code-review-checklist.md maintainability section
```

### Documentation
```
Add missing documentation per our documentation standards
```

### Error Handling
```
Improve error handling following our code quality guidelines
```
```

---

## 🔗 Integration Examples

### Git Hooks

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "🌊 Windsurf AI Review Available"
echo ""
echo "Open Windsurf AI Assistant and run:"
echo "  Review staged changes using .solutionsedge-tools/review-tooling/code-review-checklist.md"
echo ""
echo "Generate commit message:"
echo "  Generate conventional commit message"
echo ""

# Allow commit to proceed
exit 0
```

### CI/CD Reminder

Add to `.github/workflows/windsurf-reminder.yml`:

```yaml
name: Windsurf Review Reminder

on:
  pull_request:
    types: [opened]

jobs:
  reminder:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Add Windsurf Review Comment
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: `## 🌊 Windsurf AI Review\n\n` +
                    `In Windsurf IDE:\n\n` +
                    `\`\`\`\n` +
                    `Review this PR using .solutionsedge-tools/review-tooling/pr-review-guidelines.md\n` +
                    `\`\`\`\n\n` +
                    `📋 [Review Checklist](.solutionsedge-tools/review-tooling/code-review-checklist.md)`
            });
```

---

## 🎯 Advanced Features

### 1. Multi-Step Reviews

```typescript
// Step 1: Quick scan
Quick scan for obvious issues

// Step 2: Deep dive on findings
Explain each issue you found in detail

// Step 3: Fix suggestions
Show me how to fix each issue

// Step 4: Apply fixes
Apply the fixes across all affected files (Cascade mode)
```

### 2. Learning from Reviews

```typescript
// After review
Summarize the top 3 issues you found and explain why they matter

// Pattern recognition
Are there similar issues elsewhere in the codebase?

// Prevention
How can I avoid these issues in the future?
```

### 3. Review Documentation

```typescript
// Generate review summary
Create a review summary document for this PR

// Document patterns
Document the code patterns we should follow based on this review

// Team knowledge
What should the team learn from this review?
```

---

## 📊 Measuring Success

Track these metrics:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Review Completeness | > 90% | % of checklist items verified |
| Time to Review | < 30 min | Average review time |
| Issues Found | Increasing | Security, performance, quality issues |
| False Positives | < 10% | Invalid AI suggestions |
| Team Adoption | > 80% | Team members using Windsurf |

---

## 🤝 Contributing

Help improve Windsurf integration:

1. **Share effective prompts**
2. **Document workflows** that work well
3. **Create integrations** with CI/CD
4. **Submit PRs** with improvements

---

## 🔗 Resources

### Official Documentation
- [Windsurf IDE](https://codeium.com/windsurf)
- [Codeium Documentation](https://codeium.com/docs)
- [Cascade Mode Guide](https://codeium.com/windsurf/features/cascade)

### In This Repository
- [Review Tooling](../../review-tooling/)
- [Git Workflows](../../git-workflow/)
- [Main README](../../README.md)

---

**Last Updated**: January 2026
**Windsurf Version**: Compatible with all versions
