#!/bin/bash
# Hook: Session summary logging
# Type: session-start, session-end
# Blocks: No (logging only)

set -e

ACTION="${1:-end}"
SESSION_DIR="${HOME}/.claude/sessions"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Create sessions directory
mkdir -p "$SESSION_DIR"

case "$ACTION" in
  start)
    SESSION_ID=$(date +%Y%m%d_%H%M%S)
    SESSION_FILE="$SESSION_DIR/$SESSION_ID.log"
    
    echo "=== Claude Code Session Started ===" > "$SESSION_FILE"
    echo "Time: $TIMESTAMP" >> "$SESSION_FILE"
    echo "Directory: $(pwd)" >> "$SESSION_FILE"
    echo "User: $(whoami)" >> "$SESSION_FILE"
    echo "" >> "$SESSION_FILE"
    
    # Store session file path for session-end
    echo "$SESSION_FILE" > "$SESSION_DIR/.current"
    
    echo "📝 Session started: $SESSION_ID"
    ;;

  end)
    if [ -f "$SESSION_DIR/.current" ]; then
      CURRENT_SESSION=$(cat "$SESSION_DIR/.current")
      
      if [ -f "$CURRENT_SESSION" ]; then
        echo "" >> "$CURRENT_SESSION"
        echo "=== Session Ended ===" >> "$CURRENT_SESSION"
        echo "Time: $TIMESTAMP" >> "$CURRENT_SESSION"
        
        # Calculate duration (approximate)
        START_TIME=$(grep "^Time:" "$CURRENT_SESSION" | head -1 | cut -d: -f2-)
        echo "Duration: Started at $START_TIME" >> "$CURRENT_SESSION"
        
        echo "📊 Session Summary:"
        cat "$CURRENT_SESSION"
        
        rm "$SESSION_DIR/.current"
      fi
    else
      echo "⚠️ No active session found"
    fi
    ;;

  *)
    echo "Usage: $0 {start|end}"
    exit 1
    ;;
esac

exit 0
