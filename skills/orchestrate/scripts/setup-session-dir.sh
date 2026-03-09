#!/usr/bin/env bash
set -euo pipefail

SESSION_ID="${1:-$(date +%s)-$(head -c 4 /dev/urandom | xxd -p)}"
ROOT="/tmp/orchestrate/$SESSION_ID"
mkdir -p "$ROOT"
touch "$ROOT/git.lock"
printf 'SESSION_ID=%s\nSESSION_DIR=%s\n' "$SESSION_ID" "$ROOT"
