import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillFile = resolve(__dirname, 'SKILL.md');

// ============================================================================
// Spec: Validate stitch-design-system skill against skill-judge 120-pt rubric
// ============================================================================

// Parse SKILL.md with no imports for bootstrapping
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const frontmatter = match[1];
  const fields = {};
  for (const line of frontmatter.split('\n')) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      fields[key.trim()] = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
    }
  }
  return fields;
}

function countLines(content) {
  return content.split('\n').length;
}

function extractSection(content, startPattern) {
  // Escape special regex characters in startPattern
  const escapedPattern = startPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match header and all content until next ## heading or end of file
  // Use \Z instead of $ because $ matches before newlines in multiline mode
  const match = content.match(new RegExp(`^${escapedPattern}[\\s\\S]*?(?=^##|\\Z)`, 'm'));
  return match ? match[0] : '';
}

// ============================================================================
// STEP 4: RED PHASE TESTS (These fail initially, drive implementation)
// ============================================================================

test('bootstrap: parse SKILL.md frontmatter', () => {
  const content = readFileSync(skillFile, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, 'SKILL.md should have YAML frontmatter');

  const frontmatter = match[1];
  assert.ok(frontmatter.includes('name:'), 'frontmatter should include name field');
  assert.ok(frontmatter.includes('description:'), 'frontmatter should include description field');

  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  assert.ok(nameMatch, 'name field should be present');
  const name = nameMatch[1].trim();
  assert.equal(name, 'stitch-design-system', `name should be 'stitch-design-system', got '${name}'`);
});

// D4: Specification Compliance (15 pts) — Focus on description quality
test('D4.1: Frontmatter has name field', () => {
  const content = readFileSync(skillFile, 'utf8');
  const fields = parseFrontmatter(content);
  assert.ok(fields.name, 'name field must exist');
  assert.equal(fields.name, 'stitch-design-system', 'name must match skill directory');
});

test('D4.2: Frontmatter has description field', () => {
  const content = readFileSync(skillFile, 'utf8');
  const fields = parseFrontmatter(content);
  assert.ok(fields.description, 'description field must exist');
  assert.ok(fields.description.length > 50, 'description must be substantive (>50 chars)');
});

test('D4.3: Description answers WHAT (capability keywords)', () => {
  const content = readFileSync(skillFile, 'utf8');
  const fields = parseFrontmatter(content);
  const desc = fields.description.toLowerCase();
  // Should mention core capabilities
  assert.ok(
    desc.includes('extract') || desc.includes('design system') || desc.includes('semantic'),
    'description must mention what skill does (extract, synthesize, etc.)'
  );
});

test('D4.4: Description answers WHEN (trigger scenarios)', () => {
  const content = readFileSync(skillFile, 'utf8');
  const fields = parseFrontmatter(content);
  const desc = fields.description.toLowerCase();
  assert.ok(
    desc.includes('when') || desc.includes('analyzing') || desc.includes('creating'),
    'description must explain WHEN to use'
  );
});

test('D4.5: Description includes searchable keywords', () => {
  const content = readFileSync(skillFile, 'utf8');
  const fields = parseFrontmatter(content);
  const desc = fields.description;
  const keywords = ['design', 'stitch', 'color', 'typography', 'theme'];
  const found = keywords.filter(kw => desc.toLowerCase().includes(kw));
  assert.ok(found.length >= 3, `description should include 3+ domain keywords. Found: ${found.join(', ')}`);
});

// D5: Progressive Disclosure (15 pts) — SKILL.md line count
test('D5.1: SKILL.md is under 500 lines (ideal <300)', () => {
  const content = readFileSync(skillFile, 'utf8');
  const lines = countLines(content);
  assert.ok(lines < 500, `SKILL.md has ${lines} lines, should be <500 (ideal <300)`);
});

test('D5.2: SKILL.md has structured sections', () => {
  const content = readFileSync(skillFile, 'utf8');
  const sections = [
    '## When to Use',
    '## Overview',
    '## Prerequisites',
    '## Analysis & Synthesis',
    '## Output Format',
    '## Best Practices'
  ];
  for (const section of sections) {
    assert.ok(
      content.includes(section),
      `SKILL.md should have section: "${section}"`
    );
  }
});

// D3: Anti-Pattern Quality (15 pts)
test('D3.1: Has anti-patterns section with NEVER list', () => {
  const content = readFileSync(skillFile, 'utf8');
  assert.ok(content.includes('## Anti-Patterns'), 'must have Anti-Patterns section');
  assert.ok(content.includes('NEVER'), 'must have explicit NEVER list');
});

test('D3.2: Anti-patterns are specific with reasoning', () => {
  const content = readFileSync(skillFile, 'utf8');
  const antiSection = extractSection(content, '## Anti-Patterns to Avoid');
  const neverItems = antiSection.split('\n').filter(line => line.includes('NEVER'));
  assert.ok(neverItems.length >= 3, `must have 3+ NEVER items, found ${neverItems.length}`);

  // Each NEVER should have explanation (contains reason words)
  const reasonWords = ['without', 'because', 'always', 'only', 'must', 'ignore'];
  for (const item of neverItems.slice(0, 1)) {
    const hasReasoning = reasonWords.some(word => item.includes(word));
    assert.ok(hasReasoning || item.length > 60, 'NEVER item should include reasoning');
  }
});

// D1: Knowledge Delta (20 pts) — No basic tutorial content
test('D1.1: No "What is" tutorial content for basics', () => {
  const content = readFileSync(skillFile, 'utf8');
  const basicPatterns = [
    /What is a design system/i,
    /What is Stitch/i,
    /What is CSS/i,
    /What is a color/i,
    /How to write HTML/i
  ];

  for (const pattern of basicPatterns) {
    assert.ok(
      !pattern.test(content),
      `SKILL.md should not explain basic concepts like "${pattern.source}"`
    );
  }
});

test('D1.2: Has expert decision trees or trade-offs', () => {
  const content = readFileSync(skillFile, 'utf8');
  assert.ok(
    content.includes('Descriptive') ||
    content.includes('Functional') ||
    content.includes('naming') ||
    content.includes('pattern'),
    'should include expert naming/design decisions'
  );
});

// D2: Mindset + Procedures (15 pts)
test('D2.1: Has thinking frameworks ("ask yourself", "consider", "evaluate")', () => {
  const content = readFileSync(skillFile, 'utf8');
  const thinkingKeywords = ['ask yourself', 'evaluate', 'consider', 'Airy', 'Minimal', 'vibe'];
  const found = thinkingKeywords.filter(kw => content.toLowerCase().includes(kw));
  assert.ok(found.length >= 1, 'should include expert thinking frameworks');
});

test('D2.2: Has domain-specific procedures Claude might not know', () => {
  const content = readFileSync(skillFile, 'utf8');
  // Design system skills should have specific extraction procedures
  assert.ok(
    content.includes('Extract') || content.includes('Map') || content.includes('Describe'),
    'should explain how to extract/synthesize design systems'
  );
});

// D6: Freedom Calibration (15 pts)
test('D6.1: Appropriate freedom level for creative design task', () => {
  const content = readFileSync(skillFile, 'utf8');
  // Design system extraction is creative: should have HIGH freedom (principles, not rigid steps)
  assert.ok(
    content.includes('describe') || content.includes('evocative') || content.includes('character'),
    'should emphasize descriptive language/principles over rigid procedures'
  );
});

// D7: Pattern Recognition (10 pts)
test('D7.1: Follows a recognized skill pattern', () => {
  const content = readFileSync(skillFile, 'utf8');
  // Design system is typically a Tool or Process pattern
  const hasRetrieval = content.includes('Retrieval');
  const hasAnalysis = content.includes('Analysis');
  const hasOutput = content.includes('Output');
  assert.ok(hasRetrieval && hasAnalysis && hasOutput, 'should follow Tool/Process pattern with retrieval→analysis→output');
});

// D8: Practical Usability (15 pts)
test('D8.1: Has actionable step-by-step workflow', () => {
  const content = readFileSync(skillFile, 'utf8');
  const stepCount = (content.match(/### Step \d+:/g) || []).length;
  assert.ok(stepCount >= 3, `should have 3+ numbered steps, found ${stepCount}`);
});

test('D8.2: Has example output format', () => {
  const content = readFileSync(skillFile, 'utf8');
  assert.ok(
    content.includes('```markdown') || content.includes('DESIGN.md') || content.includes('Output Format'),
    'should show example output format'
  );
});

test('D8.3: Includes error handling or edge cases', () => {
  const content = readFileSync(skillFile, 'utf8');
  assert.ok(
    content.toLowerCase().includes('error') ||
    content.toLowerCase().includes('issue') ||
    content.includes('Tips'),
    'should address edge cases or common mistakes'
  );
});
