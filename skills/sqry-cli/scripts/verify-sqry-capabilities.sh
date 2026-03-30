#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-.}"

if [[ -f "$HOME/.cargo/env" ]]; then
  # shellcheck disable=SC1090
  source "$HOME/.cargo/env"
fi

if ! command -v sqry >/dev/null 2>&1; then
  echo "Error: sqry not found in PATH. Install with: cargo install sqry-cli sqry-mcp" >&2
  exit 1
fi

ok=0
fail=0

pass() { echo "OK   $*"; ok=$((ok + 1)); }
failf() { echo "FAIL $*"; fail=$((fail + 1)); }

run_check() {
  local name="$1"
  shift
  if "$@" >/tmp/sqry_verify.out 2>/tmp/sqry_verify.err; then
    pass "$name"
  else
    local code
    code=$?
    local err
    err="$(head -n 1 /tmp/sqry_verify.err || true)"
    failf "$name (exit $code) ${err:+- $err}"
  fi
}

launch_check() {
  local name="$1"
  shift
  "$@" >/tmp/sqry_verify_launch.out 2>/tmp/sqry_verify_launch.err &
  local pid=$!
  sleep 1

  if kill -0 "$pid" >/dev/null 2>&1; then
    kill "$pid" >/dev/null 2>&1 || true
    wait "$pid" >/dev/null 2>&1 || true
    pass "$name"
    return
  fi

  wait "$pid" >/dev/null 2>&1
  local code=$?
  if [[ $code -eq 0 ]]; then
    pass "$name (clean exit without TTY)"
  else
    local err
    err="$(head -n 1 /tmp/sqry_verify_launch.err || true)"
    failf "$name (exit $code) ${err:+- $err}"
  fi
}

echo "== Help surface checks =="
while read -r cmd; do
  [[ -z "$cmd" ]] && continue
  if [[ "$cmd" == "help" ]]; then
    continue
  fi
  run_check "help:$cmd" sqry "$cmd" --help
done < <(
  sqry --help \
    | awk '/^Commands:/{flag=1;next}/^Arguments:/{flag=0}flag' \
    | sed -E 's/^  ([a-z0-9-]+).*/\1/' \
    | sed '/^$/d'
)

echo "== Core execution checks =="
run_check "search" sqry search completeRun "$ROOT_DIR" --limit 5
run_check "query" sqry query "kind:method AND name:completeRun" "$ROOT_DIR" --limit 5
run_check "ask-dry" sqry ask --dry-run "find completeRun method on MigrationRepository" "$ROOT_DIR"
run_check "hier" sqry hier "completeRun" --path "$ROOT_DIR" --limit 5
run_check "graph-stats" sqry graph stats
run_check "duplicates" sqry duplicates "$ROOT_DIR" --limit 5
run_check "cycles" sqry cycles "$ROOT_DIR" --limit 5
run_check "unused" sqry unused "$ROOT_DIR" --limit 5
run_check "impact" sqry impact completeRun --path "$ROOT_DIR" --limit 5
run_check "diff" sqry diff HEAD~1 HEAD --limit 5
run_check "explain" sqry explain packages/server/src/oracle/repositories/migration-repository.ts rowToCustomer
run_check "similar" sqry similar packages/server/src/oracle/repositories/migration-repository.ts completeRun --limit 5
run_check "subgraph" sqry subgraph completeRun --path "$ROOT_DIR" --max-nodes 20
run_check "visualize" sqry visualize "callers:completeRun" --path "$ROOT_DIR" --format mermaid
run_check "export" sqry export "$ROOT_DIR" --format json --filter-edge calls
run_check "index-status" sqry index --status "$ROOT_DIR"
run_check "update" sqry update "$ROOT_DIR" --stats
run_check "analyze" sqry analyze "$ROOT_DIR"
run_check "repair-dry" sqry repair --dry-run "$ROOT_DIR"
run_check "cache-stats" sqry cache stats
run_check "alias-list" sqry alias list
run_check "history-stats" sqry history stats
run_check "completions-zsh" sqry completions zsh
run_check "insights-status" sqry insights status
run_check "troubleshoot-help" sqry troubleshoot --help

echo "== Config/workspace checks (temp sandbox) =="
tmp_dir="$(mktemp -d)"
run_check "config-init" sqry config init --path "$tmp_dir"
run_check "config-show" sqry config show --path "$tmp_dir"
run_check "workspace-init" sqry workspace init "$tmp_dir/ws"
run_check "workspace-scan" sqry workspace scan "$tmp_dir/ws"
run_check "workspace-stats" sqry workspace stats "$tmp_dir/ws"
run_check "workspace-query" sqry workspace query "$tmp_dir/ws" "name:completeRun"
run_check "mcp-status" sqry mcp status

echo "== Launch checks (start/stop) =="
launch_check "lsp-start-stop" sqry lsp --stdio
launch_check "shell-start-stop" sqry shell "$ROOT_DIR"
launch_check "watch-start-stop" sqry watch "$ROOT_DIR"

qf="$(mktemp)"
printf "kind:method AND name:completeRun\nname:rowToCustomer\n" >"$qf"
run_check "batch" sqry batch --queries "$qf" "$ROOT_DIR" --output json

echo "== Summary =="
echo "Passed: $ok"
echo "Failed: $fail"

if ((fail > 0)); then
  exit 1
fi
