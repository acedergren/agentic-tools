# Claude Code Hooks

Automation hooks that execute in response to Claude Code events, enabling customization of AI-assisted development workflows.

## 📦 What's Included

### 🎯 Hook Types
- **Tool Hooks** - Execute before/after tool calls (Bash, Edit, Write, etc.)
- **Session Hooks** - Execute at session start/end
- **User Prompt Hooks** - Execute when user submits a message

### 📝 Example Hooks
Pre-configured hooks for common scenarios:

- **[commit-preflight.sh](examples/commit-preflight.sh)** - Pre-commit validation checks
- **[security-scan.sh](examples/security-scan.sh)** - Security scanning before Bash commands
- **[cost-tracker.sh](examples/cost-tracker.sh)** - Track API usage and costs
- **[session-summary.sh](examples/session-summary.sh)** - Summarize work done in session
- **[file-backup.sh](examples/file-backup.sh)** - Backup files before edits

### 🔧 Configuration
- **[hookify-rules.md](hookify-rules.md)** - Using the /hookify command
- **[hook-templates/](hook-templates/)** - Starter templates

---

## 🚀 Quick Start

### Enable Hooks

Hooks are configured in your Claude Code settings:

```json
// ~/.config/claude/config.json or .claude/settings.local.json
{
  "hooks": {
    "user-prompt-submit": {
      "command": ".claude/hooks/examples/cost-tracker.sh",
      "blocking": false
    },
    "bash-pre": {
      "command": ".claude/hooks/examples/security-scan.sh",
      "blocking": true
    },
    "session-start": {
      "command": ".claude/hooks/examples/session-summary.sh start",
      "blocking": false
    }
  }
}
```

### Hook Lifecycle

```
User Action
    ↓
Pre-Hook (blocking)    → Can prevent action if exits non-zero
    ↓
Claude Action (Bash, Edit, Write, etc.)
    ↓
Post-Hook (non-blocking) → Always runs, cannot prevent action
```

---

## 📖 Available Hook Types

### Tool Hooks

Execute before/after specific tool calls:

| Hook | When It Runs | Use Case |
|------|--------------|----------|
| `bash-pre` | Before Bash execution | Security scanning, validation |
| `bash-post` | After Bash execution | Logging, metrics |
| `edit-pre` | Before Edit tool | Backup, validation |
| `edit-post` | After Edit tool | Testing, formatting |
| `write-pre` | Before Write tool | Template validation |
| `write-post` | After Write tool | Auto-formatting, linting |
| `read-pre` | Before Read tool | Access control |
| `read-post` | After Read tool | Audit logging |

### Session Hooks

Execute at session boundaries:

| Hook | When It Runs | Use Case |
|------|--------------|----------|
| `session-start` | Session begins | Environment setup, context loading |
| `session-end` | Session ends | Cleanup, summary generation |
| `session-compact` | Before context compaction | Save important context |

### User Prompt Hooks

Execute when user submits messages:

| Hook | When It Runs | Use Case |
|------|--------------|----------|
| `user-prompt-submit` | User sends message | Cost tracking, logging |
| `user-prompt-receive` | Before Claude processes | Message preprocessing |

---

## 🔗 See Also

- [hookify-rules.md](hookify-rules.md) - Using /hookify command
- [examples/](examples/) - Pre-built hook examples
- [hook-templates/](hook-templates/) - Starter templates
- [../settings/](../settings/) - Claude Code permissions
- [../../git-workflow/](../../git-workflow/) - Git workflow templates

---

**Last Updated**: January 2026
**Claude Code Version**: 1.x+
