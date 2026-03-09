#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node scripts/check-doc-paths.js <doc-file> [doc-file...]');
  process.exit(1);
}

const virtualTargets = new Set([
  '.claude/skills/',
  '.claude/agents/',
  '.claude/hooks/',
  '.claude/skills',
  '.claude/agents',
  '.claude/hooks',
]);

const pathRegex = /`((?:apps|packages|docs|scripts|infrastructure|claude|\.claude|README\.md|AGENTS\.md|CLAUDE\.md)[^`:#]*)`/g;
let failures = 0;

for (const file of files) {
  const abs = resolve(file);
  const base = dirname(abs);
  const text = readFileSync(abs, 'utf8');
  const seen = new Set();
  let match;
  while ((match = pathRegex.exec(text)) !== null) {
    const candidate = match[1].replace(/^\.\//, '');
    if (seen.has(candidate)) continue;
    seen.add(candidate);
    if (virtualTargets.has(candidate)) continue;
    const local = resolve(base, candidate);
    const repo = resolve(process.cwd(), candidate);
    const ok = existsSync(local) || existsSync(repo);
    if (!ok) {
      console.log(`MISSING\t${file}\t${candidate}`);
      failures += 1;
    }
  }
}

if (failures === 0) {
  console.log('All referenced paths found.');
}
