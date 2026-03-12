---
name: tdd
description: "Use when implementing features, fixing bugs, or adding deliberate test coverage. Enforces test-first (red-green-refactor) cycle, handles mock bootstrap for projects with mockReset:true, prevents code-before-tests violations. NOT for reviewing existing code or running test suites."
---

# TDD Implementation Skill

Enforce a strict test-driven development cycle: Red → Green → Refactor → Commit.

## NEVER

- **NEVER write implementation before tests** — this is the entire point; skip it and the skill has no value
- **NEVER skip mock bootstrap validation** — write one mock round-trip test first and confirm it passes before writing 20 tests
- **NEVER skip the full test suite run** — your file passing is not enough; regressions in unrelated files are your responsibility to notice
- **NEVER proceed if tests pass in Red phase** — a test that passes before implementation is testing nothing; revise it
- **NEVER batch multiple features into one TDD cycle** — one behavior change per red-green-refactor loop
- **NEVER treat a compile/import error as "red"** — tests must fail for the right reason (assertion failure, not broken setup)

## Before Writing Any Tests

**If `mockReset: true` in test runner config**, most internet mock examples silently fail — return values clear between tests.

```bash
grep -rn 'mockReset\|mockClear\|restoreMocks' vitest.config.* jest.config.*
```

If `mockReset: true`, you MUST reconfigure return values in `beforeEach`, not at module scope. Write ONE bootstrap test first to validate your mock wiring:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  myDep: vi.fn(),
}));

vi.mock("../path/to/dependency", () => ({
  myDep: (...args: unknown[]) => mocks.myDep(...args),
}));

describe("bootstrap", () => {
  beforeEach(() => {
    mocks.myDep.mockResolvedValue({ ok: true });
  });

  it("mock resolves correctly", async () => {
    const { myDep } = await import("../path/to/dependency");
    expect(await myDep()).toEqual({ ok: true });
  });
});
```

Run it, confirm it passes, then delete it and write the real tests using that same pattern.

## Red Phase

Write tests covering: happy path, edge cases (empty/boundary inputs), error cases (invalid input, unauthorized, missing resource).

```bash
npx vitest run <test-file> --reporter=verbose
```

**Checkpoint**: All new tests MUST fail. If any pass → the behavior already exists or the test is wrong.

## Green Phase

Write the minimum code to make tests pass. No untested features, no premature optimization, no untested error handling.

```bash
npx vitest run <test-file> --reporter=verbose
```

**Checkpoint**: All tests (new and existing) pass.

## Full Suite

```bash
npx vitest run --reporter=verbose
```

If outside tests fail: determine if your change caused the regression. If yes → fix before proceeding. If pre-existing → note it and continue.

## Refactor (Optional)

Only when tests are green. Extract helpers, improve naming, simplify conditionals. Re-run full suite after.

## Quality Gates

```bash
npx eslint <changed-files>
npx tsc --noEmit
```

Fix before committing.

## Mock Patterns Reference

### Forwarding Pattern (survives mockReset)

```typescript
const mockFn = vi.fn();
vi.mock("./dep", () => ({
  dep: (...args: unknown[]) => mockFn(...args),
}));
beforeEach(() => {
  mockFn.mockResolvedValue(defaultResult);
});
```

### Counter-Based Sequencing (multi-query operations)

```typescript
let callCount = 0;
mockExecute.mockImplementation(async () => {
  callCount++;
  if (callCount === 1) return insertResult;
  if (callCount === 2) return selectResult;
});
```

### globalThis Registry (TDZ workaround for interdependent mocks)

```typescript
vi.mock("./dep", () => {
  if (!(globalThis as any).__mocks) (globalThis as any).__mocks = {};
  const m = { dep: vi.fn() };
  (globalThis as any).__mocks.dep = m;
  return { dep: (...a: unknown[]) => m.dep(...a) };
});
// In tests: const mocks = (globalThis as any).__mocks;
```

## Arguments

- `$ARGUMENTS`: Optional description of what to implement via TDD
  - Example: `/tdd add rate limiting to the search endpoint`
  - If empty: ask the user what to implement
