#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  cpSync,
  copyFileSync,
  readdirSync,
  realpathSync,
  statSync,
} from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const PIPELINE_SKILLS = [
  "prd",
  "orchestrate",
  "implement",
  "tdd",
  "write-tests",
  "review-all",
  "health-check",
  "quality-commit",
  "phase-kickoff",
  "api-audit",
  "doc-sync",
];

const AGENTS = ["mock-debugger.md", "security-reviewer.md"];

function usage() {
  console.log(`
  team-pipeline — Agent team orchestration for Claude Code

  Usage:
    npx @acedergren/team-pipeline init [target-dir]   Install pipeline skills + agents
    npx @acedergren/team-pipeline list                 List what's included
    npx @acedergren/team-pipeline help                 Show this help

  Pipeline:
    /prd → /prd --to-plan → /orchestrate → /implement → /review-all → /health-check → PR

  Examples:
    npx @acedergren/team-pipeline init                 Install to current project
    npx @acedergren/team-pipeline init ./my-project    Install to specific project
`);
}

function list() {
  console.log("\n  Pipeline Skills (in execution order):");
  const order = [
    ["prd", "Requirements → validated PRD"],
    ["orchestrate", "Spawn + coordinate agent teams"],
    ["implement", "Full TDD feature pipeline (per agent)"],
    ["tdd", "Test-driven development cycle"],
    ["write-tests", "Add tests to existing code"],
    ["review-all", "Parallel security + API + scope review"],
    ["health-check", "7+ quality gates diagnostic"],
    ["quality-commit", "Lint → typecheck → test → commit"],
    ["phase-kickoff", "Branch + test shells + roadmap entry"],
    ["api-audit", "Route-to-type contract validation"],
    ["doc-sync", "Documentation drift detection"],
  ];
  for (const [skill, desc] of order) {
    console.log(`    /${skill.padEnd(16)} ${desc}`);
  }

  console.log("\n  Agents:");
  console.log("    mock-debugger      Diagnoses vitest mock wiring failures");
  console.log("    security-reviewer  OWASP Top 10 review with file:line refs");
  console.log();
}

function init(targetDir) {
  const target = resolve(targetDir);

  if (!existsSync(target)) {
    console.error(`  Target directory does not exist: ${target}`);
    process.exit(1);
  }

  const skillsDir = join(target, ".claude", "skills");
  const agentsDir = join(target, ".claude", "agents");

  mkdirSync(skillsDir, { recursive: true });
  mkdirSync(agentsDir, { recursive: true });

  console.log(`\n  Team Pipeline Installer`);
  console.log(`  Target: ${target}\n`);

  // Skills
  let skillCount = 0;
  console.log("  Installing pipeline skills...");
  for (const skill of PIPELINE_SKILLS) {
    const src = join(ROOT, "skills", skill);
    if (existsSync(src) && statSync(src).isDirectory()) {
      cpSync(src, join(skillsDir, skill), {
        recursive: true,
        dereference: true,
      });
      console.log(`    + /${skill}`);
      skillCount++;
    }
  }

  // Agents
  let agentCount = 0;
  console.log("\n  Installing agents...");
  for (const agent of AGENTS) {
    const src = join(ROOT, "agents", agent);
    if (existsSync(src)) {
      const realSrc = realpathSync(src);
      copyFileSync(realSrc, join(agentsDir, agent));
      console.log(`    + ${agent.replace(".md", "")}`);
      agentCount++;
    }
  }

  console.log(`
  Done! Installed ${skillCount} skills, ${agentCount} agents.

  Pipeline:
    /prd → /prd --to-plan → /orchestrate → /implement → /review-all → /health-check → PR

  Quick start:
    /prd           Draft requirements for a feature
    /implement     Build a feature with full TDD pipeline
    /review-all    Run parallel pre-PR reviews
    /health-check  Full codebase diagnostic
  `);
}

// --- CLI ---
const args = process.argv.slice(2);
const command = args[0] || "help";

switch (command) {
  case "init":
    init(args[1] || ".");
    break;
  case "list":
    list();
    break;
  case "help":
  case "--help":
  case "-h":
    usage();
    break;
  default:
    console.error(`  Unknown command: ${command}`);
    usage();
    process.exit(1);
}
