# Claude Code Permissions Settings

Optimized permission configurations for Claude Code covering 400+ development tools.

## 📂 Directory Structure

```
claude/settings/
├── README.md                       # This file
├── user-level/
│   └── config.json                # Global permissions (all projects)
├── project-level/
│   └── settings.local.json        # Full-stack example
└── templates/                      # Use-case specific templates
    ├── nodejs-fullstack.json      # Node.js full-stack projects
    ├── python-ml.json             # Python ML/Data Science
    ├── mobile-ios.json            # iOS development
    ├── mobile-android.json        # Android development
    ├── devops-infrastructure.json # DevOps/Infrastructure
    └── minimal.json               # Minimal starter
```

## 🚀 Quick Start

### Option 1: Use User-Level Config (Recommended)

Install global permissions that work for **all** projects:

```bash
mkdir -p ~/.config/claude
cp user-level/config.json ~/.config/claude/config.json
```

### Option 2: Use Project-Level Template

Choose a template that matches your project type:

```bash
# In your project directory
mkdir -p .claude

# Choose your template:
cp templates/nodejs-fullstack.json .claude/settings.local.json
# OR
cp templates/python-ml.json .claude/settings.local.json
# OR
cp templates/mobile-ios.json .claude/settings.local.json
```

### Option 3: Use Both (Best for Teams)

Combine user-level and project-level configs:

```bash
# Global baseline
cp user-level/config.json ~/.config/claude/config.json

# Project-specific additions
mkdir -p .claude
cp templates/your-template.json .claude/settings.local.json
```

## 📋 Template Guide

### Node.js Full-Stack (`nodejs-fullstack.json`)
**Best for**: React, Next.js, Express, Fastify, NestJS projects

**Includes:**
- pnpm, npm, yarn, bun
- Node.js testing (vitest, jest, playwright)
- TypeScript tooling
- Docker & Kubernetes
- CI/CD tools

### Python ML/Data Science (`python-ml.json`)
**Best for**: Data analysis, machine learning, scientific computing

**Includes:**
- Python package managers (pip, poetry, conda)
- Testing (pytest, mypy)
- Jupyter notebook support
- Data tools (pandas, numpy environments)
- ML frameworks support

### iOS Development (`mobile-ios.json`)
**Best for**: Native iOS apps, SwiftUI, UIKit

**Includes:**
- Xcode tooling (xcodebuild, swift, xcrun)
- iOS simulators
- Fastlane automation
- CocoaPods, Carthage
- TestFlight deployment

### Android Development (`mobile-android.json`)
**Best for**: Native Android apps, Kotlin, Java

**Includes:**
- Gradle build system
- ADB (Android Debug Bridge)
- Emulator management
- Play Store deployment
- Kotlin/Java tooling

### DevOps/Infrastructure (`devops-infrastructure.json`)
**Best for**: Infrastructure as Code, cloud deployments

**Includes:**
- Terraform, Ansible, Pulumi
- Docker, Kubernetes, Helm
- Cloud CLIs (AWS, GCP, Azure, OCI)
- Monitoring (Prometheus, Grafana)
- Security scanning

### Minimal (`minimal.json`)
**Best for**: Starting point, security-conscious environments

**Includes:**
- Basic git operations
- Read-only file operations
- Essential Unix commands
- No network tools
- No package installation

## 🔒 Security Levels

### Level 1: Minimal (Safest)
```bash
cp templates/minimal.json .claude/settings.local.json
```
- Read-only operations
- No network access
- No package installation
- Ideal for: Auditing, learning, restricted environments

### Level 2: Standard (Recommended)
```bash
cp user-level/config.json ~/.config/claude/config.json
```
- Common development tools
- Network access to documentation sites
- Package managers allowed
- Ideal for: Most development workflows

### Level 3: Full Access (Use Case Specific)
```bash
# User-level + project template
cp user-level/config.json ~/.config/claude/config.json
cp templates/nodejs-fullstack.json .claude/settings.local.json
```
- All development tools
- CI/CD capabilities
- Cloud deployment tools
- Ideal for: Production projects with CI/CD

## 📝 Customization

### Adding Tools to Template

Edit your chosen template and add tools to the appropriate section:

```json
{
  "permissions": {
    "allow": [
      "Bash(your-tool:*)",
      "Bash(custom-script.sh:*)"
    ]
  }
}
```

### Creating Custom Template

1. Start with `minimal.json`
2. Add only the tools you need
3. Organize into categories
4. Test thoroughly
5. Share with your team!

## 🎯 How Permissions Work

### File Operations (NO permissions needed)
Claude Code can **read and edit ANY file** using Read/Write/Edit tools:
- ✅ Read: `apps/*`, `src/*`, `package.json`, etc.
- ✅ Write: Create files anywhere
- ✅ Edit: Modify any existing file

### Bash Operations (Require permissions)
The `permissions.allow` list controls **Bash command execution**:
- 🔒 Requires permission: `npm install`, `git push`, `docker build`
- 🔒 Requires permission: All shell commands

## 🤝 Contributing

Have a use-case template to share?

1. Create your template in `templates/`
2. Add documentation here
3. Test with a real project
4. Submit a PR!

## 📚 Resources

- [Claude Code Documentation](https://claude.com/claude-code)
- [Permissions Best Practices](https://docs.anthropic.com/claude-code/permissions)
- Main README: `../../README.md`
