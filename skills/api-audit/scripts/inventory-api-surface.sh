#!/usr/bin/env bash
set -euo pipefail

SCOPE="${1:-}"

ROUTE_PATTERN='\\b(get|post|put|patch|delete|options|head)\\s*\\('
SCHEMA_PATTERN='schema|zod|responseSchema|requestSchema'
AUTH_PATTERN='requireAuth|preHandler|permissions|resolveOrgId|auth'

if [ -n "$SCOPE" ]; then
  rg -n -i "$ROUTE_PATTERN|$SCHEMA_PATTERN|$AUTH_PATTERN" apps packages -g '!**/node_modules/**' | rg "$SCOPE"
else
  rg -n -i "$ROUTE_PATTERN|$SCHEMA_PATTERN|$AUTH_PATTERN" apps packages -g '!**/node_modules/**'
fi
