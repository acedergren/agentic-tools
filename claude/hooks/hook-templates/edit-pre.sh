#!/bin/bash
# Hook Template: edit-pre
# Purpose: Validate file edits before applying changes
# Blocking: true (prevents edit if exit non-zero)

set -e

# Get file path from environment
FILE_PATH="${FILE_PATH:-$1}"

if [ -z "$FILE_PATH" ]; then
  echo "❌ No file path provided"
  exit 1
fi

echo "📝 Validating edit: $FILE_PATH"

# Example: Only validate specific file types
FILE_EXT="${FILE_PATH##*.}"
case "$FILE_EXT" in
  ts|tsx|js|jsx)
    echo "🔍 Validating TypeScript/JavaScript file..."
    # Add your validation logic
    ;;
  py)
    echo "🔍 Validating Python file..."
    # Add your validation logic
    ;;
  *)
    # Skip validation for other types
    exit 0
    ;;
esac

# TODO: Add your validation logic here
# Example checks:
# - File exists and is writable
# - Backup file before editing
# - Check file size limits
# - Validate file templates

# Example: Create backup
if [ -f "$FILE_PATH" ]; then
  BACKUP_DIR="${HOME}/.claude/backups"
  mkdir -p "$BACKUP_DIR"
  cp "$FILE_PATH" "$BACKUP_DIR/$(basename "$FILE_PATH").$(date +%s).bak"
  echo "💾 Backup created"
fi

echo "✅ Validation passed"
exit 0
