#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

for (const script of [
  'scripts/ci/validate-skill-library.mjs',
  'scripts/ci/install-smoke.mjs',
  'scripts/ci/secret-scan.mjs',
]) {
  console.log(`\n== Running ${script} ==`);
  execFileSync('node', [script], { stdio: 'inherit' });
}
