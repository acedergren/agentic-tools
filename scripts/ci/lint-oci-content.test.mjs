#!/usr/bin/env node
// Self-test for lint-oci-content.mjs: bad policy text must fail, good text must pass.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';

function run(markdown) {
  const dir = mkdtempSync(join(os.tmpdir(), 'oci-lint-fixture-'));
  try {
    writeFileSync(join(dir, 'SKILL.md'), markdown);
    return spawnSync('node', ['scripts/ci/lint-oci-content.mjs'], {
      encoding: 'utf8',
      env: { ...process.env, OCI_LINT_DIR: dir, OCI_LINT_SKIP_CLI: '1' },
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const bad = run(`
\`\`\`
Allow group Devs to manage instance-family in compartment Dev where target.instance.name =~ 'dev-*'
Allow group Devs to read buckets in compartment Dev where target.bucket.name = 'logs-*'
Allow group Devs to use instances in compartment Dev where target.resource.freeform-tags.env = 'dev'
ALL {instance.compartment.id = 'ocid1.compartment.oc1..x', instance.freeform-tags.env = 'prod'}
\`\`\`
`);
assert.equal(bad.status, 1, `expected failure, got:\n${bad.stdout}${bad.stderr}`);
for (const needle of ['=~', 'quoted wildcard', 'freeform']) {
  assert.ok(bad.stderr.includes(needle), `expected a finding mentioning "${needle}":\n${bad.stderr}`);
}

const good = run(`
\`\`\`
Allow group 'Default'/'Devs' to read buckets in compartment Dev where target.bucket.name = /logs-*/
Allow group Devs to use instances in compartment Dev where target.resource.tag.Ops.Env = 'dev'
ALL {instance.compartment.id = 'ocid1.compartment.oc1..x', tag.Ops.Env.value = 'prod'}
CpuUtilization[1m]{resourceDisplayName =~ "web-*"}.mean() > 80
\`\`\`
`);
assert.equal(good.status, 0, `expected pass, got:\n${good.stdout}${good.stderr}`);

console.log('lint-oci-content self-test passed.');
