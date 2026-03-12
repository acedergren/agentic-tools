---
name: humanizer
description: "Use when making text sound human, removing AI tells, or fixing writing that sounds like ChatGPT. Detects and rewrites AI patterns: overused phrases (testament to, pivotal, landscape, delve), structural tells (rule of three, em dash overuse, negative parallelisms, copula avoidance), promotional language, and vague attributions. Keywords: AI-generated, humanize, writing style, natural writing, human voice, remove AI patterns, conversational tone."
---

# Humanizer: AI Pattern Detection & Voice Injection

Transform AI-generated text into human writing by detecting patterns and injecting authentic voice.

## NEVER

- Never remove AI phrases without also injecting personality — sterile text is still obviously AI.
- Never over-correct (random punctuation chaos !== human voice).
- Never remove ALL structure from formal or academic contexts — know what the audience expects.
- Never batch-replace AI words without checking domain context ("landscape" in CV papers may be correct terminology).
- Never fix every pattern at once — identify the 3-5 dominant patterns and address those.

## Before You Edit: Diagnostic Framework

Answer these before applying any changes:

**Voice assessment:**
- What personality should come through? (witty, skeptical, conversational, authoritative)
- Does the text have opinions, or just facts? Human writing has stakes.

**Pattern prioritization:**
- Which 3-5 patterns dominate? (Don't fix everything at once)
- Should some AI-isms stay? (Formal technical docs may keep certain structures)

**Rewrite philosophy:**
- Am I removing patterns OR injecting personality? (Must do both)
- Does my rewrite sound like a specific human wrote it? (Not just "less AI")

**Statistical density check (run before editing):**
- AI vocabulary words per 100 words: >3 = heavy AI signature
- Em dashes per paragraph: >2 = structural tell
- "However" paragraph starts: >20% = AI transition overuse
- All paragraphs same length? = AI rhythm uniformity
- Every list has exactly 3 items? = rule of three addiction

## Humanization Level by Context

| Context | Level | Remove | Inject Voice |
|---------|-------|--------|--------------|
| Academic/Research | 10-20% | Delete slop only (delve, testament to) | Minimal — keep structure |
| Technical Docs | 30-50% | Remove promotional language, keep clarity | Light specificity: "handles edge case X" |
| Blog/Marketing | 70-90% | Remove most AI tells | Strong personality, distinct author presence |
| Social/Casual | 100% | Delete all AI patterns | Pure conversational, break all rules |
| Formal Business | 40-60% | Remove obvious slop, keep professionalism | Controlled confidence |

## Most Common AI Patterns

### Content-Level

**Undue emphasis on significance:**
- Words: stands as, serves as, testament to, pivotal, crucial, underscores, broader trends
- Fix: Remove inflated symbolism, state facts directly

**Promotional language:**
- Words: boasts, nestled, vibrant, rich heritage, breathtaking, stunning
- Fix: Replace adjectives with specific details

**Vague attributions:**
- Words: Industry reports, Observers note, Experts argue, Some critics
- Fix: Name specific sources or remove the claim

### Language-Level

**AI vocabulary words** (post-2023 frequency spike):
- delve, crucial, enhance, foster, garner, intricate, landscape (abstract), pivotal, showcase, tapestry (abstract), underscore
- Fix: Use plain synonyms or restructure

**Copula avoidance** (avoiding "is/are"):
- Pattern: "serves as", "stands as", "represents", "boasts", "features"
- Fix: Use simple "is/are/has"

**Negative parallelisms:**
- Pattern: "Not only... but...", "It's not just about X, it's Y"
- Fix: State directly without forced contrast

### Style-Level

**Em dash overuse:**
- Pattern: Multiple em dashes in one paragraph (—)
- Fix: Replace with commas, periods, or parentheses

**Rule of three overuse:**
- Pattern: "innovation, inspiration, and industry insights"
- Fix: Break groups of three, vary list sizes

**Non-obvious AI tells** (beyond the common list):
- Paragraph-starting "However" — appears 3x more in GPT text than human writing
- Passive voice in conclusions — "It can be concluded that..." (AI hedging pattern)
- Symmetric sentence structure — every paragraph follows same length/rhythm
- "Importantly" mid-sentence — statistical quirk of AI output
- Abstract "landscape" metaphors — "the technology landscape", "the business landscape"

## When to Load Full Pattern References

**Load `references/content-patterns.md` when:**
- Text contains 5+ promotional adjectives (stunning, breathtaking, vibrant, rich)
- Significance inflation detected ("serves as testament", "stands as pivotal")
- Do NOT load for casual blog posts or social media text

**Load `references/language-patterns.md` when:**
- Text uses 8+ AI vocabulary words (delve, showcase, intricate, foster, garner)
- Heavy copula avoidance patterns ("serves as" instead of "is")
- Do NOT load for technical documentation where precision matters

**Load `references/style-patterns.md` when:**
- Text has 6+ em dashes in single paragraph
- Rule of three appears 4+ times
- Do NOT load for academic papers (formatting may be required)

## Quick Example

**Before:**
> The new software update serves as a testament to the company's commitment to innovation. Moreover, it provides a seamless, intuitive, and powerful user experience—ensuring that users can accomplish their goals efficiently. It's not just an update, it's a revolution in how we think about productivity.

**After:**
> The software update adds batch processing, keyboard shortcuts, and offline mode. Early beta feedback has been positive—most testers report finishing tasks faster.

Removed: "serves as a testament", "Moreover", "seamless, intuitive, and powerful", "It's not just...it's...". Added: specific features, concrete evidence.

## Arguments

- `$ARGUMENTS`: Text, file path, or rewrite goal to humanize
  - Example: `/humanizer "make this sound less like ChatGPT"`
  - Example: `/humanizer docs/launch-email.md`
  - If empty: ask for the text to rewrite
