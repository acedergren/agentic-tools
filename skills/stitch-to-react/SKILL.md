---
name: stitch-to-react
description: Converts Stitch designs into modular Vite and React components using system-level networking and AST-based validation. Use when transforming Stitch screens into production-ready TypeScript/Tailwind components with architecture enforcement (isolation, data decoupling, type safety, theme mapping).
allowed-tools:
  - "stitch*:*"
  - "Bash"
  - "Read"
  - "Write"
  - "web_fetch"
---

# Stitch to React Components

Transform Stitch designs into clean, modular React code. This skill focuses on architecture compliance: isolation of logic, decoupled data, type-safe components, and validated Tailwind mapping. This skill follows a **Process pattern** — a phased conversion workflow with decision trees at critical junctures.

## Overview

The conversion of Stitch designs to React components requires a systematic approach with multiple translation steps. This skill implements a Process pattern with 5 main conversion phases:

1. **Namespace discovery and metadata retrieval** from Stitch MCP
2. **Design caching decision** (refresh vs. use existing)
3. **Architecture-based code generation** (modular components, isolated logic)
4. **Type safety enforcement** (TypeScript interfaces, Tailwind mapping)
5. **Quality validation** (AST compliance, dev server verification)

The conversion strategy balances pragmatism (use caching when possible) with freshness (allow user-driven refresh) while enforcing non-negotiable architecture rules.

## When to Use

- **Converting Stitch designs** to production React/TypeScript components
- **Ensuring modular architecture** across design-to-code pipelines
- **Enforcing type safety** and design token consistency
- **Validating AST compliance** before integrating components into projects

## Prerequisites

- Stitch MCP Server access
- Fastify or CLI script capabilities (for fetch operations)
- TypeScript + Tailwind configured in target project
- Optional: `resources/component-template.tsx` and `resources/architecture-checklist.md`

## Conversion Workflow

This skill follows a **Process pattern** with five phased conversion workflow stages. Each phase includes decision trees at critical junctures to guide the transformation from Stitch design to production React code.

### Step 1: Namespace Discovery & Metadata Retrieval

Establish connection to Stitch MCP server and retrieve design metadata.

Run `list_tools` to find the Stitch MCP prefix (typically `stitch:` or `mcp_stitch:`). Use this prefix for all subsequent calls.

Call `[prefix]:get_screen` to retrieve the design JSON, which includes:

- `screenshot.downloadUrl` — Visual reference
- `htmlCode.downloadUrl` — Full HTML/CSS source
- `width`, `height`, `deviceType` — Screen dimensions
- `designTheme` — Colors, fonts, roundness

### Step 2: Design Caching Decision (Decision Tree)

**Decision**: Should cached designs be used or refreshed from Stitch?

**If files exist** (`.stitch/designs/{page}.html` and `.stitch/designs/{page}.png`):

- Ask the user: "Use cached designs or refresh from Stitch?"
- Only re-download if user confirms
- **Do NOT re-fetch without explicit user approval**

**If files do not exist**:

- Proceed to Phase 3 (download)

### Step 3: High-Reliability Download

Download design artifacts with fallback mechanisms for network failures.

⚠️ **CRITICAL**: Internal AI fetch tools can fail on Google Cloud Storage domains.

**For HTML:**

```bash
bash scripts/fetch-stitch.sh "[htmlCode.downloadUrl]" ".stitch/designs/{page}.html"
```

**For Screenshot:**

1. Append `=w{width}` to the screenshot URL (where `{width}` is from screen metadata)
2. Run: `bash scripts/fetch-stitch.sh "[screenshot.downloadUrl]=w{width}" ".stitch/designs/{page}.png"`
3. This script handles redirects and security handshakes

### Step 4: Visual Audit & Architecture Planning

Confirm design intent and plan modular component structure before code generation.

Review the downloaded screenshot to identify:

- Visual hierarchy and component boundaries
- Color palette and typography system
- Responsive breakpoints and layouts
- Interactive elements and state indicators

### Step 5: Code Generation & Integration

Transform design into modular React components following architectural rules.

1. **Environment setup**: If `node_modules` missing, run `npm install`
2. **Data layer**: Create `src/data/mockData.ts` based on design content
3. **Component drafting**: Use `resources/component-template.tsx`. Replace all `StitchComponent` with actual component name
4. **Application wiring**: Update project entry point (e.g., `App.tsx`) to render new components
5. **Quality check**:
   - Run `npm run validate <file_path>` for each component
   - Verify output against `resources/architecture-checklist.md`
   - Start dev server with `npm run dev` to verify live result

## Architectural Rules (Non-Negotiable)

- **Modular components**: Break design into independent files. Never output single-file dumps.
- **Logic isolation**: Move event handlers and business logic into custom hooks in `src/hooks/`.
- **Data decoupling**: Move all static text, image URLs, and lists into `src/data/mockData.ts`.
- **Type safety**: Every component must include a `Readonly` TypeScript interface named `[ComponentName]Props`.
- **No Google headers**: Leave out Google license headers in generated React components.
- **Style mapping**:
  - Extract `tailwind.config` from HTML `<head>`
  - Sync values with `resources/style-guide.json`
  - Use theme-mapped Tailwind classes, NOT arbitrary hex codes

## Anti-Patterns to Avoid

- ❌ **NEVER fetch without checking for existing `.stitch/designs/` files** — always ask user about refresh intent
- ❌ **NEVER hardcode styles; always map to theme tokens** — arbitrary hex codes break theme consistency
- ❌ **NEVER skip AST validation** — architecture checklist is non-optional
- ❌ **NEVER put logic in components** — extract to hooks first
- ❌ **NEVER omit TypeScript interfaces** — `Readonly` Props types are required for every component
- ❌ **NEVER bundle data in component files** — centralize in `mockData.ts`

## Output Format

Generated components follow a strict modular structure that separates concerns and ensures type safety.

### File Organization

```
src/
├── components/
│   ├── Header.tsx              # Modular component
│   ├── MainContent.tsx         # Modular component
│   ├── Card.tsx                # Reusable UI component
│   └── index.ts                # Barrel export for convenience
├── hooks/
│   ├── useNavigation.ts        # Event handlers, state management
│   └── useFormValidation.ts    # Business logic hooks
├── data/
│   └── mockData.ts             # Centralized static data, images, text
├── styles/
│   └── theme.ts                # Extracted Tailwind theme tokens
└── App.tsx                      # Root component
```

### Component Pattern

Every component must export a `Readonly` TypeScript interface for its props:

```typescript
// Button.tsx
interface Readonly ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={variant === 'primary' ? 'bg-blue-600' : 'bg-gray-200'}
    >
      {label}
    </button>
  );
}
```

### Data Layer

All static content lives in `src/data/mockData.ts`:

```typescript
// mockData.ts
export const mockData = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  hero: {
    title: "Welcome to Our App",
    subtitle: "Built from Stitch design to React",
    buttonText: "Get Started",
  },
  colors: {
    primary: "#2563eb",
    secondary: "#10b981",
  },
};
```

### Style Mapping

Extract Tailwind config from downloaded HTML and sync to `resources/style-guide.json`. Use theme-mapped Tailwind classes, never arbitrary hex codes:

```typescript
// ✅ Correct: Theme-mapped
className = "bg-primary-500 text-white";

// ❌ Wrong: Hardcoded hex
className = "bg-[#2563eb] text-white";
```

### Custom Hooks

Move event handlers and business logic to `src/hooks/`:

```typescript
// hooks/useFormState.ts
export function useFormState(initialData: FormData) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { formData, handleChange };
}
```

## When Things Go Wrong

| Issue                    | Symptom                              | Fix                                                                                                                  |
| ------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Fetch fails**          | Connection timeout or 403 error      | 1) Check script quotes; 2) Verify `=w{width}` appended to screenshot URL; 3) Use fallback: `curl -L` with `--output` |
| **Validation errors**    | AST report shows hardcoded styles    | Extract hex codes → `style-guide.json` → use Tailwind class mapping                                                  |
| **Missing interfaces**   | TypeScript errors on component props | Add `Readonly` interface for each component following template                                                       |
| **Stale cached designs** | Screenshot doesn't match expected UI | Check file timestamps; ask user to confirm refresh intent                                                            |
| **Theme mapping fails**  | Tailwind classes not recognized      | Verify `tailwind.config` extracted correctly and synced to `style-guide.json`                                        |

## Best Practices

- **Fetch errors**: Ensure URLs are quoted in bash commands to prevent shell interpolation errors
- **Validation errors**: Review AST report and fix any missing interfaces or hardcoded styles
- **Component quality**: Always run the architecture checklist before marking as complete

---

**Key Principle**: A component is not "done" until it passes the architecture checklist AND the dev server shows no console errors.
