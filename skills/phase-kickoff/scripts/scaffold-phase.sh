#!/usr/bin/env bash
set -euo pipefail

RAW="${1:-}"
if [ -z "$RAW" ]; then
  echo 'Usage: scaffold-phase.sh "3 - User Authentication"' >&2
  exit 1
fi

PHASE_NUM=$(printf '%s' "$RAW" | sed -E 's/^([0-9]+).*/\1/')
TITLE=$(printf '%s' "$RAW" | sed -E 's/^[0-9]+[[:space:]]*-[[:space:]]*//')
KEBAB=$(printf '%s' "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
BRANCH="feature/phase${PHASE_NUM}-${KEBAB}"
TEST_FILE="tests/phase-${PHASE_NUM}-${KEBAB}.test.ts"

printf 'Branch: %s\n' "$BRANCH"
printf 'Suggested test file: %s\n' "$TEST_FILE"
printf '\nRoadmap stub:\n\n'
printf '## Phase %s: %s\n\n**Goal**: %s\n\n- [ ] %s.1 First task\n- [ ] %s.2 Second task\n\n**Verify**: Define completion check\n' "$PHASE_NUM" "$TITLE" "$TITLE" "$PHASE_NUM" "$PHASE_NUM"
