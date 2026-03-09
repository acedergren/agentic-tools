# Changelog

## 2026-03-09

### Added
- Added Oracle-focused skills for shared Better Auth setup, Fastify session bridging, and IDCS org provisioning.
- Added reusable helper scripts to `health-check`, `quality-commit`, `migrate`, `phase-kickoff`, `review-all`, `prod-readiness`, `api-audit`, `doc-sync`, `prd`, `bugfix`, and `orchestrate`.
- Added `validate-skill-2-0.mjs` to enforce a local Skill 2.0 baseline for the skill library.

### Changed
- Upgraded the skill library toward a Skill 2.0 / A++ standard with stronger trigger descriptions, load boundaries, anti-pattern guidance, and arguments sections.
- Updated `README.md`, `skills/README.md`, `install.sh`, and `bin/cli.js` to expose the new Oracle skills and current install surface.
- Improved doc-path validation to ignore install-target paths such as `.claude/skills/`, `.claude/agents/`, and `.claude/hooks/`.
