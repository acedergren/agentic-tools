---
name: find-skills
description: "Use when user asks to find, install, or search for agent skills. Also use when user asks 'can you do X' or 'is there a skill for X' where X is a specialized capability. Keywords: install skill, find skill, npx skills, skills.sh, extend agent, add capability."
---

# Find Skills

Discover and install skills from the open agent skills ecosystem via the Skills CLI.

## CLI Reference

```bash
npx skills find [query]           # Search by keyword
npx skills add <owner/repo@skill> # Install a skill
npx skills add <owner/repo@skill> -g -y  # Install globally, skip prompts
npx skills check                  # Check for updates
npx skills update                 # Update all installed skills
npx skills init my-skill-name     # Scaffold a new skill
```

Browse: https://skills.sh/

## Known Sources

| Source | Skills |
|--------|--------|
| `acedergren/agentic-tools` | OCI (compute, IAM, networking, DBA, finops, landing-zones, genai), orchestrate, prd, implement, tdd, health-check, stitch-*, migrate, doc-sync, quality-commit, prod-readiness |
| `vercel-labs/agent-skills` | React, Next.js, Vercel deployment, performance |
| `ComposioHQ/awesome-claude-skills` | General-purpose catalogue |

Install from agentic-tools:
```bash
npx skills add acedergren/agentic-tools@orchestrate
npx skills add acedergren/agentic-tools@oracle-dba
npx skills add acedergren/agentic-tools@prd
```

## Search Strategy

1. Run `npx skills find [domain] [task]` — specific beats generic ("react testing" > "testing")
2. If no results: try synonyms ("deploy" / "deployment" / "ci-cd")
3. Check `acedergren/agentic-tools` directly for OCI, auth, and workflow skills

## When No Results Found

```
npx skills find [query] returned no matches.
Options:
- I can help directly with my general capabilities
- Create your own: npx skills init my-skill-name
```

## NEVER

- **Never install without `-g` unless user explicitly wants project-local** — project-local install puts skills in `./node_modules/.claude/` which most users don't want
- **Never skip showing the skills.sh link** — users may want to inspect before installing
- **Never assume `npx skills find` exhausts all options** — check known sources table above for OCI/workflow skills that may not be indexed yet
