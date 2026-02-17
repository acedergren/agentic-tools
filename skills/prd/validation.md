# PRD Validation Checklist

Run each gate against the PRD. Report pass/fail with specific line references for failures.

## Critical Gates (must all pass)

### V1: Acceptance Criteria Quality

**Check**: Every Must-Have requirement has acceptance criteria in Given/When/Then format.

**Fail indicators**:

- Criteria that say "should work correctly" or "should handle errors"
- Missing `Given` precondition
- Missing `Then` assertion
- Vague actions in `When`

### V2: Test File Mapping

**Check**: Every Must-Have maps to at least one test file path following project conventions.

**Fail indicators**:

- Missing test file path
- Test type not specified (unit, integration, component)

### V3: Architecture Decision Quality

**Check**: Every AD-N entry has context, 2+ alternatives, rationale, and consequences.

**Fail indicators**:

- Only one option listed
- "Because it's the best" as rationale
- Missing consequences section

### V4: Dependency Health

**Check**: No deprecated packages in scope. No known CVEs.

### V5: Phasing DAG Validity

**Check**: Phase dependencies form a directed acyclic graph (no cycles).

## High Gates (should all pass)

### V6: Metric Measurability

**Check**: Every success metric specifies a number, percentage, or duration.

### V7: Persona Coverage

**Check**: Every persona appears in at least one user story.

### V8: Clarification Markers

**Check**: No `[NEEDS CLARIFICATION]` markers remain.

## Medium Gates (recommended)

### V9: Risk Mitigation Quality

**Check**: Every risk mitigation is actionable (not "be careful").

### V10: Open Questions Resolution

**Check**: Open Questions section is empty or all items are tracked.

## Validation Report Format

```
PRD Validation Report
=====================

Critical Gates:
  [PASS] V1: Acceptance Criteria Quality
  [FAIL] V2: Test File Mapping — M3 missing test file path (line 87)
  [PASS] V3: Architecture Decision Quality
  [PASS] V4: Dependency Health
  [PASS] V5: Phasing DAG Validity

High Gates:
  [PASS] V6: Metric Measurability
  [FAIL] V8: Clarification Markers — 2 markers remaining

Result: 2 failures (1 Critical, 1 High) — must fix before approval
```
