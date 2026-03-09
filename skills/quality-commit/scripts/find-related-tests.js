#!/usr/bin/env node

import { existsSync } from 'node:fs';
import path from 'node:path';

for (const input of process.argv.slice(2)) {
  const ext = path.extname(input);
  const normalizedExt = ext || '.ts';
  const base = ext ? input.slice(0, -ext.length) : input;
  const candidates = [
    `${base}.test${normalizedExt}`,
    `${base}.spec${normalizedExt}`,
    input.replace('/src/', '/src/tests/').replace(normalizedExt, `.test${normalizedExt}`),
  ];

  const matches = candidates.filter((candidate) => existsSync(candidate));
  if (matches.length > 0) {
    console.log(matches.join('\n'));
  }
}
