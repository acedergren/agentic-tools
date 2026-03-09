#!/usr/bin/env node

const groups = process.argv.slice(2);
if (groups.length < 2) {
  console.error('Usage: node check-file-overlap.js "a.ts,b.ts" "b.ts,c.ts" [...]');
  process.exit(1);
}

const parsed = groups.map((group) => new Set(group.split(',').map((item) => item.trim()).filter(Boolean)));
let overlaps = 0;
for (let i = 0; i < parsed.length; i += 1) {
  for (let j = i + 1; j < parsed.length; j += 1) {
    const shared = [...parsed[i]].filter((file) => parsed[j].has(file));
    if (shared.length > 0) {
      overlaps += 1;
      console.log(`OVERLAP\t${i}\t${j}\t${shared.join(',')}`);
    }
  }
}
if (overlaps === 0) {
  console.log('NO_OVERLAP');
}
