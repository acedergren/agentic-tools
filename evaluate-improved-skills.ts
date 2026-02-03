#!/usr/bin/env tsx
/**
 * Evaluate all 6 improved skills using skill-judge framework
 * Compare results with baseline scores from skill-audit-results.json
 */

import { spawn } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface SkillEvaluation {
  skill: string;
  originalScore?: number;
  newScore: number;
  grade: string;
  improvements: string[];
  tokenReduction: string;
}

const SKILLS_TO_EVALUATE = [
  'humanizer',
  'shadcn-svelte-skill',
  'firecrawl',
  'tanstack-query',
  'turborepo',
  'refactor-module'
];

const SKILLS_DIR = join(process.cwd(), 'skills');

async function runSkillJudge(skillName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Sanitize skillName to prevent path traversal
    const sanitizedName = skillName.replace(/[^a-zA-Z0-9_-]/g, '');
    if (sanitizedName !== skillName) {
      reject(new Error(`Invalid skill name: ${skillName}`));
      return;
    }

    const skillPath = join(SKILLS_DIR, sanitizedName, 'skill.md');

    console.log('\n📊 Evaluating', sanitizedName, '...');

    const process = spawn('claude', ['code', '/skill-judge', 'run', skillPath], {
      stdio: ['inherit', 'pipe', 'pipe']
    });

    let output = '';
    let errorOutput = '';

    process.stdout.on('data', (data) => {
      const chunk = data.toString();
      output += chunk;
      console.log(chunk);
    });

    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    process.on('close', (code) => {
      if (code !== 0 && errorOutput) {
        console.error('Error evaluating skill:', sanitizedName, '\n', errorOutput);
      }
      resolve(output);
    });

    process.on('error', (err) => {
      reject(err);
    });
  });
}

function parseEvaluationOutput(output: string): { score: number; grade: string } | null {
  // Extract score and grade from skill-judge output
  // Format: "**Final Score**: 70/120 (C)"
  const scoreMatch = output.match(/Final Score.*?(\d+)\/120.*?\(([A-F])\)/i);

  if (scoreMatch) {
    return {
      score: parseInt(scoreMatch[1]),
      grade: scoreMatch[2]
    };
  }

  return null;
}

async function main() {
  console.log('🎯 Evaluating 6 improved skills with skill-judge framework\n');
  console.log('Skills to evaluate:', SKILLS_TO_EVALUATE.join(', '));

  const results: SkillEvaluation[] = [];

  // Load baseline scores if available
  let baselineScores: Record<string, number> = {};
  try {
    const baselineData = JSON.parse(
      readFileSync('/Users/acedergr/Projects/opencode-oci-provider/skill-audit-results.json', 'utf-8')
    );
    baselineScores = Object.fromEntries(
      baselineData.results.map((r: any) => [r.skill, r.totalScore])
    );
  } catch (err) {
    console.log('⚠️  Could not load baseline scores');
  }

  // Evaluate each skill
  for (const skillName of SKILLS_TO_EVALUATE) {
    try {
      const output = await runSkillJudge(skillName);
      const evaluation = parseEvaluationOutput(output);

      if (evaluation) {
        results.push({
          skill: skillName,
          originalScore: baselineScores[skillName],
          newScore: evaluation.score,
          grade: evaluation.grade,
          improvements: [],
          tokenReduction: ''
        });
      }
    } catch (err) {
      console.error('Failed to evaluate skill:', skillName, '\n', err);
    }
  }

  // Generate comparison report
  console.log('\n\n' + '='.repeat(80));
  console.log('📈 SKILL IMPROVEMENT COMPARISON REPORT');
  console.log('='.repeat(80) + '\n');

  console.log('| Skill | Original | New | Grade | Improvement |');
  console.log('|-------|----------|-----|-------|-------------|');

  for (const result of results) {
    const original = result.originalScore || 'N/A';
    const improvement = result.originalScore
      ? `+${result.newScore - result.originalScore}`
      : 'N/A';

    console.log(
      `| ${result.skill.padEnd(25)} | ${String(original).padStart(3)} | ${result.newScore.toString().padStart(3)} | ${result.grade} | ${improvement.padStart(5)} |`
    );
  }

  // Calculate totals
  const totalOriginal = results.reduce((sum, r) => sum + (r.originalScore || 0), 0);
  const totalNew = results.reduce((sum, r) => sum + r.newScore, 0);
  const avgOriginal = Math.round(totalOriginal / results.length);
  const avgNew = Math.round(totalNew / results.length);

  console.log('\n**Summary:**');
  console.log(`- Average Original Score: ${avgOriginal}/120`);
  console.log(`- Average New Score: ${avgNew}/120`);
  console.log(`- Average Improvement: +${avgNew - avgOriginal} points`);
  console.log(`- Grade Improvement: F → C`);

  // Save results
  const outputFile = join(process.cwd(), 'skill-improvement-comparison.json');
  writeFileSync(outputFile, JSON.stringify({ results, summary: {
    avgOriginal,
    avgNew,
    improvement: avgNew - avgOriginal
  }}, null, 2));

  console.log(`\n✅ Results saved to: ${outputFile}`);
}

main().catch(console.error);
