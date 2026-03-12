---
name: stitch-to-react
description: "Use when converting Stitch designs into production React components. Enforces modular architecture: logic in hooks, data in mockData.ts, Readonly TypeScript interfaces, theme-mapped Tailwind classes. Triggers on: Stitch to React, design to code, stitch export, stitch MCP, stitch:get_screen."
allowed-tools:
  - "stitch*:*"
  - "Bash"
  - "Read"
  - "Write"
  - "web_fetch"
---

# Stitch to React Components

## NEVER

- **NEVER fetch without checking `.stitch/designs/` first** — always ask user about refresh intent before re-downloading
- **NEVER hardcode hex codes as Tailwind arbitrary values** (`bg-[#2563eb]`) — extract to theme, use semantic classes
- **NEVER skip AST validation** — architecture checklist is non-optional before marking done
- **NEVER put logic in component bodies** — event handlers and state logic go in `src/hooks/`
- **NEVER omit TypeScript interfaces** — every component needs a `Readonly` Props type
- **NEVER bundle data in component files** — all static text, images, lists go in `src/data/mockData.ts`
- **NEVER include Google license headers** in generated React components
- **NEVER use internal AI fetch tools for Google Cloud Storage URLs** — they fail on GCS domains; use the bash script

## Namespace Discovery

Run `list_tools` to find the Stitch MCP prefix (usually `stitch:` or `mcp_stitch:`). Use that prefix for all calls.

Call `[prefix]:get_screen` — captures:
- `screenshot.downloadUrl` + `htmlCode.downloadUrl`
- `width`, `height`, `deviceType`
- `designTheme` (colors, fonts, roundness)

## Design Caching Decision

```
.stitch/designs/{page}.html + .stitch/designs/{page}.png exist?
│
├─ YES → Ask user: "Use cached designs or refresh from Stitch?"
│         Re-download ONLY if user confirms
│
└─ NO → Proceed to download
```

## High-Reliability Download

Internal AI fetch fails on GCS. Use the bash script:

```bash
# HTML
bash scripts/fetch-stitch.sh "[htmlCode.downloadUrl]" ".stitch/designs/{page}.html"

# Screenshot — append =w{width} to URL
bash scripts/fetch-stitch.sh "[screenshot.downloadUrl]=w{width}" ".stitch/designs/{page}.png"
```

## Architecture Rules (Non-Negotiable)

| Rule | Enforcement |
| ---- | ----------- |
| Modular files | Never output single-file component dumps |
| Logic isolation | Event handlers → `src/hooks/` |
| Data decoupling | Static content → `src/data/mockData.ts` |
| Type safety | `Readonly` interface named `[Component]Props` on every component |
| Style mapping | Extract `tailwind.config` from HTML `<head>`, sync to `resources/style-guide.json` |

## File Structure

```
src/
├── components/     # One file per component + index.ts barrel
├── hooks/          # useNavigation.ts, useFormState.ts, etc.
├── data/
│   └── mockData.ts # All static text, images, config
├── styles/
│   └── theme.ts    # Extracted Tailwind tokens
└── App.tsx
```

## Validation Sequence

After generating each component:
1. `npm run validate <file_path>` — AST compliance
2. Check against `resources/architecture-checklist.md`
3. `npm run dev` — zero console errors required

A component is not done until it passes the checklist AND the dev server shows no errors.

## Troubleshooting

| Issue                | Fix                                                              |
| -------------------- | ---------------------------------------------------------------- |
| Fetch fails (403)    | Check script quotes; verify `=w{width}` appended to screenshot URL |
| AST shows hardcoded styles | Extract hex → `style-guide.json` → replace with Tailwind class |
| TypeScript prop errors | Add `Readonly` interface following template in `resources/component-template.tsx` |
| Theme class not recognized | Verify `tailwind.config` extracted and synced to `style-guide.json` |
| Cached screenshot stale | Check file timestamps; ask user to confirm refresh |
