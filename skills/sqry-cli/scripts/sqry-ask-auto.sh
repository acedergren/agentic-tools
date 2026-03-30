#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "" ]]; then
  echo "Usage: $(basename "$0") \"<natural language query>\" [path]" >&2
  exit 1
fi

QUERY="$1"
SEARCH_PATH="${2:-.}"

if [[ -f "$HOME/.cargo/env" ]]; then
  # shellcheck disable=SC1090
  source "$HOME/.cargo/env"
fi

if ! command -v sqry >/dev/null 2>&1; then
  echo "Error: sqry not found in PATH. Install with: cargo install sqry-cli sqry-mcp" >&2
  exit 1
fi

sqry ask --auto-execute --threshold 0 "$QUERY" "$SEARCH_PATH"
