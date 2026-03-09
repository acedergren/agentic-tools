#!/usr/bin/env bash
set -euo pipefail
find docs .claude/reference . -maxdepth 2 -name '*.md' 2>/dev/null | sort
