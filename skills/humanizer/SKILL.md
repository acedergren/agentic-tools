---
name: humanizer
version: 3.0.0
description: |
  Detect and fix AI writing patterns including overused phrases (testament to, pivotal,
  landscape, delve), structural tells (rule of three, em dash overuse, negative parallelisms,
  copula avoidance), promotional language, and vague attributions. Use when user asks to
  "make text sound human", "remove AI tells", "humanize writing", mentions patterns like
  "too many dashes" or "sounds like ChatGPT", or requests natural/conversational tone.

  Triggers: AI-generated, humanize, writing style, natural writing, human voice, ChatGPT
  sound, remove AI patterns, conversational tone, writing voice.

  Credits: Based on Wikipedia's Signs of AI writing guide by @blader
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Humanizer: AI Pattern Detection & Voice Injection

Transform AI-generated text into human writing by detecting patterns and injecting authentic voice.

---

## Before You Edit: Diagnostic Framework

**Ask yourself these 3 questions BEFORE applying any patterns:**

### 1. Voice Assessment
- **Does this text have a distinct voice?** Or is it neutral/corporate?
- **What personality should come through?** (witty, skeptical, conversational, authoritative)
- **Are there opinions, or just facts?** Human writing has stakes and perspective.

### 2. Pattern Prioritization
- **Which 3-5 patterns dominate this text?** (Don't fix everything at once)
- **What's the writer's intent?** (persuasive → keep some structure; casual → break all patterns)
- **Should some "AI-isms" stay?** (Formal technical docs may keep certain structures)

### 3. Rewrite Philosophy
- **Am I removing patterns OR injecting personality?** (Must do both)
- **Does my rewrite sound like a specific human wrote it?** (Not just "less AI")
- **Have I varied sentence rhythm?** (Short. Longer flowing sentences. Mix it up.)

**The Core Principle**: Sterile, voiceless writing is just as obvious as slop. Don't just remove bad patterns—add soul.

---

## Critical Anti-Patterns (NEVER Do This)

### ❌ Pattern #1: Mechanical Pattern Removal
**Problem**: Just deleting AI phrases without adding human voice produces sterile text.

```markdown
❌ BAD EDIT:
"The framework serves as a testament to modern development practices."
→ "The framework is modern."

✅ GOOD EDIT:
"The framework serves as a testament to modern development practices."
→ "This framework gets it right. Clean APIs, sensible defaults, actual documentation."
```

**Why this matters**: Removing "testament to" makes it grammatically correct but soulless. The good edit has opinion, rhythm, and personality.

### ❌ Pattern #2: Over-Correction
**Problem**: Making every sentence "unpredictable" creates chaos, not humanity.

```markdown
❌ BAD EDIT (too chaotic):
"Results. Interesting ones! The experiment? It generated code—lots of it.
3 million lines worth. Developers (some of them) were impressed!!!!"

✅ GOOD EDIT (controlled variety):
"I genuinely don't know how to feel about this. 3 million lines of code,
generated overnight. Half the dev community is losing their minds,
half are explaining why it doesn't count."
```

**Why this matters**: Human writing has rhythm variation, not random punctuation chaos.

### ❌ Pattern #3: Removing ALL Structure
**Problem**: Not all AI patterns are bad—some formal writing needs structure.

```markdown
Context: Academic paper abstract

❌ BAD EDIT:
"Our study looked at machine learning. We found some stuff.
It's interesting. Check out our results."

✅ GOOD EDIT:
"This study examines machine learning approaches to code generation.
We evaluated three architectures and found that transformer-based
models outperformed RNNs by 23% on our benchmark."
```

**Why this matters**: Formal contexts need clarity over personality. Know your audience.

---

## Most Common AI Patterns (Quick Reference)

### Content-Level Patterns

**Undue Emphasis on Significance**
- Words: stands as, serves as, testament to, pivotal, crucial, underscores, broader trends
- Fix: Remove inflated symbolism, state facts directly

**Promotional Language**
- Words: boasts, nestled, vibrant, rich heritage, breathtaking, stunning
- Fix: Replace adjectives with specific details

**Vague Attributions**
- Words: Industry reports, Observers note, Experts argue, Some critics
- Fix: Name specific sources or remove the claim

### Language-Level Patterns

**AI Vocabulary Words** (post-2023 frequency spike)
- Words: delve, crucial, enhance, foster, garner, intricate, landscape (abstract), pivotal, showcase, tapestry (abstract), underscore
- Fix: Use plain synonyms or restructure

**Copula Avoidance** (avoiding "is/are")
- Pattern: "serves as", "stands as", "represents", "boasts", "features"
- Fix: Use simple "is/are/has"

**Negative Parallelisms**
- Pattern: "Not only... but...", "It's not just about X, it's Y"
- Fix: State directly without forced contrast

### Style-Level Patterns

**Em Dash Overuse**
- Pattern: Multiple em dashes in one paragraph (—)
- Fix: Replace with commas, periods, or parentheses

**Rule of Three Overuse**
- Pattern: "innovation, inspiration, and industry insights"
- Fix: Break groups of three, vary list sizes

**Title Case Headings**
- Pattern: "Strategic Negotiations And Global Partnerships"
- Fix: Sentence case: "Strategic negotiations and global partnerships"

---

## Adding Human Voice: The Secret Ingredient

Removing AI patterns is **half the job**. Injecting personality is the other half.

### Voice Injection Techniques

**1. Have Opinions**
```markdown
Neutral: "This approach has pros and cons."
Human: "This is clever, but I'm not convinced it scales."
```

**2. Vary Rhythm**
```markdown
Monotonous: "The system works well. It has good performance. Users like it."
Human: "The system works. Fast, reliable, users actually like it—rare these days."
```

**3. Acknowledge Complexity**
```markdown
Oversimplified: "AI is impressive."
Human: "AI is impressive, but also kind of unsettling when you watch it work at 3am."
```

**4. Use First Person (When Appropriate)**
```markdown
Distant: "One might conclude that the results are mixed."
Human: "I keep coming back to this—the results don't tell a simple story."
```

**5. Be Specific About Feelings**
```markdown
Generic: "This is concerning."
Human: "There's something deeply unsettling about agents churning away while nobody's watching."
```

---

## When to Load Full Pattern References

**For detailed pattern catalogs, load:**

**LOAD `references/content-patterns.md` when:**
- Text is promotional or emphasizes significance/legacy heavily
- Need examples of "symbolism inflation" fixes

**LOAD `references/language-patterns.md` when:**
- Text uses AI vocabulary words extensively (delve, showcase, intricate)
- Need copula avoidance and elegant variation fixes

**LOAD `references/style-patterns.md` when:**
- Text has formatting issues (em dashes, bold overuse, title case)
- Need structural pattern fixes

**Do NOT load references** for simple voice injection or opinion addition—handle that with the framework above.

---

## Process

1. **Read input text** - Identify 3-5 dominant patterns
2. **Apply diagnostic framework** - Answer the 3 questions above
3. **Make strategic edits** - Fix patterns + inject voice simultaneously
4. **Verify rhythm** - Read aloud test (does it sound natural?)
5. **Present result** - Show rewritten text with brief summary if helpful

---

## Quick Example

**Before (AI-sounding):**
> The new software update serves as a testament to the company's commitment to innovation. Moreover, it provides a seamless, intuitive, and powerful user experience—ensuring that users can accomplish their goals efficiently. It's not just an update, it's a revolution in how we think about productivity.

**After (Humanized):**
> The software update adds batch processing, keyboard shortcuts, and offline mode. Early beta feedback has been positive—most testers report finishing tasks faster.

**What changed:**
- Removed inflated symbolism ("serves as a testament")
- Removed AI vocabulary ("Moreover", "seamless, intuitive, powerful")
- Removed negative parallelism ("It's not just...it's...")
- Removed vague claims ("commitment to innovation")
- Added specific features (batch processing, shortcuts, offline)
- Added concrete evidence (beta feedback, faster completion)
- Kept neutral tone appropriate for feature announcement

---

## Reference Materials

Based on [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup.

**Key insight**: "LLMs use statistical algorithms to guess what should come next. The result tends toward the most statistically likely result that applies to the widest variety of cases."

Translation: AI writing is optimized for average acceptability, not authentic voice.
