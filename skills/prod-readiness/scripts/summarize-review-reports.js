#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from 'node:fs';

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync('.').filter((file) => /^REVIEW_.*\.md$/.test(file));

const counts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
for (const file of files) {
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const level of Object.keys(counts)) {
    const matches = text.match(new RegExp(`\\[${level}\\]`, 'g'));
    counts[level] += matches ? matches.length : 0;
  }
}

console.log('# Review Severity Summary');
for (const [level, count] of Object.entries(counts)) {
  console.log(`- ${level}: ${count}`);
}
