---
name: oci-pptx
description: "Use when creating or editing Oracle-branded PowerPoint presentations, pitch decks, or technical slides. Applies Oracle design standards with cognitive science rules for audience retention. Triggers on: 'deck,' 'slides,' 'presentation,' .pptx filenames, 'Oracle presentation,' 'CloudWorld deck,' 'pitch deck.' Keywords: pptx, PowerPoint, Oracle brand, CloudWorld, slides, deck."
---

# OCI PPTX Skill
## Oracle-Branded Presentations with Cognitive Science

---

## Quick Reference

| Task | Tool | Loading Requirements |
|------|------|----------------------|
| Read/analyze content | `python -m markitdown file.pptx` | No additional files |
| Edit existing Oracle template | [editing.md](editing.md) | **MANDATORY - read complete file, no range limits** |
| Create from scratch | [pptxgenjs.md](pptxgenjs.md) | **MANDATORY - read complete file, no range limits** |
| Select pillar colors | See Quick Colors below | Also read [references/color-palettes.md](references/color-palettes.md) for full palette |
| Implementation code examples | PptxGenJS | Read [references/implementation-examples.md](references/implementation-examples.md) |

Do NOT load multiple references simultaneously.

---

## The Five Cognitive Science Rules

Based on Sweller (cognitive load theory), Mayer (multimedia learning), Phillips (Death by PowerPoint):

### 1. One Message Per Slide
Each slide = exactly ONE key point. Multiple messages = divided attention = 0% retention of secondary message.

### 2. Avoid Redundancy Effect
Reading text while hearing speech = 0% retention (Mayer). Max 50 words per slide. Move details to speaker notes.

### 3. Size = Importance Hierarchy
Largest element = most important content (may NOT be the headline). Make key metrics larger than titles when the metric IS the message.

### 4. Context-Aware Backgrounds

| Context | Background | Speaker Slide |
|---------|-----------|---------------|
| Large live event (CloudWorld, keynotes) | Dark: `#0B2540` or `#1a1a1a` | Without headshot (speaker visible on stage) |
| Virtual events / smaller settings | Mix dark and light freely | With headshot |
| Documents / printed materials | Light: `#FFFFFF` or `#F5F5F5` | With headshot |

Dark slides make the SPEAKER the highest-contrast object in the room — that's the cognitive science intent.

### 5. Maximum 6 Objects Per Slide
Count ALL elements: images + shapes + text boxes + charts + decorative (exclude footer/header).
Beyond 6: counting takes 500% more cognitive energy → audience disengages.
Exception: Grid layouts where items form a single visual unit.

---

## Oracle Brand Quick Reference

### Typography
**Font**: Oracle Sans Tab (Regular/Bold)
- Verify installed: `fc-list | grep -i "oracle"`
- Fallback: Arial (always prefer Oracle Sans Tab)

| Element | Size | Reason |
|---------|------|--------|
| Most important content | 60-72pt | Size = importance |
| Titles | 36-44pt | Unless title IS most important |
| Body | 14-16pt | Readability |
| Footer | 10-12pt | Context |

### Quick Colors by Pillar

For full palette details, read [references/color-palettes.md](references/color-palettes.md).

| Pillar | Primary | Accent | Use When |
|--------|---------|--------|----------|
| OCI/Database | Pine 80-160 (`#1E9773`) | Brand Yellow (`#EECC44`) | Cloud infrastructure |
| Health | Sky 80-160 (`#3E93B6`) | Emerald 90 (`#1EB398`) | Healthcare products |
| ERP/EPM/SCM | Teal 90-170 (`#26A3B1`) | Pine 90 (`#3FA67D`) | Enterprise apps |
| HCM | Rose 90-160 (`#D1798C`) | Ocean 90 (`#5F9CC7`) | HR/people systems |
| CX | Plum 80-160 (`#9874B8`) | Ocean 90 (`#5F9CC7`) | Customer-facing |
| Corporate | Slate 50-150 (`#8A8A8A`) | Oracle Red (`#C74634`) | Multi-product |

**Backgrounds**: Dark `#0B2540` / `#1a1a1a` | Light `#FFFFFF` / `#F5F5F5`

### Oracle Footer (Mandatory on All Slides)
- Left: `Copyright © 2026, Oracle and/or its affiliates`
- Right (optional): omit for public events | `| Confidential: Internal` | `| Confidential: Restricted` | `| Confidential: Highly Restricted`

---

## Design Workflow

### Step 1: Context Assessment
1. **Where presented?** Large live event → Dark primary. Virtual → Mix. Document → Light.
2. **Who is audience?** Executives: large metrics, minimal text. Technical: more detail, still ≤6 objects.
3. **Which pillar?** Determines color palette.

### Step 2: Per-Slide Content Strategy
1. Identify THE one message
2. Find most important element → make it largest (metric? insight? visual?)
3. Count objects — ≤6?
4. Text audit — >50 words? → move to speaker notes
5. Redundancy check — slide text duplicates speaker notes? → choose one

### Step 3: Visual Design
**Layout options**: Two-column | Half-bleed image | Large metric callout (60-72pt + small label) | Icon + text rows | 2×2 or 2×3 grid

**Every slide needs a visual element**: Chart, icon set, product screenshot, customer photo, or organic shape motif.
Oracle icon style: icons in colored circles.

---

## Oracle Anti-Patterns (NEVER)

- **Generic blue defaults** — use pillar-specific colors, not default blue
- **Centered body text** — left-align paragraphs and lists
- **Repeated layouts** — vary slide structures throughout deck
- **Accent lines under titles** — hallmark of AI-generated slides, violates Oracle brand
- **Text-only slides** — every slide needs a visual element
- **Multiple messages per slide** — confuses audience, kills retention
- **More than 6 objects** — cognitive overload
- **Missing footer** — Oracle requires footer on all slides
- **Wrong background for context** — dark for live events, not documents
- **Arial when Oracle Sans Tab available** — always check font availability first

---

## Template Rules

| DO | DON'T |
|----|-------|
| Use template's built-in formatting for titles | Alter template spacing or backgrounds |
| Use slide backgrounds provided in template | Add accent lines under titles |
| Verify Oracle Sans Tab before presenting | Center body text (lists/paragraphs) |
| Edit in PowerPoint desktop app | Edit in SharePoint browser — breaks formatting |

---

## Accessibility (Oracle Standard)

**Reading order (screen readers read bottom to top in Selection Pane):**
1. Home → Arrange → Selection Pane
2. Drag most important content to bottom of list

**Alt text**: Right-click image → "View Alt Text". Describe content for blind/low-vision users.
Format: `"Bar chart showing 127% revenue growth YoY"`
Mark purely decorative elements as decorative.

**Contrast**: Minimum 4.5:1 (WCAG AA). Oracle palettes pre-selected for strong contrast.

---

## Cognitive Load Validation Checklist

Before finalizing each slide:
- [ ] One message — summarizable in one sentence?
- [ ] ≤6 objects (images + shapes + text boxes + charts, excluding footer)?
- [ ] ≤50 words on slide (verbose content in speaker notes)?
- [ ] Largest element = most important content?
- [ ] No redundancy between slide text and speaker notes?
- [ ] Contrast ≥4.5:1?
- [ ] Background matches context (dark live / light docs / mixed virtual)?
- [ ] Visual element present?
- [ ] Oracle Sans Tab font used?
- [ ] Correct pillar color palette?
- [ ] Footer present with current year and confidentiality level?
- [ ] Alt text on all images?
- [ ] Selection Pane reading order correct?

---

## QA Workflow (Required)

**Mindset**: Assume problems exist. First render is almost never correct.

### Phase 1: Content QA
```bash
python -m markitdown output.pptx
python -m markitdown output.pptx | grep -iE "xxxx|lorem|ipsum"
```

### Phase 2: Cognitive Load QA
Per slide: object count ≤6? word count ≤50? one clear message? largest = most important?

### Phase 3: Brand Compliance QA
Oracle Sans Tab? Correct pillar palette? Background matches context? Footer correct year? No AI patterns (accent lines, centered body text)?

### Phase 4: Visual QA with Subagents
```bash
# Convert to images for visual inspection
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
```

Subagent prompt:
```
Visually inspect these Oracle-branded slides. Assume there are issues — find them.
Check: overlapping elements, text overflow, object count >6, low contrast,
text-only slides, wrong font, missing/incorrect footer, wrong background for context.
Report ALL issues per slide.
```

### Verification Loop
1. Generate → convert to images → inspect
2. List ALL issues (cognitive + brand + visual)
3. Fix issues
4. Re-verify affected slides
5. Repeat until no issues found

Do not declare success until at least one fix-and-verify cycle is complete.

---

## Reading/Inspecting Content

```bash
python -m markitdown presentation.pptx        # Text extraction
python scripts/thumbnail.py presentation.pptx  # Visual thumbnail grid
python scripts/office/unpack.py file.pptx dir/ # Raw XML inspection
```
