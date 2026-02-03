---
name: turborepo
version: 3.0.0
license: MIT
description: |
  Turborepo monorepo architecture decisions and anti-patterns. Use when: (1) choosing
  between monorepo vs polyrepo, (2) deciding when to split packages, (3) debugging
  cache misses, (4) setting package boundaries, (5) avoiding circular dependencies.

  NOT for CLI syntax (see turbo --help). Focuses on architectural decisions that
  prevent monorepo sprawl and maintenance nightmares.

  Triggers: turborepo, monorepo, package boundaries, when to split packages, turbo
  cache miss, circular dependency, workspace organization, task dependencies.
metadata:
  version: 2.7.6
---

# Turborepo - Monorepo Architecture Expert

**Assumption**: You know `turbo run build`. This covers architectural decisions.

---

## Critical Rule: Package Tasks, Not Root Tasks

**The #1 Turborepo mistake**: Putting task logic in root `package.json`.

```json
// ❌ WRONG - defeats parallelization
// Root package.json
{
  "scripts": {
    "build": "cd apps/web && next build && cd ../api && tsc",
    "lint": "eslint apps/ packages/",
    "test": "vitest"
  }
}

// ✅ CORRECT - parallel execution
// apps/web/package.json
{ "scripts": { "build": "next build", "lint": "eslint .", "test": "vitest" } }

// apps/api/package.json
{ "scripts": { "build": "tsc", "lint": "eslint .", "test": "vitest" } }

// Root package.json - ONLY delegates
{ "scripts": { "build": "turbo run build" } }
```

**Why it breaks**: Turborepo can't parallelize sequential shell commands. Package tasks enable task graph parallelization.

---

## Decision: When to Split a Package

```
Considering splitting code into package?
│
├─ Code used by 1 app only → DON'T split yet
│   └─ Keep in app until second consumer appears
│      WHY: Premature abstraction, overhead > benefit
│
├─ Code used by 2+ apps → MAYBE split
│   ├─ Stable API (rarely changes) → Split
│   ├─ Unstable (changes every sprint) → DON'T split yet
│   └─ Mixed team ownership → DON'T split (use import path instead)
│      WHY: Shared packages need stable APIs + clear owners
│
├─ Publishing to npm → MUST split
│   └─ External packages require independent versioning
│
└─ CI builds too slow (> 10min) → Split strategically
    └─ Split by stability (core vs features), not by domain
       WHY: Stable packages cache, unstable packages rebuild
```

**Anti-pattern**: Creating packages for "clean architecture" without consumers. Packages add overhead (build, test, version).

---

## Anti-Patterns

### ❌ #1: Circular Dependencies
**Problem**: Packages depend on each other, breaks task graph

```
packages/ui → imports from packages/utils
packages/utils → imports from packages/ui  // ❌ Circular
```

**Detection**:
```bash
turbo run build  # Fails with: "Could not resolve dependency graph"
```

**Fix**: Extract shared code to third package
```
packages/ui → packages/shared
packages/utils → packages/shared
```

**Why it breaks**: Turborepo builds dependencies first (topological sort). Circular deps = no valid build order.

### ❌ #2: Overly Granular Packages
**Problem**: 50 micro-packages, every import crosses package boundary

```
packages/button/
packages/input/
packages/checkbox/
packages/radio/
packages/select/
// ... 45 more single-component packages
```

**Symptoms**:
- Every change touches 5+ packages
- 10+ version bumps per feature
- `pnpm workspace:*` version hell

**Fix**: Group by stability/purpose
```
packages/ui/           # All components (changes often)
packages/ui-primitives/ # Headless components (stable)
packages/icons/        # Generated SVGs (rarely changes)
```

**Decision rule**: Package boundary = different change frequency

### ❌ #3: Missing Task Dependencies
**Problem**: Tests run before build completes

```json
// turbo.json
{
  "tasks": {
    "build": { "outputs": ["dist/**"] },
    "test": {}  // ❌ No dependsOn
  }
}

// Result: tests import from dist/ before it exists
```

**Fix**: Explicit dependencies
```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "test": { "dependsOn": ["build"] }  // ✅ Build first
  }
}
```

**Why**: `^build` = build dependencies first. `build` = build this package first.

### ❌ #4: Cache Miss Hell
**Problem**: Cache never hits, rebuilds everything

```json
// turbo.json
{
  "tasks": {
    "build": {
      "inputs": ["src/**"]  // ❌ Too broad
    }
  }
}

// Any file change (even comments) = cache miss
```

**Fix**: Exclude non-code files
```json
{
  "tasks": {
    "build": {
      "inputs": [
        "src/**/*.{ts,tsx}",  // ✅ Only source files
        "!src/**/*.test.ts"   // Exclude tests
      ]
    }
  }
}
```

**Debug cache**:
```bash
turbo run build --dry --graph  # Shows why cache missed
```

---

## Decision: Monorepo vs Polyrepo

```
Starting new project?
│
├─ Single team, single product → Polyrepo (simpler)
│   └─ One repo per service/app
│      WHY: Monorepo overhead not worth it for small teams
│
├─ Shared UI library → Monorepo
│   └─ Library + consumer apps in same repo
│      WHY: Develop library + test in consumers simultaneously
│
├─ Microservices (different languages) → Polyrepo
│   └─ Go service, Python service, Node service
│      WHY: Turborepo is JS/TS focused, polyrepo simpler
│
└─ Multiple teams, shared code → Monorepo
    └─ Need atomic changes across boundaries
       WHY: One PR changes API + all consumers
```

**Real-world**: Most projects should start polyrepo, migrate to monorepo when pain > tooling cost.

---

## Package Boundary Patterns

### Pattern 1: By Stability
```
packages/
  core/         # Changes quarterly (semantic versioning)
  features/     # Changes weekly (workspace protocol)
  utils/        # Changes monthly
```

**Benefit**: Stable packages cache longer, ship to npm independently.

### Pattern 2: By Consumer
```
packages/
  public-api/   # External consumers
  internal/     # Internal apps only
```

**Benefit**: Clear API surface, different versioning strategies.

### Pattern 3: By Team
```
packages/
  team-platform/
  team-growth/
  team-infra/
```

**Warning**: Only works if teams rarely share code. Otherwise creates silos.

---

## Turborepo vs Alternatives

```
Choose Turborepo when:
✅ JS/TS monorepo (React, Next.js, Node)
✅ Need remote caching (Vercel, self-hosted)
✅ Task graph parallelization important
✅ Using pnpm workspaces or npm workspaces

Choose Nx when:
✅ Need project graph visualization
✅ Polyglot (JS + Python + Go)
✅ Want opinionated project structure
✅ Need plugin ecosystem

Choose Rush when:
✅ Very large monorepo (100+ packages)
✅ Need phantom dependencies detection
✅ Publishing to npm is primary use case
```

**Real-world**: Turborepo wins for Next.js/React apps, Nx wins for complex polyglot, Rush wins for library publishers.

---

## Debugging Commands

### Visualize task graph
```bash
turbo run build --dry --graph=graph.html
# Opens browser with task dependency visualization
```

### Find cache misses
```bash
turbo run build --dry=json | jq '.tasks[] | select(.cache.status == "MISS")'
```

### Check package dependency order
```bash
turbo run build --dry --graph | grep "→"
```

### Test cache without running tasks
```bash
turbo run build --dry  # Shows what would run
```

---

## When to Load Full Reference

**LOAD `references/cli-options.md` when:**
- User needs complete CLI flag reference
- Advanced filtering (--filter, --affected)

**LOAD `references/remote-cache-setup.md` when:**
- Setting up Vercel remote cache
- Self-hosting remote cache

**Do NOT load references** for architecture decisions - use this framework.

---

## Resources

- **Official Docs**: https://turbo.build/repo/docs (for CLI reference)
- **This Skill**: Architecture decisions, anti-patterns, package boundaries
