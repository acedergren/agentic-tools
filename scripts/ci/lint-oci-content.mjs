#!/usr/bin/env node
// Lint OCI content in skills:
//   1. IAM policy / dynamic-group syntax (always runs, no dependencies).
//   2. `oci ...` CLI commands and flags exist (runs when the OCI CLI is installed;
//      skipped otherwise, or when OCI_LINT_SKIP_CLI=1).
//
// Suppress a finding by putting `lint-ignore` on the same line.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import { join, relative, resolve } from 'node:path';

const root = resolve(process.cwd());
// OCI_LINT_DIR lets the self-test point the linter at fixtures.
const skillsDir = process.env.OCI_LINT_DIR ? resolve(process.env.OCI_LINT_DIR) : join(root, 'skills');
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const files = walk(skillsDir);

// ---------------------------------------------------------------------------
// 1. IAM policy lint
// ---------------------------------------------------------------------------
const policyStart = /\ballow\s+(group|dynamic-group|any-user|any-group|service|resource)\b/i;
const policyScope = /\bin\s+(tenancy|compartment)\b/i;

function lintPolicyText(file, lineNo, text) {
  const where = `${relative(root, file)}:${lineNo}`;
  if (/=~/.test(text)) {
    errors.push(`${where}: IAM policy conditions support only = and != ('=~' is MQL, not policy syntax): ${text.trim()}`);
  }
  if (/!?=\s*'[^']*\*[^']*'/.test(text)) {
    errors.push(`${where}: quoted wildcard in a policy condition is a literal match; use /pattern*/ instead: ${text.trim()}`);
  }
  if (/freeform-?tags|freeformTags/i.test(text)) {
    errors.push(`${where}: policy conditions support defined tags only (target.resource.tag.<namespace>.<key>), not freeform tags: ${text.trim()}`);
  }
}

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.includes('lint-ignore')) continue;

    // Dynamic group matching rules
    if (/\binstance\.(compartment\.)?id\b|\bresource\.(type|compartment\.id)\b/.test(line) && /freeform-?tags/i.test(line)) {
      errors.push(`${relative(root, file)}:${i + 1}: dynamic group rules match defined tags as tag.<namespace>.<key>.value, not freeform tags: ${line.trim()}`);
    }

    if (!policyStart.test(line)) continue;
    // A policy statement may continue on following indented "where" lines.
    let statement = line;
    let j = i + 1;
    while (j < lines.length && /^\s+(where|all|any)\b/i.test(lines[j]) && !lines[j].includes('lint-ignore')) {
      statement += ` ${lines[j].trim()}`;
      j += 1;
    }
    if (!policyScope.test(statement) && !/\bwhere\b/i.test(statement)) continue;
    lintPolicyText(file, i + 1, statement);
  }
}

// ---------------------------------------------------------------------------
// 2. OCI CLI command lint
// ---------------------------------------------------------------------------
const ociBin = process.env.OCI_CLI_BIN || 'oci';

function ociAvailable() {
  if (process.env.OCI_LINT_SKIP_CLI === '1') return false;
  try {
    execFileSync(ociBin, ['--version'], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function extractCommands(file) {
  // Collect code: fenced blocks plus inline `code` spans. Join backslash continuations.
  const text = readFileSync(file, 'utf8');
  const out = [];
  const lines = text.split('\n');
  let inFence = false;
  let buffer = '';
  let startLine = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (line.includes('lint-ignore')) continue;
    const segments = inFence ? [line] : [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
    for (const seg of segments) {
      if (inFence && /\\\s*$/.test(seg)) {
        if (!buffer) startLine = i + 1;
        buffer += `${seg.replace(/\\\s*$/, '')} `;
        continue;
      }
      const full = buffer ? buffer + seg : seg;
      const lineNo = buffer ? startLine : i + 1;
      buffer = '';
      for (const m of full.matchAll(/(?:^|[\s($|;&`"'])oci\s+([a-z][a-z0-9-]*(?:\s+\S+)*)/g)) {
        out.push({ lineNo, cmd: m[1] });
      }
    }
  }
  return out;
}

if (!ociAvailable()) {
  warnings.push(
    process.env.OCI_LINT_SKIP_CLI === '1'
      ? 'OCI_LINT_SKIP_CLI=1; skipping CLI command/flag lint.'
      : `OCI CLI not found (${ociBin}); skipping CLI command/flag lint. Install oci-cli to enable it.`,
  );
} else {
  const version = execFileSync(ociBin, ['--version'], { encoding: 'utf8' }).trim();
  const cacheDir = join(os.tmpdir(), 'agentic-tools-oci-lint');
  mkdirSync(cacheDir, { recursive: true });
  const cacheFile = join(cacheDir, `help-${version}.json`);
  const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf8')) : {};

  function help(path) {
    const key = path.join(' ');
    if (!(key in cache)) {
      let out = '';
      try {
        out = execFileSync(ociBin, [...path, '--help'], {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          env: { ...process.env, PAGER: 'cat', MANPAGER: 'cat' },
        });
      } catch (err) {
        out = String(err.stdout || '') + String(err.stderr || '');
      }
      const commandsSection = out.split(/\n\s*Commands:\s*\n/)[1];
      const subcommands = commandsSection
        ? [...commandsSection.matchAll(/^[ \t]{2,}([a-z][a-z0-9-]*)(?:[ \t]{2,}|[ \t]*$)/gm)].map((m) => m[1])
        : null;
      const options = [...out.matchAll(/(?:^|\s)(--[a-z0-9][a-z0-9-]*)/gm)].map((m) => m[1]);
      cache[key] = { subcommands, options: [...new Set(options)], ok: out.length > 0 };
    }
    return cache[key];
  }

  const globalOptions = new Set(help([]).options);
  const checked = new Map();

  for (const file of files) {
    for (const { lineNo, cmd } of extractCommands(file)) {
      const tokens = cmd.split(/\s+/);
      const path = [];
      let node = help([]);
      let status = 'ok';
      let idx = 0;
      for (; idx < tokens.length; idx += 1) {
        const tok = tokens[idx];
        if (!node.subcommands) break; // reached a leaf command
        if (!/^[a-z][a-z0-9-]*$/.test(tok)) break; // placeholder, option, or punctuation
        if (!node.subcommands.includes(tok)) {
          status = `unknown subcommand "${tok}" under "oci ${path.join(' ')}"`.replace(/\s+"$/, '"');
          break;
        }
        path.push(tok);
        node = help(path);
      }
      const where = `${relative(root, file)}:${lineNo}`;
      if (status !== 'ok') {
        // Only flag when the first token looks like a CLI service group (avoid prose such as "oci config").
        errors.push(`${where}: oci ${cmd.split(/\s+/).slice(0, idx + 1).join(' ')} -> ${status}`);
        continue;
      }
      if (node.subcommands) {
        // Group-level prose mention ("oci kms management") is fine; a group followed by flags is not runnable.
        const next = tokens[idx];
        if (next && /^--[a-z]/.test(next) && next !== '--help') {
          errors.push(`${where}: "oci ${path.join(' ')}" is a command group; a subcommand is missing before ${next.match(/^--[a-z0-9-]+/)[0]}`);
        }
        continue;
      }
      const rest = [];
      for (const t of tokens.slice(idx)) {
        if (/^(\||\|\||&&|;|\)|>|2>)/.test(t)) break; // pipe or shell operator ends this command
        rest.push(t);
      }
      const flags = rest.map((t) => t.match(/^--[a-z0-9][a-z0-9-]*/)?.[0]).filter(Boolean);
      for (const flag of flags) {
        if (!node.options.includes(flag) && !globalOptions.has(flag)) {
          errors.push(`${where}: "oci ${path.join(' ')}" has no ${flag} option`);
        }
      }
      checked.set(path.join(' '), true);
    }
  }
  writeFileSync(cacheFile, JSON.stringify(cache));
  console.log(`Checked ${checked.size} distinct OCI CLI commands against ${version}.`);
}

for (const w of warnings) console.warn(`WARN: ${w}`);
if (errors.length > 0) {
  for (const e of errors) console.error(`✗ ${e}`);
  console.error(`\nOCI content lint failed with ${errors.length} finding(s).`);
  process.exit(1);
}
console.log(`OCI content lint passed across ${files.length} markdown files.`);
