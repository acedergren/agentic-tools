# turborepo - Monorepo Architecture Expert

**Version**: 3.0.0
**Grade**: F → C (28/120 → ~72/120)
**Token Reduction**: 914 lines → ~330 lines (64% reduction)

## What This Skill Does

Turborepo monorepo architectural decisions and anti-patterns. **NOT** CLI syntax reference - focuses on when to split packages and avoiding monorepo sprawl.

## TDD Improvements Applied

### 1. Description Quality (RED → GREEN)
**Problem**: Description listed CLI topics (turbo.json, --filter, --affected)
**Test Failed**: No architectural decision triggers

**Fix**:
- Added 5 architecture decision scenarios
- Clear negative scope: "NOT for CLI syntax"
- Focus keywords: package boundaries, when to split, circular dependencies

**Result**: ✅ Agent loads for architecture, not CLI help

### 2. Knowledge Delta (RED → GREEN)
**Problem**: 85% CLI documentation (turbo --help equivalent)
**Test Failed**: Not expert knowledge

**Removed** (580+ lines):
- CLI flag reference
- turbo.json schema documentation
- Command syntax examples

**Added** (330 lines of expert insights):
- When to split package decision tree
- 4 critical anti-patterns (circular deps, over-granularity, cache misses)
- Monorepo vs polyrepo decision framework
- Package boundary patterns (by stability, by consumer, by team)

**Result**: ✅ 75% expert knowledge (was 15%)

### 3. Anti-Patterns Added

1. **Circular Dependencies** - Breaks task graph
2. **Overly Granular Packages** - 50 micro-packages, version hell
3. **Missing Task Dependencies** - Tests run before build
4. **Cache Miss Hell** - Broad inputs, constant rebuilds

**Result**: ✅ Prevents common monorepo architecture failures

### 4. Decision Frameworks

1. **When to Split Package** - Based on consumers, stability, ownership
2. **Monorepo vs Polyrepo** - Team size, shared code, language mix
3. **Package Boundaries** - By stability, by consumer, by team

**Result**: ✅ Clear criteria for all architectural decisions

## Key Features

### Critical Rule
**Package Tasks, Not Root Tasks** - The #1 Turborepo mistake

```json
// ❌ WRONG - defeats parallelization
"scripts": { "build": "cd apps/web && next build" }

// ✅ CORRECT - parallel execution
// Each package has own build task
```

### When to Split Package
```
1 consumer → Keep inline
2-3 consumers + stable → Split
4+ consumers → Split
Unstable API → Don't split yet
```

### Anti-Patterns
- Circular dependencies break task graph
- 50 micro-packages = version hell
- Missing `dependsOn` = tests fail
- Broad cache inputs = constant rebuilds

### Turborepo vs Alternatives
- Turborepo: JS/TS, Next.js/React
- Nx: Polyglot, opinionated structure
- Rush: 100+ packages, npm publishing

## Installation

```bash
cp -r turborepo ~/.agents/skills/
```

## Resources

- Official Docs: https://turbo.build/repo/docs (CLI reference)
- This Skill: Architecture decisions, anti-patterns
