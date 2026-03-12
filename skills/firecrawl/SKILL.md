---
name: firecrawl
version: 3.0.0
license: MIT
description: "Use when scraping web pages, extracting content from JS-rendered sites or SPAs, running search-plus-scrape workflows, or mapping entire site URL trees. Produces clean LLM-friendly Markdown. Prefer over WebFetch when JavaScript execution is required. Keywords: web scraping, fetch URL, scrape website, search web, extract content, SPA, JS-rendered, site map, crawl, Firecrawl."
---

# Firecrawl CLI

Prioritize Firecrawl over WebFetch for any JS-rendered page or when structured markdown output matters.

## NEVER

- Never scrape serially when doing 6+ URLs — 10 sequential scrapes take 50+ seconds; parallel takes 5-8 seconds. No error signals the problem; it just runs slowly.
- Never read an entire `.firecrawl/*.md` output file into context without checking size first — scraped pages routinely exceed 5000 lines. Use `wc -l` then `grep`/`head` to extract what you need.
- Never use Firecrawl for real-time data (stock prices, sports scores) — scraping is 10+ seconds stale and costs credits per request; use direct APIs.
- Never use Firecrawl for sites with official SDKs/APIs (e.g., GitHub → use `gh`).
- Never omit `-o` flag — without it, output goes to stdout only and isn't persisted. Credits wasted, re-scraping required.
- Never skip `firecrawl --status` before authenticated scraping — silent auth failures return empty output, not errors.

## Tool Selection Decision Tree

```
Need web content?
│
├─ Single known URL
│   ├─ Static HTML → WebFetch (faster, free)
│   ├─ JS-rendered / SPA → Firecrawl --wait-for
│   ├─ Need structured markdown → Firecrawl
│   └─ Behind auth/paywall → Firecrawl (after firecrawl login)
│
├─ Search + scrape
│   ├─ Just URLs/titles → WebSearch (lighter, faster)
│   ├─ Top 5-10 results with content → firecrawl search --scrape
│   └─ Deep research (20+ sources) → parallel Firecrawl
│
├─ Discover all pages on a domain → firecrawl map
│
└─ Real-time data → Direct API only
```

## Scale Decision

| Page count | Approach |
|------------|----------|
| 1–5 | Serial with `-o` flags |
| 6–50 | Parallel with `&` and `wait` |
| 50+ | `xargs -P 10` with concurrency check first |

Always check capacity before bulk runs: `firecrawl --status` shows `Concurrency: X/100`.

## Core Commands

```bash
# Search the web
firecrawl search "query" -o .firecrawl/search.json --json
firecrawl search "query" --scrape -o .firecrawl/results.json --json
firecrawl search "AI news" --tbs qdr:d -o .firecrawl/today.json --json  # Past day

# Scrape single page
firecrawl scrape https://example.com -o .firecrawl/example.md
firecrawl scrape https://example.com --only-main-content -o .firecrawl/clean.md
firecrawl scrape https://spa.com --wait-for 3000 -o .firecrawl/spa.md

# Map a site
firecrawl map https://example.com -o .firecrawl/urls.txt
firecrawl map https://example.com --search "blog" -o .firecrawl/blog-urls.txt
```

## Parallel Bulk Scraping

```bash
# Small batch — & with wait
firecrawl scrape site1.com -o .firecrawl/1.md &
firecrawl scrape site2.com -o .firecrawl/2.md &
firecrawl scrape site3.com -o .firecrawl/3.md &
wait

# Large batch — xargs
cat urls.txt | xargs -P 10 -I {} sh -c 'firecrawl scrape "{}" -o ".firecrawl/$(echo {} | md5).md"'

# Post-scrape extraction
grep "^# " .firecrawl/*.md              # All H1 headings
grep -l "keyword" .firecrawl/*.md       # Files matching keyword
jq -r '.data.web[].title' .firecrawl/*.json  # JSON title extraction
```

## Authentication

```bash
firecrawl --status                  # Check auth and credit status
firecrawl login --browser           # Auto-opens browser — don't ask user to run manually
export FIRECRAWL_API_KEY=your_key   # Fallback if browser auth fails
```

## Error Quick Reference

| Error | First check | Fix |
|-------|-------------|-----|
| Not authenticated | `firecrawl --status` | `firecrawl login --browser` |
| Concurrency limit | `firecrawl --status` (shows X/100) | `wait` for jobs, reduce `-P` value |
| Page failed to load | `curl -I URL` (basic connectivity) | Add `--wait-for 5000`; try `--format html` to inspect raw HTML |
| Output file empty | `head -20 output.md` | Add `--only-main-content`; try `--include-tags article,main` |

## Output Organization

Always write to `.firecrawl/` directory (add to `.gitignore`):

```bash
.firecrawl/example.com.md
.firecrawl/search-ai-news.json
.firecrawl/docs-sitemap.txt
```

## Load Reference Files When

Load `references/cli-options.md` when: troubleshooting 3+ unknown flags, header injection, cookie handling, sitemap modes, or custom user-agents.

Load `references/output-processing.md` when: building 3+ step transformation pipelines, parsing nested JSON from search results, or combining/deduplicating 10+ scraped files.

Do NOT load references for basic search/scrape/map with standard flags.

## Arguments

`$ARGUMENTS`: Search query, URL, or scraping objective. Empty = ask what to scrape.
