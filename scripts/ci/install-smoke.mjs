#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const repo = process.cwd();
const tempRoot = mkdtempSync(join(os.tmpdir(), 'agentic-tools-smoke-'));
const cliProjectDir = join(tempRoot, 'cli-project');
const shellProjectDir = join(tempRoot, 'shell-project');
execFileSync('mkdir', ['-p', cliProjectDir, shellProjectDir]);

function listInstalledSkills(projectDir) {
  return readdirSync(join(projectDir, '.claude', 'skills')).sort();
}

execFileSync('node', ['bin/cli.js', 'list'], { cwd: repo, stdio: 'inherit' });
execFileSync('node', ['bin/cli.js', 'init', cliProjectDir], { cwd: repo, stdio: 'inherit' });
execFileSync('bash', ['install.sh', shellProjectDir], { cwd: repo, stdio: 'inherit' });

const cliInstalled = listInstalledSkills(cliProjectDir);
const shellInstalled = listInstalledSkills(shellProjectDir);

if (cliInstalled.length < 20) {
  throw new Error(`Expected many CLI-installed skills, found only ${cliInstalled.length}`);
}
if (shellInstalled.length !== cliInstalled.length) {
  throw new Error(`CLI installer found ${cliInstalled.length} skills but install.sh found ${shellInstalled.length}`);
}
if (cliInstalled.join('\n') !== shellInstalled.join('\n')) {
  throw new Error('CLI installer and install.sh installed different skill sets');
}

const externalSmokeEnabled = process.env.SKILLS_EXTERNAL_SMOKE === '1';
if (externalSmokeEnabled) {
  const externalProjectDir = join(tempRoot, 'external-project');
  execFileSync('mkdir', ['-p', externalProjectDir]);
  execFileSync('npx', ['-y', 'skills', 'add', repo, '--list'], { cwd: repo, stdio: 'inherit' });
  execFileSync('npx', ['-y', 'skills', 'add', repo, '--agent', 'claude-code', '--all', '-y', '--copy'], {
    cwd: externalProjectDir,
    stdio: 'inherit',
  });

  const externalSkillsDir = join(externalProjectDir, '.claude', 'skills');
  if (!existsSync(externalSkillsDir)) {
    throw new Error('Expected external skills installer to create .claude/skills');
  }

  const externalInstalled = listInstalledSkills(externalProjectDir);
  if (externalInstalled.join('\n') !== cliInstalled.join('\n')) {
    throw new Error('External skills installer and local CLI installed different skill sets');
  }
  console.log(`External skills add smoke passed with ${externalInstalled.length} installed skills.`);
} else {
  console.log('Skipping external skills add smoke; set SKILLS_EXTERNAL_SMOKE=1 to enable it.');
}

console.log(`Install smoke passed with ${cliInstalled.length} installed skills in ${cliProjectDir} and ${shellProjectDir}`);
