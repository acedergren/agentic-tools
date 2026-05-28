---
name: agent-webhook-automation
description: "Use when the user asks to \"build Plane agent\", \"handle Plane webhook\", \"create Plane OAuth app\", \"respond to Plane @mentions\", or \"send Plane agent run activity\"."
version: 1.0.0
keywords:
  - "Plane agents"
  - "webhooks"
  - "OAuth app"
  - "bot token"
  - "agent runs"
  - "agent activities"
aliases:
  - "plane-agents"
  - "plane-webhooks"
domains:
  - "plane"
  - "plane-agent"
---
# Plane Agent and Webhook Automation

Use this skill for Plane OAuth apps, webhooks, mentionable agents, agent runs, activity payloads, and event-driven automation.

## When to Use

Load this skill for: the user asks to "build Plane agent", "handle Plane webhook", "create Plane OAuth app", "respond to Plane @mentions", "send Plane agent run activity", or "automate Plane from events".

## Do NOT load this skill when

Do not load this skill for manual one-off REST operations, normal work item edits, wiki pages, or read-only reporting. Use the relevant content or API skill.

## Automation Workflow

1. Choose OAuth flow: bot token for autonomous apps, user token only for user-attributed actions.
2. Define required scopes before creating credentials.
3. Store client id, client secret, tokens, webhook secret, and installation ids in a secret manager.
4. Verify webhook signatures with the raw request payload.
5. Return HTTP 200 quickly and process expensive work asynchronously.
6. For agents, check `stop` signals first.
7. Send an immediate thought activity, then progress thoughts for meaningful milestones.
8. Send response, elicitation, or error activity when complete.
9. Reconcile by delivery id or agent run id.

## Agent Activity Guidance

- Thought: concise progress visible during processing.
- Action: meaningful external action or tool call.
- Response: final visible comment.
- Elicitation: request for user input.
- Error: friendly failure, no stack trace.

## Webhook Safety

Make handlers idempotent. Plane retries failed webhook deliveries, so write operations must tolerate duplicate deliveries. Store processed delivery ids or use deterministic target keys.

## References

- `../references/automation-and-agents.md`
- `../references/api-foundation.md`
- `../references/tool-transports.md`

## NEVER Do This

- NEVER block webhook response while waiting for long LLM calls or bulk API work.
- NEVER skip webhook signature verification.
- NEVER expose stack traces, internal prompts, secrets, or raw customer-sensitive payloads in Plane comments.
- NEVER ignore a `stop` signal.
- NEVER grant broad write scopes when the automation only needs one resource family.

## Arguments

$ARGUMENTS: Optional app goal, webhook URL, event type, OAuth flow, required scopes, agent run id, activity payload, stop-signal behavior, or deployment target.
