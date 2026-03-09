#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-}"
if [ -z "$TARGET" ]; then
  echo 'Usage: collect-bugfix-context.sh <test-file|source-file|search-term>' >&2
  exit 1
fi

printf '## Bugfix Context\n\n'
echo '### Recent history'
git log --oneline -10 -- "$TARGET" 2>/dev/null || true

echo
echo '### Matching files'
rg -n "$TARGET" apps packages tests . -g '!**/node_modules/**' -g '!**/.git/**' || true

echo
echo '### Likely tests'
case "$TARGET" in
  *.test.*|*.spec.*) echo "$TARGET" ;;
  *)
    base="${TARGET%.*}"
    ls "${base}.test."* "${base}.spec."* 2>/dev/null || true
    ;;
esac
