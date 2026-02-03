---
name: shadcn-data-table
description: Build powerful data tables using TanStack Table v8 with Svelte 5 and shadcn-svelte components. Use when working with tabular data, building admin interfaces, dashboards, or any UI requiring sortable/filterable/paginated tables. Covers column definitions, cell formatting, row actions, pagination, sorting, filtering, visibility controls, and row selection. Essential for Laneweaver TMS load boards, carrier lists, customer dashboards, and any data-heavy Svelte 5 application.
---

# shadcn-svelte Data Tables

Build feature-rich data tables using TanStack Table v8 with Svelte 5 and shadcn-svelte components.

## Installation

```bash
# Add table and data-table helpers
pnpm dlx shadcn-svelte@latest add table data-table

# Install TanStack Table core
pnpm add @tanstack/table-core

# Add supporting components as needed
pnpm dlx shadcn-svelte@latest add button dropdown-menu input checkbox
```

## Project Structure

```
routes/
  your-route/
    columns.ts              # Column definitions
    data-table.svelte       # Main table component
    data-table-actions.svelte      # Row action menus
    data-table-checkbox.svelte     # Selection checkboxes
    data-table-[feature]-button.svelte  # Sortable headers
    +page.svelte           # Page that uses the table
```

## Core Imports

```ts
// Always needed
import {
  type ColumnDef,
  getCoreRowModel,
} from "@tanstack/table-core";
import {
  createSvelteTable,
  FlexRender,
  renderComponent,
  renderSnippet,
} from "$lib/components/ui/data-table/index.js";

// Feature-specific state types
import type {
  PaginationState,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/table-core";

// Feature-specific row models
import {
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/table-core";
```

## Column Definitions Pattern

Define columns in `columns.ts`:

```ts
import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent, renderSnippet } from "$lib/components/ui/data-table/index.js";
import { createRawSnippet } from "svelte";

export type YourDataType = {
  id: string;
  // ... other fields
};

export const columns: ColumnDef<YourDataType>[] = [
  // Simple text column
  {
    accessorKey: "status",
    header: "Status",
  },
  
  // Formatted cell with snippet
  {
    accessorKey: "amount",
    header: () => {
      const headerSnippet = createRawSnippet(() => ({
        render: () => `<div class="text-end">Amount</div>`,
      }));
      return renderSnippet(headerSnippet);
    },
    cell: ({ row }) => {
      const cellSnippet = createRawSnippet<[{ value: number }]>((getValue) => {
        const { value } = getValue();
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
        return {
          render: () => `<div class="text-end font-medium">${formatted}</div>`,
        };
      });
      return renderSnippet(cellSnippet, { value: row.original.amount });
    },
  },
  
  // Component-based cell (for complex UI)
  {
    id: "actions",
    cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id }),
  },
];
```

## Table Component Pattern (`data-table.svelte`)

### Basic Structure

```svelte
<script lang="ts" generics="TData, TValue">
  import { type ColumnDef, getCoreRowModel } from "@tanstack/table-core";
  import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table/index.js";
  import * as Table from "$lib/components/ui/table/index.js";

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  };

  let { data, columns }: DataTableProps<TData, TValue> = $props();

  const table = createSvelteTable({
    get data() { return data; },
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
</script>

<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head>
              {#if !header.isPlaceholder}
                <FlexRender
                  content={header.column.columnDef.header}
                  context={header.getContext()}
                />
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row data-state={row.getIsSelected() && "selected"}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell>
              <FlexRender
                content={cell.column.columnDef.cell}
                context={cell.getContext()}
              />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">
            No results.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
```

## Feature Implementation

### Pagination

Add state and handlers:

```svelte
<script lang="ts" generics="TData, TValue">
  import { type PaginationState, getPaginationRowModel } from "@tanstack/table-core";
  import { Button } from "$lib/components/ui/button/index.js";
  
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  
  const table = createSvelteTable({
    // ... existing config
    state: {
      get pagination() { return pagination; },
    },
    onPaginationChange: (updater) => {
      pagination = typeof updater === "function" ? updater(pagination) : updater;
    },
    getPaginationRowModel: getPaginationRowModel(),
  });
</script>

<!-- Add controls -->
<div class="flex items-center justify-end space-x-2 pt-4">
  <Button
    variant="outline"
    size="sm"
    onclick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    onclick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>
```

### Sorting

Create sortable header component (`data-table-[field]-button.svelte`):

```svelte
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
  import { Button } from "$lib/components/ui/button/index.js";
  
  let { variant = "ghost", ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps}>
  Email
  <ArrowUpDownIcon class="ms-2" />
</Button>
```

Update column definition:

```ts
{
  accessorKey: "email",
  header: ({ column }) => renderComponent(DataTableEmailButton, {
    onclick: column.getToggleSortingHandler(),
  }),
}
```

Add to table:

```svelte
<script lang="ts" generics="TData, TValue">
  import { type SortingState, getSortedRowModel } from "@tanstack/table-core";
  
  let sorting = $state<SortingState>([]);
  
  const table = createSvelteTable({
    // ... existing config
    state: {
      get sorting() { return sorting; },
    },
    onSortingChange: (updater) => {
      sorting = typeof updater === "function" ? updater(sorting) : updater;
    },
    getSortedRowModel: getSortedRowModel(),
  });
</script>
```

### Filtering

```svelte
<script lang="ts" generics="TData, TValue">
  import { type ColumnFiltersState, getFilteredRowModel } from "@tanstack/table-core";
  import { Input } from "$lib/components/ui/input/index.js";
  
  let columnFilters = $state<ColumnFiltersState>([]);
  
  const table = createSvelteTable({
    // ... existing config
    state: {
      get columnFilters() { return columnFilters; },
    },
    onColumnFiltersChange: (updater) => {
      columnFilters = typeof updater === "function" ? updater(columnFilters) : updater;
    },
    getFilteredRowModel: getFilteredRowModel(),
  });
</script>

<!-- Add filter input -->
<div class="flex items-center py-4">
  <Input
    placeholder="Filter emails..."
    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
    oninput={(e) => table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
    onchange={(e) => table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
    class="max-w-sm"
  />
</div>
```

### Visibility

```svelte
<script lang="ts" generics="TData, TValue">
  import { type VisibilityState } from "@tanstack/table-core";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  
  let columnVisibility = $state<VisibilityState>({});
  
  const table = createSvelteTable({
    // ... existing config
    state: {
      get columnVisibility() { return columnVisibility; },
    },
    onColumnVisibilityChange: (updater) => {
      columnVisibility = typeof updater === "function" ? updater(columnVisibility) : updater;
    },
  });
</script>

<!-- Add visibility dropdown -->
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" class="ms-auto">Columns</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    {#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
      <DropdownMenu.CheckboxItem
        class="capitalize"
        bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
      >
        {column.id}
      </DropdownMenu.CheckboxItem>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Row Selection

Create checkbox component (`data-table-checkbox.svelte`):

```svelte
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  
  let {
    checked = false,
    onCheckedChange = (v) => (checked = v),
    ...restProps
  }: ComponentProps<typeof Checkbox> = $props();
</script>

<Checkbox bind:checked={() => checked, onCheckedChange} {...restProps} />
```

Add select column:

```ts
{
  id: "select",
  header: ({ table }) => renderComponent(DataTableCheckbox, {
    checked: table.getIsAllPageRowsSelected(),
    indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
    onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
    "aria-label": "Select all",
  }),
  cell: ({ row }) => renderComponent(DataTableCheckbox, {
    checked: row.getIsSelected(),
    onCheckedChange: (value) => row.toggleSelected(!!value),
    "aria-label": "Select row",
  }),
  enableSorting: false,
  enableHiding: false,
}
```

Add to table:

```svelte
<script lang="ts" generics="TData, TValue">
  import { type RowSelectionState } from "@tanstack/table-core";
  
  let rowSelection = $state<RowSelectionState>({});
  
  const table = createSvelteTable({
    // ... existing config
    state: {
      get rowSelection() { return rowSelection; },
    },
    onRowSelectionChange: (updater) => {
      rowSelection = typeof updater === "function" ? updater(rowSelection) : updater;
    },
  });
</script>

<!-- Show selected count -->
<div class="text-muted-foreground flex-1 text-sm">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

## Row Actions Pattern

Create actions component (`data-table-actions.svelte`):

```svelte
<script lang="ts">
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  
  let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
        <span class="sr-only">Open menu</span>
        <EllipsisIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
      Copy ID
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>View details</DropdownMenu.Item>
    <DropdownMenu.Item>Edit</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

## Complete Example with All Features

```svelte
<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    type RowSelectionState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
  } from "@tanstack/table-core";
  import {
    createSvelteTable,
    FlexRender,
  } from "$lib/components/ui/data-table/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  type DataTableProps<TData, TValue> = {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
  };

  let { data, columns }: DataTableProps<TData, TValue> = $props();

  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let columnVisibility = $state<VisibilityState>({});
  let rowSelection = $state<RowSelectionState>({});

  const table = createSvelteTable({
    get data() { return data; },
    columns,
    state: {
      get pagination() { return pagination; },
      get sorting() { return sorting; },
      get columnFilters() { return columnFilters; },
      get columnVisibility() { return columnVisibility; },
      get rowSelection() { return rowSelection; },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      pagination = typeof updater === "function" ? updater(pagination) : updater;
    },
    onSortingChange: (updater) => {
      sorting = typeof updater === "function" ? updater(sorting) : updater;
    },
    onColumnFiltersChange: (updater) => {
      columnFilters = typeof updater === "function" ? updater(columnFilters) : updater;
    },
    onColumnVisibilityChange: (updater) => {
      columnVisibility = typeof updater === "function" ? updater(columnVisibility) : updater;
    },
    onRowSelectionChange: (updater) => {
      rowSelection = typeof updater === "function" ? updater(rowSelection) : updater;
    },
  });
</script>

<div class="w-full">
  <div class="flex items-center py-4">
    <Input
      placeholder="Filter..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      oninput={(e) => table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
      onchange={(e) => table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
      class="max-w-sm"
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="outline" class="ms-auto">Columns</Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
          <DropdownMenu.CheckboxItem
            class="capitalize"
            bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
          >
            {column.id}
          </DropdownMenu.CheckboxItem>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>

  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head class="[&:has([role=checkbox])]:ps-3">
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <Table.Row data-state={row.getIsSelected() && "selected"}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell class="[&:has([role=checkbox])]:ps-3">
                <FlexRender
                  content={cell.column.columnDef.cell}
                  context={cell.getContext()}
                />
              </Table.Cell>
            {/each}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

  <div class="flex items-center justify-end space-x-2 pt-4">
    <div class="text-muted-foreground flex-1 text-sm">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div class="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onclick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onclick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div>
</div>
```

## Key Patterns

### Svelte 5 State Management

Always use Svelte 5 runes:
- `$state` for reactive state
- `$props` for component props
- `get` accessors in `createSvelteTable` config

### Cell Rendering Strategies

1. **Simple snippets** (`createRawSnippet`): For basic HTML formatting
2. **Components** (`renderComponent`): For interactive UI, dropdowns, buttons
3. **Direct values**: For plain text or numbers

### State Updater Pattern

All state handlers follow this pattern:

```ts
onStateChange: (updater) => {
  state = typeof updater === "function" ? updater(state) : updater;
}
```

### Common Pitfalls

- Forgetting `get` accessors in state config
- Not binding both `oninput` and `onchange` for filters
- Missing row models (pagination, sorting, filtering)
- Using wrong import path for data-table helpers

## Usage in Pages

```svelte
<!-- routes/your-route/+page.svelte -->
<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  
  let { data } = $props();
</script>

<DataTable data={data.items} {columns} />
```

```ts
// routes/your-route/+page.server.ts
export async function load() {
  const items = await fetchYourData();
  return { items };
}
```
