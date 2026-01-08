#!/bin/bash
# Hook: Backup files before editing
# Type: edit-pre, write-pre
# Blocks: No (creates backups)

set -e

FILE_PATH="${FILE_PATH:-$1}"

if [ -z "$FILE_PATH" ]; then
  echo "⚠️ No file path provided"
  exit 0
fi

# Only backup if file exists
if [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

BACKUP_DIR="${HOME}/.claude/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILE_NAME=$(basename "$FILE_PATH")
BACKUP_PATH="$BACKUP_DIR/${FILE_NAME}.$TIMESTAMP.bak"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create backup
cp "$FILE_PATH" "$BACKUP_PATH"

echo "💾 Backup created: $BACKUP_PATH"

# Cleanup old backups (keep last 10)
BACKUP_PATTERN="$BACKUP_DIR/${FILE_NAME}.*.bak"
BACKUP_COUNT=$(ls -1 $BACKUP_PATTERN 2>/dev/null | wc -l)

if [ "$BACKUP_COUNT" -gt 10 ]; then
  echo "🧹 Cleaning up old backups..."
  ls -1t $BACKUP_PATTERN | tail -n +11 | xargs rm -f
  echo "✅ Kept 10 most recent backups"
fi

exit 0
