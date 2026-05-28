# Plane Automation and Agents

Use this reference for Plane OAuth apps, webhooks, and mentionable agents.

## Official Docs

- Build a Plane app: https://developers.plane.so/dev-tools/build-plane-app/overview
- Choose token flow: https://developers.plane.so/dev-tools/build-plane-app/choose-token-flow
- Webhooks: https://developers.plane.so/dev-tools/intro-webhooks
- Agents overview: https://developers.plane.so/dev-tools/agents/overview
- Agent best practices: https://developers.plane.so/dev-tools/agents/best-practices
- Signals and content payload: https://developers.plane.so/dev-tools/agents/signals-content-payload

## OAuth Flow Choice

Prefer bot token flow for autonomous agents, webhook handlers, scheduled automation, and background jobs. Use user token flow only when an action must be performed on behalf of a specific user.

Bot-token installation stores:

- `app_installation_id`
- workspace id and slug
- app bot user id
- access token expiry and granted scopes

Refresh bot tokens using the stored app installation id. Store client secrets and tokens in a secret manager, not in repo files.

## Webhook Handling

Plane webhooks send HTTP POST requests with headers such as:

- `X-Plane-Delivery`
- `X-Plane-Event`
- `X-Plane-Signature`

Validate signatures with the webhook secret and raw payload. Return HTTP 200 quickly, then process slow work asynchronously. Plane retries failed deliveries with backoff, so make handlers idempotent by delivery id.

Supported event families include project, issue or work item, cycle, module, and issue comment events. Treat exact event names as high-drift and verify against current Plane docs or payloads.

## Agent Runs

Plane agents are OAuth apps with app mentions enabled. Users can mention the bot in work item comments. Plane creates an agent run and sends webhook context containing the work item, project, conversation, triggering prompt, and agent run activity.

Agent run activities include prompt, thought, action, response, elicitation, and error. Responses and elicitations create visible comments; thoughts and actions are ephemeral progress.

## Agent Behavior Rules

1. Check the activity signal first.
2. If the signal is `stop`, halt work and send a brief confirmation response.
3. Send an immediate thought activity within a few seconds of receiving a normal webhook.
4. Return the webhook HTTP response quickly.
5. Send progress thoughts for user-meaningful milestones only.
6. Send actions for meaningful tool calls, not every internal function.
7. Send a final response, elicitation, or error activity.
8. Keep technical stack traces and secrets out of Plane comments.

## Long Running Work

Prevent stale runs by sending periodic thought activity while long-running operations continue. Prefer short background jobs that can resume or reconcile by agent run id.

## Safe Agent Writes

Agent write authority should be narrower than human operator authority. Prefer scopes that match the exact resources the app manages, and add allowlists for project identifiers, labels, states, or customer properties when automation is domain-specific.
