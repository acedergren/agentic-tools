---
name: tanstack-query
version: 3.0.0
description: "Use when debugging TanStack Query / React Query issues: v4→v5 migration errors (gcTime, isPending, throwOnError), infinite refetch loops, SSR hydration mismatches, choosing between React Query vs SWR, or optimistic update patterns not working. NOT for basic useQuery setup."
user-invocable: true
---

# TanStack Query v5 - Expert Troubleshooting

**Assumption**: You know `useQuery` basics. This covers what breaks in production.

## Arguments

- `$ARGUMENTS`: Query bug, migration issue, or caching decision to analyze
  - Example: `/tanstack-query infinite refetch loop on dashboard`
  - Example: `/tanstack-query v4 to v5 cacheTime issue`
  - If empty: ask which TanStack Query issue is in scope

---

## Before Using React Query: Strategic Assessment

### When NOT to Use React Query

```
Need data fetching?
│
├─ Data from URL (search params, path) → DON'T use queries
│   └─ Use framework loaders (Next.js, Remix)
│      WHY: Queries cache by key, URL is already your cache key
│
├─ Derived/computed data → DON'T use queries
│   └─ Use useMemo or Zustand
│      WHY: No server, no stale data, no refetch needed
│
├─ Form state → DON'T use queries
│   └─ Use React Hook Form or controlled state
│
├─ WebSocket/realtime (> 1/sec) → DON'T use queries
│   └─ Use Zustand; queries are designed for request/response, not streaming
│
└─ REST/GraphQL server state → USE queries ✅
```

**The trap**: Developers use React Query for everything. It's a **server cache**, not a state manager.

### staleTime Selection

| Update frequency | Recommended staleTime |
| ---------------- | --------------------- |
| Real-time (>1/sec) | WebSocket + Zustand instead |
| Frequent (<1/min) | 30s–1min |
| Moderate (5–30min) | 5min (default) |
| Infrequent (>1hr) | 30min+ |
| Critical (money, auth) | 0 (always fresh) |

---

## Breaking Changes: v4 → v5 Migration Gotchas

### ❌ #1: `cacheTime` Renamed to `gcTime`
**Failure mode**: Silent — code runs, TypeScript doesn't error, cache garbage-collects immediately.

```typescript
// WRONG - silently ignored in v5
useQuery({ queryKey: ['todos'], queryFn: fetchTodos, cacheTime: 10 * 60 * 1000 })

// CORRECT
useQuery({ queryKey: ['todos'], queryFn: fetchTodos, gcTime: 10 * 60 * 1000 })
```

**Debug signal**: DevTools shows 0ms gcTime despite setting 10 minutes.

### ❌ #2: `isLoading` Removed → Use `isPending`
**Failure mode**: `if (isLoading)` evaluates falsy (undefined), spinner never shows.

```typescript
// WRONG - isLoading is undefined in v5
const { isLoading } = useQuery(...)

// CORRECT
const { isPending } = useQuery(...)
```

**Semantic difference**: `isPending` stays `true` during refetches with cached data — `isLoading` did not. Causes "stale data + spinner simultaneously" if naively swapped.

### ❌ #3: `keepPreviousData` → `placeholderData`
**Failure mode**: Pagination flickers on page change.

```typescript
// WRONG
useQuery({ queryKey: ['todos', page], keepPreviousData: true })

// CORRECT - function form required
useQuery({
  queryKey: ['todos', page],
  placeholderData: (previousData) => previousData,
})
```

### ❌ #4: Query Functions Must Return Non-Void
**Failure mode**: Silent runtime error when using `any` types.

```typescript
// WRONG - void return
queryFn: async () => { await api.deleteTodo(id) }

// CORRECT
queryFn: async () => { await api.deleteTodo(id); return { success: true } }
```

---

## Performance Pitfalls

### ❌ Infinite Refetch Loop
**Cause**: Object or array reference in `queryKey` — new reference on every render triggers new query.

```typescript
// WRONG - object in key = new reference each render = infinite loop
useQuery({ queryKey: ['user', user], queryFn: () => fetchUser(user.id) })

// CORRECT - use stable primitives
useQuery({ queryKey: ['user', user.id], queryFn: () => fetchUser(user.id) })
```

**Detection**: Network tab shows identical requests >10/sec. React DevTools Profiler shows constant re-renders.

**Fallback** (when key must contain object):
```typescript
const stableKey = useMemo(() => ['user', user], [user.id])
useQuery({ queryKey: stableKey, queryFn: () => fetchUser(user.id), structuralSharing: false })
```

### ❌ Stale Data Trap
**Cause**: `staleTime: Infinity` — data never marked stale regardless of server changes.

**Detection**: Network tab shows zero requests after initial load. Users report "data doesn't update" but devs can't reproduce (devs refresh frequently, clearing cache).

**Fix**: Use reasonable staleTime. If still stale: `queryClient.invalidateQueries({ queryKey: ['your-key'] })`.

### ❌ Over-Invalidation
**Cause**: `queryClient.invalidateQueries()` with no filter nukes entire cache → all queries refetch.

```typescript
// WRONG - refetches 100 queries on every mutation
onSuccess: () => { queryClient.invalidateQueries() }

// CORRECT - targeted
onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['user', userId] }) }
```

---

## Decision Frameworks

### Optimistic Updates vs Invalidation

```
Mutation completes...
│
├─ Simple list append/prepend → Optimistic (useMutationState)
│   └─ Add todo, add comment — no complex logic needed
│
├─ Complex computed data → Invalidation
│   └─ Aggregates, filters, sorts — let server compute
│
├─ Risk of conflicts (multi-user) → Invalidation
│   └─ Optimistic update may be wrong; let server resolve
│
└─ Must feel instant → Optimistic + rollback on error
    └─ Toggle like, toggle favorite
```

### React Query vs SWR

| Prefer React Query | Prefer SWR |
| ------------------ | ---------- |
| Fine-grained gc/stale control | Simpler API (less config) |
| Complex invalidation patterns | Smaller bundle size priority |
| Optimistic updates with rollback | Next.js (first-party support) |
| Infinite queries / pagination | Simple dashboard use case |
| Already in TanStack ecosystem | |

---

## SSR Hydration (Next.js App Router)

### ❌ Mismatch Pattern
Server renders `"Loading..."`, client has cached data → hydration error.

### ✅ Prefetch Pattern

```typescript
// app/page.tsx (Server Component)
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({ queryKey: ['todos'], queryFn: fetchTodos })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />
    </HydrationBoundary>
  )
}

// components/TodoList.tsx ('use client')
export function TodoList() {
  const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
  // No isPending check — data guaranteed from server prefetch
  return <div>{data.map(...)}</div>
}
```

**Hydration mismatch fallback**: Pass as `initialData` via props instead of prefetch.

---

## Debugging Commands

```typescript
// Find refetch loops — add to QueryClient defaultOptions
onSuccess: (data, query) => { console.count(`Refetch: ${query.queryKey}`) }
// Count > 10 in 1 second = infinite loop

// Check cache state
const state = queryClient.getQueryState(['todos'])
console.log(state?.isInvalidated)

// Nuclear cache clear
queryClient.removeQueries({ queryKey: ['your-key'] })
queryClient.refetchQueries({ queryKey: ['your-key'] })
// Or: queryClient.clear()
```

```bash
# Find v4 property names still in codebase
grep -r "cacheTime\|isLoading\|keepPreviousData" src/
```

Add `<ReactQueryDevtools initialIsOpen={false} />` to visualize cache state, refetch counts, and staleness.

---

## When to Load Full Reference

**READ `references/v5-features.md`** when using 3+ v5-specific features simultaneously (useMutationState, throwOnError, infinite queries, suspense mode).

**READ `references/migration-guide.md`** when migrating a codebase with 10+ query usages or running codemods.

**Do NOT load references** for single breaking change fixes, basic troubleshooting, or simple optimistic updates — all covered above.

---

## Resources

- **Official Docs**: https://tanstack.com/query/latest
