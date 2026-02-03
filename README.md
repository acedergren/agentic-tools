# Agentic Tools

High-quality AI agent skills for Claude Code, Cursor, Windsurf, and other skills-compatible agents. Focused on expert knowledge, decision frameworks, and anti-patterns that prevent production failures.

> **⚠️ Independent Community Project** — This project has **no official affiliation** with Oracle Corporation, Anthropic, or the Claude Code team. The Oracle Cloud (OCI) related skills and tools are community-created integrations that reference compatibility with Oracle's services, not endorsement by Oracle.

## 🎯 Featured Skills

### 📚 Agent Skills (`skills/`)

Improved skills following TDD methodology with skill-judge framework (F→C grade, 32% token reduction):

- **humanizer** (v3.0.0) - Remove AI writing patterns and make text sound human
- **shadcn-svelte-skill** (v3.0.0) - shadcn-svelte + Tailwind v4.1 architecture decisions
- **firecrawl** (v3.0.0) - Web scraping CLI returning clean Markdown from any URL
- **tanstack-query** (v3.0.0) - TanStack Query v5 migration gotchas and performance pitfalls
- **turborepo** (v3.0.0) - Monorepo architecture decisions and anti-patterns
- **refactor-module** (v3.0.0) - Terraform module extraction decision framework

Each skill includes:
- ✅ Expert-only knowledge (not Claude's base knowledge)
- ✅ Decision frameworks with clear criteria
- ✅ Anti-patterns with WHY explanations
- ✅ Individual README documenting TDD improvements
- ✅ <300 lines core content (progressive disclosure)

### 🔐 Claude Code Configuration (`claude/settings/`)
- **User-Level Config** - Global permissions (400+ commands) for all projects
- **Project-Level Config** - Project-specific permissions example
- Covers Node.js, Python, iOS, Android, Go, Rust, C/C++, Ruby, PHP, Perl, and more
- Full DevOps stack: Docker, Kubernetes, Terraform, Ansible
- All cloud platforms: AWS, GCP, Azure, OCI, Cloudflare

### 🔄 Git Workflows (`git-workflow/`)
- **Workflow Guides** - Trunk-Based, GitHub Flow, GitFlow strategies
- **Commit Templates** - 8 templates for Conventional Commits
- **PR Templates** - 6 templates for different change types
- **Branch Naming** - Conventions and enforcement strategies

### 🪝 Claude Hooks (`claude/hooks/`)
- **5 Example Hooks** - Security, pre-commit, cost tracking, session logging, backups
- **4 Hook Templates** - Starter templates for custom hooks
- **Hookify Guide** - Using /hookify command to create hooks from conversations
- **Full Documentation** - Configuration, testing, best practices

---

## 🚀 Quick Start

### Install Skills

Use the skills CLI to install any skill:

```bash
# Install a specific skill
npx skills add acedergren/agentic-tools/humanizer

# Or install from the skills directory
cd ~/.agents/skills
git clone https://github.com/acedergren/agentic-tools.git
cp -r agentic-tools/skills/* .
```

### Claude Code Setup

### User-Level Setup (Recommended)

Global permissions that apply to **all** Claude Code projects:

```bash
# 1. Create Claude config directory
mkdir -p ~/.config/claude

# 2. Copy user-level config
cp claude/settings/user-level/config.json ~/.config/claude/config.json

# 3. Verify
ls -lh ~/.config/claude/config.json
```

### Project-Level Setup (Optional)

For project-specific permissions:

```bash
# In your project directory
mkdir -p .claude
cp claude/settings/project-level/settings.local.json .claude/settings.local.json
```

---

## 🎯 Claude Permissions - What's Covered

### Development Tools (400+ commands)

#### Core Development
- **Node.js**: pnpm, npm, npx, node, yarn, bun, deno, turbo, nx
- **Python**: python3, pip, pytest, mypy, black, isort, ruff, poetry, pipenv
- **iOS/macOS**: xcodebuild, swift, xcrun, swiftlint, fastlane, pod
- **Android**: gradle, adb, emulator
- **Java/JVM**: java, maven, gradle, kotlin, scala
- **Ruby**: ruby, gem, bundle, rails, rspec, rubocop
- **Go**: go, gofmt, golangci-lint
- **Rust**: cargo, rustc, rustfmt, clippy
- **C/C++**: gcc, clang, make, cmake, gdb, lldb, valgrind
- **Perl**: perl, cpan
- **PHP**: php, composer, phpunit

#### Version Managers
- nvm, pyenv, rbenv, asdf, tfenv, goenv, jenv, sdkman

#### Infrastructure as Code
- **Terraform**: terraform, terragrunt, tflint, tfsec
- **Ansible**: ansible, ansible-playbook, ansible-vault
- **Pulumi**: pulumi

#### Cloud Platforms
- **Oracle Cloud (OCI)**: oci, sqlcl, sql, sqlplus
- **AWS**: aws
- **Google Cloud**: gcloud
- **Azure**: az
- **Others**: doctl, fly, vercel, netlify, railway
- **Cloudflare**: wrangler, cloudflare, cloudflared

#### Containers & Orchestration
- **Docker**: docker, docker-compose, podman
- **Kubernetes**: kubectl, k9s, helm, minikube, kind, skaffold

#### Databases
- PostgreSQL, MySQL, SQLite, MongoDB, Redis, InfluxDB, Cassandra

#### Testing & Quality
- **Testing**: vitest, jest, playwright, cypress, selenium
- **Linting**: eslint, prettier, shellcheck, shfmt
- **Security**: snyk, semgrep, trivy, grype, syft

#### Observability
- grafana-cli, prometheus, alertmanager, loki, tempo, opentelemetry

#### System Package Managers
- brew, apt, dnf, yum, pacman, snap, flatpak, nix

#### Modern CLI Tools
- **File Operations**: exa, eza, lsd, fd, ripgrep, bat
- **Navigation**: zoxide, fzf
- **Monitoring**: procs, dust, duf, btop, glances
- **Performance**: hyperfine, tokei

#### System Tools
- **Terminal**: tmux, screen, byobu, zellij
- **SSH/Security**: ssh-keygen, gpg, age, sops
- **Debugging**: strace, ltrace, perf, gdb, lldb
- **Network**: tcpdump, nmap, mtr, speedtest
- **Compression**: tar, zip, gzip, zstd, lz4, 7z

#### All Standard Unix Commands
- ls, cat, grep, find, sed, awk, base64, cut, sort, uniq, diff, chmod, chown, mkdir, cp, mv, rm, ln, ps, kill, curl, wget, ssh, rsync, and 100+ more

---

## 📊 Configuration Stats

### User-Level Config
- **Size**: 615 lines (21 KB)
- **Bash Commands**: 400+ permission patterns
- **Categories**: 30+ organized sections
- **Scope**: All Claude Code projects

### Project-Level Example
- **Size**: 296 lines (9.6 KB)
- **Focus**: Project-specific tools, scripts, MCP servers
- **Includes**: Serena MCP, Snyk, Playwright, custom skills

---

## 🔒 Security Philosophy

### Two-Tier Permission Strategy

```
User-Level (~/.config/claude/config.json)
    ↓ Global baseline - safe everywhere
    ↓
Project-Level (.claude/settings.local.json)
    ↓ Project-specific extensions
    ↓
Final Permission Set (merged)
```

**User-Level**: Conservative, universal tools safe across all projects
**Project-Level**: Aggressive, project-specific tools and scripts

### What's NOT Included (By Design)

- ❌ Destructive operations without wildcards (rm -rf /, dd, mkfs)
- ❌ System modification commands (reboot, shutdown, init)
- ❌ Direct file path permissions (antipattern - use Read/Write tools instead)

---

## 📝 Customization

### Adding New Commands

Edit your local config and add to the appropriate section:

```json
{
  "permissions": {
    "allow": [
      "# ============================================",
      "# Your Custom Section",
      "# ============================================",
      "Bash(your-tool:*)",
      "Bash(another-tool:*)"
    ]
  }
}
```

### Permission Patterns

- `Bash(tool:*)` - Allow all subcommands
- `Bash(tool subcommand:*)` - Allow specific subcommand with arguments
- `WebFetch(domain:example.com)` - Allow fetching from domain
- `mcp__server__tool` - Allow specific MCP server tool

---

## 🔍 Comparison: Before vs After

### Before Optimization
- **Entries**: 432 granular permissions
- **Size**: 40 KB
- **Issues**:
  - Missing 91 common commands
  - Hardcoded file paths
  - Duplicate patterns
  - No organization

### After Optimization
- **Entries**: 400+ organized patterns
- **Size**: 21 KB (48% reduction)
- **Improvements**:
  - ✅ All common dev tools covered
  - ✅ Organized into 30+ categories
  - ✅ Consolidated patterns
  - ✅ Best practices applied

---

## 🎓 Learning Resources

- [Claude Code Documentation](https://claude.com/claude-code)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Permissions Best Practices](https://docs.anthropic.com/claude-code/permissions)

---

## 📁 Repository Structure

```
solutionsedge-agentic-tools/
├── README.md
├── LICENSE (AGPL-3.0)
├── claude/
│   ├── settings/
│   │   ├── user-level/
│   │   │   └── config.json              # Global permissions (400+ commands)
│   │   ├── project-level/
│   │   │   └── settings.local.json      # Project example
│   │   └── templates/                    # 4 use-case templates
│   └── hooks/
│       ├── README.md                     # Hooks documentation
│       ├── hookify-rules.md              # Using /hookify command
│       ├── examples/                     # 5 ready-to-use hooks
│       │   ├── commit-preflight.sh
│       │   ├── security-scan.sh
│       │   ├── cost-tracker.sh
│       │   ├── session-summary.sh
│       │   └── file-backup.sh
│       └── hook-templates/               # 4 starter templates
│           ├── bash-pre.sh
│           ├── edit-pre.sh
│           ├── user-prompt-submit.sh
│           └── session-start.sh
├── git-workflow/
│   ├── README.md                         # Workflow comparison & setup
│   ├── workflows/                        # 3 workflow strategies
│   │   ├── trunk-based.md
│   │   ├── github-flow.md
│   │   └── gitflow.md
│   ├── commit-templates/                 # 8 commit templates
│   │   ├── conventional-commits.md
│   │   ├── feature-template.txt
│   │   ├── fix-template.txt
│   │   └── ... (5 more templates)
│   ├── pr-templates/                     # 6 PR templates
│   │   ├── feature-pr.md
│   │   ├── bugfix-pr.md
│   │   └── ... (4 more templates)
│   └── branch-naming/                    # Branch naming guide
│       └── conventions.md
└── .gitignore
```

---

## 🤝 Contributing

Found a missing tool or best practice? PRs welcome!

1. Add the tool to the appropriate category
2. Follow existing naming patterns
3. Add to this README
4. Test the configuration

---

## 📜 License & Disclaimer

MIT License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Key Points:**
- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- ✅ No copyleft restrictions
- ✅ Attribution required

**Legal Disclaimer:**

This is an independent community project with **no official affiliation, partnership, or endorsement** from:
- **Oracle Corporation** — OCI-related skills reference compatibility with Oracle Cloud services
- **Anthropic** — Skills are designed for Claude Code but are community-created
- **Any other mentioned products or services** — References indicate compatibility, not affiliation

This software is provided "as is" without warranty of any kind. The authors bear no liability for damages arising from its use. You are responsible for compliance with all applicable laws, terms of service, and licensing requirements.

---

## 🙏 Acknowledgments

**Solutions Edge** - Agentic Tools for Modern Development

- Optimized for solo developers, small teams, and enterprise use
- Covers 10+ programming languages and frameworks
- Includes modern DevOps tools (Docker, Kubernetes, Terraform, Ansible)
- Full cloud platform support (AWS, GCP, Azure, OCI, Cloudflare)
- Security-focused with Snyk, Semgrep, Trivy integration

---

**Last Updated**: January 2026
**Claude Code Version**: Compatible with latest CLI
