#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const repo = process.cwd();
const tempRoot = mkdtempSync(join(os.tmpdir(), 'agentic-tools-smoke-'));
const projectDir = join(tempRoot, 'project');
execFileSync('mkdir', ['-p', projectDir]);

execFileSync('node', ['bin/cli.js', 'list'], { cwd: repo, stdio: 'inherit' });
execFileSync('npx', ['-y', 'skills', 'add', repo, '--list'], { cwd: repo, stdio: 'inherit' });
execFileSync('npx', ['-y', 'skills', 'add', repo, '--agent', 'claude-code', '--all', '-y', '--copy'], {
  cwd: projectDir,
  stdio: 'inherit',
});

const installed = readdirSync(join(projectDir, '.claude', 'skills')).sort();
if (installed.length < 20) {
  throw new Error(`Expected many installed skills, found only ${installed.length}`);
}
console.log(`Install smoke passed with ${installed.length} installed skills in ${projectDir}`);
