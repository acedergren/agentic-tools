#!/bin/bash
# Hook Template: bash-pre
# Purpose: Validate Bash commands before execution
# Blocking: true (prevents action if exit non-zero)

set -e

# Get the command from environment
COMMAND="${BASH_COMMAND:-$1}"

if [ -z "$COMMAND" ]; then
  echo "❌ No command provided"
  exit 1
fi

# Optional: Filter to only run for specific commands
# Uncomment and modify pattern as needed
# if ! echo "$COMMAND" | grep -qE '(git|npm|docker)'; then
#   exit 0  # Skip validation for other commands
# fi

# TODO: Add your validation logic here
# Example checks:
# - Pattern matching for dangerous commands
# - Environment variable validation
# - File existence checks
# - Permission checks

echo "🔍 Validating: $COMMAND"

# Example: Block commands with dangerous patterns
DANGEROUS_PATTERNS=(
  'rm -rf /'
  'dd if='
  'mkfs\.'
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qF "$pattern"; then
    echo "❌ BLOCKED: Dangerous pattern detected: $pattern"
    exit 1
  fi
done

# If all checks pass
echo "✅ Validation passed"
exit 0
