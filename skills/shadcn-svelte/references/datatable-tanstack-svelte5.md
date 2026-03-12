---
name: datatable-tanstack-svelte5
description: Reference for production DataTable styling and state management with Tailwind v4.1 (@tailwindcss/vite), CSS variables, and Svelte 5. Covers row states, responsive design, and zero-runtime CSS patterns.
related_skill: shadcn-svelte
---

# DataTable: Tailwind v4.1 + TanStack Table v8 + Svelte 5

**This is a reference document.** Load this when building production DataTable components. See SKILL.md for basic setup.

## Overview

DataTables require careful styling for:
- Row states (hover, selected, sorted)
- Responsive layouts
- Dark mode support
- Performance with large datasets

**With Tailwind v4.1 + @tailwindcss/vite:**
- Zero-runtime CSS via Vite plugin
- CSS variables for theming (no PostCSS needed)
- Automatic content scanning
- Dynamic utilities for row states

## Tailwind v4.1 Setup for DataTables

### CSS Variables in app.css

```css
@import "tailwindcss";

@layer theme {
  :root {
    /* Table colors */
    --color-table-bg: 0 0% 100%;
    --color-table-row-hover: 0 0% 96.1%;
    --color-table-row-selected: 210 40% 96%;
    --color-table-border: 0 0% 89.8%;
    --color-table-text: 0 0% 3.6%;
    --color-table-header-bg: 0 0% 94.1%;
  }

  .dark {
    --color-table-bg: 0 0% 14.9%;
    --color-table-row-hover: 0 0% 22%;
    --color-table-row-selected: 210 100% 35%;
    --color-table-border: 0 0% 22%;
    --color-table-text: 0 0% 98%;
    --color-table-header-bg: 0 0% 22%;
  }
}

@layer utilities {
  .table-cell {
    @apply px-4 py-3 text-sm;
  }

  .table-row-hover {
    @apply hover:bg-[hsl(var(--color-table-row-hover))];
  }

  .table-row-selected {
    @apply bg-[hsl(var(--color-table-row-selected))] hover:bg-[hsl(var(--color-table-row-selected))] border-l-4 border-l-primary;
  }

  .table-header {
    @apply bg-[hsl(var(--color-table-header-bg))] font-semibold text-xs uppercase tracking-wide;
  }
}
```

### tailwind.config.js (v4.1 minimal)

```javascript
export default {
  theme: {
    extend: {
      colors: {
        'table-bg': 'hsl(var(--color-table-bg))',
        'table-row-hover': 'hsl(var(--color-table-row-hover))',
        'table-row-selected': 'hsl(var(--color-table-row-selected))',
        'table-border': 'hsl(var(--color-table-border))',
        'table-text': 'hsl(var(--color-table-text))',
        'table-header': 'hsl(var(--color-table-header-bg))',
      },
    },
  },
}
```

## Installation

```bash
pnpm dlx shadcn-svelte@latest add table data-table button dropdown-menu checkbox
pnpm i @tanstack/svelte-table
```

## Architecture: State Management with Tailwind v4.1

**Use this pattern** for all data tables to avoid state synchronization issues.

```svelte
<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import {
    addPagination,
    addSortBy,
    addFilters,
    addColumnVisibility,
    addRowSelection,
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";

  interface Row {
    id: string;
    name: string;
    email: string;
    amount: number;
    status: "active" | "inactive";
  }

  // 1. Data as reactive state (Svelte 5 rune)
  let data = $state<Row[]>([
    { id: "1", name: "Alice", email: "alice@example.com", amount: 100, status: "active" },
    { id: "2", name: "Bob", email: "bob@example.com", amount: 200, status: "inactive" },
  ]);

  // 2. Table instance (derived from reactive data)
  const dataStore = readable(data);

  // 3. Create table with plugins
  const table = createTable(dataStore, {
    page: addPagination({ initialPageSize: 10 }),
    sort: addSortBy(),
    filters: addFilters(),
    select: addRowSelection(),
    colVis: addColumnVisibility(),
  });

  // 4. Define columns (static structure recommended)
  const columns = table.createColumns([
    table.column({
      accessor: "name",
      header: "Name",
      cell: (item) => item.name,
      plugins: {
        sort: {
          disable: false,
        },
        filter: {
          exclude: false,
        },
      },
    }),
    table.column({
      accessor: "email",
      header: "Email",
      cell: (item) => item.email,
    }),
    table.column({
      accessor: "amount",
      header: "Amount",
      cell: (item) => `$${item.amount}`,
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      accessor: "status",
      header: "Status",
      cell: (item) => item.status,
      plugins: {
        filter: {
          exclude: false,
        },
      },
    }),
  ]);

  // 5. Derive table state
  const { headerRows, pageRows, tableAttrs } = table.createVM(columns);
</script>
```

## Row Selection with Tailwind v4.1

Use v4.1 utilities with CSS variables for selected state styling:

```svelte
<script lang="ts">
  import * as Checkbox from "$lib/components/ui/checkbox";
  import { cn } from "$lib/utils";
  
  let selectedRows = $state<Set<string>>(new Set());

  function toggleRowSelection(id: string) {
    if (selectedRows.has(id)) {
      selectedRows.delete(id);
    } else {
      selectedRows.add(id);
    }
    selectedRows = selectedRows;
  }

  $derived isSelected = (id: string) => selectedRows.has(id);
</script>

<Table.Body>
  {#each $pageRows as row (row.id)}
    {@const rowSelected = isSelected(row.original.id)}
    <Table.Row
      class={cn(
        "table-row-hover transition-colors",
        rowSelected && "table-row-selected"
      )}
    >
      <Table.Cell class="w-12">
        <Checkbox.Root
          checked={rowSelected}
          onCheckedChange={() => toggleRowSelection(row.original.id)}
        />
      </Table.Cell>
      {#each row.cells as cell (cell.id)}
        <Table.Cell class="table-cell">
          <Render this={cell.render()} />
        </Table.Cell>
      {/each}
    </Table.Row>
  {/each}
</Table.Body>
```

**Key v4.1 patterns:**
- `cn()` for conditional class merging (no runtime overhead)
- `table-row-selected` custom utility with CSS variables
- `transition-colors` for smooth state changes
- No `@apply` overrides needed—compose utilities directly

## Responsive Table with Tailwind v4.1

Use v4.1 utilities for responsive overflow handling:

```svelte
<script lang="ts">
  import { cn } from "$lib/utils";
</script>

<div class="w-full overflow-x-auto border border-[hsl(var(--color-table-border))] rounded-lg">
  <table class={cn(
    "w-full border-collapse",
    "text-[hsl(var(--color-table-text))]",
  )}>
    <thead class="table-header">
      {#each $headerRows as headerRow (headerRow.id)}
        <tr>
          {#each headerRow.cells as cell (cell.id)}
            <th class="table-cell text-left">
              <Render this={cell.render()} />
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each $pageRows as row (row.id)}
        <tr class="table-row-hover border-b border-[hsl(var(--color-table-border))]">
          {#each row.cells as cell (cell.id)}
            <td class="table-cell">
              <Render this={cell.render()} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Responsive: hide columns on mobile */
  @media (max-width: 640px) {
    :global(th:nth-child(n+3)),
    :global(td:nth-child(n+3)) {
      @apply hidden;
    }
  }
</style>
```

## Sorting with Tailwind v4.1

```svelte
<script lang="ts">
  import { ChevronDown, ChevronUp, ChevronsUpDown } from "@lucide/svelte";
  import { cn } from "$lib/utils";

  function handleSort(columnId: string) {
    table.toggleSort(columnId);
  }
</script>

<Table.Header>
  {#each $headerRows as headerRow (headerRow.id)}
    <Table.Row>
      {#each headerRow.cells as cell (cell.id)}
        <Table.Head>
          <button
            on:click={() => handleSort(cell.id)}
            class={cn(
              "flex items-center gap-2",
              "hover:bg-[hsl(var(--color-table-row-hover))]",
              "px-2 py-1 rounded transition-colors"
            )}
          >
            <Render this={cell.render()} />
            {#if cell.colDef.plugins?.sort?.disable === false}
              <ChevronsUpDown class="w-4 h-4 opacity-50" />
            {/if}
          </button>
        </Table.Head>
      {/each}
    </Table.Row>
  {/each}
</Table.Header>
```

## Filtering & Search

```svelte
<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { debounce } from "lodash-es";

  let searchTerm = $state("");
  let columnFilters = $state([]);

  const debouncedFilter = debounce((value: string) => {
    columnFilters = value 
      ? [{ id: "name", value }]
      : [];
  }, 300);

  function handleSearch(value: string) {
    searchTerm = value;
    debouncedFilter(value);
  }
</script>

<div class="mb-4">
  <Input
    type="text"
    placeholder="Filter by name..."
    value={searchTerm}
    on:input={(e) => handleSearch(e.currentTarget.value)}
    class="max-w-sm"
  />
</div>
```

## Tailwind v4.1 + Svelte 5 Patterns

**Use `cn()` for conditional styling (zero-runtime overhead):**

```svelte
<script lang="ts">
  import { cn } from "$lib/utils";

  interface Props {
    selected?: boolean;
    disabled?: boolean;
  }

  let { selected = false, disabled = false }: Props = $props();

  $derived rowClasses = cn(
    "table-row-hover px-4 py-3",
    selected && "table-row-selected",
    disabled && "opacity-50 cursor-not-allowed",
  );
</script>

<tr class={rowClasses}>
  <slot />
</tr>
```

**Combine CSS variables with utilities:**

```svelte
<!-- Use color tokens via CSS variables + Tailwind utilities -->
<div class="bg-[hsl(var(--color-table-row-selected))] border-l-4 border-l-primary">
  Styled with CSS variables + Tailwind utilities
</div>
```

**Performance: Use `@layer utilities` for reusable patterns:**

```css
@layer utilities {
  .table-cell {
    @apply px-4 py-3 text-sm border-b border-[hsl(var(--color-table-border))];
  }

  .table-row-hover {
    @apply hover:bg-[hsl(var(--color-table-row-hover))] transition-colors;
  }

  .table-row-selected {
    @apply bg-[hsl(var(--color-table-row-selected))] border-l-4 border-l-primary;
  }
}
```

## Common Pitfalls (v4.1)

| Issue | Cause | Fix |
|-------|-------|-----|
| Colors don't update in dark mode | CSS variables not defined in `.dark` | Add all variables to both `:root` and `.dark` in app.css |
| Dynamic classes don't compile | Tailwind can't parse dynamic strings | Use template literals or `cn()` utility, not string concatenation |
| Styles flashing on load | CSS not imported in layout | Ensure `import '../app.css'` in root `+layout.svelte` |
| Table layout breaks on mobile | No responsive utilities applied | Use `@media` queries or responsive classes (`sm:hidden`) |

## Performance Optimization

**Virtual scrolling for 1000+ rows:**

```svelte
<script lang="ts">
  import { VirtualScroller } from "@sveltejs/svelte-virtual";
</script>

<VirtualScroller items={$pageRows} let:item>
  <tr class="table-row-hover">
    <!-- render row -->
  </tr>
</VirtualScroller>
```

**Debounce filters (reduce re-renders):**

```svelte
<script lang="ts">
  import { debounce } from "lodash-es";

  const debouncedFilter = debounce((value: string) => {
    columnFilters = [{ id: "name", value }];
  }, 300);
</script>
```

## Testing DataTables

```typescript
import { render, screen } from "@testing-library/svelte";
import DataTable from "./DataTable.svelte";

it("applies selected row class", async () => {
  render(DataTable, { props: { data: mockData } });
  const row = screen.getByText("Alice").closest("tr");
  expect(row).toHaveClass("table-row-selected");
});

it("respects dark mode CSS variables", () => {
  document.documentElement.classList.add("dark");
  const table = screen.getByRole("table");
  const computed = window.getComputedStyle(table);
  expect(computed.backgroundColor).toBe("rgb(38, 38, 38)"); // dark mode value
});
```

## Complete Example Component

```svelte
<!-- src/lib/components/DataTable.svelte -->
<script lang="ts">
  import { createTable, Render } from "svelte-headless-table";
  import { addPagination, addSortBy } from "svelte-headless-table/plugins";
  import { cn } from "$lib/utils";
  import * as Table from "$lib/components/ui/table";
  import { Checkbox } from "$lib/components/ui/checkbox";

  interface Row {
    id: string;
    name: string;
    email: string;
  }

  let { data }: { data: Row[] } = $props();
  let selectedRows = $state<Set<string>>(new Set());

  const table = createTable(data, {
    page: addPagination({ initialPageSize: 10 }),
    sort: addSortBy(),
  });

  const columns = table.createColumns([
    table.column({
      accessor: "name",
      header: "Name",
      cell: (item) => item.name,
    }),
    table.column({
      accessor: "email",
      header: "Email",
      cell: (item) => item.email,
    }),
  ]);

  const { headerRows, pageRows } = table.createVM(columns);
</script>

<div class="border border-[hsl(var(--color-table-border))] rounded-lg overflow-hidden">
  <table class="w-full">
    <thead class="table-header">
      {#each $headerRows as headerRow (headerRow.id)}
        <tr>
          {#each headerRow.cells as cell (cell.id)}
            <th class="table-cell text-left">
              <Render this={cell.render()} />
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each $pageRows as row (row.id)}
        {@const selected = selectedRows.has(row.original.id)}
        <tr
          class={cn(
            "table-row-hover border-b border-[hsl(var(--color-table-border))]",
            selected && "table-row-selected",
          )}
        >
          <td class="table-cell w-12">
            <Checkbox.Root
              checked={selected}
              onCheckedChange={() => {
                if (selected) {
                  selectedRows.delete(row.original.id);
                } else {
                  selectedRows.add(row.original.id);
                }
                selectedRows = selectedRows;
              }}
            />
          </td>
          {#each row.cells as cell (cell.id)}
            <td class="table-cell">
              <Render this={cell.render()} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
```

## Resources

- **Tailwind v4.1**: https://tailwindcss.com/docs/v4
- **Vite Plugin**: https://tailwindcss.com/docs/installation/using-vite
- **TanStack Table**: https://tanstack.com/table/v8/docs/guide/tables
- **shadcn-svelte**: https://www.shadcn-svelte.com/docs
- **Svelte 5 Runes**: https://svelte.dev/docs/svelte/$state
