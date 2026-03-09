#!/usr/bin/env bash
set -euo pipefail

SCOPE="${1:-packages}"
rg -n "z\\.(object|string|number|enum|union)|export .*schema|export const .*Schema|export type|export interface" "$SCOPE" -g '!**/node_modules/**'
