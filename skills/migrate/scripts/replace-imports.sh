#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo 'Usage: replace-imports.sh <old-path> <new-path> [manifest-file]' >&2
  exit 1
fi

OLD_PATH="$1"
NEW_PATH="$2"
MANIFEST="${3:-/tmp/migration-manifest.txt}"

if [ ! -f "$MANIFEST" ]; then
  echo "Manifest not found: $MANIFEST" >&2
  exit 1
fi

while IFS= read -r file; do
  [ -z "$file" ] && continue
  perl -0pi -e "s|\Q$OLD_PATH\E|$NEW_PATH|g" "$file"
  echo "updated $file"
done < "$MANIFEST"
