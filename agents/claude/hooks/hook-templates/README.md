# Hook Templates

Starter templates for creating custom Claude Code hooks.

## Available Templates

| Template | Hook Type | Purpose | Blocking |
|----------|-----------|---------|----------|
| **[bash-pre.sh](bash-pre.sh)** | `bash-pre` | Validate Bash commands before execution | Yes |
| **[edit-pre.sh](edit-pre.sh)** | `edit-pre` | Validate file edits before applying | Yes |
| **[user-prompt-submit.sh](user-prompt-submit.sh)** | `user-prompt-submit` | Process user prompts (logging, metrics) | No |
| **[session-start.sh](session-start.sh)** | `session-start` | Initialize session, setup environment | No |

## Quick Start

### 1. Copy a Template

```bash
# Copy template to your project
cp hook-templates/bash-pre.sh .claude/hooks/my-validation.sh

# Make it executable
chmod +x .claude/hooks/my-validation.sh
```

### 2. Customize the Template

Edit the hook to add your logic:

```bash
#!/bin/bash
# Hook: My custom validation
# Purpose: Prevent specific commands

COMMAND="${BASH_COMMAND:-$1}"

# Your custom validation logic
if echo "$COMMAND" | grep -q "dangerous-command"; then
  echo "❌ BLOCKED: Dangerous command detected"
  exit 1
fi

exit 0
```

### 3. Enable in Configuration

Add to `.claude/settings.local.json`:

```json
{
  "hooks": {
    "bash-pre": {
      "command": ".claude/hooks/my-validation.sh",
      "blocking": true
    }
  }
}
```

## Template Structure

All templates follow this structure:

```bash
#!/bin/bash
# Hook: [Hook Name]
# Purpose: [Brief description]
# Blocking: [true/false]

set -e  # Exit on error

# Get input from environment variables
INPUT="${HOOK_SPECIFIC_VAR:-$1}"

# Validation or processing logic
if [ condition ]; then
  echo "❌ or ⚠️ Message"
  exit 1  # Non-zero exits block action (for blocking hooks)
fi

# Success
echo "✅ Success message"
exit 0
```

## Environment Variables

Templates use these environment variables:

| Variable | Available In | Description |
|----------|--------------|-------------|
| `CLAUDE_HOOK_TYPE` | All | Hook type being executed |
| `CLAUDE_CWD` | All | Current working directory |
| `BASH_COMMAND` | bash-pre, bash-post | Command being executed |
| `FILE_PATH` | edit-*, write-*, read-* | File path |
| `USER_PROMPT` | user-prompt-* | User's message |
| `OLD_CONTENT` | edit-post | Original file content |
| `NEW_CONTENT` | edit-post, write-post | New content |

## Common Patterns

### Pattern Matching

```bash
# Exact match
if echo "$COMMAND" | grep -qF "exact-string"; then

# Case-insensitive
if echo "$COMMAND" | grep -qi "pattern"; then

# Regex
if echo "$COMMAND" | grep -qE '^(git|npm|docker)'; then

# Multiple patterns
PATTERNS=("pattern1" "pattern2")
for pattern in "${PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -q "$pattern"; then
    # Handle match
  fi
done
```

### File Type Filtering

```bash
FILE_PATH="$1"
FILE_EXT="${FILE_PATH##*.}"

case "$FILE_EXT" in
  ts|tsx|js|jsx)
    # Handle JavaScript/TypeScript
    ;;
  py)
    # Handle Python
    ;;
  *)
    # Skip other types
    exit 0
    ;;
esac
```

### Conditional Execution

```bash
# Only run for specific commands
if ! echo "$BASH_COMMAND" | grep -q "git commit"; then
  exit 0  # Skip for non-commit commands
fi

# Rest of validation logic
```

### Logging

```bash
LOG_FILE="${HOME}/.claude/hooks.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "$TIMESTAMP,$HOOK_TYPE,$COMMAND" >> "$LOG_FILE"
```

### Error Handling

```bash
set -euo pipefail  # Strict error handling

# Trap errors
trap 'echo "❌ Hook failed at line $LINENO"' ERR

# Validate input
if [ -z "$REQUIRED_VAR" ]; then
  echo "❌ Required variable not set"
  exit 1
fi
```

## Hook Types Reference

### Blocking vs Non-Blocking

**Blocking Hooks** (pre-hooks):
- Can prevent actions by exiting non-zero
- Should be fast (< 100ms)
- Used for validation, security checks
- Types: `bash-pre`, `edit-pre`, `write-pre`, `read-pre`

**Non-Blocking Hooks** (post-hooks, session hooks):
- Always run, cannot prevent actions
- Can take longer
- Used for logging, metrics, cleanup
- Types: `bash-post`, `edit-post`, `session-start`, `session-end`, `user-prompt-*`

### When to Use Each Type

| Use Case | Hook Type | Blocking |
|----------|-----------|----------|
| Validate Bash commands | `bash-pre` | Yes |
| Log command execution | `bash-post` | No |
| Backup before edit | `edit-pre` | No |
| Format after edit | `edit-post` | No |
| Validate file templates | `write-pre` | Yes |
| Track API usage | `user-prompt-submit` | No |
| Setup environment | `session-start` | No |
| Generate summary | `session-end` | No |

## Testing Templates

### Manual Testing

```bash
# Set environment variables
export CLAUDE_HOOK_TYPE="bash-pre"
export BASH_COMMAND="rm -rf /"

# Run the hook
.claude/hooks/my-hook.sh

# Check exit code
echo $?  # 0 = success, non-zero = failure
```

### Automated Testing

```bash
#!/bin/bash
# test-hooks.sh

HOOK=".claude/hooks/my-hook.sh"

# Test case 1: Should pass
export BASH_COMMAND="npm test"
if ! $HOOK; then
  echo "❌ Test 1 failed"
  exit 1
fi

# Test case 2: Should block
export BASH_COMMAND="rm -rf /"
if $HOOK; then
  echo "❌ Test 2 failed (should have blocked)"
  exit 1
fi

echo "✅ All tests passed"
```

## Best Practices

### 1. Keep Templates Simple
- Start with basic structure
- Add complexity as needed
- Comment your logic

### 2. Use Descriptive Names
- `commit-validation.sh` not `hook1.sh`
- Include purpose in filename
- Follow naming conventions

### 3. Provide Clear Messages
```bash
# Good
echo "❌ BLOCKED: Force push to main branch not allowed"

# Bad
echo "Error: invalid command"
```

### 4. Handle Edge Cases
```bash
# Check for empty input
if [ -z "$INPUT" ]; then
  exit 0  # Skip validation
fi

# Handle missing files gracefully
if [ ! -f "$FILE_PATH" ]; then
  echo "⚠️ File not found, skipping validation"
  exit 0
fi
```

### 5. Make It Configurable
```bash
# Use environment variables for configuration
MAX_FILE_SIZE="${CLAUDE_MAX_FILE_SIZE:-1000000}"
ALLOWED_BRANCHES="${CLAUDE_ALLOWED_BRANCHES:-main,develop}"
```

## See Also

- [../examples/](../examples/) - Ready-to-use hooks
- [../README.md](../README.md) - Full hooks documentation
- [../hookify-rules.md](../hookify-rules.md) - Using /hookify command
