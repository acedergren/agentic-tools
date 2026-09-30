# Complex Build Workflow

For building complete features requiring multiple shadcn components.

## Phase 1: Requirements Analysis

**Input:** User request for a complete feature/section

**Steps:**

1. Call `shadcn___get_project_registries` - Note all available registries

2. Break down the request into components needed:
   ```
   Example: "login form" needs:
   - Form (validation)
   - Input (email, password)
   - Button (submit)
   - Label (field labels)
   - Card (container)
   - Alert (error messages)
   ```

3. For each identified component:
   - Call `shadcn___search_items_in_registries`
   - Verify it exists in registry
   - Note exact name

4. **Output** component hierarchy:
   ```
   ## Feature: [Name]

   ## Components Required:
   - form (validation and submission)
   - input (email and password fields)
   - button (submit action)
   - card (form container)
   - alert (error display)

   ## Component Hierarchy:
   Card
   └── Form
       ├── Label + Input (email)
       ├── Label + Input (password)
       ├── Button (submit)
       └── Alert (errors)
   ```

## Phase 2: Component Research

**Input:** Component list from Phase 1

**Steps:**

1. For each component:

   a. Get implementation details:
   ```
   shadcn___view_items_in_registries(items: ["@shadcn/component"])
   ```
   - Note file dependencies
   - Note key props

   b. Get examples:
   ```
   shadcn___get_item_examples_from_registries(registries, query: "component-demo")
   ```
   - For forms: get validation examples
   - For data: get loading state examples

2. Get installation command for ALL components at once:
   ```
   shadcn___get_add_command_for_items(items: ["@shadcn-svelte/form", "@shadcn-svelte/input", ...])
   ```

3. **Output** research summary with:
   - Installation commands
   - Key imports for each component
   - Relevant example code snippets
   - Important props to use

## Phase 3: Implementation

**Input:** Requirements + Research from previous phases

**Steps:**

1. Build implementation following:
   - Use EXACT imports from research
   - Follow hierarchy from requirements
   - Adapt examples to match use case
   - Add proper TypeScript types
   - Include state management (useState, form hooks)
   - Add error handling

2. Run audit:
   ```
   shadcn___get_audit_checklist
   ```
   - Verify best practices followed

3. **OUTPUT** complete implementation:
```svelte
<!-- All necessary imports -->
<script lang="ts">
  import { Form, FormControl, FormField } from "$lib/components/ui/form"
  import { Input } from "$lib/components/ui/input"
  import { Button } from "$lib/components/ui/button"

  // Full implementation
</script>
```

4. Include setup instructions:
   - Installation commands needed
   - Where to add the component
   - Any additional setup (providers, configs)

## Example: Login Form

**Phase 1 Output:**
```
Components: card, form, input, button, label, alert
Hierarchy: Card > Form > (Label+Input)*2 + Button + Alert
```

**Phase 2 Output:**
```bash
npx shadcn-svelte@latest add card form input button label alert
```

**Phase 3 Output** (Svelte 5 + sveltekit-superforms + Formsnap):
```svelte
<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { z } from "zod";
  import * as Card from "$lib/components/ui/card";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  let { data } = $props();   // data.form comes from superValidate() in +page.server.ts

  const form = superForm(data.form, { validators: zodClient(loginSchema) });
  const { form: formData, enhance } = form;
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Login</Card.Title>
  </Card.Header>
  <Card.Content>
    <form method="POST" action="?/login" use:enhance class="space-y-4">
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Email</Form.Label>
            <Input {...props} type="email" bind:value={$formData.email} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="password">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Password</Form.Label>
            <Input {...props} type="password" bind:value={$formData.password} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button class="w-full">Login</Form.Button>
    </form>
  </Card.Content>
</Card.Root>
```
