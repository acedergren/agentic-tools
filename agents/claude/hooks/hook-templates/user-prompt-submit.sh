#!/bin/bash
# Hook Template: user-prompt-submit
# Purpose: Process user prompts (logging, metrics, preprocessing)
# Blocking: false (non-blocking, for logging/metrics)

set -e

# Get user prompt from environment
PROMPT="${USER_PROMPT}"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# TODO: Add your processing logic here
# Example uses:
# - Log all prompts
# - Track usage metrics
# - Estimate costs
# - Rate limiting
# - Context analysis

echo "📊 Processing prompt..."

# Example: Log prompt length and timestamp
LOG_FILE="${HOME}/.claude/prompts.log"
mkdir -p "$(dirname "$LOG_FILE")"

PROMPT_LENGTH=${#PROMPT}
echo "$TIMESTAMP,$PROMPT_LENGTH" >> "$LOG_FILE"

# Example: Calculate daily usage
TODAY=$(date +%Y-%m-%d)
DAILY_COUNT=$(grep -c "^$TODAY" "$LOG_FILE" 2>/dev/null || echo 0)

echo "📈 Prompt #$DAILY_COUNT today ($PROMPT_LENGTH characters)"

# Example: Rate limiting
MAX_DAILY=100
if [ "$DAILY_COUNT" -gt "$MAX_DAILY" ]; then
  echo "⚠️ Warning: Daily prompt limit exceeded ($DAILY_COUNT/$MAX_DAILY)"
fi

exit 0
