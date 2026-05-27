#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const target = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(process.cwd(), 'apps/api/src/plugins/auth.ts');

if (!fs.existsSync(target)) {
  console.error(`File not found: ${target}`);
  process.exit(1);
}

const source = fs.readFileSync(target, 'utf8');
const checks = [
  ['web request helper', /function\s+toWebRequest\s*\(/],
  ['getSession usage', /auth\.api\.getSession/],
  ['request.user decorator', /decorateRequest\('user'/],
  ['request.session decorator', /decorateRequest\('session'/],
  ['request.permissions decorator', /decorateRequest\('permissions'/],
  ['exclude path handling', /excludePaths|excludeSet/],
  ['org membership fallback', /org_members|resolveUserOrgMembership/],
];

console.log(`Fastify Better Auth bridge check: ${target}`);
console.log('');

let failures = 0;
for (const [label, pattern] of checks) {
  const ok = pattern.test(source);
  console.log(`${ok ? '✓' : '✗'} ${label}`);
  if (!ok) failures += 1;
}

if (failures > 0) {
  console.error('');
  console.error(`Bridge check failed with ${failures} missing pattern(s).`);
  process.exit(1);
}

console.log('');
console.log('Bridge shape looks complete.');
