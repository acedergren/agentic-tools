# Claude Code Hook Examples

Ready-to-use hooks for common development scenarios.

## Available Examples

### 🔒 Security & Safety

**[security-scan.sh](security-scan.sh)** - Block dangerous Bash commands
- Prevents destructive operations (`rm -rf /`, `dd`, `mkfs`)
- Warns about sudo usage
- Blocks writes to sensitive directories
- **Hook type**: `bash-pre` (blocking)
- **Use case**: Prevent accidental system damage

### 💾 Pre-Commit Validation

**[commit-preflight.sh](commit-preflight.sh)** - Validate commits before execution
- Scans for secrets in staged files
- Detects console.log in JavaScript/TypeScript
- Runs tests before committing
- Checks for merge conflict markers
- **Hook type**: `bash-pre` (blocking, filtered to git commit)
- **Use case**: Ensure code quality before commits

### 📊 Usage Tracking

**[cost-tracker.sh](cost-tracker.sh)** - Track API usage and costs
- Estimates token usage from message length
- Calculates daily costs
- Alerts when thresholds exceeded
- Logs all usage to file
- **Hook type**: `user-prompt-submit` (non-blocking)
- **Use case**: Monitor and control API spending

### 📝 Session Management

**[session-summary.sh](session-summary.sh)** - Log session activity
- Records session start/end times
- Tracks working directory
- Calculates session duration
- **Hook type**: `session-start`, `session-end` (non-blocking)
- **Use case**: Session tracking and audit trail

### 💾 File Protection

**[file-backup.sh](file-backup.sh)** - Backup files before editing
- Creates timestamped backups
- Automatically cleans up old backups (keeps 10 most recent)
- Organized backup directory structure
- **Hook type**: `edit-pre`, `write-pre` (non-blocking)
- **Use case**: Safety net for file modifications

## Usage

### 1. Copy Example to Your Project

```bash
cp examples/security-scan.sh .claude/hooks/
chmod +x .claude/hooks/security-scan.sh
```

### 2. Enable in Settings

Add to `.claude/settings.local.json`:

```json
{
  "hooks": {
    "bash-pre": {
      "command": ".claude/hooks/security-scan.sh",
      "blocking": true
    }
  }
}
```

### 3. Test the Hook

```bash
# Test manually
.claude/hooks/security-scan.sh "rm -rf /"

# Should output:
# ❌ BLOCKED: Dangerous command detected
# Pattern: rm -rf /
```

## Configuration Examples

### Multiple Hooks for Same Type

```json
{
  "hooks": {
    "bash-pre": [
      {
        "command": ".claude/hooks/security-scan.sh",
        "blocking": true
      },
      {
        "command": ".claude/hooks/commit-preflight.sh",
        "blocking": true,
        "filter": "git commit"
      }
    ]
  }
}
```

### Conditional Execution

```json
{
  "hooks": {
    "bash-pre": {
      "command": ".claude/hooks/security-scan.sh",
      "blocking": true,
      "filter": "^(rm|dd|mkfs)"
    }
  }
}
```

### Session Lifecycle

```json
{
  "hooks": {
    "session-start": {
      "command": ".claude/hooks/session-summary.sh start",
      "blocking": false
    },
    "session-end": {
      "command": ".claude/hooks/session-summary.sh end",
      "blocking": false
    }
  }
}
```

## Customization

All examples are templates - modify them for your needs:

1. **Adjust patterns** - Change regex/grep patterns
2. **Add checks** - Include project-specific validation
3. **Modify messages** - Customize error/warning output
4. **Change thresholds** - Adjust limits and alerts

Example customization:

```bash
# In security-scan.sh, add project-specific dangerous commands
DANGEROUS_PATTERNS+=(
  'npm publish'  # Block accidental publishing
  'firebase deploy --production'  # Require manual deploy
)
```

## Combining Hooks

Create a "meta-hook" that runs multiple checks:

```bash
#!/bin/bash
# pre-commit-all.sh - Run all pre-commit checks

HOOKS=(
  ".claude/hooks/security-scan.sh"
  ".claude/hooks/commit-preflight.sh"
)

for hook in "${HOOKS[@]}"; do
  if ! "$hook" "$@"; then
    exit 1
  fi
done

exit 0
```

## Troubleshooting

### Hook Not Running

1. Check permissions: `ls -l .claude/hooks/*.sh`
2. Verify configuration in settings.local.json
3. Check hook logs: `tail -f ~/.claude/logs/hooks.log`

### False Positives

Refine the pattern matching:

```bash
# Too broad - matches any rm command
if echo "$COMMAND" | grep -q "rm"; then

# More specific - only dangerous rm patterns
if echo "$COMMAND" | grep -qE 'rm\s+-rf\s+/'; then
```

### Hook Timing Out

Increase timeout in configuration:

```json
{
  "hooks": {
    "bash-pre": {
      "command": ".claude/hooks/slow-check.sh",
      "timeout": 10000
    }
  }
}
```

## See Also

- [../README.md](../README.md) - Full hooks documentation
- [../hook-templates/](../hook-templates/) - Starter templates
- [../hookify-rules.md](../hookify-rules.md) - Using /hookify command
