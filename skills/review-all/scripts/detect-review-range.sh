#!/usr/bin/env bash
set -euo pipefail

if git rev-parse --verify main >/dev/null 2>&1; then
  git diff --name-only main...HEAD
else
  git diff --name-only HEAD~5
fi
