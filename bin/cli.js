#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync, statSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SKILLS = [
  "api-audit",
  "best-practices",
  "bugfix",
  "compute-management",
  "database-management",
  "doc-sync",
  "fastify-better-auth-bridge",
  "find-skills",
  "finops-cost-optimization",
  "firecrawl",
  "genai-services",
  "health-check",
  "humanizer",
  "iam-identity-management",
  "implement",
  "infrastructure-as-code",
  "landing-zones",
  "migrate",
  "monitoring-operations",
  "networking-management",
  "oci",
  "oci-events",
  "oci-pptx",
  "oracle-dba",
  "oracle-idcs-better-auth-setup",
  "oracle-idcs-org-provisioning",
  "orchestrate",
  "phase-kickoff",
  "prd",
  "prod-readiness",
  "publish-skill",
  "quality-commit",
  "refactor-module",
  "review-all",
  "secrets-management",
  "semgrep-coderabbit",
  "shadcn-svelte",
  "sqlite-to-oracle-planner",
  "stitch-design-system",
  "stitch-prompt-engineer",
  "stitch-to-react",
  "tanstack-query",
  "tdd",
  "turborepo",
  "write-natural-swedish",
  "write-tests",
];

// OCI and Oracle-owned skills. Keep in sync with skills/oci/manifest.json.
const OCI_SKILLS = [
  "oci",
  "best-practices",
  "compute-management",
  "database-management",
  "finops-cost-optimization",
  "genai-services",
  "iam-identity-management",
  "infrastructure-as-code",
  "landing-zones",
  "monitoring-operations",
  "networking-management",
  "oci-events",
  "oracle-dba",
  "secrets-management",
  "fastify-better-auth-bridge",
  "oci-pptx",
  "oracle-idcs-better-auth-setup",
  "oracle-idcs-org-provisioning",
  "sqlite-to-oracle-planner",
];

const AGENTS = ["mock-debugger.md", "security-reviewer.md"];

function usage() {
  console.log(`
  agentic-tools — Claude Code skills, agents, and hooks

  Usage:
    npx agentic-tools init [target-dir]   Install all skills, agents, and hooks
    npx agentic-tools list                List available skills and agents
    npx agentic-tools help                Show this help

  Examples:
    npx agentic-tools init                Install to current directory
    npx agentic-tools init ./my-project   Install to specific project
`);
}

function list() {
  const ociSet = new Set(OCI_SKILLS);

  console.log("\n  OCI Skills:");
  for (const skill of OCI_SKILLS) {
    const dir = join(ROOT, "skills", skill);
    const exists = existsSync(dir);
    console.log(`    ${exists ? "+" : "-"} /${skill}`);
  }

  console.log("\n  Other Skills:");
  for (const skill of SKILLS.filter((skill) => !ociSet.has(skill))) {
    const dir = join(ROOT, "skills", skill);
    const exists = existsSync(dir);
    console.log(`    ${exists ? "+" : "-"} /${skill}`);
  }

  console.log("\n  Agents:");
  for (const agent of AGENTS) {
    const name = agent.replace(".md", "");
    console.log(`    + ${name}`);
  }

  const hooksDir = join(ROOT, "claude", "hooks", "examples");
  if (existsSync(hooksDir)) {
    const hooks = readdirSync(hooksDir).filter((f) => f.endsWith(".sh"));
    console.log(`\n  Hooks: ${hooks.length} examples`);
    for (const hook of hooks) {
      console.log(`    + ${hook}`);
    }
  }
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
  const hooksDir = join(target, ".claude", "hooks");

  mkdirSync(skillsDir, { recursive: true });
  mkdirSync(agentsDir, { recursive: true });
  mkdirSync(hooksDir, { recursive: true });

  console.log(`\n  Agentic Tools Installer`);
  console.log(`  Target: ${target}\n`);

  // Skills
  let skillCount = 0;
  console.log("  Installing skills...");
  for (const skill of SKILLS) {
    const src = join(ROOT, "skills", skill);
    if (existsSync(src) && statSync(src).isDirectory()) {
      const dest = join(skillsDir, skill);
      cpSync(src, dest, { recursive: true });
      console.log(`    + /${skill}`);
      skillCount++;
    }
  }

  // Agents
  let agentCount = 0;
  console.log("\n  Installing agents...");
  for (const agent of AGENTS) {
    const src = join(ROOT, "claude", "agents", agent);
    if (existsSync(src)) {
      cpSync(src, join(agentsDir, agent));
      console.log(`    + ${agent.replace(".md", "")}`);
      agentCount++;
    }
  }

  // Hooks
  let hookCount = 0;
  const hooksSrc = join(ROOT, "claude", "hooks", "examples");
  if (existsSync(hooksSrc)) {
    console.log("\n  Installing hook examples...");
    const hooks = readdirSync(hooksSrc).filter((f) => f.endsWith(".sh"));
    for (const hook of hooks) {
      cpSync(join(hooksSrc, hook), join(hooksDir, hook));
      console.log(`    + ${hook}`);
      hookCount++;
    }
  }

  console.log(`
  Done! Installed ${skillCount} skills, ${agentCount} agents, ${hookCount} hooks.

  Next steps:
    1. Review installed skills in .claude/skills/
    2. Customize skill paths for your project structure
    3. Register hooks in .claude/settings.json (see claude/hooks/README.md)
    4. Try: /implement, /tdd, /review-all, /health-check
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
