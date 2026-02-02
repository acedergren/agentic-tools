# Solutions Edge - Agentic Tools

**Agent-Agnostic** toolkit for AI-assisted development with support for Claude Code, GitHub Copilot, Cursor, Windsurf, and more. Includes code review tooling, Git workflows, automation hooks, and agent-specific configurations.

## 📦 What's Included

### 🤖 Multi-Agent Support (`agents/`)
Configurations for multiple AI coding assistants:
- **[Claude Code](agents/claude/)** - Permissions (400+ commands), hooks, MCP servers
- **[GitHub Copilot](agents/copilot/)** - VS Code integration, GitHub workflows
- **[Cursor](agents/cursor/)** - .cursorrules, IDE features, Composer mode
- **[Windsurf](agents/windsurf/)** - Context files, Cascade mode for multi-file operations

### 📋 Code Review Tooling (`review-tooling/`)
**Agent-agnostic** code review resources:
- **[Code Review Checklist](review-tooling/code-review-checklist.md)** - Comprehensive quality, security, and testing checklist
- **[PR Review Guidelines](review-tooling/pr-review-guidelines.md)** - Step-by-step review process with AI prompts
- **Multi-Agent Workflows** - Examples for all supported agents

### 🔄 Git Workflows (`git-workflow/`)
**Agent-agnostic** Git workflow templates:
- **Workflow Guides** - Trunk-Based, GitHub Flow, GitFlow strategies
- **Commit Templates** - 8 templates for Conventional Commits
- **PR Templates** - 6 templates for different change types
- **Branch Naming** - Conventions and enforcement strategies

---

## 🚀 Quick Start

### Choose Your AI Assistant

Select your preferred AI coding assistant for setup instructions:

#### [Claude Code →](agents/claude/README.md)
- **Best for:** Advanced automation, custom workflows, strict security
- **Features:** Explicit permissions, hooks system, MCP support
- **Setup time:** 5 minutes

```bash
# Install global permissions
mkdir -p ~/.config/claude
cp agents/claude/settings/user-level/config.json ~/.config/claude/config.json
```

#### [GitHub Copilot →](agents/copilot/README.md)
- **Best for:** GitHub workflows, VS Code users, team collaboration
- **Features:** Chat integration, inline suggestions, workspace awareness
- **Setup time:** 2 minutes

```bash
# Clone this repo for reference
git clone https://github.com/acedergren/solutionsedge-agentic-tools.git ~/.solutionsedge-tools
```

#### [Cursor →](agents/cursor/README.md)
- **Best for:** Fast iteration, inline editing, modern IDE experience
- **Features:** .cursorrules, Composer mode, context awareness
- **Setup time:** 3 minutes

```bash
# Add to your project
cd your-project
git submodule add https://github.com/acedergren/solutionsedge-agentic-tools.git .solutionsedge-tools

# Create .cursorrules (see agents/cursor/README.md)
```

#### [Windsurf →](agents/windsurf/README.md)
- **Best for:** Multi-file refactoring, large changes, code exploration
- **Features:** Cascade mode, smart context, Codeium integration
- **Setup time:** 3 minutes

```bash
# Clone for reference
git clone https://github.com/acedergren/solutionsedge-agentic-tools.git ~/.solutionsedge-tools
```

### Use Agent-Agnostic Tools

All agents can use the review tooling and git workflows:

```bash
# Code Review
# In any AI assistant:
"Review this code using .solutionsedge-tools/review-tooling/code-review-checklist.md"

# Commit Messages
# Reference: .solutionsedge-tools/git-workflow/commit-templates/

# PR Descriptions  
# Use: .solutionsedge-tools/git-workflow/pr-templates/feature-pr.md
```

---

## 🎯 Features Overview

### Agent-Agnostic Code Review Tooling

✅ **Comprehensive checklist** covering:
- Code quality and functionality
- Security vulnerabilities (XSS, SQL injection, hardcoded secrets)
- Testing coverage and quality
- Documentation requirements
- Performance considerations
- Architecture and design patterns

✅ **Step-by-step review guidelines** including:
- Workflow for systematic reviews
- Agent-specific examples (Copilot, Claude, Cursor, Windsurf)
- Effective review comment writing
- Approval criteria and scope guidelines

✅ **Works with all AI assistants** - Same checklist, consistent results

### Git Workflows & Templates

✅ **Three workflow strategies:**
- Trunk-Based Development - Fast, CI/CD-focused
- GitHub Flow - Simple, PR-based workflow
- GitFlow - Feature branches with release management

✅ **Conventional Commit templates:**
- 8 commit message templates for different change types
- Automated commit message generation prompts
- Examples for each commit type

✅ **PR description templates:**
- 6 templates: feature, bugfix, hotfix, docs, breaking changes, minimal
- Complete with checklists and structured sections
- GitHub/GitLab ready

✅ **Branch naming conventions:**
- Clear patterns for different change types
- Examples and enforcement strategies

### Agent-Specific Configurations

✅ **Claude Code** ([agents/claude/](agents/claude/)):
- 400+ bash command permissions
- Pre/post action hooks for automation
- MCP server support
- Session and cost tracking

✅ **GitHub Copilot** ([agents/copilot/](agents/copilot/)):
- VS Code integration guide
- Copilot Chat prompts library
- GitHub Actions integration
- Workspace settings

✅ **Cursor** ([agents/cursor/](agents/cursor/)):
- .cursorrules configuration examples
- Composer mode workflows
- Context-aware assistance patterns
- Team adoption guide

✅ **Windsurf** ([agents/windsurf/](agents/windsurf/)):
- Cascade mode for multi-file operations
- Project context configuration
- Codeium integration
- Advanced features guide

---

## 🔄 Multi-Agent Philosophy

This repository supports a **multi-agent** approach to AI-assisted development:

### Core Principles

1. **Agent-Agnostic Standards** - Review tooling and Git workflows work with any AI assistant
2. **Agent-Specific Optimizations** - Each agent has unique features that can be leveraged
3. **Team Flexibility** - Team members can use different agents with consistent standards
4. **Progressive Adoption** - Start with one agent, expand to others as needed

### When to Use Which Agent

| Use Case | Recommended Agent | Why |
|----------|-------------------|-----|
| **Strict Security** | Claude Code | Explicit permissions, pre-action hooks |
| **GitHub Teams** | GitHub Copilot | Native GitHub integration, familiar to VS Code users |
| **Fast Iteration** | Cursor | Best-in-class inline editing, Composer mode |
| **Large Refactors** | Windsurf | Cascade mode for multi-file operations |
| **Mixed Teams** | Any/All | Use agent-agnostic tooling for consistency |


---

## 📁 Repository Structure

```
solutionsedge-agentic-tools/
├── README.md                         # This file
├── LICENSE                           # AGPL-3.0
│
├── agents/                           # Agent-specific configurations
│   ├── README.md                     # Multi-agent guide
│   ├── claude/                       # Claude Code
│   │   ├── README.md
│   │   ├── settings/                 # Permissions (400+ commands)
│   │   │   ├── user-level/
│   │   │   │   └── config.json
│   │   │   └── templates/            # 4 use-case templates
│   │   └── hooks/                    # Automation hooks
│   │       ├── README.md
│   │       ├── hookify-rules.md
│   │       ├── examples/             # 5 ready-to-use hooks
│   │       └── hook-templates/       # 4 starter templates
│   ├── copilot/                      # GitHub Copilot
│   │   └── README.md                 # Setup & integration guide
│   ├── cursor/                       # Cursor IDE
│   │   └── README.md                 # .cursorrules & workflows
│   └── windsurf/                     # Windsurf IDE
│       └── README.md                 # Cascade mode & context
│
├── review-tooling/                   # Agent-agnostic review tools
│   ├── README.md                     # Review tooling guide
│   ├── code-review-checklist.md      # Comprehensive checklist
│   └── pr-review-guidelines.md       # Step-by-step process
│
└── git-workflow/                     # Agent-agnostic Git tools
    ├── README.md                     # Workflow comparison
    ├── workflows/                    # 3 workflow strategies
    │   ├── trunk-based.md
    │   ├── github-flow.md
    │   └── gitflow.md
    ├── commit-templates/             # 8 commit templates
    │   ├── conventional-commits.md
    │   ├── feature-template.txt
    │   └── ... (5 more)
    ├── pr-templates/                 # 6 PR templates
    │   ├── feature-pr.md
    │   ├── bugfix-pr.md
    │   └── ... (4 more)
    └── branch-naming/                # Branch conventions
        └── conventions.md
```

---

## 🎓 Learning Resources

### Agent Documentation
- **Claude Code**: [agents/claude/README.md](agents/claude/README.md)
- **GitHub Copilot**: [agents/copilot/README.md](agents/copilot/README.md)
- **Cursor**: [agents/cursor/README.md](agents/cursor/README.md)
- **Windsurf**: [agents/windsurf/README.md](agents/windsurf/README.md)

### Official Resources
- [Claude Code Documentation](https://claude.com/claude-code)
- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [Cursor Documentation](https://cursor.sh/docs)
- [Windsurf IDE](https://codeium.com/windsurf)

### Community
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Trunk-Based Development](https://trunkbaseddevelopment.com/)

---

## 🤝 Contributing

Help make this toolkit better for everyone!

### What to Contribute

1. **Agent integrations** - Add support for new AI coding assistants
2. **Review templates** - Improve checklists and guidelines
3. **Workflow patterns** - Share successful Git workflows
4. **Agent-specific tips** - Best practices for each agent
5. **Bug fixes** - Correct errors or outdated information

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following existing patterns
4. Test with at least one AI agent
5. Update documentation
6. Submit a pull request

---

## 📜 License

GNU Affero General Public License v3.0 (AGPL-3.0)

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

**Key Points:**
- ✅ Free to use, modify, and distribute
- ✅ Must disclose source code
- ✅ Must use same AGPL-3.0 license for derivatives
- ✅ Network use triggers copyleft (SaaS/API services must open-source)
- ✅ Patent grant included

---


## 🙏 Acknowledgments

**Solutions Edge** - Agent-Agnostic Tools for Modern Development

### Coverage
- ✅ **Multi-Agent Support** - Claude Code, GitHub Copilot, Cursor, Windsurf
- ✅ **Code Review Tooling** - Comprehensive checklists and guidelines
- ✅ **Git Workflows** - Trunk-Based, GitHub Flow, GitFlow
- ✅ **Developer Tools** - 400+ commands (Claude Code permissions)
- ✅ **All Ecosystems** - Node.js, Python, Go, Rust, iOS, Android, and more
- ✅ **DevOps Ready** - Docker, Kubernetes, Terraform, Ansible
- ✅ **Cloud Platforms** - AWS, GCP, Azure, OCI, Cloudflare
- ✅ **Security-Focused** - Review checklists, security scanning patterns

### Use Cases
- 📱 Solo developers using any AI coding assistant
- 👥 Small teams with mixed agent preferences
- 🏢 Enterprise teams requiring consistent standards
- 🎓 Learning effective code review practices
- 🔒 Security-conscious development workflows

---

**Last Updated**: January 2026
**Version**: 2.0 - Multi-Agent Support
**Compatible With**: Claude Code, GitHub Copilot, Cursor, Windsurf, and other AI coding assistants
