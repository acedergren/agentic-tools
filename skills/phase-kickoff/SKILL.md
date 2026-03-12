---
name: phase-kickoff
description: "Use when starting a new development phase or sprint that needs branch creation, TDD test shell, and roadmap entry done together. Enforces phase scaffolding before implementation begins. Keywords: new phase, sprint start, feature branch, roadmap, test shell, scaffold."
---

# Phase Kickoff

Scaffold a new development phase: branch, test shell, and roadmap entry as one atomic operation. Enforces the invariant that implementation never starts without a branch and verification shell.

## Do NOT load when

- phase already exists and now needs execution rather than setup
- task is a one-off fix with no roadmap or branch scaffolding
- user only wants planning, not repository changes

## NEVER

- **Never begin implementation before the branch and test shell exist** — retroactively creating scaffolding after code is written means the test shell describes code that already exists rather than driving its design. The TDD shell's value is forcing you to name behavior before writing it.
- **Never create a phase entry without a concrete goal and verification criteria** — vague roadmap entries ("improve auth") become unmergeable because nobody can agree what "done" means. The verification field must be a runnable command or an unambiguous observable outcome.
- **Never mix unrelated cleanup into the kickoff commit** — the kickoff commit is the reference point for the phase. Mixed concerns make `git bisect` and phase diffing unreliable.
- **Never use a generic branch name like `feature/phase3`** — include the title slug so `git branch -a` is readable without cross-referencing the roadmap.

## Expert decision points

### When to split vs. extend a phase

If you're unsure whether work belongs in a new phase or extends the current one, ask:
- Does it have a different primary deliverable?
- Does it have different deployment risk?
- Can it be reviewed independently?

Two YES answers → new phase. Otherwise extend.

### Test shell structure determines phase quality

The `describe` hierarchy in the test shell is the phase's specification. Write it before the roadmap tasks, not after. If you can't write a meaningful `it.todo("should...")` for a task, the task is not well-defined enough to start.

### Roadmap verification field

The verification field is a quality gate. Acceptable forms:
- `npx vitest run src/auth` — runnable test command
- `curl -s localhost:3000/health | jq '.status == "ok"'` — observable outcome
- `pnpm build && npx tsc --noEmit` — build gate

NOT acceptable: "auth works", "tests pass", "looks good".

## Script

```bash
bash scripts/scaffold-phase.sh "3 - User Authentication"
```

Outputs: branch name, test file path, roadmap stub.

## Steps

1. **Parse `$ARGUMENTS`**: Extract phase number and title (e.g., "3 - User Authentication")
2. **Append roadmap entry**:
   ```markdown
   ## Phase {N}: {Title}
   **Goal**: {one-sentence goal}
   - [ ] {N}.1 {task}
   **Verify**: {runnable command or unambiguous outcome}
   ```
3. **Create branch**: `git checkout -b feature/phase{N}-{kebab-case-title}`
4. **Create TDD test shell** with `describe` blocks matching roadmap tasks:
   ```typescript
   describe("Phase {N}: {Title}", () => {
     describe("{N}.1 - {task}", () => {
       it.todo("should ...");
     });
   });
   ```
5. **Print summary**: phase number, branch, test file path, task count

## Arguments

- `$ARGUMENTS`: Phase number and title — `"3 - User Authentication"` or `"4 Real-time Notifications"`
