---
name: stitch-design-system
description: Extract and synthesize design systems from Stitch projects into DESIGN.md files. Use when analyzing existing designs to create a semantic design system for consistent multi-screen generation. Creates the source of truth for design language with color palettes, typography rules, and component styling.
allowed-tools:
  - "stitch*:*"
  - "Read"
  - "Write"
  - "web_fetch"
---

# Stitch Design System Skill

Extract and synthesize Stitch designs into semantic design systems (`DESIGN.md`) that serve as authoritative references for consistent UI generation.

## When to Use

- **Analyzing a Stitch project** to establish visual language
- **Creating multi-screen consistency** across generated pages
- **Documenting design tokens** (colors, typography, spacing, components)
- **Establishing design governance** for a project

## Overview

This skill helps create `DESIGN.md` files that serve as the "source of truth" for prompting Stitch to generate new screens aligned with existing design language. The analysis transforms technical design assets (HTML, CSS, colors) into semantic, descriptive language that Stitch interprets for visual consistency.

## Prerequisites

- Stitch MCP Server with project access
- At least one designed screen in the target Stitch project
- Stitch Effective Prompting Guide: https://stitch.withgoogle.com/docs/learn/prompting/

## Retrieval Workflow

### Step 1: Discover Namespace

Run `list_tools` to find Stitch MCP prefix (typically `mcp_stitch:` or `stitch:`). Use this prefix for all subsequent calls.

### Step 2: Find Target Project

Call `[prefix]:list_projects` with `filter: "view=owned"` to retrieve all projects. Extract Project ID from the `name` field (format: `projects/{numeric-id}`).

### Step 3: Find Target Screen

Call `[prefix]:list_screens` with numeric `projectId`. Identify the screen by title (e.g., "Home", "Landing Page"). Extract Screen ID from the screen's `name` field.

### Step 4: Fetch Screen Metadata

Call `[prefix]:get_screen` with both numeric `projectId` and `screenId`. Response includes:

- `screenshot.downloadUrl` - Visual design reference
- `htmlCode.downloadUrl` - Full HTML/CSS source
- `width`, `height`, `deviceType` - Screen dimensions
- Project `designTheme` - Colors, fonts, roundness

### Step 5: Download Assets

Use `web_fetch` to download HTML from `htmlCode.downloadUrl`. Optionally download screenshot for visual verification. Parse HTML to extract Tailwind classes, custom CSS, and component patterns.

### Step 6: Extract Project Metadata

Call `[prefix]:get_project` with full `name` path (e.g., `projects/{id}`) to retrieve:

- `designTheme` object (colors, fonts, roundness)
- Project guidelines and descriptions
- Device preferences and layout principles

## Analysis & Synthesis

### 1. Extract Project Identity

- Project Title
- Project ID (from JSON `name` field)

### 2. Define Atmosphere

Evaluate screenshot and HTML to capture overall "vibe" using evocative adjectives:

- Airy, Minimal, Dense, Utilitarian, Sophisticated, Playful, etc.

### 3. Map Color Palette

For each color, document:

- **Descriptive name** conveying character (e.g., "Deep Muted Teal-Navy")
- **Hex code** for precision (e.g., "#294056")
- **Functional role** (e.g., "Primary actions", "Secondary text")

### 4. Translate Geometry & Shape

Convert technical `border-radius` values to physical descriptions:

- `rounded-full` → "Pill-shaped"
- `rounded-lg` → "Subtly rounded corners"
- `rounded-none` → "Sharp, squared-off edges"

### 5. Describe Depth & Elevation

Explain how UI handles layering. Describe shadow quality:

- "Flat" (no shadows)
- "Whisper-soft diffused shadows" (subtle elevation)
- "Heavy, high-contrast drop shadows" (pronounced depth)

## Output Format: DESIGN.md

```markdown
# Design System: [Project Title]

**Project ID:** [Insert Project ID Here]

## 1. Visual Theme & Atmosphere

(Description of the mood, density, and aesthetic philosophy.)

## 2. Color Palette & Roles

(List colors by Descriptive Name + Hex Code + Functional Role.)

## 3. Typography Rules

(Description of font family, weight usage, and letter-spacing character.)

## 4. Component Stylings

- **Buttons:** (Shape description, color assignment, behavior).
- **Cards/Containers:** (Corner roundness, background color, shadow depth).
- **Inputs/Forms:** (Stroke style, background, focus state).

## 5. Layout Principles

(Description of whitespace strategy, margins, grid alignment.)
```

## Best Practices

- **Be Descriptive:** Avoid generic terms. Use "Ocean-deep Cerulean (#0077B6)" instead of "blue"
- **Be Functional:** Always explain what each element is used for
- **Be Consistent:** Use the same terminology throughout
- **Be Visual:** Help readers visualize the design through descriptions
- **Be Precise:** Include exact hex codes and pixel values in parentheses

## Anti-Patterns to Avoid

- **NEVER** use technical jargon without translation — `rounded-xl` means nothing to Stitch; use "generously rounded" so the visual intent is clear
- **NEVER** omit hex codes or use only color names — names are ambiguous; hex codes enable exact replication
- **NEVER** forget functional roles of design elements — "blue button" is generic; "Deep Ocean Blue (#0077B6) for primary actions" is actionable
- **NEVER** be vague in atmosphere descriptions — avoid "nice" or "cool"; use sensory language like "airy, minimal" or "dense, utilitarian"
- **NEVER** ignore subtle design details like shadows and spacing — these affect perceived elevation and visual hierarchy
- **NEVER** use clichés like "modern" without specificity — every design is "modern"; say what actually makes it distinctive
- **NEVER** name colors by appearance alone — colors should reflect their PURPOSE (primary, secondary, error) not just their hue

## Tips for Success

1. Start with the big picture before diving into details
2. Look for patterns in spacing, sizing, and styling
3. Name colors by purpose, not just appearance
4. Document how visual weight communicates hierarchy
5. Reference the Stitch Effective Prompting Guide for language patterns
