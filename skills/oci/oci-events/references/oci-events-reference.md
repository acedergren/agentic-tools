# OCI Events Reference

Use this as a source map for Events rules, filters, and actions.

## Official Oracle Sources

- Events overview: https://docs.oracle.com/en-us/iaas/Content/Events/Concepts/eventsoverview.htm
- Creating event rules: https://docs.oracle.com/en-us/iaas/Content/Events/Tasks/create-events-rule.htm
- Event producers and event types: https://docs.oracle.com/en-us/iaas/Content/Events/Reference/eventsproducers.htm
- Oracle Functions: https://docs.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
- Streaming: https://docs.oracle.com/en-us/iaas/Content/Streaming/Concepts/streamingoverview.htm
- Notifications: https://docs.oracle.com/en-us/iaas/Content/Notification/Concepts/notificationoverview.htm

## Load Guidance

Do not claim built-in failed-delivery DLQ semantics unless the current Events action documentation explicitly supports it. Use Streaming as durable capture/replay when the architecture requires replay.
