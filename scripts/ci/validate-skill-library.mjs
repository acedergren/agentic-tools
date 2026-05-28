#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.cwd());
const skillsDir = join(root, 'skills');

function hasSkillFile(skill) {
  return existsSync(join(skillsDir, skill, 'SKILL.md'));
}

const topLevelSkillDirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((skill) => hasSkillFile(skill));

function nestedPackSkillDirs(pack) {
  const packDir = join(skillsDir, pack);
  if (!existsSync(packDir)) {
    return [];
  }
  return readdirSync(packDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${pack}/${entry.name}`)
    .filter((skill) => hasSkillFile(skill));
}

const nestedSpecialistSkillDirs = ['oci', 'plane'].flatMap((pack) => nestedPackSkillDirs(pack));

const skillDirs = [...new Set([...topLevelSkillDirs, ...nestedSpecialistSkillDirs])]
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
const cliPlaneSkills = parseJsArrayLiteral(readFileSync(join(root, 'bin', 'cli.js'), 'utf8'), 'PLANE_SKILLS');
const installSkills = parseBashArrayLiteral(readFileSync(join(root, 'install.sh'), 'utf8'), 'SKILLS');
const installOciSkills = parseBashArrayLiteral(readFileSync(join(root, 'install.sh'), 'utf8'), 'OCI_SKILLS');
const installPlaneSkills = parseBashArrayLiteral(readFileSync(join(root, 'install.sh'), 'utf8'), 'PLANE_SKILLS');

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

function validatePackManifest({ packId, domainTags, cliPackSkills, installPackSkills, label }) {
  const manifestPath = join(skillsDir, packId, 'manifest.json');
  if (!existsSync(manifestPath)) {
    throw new Error(`Missing skills/${packId}/manifest.json`);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const manifestSkills = [...new Set([
    manifest.packSkill,
    ...manifest.groups.flatMap((group) => group.skills),
  ])].sort();
  const taggedSkills = skillDirs.filter((skill) => {
    const frontmatter = parseFrontmatter(readFileSync(join(skillsDir, skill, 'SKILL.md'), 'utf8'));
    const domains = yamlList(frontmatter, 'domains');
    return domains.some((domain) => domainTags.includes(domain));
  }).sort();

  for (const skill of manifestSkills) {
    if (!skillDirs.includes(skill)) {
      throw new Error(`${label} manifest references missing skill: ${skill}`);
    }
  }
  assertSameSet(`skills/${packId}/manifest.json tagged skill coverage`, manifestSkills, taggedSkills);
  assertSameSet(`bin/cli.js ${label}_SKILLS`, cliPackSkills, manifestSkills);
  assertSameSet(`install.sh ${label}_SKILLS`, installPackSkills, manifestSkills);
}

validatePackManifest({
  packId: 'oci',
  domainTags: ['oci', 'oracle', 'oracle-adjacent'],
  cliPackSkills: cliOciSkills,
  installPackSkills: installOciSkills,
  label: 'OCI',
});

validatePackManifest({
  packId: 'plane',
  domainTags: ['plane', 'plane-api', 'plane-content', 'plane-agent'],
  cliPackSkills: cliPlaneSkills,
  installPackSkills: installPlaneSkills,
  label: 'PLANE',
});

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
