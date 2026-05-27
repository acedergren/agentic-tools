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
const cliOciSkills = parseJsArrayLiteral(readFileSync(join(root, 'bin', 'cli.js'), 'utf8'), 'OCI_SKILLS');
const installSkills = parseBashArrayLiteral(readFileSync(join(root, 'install.sh'), 'utf8'), 'SKILLS');
const installOciSkills = parseBashArrayLiteral(readFileSync(join(root, 'install.sh'), 'utf8'), 'OCI_SKILLS');

const missingInCli = skillDirs.filter((skill) => !cliSkills.includes(skill));
const missingInInstall = skillDirs.filter((skill) => !installSkills.includes(skill));
if (missingInCli.length > 0) {
  throw new Error(`Missing skills in bin/cli.js: ${missingInCli.join(', ')}`);
}
if (missingInInstall.length > 0) {
  throw new Error(`Missing skills in install.sh: ${missingInInstall.join(', ')}`);
}

function assertSameSet(label, actual, expected) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const missing = expected.filter((entry) => !actualSet.has(entry));
  const extra = actual.filter((entry) => !expectedSet.has(entry));
  if (missing.length > 0 || extra.length > 0) {
    throw new Error(`${label} mismatch. Missing: ${missing.join(', ') || '(none)'}. Extra: ${extra.join(', ') || '(none)'}`);
  }
}

function parseFrontmatter(text) {
  return text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
}

function yamlList(frontmatter, label) {
  const lines = frontmatter.split('\n');
  const values = [];
  let inList = false;
  for (const line of lines) {
    if (line.startsWith(`${label}:`)) {
      inList = true;
      continue;
    }
    if (inList && /^[A-Za-z0-9_-]+:/.test(line)) {
      break;
    }
    if (inList) {
      const match = line.match(/^\s*-\s+"?([^"\n]+)"?\s*$/);
      if (match) {
        values.push(match[1]);
      }
    }
  }
  return values;
}

const ociManifestPath = join(skillsDir, 'oci', 'manifest.json');
if (!existsSync(ociManifestPath)) {
  throw new Error('Missing skills/oci/manifest.json');
}

const ociManifest = JSON.parse(readFileSync(ociManifestPath, 'utf8'));
const manifestOciSkills = [...new Set([
  ociManifest.packSkill,
  ...ociManifest.groups.flatMap((group) => group.skills),
])].sort();
const oracleTaggedSkills = skillDirs.filter((skill) => {
  const frontmatter = parseFrontmatter(readFileSync(join(skillsDir, skill, 'SKILL.md'), 'utf8'));
  const domains = yamlList(frontmatter, 'domains');
  return domains.some((domain) => ['oci', 'oracle', 'oracle-adjacent'].includes(domain));
}).sort();

for (const skill of manifestOciSkills) {
  if (!skillDirs.includes(skill)) {
    throw new Error(`OCI manifest references missing skill: ${skill}`);
  }
}
assertSameSet('skills/oci/manifest.json Oracle-tagged skill coverage', manifestOciSkills, oracleTaggedSkills);
assertSameSet('bin/cli.js OCI_SKILLS', cliOciSkills, manifestOciSkills);
assertSameSet('install.sh OCI_SKILLS', installOciSkills, manifestOciSkills);

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
