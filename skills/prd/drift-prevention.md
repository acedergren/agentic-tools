# Drift Prevention Reference

Loaded during `/prd --update` and `/prd --audit-deps` modes.

## Dependency Freshness Checks

### Commands

```bash
# Check all workspaces for outdated packages
pnpm outdated --recursive    # or: npm outdated
# Security audit
pnpm audit                   # or: npm audit
# Check a specific package
npm view <package-name> version deprecated
```

### What to Flag

| Severity | Condition                                | Action                                  |
| -------- | ---------------------------------------- | --------------------------------------- |
| Critical | Package has known CVE                    | Upgrade immediately or find alternative |
| Critical | Package is deprecated on npm             | Plan migration to replacement           |
| High     | Major version behind                     | Evaluate breaking changes               |
| Medium   | Minor version behind with relevant fixes | Schedule update                         |
| Low      | Patch version behind                     | Update opportunistically                |

### New Dependency Evaluation

Before adding a dependency:

1. **Last published**: >12 months ago? May be abandoned.
2. **Open issues**: High count with no maintainer response? Risk.
3. **License**: Compatible with project license?
4. **Bundle size**: Check bundlephobia.com
5. **Alternatives**: Lighter or more maintained option?
6. **Tree-shaking**: ESM support?

## Architectural Drift Detection

### File Path Verification

Compare PRD-referenced file paths against actual codebase. Verify each "Affected Files" entry still exists.

### Pattern Matching

Check PRD architecture decisions align with codebase:

| Decision Area       | Check                                       |
| ------------------- | ------------------------------------------- |
| Middleware order    | Compare PRD against actual entry point      |
| Route structure     | Compare PRD routes against routes directory |
| Component hierarchy | Compare PRD against components directory    |
| Package exports     | Compare PRD against index.ts exports        |

### Common Drift Indicators

- **Orphaned imports**: Module imports a symbol no longer exported
- **Unused config**: Env var referenced in PRD but not in code
- **Stale types**: Interface in PRD doesn't match actual definition
- **Dead routes**: Route in PRD has been removed
- **Missing migrations**: Database change without migration file

## Drift Report Format

```
Dependency Drift Report
=======================

Critical:
  [!] package-a v5.0.0 → v6.1.0 available (breaking changes)

High:
  [~] package-b v0.4.2 → v0.6.0 available (new API)

Architectural Drift:
  [!] PRD references src/routes/foo.ts — file moved to src/routes/foo/index.ts
  [~] PRD lists 58 exports — module now has 63 (5 added without PRD update)
```
