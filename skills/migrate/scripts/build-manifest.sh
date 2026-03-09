#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo 'Usage: build-manifest.sh <old-import-path>' >&2
  exit 1
fi

OLD_PATH="$1"
OUT="${2:-/tmp/migration-manifest.txt}"
rg -l --glob '*.{ts,tsx,svelte,js,mjs,cjs}' "$OLD_PATH" apps packages > "$OUT" || true
printf 'Manifest: %s\n' "$OUT"
printf 'Files: %s\n' "$(wc -l < "$OUT" | tr -d ' ')"
cat "$OUT"
