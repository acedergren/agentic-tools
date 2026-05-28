#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync, rmSync, statSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SKILLS = [
  "api-audit",
  "oci/best-practices",
  "bugfix",
  "oci/compute-management",
  "oci/database-management",
  "doc-sync",
  "oci/fastify-better-auth-bridge",
  "find-skills",
  "oci/finops-cost-optimization",
  "firecrawl",
  "oci/genai-services",
  "health-check",
  "humanizer",
  "oci/iam-identity-management",
  "implement",
  "oci/infrastructure-as-code",
  "oci/landing-zones",
  "migrate",
  "oci/monitoring-operations",
  "oci/networking-management",
  "oci",
  "oci/oci-events",
  "oci/oci-pptx",
  "oci/managed-bastion-access",
  "oci/oci-resource-manager",
  "oci/oci-security-control-plane",
  "oci/zpr-security",
  "oci/oracle-dba",
  "oci/oracle-idcs-better-auth-setup",
  "oci/oracle-idcs-org-provisioning",
  "orchestrate",
  "phase-kickoff",
  "plane",
  "plane/api-operations",
  "plane/work-item-management",
  "plane/planning-structure",
  "plane/pages-content",
  "plane/intake-customer-triage",
  "plane/agent-webhook-automation",
  "plane/reporting-audit",
  "prd",
  "prod-readiness",
  "publish-skill",
  "quality-commit",
  "refactor-module",
  "review-all",
  "oci/secrets-management",
  "semgrep-coderabbit",
  "shadcn-svelte",
  "oci/sqlite-to-oracle-planner",
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
  "oci/best-practices",
  "oci/compute-management",
  "oci/database-management",
  "oci/finops-cost-optimization",
  "oci/genai-services",
  "oci/iam-identity-management",
  "oci/infrastructure-as-code",
  "oci/landing-zones",
  "oci/monitoring-operations",
  "oci/networking-management",
  "oci/oci-events",
  "oci/managed-bastion-access",
  "oci/oci-resource-manager",
  "oci/oci-security-control-plane",
  "oci/zpr-security",
  "oci/oracle-dba",
  "oci/secrets-management",
  "oci/fastify-better-auth-bridge",
  "oci/oci-pptx",
  "oci/oracle-idcs-better-auth-setup",
  "oci/oracle-idcs-org-provisioning",
  "oci/sqlite-to-oracle-planner",
];

// Plane-owned skills. Keep in sync with skills/plane/manifest.json.
const PLANE_SKILLS = [
  "plane",
  "plane/api-operations",
  "plane/work-item-management",
  "plane/planning-structure",
  "plane/pages-content",
  "plane/intake-customer-triage",
  "plane/agent-webhook-automation",
  "plane/reporting-audit",
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
  const planeSet = new Set(PLANE_SKILLS);

  console.log("\n  OCI Skills:");
  for (const skill of OCI_SKILLS) {
    const dir = join(ROOT, "skills", skill);
    const exists = existsSync(dir);
    console.log(`    ${exists ? "+" : "-"} /${skill}`);
  }

  console.log("\n  Plane Skills:");
  for (const skill of PLANE_SKILLS) {
    const dir = join(ROOT, "skills", skill);
    const exists = existsSync(dir);
    console.log(`    ${exists ? "+" : "-"} /${skill}`);
  }

  console.log("\n  Other Skills:");
  for (const skill of SKILLS.filter((skill) => !ociSet.has(skill) && !planeSet.has(skill))) {
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
      rmSync(dest, { recursive: true, force: true });
      mkdirSync(dirname(dest), { recursive: true });
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
