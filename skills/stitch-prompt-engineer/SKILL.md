---
name: stitch-prompt-engineer
description: "Use when enhancing, polishing, or fixing Stitch UI generation prompts. Adds UI/UX keywords, injects design system tokens, structures page hierarchy, and enforces hex color formatting. Triggers on: Stitch prompt, improve prompt, better output, redesign, multi-screen consistency, design system, DESIGN.md."
allowed-tools:
  - "Read"
  - "Write"
---

# Enhance Prompt for Stitch

## NEVER

- **NEVER output colors as names** ("blue", "green") — always `Descriptive Name (#hexcode) for role`
- **NEVER skip DESIGN.md for multi-page projects** — consistency requires explicit tokens across screens
- **NEVER bundle unrelated enhancements in one pass** — layout changes and color changes are separate asks
- **NEVER ignore an outdated DESIGN.md** — surface the conflict to the user before proceeding
- **NEVER enhance without understanding intent** — vague prompt often means unclear goal, not just poor wording
- **NEVER assume platform** — if "web" vs "mobile" isn't clear, ask

## Decision: Single Screen vs Multi-Page

```
Working on multiple screens?
│
├─ YES → Find DESIGN.md in project root
│   ├─ Found → Read it; include design system block as "DESIGN SYSTEM (REQUIRED)"
│   └─ Not found → Create it with `stitch-design-system` skill first
│
└─ NO → Skip DESIGN.md; proceed directly to enhancement
```

## Assessment Checklist

Before enhancing, identify what's missing:

| Element      | If missing...                          |
| ------------ | -------------------------------------- |
| Platform     | Ask or infer from context              |
| Page type    | Infer ("landing page", "form", etc.)   |
| Structure    | Add numbered sections                  |
| Visual style | Add mood adjectives                    |
| Colors       | Add hex-coded design tokens            |
| Components   | Replace vague nouns with UI vocabulary |

## Vocabulary Upgrades

| Vague               | Enhanced                                              |
| ------------------- | ----------------------------------------------------- |
| "menu at the top"   | "navigation bar with logo and menu items"             |
| "button"            | "primary call-to-action button"                       |
| "list of items"     | "card grid layout" or "vertical list with thumbnails" |
| "form"              | "form with labeled input fields and submit button"    |
| "picture area"      | "hero section with full-width image"                  |
| "modern"            | "clean, minimal, with generous whitespace"            |
| "professional"      | "sophisticated, trustworthy, with subtle shadows"     |
| "dark mode"         | "dark theme with high-contrast accents on deep backgrounds" |

## Output Structure

```markdown
[One-line description of page purpose and vibe]

**DESIGN SYSTEM (REQUIRED):**
- Platform: [Web/Mobile], [Desktop/Mobile]-first
- Theme: [Light/Dark], [style descriptors]
- Background: [Name] (#hex)
- Primary Accent: [Name] (#hex) for [role]
- Text Primary: [Name] (#hex)
- Buttons: [corner radius], [width behavior]
- Cards: [corner radius], [elevation style]

**Page Structure:**
1. **[Section]:** [description]
2. **[Section]:** [description]
```

For targeted edits (not full-page prompts), include:
- Exact location in UI
- Style spec with hex codes
- `"Context: This is a targeted edit. Make only this change."`

## Troubleshooting

| Symptom                          | Fix                                                   |
| -------------------------------- | ----------------------------------------------------- |
| Output doesn't match prompt      | Add numbered section structure for visual hierarchy   |
| Colors apply inconsistently      | Create/reference DESIGN.md with explicit hex tokens   |
| Layout breaks across screens     | Add "mobile-first" or "desktop-first" explicitly      |
| Components look generic          | Replace "modern" with specific mood adjectives        |
| Still poor results after enhance | Return to DESIGN.md and validate consistency first    |

## Output Format

Return enhanced prompt as text by default.
If user requests file output: write `next-prompt.md` (for use with `stitch-loop` skill).
