---
name: stitch-design-system
description: "Use when extracting a design system from a Stitch project to create a DESIGN.md source-of-truth for consistent multi-screen generation. Covers semantic translation of technical design assets into descriptive language Stitch interprets for visual consistency. Keywords: stitch, DESIGN.md, design system, design tokens, color palette, typography, component styling, design governance, multi-screen consistency."
---

# Stitch Design System

Extract Stitch designs into semantic `DESIGN.md` files that serve as authoritative references for generating new screens with consistent visual language.

## NEVER

- Never use technical CSS values in DESIGN.md without semantic translation — `rounded-xl` means nothing to Stitch; write "generously rounded corners" so visual intent is clear.
- Never omit hex codes — color names are ambiguous; `Ocean-deep Cerulean (#0077B6)` enables exact replication, `"blue"` does not.
- Never omit functional roles — "blue button" is unusable; "Deep Ocean Blue (#0077B6) for primary call-to-action" is actionable.
- Never use unspecific atmosphere words like "modern", "nice", or "clean" — every design is these things; write sensory descriptions like "airy and minimal with generous whitespace" or "dense, information-rich, utilitarian".
- Never name colors by appearance alone — name them by purpose: primary, secondary, destructive, surface, muted.
- Never skip shadows and spacing — these define perceived elevation and hierarchy, which Stitch uses to understand visual weight.

## What Makes a Good DESIGN.md

Stitch generates new screens from natural language descriptions. DESIGN.md is the bridge between technical assets (HTML/CSS) and Stitch's language model. The quality of translation directly determines consistency of generated screens.

**Good translation:**
- Technical: `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- Semantic: "Whisper-soft diffused shadows, barely perceptible, creating gentle elevation"

**Poor translation:**
- Technical: `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- Semantic: "Light shadow" (too vague for Stitch to reproduce)

## Retrieval Workflow

1. Call `[prefix]:list_projects` (filter: `view=owned`) — extract numeric Project ID from `name` field
2. Call `[prefix]:list_screens` with `projectId` — identify target screen by title
3. Call `[prefix]:get_screen` with `projectId` + `screenId` — get `screenshot.downloadUrl`, `htmlCode.downloadUrl`, `designTheme`
4. Call `[prefix]:get_project` with full `name` path (`projects/{id}`) — get `designTheme` object (colors, fonts, roundness)
5. `web_fetch` the `htmlCode.downloadUrl` — parse Tailwind classes, custom CSS, component patterns
6. Optionally `web_fetch` screenshot for visual verification of atmosphere

## Semantic Translation Guide

### Colors
For each color: Descriptive name conveying character + hex code + functional role.
```
Deep Muted Teal-Navy (#294056) — primary surface, navigation backgrounds
Warm Ivory (#F5F0E8) — content background, card surfaces
Coral Red (#E84B3A) — destructive actions, error states
```

### Geometry
| CSS value | DESIGN.md language |
|---|---|
| `rounded-full` | Pill-shaped, fully circular |
| `rounded-2xl` | Generously rounded corners |
| `rounded-lg` | Subtly rounded corners |
| `rounded-md` | Slight corner softening |
| `rounded-none` | Sharp, squared-off edges |

### Elevation / Shadows
| CSS value | DESIGN.md language |
|---|---|
| No shadow | Flat, no elevation distinction |
| `shadow-sm` | Whisper-soft diffused shadows |
| `shadow-md` | Gentle card elevation |
| `shadow-lg` | Pronounced depth, layered UI |
| `shadow-2xl` | Heavy, high-contrast drop shadows |

### Typography
Describe: font family character ("humanist sans-serif with geometric undertones"), weight hierarchy ("bold 700 for headings, regular 400 for body, never medium 500"), letter-spacing ("tight -0.02em tracking on headings").

## DESIGN.md Output Format

```markdown
# Design System: [Project Title]

**Project ID:** [numeric-id]

## 1. Visual Theme & Atmosphere

[2–3 sentences using sensory, evocative language. Capture density, mood, and aesthetic philosophy.]

## 2. Color Palette & Roles

| Name | Hex | Role |
|---|---|---|
| Deep Muted Teal-Navy | #294056 | Primary actions, navigation |
| ... | | |

## 3. Typography Rules

[Font family character, weight usage, letter-spacing, size hierarchy.]

## 4. Component Styling

- **Buttons:** [Shape, color assignment, hover/active behavior]
- **Cards/Containers:** [Corner roundness, background, shadow depth]
- **Inputs/Forms:** [Border style, background, focus ring]

## 5. Layout Principles

[Whitespace strategy, grid alignment, spacing rhythm, margin philosophy.]
```

## Decision: Atmosphere Description

Before writing atmosphere, ask:
- What is the information density? (airy/dense)
- What emotion does it evoke? (calm/energetic/authoritative/playful)
- Who is the audience? (consumer/enterprise/developer)
- What is the visual weight? (lightweight/substantial)

These answers should generate 2–3 specific sentences — not adjective lists.
