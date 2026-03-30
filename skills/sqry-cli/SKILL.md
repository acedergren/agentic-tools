---
name: sqry-cli
description: >
  Direct local sqry CLI workflow for natural-language and structural code search.
  Use when users ask for code search, callers/dependents, blast radius, or
  natural-language lookup and MCP sqry is disabled/broken. Covers full local
  sqry CLI capabilities with verified command forms.
  Triggers include "sqry", "code search", "blast radius", "who calls this",
  "what depends on this", and "semantic search". Keywords: sqry cli,
  natural language search, callers, dependents, blast radius, parser error,
  mcp broken, no mcp, semantic search fallback.
---

# sqry CLI

Use the local `sqry` binary directly from the terminal. Do not use `sqry` via MCP.

Do NOT load this skill when the task is a single-file local edit where plain `rg` is sufficient and no transitive dependency analysis is needed.

## Load this skill when

- MCP path is disabled or unreliable
- you want natural-language discovery (`sqry ask`) before exact structural queries
- you need fast, explicit blast-radius checks before cross-package changes

## Setup

```bash
cd <your-repo-root>
export PATH="$HOME/.cargo/bin:$PATH"
```

If `sqry` is missing:

```bash
cargo install sqry-cli sqry-mcp
```

## Capability map (CLI)

- Search & query: `search`, `query`, `ask`, `hier`
- Impact & quality: `impact`, `duplicates`, `cycles`, `unused`, `diff`, `similar`, `explain`
- Graph ops: `graph`, `subgraph`, `visualize`, `export`
- Index lifecycle: `index`, `update`, `analyze`, `repair`, `watch`
- Productivity: `alias`, `history`, `cache`, `batch`, `shell`
- Integration/admin: `workspace`, `config`, `completions`, `insights`, `troubleshoot`, `lsp`, `mcp`

## Non-interactive helper

Use the bundled wrapper to avoid confirmation prompts in automation:

```bash
bash skills/sqry-cli/scripts/sqry-ask-auto.sh "where is completeRun in MigrationRepository" .
```

Full capability QA script:

```bash
bash skills/sqry-cli/scripts/verify-sqry-capabilities.sh .
```

## Fast workflow

1. Start with natural language:

```bash
sqry ask "where is completeRun in MigrationRepository" .
```

2. Move to explicit structural query once narrowed:

```bash
sqry query "kind:method AND name:completeRun" . --limit 20
sqry query "callers:completeRun" . --limit 20
```

3. Run impact check for shared changes:

```bash
sqry impact MigrationRepository.completeRun --show-files --path .
```

## Natural-language workflow (CLI only)

If a plain phrase is ambiguous, keep it in CLI and use:

```bash
sqry ask --dry-run "find completeRun method on MigrationRepository" .
sqry query "kind:method AND name:completeRun" . --limit 20
sqry ask "find completeRun method on MigrationRepository" .
```

## NEVER

- Never use `mcp__sqry__*` tools in this workflow.
- Never rely on MCP parser behavior for natural-language lookup.
- Never use `--path` with `sqry query`; use positional `[PATH]` instead.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `Failed to execute query` in MCP | MCP parser issue | Use CLI path with `sqry ask` or wrapper script |
| `sqry: command not found` | Cargo bin not loaded | `source ~/.cargo/env` |
| `unexpected argument '--path'` in `sqry query` | Wrong flag for query subcommand | Use positional path: `sqry query "<expr>" .` |
| `0 text matches found` for a specific symbol | Query too literal | Start with `sqry ask --dry-run "..."`
| Interactive `[y/N]` blocks automation | Medium confidence confirm flow | Use wrapper script (`--auto-execute --threshold 0`) |
| `sqry explain ...` returns ambiguous symbol | Multiple same-name symbols in file | Use unique symbol or query first to narrow symbol candidates |

## Definition of done

Do not claim scope is understood until you can list:

- exact files/packages affected
- which callers/dependents are in scope
- which verification commands will be run next

## Arguments

- `$ARGUMENTS`: Natural language search request or structural query target
  - Example: `/sqry-cli where is completeRun in MigrationRepository`
  - Example: `/sqry-cli callers for getServerSession in apps/web`
