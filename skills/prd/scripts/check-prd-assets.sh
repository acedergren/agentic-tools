#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-skills/prd}"
for file in "$ROOT/SKILL.md" "$ROOT/template.md" "$ROOT/validation.md"; do
  if [ -f "$file" ]; then
    echo "OK  $file"
  else
    echo "MISS $file"
    exit 1
  fi
done
if [ -f "$ROOT/drift-prevention.md" ]; then
  echo "OK  $ROOT/drift-prevention.md"
else
  echo "WARN $ROOT/drift-prevention.md"
fi
