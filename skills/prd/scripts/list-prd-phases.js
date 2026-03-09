#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.argv[2] || '.claude/reference/PRD.md');
if (!existsSync(file)) {
  console.error(`Missing PRD: ${file}`);
  process.exit(1);
}

const text = readFileSync(file, 'utf8');
const lines = text.split('\n');
for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index];
  if (/^##\s+Phase\s+/i.test(line) || /^###\s+Phase\s+/i.test(line)) {
    console.log(`${index + 1}\t${line.replace(/^#+\s*/, '')}`);
  }
}
