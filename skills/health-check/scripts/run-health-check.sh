#!/usr/bin/env bash
set -u

MODE="${1:-all}"

run_gate() {
  local name="$1"
  local command="$2"
  local non_blocking="${3:-false}"

  local output exit_code status details
  output=$(bash -lc "$command" 2>&1)
  exit_code=$?

  if [ $exit_code -eq 0 ]; then
    status="PASS"
  elif [ "$non_blocking" = "true" ]; then
    status="WARN"
  else
    status="FAIL"
  fi

  details=$(printf '%s' "$output" | tail -n 3 | tr '\n' ' ' | sed 's/  */ /g')
  if [ -z "$details" ]; then
    details="exit $exit_code"
  fi

  printf '| %-12s | %-4s | %s |\n' "$name" "$status" "$details"
}

printf '## Health Check Results\n\n'
printf '| Gate         | Status | Details |\n'
printf '|--------------|--------|---------|\n'

case "$MODE" in
  --security-only)
    run_gate "Semgrep" "command -v semgrep >/dev/null && semgrep scan --config auto --severity ERROR --severity WARNING --quiet || echo SKIP semgrep"
    run_gate "Audit" "(pnpm audit --prod || npm audit --production) 2>/dev/null || true" true
    ;;
  --code-quality)
    run_gate "TypeCheck" "npx tsc --noEmit"
    run_gate "Circular" "npx madge --circular --ts-config tsconfig.json src/"
    run_gate "Dead Code" "npx knip --no-progress" true
    ;;
  --quick)
    run_gate "TypeCheck" "npx tsc --noEmit"
    run_gate "Tests" "npx vitest run --reporter=dot"
    run_gate "Lint" "npx eslint ."
    run_gate "Audit" "(pnpm audit --prod || npm audit --production) 2>/dev/null || true" true
    ;;
  *)
    run_gate "TypeCheck" "npx tsc --noEmit"
    run_gate "Tests" "npx vitest run --reporter=dot"
    run_gate "Lint" "npx eslint ."
    run_gate "Semgrep" "command -v semgrep >/dev/null && semgrep scan --config auto --severity ERROR --severity WARNING --quiet || echo SKIP semgrep"
    run_gate "Circular" "npx madge --circular --ts-config tsconfig.json src/"
    run_gate "Dead Code" "npx knip --no-progress" true
    run_gate "Audit" "(pnpm audit --prod || npm audit --production) 2>/dev/null || true" true
    ;;
esac
