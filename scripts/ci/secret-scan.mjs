#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

const trackedEnv = tracked.filter((file) => {
  const base = file.split('/').pop() ?? file;
  if (base === '.env') {
    return true;
  }
  if (!base.startsWith('.env.')) {
    return false;
  }

  const allowedSuffixes = ['example', 'sample', 'template', 'dist'];
  return !allowedSuffixes.some((suffix) => base.endsWith(`.${suffix}`));
});
if (trackedEnv.length > 0) {
  console.error(`Tracked env files detected: ${trackedEnv.join(', ')}`);
  process.exit(1);
}

const patterns = [
  'BEGIN RSA PRIVATE KEY',
  'BEGIN OPENSSH PRIVATE KEY',
  'BEGIN EC PRIVATE KEY',
  'AKIA[0-9A-Z]{16}',
  'ghp_[A-Za-z0-9]{20,}',
  'github_pat_[A-Za-z0-9_]{20,}',
  'xox[baprs]-[A-Za-z0-9-]{10,}',
  'sk_(live|test)_[A-Za-z0-9]{10,}',
  'AIza[0-9A-Za-z_-]{20,}',
];

for (const pattern of patterns) {
  try {
    execFileSync('rg', ['-n', '--pcre2', '--hidden', '--glob', '!.git/**', pattern, ...tracked], {
      stdio: 'pipe',
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10,
    });
    console.error(`Potential secret match for pattern: ${pattern}`);
    process.exit(1);
  } catch (error) {
    if (error.status !== 1) {
      throw error;
    }
  }
}

console.log(`Secret scan passed across ${tracked.length} tracked files.`);
