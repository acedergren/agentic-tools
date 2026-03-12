### [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/iaas/Content/home.htm)

* * *

All Pages


[Skip to main content](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm#dcoc-content-body)

# Managing Alarms

Create, update, suppress, and delete alarms. Retrieve alarm history.

The following pages describe how you can manage alarms:

- [Listing Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/list-alarm.htm "List alarms in Monitoring.")
- [Creating an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm.htm "Create an alarm in Monitoring to notify you when metrics meet specified triggers.")
- [Viewing an Alarm Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-chart.htm "View a metric chart for an alarm query in the Console.")
- [Listing Status of Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/list-alarm-status.htm "List status levels for alarms in Monitoring.")
- [Listing Metric Stream Status in an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/list-alarm-status-metric-stream.htm "List the status of each metric stream in an alarm in Monitoring. A metric stream corresponds to a set of dimension key-value pairs.")
- [Getting an Alarm's Details](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/get-alarm.htm "Get details for an alarm in Monitoring.")
- [Getting the History of an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/get-alarm-history.htm "Get the history of an alarm in Monitoring. Alarm history is retained for 90 days.")
- [Updating an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/update-alarm.htm "Update an alarm in Monitoring.")
    - [Selecting a Stream as the Notification Destination for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-notification-stream.htm "Select the stream to send alarm notifications to.")
    - [Selecting a Topic as the Notification Destination for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-notification-topic.htm "Select the topic to send alarm notifications to.")
    - [Getting Event-Based Notifications for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/update-alarm-event.htm "Get notified every time your event-based metric is emitted.")
    - [Splitting Notifications for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/update-alarm-split-messages.htm "Update an alarm in Monitoring to split notifications.")
    - [Grouping Notifications for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/update-alarm-group-messages.htm "Update an alarm in Monitoring to group notifications.")
    - [Using Dynamic Variables in Alarm Messages](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/update-alarm-dynamic-variables.htm "Update an alarm in Monitoring to include values of alarm message parameters in messages.")
    - [Formatting Messages for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/update-alarm-friendly-formats.htm "Update an alarm in Monitoring to send messages with friendly formatting or other format options.")
    - [Repeating Notifications for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-repeat-notifications.htm "Set the frequency for repeating alarm notifications when the alarm keeps firing without interruption.")
- [Enabling an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/enable-alarm.htm "Enable an alarm in Monitoring.")
- [Disabling an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/disable-alarm.htm "Disable an alarm in Monitoring.")
- [Managing Alarm Suppressions](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/suppressions.htm "Add dimension-specific and alarm-wide suppressions. Get details about alarm suppressions, get history of suppressions for an alarm, and remove suppressions.")
- [Moving an Alarm to a Different Compartment](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/change-compartment-alarm.htm "Move an alarm in Monitoring to another compartment.")
- [Deleting an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/delete-alarm.htm "Delete an alarm in Monitoring.")

See also [Best Practices for Your Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/alarmsbestpractices.htm "Read about best practices for alarms.").

## Before You Begin

- IAM policies: Managing alarms is part of monitoring. To monitor resources, you must be granted the required type of access in a **policy** written by an administrator, whether you're using the Console or the REST API with an SDK, CLI, or other tool. The policy must give you access to both the monitoring services and the resources being monitored. If you try to perform an action and get a message that you don't have permission or are unauthorized, contact the administrator to find out what type of access you were granted and which **compartment** you need to work in. For more information about user authorizations for monitoring, see [IAM Policies](https://docs.oracle.com/iaas/Content/Security/Reference/monitoring_security.htm#iam-policies). Administrators: For common alarm policies, see [Alarm Access for Groups](https://docs.oracle.com/iaas/Content/Security/Reference/monitoring_security.htm#alarm-groups).

- Metrics exist in Monitoring: The resources that you want to monitor must emit metrics to the Monitoring service.

- Compute instances: To emit metrics, the Compute Instance Monitoring plugin must be enabled on the instance, and plugins must be running. The instance must also have either a service gateway or a public IP address to send metrics to the Monitoring service. For more information, see [Enabling Monitoring for Compute Instances](https://docs.oracle.com/iaas/Content/Compute/Tasks/enablingmonitoring.htm).


## Applying Tags

Apply tags to resources to help organize them according to your business needs. You can apply tags when you create a resource, and you can update a resource later to add, revise, or remove tags. For general information about applying tags, see [Resource Tags](https://docs.oracle.com/iaas/Content/General/Concepts/resourcetags.htm).

- [Managing Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm#top)
- [Before You Begin](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm#prerequisites)
- [Applying Tags](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm#applying-tags)
- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
    - [Overview](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm)
    - [Viewing Default Metric Charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/viewingcharts.htm)
    - [Building Metric Queries](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/buildingqueries.htm)
    - [Publishing Custom Metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm)
    - [Managing Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm)
    - [Managing Agent Configurations](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/agent-configurations.htm)
    - [Best Practices for your Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/alarmsbestpractices.htm)
    - [Example Alarm Messages](https://docs.oracle.com/en-us/iaas/Content/Monitoring/alarm-message-examples.htm)
    - [Alarm Message Format](https://docs.oracle.com/en-us/iaas/Content/Monitoring/alarm-message-format.htm)
    - [MQL Reference](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Reference/mql.htm)
    - [Troubleshooting](https://docs.oracle.com/en-us/iaas/Content/Monitoring/troubleshooting.htm)
    - [Known Issues](https://docs.oracle.com/en-us/iaas/Content/Monitoring/known-issues.htm)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

### [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/iaas/Content/home.htm)     [Try Free Tier](https://www.oracle.com/cloud/free/?source=:ow:o:h:po:OHPPanel1nav0625&intcmp=:ow:o:h:po:OHPPanel1nav0625)

* * *

[Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm) [Monitoring](https://docs.oracle.com/en-us/iaas/Content/Monitoring/home.htm)

All Pages


- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
    - [Overview](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm)
    - [Viewing Default Metric Charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/viewingcharts.htm)
    - [Building Metric Queries](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/buildingqueries.htm)
    - [Publishing Custom Metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm)
    - [Managing Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm)
    - [Managing Agent Configurations](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/agent-configurations.htm)
    - [Best Practices for your Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/alarmsbestpractices.htm)
    - [Example Alarm Messages](https://docs.oracle.com/en-us/iaas/Content/Monitoring/alarm-message-examples.htm)
    - [Alarm Message Format](https://docs.oracle.com/en-us/iaas/Content/Monitoring/alarm-message-format.htm)
    - [MQL Reference](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Reference/mql.htm)
    - [Troubleshooting](https://docs.oracle.com/en-us/iaas/Content/Monitoring/troubleshooting.htm)
    - [Known Issues](https://docs.oracle.com/en-us/iaas/Content/Monitoring/known-issues.htm)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

[Skip to main content](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#dcoc-content-body)

Updated 2026-01-22

# Overview of Monitoring

Use the Oracle Cloud Infrastructure Monitoring service to actively and passively monitor cloud resources using the Metrics and Alarms features. Learn how Monitoring works.

[![This image shows metrics and alarms as used in the Monitoring service.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoringOverview.svg)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoringOverview.svg)

**Tip**

Watch a [video introduction](https://apexapps.oracle.com/pls/apex/f?p=44785:265:0:::265:P265_CONTENT_ID:31981) to the service.

## How Monitoring Works 🔗

The Monitoring service uses **metrics** to monitor resources and **alarms** to notify you when these metrics meet alarm-specified triggers.

Metrics are emitted to the Monitoring service as raw **data points**, or timestamp-value pairs, along with **dimensions** and metadata. Metrics come from various sources:

- Resource metrics automatically posted by Oracle Cloud Infrastructure
**resources**. For example, the Compute service posts metrics for monitoring-enabled compute instances through [the oci\_computeagent namespace](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl). One such metric is `CpuUtilization`. See [Supported Services](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices) and [Viewing Default Metric Charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/viewingcharts.htm "View metric charts that use predefined service queries. Default metric charts are available on the Service Metrics page and resource details pages in the Console.").
- [Custom metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm "Publish custom metrics to the Monitoring service.") published using the Monitoring API.
- Data sent to new or existing metrics using [Connector Hub](https://docs.oracle.com/iaas/Content/connector-hub/home.htm) (with Monitoring as the target service for a connector).

You can transfer metrics from the Monitoring service using [Connector Hub](https://docs.oracle.com/iaas/Content/connector-hub/home.htm). For more information, see [Creating a Connector with a Monitoring Source](https://docs.oracle.com/iaas/Content/connector-hub/create-service-connector-monitoring-source.htm).

Metric data posted to the Monitoring service is only presented to you or consumed by the Oracle Cloud Infrastructure features that you enable to use metric data.

When you query a metric, the Monitoring service returns aggregated data according to the specified parameters. You can specify a range (such as the last 24 hours), **statistic**, and **interval**. The Console displays one monitoring chart per metric for selected resources. The aggregated data in each chart reflects the selected statistic and interval. API requests can optionally filter by **dimension** and specify a **resolution**. API responses include the metric name along with its source compartment and **metric namespace**. You can feed the aggregated data into a visualization or graphing library.

Metric and alarm data is accessible from the Console, CLI, and API. For retention periods, see [Storage Limits](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#Storage).

The Alarms feature of the Monitoring service publishes alarm **messages** to configured destinations, such as topics in [Notifications](https://docs.oracle.com/iaas/Content/Notification/home.htm) and streams in [Streaming](https://docs.oracle.com/iaas/Content/Streaming/home.htm).

### Metrics Feature Overview 🔗

The Metrics feature relays metric data about the health, capacity, and performance of cloud resources.

A metric is a measurement related to health, capacity, or performance of a **resource**. Resources, services, and applications emit metrics to the Monitoring service. Common metrics reflect data related to:

- Availability and latency
- Application uptime and downtime
- Completed transactions
- Failed and successful operations
- Key performance indicators (KPIs), such as sales and engagement quantifiers

By querying Monitoring for this data, you can understand how well the systems and processes are working to achieve the service levels you commit to your customers. For example, you can monitor the CPU utilization and disk reads of compute **instances**. You can then use this data to decide when to provision more instances to handle increased load, troubleshoot issues with the instance, or better understand system behavior.

#### Example Metric: Failure Rate 🔗

For application health, one of the common KPIs is failure rate, for which a common definition is the number of failed transactions divided by total transactions. This KPI is typically delivered through application monitoring and management software.

As a developer, you can capture this KPI from applications using [custom metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm "Publish custom metrics to the Monitoring service."). Record observations every time an application transaction takes place and then post that data to the Monitoring service. In this case, set up metrics to capture failed transactions, successful transactions, and transaction latency (time spent per completed transaction).

### Alarms Feature Overview 🔗

Use alarms to monitor the health, capacity, and performance of cloud resources.

[![Resources emit metric data points to Monitoring. When triggered, alarms send messages to the configured destination. For Notifications, messages are sent to subscriptions in the configured topic. For Streaming, messages are sent to the configured stream).](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/alarms-topic-diagram.svg)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/alarms-topic-diagram.svg)

The Alarms feature of the Monitoring service works with the configured destination service to notify you when metrics meet alarm-specified triggers. The previous illustration depicts the flow, starting with resources emitting metric [data points](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#concepts__datapointdefinition) to Monitoring. When triggered, an **alarm** sends an [alarm message](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageFormat) to the configured destination. For Notifications, messages are sent to **subscriptions** in the configured topic. For Streaming, messages are sent to the configured stream. (This illustration doesn't cover raw and aggregated metric data. For these details, see [the "Monitoring Overview" illustration at the top of this page](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#top__metrics-alarms-diagram).)

When configured, repeat notifications remind you of a continued firing state at the configured repeat interval. You're also notified when an alarm transitions back to the OK state, or when an alarm is reset.

#### Alarm Evaluations 🔗

Monitoring evaluates alarms once per minute to find alarm status.

When the alarm [splits notifications](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/split-messages.htm "Walk through setting up an alarm to send a message for each metric stream. In this example, you want to be notified whenever a server exceeds a threshold. With this setup, you receive server-specific messages."), Monitoring evaluates _each tracked metric stream_. If the evaluation of that metric stream indicates a new `FIRING` status or other [qualifying event](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageTypes "The message type indicates the reason that the message was sent."), then Monitoring sends an alarm message.

Monitoring tracks metric streams per alarm for [qualifying events](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageTypes "The message type indicates the reason that the message was sent."), but messages are subject to the [destination service limits](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#limits-alarm-messages "The maximum number of messages per alarm evaluation depends on the alarm destination. Limits are associated with the Oracle Cloud Infrastructure service used for the destination.").

##### Illustration of Alarm Evaluation 🔗

Consider an alarm that measures the 90th percentile of the metric `CpuUtilization`.

```
{
  "compartmentId": "ocid1.compartment.oc1..exampleuniqueID",
  "destinations": ["ocid1.onstopic.exampleuniqueID"],
  "displayName": "High CPU Utilization",
  "id": "ocid1.alarm.oc1..exampleuniqueID",
  "lifecycleState": "ACTIVE",
  "metricCompartmentId": "ocid1.compartment.oc1..exampleuniqueID",
  "namespace": "oci_computeagent",
  "pendingDuration": "PT3M",
  "query": "CpuUtilization[1m]{availabilityDomain = \"cumS:PHX-AD-1\"}.groupBy(availabilityDomain).percentile(0.9) > 85",
  "repeatNotificationDuration": "PT2H",
  "severity": "WARNING",
  "isEnabled": true,
  "timeCreated": "2023-02-01T01:02:29.600Z",
  "timeUpdated": "2023-02-03T01:02:29.600Z"
}
```

Notes about this example alarm:

- The percentile is specified in the query as the [statistic](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-statistic.htm "Select the statistic for an alarm query. The statistic is the aggregation function applied to the set of raw data points at the specified interval.") ( **bold**):

```
CpuUtilization[1m]{availabilityDomain = \"cumS:PHX-AD-1\"}.groupBy(availabilityDomain).percentile(0.9) > 85
```

- Each data point is the 90th percentile (`percentile(0.9)`) of a one-minute window, specified in the query as the [interval](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-interval.htm "Select the interval, or time window, for querying metric data in an alarm in Monitoring.") (bold):

```
CpuUtilization[1m]{availabilityDomain = \"cumS:PHX-AD-1\"}.groupBy(availabilityDomain).percentile(0.9) > 85
```

- Data point values for this statistic could be anything from null (absent) to 100.
- Data point evaluations:
  - For any data point value greater than 85, the evaluation is true (`1`). A true evaluation means that the trigger rule condition has been met.
  - For any data point value that isn't greater than 85, the evaluation is false (`0`).
- The alarm doesn't fire until the [trigger rule](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-trigger-rule.htm "Define one or more trigger rules, or predicates, for an alarm. A trigger rule is a condition (defined by the query) that must be satisfied for the alarm to be in the firing state, and also includes severity, trigger delay (pendingDuration), and the alarm body to include in notifications. A condition in a trigger rule can specify a threshold, such as 90% for CPU utilization, or an absence.") condition is met for three successive minutes. This configuration is the alarm's [trigger delay](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-trigger-delay.htm "Define the number of minutes that the condition must be maintained before the alarm is in firing state.") (`pendingDuration`), set as `PT3M`.
- The alarm updates its state to OK when the breaching condition has been clear for the most recent minute.

The following image shows an aggregated metric stream for the example alarm. Each data point is indicated by a square.

![Aggregated metric stream for the example alarm.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-alarm-eval.svg)

The following table shows consecutive alarm evaluations for the example alarm. The alarm is evaluated on a moving window of three one-minute intervals.

| Evaluation period timestamp | Minutes in period | Data point evaluations\* | Status |
| --- | --- | --- | --- |
| 3 | \[1, 2, 3\] | \[0, 0, 0\] | `OK` |
| 4 | \[2, 3, 4\] | \[0, 0, 1\] | `OK` |
| 5 | \[3, 4, 5\] | \[0, 1, 1\] | `OK` |
| 6 | \[4, 5, 6\] | \[1, 1, 1\] | `FIRING` |
| 7 | \[5, 6, 7\] | \[1, 1, 1\] | `FIRING` |
| 8 | \[6, 7, 8\] | \[1, 1, 0\] | `OK` |
| 9 | \[7, 8, 9\] | \[1, 0, 0\] | `OK` |
| 10 | \[8, 9, 10\] | \[0, 0, 0\] | `OK` |

\*A value of one (1) means that the [trigger rule](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-trigger-rule.htm "Define one or more trigger rules, or predicates, for an alarm. A trigger rule is a condition (defined by the query) that must be satisfied for the alarm to be in the firing state, and also includes severity, trigger delay (pendingDuration), and the alarm body to include in notifications. A condition in a trigger rule can specify a threshold, such as 90% for CPU utilization, or an absence.") condition is met.

#### How Data Points Are Counted 🔗

This section describes how to determine the number of _data points_ (or _datapoints_) retrieved by an alarm. This number can help you estimate [Monitoring pricing](https://www.oracle.com/cloud/cloud-native/monitoring/pricing/).

To find the number of data points retrieved by an alarm, first get the _number of query streams_ and _minutes analyzed_.

- The _number of query streams_ depends on the metric streams returned by the alarm query.
- The _minutes analyzed_ depends on the alarm attributes `interval`, `resolution`, and `pendingDuration`. For alarm queries, the only valid value for `resolution` is `1m`. For more information about `interval`, see [Interval](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Reference/mql.htm#Interval). For more information about `resolution` and `pendingDuration`, see [Monitoring API](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/).

Each alarm gets evaluated once every minute, and thus each alarm is evaluated 1440 times per day. Each evaluation queries the data in the time window defined by `interval` and it checks the period of time that the alarm persists defined by `pendingDuration`. Therefore, _minutes analyzed_ at every minute is calculated by the following expression:

_minutes analyzed_ at every minute = `interval` \\* ceiling(`pendingDuration` / `resolution`)

#### About the Internal Reset Period 🔗

The _internal reset period_ determines when an [alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm "Create, update, suppress, and delete alarms. Retrieve alarm history.") stops checking for an absent metric that triggered the Firing state in the previous evaluation. When the metric is absent for the entire period, later alarm evaluations ignore the indicated metric stream. If no other metric streams are causing the Firing state for the alarm, then the alarm transitions to OK and sends a [RESET message](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageTypes "The message type indicates the reason that the message was sent."). By default, the RESET message arrives after 13 minutes (internal reset period plus the default slack period of 3 minutes). You can customize the [slack period](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-slack-period.htm "Specify a custom value for the slack period to use when querying metric data in an alarm in Monitoring.").

The length of the internal reset period is globally configured at 10 minutes, which causes the [alarm history](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/get-alarm-history.htm "Get the history of an alarm in Monitoring. Alarm history is retained for 90 days.") to show a 10-minute difference.

The beginning of an internal reset period depends on the alarm type. For [threshold alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-threshold.htm "Create a threshold alarm in Monitoring to send notifications when a metric meets a specified threshold value."), the internal reset period starts when the first absence is detected. For [absence alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-absence.htm "Create an absence alarm in Monitoring to send notifications when a metric doesn't emit data for a specified interval."), the internal reset period starts after completion of the _absence detection period_ (default of 2 hours, can be [customized](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-absence-detection-period.htm "Specify a custom value for the absence detection period to use when querying metric data in an alarm in Monitoring.")).

##### Data Points Gathered During an Internal Reset Period 🔗

Each evaluation during the ten-minute internal reset period accounts for all data points in that period.

For example, consider a metric stream (`A`) that exceeds the threshold (dashed red line in following diagrams). The alarm fires (`F`). When a lack of emitted data points is detected, an internal reset period begins.

The following diagram shows a single internal reset period for metric stream `A`, from the times `t5` to `t15`. At time `t16`, metric stream `A` is no longer evaluated.

[![Diagram depicting a single internal reset period.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-data-points.svg)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-data-points.svg)

The following diagram shows two internal reset periods for metric stream `A`, from the times `t3` to `t5`, and from `t6` to `t16`. `A` emits a data point at `t6`, starting another internal reset period. At time `t17`, metric stream `A` is no longer evaluated.

[![Diagram depicting two internal reset periods.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-data-points-emitted.svg)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-data-points-emitted.svg)

##### Threshold Alarm Example 🔗

A [threshold alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-threshold.htm "Create a threshold alarm in Monitoring to send notifications when a metric meets a specified threshold value.") reports on metric streams that occur outside the threshold. When a previously problematic metric stream is absent, the alarm starts the _internal reset period_ for the metric stream.

In this example, four metric streams are evaluated by a threshold alarm. The Console shows the initial Firing (1:30) and Ok (1:51) transition states. The internal reset period occurs while the alarm is in Firing state.

[![Example of a threshold alarm with four metric streams.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-threshold.svg)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-threshold.svg)

The internal reset period and other significant events in this example are described in the following table.

| Time | State | Transition | Events | Notifications (see [Message Types](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageTypes "The message type indicates the reason that the message was sent.")) |
| --- | --- | --- | --- | --- |
| 12:00 | `OK` | `OK` | All emissions are within threshold. | `FIRING_TO_OK` |
| 1:30 | `FIRING` | `FIRING` | Emission from resource1 exceeds threshold. | `OK_TO_FIRING` |
| 1:35 | `FIRING` | `--` | No emission is detected for resource1. The alarm starts the internal reset period for resource1. | `--` |
| 1:38 | `FIRING` | `--` | No emission is detected for resource2. The alarm starts the internal reset period for resource2. | `--` |
| 1:45 | `FIRING` | `--` | The internal reset period ends for resource1, so the alarm no longer checks for emissions from resource1. However, the alarm is still Firing because resource2 is still in its own internal reset period. | `--` |
| 1:48 | `OK` | `OK` | The internal reset period ends for resource2, so the alarm no longer checks for emissions from resource2. Emissions from the remaining resources (resource3 and resource4) are within threshold. | `RESET` (sent after the three-minute slack period, at about 1:51) |

##### Absence Alarm Example 🔗

An [absence alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-absence.htm "Create an absence alarm in Monitoring to send notifications when a metric doesn't emit data for a specified interval.") reports on absent metric streams. When a metric stream is absent, the alarm starts the [_absence detection period_](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-absence-detection-period.htm "Specify a custom value for the absence detection period to use when querying metric data in an alarm in Monitoring.") for the metric stream (default of two hours, can be customized). After completion of the absence detection period, the alarm starts the _internal reset period_ for the metric stream.

In this example, a metric stream is evaluated by an absence alarm that uses the default two-hour _absence detection period_ and default three-minute _slack period_. The Console shows the initial Firing (2:00) and Ok (4:10) transition states. The internal reset period occurs while the alarm is in Firing state.

[![Example of an absence alarm with a single metric stream.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-absent.svg)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoring-reset-absent.svg)

The internal reset period and other significant events in this example are described in the following table.

| Time | State | Transition | Events | Notifications (see [Message Types](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageTypes "The message type indicates the reason that the message was sent.")) |
| --- | --- | --- | --- | --- |
| 1:00 | `OK` | -- | Emissions are detected. |  |
| 2:00 | `FIRING` | `FIRING` | No emission is detected for resource-z. The alarm starts the absence detection period for resource-z. | `OK_TO_FIRING` |
| 4:00 | `FIRING` | `--` | The absence detection period for resource-z ends. The alarm starts the internal reset period for resource-z. | `--` |
| 4:10 | `OK` | `OK` | The internal reset period ends for resource-z, so the alarm no longer checks for emissions from resource-z. No metric streams are monitored by the alarm any more, so the alarm transitions to Ok state. | `RESET` (sent after the three-minute slack period, at about 4:13) |

#### Time Needed to Reflect Alarm Updates 🔗

Updates to alarms take up to five minutes to be reflected everywhere.

For example, if you update an alarm to [split notifications](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/split-messages.htm "Walk through setting up an alarm to send a message for each metric stream. In this example, you want to be notified whenever a server exceeds a threshold. With this setup, you receive server-specific messages."), then it might take up to five minutes for [metric stream status](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/list-alarm-status-metric-stream.htm "List the status of each metric stream in an alarm in Monitoring. A metric stream corresponds to a set of dimension key-value pairs.") to be populated in the Console.

#### Searching for Alarms 🔗

Search for alarms using supported attributes.

For more information about Search, see [Overview of Search](https://docs.oracle.com/iaas/Content/Search/Concepts/queryoverview.htm). For attribute descriptions, see [Alarm Reference](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/Alarm).

[Search-Supported Attributes for Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#)

- `id`

- `displayName`

- `compartmentId`

- `metricCompartmentId`

- `namespace`

- `query`

- `severity`

- `destinations`

- `suppression`

- `isEnabled`

- `lifecycleState`

- `timeCreated`

- `timeUpdated`

- `tags`


[Message Types](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#)

The message type indicates the reason that the message was sent.

**Note**

The specified message type is sent at the indicated time plus the alarm's configured trigger delay, if any.

Repeat messages are also sent if configured in the alarm.

The following table lists the alarm state and transition for each message type.

| Message type | State | Transition | Comments |
| --- | --- | --- | --- |
| `OK_TO_FIRING` | `FIRING` | from `OK` to `FIRING` |  |
| `FIRING_TO_OK` | `OK` | from `FIRING` to `OK` |  |
| `REPEAT` | `FIRING` | -- | This message type is sent when the alarm maintains the `FIRING` state, and the alarm is configured for repeat notifications. |
| `RESET` | `OK` | from `FIRING` to `OK` | **Important:** When a `RESET` status change occurs, look at the health of the resource.<br>This message type is sent when the alarm transitions to the `OK` state after one or more _internal resets_. An internal reset occurs when a metric stream that caused the alarm to transition to the `FIRING` state is continuously absent for the full [internal reset period](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#reset). A metric stream that's internally reset is no longer tracked by the alarm.<br>Possible causes for an absent metric stream: The resource that was emitting the metric might have been moved or terminated, or the metric might be emitted only on failure. For more information about the internal reset period, see [About the Internal Reset Period](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#reset). |

### Message Format and Examples 🔗

See [Example Alarm Messages](https://docs.oracle.com/en-us/iaas/Content/Monitoring/alarm-message-examples.htm "View examples of alarm messages sent by Monitoring.") and [Alarm Message Format](https://docs.oracle.com/en-us/iaas/Content/Monitoring/alarm-message-format.htm "Look up parameters that appear in alarm messages sent by Monitoring. Review parameter descriptions and example values, dynamic variables, and default appearance in formatted messages.").

## Monitoring Concepts 🔗

The following concepts are essential to working with Monitoring.

aggregated dataThe result of applying a _statistic_ and _interval_ to a selection of raw _data points_ for a _metric_. For example, you can apply the _statistic_`max` and _interval_`1h` (one hour) to the last 24 hours of raw _data points_ for the _metric_`CpuUtilization`. Aggregated data is displayed in default metric charts in the Console. You can also build metric queries for specific sets of aggregated data. For instructions, see [Viewing Default Metric Charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/viewingcharts.htm "View metric charts that use predefined service queries. Default metric charts are available on the Service Metrics page and resource details pages in the Console.") and [Building Metric Queries](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/buildingqueries.htm "View custom metric charts, list metric definitions, and query metric data for resources of interest.").alarmThe _alarm query_ to evaluate and the _notification destination_ to use when the alarm is in the firing state, along with other alarm properties.To create an alarm, see [Creating a Basic Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-basic.htm "Create a basic alarm in Monitoring to notify you when metrics meet specified triggers.").alarm query The Monitoring Query Language (MQL) expression to evaluate for the _alarm_. An alarm query must specify a _metric_, _statistic_, _interval_, and a _trigger rule_ (threshold or absence). The Alarms feature of the Monitoring service interprets results for each returned time series as a Boolean value, where zero represents false and a nonzero value represents true. A true value means that the _trigger rule_ condition has been met.To create a basic alarm query, see [Creating a Basic Query to Generate an Alarm Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-chart-basic-query.htm "Generate a metric chart on the Create Alarm page in the Console by creating a basic alarm query."). To create an alarm, see [Creating a Basic Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-basic.htm "Create a basic alarm in Monitoring to notify you when metrics meet specified triggers.").data pointA timestamp-value pair for the specified _metric_. Example: `2022-05-10T22:19:00Z, 10.4`A data point is either raw or aggregated. Raw data points are posted by the _metric namespace_ to the Monitoring service using the [PostMetricData](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/MetricData/PostMetricData) operation. The _frequency_ of the data points posted varies by _metric namespace_. For example, a custom namespace might send data points for a _metric_ at a 20-second _frequency_. Aggregated data points are the result of applying a _statistic_ and _interval_ to raw data points. The _interval_ of the aggregated data points is specified in the [SummarizeMetricsData](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/MetricData/SummarizeMetricsData) request. For example, a request specifying the _statistic_`sum` and _interval_`1h` (one hour) returns a `sum` value for each hour of available raw data points for the _metric_. dimensionA qualifier provided in a _metric definition_. Example: Resource identifier (`resourceId`), provided in the definitions of oci\_computeagent metrics. Use dimensions to filter or group metric data. Example dimension name-value pair for filtering by availability domain: `availabilityDomain = "VeBZ:PHX-AD-1"`To select a dimension for a metric chart or query, see [Selecting Dimensions to Filter Metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-dimensions.htm "Use dimensions to filter the data plotted that's plotted on default metric charts on the Service Metrics page in the Console. For example, filter results to a particular resource or fault domain. Available dimensions vary by metric.") and [Selecting Dimensions for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-dimension.htm "Limit returned metric data by selecting dimensions when querying metric data in Monitoring. A dimension is a qualifier provided in a metric definition. In MQL, the dimension selection component specifies name-value pairs for dimensions, surrounded by curly brackets.").To select an interval for an alarm, see [Selecting the Interval for an Alarm Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-interval.htm "Select the interval, or time window, for querying metric data in an alarm in Monitoring.").frequencyThe time period between each posted raw _data point_ for a _metric_. (Raw data points are posted by the _metric namespace_ to the Monitoring service.) While frequency varies by metric, default service metrics typically have a frequency of 60 seconds (one data point posted per minute). See also _[resolution](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#concepts__resolutiondefinition)_.interval
The time window used to convert the set of raw _data points_.

The timestamp of the aggregated data point corresponds to the end of the time window during which raw data points are assessed. For example, for a five-minute interval, the timestamp "2:05" corresponds to the five-minute time window from 2:00: _n_ to 2:05:00.

[![This image shows how the timestamp of an aggregated data point corresponds to the interval.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoringMetricInterval.svg)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoringMetricInterval.svg)

The following example query (MQL expression) specifies a 5-minute interval.
For valid interval options in MQL expressions, see [Interval (Monitoring Query Language (MQL) Reference)](https://docs.oracle.com/iaas/Content/Monitoring/Reference/mql.htm#Interval).

```
CpuUtilization[5m].max()
```

**Note**

Supported values for interval depend on the specified time range in the metric query (not applicable to alarm queries). More interval values are supported for smaller time ranges. For example, if you select one hour for the time range, then all interval values are supported. If you select 90 days for the time range, then only interval values between 1 hour and 1 day are supported.

To select an interval for a metric chart or query, see [Changing the Interval for a Default Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-interval.htm "Change the time window for aggregating metric data points plotted on a default metric chart. Default metric charts are available on the Service Metrics page and resource details pages in the Console.") and [Selecting the Interval for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-interval.htm "Select the interval, or time window, for querying metric data in Monitoring.").To select an interval for an alarm, see [Selecting the Interval for an Alarm Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-interval.htm "Select the interval, or time window, for querying metric data in an alarm in Monitoring.").See also _resolution_.messageThe content that the Alarms feature of the Monitoring service publishes to topics in the _alarm's_ configured _notification destinations_. A message is sent when the _alarm_ transitions to another state, such as from `OK` to `FIRING`.For more information about alarm messages, see [Message Format and Examples](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageFormat).metadataA reference provided in a _metric definition_. Example: unit (bytes), provided in the definition of the oci\_computeagent _metric_`DiskBytesRead`. Use metadata to determine additional information about a metric. For metric definitions, see [Supported Services](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices).metricA measurement related to health, capacity, or performance of a resource. Example: The `oci_computeagent` _metric_`CpuUtilization`, which measures usage of a compute instance. For metric definitions, see [Supported Services](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices).

**Note**

Metric resources don't have **OCIDs**.

metric definitionA set of references, qualifiers, and other information provided by a _metric namespace_ for a _metric_. For example, the oci\_computeagent _metric_`DiskBytesRead` is defined by _dimensions_ (such as resource identifier) and _metadata_ (specifying bytes for unit) as well as identification of its _metric namespace_ (oci\_computeagent). Each posted set of _data points_ carries this information. Use the [ListMetricData](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/Metric/ListMetrics) API operation to get metric definitions. For metric definitions, see [Supported Services](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices).To select a metric name for a query, see [Selecting the Metric Name for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-metric.htm "Select the name of the metric for querying metric data in Monitoring.").To select a metric name for an alarm, see [Creating a Basic Query to Generate an Alarm Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-chart-basic-query.htm "Generate a metric chart on the Create Alarm page in the Console by creating a basic alarm query.") and [Creating a Basic Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-basic.htm "Create a basic alarm in Monitoring to notify you when metrics meet specified triggers.").metric namespaceIndicator of the **resource**, service, or application that emits the _metric_. Provided in the _metric definition_. For example, the `CpuUtilization` _metric definition_ emitted by the Oracle Cloud Agent software on compute **instances** lists the _metric namespace_`oci_computeagent` as the source of the `CpuUtilization` _metric_. For metric definitions, see [Supported Services](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices).To select a metric namespace for a metric chart or query, see [Viewing Default Metric Charts for a Metric Namespace (Multiple Resources)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-namespace.htm "Go to the Service Metrics page in the Console to view metric charts that use predefined service queries for a selected metric namespace. The charts show metric data for all resources in the selected metric namespace, compartment, and region.") and [Selecting the Metric Namespace for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-namespace.htm "Select the metric namespace for querying metric data in Monitoring.").To select a metric namespace for an alarm, see [Creating a Basic Query to Generate an Alarm Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-chart-basic-query.htm "Generate a metric chart on the Create Alarm page in the Console by creating a basic alarm query.") and [Creating a Basic Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-basic.htm "Create a basic alarm in Monitoring to notify you when metrics meet specified triggers.").metric streamAn individual set of _aggregated data_ for a _metric and zero or more dimension values_.In [the Metric streams status page](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/list-alarm-status-metric-stream.htm "List the status of each metric stream in an alarm in Monitoring. A metric stream corresponds to a set of dimension key-value pairs."), each metric stream corresponds to a set of dimension key-value pairs.In [metric charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/viewingcharts.htm "View metric charts that use predefined service queries. Default metric charts are available on the Service Metrics page and resource details pages in the Console.") (in the Console), each metric stream is depicted as a line (unless you [aggregate all metric streams](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-aggregate-metric-streams.htm "Aggregate metric streams in default metric charts on the Service Metrics page in the Console.")).The following image depicts metric streams in a chart. Each line in the chart corresponds to a metric stream.

[![This image depicts metric streams in a chart. Each line in the chart corresponds to a metric stream.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/metric-streams.png)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/metric-streams.png)

For example, consider a compartment containing three compute instances in the `AD-1` availability domain (including two in the `ipexample` instance pool) and a fourth instance in the `AD-2` availability domain. In this example, the CPU Utilization metric chart shows four lines (one per instance). When [filtered](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-dimensions.htm "Use dimensions to filter the data plotted that's plotted on default metric charts on the Service Metrics page in the Console. For example, filter results to a particular resource or fault domain. Available dimensions vary by metric.") by the `AD-1` availability domain, the chart shows three lines. When further filtered by the `ipexample` instance pool, the chart shows two lines.To select metric streams in a query, see [Selecting Dimensions to Filter Metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-dimensions.htm "Use dimensions to filter the data plotted that's plotted on default metric charts on the Service Metrics page in the Console. For example, filter results to a particular resource or fault domain. Available dimensions vary by metric."), [Selecting Dimensions for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-dimension.htm "Limit returned metric data by selecting dimensions when querying metric data in Monitoring. A dimension is a qualifier provided in a metric definition. In MQL, the dimension selection component specifies name-value pairs for dimensions, surrounded by curly brackets."), and [Selecting Dimensions for an Alarm Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-dimensions.htm "Limit the metric data that's returned by selecting dimensions for an alarm in Monitoring. A dimension is a qualifier provided in a metric definition. In MQL, the dimension selection component specifies name-value pairs for dimensions, surrounded by curly brackets.").To set up an alarm for notifications per metric stream, see [Creating an Alarm That Splits Messages by Metric Stream](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-split.htm "Create an alarm in Monitoring that sends a separate alarm message for each metric stream.") and [Scenario: Split Messages by Metric Stream](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/split-messages.htm "Walk through setting up an alarm to send a message for each metric stream. In this example, you want to be notified whenever a server exceeds a threshold. With this setup, you receive server-specific messages.").notification destinationDetails for sending _messages_ when the _alarm_ transitions to another state, such as from `OK` to `FIRING`. The details and setup might vary by destination service. Available destination services include Notifications and Streaming.For the Notifications service, specify a [topic](https://docs.oracle.com/iaas/Content/Notification/Concepts/notificationoverview.htm#concepts__topicdefinition). (If you're creating the topic for the alarm, also specify one or more [subscription](https://docs.oracle.com/iaas/Content/Notification/Concepts/notificationoverview.htm#concepts__subscriptiondefinition) protocols (such as PagerDuty).For the Streaming service, specify a [stream](https://docs.oracle.com/iaas/Content/Streaming/Concepts/streamingoverview.htm#concepts).For examples of alarm messages sent to topics and streams, see [Example Alarm Messages](https://docs.oracle.com/en-us/iaas/Content/Monitoring/alarm-message-examples.htm "View examples of alarm messages sent by Monitoring.").To set up a notification destination in an alarm, see [Defining Notifications for an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-notification.htm "Select the topic or stream to send alarm notifications to. Group or split notifications, format messages, and choose whether to repeat notifications.").
Oracle Cloud Agent softwareSoftware used by a compute instance to post raw _data points_ to the Monitoring service. Automatically installed with the latest versions of supported images. See [Enabling Monitoring for Compute Instances](https://docs.oracle.com/iaas/Content/Compute/Tasks/enablingmonitoring.htm). queryThe Monitoring Query Language (MQL) expression and associated information (such as metric namespace) to evaluate for returning _aggregated data_. The query must specify a _metric_, _statistic_, and _interval_.To create a metric query, see [Creating a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric.htm "Define a query to retrieve data from Monitoring.").To create an alarm query, see [Creating a Basic Query to Generate an Alarm Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-chart-basic-query.htm "Generate a metric chart on the Create Alarm page in the Console by creating a basic alarm query.").resolution

The period between time windows, or the regularity at which time windows shift. For example, use a resolution of `1m` to retrieve aggregations every minute.

**Note**

For metric queries, the **interval** you select drives the default **resolution** of the request, which determines the maximum time range of data returned.

For alarm queries, the specified **interval** has no effect on the **resolution** of the request. The only valid value of the resolution for an alarm query request is `1m`.For more information about the resolution parameter as used in alarm queries, see [Alarm](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/Alarm).

As shown in the following illustration, _resolution_ controls the start time of each aggregation window relative to the previous window while _interval_ controls the length of the windows. Both requests apply the statistic `max` to the data within each five-minute window (from the interval), resulting in a single aggregated _data point_ representing the highest `CPUutilization` counter for that window. Only the resolution value differs. This resolution changes the regularity at which the aggregation windows shift, or the start times of successive aggregation windows. Request A doesn't specify a resolution and thus uses the default value equal to the interval (5 minutes). This request's five-minute aggregation windows are thus taken from the sets of data points emitted from 0: _n_ to 5:00, 5: _n_ to 10:00, and so forth. Request B specifies a 1-minute resolution, so its five-minute aggregation windows are taken from the set of data points emitted every minute from 0: _n_ to 5:00, 1: _n_ to 6:00, and so forth.

[![This image shows how aggregation windows start according to the resolution.](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoringMetricResolution.png)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/images/monitoringMetricResolution.png)

To specify a nondefault resolution that differs from the interval, see [Selecting a Nondefault Resolution for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-resolution.htm "Specify a nondefault value for resolution for querying metric data in Monitoring.") and [Creating an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm.htm "Create an alarm in Monitoring to notify you when metrics meet specified triggers.").

resource group A custom string provided with a custom metric that can be used as a filter or to aggregate results. The resource group must exist in the definition of the posted metric. Only one resource group can be applied per metric.
To select a resource group in a query, see [Selecting a Resource Group in a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-resource-group.htm "Limit returned metric data by matching a resource group when querying custom metric data in Monitoring.").To select a resource group in an alarm query, see [Selecting a Resource Group in an Alarm Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-resource-group.htm "Limit returned metric data by matching a resource group when querying custom metric data for an alarm in Monitoring.").statisticThe aggregation function applied to the set of raw _data points_.To select the statistic for a metric chart or query, see [Changing the Statistic for a Default Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-statistic.htm "Change the query's statistic used for aggregating data plotted on a default metric chart. Default metric charts are available on the Service Metrics page and resource details pages in the Console.") and [Selecting the Statistic for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-statistic.htm "Select the statistic for querying metric data in Monitoring. The statistic is the aggregation function applied to the set of raw data points at the specified interval.").To select the statistic for an alarm query, see [Selecting the Statistic for an Alarm Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-statistic.htm "Select the statistic for an alarm query. The statistic is the aggregation function applied to the set of raw data points at the specified interval.").suppression
A configuration to stop publishing _messages_ during the specified time range. Useful for suspending alarm notifications during system maintenance.
To suppress alarms, see [Suppressing a Single Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-suppression.htm "Temporarily stop notifications from an alarm by applying a suppression. For example, use a suppression to suspend alarm notifications during system maintenance.") and [Suppressing Multiple Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-suppression-multiple.htm "Temporarily stop notifications from alarms by applying a suppression to selected alarms in the Console. For example, use a suppression to suspend notifications from selected alarms.").time rangeThe bounds (timestamps) of the metric data that you want. For example, the past hour.To select the time range for a metric chart or query, see [Changing the Time Range for Default Metric Charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/view-chart-time-range.htm "Set the bounds, or timestamps, of the metric data that you want for default metric charts. By default, charts show the last hour of metric data. Default metric charts are available on the Service Metrics page and resource details pages in the Console."), [Changing the Time Range for a Custom Metric Chart](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/metrics-explorer-time-range.htm "Set the bounds, or timestamps, of the metric data that you want for the metric chart on the Metrics Explorer page in the Console. By default, charts show the last hour of metric data."), and [Selecting a Nondefault Time Range for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-time-range.htm "Set the bounds, or timestamps, of the metric data that you want returned from a query of metric data in Monitoring.").trigger ruleThe condition that must be met for the alarm to be in the firing state. A trigger rule can be based on a threshold or absence of a metric.To set up a trigger rule in an alarm, see [Adding Trigger Rules to an Alarm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-trigger-rule.htm "Define one or more trigger rules, or predicates, for an alarm. A trigger rule is a condition (defined by the query) that must be satisfied for the alarm to be in the firing state, and also includes severity, trigger delay (pendingDuration), and the alarm body to include in notifications. A condition in a trigger rule can specify a threshold, such as 90% for CPU utilization, or an absence.").

## Availability 🔗

The Monitoring service is available in all Oracle Cloud Infrastructure commercial regions. See [About Regions and Availability Domains](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm#About) for the [list](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm#About__The) of available regions, along with associated locations, region identifiers, region keys, and availability domains.

## Supported Services 🔗

The following services have resources or components that can emit metrics to Monitoring:

- Analytics Cloud - see [Monitor Metrics](https://docs.oracle.com/en/cloud/paas/analytics-cloud/acoci/monitor-metrics.html)
- API Gateway - see [API Gateway Metrics](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)
- Application Performance Monitoring - see [Application Performance Monitoring Metrics](https://docs.oracle.com/iaas/application-performance-monitoring/doc/application-performance-monitoring-metrics.html)
- Autonomous Recovery Service - see [Recovery Service Metrics](https://docs.oracle.com/iaas/recovery-service/doc/recovery-service-metrics.html)
- Bastion - see [Bastion Metrics](https://docs.oracle.com/iaas/Content/Bastion/Reference/metrics.htm)
- Batch - see [Batch Metrics](https://docs.oracle.com/iaas/Content/oci-batch/batchmetrics.htm)
- Big Data Service - see [Managing Cluster Metrics](https://docs.oracle.com/iaas/Content/bigdata/metrics-view.htm)
- Block Volume - see [Block Volume Metrics](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)
- Blockchain Platform - see [Monitor Metrics](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/administeroci/monitor-metrics.html)
- Compute - see [Compute Metrics and Monitoring](https://docs.oracle.com/iaas/Content/Compute/References/computemetricsoverview.htm)

- Compute Cloud@Customer - see [Compute Cloud@Customer Metrics](https://docs.oracle.com/iaas/compute-cloud-at-customer/ccc/metrics.htm)

- Connector Hub - see [Connector Hub Metrics](https://docs.oracle.com/iaas/Content/connector-hub/metrics.htm)
- Container Instances - see [Container Instance Metrics](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)
- Data Catalog - see [Data Catalog Metrics](https://docs.oracle.com/iaas/Content/data-catalog/using/metrics.htm)
- Data Flow - see [Data Flow Metrics](https://docs.oracle.com/iaas/Content/data-flow/using/dfs_manage_data_with_data_flow.htm#metrics)
- Data Integration - see [Data Integration Metrics](https://docs.oracle.com/iaas/Content/data-integration/using/metrics.htm)
- Data Science - see [Metrics](https://docs.oracle.com/iaas/Content/data-science/using/metrics.htm)
- Database - see these pages:
  - Metrics for Base Database Service in the Database Management Service: [Monitor a Database Using Database Management Metrics](https://docs.oracle.com/en/cloud/paas/base-database/available-metrics/index.html)
- Database Management - see [Database Management Metrics for Oracle Databases](https://docs.oracle.com/en/cloud/paas/base-database/available-metrics/index.html)
- Database Migration - see [Database Migration Metrics](https://docs.oracle.com/iaas/database-migration/doc/database-migration-metrics.html)
- OCI Database with PostgreSQL - see [OCI Database with PostgreSQL Metrics](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)
- DevOps - see [DevOps Metrics](https://docs.oracle.com/iaas/Content/devops/using/devops_metrics.htm)
- Digital Assistant - see [Digital Assistant Metrics](https://docs.oracle.com/iaas/digital-assistant/doc/service-administration1.html#DACUA-GUID-6BF531B8-4F07-406C-8D04-53B63527B1A3)
- DNS - see [DNS Metrics](https://docs.oracle.com/iaas/Content/DNS/Reference/dnsmetrics.htm)
- Email Delivery - see [Email Delivery Metrics](https://docs.oracle.com/iaas/Content/Email/Reference/metricsalarms.htm)
- Events - see [Events Metrics](https://docs.oracle.com/iaas/Content/Events/Reference/eventsmetrics.htm)
- File Storage - see [File System Metrics](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)
- Functions - see [Function Metrics](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)
- Globally Distributed Autonomous AI Database - see [Monitor Performance with Autonomous AI Database Metrics](https://docs.oracle.com/en/cloud/paas/autonomous-database/adbsa/autonomous-monitor-metrics.html)
- Globally Distributed Exadata Database on Exascale Infrastructure (See [Metrics for Oracle Exadata Database Service on Dedicated Infrastructure in the Monitoring Service](https://docs.oracle.com/en/engineered-systems/exadata-cloud-service/ecscm/metrics-for-exadata-database-service-on-dedicated-infrastructure-in-the-monitoring-service.html#GUID-B82F2A9D-56C4-459A-9EEE-A3330741F31F))
- GoldenGate - see [Oracle Cloud Infrastructure GoldenGate Metrics](https://docs.oracle.com/iaas/goldengate/doc/goldengate-metrics.html)
- Health Checks - see [Health Checks Metrics](https://docs.oracle.com/iaas/Content/HealthChecks/Reference/metricsalarms.htm)
- Integration Generation 2: [View Message Metrics](https://docs.oracle.com/en/cloud/paas/integration-cloud/oracle-integration-oci/viewing-message-metrics.html)
- Integration 3: [View Message Metrics and Billable Messages](https://docs.oracle.com/iaas/application-integration/doc/viewing-message-metrics.html)
- Java Management - see [Java Management Metrics](https://docs.oracle.com/iaas/jms/doc/java-management-metrics.html)
- Kubernetes Engine - see [Kubernetes Engine (OKE) Metrics](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)
- Load Balancer - see [Load Balancer Metrics](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm)
- Logging - see [Logging Metrics](https://docs.oracle.com/iaas/Content/Logging/metrics.htm)
- Log Analytics - see [Monitor Log Analytics Using Service Metrics](https://docs.oracle.com/iaas/log-analytics/doc/administer-other-actions.html#GUID-B7EA5A71-3887-49C4-9D8E-9D45E2CCEBF1)
- Media Streams (Media Services)- see [Media Streams Metrics](https://docs.oracle.com/iaas/Content/media-services/mediastreams/mediastreams_metrics.htm)
- Management Agent - see [Management Agent Metrics](https://docs.oracle.com/iaas/management-agents/doc/agent-metrics.html)
- MySQL HeatWave - see [Metrics](https://docs.oracle.com/iaas/mysql-database/doc/mysql-database-metrics.html)
- Networking - see [Networking Metrics](https://docs.oracle.com/iaas/Content/Network/Reference/networkmetrics.htm)

- NoSQL Database Cloud - see [Service Metrics](https://docs.oracle.com/en/cloud/paas/nosql-cloud/fnsxl/#GUID-3D6B7AE0-EBE0-4E41-AC43-AA13DB419BF2)
- Notifications - see [Notifications Metrics](https://docs.oracle.com/iaas/Content/Notification/Reference/notificationmetrics.htm)
- Network Firewall - see [Monitoring Firewalls](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)
- Object Storage - see [Object Storage Metrics](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)
- Ops Insights - see [Ops Insights Metrics](https://docs.oracle.com/iaas/operations-insights/doc/operations-insights-metrics.html)
- Oracle APEX Application Development - see [Monitor APEX Service Performance](https://docs.oracle.com/en/cloud/paas/apex/gsadd/monitor-apex-service-performance.html#GUID-4E640EB2-CACB-4994-BEE4-E40237AA5945)
- OS Management Hub - see [OS Management Hub Metrics](https://docs.oracle.com/iaas/osmh/doc/metrics.htm)
- Process Automation - see [Monitor Oracle Cloud Infrastructure Process Automation](https://docs.oracle.com/iaas/process-automation/oci-process-automation/monitor-oracle-cloud-infrastructure-process-automation.html)
- Queue - see [Queue Metrics](https://docs.oracle.com/iaas/Content/queue/metrics.htm)
- Secret Management Service - see [Secret Management Metrics](https://docs.oracle.com/iaas/Content/secret-management/Concepts/metrics.htm)
- Service Mesh - see [Service Mesh Metrics](https://docs.oracle.com/iaas/Content/service-mesh/sm-metrics.htm)
- Stack Monitoring - see [Metric Reference](https://docs.oracle.com/iaas/stack-monitoring/doc/metric-reference.html)
- Streaming - see [Streaming Metrics](https://docs.oracle.com/iaas/Content/Streaming/Reference/streamingmetrics.htm)
- Vulnerability Scanning - see [Scanning Metrics](https://docs.oracle.com/iaas/Content/scanning/using/metrics.htm)
- WAF - see [Edge Policy Metrics](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

## Resource Identifiers 🔗

Most types of Oracle Cloud Infrastructure resources have a unique, Oracle-assigned identifier called an Oracle Cloud ID (OCID). For information about the OCID format and other ways to identify your resources, see [Resource Identifiers](https://docs.oracle.com/iaas/Content/General/Concepts/identifiers.htm)., see [Resource Identifiers](https://docs.oracle.com/iaas/Content/General/Concepts/identifiers.htm).

**Note**

Metric resources don't have **OCIDs**.

## Ways to Access Monitoring  🔗

You can access Oracle Cloud Infrastructure (OCI) by using the [Console](https://docs.oracle.com/iaas/Content/GSG/Tasks/signingin_topic-Signing_In_for_the_First_Time.htm) (a browser-based interface), [REST API](https://docs.oracle.com/iaas/Content/API/Concepts/usingapi.htm), or [OCI CLI](https://docs.oracle.com/iaas/Content/API/Concepts/cliconcepts.htm). Instructions for using the Console, API, and CLI are included in topics throughout this documentation.For a list of available SDKs, see [Software Development Kits and Command Line Interface](https://docs.oracle.com/iaas/Content/API/Concepts/sdks.htm).

Console: To access Monitoring using the [Console](https://cloud.oracle.com/), you must use a [supported browser](https://docs.oracle.com/iaas/Content/GSG/Tasks/signinginIdentityDomain.htm#supported-browsers). To go to the Console sign-in page, open the navigation menu at the top of this page and select **Infrastructure Console**. You are prompted to enter your cloud tenant, your user name, and your password.
Open the **navigation menu** and select **Observability & Management**. Under **Monitoring**, select **Service Metrics**.

API: To access Monitoring through APIs, use [Monitoring API](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/) for metrics and alarms and [Notifications API](https://docs.oracle.com/iaas/api/#/en/notification/latest/) for notifications (used with alarms).

CLI: See [Command Line Reference for Monitoring](https://docs.oracle.com/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/monitoring.html) and [Command Line Reference for Notifications](https://docs.oracle.com/iaas/tools/oci-cli/latest/oci_cli_docs/cmdref/ons.html).

## Authentication and Authorization 🔗

Each service in Oracle Cloud Infrastructure integrates with IAM for authentication and authorization, for all interfaces (the Console, SDK or CLI, and REST API).

An administrator in an organization needs to set up **groups**, **compartments**, and **policies** that control which users can access which services, which resources, and the type of access. For example, the policies control who can create new users, create and manage the cloud network, create instances, create buckets, download objects, and so on. For more information, see [Managing Identity Domains](https://docs.oracle.com/iaas/Content/Identity/domains/overview.htm). For specific details about writing policies for each of the different services, see [Policy Reference](https://docs.oracle.com/iaas/Content/Identity/Reference/policyreference.htm).

If you're a regular user (not an administrator) who needs to use the Oracle Cloud Infrastructure resources that the company owns, contact an administrator to set up a user ID for you. The administrator can confirm which compartment or compartments you can use.

For more information about user authorizations for monitoring, see [IAM Policies](https://docs.oracle.com/iaas/Content/Security/Reference/monitoring_security.htm#iam-policies).

Administrators: For common policies that give groups access to metrics, see [Metric Access for Groups](https://docs.oracle.com/iaas/Content/Security/Reference/monitoring_security.htm#metric-groups).
For common alarm policies, see [Alarm Access for Groups](https://docs.oracle.com/iaas/Content/Security/Reference/monitoring_security.htm#alarm-groups). To authorize resources, such as instances, to make API calls, add the resources to a [dynamic group](https://docs.oracle.com/iaas/Content/Identity/dynamicgroups/managingdynamicgroups.htm). Use the dynamic group's matching rules to add the resources, and then create a policy that allows that dynamic group access to metrics. See [Metric Access for Resources](https://docs.oracle.com/iaas/Content/Security/Reference/monitoring_security.htm#metric-dynamic).

## Limits on Monitoring  🔗

See [Monitoring Limits](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#MonitoringLimits) for a list of applicable limits and instructions for requesting a limit increase.

Other limits include the following.

### Storage Limits 🔗

| Item | Time range stored |
| --- | --- |
| Metric definitions | 90 days |
| Alarm history entries | 90 days |

### Returned Data Limits (Metrics) 🔗

When you [query metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/buildingqueries.htm "View custom metric charts, list metric definitions, and query metric data for resources of interest.") and [view metric charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/viewingcharts.htm "View metric charts that use predefined service queries. Default metric charts are available on the Service Metrics page and resource details pages in the Console."), the returned data is subject to certain limits.
Limits information for returned data includes the 100,000 data point maximum and [time range maximums (determined by resolution, which relates to interval)](https://docs.oracle.com/iaas/Content/Monitoring/Reference/mql.htm#Interval). See [MetricData](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/MetricData).

### Alarm Message Limits 🔗

The maximum number of messages per alarm evaluation depends on the alarm destination. Limits are associated with the Oracle Cloud Infrastructure service used for the destination.

Monitoring tracks 200,000 metric streams per alarm for [qualifying events](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageTypes "The message type indicates the reason that the message was sent."). For more information about alarm evaluations, see [Alarm Evaluations](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#alarm-eval "Monitoring evaluates alarms once per minute to find alarm status.")
on this page.

| Alarm destination | Delivery | Maximum alarm messages per evaluation |
| --- | --- | --- |
| topic (Notifications) | [At least once](https://docs.oracle.com/iaas/Content/Notification/Concepts/notificationoverview.htm#concepts) | 60 |
| stream (Streaming) | [At least once](https://docs.oracle.com/iaas/Content/Streaming/Concepts/streamingoverview.htm#benefits_of_streams) | 100,000 |

For example, consider the following evaluations of an alarm that [splits notifications](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/split-messages.htm "Walk through setting up an alarm to send a message for each metric stream. In this example, you want to be notified whenever a server exceeds a threshold. With this setup, you receive server-specific messages.") among 200 metric streams, using a topic as its destination.

| Alarm evaluation (time) | Metric stream transition | Generated messages | Sent messages | Dropped messages |
| --- | --- | --- | --- | --- |
| 00:01:00 | 110 metric streams transition from OK to FIRING. | 110 | 60 | 50 |
| 00:02:00 | 90 metric streams transition from OK to FIRING. | 90 | 60 | 30 |

When a topic or stream is overused, it can result in delayed alarm notifications. Overuse can occur when multiple resources are using that topic or stream.

#### Best Practices to Work Within Limits 🔗

When you expect a high volume of alarm notifications, follow these best practices to help prevent exceeding alarm message limits and associated delays.

- Reserve a single topic or stream for use with a high-volume alarm. Don't use one topic or stream for multiple high-volume alarms.
- If you expect more than 60 messages per minute, specify Streaming as the alarm destination.

- Streams:
  - Create partitions based on expected load. See [Limits on Streaming Resources](https://docs.oracle.com/iaas/Content/Streaming/Concepts/streamingoverview_topic-Limits_on_Streaming_Resources.htm).
  - If alarm messages exceed the stream space, then update the alarm to use a different stream that has more partitions. For example, if the original stream contains five partitions, create a stream with ten partitions and then update the alarm to use the new stream.
    **Note**



     To avoid missing messages, continue consuming the original stream until no more messages are received.
- Increase limits for the tenancy:
  - Topics: See [Limits for publishing messages (PublishMessage operation)](https://docs.oracle.com/iaas/Content/Notification/Concepts/notificationoverview.htm#limits__PublishMessageLimits).
  - Streams: See [Limits on Streaming Resources](https://docs.oracle.com/iaas/Content/Streaming/Concepts/streamingoverview_topic-Limits_on_Streaming_Resources.htm).

### Troubleshooting Limits 🔗

To troubleshoot a query error for too many metric streams, see [Error: Exceeded Maximum Metric Streams](https://docs.oracle.com/en-us/iaas/Content/Monitoring/troubleshooting-queries.htm#query-limits "Troubleshoot too many metric streams when querying metric data.").

For troubleshooting information, see [Troubleshooting Monitoring](https://docs.oracle.com/en-us/iaas/Content/Monitoring/troubleshooting.htm "Use troubleshooting information to identify and address common issues that can occur while working with Monitoring.").

## Security 🔗

This topic describes security for Monitoring.

For information about how to secure Monitoring, including security information and recommendations, see [Securing Monitoring](https://docs.oracle.com/iaas/Content/Security/Reference/monitoring_security.htm).

Was this article helpful?

YesNo

- Expand All Expandable Areas

- [Overview of Monitoring](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#top)
- [How Monitoring Works](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#How)
- [Metrics Feature Overview](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#metrics)
- [Alarms Feature Overview](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#alarms)
- [Message Types](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageTypes)
- [Message Format and Examples](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#MessageFormat)
- [Monitoring Concepts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#concepts)
- [Availability](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#availability)
- [Supported Services](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices)
- [Resource Identifiers](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#resource)
- [Ways to Access Monitoring](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#ways)
- [Authentication and Authorization](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#Authenti)
- [Limits on Monitoring](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#limits)
- [Storage Limits](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#Storage)
- [Returned Data Limits (Metrics)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#ReturnedDataLimits)
- [Alarm Message Limits](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#limits-alarm-messages)
- [Troubleshooting Limits](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#TroubleshootingLimits)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#security)

Was this article helpful?

YesNo

Updated 2026-01-22
- [Skip to content](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/www.ateam-oracle.com/post.php) [Twitter](https://twitter.com/share?url=/www.ateam-oracle.com/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/www.ateam-oracle.com/post.php) [Email](https://www.ateam-oracle.com/placeholder.html)

[Tell Me About](https://www.ateam-oracle.com/category/atm)

# Deep Dive into OCI Observability and Management Monitoring Query Language in OCI Alarms

July 31, 20249 minute read

![Profile picture of Royce Fu](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/12/roycefu_profile_2025_png.png)[Royce Fu](https://www.ateam-oracle.com/authors/royce-fu)
Master Principal Cloud Architect

Oracle Cloud Infrastructure (OCI) offers robust operations and monitoring capabilities that enable you to maintain high availability, performance, and security for your cloud resources. One of the most powerful tools in OCI’s monitoring suite is the [Monitoring Query Language (MQL)](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Reference/mql.htm). Crafting effective MQL queries can significantly enhance your ability to track and respond to system metrics and events. This blog post will cover best practices for using MQL to optimize your OCI monitoring.

# Monitoring Service

The [Monitoring service](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm) uses metrics to monitor resources and alarms to notify you when these metrics meet alarm-specified triggers.

Metrics are emitted to the Monitoring service as raw data points, or timestamp-value pairs, along with dimensions and metadata.

![Figure 1. OCI Monitoring Service Reference Architecture](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/blog-monitoringOverview.png)
Figure 1. OCI Monitoring Service Reference Architecture


Metrics come from various sources:

- Service metrics automatically posted by Oracle Cloud Infrastructure resources .
  - For example, the Compute service posts metrics for monitoring-enabled compute instances through the oci\_computeagent namespace. One such metric is CPUUtilization.
- Data sent to new or existing metrics using Connector Hub (with Monitoring as the target service for a connector).
  - For example, capture and count the detected string from the application log and aggregate and send the occurrences to Monitoring service.
- Custom metrics published using the Monitoring API.
  - For example, you can use OCI CLI or SDK to capture/collect and post metrics to Monitoring service.
- Infrastructure and Application Stack Monitoring Metrics from OCI Stack Monitoring
- Database Monitoring Metrics from Database Management Service
- Application Performance Monitoring Metrics from Application Performance Monitoring
- Capacity Planning and SQL Performance Management Metrics from Ops Insights

For more details, see Supported Services and Viewing [Default Metric Charts](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/viewingcharts.htm#top).

# Understand Monitoring Query Language (MQL) and Alarm Evaluations

A Monitoring Metric is a measurement data point related to health, capacity, or performance of a resource. You can collect metrics from resources, services, and applications and send metrics to the Monitoring service. By querying Monitoring for this data, you can understand how well the systems and processes are working to achieve the service levels you commit to your customers.  For example:

- Application uptime and downtime
- Availability and latency
- Completed transactions
- Failed and successful operations
- Key performance indicators (KPIs), such as sales and engagement quantifiers

Even Monitoring service provides us the intuitive UI to query OCI Monitoring metrics across different metrics namespaces, resource groups and aggregate the data by selecting different interval and statistics. But from time to time, you will discover the UI limitations for more complex monitoring use cases. Monitoring Query Language (MQL) is here to rescue!

MQL is a flexible and powerful language designed for querying OCI Monitoring metrics. It allows you to perform complex aggregations, transformations, and filtering of metric data. Understanding how to construct effective MQL queries is essential for gaining actionable insights and creating effective alarms from the cloud resources monitoring data.

![Figure 2. MQL to show the CpuUtilization and MemoryUtilization in the same view](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/blog-monitoring-alarms-metrics-explorer.png)
Figure 2. MQL to show the CpuUtilization and MemoryUtilization in the same view


[OCI Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm) uses Monitoring Query Language (MQL) for expressing the metrics and the condition that must be evaluated. A alarm query must specify a metric, metric resolution, statistic, interval, and a trigger rule (threshold or absence). It’s crucial to be familiar with MQL to create effective alarm definition for cloud operation readiness.

### Facts about Monitoring Alarms

- Monitoring evaluates alarms once per minute to find alarm status.
- When the alarm splits notifications, Monitoring evaluates each tracked metric stream. If the evaluation of that metric stream indicates a new FIRING status or other qualifying event, then Monitoring sends an alarm message.
- Monitoring tracks metric streams per alarm for qualifying events.
- Alert will be sent when evaluating the condition for every metric stream when splits messages by Metric Stream is enabled
- Metrics are aggregated with 1 minute interval by default.
- Supported values for interval depends on the specified time range in the alarm data quick select. One hour time range supports all interval values whereas 90 days time range only supports interval value between 1 hour and 1 day.
- By default, metric queries’ resolution is the same as the query interval. Resolution can’t be selected for alarm queries. The only valid value of the resolution for an alarm query request is 1 minute.
- Alarm history entries store past 90 days of the metrics.
- Monitoring tracks metric streams per alarm for qualifying events, but messages are subject to the destination service limits.

The following is JSON format of the alarm definition which measures the 90th percentile of the metric CpuUtilization.

[Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)

Copied to Clipboard

Error: Could not Copy

Copied to Clipboard

Error: Could not Copy

```
{
  "compartmentId": "ocid1.compartment.oc1..exampleuniqueID",
  "destinations": ["ocid1.onstopic.exampleuniqueID"],
  "displayName": "High CPU Utilization",
  "id": "ocid1.alarm.oc1..exampleuniqueID",
  "lifecycleState": "ACTIVE",
  "metricCompartmentId": "ocid1.compartment.oc1..exampleuniqueID",
  "namespace": "oci_computeagent",
  "pendingDuration": "PT3M",
  "query": "CpuUtilization[1m]{availabilityDomain = \"cumS:PHX-AD-1\"}.groupBy(availabilityDomain).percentile(0.9) > 85",
  "repeatNotificationDuration": "PT2H",
  "severity": "WARNING",
  "isEnabled": true,
  "timeCreated": "2024-07-01T01:02:29.600Z",
  "timeUpdated": "2024-07-03T01:02:29.600Z"
}
```

# MQL Alarm Examples

MQL syntax governs expressions for querying metrics that are published to the Monitoring service. MQL expressions. Define alarm queries. MQL acts on aggregated data.

![Figure 3. Monitoring Query Language Reference](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/blog-monitoring-mql.png)
Figure 3. Monitoring Query Language Reference


## Host Monitoring

### Host Availability Monitoring

- Description: Critical alarm for any host in a compartment missing MonitoringStatus metric or MonitoringStatus metric is 0 for past 7 minutes.
- Resource Type: Host
- Metric Namespace: oracle\_appmgmt
- Resource Group: host
- Trigger delay minutes: 5 mins
- Notification grouping: Split notifications per metric stream
- Trigger rule severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
MonitoringStatus[2m].groupBy(resourceName).mean() == 0 || MonitoringStatus[2m].groupBy(resourceName).absent() == 1
```


### High CPU Utilization Monitoring

- Description: Warning alarm for any host in a compartment reporting over 80% CPU utilization for past 5 minutes. Critical alarm for any host in a compartment reporting over 90% CPU utilization for past 5 minutes.
- Resource Type: Host
- Metric Namespace: oracle\_appmgmt
- Resource Group: host
- Trigger delay minutes: 2 mins
- Notification grouping: Split notifications per metric stream
- Trigger Rule 1 severity: Warning
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
CpuUtilization[3m].groupBy(resourceName).mean() > 80
```

- Trigger Rule 2 severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
CpuUtilization[3m].groupBy(resourceName).mean() > 90
```


### Filesystem Utilization Monitoring

- Description:
  - Warning alarm for any filesystem on any host in a compartment reporting over 80% memory utilization for past 15 minutes.
  - Critical alarm for any filesystem on any host in a compartment reporting over 90% memory utilization for past 15 minutes.
- Resource Type: Host
- Metric Namespace: oracle\_appmgmt
- Resource Group: host
- Trigger delay minutes: 5 mins
- Notification grouping: Split notifications per metric stream
- Trigger Rule 1 severity: Warning
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
host::FilesystemUtilization[10m]{osType = "Linux"}.groupBy(fileSystemName, resourceName).mean() > 80
```

- Trigger Rule 2 severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
host::FilesystemUtilization[10m]{osType = "Linux"}.groupBy(fileSystemName, resourceName).mean() > 90
```


## Oracle WebLogic Server

### WebLogic Server Down

- Description: Critical alarm for any WebLogic Server in a compartment missing MonitoringStatus metric or MonitoringStatus metric is 0 for past 7 minutes.
- Resource Type: OracleWeblogic Server
- Metric Namespace: oracle\_appmgmt
- Resource Group: weblogic\_j2eeserver
- Trigger delay minutes: 5 mins
- Notification grouping: Split notifications per metric stream
- Trigger rule severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
MonitoringStatus[2m].groupBy(resourceName).mean() == 0 || MonitoringStatus[2m].groupBy(resourceName).absent() == 1
```


### WebLogic Work Manager Stuck Threads

- Description: Warning alarm for any WebLogic Server in a compartment reporting more than 10 work manager stuck thread for past 5 minutes. Critical alarm for any WebLogic Server in a compartment reporting more than 15 work manager stuck thread for past 5 minutes.
- Resource Type: OracleWeblogic Server
- Metric Namespace: oracle\_appmgmt
- Resource Group: weblogic\_j2eeserver
- Trigger delay minutes: 5 mins
- Notification grouping: Split notifications per metric stream
- Trigger Rule 1 severity: Warning
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
WorkManagerStuckThreads[5m].groupBy(resourceName).sum() >= 10
```

- Trigger Rule 2 severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
WorkManagerStuckThreads[5m].groupBy(resourceName).sum() >= 15
```


## ApacheHTTP server

### Apache HTTP Server High Web Request Processing Time

- Description: Warning alarm for any Apache HTTP Server in a given compartment reporting over 1500ms mean web request processing time for past 1-5 minutes. Critical alarm for any Apache HTTP Server in a given compartment reporting over 3000ms mean web request processing time for past 1-5 minutes.
- Resource Type: Apache HTTP
- Metric Namespace: oracle\_appmgmt
- Resource Group: apache\_http\_server
- Trigger delay minutes: 5 mins
- Notification grouping: Split notifications per metric stream
- Trigger Rule 1 severity: Warning
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
WebRequestProcessingTime[5m].groupBy(resourceName).mean() >= 1500
```

- Trigger Rule 2 severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
WorkManagerStuckThreads[5m].groupBy(resourceName).mean () >= 3000
```


## Oracle Database

Database Management Service provide recommended alarms template for Oracle Database Monitoring. From Database Management service, select Database name under Oracle Database, select Alarm definitions, create recommended alarms.

### Tablespace space Utilization Monitoring

- Description: Warning and Critical alarm rule conditions for permanent tablespaces whose utilization is greater than 75% or 85% over the past 10 minutes.
- Resource Type: Database
- Metric Namespace: oracle\_oci\_database
- Resource Group: N/A
- Trigger delay minutes: 5 mins
- Notification grouping: Split notifications per metric stream
- Trigger Rule 1 severity: Warning
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
StorageUtilizationByTablespace[5m].groupBy(resourceName).mean() > 75
```

- Trigger Rule 2 severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
StorageUtilizationByTablespace[5m].groupBy(resourceName).mean() > 80
```


### ProcessLimitUtilization Monitoring

- Description: Warning and Critical alarm rule conditions to trigger an alarm when the process utilization (%) is greater than 90% or 95% over the past 5 minutes.
- Resource Type: Database
- Metric Namespace: oracle\_oci\_database
- Resource Group: N/A
- Trigger delay minutes: 3 mins
- Notification grouping: Split notifications per metric stream
- Trigger Rule 1 severity: Warning
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
ProcessLimitUtilization[2m].groupBy(deploymentType, resourceName).mean() > 90
```

- Trigger Rule 2 severity: Critical
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
ProcessLimitUtilization[2m].groupBy(deploymentType, resourceName).mean() > 95
```


## E-Business Suite

### EBS Concurrent Processing Requests Error Rate

- Resource Type: EBS Concurrent Processing
- Metric Namespace: oracle\_appmgmt
- Resource Group: oracle\_ebs\_conc\_mgmt\_service
- Trigger delay minutes: 2 mins
- Notification grouping: Split notifications per metric stream
- Trigger Rule 1 severity: Warning
- [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



Copied to Clipboard



Error: Could not Copy



Copied to Clipboard



Error: Could not Copy





```
CompletedConcurrentRequests[15m]{State = "Errored"}.mean() > 0.001
```


# Best Practices and Tips for MQL Alarms

- We recommend using the O&M advanced services metric namespaces as much as possible because it covers wider range of metrics.
  - oracle\_appmgmt: Application Performance Monitoring and Stack Monitoring
  - oracle\_oci\_database: Database Management Service
  - oracle\_oci\_database\_cluster: Database Management Service for cluster
  - oracle\_apm\_rum: APM for Real User Monitoring
  - oracle\_apm\_synthetics: APM for Synthetic Monitoring
  - oci\_operations\_insights: Ops Insights
- Combining both Threshold Alarm and Absence Alarm by joining metrics to deliver comprehensive technology stack alerting coverage
  - Eg. Combining both host monitoring status and weblogic server monitoring status



    Copied to Clipboard



    Error: Could not Copy



    Copied to Clipboard



    Error: Could not Copy





    ```
    host::MonitoringStatus[1m]{agentHostName = "atfmw-soa-0.oraclevcn.com"}.groupBy(resourceName).mean() || weblogic_j2eeserver::MonitoringStatus[1m]{agentHostName = "atfmw-soa-0.oraclevcn.com"}.groupBy(resourceName).mean() || oracle_soainfra::MonitoringStatus[1m]{agentHostName = "atfmw-soa-0.oraclevcn.com"}.groupBy(resourceName).mean() || oracle_servicebus::MonitoringStatus[1m]{agentHostName = "atfmw-soa-0.oraclevcn.com"}.groupBy(resourceName).mean()
    ```
- ![Figure 4. Advanced MQL Monitoring Alarm for multi-stack monitoring](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/blog-monitoring-alarms-metrics-join.png)
Figure 4. Advanced MQL Monitoring Alarm for multi-stack monitoring


- We recommend always using groupBy in the query of absence alarm. Using groupBy prevents irrelevant alarm triggers when OCI introduces new dimensions. A new dimension creates an initially empty metric stream. Without groupBy, the alarm monitors all metric streams.
  - For example, consider the query CpuUtilization\[1m\].absent(). If OCI Compute adds a dimension to CpuUtilization, then the alarm is triggered, regardless of the presence of other metric streams.
- Test and validate the metrics for monitoring requirement
- Use trigger delay minutes to reduce the false alarms, we recommend to set trigger delay minutes to 3-5 minutes to decrease the possibility of false notifications.



    Copied to Clipboard



    Error: Could not Copy



    Copied to Clipboard



    Error: Could not Copy





    ```
    host::FilesystemUtilization[10m]{osType = "Linux"}.groupBy(fileSystemName, resourceName).mean() > 80
    ```
- Use Nesting Queries in MQL Alarm
  - Example 1: Sum of Hosts with CPU utilization Greater than 80 Percent
    - [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



      Copied to Clipboard



      Error: Could not Copy



      Copied to Clipboard



      Error: Could not Copy





      ```
      (CpuUtilization[1m].max() > 80).grouping().sum()
      ```
  - Example 2: Sum of Availability Domains with a Success Rate Lower than 0.99
    - [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



      Copied to Clipboard



      Error: Could not Copy



      Copied to Clipboard



      Error: Could not Copy





      ```
      (SuccessRate[1m].groupBy(availabilityDomain).mean() < 0.99).grouping().sum()
      ```
  - Example 3: Count of Hosts with Up Time Greater than Zero
    - [Copy code snippet](https://www.ateam-oracle.com/deep-dive-into-oci-observability-and-management-monitoring-query-language-in-oci-alarms#copy)



      Copied to Clipboard



      Error: Could not Copy



      Copied to Clipboard



      Error: Could not Copy





      ```
      (metric[1h].groupBy(host).min() > 0).grouping().count()
      ```
- Utilize metric stream split
- Understand the internal REST period. The internal reset period determines when an alarm stops checking for an absent metric that triggered the Firing state in the previous evaluation. The length of the internal reset period is globally configured at 10 minutes, which causes the alarm history to show a 10-minute difference.
- The maximum number of messages per alarm evaluation depends on the alarm destination. 60 max alarm messages per evaluation is supported for Notifications topic, whereas 100,000 max alarm messages per evaluation is supported for Streaming service.
- If you expect more than 60 messages per minute, specify streaming as the alarm destination.

# Conclusion

Creating effective MQL queries is a critical skill for optimizing your OCI operations and monitoring strategy. By following these best practices, you can harness the full power of MQL to gain deep insights into your cloud infrastructure, ensuring high performance, availability, and security. Start with clear objectives, familiarize yourself with the available metrics, and iterate on your queries to refine and perfect your monitoring and alerting capabilities.

# Reference

- [Monitoring Metrics Supported Services](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices)
- [Publishing Custom Metrics](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm)
- [Selecting a Nondefault Resolution for a Query](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/query-metric-resolution.htm#top%C2%A0)
- [Setting up Alarms for Stack Monitoring](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/setting-alarms.html)
- [Overview of Monitoring](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Concepts/monitoringoverview.htm%C2%A0)
- [MQL Reference](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Reference/mql.htm)
- [Managing Alarms](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/managingalarms.htm)


### Authors

![Profile picture of Royce Fu](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/12/roycefu_profile_2025_png.png)

#### Royce Fu

##### Master Principal Cloud Architect



Royce Fu is the Master Principal Cloud Architect from Oracle North America Gen AI Data Platform Engineering. Royce has diverse background and experience across IT infrastructure operation, engineering, and architecture. As a member of the Oracle Database Certified Masters, Royce has deep expertise in Oracle Database Technologies, OCI Observability and Management and Gen AI Data Platform Engineering, Architecture, and Integration. He started his career as a software engineer, and spent over a decade specializing in database and system integration engineering and architecture.

Show more

[Previous post](https://www.ateam-oracle.com/reference-architecture-fusion-hcm-data-replication-into-faw-adw-using-odi-marketplace-and-hcm-extract-part-3 "Reference Architecture - Fusion HCM Data Replication into FAW ADW Using ODI Marketplace and HCM Extract - Part 3")

#### Reference Architecture - Fusion HCM Data Replication into FAW ADW Using ODI Marketplace and HCM Extract - Part 3

[Matthieu Lombard](https://www.ateam-oracle.com/authors/matthieu-lombard) \| 2 minute read

[Next post](https://www.ateam-oracle.com/monitor-oci-devops-performance-observability-and-management "Monitoring OCI DevOps Performance using Observability & Management")

#### Monitoring OCI DevOps Performance using Observability & Management

[Khushboo Nigam](https://www.ateam-oracle.com/authors/khushboo-nigam) \| 2 minute read
[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-27.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-27.png) In earlier articles, I have discussed features in Oracle Cloud Infrastructure for monitoring metrics published by virtually all OCI services. These metrics get published when functions are invoked, files are written, the API Gateway handles a request, events are published, a user is created and a network transfers a packet. The metrics are gathered in a big metrics lake inside OCI where they are retained for 14 days. By querying the Monitoring service for this data, you can understand how well the systems and processes are working to achieve the service levels you commit to your customers. Metrics can be inspected in the console using predefined charts and using the metrics explorer. Metrics can also be retrieved through the CLI and the REST API. Alarms can be defined with query conditions on the metrics; when an Alarm condition is satisfied, the alarm is ‘sounded’: it will publish a notification that results in an email being sent or a web hook being invoked.

It is a common desire to not only monitor the behavior of VMs, network resources and other technical resources, but to also – and even primarily – keep an eye on the functional behavior of the system. To learn about the \[trends and fluctuations in time of the\] number of orders per product category and country, the increase in the number of tweets on the Corona virus in a city or province and the unexpected absence of traffic on a web site or API. This functional or business activity monitoring is support by the OCI Monitoring service: You can publish your own metrics to Monitoring using the API. You can view charts of your published metrics using the Console , query metrics using the API, and set up alarms using the Console or API.You can access your published custom metrics the same way you access any other metrics stored by the Monitoring service.

Metrics have a name and a set of one or more data points (combinations of a numerical value and a timestamp and optionally a count in case multiple observations with the same value are made at the same time). Metrics are associated with a metrics namespace and optionally with a resource group (which could for example be a stand alone application, division, realm). Metrics can be further qualified with up to 16 dimensions as well as metadata (key / value pairs that further describe the data point).

Metrics should be defined with aggregation in mind: while custom metrics can be posted as frequently as every second , the minimum aggregation interval is one minute – in reports, charts and alarms.

In this article, I will show how to publish custom metrics in order to do functional application monitoring. These custom metrics appear in charts in the console, can be retrieved for reporting through the APIs and are the basis for functional alarms.

The steps I will discuss:

1. Define policies for inspecting metrics in a compartment and for publishing custom metrics to the OCI Monitoring service
2. Publish Custom Metrics through the OCI CLI
3. Inspect custom metrics through the OCI Monitoring \| Metrics Explorer in the browser console
4. Inspect custom metrics through the OCI CLI
5. Define an Alarm and corresponding Notification on custom metrics – to be notified when a functional event of note takes place
6. Publish Custom Metrics that trigger the Alarm

### 1\. Define policies for inspecting publishing metrics

Users that want to inspect metrics produced in the context of a specific compartment need to be in a group that has been granted permissions to do so through policies.

To read metrics and inspect metrics definitions in a compartment, the required policy statements are (see [docs](https://docs.cloud.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#metrics-access)):  “read metrics in compartment” and “inspect metrics in compartment” respectively. In order to publish custom metrics in a custom metrics namespace, the policy statement required is: “use metrics in tenancy where target.metrics.namespace=’mycustomnamespace’ “. To create an alarm, the needed policy statement are “manage alarms in tenancy” and “read metrics in tenancy”. To create a notification topic to link the alarm to, the policy statement is “manage ons-topics”.

Note: To reduce the scope of access to a particular compartment, specify that compartment instead of the tenancy in the policy statement.

I will be using an OCI user that is a member of the group _lab-participants_. The policy statements shown in the screenshot cover the requirements for this user.

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-28.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-28.png)

### 2\. Publish Custom Metrics through the OCI CLI

Custom Metrics can be published through the command line interface as well as the REST API and the SDKs. They cannot be published through the OCI console. Documentation on the OCI CLI route are [here](https://docs.cloud.oracle.com/en-us/iaas/tools/oci-cli/2.9.1/oci_cli_docs/cmdref/monitoring/metric-data/post.html). The metrics to be published are defined in a JSON document. The easiest way of publishing custom metrics through the OCI CLI is by creating a file that contains this JSON document and then referring to that document in the OCI CLI call. This call looks like this:

|     |     |
| --- | --- |
| 1 | `oci monitoring metric-data post --endpoint https://telemetry-ingestion.us-ashburn-1.oraclecloud.com --metric-data file://./custom-metrics.json` |

The endpoint parameter specifies the endpoint for the home region of my cloud tenancy. The file that contains the JSON definition of the custom metrics is called _custom-metrics.json_.  Here is the contents of that file – that represents orders of products, presumably in a web shop:

|     |     |
| --- | --- |
| 1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>43<br>44<br>45<br>46<br>47<br>48<br>49<br>50<br>51<br>52<br>53<br>54 | `[`<br>```{`<br>```"compartmentId": "$compartmentId",`<br>```"datapoints": [`<br>```{`<br>```"count": 10,`<br>```"timestamp": "2020-02-08T04:18:01+00:00",`<br>```"value": 5.0`<br>```},`<br>```{`<br>```"count": 3,`<br>```"timestamp": "2020-02-08T05:11:01+00:00",`<br>```"value": 10.0`<br>```}`<br>```],`<br>```"dimensions": {`<br>```"product": "ball",`<br>```"country": "NL"`<br>```},`<br>```"metadata": {`<br>```"category": "toys",`<br>```"note": "national holiday"`<br>```},`<br>```"name": "productOrder",`<br>```"namespace": "mymetricsnamespace",`<br>```"resourceGroup": "divisionX"`<br>```},`<br>```{`<br>```"compartmentId": "$compartmentId",`<br>```"datapoints": [`<br>```{`<br>```"count": 7,`<br>```"timestamp": "2020-02-08T03:22:01+00:00",`<br>```"value": 3.0`<br>```},`<br>```{`<br>```"count": 11,`<br>```"timestamp": "2020-02-08T05:08:03+00:00",`<br>```"value": 2`<br>```}`<br>```],`<br>```"dimensions": {`<br>```"product": "The Road to Nowhere",`<br>```"country": "FR"`<br>```},`<br>```"metadata": {`<br>```"category": "books",`<br>```"note": "start second semester"`<br>```},`<br>```"name": "productOrder",`<br>```"namespace": "mymetricsnamespace",`<br>```"resourceGroup": "divisionY"`<br>```}`<br>```]` |

You will note how the custom metrics are published in the context of the metrics namespace _mymetricsnamespace_  – this name can freely be defined. Note that it is explicitly named on the policy statement regarding publishing custom metrics.

The metrics are published in the context of a compartment. They are associated with two dimensions – product and country- and with a _resourceGroup_– either DivisionX or DivisionY. Data for different resourceGroups is treated as completely separate in the OCI Monitor. Additional metaData – key-value pairs – are defined as well.

Note: the metrics cannot be too old (the timestamp should be less than two hours in the past) nor too young (not more than 10 minutes in the future). If you want to use this JSON document in your own experiments, you will need to edit both the OCID for the compartment and the timestamp values for the metrics.

This screenshot shows the command executed in the CLI – and the response that looks quite encouraging:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-29.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-29.png)

After this statement was processed, my first custom metrics are stored in the OCI Metrics Data Lake.

### 3\. Inspect custom metrics through the OCI Monitoring \| Metrics Explorer

Open the Metrics Explorer in the OCI Console:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-30.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-30.png)

This tool will open with a incomplete query that you need to complete. You need to set the _compartment_ and the _metrics namespace_. In order to see metrics linked to a resource group, that resource group also has to be explicitly selected. Finally, the metric of interest – _productOrder_ in this example – has to be set. The aggregation interval is set (the drop down list offers 1m, 5m and 1 hour; when you switch to Advanced Mode you can customize the interval in the MQL query definition). The Statistic (aggregation function) is to be selected – Sum is a common choice, although many options are available (min, max, mean, count, rate, P50, P90, P95, P99).

The next screenshot shows the graphical representation of the few custom data points I have just published through the CLI. Nothing impressive – but encouraging nevertheless. I did manage to get my own metrics in the OCI Monitoring framework.

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-31.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-31.png)

The Data Table view shows the individual data points for the selected resource group DivisionX and the selected metric _productOrder_.

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-32.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-32.png)

### 4\. Inspect custom metrics through the OCI CLI

The custom metrics can be inspected through the CLI and the API just as they can be searched in the console. A quick example of how we can check our custom metrics through the CLI:

|     |     |
| --- | --- |
| 1 | `oci monitoring metric-data summarize-metrics-data --from-json file://./get-metrics.json` |

The query is defined in the JSON document in file get-metrics.json; it is defined as follows:

|     |     |
| --- | --- |
| 1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9 | `{`<br>```"compartmentId": "$compartmentId",`<br>```"endTime": "2020-02-08T20:00:00+00:00",`<br>```"namespace": "mymetricsnamespace",`<br>```"queryText": "productOrder[1m].sum()",`<br>```"resolution": "5m",`<br>```"resourceGroup": "divisionX",`<br>```"startTime": "2020-02-07T23:00:00+00:00"`<br>`}` |

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-33.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-33.png)

The same parameters and query text are used as in the Metrics Explorer in the console.

The result is a JSON document that in this example contains aggregated data points for the productOrder metric in namespace mymetricsnamespace and only for resource group divisionX. In this case, data points have been aggregated per 1 minute, resulting in three different timestamps. The values in the aggregated data points are the summation of the values reported for productOrders for _product==ball_ and _country==NL_.

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-34.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-34.png)

### 5\. Define an Alarm and Notification on custom metrics

In a [recent article](https://technology.amis.nl/2020/02/03/oracle-cloud-infrastructure-resource-monitoring-alarm-triggers-notification-when-metrics-satisfy-condition/) I have introduced Alarms and Notifications on Oracle Cloud Infrastructure. I will not repeat that introduction – but quickly create an Alarm for the custom metric productOrder. I want to raise an Alarm if and when the number of productOrders in a 5 minute time period is higher than 100.

Here is the full definition of the Alarm:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-35.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-35.png)

Click on Save alarm to activate the alarm.

The Alarm is associated with the Notification Topic ExtremeProductOrderVolume, that was defined like this: [![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-36.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-36.png)

The topic is associated with on destination – my email address. When I created that association, I received an email inviting me to confirm the association:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-37.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-37.png)

With a link that took me here:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-38.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-38.png)

### 6\. Publish Custom Metrics to trigger the Alarm

I have edited the custom-metrics.json file – to make sure that the metrics published should trigger the alarm, with higher values for the productOrder metrics and with fresh timestamps. I have then published the metrics from the CLI.

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-39.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-39.png)

Here is the indication in the console of the triggering status of the Alarm:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-40.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-40.png)

and the details:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-41.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-41.png)

Here is the email I received as notification for the Alarm:

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-42.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-42.png)

### Summary

In this article, I demonstrated custom metrics in the OCI Monitoring Service. I showed how easy it is to publish custom metrics to OCI that describe functional aspects of applications and services and how these metrics can be inspected – using the Metrics Explorer – and how alarms can be defined in terms of these custom metrics in the same way that alarms and notifications can be defined for technical, OCI resource related metrics.

In this article, I used the OCI CLI to publish the metrics. The OCI CLI is not the only way to publish custom metrics. Another way is through the OCI REST API. In fact, the only way is through the OCI REST API – because the OCI CLI is using that API under the hood. It would be easy to create a function (on OCI FaaS) in Node that invokes the REST API to publish custom metrics. This function could be exposed through an API Gateway – private or public – to make it easily accessible for other functions.

With very simple, straightforward REST calls, custom metrics could be published into the OCI Monitoring Data Lake – available for inspecting, reporting and notifying. I will leave that for another time.

[![image](https://technology.amis.nl/wp-content/uploads/2020/02/image_thumb-43.png)](https://technology.amis.nl/wp-content/uploads/2020/02/image-43.png)

## Resources

OCI Documentation – Publishing Custom Metrics: [https://docs.cloud.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm](https://docs.cloud.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm)

CLI Reference for publishing custom metrics: [https://docs.cloud.oracle.com/en-us/iaas/tools/oci-cli/2.9.1/oci\_cli\_docs/cmdref/monitoring/metric-data/post.html](https://docs.cloud.oracle.com/en-us/iaas/tools/oci-cli/2.9.1/oci_cli_docs/cmdref/monitoring/metric-data/post.html)

REST API reference for publishing custom metrics: [https://docs.cloud.oracle.com/en-us/iaas/api/#/en/monitoring/latest/MetricData/PostMetricData](https://docs.cloud.oracle.com/en-us/iaas/api/#/en/monitoring/latest/MetricData/PostMetricData)

Policies governing publication and viewing metrics: [https://docs.cloud.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#metrics-access](https://docs.cloud.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#metrics-access)

Blog Article: Oracle Cloud Infrastructure Resource Monitoring – Alarm triggers Notification when Metrics satisfy Condition – [https://technology.amis.nl/2020/02/03/oracle-cloud-infrastructure-resource-monitoring-alarm-triggers-notification-when-metrics-satisfy-condition/](https://technology.amis.nl/2020/02/03/oracle-cloud-infrastructure-resource-monitoring-alarm-triggers-notification-when-metrics-satisfy-condition/)

### Share this:

- [Click to share on Bluesky (Opens in new window)Bluesky](https://technology.amis.nl/oracle-cloud/use-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics/?share=bluesky&nb=1)
- [Click to print (Opens in new window)Print](https://technology.amis.nl/oracle-cloud/use-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics/#print?share=print&nb=1)
- [Click to share on LinkedIn (Opens in new window)LinkedIn](https://technology.amis.nl/oracle-cloud/use-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics/?share=linkedin&nb=1)
- [Click to share on X (Opens in new window)X](https://technology.amis.nl/oracle-cloud/use-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics/?share=twitter&nb=1)
- [Click to email a link to a friend (Opens in new window)Email](mailto:?subject=%5BShared%20Post%5D%20Use%20OCI%20Monitoring%2C%20Alarms%20and%20Notifications%20for%20Your%20Own%20Custom%20and%20Functional%20Metrics&body=https%3A%2F%2Ftechnology.amis.nl%2Foracle-cloud%2Fuse-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics%2F&share=email&nb=1)
- [Click to share on Telegram (Opens in new window)Telegram](https://technology.amis.nl/oracle-cloud/use-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics/?share=telegram&nb=1)
- [Click to share on WhatsApp (Opens in new window)WhatsApp](https://technology.amis.nl/oracle-cloud/use-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics/?share=jetpack-whatsapp&nb=1)

### Like this:

LikeLoading...

[Tweet](https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Ftechnology.amis.nl%2Foracle-cloud%2Fuse-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics%2F&text=Use%20OCI%20Monitoring,%20Alarms%20and%20Notifications%20for%20Your%20Own%20Custom%20and%20Functional%20Metrics&url=https%3A%2F%2Ftechnology.amis.nl%2Foracle-cloud%2Fuse-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics%2F&via=amisnl)[Share](https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Ftechnology.amis.nl%2Foracle-cloud%2Fuse-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics%2F&title=Use%20OCI%20Monitoring,%20Alarms%20and%20Notifications%20for%20Your%20Own%20Custom%20and%20Functional%20Metrics&source=url)[WhatsApp](https://wa.me/?text=Use%20OCI%20Monitoring,%20Alarms%20and%20Notifications%20for%20Your%20Own%20Custom%20and%20Functional%20Metrics%20https%3A%2F%2Ftechnology.amis.nl%2Foracle-cloud%2Fuse-oci-monitoring-alarms-and-notifications-for-your-own-custom-and-functional-metrics%2F)Telegram

#### Related Posts

[![Changing the configuration of an Oracle WebLogic Domain, deployed on a Kubernetes cluster using Oracle WebLogic Server Kubernetes Operator (part 2)](https://technology.amis.nl/wp-content/uploads/2019/10/lameriks_201910_31f.jpg)](https://technology.amis.nl/oracle-cloud/changing-the-configuration-of-an-oracle-weblogic-domain-deployed-on-a-kubernetes-cluster-using-oracle-weblogic-server-kubernetes-operator-part-2/ "Changing the configuration of an Oracle WebLogic Domain, deployed on a Kubernetes cluster using Oracle WebLogic Server Kubernetes Operator (part 2)")[![Connect local SQL Developer to Oracle Cloud Autonomous Database (Always Free Tier)](https://technology.amis.nl/wp-content/uploads/2019/10/image-16.png)](https://technology.amis.nl/cloud/connect-local-sql-developer-to-oracle-cloud-autonomous-database-always-free-tier/ "Connect local SQL Developer to Oracle Cloud Autonomous Database (Always Free Tier)")[![Migrating an old (10.2.0.4) database to Oracle Cloud with minimal downtime](https://technology.amis.nl/wp-content/uploads/2020/04/dbcloudmigration.png)](https://technology.amis.nl/oracle-cloud/migrating-an-old-10-2-0-4-database-to-oracle-cloud-with-minimal-downtime/ "Migrating an old (10.2.0.4) database to Oracle Cloud with minimal downtime")

Tags: [alarm](https://technology.amis.nl/tag/alarm/), [business activity monitoring](https://technology.amis.nl/tag/business-activity-monitoring/), [custom metrics](https://technology.amis.nl/tag/custom-metrics/), [functional monitoring](https://technology.amis.nl/tag/functional-monitoring/), [monitoring](https://technology.amis.nl/tag/monitoring/), [notification](https://technology.amis.nl/tag/notification/)

#### About The Author

![](https://secure.gravatar.com/avatar/856d699e2910db2eceddbd00dbf12aab71e9884f8e0c061c9938e35bd7a50140?s=100&d=mm&r=g)

##### [Lucas Jellema](https://technology.amis.nl/author/lucas-jellema/)

Lucas Jellema, active in IT (and with Oracle) since 1994. Oracle ACE Director and Oracle Developer Champion. Solution architect and developer on diverse areas including SQL, JavaScript, Kubernetes & Docker, Machine Learning, Java, SOA and microservices, events in various shapes and forms and many other things. Author of the Oracle Press book Oracle SOA Suite 12c Handbook. Frequent presenter on user groups and community events and conferences such as JavaOne, Oracle Code, CodeOne, NLJUG JFall and Oracle OpenWorld.

#### 4 Comments

1. DenisApril 14, 2021







Not a bad article, but one topic is at least not covered in general terms – how do we generate this custom metric automatically and how do you generate it, that is, how this json file is filled with data. It would be very nice to supplement this article with such material, or post a new separate article. An example of automating the entire process can be found here – [https://github.com/OguzPastirmaci/oci-gpu-monitoring](https://github.com/OguzPastirmaci/oci-gpu-monitoring)










   - [Lucas Jellema](https://www.amis.nl/)April 14, 2021







     Hi Denis,



     Thank you for the almost compliment on the article. Thanks also for the suggestion and the link to the Git Repo.



     kind regards


     Lucas
2. VenkatDecember 15, 2020







Hi Lucas,



This is a very useful post. I see that we are getting notifications coming in JSON format. Is there way that we can get notifications in human readable format



Regards,


Venkat










   - [Lucas Jellema](https://www.amis.nl/)December 15, 2020







     Hi Venkat,


     I do not believe we can influence the format of these notifications – except by programmatically consuming an event (in a function) and publishing a notification programmatically.



     kind regards,


     Lucas

%d
Browse oci documentation


# oci\_monitoring\_alarm

This resource provides the Alarm resource in Oracle Cloud Infrastructure Monitoring service.
Api doc link for the resource: [https://docs.oracle.com/iaas/api/#/en/monitoring/latest/Alarm](https://docs.oracle.com/iaas/api/#/en/monitoring/latest/Alarm)

Example terraform configs related to the resource : [https://github.com/oracle/terraform-provider-oci/tree/master/examples/monitoring](https://github.com/oracle/terraform-provider-oci/tree/master/examples/monitoring)

Creates a new alarm in the specified compartment.
For more information, see
[Creating an Alarm](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/create-alarm.htm).
For important limits information, see
[Limits on Monitoring](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#limits).

This call is subject to a Monitoring limit that applies to the total number of requests across all alarm operations.
Monitoring might throttle this call to reject an otherwise valid request when the total rate of alarm operations exceeds 10 requests,
or transactions, per second (TPS) for a given tenancy.

## [Example Usage](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm\#example-usage)

```hcl

```

Copy

## [Argument Reference](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm\#argument-reference)

The following arguments are supported:

- [`alarm_summary`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#alarm_summary-1) \- (Optional) (Updatable) Customizable alarm summary (`alarmSummary` [alarm message parameter](https://docs.cloud.oracle.com/iaas/Content/Monitoring/alarm-message-format.htm)). Optionally include [dynamic variables](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/update-alarm-dynamic-variables.htm). The alarm summary appears within the body of the alarm message and in responses to [ListAlarmStatus](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/AlarmStatusSummary/ListAlarmsStatus) [GetAlarmHistory](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/AlarmHistoryCollection/GetAlarmHistory) and [RetrieveDimensionStates](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/AlarmDimensionStatesCollection/RetrieveDimensionStates).

- [`body`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#body-1) \- (Optional) (Updatable) The human-readable content of the delivered alarm notification. Optionally include [dynamic variables](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/update-alarm-dynamic-variables.htm). Oracle recommends providing guidance to operators for resolving the alarm condition. Consider adding links to standard runbook practices. Avoid entering confidential information. Example: `High CPU usage alert. Follow runbook instructions for resolution.`

- [`compartment_id`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#compartment_id-1) \- (Required) (Updatable) The [OCID](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/identifiers.htm) of the compartment containing the alarm.

- [`defined_tags`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#defined_tags-1) \- (Optional) (Updatable) Usage of predefined tag keys. These predefined keys are scoped to namespaces. Example: `{"Operations.CostCenter": "42"}`

- [`destinations`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#destinations-1) \- (Required) (Updatable) A list of destinations for alarm notifications. Each destination is represented by the [OCID](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/identifiers.htm) of a related resource, such as a [topic](https://docs.cloud.oracle.com/iaas/api/#/en/notification/latest/NotificationTopic). Supported destination services: Notifications, Streaming. Limit: One destination per supported destination service.

- [`display_name`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#display_name-1) \- (Required) (Updatable) A user-friendly name for the alarm. It does not have to be unique, and it's changeable. Avoid entering confidential information.

This value determines the title of each alarm notification.

Example: `High CPU Utilization`

- [`evaluation_slack_duration`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#evaluation_slack_duration-1) \- (Optional) (Updatable) Customizable slack period to wait for metric ingestion before evaluating the alarm. Specify a string in ISO 8601 format (`PT10M` for ten minutes or `PT1H` for one hour). Minimum: PT3M. Maximum: PT2H. Default: PT3M. For more information about the slack period, see [About the Internal Reset Period](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#reset).

- [`freeform_tags`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#freeform_tags-1) \- (Optional) (Updatable) Simple key-value pair that is applied without any predefined name, type or scope. Exists for cross-compatibility only. Example: `{"Department": "Finance"}`

- [`is_enabled`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#is_enabled-1) \- (Required) (Updatable) Whether the alarm is enabled. Example: `true`

- [`is_notifications_per_metric_dimension_enabled`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#is_notifications_per_metric_dimension_enabled-1) \- (Optional) (Updatable) When set to `true`, splits alarm notifications per metric stream. When set to `false`, groups alarm notifications across metric streams. Example: `true`

- [`message_format`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#message_format-1) \- (Optional) (Updatable) The format to use for alarm notifications. The formats are:

- [`metric_compartment_id`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#metric_compartment_id-1) \- (Required) (Updatable) The [OCID](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/identifiers.htm) of the compartment containing the metric being evaluated by the alarm.

- [`metric_compartment_id_in_subtree`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#metric_compartment_id_in_subtree-1) \- (Optional) (Updatable) When true, the alarm evaluates metrics from all compartments and subcompartments. The parameter can only be set to true when metricCompartmentId is the tenancy OCID (the tenancy is the root compartment). A true value requires the user to have tenancy-level permissions. If this requirement is not met, then the call is rejected. When false, the alarm evaluates metrics from only the compartment specified in metricCompartmentId. Default is false. Example: `true`

- [`namespace`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#namespace-1) \- (Required) (Updatable) The source service or application emitting the metric that is evaluated by the alarm. Example: `oci_computeagent`

- [`notification_title`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#notification_title-1) \- (Optional) (Updatable) Customizable notification title (`title` [alarm message parameter](https://docs.cloud.oracle.com/iaas/Content/Monitoring/alarm-message-format.htm)). Optionally include [dynamic variables](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/update-alarm-dynamic-variables.htm). The notification title appears as the subject line in a formatted email message and as the title in a Slack message.

- [`notification_version`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#notification_version-1) \- (Optional) (Updatable) The version of the alarm notification to be delivered. Allowed value: `1.X` The value must start with a number (up to four digits), followed by a period and an uppercase X.

- [`overrides`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#overrides-1) \- (Optional) (Updatable) A set of overrides that control evaluations of the alarm.

Each override can specify values for query, severity, body, and pending duration. When an alarm contains overrides, the Monitoring service evaluates each override in order, beginning with the first override in the array (index position `0`), and then evaluates the alarm's base values (`ruleName` value of `BASE`).



    The duration is specified as a string in ISO 8601 format (`PT10M` for ten minutes or `PT1H` for one hour). Minimum: PT1M. Maximum: PT1H. Default: PT1M.

    Under the default value of PT1M, the first evaluation that breaches the alarm updates the state to "FIRING".

    The alarm updates its status to "OK" when the breaching condition has been clear for the most recent minute.

    Example: `PT5M`


    Example of threshold alarm:


    * * *


    CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.groupBy(availabilityDomain).percentile(0.9) > 85


    * * *


    Example of absence alarm:


    * * *


    CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent()

    \-\-\-\-\- Example of absence alarm with custom absence detection period of 20 hours:

    \-\-\-\-\- CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent(20h) -----


- [`pending_duration`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#pending_duration-2) \- (Optional) (Updatable) The period of time that the condition defined in the alarm must persist before the alarm state changes from "OK" to "FIRING". For example, a value of 5 minutes means that the alarm must persist in breaching the condition for five minutes before the alarm updates its state to "FIRING".

The duration is specified as a string in ISO 8601 format (`PT10M` for ten minutes or `PT1H` for one hour). Minimum: PT1M. Maximum: PT1H. Default: PT1M.

Under the default value of PT1M, the first evaluation that breaches the alarm updates the state to "FIRING".

The alarm updates its status to "OK" when the breaching condition has been clear for the most recent minute.

Example: `PT5M`

- [`query`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#query-2) \- (Required) (Updatable) The Monitoring Query Language (MQL) expression to evaluate for the alarm. The Alarms feature of the Monitoring service interprets results for each returned time series as Boolean values, where zero represents false and a non-zero value represents true. A true value means that the trigger rule condition has been met. The query must specify a metric, statistic, interval, and trigger rule (threshold or absence). Supported values for interval depend on the specified time range. More interval values are supported for smaller time ranges. You can optionally specify dimensions and grouping functions. Also, you can customize the [absence detection period](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-absence-detection-period.htm). Supported grouping functions: `grouping()`, `groupBy()`. For information about writing MQL expressions, see [Editing the MQL Expression for a Query](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/query-metric-mql.htm). For details about MQL, see [Monitoring Query Language (MQL) Reference](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Reference/mql.htm). For available dimensions, review the metric definition for the supported service. See [Supported Services](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices).

Example of threshold alarm:


* * *


CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.groupBy(availabilityDomain).percentile(0.9) > 85


* * *


Example of absence alarm:


* * *


CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent()

\-\-\-\-\- Example of absence alarm with custom absence detection period of 20 hours:

\-\-\-\-\- CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent(20h) -----

- [`repeat_notification_duration`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#repeat_notification_duration-1) \- (Optional) (Updatable) The frequency for re-submitting alarm notifications, if the alarm keeps firing without interruption. Format defined by ISO 8601. For example, `PT4H` indicates four hours. Minimum: PT1M. Maximum: P30D.

Default value: null (notifications are not re-submitted).

Example: `PT2H`

- [`resolution`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#resolution-1) \- (Optional) (Updatable) The time between calculated aggregation windows for the alarm. Supported value: `1m`

- [`resource_group`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#resource_group-1) \- (Optional) (Updatable) Resource group that you want to match. A null value returns only metric data that has no resource groups. The alarm retrieves metric data associated with the specified resource group only. Only one resource group can be applied per metric. A valid resourceGroup value starts with an alphabetical character and includes only alphanumeric characters, periods (.), underscores (\_), hyphens (-), and dollar signs ($). Avoid entering confidential information. Example: `frontend-fleet`

- [`rule_name`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#rule_name-2) \- (Optional) (Updatable) Identifier of the alarm's base values for alarm evaluation, for use when the alarm contains overrides. Default value is `BASE`. For information about alarm overrides, see [AlarmOverride](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/datatypes/AlarmOverride).

- [`severity`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#severity-2) \- (Required) (Updatable) The perceived type of response required when the alarm is in the "FIRING" state. Example: `CRITICAL`

- [`suppression`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#suppression-1) \- (Optional) (Updatable) The configuration details for suppressing an alarm.


    Oracle recommends including tracking information for the event or associated work, such as a ticket number.

    Example: `Planned outage due to change IT-1234.`



\\*\\* IMPORTANT \*\*
Any change to a property that does not support update will force the destruction and recreation of the resource with the new property values

## [Attributes Reference](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm\#attributes-reference)

The following attributes are exported:

- [`alarm_summary`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#alarm_summary-2) \- Customizable alarm summary (`alarmSummary` [alarm message parameter](https://docs.cloud.oracle.com/iaas/Content/Monitoring/alarm-message-format.htm)). Optionally include [dynamic variables](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/update-alarm-dynamic-variables.htm). The alarm summary appears within the body of the alarm message and in responses to [ListAlarmStatus](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/AlarmStatusSummary/ListAlarmsStatus) [GetAlarmHistory](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/AlarmHistoryCollection/GetAlarmHistory) and [RetrieveDimensionStates](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/AlarmDimensionStatesCollection/RetrieveDimensionStates).

- [`body`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#body-3) \- The human-readable content of the delivered alarm notification. Optionally include [dynamic variables](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/update-alarm-dynamic-variables.htm). Oracle recommends providing guidance to operators for resolving the alarm condition. Consider adding links to standard runbook practices. Avoid entering confidential information. Example: `High CPU usage alert. Follow runbook instructions for resolution.`

- [`compartment_id`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#compartment_id-2) \- The [OCID](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/identifiers.htm) of the compartment containing the alarm.

- [`defined_tags`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#defined_tags-2) \- Usage of predefined tag keys. These predefined keys are scoped to namespaces. Example: `{"Operations.CostCenter": "42"}`

- [`destinations`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#destinations-2) \- A list of destinations for alarm notifications. Each destination is represented by the [OCID](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/identifiers.htm) of a related resource, such as a [topic](https://docs.cloud.oracle.com/iaas/api/#/en/notification/latest/NotificationTopic). Supported destination services: Notifications, Streaming. Limit: One destination per supported destination service.

- [`display_name`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#display_name-2) \- A user-friendly name for the alarm. It does not have to be unique, and it's changeable.

This value determines the title of each alarm notification.

Example: `High CPU Utilization`

- [`evaluation_slack_duration`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#evaluation_slack_duration-2) \- Customizable slack period to wait for metric ingestion before evaluating the alarm. Specify a string in ISO 8601 format (`PT10M` for ten minutes or `PT1H` for one hour). Minimum: PT3M. Maximum: PT2H. Default: PT3M. For more information about the slack period, see [About the Internal Reset Period](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#reset).

- [`freeform_tags`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#freeform_tags-2) \- Simple key-value pair that is applied without any predefined name, type or scope. Exists for cross-compatibility only. Example: `{"Department": "Finance"}`

- [`id`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#id-1) \- The [OCID](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/identifiers.htm) of the alarm.

- [`is_enabled`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#is_enabled-2) \- Whether the alarm is enabled. Example: `true`

- [`is_notifications_per_metric_dimension_enabled`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#is_notifications_per_metric_dimension_enabled-2) \- Whether the alarm sends a separate message for each metric stream. See [Creating an Alarm That Splits Messages by Metric Stream](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/create-alarm-split.htm). Example: `true`

- [`message_format`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#message_format-2) \- The format to use for alarm notifications. The formats are:

- [`metric_compartment_id`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#metric_compartment_id-2) \- The [OCID](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/identifiers.htm) of the compartment containing the metric being evaluated by the alarm.

- [`metric_compartment_id_in_subtree`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#metric_compartment_id_in_subtree-2) \- When true, the alarm evaluates metrics from all compartments and subcompartments. The parameter can only be set to true when metricCompartmentId is the tenancy OCID (the tenancy is the root compartment). A true value requires the user to have tenancy-level permissions. If this requirement is not met, then the call is rejected. When false, the alarm evaluates metrics from only the compartment specified in metricCompartmentId. Default is false. Example: `true`

- [`namespace`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#namespace-2) \- The source service or application emitting the metric that is evaluated by the alarm. Example: `oci_computeagent`

- [`notification_title`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#notification_title-2) \- Customizable notification title (`title` [alarm message parameter](https://docs.cloud.oracle.com/iaas/Content/Monitoring/alarm-message-format.htm)). Optionally include [dynamic variables](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/update-alarm-dynamic-variables.htm). The notification title appears as the subject line in a formatted email message and as the title in a Slack message.

- [`notification_version`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#notification_version-2) \- The version of the alarm notification to be delivered. Allowed value: `1.X` The value must start with a number (up to four digits), followed by a period and an uppercase X.

- [`overrides`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#overrides-2) \- A set of overrides that control evaluations of the alarm.

Each override can specify values for query, severity, body, and pending duration. When an alarm contains overrides, the Monitoring service evaluates each override in order, beginning with the first override in the array (index position `0`), and then evaluates the alarm's base values (`ruleName` value of `BASE`).



    The duration is specified as a string in ISO 8601 format (`PT10M` for ten minutes or `PT1H` for one hour). Minimum: PT1M. Maximum: PT1H. Default: PT1M.

    Under the default value of PT1M, the first evaluation that breaches the alarm updates the state to "FIRING".

    The alarm updates its status to "OK" when the breaching condition has been clear for the most recent minute.

    Example: `PT5M`


    Example of threshold alarm:


    * * *


    CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.groupBy(availabilityDomain).percentile(0.9) > 85


    * * *


    Example of absence alarm:


    * * *


    CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent()

    \-\-\-\-\- Example of absence alarm with custom absence detection period of 20 hours:

    \-\-\-\-\- CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent(20h) -----


- [`pending_duration`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#pending_duration-4) \- The period of time that the condition defined in the alarm must persist before the alarm state changes from "OK" to "FIRING". For example, a value of 5 minutes means that the alarm must persist in breaching the condition for five minutes before the alarm updates its state to "FIRING".

The duration is specified as a string in ISO 8601 format (`PT10M` for ten minutes or `PT1H` for one hour). Minimum: PT1M. Maximum: PT1H. Default: PT1M.

Under the default value of PT1M, the first evaluation that breaches the alarm updates the state to "FIRING".

The alarm updates its status to "OK" when the breaching condition has been clear for the most recent minute.

Example: `PT5M`

- [`query`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#query-4) \- The Monitoring Query Language (MQL) expression to evaluate for the alarm. The Alarms feature of the Monitoring service interprets results for each returned time series as Boolean values, where zero represents false and a non-zero value represents true. A true value means that the trigger rule condition has been met. The query must specify a metric, statistic, interval, and trigger rule (threshold or absence). Supported values for interval depend on the specified time range. More interval values are supported for smaller time ranges. You can optionally specify dimensions and grouping functions. Also, you can customize the [absence detection period](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/create-edit-alarm-query-absence-detection-period.htm). Supported grouping functions: `grouping()`, `groupBy()`. For information about writing MQL expressions, see [Editing the MQL Expression for a Query](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Tasks/query-metric-mql.htm). For details about MQL, see [Monitoring Query Language (MQL) Reference](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Reference/mql.htm). For available dimensions, review the metric definition for the supported service. See [Supported Services](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices).

Example of threshold alarm:


* * *


CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.groupBy(availabilityDomain).percentile(0.9) > 85


* * *


Example of absence alarm:


* * *


CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent()

\-\-\-\-\- Example of absence alarm with custom absence detection period of 20 hours:

\-\-\-\-\- CpuUtilization\[1m\]{availabilityDomain="cumS:PHX-AD-1"}.absent(20h) -----

- [`repeat_notification_duration`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#repeat_notification_duration-2) \- The frequency for re-submitting alarm notifications, if the alarm keeps firing without interruption. Format defined by ISO 8601. For example, `PT4H` indicates four hours. Minimum: PT1M. Maximum: P30D.

Default value: null (notifications are not re-submitted).

Example: `PT2H`

- [`resolution`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#resolution-2) \- The time between calculated aggregation windows for the alarm. Supported value: `1m`

- [`resource_group`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#resource_group-2) \- Resource group that you want to match. A null value returns only metric data that has no resource groups. The specified resource group must exist in the definition of the posted metric. Only one resource group can be applied per metric. A valid resourceGroup value starts with an alphabetical character and includes only alphanumeric characters, periods (.), underscores (\_), hyphens (-), and dollar signs ($). Example: `frontend-fleet`

- [`rule_name`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#rule_name-4) \- Identifier of the alarm's base values for alarm evaluation, for use when the alarm contains overrides. Default value is `BASE`. For information about alarm overrides, see [AlarmOverride](https://docs.cloud.oracle.com/iaas/api/#/en/monitoring/latest/datatypes/AlarmOverride).

- [`severity`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#severity-4) \- The perceived type of response required when the alarm is in the "FIRING" state. Example: `CRITICAL`

- [`state`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#state-1) \- The current lifecycle state of the alarm. Example: `DELETED`

- [`suppression`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#suppression-2) \- The configuration details for suppressing an alarm.


    Oracle recommends including tracking information for the event or associated work, such as a ticket number.

    Example: `Planned outage due to change IT-1234.`


- [`time_created`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#time_created-1) \- The date and time the alarm was created. Format defined by RFC3339. Example: `2023-02-01T01:02:29.600Z`

- [`time_updated`](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#time_updated-1) \- The date and time the alarm was last updated. Format defined by RFC3339. Example: `2023-02-03T01:02:29.600Z`


## [Timeouts](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm\#timeouts)

The `timeouts` block allows you to specify [timeouts](https://registry.terraform.io/providers/oracle/oci/latest/docs/guides/changing_timeouts) for certain operations:
\\* `create` \- (Defaults to 20 minutes), when creating the Alarm
\\* `update` \- (Defaults to 20 minutes), when updating the Alarm
\\* `delete` \- (Defaults to 20 minutes), when destroying the Alarm

## [Import](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm\#import)

Alarms can be imported using the `id`, e.g.

```

```

Copy

#### On this page

- [Example Usage](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#example-usage)
- [Argument Reference](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#argument-reference)
- [Attributes Reference](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#attributes-reference)
- [Timeouts](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#timeouts)
- [Import](https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/monitoring_alarm#import)

[Report an issue](https://github.com/oracle/terraform-provider-oci/issues)
[Sitemap](https://medium.com/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40hiteshgondalia%2Foci-monitoring-custom-metrics-91ccef1a7c57&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](https://medium.com/?source=post_page---top_nav_layout_nav-----------------------------------------)

[Write](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[Search](https://medium.com/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40hiteshgondalia%2Foci-monitoring-custom-metrics-91ccef1a7c57&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

# OCI Monitoring — Custom Metrics

[![hitesh gondalia](https://miro.medium.com/v2/resize:fill:32:32/1*ilkSP8jbehpZ3JXiprEAJQ.jpeg)](https://medium.com/@hiteshgondalia?source=post_page---byline--91ccef1a7c57---------------------------------------)

[hitesh gondalia](https://medium.com/@hiteshgondalia?source=post_page---byline--91ccef1a7c57---------------------------------------)

Follow

2 min read

·

Mar 21, 2024

10

[Listen](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D91ccef1a7c57&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40hiteshgondalia%2Foci-monitoring-custom-metrics-91ccef1a7c57&source=---header_actions--91ccef1a7c57---------------------post_audio_button------------------)

Share

In this article, I want to show you how you can expand your OCI monitoring capability with OCI Monitoring — Custom Metrics feature.

When prebuild metrics are not satisfied your monitoring requirement. Don’t jump to 3rd party tools or legacy tools. Let’s think Cloud Native Way to design your custom monitoring requirements,

As per oracle documentation, A custom metric is a metric that you design to collect and analyze data.

> For example, create a `productOrder` metric (in a metric namespace, `mymetricsnamespace`) to track product orders by country and division, with additional metadata for product categories and notes.

There are defined considerations by OCI which needs to be follow when defining custom metrics, Please reference [https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm](https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/publishingcustommetrics.htm)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*A5WoU2_ar-0iOMOP4cMZjQ.jpeg)

Oracle Cloud Infrastructure — Monitoring service

Walk through common use cases with custom metrics: publishing, querying, creating an alarm, and triggering the alarm to observe its `Firing` status.

Use Cases

## Get hitesh gondalia’s stories in your inbox

Join Medium for free to get updates from this writer.

Subscribe

Subscribe

Below are the few of the high level Live IT operations where OCI Custom metric been used by various organizations.

### \[1\] Monitor the “Apply Lag” on your DBCS/ExaDB Standby database

[**Monitor Oracle Standby Databases In OCI With Custom Metrics - alfredokriegdba.com** \\
\\
**Monitoring Oracle Standby Database (Data Guard) has been always a tricky task. Just by the nature of them (the fact…**\\
\\
alfredokriegdba.com](https://alfredokriegdba.com/2023/07/11/monitor-oracle-standby-databases-in-oci-with-custom-metrics/?source=post_page-----91ccef1a7c57---------------------------------------)

### \[2\] Monitor disk utilization for OCI Compute Instance VM

[**Monitor disk utilization using Oracle Cloud Infrastructure custom metrics** \\
\\
**Learn how to monitor disk utilization using custom metrics on Oracle Cloud Infrastructure (OCI).**\\
\\
docs.oracle.com](https://docs.oracle.com/en/learn/oci-custom-metrics/index.html?source=post_page-----91ccef1a7c57---------------------------------------#monitor-disk-utilization-using-oracle-cloud-infrastructure-custom-metrics)

### \[3\] Monitor DBCS/ExaDB Database FRA

[**How to Monitor DBCS Database FRA using Custom Metric in OCI - Eclipsys** \\
\\
**The purpose of this blog is to show you how to use custom metric if you don't see the default metric available in OCI…**\\
\\
eclipsys.ca](https://eclipsys.ca/how-to-monitor-dbcs-database-fra-using-custom-metric-in-oci/?source=post_page-----91ccef1a7c57---------------------------------------)

Documentation

```
Oracle Documentation --> Using Oracle Infrastructure Monitoring

Chapter -->
5 Expand Monitoring Capability with Custom Metrics
Custom Metric Lifecycle
Working with Custom Metrics
Creating Custom Metrics for MySQL and SQL Server Databases
```

[**Using Oracle Infrastructure Monitoring** \\
\\
**Custom metrics allow you to create full-fledged metrics on any entity type that is monitored by a cloud agent. Custom…**\\
\\
docs.oracle.com](https://docs.oracle.com/en/cloud/paas/management-cloud/moncs/expand-monitoring-capability-custom-metrics.html?source=post_page-----91ccef1a7c57---------------------------------------)

Hope you found the article useful. Please **Subscribe** or **Follow** me ( [https://medium.com/@hiteshgondalia](https://medium.com/@hiteshgondalia) ) on my medium account to receive notifications for upcoming articles.

_Disclaimer: The views expressed on this document are my own and do not necessarily reflect the views of Oracle._

[![hitesh gondalia](https://miro.medium.com/v2/resize:fill:48:48/1*ilkSP8jbehpZ3JXiprEAJQ.jpeg)](https://medium.com/@hiteshgondalia?source=post_page---post_author_info--91ccef1a7c57---------------------------------------)

[![hitesh gondalia](https://miro.medium.com/v2/resize:fill:64:64/1*ilkSP8jbehpZ3JXiprEAJQ.jpeg)](https://medium.com/@hiteshgondalia?source=post_page---post_author_info--91ccef1a7c57---------------------------------------)

Follow

[**Written by hitesh gondalia**](https://medium.com/@hiteshgondalia?source=post_page---post_author_info--91ccef1a7c57---------------------------------------)

[140 followers](https://medium.com/@hiteshgondalia/followers?source=post_page---post_author_info--91ccef1a7c57---------------------------------------)

· [72 following](https://medium.com/@hiteshgondalia/following?source=post_page---post_author_info--91ccef1a7c57---------------------------------------)

Architect — Cloud Engineering

Follow

## No responses yet

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

Write a response

[What are your thoughts?](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40hiteshgondalia%2Foci-monitoring-custom-metrics-91ccef1a7c57&source=---post_responses--91ccef1a7c57---------------------respond_sidebar------------------)

Cancel

Respond

## More from hitesh gondalia

![Preparation for CCSP— Certified Cloud Security Professional](https://miro.medium.com/v2/resize:fit:679/format:webp/1*gBEVjZOEif6En6fCnMmkNg.png)

[![hitesh gondalia](https://miro.medium.com/v2/resize:fill:20:20/1*ilkSP8jbehpZ3JXiprEAJQ.jpeg)](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----0---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[hitesh gondalia](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----0---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[**In this article, I’m sharing my experience with important milestone towards CCSP Journey.**](https://medium.com/@hiteshgondalia/preparation-for-ccsp-certified-security-professional-bf92e7589647?source=post_page---author_recirc--91ccef1a7c57----0---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

Jul 15, 2024

[A clap icon2](https://medium.com/@hiteshgondalia/preparation-for-ccsp-certified-security-professional-bf92e7589647?source=post_page---author_recirc--91ccef1a7c57----0---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

![OCI ExaDB Service on Dedicated Infrastructure(ExaCS) — Exadata DBA Role and Responsibility](https://miro.medium.com/v2/resize:fit:679/format:webp/1*zd63-UMYg9CjgKltWEHtYw.png)

[![hitesh gondalia](https://miro.medium.com/v2/resize:fill:20:20/1*ilkSP8jbehpZ3JXiprEAJQ.jpeg)](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----1---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[hitesh gondalia](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----1---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[**ExaCS — Exadata Cloud Service or Exadata Database Service on Dedicated Infrastructure are both the same offering.**](https://medium.com/@hiteshgondalia/oci-exadb-service-on-dedicated-infrastructure-exacs-exadata-dba-role-and-responsibility-d7c8f25d289b?source=post_page---author_recirc--91ccef1a7c57----1---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

Apr 27, 2023

[A clap icon3\\
\\
A response icon1](https://medium.com/@hiteshgondalia/oci-exadb-service-on-dedicated-infrastructure-exacs-exadata-dba-role-and-responsibility-d7c8f25d289b?source=post_page---author_recirc--91ccef1a7c57----1---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

![OCI ExaDB-D (ExaCS/ExaCC) — Tool Kit](https://miro.medium.com/v2/resize:fit:679/format:webp/1*pAMgDDVyCgW2J0pXENW77g.png)

[![hitesh gondalia](https://miro.medium.com/v2/resize:fill:20:20/1*ilkSP8jbehpZ3JXiprEAJQ.jpeg)](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----2---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[hitesh gondalia](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----2---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[**In this article, I will discussion the key Management Tools and best suitable approaches for when to use the different OCI Management…**](https://medium.com/@hiteshgondalia/oci-exadb-d-exacs-exacc-tool-kit-b857ea799ec4?source=post_page---author_recirc--91ccef1a7c57----2---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

May 8, 2023

[A clap icon3](https://medium.com/@hiteshgondalia/oci-exadb-d-exacs-exacc-tool-kit-b857ea799ec4?source=post_page---author_recirc--91ccef1a7c57----2---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

![OCI ExaDB-D(ExaCS/ExaCC)— Important Tasks for IT Operations/Exadata DBA](https://miro.medium.com/v2/resize:fit:679/format:webp/1*bh3KNg8Bl97wCSbX2bzFow.png)

[![hitesh gondalia](https://miro.medium.com/v2/resize:fill:20:20/1*ilkSP8jbehpZ3JXiprEAJQ.jpeg)](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----3---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[hitesh gondalia](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57----3---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

[**In my previous article we understood the key role and responsibility of OCI ExaDB-D (Exadata Database Service-Dedicated Infrastructure)…**](https://medium.com/@hiteshgondalia/oci-exadb-d-exacs-exacc-important-tasks-for-it-operations-exadata-dba-8d4da6d85016?source=post_page---author_recirc--91ccef1a7c57----3---------------------652f398f_6901_4f79_b48b_b0d6813c6fe7--------------)

May 2, 2023

[See all from hitesh gondalia](https://medium.com/@hiteshgondalia?source=post_page---author_recirc--91ccef1a7c57---------------------------------------)

## Recommended from Medium

![Don’t Just Monitor Your Containers, Monitor Your Customers: The Power of the Prometheus Blackbox…](https://miro.medium.com/v2/resize:fit:679/format:webp/1*p_EBlW_omtpo5s23nm1h1w.png)

[![Sai Kiran Pikili](https://miro.medium.com/v2/resize:fill:20:20/0*ntCMO3Je22DenNvh)](https://medium.com/@saikiranpikili?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[Sai Kiran Pikili](https://medium.com/@saikiranpikili?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[**Before you start reading this blog, I’d suggest checking out my previous blog to get a better understanding of observability, monitoring…**](https://medium.com/@saikiranpikili/dont-just-monitor-your-containers-monitor-your-customers-the-power-of-the-prometheus-blackbox-f34efe637e83?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

Nov 16, 2025

[A clap icon11](https://medium.com/@saikiranpikili/dont-just-monitor-your-containers-monitor-your-customers-the-power-of-the-prometheus-blackbox-f34efe637e83?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

![Why We are Moving Away from Terraform 2026](https://miro.medium.com/v2/resize:fit:679/format:webp/0*dFoEdj0gHZ8EFKJ9.png)

[![Cloud With Azeem](https://miro.medium.com/v2/resize:fill:20:20/1*oJWwUx75Cf5oGoEfAefJpw.png)](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[Cloud With Azeem](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[**We left Terraform in 2026 due to licensing, lock-in, and better IaC alternatives like OpenTofu and Pulumi. Here’s what we learned.**](https://medium.com/@cloudwithazeem/moving-away-from-terraform-76766966bb05?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

Aug 24, 2025

[A clap icon170\\
\\
A response icon11](https://medium.com/@cloudwithazeem/moving-away-from-terraform-76766966bb05?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

![6 brain images](https://miro.medium.com/v2/resize:fit:679/format:webp/1*Q-mzQNzJSVYkVGgsmHVjfw.png)

[![Write A Catalyst](https://miro.medium.com/v2/resize:fill:20:20/1*KCHN5TM3Ga2PqZHA4hNbaw.png)](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

In

[Write A Catalyst](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

by

[Dr. Patricia Schmidt](https://medium.com/@creatorschmidt?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[**Most people do \#1 within 10 minutes of waking (and it sabotages your entire day)**](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

Jan 14

[A clap icon19.2K\\
\\
A response icon322](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--91ccef1a7c57----0---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

![Microsoft Foundry on Windows Deep Dive: Secure Local AI and Agents with Windows ML, Windows AI…](https://miro.medium.com/v2/resize:fit:679/format:webp/1*MpQu9JSHdFCCPmNiFwxD5w.png)

[![ITNEXT](https://miro.medium.com/v2/resize:fill:20:20/1*yAqDFIFA5F_NXalOJKz4TA.png)](https://medium.com/itnext?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

In

[ITNEXT](https://medium.com/itnext?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

by

[Dave R - Microsoft Azure & AI MVP☁️](https://medium.com/@daverendon?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[**A practical enterprise blueprint plus patterns from Kahua, HCLTech, Manus AI, and Morgan Stanley.**](https://medium.com/itnext/microsoft-foundry-on-windows-deep-dive-secure-local-ai-and-agents-with-windows-ml-windows-ai-b6d75dabd635?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

4d ago

[A clap icon73](https://medium.com/itnext/microsoft-foundry-on-windows-deep-dive-secure-local-ai-and-agents-with-windows-ml-windows-ai-b6d75dabd635?source=post_page---read_next_recirc--91ccef1a7c57----1---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

![Why We Chose NLB Over ALB in Hybrid Environment (for On-Prem Routing)](https://miro.medium.com/v2/resize:fit:679/format:webp/1*PwUBO9XuybbhiYdiMltylQ.png)

[![AWS in Plain English](https://miro.medium.com/v2/resize:fill:20:20/1*6EeD87OMwKk-u3ncwAOhog.png)](https://medium.com/aws-in-plain-english?source=post_page---read_next_recirc--91ccef1a7c57----2---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

In

[AWS in Plain English](https://medium.com/aws-in-plain-english?source=post_page---read_next_recirc--91ccef1a7c57----2---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

by

[Sudha Subramaniam](https://medium.com/@sudhass?source=post_page---read_next_recirc--91ccef1a7c57----2---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[**Choosing Network Load Balancer (NLB) over Application Load Balancer (ALB) in a hybrid architecture (cloud + on-premises) is usually based…**](https://medium.com/aws-in-plain-english/why-we-chose-nlb-over-alb-in-hybrid-environment-for-on-prem-routing-edced7ee1077?source=post_page---read_next_recirc--91ccef1a7c57----2---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

Aug 5, 2025

[A clap icon2](https://medium.com/aws-in-plain-english/why-we-chose-nlb-over-alb-in-hybrid-environment-for-on-prem-routing-edced7ee1077?source=post_page---read_next_recirc--91ccef1a7c57----2---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

![First steps with Kusto Query Language (KQL)](https://miro.medium.com/v2/resize:fit:679/format:webp/0*sFiQbmRH6qQZVhF9)

[![Agata](https://miro.medium.com/v2/resize:fill:20:20/1*bZrmtJeka8L0KmHk7ohLTg@2x.jpeg)](https://medium.com/@goreckaaa?source=post_page---read_next_recirc--91ccef1a7c57----3---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[Agata](https://medium.com/@goreckaaa?source=post_page---read_next_recirc--91ccef1a7c57----3---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[**1\. Introduction**](https://medium.com/@goreckaaa/first-steps-with-kusto-query-language-kql-341c9eb95cf5?source=post_page---read_next_recirc--91ccef1a7c57----3---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

Sep 14, 2025

[A clap icon7\\
\\
A response icon1](https://medium.com/@goreckaaa/first-steps-with-kusto-query-language-kql-341c9eb95cf5?source=post_page---read_next_recirc--91ccef1a7c57----3---------------------8233bdc6_d3da_4766_aac1_96b3d44b0f3a--------------)

[See more recommendations](https://medium.com/?source=post_page---read_next_recirc--91ccef1a7c57---------------------------------------)

[Help](https://help.medium.com/hc/en-us?source=post_page-----91ccef1a7c57---------------------------------------)

[Status](https://status.medium.com/?source=post_page-----91ccef1a7c57---------------------------------------)

[About](https://medium.com/about?autoplay=1&source=post_page-----91ccef1a7c57---------------------------------------)

[Careers](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----91ccef1a7c57---------------------------------------)

[Press](mailto:pressinquiries@medium.com)

[Blog](https://blog.medium.com/?source=post_page-----91ccef1a7c57---------------------------------------)

[Privacy](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----91ccef1a7c57---------------------------------------)

[Rules](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----91ccef1a7c57---------------------------------------)

[Terms](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----91ccef1a7c57---------------------------------------)

[Text to speech](https://speechify.com/medium?source=post_page-----91ccef1a7c57---------------------------------------)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
    - [Get Started](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/get-started.html)
    - [Before You Begin](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/you-begin.html)
    - [Manage Access and Assign Roles](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/manage-access-and-assign-roles.html)
    - [Provision and Manage Oracle Cloud Infrastructure Process Automation Instances](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/provision-and-manage-oracle-cloud-infrastructure-process-automation-instances.html)
    - [Monitor Oracle Cloud Infrastructure Process Automation](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/monitor-oracle-cloud-infrastructure-process-automation.html)
      - [Overview of Oracle Cloud Infrastructure Process Automation Service Metrics](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/overview-oci-process-automation-service-metrics.html)
      - [View Service Metrics](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/view-service-metrics.html)
      - [Monitor Service Metrics, Alarms, and Notifications](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/monitor-service-metrics-alarms-and-notifications.html)
    - [Service Limits, Quotas, and Events](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/service-limits-quotas-and-events.html)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

### [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/iaas/Content/home.htm)     [Try Free Tier](https://www.oracle.com/cloud/free/?source=:ow:o:h:po:OHPPanel1nav0625&intcmp=:ow:o:h:po:OHPPanel1nav0625)

* * *

[Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm) [Process Automation](https://docs.oracle.com/en-us/iaas/process-automation/index.html) [Monitor Oracle Cloud Infrastructure Process Automation](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/monitor-oracle-cloud-infrastructure-process-automation.html)

All Pages


- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
    - [Get Started](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/get-started.html)
    - [Before You Begin](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/you-begin.html)
    - [Manage Access and Assign Roles](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/manage-access-and-assign-roles.html)
    - [Provision and Manage Oracle Cloud Infrastructure Process Automation Instances](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/provision-and-manage-oracle-cloud-infrastructure-process-automation-instances.html)
    - [Monitor Oracle Cloud Infrastructure Process Automation](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/monitor-oracle-cloud-infrastructure-process-automation.html)
      - [Overview of Oracle Cloud Infrastructure Process Automation Service Metrics](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/overview-oci-process-automation-service-metrics.html)
      - [View Service Metrics](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/view-service-metrics.html)
      - [Monitor Service Metrics, Alarms, and Notifications](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/monitor-service-metrics-alarms-and-notifications.html)
    - [Service Limits, Quotas, and Events](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/service-limits-quotas-and-events.html)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

[Skip to main content](https://docs.oracle.com/en-us/iaas/process-automation/oci-process-automation/monitor-service-metrics-alarms-and-notifications.html#dcoc-content-body)

Updated 2023-01-24

You can use Oracle Cloud
Infrastructure monitoring and notification APIs to monitor metrics, alarms, and notifications.


- Use the [Monitoring API](https://docs.oracle.com/iaas/api/#/en/monitoring/20180401/) for metrics and alarm.

- Use the [Notification API](https://docs.oracle.com/iaas/api/#/en/notification/20181201/) for notifications (used with alarms).


Was this article helpful?

YesNo

Was this article helpful?

YesNo

Updated 2023-01-24
- [Skip to content](https://blogs.oracle.com/observability/managing-alarms-at-scale-with-monitoring-templates-in-oci-stack-monitoring#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/observability/post.php) [Twitter](https://twitter.com/share?url=/observability/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/observability/post.php) [Email](https://blogs.oracle.com/observability/placeholder.html)

[Observability and Management Platform](https://blogs.oracle.com/observability/category/oem-observability-and-management-platform), [Stack Monitoring](https://blogs.oracle.com/observability/category/oem-stack-monitoring)

# Managing Alarms at Scale with Monitoring Templates in OCI Stack Monitoring

March 11, 20254 minute read

![Profile picture of Aaron Rimel](http://blogs.oracle.com/wp-content/uploads/2025/09/Aaron_Rimel_Photo.jpeg)[Aaron Rimel](https://blogs.oracle.com/authors/aaron-rimel)
Principal Product Manager, Observability and Management

## Managing Alarms at Scale with Monitoring Templates in OCI Stack Monitoring

Managing individual alarms across an enterprise can be time-consuming and error prone. [OCI Stack Monitoring](https://www.youtube.com/watch?v=FDYB633fZg0) simplifies this process with Monitoring Templates, allowing you to holistically monitor a complete application stack such as E-Business Suite or an entire fleet of hosts within a single UI. These templates save time and ensure consistency across large-scale environments. Monitoring Templates automatically apply to newly created resources, this reduces manual steps that can easily be missed.

## Create Alarm Rules at scale with an Easy-to-Use UI

Traditionally, setting up of alarm rules is done on a per metric basis.  Over time, it may become a challenge to manage all the individual alarm rules across different metrics across different resource types.  It’s hard to answer the basic question – what alarm thresholds do I have set up for my hosts? Or for my DB systems? Or E-Business Suite (EBS) application? etc. It’s hard to answer this question because you must look at individual alarm rules since there isn’t a way to see these alarm conditions collectively.

Monitoring Templates address these questions by providing a resource-oriented approach to setting up alarms. Begin by specifying the resources, for example, EBS and its components, WebLogic, database, hosts, load balancers, and more. Next, specify all the alarm conditions for these resources, including custom metrics created using [Metric Extensions](https://www.youtube.com/watch?v=fIwy5lT766Y&list=PLiuPvpy8QsiU_Sb4mKpS1cRm_xa9ROjgk&index=2&t=3s). This provides a one-stop-shop to understand exactly what alarm thresholds have been defined across your app and infrastructure. If alarm settings need to be reviewed or thresholds changed for an EBS application, there’s a single place to do so using this template. Once a Monitoring Template has been defined and applied, Stack Monitoring will take care of creating the necessary alarm rules that [OCI Monitoring](https://docs.oracle.com/en-us/iaas/Content/Monitoring/home.htm) will use to evaluate and generate alarms.

## Quick and seamless setup of alarm rules

With just a few clicks, you can:

- **Create a monitoring template** tailored to your stack.

- **Apply comprehensive alarm definitions instantly**—whether for a single resource (e.g., WebLogic Server) or an entire infrastructure (e.g., WebLogic Domain/Cluster/servers, hosts, load balancers, databases, and more).

- **Specify notification destination service and topic.**

- **Use the intuitive UI** to ensure an efficient and hassle-free alarm setup process.


Monitoring Templates simplify and standardize monitoring by including all the necessary alarm rule definitions and notification destination topics to holistically monitor nearly any application or individual resource type. Every metric alarm definition can be customized, this includes the evaluation interval, statistic (mean, max, min, etc.), operator, and both warning and critical thresholds. Another helpful feature is the customizable alarm body. When defining the alarm body, you can provide a link that navigates your engineers directly to the controlled work instruction on how to quickly and appropriately address each alarm based on the specific metric and its severity.

## Oracle-certified Monitoring Templates for out-of-the-box resource types provide pre-built alarm definitions

Monitoring Templates can be created from scratch as described above where every resource and metric are individually tailored to meet unique business requirements. To get started faster, leverage the provided Oracle-certified templates. The Oracle-certified template library includes pre-built alarm definitions tailored for various applications and technology stacks, including:

- **Hosts**

- **E-Business Suite**

  - Concurrent Processing, Notification Mailer, etc.
- **PeopleSoft**

  - Elasticsearch/OpenSearch, Application Server Domain, PIA, etc.
- **GoldenGate**

  - Replicat, Extract, Distribution Server, etc.
- **WebLogic Domain**

  - WebLogic Cluster, WebLogic Server
- **Apache Tomcat**

- **Oracle Database System**

  - Container DB, Pluggable DB, ASM, Cluster, Listener
- **SQL Server**, and [more](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/promotion-and-discovery.html).


These templates are designed by Oracle experts, leveraging best practices and domain knowledge to deliver **comprehensive alarm definitions** specific to each resource.

## Monitoring Templates are fully customizable to fit unique business needs

While Oracle-certified templates are ready to use as provided out-of-the-box, Stack Monitoring understands that every application stack is unique. Here is how you can customize templates:

- Add or remove resource types to be included in the template

- Add or remove specific metrics

- Adjust pre-set thresholds to align with your unique needs

- Specify notification destination such as email, Slack, etc.


Begin by creating a blank template and then include Oracle-certified templates (e.g. Container DB, Pluggable DB, Listener, WebLogic, and hosts). When an Oracle-certified templates is added to a blank template, Stack Monitoring will automatically populate the best practice metrics and their thresholds. From there, adjust any metric thresholds and add or remove metrics to the template to meet unique business needs. For example, when monitoring file system utilization, define different thresholds based on the specific filesystem, such as 70% utilized on root, and 90% on/tmp. Next, select the notification destination such as notifications or steaming, then choose the appropriate topic (e.g. production on-call DL, on-call Slack channel). When defining the notification message grouping, it is recommended to select “Split notifications per metric stream”. This will provide seamless integration with Stack Monitoring’s [Maintenance Windows](https://blogs.oracle.com/observability/post/prevent-alarm-noise-with-topologyaware-maintenance-windows) feature. Finally, apply any applicable tags to the Monitoring Template (e.g. Oracle-standard, environment, Prod).

![Figure 1: Creating a Monitoring Template for Oracle Database System, WebLogic servers and hosts](https://blogs.oracle.com/wp-content/uploads/sites/47/2025/10/Figure-1-Monitoring_Template_WLS_DB_Host.gif)

Once a customized template has been created, use the action button to **apply** the template to the resources included in the template. Once the apply job completes, Stack Monitoring will generate all the alarm rules within OCI Monitoring. The alarm rules definitions created within OCI Monitoring include a direct link back to Monitoring Templates where the alarm rule was created should changes need to be made.

![Figure 2: OCI Monitoring Alarm rule created using Monitoring Templates showing link to edit rule in a Monitoring Template](https://blogs.oracle.com/wp-content/uploads/sites/47/2025/10/Figure-2-OCI-Alarm-Rule-Monitoring-Template.png)
Figure 1: OCI Monitoring Alarm rule created using Monitoring Templates showing the link to edit rule


Alarm Management in OCI has never been easier! By leveraging **Stack Monitoring’s Monitoring Templates** along with [Maintenance Windows](https://blogs.oracle.com/observability/post/prevent-alarm-noise-with-topologyaware-maintenance-windows), you can streamline your monitoring strategy and **achieve greater monitoring efficiency at scale.** [Get started today](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/monitoring-templates.html)!

Happy Monitoring!

**Resources:**

- [Getting Started with Stack Monitoring](https://docs.oracle.com/en-us/iaas/stack-monitoring/index.html)
- [Stack Monitoring Blog Home](https://blogs.oracle.com/observability/category/oem-stack-monitoring)
- [Stack Monitoring Videos](https://www.youtube.com/playlist?list=PLiuPvpy8QsiU_Sb4mKpS1cRm_xa9ROjgk)

### Authors

![Profile picture of Aaron Rimel](http://blogs.oracle.com/wp-content/uploads/2025/09/Aaron_Rimel_Photo.jpeg)

#### Aaron Rimel

##### Principal Product Manager, Observability and Management

Aaron Rimel works as a Principal Product Manager in the Observability and Management organization at Oracle Corporation covering the areas of Application Monitoring and Application Stack Technologies. He has over 15 years industry experience managing business critical applications hosted both on-premises and in the cloud. He has presented at numerous sessions at Oracle OpenWorld, IOUG, and other conferences.

[Previous post](https://blogs.oracle.com/observability/using-apm-rest-api-to-collect-and-enhance-payloads "Using APM REST API to collect and enhance payloads")

#### Using APM REST API to collect and enhance payloads

[Monisha Kendae Kumar](https://blogs.oracle.com/authors/monisha-kendae-kumar) \| 2 minute read

[Next post](https://blogs.oracle.com/observability/optimize-with-oci-apm-data-and-save-on-operational-costs "Optimize with OCI APM data and save on operational costs")

#### Optimize with OCI APM data and save on operational costs

[Shaickmohamed Sirajudeen](https://blogs.oracle.com/authors/shaickmohamed-sirajudeen) \| 2 minute read

consent.trustarc.com

# consent.trustarc.com is blocked

This page has been blocked by an extension

- Try disabling your extensions.

ERR\_BLOCKED\_BY\_CLIENT

Reload


This page has been blocked by an extension

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)
- ServicesOpen menu
    - [Oracle Enterprise Business Suite ​](https://doyensys.com/services/enterprise-platform/oracle-enterprise-business-suite/)
    - [Oracle Fusion Cloud Application](https://doyensys.com/services/enterprise-platform/oracle-fusion-cloud-application/)
    - [Microsoft Dynamics](https://doyensys.com/services/enterprise-platform/microsoft-dynamics-2/)
    - [Artificial Intelligence](https://doyensys.com/services/digital-services/artificial-intelligence/)
    - [Application Development and Modernization​](https://doyensys.com/services/digital-services/application-development-and-modernization/)
    - [Software Engineering​](https://doyensys.com/services/digital-services/software-engineering/)
    - [Hybrid Cloud Management](https://doyensys.com/services/infrastructure-services/hybrid-cloud-management/)
    - [Database & Middleware](https://doyensys.com/services/infrastructure-services/database-middleware/)
    - [Network Management](https://doyensys.com/services/infrastructure-services/network-management/)
    - [End User Computing Services](https://doyensys.com/services/infrastructure-services/end-user-computing-services/)
    - [Consult & Transform](https://doyensys.com/services/infrastructure-services/consult-transform/)
- SolutionsOpen menu
- [Company](https://doyensys.com/about/) Open menu
- [Resources](https://doyensys.com/resources/) Open menu

- [Oraculars](https://oraculars.com/)
- [Contact](https://doyensys.com/contact-us/#getin-touch)

# Understanding and Setting Up OCI Alarms with Topic-Based Notifications

**Introduction**

In the ever-changing world of cloud computing, ensuring your resources are working well is important. Oracle Cloud Infrastructure (OCI) has a cool way to keep an eye on things using alarms. These alarms help you stay ahead of any issues and manage your cloud stuff better. One awesome thing about OCI alarms is how they team up with topic-based notifications. It’s like having a special way to send important alerts exactly where they need to go and when they need to get there.

In this guide, we’ll delve into understanding and setting up OCI alarms with topic-based notifications, exploring the seamless integration that adds a layer of intelligence to your cloud resource monitoring strategy.

**Creating the Notification Topic**

Creating a notification topic in Oracle Cloud Infrastructure (OCI) is an essential step when setting up alarms. Notification topics serve as the endpoint for receiving notifications triggered by alarms. Here are several reasons why you would want to create a notification topic:

**Centralized Notification Handling:** Notification topics provide a centralized way to manage and handle notifications. You can create a notification topic and configure it with one or more alarms instead of doing it directly within each alarm. This will lead to a more organized approach to handling notifications.

**Reusability:** The created notification topic can be used in multiple alarms this will reduce redundancy and make it easier to manage notifications by associating the notification preferences for different alarms

**Support for Multiple Destinations:** Notification topics support various destination types, including email, PagerDuty, Slack, and more. Instead of modifying alarms individually, these can be chosen for different alarms by notification topic.

**Separation of Concerns:** Notification topics allow you to separate the configuration of alarms (monitoring conditions) from the configuration of notifications. This separation of concerns makes it easier to understand and manage your monitoring and notification setup.

**Integration with External Services:** When you create a notification topic, you can integrate it with external services through subscriptions. For example, you can subscribe to an email address, a webhook, or a messaging platform. This flexibility makes it easy to connect OCI monitoring with external tools and processes.

**Scalability:** As your monitoring needs grow, having a centralized mechanism for handling notifications becomes increasingly important. Notification topics provide a scalable solution that can adapt to changes in your environment without the need to update individual alarms.

**Steps to create a Notification Topic in OCI Console are as follows,**

- Login to OCI console.
- Navigate to Developer Services –> Application Integration –> Click Notifications.
- Click Create Topic.
- Enter the Name of the topic (Example: Infra Alerts) and click Create.

![](https://doyensys.com/wp-content/uploads/2024/01/topic-1024x145.png)

![](https://doyensys.com/wp-content/uploads/2024/01/topic-create-1024x658.png)

**Creating Subscriptions for Notification Topics**

Subscriptions allow you to seamlessly connect your OCI notification topics to external services, enhancing the versatility of your alerting system. Subscriptions define where the notifications triggered by alarms should be sent, and they enable you to integrate OCI alarms with external services.

Steps to Create a Subscription for Notification Topic:

- Go to the created Notification Topic.
- Under Resources –> Go to Subscription.
- Click Create Subscription.

![](https://doyensys.com/wp-content/uploads/2024/01/subscription-1024x166.png)

- Select the desired Protocol available protocols are Email, HTTPS, PagerDuty, Slack, and SMS.
- And enter the endpoint for the selected protocol.

![](https://doyensys.com/wp-content/uploads/2024/01/sub-1-1024x667.png)

**OCI Alarms:**

In the dynamic world of cloud computing, the ability to monitor and manage resources effectively is paramount. Oracle Cloud Infrastructure (OCI) provides a robust solution through alarms, empowering users to proactively respond to changes in the state of their cloud resources. In this guide, we’ll explore the significance of OCI Alarms and how they form the cornerstone of a comprehensive cloud resource monitoring strategy.

**Why OCI Alarms?**

**Stay Ahead with Proactive Monitoring**

OCI Alarms lets you keep an eye on your cloud resources by setting conditions that trigger alerts. Instead of reacting to issues after they happen, alarms empower you to act before potential problems get serious.

**Tailor Alerts to Your Needs**

OCI Alarms are flexible – you can customize them for various monitoring conditions. Whether it’s tracking CPU usage, network traffic, or other performance metrics, you have the power to set conditions that fit your specific resource and application requirements.

**Get Instant Alerts with Real-time Notifications**

Configure OCI Alarms to send instant notifications when conditions are met. This means you’ll be immediately informed about critical events, giving you the chance to respond quickly and minimize any impact on your infrastructure.

**Streamlined Notification Management with Notification Topics**

OCI Alarms work seamlessly with Notification Topics, making it easy to manage and customize notification settings in one central place. This integration allows you to send notifications to different destinations like email, webhooks, PagerDuty, and more.

**Steps to Create Alarm in OCI**

Firstly, identify the metrics which required to set up an alarm like CPU, disk space, etc. OCI offers a various type of metrics that monitor the OCI resources.

**Step 1:** Access the OCI Console

- Log in to the OCI console.
- Navigate to Observability & Management –> Monitoring –> Alarm Definitions.

![](https://doyensys.com/wp-content/uploads/2024/01/alarm.png)

**Step 2:** Define Alarm Details

- Select your compartment and click on “Create Alarm”.
- Fill in details like Name, Severity, and Alarm body.

![](https://doyensys.com/wp-content/uploads/2024/01/alarm-1-1024x362.png)

**Step 3:** Configure Alarm metrics.

- In the Metric description fill in the required fields,
  - **Compartment**: Choose the compartment that holds the resources responsible for generating the metrics checked by the alarm.
  - **Metric namespace:** The Metric namespace list displays the different categories of metrics available for the chosen compartment.
  - **Metric name:** Choose the specific metric name that you wish to assess for the alarm. You have the option to select any OCI metric or a custom metric, provided that the data is present in the chosen compartment and metric namespace.
  - **Interval:** Pick the aggregation window, which determines how frequently data points are combined. If necessary, you can establish a custom interval to tailor the aggregation to your specific requirements.
  - **Statistics:** Select the function to aggregate the data points like Max, Mean, Min etc.
- Within the Metric dimensions section, define optional filters to narrow down the metric data under evaluation.
  - **Dimension name:** Choose a qualifier specified in the metric definition. For instance, the metric definition for CpuUtilization might specify the dimension resourceId.
  - **Dimension value:** Pick the value to apply to the specified dimension. For example, if you chose resourceId as the dimension, select the resource identifier for the instance you’re monitoring.
  - **Additional dimension:** Include another name-value pair for an additional dimension, if necessary.
  - **Aggregate metric streams:** Check this box to obtain the combined value of all metric streams for the chosen statistic.

![](https://doyensys.com/wp-content/uploads/2024/01/alarm-2-1024x384.png)

**Step 4:** Configure Trigger Rule

In the Trigger rule section, define the criteria that need to be met for the alarm to be activated. The condition can involve specifying a threshold, such as 90% for CPU utilization, or an absence of a certain metric.

- **Operator:** Choose the operator to apply in the condition threshold.
- **Value:** Input the specific value to use for the condition threshold. If using the “between” or “outside” operators, provide both values for the range.
- **Trigger delay minutes:** Specify the duration in minutes that the condition must persist before the alarm transitions into the firing state.

![](https://doyensys.com/wp-content/uploads/2024/01/alarm-3-1024x225.png)

**Step 5:** Define alarm notifications.

- In the Destination section,
  - Select Notifications as Destination service.
  - The compartment is where the notification topic is created.
  - Select the Topic that is created and add the subscriptions.
- In the Message grouping section,
  - Select Group notifications across metric streams: Monitor metric status collectively across all streams. Receive a message when the metric status across all streams changes.
- In the Message Format section,
  - Select formatted messages: It is a simplified user-friendly layout.

![](https://doyensys.com/wp-content/uploads/2024/01/alarm-4-1024x431.png)

**Step 6:** Save the Alarm.

- Click the Enable Alarm check box to activate the alarm once created.
- And Click “Save Alarm” to create and establish the alarm.

![](https://doyensys.com/wp-content/uploads/2024/01/alarm-5-1024x166.png)

**Conclusion:**

In conclusion, mastering OCI alarms with topic-based notifications is a strategic move for any cloud practitioner. By leveraging the integration between alarms and notification topics, you gain the ability to tailor alerting to your specific needs, ensuring that critical information is delivered to the right recipients promptly. This comprehensive approach to cloud resource monitoring not only enhances the efficiency of your operations but also contributes to the overall reliability and performance of your Oracle Cloud Infrastructure. As you navigate the intricate landscape of cloud management, harnessing the full potential of OCI alarms with topic-based notifications is a key step toward achieving a resilient and optimized cloud environment. Stay tuned for more insights and best practices on maximizing your OCI capabilities.

![Nishar Ali](https://secure.gravatar.com/avatar/6934d6b4039ad406ab0278383d96ea9ffb3d7982abe26f59382b958ebea7abcc?s=65&d=mm&r=g)

[Nishar Ali](https://doyensys.com/blogs/author/nishar/)

- [nishar.ali@doyensys.com](mailto:nishar.ali@doyensys.com "Get in touch with me via email")

Recent Posts

- [Custom Process Progress Bar in Oracle APEX](https://doyensys.com/blogs/custom-process-progress-bar-in-oracle-apex/ "Custom Process Progress Bar in Oracle APEX")[Custom Process Progress Bar in Oracle APEX](https://doyensys.com/blogs/custom-process-progress-bar-in-oracle-apex/)

- [Step-by-Step Guide: Configure Debezium with PostgreSQL 17 and Apache Kafka](https://doyensys.com/blogs/step-by-step-guide-configure-debezium-with-postgresql-17-and-apache-kafka/ "Step-by-Step Guide: Configure Debezium with PostgreSQL 17 and Apache Kafka")[Step-by-Step Guide: Configure Debezium with PostgreSQL 17 and Apache Kafka](https://doyensys.com/blogs/step-by-step-guide-configure-debezium-with-postgresql-17-and-apache-kafka/)

- [Creating a MongoDB Database and User with Permissions](https://doyensys.com/blogs/creating-a-mongodb-database-and-user-with-permissions/ "Creating a MongoDB Database and User with Permissions")[Creating a MongoDB Database and User with Permissions](https://doyensys.com/blogs/creating-a-mongodb-database-and-user-with-permissions/)
- [Skip to content](https://www.ateam-oracle.com/oci-networking-best-practices-part-four-oci-network-monitoring-observability-and-management#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/www.ateam-oracle.com/post.php) [Twitter](https://twitter.com/share?url=/www.ateam-oracle.com/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/www.ateam-oracle.com/post.php) [Email](https://www.ateam-oracle.com/placeholder.html)

[Networking](https://www.ateam-oracle.com/category/atm-networking), [Operations](https://www.ateam-oracle.com/category/atm-operations)

# OCI Networking Best Practices – Part Four – OCI Network Monitoring, Observability, and Management

June 28, 20235 minute read

![Profile picture of Ben Woltz](http://blogs.oracle.com/wp-content/uploads/2025/09/Headshot-8.jpg)[Ben Woltz](https://www.ateam-oracle.com/authors/ben-woltz)
Principal Cloud Architect

# **Introduction**

In this blog series we are going to discuss Oracle Cloud Infrastructure (OCI) networking best practices and provide you with some recommendations and tips to help you design, build, secure and manage your OCI network infrastructure.  This is the fourth blog in this series and will cover OCI network monitoring, observability, and management best practices.  The topics for this blog series are outlined below:

- [Part One – OCI Network Design, VCN, and Subnets Best Practices, Recommendations, and Tips](https://www.ateam-oracle.com/post/oci-networking-best-practices-recommendations-and-tips---part-one---general-oci-networking)
- [Part Two – OCI Network Security Best Practices, Recommendations, and Tips](https://www.ateam-oracle.com/post/oci-networking-best-practices---part-two---oci-network-security)
- [Part Three – OCI Network Connectivity Best Practices, Recommendations, and Tips](https://www.ateam-oracle.com/post/oci-networking-best-practices---part-3---oci-network-connectivity)
- Part Four – OCI Network Monitoring, Observability, and Management Best Practices, Recommendations, and Tips
- This blog series has also been adapted and published as a [Solution Playbook](https://docs.oracle.com/en/solutions/oci-network-deployment/index.html) in the Oracle Architecture Center

# **Understand and Utilize OCI Network Command Center Tools**

### **Rationale**

The OCI Network Command Center brings all of OCI’s native network observability tools together in one place for easier access and a unified user experience.  Customers should be familiar with all of the OCI tools in the Network Command Center and how they can utilize them to simplify your operations and reduce the time to identify issues.

![OCI Network Command Center](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/NCC.jpg)
OCI Network Command Center


OCI Network Command Center offers the following observability tools to support various operations use cases:

- **Network Visualizer** offers intuitive topology visualization to understand connections and relationships between your virtual network resources, inspect the configuration from one place, and visually troubleshoot any configuration issues.

- **Network Path Analyzer** allows you to troubleshoot complex virtual network configurations when you have reachability problems. Network Path Analyzer provides automated configuration analysis to determine the network path the traffic takes, identify routing and security configuration issues, and provide the configuration information along the path.

- **Inter-Region Latency** provides real-time and historical latency information between two OCI regions.

- **VCN Flow Logs** offer network traffic telemetry critical to support your security and network operations use cases. With VCN flow logs, you can gain extensive insights on the network traffic, stream the flow logs to your chosen tool using standard protocols such as Kafka, and archive the flow logs in OCI Object Storage for compliance purposes.

- **Virtual Test Access Point (VTAP)** offers traffic mirroring capabilities that enable full packet capture for security analysis, troubleshooting applications, or network performance issues. VTAP is also useful for troubleshooting complex network problems by analyzing the packet headers.


### **Recommendation**

- Read through our documentation, blogs, and videos to become familiar with each of the Network Command Center tools capabilities and limitations
- Spend some time and play around with the Network Visualizer, Network Path Analyzer, Inter-Region Latency, and VCN Flow Logs as they are non-intrusive tools
- For VTAP, read the below blog links and videos for better understanding of how to utilize that tool and try it out in your environment

**Tip**: Pin the Network Command Center and relevant tools to your OCI Console Home page for quick and easy access

**Tip**: More tools and capabilities are coming from OCI and will be integrated into the Network Command Center so stay up to date.  Below are a couple of links you can keep an eye on for new network features from OCI:

- [OCI Network Release Notes](https://docs.oracle.com/en-us/iaas/releasenotes/services/network/)
- [What’s New In OCI](https://blogs.oracle.com/cloud-infrastructure/post/what-is-new-in-oci)

# **Setup Notifications to be Alerted When Key Network Changes are Made**

### **Rationale**

The OCI Audit service automatically records calls to all supported OCI public Application Programming Interface (API) endpoints and logs them to the Audit Log.  This includes all API calls made by the OCI console, Command Line Interface (CLI),  Software Development Kits (SDK),  other OCI services.  As a result, anytime a change is made to your OCI environment or resources it will show up in the Audit Log.  Customers can utilize the OCI Events and Notifications service to be proactively alerted when a change is made to a critical or key network component.

Examples of some key or critical OCI network components that you may want to setup notifications on are, but many more are available in the Events service.

- Security List or Network Security Groups
- Dynamic Routing Gateway (DRG)
- Network Firewall
- Route Table
- Virtual Cloud Network (VCN) or Subnet

Notifications can be setup anytime these resources are created, deleted, or updated

### **Recommendation**

- Identify the key and critical network resources that you want to be proactively notified when changes are made.  Perhaps a specific security list applied to a particular public subnet is important and you want to know when someone adds, updates, or deletes a rule in that security list.  Another example could be identifying network components in a production compartment to be notified on.
- Check out the below links for further information on how to configure these notifications:

# **Setup Alarms and Notifications to be Alerted When Key Network Metric Thresholds are Breached**

### **Rationale**

The OCI Monitoring service uses metrics to monitor resources and alarms to notify you when these metrics meet alarm-specificed triggers. Customers can create an alarm on any of these metrics that are being measured and collected in OCI.  By combining these metrics and alarms with the OCI notification service, this allows customers to be notified when one of these thresholds on a specific metric is triggered.

Below are some examples of notifications customers can receive but there are many more:

- When the state of a FastConnect or Site-to-Site Virtual Private Network (VPN) goes from up to down
- When FastConnect or Site-to-Site VPN traffic goes above or below a set threshold
- When the Border Gateway Protocol (BGP) state on FastConnect or Site-to-Site VPN goes from up to down
- When the number of unhealthy backends in a Flexible Load Balancer backend set hits a set threshold

### **Recommendation**

- Identify the key and critical metrics and associated thresholds that you want to be notified on
- Read through and familiarize yourself with the OCI documentation for the relevant OCI services

**Tip**: You can create an alarm on any metric that you see inside the OCI console.  On the metric graph, just click the options drop down on the top right corner and select “Create an alarm on this query”

![Create Alarm](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/Create-Alarm.jpg)
Create Alarm from OCI Console


### Authors

![Profile picture of Ben Woltz](http://blogs.oracle.com/wp-content/uploads/2025/09/Headshot-8.jpg)

#### Ben Woltz

##### Principal Cloud Architect

Ben Woltz is a Principal Cloud Architect for OCI with over 25 years of experience in the IT networking space.  During those 25 years, his career has included working for both enterprises and service providers and his roles have spanned from delivery and support to sales.  He applies the experience he's gained from this broad background to his current role with Oracle where he helps Oracle's customers ensure their solutions are designed for successful deployment in the cloud.

[Previous post](https://www.ateam-oracle.com/unravelling-the-difference-modern-data-platform-vs-data-mesh "Unravelling the Difference: Modern Data Platform vs. Data Mesh")

#### Unravelling the Difference: Modern Data Platform vs. Data Mesh

[Nick Goddard](https://www.ateam-oracle.com/authors/nick-goddard) \| 2 minute read

[Next post](https://www.ateam-oracle.com/oci-network-architectures-for-multiple-tenancies "OCI network architectures for multiple tenancies")

#### OCI network architectures for multiple tenancies

[Radu Nistor](https://www.ateam-oracle.com/authors/radu-nistor) \| 2 minute read
