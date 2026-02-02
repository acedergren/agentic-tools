#!/bin/bash
# Hook: Security scan for dangerous Bash commands
# Type: bash-pre
# Blocks: Dangerous commands that could harm the system

set -e

COMMAND="${BASH_COMMAND:-$1}"

if [ -z "$COMMAND" ]; then
  echo "❌ No command provided"
  exit 1
fi

echo "🔒 Security scan: $COMMAND"

# Block destructive commands
DANGEROUS_PATTERNS=(
  'rm -rf /'
  'rm -rf /\*'
  'dd if='
  'mkfs\.'
  ':(){:|:&};:'  # Fork bomb
  'chmod -R 777 /'
  'chown -R'
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qF "$pattern"; then
    echo "❌ BLOCKED: Dangerous command detected"
    echo "Pattern: $pattern"
    exit 1
  fi
done

# Warn about sudo usage
if echo "$COMMAND" | grep -q 'sudo'; then
  echo "⚠️ WARNING: Command uses sudo"
  echo "Command: $COMMAND"
  # Allow but warn - return 0
fi

# Block commands writing to sensitive directories without confirmation
if echo "$COMMAND" | grep -qE '(rm|mv|cp).*/(etc|boot|sys|proc)'; then
  echo "❌ BLOCKED: Command targets sensitive system directory"
  exit 1
fi

echo "✅ Security scan passed"
exit 0
