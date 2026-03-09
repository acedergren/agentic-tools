#!/usr/bin/env bash
set -euo pipefail

STAGED=$(git diff --cached --name-only --diff-filter=ACMR)
if [ -z "$STAGED" ]; then
  echo 'No staged files'
  exit 0
fi

printf '## Staged File Classification\n\n'
printf '%s\n' "$STAGED" | while read -r file; do
  case "$file" in
    apps/frontend/*|apps/web/*) scope="frontend" ;;
    apps/api/*) scope="api" ;;
    packages/*) scope="package" ;;
    docs/*|README.md|CLAUDE.md|AGENTS.md) scope="docs" ;;
    *) scope="other" ;;
  esac
  printf '%s\t%s\n' "$scope" "$file"
done
