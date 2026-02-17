# PRD: [Feature Name]

> **Status**: Draft | In Review | Approved | Superseded
> **Author**: [name]
> **Created**: [date]
> **Last Updated**: [date]

---

## Validation Checklist

Run `/prd --validate` to check these gates. All Critical gates must pass before approval.

| #   | Gate                                                    | Severity | Status |
| --- | ------------------------------------------------------- | -------- | ------ |
| V1  | Every Must-Have has Given/When/Then acceptance criteria | Critical | [ ]    |
| V2  | Every Must-Have maps to at least one test file          | Critical | [ ]    |
| V3  | Architecture Decisions have alternatives evaluated      | Critical | [ ]    |
| V4  | No deprecated dependencies in scope                     | Critical | [ ]    |
| V5  | Phases form a valid DAG (no circular dependencies)      | Critical | [ ]    |
| V6  | Success metrics are measurable (number, %, duration)    | High     | [ ]    |
| V7  | All personas referenced in at least one user story      | High     | [ ]    |
| V8  | No `[NEEDS CLARIFICATION]` markers remain               | High     | [ ]    |
| V9  | Risk mitigations are actionable (not "be careful")      | Medium   | [ ]    |
| V10 | Open Questions section is empty or tracked              | Medium   | [ ]    |

---

## 1. Product Overview

### Vision

[NEEDS CLARIFICATION: What is the long-term vision this feature supports?]

### Problem Statement

[NEEDS CLARIFICATION: What specific problem does this solve? Who experiences it and how often?]

### Value Proposition

[NEEDS CLARIFICATION: Why is this worth building now? What's the cost of not building it?]

---

## 2. User Personas

### Persona: [Name]

| Attribute    | Detail                |
| ------------ | --------------------- |
| Role         | [NEEDS CLARIFICATION] |
| Goal         | [NEEDS CLARIFICATION] |
| Pain Point   | [NEEDS CLARIFICATION] |
| Tech Comfort | Low / Medium / High   |

---

## 3. User Journey Maps

### Journey: [Name] — [Goal]

```
[Entry Point] → [Step 1] → [Step 2] → [Decision Point]
                                            ├── [Happy Path] → [Success State]
                                            └── [Error Path] → [Recovery Action]
```

---

## 4. Feature Requirements

### Must Have (P0)

#### M1: [Feature Name]

**User Story**: As a [persona], I want to [action] so that [benefit].

**Acceptance Criteria**:

```gherkin
Given [precondition]
When [action]
Then [expected result]
```

**Affected Files**: `[path/to/file.ts]`
**Test File**: `[path/to/feature.test.ts]`

### Should Have (P1)

#### S1: [Feature Name]

### Could Have (P2)

#### C1: [Feature Name]

### Won't Do (Explicit Exclusions)

- **W1**: [What and why it's excluded]

---

## 5. Architecture Decisions

### AD-1: [Decision Title]

| Aspect        | Detail                                |
| ------------- | ------------------------------------- |
| **Context**   | [What situation requires a decision?] |
| **Decision**  | [What was decided?]                   |
| **Rationale** | [Why this option over alternatives?]  |

**Alternatives Evaluated**:

| Option       | Pros   | Cons   | Rejected Because |
| ------------ | ------ | ------ | ---------------- |
| [Option A]   | [pros] | [cons] | [reason]         |
| **[Chosen]** | [pros] | [cons] | **Selected**     |

---

## 6. Dependency Analysis

### Current State

| Package        | Current | Latest  | Status     | Notes     |
| -------------- | ------- | ------- | ---------- | --------- |
| [package-name] | [x.y.z] | [a.b.c] | Up to date | [context] |

### New Dependencies

| Package        | Version   | Purpose      | License   | Size          |
| -------------- | --------- | ------------ | --------- | ------------- |
| [package-name] | [version] | [why needed] | [license] | [bundle size] |

---

## 7. Phasing & Dependencies

### Phase 1: [Title]

**Goal**: [One sentence]
**Prerequisites**: None
**Delivers**: M1
**Parallelizable with**: Nothing (foundation phase)

### Phase 2: [Title]

**Goal**: [One sentence]
**Prerequisites**: Phase 1 complete
**Delivers**: M2, S1

---

## 8. TDD Protocol

### Test File Mapping

| Requirement | Test File              | Test Type          |
| ----------- | ---------------------- | ------------------ |
| M1          | `src/tests/m1.test.ts` | Unit + Integration |

---

## 9. Risks & Mitigations

| #   | Risk            | Probability  | Impact       | Mitigation                        |
| --- | --------------- | ------------ | ------------ | --------------------------------- |
| R1  | [specific risk] | Low/Med/High | Low/Med/High | [specific, actionable mitigation] |

---

## 10. Success Metrics

| Metric            | Target   | Measurement Method | Timeframe |
| ----------------- | -------- | ------------------ | --------- |
| [Adoption metric] | [number] | [how to measure]   | [when]    |

---

## 11. Open Questions

- [ ] [Question 1]

---

## 12. Changelog

| Date   | Change Type | Description |
| ------ | ----------- | ----------- |
| [date] | Created     | Initial PRD |
