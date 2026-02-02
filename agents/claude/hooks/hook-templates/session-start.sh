#!/bin/bash
# Hook Template: session-start
# Purpose: Initialize session, setup environment
# Blocking: false (non-blocking, for setup tasks)

set -e

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
SESSION_DIR="${HOME}/.claude/sessions"
CWD=$(pwd)

echo "🚀 Session starting..."

# TODO: Add your initialization logic here
# Example uses:
# - Load project context
# - Setup environment variables
# - Start development services
# - Create session log
# - Display project status

# Example: Create session log
mkdir -p "$SESSION_DIR"
SESSION_FILE="$SESSION_DIR/$(date +%Y%m%d_%H%M%S).log"

cat > "$SESSION_FILE" << EOF
=== Claude Code Session Started ===
Time: $TIMESTAMP
Directory: $CWD
User: $(whoami)
Git Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "N/A")

EOF

echo "📝 Session log: $SESSION_FILE"

# Example: Display project status
if [ -f "package.json" ]; then
  echo "📦 Project: $(jq -r .name package.json 2>/dev/null || echo "Unknown")"
  echo "📦 Version: $(jq -r .version package.json 2>/dev/null || echo "Unknown")"
fi

if [ -d ".git" ]; then
  echo "🔀 Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
  echo "📝 Last commit: $(git log -1 --pretty=format:'%h - %s' 2>/dev/null)"
fi

echo "✅ Session initialized"
exit 0
