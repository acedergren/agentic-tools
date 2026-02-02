# Claude Code Configuration

Configuration and best practices for using this repository's tools with **Claude Code**.

---

## 📦 What's Included

Claude Code has comprehensive support including:

- ✅ **Permissions** ([settings/](settings/)) - Pre-configured bash permissions for 400+ commands
- ✅ **Hooks** ([hooks/](hooks/)) - Automation hooks for various Claude Code events
- ✅ **Review Tooling** ([../../review-tooling/](../../review-tooling/)) - Agent-agnostic code review tools
- ✅ **Git Workflows** ([../../git-workflow/](../../git-workflow/)) - Commit templates, PR templates, branching strategies

---

## 🚀 Quick Start

### Prerequisites

1. **Claude Code CLI** installed
2. **Anthropic API key** configured
3. **Git** installed and configured

### Setup Permissions

#### User-Level (Recommended)

Global permissions that apply to **all** Claude Code projects:

```bash
# Create Claude config directory
mkdir -p ~/.config/claude

# Copy user-level config
cp settings/user-level/config.json ~/.config/claude/config.json

# Verify
ls -lh ~/.config/claude/config.json
```

#### Project-Level (Optional)

For project-specific permissions:

```bash
# In your project directory
mkdir -p .claude

# Choose a template from settings/templates/
cp settings/templates/nodejs-fullstack.json .claude/settings.local.json

# Or create custom config
# Edit .claude/settings.local.json
```

### Setup Hooks (Optional)

```bash
# Copy hooks to your project
mkdir -p .claude/hooks
cp hooks/examples/*.sh .claude/hooks/

# Configure in .claude/settings.local.json
# See hooks/README.md for details
```

---

## 📋 Directory Structure

```
agents/claude/
├── README.md                    # This file
├── settings/                    # Permission configurations
│   ├── README.md
│   ├── user-level/
│   │   └── config.json          # 400+ commands, 21KB
│   └── templates/               # Use-case templates
│       ├── minimal.json
│       ├── nodejs-fullstack.json
│       ├── python-ml.json
│       └── mobile-ios.json
└── hooks/                       # Automation hooks
    ├── README.md
    ├── hookify-rules.md
    ├── examples/                # Ready-to-use hooks
    │   ├── commit-preflight.sh
    │   ├── security-scan.sh
    │   ├── cost-tracker.sh
    │   ├── session-summary.sh
    │   └── file-backup.sh
    └── hook-templates/          # Starter templates
        ├── bash-pre.sh
        ├── edit-pre.sh
        ├── user-prompt-submit.sh
        └── session-start.sh
```

---

## 💬 Using Claude Code for Reviews

### Basic Review

```typescript
// In Claude Code conversation
Review this file using ../../review-tooling/code-review-checklist.md

// Full PR review
Review all my changes for this PR using ../../review-tooling/pr-review-guidelines.md

// Security-focused
Check this code for security issues per the security section in ../../review-tooling/code-review-checklist.md
```

### Systematic Review with Hooks

Use the review hooks for automated checks:

```json
// In .claude/settings.local.json
{
  "hooks": {
    "bash-pre": {
      "command": ".claude/hooks/security-scan.sh",
      "blocking": true
    },
    "edit-pre": {
      "command": ".claude/hooks/commit-preflight.sh",
      "blocking": true
    }
  }
}
```

---

## 🎯 Claude Code-Specific Features

### 1. Permission Management

Claude Code requires explicit bash command permissions:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Bash(pytest:*)"
    ]
  }
}
```

**Benefits:**
- ✅ Security: Explicit control over commands
- ✅ Safety: Prevents accidental destructive operations
- ✅ Transparency: Know what Claude can execute

**See:** [settings/README.md](settings/README.md) for full details

### 2. Hooks System

Execute custom scripts at various points:

| Hook Type | When It Runs | Use Case |
|-----------|--------------|----------|
| `bash-pre` | Before bash execution | Security scanning |
| `edit-pre` | Before file edits | Code quality checks |
| `session-start` | Session begins | Load context |
| `user-prompt-submit` | User sends message | Cost tracking |

**See:** [hooks/README.md](hooks/README.md) for full details

### 3. MCP Server Integration

Claude Code supports MCP (Model Context Protocol) servers:

```json
{
  "permissions": {
    "allow": [
      "mcp__server__tool_name:*"
    ]
  }
}
```

---

## 📝 Workflow Integration

### Pre-Commit Review Hook

Create `.claude/hooks/pre-commit-review.sh`:

```bash
#!/bin/bash
# Pre-commit review hook for Claude Code

CHECKLIST="../../review-tooling/code-review-checklist.md"

echo "📋 Running pre-commit review checklist..."
echo ""
echo "Items to verify:"
echo "- [ ] Code quality and readability"
echo "- [ ] Security considerations"
echo "- [ ] Test coverage"
echo "- [ ] Documentation updated"
echo ""
echo "Full checklist: $CHECKLIST"
echo ""

exit 0
```

Configure in `.claude/settings.local.json`:

```json
{
  "hooks": {
    "user-prompt-submit": {
      "command": ".claude/hooks/pre-commit-review.sh",
      "blocking": false
    }
  }
}
```

### Code Review Workflow

1. **Check out branch** to review
2. **Ask Claude** to review systematically:
   ```
   Review this PR using ../../review-tooling/pr-review-guidelines.md
   ```
3. **Go through each section**:
   - Code quality
   - Security
   - Testing
   - Documentation
4. **Generate review comments**
5. **Summarize findings**

---

## 🔧 Configuration Examples

### Full-Stack Development

```json
{
  "permissions": {
    "allow": [
      "# Frontend & Backend",
      "Bash(npm:*)",
      "Bash(pnpm:*)",
      "Bash(node:*)",
      
      "# Testing",
      "Bash(jest:*)",
      "Bash(vitest:*)",
      "Bash(playwright:*)",
      
      "# Linting & Formatting",
      "Bash(eslint:*)",
      "Bash(prettier:*)",
      
      "# Git",
      "Bash(git:*)"
    ]
  },
  "hooks": {
    "edit-pre": {
      "command": ".claude/hooks/commit-preflight.sh",
      "blocking": true
    },
    "bash-pre": {
      "command": ".claude/hooks/security-scan.sh",
      "blocking": true
    }
  }
}
```

### Python Data Science

```json
{
  "permissions": {
    "allow": [
      "# Python",
      "Bash(python:*)",
      "Bash(python3:*)",
      "Bash(pip:*)",
      "Bash(poetry:*)",
      
      "# Testing & Quality",
      "Bash(pytest:*)",
      "Bash(black:*)",
      "Bash(mypy:*)",
      
      "# Data Science Tools",
      "Bash(jupyter:*)",
      
      "# Git",
      "Bash(git:*)"
    ]
  }
}
```

---

## 💡 Pro Tips

### 1. Leverage Read/Write/Edit Tools

Claude Code has powerful file manipulation tools:

```
Read the file at src/auth/login.ts
Edit the function on line 45 to add error handling
Create a new file at src/utils/validation.ts
```

These **don't require permissions** - permissions are only for bash commands.

### 2. Use Hooks for Automation

```bash
# Cost tracking hook
#!/bin/bash
# .claude/hooks/cost-tracker.sh

echo "API Tokens Used: $(cat .claude/token-count.txt 2>/dev/null || echo 0)" >> .claude/usage.log
```

### 3. Template-Based Responses

```
Generate a commit message using ../../git-workflow/commit-templates/conventional-commits.md

Create a PR description using ../../git-workflow/pr-templates/feature-pr.md
```

### 4. Systematic Reviews

```
Review this codebase section by section:
1. First, review security using ../../review-tooling/code-review-checklist.md#security
2. Then, review code quality
3. Finally, check testing coverage
```

---

## 🎓 Advanced Usage

### Using the Hookify Command

Claude Code can generate hooks from conversation:

```
/hookify create a pre-commit hook that checks for console.log statements
```

See [hooks/hookify-rules.md](hooks/hookify-rules.md) for details.

### Permission Scopes

```json
{
  "permissions": {
    "allow": [
      "# Specific command with specific arg",
      "Bash(git status:)",
      
      "# Command with any subcommand",
      "Bash(npm:*)",
      
      "# Specific subcommand with any args",
      "Bash(git push:*)",
      
      "# Web fetch",
      "WebFetch(domain:docs.python.org)"
    ]
  }
}
```

---

## 🔗 Integration with Other Tools

### GitHub Actions

```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review-reminder:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      
      - name: Add Review Checklist
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const checklist = fs.readFileSync('.solutionsedge-tools/review-tooling/code-review-checklist.md', 'utf8');
            
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: `## 📋 Claude Code Review Checklist\n\n${checklist}`
            });
```

---

## 📚 Resources

### In This Repository
- [Settings Documentation](settings/README.md)
- [Hooks Documentation](hooks/README.md)
- [Review Tooling](../../review-tooling/)
- [Git Workflows](../../git-workflow/)

### Official Documentation
- [Claude Code Documentation](https://claude.com/claude-code)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Permissions Best Practices](https://docs.anthropic.com/claude-code/permissions)
- [Hooks Documentation](https://docs.anthropic.com/claude-code/hooks)

---

## 🤝 Contributing

Improve Claude Code integration:

1. **Add useful hooks**
2. **Share permission templates**
3. **Document best practices**
4. **Submit PRs**

---

**Last Updated**: January 2026
**Claude Code Version**: 1.x+
