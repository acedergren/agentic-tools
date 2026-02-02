#!/bin/bash
# Hook: Pre-commit validation
# Type: bash-pre
# Blocks: git commit commands with issues

set -e

# Only run for git commit commands
if ! echo "$BASH_COMMAND" | grep -q "git commit"; then
  exit 0
fi

echo "🔍 Running pre-commit checks..."

# Check for secrets in staged files
if git diff --cached | grep -iE '(api_key|password|secret|token).*=.*["\047][^"\047]{8,}'; then
  echo "❌ Potential secret detected in staged changes"
  echo "Review your changes and remove any hardcoded secrets"
  exit 1
fi

# Check for console.log in JavaScript/TypeScript
if git diff --cached --name-only | grep -E '\.(js|ts|jsx|tsx)$' > /dev/null; then
  if git diff --cached | grep -E '^\+.*console\.(log|debug|info)'; then
    echo "⚠️ Warning: console.log detected in staged changes"
    echo "Consider removing debug statements before committing"
  fi
fi

# Run tests if package.json exists
if [ -f "package.json" ]; then
  echo "🧪 Running tests..."
  if ! npm test 2>/dev/null; then
    echo "❌ Tests failed"
    exit 1
  fi
fi

# Check for merge conflicts
if git diff --cached | grep -E '^[<>=]{7}'; then
  echo "❌ Merge conflict markers detected"
  exit 1
fi

echo "✅ Pre-commit checks passed"
exit 0
