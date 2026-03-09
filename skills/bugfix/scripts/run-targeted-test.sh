#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-}"
if [ -z "$TARGET" ]; then
  echo 'Usage: run-targeted-test.sh <test-file> [test-name-pattern]' >&2
  exit 1
fi

NAME_PATTERN="${2:-}"
if [ -n "$NAME_PATTERN" ]; then
  npx vitest run "$TARGET" --reporter=verbose -t "$NAME_PATTERN"
else
  npx vitest run "$TARGET" --reporter=verbose
fi
