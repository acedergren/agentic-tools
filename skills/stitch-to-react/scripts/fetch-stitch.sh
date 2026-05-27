#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: fetch-stitch.sh <download-url> <output-path>" >&2
  exit 2
fi

url="$1"
output="$2"

mkdir -p "$(dirname "$output")"
curl --fail --location --silent --show-error "$url" --output "$output"
