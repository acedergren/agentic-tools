---
name: turborepo
version: 3.0.0
description: "Use when making Turborepo monorepo architecture decisions: choosing between monorepo vs polyrepo, deciding when to split packages, debugging cache misses, setting package boundaries, or avoiding circular dependencies. NOT for basic CLI syntax. Triggers on: turborepo, turbo cache miss, package boundaries, monorepo architecture."
---

# Turborepo - Monorepo Architecture Expert

**Assumption**: You know `turbo run build`. This covers architectural decisions.

## Arguments

- `$ARGUMENTS`: Monorepo decision, package boundary, or cache issue to analyze
  - Example: `/turborepo why is turbo cache missing in CI`
  - Example: `/turborepo should packages/ui be split from packages/web-core`
  - If empty: ask which Turborepo architecture problem is in scope

---

## Before Adopting Turborepo: Strategic Assessment

| Signal | Recommendation |
| ------ | -------------- |
| 1-3 engineers | Polyrepo — monorepo overhead not worth it |
| <20% shared code | Polyrepo |
| >50% shared code + frequent coordination | Monorepo compelling |
| Mixed languages (Go/Python/JS) | Nx or polyrepo — Turborepo is JS/TS focused |
| All builds <5min total | Overhead not justified yet |
| Breaking changes require 3+ repos | Monorepo wins |
| Services deploy independently | Polyrepo |

**Break-even**: Monorepo worth it when 3+ apps share 30%+ code AND frequent coordination is required.

---

## Critical Rule: Package Tasks, Not Root Tasks

**The #1 Turborepo mistake**: Putting task logic in root `package.json`.

```json
// WRONG - defeats parallelization
// Root package.json
{ "scripts": { "build": "cd apps/web && next build && cd ../api && tsc" } }

// CORRECT - each package owns its task
// apps/web/package.json
{ "scripts": { "build": "next build" } }

// Root package.json - ONLY delegates
{ "scripts": { "build": "turbo run build" } }
```

**Why**: Turborepo can't parallelize sequential shell commands. Package tasks enable task graph parallelization.

---

## Decision: When to Split a Package

```
Considering splitting code into a package?
│
├─ Used by 1 app only → DON'T split yet
│   └─ Keep in app; wait for second consumer
│      WHY: Premature abstraction, overhead > benefit
│
├─ Used by 2+ apps → MAYBE split
│   ├─ Stable API (rarely changes) → Split
│   ├─ Unstable (changes every sprint) → DON'T split yet
│   └─ Mixed team ownership → DON'T split (use import path)
│      WHY: Shared packages need stable APIs + clear owners
│
├─ Publishing to npm → MUST split
│
└─ CI builds > 10min → Split by stability, not domain
    └─ Stable packages cache; unstable packages always rebuild
```

**Anti-pattern**: Creating packages for "clean architecture" with no consumers. Every package adds build, test, and version overhead.

---

## Anti-Patterns

### ❌ #1: Circular Dependencies
**Symptom**: `turbo run build` fails with "Could not resolve dependency graph"

```
packages/ui → packages/utils
packages/utils → packages/ui  // circular
```

**Fix**: Extract shared code to a third package (`packages/shared`).

For indirect cycles (A → B → C → A), use: `npx madge --circular --extensions ts,tsx packages/`

### ❌ #2: Overly Granular Packages
**Symptom**: Every feature touches 5+ packages; 10+ version bumps per sprint; `pnpm workspace:*` version hell.

**Fix**: Group by change frequency, not by domain:
```
packages/ui/            # All components (changes often)
packages/ui-primitives/ # Headless components (stable)
packages/icons/         # Generated SVGs (rarely changes)
```

**Rule**: Package boundary = different change frequency. Packages that always change together should be one package.

### ❌ #3: Missing Task Dependencies
**Symptom**: Tests pass locally, fail in CI with "Cannot find module './dist/index.js'"

**Cause**: Tests run before build completes — race condition.

```json
// WRONG - no dependsOn for test
{ "tasks": { "build": { "outputs": ["dist/**"] }, "test": {} } }

// CORRECT
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "test": { "dependsOn": ["build"] }
  }
}
```

**`^build`** = build this package's dependencies first. **`build`** = build this package first.

### ❌ #4: Cache Miss Hell
**Symptom**: Cache never hits; every run rebuilds everything.

**Cause**: `inputs` glob too broad — comment changes trigger rebuild.

```json
// WRONG
{ "build": { "inputs": ["src/**"] } }

// CORRECT
{ "build": { "inputs": ["src/**/*.{ts,tsx}", "!src/**/*.test.ts"] } }
```

**Debug**:
```bash
turbo run build --dry --graph          # Visualize task graph
turbo run build --dry=json | jq '.tasks[] | select(.cache.status == "MISS")'
```

---

## Decision: Monorepo vs Polyrepo

```
Starting new project?
│
├─ Single team, single product → Polyrepo (simpler)
│
├─ Shared UI library → Monorepo
│   └─ Develop library + test in consumers simultaneously
│
├─ Microservices in different languages → Polyrepo
│   └─ Turborepo is JS/TS focused
│
└─ Multiple teams, shared code, atomic changes needed → Monorepo
```

**Practical advice**: Start polyrepo, migrate to monorepo when the cross-repo coordination pain exceeds the tooling cost.

---

## Package Boundary Patterns

**By stability** (recommended):
```
packages/core/      # Changes quarterly (semantic versioning)
packages/features/  # Changes weekly (workspace protocol)
packages/utils/     # Changes monthly
```

**By consumer**:
```
packages/public-api/  # External consumers — strict versioning
packages/internal/    # Internal apps — workspace protocol OK
```

**By team**: Only works if teams rarely share code. Otherwise creates silos.

---

## Turborepo vs Alternatives

| Prefer Turborepo | Prefer Nx | Prefer Rush |
| ---------------- | --------- | ----------- |
| JS/TS monorepo | Project graph visualization needed | 100+ packages |
| Vercel remote caching | Polyglot (JS + Python + Go) | Publishing to npm is primary goal |
| pnpm/npm workspaces | Want opinionated project structure | Phantom dependency detection needed |

---

## Error Recovery

### Cache never hits
1. `turbo run build --dry=json | jq '.tasks[0].hash'` — see current hash
2. Narrow `inputs` glob to exclude non-code files
3. Fallback: `"cache": false` in turbo.json temporarily to debug without cache pressure

### Circular dependency error
1. `turbo run build --dry --graph=graph.html` — visualize in browser
2. `npx madge --circular --extensions ts,tsx packages/` — for indirect cycles
3. Extract common code to `packages/shared`

### Tests fail in CI but pass locally
1. `turbo run test --dry --graph` — verify build runs before test
2. Add `"dependsOn": ["build"]` to test task
3. `turbo run test --force` — bypass cache to confirm ordering

### Overly granular packages causing version hell
1. `git log --oneline --since="1 month ago" -- packages/` — count version bumps per package
2. Packages that change together 5+ times → merge them
3. Fallback: use `workspace:*` to auto-link versions while planning merge

---

## When to Load Full Reference

**READ `references/cli-options.md`** when: encountering 3+ unknown CLI flags, need advanced `--filter` patterns across 10+ packages, or setting up complex pipeline options.

**READ `references/remote-cache-setup.md`** when: setting up remote cache for teams, debugging cache auth errors, or configuring self-hosted cache with custom storage.

**Do NOT load references** for: basic architecture decisions, single cache miss debugging, or monorepo adoption decisions — all covered above.

---

## Resources

- **Official Docs**: https://turbo.build/repo/docs
