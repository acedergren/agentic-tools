---
name: write-natural-swedish
description: "Use when drafting, translating, polishing, or reviewing Swedish text so it sounds natural, fluent, contemporary, and appropriate for its audience. Triggers include \"write better Swedish\", \"make this sound natural in Swedish\", \"translate into Swedish\", \"polish this Swedish\", \"tech company Swedish\", \"contemporary Swedish words\", \"Swedish developer docs\", and \"avoid Anglicisms\"."
---

# Write Natural Swedish

Improve Swedish writing so it reads like confident, idiomatic Sweden Swedish rather than translated English or generic machine prose.

## Arguments

- `text`: Swedish or source-language text to polish, translate, rewrite, or review.
- `audience`: Reader group, for example customers, developers, internal product team, public-sector readers, executives, or language learners.
- `mode`: `polish`, `rewrite`, `translate`, `explain`, or `check`.
- `preset`: `contemporary`, `tech-company`, `developer-docs`, `product-marketing`, `startup-internal`, `klarsprak`, or `learner-friendly`.
- `register`: informal, neutral, professional, formal, academic, product, support, or public-sector.

## When to Use

Load this skill when the user asks for Swedish-language writing quality, Swedish translation, Swedish grammar, Swedish tone, Swedish tech-company copy, Swedish developer documentation, contemporary Swedish vocabulary, klarsprak, or help avoiding English-shaped Swedish.

Do NOT load this skill when the task is only about English writing, code implementation, non-Swedish localization, or language facts that do not require producing or judging Swedish prose.

## Workflow

1. Establish audience, purpose, medium, register, and preset from the prompt. If missing and the stakes are high, ask one concise question; otherwise assume standard Sweden Swedish and neutral professional tone.
2. Preserve meaning and factual claims. Improve phrasing without adding commitments, legal precision, politeness, sales intensity, or certainty the source did not contain.
3. Rewrite for Swedish structure: V2 word order, subordinate-clause word order, information flow, active verbs, definiteness, compounds, idiomatic particles/prepositions, and rhythm.
4. Apply the selected preset. If no preset is named, infer the lightest useful one from the text.
5. Verify uncertainty with `references/resource-map.md` when exact spelling, inflection, specialist terminology, current usage, or source attribution matters.
6. Return the polished Swedish first. Add brief notes only when the user asks, when teaching is useful, or when a non-obvious register or terminology choice matters.
7. If the user provides concrete text, perform the requested revision directly; do not respond with only an acknowledgement.

## Presets

### Contemporary

Use current, idiomatic Sweden Swedish without forcing trend words. Prefer established modern words. Use new terms only when they genuinely fit the audience and context.

### Tech Company

Write like a credible Swedish technology company: clear, product-aware, concrete, modest, and useful. Avoid Silicon Valley hype, literal English phrasing, and stiff bureaucratic Swedish.

### Developer Docs

Optimize for developers and technical practitioners: direct address, active voice, short steps, consistent terminology, exact code/UI terms, and no unnecessary charm.

### Product Marketing

Keep claims specific and credible. Translate value propositions into Swedish benefit language instead of slogan-shaped English.

### Startup Internal

Allow a warmer, faster team tone while keeping Swedish grammar, compounds, and prepositions clean.

### Klarsprak

Use clear public-facing Swedish: reader-oriented structure, everyday words, explained terms, short sentences where possible, and direct responsibility.

### Learner-Friendly

Use natural Swedish but keep sentence structure and vocabulary accessible. Add 2-5 concise notes when the user is learning.

## Load References

- Read `references/natural-swedish-style.md` for the revision checklist and style principles.
- Read `references/presets-tech-company-swedish.md` for contemporary wording, tech-company Swedish, product copy, developer docs, startup tone, SaaS/cloud/AI/security/FinOps language, or modern vocabulary.
- Read `references/resource-map.md` for source lookup order, current caveats, and resource links.
- Read `references/revision-patterns.md` for recurring English-to-Swedish and learner-Swedish revision patterns.

Load only the files needed for the task.

## NEVER

- Never translate sentence by sentence when the result should read as native Swedish.
- Never preserve English word order, noun stacks, or business idioms just because they are present in the source.
- Never use contemporary terms as decoration. Modern Swedish should still be precise and context-fit.
- Never replace established technical product names, CLI flags, code identifiers, API paths, or UI labels with Swedish translations.
- Never over-polish workplace Swedish into stiff myndighetssvenska unless the user asks for that register.
- Never pretend one formulation is the only correct one when Swedish usage allows variation.

## Output Standards

- Prefer concise, idiomatic Swedish over literal transfer from English.
- Prefer clear, concrete phrasing; use klarsprak for public, workplace, policy, support, and product text unless the user asks for a more literary voice.
- Use standard Sweden Swedish by default. Switch to Finland Swedish, dialectal, youth, highly formal, or strongly colloquial prose only on request.
- Keep explanations short. For learner support, include 2-5 high-impact notes rather than a full grammar lecture.
- If an input error changes meaning, ask or state both possible interpretations.
