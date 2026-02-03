---
name: tanstack-query
version: 3.0.0
description: |
  TanStack Query v5 expert guidance - migration gotchas (v4→v5 breaking changes),
  performance pitfalls (infinite refetch loops, staleness traps), and decision
  frameworks (when NOT to use queries, SWR vs React Query trade-offs).

  Use when: (1) debugging v4→v5 migration errors (gcTime, isPending, throwOnError),
  (2) infinite refetch loops, (3) SSR hydration mismatches, (4) choosing between
  React Query vs SWR vs fetch, (5) optimistic update patterns not working.

  NOT for basic setup (see official docs). Focuses on non-obvious decisions and
  patterns that cause production issues.

  Triggers: React Query, TanStack Query, v5 migration, refetch loop, stale data,
  SSR hydration, query invalidation, optimistic updates debugging.
user-invocable: true
---

# TanStack Query v5 - Expert Troubleshooting

**Assumption**: You know `useQuery` basics. This covers what breaks in production.

---

## Critical Decision: When NOT to Use React Query

```
Need data fetching?
│
├─ Data from URL (search params, path) → DON'T use queries
│   └─ Use framework loaders (Next.js, Remix) or URL state
│      WHY: Queries cache by key, URL is already your cache key
│
├─ Derived/computed data → DON'T use queries
│   └─ Use useMemo or Zustand
│      WHY: No server, no stale data, no refetch needed
│
├─ Form state → DON'T use queries
│   └─ Use React Hook Form or controlled state
│      WHY: Forms are local state, not server cache
│
├─ WebSocket/realtime data → MAYBE use queries
│   ├─ High-frequency updates (> 1/sec) → DON'T use queries (use Zustand)
│   └─ Low-frequency (<1/min) → Use queries with manual updates
│      WHY: Queries designed for request/response, not streaming
│
└─ REST/GraphQL server state → USE queries
    (This is what React Query is for)
```

**The trap**: Developers use React Query for everything. It's a **server cache**, not a state manager.

---

## Breaking Changes: v4 → v5 Migration Gotchas

### ❌ #1: `cacheTime` Renamed to `gcTime`
**Problem**: Silent failure - code runs but cache doesn't work as expected

```typescript
// WRONG - v4 syntax, silently ignored in v5
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  cacheTime: 10 * 60 * 1000,  // ❌ Ignored in v5
})

// CORRECT - v5 syntax
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  gcTime: 10 * 60 * 1000,  // ✅ Garbage collection time
})
```

**Why it breaks**: TypeScript won't error if using `any` or loose types. Cache appears to work but garbage collects immediately.

### ❌ #2: `isLoading` Removed, Use `isPending`
**Problem**: Loading spinners disappear too early

```typescript
// WRONG - v4 syntax
const { isLoading } = useQuery(...)
if (isLoading) return <Spinner />  // ❌ isLoading undefined in v5

// CORRECT - v5 syntax
const { isPending } = useQuery(...)
if (isPending) return <Spinner />  // ✅ Shows while query pending
```

**Why different**:
- `isLoading` (v4): `true` only for first fetch (no cached data)
- `isPending` (v5): `true` for first fetch + refetches (more accurate)

**Migration trap**: If you have cached data and refetch, `isPending` stays `true` but `isLoading` was `false`. UI shows stale data + spinner in v5.

### ❌ #3: `keepPreviousData` Removed, Use `placeholderData`
**Problem**: Pagination breaks - flickers on page change

```typescript
// WRONG - v4 syntax
useQuery({
  queryKey: ['todos', page],
  queryFn: () => fetchTodos(page),
  keepPreviousData: true,  // ❌ Removed in v5
})

// CORRECT - v5 syntax
useQuery({
  queryKey: ['todos', page],
  queryFn: () => fetchTodos(page),
  placeholderData: (previousData) => previousData,  // ✅ Function form
})
```

**Why it breaks**: `keepPreviousData: true` was boolean. `placeholderData` is data OR function. If you pass `true`, TypeScript error but runtime breaks.

### ❌ #4: Query Functions Must Return Non-Void
**Problem**: Mutations that don't return data break

```typescript
// WRONG - void return breaks v5
queryFn: async () => {
  await api.deleteTodo(id)  // ❌ Returns void
}

// CORRECT - return something
queryFn: async () => {
  await api.deleteTodo(id)
  return { success: true }  // ✅ Return data
}
```

**Why it breaks**: v5 type system requires `Promise<TData>`, not `Promise<void>`. Silent runtime error if using `any`.

---

## Performance Pitfalls

### ❌ Infinite Refetch Loop
**Problem**: Query refetches forever, browser freezes

```typescript
// WRONG - creates infinite loop
useQuery({
  queryKey: ['user', user],  // ❌ Object in key
  queryFn: () => fetchUser(user.id),
})

// WHY IT LOOPS:
// 1. Query runs, gets data
// 2. Component re-renders
// 3. New `user` object created (different reference)
// 4. Key changes → query refetches
// 5. Goto 1 (infinite)

// CORRECT - use primitive values
useQuery({
  queryKey: ['user', user.id],  // ✅ String is stable
  queryFn: () => fetchUser(user.id),
})
```

**Detection**: React DevTools shows component re-rendering every frame. Network tab shows identical requests hammering server.

### ❌ Stale Data Trap
**Problem**: Data never updates despite changes on server

```typescript
// WRONG - data stuck in cache
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: Infinity,  // ❌ Never marks stale
})

// User adds todo on another tab → never sees it

// CORRECT - reasonable staleTime
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 5 * 60 * 1000,  // ✅ 5 minutes
})
```

**Trade-off**:
- `staleTime: 0` → Refetch on every focus/mount (expensive)
- `staleTime: Infinity` → Never refetch (stale data)
- `staleTime: 5min` → Balance (refetch after 5min of inactivity)

### ❌ Over-Invalidation
**Problem**: Unrelated data refetches on every mutation

```typescript
// WRONG - nukes entire cache
onSuccess: () => {
  queryClient.invalidateQueries()  // ❌ Refetches EVERYTHING
}

// User updates profile → todos, posts, comments all refetch

// CORRECT - targeted invalidation
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['user', userId] })  // ✅ Only user
}
```

**Why it hurts**: 100 queries in cache → 100 network requests on every mutation. Kills mobile users.

---

## Decision Frameworks

### When to Use Optimistic Updates vs Invalidation

```
Mutation completes...
│
├─ Simple list append/prepend → Optimistic (useMutationState)
│   └─ Add todo, add comment, add item
│      WHY: No complex logic, just show pending item
│
├─ Complex computed data → Invalidation
│   └─ Change affects aggregates, filters, sorts
│      WHY: Server computes, client doesn't duplicate logic
│
├─ Risk of conflicts → Invalidation
│   └─ Multiple users editing same data
│      WHY: Optimistic update may be wrong, let server resolve
│
└─ Must feel instant → Optimistic + rollback on error
    └─ Toggle like, toggle favorite
       WHY: User expects immediate feedback
```

### React Query vs SWR

```
Choose React Query when:
✅ Need fine-grained cache control (gc, stale times)
✅ Complex invalidation patterns
✅ Optimistic updates with rollback
✅ Infinite queries (pagination)
✅ Already using TanStack ecosystem (Table, Router)

Choose SWR when:
✅ Simpler API (less configuration)
✅ Automatic revalidation on focus is main use case
✅ Smaller bundle size priority
✅ Using Next.js (first-party support)
```

**Real-world**: React Query wins for complex apps, SWR wins for simple dashboards.

---

## SSR Hydration Patterns (Next.js App Router)

### ❌ Common Hydration Mismatch

```typescript
// WRONG - server renders loading, client renders data
function Page() {
  const { data, isPending } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  if (isPending) return <div>Loading...</div>  // ❌ Mismatch
  return <div>{data.map(...)}</div>
}

// SERVER: Renders "Loading..."
// CLIENT: Has cached data → renders list
// RESULT: Hydration error
```

### ✅ Correct Pattern with Prefetch

```typescript
// app/page.tsx (Server Component)
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  // Prefetch on server
  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />  {/* Client Component */}
    </HydrationBoundary>
  )
}

// components/TodoList.tsx (Client Component)
'use client'

export function TodoList() {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  // No isPending check - data guaranteed from server
  return <div>{data.map(...)}</div>
}
```

**Why it works**: Server prefetches, client hydrates with same data, no mismatch.

---

## Debugging Commands

### Find refetch loops
```typescript
// Add to QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onSuccess: (data, query) => {
        console.count(`Refetch: ${query.queryKey}`)
        // If count > 10 in 1 second → infinite loop
      }
    }
  }
})
```

### Visualize cache state
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Add to app
<ReactQueryDevtools initialIsOpen={false} />
// Click query → see refetch count, staleness, gc time
```

### Test staleTime behavior
```typescript
// Force immediate stale (for testing)
queryClient.invalidateQueries({ queryKey: ['todos'] })

// Check if query is stale
const state = queryClient.getQueryState(['todos'])
console.log(state?.isInvalidated)  // true = will refetch on next mount
```

---

## When to Load Full Reference

**LOAD `references/v5-features.md` when:**
- User needs code examples for new v5 features (useMutationState, throwOnError)
- Complete API reference needed

**LOAD `references/migration-guide.md` when:**
- Migrating large codebase from v4 to v5
- Need exhaustive breaking changes list

**Do NOT load references** for troubleshooting - use this core framework.

---

## Resources

- **Official Docs**: https://tanstack.com/query/latest (for API reference)
- **This Skill**: Production issues, migration gotchas, decision frameworks
