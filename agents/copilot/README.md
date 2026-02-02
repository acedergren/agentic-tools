# GitHub Copilot Configuration

Configuration and best practices for using this repository's tools with **GitHub Copilot**.

---

## 📦 What's Available

GitHub Copilot can leverage all the agent-agnostic tooling in this repository:

- ✅ [Review Tooling](../../review-tooling/) - Code review checklists and guidelines
- ✅ [Git Workflows](../../git-workflow/) - Commit templates, PR templates, branching strategies
- ✅ [Commit Templates](../../git-workflow/commit-templates/) - Conventional commit formats
- ✅ [PR Templates](../../git-workflow/pr-templates/) - Pull request descriptions

---

## 🚀 Quick Start

### Prerequisites

1. **GitHub Copilot subscription** (Individual, Business, or Enterprise)
2. **VS Code** or **GitHub Codespaces** or **JetBrains IDE** with Copilot plugin
3. **Git** installed and configured

### Setup

No special configuration needed! Just use the repository's resources as reference:

```bash
# Clone this repository to your projects directory
git clone https://github.com/acedergren/solutionsedge-agentic-tools.git ~/.solutionsedge-tools

# Or clone into each project as a submodule
cd your-project
git submodule add https://github.com/acedergren/solutionsedge-agentic-tools.git .solutionsedge-tools
```

---

## 💬 Using Copilot Chat for Code Reviews

### Basic Review

```typescript
// In Copilot Chat (@workspace scope)
@workspace Review this file using .solutionsedge-tools/review-tooling/code-review-checklist.md

// For the whole PR
@workspace Review all changed files in this PR for code quality and security
```

### Focused Reviews

```typescript
// Security-focused
@workspace Check this file for security vulnerabilities using the security section from .solutionsedge-tools/review-tooling/code-review-checklist.md

// Performance-focused
@workspace Review this code for performance issues

// Testing-focused
@workspace Evaluate test coverage for this file
```

### Generate PR Descriptions

```typescript
@workspace Create a PR description for my changes using the template at .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md
```

---

## 🎯 Workflow Integration

### 1. Pre-Commit Review

Before committing, ask Copilot to review:

```typescript
// In VS Code Terminal or Copilot Chat
@workspace Review my staged changes before I commit

// Generate commit message
@workspace Generate a commit message following conventional commits format from .solutionsedge-tools/git-workflow/commit-templates/
```

### 2. PR Creation

```bash
# Use PR template
cat .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md

# Ask Copilot to help fill it out
# In Copilot Chat:
@workspace Help me fill out this PR template for my changes
```

### 3. PR Review

As a reviewer:

```typescript
// Load the review guidelines
@workspace I'm reviewing a PR. Help me follow .solutionsedge-tools/review-tooling/pr-review-guidelines.md

// Systematic review
@workspace Review this PR section by section using the code-review-checklist.md
```

---

## 📝 Using Templates

### Commit Messages

```typescript
// In Copilot Chat
Generate a commit message for my changes following the conventional commits format

// Or specify the template
@workspace Create a commit message using .solutionsedge-tools/git-workflow/commit-templates/feature-template.txt
```

### PR Descriptions

```typescript
// In Copilot Chat
@workspace Create a PR description for my feature using the template at .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md
```

---

## 🔧 VS Code Settings

### Recommended Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": true,
    "plaintext": false
  },
  "github.copilot.advanced": {
    "reviewGuidelines": ".solutionsedge-tools/review-tooling/pr-review-guidelines.md",
    "codeChecklist": ".solutionsedge-tools/review-tooling/code-review-checklist.md"
  }
}
```

### Custom Prompts

Create `.vscode/copilot-prompts.md`:

```markdown
# Custom Copilot Prompts

## Code Review
Use the checklist at .solutionsedge-tools/review-tooling/code-review-checklist.md

## Commit Messages
Follow conventional commits from .solutionsedge-tools/git-workflow/commit-templates/

## PR Descriptions
Use templates from .solutionsedge-tools/git-workflow/pr-templates/
```

---

## 🎓 Best Practices

### 1. Context is Key

Always provide context to Copilot:

✅ Good:
```typescript
@workspace Review this authentication code for security issues using the security section of our review checklist
```

❌ Too vague:
```typescript
Review this code
```

### 2. Be Specific About Standards

Reference specific sections:

```typescript
@workspace Check if this code follows the readability guidelines in section "Code Quality > Readability" of code-review-checklist.md
```

### 3. Iterative Review

Use Copilot for initial scan, then do human review:

```typescript
// Step 1: AI scan
@workspace Do an initial review of this file for obvious issues

// Step 2: After reading, ask specific questions
@workspace Why might this function fail with null input?

// Step 3: Get suggestions
@workspace Suggest improvements for error handling here
```

### 4. Generate Examples

```typescript
@workspace Show me an example of following the conventional commit format for a breaking change

@workspace Create an example PR description for a bugfix using our template
```

---

## 🔗 Integration Examples

### GitHub Actions + Copilot

Create `.github/workflows/copilot-review.yml`:

```yaml
name: Copilot Review Assistant

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review-checklist:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      
      - name: Add Review Checklist to PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const checklist = fs.readFileSync('.solutionsedge-tools/review-tooling/code-review-checklist.md', 'utf8');
            
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: `## 📋 Code Review Checklist\n\n${checklist}\n\n---\n\n💡 Use GitHub Copilot Chat with: \`@workspace Review using this checklist\``
            });
```

### Pre-commit Hook

Create `.git/hooks/prepare-commit-msg`:

```bash
#!/bin/bash

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2

# Only run for regular commits (not merge, squash, etc.)
if [ -z "$COMMIT_SOURCE" ]; then
  echo "# Conventional Commit Format:" >> "$COMMIT_MSG_FILE"
  echo "# <type>(<scope>): <description>" >> "$COMMIT_MSG_FILE"
  echo "#" >> "$COMMIT_MSG_FILE"
  echo "# See: .solutionsedge-tools/git-workflow/commit-templates/" >> "$COMMIT_MSG_FILE"
  echo "#" >> "$COMMIT_MSG_FILE"
  echo "# Ask Copilot: Generate a commit message following conventional commits" >> "$COMMIT_MSG_FILE"
fi
```

---

## 💡 Pro Tips

### 1. Create Shortcuts

Add to your shell profile (`.bashrc`, `.zshrc`):

```bash
# Review aliases
alias copilot-review="code . && echo 'Ask Copilot: @workspace Review using .solutionsedge-tools/review-tooling/code-review-checklist.md'"

# PR template
alias pr-template="cat .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md"

# Commit template
alias commit-template="cat .solutionsedge-tools/git-workflow/commit-templates/conventional-commits.md"
```

### 2. Workspace Context Files

Create `.github/copilot-context.md` in your project:

```markdown
# Copilot Context

## Code Review Standards
Follow: .solutionsedge-tools/review-tooling/code-review-checklist.md

## Commit Format
Use: Conventional Commits from .solutionsedge-tools/git-workflow/commit-templates/

## PR Format
Use: Templates from .solutionsedge-tools/git-workflow/pr-templates/
```

### 3. Team Guidelines

Share these prompts with your team:

```markdown
# Team Copilot Prompts

## Daily Workflow

1. **Before committing:**
   `@workspace Review my staged changes`

2. **Writing commit message:**
   `@workspace Generate a conventional commit message`

3. **Creating PR:**
   `@workspace Fill out the feature PR template for my changes`

4. **Reviewing PR:**
   `@workspace Review this PR using our code-review-checklist.md`
```

---

## 📊 Measuring Effectiveness

Track how Copilot helps with reviews:

| Metric | How to Measure |
|--------|---------------|
| Issues Found | Count security/performance issues caught |
| Review Time | Compare with/without Copilot assistance |
| Consistency | Check if same standards applied across reviews |
| Learning | Track new patterns/issues team learns |

---

## 🤝 Contributing

Improve Copilot integration:

1. Share effective prompts
2. Create useful integrations
3. Document best practices
4. Submit PRs with improvements

---

## 🔗 Resources

### Official Documentation
- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Copilot Chat in VS Code](https://code.visualstudio.com/docs/copilot/copilot-chat)
- [Copilot Best Practices](https://github.blog/developer-skills/github/how-to-use-github-copilot-in-the-cli/)

### In This Repository
- [Review Tooling](../../review-tooling/)
- [Git Workflows](../../git-workflow/)
- [Main README](../../README.md)

---

**Last Updated**: January 2026
**GitHub Copilot Version**: Compatible with all versions
