---
name: phase-kickoff
description: "Scaffold a new development phase with branch, test shells, and roadmap entry. Use when starting a new feature phase or sprint to set up the development environment consistently."
---

# Phase Kickoff

## Load this skill when

- the user is starting a new implementation phase or sprint
- branch, test shell, and roadmap setup should happen together
- the goal is consistent phase scaffolding before work begins

## Do NOT load this skill when

- the phase already exists and now needs execution rather than setup
- the task is a one-off fix with no roadmap or branch scaffolding
- the user only wants planning, not repository setup

## NEVER

- Never begin implementation before the branch and verification shell exist.
- Never create a phase entry without a concrete milestone or feature goal.
- Never mix unrelated cleanup into the kickoff commit.

## Scripts

Use the scaffold helper to generate the branch name, test file path, and roadmap stub:

```bash
bash scripts/scaffold-phase.sh "3 - User Authentication"
```

Scaffold a new phase of development following a structured phase-based workflow.

## Steps

1. **Parse arguments**: Extract the phase number and goal from `$ARGUMENTS` (e.g., "3 - User Authentication").

2. **Update roadmap**: Append a new phase section to your roadmap document:

   ```markdown
   ---
   
   ## Phase {N}: {Title}
   
   **Goal**: {One-sentence goal description}
   
   - [ ] {N}.1 {First task}
   - [ ] {N}.2 {Second task}
   ...

   **Verify**: {How to confirm the phase is complete}
   ```

3. **Create feature branch** (if not already on one):

   ```
   git checkout -b feature/phase{N}-{kebab-case-title}
   ```

4. **Create TDD test shell**: Create a test file with `describe` blocks matching the planned tasks:

   ```typescript
   import { describe, it, expect } from "vitest";

   describe("Phase {N}: {Title}", () => {
     describe("{N}.1 - {First task}", () => {
       it.todo("should ...");
     });
   });
   ```

5. **Print summary**: Show the phase number, branch name, test file location, and task count.

## Arguments

- `$ARGUMENTS`: Phase number and title (e.g., "3 - User Authentication" or "4 Real-time Notifications")

## Context

This skill enforces a structured development model:

- Each phase has a clear goal, numbered tasks, and verification criteria
- Quality gates: lint, typecheck, tests per commit
- Test counts are tracked after phase completion
