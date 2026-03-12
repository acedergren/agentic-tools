---
name: write-tests
description: "Use when adding or improving test coverage for existing source code without changing production behavior. Selects mock strategy by module type (route handler, repository, plugin, utility, service), handles mockReset:true environments, and prevents common vitest/jest mock wiring failures. Triggers on: write tests, add tests, test coverage, regression coverage, untested module, *.test.ts."
---

# Write Tests for Existing Code

## NEVER

- **NEVER chain `mockResolvedValueOnce`** when `mockReset: true` — the chain clears between tests. Use counter-based `mockImplementation` instead.
- **NEVER define mock variables at module scope then reference them inside `vi.mock()` factories** — hoisting creates a temporal dead zone. Use `vi.hoisted()` or globalThis registry.
- **NEVER `vi.importActual()` for modules with side effects** — use selective re-exports instead.
- **NEVER test implementation details** (private state, internal call order) — test observable behavior through the public API.
- **NEVER copy mock patterns from other projects** — check YOUR test runner config first (`mockReset`, `mockClear`, `restoreMocks`).
- **NEVER modify source code** — this skill writes tests only; production behavior is fixed.

## Before Writing, Ask Yourself

- **Module type?** Each has a different mock strategy (see table below).
- **Blast radius?** Does this module have side effects (DB writes, API calls, filesystem) that need isolation?
- **Nearest test file?** Find the closest `*.test.ts` and match its exact mock structure — don't invent a new pattern.

## Mock Strategy by Module Type

| Module Type        | Strategy                                               |
| ------------------ | ------------------------------------------------------ |
| Route handler      | Test app builder + session simulation + `app.inject()` |
| Repository         | Mock DB connection + counter-based `execute`           |
| Framework plugin   | Real framework instance + selective dependency mocks   |
| Pure utility       | No mocks — test inputs/outputs directly                |
| Service w/ DI      | Mock injected deps via forwarding pattern              |

## Mock Setup (mockReset: true)

If your test runner uses `mockReset: true`, most examples from the internet will **silently fail** — return values clear between tests.

```typescript
const { mockFn } = vi.hoisted(() => ({
  mockFn: vi.fn(),
}));

vi.mock("./dependency", () => ({
  dependency: (...args: unknown[]) => mockFn(...args),
}));

beforeEach(() => {
  // MUST reconfigure here — mockReset clears return values between tests
  mockFn.mockResolvedValue(defaultResult);
});
```

For complex TDZ cases (multiple interdependent mocks), use the **globalThis registry pattern**:

```typescript
vi.mock("./dep", () => {
  if (!(globalThis as any).__mocks) (globalThis as any).__mocks = {};
  const m = { dep: vi.fn() };
  (globalThis as any).__mocks.dep = m;
  return { dep: (...a: unknown[]) => m.dep(...a) };
});
// In tests: const mocks = (globalThis as any).__mocks;
```

## Metacognitive Rule

**If >3 tests fail on first run**: STOP. Root cause is almost certainly a mock wiring issue affecting all tests — not individual test logic. Re-examine the mock setup holistically before fixing tests one by one.

## Run

```bash
npx vitest run <test-file> --reporter=verbose
```

## Arguments

- `$ARGUMENTS`: Path to the source file or module to cover
  - Example: `/write-tests src/routes/admin/settings.ts`
  - If empty: ask the user which file needs test coverage
