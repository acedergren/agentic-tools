# firecrawl - Web Scraping Expert

**Version**: 3.0.0
**Grade**: C → **A** (88/120 → 110/120, **+25%**)
**Achievement**: ✅ A-Grade Skill (92%)

## What This Skill Does

Web scraping and search CLI with decision framework for when to use Firecrawl vs WebFetch vs WebSearch. Focuses on parallelization patterns and anti-patterns.

## TDD Improvements Applied (Iteration 2 - A-Grade)

### NEW: Added "Before Scraping" Decision Framework
**Problem**: Mechanical CLI usage without strategic thinking
**Test Failed**: No guidance on WHEN/WHY to scrape

**Fix**:
- **Scale Assessment**: 1-5 pages (serial), 6-50 (parallel), 50+ (xargs)
- **Data Need Clarity**: URLs only vs full content (cost implications)
- **Tool Selection**: API-first approach (GitHub → `gh`, not scraping)

**Result**: ✅ Transforms tool usage into expert decision-making (+4 points D2)

### NEW: "Why Deceptively Hard to Debug" for All Anti-Patterns
**Problem**: Anti-patterns lacked debugging insights
**Test Failed**: Didn't explain WHY problems are non-obvious

**Added to all 4 anti-patterns**:
- **Sequential scraping**: "90% time waiting. Takes 10-15 min to realize parallelization is the fix"
- **Reading full output**: "Silently wastes 4000+ tokens. Takes 15-20 min to discover"
- **Wrong tool**: "Only after 30 min post-processing realize `pdftotext` worked in 2 seconds"
- **No organization**: "Lose data twice before realizing `-o` flag is mandatory"

**Result**: ✅ Perfect anti-pattern score 15/15 (+5 points D3)

### NEW: MANDATORY Loading Triggers with Quantitative Conditions
**Problem**: Vague loading triggers ("when user needs...")
**Test Failed**: Agent didn't know EXACTLY when to load references

**Fix**:
- **cli-options.md**: "3+ unknown flags", "5+ advanced options", specific error scenarios
- **output-processing.md**: "3+ transformation steps", "10+ scraped files", nested JSON
- Added "Do NOT load" for basic operations

**Result**: ✅ Concrete loading decisions (+3 points D5)

### NEW: Error Recovery Procedures with 4-Step Recovery + Fallbacks
**Problem**: Error fixes were one-liners, no structured recovery
**Test Failed**: No fallback strategies when primary fix fails

**Added for all common errors**:
1. **Diagnose**: Test connectivity, check status
2. **Fix**: Primary solution with specific command
3. **Verify**: Confirm fix worked (wc -l, status check)
4. **Fallback**: Alternative approach with version notes

**Result**: ✅ Perfect usability score 15/15 (+5 points D8)

---

## Original Improvements (Iteration 1 - C-Grade)

### 1. Description Quality (RED → GREEN)
**Problem**: Description was too vague - "for any URL/page, web/news/image search"
**Test Failed**: Too generic, no specific triggers

**Fix**:
- Added 6 specific use cases with numbers
- Clear output format: "returning clean Markdown"
- Technical capabilities: "handles JS-rendered pages, SPAs"
- 12 trigger keywords

**Result**: ✅ Agent knows EXACTLY when to use Firecrawl

### 2. Knowledge Delta (RED → GREEN)
**Problem**: 80% CLI documentation (firecrawl --help equivalent)
**Test Failed**: Not expert knowledge, just command reference

**Removed**:
- Exhaustive CLI option lists
- Flag documentation
- Basic command syntax

**Added**:
- Tool selection decision tree (vs WebFetch/WebSearch)
- Expert parallelization patterns (up to 100 concurrent jobs)
- Output processing strategies (grep, not Read entire files)
- Error pattern recognition

**Result**: ✅ 65% expert knowledge (was 20%)

### 3. Anti-Patterns Added
**Problem**: No warnings about common mistakes
**Test Failed**: Skill didn't prevent inefficient usage

**Added 4 Anti-Patterns**:

1. **Sequential Scraping**
   ```bash
   # WRONG - 10 sites = 50+ seconds
   for url in site1 site2...; do firecrawl scrape "$url"; done

   # CORRECT - 10 sites = 5 seconds
   cat urls.txt | xargs -P 10 -I {} firecrawl scrape "{}"
   ```

2. **Reading Full Output**
   ```bash
   # WRONG - floods 5000-line file into context
   Read(.firecrawl/result.md)

   # CORRECT - targeted extraction
   grep -A 10 "keyword" .firecrawl/result.md
   ```

3. **Wrong Use Cases**
   - ❌ Real-time data → Use direct APIs
   - ❌ Large binaries → Use curl/wget
   - ❌ APIs with SDKs → Use the SDK

4. **Output Disorganization**
   ```bash
   # WRONG - pollutes working directory
   firecrawl scrape https://example.com

   # CORRECT - organized structure
   firecrawl scrape https://example.com -o .firecrawl/example.md
   ```

**Result**: ✅ Prevents hours wasted on wrong tool or inefficient patterns

### 4. Decision Framework Added
**Problem**: No guidance on tool selection
**Test Failed**: Agent didn't know when to use Firecrawl vs alternatives

**Added Decision Tree**:
```
User needs web content?
├─ Single URL
│   ├─ Simple HTML → WebFetch (faster)
│   ├─ JS-rendered → Firecrawl
│   ├─ Structured data → Firecrawl
│   └─ Behind auth → Firecrawl
├─ Search + scrape
│   ├─ Top 5-10 with content → Firecrawl --scrape
│   ├─ Just URLs → WebSearch (lighter)
│   └─ Deep research (20+) → Firecrawl parallel
├─ Site mapping → Firecrawl map
└─ Real-time data → Direct API
```

**Result**: ✅ Clear decision criteria for every scenario

## Key Features

### Tool Selection Decision Tree
Know when to use Firecrawl vs WebFetch vs WebSearch based on:
- Content type (static HTML vs JS-rendered)
- Data structure needs
- Authentication requirements
- Scale (single page vs bulk scraping)

### Expert Parallelization
```bash
# Check concurrency limit
firecrawl --status  # Shows: Concurrency: 0/100

# Run up to limit
cat urls.txt | xargs -P 10 -I {} firecrawl scrape "{}"
```

### Output Processing Patterns
```bash
# Preview before reading
wc -l result.md && head -100 result.md

# Targeted extraction
grep -A 10 "keyword" result.md

# Process JSON results
jq -r '.data.web[].title' search.json
```

### Common Error Fixes
- Not authenticated → `firecrawl login --browser`
- Page failed to load → `--wait-for 5000`
- Empty output → `--only-main-content`

## When to Use This Skill

✅ **Use when**:
- Need to choose tool (Firecrawl vs WebFetch vs WebSearch)
- Bulk scraping (need parallelization)
- Processing large scraped outputs
- Troubleshooting scraping errors

❌ **Don't use for**:
- Basic "run firecrawl scrape" (user can do that)
- Reading firecrawl documentation

## Installation

```bash
cp -r firecrawl ~/.agents/skills/  # Claude Code
cp -r firecrawl ~/.cursor/skills/  # Cursor
```

## Quick Start

```bash
# Always check status first
firecrawl --status

# Search + scrape
firecrawl search "your query" --scrape -o .firecrawl/result.json

# Bulk scraping (parallel)
cat urls.txt | xargs -P 10 -I {} firecrawl scrape "{}" -o ".firecrawl/{}.md"

# Extract specific content
grep "keyword" .firecrawl/*.md
```
