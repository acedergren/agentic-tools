---
name: shadcn-svelte
description: "Use when working with shadcn-svelte components, TanStack Table in Svelte 5, or Tailwind v4.1. Covers non-obvious reactivity bugs, library selection trade-offs, and migration pitfalls not in the official docs. Keywords: shadcn-svelte, TanStack Table, Tailwind v4.1, Svelte 5 runes, bits-ui, superforms, data table, svelte-check. Triggers on "use shadcn-svelte" or "build Svelte data table"."
---
# shadcn-svelte Expert Guidance

## When to Use

Load this skill when the user request matches the frontmatter description for shadcn-svelte Expert Guidance.

**Assumption**: You know how to run `npx shadcn-svelte@latest add`. This skill covers what the docs won't tell you.

## NEVER

- Never copy Svelte 4 / Bits UI 0.x examples (`asChild let:builder`, `builders={[builder]}`, `let:attrs`, `on:click`) into a Svelte 5 project — current shadcn-svelte uses Bits UI 1.x, where a trigger renders a custom element through the `{#snippet child({ props })}` snippet and you spread `props`.
- Never pass `data: myData` directly to `createSvelteTable` — Svelte 5 runes require getter accessors or data never updates.
- Never use `@tailwind base/components/utilities` in Tailwind v4.1 — directives silently do nothing; use `@import "tailwindcss"`.
- Never expect `npm update` to patch shadcn components — they're forked into your codebase; you own maintenance.
- Never start with TanStack Table for a simple display table — the complexity cliff is steep (each feature adds 100–200 lines).

## Library Selection

```
Need Svelte UI components?
│
├─ Own the code, heavy customization → shadcn-svelte
│   ├─ Complex data tables → TanStack integration built-in
│   └─ Unique design system → copy-paste, modify freely
│
├─ Ship fast, customize later → Skeleton UI
│   └─ Pre-built themes, npm package (auto-updates)
│
├─ Accessibility-first, bring own styles → Melt UI
│   └─ Headless primitives only
│
└─ Nothing fits → Build from Bits UI primitives
```

**Key trade-off**: shadcn is NOT a library — you fork components into `$lib/components/ui/` and own security patches, bug fixes, and upgrades permanently.

**Data table complexity cliff:**
```
Simple table: ~50 lines
+ sorting:    +100 lines
+ filtering:  +150 lines
+ selection:  +200 lines
+ visibility: +100 lines
```
Start with `<table>`, upgrade to TanStack only when you need 2+ features.

## Critical Anti-Patterns

### #1: Svelte 4 trigger syntax in a Svelte 5 project

```svelte
<!-- WRONG (Bits UI 0.x / Svelte 4): asChild and builders no longer exist -->
<Dialog.Trigger asChild let:builder>
  <Button builders={[builder]}>Open</Button>
</Dialog.Trigger>

<!-- RIGHT (Bits UI 1.x / Svelte 5): simplest form — style the trigger itself -->
<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Open</Dialog.Trigger>

<!-- RIGHT: render your own component via the child snippet and spread props -->
<Dialog.Trigger>
  {#snippet child({ props })}
    <Button {...props} variant="outline">Open</Button>
  {/snippet}
</Dialog.Trigger>
```

Symptom: compile errors about `let:` directives or `asChild`, or a trigger that renders but doesn't
open (props not spread onto the element).

### #2: TanStack Table — Missing `get` Accessors

**The most common TanStack + Svelte 5 bug.** Table renders correctly, pagination UI works, but sorting/filtering clicks do nothing.

```typescript
// WRONG - data never updates after init
const table = createSvelteTable({ data: myData, state: { sorting } });

// CORRECT - reactive getters
const table = createSvelteTable({
  get data() { return myData; },
  state: {
    get sorting() { return sorting; }
  },
  onSortingChange: (updater) => {
    sorting = typeof updater === "function" ? updater(sorting) : updater;
  }
});
```

Every `onXChange` handler must handle both function and value: `typeof updater === "function" ? updater(old) : updater`.

### #3: Tailwind v4.1 — Silent Migration Failure

```css
/* WRONG - silently does nothing in v4.1 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CORRECT */
@import "tailwindcss";
```

```typescript
// vite.config.ts - plugin order matters
import tailwindcss from '@tailwindcss/vite'
plugins: [tailwindcss(), sveltekit()]  // tailwindcss BEFORE sveltekit
```

Symptom: Styles work in dev (cached), production build has zero Tailwind classes. No error.

### #4: superforms — Destructuring Before Bind

```typescript
// WRONG - formData becomes stale reference, validation breaks
const { form: formData } = superForm(data.form);
formData.email = value;

// CORRECT - use bind: to connect to store
const { form: formData } = superForm(data.form);
// In template: <Input bind:value={$formData.email} />
```

## Expert Patterns

### CSS Variable Theme (Tailwind v4.1)

```css
@import "tailwindcss";

@layer theme {
  :root {
    --color-primary: 0 0% 9%;       /* space-separated HSL enables /alpha */
    --color-destructive: 0 84% 60%;
  }
  .dark { --color-primary: 0 0% 98%; }
}

/* Alpha via / syntax */
.overlay { @apply bg-[hsl(var(--color-primary)/0.5)]; }
```

Space-separated HSL format (not `hsl(H,S,L)`) is required for the `/alpha` Tailwind syntax to work.

### Form Field Pattern

```svelte
<Form.Field {form} name="email">
  <Form.Control>
    {#snippet children({ props })}
      <Form.Label>Email</Form.Label>
      <Input {...props} type="email" bind:value={$formData.email} />
    {/snippet}
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>
```

Formsnap v2 passes `props` (id, name, aria attributes) through the `children` snippet; spread them on the
input. `<Form.FieldErrors />` auto-wires to validation state.

## Debugging Checklists

### Table not updating
1. `get data()` accessor used (not `data: myData`)?
2. All state wrapped in `get` (sorting, pagination, filters)?
3. Every `onXChange` has `typeof updater === "function"` guard?

### Trigger renders but does nothing
1. Using `{#snippet child({ props })}` (not `asChild let:builder`)?
2. `{...props}` spread onto the rendered element?
3. Component versions match (Svelte 5 + Bits UI 1.x + current shadcn-svelte components)?

### Tailwind classes missing
1. `@import "tailwindcss"` (not `@tailwind` directives)?
2. `@tailwindcss/vite` plugin in `vite.config`?
3. Plugin before `sveltekit()` in array?
4. Deleted `.svelte-kit/` and `node_modules/.vite/` cache?

## When to Load References

**Load `references/shadcn-datatable.md`** when:
- Implementing 3+ table features (sorting + filtering + selection)
- TanStack errors mentioning `columnDef` or `getCoreRowModel`
- Row selection with checkboxes across paginated data

**Load `references/workflows.md`** for multi-phase component builds (install → compose → form wiring).

Do NOT load references for library choice, anti-pattern debugging, or Tailwind migration — handle with this file.

Last verified: 2026-09-30 (bits-ui.com child snippet docs; formsnap.dev Control docs; shadcn-svelte dialog docs)

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
