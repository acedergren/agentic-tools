---
name: shadcn-svelte-skill
version: 3.0.0
license: MIT
description: |
  Expert guidance for shadcn-svelte component architecture and Tailwind CSS v4.1 patterns.
  Use when: (1) choosing between shadcn/Skeleton/Melt UI, (2) debugging TanStack Table
  reactivity, (3) fixing Tailwind v4.1 migration issues, (4) implementing complex data
  tables with sorting/filtering, (5) troubleshooting form validation patterns.

  NOT for basic installation (see official docs). Focuses on non-obvious decisions,
  performance pitfalls, and patterns missing from documentation.

  Triggers: shadcn-svelte, component library choice, TanStack Table, data table,
  Tailwind v4.1, form validation, Svelte 5 reactivity, shadcn vs skeleton.
license: MIT
---

# shadcn-svelte Expert Guidance

**Assumption**: You know how to run `npx shadcn-svelte@latest add`. This skill covers what the docs won't tell you.

---

## Critical Decision: Which UI Library?

```
Need UI components for Svelte?
│
├─ Maximum customization needed (own the code)
│   ├─ Complex data tables → shadcn-svelte (TanStack integration)
│   ├─ Unique design system → shadcn-svelte (copy-paste, modify freely)
│   └─ Moderate customization → Consider Skeleton UI (easier)
│
├─ Rapid prototyping (ship fast, customize later)
│   └─ Skeleton UI - pre-built themes, npm package
│
├─ Accessibility-first (maximum control)
│   └─ Melt UI - headless primitives (bring your own styles)
│
└─ Unique requirements (nothing fits)
    └─ Build from scratch with Bits UI primitives
```

**Key insight**: shadcn is **NOT a library**, it's copy-paste infrastructure. You fork components into `$lib/components/ui/` and own maintenance.

---

## Anti-Patterns (Things That Will Break)

### ❌ #1: Early Destructuring of Builders

**Problem**: Bits UI uses builders that must be passed down, not destructured early.

```svelte
<!-- WRONG - will break -->
<script>
  import * as Dialog from "$lib/components/ui/dialog";
  const { trigger, content } = Dialog;  // ❌ Breaks reactivity
</script>

<Dialog.Root>
  <Dialog.Trigger {trigger}>Open</Dialog.Trigger>  <!-- ❌ Undefined -->
</Dialog.Root>

<!-- CORRECT - use asChild pattern -->
<script>
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
</script>

<Dialog.Root>
  <Dialog.Trigger asChild let:builder>
    <Button builders={[builder]}>Open</Button>  <!-- ✅ Works -->
  </Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>
```

**Why it breaks**: Builders are reactive objects that get passed through component tree. Destructuring at module level captures stale references.

**Why this is deceptively hard to debug**: Error message is just "undefined", no mention of builders. Console shows component renders fine, but click handlers silently fail. Takes 30+ minutes to discover the `asChild` pattern.

### ❌ #2: TanStack Table - Missing `get` Accessors

**Problem**: Svelte 5 runes require `get` accessors in `createSvelteTable`, not direct references.

```typescript
// WRONG - stale data, no reactivity
let sorting = $state<SortingState>([]);

const table = createSvelteTable({
  data: myData,  // ❌ Static reference
  state: { sorting }  // ❌ No reactivity
});

// CORRECT - reactive accessors
let sorting = $state<SortingState>([]);

const table = createSvelteTable({
  get data() { return myData; },  // ✅ Getter updates on change
  state: {
    get sorting() { return sorting; }  // ✅ Reactive
  },
  onSortingChange: (updater) => {
    sorting = typeof updater === "function" ? updater(sorting) : updater;
  }
});
```

**Why it breaks**: Without getters, TanStack reads data once at initialization and never updates.

**This is THE most common TanStack Table bug with Svelte 5.**

**Why this is deceptively hard to debug**: Table renders correctly with initial data, pagination/sorting UI works, but clicking sort does nothing. DevTools show state updating, but table doesn't re-render. The `get` keyword is mentioned nowhere in TanStack errors—you only discover it from buried GitHub issues.

### ❌ #3: Tailwind v4.1 Migration - Old `@tailwind` Directives

**Problem**: Tailwind v4.1 changed import syntax.

```css
/* WRONG - v3 syntax */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CORRECT - v4.1 syntax */
@import "tailwindcss";
```

**Also update `vite.config.ts`:**
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],  // ✅ Plugin order matters
})
```

**Why it breaks**: v4.1 uses native CSS imports, no longer PostCSS directives.

**Why this is deceptively hard to debug**: Vite compiles successfully, no errors. Styles appear to work in dev mode (cached from previous build), but production build has zero Tailwind classes. The `@tailwind` directive silently does nothing—Vite doesn't warn about invalid CSS.

### ❌ #4: Form Validation - Destructuring `superForm` Too Early

```typescript
// WRONG - breaks reactivity
const form = superForm(data.form);
const { form: formData } = form;  // ❌ Stale reference
formData.email = value;  // ❌ Doesn't trigger validation

// CORRECT - bind or use form store methods
const form = superForm(data.form);
const { form: formData } = form;

<Input bind:value={$formData.email} />  // ✅ Two-way binding works
```

---

## Hidden Costs of shadcn-svelte

**Cost #1: No `npm update`**
- Every shadcn component is forked into your codebase
- Bug fixes require manually re-copying components
- Security patches don't auto-update
- Trade-off: Customization freedom vs maintenance burden

**Cost #2: Tailwind v4.1 CSS Variables Pattern**
- Colors defined as HSL triplets: `--color-primary: 0 0% 9%`
- Used with `bg-[hsl(var(--color-primary))]` syntax
- **Why this matters**: Allows alpha channel: `bg-[hsl(var(--color-primary)/0.5)]`
- **Not obvious from docs**: The space-separated format enables `/alpha` syntax

**Cost #3: Data Table Complexity Cliff**
```
Simple table: ~50 lines
+ sorting: +100 lines
+ filtering: +150 lines
+ row selection: +200 lines
+ column visibility: +100 lines
```

**Decision rule**: Start with simple `<table>`, upgrade to TanStack only when you need 2+ features.

---

## Expert Patterns

### Pattern #1: CSS Variable Theme System

```css
/* Define theme in app.css using @layer theme */
@import "tailwindcss";

@layer theme {
  :root {
    /* HSL format: hue saturation% lightness% */
    --color-primary: 0 0% 9%;           /* Dark gray */
    --color-destructive: 0 84% 60%;     /* Red */
  }

  .dark {
    --color-primary: 0 0% 98%;          /* Light gray */
    --color-destructive: 0 84% 60%;     /* Red (same) */
  }
}

/* Use with alpha in utilities */
@layer utilities {
  .overlay {
    @apply bg-[hsl(var(--color-primary)/0.5)];  /* 50% opacity */
  }
}
```

**Why HSL with spaces**: Tailwind v4.1 parses `hsl(H S L / A)` format, allowing alpha via `/0.5` syntax.

### Pattern #2: TanStack Table State Updater Pattern

**All TanStack state updates follow this pattern:**

```typescript
onSortingChange: (updater) => {
  sorting = typeof updater === "function" ? updater(sorting) : updater;
}
```

**Why**: `updater` can be either a function `(old) => new` or a new value directly. Always handle both cases.

### Pattern #3: Form Field Component Pattern

```svelte
<Form.Field {form} name="email">
  <Form.Control let:attrs>
    <Form.Label>Email</Form.Label>
    <Input {...attrs} type="email" bind:value={$formData.email} />
  </Form.Control>
  <Form.FieldErrors />  <!-- Auto-displays validation errors -->
</Form.Field>
```

**Key insight**: `let:attrs` spreads aria attributes, `bind:value` connects to form store, `<FieldErrors />` auto-wires to validation state.

---

## When to Load Full References

**MANDATORY - READ ENTIRE FILE: `references/installation.md` when:**
- User explicitly requests setup instructions
- Error: "shadcn-svelte not found" or installation failures
- **Do NOT load** if user already has project running

**MANDATORY - READ ENTIRE FILE: `references/datatable-full.md` when:**
- Implementing tables with 3+ features (sorting + filtering + selection)
- TanStack Table errors mentioning columnDef or getCoreRowModel
- Need row selection with checkboxes across paginated data
- **Do NOT load** for simple static tables (use basic `<table>`)

**MANDATORY - READ ENTIRE FILE: `references/form-patterns.md` when:**
- Multi-step forms (wizard pattern) with validation
- Complex validation (cross-field dependencies, async validation)
- Backend integration with Zod + superforms
- **Do NOT load** for single-field forms or basic validation

**Never load references** for library choice, anti-pattern debugging, or Tailwind v4.1 migration—handle with this core framework.

---

## Quick Decision Trees

### "My table isn't updating"
```
Check in order:
1. Using `get data()` accessor? (not `data: myData`)
2. Using `get` for all state? (sorting, pagination, filters)
3. State updaters handle function AND value? (typeof check)
4. Importing from correct path? (`$lib/components/ui/data-table`)
```

### "Builder undefined in component"
```
Check:
1. Using `asChild let:builder` pattern?
2. Passing `builders={[builder]}` array to child?
3. NOT destructuring builders at module level?
```

### "Tailwind classes not applying"
```
Check:
1. Using `@import "tailwindcss"` (not `@tailwind`)?
2. `@tailwindcss/vite` plugin in vite.config?
3. Plugin before sveltekit() in plugins array?
4. Restarted dev server after vite.config change?
```

---

## Error Recovery Procedures

### When Anti-Pattern #1 Fails (Builder Undefined)
**Recovery steps**:
1. Search codebase for `const { ` in Dialog/Popover components → Remove destructuring
2. Find `<Dialog.Trigger>` without `let:builder` → Add `asChild let:builder`
3. Replace direct props with `builders={[builder]}` array
4. **Fallback**: If still broken, check `bits-ui` version compatibility (needs v1.0+)

### When Anti-Pattern #2 Fails (TanStack Not Updating)
**Recovery steps**:
1. Wrap ALL `createSvelteTable` options in getters: `get data() { return x }`
2. Check state updaters have typeof guard: `typeof updater === "function"`
3. Verify imports: `import { createSvelteTable } from "@tanstack/svelte-table"`
4. **Fallback**: If state still stale, check Svelte version (needs 5.0+), downgrade TanStack to v8.10 if necessary

### When Anti-Pattern #3 Fails (Tailwind Not Loading)
**Recovery steps**:
1. Delete `.svelte-kit/` and `node_modules/.vite/` cache directories
2. Run `npm install @tailwindcss/vite@latest`
3. Verify `tailwindcss.config.js` NOT `tailwind.config.js` (v4.1 naming)
4. **Fallback**: If still broken, check Vite version (needs 5.0+), revert to Tailwind v3 if blocked

---

## Resources

- **Official Docs**: https://www.shadcn-svelte.com/docs (for installation, component gallery)
- **This Skill**: Non-obvious decisions, performance pitfalls, expert patterns
