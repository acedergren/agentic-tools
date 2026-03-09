#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.cwd());
const skillsDir = join(root, 'skills');
const skillDirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const skill of skillDirs) {
  const skillFile = join(skillsDir, skill, 'SKILL.md');
  if (!existsSync(skillFile)) {
    throw new Error(`Missing SKILL.md for ${skill}`);
  }
}

execFileSync('node', ['validate-skill-2-0.mjs', ...skillDirs], {
  cwd: root,
  stdio: 'inherit',
});

function parseJsArrayLiteral(source, label) {
  const match = source.match(new RegExp(`const\\s+${label}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'm'));
  if (!match) {
    throw new Error(`Could not find ${label} array`);
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]).sort();
}

function parseBashArrayLiteral(source, label) {
  const match = source.match(new RegExp(`${label}=\\(\\s*([\\s\\S]*?)\\)`, 'm'));
  if (!match) {
    throw new Error(`Could not find ${label} array`);
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]).sort();
}

const cliSkills = parseJsArrayLiteral(readFileSync(join(root, 'bin', 'cli.js'), 'utf8'), 'SKILLS');
const installSkills = parseBashArrayLiteral(readFileSync(join(root, 'install.sh'), 'utf8'), 'SKILLS');

const missingInCli = skillDirs.filter((skill) => !cliSkills.includes(skill));
const missingInInstall = skillDirs.filter((skill) => !installSkills.includes(skill));
if (missingInCli.length > 0) {
  throw new Error(`Missing skills in bin/cli.js: ${missingInCli.join(', ')}`);
}
if (missingInInstall.length > 0) {
  throw new Error(`Missing skills in install.sh: ${missingInInstall.join(', ')}`);
}

const readme = readFileSync(join(root, 'README.md'), 'utf8');
const skillsReadme = readFileSync(join(root, 'skills', 'README.md'), 'utf8');
for (const skill of skillDirs) {
  if (!readme.includes(`skills/${skill}/`)) {
    throw new Error(`README.md missing skills/${skill}/ reference`);
  }
  if (!skillsReadme.includes(`**${skill}**`)) {
    throw new Error(`skills/README.md missing ${skill} table entry`);
  }
}

for (const skill of skillDirs) {
  const text = readFileSync(join(skillsDir, skill, 'SKILL.md'), 'utf8');
  const referencedScripts = [...text.matchAll(/(?:bash|node)\s+scripts\/([^\s`]+)/g)].map((m) => m[1]);
  for (const script of referencedScripts) {
    const scriptPath = join(skillsDir, skill, 'scripts', script);
    if (!existsSync(scriptPath)) {
      throw new Error(`Missing referenced script ${skill}/scripts/${script}`);
    }
  }
}

console.log(`Validated ${skillDirs.length} skills, registries, README entries, and referenced scripts.`);
