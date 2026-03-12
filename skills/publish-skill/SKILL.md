---
name: publish-skill
description: "Use when creating a new skill and adding it to the acedergren/agentic-tools repo so others can install it with npx skills add. Covers init, spec compliance, commit, push, and install verification. Keywords: publish skill, add skill to repo, npx skills init, share skill, agentic-tools."
---

# Publish Skill

Add a new skill to `acedergren/agentic-tools` and make it installable via `npx skills add`.

## Workflow

### 1. Scaffold
```bash
cd ~/Projects/agentic-tools/skills
npx skills init <skill-name>
# Creates skills/<skill-name>/SKILL.md
```

### 2. Write the skill
Edit `skills/<skill-name>/SKILL.md`. Frontmatter must have exactly two fields:
```yaml
---
name: skill-name-with-hyphens   # lowercase, letters/numbers/hyphens, ≤64 chars
description: "Use when [trigger conditions]. [WHAT]. Keywords: ..."
---
```

Description rules — all three required:
- **WHAT**: what does it do?
- **WHEN**: starts with "Use when..."
- **KEYWORDS**: searchable terms at the end

### 3. Evaluate before committing
Run `/skill-judge` on the new skill. Target ≥ 84/120 (C grade) before pushing.

Key checks:
- No "What is X" explanations Claude already knows
- Has explicit NEVER list with reasons
- SKILL.md < 300 lines (heavy reference → `references/` subdir)
- No extra frontmatter fields (license, metadata, version)

### 4. Commit and push
```bash
git add skills/<skill-name>/
git commit -m "feat(skills): add <skill-name> skill"
git push origin main
```

### 5. Verify installable
```bash
npx skills add acedergren/agentic-tools@<skill-name> -g -y
```

If the skill isn't found, check:
- Directory name matches `name` field in frontmatter
- SKILL.md is at `skills/<skill-name>/SKILL.md` (not nested deeper)

## Install Commands for This Repo

```bash
# Single skill
npx skills add acedergren/agentic-tools@<skill-name> -g

# All skills
npx skills add acedergren/agentic-tools --all -g -y

# List available without installing
npx skills add acedergren/agentic-tools -l
```

## NEVER

- **Never push a skill without running `/skill-judge` first** — a skill that fails evaluation won't trigger correctly because its description lacks WHAT/WHEN/KEYWORDS
- **Never use extra frontmatter fields** — only `name` and `description` are valid; `license`, `metadata`, `version` cause parse errors in some agents
- **Never put "When to use" only in the body** — the agent only reads the description to decide whether to load; body content is invisible at trigger time
- **Never name a skill with spaces or special chars** — `my skill!` breaks install; use `my-skill`
