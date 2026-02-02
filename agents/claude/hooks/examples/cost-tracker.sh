#!/bin/bash
# Hook: Track API usage and estimated costs
# Type: user-prompt-submit
# Blocks: No (logging only)

set -e

LOG_FILE="${HOME}/.claude/usage.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Create log directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Get message length from environment variable
MESSAGE_LENGTH=${#USER_PROMPT}

# Estimate tokens (rough approximation: 1 token ≈ 4 characters)
ESTIMATED_TOKENS=$((MESSAGE_LENGTH / 4))

# Estimate cost (example rates - adjust for your pricing)
# Sonnet 3.5: $3/million input tokens
ESTIMATED_COST=$(echo "scale=6; $ESTIMATED_TOKENS * 0.000003" | bc 2>/dev/null || echo "0.000000")

# Log the usage
echo "$TIMESTAMP,$ESTIMATED_TOKENS,$ESTIMATED_COST" >> "$LOG_FILE"

# Calculate daily total
TODAY=$(date +%Y-%m-%d)
DAILY_COST=$(awk -F',' -v today="$TODAY" '$1 ~ today {sum+=$3} END {print sum}' "$LOG_FILE")
DAILY_TOKENS=$(awk -F',' -v today="$TODAY" '$1 ~ today {sum+=$2} END {print sum}' "$LOG_FILE")

# Alert if daily cost exceeds threshold
THRESHOLD=5.00
if [ -n "$DAILY_COST" ] && [ "$(echo "$DAILY_COST > $THRESHOLD" | bc -l 2>/dev/null || echo 0)" -eq 1 ]; then
  echo "⚠️ Daily cost alert: \$${DAILY_COST} exceeds threshold of \$${THRESHOLD}"
fi

echo "📊 Usage: $ESTIMATED_TOKENS tokens (~\$$ESTIMATED_COST)"
echo "📊 Today: $DAILY_TOKENS tokens (~\$$DAILY_COST)"

exit 0
