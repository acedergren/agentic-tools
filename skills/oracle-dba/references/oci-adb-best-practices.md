


## 33 Overview of Oracle Database Cloud  Best Practices

Oracle Cloud and MAA collaborate closely to enable customer success using
the varies Oracle Database Cloud services.

This partnership ensures

- Databases, Grid Infrastructure, Exadata, and infrastructure are deployed and
configured with MAA best practices in the Oracle cloud.
- Cloud life cycle practices such as patching, backup and restore, disaster recovery,
and pluggable database management incorporate MAA optimizations as new features and
capabilities are introduced into the Oracle cloud.
- Oracle owns and manages network, system, and Exadata infrastructure using MAA
practices and optimizations.
- Oracle high availability and disaster recovery (HA/DR) solutions meet our Enterprise
customer standards for Gold and Platinum MAA solutions.

For the latest details, see [Oracle Cloud Maximum Availability Architecture](https://www.oracle.com/a/tech/docs/cloud-maa-overview.pdf).


The following table outlines MAA validated solutions and guidance for Oracle Database
Cloud services.

| Service | Bronze | Silver | Gold | Platinum |
| :-- | :-- | :-- | :-- | :-- |
| Oracle Base Database Service (BaseDB) | Base DB – Single Instance<br>- Use Oracle Database cloud automation to configure the network<br>   and create DB Systems and databases<br>- Use Oracle Database cloud automation for system and database<br>   life cycle operations including software updates, upgrades,<br>   monitoring, alerting and database administration and<br>   management.<br>- Use cloud-managed backup service. Recommended: Use (Zero Data<br>   Loss) Autonomous Recovery Service and real time redo to reduce<br>   data loss in case of disasters<br>- Customer's responsibilities<br>  - Create test systems to evaluate application,<br>     configuration or software changes<br>  - Execute System and database sizing, resource management<br>     and monitoring | Base DB – 2-Nodes Oracle RAC<br>- Bronze, plus the following: <br>- Use Oracle Database cloud automation to create multi-node RAC DB<br>   systems on Oracle Cloud Infrastructure (OCI)<br>- Customer's responsibilities<br>  - Maximize application failover and uptime with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) | Base DB – 2-Nodes Oracle RAC with Active Data Guard<br>- Silver, plus the following:<br>- Recommended: primary and standby database systems are symmetric<br>   in shape and system resources.<br>- Use cloud automation to create and manage standby database. The<br>   location can be in another Availability Domain or Region for<br>   better fault isolation. <br>- Customer's responsibilities:<br>  - [Configure Fast Start Failover](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/configure-and-deploy-oracle-data-guard.html#GUID-599001E8-53B1-42A5-A80C-AF7B91716A64 "Fast-start failover allows the broker to automatically fail over to a previously chosen standby database in the event of loss of the primary database. Enabling fast-start failover is requirement to meet stringent RTO requirements in the case of primary database, cluster, or site failure.") (automatic failover) with MAA practices to bound RTO<br>     after database, cluster, potentially Availability Domain<br>     or regional failure<br>     <br>  - Tune Data Guard if lagging (see [Tune and Troubleshoot Oracle Data Guard](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/tune-and-troubleshoot-oracle-data-guard1.html#GUID-464EA7CF-84A3-42BE-A9EE-4623965844B5 "When redo transport, redo apply, or role transitions are not meeting your expected requirements, use the following guidelines to help you tune and troubleshoot your deployment.")<br>  - Extend application failover to standby<br>     with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) or use [Full\<br>     Stack Disaster Recovery Service.](https://www.oracle.com/cloud/full-stack-disaster-recovery/) | Base DB – 2-Nodes Oracle RAC with Active Data Guard and Oracle<br>GoldenGate<br>- Gold, plus the following:<br>- Customer's responsibilities:<br>  - Set up GoldenGate [Cloud Within Region: Configuring Oracle GoldenGate Hub for MAA Platinum](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/cloud-gghub-region.html#GUID-FB908805-CD78-4F0C-BB98-BF147E4E3727 "Configure and deploy MAA Oracle GoldenGate Hub architecture within one region on Oracle Cloud using the provided planning considerations, tasks, management, and troubleshooting information."). GoldenGate management and tuning.<br>     <br>  - Extend application failover to Oracle<br>     GoldenGate replica with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F)<br>  - Optionally use [Global Data\<br>     Services](https://www.oracle.com/database/technologies/high-availability/global-data-services.html) for smart workload management<br>     between GoldenGate replicas and standby databases |
| Oracle Exadata Database Service on Dedicated Infrastructure<br> (ExaDB-D) | NA | ExaDB-D (Default)<br>- Use Oracle Database cloud automation to create Exadata<br>   infrastructure, VM cluster, and RAC databases.<br>- Use Oracle Database cloud automation for system and database<br>   life cycle operations including software updates, upgrades,<br>   monitoring, service events and health alerts, and database<br>   administration and management.<br>- Use cloud-managed backup service. Recommended: Use (Zero Data<br>   Loss) Autonomous Recovery Service and real time redo to reduce<br>   data loss in case of disasters<br>- Customer Responsibilities:<br>  - Create test systems to evaluate application,<br>     configuration or software changes.<br>  - Execute system and database sizing, resource management<br>     and monitoring and reviewing exachk (holistic<br>     health)<br>  - Maximize application failover and uptime with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) | ExaDB-D with Active Data Guard<br>- Silver, plus the following:<br>- Recommended: primary and standby database systems are symmetric<br>   in shape and system resources.<br>- Use cloud automation to create and manage standby database. The<br>   location can be in another Availability Domain or Region for<br>   better fault isolation. <br>- Customer's responsibilities:<br>  - [Configure Fast Start Failover](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/configure-and-deploy-oracle-data-guard.html#GUID-599001E8-53B1-42A5-A80C-AF7B91716A64 "Fast-start failover allows the broker to automatically fail over to a previously chosen standby database in the event of loss of the primary database. Enabling fast-start failover is requirement to meet stringent RTO requirements in the case of primary database, cluster, or site failure.") (automatic failover) with MAA practices to bound RTO<br>     after database, cluster, potentially Availability Domain<br>     or regional failure<br>     <br>  - Tune Data Guard if lagging (see [Tune and Troubleshoot Oracle Data Guard](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/tune-and-troubleshoot-oracle-data-guard1.html#GUID-464EA7CF-84A3-42BE-A9EE-4623965844B5 "When redo transport, redo apply, or role transitions are not meeting your expected requirements, use the following guidelines to help you tune and troubleshoot your deployment.")<br>  - Extend application failover to standby with<br>     [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) or use [Full\<br>     Stack Disaster Recovery Service.](https://www.oracle.com/cloud/full-stack-disaster-recovery/) | ExaDB-D with Active Data Guard and Oracle GoldenGate<br>- Gold, plus the following:<br>- Customer's responsibilities:<br>  - Set up GoldenGate [Cloud Within Region: Configuring Oracle GoldenGate Hub for MAA Platinum](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/cloud-gghub-region.html#GUID-FB908805-CD78-4F0C-BB98-BF147E4E3727 "Configure and deploy MAA Oracle GoldenGate Hub architecture within one region on Oracle Cloud using the provided planning considerations, tasks, management, and troubleshooting information."). GoldenGate management and tuning.<br>     <br>  - Extend application failover to Oracle<br>     GoldenGate replica with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F)<br>  - Optionally use [Global Data\<br>     Services](https://www.oracle.com/database/technologies/high-availability/global-data-services.html) for smart workload management<br>     between GoldenGate replicas and standby databases |
| Oracle Exadata Database Service on Cloud@Customer (ExaDB-C@C) | NA | ExaDB-CC (Default)<br>- Use Oracle Database cloud automation to create Exadata<br>   infrastructure, VM cluster, and RAC databases.<br>- Use Oracle Database cloud automation for system and database<br>   life cycle operations including software updates, upgrades,<br>   monitoring, service events and health alerts, and database<br>   administration and management.<br>- Use cloud-managed backup service. Recommended: Use Zero Data<br>   Loss Recovery Server and real time redo to reduce data loss in<br>   case of disasters<br>- Customer Responsibilities:<br>  - Create test systems to evaluate application,<br>     configuration or software changes.<br>  - Execute system and database sizing, resource management<br>     and monitoring and reviewing exachk (holistic<br>     health)<br>  - Maximize application failover and uptime with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) | ExaDB-CC with Active Data Guard<br>- Silver, plus the following:<br>- Recommended: primary and standby database systems are symmetric<br>   in shape and system resources.<br>- Use cloud automation to create and manage standby database. The<br>   location can be in another Availability Domain or Region for<br>   better fault isolation.<br>- Customer's responsibilities:<br>  - [Configure Fast Start Failover](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/configure-and-deploy-oracle-data-guard.html#GUID-599001E8-53B1-42A5-A80C-AF7B91716A64 "Fast-start failover allows the broker to automatically fail over to a previously chosen standby database in the event of loss of the primary database. Enabling fast-start failover is requirement to meet stringent RTO requirements in the case of primary database, cluster, or site failure.") (automatic failover) with MAA practices to bound RTO<br>     after database, cluster, potentially Availability Domain<br>     or regional failure<br>     <br>  - Tune Data Guard if lagging (see [Tune and Troubleshoot Oracle Data Guard](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/tune-and-troubleshoot-oracle-data-guard1.html#GUID-464EA7CF-84A3-42BE-A9EE-4623965844B5 "When redo transport, redo apply, or role transitions are not meeting your expected requirements, use the following guidelines to help you tune and troubleshoot your deployment.")<br>  - Extend application failover to standby with<br>     [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) or use [Full\<br>     Stack Disaster Recovery Service.](https://www.oracle.com/cloud/full-stack-disaster-recovery/) | ExaDB-CC with Active Data Guard and Oracle GoldenGate<br>- Gold, plus the following:<br>- Customer's responsibilities:<br>  - Set up [On-Premises: Configuring Oracle GoldenGate Hub](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/premises-configuring-oracle-goldengate-hub.html#GUID-A586AA5D-A177-4562-815B-1224E4FD9CB3 "Configure and deploy the MAA Oracle GoldenGate Hub architecture using the provided planning considerations, tasks, management, and troubleshooting information.")<br>  - Extend application failover to Oracle<br>     GoldenGate replica with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F)<br>  - Optionally use [Global Data\<br>     Services](https://www.oracle.com/database/technologies/high-availability/global-data-services.html) for smart workload management<br>     between GoldenGate replicas and standby databases |
| Autonomous Database Serverless (ADB-S) | NA | ADB-S (Default)<br>- Use Oracle Database cloud automation life cycle operations<br>   including software updates, upgrades, monitoring, and database<br>   administration and management.<br>- Customer Responsibilities:<br>  - Create test systems to evaluate application changes<br>  - Maximize application failover and uptime with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) | ADB-S with Autonomous Data Guard <br>- Silver, plus the following:<br>- Enable Autonomous Data Guard, choose automatic failover and data<br>   loss tolerance. The location can be in another Availability<br>   Domain for better fault isolation.<br>- Customer's responsibility:<br>  - Extend application failover to standby with<br>     [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) or use [Full\<br>     Stack Disaster Recovery Service.](https://www.oracle.com/cloud/full-stack-disaster-recovery/)<br>MAA evaluation completed only with a standby database within the same<br>region or cross Availability-Domains.<br>Cross-Region Autonomous Data Guard Evaluation In Progress | Planned |
| Autonomous Database on Dedicated Infrastructure (ADB-D) | NA | ADB-D (Default)<br>- Use Oracle Database cloud automation life cycle operations<br>   including software updates, upgrades, monitoring, and database<br>   administration and management.<br>- Customer Responsibilities:<br>  - Create test systems to evaluate application changes<br>  - Maximize application failover and uptime with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) | ADB-D with Autonomous Data Guard<br>- Silver, plus the following:<br>- Enable Autonomous Data Guard, choose protection mode, data loss<br>   tolerance, and enable automatic failover. The location can be in<br>   another Availability Domain or Region for better fault<br>   isolation.<br>- Customer's responsibility:<br>  - Extend application failover to standby with<br>     [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) or use [Full\<br>     Stack Disaster Recovery Service.](https://www.oracle.com/cloud/full-stack-disaster-recovery/) | ADB-D with Autonomous Data Guard and Oracle GoldenGate<br>- Gold, plus the following:<br>- Customer's responsibilities:<br>  - Set up GoldenGate [Cloud Within Region: Configuring Oracle GoldenGate Hub for MAA Platinum](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/cloud-gghub-region.html#GUID-FB908805-CD78-4F0C-BB98-BF147E4E3727 "Configure and deploy MAA Oracle GoldenGate Hub architecture within one region on Oracle Cloud using the provided planning considerations, tasks, management, and troubleshooting information."). GoldenGate management and tuning.<br>     <br>  - Extend application failover to Oracle<br>     GoldenGate replica with [Achieving Continuous Availability For Your Applications](https://docs.oracle.com/en/database/oracle/oracle-database/19/haovw/oracle-maximum-availability-architecture-oracle-exadata-cloud-systems.html#GUID-E9DF9482-A414-45E0-A5F4-29F6056E364F) |
[Sitemap](https://medium.com/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40deco_92728%2Fbest-practices-for-oracle-autonomous-database-migration-in-2025-97ef4f792bd7&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](https://medium.com/?source=post_page---top_nav_layout_nav-----------------------------------------)

[Write](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[Search](https://medium.com/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40deco_92728%2Fbest-practices-for-oracle-autonomous-database-migration-in-2025-97ef4f792bd7&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

[Mastodon](https://me.dm/@decomoreira)

# 🚀 Best Practices for Oracle Autonomous Database Migration in 2025

[![Jose Carlos Moreira (Deco)](https://miro.medium.com/v2/resize:fill:32:32/1*rsJ3HQe4OlQlfxqFtCmaQw.jpeg)](https://medium.com/@deco_92728?source=post_page---byline--97ef4f792bd7---------------------------------------)

[Jose Carlos Moreira (Deco)](https://medium.com/@deco_92728?source=post_page---byline--97ef4f792bd7---------------------------------------)

Follow

2 min read

·

Apr 22, 2025

[Listen](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D97ef4f792bd7&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40deco_92728%2Fbest-practices-for-oracle-autonomous-database-migration-in-2025-97ef4f792bd7&source=---header_actions--97ef4f792bd7---------------------post_audio_button------------------)

Share

**By Jose Carlos Graça Vieira Moreira**

_Oracle Cloud Architect \| CEO & Founder at HL Tech Group LLC_

## 🔍 Why This Matters

In 2025, cloud migration is no longer optional — it’s a competitive necessity. Oracle Autonomous Database (ADB) on OCI offers powerful tools for organizations seeking security, performance, automation, and cost efficiency.

## Get Jose Carlos Moreira (Deco)’s stories in your inbox

Join Medium for free to get updates from this writer.

Subscribe

Subscribe

After leading dozens of mission-critical projects in cloud and Oracle environments across the globe, I’m sharing here the **best practices** that have consistently delivered success when migrating to ADB.

## ✅ 1\. Start with Clear Objectives

Don’t migrate just to follow trends. Define your goals clearly:

- Reduce operational costs?
- Improve security?
- Accelerate performance?
- Enable auto-scaling?

Set your **KPIs** early: uptime, latency, automation levels, etc.

## ⚙️ 2\. Pick the Right ADB Option

Oracle offers:

- **Autonomous Shared (ATP/ADW)**: Great for general workloads.
- **Autonomous Dedicated**: Ideal for enterprises with high compliance and isolation needs.

👉 Match the workload with the **right tenancy model**.

## 🧹 3\. Prep Your Source DB

Before touching the cloud:

- Clean invalid objects and orphaned data
- Run compatibility checks
- Sync timezones and NLS settings
- Use `SQL Developer` or `autonomous advisor` tools

## ☁️ 4\. Migrate via Oracle Object Storage + DBMS\_CLOUD

ADB loves structured input. Use:

- `expdp` to export from source
- Upload to **OCI Object Storage**
- In ADB, run `impdp` using DBMS\_CLOUD

```
exec DBMS_CLOUD.CREATE_CREDENTIAL('OBJ_STORE_CRED','user','token');
```

## 🔄 5\. Reconnect Applications Smartly

Once in ADB:

- Update connection strings (use secure wallets)
- Repoint BI tools, APIs, and backend services
- Use Autonomous Connection Bundles with ATP

## 📈 6\. Trust, But Tune

Yes, ADB is self-tuning, but:

- Monitor with SQL Monitor and Automatic Indexing reports
- Avoid index hints or overrides
- Use Autonomous Health Framework (AHF)

## 🔐 7\. Make Security Native

Security is not optional in 2025:

- Enable **Database Vault**, auditing, encryption
- Lock down IPs with **VCNs** and **Private Endpoints**
- Rotate keys regularly

## 📊 8\. Monitor, Automate, Scale

After migration:

- Automate with **OCI Resource Manager**
- Setup autoscaling
- Integrate with **OCI Logging and Alerts**

This ensures long-term success and observability.

## 🧠 Final Thoughts

Migrating to Oracle ADB is more than just tech — it’s **strategy**. Done right, it future-proofs your infrastructure, enables autonomy, and strengthens security posture.

If you’re planning an enterprise migration or want an expert roadmap, feel free to connect with me via [LinkedIn](https://www.linkedin.com/in/josecarlosmoreira) or visit [HL Tech Group LLC](https://hltech.group/).

## 🏷️ Tags:

`#Oracle #CloudMigration #ADB #OCI #EnterpriseTech #CloudArchitecture #DBA #HLTechGroup`

📚 Thank you for reading!

I’m passionate about sharing real-world experiences in Oracle General, Oracle Cloud, Database Optimization, IT Innovation, and Enterprise Solutions.

🚀 **Follow me here on Medium** to stay updated with new articles, best practices, and actionable insights. Let’s grow together in the world of technology!

[Oracle Cloud](https://medium.com/tag/oracle-cloud?source=post_page-----97ef4f792bd7---------------------------------------)

[Autonomous Database](https://medium.com/tag/autonomous-database?source=post_page-----97ef4f792bd7---------------------------------------)

[AI](https://medium.com/tag/ai?source=post_page-----97ef4f792bd7---------------------------------------)

[Cloud Computing](https://medium.com/tag/cloud-computing?source=post_page-----97ef4f792bd7---------------------------------------)

[Technology](https://medium.com/tag/technology?source=post_page-----97ef4f792bd7---------------------------------------)

[![Jose Carlos Moreira (Deco)](https://miro.medium.com/v2/resize:fill:48:48/1*rsJ3HQe4OlQlfxqFtCmaQw.jpeg)](https://medium.com/@deco_92728?source=post_page---post_author_info--97ef4f792bd7---------------------------------------)

[![Jose Carlos Moreira (Deco)](https://miro.medium.com/v2/resize:fill:64:64/1*rsJ3HQe4OlQlfxqFtCmaQw.jpeg)](https://medium.com/@deco_92728?source=post_page---post_author_info--97ef4f792bd7---------------------------------------)

Follow

[**Written by Jose Carlos Moreira (Deco)**](https://medium.com/@deco_92728?source=post_page---post_author_info--97ef4f792bd7---------------------------------------)

[3 followers](https://medium.com/@deco_92728/followers?source=post_page---post_author_info--97ef4f792bd7---------------------------------------)

· [6 following](https://medium.com/@deco_92728/following?source=post_page---post_author_info--97ef4f792bd7---------------------------------------)

Jose Moreira is a seasoned IT Consultant and Cloud Specialist with over 20 years of experience leading complex Oracle and SAP transformations for companies.

Follow

## No responses yet

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

Write a response

[What are your thoughts?](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40deco_92728%2Fbest-practices-for-oracle-autonomous-database-migration-in-2025-97ef4f792bd7&source=---post_responses--97ef4f792bd7---------------------respond_sidebar------------------)

Cancel

Respond

## More from Jose Carlos Moreira (Deco)

![Oracle Autonomous Database: Export & Import Using DBMS_CLOUD and OCI Object Storage](https://miro.medium.com/v2/resize:fit:679/format:webp/1*AG5dgpZ6bAP4XNjwlC7r3w.png)

[![Jose Carlos Moreira (Deco)](https://miro.medium.com/v2/resize:fill:20:20/1*rsJ3HQe4OlQlfxqFtCmaQw.jpeg)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----0---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[Jose Carlos Moreira (Deco)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----0---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[**Oracle Autonomous Database: Export & Import Using DBMS\_CLOUD and OCI Object Storage**\\
\\
**Author: Jose Carlos Moreira (Deco) CEO & Founder — HL Tech Group LLC**](https://medium.com/@deco_92728/oracle-autonomous-database-export-import-using-dbms-cloud-and-oci-object-storage-8396e5451894?source=post_page---author_recirc--97ef4f792bd7----0---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

Apr 22, 2025

![🚀 Best Practices for Optimizing Oracle Database Performance in Cloud Environments.](https://miro.medium.com/v2/resize:fit:679/format:webp/1*uyB7F5mlkTaeBvbX4aPClg.png)

[![Jose Carlos Moreira (Deco)](https://miro.medium.com/v2/resize:fill:20:20/1*rsJ3HQe4OlQlfxqFtCmaQw.jpeg)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----1---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[Jose Carlos Moreira (Deco)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----1---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[**🚀 Best Practices for Optimizing Oracle Database Performance in Cloud Environments.**\\
\\
**By Jose Carlos Moreira (Deco)**](https://medium.com/@deco_92728/best-practices-for-optimizing-oracle-database-performance-in-cloud-environments-a5ea667bc647?source=post_page---author_recirc--97ef4f792bd7----1---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

Apr 28, 2025

![Process to Start & Stop Oracle Enterprise Command Center](https://miro.medium.com/v2/resize:fit:679/format:webp/1*Iizcdy_OrPBiq9CKBXo-EA.png)

[![Jose Carlos Moreira (Deco)](https://miro.medium.com/v2/resize:fill:20:20/1*rsJ3HQe4OlQlfxqFtCmaQw.jpeg)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----2---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[Jose Carlos Moreira (Deco)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----2---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[**Process to Start & Stop Oracle Enterprise Command Center**\\
\\
**1\. Oracle Enterprise Command Center Framework.**](https://medium.com/@deco_92728/process-to-start-stop-oracle-enterprise-command-center-604f76ab83a2?source=post_page---author_recirc--97ef4f792bd7----2---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

Apr 28, 2025

![🚀 Revolutionizing Oracle R12 Environment Cloning: 70% Time Reduction Achieved by Jose Moreira.](https://miro.medium.com/v2/resize:fit:679/format:webp/1*rvDVactWpULjlfYj746o8A.png)

[![Jose Carlos Moreira (Deco)](https://miro.medium.com/v2/resize:fill:20:20/1*rsJ3HQe4OlQlfxqFtCmaQw.jpeg)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----3---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[Jose Carlos Moreira (Deco)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7----3---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

[**🚀 Revolutionizing Oracle R12 Environment Cloning: 70% Time Reduction Achieved by Jose Moreira.**\\
\\
**Introduction**](https://medium.com/@deco_92728/revolutionizing-oracle-r12-environment-cloning-67-5-time-reduction-achieved-9c82470d15e9?source=post_page---author_recirc--97ef4f792bd7----3---------------------8486409d_a127_42de_a230_8e449480bee8--------------)

Apr 26, 2025

[See all from Jose Carlos Moreira (Deco)](https://medium.com/@deco_92728?source=post_page---author_recirc--97ef4f792bd7---------------------------------------)

## Recommended from Medium

![6 brain images](https://miro.medium.com/v2/resize:fit:679/format:webp/1*Q-mzQNzJSVYkVGgsmHVjfw.png)

[![Write A Catalyst](https://miro.medium.com/v2/resize:fill:20:20/1*KCHN5TM3Ga2PqZHA4hNbaw.png)](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

In

[Write A Catalyst](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

by

[Dr. Patricia Schmidt](https://medium.com/@creatorschmidt?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[**As a Neuroscientist, I Quit These 5 Morning Habits That Destroy Your Brain**\\
\\
**Most people do \#1 within 10 minutes of waking (and it sabotages your entire day)**](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

Jan 14

[A clap icon19.3K\\
\\
A response icon323](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

![Stanford Just Killed Prompt Engineering With 8 Words (And I Can’t Believe It Worked)](https://miro.medium.com/v2/resize:fit:679/format:webp/1*va3sFwIm26snbj5ly9ZsgA.jpeg)

[![Generative AI](https://miro.medium.com/v2/resize:fill:20:20/1*M4RBhIRaSSZB7lXfrGlatA.png)](https://medium.com/generative-ai?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

In

[Generative AI](https://medium.com/generative-ai?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

by

[Adham Khaled](https://medium.com/@adham__khaled__?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[**Stanford Just Killed Prompt Engineering With 8 Words (And I Can’t Believe It Worked)**\\
\\
**ChatGPT keeps giving you the same boring response? This new technique unlocks 2× more creativity from ANY AI model — no training required…**](https://medium.com/generative-ai/stanford-just-killed-prompt-engineering-with-8-words-and-i-cant-believe-it-worked-8349d6524d2b?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

Oct 19, 2025

[A clap icon23K\\
\\
A response icon590](https://medium.com/generative-ai/stanford-just-killed-prompt-engineering-with-8-words-and-i-cant-believe-it-worked-8349d6524d2b?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

![I Handed ChatGPT $100 to Trade Stocks — Here’s What Happened in 2 Months.](https://miro.medium.com/v2/resize:fit:679/format:webp/1*6o82nTO9HDRHNNlmCLlxvw.png)

[![Coding Nexus](https://miro.medium.com/v2/resize:fill:20:20/1*KCZtO6-wFqmTaMmbTMicbw.png)](https://medium.com/coding-nexus?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

In

[Coding Nexus](https://medium.com/coding-nexus?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

by

[Civil Learning](https://medium.com/@civillearning?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[**I Handed ChatGPT $100 to Trade Stocks — Here’s What Happened in 2 Months.**\\
\\
**What happens when you let a chatbot play Wall Street? It’s up 29% while the S&P 500 lags at 4%.**](https://medium.com/coding-nexus/i-handed-chatgpt-100-to-trade-stocks-heres-what-happened-in-2-months-ca1dfeb92edb?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

Sep 2, 2025

[A clap icon9K\\
\\
A response icon267](https://medium.com/coding-nexus/i-handed-chatgpt-100-to-trade-stocks-heres-what-happened-in-2-months-ca1dfeb92edb?source=post_page---read_next_recirc--97ef4f792bd7----0---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

![Git Confused Me for Years Until I Found This Simple Guide](https://miro.medium.com/v2/resize:fit:679/format:webp/1*YUALkK55VO_6mxjVqq_smQ.png)

[![Let’s Code Future](https://miro.medium.com/v2/resize:fill:20:20/1*QXfeVFVbIzUGnlwXoOZvyQ.png)](https://medium.com/lets-code-future?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

In

[Let’s Code Future](https://medium.com/lets-code-future?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

by

[The Unwritten Algorithm](https://medium.com/@the_unwritten_algorithm?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[**Git Confused Me for Years Until I Found This Simple Guide**\\
\\
**Most developers don’t really understand Git — here’s the simple truth.**](https://medium.com/lets-code-future/git-confused-me-for-years-until-i-found-this-simple-guide-a45223bebb40?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

Dec 19, 2025

[A clap icon2.8K\\
\\
A response icon60](https://medium.com/lets-code-future/git-confused-me-for-years-until-i-found-this-simple-guide-a45223bebb40?source=post_page---read_next_recirc--97ef4f792bd7----1---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

![What a Sex Worker Notices About Gen X and Gen Z Men](https://miro.medium.com/v2/resize:fit:679/format:webp/0*hjbGaG9CLZSyLfF5)

[![Jonatha Czajkiewicz](https://miro.medium.com/v2/resize:fill:20:20/1*9XGxLUkOutVNiUjHml4bKQ.png)](https://medium.com/@jonathacz99?source=post_page---read_next_recirc--97ef4f792bd7----2---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[Jonatha Czajkiewicz](https://medium.com/@jonathacz99?source=post_page---read_next_recirc--97ef4f792bd7----2---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[**What a Sex Worker Notices About Gen X and Gen Z Men**\\
\\
**How masculinity changed between Grunge and TikTok**](https://medium.com/@jonathacz99/what-a-sex-worker-notices-about-gen-x-and-gen-z-men-fd0d13b6c203?source=post_page---read_next_recirc--97ef4f792bd7----2---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

Nov 16, 2025

[A clap icon18.1K\\
\\
A response icon442](https://medium.com/@jonathacz99/what-a-sex-worker-notices-about-gen-x-and-gen-z-men-fd0d13b6c203?source=post_page---read_next_recirc--97ef4f792bd7----2---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

![LinkedIn Is Replacing Kafka — Here’s Why the Streaming Giant is Moving On](https://miro.medium.com/v2/resize:fit:679/format:webp/1*C0uiWyOndIvcr3x6SMiavw.jpeg)

[![Cloud With Azeem](https://miro.medium.com/v2/resize:fill:20:20/1*oJWwUx75Cf5oGoEfAefJpw.png)](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--97ef4f792bd7----3---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[Cloud With Azeem](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--97ef4f792bd7----3---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[**LinkedIn Is Replacing Kafka — Here’s Why the Streaming Giant is Moving On**\\
\\
**Inside LinkedIn’s Bold Move to a New Data Pipeline That Could Change the Future of Real-Time Streaming**](https://medium.com/@cloudwithazeem/linkedin-kafka-replacement-new-streaming-system-76e56073eb97?source=post_page---read_next_recirc--97ef4f792bd7----3---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

Jan 2

[A clap icon712\\
\\
A response icon12](https://medium.com/@cloudwithazeem/linkedin-kafka-replacement-new-streaming-system-76e56073eb97?source=post_page---read_next_recirc--97ef4f792bd7----3---------------------90a55386_055e_4391_9abc_5b4f74b5f929--------------)

[See more recommendations](https://medium.com/?source=post_page---read_next_recirc--97ef4f792bd7---------------------------------------)

[Help](https://help.medium.com/hc/en-us?source=post_page-----97ef4f792bd7---------------------------------------)

[Status](https://status.medium.com/?source=post_page-----97ef4f792bd7---------------------------------------)

[About](https://medium.com/about?autoplay=1&source=post_page-----97ef4f792bd7---------------------------------------)

[Careers](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----97ef4f792bd7---------------------------------------)

[Press](mailto:pressinquiries@medium.com)

[Blog](https://blog.medium.com/?source=post_page-----97ef4f792bd7---------------------------------------)

[Privacy](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----97ef4f792bd7---------------------------------------)

[Rules](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----97ef4f792bd7---------------------------------------)

[Terms](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----97ef4f792bd7---------------------------------------)

[Text to speech](https://speechify.com/medium?source=post_page-----97ef4f792bd7---------------------------------------)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)



## Best Practices for Low Latency  Connections with Autonomous AI Database

Taking
steps to reduce the latency for connections between an application and Autonomous AI Database is critical if
your application performs many round-trips between the application and the
database.


For example, consider an OLTP application connecting to Autonomous AI Database and
submitting thousands of SQL statements to the database individually to
execute a sales order. In this case, the application requires thousands of
round-trips, and reducing the latency for each round-trip can considerably
speed up the sales order process. For such applications there are best
practices that you can follow to reduce the latency for database
connections.


- [Steps to Reduce Latency for Database Connections](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-AC4FDD95-45F6-410B-85A7-163162D5F53D)

You can follow these recommendations to reduce the latency for connections between your applications and the database.

- [Steps to Reduce Latency for Database Connections for Databases with Autonomous Data Guard](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-5BCB0397-F8FA-4257-9DD4-4DD080E62EC0)

Provides steps to take to configure an Autonomous Data Guard standby environment, clients and mid-tiers, to reduce latency for database connections when you connect after a failover or after a switchover (when the standby becomes the Primary).

- [Conceptual Network Diagram for Low Latency Database Connections](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-5D57435B-5CF8-4A04-B167-EDEA5E82161D)

Shows the conceptual network diagram for low latency connections using public endpoints and private endpoints for your database.


**Parent topic:** [Connection and Networking Options and Features](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/connecting-options-features.html#GUID-040B5E48-7A0D-40B6-9184-FA2CE4896C28 "Autonomous AI Database provides a number of different connection and networking options and features for connecting to a database.")

### Steps to Reduce Latency for Database  Connections

You can
follow these recommendations to reduce the latency for connections between your applications
and the database.

First determine the database's availability domain. To find an Autonomous AI Database instance's
availability domain, connect as ADMIN and run the following query:


```sql
SELECT json_value(cloud_identity, '$.AVAILABILITY_DOMAIN') AVAILABILITY_DOMAIN FROM v$pdbs;
```

For example:

```
SELECT json_value(cloud_identity, '$.AVAILABILITY_DOMAIN') AVAILABILITY_DOMAIN
             FROM v$pdbs;

AVAILABILITY_DOMAIN
--------------------
SoSC:US-ASHBURN-AD-1
```

You can also view the availability domain information on the Oracle Cloud Infrastructure Console. See [View Network Information on the OCI Console](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/view-network-information.html#GUID-1F1AD50B-2328-444F-B48D-8C818350ED31 "On the Oracle Cloud Infrastructure Console you can view the network information for your Autonomous AI Database.") for more information.


To reduce latency, do the following:

1. Place clients or the mid-tier servers in the same availability domain as the
    Autonomous AI Database
    instance.


For example, if your application runs on an Oracle Cloud Infrastructure
Compute VM, select the same availability domain as the Autonomous AI Database instance when
you create the compute instance.




If the application runs in another cloud or in an on-premises
data center, use OCI FastConnect to reduce the latency for the connection to your OCI region. See [FastConnect Overview](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/fastconnectoverview.htm)
for more information.


2. Configure the network routing.
   - If you are using an Autonomous AI Database instance on a public endpoint, configure
      your network routing so that the connection from the client to the
      database goes through a Service Gateway.


     See the following for more information.
     - [Setting Up a\\
        Service Gateway in the Console](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm#setting_up_sgw)

     - [Access to Oracle\\
        Services: Service Gateway](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm)
   - If you are using an Autonomous AI Database instance on a private endpoint, you
      connect to the database using the private endpoint visible in your
      network, without the need to configure a Service Gateway.
3. Use one-way TLS connections without a wallet.


As a best practice for lower latency, configure the Autonomous AI Database instance to
allow both mTLS and TLS connections and use TLS connections to connect your
application to the database.




See the following for more information:



   - [Secure Connections to Autonomous AI Database with mTLS or with TLS](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/connect-introduction.html#GUID-C0F28C43-723B-4E23-84A4-1A1490C80CF6 "Connections to Autonomous AI Database are made either over the public Internet, optionally with Access Control Rules (ACLs) defined, or using a private endpoint inside a Virtual Cloud Network (VCN) in your tenancy.")

   - [Update Network Options to Allow TLS or Require Only Mutual TLS (mTLS) Authentication on Autonomous AI Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/support-tls-mtls-authentication.html#GUID-3F3F1FA4-DD7D-4211-A1D3-A74ED35C0AF5 "Describes how to update the secure client connection authentication options, Mutual TLS (mTLS) and TLS.")


4. Use TCP Fast Open (TFO) to connect to the database.


See [Use TCP Fast Open (TFO) to Connect Clients to Autonomous AI Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/connection-tcp-fast-open.html#GUID-E6108D7C-6FE8-4EAB-96D4-32EDFB845884 "If your application is sensitive to network latency and you want to decrease the network latency between your application and the database, you can enable TCP Fast Open (TFO).") for more information.



**Parent topic:** [Best Practices for Low Latency Connections with Autonomous AI Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-A453D817-52F1-4571-8B80-FAD3862BCEBF "Taking steps to reduce the latency for connections between an application and Autonomous AI Database is critical if your application performs many round-trips between the application and the database.")

### Steps to Reduce Latency for  Database Connections for Databases with Autonomous Data  Guard

Provides
steps to take to configure an Autonomous Data
Guard standby environment, clients and mid-tiers, to reduce latency for database
connections when you connect after a failover or after a switchover (when the standby
becomes the Primary).


- [Reduce Latency for Database Connections with Local Autonomous Data Guard](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-9DD31984-5957-4EA5-8068-8F3FE182831D)

Follow these steps to reduce the latency for the database connections you make when you use Autonomous Data Guard and you either failover or switchover to a local standby database.

- [Reduce Latency for Database Connections with Cross-Region Autonomous Data Guard](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-6AA43477-407A-4EC0-B4DB-CB3CAF5D027D)

Follow these steps to reduce the latency for the database connections you make when you use Autonomous Data Guard and you either fail over or switch over to a cross-region standby database.


**Parent topic:** [Best Practices for Low Latency Connections with Autonomous AI Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-A453D817-52F1-4571-8B80-FAD3862BCEBF "Taking steps to reduce the latency for connections between an application and Autonomous AI Database is critical if your application performs many round-trips between the application and the database.")

#### Reduce Latency for Database Connections with  Local Autonomous Data  Guard

Follow
these steps to reduce the latency for the database connections you make when you use Autonomous Data
Guard and you either failover
or switchover to a local standby database.


If you have an Autonomous Data
Guard local standby and you are in a region with multiple availability
domains, Autonomous Data
Guard
creates the local standby database in a different availability domain. When you
failover or switchover to the standby database, the local standby becomes the
Primary database. To prepare for a failover or a switchover it is recommended to
have standby clients and mid-tiers available to enable, so that after a failure or
after a switchover, your applications can continue working in the event of an
availability domain failure.


First, verify that the disaster recovery type for your local peer is Autonomous Data
Guard. See [Enable Autonomous Data Guard](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/autonomous-data-guard-update-type.html#GUID-967ED737-4A05-4D6E-A7CA-C3F21ACF9BF0 "To enable Autonomous Data Guard you update the disaster recovery type to use a standby database.") for more information.


Perform the following tasks to configure standby clients and mid-tiers
for low latency when you are using Autonomous Data
Guard with a local standby in a region with multiple
availability domains.


1. Place the standby clients or mid-tiers in the same availability domain as the
    local standby database (all components should be configured to use the same
    availability domain).


For example, if your application runs on an Oracle Cloud Infrastructure
Compute VM, when you create the compute instance select the same availability
domain for the Compute VM as the standby database. This prepares the
disaster recovery configuration so that the standby database and the standby
Compute VM use the same availability domain after a failover or switchover.
This will reduce latency for connections to the database compared to a
configuration where the components use different availability domains.




To determine the availability domain of the standby database,
connect to the Primary database as the ADMIN user and run the following
query:



```sql
SELECT availability_domain FROM v$pdbs,
        JSON_TABLE(
          cloud_identity,
          '$.AUTONOMOUS_DATA_GUARD[*]'
          COLUMNS (
            standby_type PATH '$.STANDBY_TYPE',
            availability_domain PATH '$.AVAILABILITY_DOMAIN'
          )
        ) jt
WHERE jt.standby_type = 'local';
```



For example, this command shows the availability domain for a
local standby database:



```
AVAILABILITY_DOMAIN
   -------------------
SoSC:US-ASHBURN-AD-3
```

2. You do not need to do additional network configuration or allow one-way TLS
    connections for the local standby database. A local standby database has the
    same setup network configuration as the Primary database.
3. Configure your clients and mid-tiers to use TCP Fast Open.


See [Use TCP Fast Open (TFO) to Connect Clients to Autonomous AI Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/connection-tcp-fast-open.html#GUID-E6108D7C-6FE8-4EAB-96D4-32EDFB845884 "If your application is sensitive to network latency and you want to decrease the network latency between your application and the database, you can enable TCP Fast Open (TFO).") for more information.



**Parent topic:** [Steps to Reduce Latency for Database Connections for Databases with Autonomous Data Guard](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-5BCB0397-F8FA-4257-9DD4-4DD080E62EC0 "Provides steps to take to configure an Autonomous Data Guard standby environment, clients and mid-tiers, to reduce latency for database connections when you connect after a failover or after a switchover (when the standby becomes the Primary).")

#### Reduce Latency for Database Connections with  Cross-Region Autonomous Data  Guard

Follow
these steps to reduce the latency for the database connections you make when you use Autonomous Data
Guard and you either fail
over or switch over to a cross-region standby database.


If you add one or more cross-region Autonomous Data
Guard standby
databases, the cross-region standby databases are added in the regions that you
select when you add a cross-region peer. When you failover or switchover to a
cross-region Autonomous Data
Guard
standby database, the cross-region standby becomes the Primary database. To prepare
for a regional failover or switchover, it is recommended to have standby clients and
mid-tiers available in the remote region. This prepares the clients and the mid-tier
in the remote region so that in the case of a failure or after a switchover, your
applications can continue working.


First, verify that your disaster recovery includes at least one
cross-region Autonomous Data
Guard
standby. See [Add a Cross-Region Standby Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/autonomous-data-guard-enable.html#GUID-FE9962C8-B850-4ECF-B1E9-263864174305 "You can enable Autonomous Data Guard with a cross-region standby when Autonomous AI Database is available (Lifecycle state shows Available).") for more information.


Follow these steps to configure clients and mid-tiers for low latency
when using Autonomous Data
Guard with
one or more cross-region standby databases.


1. Place the standby clients or mid-tiers in the same availability domain as the
    cross-region standby databases.


To determine the availability domains for cross-region Autonomous Data
Guard standby
databases, connect to the Primary database as the ADMIN user and run the
following query:




```sql
SELECT availability_domain FROM v$pdbs,
        JSON_TABLE(
          cloud_identity,
          '$.AUTONOMOUS_DATA_GUARD[*]'
          COLUMNS (
            standby_type PATH '$.STANDBY_TYPE',
            availability_domain PATH '$.AVAILABILITY_DOMAIN'
          )
        ) jt
WHERE jt.standby_type = 'cross-region';
```



For example, when you have two cross-region standby databases,
running this command shows the availability domains for each cross-region
standby database:



```
AVAILABILITY_DOMAIN
   ----------------------
SoSC:PHX-AD-3
SoSC:US-SANJOSE-1-AD-1
```




1. If you have one cross-region standby, the query shows a single
       availability domain. Place the standby clients and mid-tiers in the same
       region and use the same availability domain as the cross-region standby
       database.


      For example, if your application runs on an Oracle Cloud Infrastructure
      Compute VM, when you create the compute instance select the same
      availability domain for the Compute VM as the Autonomous Data
      Guard
      standby database. This assures that the cross-region standby
      database and the standby Compute VM are in the same region and use
      the same availability domain after a failover or switchover.


2. If you have more than one cross-region standby, in each region use the
       appropriate availability domain that matches the region and the
       availability domain for each corresponding standby database. You will
       need to perform this setup multiple times (all components in an
       individual region should use the same availability domain as the Autonomous Data
       Guard
       standby).

If the application runs in another cloud or in an on-premises
data center, use OCI FastConnect to reduce the latency for the connection to your OCI region. See [FastConnect Overview](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/fastconnectoverview.htm)
for more information.


2. Configure the network routing in the region where the standby database resides.
    Perform this step multiple times if you have more than one cross-region standby
    database.
1. If the standby database is on a public endpoint, configure your network
       routing so that the connection from the clients in the region where the
       cross-region standby database is, go through a Service Gateway.


      See the following for more information:



      - [Setting Up a\\
         Service Gateway in the Console](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm#setting_up_sgw)

      - [Access to\\
         Oracle Services: Service Gateway](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm)


2. If the standby database is on a private endpoint, you connect to the
       database using the private endpoint visible in your network, without the
       need to configure a Service Gateway.
3. Use one-way TLS connections without a wallet.


If you configured one-way TLS for your primary database, standby
databases will already have on-way TLS configured. You do not need to do any
additional configuration on cross-region standby databases.

4. Configure your clients and mid-tiers to use TCP Fast Open.


See [Use TCP Fast Open (TFO) to Connect Clients to Autonomous AI Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/connection-tcp-fast-open.html#GUID-E6108D7C-6FE8-4EAB-96D4-32EDFB845884 "If your application is sensitive to network latency and you want to decrease the network latency between your application and the database, you can enable TCP Fast Open (TFO).") for more information.



**Parent topic:** [Steps to Reduce Latency for Database Connections for Databases with Autonomous Data Guard](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-5BCB0397-F8FA-4257-9DD4-4DD080E62EC0 "Provides steps to take to configure an Autonomous Data Guard standby environment, clients and mid-tiers, to reduce latency for database connections when you connect after a failover or after a switchover (when the standby becomes the Primary).")

### Conceptual Network Diagram for Low  Latency Database Connections

Shows the
conceptual network diagram for low latency connections using public endpoints and private
endpoints for your database.

Low Latency
Connections Using Private Endpoint with Application Running Inside the OCI
Region

![Description of adb-private-low-latency.eps follows](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img/adb-private-low-latency.png)

[Description of the illustration adb-private-low-latency.eps](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img_text/adb-private-low-latency.html)

Low Latency
Connections Using Public Endpoint with Application Running Inside the OCI
Region

![Description of adb-public-low-latency.eps follows](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img/adb-public-low-latency.png)

[Description of the illustration adb-public-low-latency.eps](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img_text/adb-public-low-latency.html)

Low Latency
Connections Using a Private Endpoint with Application Running In On-Premises Data
Center Connected to OCI Using FastConnect

![Description of adb-fastconnect-private-low-latency.eps follows](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img/adb-fastconnect-private-low-latency.png)

[Description of the illustration adb-fastconnect-private-low-latency.eps](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img_text/adb-fastconnect-private-low-latency.html)

Low Latency
Connections Using a Public Endpoint with Application Running In Your in On-Premises
Data Center Connected to OCI Using FastConnect

![Description of adb-fastconnect-public-low-latency.eps follows](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img/adb-fastconnect-public-low-latency.png)

[Description of the illustration adb-fastconnect-public-low-latency.eps](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/img_text/adb-fastconnect-public-low-latency.html)

**Parent topic:** [Best Practices for Low Latency Connections with Autonomous AI Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/low-latency-connections.html#GUID-A453D817-52F1-4571-8B80-FAD3862BCEBF "Taking steps to reduce the latency for connections between an application and Autonomous AI Database is critical if your application performs many round-trips between the application and the database.")
- [Skip to content](https://www.ateam-oracle.com/oracle-adb-s-network-considerations#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/www.ateam-oracle.com/post.php) [Twitter](https://twitter.com/share?url=/www.ateam-oracle.com/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/www.ateam-oracle.com/post.php) [Email](https://www.ateam-oracle.com/placeholder.html)

[Networking](https://www.ateam-oracle.com/category/atm-networking)

# Oracle Autonomous Database Serverless – Network Considerations

April 9, 202510 minute read

![Profile picture of Radu Nistor](http://blogs.oracle.com/wp-content/uploads/2025/09/mypic-2.png)[Radu Nistor](https://www.ateam-oracle.com/authors/radu-nistor)
Master Principal Cloud Architect

Hi! The Oracle Autonomous Database is a fully autonomous database that scales elastically and delivers fast query performance. Related to the deployment mode, it comes in two flavors, serverless and dedicated infrastructure. In this blog we will talk about the serverless mode and the things we need to know about the supported network architectures.

### Oracle Cloud Networks

Oracle ADB-S is a Platform as a Service deployed on the Oracle Cloud Infrastructure. In any OCI Region there are two major network domains:

a) IaaS – in the Infrastructure as a Service domain you deploy Virtual Cloud Networks which are part of your routing domain. The IP Space is typically private, chosen from RFC 1918. In this domain you will deploy Virtual Machines which will have private IPs.

b) OSN – In the same region you will find a network called Oracle Services Network. In this domain you will find all SaaS and PaaS deployments (ex: Autonomous Databases, Oracle Integration, Oracle Analytics, Fusion SaaS) and all of them will have Oracle owned Public IPs.

Note: OCI provides a VCN Gateway called Service Gateway for connectivity from IaaS to OSN. OSN to IaaS is not supported via this gateway.

### ADB-S Deployment details

From a networking point of view, the Autonomous Database Serverless can be deployed in three modes:

1\. Public Endpoint only – the service is deployed in the Oracle Services Network and has a Public IP and a Public DNS entry, both owned and maintained by Oracle Cloud.

2\. Private Endpoint only – the service will get deployed in a VCN and subnet that you choose, it will have a private IP from that subnet and DNS entries inside the VCN.

3\. Both Endpoints at the same time.

The type of endpoint is selected at the deployment menu, and it looks like this:

![01_deployment](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/1_deplo_modes.png)

You can switch between Public and Private and any point in time, but the database will be unavailable for a few minutes as it switches the endpoint type.

It’s also important to point out that each ADB-S deployment gets automatic access to a set of tools which have their own ingress point and DNS entry. At this moment, the said tools are: Oracle APEX, Graph Studio, Data transforms, Database actions, Oracle Machine Learning user interface, Web Access (ORDS). The access to the ADB and the tools varies accordingly to the deployment method chosen, which we will explore in more detail.

### ADB-S Public Endpoint Only

Whenever you deploy the database using the one of the first two options in the “Network access” you will get a Public Endpoint.

– The first option will deploy the ADB without any network restrictions whatsoever, it’s basically open to the whole Internet. Security is still ensured by the user/password combination and Mutual TLS.

– The second option allows you to provide a set of restrictions which can be:

a) Public IPs or Subnets. Note that private IPs/subnets are not supported when you choose this option.

b) Virtual Cloud Networks deployed in the IaaS that use a Service Gateway to reach the DB. You can define the VCN by name if it is in the same tenancy or by OCID if you want to provide access to a different tenancy. Furthermore, you can restrict what source IPs are allowed to come from that particular VCN, most likely private IPs. Also, should you use Transit Routing (more details below), you can restrict which IPs are allowed to come from your Datacenter, via FastConnect or IPSEC.

The Network Access Control will look like this:

![2_accesscontrol](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/2_access_Control.png)

When you deploy the ADB-S with the public endpoint, you get the following a Database Wallet which you can download and use on the clients to connect to the DB. The wallet contains important info, like the public endpoint hostname and the service name. Let’s look at some details:

![3_wallet_adb](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/3_wallet_adb.png)

1\. The public entry point for the database connections has the following details:

      a. The entry point is shared by all the ADB-S clients in the region.

       b. The DNS name is constructed in a standardized format which is **_adb.\[region\].oraclecloud.com._**

       c. The DNS will resolve to an Oracle Public IP which is shared by all clients.

2\. The service name is important because it’s the actual piece of information which directs the connection to your particular instance of ADB-S and is constructed with the following format:

_**\[random-characters\]\_\[your-DB-name\]\_\[type-of-service\].adb.oraclecloud.com.**_

3\. One important thing to note is the line **_ssl\_server\_dn\_match=yes_** which tells the client that the Public Endpoint will not accept connections initiated with a different domain. If you create your own DNS entry, in your domain, and point it to the Public IP of the Endpoint, the connection will fail.

As said above, with the ADB you also get a set of tools which have a different entry point. You can view the tool URLs in the ADB details page:

![4_adb-tools](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/4_adb_tools.png)

The entry point for the tools is constructed a little different:

**_\[random-characters\]-\[your-DB-name\].adb.\[region\].oraclecloudapps.com/\[path-to-tool\]_**

Note that the tools are deployed in a the _oraclecloudapps.com_ domain as opposed to the DB itself, which lives in _oraclecloud.com_. The DNS hostname and the Public IP are, again, entirely managed by Oracle and Vanity URLs are not supported. Also, the DNS entry is unique to you but the Public IPs are not, they are shared across all clients.

**Transit routing**

When you deploy the ADB-S with a Public endpoint the default method of connectivity is via the Internet, for resources outside of OCI, or the Service Gateway for OCI IaaS resources. However, OCI supports a special configuration in the IaaS Layer which allows Private connections such as FastConnect and IPSEC to reach into the Public IP space of OSN with a tunnel from the Dynamic Routing Gateway to a Service Gateway from any VCN. The details can be found [here](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/transitroutingoracleservices.htm).

![05_transit_r](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/5_transit_routing.png)

Now that we have all this info, let’s put it in a diagram:

![06_adb_pub](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/6_ADB-pub.png)

### ADB-S Private Endpoint Only

When you want to be more secure, you can choose to deploy the ADB service with only a private endpoint. When you do that, there are some things that happen which are worth mentioning.

1\. The Public Endpoint access for the Database is completely disabled. The DNS entry and the IP are still there because they are shared, but the actual connection to the DB will no longer work.

2\. The Database is assigned a new DNS Hostname and a private IP from the VCN subnet that you chose in the deployment menu.

![7-private](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/7-01-adb_private.png)

3\. The Tools URLs will no longer accept connections, on the public side.

![08-tools](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/7_pe_tools.png)

4\. Each Tool is assigned a new URL for private access.

![09-privatte](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/7-1_private-tools.png)

5\. Oracle will deploy all the required DNS entries as “single-host” zones inside the VCN Resolver. Even though the domain is still public, it is now used in a private way, inside the VCN. Furthermore, the automation will add some oraclevcn.com entries which resolve to the same DB IP. You can view the provisioned zones if you go to the VCN’s default private view:

![dns](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/7-2_privatezones.png)

Also, because of how OCI Private DNS works, there are some things to consider:

– Initially, only resources that are in the same VCN and that use the Oracle DNS resolver will be able to resolve the DNS entries and connect to the DB.

– Other VCNs in the region will need extra configuration, either by attaching the Private View of the DB VCN or by using Conditional Forwarding.

– Datacenter private resources and other OCI Regions will need Conditional Forwarding rules to be able to resolve the DNS entries.

For more details on OCI Private DNS and the ways to perform the above tasks, please review [this blog](https://www.ateam-oracle.com/post/oci-private-dns---common-scenarios). Also, as explained in the [best practice blog](https://www.ateam-oracle.com/post/oci-private-dns-best-practices), try not to forward the whole public zone (oraclecloud.com, oraclecloudapps.com) and do conditional forwarding only for the DB’s exact zone.

6\. The DB Wallet used for private connections has the following strings:

![10-db-pe-wallet](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/7-3_dbwallet.png)

Any resource trying to connect to the DB using this wallet will need to be able to resolve that hostname, as explained above. However, the DB private endpoint will no longer care about the requested domain, which you can see in this line: **_security=(ssl\_server\_dn\_match=no)_**. This is quite important because it gives you the option to connect to the database with any domain or even the IP directly (which would not have worked on the Public Endpoint). You can:

– Use directly the IP;

– Use any of the provided DNS entries, not just the default oraclecloud.com. This helps because you might already be forwarding _oraclevcn.com_ to OCI.

– Create a static DNS entry or a CNAME in your Datacenter, in your internal domain, and point it to the DB IP or DNS name.

Any domain will work but if you use the wallet, you must modify it to use the new hostname.

Let’s put all of this on a diagram:

![adb-pe-dia](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/8_ADB-pe.png)

### ADB-S Private and Public Endpoints

You can also choose to deploy the ADB as a Private Endpoint but also allow the public path to be available. The menu to do that is available when you select the Private Endpoint mode:

![adb-both](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/9_ADB-pe-public.png)

The DB can be accessed on both paths, private and public, with the methods explained in the blog. You can see that the DB is deployed in this mode, in the Console:

![adb-pe-both-console](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/10_both-endpoints.png)

The tools that come bundled with the DB will also get two URLs for access, one for the private path and one for the public:

![tools-both](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/11-tools-pub-priv.png)

In this mode, you are required to provide access control to the Public side, you cannot leave it open.

### Other things worth mentioning

**DB Links**

The Autonomous DB can create DB  to DB connections called [DB-Links](https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/database-links.html).  You can create these DB-Links over the private infrastructure to target a private DB or over the public infrastructure, to target a Publicly reachable target database.

If you choose the private side, you must make sure the VCN DNS resolver which holds the DB Private Endpoint is capable of resolving the target DB’s DNS name. You also have to make sure the routing and security constructs (NSGs/SLs) will allow the connection.

For the public side, you may need the DB’s Outbound Public IP, so you whitelist it on the target side. Note that the Outbound IP is different from the Public IP used for inbound connections and that you need to create an OCI support ticket to get it.

**Vanity URLs**

Whenever you deploy the ADB with a Public Endpoint you are required to use the Oracle Provided DNS names and IPs for both the DB and the embedded tools. However, the private deployments are more relaxed in this regard, and you can use “Vanity URLs”.

On the DB side, in the private mode, the endpoint does not have a strict TLS check so you can connect to the DB with anything you want, any DNS name or even the IP.

On the tools side, the main discussion is around APEX and ORDS. Each of these supports a Vanity URL on the private side. The way to do it is to deploy an OCI Load Balancer that holds your TLS Certificates and connects to the DB IP as a backend. A great step-by-step guide is this [blog post](https://blogs.oracle.com/apex/post/introducing-vanity-urls-on-adb).

**And this concludes this blog. I hope it helps you!**

### Authors

![Profile picture of Radu Nistor](http://blogs.oracle.com/wp-content/uploads/2025/09/mypic-2.png)

#### Radu Nistor

##### Master Principal Cloud Architect

[Previous post](https://www.ateam-oracle.com/building-a-generative-ai-agent-with-function-calling-in-java "Building a Generative AI Agent with Function Calling in Java")

#### Building a Generative AI Agent with Function Calling in Java

[Derek Kam](https://www.ateam-oracle.com/authors/derek-kam) \| 2 minute read

[Next post](https://www.ateam-oracle.com/using-oci-os-s3-interface "Using OCI Object Storage S3 Interface")

#### Using OCI Object Storage S3 Interface

[Kiran Thakkar](https://www.ateam-oracle.com/authors/kiran-thakkar) \| 2 minute read
[Skip to content](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/#content)

i

Rate This

In the era of cloud automation and intelligent data platforms, **Oracle Autonomous Database (ADB)** emerges as a powerful solution that simplifies database management while delivering top-tier performance and scalability.

This blog provides a practical walkthrough of Oracle ADB, its powerful features, and the operational tasks required to manage your databases on **Oracle Cloud Infrastructure (OCI)** with ease.

## What is Oracle Autonomous Database?

Oracle ADB is a **fully managed, self-driving database service** that automatically handles provisioning, patching, backups, scaling, and tuning — freeing you from traditional administrative tasks.

Whether you’re running OLTP workloads or data warehousing, ADB adapts to your requirements with **elastic scalability** and **high-performance query processing**.

.

* * *

## 🔧 Key Features That Make ADB Stand Out

### ✅ Fully Managed Database Lifecycle

- **Provisioning**, **backups**, **patching**, and **upgrades** are automated.
- Independently scale **CPU** and **storage** with **no downtime**.
- Automatically shut down idle compute to save costs.

### ✅ Auto Scaling

- Auto-adjust compute and storage up to 3x the base value.
- Controlled via **OCI Console**, allowing fine-grained control.

### ✅ Compatibility & Connectivity

- Supports **SQL\*Net, JDBC, ODBC**
- Integrates with Oracle services like **Oracle Analytics Cloud**, **GoldenGate**, and 3rd-party tools.

## 💻 Built-in Development Tools

Oracle ADB offers a powerful set of development and analysis tools via its **web-based interface (Database Actions)**:

- **Oracle APEX** – Build low-code web apps.
- **SQL Worksheet** – Run and test SQL/PLSQL code.
- **Data Modeler** – Create and manage database models.
- **REST API Editor** – Design and test RESTful services.
- **Oracle Machine Learning** – Build and deploy ML models with AutoML.
- **Graph Studio** – Work with property graph databases.
- **Charts & Dashboards** – Visualize your data using SQL.

## ⚙️ Operational Tasks – What You Can Do

Whether you’re a DBA or DevOps engineer, Oracle ADB offers flexibility to handle all standard operations:

### 🔹 Create, Start, Stop, Terminate

Easily manage your database lifecycle from the OCI console or using the **OCI CLI**.

### 🔹 Scale Up/Down Resources

Increase or decrease compute/storage on demand, with **zero service disruption**.

### 🔹 Manage Users & Access

- Change admin passwords.
- Create custom users and restrict database access using **Access Control Lists (ACLs)**.

### 🔹 Data Management

- Load data from **Object Storage, AWS S3, Azure Blob, GCP**, and more.
- Manual or automated **backups and restores**.
- **Clone** databases for dev/test or sandbox purposes.

## 🔁 Disaster Recovery (DR) Options

Oracle ADB supports enterprise-grade DR strategies:

### 🔸 Autonomous Data Guard

- Set up **local or cross-region standbys**.
- Real-time sync with failover capability.

### 🔸 Backup-Based DR

- Low-cost alternative using backups.
- On-demand restore for regional availability.

## 📣 Monitoring & Alerts

Ensure high availability with real-time observability tools:

- **Database Dashboard**: Monitor CPU, sessions, and performance.
- **Performance Hub**: Get SQL Monitoring and ASH analytics.
- **Alarm Configuration**: Set alerts for high CPU/storage, or service failures.

## 🔒 Security & Compliance

- Register with **Oracle Data Safe** for activity auditing, masking, and more.
- Control public access via **ACLs**.
- Leverage **auto-indexing** for performance without manual tuning.

## 🧠 Final Thoughts

Oracle Autonomous Database is more than just a managed database — it’s a **smart, adaptive platform** for modern data workloads. From **zero-downtime scaling** to **in-database machine learning**, it empowers cloud professionals to focus on innovation instead of maintenance.

### Share this:

- [Share on Facebook (Opens in new window)Facebook](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/?share=facebook&nb=1)
- [Email a link to a friend (Opens in new window)Email](mailto:?subject=%5BShared%20Post%5D%20Mastering%20Oracle%20Autonomous%20Database%3A%20A%20Guide%20for%20OCI%20Professionals&body=https%3A%2F%2Fnithinsunke.wordpress.com%2F2025%2F04%2F04%2Fmastering-oracle-autonomous-database-a-guide-for-oci-professionals%2F&share=email&nb=1)
- [Share on WhatsApp (Opens in new window)WhatsApp](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/?share=jetpack-whatsapp&nb=1)

LikeLoading...

### _Related_

[![](https://i0.wp.com/nithinsunke.wordpress.com/wp-content/uploads/2025/04/image-64.png?resize=350%2C200&ssl=1)](https://nithinsunke.wordpress.com/2025/04/04/scale-up-or-down-your-oracle-autonomous-database-cpu-storage-made-simple/ "Scale Up or Down Your Oracle Autonomous Database: CPU &amp; Storage Made Simple!")

#### [Scale Up or Down Your Oracle Autonomous Database: CPU & Storage Made Simple!](https://nithinsunke.wordpress.com/2025/04/04/scale-up-or-down-your-oracle-autonomous-database-cpu-storage-made-simple/ "Scale Up or Down Your Oracle Autonomous Database: CPU &amp; Storage Made Simple!")

In today's cloud-first world, flexibility and scalability are key to keeping your applications running efficiently. Oracle Autonomous Database (ADB) provides seamless scaling options that help you adapt your resources to match your workload—without downtime! Whether you’re on Autonomous Data Warehouse (ADW), Autonomous Transaction Processing (ATP), or Autonomous APEX, here’s how…

4 Apr 2025

In "ORACLE CLOUD"

[![](https://i0.wp.com/nithinsunke.wordpress.com/wp-content/uploads/2025/04/image-86.png?resize=350%2C200&ssl=1)](https://nithinsunke.wordpress.com/2025/04/04/oracle-autonomous-database-disaster-recovery/ "Oracle Autonomous Database: Disaster Recovery")

#### [Oracle Autonomous Database: Disaster Recovery](https://nithinsunke.wordpress.com/2025/04/04/oracle-autonomous-database-disaster-recovery/ "Oracle Autonomous Database: Disaster Recovery")

When it comes to mission-critical applications, downtime is not an option. That’s why Disaster Recovery (DR) plays a vital role in your Oracle Autonomous Database (ADB) strategy. OCI makes it easier than ever to build a robust DR plan — with automation, scalability, and high availability built in. In this…

4 Apr 2025

In "ORACLE CLOUD"

[![](https://i0.wp.com/nithinsunke.wordpress.com/wp-content/uploads/2025/04/image-48.png?resize=350%2C200&ssl=1)](https://nithinsunke.wordpress.com/2025/04/04/steps-to-access-object-storage-from-adb/ "Steps to access object storage from ADB")

#### [Steps to access object storage from ADB](https://nithinsunke.wordpress.com/2025/04/04/steps-to-access-object-storage-from-adb/ "Steps to access object storage from ADB")

Oracle Cloud Infrastructure (OCI) provides Object Storage as a highly scalable and secure storage solution for unstructured data. One of the powerful capabilities of Oracle Autonomous Database (ADB) is its seamless integration with OCI Object Storage, which allows users to load and unload data directly from/to buckets. In this blog…

4 Apr 2025

In "CLOUD"

### Leave a comment [Cancel reply](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/\#respond)

Δ

- [Comment](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/#respond)
- [Reblog](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/)
- [Subscribe](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/) [Subscribed](https://nithinsunke.wordpress.com/2025/04/04/mastering-oracle-autonomous-database-a-guide-for-oci-professionals/)









Sign me up

  - Already have a WordPress.com account? [Log in now.](https://wordpress.com/log-in?redirect_to=https%3A%2F%2Fnithinsunke.wordpress.com%2F2025%2F04%2F04%2Fmastering-oracle-autonomous-database-a-guide-for-oci-professionals%2F&signup_flow=account)


- - [![](https://nithinsunke.wordpress.com/wp-content/uploads/2020/05/cropped-capture-4-1.png?w=50) Nithin Sunke's Cloud DBA blog](https://nithinsunke.wordpress.com/)

%d

Design a site like this with WordPress.com

[Get started](https://wordpress.com/start/?ref=marketing_bar) [Create your website at WordPress.com](https://wordpress.com/start/?ref=marketing_bar)

searchpreviousnexttagcategoryexpandmenulocationphonemailtimecartzoomeditclose![](https://pixel.wp.com/g.gif?blog=166574074&v=wpcom&tz=5&user_id=0&post=1593&subd=nithinsunke&host=nithinsunke.wordpress.com&ref=https%3A%2F%2Fwww.google.com%2F&rand=0.4437406886861537)
![Thumbnail (1920x1080)](https://i.ytimg.com/vi/b1YwmniwFy0/maxresdefault.jpg)
# [Best practices for migrations to Oracle Autonomous Database](https://www.youtube.com/watch?v=b1YwmniwFy0)

**Visibility**: Public
**Uploaded by**: [Oracle](http://www.youtube.com/@Oracle)
**Uploaded at**: 2021-12-02T16:31:33-08:00
**Published at**: 2021-12-02T16:31:33-08:00
**Length**: 28:09
**Views**: 1689
**Likes**: 22
**Category**: Science & Technology

## Description

```
Find out more: https://oracle.com/DatabaseWorldFreeTier 
After more than three years in production, Oracle Autonomous Database has clearly revolutionized the use of Oracle Database. This session reviews controls available to help upgrade your Oracle Database estate to Autonomous Database. 

Contact Oracle Sales: https://social.ora.cl/6001JzysT
Oracle: http://social.ora.cl/6008yDYy4
Try Oracle Cloud for free: https://social.ora.cl/6003yG8dB
Oracle Events: https://social.ora.cl/6005yG8gv
Oracle Support: https://social.ora.cl/6009yG8if
Oracle's communities: https://social.ora.cl/6000yG8c4
Subscribe to Oracle's YouTube channel: https://social.ora.cl/6004yGDBE
```

## Transcript

[SOOTHING MUSIC] KRIS BHANUSHALI: Hello, and
welcome to the Oracle Database World. If you've been considering
migrating your workload to the Oracle
Autonomous Database, then this is the right
decision for you. My name is Kris Bhanushali. I'm a Senior Principal
Product Manager here in the Oracle Autonomous
Database Product Management Team. And today's topic
is Best Practices for Database Migrations
to Autonomous. Our agenda today
is straightforward. I'll be giving you a quick
introduction to the Autonomous Database. We'll be talking about
pre-migration considerations, things you should keep in mind
before you start the migration process or before you make
migration option choices. We'll talk about the options
that are available to you based on your source
database version, source database platform,
operating system, and also the type of target
Autonomous Database you choose. And then finally, I'll leave
you with some resources for furthering your learning. Now the Oracle
Autonomous Database is the Oracle database offered
as a simple to use cloud service. But a lot of the functions
are automated, especially the admin tasks. To begin with, the
provisioning of the database itself is very
simplified, so that if you are a developer, a DBA,
a line of business user, and even if you are somebody
who is responsible for deploying complex mission critical
database configuration, you can do all of that very
intuitively from a simple web UI, or programmatically
through APIs and STEs that are provided. And so provisioning has
been highly simplified, from the basic to the most
complex configurations. And as I said, it's
autonomous in nature. A lot of the admin functions
such as backups, patching, availability in case you decide
to replicate across regions, encryption key management,
all of these functions are now automated,
and basically very simple to configure and use. The service is also designed so
that it responds in real time to workload demand,
and scales up or down in terms of the resources
that it consumes. Now this way, it gives you
true dynamic pay-per-view in real time without
any downtime. Which means that, when
you size your database, you are no longer going to
size for peak workloads. You will size for
an average workload, and allow the system to
scale up to 3x the max size that you have configured. And that headroom can be used on
demand only, and thereby saving you cost and CPU time
on an ongoing basis. The Autonomous Database also
runs on a variety of platforms. It can run in one of the 32
public cloud regions worldwide. It can run in your own
datacenter, if you so choose. It can also be brought
to a special region that could be built for your
company, in case you desire. Now let's quickly look
at the target platforms. And the reason this
is important is, the migration options
you choose could be dependent on
the type of target Autonomous Database
platform you're on. So the simplest of them, and
the most easy to use lightweight Autonomous Database option,
is on the shared platform. And by shared, we mean
the infrastructure on which the Autonomous
Database is hosted is shared between customers. So all Autonomous
Databases, by the way, are deployed on Oracle's
Exadata infrastructure. So as you know, Exadata-- for over a decade, it has
been a platform of choice and a highly performant platform
for deploying Oracle databases. So shared, dedicated,
and cloud customer, all three are
deployed on Exadata. In shared, that Exadata
machine might be shared between different customers. So in a container database,
multiple pluggable databases could belong to
different customers. If that option works for
you, then you definitely get all the other benefits that
I mentioned, of autonomous, of automatic patching,
key management, security, et cetera. If your application requires
its own dedicated hardware, and it requires more isolation
in terms of performance, network, and of course
hardware isolation, then a dedicated
Exadata infrastructure could be a platform of
choice for that application. And so you can then deploy
Autonomous on dedicated in, once again, one of the
many public cloud regions. Now certain
applications may also require that the infrastructure
actually stay on site. And so, due to either
data sovereignty issues, or because it integrates with
other applications on premises, for a variety of reasons. If you choose to run Autonomous
in your own datacenter, then you would pick the cloud
at customer platform, where an Exadata cloud machine is then
deployed in your datacenter, and you run Autonomous on it. The advantage is, you get
all the benefits of cloud. You get the same console
interface, API interfaces, except the hardware
runs in your datacenter. So now, with that understanding
of the different target platform choices,
let's move on and look at some of the
pre-migration steps that you would
undertake before you make a choice on the
migration technique. A little bit of background
on how Autonomous works, for you to
better understand what these checks are about. Now Autonomous as I
said, is very securely, so that different workloads
can run on a single container database or a single
Exadata infrastructure. Also, it provides
isolation between the pluggable databases. And so basically, if you're
running an application on a pluggable database
A, it should not interfere with something
that's running on B. Also from an access perspective
and a security standpoint, the users of one database should
definitely not have access to another database. And therefore, even in
a large organization where hundreds of
such applications might run on a single
Exadata infrastructure, you get isolation between all
of the different applications at different levels. And for that purpose,
many of the functions of the database, features
of the database, parameters that can potentially compromise
that, are locked down. And so it's important
to understand what those features
are, and make sure that if your
existing application has those parameters
in place, or is set up in a certain way
that can interfere, then you identify
those and you can resolve those ahead of time,
before you decide to migrate. And so, one of the
migration checks is to basically look
at legacy features, and then understand
how they're handled. There are some examples
of them on the slide. For example, if you're
using Basic LOBS, then they are converted
to secure files when you do that migration to
Autonomous, using the data pump method, which we're going
to discuss in future slides. Also, the way you manage
tablespaces, the way you manage extends, the way you manage
DBMS jobs, changes slightly. So there are some
objects that basically, automatically migrate
themselves to a new form. And so you need to be
aware that that happens, and ensure that your
application can handle that. Similarly, there
are certain features of the database that
may not be supported in Autonomous for the reasons
that I mentioned earlier. Application containers,
common users, data masking and
subsetting pack, charting, these are some of
the features of the database that you might have
on-prem, but these are not available in the
Autonomous Database. And so if your application
has been using those, you make sure that
either they are removed or there is no such
dependency on those features before you migrate your
data into Autonomous. Now all of this could sound
super complicated and hard to keep track of and uncover. And therefore, we provide a tool
called the Cloud Premigration Advisor Tool, or
formally known as CPAT. And what happens with the
CPAT tool is, once you run it against your source
database, it will validate all of these
parameters, options, features, objects that might
be in certain places. And then it will
generate a report and let you know if
your source database is ready for Autonomous. An example is, if you
have objects in the system tablespace, clearly that is
not allowed in Autonomous. Customers do not have
access to system system, and therefore it will
flag those changes. And so it just really
makes it simple for you to basically understand
if your source databases are ready. The tool itself,
it's Java based. And so if you have
any restrictions on, not being able to
run it directly on the source database, then you
can actually run it anywhere. And if you make JDBC connection
to your source database, it will determine what
it needs to find out. And then accordingly,
it will generate a report which can
either be in JSON, or it can be a text output. And so if you have
dozens of such databases you're running against,
and automatically, and then you would later run want to do
some sort of key value search. You might actually pick JSON,
so that option is available. If you use the ZDM
tool, which we're going to talk about as one
of the options of migrating your [INAUDIBLE] ZDM does
come bundled with CPAT. And as a precursor,
the first step, it'll automatically run CPAT
and determine that your source database is indeed
ready for migration, and then it will carry on
with the following steps. OK, so now we get into
the migration matters. First of all, when it
comes to Autonomous, all migration is logical. So you have to understand
that you will be migrating the data and not the database. So you cannot take data files
themselves and move them to Autonomous, which is
very typical in a migration, whether using transport
of the tablespaces, or RMAN based
physical migration. Those options are
not available to you. You actually have
to take the data and move it to the
Autonomous Database. And there are two
different paths, as you can see in the slide. The first path is very direct. You have a source database
to which a tool can connect, and it can move the data
to the target database. The other option is there,
mostly for databases that would be larger in size or
have availability restrictions, is that you would take the data. You would stage it in an object
store, or a local storage. And then from there,
you would move it to the Autonomous Database. So you have two distinct paths
and two distinct methods. And a lot of the tools that
I'm going to talk about are one or the other. So that way you understand what
the differences between the two tools are, and when you should
use one versus the other. So here is your options. Now [AUDIO OUT] All the
options in the top row are pretty much for direct load. So we'll go over each
of them, and I'll explain which one you would
pick based on the type of use case you have. But database actions, SQL
Developer, and SQL Loader, pretty much load data directly
from your source database into the target database. Except SQL Loader, maybe. I think SQL Loader, it will
load data from a flat file. So you somehow need
to get the data out of the source database. Data pump, ZDM, data
migration service. They are, again-- would
require staging of the data. And they are generally
intended for workloads where the database
sizes are substantial, and then your other
restrictions on the availability of those databases. So those are some of the
key migration techniques. And so we'll spend a little
bit more time on those. So let's talk about
Database Actions. Now this is a
migration tool that is available in the OCI service,
in the database console itself. So if you go to the OCI database
console in your Autonomous service, you will see
one of the tiles there that says Database Actions. And it is basically meant for
quick loads of small data sets into your Autonomous
Database for dev test. If you are training,
sample schema, et cetera. So anything that is
lightweight, give or take a few megabytes,
it's a good option. It's available both for public
cloud and cloud at customer, and it works on a variety
of source data formats. You could be loading data from
an Excel spreadsheet, or CSV, or a JSON file, or an
Avro file, et cetera. [AUDIO OUT] Now many of you might be
familiar with SQL Developer, so this could be
a favorite tool. And it also handles
slightly larger files than Database Actions. Once again, SQL
Developer has been used by users, DBAs, developers,
equally for a long time. And so of course, the learning
curve is really very small. You would use it for loading
medium size data files directly from your SQL Developer tool,
basically that you can install on your laptop or your desktop. And it works with a
variety of formats. So I wouldn't speak
much about that, because I'm sure many of you
already know how to do that. SQL Developer has been enhanced
so that it works quite well with cloud databases, sets
up a secure connection using a wallet that
you can provide, and is very intuitive when
it comes to loading these files into a cloud
Autonomous Database. Then comes SQL Loader. Now SQL Loader is
unique in the sense that, you can use it to load
files from either object store, or from an NFS device,
depending upon whether you are using a public
cloud, Autonomous Database, or cloud at customer. So let's take cloud at
customer, for example. If your cloud at customer is
on premise in your datacenter, and you decide that of
course, your data should not leave your datacenter,
you may not want to put it in
the object store. And it makes sense to
first download the data to flat files, and then
use SQL Loader to load the data into your database. So your data files could
be sitting on-prem. Also, you can download data
from a variety of databases, and as long as you have
them in CSV or text files, you can then upload these into
your Autonomous Database using SQL Loader. Then comes the golden horse
of data loading, Data Pump. And Data Pump, again,
is unique because it supports a wide variety of
source and target platforms. Of course, it is
limited to an Oracle to Oracle data migration. But if you're running an
Oracle database on-prem, it could be running on a
different operating system. It could be running
on a different NDN platform, different version
of the Oracle database. As long as that version
supports Data Pump, you can actually
take a data export and then move those files
to where your target is, and load them. Now the only
requirement, as I said, is that your source
does support Data Pump. So again, you basically--
all the way from 10G, is when Data Pump was
introduced, to 21, you could have a wide variety
of sources from which you can export and move data. It is also a lot faster,
and it is also good if your databases are large. So you could have
terabyte sized databases that can be migrated
into Autonomous. If you're moving into Autonomous
on dedicated cloud at customer, then you could use the NFS
option, where Data Pump files could be put on a local
NFS in your own datacenter, and then imported into
the Autonomous Database. If you are using public
cloud, then you're better off moving
those Data Pump exports to OCI Object Storage,
then importing it from there. The only consideration
when it comes to Data Pump, is the fact that, if you
have a very large database and you download it, you need
a certain amount of downtime. So for databases that could
be down, for example, a day, a weekend, those can be a great
way for simple Data Pump export and import into your
target or data warehouse. And so availability, I would
say, is not a major criteria. Doing a simple direct Data
Pump based export import could be a good option. Now, then comes
applications where availability is a criteria. You have business
critical applications where downtime is
minimally available, or you may have just a brownout
available, 24/7 applications. All those can be
migrated to Autonomous using a utility called Zero
Downtime Migration, or ZDM. So ZDM is an Oracle
provided free utility, that helps you move from a
variety of source databases to a variety of
target databases, not only Autonomous, but even
many other types of platforms except cloud at customer,
XSES, et cetera. In fact there is a whole
other session on ZDM that is being done by my
colleague at Database World. I would ask that
you check it out if this tool is of
interest to you. But talking from an
Autonomous standpoint, it simplifies a lot
of the tasks that you would have with Data Pump,
running pre-migration checks, setting up availability. So it uses the MAA best
practices of Oracle, using GoldenGate
to ensure that it is moving trail files to the
target and does a cutover, such that the downtime
is close to zero. And so let's take a closer look
at how ZDM works step by step. Now imagine you have
a source database that requires high uptime,
and it is constantly being used by end users. To migrate this
database, of course you would first go ahead and
create an Autonomous Database on the target platform
of your choice. Could be cloud at
customer, could be shared, could be dedicated
infrastructure in the Oracle public cloud regions, or
whatever your choice is. Go ahead and deploy your
Autonomous Database. Install ZDM on a host. All you need is a Linux host. The footprint is very small,
it's about an 800 MB binary. So it takes very little
to install and run it. Also comes with its
own CLI, et cetera, so it's easy to
configure and fire off. Once we have ZDM running, it
can establish a connection to both the source
and the target, make an SSH connection
to your source, or it can take the
Data Pump exports. It can make a SQL connection
to your Autonomous target database. Next you would set up a
GoldenGate microservice. Now this is also
very easy to do, because it's readily available
in the OCI Marketplace. All you have to do is go there
and deploy the microservice from there. Once you point ZDM
to it, it knows how to configure GoldenGate so
that it can pick up the trail files from the source
database and then apply them on your Autonomous when needed. So the entire orchestration
is done by ZDM. All you do is deploy Autonomous
Database, deploy GoldenGate, and then you configure
ZDM and give it the information it
needs to connect to these systems, including
your source database. And so basically, ZDM starts. Once it finishes taking
the Data Pump dump files from your
source database, it can start moving them to the
object store, or to an NFS, depending upon what
you have chosen. Once it completes
that movement of data, it will start applying the
exports to your Autonomous Database, which is kind of the
initial load that it completes. We had Data Pump export
and Data Pump import. Once that finishes,
it orchestrates GoldenGate to start
applying the trail files that it has accumulated. So now comes the time where
your Autonomous Database is keeping in sync with
your source databases, until the time that you are
ready to make the switch. And so when you are
ready to make the switch, you would then go ahead and move
your applications or your user to the Autonomous Database. And with a brownout,
basically you have completed the migration. So that's ZDM. And as I said, it's a
great tool with options to migrate from a variety of
source, target, database types. And if I've not said that
before, once again, it is free. And so do check it out and do
check out the session on ZDM for more details. In ZDM 21.2, you also have
the option of migrating-- doing an offline migration
from AWS RDS to Autonomous. So if you've been running an
Oracle database in AWS RDS service, and if you desire
to move the database, then you can use ZDM to
automate a lot of the migration via S3 service. So it takes the Data
Pump export, moves it to S3, and from within S3,
you can import it directly into the Autonomous Database. Similarly, if your
source database is on AIX or on Solaris, so
other platforms than Linux, you can use ZDM 21.2 and
complete the migration-- a logical offline migration
using the same method that I've described, using
Data Pump as the underlying technology. And finally, there is an OCI
service called the Database Migration Service. Now the Database
Migration Service does automate a lot of these
things under the covers, and it's a lot simpler
to use, except it only works for migrations to
Autonomous Databases in the OCI public cloud regions. And so it does not currently
support cloud at customer. But if your target is one
of the public cloud regions, it is a great tool. Doesn't require
installation, it is there. And it's quite intuitive,
so when you go there, you configure it to connect
to your source databases, provide an Autonomous
Database to connect to. And you can complete the
migration in a few easy steps. But the tool is being
enhanced, so future versions of the Data Migration Service
will allow it to support cloud at customer as well. All right, so to summarize
the best practices-- we've talked about quite a few. Always, always run the
Premigration Advisor or the CPAT utility on
your source database, either via ZDM, if
you're using it, or by running it
independently, and ensuring that your database does meet
the requirements of Autonomous. There's a lot of documentation. If you go to Oracle's
Autonomous Database doc, you would find a detailed list
of parameters and features that may not be supported. So I encourage you to go
take a close look at that, and it's an easy
way to ensure there which source
database is qualified to migrate to Autonomous. And once you do
that, then of course you pick the right option
based on the size of the source database, the operating
system, the version, et cetera, as we discussed. And of course, the
availability requirements of your application. Some resources-- as
I said, check out Oracle Live Labs, where you
do have quite a few Labs available. In fact, there's a great lab
on ZDM which you can try out, which will walk you step by
step through all the steps you need to get to the
Autonomous Database. You of course, have the
documentation for both ZDM as well as the
Autonomous Database. And there's a special
chapter on migration, where all of these
options that I mentioned are easy to navigate. And you can basically pick an
option based on the use case. So there's a navigator
in the doc itself. And then of course,
there's various blogs. One of them I've
pointed out here. So with that, I
wish you luck and I hope you have great other
sessions at Oracle Database World.



Hosted by Marcos Arancibia
Autonomous Database Product Mgt.
THIS SESSION IS BEING RECORDED
AUTONOMOUS DATABASE
LEARNING LOUNGE
Global
Edition
Best practices for a Modern Data Platform -
integrate Any Data, from Any Cloud

Copyright © 2024, Oracle and/or its affiliates2
Agenda
•
Alexey Filanovskiy, Senior Principal Product Manager, will show
you how to create a modern data platform using the Oracle
Autonomous Database. You’ll learn how to work with various
types of data across different clouds and integrate with other
metadata sources, such as AWS Glue.
•
He will also cover how toshare datathroughout your
organization and make the most of different data formats.
•
Additionally, participants will discover the power of
Autonomous Database Data Studio, a self-service UI that is an
essential companion for interacting with data in a modern data
platform
Open Q&A
•
Product Managers will answer any technical questions about the
Autonomous Database service, its features, integration capabilities
and use cases.

Copyright © 2024, Oracle and/or its affiliates3
Before we begin...
This session is for you!!!
•Ask any questions in Q&A
•Oracle Product Managers are on standby
•We will post Links in Chat
•Recording will be available a few days
after the session, at
 bit.ly/adb-learning-lounge
•Make sure to interact with us !

Copyright © 2024, Oracle and/or its affiliates4
bit.ly/adb-linkedin-grp
@AutonomousDW

Important links for you to bookmark
3
Got a question?
We are on stackoverflow
bit.ly/adb-stackoverflow
Join us on Developers Slack
(search for #oracle-autonomous-database)
bit.ly/oradevs\_ext\_slack
Links to get you started and to make sure you keep up to date
with everything related to Autonomous Database
1
2 Join us on:
Our new Get Started
Page is the right place
to start: bit.ly/adb-get-started
Copyright © 2024, Oracle and/or its affiliates4

Copyright © 2024, Oracle and/or its affiliates5
Join our External Slack
STEP 1: bit.ly/oradevs\_ext\_slack
STEP 2: search for #oracle-autonomous-database
 at the top and click on the Channel

Copyright © 2024, Oracle and/or its affiliates6
Best practices for a Modern Data
Platform - integrate Any Data,
from Any Cloud

Best practices for modern data
platform - Any Cloud, Any Data
Oracle Autonomous Database is transforming the
landscape of analytics in a multi-cloud environment.
Alexey Filanovskiy
Autonomous Database Product Management
April 2024

AI
Query
Clouds
On-premises
Any Data
Modern data platform opportunity
Any Location
Any Workload
8

I am Mike. I am a Data Analyst. I’m working for MovieStream
company that sells video content
I know something about IT, but I do not have strong
background.”
My manager, Bob, comes up with a list of random questions.
He always needs the answers “yesterday.”
MovieStreams Architecture
•Data Warehouse powered by Autonomous Data Warehouse
•Some data is part of Oracle Applications
•Front end applications backed by legacy MongoDB
•Big Data system is powered by Databricks on Azure
•Other departments use AWS solutions
“
“
9

Instead of morning coffee
“For an all hands meeting Bob asks me to find the best selling movies.
He also wants to know movies with Tom Cruz
And he wants to track customers who is willing to churn
And ... He has many many other questions about data our company has
As usual, the answers should be ready yesterday.”
Just another day...
The race is on!
10

8 Hours later
11

Hand my phone over to Bob....
Just ask?
Is this a fantasy?
Doesn't have to be J
Not a problem!
12

Modern Data Platform pillars
13
Secure object
store access
Data
Virtualization
OCI
Data
Catalog
Amazon
Glue
Data
Catalogs
Data Lake
File Formats
Data integration
sources
Data
Sharing
100+ Built-in
Data Source
Connectors
Direct connections
to non-Oracle
databases
Share with other
databases, data
analytics tools,
open-source
platforms
Access any data
lake file format

Data integration
sources
Modern Data Platform pillars
Secure object
store access
Data
Virtualization
Data Lake
File Formats
Data
Sharing
100+ Built-in
Data Source
Connectors
Direct connections
to non-Oracle
databases
Share with other
databases, data
analytics tools,
open-source
platforms
Access any data
lake file format
14
OCI
Data
Catalog
Amazon
Glue
Data
Catalogs

Simple, secure multi-cloud access to all types of data
Policy-driven multi-cloud connectivity
Query or load data from OCI, AWS, Azure and
GCP object stores
•Access control using native cloud access
policies (OCI Resource Principle, AWS
Resource Names, ...)
Support all common data types and table
formats
•Parquet, ORC, CSV, JSON, Avro and more
•Delta Share tables
•New: Apache Iceberg tables
15

Explicit and native authentication for all major cloud vendors
Explicit access authentication\*
Access/Secret key pair
Native authentication
Amazon Resource Names
(ARNs) uniquely identify AWS
resources
Explicit access authentication
Storage account ID/Password
Native authentication
An Azure Service Principal
isan identity created for use
with applications, hosted
services, and automated tools
to access Azure resources
Explicit access authentication
Google OAuth2.0 credential
Native authentication
A Google Service Account is a
special kind of GCP account
used by an application
Authentication with non-Oracle object stores
16
\\* Plus S3-compliant object store support

DEMO
17

Demo
Building a Modern Data Platform with Autonomous Database
OCI Cloud
18

19

Modern Data Platform pillars
Secure object
store access
Data
Virtualization
OCI
Data
Catalog
Amazon
Glue
Data
Catalogs
Data Lake
File Formats
Data integration
sources
Data
Sharing
100+ Built-in
Data Source
Connectors
Direct connections
to non-Oracle
databases
Share with other
databases, data
analytics tools,
open-source
platforms
Access any data
lake file format
20

Autonomous Data Warehouse provides transparent access to remote non-Oracle databases
select sum(sales\_amount) from redshift\_db.sales\_history;
Data Federation with non-Oracle databases
21

Sorry, it was hard to fit all the data sources in one slide....
Data Transforms Data sources
22
Autonomous
Data Warehouse
Autonomous
Transaction
Processing ATP
Exadata
Cloud
Any on-premises
Oracle DB 11.2.0.4+
Any GoldenGate
on-premises
OCI MySQL
DB Service
OCI Streaming
Autonomous
JSON DB
OCI Object Storage
ADW Stage-Merge
w/Obj Store
Any on-premises
Oracle DB 11.2.0.4+
OCI GoldenGate
Deployments
OCI Object Storage
Real-time Sources/Targets
Real-time Targets
Bulk Data Transforms Sources & Targets

New functionality: Autonomous Database source an Artificial Intelligence API
Supported AI Platforms:
•Oracle Autonomous Database now allows configuration with an array of AI services, including:
•Oracle Language OCI services for natural language processing.
•OpenAI for diverse cognitive tasks and machine learning capabilities.
•Cohere for advanced text understanding and generation.
Ask question in natural language
•Output is automatically formatted in a table format
•Datasets are ready to be loaded into a database
•It’s best effort approach, due possible hallucinations
New Feature: AI API Integration in Autonomous Database
23

DEMO
24

Demo
Building a Modern Data Platform with Autonomous Database
OCI Cloud
25
Natural
Language

26

Modern Data Platform pillars
Data
Virtualization
OCI
Data
Catalog
Amazon
Glue
Data
Catalogs
Data Lake
File Formats
Data integration
sources
Data
Sharing
100+ Built-in
Data Source
Connectors
Direct connections
to non-Oracle
databases
Share with other
databases, data
analytics tools,
open-source
platforms
Access any data
lake file format
27
Secure object
store access

Autonomous Database both a Data Catalog source and consumer
Data Catalog is the source of truth for
Object Store metadata
•Harvest object storage to derive schemas
•Manage business glossary, terms and tags
•Discover data using powerful search
Use Autonomous Database to discover
and analyze data sets
•Managed schemas and tables defined
automatically
•No management required
•Use Oracle SQL to query both metadata and
object storage data
Synchronize with OCI Data Catalog
Data Catalog
Object
Storage
Autonomous
Database(s)
Harvest
1
Sync
2
Query
3
28

Multi-cloud metadata analysis
AWS Glue is central metadata service
•Capture all information about data in S3
•Has lineage and impact analysis capabilities
•Automatically discovery data in S3 buckets
Use Autonomous Database to access any
data in Glue objects
•Glue stores schema for a files in S3
•User can query data in S3, using Oracle SQL
•AWS data can be combined in one query with
Oracle Datasets
Synchronize with AWS Glue
Autonomous
Database(s)
Crawl
1
Sync
2
Query
3
29

DEMO
30

Demo
Building a Modern Data Platform with Autonomous Database
OCI Cloud
31
Natural
Language

AWS Glue Integration
32

Modern Data Platform pillars
Secure object
store access
Data
Virtualization
Data Lake
File Formats
Data integration
sources
Data
Sharing
100+ Built-in
Data Source
Connectors
Direct connections
to non-Oracle
databases
Share with other
databases, data
analytics tools,
open-source
platforms
Access any data
lake file format
33
OCI
Data
Catalog
Amazon
Glue
Data
Catalogs

Support all conventional file formats
•Oracle ADB handles multiple binary and non-binary file formats
•Non-binary formats such as CSV, JSON, and XML are more universally
readable and easier to edit.
•JSON and XML support hierarchical data structures, but they can be more
verbose and less efficient in terms of storage and parsing compared to binary
formats.
•Binary formats like Parquet, Avro, and ORC provide efficient data
compression and are optimized for performance in big data ecosystems.
34

Apache Iceberg: An open-source, efficient table format for data lakes.
Overcomes File Format Limitations:
•Iceberg assures data consistency, ensuring isolated reads and writes.
•Limited support for ACID (insert/update/delete) operations
•Compatibility across multiple engines. Single view of metadata
•With Hive Metastore not originally designed to be Cloud-native, it faced scalability issues
when dealing with petabyte-scale data. Iceberg seeks to remedy this
ADB Integration:
•Enables Iceberg tables as external tables
•Extends supported data sources with Iceberg table format.
Benefits for ADB Users:
•Unified data view across multiple platforms.
•Facilitates cross-platform data accessibility and efficient large-scale data handling.
Iceberg table as Oracle External Table
35

DEMO
36

Demo
Building a Modern Data Platform with Autonomous Database
OCI Cloud
37
Natural
Language

38

What is Delta Share?
•Protocol to share data across multiple platforms
•Allows sharing of static and dynamic data
Problem aimed to solve
•Tre a t d a t a a s a c o m m o d i t y ( p ro d u c e d a t a a n d s h a re w i t h w i d e ra n g e o f c l i e n t )
•Unified format for multiple processing engines (oracle, python, tableau, spark)
•No need for data copying between cloud providers in case of multi cloud deployment
Advanced features
•Support a wide range of clients (Python, Spark, PowerBI...)
•Strong security, auditing and governance
•Scale to massive datasets
Delta Share table as Oracle External table
39

DEMO
40

Demo
Building a Modern Data Platform with Autonomous Database
OCI Cloud
41
Natural
Language

42

Modern Data Platform pillars
Secure object
store access
Data
Virtualization
Data Lake
File Formats
Data integration
sources
Data
Sharing
100+ Built-in
Data Source
Connectors
Direct connections
to non-Oracle
databases
Share with other
databases, data
analytics tools,
open-source
platforms
Access any data
lake file format
47
OCI
Data
Catalog
Amazon
Glue
Data
Catalogs

Data Sharing in Autonomous Data Warehouse
Share with anyone in any cloud
•Implemented via open-source Delta Sharing API
•Share data with any supported recipient: other
databases, data analytics tools, open-source platforms
Optimized sharing within Oracle Cloud
•Implemented via Cloud Links and OCI infrastructure
and metadata
•Automatic recipient notification and share discovery
Open and secure data sharing for Oracle and non-Oracle recipients
•Share across companies and across regions / data centers
•Secure and governed data sharing: grant, revoke, audit, track
48

Data Sharing with Autonomous
Share Oracle Data with
non-Oracle Clients
Real-time data exchange
across Oracle instances
Collaborative Multi-Cloud
and Multi-Workload
Environments
Delta Sharing
Oracle
Cloud Links
49
Delta Sharing

Customer success
Sharing data with non-Oracle clients
Scenario:
•Autonomous Datawarehouse is used by the whole
company.
•Other parts of the company also want to use this data, but
who should pay for it is the problem.
•Many customers choose to use PowerBI.
•Exposing data with Delta Sharing fixes the issue of who
pays and lets everyone see the latest data
Quote
“Delta Share has become a solid alternative for us to share
data from OCI ADBs to external systems and applications.
Oracle has made it easy to set up and share data using a
minimum amount of compute, but most importantly we are
impressed by the effective and efficient data refresh
functionality built into the product.” Saenz, Alejandro,
Manager Business Systems Architecture
Delta Sharing

Delta Sharing advantages
Difference between Delta Share vs Direct Database Connection
DELTA SHARING
Enhanced Governance:
•Select specific tables and views from multiple schemas to share, rather than the entire schema. This
provides better control over the data shared.
Workload segregation:
•Data Consumer doesn’t impact provider workload
Cost Responsibility:
•Data Consumers handle the processing costs, allowing Data Providers to share datasets without the
additional expense of computing resources.
Flexible Network Access:
•Securely share data from a private VCN over the public internet as needed, offering cross-network
access while maintaining control.
52

DEMO
53

Demo
Building a Modern Data Platform with Autonomous Database
OCI Cloud
54
Natural
Language

Copyright © 2023, Oracle and/or its affiliates

Read Delta Share with PowerBI
Copyright © 2023, Oracle and/or its affiliates

Now Data Platform has access to the data across multiple clouds, multiple
platforms, stored in a different format, but...
Bob doesn’t know SQL, Python or R ...
57
Ask questions in natural language
Expand your userbase

Autonomous Database Select AI
Simplest way to get answers about your business
Use your language to query data
No need to understand where and how your data is stored to gain insights
58

We infer a lot from human language
Historically, answering these types of questions has not been easy
59
what are our total streams for each tom hanks movie this month?
total number of
movie views
breakout views
by movie
tom hanks is
an actor
understanding
of time
LLMs are remarkable at inferring intent (and getting better)
They are not perfect! It is very important to verify results

Putting it all together
60
SELECT
 m.title AS movie\_title,
 COUNT(s.views) AS total\_streams
FROM movie m
 JOIN sales\_sample s ON m.movie\_id = s.movie\_id
 JOIN actors a ON m.movie\_id = a.movie\_id
WHERE a.actor = 'Tom Hanks'
 AND EXTRACT(MONTH FROM s.day\_id) =
 EXTRACT(MONTH FROM SYSDATE)
GROUP BY m.title
what are our total streams for each tom hanks movie this month?

Easy to extend and build new natural language apps
61
Use a standard SELECT statement
followed by AI and your question
Process the result as you would any
other SQL result set

Hand my phone over to Bob....
Just ask?
Is this a fantasy?
Doesn't have to be J
Not a problem!
62

Copyright © 2023, Oracle and/or its affiliates \| Confidential under NDA
Oracle Modern Data Platform “Pyramid”
Strategy
64
Oracle + third-party solutions
•Offers customer choice via partners
Broad, Flexible
Ecosystem
Oracle Cloud
•Tight integration in a single cloud platform
•Easier to meet governance and compliance requirements
Integrated and
Secure
Autonomous Database
•Best user experience for core data management tasks
•Comprehensive, unified service
•Complete ecosystem for OCI and other clouds
Self-Service
Experience

Build and Expand Your Modern Data Platform
65
Autonomous
Database Get
Started
Explore video and blog
resources to get started
with Autonomous
database
Oracle LiveLab
Free hands-on lab
on Oracle Cloud
Build a Data Lake with
Autonomous DW
Oracle LiveLab
Free hands-on lab
on Oracle Cloud
Implement Data
Sharing with ADB
http://tinyurl.com/xs7umzvx
http://tinyurl.com/yymh8kz9
Read our Blogs
News and best practices for
autonomous database from
product team
Datawarehosue
Insider
https://tinyurl.com/fevd4e58
https://tinyurl.com/3ntfvref

Thank you
66

Copyright © 2024, Oracle and/or its affiliates67
Quick Polls

Copyright © 2024, Oracle and/or its affiliates68
Open Q&A

Copyright © 2024, Oracle and/or its affiliates69
bit.ly/adb-linkedin-grp
@AutonomousDW

Important links for you to bookmark
3
Got a question?
We are on stackoverflow
bit.ly/adb-stackoverflow
Join us on Developers Slack
(search for #oracle-autonomous-database)
bit.ly/oradevs\_ext\_slack
Links to get you started and to make sure you keep up to date
with everything related to Autonomous Database
1
2 Join us on:
Our new Get Started
Page is the right place
to start: bit.ly/adb-get-started
Copyright © 2024, Oracle and/or its affiliates69

Copyright © 2024, Oracle and/or its affiliates70
Final Thoughts
https://bit.ly/adb-learning-lounge
Links
Upcoming
Recordings

Copyright © 2024, Oracle and/or its affiliates71Copyright © 2024, Oracle and/or its affiliates71
71Copyright © 2024, Oracle and/or its affiliates
Thank you for joining today's call !!!
Upcoming Sessions:
•Keep an eye in AskTOM (and LinkedIn, X) for upcoming sessions
 https://bit.ly/adb-learning-lounge
AUTONOMOUS
DATABASE
LEARNING
LOUNGE
_menu_

[CODERLEGION](https://coderlegion.com/)

- [GitHub Login](https://coderlegion.com/login?login=github&to=6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices "GitHub")
- [Twitter Login](https://coderlegion.com/login?login=twitter&to=6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices "Twitter")
- [Login](https://coderlegion.com/login?to=6935%2Fmigrating-to-oracle-autonomous-database-methods-tools-and-best-practices)
- [Sign Up](https://coderlegion.com/register?to=6935%2Fmigrating-to-oracle-autonomous-database-methods-tools-and-best-practices)

_search_

Log In

_account\_circle_

## Welcome to Coder Legion

#### Connect with 3,254 amazing developers

Email or Username

Password [Forgot your password?](https://coderlegion.com/forgot)

Remember


Log In

#### Don't have an account? [Sign up](https://coderlegion.com/register?u=home)

#### OR

[Continue with GitHub](https://coderlegion.com/login?login=github&to=6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices) [Continue with X](https://coderlegion.com/login?login=twitter&to=6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices)

3

2

0

2

share

- content\_copy
- [Share on Facebook](https://www.facebook.com/sharer/sharer.php?u=https://coderlegion.com/6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices)
- [Share on X](https://x.com/intent/tweet?url=https://coderlegion.com/6935&text=Migrating+to+Oracle+Autonomous+Database%3A+Methods%2C+Tools%2C+and+Best+Practices%0D%0A%7B%20by%20%40Derrick%20Ryan%20%7D%20from%20%40CoderLegion1%0D%0A%0A%23oracle-autonomous-database%20%23database-migration%20%23oracle-data-pump%20%23zero-downtime-migration)
- [Share on Reddit](https://www.reddit.com/submit?url=https://coderlegion.com/6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices&title=Migrating+to+Oracle+Autonomous+Database%3A+Methods%2C+Tools%2C+and+Best+Practices)
- [Share on LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https://coderlegion.com/6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices)
- [Share on Pinterest](https://pinterest.com/pin/create/link/?url=https://coderlegion.com/6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices)
- [Share on HackerNews](https://news.ycombinator.com/submitlink?u=https://coderlegion.com/6935/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices&t=Migrating+to+Oracle+Autonomous+Database%3A+Methods%2C+Tools%2C+and+Best+Practices)

![Migrating to Oracle Autonomous Database: Methods, Tools, and Best Practices](https://coderlegion.com/?qa=blob&qa_blobid=3723773798552619270)

# Migrating to Oracle Autonomous Database: Methods, Tools, and Best Practices

- [oracle-autonomous-database](https://coderlegion.com/tag/oracle-autonomous-database)
- [database-migration](https://coderlegion.com/tag/database-migration)
- [oracle-data-pump](https://coderlegion.com/tag/oracle-data-pump)
- [zero-downtime-migration](https://coderlegion.com/tag/zero-downtime-migration)

[![](https://coderlegion.com/?qa=image&qa_blobid=14751088770497289004&qa_size=150)](https://coderlegion.com/user/Derrick+Ryan)

[Derrick Ryan](https://coderlegion.com/user/Derrick+Ryan)Leader posted Oct 28, 2025Originally published at [medium.com](https://medium.com/@derrickryangiggs/migrating-to-oracle-autonomous-database-methods-tools-and-best-practices-c34f4c074a2d)10 min read

Migrating to Oracle Autonomous Database requires careful planning, appropriate tool selection, and adherence to best practices. Oracle provides multiple migration methods and tools designed for different scenarios, from simple data loads to complex zero-downtime migrations. Understanding these options ensures successful database migrations with minimal disruption to business operations.

### **Migration Methods Overview**

#### **Application-Based Data Loading**

**SQL Developer Integration:**

Data can be loaded into Autonomous Database through applications such as SQL Developer, providing a graphical interface for small to medium datasets.

**SQL Developer Features:**

- Import wizard for CSV, Excel, and other formats
- Table data import from other databases
- Query-based data insertion
- Ideal for development and testing scenarios

**Limitations:**

- Not recommended for large production databases
- Manual process requiring user intervention
- Limited parallelism and performance optimization
- Better suited for initial testing than full migrations

#### **Object Store Staging (Recommended Approach)**

**Cloud Object Storage Integration:**

The more efficient and preferred method to load data into Autonomous Database is to stage data into cloud object stores before importing.

**Supported Object Stores:**

- **OCI Object Storage:** Native Oracle Cloud storage
- **AWS S3:** Amazon Web Services buckets
- **Azure Blob Storage:** Microsoft Azure storage
- **Google Cloud Storage:** Google Cloud Platform storage

**Object Storage Benefits:**

- Decouples data movement from database import
- Enables parallel processing for faster loads
- Provides durable intermediate storage
- Reduces network constraints on database
- Supports multi-cloud migration scenarios

### **Data Pump Migration**

#### **When to Use Data Pump**

**Version Requirements:**

Data Pump must be used to move database data into new Autonomous Database for versions above 10.1 (Release 10g or higher).

Oracle Data Pump is useful for migrating data among schemas, databases of different versions and on different operating systems, and from on-premises to on-premises and to Oracle Cloud

**Data Pump is Ideal For:**

- Offline migrations with acceptable downtime
- Database versions 10g and higher
- Schema-level or full database migrations
- Migrations requiring data transformation
- Cross-platform migrations with character set conversion

#### **Data Pump Migration Process**

**Three-Step Process:**

1. **Export:** Use Data Pump Export (expdp) to create dump files
2. **Transfer:** Copy dump files to object storage
3. **Import:** Use Data Pump Import (impdp) to load into Autonomous Database

**Alternative Network Mode:**

You can combine these steps into a Network mode import using Database links and avoid the dumpfiles

#### **Data Pump Best Practices**

**Critical Configuration Guidelines:**

**1\. Don't Use SYS as SYSDBA:**

Never use the SYS user with SYSDBA privileges for Data Pump operations. Always use ADMIN user in Autonomous Database.

**2\. Always Use a Parameter File:**

Create a parameter file (parfile) to manage Data Pump parameters systematically and enable repeatable migrations.

**Example Parameter File (export.par):**

```ini
SCHEMAS=HR,SALES,FINANCE
DUMPFILE=export%U.dmp
DIRECTORY=data_pump_dir
PARALLEL=4
EXCLUDE=CLUSTER,DB_LINK
COMPRESSION=ALL
LOGFILE=export.log
```

**3\. Dumpfile Parameter:**

The dumpfile parameter applies to both export and import operations, specifying dump file names and locations.

**4\. Filesize Parameter:**

The filesize parameter applies to export only, controlling maximum size of each dump file in the export set.

**5\. Always Use Schema Mode:**

Oracle recommends using the schema mode for migrating to Autonomous AI Database. You can list the schemas you want to export by using the schemas parameter

**Why Schema Mode:**

- Granular control over what gets migrated
- Easier to manage than full database exports
- Reduces export/import time
- Simplifies troubleshooting
- Aligns with ADB's multi-schema architecture

**6\. Always Exclude Statistics:**

Exclude database statistics during export as Autonomous Database automatically gathers optimized statistics post-import.

```ini
EXCLUDE=STATISTICS
```

**7\. Always Use Parallel:**

Set the parallel parameter to at least the number of CPUs you have in your Autonomous AI Database for faster migration

**Parallelism Guidelines:**

- Minimum: Number of OCPUs in Autonomous Database
- For HIGH service: Match OCPU count
- Multiple dump files enable parallel import
- Balance parallelism with available resources

**8\. Always Remove Column Encryption:**

Remove column-level encryption before migration as Autonomous Database handles encryption automatically through Transparent Data Encryption (TDE).

**9\. Consider Using Compression:**

Use Data Pump compression to reduce dump file sizes, transfer times, and storage costs.

**Compression Options:**

```ini
COMPRESSION=ALL          # Compress all data
COMPRESSION=METADATA_ONLY # Compress metadata only
COMPRESSION=DATA_ONLY    # Compress data only
```

**10\. Remove Segment Customization:**

Use transform parameter to remove segment attributes that may not apply in Autonomous Database.

```ini
TRANSFORM=SEGMENT_ATTRIBUTES:N
```

**This removes:**

- TABLESPACE specifications
- STORAGE clauses
- LOGGING attributes
- Physical storage attributes

#### **Additional Data Pump Recommendations**

**Exclude Unsupported Objects:**

```ini
EXCLUDE=CLUSTER,DB_LINK,INDEXTYPE,MATERIALIZED_VIEW_LOG
```

**Remap Tablespaces:**

```ini
REMAP_TABLESPACE=USERS:DATA
```

**Partition Merge (Optional):**

```ini
PARTITION_OPTIONS=MERGE
```

**Transform LOB Storage:**

```ini
TRANSFORM=LOB_STORAGE:SECUREFILE
```

**Use Latest Data Pump Version:**

Oracle recommends using the latest Oracle Data Pump version for importing data from Data Pump files into your Autonomous AI Database as it contains enhancements and fixes

#### **Sample Data Pump Commands**

**Export Command:**

```bash
expdp admin/password@sourcedb \
  SCHEMAS=HR,SALES \
  DUMPFILE=export%U.dmp \
  DIRECTORY=data_pump_dir \
  PARALLEL=4 \
  EXCLUDE=CLUSTER,DB_LINK,STATISTICS \
  COMPRESSION=ALL \
  TRANSFORM=SEGMENT_ATTRIBUTES:N \
  LOGFILE=export.log
```

**Import from Object Storage:**

```bash
impdp admin/password@adb_high \
  CREDENTIAL=obj_store_cred \
  DUMPFILE=https://objectstorage.region.oraclecloud.com/n/namespace/b/bucket/o/export%U.dmp \
  PARALLEL=4 \
  TRANSFORM=SEGMENT_ATTRIBUTES:N \
  REMAP_TABLESPACE=USERS:DATA \
  EXCLUDE=INDEX,CLUSTER \
  LOGFILE=import.log
```

### **Online Migration with Oracle GoldenGate**

#### **Zero-Downtime Migrations**

**GoldenGate for Continuous Sync:**

For online migrations, Oracle GoldenGate can be used to keep old and new databases in sync, enabling near-zero downtime transitions.

**GoldenGate Benefits:**

- Continuous data replication
- Minimal downtime (minutes vs. hours)
- Bi-directional replication capabilities
- Heterogeneous source support
- Transaction-level consistency

**GoldenGate Requirements:**

- Oracle GoldenGate 12.3.0.1.2 or later for source
- Source database version 11.2.0.4 or later
- Network connectivity between source and target
- Non-integrated Replicats for Autonomous Database

**GoldenGate Migration Process:**

1. Configure initial data load (Data Pump or direct load)
2. Set up GoldenGate Extract on source database
3. Configure GoldenGate Replicat on target Autonomous Database
4. Start replication and verify synchronization
5. Perform validation and cutover
6. Redirect applications to Autonomous Database

### **Migration Tools and Services**

#### **OCI Database Migration Service**

**Fully Managed Migration:**

Database Migration Service is a fully managed cloud service that leverages Oracle's Zero Downtime Migration (ZDM) engine utilizing Oracle GoldenGate replication to provide enterprise-level database migration with minimal downtime

**Database Migration Service provides:**

- **Logical Migration:** Schema and data migration using Data Pump
- **Offline Migration:** Export to object store, then import to ADB
- **Online Migration:** GoldenGate-based continuous replication
- **Minimal Downtime:** Business continuity during migration
- **Validation:** Pre-migration environment checks

**Migration Modes:**

**Online Migration:**

Online migration uses Oracle GoldenGate replication for continuous synchronization from the source database to the target database

**Offline Migration:**

Using the offline migration method, Database Migration exports the data from the source database to the Object Store, and then imports the data to the target database using Data Pump

#### **Zero Downtime Migration (ZDM)**

**Enterprise Migration Engine:**

ZDM provides automated migration workflows combining Data Pump and GoldenGate for near-zero downtime migrations.

**ZDM Capabilities:**

- Automated pre-migration validation
- Intelligent migration orchestration
- Rollback capabilities
- Progress monitoring and reporting
- Integration with OCI services

#### **Oracle GoldenGate**

**Real-Time Replication:**

Oracle GoldenGate enables real-time data integration and replication across heterogeneous systems.

**Use Cases:**

- Zero-downtime migrations
- Continuous data replication
- Disaster recovery configurations
- Data distribution across geographic regions

#### **Cloud Premigration Advisor Tool (CPAT)**

**Pre-Migration Assessment:**

Cloud Premigration Advisor Tool (CPAT) analyzes source databases for compatibility with Autonomous Database before migration.

**CPAT Capabilities:**

- Identifies incompatible objects and features
- Reports on unsupported database options
- Recommends remediation steps
- Generates comprehensive assessment reports
- Validates migration readiness

#### **OCI Application Migration**

**Application and Database Migration:**

Comprehensive service for migrating applications along with their databases to Oracle Cloud.

**Features:**

- Integrated application and database migration
- Dependency mapping and analysis
- Automated infrastructure provisioning
- Application compatibility validation

#### **Move to Autonomous Database (MV2ADB)**

**Automated Migration Tool:**

MV2ADB leverages Oracle Data Pump, REST API and Oracle Cloud Infrastructure command-line interface (oci-cli) to export data from your on-premises database to your Oracle Autonomous Database in the cloud

**MV2ADB Commands:**

- **auto:** Automates complete migration process (export, upload, import)
- **advisor:** Analyzes source schemas for migration suitability
- **report:** Compares export and import results

### **Migration Planning Considerations**

#### **Key Decision Factors**

**1\. Dataset Size:**

How large is the dataset to be imported?

- **Small (<100GB):** Direct application loads or SQL Developer
- **Medium (100GB-1TB):** Data Pump with parallelism
- **Large (>1TB):** Data Pump with object store staging, consider Data Lake Accelerator
- **Very Large (>10TB):** Full transportable Data Pump, multiple parallel operations

**2\. Import File Format:**

What is the import file format?

- **Structured Data:** Data Pump dump files, CSV, delimited text
- **Semi-Structured:** JSON, XML
- **Binary Formats:** Parquet, ORC, Avro
- **Database Backups:** RMAN backups (requires conversion)

**3\. Non-Oracle Source Support:**

Does the method support non-Oracle database sources?

- **Oracle to Oracle:** Data Pump, GoldenGate
- **Non-Oracle to Oracle:** OCI Database Migration (supports MySQL, PostgreSQL)
- **Third-Party Tools:** SQL Developer Migration Workbench, Oracle SQL\*Loader
- **Custom ETL:** DBMS\_CLOUD for file-based loads

**4\. Object Storage Support:**

Does the method support using Oracle and third-party object storage?

- **OCI Object Storage:** Full native support
- **AWS S3:** Supported via DBMS\_CLOUD
- **Azure Blob Storage:** Supported via DBMS\_CLOUD
- **Google Cloud Storage:** Supported via DBMS\_CLOUD
- **On-Premises Storage:** NFS mounts, database directories

#### **Downtime Tolerance**

**Planned Downtime (Offline Migration):**

- Data Pump export/import
- Full transportable export
- DBMS\_CLOUD data loading
- SQL\*Loader

**Minimal Downtime (Online Migration):**

- OCI Database Migration Service (online mode)
- Oracle GoldenGate replication
- Zero Downtime Migration (ZDM)
- Materialized view replication with refresh

#### **Network Considerations**

**Direct Database Link:**

- Fast for small databases
- Network bandwidth dependent
- Single point of failure
- No intermediate storage required

**Object Store Staging:**

- Decouples network from database operations
- Enables parallel transfers
- Provides checkpoint/restart capability
- Recommended for production migrations

### **Migration Workflow**

#### **Phase 1: Assessment and Planning**

**1\. Run CPAT Analysis:**

```sql
-- Download and run Cloud Premigration Advisor Tool
@cpat.sql
```

**2\. Inventory Source Database:**

- Identify schemas and objects to migrate
- Document database size and growth rate
- Catalog dependencies and integrations
- Review custom code and packages

**3\. Determine Migration Strategy:**

- Online vs. offline migration
- Direct load vs. object store staging
- Single operation vs. phased approach
- Pilot migration for validation

#### **Phase 2: Preparation**

**1\. Provision Autonomous Database:**

- Select appropriate OCPU and storage
- Configure network access (public, private endpoint, ACLs)
- Enable required features and options

**2\. Create Cloud Resources:**

```sql
-- Create object storage credential
BEGIN
    DBMS_CLOUD.CREATE_CREDENTIAL(
        credential_name => 'OBJ_STORE_CRED',
        username => 'oracleidentitycloudservice/*Emails are not allowed*',
        password => '<auth_token>'
    );
END;
/
```

**3\. Prepare Source Database:**

- Collect current statistics
- Disable foreign key constraints (if needed)
- Set tablespaces to read-only (for transportable)
- Create Data Pump directory

#### **Phase 3: Migration Execution**

**1\. Export Source Data:**

```bash
expdp admin/password \
  PARFILE=export.par
```

**2\. Transfer to Object Storage:**

```bash
# Using OCI CLI
oci os object put \
  --bucket-name migration-bucket \
  --file export01.dmp
```

**3\. Import to Autonomous Database:**

```bash
impdp admin/password@adb_high \
  PARFILE=import.par
```

#### **Phase 4: Validation**

**1\. Object Count Verification:**

```sql
-- Compare object counts
SELECT object_type, COUNT(*)
FROM dba_objects
WHERE owner = 'HR'
GROUP BY object_type
ORDER BY object_type;
```

**2\. Data Validation:**

```sql
-- Compare row counts
SELECT table_name, num_rows
FROM dba_tables
WHERE owner = 'HR'
ORDER BY table_name;
```

**3\. Application Testing:**

- Validate connectivity from applications
- Execute representative test cases
- Verify performance characteristics
- Test backup and recovery procedures

#### **Phase 5: Cutover**

**1\. Final Synchronization:**

For online migrations, ensure final data sync is complete

**2\. Application Redirection:**

Update connection strings to point to Autonomous Database

**3\. Monitoring:**

Monitor application behavior and database performance post-cutover

**4\. Decommission:**

Archive or decommission source database after validation period

### **Best Practices Summary**

#### **Planning Best Practices**

- Run CPAT before migration to identify compatibility issues
- Test migration process in non-production environment first
- Document migration procedures and rollback plans
- Establish success criteria and validation procedures
- Plan for adequate network bandwidth and time windows

#### **Execution Best Practices**

- Use latest Data Pump version for best compatibility
- Always use schema mode for Autonomous Database
- Enable parallelism matching Autonomous Database OCPUs
- Stage data in object storage for production migrations
- Use HIGH database service for import operations
- Monitor progress and resource consumption

#### **Performance Best Practices**

- Compress dump files to reduce transfer time
- Use partition\_options=merge for partitioned tables
- Exclude and rebuild indexes post-import for speed
- Disable constraints during import, re-enable after
- Use Data Lake Accelerator for very large datasets
- Consider full transportable for largest databases

#### **Security Best Practices**

- Use dedicated credentials for migration operations
- Rotate credentials after migration completion
- Secure dump files with encryption when required
- Implement principle of least privilege for migration accounts
- Audit migration activities comprehensively
- Clean up intermediate storage after migration

### **Conclusion**

Migrating to Oracle Autonomous Database requires understanding available methods, tools, and best practices. Data Pump provides reliable offline migration for databases 10g and higher, while Oracle GoldenGate enables near-zero downtime online migrations for mission-critical systems.

**Key Migration Approaches:**

**Offline Migrations:**

- Data Pump export/import via object storage (recommended)
- Database links for network mode import
- DBMS\_CLOUD for file-based data loading
- SQL\*Loader for formatted data files

**Online Migrations:**

- OCI Database Migration Service (fully managed)
- Zero Downtime Migration (ZDM) engine
- Oracle GoldenGate replication
- Materialized views with refresh

**Critical Success Factors:**

- Thorough pre-migration assessment with CPAT
- Appropriate tool selection based on requirements
- Adherence to Data Pump best practices
- Comprehensive testing and validation
- Detailed cutover planning and execution

Whether performing simple schema migrations or complex enterprise database transitions, Oracle provides the tools, services, and methodologies necessary for successful Autonomous Database migrations with minimal business disruption and maximum confidence.

comment

## 1 Comment

[![](https://coderlegion.com/?qa=image&qa_blobid=11330319938207524922&qa_size=50)](https://coderlegion.com/user/Andrew+Mewborn)

[Andrew Mewborn](https://coderlegion.com/user/Andrew+Mewborn)
• Oct 28, 2025

The note about not using SYS for Data Pump jumped out it is the kind of rule people only respect after getting burned once nice catch Derrick Ryan why do you think this guideline still gets ignored so often in real teams?

2 votes

reply

[![](https://coderlegion.com/?qa=image&qa_blobid=14751088770497289004&qa_size=60)](https://coderlegion.com/user/Derrick+Ryan)

[Derrick Ryan](https://coderlegion.com/user/Derrick+Ryan)
• Oct 30, 2025

[@Andrew Mewborn](https://coderlegion.com/user/Andrew+Mewborn) Thanks . I think it's because SYS works fine in traditional Oracle databases, so teams on autopilot just carry over old habits without realizing Autonomous Database's security model restricts SYS differently plus, when you're under migration pressure, it's easy to skip the "boring" setup details until they bite you during cutover.

1

reply

## Please [log in](https://coderlegion.com/login?to=6935%2Fmigrating-to-oracle-autonomous-database-methods-tools-and-best-practices) to add a comment.

## Please [log in](https://coderlegion.com/login?to=6935%2Fmigrating-to-oracle-autonomous-database-methods-tools-and-best-practices) to comment on this post.

## More Posts

|     |     |
| --- | --- |
| [![](https://coderlegion.com/?qa=image&qa_blobid=1021361528369954356&qa_size=60)](https://coderlegion.com/user/Codeac.io) | ### [3.5 best practices on how to prevent debugging](https://coderlegion.com/8157/3-5-best-practices-on-how-to-prevent-debugging)<br>[Codeac.io](https://coderlegion.com/user/Codeac.io) \- Dec 18, 2025 |
| [![](https://coderlegion.com/?qa=image&qa_blobid=14751088770497289004&qa_size=60)](https://coderlegion.com/user/Derrick+Ryan) | ### [Oracle Database Upgrades and Migrations: Essential Best Practices Guide](https://coderlegion.com/5367/oracle-database-upgrades-and-migrations-essential-best-practices-guide)<br>[Derrick Ryan](https://coderlegion.com/user/Derrick+Ryan) \- Sep 16, 2025 |
| [![](https://coderlegion.com/?qa=image&qa_blobid=14751088770497289004&qa_size=60)](https://coderlegion.com/user/Derrick+Ryan) | ### [Oracle Autonomous Database: Data Lake Analytics and Modern Data Sharing](https://coderlegion.com/6848/oracle-autonomous-database-data-lake-analytics-and-modern-data-sharing)<br>[Derrick Ryan](https://coderlegion.com/user/Derrick+Ryan) \- Oct 26, 2025 |
| [![](https://coderlegion.com/?qa=image&qa_blobid=14751088770497289004&qa_size=60)](https://coderlegion.com/user/Derrick+Ryan) | ### [Oracle Autonomous Database Connectivity: Secure Connections with TLS and mTLS](https://coderlegion.com/6635/oracle-autonomous-database-connectivity-secure-connections-with-tls-and-mtls)<br>[Derrick Ryan](https://coderlegion.com/user/Derrick+Ryan) \- Oct 18, 2025 |
| [![](https://coderlegion.com/?qa=image&qa_blobid=14751088770497289004&qa_size=60)](https://coderlegion.com/user/Derrick+Ryan) | ### [Oracle Autonomous Database: Automatic Indexing and Data Safe Security](https://coderlegion.com/6358/oracle-autonomous-database-automatic-indexing-and-data-safe-security)<br>[Derrick Ryan](https://coderlegion.com/user/Derrick+Ryan) \- Oct 13, 2025 |

- [Feedback / Bug](https://coderlegion.com/feedback)
- [Privacy](https://coderlegion.com/privacy)
- [About Us](https://coderlegion.com/about-us)
- [Contacts](https://coderlegion.com/contact)
- [Support Us](https://coderlegion.com/support-us)
- [Points & Leaderboard](https://coderlegion.com/advanced-point-system)
- [Facebook](https://www.facebook.com/C0derLegi0n)
- [Twitter](https://twitter.com/CoderLegion1)
- [Instagram](https://www.instagram.com/c0derlegi0n)
- [Bluesky](https://bsky.app/profile/coderlegion.bsky.social)
- [Mastodon](https://mastodon.social/@coderlegion)

chevron\_left

## More From [Derrick Ryan](https://coderlegion.com/user/Derrick+Ryan)

### [Oracle AI Vector Search in Oracle Database 23ai](https://coderlegion.com/10510/oracle-ai-vector-search-in-oracle-database-23ai)

### [OCI Generative AI Agents: Building Enterprise RAG Applications Without Code](https://coderlegion.com/10334/oci-generative-ai-agents-building-enterprise-rag-applications-without-code)

### [RAG Pipeline Deep Dive: Ingestion, Chunking, Embedding, and Vector Search](https://coderlegion.com/10137/rag-pipeline-deep-dive-ingestion-chunking-embedding-and-vector-search)

## Related Jobs

- [Software Engineer (JavaScript, Jest, Cypress, M365 Tools)- Fully Cleared](https://coderlegion.com/jobs/9102) **Intelliforce-it Solutions Group** · Full time · Laurel, MD
- [Oracle Apex full stack developer](https://coderlegion.com/jobs/8958) **Execrecruitment** · Full time · Remote
- [Full Stack Software Engineer (L5) - Internal Tools](https://coderlegion.com/jobs/8820) **Netflix** · Full time · Los Gatos, CA

[View all jobs →](https://coderlegion.com/jobs)

Go Top
Loading \[MathJax\]/extensions/MathMenu.js

Oracle Autonomous Database in Enterprise Architecture: Utilize Oracle Cloud Infrastructure Autonomous Databases for better consolidation, automation, and security \| Packt Publishing books \| IEEE Xplore

[close message button](https://ieeexplore.ieee.org/document/)

Skip to Main Content

![book cover image](https://ieeexplore.ieee.org/ebooks/10162661/10162661.jpg)

# Oracle Autonomous Database in Enterprise Architecture: Utilize Oracle Cloud Infrastructure Autonomous Databases for better consolidation, automation, and security

Publisher: Packt Publishing

Cite This

PDF

Bal Mukund Sharma; Krishnakumar KM; Rashmi Panda

All Authors

Sign In or Purchase

9

Downloads

- Alerts



[Manage Content Alerts](https://ieeexplore.ieee.org/alerts/citation)



Add to Citation Alerts


* * *

- Download PDF
- Download References
- Request Permissions
- Save to
- Alerts

## Book Abstract:

Get up to speed with Oracle’s Autonomous Databases and implementation strategies for any workload or use case, including transactional, data warehousing, and non-relation...Show More

## Metadata

## Book Abstract:

Get up to speed with Oracle’s Autonomous Databases and implementation strategies for any workload or use case, including transactional, data warehousing, and non-relational databasesKey FeaturesExplore ADB, its business benefits, and architectural considerationsMigrate the existing workload to ADB, explore high availability, and use cloud native methods for monitoring and event notificationsLeverage APEX, JSON, the REST API, and SQL Developer Web features for rapid developmentBook DescriptionOracle Autonomous Database (ADB) is built on the world’s fastest Oracle Database Platform, Exadata, and is delivered on Oracle Cloud Infrastructure (OCI), customer data center (ExaCC), and Oracle Dedicated Region Cloud. This book is a fast-paced, hands-on introduction to the most important aspects of OCI Autonomous Databases. You'll get to grips with concepts needed for designing disaster recovery using standby database deployment for Autonomous Databases. As you progress, you'll understand how you can take advantage of automatic backup and restore. The concluding chapters will cover topics such as the security aspects of databases to help you learn about managing Autonomous Databases, along with exploring the features of Autonomous Database security such as Data Safe and customer-managed keys for Vaults. By the end of this Oracle book, you’ll be able to build and deploy an Autonomous Database in OCI, migrate databases to ADB, comfortably set up additional high-availability features such as Autonomous Data Guard, and understand end-to-end operations with ADBs.What you will learnExplore migration methods available for Autonomous Databases, using both online and offline methodsCreate standby databases, RTO and RPO objectives, and Autonomous Data Guard operationsBecome well-versed with automatic and manual backups available in ADBImplement best practices relating to network, security, and IAM policiesManage database performance and log management in ADBUnderstand how to perform dat...

Show More

**Copyright Year:** 2022

**Electronic ISBN:** 9781801073943

Publisher: Packt Publishing

* * *

## Authors

## Keywords

## Metrics

[![Contact IEEE to Subscribe](https://ieeexplore.ieee.org/assets/img/document/ads/ft-subscription.png)](https://innovate.ieee.org/interested-in-a-subscription-for-your-organization/?LT=XPLLG_XPL_2020_SUB_eBooks300x250_Sub-NFT)

More Like This

[Designing a Flexible Architecture based on mobile agents for Executing Query in Cloud Databases](https://ieeexplore.ieee.org/document/8593061/)

Published: 2018

[Designing a Flexible Architecture based on mobile agents for Executing Query in Cloud Databases](https://ieeexplore.ieee.org/document/8593011/)

Published: 2018

Show More

### IEEE Account

- [Change Username/Password](https://www.ieee.org/profile/changeusrpwd/showChangeUsrPwdPage.html?refSite=https://ieeexplore.ieee.org&refSiteName=IEEE%20Xplore)
- [Update Address](https://www.ieee.org/profile/address/getAddrInfoPage.html?refSite=https://ieeexplore.ieee.org&refSiteName=IEEE%20Xplore)

### Purchase Details

- [Payment Options](https://www.ieee.org/profile/payment/showPaymentHome.html?refSite=https://ieeexplore.ieee.org&refSiteName=IEEE%20Xplore)
- [Order History](https://www.ieee.org/profile/vieworder/showOrderHistory.html?refSite=https://ieeexplore.ieee.org&refSiteName=IEEE%20Xplore)
- [View Purchased Documents](https://ieeexplore.ieee.org/articleSale/purchaseHistory.jsp)

### Profile Information

- [Communications Preferences](https://www.ieee.org/ieee-privacyportal/app/ibp?refSite=https://ieeexplore.ieee.org&refSiteName=IEEE%20Xplore)
- [Profession and Education](https://www.ieee.org/profile/profedu/getProfEduInformation.html?refSite=https://ieeexplore.ieee.org&refSiteName=IEEE%20Xplore)
- [Technical Interests](https://www.ieee.org/profile/tips/getTipsInfo.html?refSite=https://ieeexplore.ieee.org&refSiteName=IEEE%20Xplore)

### Need Help?

- **US & Canada:** +1 800 678 4333
- **Worldwide:** +1 732 981 0060

- [Contact & Support](https://ieeexplore.ieee.org/xpl/contact)

- [About IEEE _Xplore_](https://ieeexplore.ieee.org/Xplorehelp/overview-of-ieee-xplore/about-ieee-xplore)
- [Contact Us](https://ieeexplore.ieee.org/xpl/contact)
- [Help](https://ieeexplore.ieee.org/Xplorehelp)
- [Accessibility](https://ieeexplore.ieee.org/Xplorehelp/overview-of-ieee-xplore/accessibility-statement)
- [Terms of Use](https://ieeexplore.ieee.org/Xplorehelp/overview-of-ieee-xplore/terms-of-use)
- [Nondiscrimination Policy](http://www.ieee.org/web/aboutus/whatis/policies/p9-26.html)
- [Sitemap](https://ieeexplore.ieee.org/xpl/sitemap.jsp)
- [Privacy & Opting Out of Cookies](http://www.ieee.org/about/help/security_privacy.html)

A not-for-profit organization, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.

© Copyright 2026 IEEE - All rights reserved. Use of this web site signifies your agreement to the terms and conditions.


The Identity Selector: Persistence Service
How are we doing? Please help us improve Stack Overflow. [Take our short survey](https://stackoverflow.com/survey/site-satisfaction/redirect)

[dismiss](https://stackoverflow.com/questions/70075800/best-practice-to-size-autonomous-transaction-processing-atp-number-of-ocpus# "dismiss")

##### Collectives™ on Stack Overflow

Find centralized, trusted content and collaborate around the technologies you use most.

[Learn more about Collectives](https://stackoverflow.com/collectives)

**Stack Internal**

Knowledge at work

Bring the best of human thought and AI automation together at your work.

[Explore Stack Internal](https://stackoverflow.co/internal/?utm_medium=referral&utm_source=stackoverflow-community&utm_campaign=side-bar&utm_content=explore-teams-compact-popover)

[![](https://stackoverflow.com/Content/Img/survey-cta.svg?v=171e02557b0d)\\
\\
How are we doing?\\
\\
Take our short survey](https://stackoverflow.com/survey/site-satisfaction/redirect?source=sidebar "Take our short survey")

# [Best practice to size Autonomous Transaction Processing (ATP) (number of OCPUs) for APEX on ATP?](https://stackoverflow.com/questions/70075800/best-practice-to-size-autonomous-transaction-processing-atp-number-of-ocpus)

[Ask Question](https://stackoverflow.com/questions/ask)

Asked4 years, 2 months ago

Modified [4 years, 2 months ago](https://stackoverflow.com/questions/70075800/best-practice-to-size-autonomous-transaction-processing-atp-number-of-ocpus?lastactivity "2021-11-23 05:26:19Z")

Viewed
708 times


This question shows research effort; it is useful and clear

0

Save this question.

[Timeline](https://stackoverflow.com/posts/70075800/timeline)

Show activity on this post.

Since init parameters such as “sessions” and “open\_cursors” can not be modified in Autonomous Transaction Processing (ATP). Is there any best practice guideline to size ATP (number of OCPUs) for APEX on ATP?

- [oracle-apex](https://stackoverflow.com/questions/tagged/oracle-apex "show questions tagged 'oracle-apex'")
- [sizing](https://stackoverflow.com/questions/tagged/sizing "show questions tagged 'sizing'")
- [oltp](https://stackoverflow.com/questions/tagged/oltp "show questions tagged 'oltp'")
- [oracle-autonomous-db](https://stackoverflow.com/questions/tagged/oracle-autonomous-db "show questions tagged 'oracle-autonomous-db'")

[Share](https://stackoverflow.com/q/70075800 "Short permalink to this question")

Share a link to this question

Copy link [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/ "The current license for this post: CC BY-SA 4.0")

[Improve this question](https://stackoverflow.com/posts/70075800/edit "")

Follow



Follow this question to receive notifications

asked Nov 23, 2021 at 5:26

[![Nilay Panchal's user avatar](https://www.gravatar.com/avatar/2ab43e4ef8b903072229be5b0bee4e7e?s=64&d=identicon&r=PG)](https://stackoverflow.com/users/710956/nilay-panchal)

[Nilay Panchal](https://stackoverflow.com/users/710956/nilay-panchal)

57166 silver badges2020 bronze badges

[Add a comment](https://stackoverflow.com/questions/70075800/best-practice-to-size-autonomous-transaction-processing-atp-number-of-ocpus# "Use comments to ask for more information or suggest improvements. Avoid answering questions in comments.") \| [Expand to show all comments on this post](https://stackoverflow.com/questions/70075800/best-practice-to-size-autonomous-transaction-processing-atp-number-of-ocpus# "Expand to show all comments on this post")

## 1 Answer 1

Sorted by:
[Reset to default](https://stackoverflow.com/questions/70075800/best-practice-to-size-autonomous-transaction-processing-atp-number-of-ocpus?answertab=scoredesc#tab-top)

Highest score (default)

Trending (recent votes count more)

Date modified (newest first)

Date created (oldest first)


This answer is useful

0

Save this answer.

[Timeline](https://stackoverflow.com/posts/70075801/timeline)

Show activity on this post.

There are 2 settings for sizing Autonomous Database (ADW, ATP). Number of OCPUs and Terabytes of data. All other settings are derived from those 2 settings. The number of sessions is a function of the number of OCPUs. You can query the database to see what settings are currently active based on your OCPU setting.

Additionally, note that auto-scale for CPU allows the database to consume more OCPU temporarily when required, but does not increase things like the number of sessions.

PS - I am a product manager for Oracle Autonomous Database (ADB)

[Share](https://stackoverflow.com/a/70075801 "Short permalink to this answer")

Share a link to this answer

Copy link [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/ "The current license for this post: CC BY-SA 4.0")

[Improve this answer](https://stackoverflow.com/posts/70075801/edit "")

Follow



Follow this answer to receive notifications

answered Nov 23, 2021 at 5:26

[![Nilay Panchal's user avatar](https://www.gravatar.com/avatar/2ab43e4ef8b903072229be5b0bee4e7e?s=64&d=identicon&r=PG)](https://stackoverflow.com/users/710956/nilay-panchal)

[Nilay Panchal](https://stackoverflow.com/users/710956/nilay-panchal)

57166 silver badges2020 bronze badges

Sign up to request clarification or add additional context in comments.


## Comments

Add a comment

## Your Answer

Draft saved

Draft discarded

### Sign up or [log in](https://stackoverflow.com/users/login?ssrc=question_page&returnurl=https%3a%2f%2fstackoverflow.com%2fquestions%2f70075800%2fbest-practice-to-size-autonomous-transaction-processing-atp-number-of-ocpus%23new-answer)

Sign up using Google


Sign up using Email and Password


Submit

### Post as a guest

Name

Email

Required, but never shown

Post Your Answer

Discard


By clicking “Post Your Answer”, you agree to our [terms of service](https://stackoverflow.com/legal/terms-of-service/public) and acknowledge you have read our [privacy policy](https://stackoverflow.com/legal/privacy-policy).


Start asking to get answers

Find the answer to your question by asking.

[Ask question](https://stackoverflow.com/questions/ask)

Explore related questions

- [oracle-apex](https://stackoverflow.com/questions/tagged/oracle-apex "show questions tagged 'oracle-apex'")
- [sizing](https://stackoverflow.com/questions/tagged/sizing "show questions tagged 'sizing'")
- [oltp](https://stackoverflow.com/questions/tagged/oltp "show questions tagged 'oltp'")
- [oracle-autonomous-db](https://stackoverflow.com/questions/tagged/oracle-autonomous-db "show questions tagged 'oracle-autonomous-db'")

See similar questions with these tags.
