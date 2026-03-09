---
name: stitch-prompt-engineer
description: Transforms vague UI ideas into polished, Stitch-optimized prompts. Use when Claude needs to enhance specificity, add UI/UX keywords, inject design system context, and structure output for consistent multi-screen generation with design system awareness.
allowed-tools:
  - "Read"
  - "Write"
---

# Enhance Prompt for Stitch

Transform rough or vague UI generation ideas into polished, optimized prompts that produce better results from Stitch.

## Overview

This skill follows a **Framework-based approach** that breaks prompt enhancement into four sequential phases: assessing input specificity, checking for design system context, applying targeted enhancements (keywords, vibe, structure, colors), and formatting output for Stitch. Each phase builds on the previous one, allowing you to Refine prompts iteratively and systematically.

## When to Use

- **Polish a UI prompt** before sending to Stitch
- **Improve a prompt** that produced poor results
- **Add design system consistency** to a simple idea
- **Structure a vague concept** into an actionable Stitch prompt
- **Multi-page projects** requiring design continuity (MANDATORY: use with DESIGN.md)

## Prerequisites

Consult the official Stitch documentation: **[Stitch Effective Prompting Guide](https://stitch.withgoogle.com/docs/learn/prompting/)** (supersedes any patterns below)

## Prompting Strategy

### Step 1: Assess the Input

Evaluate what's missing:

| Element          | Check for                           | If missing...                 |
| ---------------- | ----------------------------------- | ----------------------------- |
| **Platform**     | "web", "mobile", "desktop"          | Add based on context or ask   |
| **Page type**    | "landing page", "dashboard", "form" | Infer from description        |
| **Structure**    | Numbered sections/components        | Create logical page structure |
| **Visual style** | Adjectives, mood, vibe              | Add descriptive language      |
| **Colors**       | Specific values or roles            | Add design system or suggest  |
| **Components**   | UI-specific terms                   | Translate to proper keywords  |

### Step 2: Check for DESIGN.md (Decision Tree)

**If working on a single-screen project:**

1. Skip DESIGN.md reference
2. Proceed directly to Step 3

**If working on a multi-page project:**

1. **MANDATORY**: Look for `DESIGN.md` in the project root
2. **If found**: Read the entire file to extract the design system block
3. **If NOT found**: Create one using the `stitch-design-system` skill before enhancing more prompts
4. Include color palette, typography, and component styles in the output as "DESIGN SYSTEM (REQUIRED)"

### Step 3: Apply Enhancements

#### A. Add UI/UX Keywords

Replace vague terms with specific component names:

| Vague             | Enhanced                                              |
| ----------------- | ----------------------------------------------------- |
| "menu at the top" | "navigation bar with logo and menu items"             |
| "button"          | "primary call-to-action button"                       |
| "list of items"   | "card grid layout" or "vertical list with thumbnails" |
| "form"            | "form with labeled input fields and submit button"    |
| "picture area"    | "hero section with full-width image"                  |

#### B. Amplify the Vibe

Add descriptive adjectives to set mood:

| Basic          | Enhanced                                                    |
| -------------- | ----------------------------------------------------------- |
| "modern"       | "clean, minimal, with generous whitespace"                  |
| "professional" | "sophisticated, trustworthy, with subtle shadows"           |
| "fun"          | "vibrant, playful, with rounded corners and bold colors"    |
| "dark mode"    | "dark theme with high-contrast accents on deep backgrounds" |

#### C. Structure the Page

Organize into numbered sections:

```markdown
**Page Structure:**

1. **Header:** Navigation with logo and menu items
2. **Hero Section:** Headline, subtext, and primary CTA
3. **Content Area:** [Describe the main content]
4. **Footer:** Links, social icons, copyright
```

#### D. Format Colors Properly

```
Descriptive Name (#hexcode) for functional role
```

Examples:

- "Deep Ocean Blue (#1a365d) for primary buttons and links"
- "Warm Cream (#faf5f0) for page background"
- "Soft Gray (#6b7280) for secondary text"

### Step 4: Format the Output

Structure in this order:

```markdown
[One-line description of the page purpose and vibe]

**DESIGN SYSTEM (REQUIRED):**

- Platform: [Web/Mobile], [Desktop/Mobile]-first
- Theme: [Light/Dark], [style descriptors]
- Background: [Color description] (#hex)
- Primary Accent: [Color description] (#hex) for [role]
- Text Primary: [Color description] (#hex)
- [Additional design tokens...]

**Page Structure:**

1. **[Section]:** [Description]
2. **[Section]:** [Description]
   ...
```

## Output Format

**Default**: Return the enhanced prompt as text.

**Optional file output** (if user requests):

- `next-prompt.md` — for use with `stitch-loop` skill
- Custom filename specified by user

## Examples

### Example 1: Vague Input → Structured Prompt

**User input:** "make me a login page"

**Enhanced output:**

```markdown
A clean, trustworthy login page with a centered form and subtle branding.

**DESIGN SYSTEM (REQUIRED):**

- Platform: Web, Desktop-first
- Theme: Light, minimal, professional
- Background: Clean White (#ffffff)
- Surface: Soft Gray (#f9fafb) for form card
- Primary Accent: Deep Blue (#2563eb) for submit button and links
- Text Primary: Near Black (#111827) for headings
- Text Secondary: Medium Gray (#6b7280) for labels
- Buttons: Subtly rounded (8px), full-width on form
- Cards: Gently rounded (12px), soft shadow for elevation

**Page Structure:**

1. **Header:** Minimal logo, centered
2. **Login Card:** Centered form with email, password fields, "Forgot password?" link
3. **Submit Button:** Primary blue "Sign In" button
4. **Footer:** "Don't have an account? Sign up" link

---

💡 **Tip:** For consistent designs across multiple screens, create a DESIGN.md file using the `design-md` skill.
```

### Example 2: Feature Request → Targeted Edit

**User input:** "add a search bar"

**Enhanced output:**

```markdown
Add a search bar to the header navigation.

**Specific changes:**

- Location: Header, right side before user avatar
- Style: Pill-shaped input with subtle gray background (#f3f4f6)
- Icon: Magnifying glass icon on the left, inside the input
- Placeholder: "Search..." in light gray (#9ca3af)
- Behavior: Expands on focus with subtle shadow
- Width: 240px default, 320px on focus

**Context:** This is a targeted edit. Make only this change while preserving all existing elements.
```

## Best Practices

1. **Be specific early** — Vague inputs need more enhancement
2. **Match the user's intent** — Don't over-design if they want simple
3. **Keep it structured** — Numbered sections help Stitch understand hierarchy
4. **Include the design system** — Consistency is key for multi-page projects
5. **One change at a time for edits** — Don't bundle unrelated changes

## Anti-Patterns to Avoid

- ❌ **NEVER bundle unrelated enhancements** (e.g., don't enhance layout AND colors in one pass) — ask user to focus on one dimension at a time
- ❌ **NEVER skip design system context for multi-page projects** — consistency requires explicit design tokens
- ❌ **NEVER assume generic color names work** — specify hex codes and functional roles
- ❌ **NEVER ignore DESIGN.md even if it's outdated** — refresh it with the user first
- ❌ **NEVER enhance without clarifying the user's intent** — vague prompts often indicate unclear goals, not just poor wording
- ❌ **NEVER output colors as "blue" or "green"** — always provide descriptive names with hex codes

## When Enhancement Fails

Common error scenarios and how to address them:

| Symptom                           | Root Cause                            | Solution                                         |
| --------------------------------- | ------------------------------------- | ------------------------------------------------ |
| Stitch outputs don't match prompt | Prompt lacks visual hierarchy clues   | Add numbered section structure                   |
| Colors don't apply consistently   | No DESIGN.md or hex codes too generic | Create/reference DESIGN.md with specific tokens  |
| Layout breaks across screens      | Missing responsive guidance           | Add "mobile-first" or "desktop-first" explicitly |
| Components look generic           | Weak atmosphere/vibe description      | Replace "modern" with specific mood adjectives   |
| Text feels AI-generated           | Missing domain-specific language      | Inject real examples or brand terminology        |

**Fallback strategy**: If initial enhancement still produces poor results, return to Step 2 and validate design system consistency before re-enhancing.
