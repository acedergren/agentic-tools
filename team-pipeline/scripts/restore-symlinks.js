// Restores symlinks after npm pack/publish replaces them with copies

import {
  readdirSync,
  rmSync,
  symlinkSync,
  existsSync,
  lstatSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SKILLS = [
  "implement",
  "tdd",
  "write-tests",
  "review-all",
  "health-check",
  "prd",
  "orchestrate",
  "quality-commit",
  "phase-kickoff",
  "api-audit",
  "doc-sync",
];

const AGENTS = ["mock-debugger.md", "security-reviewer.md"];

console.log("Restoring symlinks...");

// Restore skills
for (const skill of SKILLS) {
  const full = join(ROOT, "skills", skill);
  if (existsSync(full) && !lstatSync(full).isSymbolicLink()) {
    rmSync(full, { recursive: true });
    symlinkSync(`../../skills/${skill}`, full);
    console.log(`  restored: skills/${skill}`);
  }
}

// Restore agents
for (const agent of AGENTS) {
  const full = join(ROOT, "agents", agent);
  if (existsSync(full) && !lstatSync(full).isSymbolicLink()) {
    rmSync(full);
    symlinkSync(`../../claude/agents/${agent}`, full);
    console.log(`  restored: agents/${agent}`);
  }
}

console.log("Done.");
