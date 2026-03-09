#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.cwd(), 'skills');
const targets = process.argv.slice(2).length
	? process.argv.slice(2)
	: ['quality-commit', 'review-all', 'health-check', 'api-audit'];

let failures = 0;

for (const skill of targets) {
	const file = join(root, skill, 'SKILL.md');
	if (!existsSync(file)) {
		console.error(`✗ ${skill}: missing SKILL.md`);
		failures += 1;
		continue;
	}

	const text = readFileSync(file, 'utf8');
	const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
	const name = frontmatter?.[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
	const description = frontmatter?.[1].match(/^description:\s*([\s\S]*)$/m)?.[1]?.trim() ?? '';

	const checks = [
		['name matches folder', name === skill],
		['trigger-oriented description', /Use when|Triggers when|Triggers on|when user mentions/i.test(description)],
		['quoted trigger phrases', /"[^"]+"/.test(description)],
		['has anti-patterns', /\bNEVER\b|Anti-Patterns/i.test(text)],
		['has load boundaries', /Do NOT load this skill when|When to Use|Load this skill when/i.test(text)],
		['has arguments section', /^## Arguments/m.test(text)],
	];

	const failed = checks.filter(([, ok]) => !ok);
	if (failed.length === 0) {
		console.log(`✓ ${skill}: Skill 2.0 baseline passes`);
		continue;
	}

	console.error(`✗ ${skill}:`);
	for (const [label] of failed) {
		console.error(`  - missing ${label}`);
	}
	failures += 1;
}

if (failures > 0) {
	process.exit(1);
}
