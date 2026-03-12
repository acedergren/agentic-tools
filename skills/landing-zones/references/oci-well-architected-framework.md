


## Get Started With Well-Architected OCI Landing Zones

OCI Landing Zones are well-architected and ready for various use cases. They provide blueprints with design guidance, best practices, pre-configured Terraform templates, and generic Terraform modules for any OCI deployment.

There are two OCI Landing Zones that you can choose from:

- Core Landing Zone
The Core Landing Zone contains blueprints ready for various workloads and is suitable for centralized operations within your organization

- Operating Entities Landing Zone
The Operating Entities Landing Zone contains blueprints to onboard your Operating Entities (OE), organizations, and partners and their workloads with distributed operations. There are three different blueprints available for different sizes: (M) One-OE, (L) - Multi-OE, and (XL) - Multi-Tenancy.


All OCI Landing Zone blueprints are ready to be used and can be deployed with one click, or you can use them as a reference to create your custom model. They are CIS-compliant, ready for add-ons and workloads, and cover all security, network, and observability cloud services. All of this is part of the OCI Landing Zone framework and is offered free of charge on GitHub.

In summary, OCI Landing Zones provide a robust deployment strategy for implementing the Well-architected framework for Oracle Cloud Infrastructure’s best practices, ensuring that organizations can reduce their onboarding efforts and accelerate time-to-production with secure cloud environments that are resilient, compliant, and cost-efficient from the very start.

### About Landing Zones and the OCI Well-Architected Pillars

The OCI Well-Architected Framework focuses on four core pillars: Security and Compliance, Reliability and Resilience, Performance and Cost Optimization, and Operational Efficiency. By using the OCI landing zone blueprints—that include automation—you can ensure that your cloud architecture is designed and set up with these pillars in mind.

### Security and Compliance

Security is one of the most critical concerns when building cloud architectures, and OCI Landing Zones are designed with security at the core.

The CIS OCI Benchmark is a key compliancy element with the OCI Landing Zones Framework, included in all the blueprints, workloads, and modules. The OCI Landing Zones provide the necessary automation for enforcing security best practices and can be verified against the CIS OCI Benchmark.

- Identity and Access Management

Each blueprint sets its OCI Identity and Access Management (IAM), creating a comprehensible compartment structure, the related OCI groups that together with the policies provide segregation of duties. Identity domains are also created to isolate break-glass users from other types of users.


- Network Security

Each blueprint sets up and deploys a hub & spoke network topology with network segregation using OCI virtual cloud networks (VCNs) and subnets. Different VCNs target different network areas. Security lists and network security groups (NSGs) are also created for each of these elements. The hub area contains shared network elements such as the dynamic routing gateway (DRG), network firewalls, load balancers, VPNs, OCI FastConnect, or private endpoints for connectivity. Gateways are also defined at the VCN level according to network areas, for secure OCI inbound or outbound communications.


Zero Trust Packet Routing (ZPR) is also available at Terraform module level to setup your network security overlay.

- Encryption

All sensitive data in the cloud should be encrypted. OCI Landing Zones automatically configure OCI’s encryption services, ensuring that data is encrypted at rest and in transit. The Terraform module ensures that encryption best practices are applied across all components, including block storage and databases, to mitigate security risks.

- Security Monitoring

All Landing Zone blueprints are prepared and pre-configured with Oracle Cloud Guard and Oracle Security Zones. These services continuously assess the security posture of the environment, ensuring that any misconfigurations or vulnerabilities are detected and remediated automatically. By using these security monitoring tools, you can proactively manage security risks in real-time. OCI Events, OCI Logging, and OCI Notifications with alarms are also created so there is a day-two end-to-end observability.


- Operational Security

Because the Terraform modules are generic, they are ready to receive any OCI configuration in the form of JSON or `.tfvars` files. This approach means configurations do not have code and code does not have configurations, which enables operational security where cloud operations do not touch code and coders do not touch cloud configurations. This approach also enables the use of versioned control operating models such as GitOps, where configurations are the source of truth of the infrastructure.



### Reliability and Resilience

The Reliability and Resilience pillar focuses on ensuring that cloud applications and infrastructure can withstand failures, recover quickly, and continue to provide value to the organization. OCI Landing Zones help organizations meet OCI’s reliability best practices by establishing resilient cloud architectures.

- High Availability and Disaster Recovery

Landing Zones set up some services that can leveraging multiple Availability Domains (ADs), and Landing Zones can be deployed across multiple regions. This multi-region setup helps ensure that if resources in one region experiences failure, another OCI Landing Zone is deployed in another region, ready to run with the mirrored resources.

- Fault Tolerance

By setting up fault-tolerant network configurations and using features like load balancing, Landing Zones help ensure that services remain available even if individual instances or services fail.


### Performance Efficiency and Cost Optimization

Performance Efficiency in OCI revolves around ensuring that cloud resources are optimally utilized to meet performance requirements. OCI Landing Zones incorporate performance-efficient practices by using automated scaling, right-sizing of resources, and performance monitoring.

Cost Optimization helps ensure that cloud environments are designed to use resources efficiently, reducing waste and avoiding unnecessary costs. OCI Landing Zones support this pillar by automating cost-effective practices and providing visibility into resource utilization.

- Performance Monitoring and Optimization

OCI Landing Zones automatically integrate OCI Monitoring to provide real-time performance insights. With these tools, you can monitor your cloud environment for performance bottlenecks, optimize resource allocation, and make adjustments to maintain high application performance.


- Cost Controls

OCI Landing Zones can automatically configure budgets and cost tracking to ensure that spending is kept within budget. This helps you to maintain visibility into your cloud costs, allowing you to avoid surprises and optimize resource usage.

- Resource Tagging and Cost Allocation

The landing zone configures resource tagging for detailed cost allocation and visibility. Tags can be applied to different departments, applications, or projects, allowing you to track and manage costs more effectively.


### Operational Efficiency

Operational Efficiency in OCI refers to the ability to continuously monitor, automate, and improve cloud operations to ensure that systems run smoothly and efficiently. OCI Landing Zones offer several features that align with this pillar by setting up a standardized, automated, and easily manageable environment.

- Infrastructure as Code (IaC)

Landing Zones leverage Terraform, a widely-adopted tool for IaC. This approach ensures that all infrastructure is repeatable, version-controlled, and maintainable, reducing the risk of human error and ensuring consistency across multiple environments. There are also a comprehensible set of modules and as mentioned previously in the operational security topic, this approach also enables the use of highly scalable versioned control operating models such as GitOps, where configurations are the source of truth of the infrastructure.

- Automated Deployment

Landing Zones support automated provisioning of a complete, secure, and compliant OCI environment, including network configuration, identity management, and governance. This eliminates the need for manual configuration, speeds up deployment, and reduces operational complexity.

- Monitoring and Logging

Landing Zones will deploy OCI Monitoring and OCI Logging, enabling you to implement robust monitoring and logging automatically. By centralizing monitoring across cloud services, administrators can gain real-time insights into their infrastructure, detect issues early, and take corrective actions, improving operational excellence.


- Scalability and Flexibility

Landing Zones can be adapted to suit various organizational needs, from small-scale environments to large enterprise systems. This flexibility allows organizations to maintain high operational standards, even as they scale.


### Learn More

- [Introducing the new standardized OCI Landing Zones framework for an even easier onboarding to OCI](https://docs.oracle.com/pls/topic/lookup?ctx=en/solutions/oci-best-practices&id=blog-new-landing-zones) (blog)

- [OCI Landing Zones Framework](https://docs.oracle.com/pls/topic/lookup?ctx=en/solutions/oci-best-practices&id=github-oci-landing-zone-home) (GitHub)

- [OCI Core Landing Zone](https://docs.oracle.com/pls/topic/lookup?ctx=en/solutions/oci-best-practices&id=github-oci-landing-zone-core-terraform) (GitHub)

- [OCI Operating Entities Landing Zone](https://docs.oracle.com/pls/topic/lookup?ctx=en/solutions/oci-best-practices&id=github-oci-landing-zone-operating-entities) (GitHub)

- Quickly deploy the OCI Core Landing Zone. Go to [![Deploy to Oracle Cloud](https://docs.oracle.com/en/solutions/oci-best-practices/img/deploy-oracle-cloud-button-png.png).](https://docs.oracle.com/pls/topic/lookup?ctx=en/solutions/oci-best-practices&id=github-oci-landing-zone-core-main-zip)
- Quickly deploy the OCI Operating Entities Landing Zone. Go to [![Deploy to Oracle Cloud](https://docs.oracle.com/en/solutions/oci-best-practices/img/deploy-oracle-cloud-button-png.png).](https://docs.oracle.com/pls/topic/lookup?ctx=en/solutions/oci-best-practices&id=github-oci-landing-zone-operating-entities_zip)

[Title and Copyright Information](https://docs.oracle.com/en/solutions/oci-best-practices/simplify-provisioning-oci-landing-zones1.html#copyright-information)

Well-architected framework for Oracle Cloud Infrastructure

F29550-09

May 2025

[Copyright ©](https://docs.oracle.com/pls/topic/lookup?ctx=en/legal&id=cpyr) 2020,2025,

Oracle and/or its affiliates.
    - [Landing Zones Overview](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm)
    - [OCI Core Landing Zone](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-core-landing-zone.htm)
    - [Secure Cloud Computing Architecture Landing Zone](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/scca-landing-zone.htm)
    - [Extreme Reliability](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/extreme-reliability.htm)
    - [High Availability](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/high-availability.htm)
    - [Disaster Recovery](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/disaster-recovery.htm)
    - [Enterprise Scenarios for Design and Implementation](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/enterprise-scenario-design-implementation.htm)
- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

### [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/iaas/Content/home.htm)     [Try Free Tier](https://www.oracle.com/cloud/free/?source=:ow:o:h:po:OHPPanel1nav0625&intcmp=:ow:o:h:po:OHPPanel1nav0625)

* * *

[Oracle Cloud Infrastructure Cloud Adoption Framework](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/home.htm) [Technology Implementation](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/technology-implementation.htm)

All Pages


    - [Landing Zones Overview](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm)
    - [OCI Core Landing Zone](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-core-landing-zone.htm)
    - [Secure Cloud Computing Architecture Landing Zone](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/scca-landing-zone.htm)
    - [Extreme Reliability](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/extreme-reliability.htm)
    - [High Availability](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/high-availability.htm)
    - [Disaster Recovery](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/disaster-recovery.htm)
    - [Enterprise Scenarios for Design and Implementation](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/enterprise-scenario-design-implementation.htm)
- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

[Skip to main content](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#dcoc-content-body)

Updated 2025-02-25

# Landing Zones Overview

The following information describes the Oracle Cloud Infrastructure (OCI) landing zones.

## Landing Zone Benefits 🔗

OCI Landing Zones accelerate cloud onboarding with an optimal foundation that's secure, compliant, and resilient. OCI Landing Zones are Terraform templates that are prescriptive and hardened for one-click automated provisioning of the base tenancy and key cloud services from standard to complex use cases. The solutions are architected and pre-configured to adhere to best practices, conform to Center for Internet Security (CIS) Benchmarks and optimized configurations to provide you with a foundation that’s standardized, compliant, resilient, scalable, cost-effective, and ready for business critical workloads.

## What Are Landing Zones? 🔗

Landing zones are opinionated, hardened Terraform-based templates for one-click automated provisioning of the base tenancy and key cloud services. A landing zone includes the identity, network, security, monitoring, and governance services needed to support applications and workloads. You can deploy landing zones directly from GitHub or from OCI Resource Manager, building an environment in minutes.

## How Are Landing Zones Built? 🔗

All OCI landing zone templates are comprised of the [OCI Landing Zones framework](https://github.com/oci-landing-zones/) and its modules, providing the building blocks required for building your cloud architecture. The framework converges multiple disparate initiatives, including _CIS Landing Zone_, _\_OCI Enterprise Landing Zone (OELZ)_, and _EMEA Operating Entities Landing Zones\__ for consistent messaging.

The following diagram outlines components of the OCI Landing Zones framework.

![Diagram showing the OCI Landing Zones framework.](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/images/oci-landing-zones-framework.svg)

Landing zone blueprints are pre-built solutions that provide prescriptive solutions to support common and specific requirements. The framework provides a common set of generic Terraform modules that provide infrastructure as code (IaC) capabilities to all landing zones. Extensions are pluggable elements that augment a blueprint, such as custom hub and spoke configurations and multicloud connectivity.

Workloads are also plugabble elements designed to simplify the onboarding of specific application workloads and platform as a service (PaaS) solutions, such as OCI Kubernetes Engine (OKE), Exadata Cloud Service(ExaCS), E-Business Suite (EBS), Oracle Cloud VMware Solution (OCVS), AI services, and so on. All landing zone components, such as blueprint, modules, extensions, and workloads are pre-configured by default to enforce the CIS OCI Foundations Benchmark.

## OCI Curated Landing Zone Blueprints 🔗

To accelerate onboarding to the cloud, OCI provides curated landing zone blueprints for common use cases and tenancy best-practices that provide single-click deployment or leverage the framework to build-your-own landing zone. This is your ideal starting point in OCI. If you're more experienced with landing zones, you can customize the landing zones or create new ones using the framework’s modules to support unique requirements.

## Key Services Included in OCI Landing Zone Blueprints 🔗

At its core, OCI Landing Zones include the following OCI service components and modules:

- **Identity and Access Management (IAM) Module:** Use this module to establish an identity strategy. You can set up IAM roles, groups, policies, and compartments to control access to cloud resources. The module helps enforce principles of least privilege and implements authentication and authorization mechanisms to help ensure only authorized users and systems can access the cloud environment.
- **Networking Module:** Helps you configure and deploy a secure and resilient network architecture. This includes creating virtual cloud networks (VCNs), subnets, routing tables, and security groups to enable secure communication between cloud resources and on-premises systems or third party cloud service providers. There are options to deploy an OCI native firewall or third party firewall. The module helps establish connectivity options such as VPN or FastConnect to hybrid or multicloud networks.
- **Security Module**: Use this module to help implement security controls and support for governance frameworks. All OCI Landing Zone blueprints and components are designed to be secure and support the CIS OCI Foundations Benchmark. This involves defining and deploying security policies, encryption strategies, vulnerability and threat detection, and logging and monitoring solutions. By integrating OCI native security tooling and following the CIS OCI Foundations Benchmark, you can help ensure your cloud environment meets security policy requirements and protects sensitive data.
- **Observability and Monitoring Module**: Establishes event monitoring, alerting, and logging, which are crucial for operational management. This includes integrating with monitoring tools and enabling the automation of incident management processes. Use of landing zones helps you set up best practices to proactively manage cloud environments to enable high availability and performance.
- **Governance Module**: Implements tags and budgets to help organize and manage cloud resources. This includes creating resource groups, applying tags, and budgets which can provide alerts based on defined budget rules. Use of landing zones supports proper resource organization, simplifies management, and enables cost allocation and governance by using compartments to provide a logical structure for managing costs. This helps your organization gain visibility into cloud spending and optimize cloud resource utilization.
- **Workloads Module**: Provisions the OCI PaaS components such as Compute, Block Volume, File Storage Service (FSS), OKE, Object Storage, and Oracle Database to support your workload environments.

## OCI Landing Zones Blueprint Catalog 🔗

The following information describes the key OCI Landing Zones. Choose the one most applicable to your use case.

- **[OCI Core Landing Zone](https://github.com/oci-landing-zones/terraform-oci-core-landingzone):** Provides a generic blueprint provisioning the services needed for a secure, scalable, and resilient OCI tenancy to get started. The OCI Core Landing Zone is CIS-compliant, provides support for complex architectures such as multitenancy and multicloud, in addition to third party integrations such as firewall and security information and event management (SIEM).

The [OCI Core Landing Zone](https://github.com/oci-landing-zones/terraform-oci-core-landingzone) unifies the previous CIS Landing Zone and OCI Enterprise Landing Zone (OELZ) in a single, standardized solution.

- **[Secure Cloud Computing Architecture (SCCA) Landing Zone](https://github.com/oci-landing-zones/oci-scca-landingzone):** Supports SCCA for the U.S. Department of Defense. You can choose Mission Owner or Managed SCCA Broker landing zone options.


OCI landing zones provide a solid foundation for you to start the cloud journey and onboard your workloads to OCI. Use the landing zones to establish a scalable, secure, and cost-effective cloud presence while adhering to governance and compliance requirements. By leveraging landing zones as part of your cloud strategy, you can accelerate cloud adoption, help reduce risks, and lay the groundwork for successful cloud deployments.

Was this article helpful?

YesNo

- [Landing Zones Overview](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#landing-zones-overview)
- [Landing Zone Benefits](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#benefits)
- [What Are Landing Zones?](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#definition-what)
- [How Are Landing Zones Built?](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#definition-how)
- [OCI Curated Landing Zone Blueprints](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#blueprints)
- [Key Services Included in OCI Landing Zone Blueprints](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#key-services)
- [OCI Landing Zones Blueprint Catalog](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm#catalog)

Was this article helpful?

YesNo

Updated 2025-02-25
- [Skip to content](https://www.oracle.com/ca-en/cloud/architecture-center/#maincontent)
- [Click to view our Accessibility Policy](https://www.oracle.com/ca-en/corporate/accessibility/)

[Oracle Home](https://www.oracle.com/ca-en/)[Oracle Cloud Infrastructure](https://www.oracle.com/ca-en/cloud/)

Close Search

Search Oracle.com

- QUICK LINKS
- [Oracle Fusion Cloud Applications](https://www.oracle.com/ca-en/applications/)
- [Oracle Database](https://www.oracle.com/ca-en/database/technologies/)
- [Download Java](https://www.oracle.com/ca-en/java/technologies/downloads/)
- [Careers at Oracle](https://www.oracle.com/ca-en/careers/)

Search

[Country![united states selected](https://www.oracle.com/asset/web/i/flg-ca.svg)](https://www.oracle.com/ca-en/countries-list.html#countries)
Close

[MenuMenu](https://www.oracle.com/ca-en/oci-menu-v3/) [Contact Us](https://www.oracle.com/ca-en/corporate/contact/ "Contact") [Sign in to Oracle Cloud](https://www.oracle.com/ca-en/cloud/sign-in.html)

[Contact Us](https://www.oracle.com/ca-en/corporate/contact/ "Contact") [Sign in to Oracle Cloud](https://www.oracle.com/ca-en/cloud/sign-in.html)

# Cloud Architecture Center

Design, develop, and implement your cloud, hybrid, and on-premises workloads with guidance from Oracle architects, developers, and other experts versed in Oracle technologies and solutions.

[Explore all architectures](https://docs.oracle.com/solutions/)

[Try Oracle Cloud Free Tier](https://www.oracle.com/ca-en/cloud/free/?source=:ow:o:p:nav:012821CloudArchitectureCenter_ca-en&intcmp=:ow:o:p:nav:012821CloudArchitectureCenter_ca-en)

## OCI Well-Architected Framework overview

Oracle Cloud Infrastructure (OCI) provides infrastructure and platform services for a wide range of enterprise workloads. With each service, you can choose from a rich array of features based on your goals. We recommend a set of best practices to help you design and operate cloud topologies that deliver the maximum business value.

The OCI Well-Architected Framework is organized into five pillars: security and compliance, reliability and resilience, performance and cost optimization, operational efficiency, and distributed cloud. The topics covered for each pillar feature one or more personas that map to typical architect roles within organizations using Oracle Cloud Infrastructure. Additionally, the framework presents the OCI Landing Zones as the ideal templates for deploying secure, performant, reliable, and efficient architectures on OCI.

The related OCI Cloud Adoption Framework (CAF) provides a tailored set of guidelines and best practices to help facilitate a smooth onboarding process and the optimal use of cloud resources.

[Explore the OCI Well-Architected Framework](https://docs.oracle.com/en/solutions/oci-best-practices/index.html)

[Explore the OCI Cloud Adoption Framework](https://www.oracle.com/cloud/cloud-adoption-framework/)

### Design well-architected cloud topologies

##### Security and compliance

Secure and protect your system and information assets in the cloud.

[Learn more on Security and compliance](https://docs.oracle.com/en/solutions/oci-best-practices/effective-strategies-security-and-compliance1.html)

##### Reliability and resilience

Build reliable applications by architecting resilient cloud infrastructure.

[Learn more on Reliability and resilience](https://docs.oracle.com/en/solutions/oci-best-practices/reliable-and-resilient-cloud-topology-practices1.html)

##### Performance and cost optimization

Utilize resources efficiently to derive the best performance at the lowest cost.

[Learn more on Performance and cost optimization](https://docs.oracle.com/en/solutions/oci-best-practices/performance-efficiency-and-cost-optimization-practices.html)

##### Operational efficiency

Operate and monitor your apps and infrastructure to deliver the maximum business value.

[Learn more on Operational efficiency](https://docs.oracle.com/en/solutions/oci-best-practices/best-practices-operating-cloud-deployments-efficiency.html)

##### Distributed cloud

Design, integrate, and optimize deployments spanning public cloud, multicloud, hybrid cloud, edge computing, and dedicated regions.

[Learn more on Distributed cloud](https://docs.oracle.com/en/solutions/oci-best-practices/effective-strategies-distributed-cloud-implementation1.html)

##### Well-architected OCI Landing Zones

Access blueprints with design guidance, best practices, and Terraform templates and modules for any OCI deployment.

[Learn more on Well-architected OCI landing zones](https://docs.oracle.com/en/solutions/oci-best-practices/simplify-provisioning-oci-landing-zones1.html)

## OCI Well-Architected Assessment

The OCI Well-Architected Assessment is a practical tool designed to help you identify gaps, implement best practices, and unlock the full potential of OCI for your business. Our assessment framework draws on thousands of successful OCI implementations across industries, incorporating proven solutions to common challenges and emerging best practices.

[Start your OCI Well-Architected Assessment](https://well-architected.oracle.com/)

The following playbooks and architectures are designed to provide you with guidance and starting points to help you build your deployments using well-architected standards.

- Solution Playbook





#### [Establish a foundational Oracle Cloud Infrastructure Governance Model](https://docs.oracle.com/en/solutions/foundational-oci-governance-model/index.html)





Learn about and deploy a foundational governance model to begin your cloud journey.

- Reference Architecture





#### [Monitor and trace microservices with application performance monitoring on Oracle Cloud](https://docs.oracle.com/en/solutions/oci-apm-for-microservices/)





Application performance monitoring on OCI captures end-to-end user transactions, as well as app server and business metrics for microservices apps that run in different processes on different systems.

- Solution Playbook





#### [Best practices for building resilient asynchronous integrations](https://docs.oracle.com/en/solutions/best-practices-resilient-asynch-integrations/)





Learn about suggested approaches for building asynchronous integrations that are resilient to the realities of modern networks and infrastructures.


**[QuickStart stacks with Terraform](https://github.com/oracle-quickstart)**

Access a collection of Terraform stacks available in GitHub. You can easily deploy your stacks on your tenancy and get your infrastructure up and running in minutes.

[Explore QuickStart guides](https://github.com/oracle-devrel?q=terraform-oci-arch)

## AI Solutions Hub

Enter a new era of productivity with generative AI solutions for your business. Leverage AI, embedded as you need it, across the full stack.

[Explore AI solutions](https://www.oracle.com/ca-en/artificial-intelligence/solutions/)

## Get started with Oracle Cloud

### Try Cloud Free Tier

No time limits and $300 in free credits.

[Try now](https://www.oracle.com/ca-en/cloud/free/)

### OCI Cloud Adoption Framework

Modernize your business on OCI.

[Explore now](https://www.oracle.com/ca-en/cloud/cloud-adoption-framework/)

### Free training and certification

Learn how to build or migrate apps to Oracle Cloud.

[Register now](https://education.oracle.com/learn/oracle-cloud-infrastructure/pPillar_640)

### Tutorials and hands-on labs

The best way to learn is to try it yourself.

[Discover now](https://docs.oracle.com/learn/)

Talk to sales

Chatnow

CallSales

[+1 800 363 3059](tel:18003633059)

Complete list of [local country numbers](https://www.oracle.com/ca-en/corporate/contact/global.html)

consent.trustarc.com

# consent.trustarc.com is blocked

This page has been blocked by an extension

- Try disabling your extensions.

ERR\_BLOCKED\_BY\_CLIENT

Reload


This page has been blocked by an extension

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)

Oracle Chatbot

Disconnected

- Close widget
- Select chat language


- Detect Language
- undefined
- Español
- Português
- Deutsch
- French
- Dutch
- Italian
- [Skip to content](https://www.ateam-oracle.com/cis-oci-landing-zone-quick-start-template#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/www.ateam-oracle.com/post.php) [Twitter](https://twitter.com/share?url=/www.ateam-oracle.com/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/www.ateam-oracle.com/post.php) [Email](https://www.ateam-oracle.com/placeholder.html)

[Architecture](https://www.ateam-oracle.com/category/atm-architecture), [Identity Access Management and Security](https://www.ateam-oracle.com/category/atm-identity-access-management-and-security), [Networking](https://www.ateam-oracle.com/category/atm-networking)

# CIS OCI Landing Zone Quick Start Template

May 19, 20254 minute read

![Profile picture of Andre Correa Neto](http://blogs.oracle.com/wp-content/uploads/2025/09/andre_recent.jpg)[Andre Correa Neto](https://www.ateam-oracle.com/authors/andre-correa-neto)
Cloud Solutions Architect

This post describes features of CIS Landing Zone Terraform configuration, which is retired as of May 2025. The last release of CIS Landing Zone Terraform configuration is [Release 2.8.8](https://github.com/oci-landing-zones/oci-cis-landingzone-quickstart/releases/tag/v2.8.8).


- The [CIS compliance checking script](https://github.com/oci-landing-zones/oci-cis-landingzone-quickstart/blob/main/compliance-script.md) is not impacted. Users should continue using it to determine tenancy compliance with the CIS OCI Foundations Benchmark.
- Users looking for a deployment experience similar to CIS Landing Zone should now use [OCI Core Landing Zone](https://github.com/oci-landing-zones/terraform-oci-core-landingzone), where the same features are available. OCI Core Landing Zone evolves CIS Landing Zone and complies with CIS OCI Foundations Benchmark.
- Users looking for a deployment experience based on fully declarable and customizable templates should use the [Operating Entities Landing Zone](https://github.com/oci-landing-zones/oci-landing-zone-operating-entities) or the [OCI Landing Zones Modules](https://github.com/oci-landing-zones/oci-cis-landingzone-quickstart#modules) in the [OCI Landing Zones GitHub organization](https://github.com/oci-landing-zones).

>p>

## Updates

- July 2021: [Landing Zone V2](https://www.ateam-oracle.com/cis-oci-landing-zone-quick-start-template-version-2) released.

## Introduction

Customers often ask us how they can automate the process of creating a secure Oracle Cloud Infrastructure (OCI) tenancy. In response to this, we created a Center for Internet Security (CIS) Landing Zone Quick Start template. This template enables OCI customers to quickly implement the CIS OCI Foundations Benchmark and overall OCI best practices within their tenancy. CIS recently released version 1.1 of the OCI Foundations Benchmark and the template provides a reference implementation for those recommendations.

For obtaining the CIS OCI Benchmark document, navigate to [https://www.cisecurity.org/cis-benchmarks/](https://www.cisecurity.org/cis-benchmarks/), expand the Oracle Cloud Infrastructure section and click the Download link next to the version number, as indicated.

![Obtaining CIS OCI benchmark document](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/obtainingcisbenchmarks.png)

The Landing Zone uses multiple compartments, groups, and IAM policies to segregate access to resources based on job function. The resources within the template are configured to meet the CIS OCI Foundations Benchmark settings related to:

- IAM (Identity & Access Management)
- Networking
- Keys
- Cloud Guard
- Vulnerability Scanning
- Logging
- Events
- Notifications
- Object Storage

## Deliverables

The template encloses two independent deliverables:

- An extensible reference implementation written in Terraform HCL (Hashicorp Language) that provisions fully functional resources in an OCI tenancy.
- An extensible Python script that performs compliance checks for the CIS OCI Foundations Benchmark recommendations in **any** existing tenancy (it does not matter if the tenancy was provisioned by the Landing Zone Terraform).

The code is available at [https://github.com/oracle-quickstart/oci-cis-landingzone-quickstart](https://github.com/oracle-quickstart/oci-cis-landingzone-quickstart) and is provided as sample code, which has not been submitted for extensive testing. It should be used “as is”, altered or simply as an inspiration for your projects.

## Architecture

It is important to note the CIS OCI Foundations Benchmark document does not prescribe a particular compartment or network architecture. It is all about security best practices that should be implemented along with an architecture. In order to show how to implement these best practices, the Landing Zone Terraform defines a basic architecture that could be used “as is” in many customer scenarios. Different architecture scenarios can be made “CIS compliant” by adding these best practices to an existing tenancy, but the methods of doing so depend on customers’ provisioning practices (ranging from simply using OCI Console to automation with Terraform) and are beyond the scope of this template.

The Landing Zone Terraform code deploys a standard three-tier network architecture within a single Virtual Cloud Network (VCN). The three tiers are divided into:

- One public subnet for load balancers and bastion servers;
- Two private subnets: one for the application tier and one for the database tier.

The tenancy resources are spread across four compartments:

- A network compartment: for all networking resources.
- A security compartment: for all logging, key management, and notifications resources and services.
- An application development compartment: for application development related services, including compute, storage, functions, streams, Kubernetes, API Gateway, etc.
- A database compartment: for database resources.

The compartment design reflects a basic functional structure observed across different organizations, where IT responsibilities are typically split among networking, security, application development and database admin teams. Each compartment is assigned an admin group, with enough permissions to perform its duties. The provided permissions lists are not exhaustive and are expected to be appended with new statements as new resources are brought into the Terraform template.

The diagram below shows the services and resources that are deployed:

![](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/architecture_v1.png)

The greyed out icons in the AppDev and Database compartments indicate services not provisioned by the template.

## Security Features

Landing Zone pre-configures the tenancy with the following security features:

- Segregation of duties, implemented through IAM policies coupled with groups and compartments design;
- Secured network architecture, with inbound and outbound interfaces properly secured via Network Security Groups;
- Network logging with VCN flow logs;
- Alerting on IAM and network changes with Events and Notifications;
- [Strong security posture monitoring with Cloud Guard](https://www.ateam-oracle.com/cloud-guard-support-in-cis-oci-landing-zone);
- [Logging consolidation with Service Connector Hub](https://www.ateam-oracle.com/security-log-consolidation-in-cis-oci-landing-zone);
- [Automatic host scanning with Vulnerability Scanning Service](https://www.ateam-oracle.com/vulnerability-scanning-in-cis-oci-landing-zone);

## Deployment

Detailed instructions for Terraform deployment and how to run the compliance checking script are available in the [repository’s README](https://github.com/oracle-quickstart/oci-cis-landingzone-quickstart).

## Customizing the Terraform Configuration

The Terraform code has a single configuration root module and a few modules that actually perform the provisioning. We encourage any customization to follow this pattern as it enables consistent code reuse.

For bringing new resources into the Terraform configuration, like compartments or VCNs, you can simply reuse the existing modules and add extra module calls similar to the existing ones in the root module. Most modules accept a map of resource objects that are usually keyed by the resource name. For adding extra subnets to the existing VCN, for instance, simply add the extra subnet resources to the existing subnets map.

For more details, see the [repository’s README](http://github.com/oracle-quickstart/oci-cis-landingzone-quickstart).

## Cost

As of the publishing time of this post, provisioning the resources in the template incurs no cost.

## Feedback

To post feedback, submit feature ideas or report bugs, please use the Issues section of the GitHub repository.

## Credits

This template has been jointly created by myself, Josh Hammer and Logan Kleier.

### Authors

![Profile picture of Andre Correa Neto](http://blogs.oracle.com/wp-content/uploads/2025/09/andre_recent.jpg)

#### Andre Correa Neto

##### Cloud Solutions Architect

[Previous post](https://www.ateam-oracle.com/security-log-consolidation-in-cis-oci-landing-zone "Security Log Consolidation in CIS OCI Landing Zone")

#### Security Log Consolidation in CIS OCI Landing Zone

[Pulkit Sharma](https://www.ateam-oracle.com/authors/pulkit-sharma) \| 2 minute read

[Next post](https://www.ateam-oracle.com/how-to-deploy-oci-secure-landing-zone-for-exadata-cloud-service "How to Deploy OCI Secure Landing Zone for Exadata Cloud Service")

#### How to Deploy OCI Secure Landing Zone for Exadata Cloud Service

[Andre Correa Neto](https://www.ateam-oracle.com/authors/andre-correa-neto) \| 2 minute read
[Skip to content](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#start-of-content)

You signed in with another tab or window. [Reload](https://github.com/oci-landing-zones/oracle-enterprise-landingzone) to refresh your session.You signed out in another tab or window. [Reload](https://github.com/oci-landing-zones/oracle-enterprise-landingzone) to refresh your session.You switched accounts on another tab or window. [Reload](https://github.com/oci-landing-zones/oracle-enterprise-landingzone) to refresh your session.Dismiss alert

{{ message }}

[oci-landing-zones](https://github.com/oci-landing-zones)/ **[oracle-enterprise-landingzone](https://github.com/oci-landing-zones/oracle-enterprise-landingzone)** Public

generated from [oracle-quickstart/oci-quickstart-template](https://github.com/oracle-quickstart/oci-quickstart-template)

- [Notifications](https://github.com/login?return_to=%2Foci-landing-zones%2Foracle-enterprise-landingzone) You must be signed in to change notification settings
- [Fork\\
48](https://github.com/login?return_to=%2Foci-landing-zones%2Foracle-enterprise-landingzone)
- [Star\\
36](https://github.com/login?return_to=%2Foci-landing-zones%2Foracle-enterprise-landingzone)


ORACLE ENTERPRISE LANDING ZONE


### License

[UPL-1.0 license](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/LICENSE.txt)

[36\\
stars](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/stargazers) [48\\
forks](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/forks) [Branches](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/branches) [Tags](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tags) [Activity](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/activity)

[Star](https://github.com/login?return_to=%2Foci-landing-zones%2Foracle-enterprise-landingzone)

[Notifications](https://github.com/login?return_to=%2Foci-landing-zones%2Foracle-enterprise-landingzone) You must be signed in to change notification settings

# oci-landing-zones/oracle-enterprise-landingzone

main

[**16** Branches](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/branches) [**10** Tags](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tags)

[Go to Branches page](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/branches)[Go to Tags page](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tags)

Go to file

Code

Open more actions menu

## Folders and files

| Name | Name | Last commit message | Last commit date |
| --- | --- | --- | --- |
| ## Latest commit<br>## History<br>[396 Commits](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/commits/main/)<br>[View commit history for this file.](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/commits/main/) |
| [.github/workflows](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/.github/workflows "This path skips through empty directories") | [.github/workflows](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/.github/workflows "This path skips through empty directories") |  |  |
| [Official\_Documentation](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/Official_Documentation "Official_Documentation") | [Official\_Documentation](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/Official_Documentation "Official_Documentation") |  |  |
| [examples](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/examples "examples") | [examples](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/examples "examples") |  |  |
| [images](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/images "images") | [images](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/images "images") |  |  |
| [modules](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/modules "modules") | [modules](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/modules "modules") |  |  |
| [templates](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/templates "templates") | [templates](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/templates "templates") |  |  |
| [test](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/test "test") | [test](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/tree/main/test "test") |  |  |
| [.gitignore](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/.gitignore ".gitignore") | [.gitignore](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/.gitignore ".gitignore") |  |  |
| [.gitlab-ci.yml](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/.gitlab-ci.yml ".gitlab-ci.yml") | [.gitlab-ci.yml](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/.gitlab-ci.yml ".gitlab-ci.yml") |  |  |
| [CONTRIBUTING.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/CONTRIBUTING.md "CONTRIBUTING.md") | [CONTRIBUTING.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/CONTRIBUTING.md "CONTRIBUTING.md") |  |  |
| [LICENSE.txt](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/LICENSE.txt "LICENSE.txt") | [LICENSE.txt](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/LICENSE.txt "LICENSE.txt") |  |  |
| [README.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/README.md "README.md") | [README.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/README.md "README.md") |  |  |
| [RELEASE.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/RELEASE.md "RELEASE.md") | [RELEASE.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/RELEASE.md "RELEASE.md") |  |  |
| [SECURITY.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/SECURITY.md "SECURITY.md") | [SECURITY.md](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/SECURITY.md "SECURITY.md") |  |  |
| View all files |

## Repository files navigation

# Landing Zones

[Permalink: Landing Zones](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#landing-zones)

### This repository is deprecated in favor of the current release available from the OCI Landing Zones GitHub Organization. Please use [OCI Core Landing Zone](https://github.com/oci-landing-zones/terraform-oci-core-landingzone).

[Permalink: This repository is deprecated in favor of the current release available from the OCI Landing Zones GitHub Organization. Please use OCI Core Landing Zone.](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#this-repository-is-deprecated-in-favor-of-the-current-release-available-from-the-oci-landing-zones-github-organization-please-use-oci-core-landing-zone)

**Below is the OLD documentation for the deprecated landing zones for Issues only. For new deployment, please use Core landing zone - built using the revamped standardized framework for OCI landing zones.**

Welcome to the [OCI Landing Zones (OLZ) Community](https://github.com/oci-landing-zones)! OCI Landing Zones simplify onboarding and running on OCI by providing design guidance, best practices, and pre-configured Terraform deployment templates for various architectures and use cases. These enable customers to easily provision a secure tenancy foundation in the cloud along with all required services, and reliably scale as workloads expand.

This repository contains different types of Landing Zones to deploy to the Oracle Cloud Infrastructure platform. The landing zones are assembled from modules and templates that users can use in their default configuration or fork this repo and customize for your own scenarios.

## Oracle Enterprise Landing Zone v2 (OELZ v2)

[Permalink: Oracle Enterprise Landing Zone v2 (OELZ v2)](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#oracle-enterprise-landing-zone-v2-oelz-v2)

The Oracle Enterprise Landing Zone v2 (OELZ v2) deploys a typical architecture used by enterprise customers. The root template for this landing zone is located at [Official\_Documentation](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/Official_Documentation/OELZ_Baseline_Deployment). Users can use the guides below to get started with the Oracle Enterprise Landing Zone v2 (OELZ v2).

- [Architecture Guide](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/Official_Documentation/OELZ_Baseline_Deployment/Architecture_Guide.md)
- [Implementation Guide](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/Official_Documentation/OELZ_Baseline_Deployment/IMPLEMENTATION.md)
- [Configuration Guide](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/Official_Documentation/OELZ_Baseline_Deployment/CONFIGURATION.md)

### Workload Expansion

[Permalink: Workload Expansion](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#workload-expansion)

The Oracle Enterprise Landing Zone v2 (OELZ v2) deploys a workload in each environment (Prod and Non-Prod) by default.
The user can use the workload expansion stack to deploy additional customized workload. The template for the workload expansion is located

at [Official\_Documentation/OELZ\_Workload\_Deployment](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/Official_Documentation/OELZ_Workload_Deployment). Users can use the guides below to get started with Workload Expansion.

- [Implementation Guide](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/Official_Documentation/OELZ_Workload_Deployment/IMPLEMENTATION.md)
- [Configuration Guide](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/Official_Documentation/OELZ_Workload_Deployment/CONFIGURATION.md)

## Deploy Using Oracle Resource Manager

[Permalink: Deploy Using Oracle Resource Manager](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#deploy-using-oracle-resource-manager)

1. Click to deploy the stack

[![Deploy to Oracle Cloud](https://camo.githubusercontent.com/4220d6d5145b96b728d613edaf1aa10f6d5796c52146510420c5d74dfd0164fc/68747470733a2f2f6f63692d7265736f757263656d616e616765722d706c7567696e2e706c7567696e732e6f63692e6f7261636c65636c6f75642e636f6d2f6c61746573742f6465706c6f792d746f2d6f7261636c652d636c6f75642e737667)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/oci-landing-zones/oracle-enterprise-landingzone/archive/refs/tags/v2.3.1.zip)

```
If you aren't already signed in, when prompted, enter the tenancy and user credentials. Review and accept the terms and conditions.
```

2. Select the region where you want to deploy the stack.
3. For Working directory, select `templates/enterprise-landing-zone`
4. Follow the on-screen prompts and instructions to create the stack.
5. After creating the stack, click Terraform Actions, and select Plan.
6. Wait for the job to be completed, and review the plan.
7. To make any changes, return to the Stack Details page, click Edit Stack, and make the required changes. Then, run the Plan action again.
8. If no further changes are necessary, return to the Stack Details page, click Terraform Actions, and select Apply.

## The Team

[Permalink: The Team](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#the-team)

This repository is developed and supported by the Oracle OCI Landing Zones team.

## Contributing

[Permalink: Contributing](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#contributing)

Interested in contributing? See our contribution [guidelines](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/CONTRIBUTING.md) for details.

## Security

[Permalink: Security](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#security)

Please consult the [security guide](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/SECURITY.md) for our responsible security vulnerability disclosure process

## License

[Permalink: License](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#license)

Copyright (c) 2022,2023 Oracle and/or its affiliates.

Licensed under the Universal Permissive License (UPL), Version 1.0.

See [LICENSE](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/blob/main/LICENSE.txt) for more details.

## About

ORACLE ENTERPRISE LANDING ZONE


### Resources

[Readme](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#readme-ov-file)

### License

[UPL-1.0 license](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#UPL-1.0-1-ov-file)

### Contributing

[Contributing](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#contributing-ov-file)

### Security policy

[Security policy](https://github.com/oci-landing-zones/oracle-enterprise-landingzone#security-ov-file)

### Uh oh!

There was an error while loading. [Please reload this page](https://github.com/oci-landing-zones/oracle-enterprise-landingzone).

[Activity](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/activity)

[Custom properties](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/custom-properties)

### Stars

[**36**\\
stars](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/stargazers)

### Watchers

[**10**\\
watching](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/watchers)

### Forks

[**48**\\
forks](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/forks)

[Report repository](https://github.com/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2Foci-landing-zones%2Foracle-enterprise-landingzone&report=oci-landing-zones+%28user%29)

## [Releases\  8](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/releases)

[v2.3.1\\
Latest\\
\\
on Feb 29, 2024Feb 29, 2024](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/releases/tag/v2.3.1)

[\+ 7 releases](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/releases)

## [Packages\  0](https://github.com/orgs/oci-landing-zones/packages?repo_name=oracle-enterprise-landingzone)

No packages published

### Uh oh!

There was an error while loading. [Please reload this page](https://github.com/oci-landing-zones/oracle-enterprise-landingzone).

## [Contributors\  12](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/graphs/contributors)

- [![@JSAhlawat](https://avatars.githubusercontent.com/u/123586410?s=64&v=4)](https://github.com/JSAhlawat)
- [![@yupeiyang-oci](https://avatars.githubusercontent.com/u/83093274?s=64&v=4)](https://github.com/yupeiyang-oci)
- [![@VinayKumar611](https://avatars.githubusercontent.com/u/2154456?s=64&v=4)](https://github.com/VinayKumar611)
- [![@rrywhen](https://avatars.githubusercontent.com/u/21975344?s=64&v=4)](https://github.com/rrywhen)
- [![@shams-sde](https://avatars.githubusercontent.com/u/13260227?s=64&v=4)](https://github.com/shams-sde)
- [![@DragonDM](https://avatars.githubusercontent.com/u/792051?s=64&v=4)](https://github.com/DragonDM)
- [![@jason-chong](https://avatars.githubusercontent.com/u/36511243?s=64&v=4)](https://github.com/jason-chong)
- [![@gmackeig](https://avatars.githubusercontent.com/u/158527339?s=64&v=4)](https://github.com/gmackeig)
- [![@sivachunduru](https://avatars.githubusercontent.com/u/12733420?s=64&v=4)](https://github.com/sivachunduru)
- [![@LesiaChaban](https://avatars.githubusercontent.com/u/108222930?s=64&v=4)](https://github.com/LesiaChaban)
- [![@niya-ma-1](https://avatars.githubusercontent.com/u/78030299?s=64&v=4)](https://github.com/niya-ma-1)
- [![@cpoczatek](https://avatars.githubusercontent.com/u/14008252?s=64&v=4)](https://github.com/cpoczatek)

## Languages

- [HCL91.7%](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/search?l=hcl)
- [Python7.9%](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/search?l=python)
- [Shell0.4%](https://github.com/oci-landing-zones/oracle-enterprise-landingzone/search?l=shell)

You can’t perform that action at this time.
[Facebook](https://www.facebook.com/mycloudwiki "Facebook")[Flickr](https://www.flickr.com/groups/mycloudwiki/ "Flickr")[Instagram](https://www.instagram.com/mycloudwiki/ "Instagram")[Linkedin](https://www.linkedin.com/company/mycloudwiki?trk=public_post_follow-view-profile "Linkedin")[Pinterest](https://www.pinterest.com/mycloudwiki/ "Pinterest")[Twitter](https://twitter.com/mycloudwiki "Twitter")

Sign in

- [Home](https://mycloudwiki.com/)
- [Cloud Computing](https://mycloudwiki.com/cloud-computing-basics/)
- [Storage](https://mycloudwiki.com/storage-basics-and-fundamentals/)
- [Contact Us](https://mycloudwiki.com/contact/)

Sign in

Welcome!Log into your account

your username

your password

[Forgot your password?](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)

[Privacy Policy](https://mycloudwiki.com/privacy-policy/)

[Back](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)

Password recovery

Recover your password

your email

Search

[![Mycloudwiki](https://mycloudwiki.com/wp-content/uploads/2020/01/footer-logo.png)MycloudwikiLearn & Share](https://mycloudwiki.com/)

[![Mycloudwiki](https://mycloudwiki.com/wp-content/uploads/2019/12/mycloudwiki_logo.png)MycloudwikiLearn & Share](https://mycloudwiki.com/)

- [Home](https://mycloudwiki.com/)
- [Cloud Computing](https://mycloudwiki.com/cloud-computing-basics/)
- [Storage](https://mycloudwiki.com/storage-basics-and-fundamentals/)
- [Contact Us](https://mycloudwiki.com/contact/)

Search

[Search](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)

- [Home](https://mycloudwiki.com/)
- [Cloud Computing](https://mycloudwiki.com/cloud-computing-basics/)
- [Storage](https://mycloudwiki.com/storage-basics-and-fundamentals/)
- [Contact Us](https://mycloudwiki.com/contact/)

Search

[Search](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)

Advertisement

### Follow Us

Facebook

[![](https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-1/356902241_691398113003050_5848949095059701917_n.png?stp=cp0_dst-png_s50x50&_nc_cat=100&ccb=1-7&_nc_sid=f907e8&_nc_ohc=kn7JizG1f48Q7kNvwHKo2VY&_nc_oc=AdnJrl0W1uGbFWczlsD82UTVFFMLcuSdtBj40AzslFOA2V5enrnncxcXSl0uE8tL_ic&_nc_zt=24&_nc_ht=scontent-lax3-2.xx&edm=AHodUMQEAAAA&_nc_gid=gfqblBNFHoOKG3fYtIXAqA&oh=00_AfrtrqYA8BkEewHJG3pYl5mBtR4qAgy6kLc4GNWTpL5ioA&oe=697FC04B)](https://www.facebook.com/301271626665760?ref=embed_page)

[Cloud Computing Tutorials](https://www.facebook.com/301271626665760?ref=embed_page "Cloud Computing Tutorials")

1,200 followers

[Follow Page](https://www.facebook.com/301271626665760?ref=embed_page "") [Followed](https://www.facebook.com/301271626665760?ref=embed_page "")

[Share](https://www.facebook.com/sharer/sharer.php?app_id=197244590328141&u=https%3A%2F%2Fwww.facebook.com%2F301271626665760&display=popup&ref=embed_page&src=page)

### Basic & Fundamentals

[Cloud Infrastructure Performance Tuning -Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/cloud-performance-tuning-basics/ "Cloud Infrastructure Performance Tuning -Basics and Fundamentals")

### [Cloud Infrastructure Performance Tuning -Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/cloud-performance-tuning-basics/ "Cloud Infrastructure Performance Tuning -Basics and Fundamentals")

[Fundamentals](https://mycloudwiki.com/category/cloud/fundamentals/)

[The Ultimate Cloud Computing Guide for Engineers & Architects](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/ "The Ultimate Cloud Computing Guide for Engineers & Architects")

### [The Ultimate Cloud Computing Guide for Engineers & Architects](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/ "The Ultimate Cloud Computing Guide for Engineers & Architects")

[Cloud Computing](https://mycloudwiki.com/category/cloud/)

[Cloud Computing Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/introduction-to-cloud-computing/ "Cloud Computing Basics and Fundamentals")

### [Cloud Computing Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/introduction-to-cloud-computing/ "Cloud Computing Basics and Fundamentals")

[Cloud Computing](https://mycloudwiki.com/category/cloud/)

[Cloud Computing Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/introduction-to-cloud-computing/ "Cloud Computing Basics and Fundamentals")

### [Cloud Computing Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/introduction-to-cloud-computing/ "Cloud Computing Basics and Fundamentals")

[Cloud Computing](https://mycloudwiki.com/category/cloud/)

[The Ultimate Cloud Computing Guide for Engineers & Architects](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/ "The Ultimate Cloud Computing Guide for Engineers & Architects")

### [The Ultimate Cloud Computing Guide for Engineers & Architects](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/ "The Ultimate Cloud Computing Guide for Engineers & Architects")

[Cloud Computing](https://mycloudwiki.com/category/cloud/)

Advertisement

### Recent Posts

[AWS Global Infrastructure and Account Governance](https://mycloudwiki.com/aws/aws-global-infrastructure-and-account-governance/ "AWS Global Infrastructure and Account Governance")

### [AWS Global Infrastructure and Account Governance](https://mycloudwiki.com/aws/aws-global-infrastructure-and-account-governance/ "AWS Global Infrastructure and Account Governance")

[Amazon Web Services](https://mycloudwiki.com/category/aws/)

[The comprehensive guide on Global Cloud architectures and governance](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/ "The comprehensive guide on Global Cloud architectures and governance")

### [The comprehensive guide on Global Cloud architectures and governance](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/ "The comprehensive guide on Global Cloud architectures and governance")

[Cloud Computing](https://mycloudwiki.com/category/cloud/)

[The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/ "The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers")

### [The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/ "The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers")

[Cloud Landing Zone](https://mycloudwiki.com/category/cloud-landing-zone/)

Advertisement

[The complete guide on Oracle Cloud Landing zone architecture](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/ "The complete guide on Oracle Cloud Landing zone architecture")

### [The complete guide on Oracle Cloud Landing zone architecture](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/ "The complete guide on Oracle Cloud Landing zone architecture")

[Cloud Landing Zone](https://mycloudwiki.com/category/cloud-landing-zone/)

[Complete guide on Google Cloud (GCP) Landing zone architecture](https://mycloudwiki.com/cloud-landing-zone/google-cloud/complete-guide-on-gcp-landing-zones/ "Complete guide on Google Cloud (GCP) Landing zone architecture")

### [Complete guide on Google Cloud (GCP) Landing zone architecture](https://mycloudwiki.com/cloud-landing-zone/google-cloud/complete-guide-on-gcp-landing-zones/ "Complete guide on Google Cloud (GCP) Landing zone architecture")

[Cloud Landing Zone](https://mycloudwiki.com/category/cloud-landing-zone/)

[The complete guide on Azure Landing Zone Architecture](https://mycloudwiki.com/cloud-landing-zone/complete-guide-azure-landing-zone-architecture/ "The complete guide on Azure Landing Zone Architecture")

### [The complete guide on Azure Landing Zone Architecture](https://mycloudwiki.com/cloud-landing-zone/complete-guide-azure-landing-zone-architecture/ "The complete guide on Azure Landing Zone Architecture")

[Cloud Landing Zone](https://mycloudwiki.com/category/cloud-landing-zone/)

[Load more](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)

Advertisement

#### Most Read

### [Virtualization Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/virtualization-hypervisor-basics/ "Virtualization Basics and Fundamentals")

Virtualization is the process or a technique which can create a virtual version of IT datacenter components such as Compute, storage and network etc....

### [AWS Certified Solutions Architect Associate (SAA02) – Free Practice Tests](https://mycloudwiki.com/certifications/aws-architect-associate-practice-test/ "AWS Certified Solutions Architect Associate (SAA02) – Free Practice Tests")

This AWS practice test helps you to pass the following AWS exams and can also helps you to revise the AWS concepts if you...

### [Cloud Computing Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/introduction-to-cloud-computing/ "Cloud Computing Basics and Fundamentals")

In this first post, we learn the fundamental basics of Cloud Computing, cloud characteristics and its advantages, different cloud implementation models, major cloud services...

### [Network Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/network-basics/ "Network Basics and Fundamentals")

A Network is basically connecting two or more devices though a wired or wireless channel to share & exchange the information electronically. These devices...

### [Cloud Infrastructure Performance Tuning -Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/cloud-performance-tuning-basics/ "Cloud Infrastructure Performance Tuning -Basics and Fundamentals")

Applications in cloud environment may need to be tuned for the performance over the time and to meet the continuous changes in the user...

### [Basic concepts of Cloud Configurations and Cloud Deployments](https://mycloudwiki.com/cloud/fundamentals/successful-cloud-deployments-basics/ "Basic concepts of Cloud Configurations and Cloud Deployments")

A successful cloud deployment requires proper planning and determining the right cloud configurations and then executing the plan as it is. But to create...

### [Security Basics and Fundamentals](https://mycloudwiki.com/cloud/fundamentals/security-basics/ "Security Basics and Fundamentals")

Security is the important strategy which is to be planned and implemented across all infrastructure layers to secure the IT infrastructure and the information...

[Load more](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)

# The complete guide on Oracle Cloud Landing zone architecture

Learn how a Landing Zone simplifies governance, enhances security, and optimizes your Oracle cloud environment for efficiency and future growth

[Cloud Landing Zone](https://mycloudwiki.com/category/cloud-landing-zone/) [Oracle Cloud](https://mycloudwiki.com/category/cloud-landing-zone/oracle-cloud/)

[Home](https://mycloudwiki.com/ "")[Cloud Landing Zone](https://mycloudwiki.com/category/cloud-landing-zone/ "View all posts in Cloud Landing Zone")The complete guide on Oracle Cloud Landing zone architecture

[![Anil K Y Ommi](https://secure.gravatar.com/avatar/6a630acf8d69913a7513b2890e1b247f?s=96&r=g)](https://mycloudwiki.com/author/anilkyommi/ "Anil K Y Ommi")

[Anil K Y Ommi](https://mycloudwiki.com/author/anilkyommi/)

29 min.read

In today’s rapidly evolving business landscape, cloud computing has become a cornerstone of digital transformation. Oracle Cloud Infrastructure (OCI) stands out as a robust and versatile platform to empower organizations in this journey. However, the success of cloud adoption hinges on a well-architected foundation. This is where Oracle Cloud Landing Zones (OCLZs) come into play, serving as a crucial enabler for a seamless and secure cloud experience.

Advertisement

In this comprehensive guide, we’ll delve into the intricacies of OELZs, with a particular focus on the enhanced capabilities of Oracle Enterprise Landing Zone v2 (OELZ v2). Whether you’re a seasoned cloud architect or a budding cloud engineer, this blog post will equip you with the knowledge and insights needed to architect, deploy, and manage a successful cloud environment on OCI.

Read: [What is a cloud Landing zone and why it is important.](https://mycloudwiki.com/cloud/introduction-to-cloud-landing-zone/)

We’ll explore the evolution of OELZs, highlighting the key differences between OELZ v1 and the more advanced OELZ v2. You’ll gain a deep understanding of OELZ v2’s modular architecture, its comprehensive security features, and the streamlined user experience it offers. We’ll also provide step-by-step guidance on deploying OELZ v2 using Terraform CLI and Resource Manager, along with best practices for multi-cloud integration and advanced configurations.

## **1\. Oracle Cloud Landing Zones (OCLZs) Introduction**

In essence, a Cloud Landing Zone is a pre-provisioned, secure, and scalable environment within a cloud platform that acts as a starting point for your cloud deployments. It establishes a standardized framework with predefined configurations, security controls, and governance mechanisms. Oracle Cloud Landing Zones (OCLZs) take this concept further by providing a structured approach to onboarding workloads onto OCI, ensuring consistency, compliance, and adherence to best practices across your entire cloud estate.

**Why are Oracle Cloud Landing Zones Essential?**

Investing in a well-designed OCLZ can significantly impact your organization’s cloud journey. Here’s why they are essential:

Read: [The complete guide on AWS Landing Zone Architecture](https://mycloudwiki.com/cloud-landing-zone/the-complete-guide-on-aws-landing-zone-architecture/)

- **Accelerated Time-to-Value:** OCLZs streamline the onboarding process, enabling you to deploy workloads faster and realize the benefits of your cloud investments sooner. By automating provisioning and configuration tasks, OCLZs eliminate manual effort and reduce the time it takes to set up new environments.
- **Enhanced Security and Compliance:** OCLZs incorporate industry-leading security best practices, such as network segmentation, encryption, and identity and access management (IAM). These measures safeguard your critical data and applications, ensuring they are protected from unauthorized access and potential threats. Additionally, OCLZs help you meet regulatory compliance requirements, giving you peace of mind regarding data security and privacy.
- **Operational Efficiency:** OCLZs automate repetitive tasks, minimize manual errors, and enable centralized management of your cloud resources. This frees up your IT teams from mundane operational activities, allowing them to focus on strategic initiatives that drive innovation and business growth.
- **Cost Optimization:** By implementing resource tagging, budgets, and usage reports, OCLZs provide transparency into your cloud spending. You can easily track and analyze your cloud costs, identify areas for optimization, and make informed decisions to control expenses.

## 2\. **Oracle Cloud Landing Zones (OELZ) v1 and OELZ v2: Differences**

Oracle Enterprise Landing Zone (OELZ) has evolved significantly from v1 to v2, offering a more robust and adaptable foundation for your cloud deployments on Oracle Cloud Infrastructure (OCI). Here’s a breakdown of the key differences between the two versions.

| Feature | OELZ v1 | OELZ v2 |
| :-- | :-- | :-- |
| **Design Philosophy** | Monolithic | Modular |
| **Security** | Basic controls | Enhanced controls, CIS Benchmark Level 1 support |
| **Identity Mgmt** | Basic IAM integration | Enhanced IAM with OCI Identity Domains |
| **Access Control** | Role-based access control (RBAC) | Granular RBAC, Attribute-based access control (ABAC) |
| **User Experience** | Less flexible, steeper learning curve | Simplified deployment, improved user inter |

##### **Design Philosophy: Modular vs. Monolithic**

- **OELZ v1:** Followed a monolithic architecture where all components were tightly integrated. This made it less flexible for customization and scaling.
- **OELZ v2:** Introduces a modular design. Components like networking, security, and identity are decoupled, allowing you to select and deploy only the modules you need. This modularity enhances scalability, flexibility, and ease of maintenance.

##### **New Features in OELZ v2**

- **Enhanced Security:**
  - CIS Benchmark Level 1 Support: OELZ v2 includes out-of-the-box support for CIS benchmarks, ensuring a strong security foundation.
  - Security Zones: Provide an additional layer of isolation and protection for sensitive workloads.
  - Data Safe: Integrates with Data Safe for comprehensive data discovery, classification, and security assessment.
- **Enhanced Identity Management:**
  - OCI Identity Domains: Replaces the previous Oracle Identity Cloud Service (IDCS) integration. Offers more granular control over identity and access management within your OCI tenancy.
  - Federation: Enables seamless integration with external identity providers like Microsoft Active Directory or Okta.
- **Enhanced Access Control:**
  - Attribute-Based Access Control (ABAC): Allows for more fine-grained access control based on attributes like resource tags or user attributes, beyond just roles.

###### **Overall User Experience Improvements**

- **Simplified Deployment:** OELZ v2 leverages Terraform modules for streamlined and automated deployment, making it easier to set up and manage your landing zone.
- **Improved User Interface:** The OCI console has been enhanced with a dedicated OELZ dashboard, providing better visibility into your landing zone’s configuration and status.
- **Comprehensive Documentation:** OELZ v2 boasts significantly improved documentation, making it easier for users to understand and implement the framework.

##### **Which Version Should You Choose?**

If you are starting fresh, OELZ v2 is the clear winner. Its modular design, enhanced security, improved identity management, and superior user experience make it the ideal choice for building a modern and scalable cloud foundation on OCI.

Read: [GenAI basics and fundamentals](https://mycloudwiki.com/cloud/generative-ai-basics-and-fundamentals/)

However, if you are already using OELZ v1, transitioning to v2 requires careful planning and consideration. Oracle provides migration guidance to help you make the switch.

## **3\. Oracle Enterprise Landing Zone v2 (OELZ v2) Overview:**

Oracle Enterprise Landing Zone v2 (OELZ v2) is a modernized framework built on a modular design to easily scale alongside your growing environment. It leverages Terraform modules to simplify the setup of a secure, multi-account infrastructure within Oracle Cloud Infrastructure (OCI).

**Key Uses:**

- **Multi-Cloud Integration:** Easily connect OCI with other cloud platforms like Microsoft Azure, establishing a hybrid cloud environment. This allows organizations to leverage the strengths of different cloud providers, optimize costs, and avoid vendor lock-in.
- **Robust Governance & Compliance:** Leverage pre-configured policies and guardrails to ensure your OCI setup aligns with industry standards like ISO27001 and PCI DSS. OELZ v2 also includes features to help you meet other compliance standards, ensuring that your cloud environment adheres to industry best practices and regulatory requirements.
- **Effortless Scaling:** Automate the provisioning of new accounts, users, and resources, allowing your OCI infrastructure to expand in line with your organization’s growth. For example, OELZ v2 can automatically create new virtual machines or storage volumes as needed to accommodate increased demand.

**Main Goals:**

- Minimize the time and effort required for setup and deployment.
- Provide a solid architectural foundation for your OCI environment.
- Offer the flexibility to customize and adapt the implementation to suit your organization’s unique needs.

**Key Design Principles**

OELZ v2 is designed with the following key principles:

- **Modularity:** OELZ v2 is built with a modular architecture, enabling you to deploy only the components necessary for your specific use case. This enhances flexibility and simplifies customization, making it easier to scale your environment as your needs grow.
- **Hub-and-Spoke Architecture:** This architecture enhances security and isolation by separating environments into distinct “spokes” (workloads) connected to a central “hub” (shared services). This promotes better organization and granular control over resources.
- **Security First:** OELZ v2 prioritizes security by incorporating industry best practices and standards, such as CIS Benchmarks. Features like network segmentation, identity and access management (IAM), and data encryption protect your resources from unauthorized access and potential threats.
- **Automation through Infrastructure as Code (IaC):** OELZ v2 utilizes Terraform to automate infrastructure provisioning and management. This ensures consistency, reproducibility, and reduces the risk of human error, streamlining your cloud operations and making them more efficient.

Read: [Quick guide to Google Cloud Platform Landing Zone](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-gcp-landing-zones/)

These core principles guide the design and implementation of OELZ v2, making it a robust and flexible framework for building secure and scalable cloud environments on Oracle Cloud Infrastructure (OCI).

## **4\. Oracle Enterprise Landing Zone v2 (OELZ v2) Architecture**

Oracle Enterprise Landing Zone v2 (OELZ v2) is a comprehensive framework designed to streamline and secure your cloud environment on Oracle Cloud Infrastructure (OCI). It offers a modular approach, allowing you to select and deploy only the components you need, making it adaptable to your specific requirements.

The architecture revolves around a hub-and-spoke model, where a central “hub” network houses shared services like identity and access management (IAM), logging, and monitoring. Individual “spokes” represent isolated environments for your workloads, enhancing security and control.

[![Oracle Cloud Landing Zone reference architecture](https://mycloudwiki.com/wp-content/uploads/2024/05/oelzv2-892x1024.png)](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/attachment/oelzv2/)

##### **Key Components**

OELZ v2 encompasses several key components that work together to provide a secure and scalable cloud foundation:

- **Compartments:** Logical containers used to organize and isolate your resources, simplifying management and access control.
- **Tags:** Metadata assigned to resources for efficient organization, filtering, and cost tracking.
- **Budgets and Alerts:** Tools for setting spending limits and receiving notifications when usage approaches or exceeds those limits.
- **Oracle Cloud Infrastructure Identity and Access Management (IAM):** A service for controlling access to your cloud resources, ensuring that only authorized users and groups can perform actions.
- **Networking and Connectivity:** Establishes a virtual cloud network (VCN), subnets, and other networking resources required for your workloads to communicate with each other and the internet.
- **Security:** Enables a strong security posture by integrating OCI security services like Oracle Cloud Guard (for threat detection), OCI Vulnerability Scanning, and OCI Bastion (for secure administrative access).

##### **a. Network and Connectivity: The Hub-and-Spoke Model**

The hub-and-spoke architecture is a fundamental aspect of OELZ v2, offering several advantages:

- **Isolation:** Each spoke operates as an independent compartment, providing an extra layer of security and isolation for your workloads.
- **Scalability:** You can easily add or remove spokes to accommodate changing needs or support different teams or projects.
- **Simplified Networking:** The hub acts as a central point for network traffic, streamlining the overall architecture and enhancing security.
- **Efficient Resource Management:** Each spoke can be managed independently, allowing for better resource allocation and utilization.
- **Cost Optimization:** Centralizing resources like VPN gateways and load balancers in the hub can lead to cost savings.
- **Effective Governance:** The central hub simplifies the application of governance rules and policies across your entire infrastructure, providing a clear view of resources and activities.

##### **b. Monitoring and Logging**

OELZ v2 includes robust monitoring and logging capabilities, crucial for maintaining the health, performance, and security of your OCI environment. These tools help you track resource utilization, detect anomalies, and troubleshoot issues.

##### **c. Multi-Environment Support**

OELZ v2 supports multiple environments, such as production and non-production, each isolated with separate identity domains, hub-and-spoke networks, Cloud Guard configurations, and logging setups.

##### **d. Identity and Access Management**

OELZ v2 leverages OCI Identity and Access Management (IAM) for granular control over who can access your cloud resources and what actions they can perform. It also supports federation with Microsoft Active Directory for seamless integration with existing identity systems.

##### **e. Compliance**

OELZ v2 incorporates a set of pre-built policies and guardrails that help you establish a strong security foundation and work towards compliance with industry standards like CIS 1.2 Level 1. These security controls provide a baseline for protecting your data and applications in the cloud.

## **5\. Oracle Enterprise Landing Zone v2 (OELZ v2) Functional Modules**

To delve deeper into the inner workings of OELZ v2, let’s explore its modular architecture and the specific functions each module performs. These individual modules act as the building blocks of your OCI landing zone, providing a granular approach to customization and management. From establishing the structural hierarchy to ensuring robust security and monitoring, each module plays a vital role in the overall efficiency and effectiveness of your cloud environment. Here is the summary table explaining the primary function of these modules.

Read: [8 design principles to build robust cloud architecture designs](https://mycloudwiki.com/cloud/design-principles-to-build-robust-cloud-solutions/)

| Module | Primary Function |
| :-- | :-- |
| Landing Zone | Orchestrates the entire landing zone creation process. |
| Environment | Aggregates other modules to form a single, isolated environment. |
| Compartments | Creates a structured hierarchy of compartments within an environment. |
| Budget and Tagging | Provides tools for cost management and governance. |
| Identity | Creates and configures an identity domain within an environment. |
| Network | Establishes the network architecture with a hub-and-spoke design. |
| Security | Implements security best practices and services. |
| Monitoring | Enables monitoring of the health and performance of the environment. |
| Logging | Captures and manages log data from various sources. |
| Workload | Simplifies the deployment of resources for new workloads. |

##### **a. OELZ v2 Landing Zone Module**

This module orchestrates the entire landing zone creation process. It invokes the Environment module twice to establish two isolated environments (production and non-production) and creates the parent compartment for the landing zone.

##### **b. Environment Module**

The Environment module aggregates other modules to form a single, isolated environment within the landing zone. It doesn’t create resources itself, but instead combines the functionalities of the following modules:

- Compartments module
- Budget and Tagging module
- Identity module
- Network module
- Security module
- Monitoring module
- Logging module

##### **c. Compartments Module**

This module creates a structured hierarchy of compartments within a single environment in OELZ v2. Compartments are fundamental building blocks in OCI, serving as logical containers for organizing and isolating your cloud resources. This isolation enhances security by allowing you to define granular access controls at the compartment level. The module creates a hierarchy of compartments, including:

- L2 – Environment: The top-level compartment encapsulating the entire environment.
- L3 – Shared Infrastructure: Contains resources shared across the environment.
- L4 – Network: Houses the hub component of the network architecture.
- L4 – Security: Contains security and identity-related components.
- L3 – Workload: Holds spoke compartments, each representing a separate workload or application.
- L3 – Logging: Stores log files generated within the environment.
- L3 – Backup: Contains configuration and state files for backup purposes.

[![Oracle Landing Zone Functional Modules](https://mycloudwiki.com/wp-content/uploads/2024/05/Screenshot-2024-05-22-at-9.29.49-PM-1024x566.png)](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/attachment/screenshot-2024-05-22-at-9-29-49-pm/)

By creating this compartment structure, OELZ v2 establishes a foundation for efficient resource management, access control, and security isolation.

##### **d. Budget and Tagging Module**

This module is optional and focuses on cost management and governance within OELZ v2. It provides tools to help you track and control your cloud spending.

- **Budget Module:** Allows you to set budgets for each environment at the L2-Environment compartment level. You can receive alerts when your spending approaches or exceeds these limits, helping you avoid unexpected costs.
- **Tagging Module:** Enables you to assign metadata (tags) to your cloud resources, such as their purpose, owner, or environment. Tags help you organize, manage, and track costs associated with your resources. OELZ v2 creates a tag namespace per environment in the L2-Environment compartment, with default tags for Environment, Cost Center, and Geo Location.

By utilizing budgeting and tagging, you can gain better visibility into your cloud costs, optimize resource utilization, and ensure adherence to your organization’s financial policies.

##### **e. Identity Module**

The Identity module is responsible for creating and configuring an identity domain within an environment in the landing zone. It establishes user groups with specific permissions to access and manage different types of resources. These groups include:

- Network Admin: Access to network resources.
- SecOps Admin: Access to security-related resources.
- Identity Admin: Manages identity-related resources.
- Platform Admin: Access to usage reports and budget management.
- Ops Admin: Access to metrics, events, and alerts.
- Log Admin: Access to log data.

By defining these groups and their associated policies, OELZ v2 ensures that only authorized personnel can perform actions on specific resources, adhering to the principle of least privilege and enhancing security.

##### **f. Monitoring Module**

The Monitoring module enables you to monitor the health and performance of your OELZ v2 environment. It leverages OCI services to collect metrics and events, which can be used to create alerts and dashboards.

Key features of the Monitoring module include:

- **Alert Channels:** Create notification topics (e.g., PRD-Network-Critical, NPRD-Security-Warning) and subscriptions (e.g., email) to receive alerts about specific events or conditions.
- **OCI Service Incidents:** Subscribe to console announcements to stay informed about OCI service incidents and required actions.
- **Cloud Guard and Vulnerability Scanning:** Monitor the status of Cloud Guard and Vulnerability Scanning to detect security threats and vulnerabilities.
- **Metrics-Based Monitoring:** Enable monitoring of Network, Security, Logging, and Workload compartments by creating alarm rules for service metrics.
- **OCI Logging Analytics:** Enable Logging Analytics for reporting and analysis through Log Explorer and Dashboards.

The Monitoring module provides a comprehensive view of your OELZ v2 environment, allowing you to proactively identify and address issues, optimize performance, and ensure the security and compliance of your cloud resources.

##### **g. Network Module**

The Network module is the backbone of OELZ v2, establishing the network architecture with a hub-and-spoke design. This design enhances security by isolating workloads within separate “spoke” VCNs while centralizing shared services in the “hub” VCN.

Key features include:

- **Hub VCN:** Contains public and private subnets for internet-facing resources and shared services. It also includes a Dynamic Routing Gateway (DRG) for connectivity to spokes and optional components like an internet gateway, NAT gateway, and service gateway.
- **Spoke VCNs:** Each spoke is an isolated VCN for specific workloads, connected to the hub via VCN attachments. Spokes can have their own NAT and service gateways.
- **VCN Peering:** Enables private communication between VCNs without traversing the internet.
- **Network Extension Module:** Optionally deploy Site-to-Site VPNs in each environment or share a FastConnect circuit between environments.

##### **h. Security Module**

The Security module prioritizes the protection of your OCI environment by implementing security best practices and services. It aligns with Oracle’s security-first cloud strategy, emphasizing simplicity, guidance, integration, automation, and cost-effectiveness.

Key features include:

- **Cloud Guard:** Monitors for threats and misconfigurations, providing alerts and remediation guidance.
- **Vulnerability Scanning:** Scans hosts, open ports, and container images for vulnerabilities.
- **Vault (Key Management):** Securely stores and manages encryption keys and secrets for OCI resources and logs.
- **Bastion:** Provides restricted and time-limited access to private resources without public endpoints.
- **Network Firewall:** Offers visibility and control over traffic entering and within your cloud environment.

##### **i. Logging Module**

The Logging module is responsible for capturing and managing log data from various sources within your OELZ v2 environment. It centralizes logs, making them easily accessible for analysis, troubleshooting, and security monitoring. The module can be configured to collect logs from OCI services, custom applications, and other sources.

##### **j. Workload Module**

The Workload Expansion module simplifies the deployment of resources for new workloads within the OELZ v2 framework. It creates a dedicated compartment for the workload, sets up the network spoke, and configures logging and monitoring.

Key features include:

- **Compartment:** A dedicated compartment for the workload within the L3 – Workload compartment.
- **Network (Spoke):** A VCN with private subnets for different application tiers (Web, App, DB), connected to the hub DRG.
- **Logging:** Captures logs from the workload expansion.
- **Monitoring:** Sets up monitoring and alerting for the workload resources.
- **Policies and Workload Group:** Creates admin groups with specific permissions for managing the workload resources **.**

## **6\. Deploying Oracle Enterprise Landing Zone v2 (OELZ v2)**

OELZ v2 can be deployed whether you have existing infrastructure in OCI or are starting from scratch. If you have existing infrastructure, it is recommended to create a new child tenancy (a separate, isolated environment within your main OCI tenancy) to avoid conflicts. Child tenancies have their own resource limits, so ensure they meet the requirements for deploying OELZ v2.

You can deploy OELZ v2 using either Oracle Resource Manager or Terraform CLI. Below are the high-level steps, but it is advised to check the OELZ v2 deployment documentation for the latest detailed steps.

##### **Deploying with Terraform CLI**

1. **Install Terraform:** Ensure you have Terraform 1.0.0 or later installed.
2. **Set up API Keys:** Follow instructions to obtain the required keys and OCIDs for your OCI account.
3. **Clone the Template:** Clone the Terraform template from the GitHub page.
4. **Initialize the Working Directory:** Navigate to the cloned directory and run `terraform init` to initialize the Terraform working directory.
5. **Create and Populate terraform.tfvars:** Create this file in the cloned directory and fill in the required variables. Refer to the OELZ v2 Configuration and Input Variables Reference in the README for guidance.
6. **Run Terraform Commands:** Execute `terraform plan` to review the planned changes, and then `terraform apply` to deploy OELZ v2.

##### **Deploying with Resource Manager**

1. **Navigate to Resource Manager:** Go to **Developer Services** -\> **Resource Manager** -\> **Stacks** in the OCI console.
2. **Create Stack:** Choose the compartment and select “Create stack.”
3. **Select Source:** Choose “Source code control system” for the Terraform source.
4. **Configure Stack:** Select GitHub as the source, the `oci-landing-zones` repository, `main` branch, and `templates/enterprise-landing-zone` as the working directory. Choose the appropriate Terraform version.
5. **Enter Variable Values:** Provide values for variables as prompted. Refer to the OELZ v2 Configuration and Input Variables Reference.
6. **Review and Create:** Review the stack values and click “Next” to create.
7. **Manage Stack:** Use the buttons on the Stack page to plan, apply, or destroy your stack.

##### **Tearing Down an OELZ v2 Stack**

Due to dependencies, tearing down an OELZ v2 stack requires a manual process:

1. **Clean Up Resources:**
   - Delete retention rules and objects in audit, default, service event, and archive buckets.
   - Deactivate and delete identity domains for each environment.
   - Delete vaults and keys (consider the 7-day waiting period for vault deletion).
   - Purge logs in Logging Analytics and optionally delete the group.
2. **Delete with Terraform:** After manual cleanup, use Terraform to delete the remaining OELZ v2 resources.

Remember to consult the official OELZ v2 documentation for detailed instructions and troubleshooting. The steps might change as Oracle develops new process.

## **7\. Oracle Multicloud Design Choices**

If you’re using Oracle Database and considering Microsoft Azure for your cloud needs, Oracle offers several ways to integrate the two seamlessly. This gives you the flexibility to leverage Oracle’s powerful database technology within Azure’s cloud environment.

Read: [Azure Cloud Landing zone architecture](https://mycloudwiki.com/cloud-landing-zone/complete-guide-azure-landing-zone-architecture/)

Here are the three main options Oracle provides:

- **Oracle Database@Azure:** This lets you create and manage Oracle Databases directly within Azure. Azure handles the billing, and most support comes from Azure, with Oracle helping with database-specific questions. This option simplifies the deployment process and allows organizations to leverage Azure’s familiar tools and services while benefiting from the performance and reliability of Oracle Database.
- **Cross-cloud connection to Azure:** This is a direct, private link between Oracle’s cloud and Azure. It’s faster and more secure than using the public internet for transferring data between the two. You can establish this connection using options like ExpressRoute or VPN, depending on your specific requirements for speed, security, and reliability.
- **Oracle Database Service for Azure:** This is a fully managed service where Oracle handles everything – the setup, maintenance, and updates of your Oracle Databases. You use an interface similar to Azure’s to manage your databases. This option is ideal for organizations that lack the in-house expertise to manage Oracle Databases or that want to focus on their core business rather than database administration. It’s particularly beneficial for use cases like development and testing environments, where ease of setup and management is a priority.

**Which to Choose?**

The best option for you depends on your needs:

- **Oracle Database@Azure:** Good for those who want to use Oracle Database within Azure and prefer Azure’s billing and support system.
- **Cross-cloud connection to Azure:** Ideal if you need a fast, secure way to connect applications and data between Oracle’s cloud and Azure.
- **Oracle Database Service for Azure:** Best for those who want a hassle-free experience where Oracle takes care of the technical details.

## **8\. Advanced OELZ Configurations: Extending the Foundation**

Oracle Enterprise Landing Zone v2 (OELZ v2) provides a robust foundation for deploying and managing workloads on Oracle Cloud Infrastructure (OCI). However, for complex deployments or specific organizational needs, advanced configurations can be implemented to further customize and extend OELZ v2 functionalities. Here’s an exploration of some advanced OELZ configurations:

1. ##### **Workload Expansion Templates:**


OELZ v2 comes with pre-built Terraform modules for core functionalities. Workload expansion templates offer additional pre-configured modules for specific workload types, such as:


   - **Containerized Applications:** Modules for deploying Kubernetes clusters and container registries.
   - **Big Data Workloads:** Configurations for deploying and managing Apache Hadoop or Oracle Big Data Service.
   - **High Availability (HA) Deployments:** Modules for setting up redundant resources for critical applications.

These templates expedite deployment by providing pre-defined configurations for specific workloads.

2. ##### **Exadata Expansion for High-Performance Computing:**


For deployments requiring high-performance computing capabilities, OELZ v2 can be extended to integrate Oracle Exadata Cloud Service. Exadata offers a fully managed, high-performance platform optimized for running data warehouse, analytics, and high-performance computing workloads. OELZ v2 can be configured to provision and manage Exadata resources alongside other OCI resources within a compartment, ensuring consistent security and governance controls.

3. ##### **Advanced Security Configurations:**


While OELZ v2 offers pre-built security policies, advanced configurations might be needed to address specific security requirements. This could involve:
   - Implementing additional security zones within compartments for heightened segregation of duties and data sensitivity.
   - Configuring more granular IAM policies and access controls based on the principle of least privilege.
   - Integrating OELZ with advanced security solutions like Oracle Cloud Guard for continuous threat detection and automated remediation.
4. ##### **Federation with External Identity Providers:**


OELZ v2 primarily uses OCI IAM for user authentication and authorization. However, for organizations with existing identity providers (IdPs) like Active Directory (AD), federation can be implemented. This allows users to access OCI resources using their existing AD credentials, simplifying user management and reducing the need for separate OCI accounts.

5. ##### **Multi-Region Deployments:**


OELZ v2 deployments are typically designed for a single region. However, for disaster recovery or geographically distributed deployments, OELZ can be extended across multiple OCI regions. This requires careful configuration of disaster recovery strategies and network peering connections between regions to ensure seamless failover and data replication. It’s important to consider the increased complexity and potential cost implications of multi-region deployments.


Read: [High Availability and Disaster Recovery](https://mycloudwiki.com/cloud/ha-vs-ft-vs-dr/)

1. ##### **Disaster Recovery and High Availability:**


OCI offers disaster recovery (DR) and high availability (HA) solutions that can be integrated with your OELZ v2. This may involve:
   - **DR Strategy Planning:** Develop a DR strategy that defines recovery point objectives (RPOs) and recovery time objectives (RTOs) for your workloads.
   - **OCI DR Services:** Configure OCI services like Data Guard for databases and Oracle Cloud Infrastructure Object Storage for backups to establish robust DR capabilities.
   - **HA Configurations:** Implement HA configurations for critical workloads to ensure continuous operation in case of server failures.
2. ##### **Integration with Third-Party Tools:**


OELZ v2 can be integrated with third-party tools for enhanced functionality. Examples include:


   - **Configuration Management Tools** like Ansible or Chef for automating infrastructure provisioning and configuration.
   - **Security Information and Event Management (SIEM) systems** for centralized security logging and analysis.

Integrating these tools allows you to leverage their capabilities within your OELZ v2 environment.

**Considerations for Advanced OELZ Configurations:**

- Implementing advanced configurations requires in-depth knowledge of OCI, Terraform, and OELZ architecture.
- Customization introduces complexity and requires ongoing maintenance.
- Careful planning, testing, and documentation are essential to ensure compatibility and avoid security vulnerabilities.
- Consider the potential impact on performance and cost when implementing advanced configurations.

OELZ v2 offers a flexible foundation that can be extended with advanced configurations to meet specific organizational requirements. By leveraging custom Terraform modules, Exadata integration, advanced security features, and multi-region deployments, organizations can further optimize their OELZ environment for secure and scalable cloud deployments on OCI. It’s important to weigh the benefits of customization against the added complexity and ensure you have the resources to manage it effectively.

## **9\. Oracle Cloud Infrastructure (OCI) Landing Zone Best Practices**

Oracle Cloud Infrastructure (OCI) Landing Zones provide a secure and scalable foundation for deploying your workloads in the cloud. They offer a set of pre-defined best practices, templates, and configurations that help you quickly establish a compliant and well-architected environment.

Here are some best practices to consider when implementing an OCI Landing Zone:

###### **Planning and Design:**

1. **Define Your Requirements:** Clearly outline your business goals, technical requirements, and compliance needs before starting. This will help you choose the right Landing Zone architecture and configurations.
2. **Security First:** Prioritize security throughout the design process. Implement security best practices like identity and access management (IAM), network security, and data encryption from the outset.
3. **Compartmentalization:** Organize your resources into compartments based on their function, ownership, or project. This will help you manage access controls and resource quotas more effectively. For example, you can create separate compartments for development, testing, and production environments.
4. **Networking:** Design a robust network topology that aligns with your security and performance requirements. Consider using virtual cloud networks (VCNs), subnets, security lists, and network security groups to control traffic flow. For instance, you might use security lists to restrict access to specific ports or protocols.
5. **Tagging:** Implement a comprehensive tagging strategy to track your resources and costs. Tags can be used for filtering, reporting, and automation purposes. You could tag resources with information like the project name, environment, or owner.

###### **Deployment and Configuration:**

1. **Infrastructure as Code (IaC):** Leverage IaC tools like Terraform or Ansible to automate the provisioning and configuration of your landing zone. This ensures consistency, repeatability, and easier management of your environment. For example, you could use Terraform to define your entire landing zone infrastructure in code, making it easy to replicate and modify.
2. **Automation:** Automate repetitive tasks like patching, backups, and monitoring to reduce operational overhead and improve efficiency. This could involve using OCI’s automation tools or integrating with third-party solutions.
3. **Monitoring and Logging:** Implement robust monitoring and logging solutions to track the performance, availability, and security of your resources. Use OCI services like Monitoring, Logging, and Cloud Guard for comprehensive visibility. For instance, you could set up alarms to notify you of unusual activity or performance issues.
4. **Cost Optimization:** Regularly review your resource usage and optimize your cloud spending by utilizing reserved instances, spot instances, and other cost-saving measures. You could also use OCI’s Cost Analysis tool to identify areas where you can reduce costs.
5. **Governance:** Establish clear governance policies and procedures for managing your landing zone. This includes defining roles and responsibilities, setting up change management processes, and ensuring compliance with industry standards and regulations. For example, you might require approval for any changes to the landing zone’s infrastructure.

###### **Oracle-Specific Landing Zones:**

- **Oracle Enterprise Landing Zone (OELZ):** This framework provides a comprehensive set of best practices and templates for deploying Oracle workloads in OCI. It covers areas like identity and access management, networking, security, and cost management. OELZ includes pre-built Terraform templates and modules to accelerate deployment and ensure adherence to Oracle’s best practices.
- **Secure Cloud Computing Architecture (SCCA) Landing Zone:** This framework is designed to meet the specific security requirements of the U.S. Department of Defense (DoD). It incorporates additional security controls and configurations to ensure compliance with DoD standards.
- **CIS Foundations Benchmark Landing Zone:** This template helps you align your OCI environment with the Center for Internet Security (CIS) Foundations Benchmark, a set of security best practices for cloud environments.

By following these best practices and leveraging the available landing zone frameworks, you can build a secure, scalable, and compliant OCI environment that supports your business objectives. Remember to continuously monitor, update, and adapt your landing zone to meet evolving requirements and address potential security risks.

## **10\. Oracle Cloud Infrastructure (OCI) Landing Zone Checklist**

Here’s a comprehensive OCI Landing Zone checklist to guide you through the planning, deployment, and ongoing management phases:

###### **Planning & Design:**

- **Define Business Requirements:**
  - Identify workloads and applications to be migrated or deployed.
  - Determine performance, scalability, and availability needs.
  - Outline compliance and regulatory requirements.
- **Choose Landing Zone Architecture:**
  - Evaluate Oracle Enterprise Landing Zone (OELZ) or create a custom design.
  - Consider multi-region or single-region deployment based on resiliency needs.
  - Determine network topology (VCNs, subnets, routing).
- **Security & Compliance:**
  - Plan identity and access management (IAM) policies and roles.
  - Define security lists, network security groups, and firewall rules.
  - Address data encryption at rest and in transit.
  - Implement security monitoring and incident response mechanisms.
- **Cost Management:**
  - Estimate resource usage and establish budgets.
  - Explore cost optimization options like reserved instances and spot instances.
  - Set up cost tracking and reporting mechanisms.

###### **Deployment & Configuration:**

- **Infrastructure as Code (IaC):**
  - Use Terraform or Ansible to automate provisioning and configuration.
  - Maintain version control for IaC templates.
- **Core Services:**
  - Deploy and configure VCNs, subnets, internet gateways, and NAT gateways.
  - Set up load balancers, block storage, and object storage as needed.
  - Implement identity providers (IdPs) for user authentication.
- **Security Configuration:**
  - Enable security services like WAF, DDoS protection, and Cloud Guard.
  - Configure security lists and network security groups to restrict traffic.
  - Set up security monitoring and alerting.
- **Monitoring & Logging:**
  - Deploy OCI Monitoring and Logging services to track resource health and performance.
  - Set up alarms and notifications for critical events.
  - Enable audit logging for compliance and security purposes.

###### **Ongoing Management:**

- **Patch Management:**
  - Regularly apply security patches and updates to OCI resources.
  - Use automation tools to streamline patching processes.
- **Backup & Disaster Recovery:**
  - Implement regular backups for critical data and resources.
  - Set up disaster recovery (DR) strategies and test them regularly.
- **Cost Optimization:**
  - Continuously monitor resource usage and identify optimization opportunities.
  - Utilize cost-saving features like auto-scaling and scheduling.
- **Governance & Compliance:**
  - Enforce tagging policies for resource tracking and cost allocation.
  - Regularly review IAM policies and roles to ensure least privilege access.
  - Perform periodic security audits and vulnerability assessments.

###### **Additional Considerations:**

- **High Availability:** Design for high availability (HA) to minimize downtime and ensure business continuity.
- **Performance Optimization:** Optimize network performance, storage configurations, and database tuning.
- **Automation:** Automate routine tasks to reduce operational overhead and minimize errors.
- **Documentation:** Maintain detailed documentation of your landing zone architecture, configurations, and processes.

By following this checklist and adhering to OCI best practices, you can create a well-architected landing zone that provides a solid foundation for your cloud initiatives. Remember that this is a living document, and it should be updated as your requirements and OCI services evolve.

## **11\. Summary**

In this technical deep dive, we’ve explored the intricacies of Oracle Cloud Landing Zones (OCLZs), focusing on the significant advancements in OELZ v2. We’ve dissected its modular architecture, emphasizing the flexibility and scalability it offers for tailoring your cloud environment to your specific needs. We’ve also highlighted the robust security features, improved identity management, and streamlined user experience that make OELZ v2 a compelling choice for modern cloud deployments.

We’ve walked through the functional modules that constitute OELZ v2, from compartmentalization and cost management to identity, networking, security, monitoring, logging, and workload management. Each module plays a crucial role in establishing a well-organized, secure, and efficient cloud foundation. Additionally, we’ve outlined the deployment process using both Terraform CLI and Resource Manager, providing you with the tools to get started.

## **12\. Conclusion**

As cloud architects and engineers, you understand the importance of a solid foundation for your cloud infrastructure. OELZ v2 empowers you to build that foundation on OCI with confidence. Its modularity, security enhancements, and automation capabilities align with modern cloud best practices, enabling you to create a cloud environment that is not only secure and compliant but also adaptable to your evolving needs.

Whether you’re starting fresh or migrating from OELZ v1, the transition to OELZ v2 is a strategic move towards a more agile and resilient cloud infrastructure. By embracing OELZ v2 and its advanced configurations, you can unlock the full potential of OCI and drive innovation within your organization.

Remember, the cloud landscape is constantly evolving. Stay informed about the latest OELZ updates and best practices to ensure your cloud environment remains at the forefront of technology and security.

Sponsored Links

- Tags
- [Cloud Adoption](https://mycloudwiki.com/tag/cloud-adoption/)
- [cloud architecture](https://mycloudwiki.com/tag/cloud-architecture/)
- [cloud best practices](https://mycloudwiki.com/tag/cloud-best-practices/)
- [Cloud landing zone](https://mycloudwiki.com/tag/cloud-landing-zone/)
- [cloud security](https://mycloudwiki.com/tag/cloud-security/)
- [compliance](https://mycloudwiki.com/tag/compliance/)
- [cost optimization](https://mycloudwiki.com/tag/cost-optimization/)
- [Hybrid Cloud](https://mycloudwiki.com/tag/hybrid-cloud/)
- [Microsoft Azure](https://mycloudwiki.com/tag/microsoft-azure/)
- [multi-cloud](https://mycloudwiki.com/tag/multi-cloud/)
- [oci](https://mycloudwiki.com/tag/oci/)
- [OELZ](https://mycloudwiki.com/tag/oelz/)
- [OELZ v2](https://mycloudwiki.com/tag/oelz-v2/)
- [Oracle Database](https://mycloudwiki.com/tag/oracle-database/)
- [Oracle Enterprise Landing Zone](https://mycloudwiki.com/tag/oracle-enterprise-landing-zone/)
- [Terraform](https://mycloudwiki.com/tag/terraform/)

Share

[Facebook](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fmycloudwiki.com%2Fcloud-landing-zone%2Fcomplete-guide-on-oracle-cloud-landing-zone%2F "Facebook") [Twitter](https://twitter.com/intent/tweet?text=The+complete+guide+on+Oracle+Cloud+Landing+zone+architecture&url=https%3A%2F%2Fmycloudwiki.com%2Fcloud-landing-zone%2Fcomplete-guide-on-oracle-cloud-landing-zone%2F&via=Mycloudwiki "Twitter") [Linkedin](https://www.linkedin.com/shareArticle?mini=true&url=https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/&title=The+complete+guide+on+Oracle+Cloud+Landing+zone+architecture "Linkedin") [WhatsApp](https://api.whatsapp.com/send?text=The+complete+guide+on+Oracle+Cloud+Landing+zone+architecture%20%0A%0A%20https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/ "WhatsApp") [Pinterest](https://pinterest.com/pin/create/button/?url=https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/&media=https://mycloudwiki.com/wp-content/uploads/2024/05/Screenshot-2024-05-22-at-9.29.49-PM.png&description=Master%20Oracle%20Cloud%20Landing%20Zone%20for%20secure,%20scalable%20cloud%20environments.%20Explore%20core%20architectures%20components,%20functional%20modules%20and%20deployment%20options "Pinterest") [ReddIt](https://reddit.com/submit?url=https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/&title=The+complete+guide+on+Oracle+Cloud+Landing+zone+architecture "ReddIt") [Digg](https://www.digg.com/submit?url=https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/ "Digg") [Email](mailto:?subject=The%20complete%20guide%20on%20Oracle%20Cloud%20Landing%20zone%20architecture&body=https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/ "Email") [Copy URL](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/ "Copy URL")

[More](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/# "More")

#### You might also like to read

[The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/ "The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers")

### [The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/ "The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers")

[0](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/#respond)

Cloud landing zones are an important part of any cloud migration strategy. They provide a secure and governed foundation for building and deploying cloud...

[Read more](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/ "Read more")

[The comprehensive guide on Cloud Landing Zones](https://mycloudwiki.com/cloud/introduction-to-cloud-landing-zone/ "The comprehensive guide on Cloud Landing Zones")

### [The comprehensive guide on Cloud Landing Zones](https://mycloudwiki.com/cloud/introduction-to-cloud-landing-zone/ "The comprehensive guide on Cloud Landing Zones")

[0](https://mycloudwiki.com/cloud/introduction-to-cloud-landing-zone/#respond)

Building a strong foundation for your cloud journey is essential, and that's where a cloud landing zone comes in. A cloud landing zone is...

[Read more](https://mycloudwiki.com/cloud/introduction-to-cloud-landing-zone/ "Read more")

[Common mistakes that put Dev Accounts at security risk](https://mycloudwiki.com/security/mistakes-that-put-dev-accounts-at-risk/ "Common mistakes that put Dev Accounts at security risk")

### [Common mistakes that put Dev Accounts at security risk](https://mycloudwiki.com/security/mistakes-that-put-dev-accounts-at-risk/ "Common mistakes that put Dev Accounts at security risk")

[0](https://mycloudwiki.com/security/mistakes-that-put-dev-accounts-at-risk/#respond)

Almost every company out there now recognizes the importance of cloud security as millions of cybersecurity attacks are carried out by hackers all over...

[Read more](https://mycloudwiki.com/security/mistakes-that-put-dev-accounts-at-risk/ "Read more")

[The comprehensive guide on Global Cloud architectures and governance](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/ "The comprehensive guide on Global Cloud architectures and governance")

### [The comprehensive guide on Global Cloud architectures and governance](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/ "The comprehensive guide on Global Cloud architectures and governance")

[0](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/#respond)

The digital transformation era has empowered businesses to break free from geographic constraints, expanding their reach to a global audience. Cloud computing has emerged...

[Read more](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/ "Read more")

[The Ultimate Cloud Computing Guide for Engineers & Architects](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/ "The Ultimate Cloud Computing Guide for Engineers & Architects")

### [The Ultimate Cloud Computing Guide for Engineers & Architects](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/ "The Ultimate Cloud Computing Guide for Engineers & Architects")

[0](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/#respond)

Cloud computing has revolutionized IT infrastructure, offering businesses scalability, flexibility, and cost-efficiency. In simpler terms, it's the delivery of computing services (servers, storage, databases,...

[Read more](https://mycloudwiki.com/cloud/the-ultimate-cloud-computing-guide/ "Read more")

Previous article

[![](https://mycloudwiki.com/wp-content/uploads/2024/05/GCP-Landingzone-Services-218x150.png)](https://mycloudwiki.com/cloud-landing-zone/google-cloud/complete-guide-on-gcp-landing-zones/)

[Complete guide on Google Cloud (GCP) Landing zone architecture](https://mycloudwiki.com/cloud-landing-zone/google-cloud/complete-guide-on-gcp-landing-zones/)

Next article

[![](https://mycloudwiki.com/wp-content/uploads/2024/05/Screenshot-2024-05-24-at-9.43.19-PM-218x150.png)](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/)

[The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/)

[![Anil K Y Ommi](https://secure.gravatar.com/avatar/6a630acf8d69913a7513b2890e1b247f?s=500&r=g)](https://mycloudwiki.com/author/anilkyommi/ "Anil K Y Ommi")

[Anil K Y Ommi](https://mycloudwiki.com/author/anilkyommi/) [https://mycloudwiki.com](https://mycloudwiki.com/)

Cloud Solutions Architect with more than 15 years of experience in designing & deploying application in multiple cloud platforms.

[Facebook](https://www.facebook.com/mycloudwiki "Facebook")[Mail](https://mycloudwiki.com/contact/ "Mail")[Website](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/mycloudwiki.com "Website")

### LEAVE A REPLY [Cancel reply](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/\#respond)

Comment:

Please enter your comment!

Name:\*

Please enter your name here

Email:\*

You have entered an incorrect email address!

Please enter your email address here

Website:

Save my name, email, and website in this browser for the next time I comment.

[Certifications](https://mycloudwiki.com/category/certifications/)

[AWS Certified Solutions Architect Professional – Free Practice Tests](https://mycloudwiki.com/certifications/aws-certified-solutions-architect-professional-free-practice-tests/ "AWS Certified Solutions Architect Professional – Free Practice Tests")

### [AWS Certified Solutions Architect Professional – Free Practice Tests](https://mycloudwiki.com/certifications/aws-certified-solutions-architect-professional-free-practice-tests/ "AWS Certified Solutions Architect Professional – Free Practice Tests")

This AWS practice test helps you to pass the following AWS exams and can also helps you to revise the AWS concepts if you...

[Practise Tests](https://mycloudwiki.com/certifications/aws-certified-solutions-architect-professional-free-practice-tests/ "Practise Tests")

[prev-page](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)[next-page](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#)

### About us

Best way to learn Cloud Computing Technologies.

[![Mycloudwiki](https://mycloudwiki.com/wp-content/uploads/2020/01/footer-logo.png)MycloudwikiLearn & Share](https://mycloudwiki.com/)

### Cloud Computing

[AWS Global Infrastructure and Account Governance](https://mycloudwiki.com/aws/aws-global-infrastructure-and-account-governance/ "AWS Global Infrastructure and Account Governance")

### [AWS Global Infrastructure and Account Governance](https://mycloudwiki.com/aws/aws-global-infrastructure-and-account-governance/ "AWS Global Infrastructure and Account Governance")

[Amazon Web Services](https://mycloudwiki.com/category/aws/)June 1, 2024[0](https://mycloudwiki.com/aws/aws-global-infrastructure-and-account-governance/#respond)

The scale of AWS's global cloud infrastructure is nothing...

[The comprehensive guide on Global Cloud architectures and governance](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/ "The comprehensive guide on Global Cloud architectures and governance")

### [The comprehensive guide on Global Cloud architectures and governance](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/ "The comprehensive guide on Global Cloud architectures and governance")

[Cloud Computing](https://mycloudwiki.com/category/cloud/)May 30, 2024[0](https://mycloudwiki.com/cloud/global-cloud-infrastructure-and-account-management/#respond)

The digital transformation era has empowered businesses to break...

[The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/ "The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers")

### [The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/ "The ultimate guide on Cloud Landing Zone architecture for Cloud Architects and Engineers")

[Cloud Landing Zone](https://mycloudwiki.com/category/cloud-landing-zone/)May 25, 2024[0](https://mycloudwiki.com/cloud-landing-zone/ultimate-guide-on-cloud-landing-zone-architecture/#respond)

Cloud landing zones are an important part of any...

### Architectures

[Cloud Architecture 101: High Availability vs Fault Tolerance vs Disaster Recovery](https://mycloudwiki.com/cloud/ha-vs-ft-vs-dr/ "Cloud Architecture 101: High Availability vs Fault Tolerance vs Disaster Recovery")

### [Cloud Architecture 101: High Availability vs Fault Tolerance vs Disaster Recovery](https://mycloudwiki.com/cloud/ha-vs-ft-vs-dr/ "Cloud Architecture 101: High Availability vs Fault Tolerance vs Disaster Recovery")

[Architectures](https://mycloudwiki.com/category/cloud/architectures/)February 26, 2024[0](https://mycloudwiki.com/cloud/ha-vs-ft-vs-dr/#respond)

Cloud offers many services and different types of configurations...

[How GenAI Cloud services are revolutionizing Application Architectures](https://mycloudwiki.com/cloud/modernize-app-architectures-with-genai-in-cloud/ "How GenAI Cloud services are revolutionizing Application Architectures")

### [How GenAI Cloud services are revolutionizing Application Architectures](https://mycloudwiki.com/cloud/modernize-app-architectures-with-genai-in-cloud/ "How GenAI Cloud services are revolutionizing Application Architectures")

[Cloud Computing](https://mycloudwiki.com/category/cloud/)March 31, 2024[0](https://mycloudwiki.com/cloud/modernize-app-architectures-with-genai-in-cloud/#respond)

Generative AI is revolutionizing various industries, and cloud architects...

[8 key design principles to build robust cloud architecture designs and solutions](https://mycloudwiki.com/cloud/design-principles-to-build-robust-cloud-solutions/ "8 key design principles to build robust cloud architecture designs and solutions")

### [8 key design principles to build robust cloud architecture designs and solutions](https://mycloudwiki.com/cloud/design-principles-to-build-robust-cloud-solutions/ "8 key design principles to build robust cloud architecture designs and solutions")

[Architectures](https://mycloudwiki.com/category/cloud/architectures/)April 7, 2024[0](https://mycloudwiki.com/cloud/design-principles-to-build-robust-cloud-solutions/#respond)

The cloud has fundamentally transformed how we design, deploy,...

### Subscribe

I want in

I've read and accept the [Privacy Policy](https://mycloudwiki.com/cloud-landing-zone/complete-guide-on-oracle-cloud-landing-zone/5/#).

© Mycloudwiki. All Rights Reserved.
# Oracle Cloud Native SCCA Landing Zone (LZ)

Architecture guide for the US Department of Defense (DoD) and Implementation Partners for using Oracle Cloud Native Platform Automation in connection with Secure Cloud Computing Architecture Requirements

October, 2023, Version 2.0

Copyright $\\circledcirc$ 2023, Oracle and/or its affiliates

Public

# Purpose statement

The Oracle Cloud Native Secure Cloud Computing Architecture (SCCA) Landing Zone Architecture Guide provides an overview of how the DoD community can use the Oracle DoD Cloud platform to comply with DoD requirements of the SCCA, as described in the DoD Functional Requirements Document (FRD). It is intended solely to help the customer/mission owner understand the Oracle DoD Cloud platform and to plan your IT projects that require the use of Oracle DoD Cloud (IaaS and PaaS) to provide native services to build the SCCA ecosystem. This guide is not meant to supplant the guidance outlined in the Cloud Computing Security Resource Guide, Cloud Connection Process Guide, Secure Cloud Computing Architecture Functional Requirements Document, or any other official Department of Defense guidance or mandates. This guide provides the Oracle DoD Cloud Guidance on how to use the Oracle cloud native services (IaaS and PaaS) in connection with DoD SCCA requirements as set forth by Defense Information Systems Agency (DISA) FRD.

# Disclaimer

This document is for informational purposes only and is intended solely to assist you in planning for the implementation and upgrade of the product features described. It is not a commitment to deliver any material, code, or functionality, and should not be relied upon in making purchasing decisions. The development, release, and timing of any features or functionality described in this document remains at the sole discretion of Oracle. This document may reference products/services or security controls that currently are in the process of obtaining DISA Impact Level 5 provisional authorization. Due to the nature of the document, it may not be possible to include all features described in this document. For additional information specific to certain Oracle Cloud Services with DISA Impact Level 5 authorization, please refer to this informational website, located at: Oracle Cloud US Federal Cloud with DISA Impact Level 5 Authorization.

\*Some of the services are under accreditation by DISA or the U.S. Intelligence Community and may not be available as a general release.

# Revision History

The following revisions have been made to this architecture guide:

|     |     |
| --- | --- |
| Date Revision |  |
| July, 2023 | Initial - Cloud Native SCCA Landing Zone |

# Table of contents

Revision History 2

Introduction 5

Benefits of Oracle Cloud Native SCCA 5

Oracle Cloud Shared Responsibility Model 5

DoD Cyber Security Service Provider (CSSP) 6

Information Impact Levels 6

DoD Boundary Cloud Access Point (BCAP) 8

DoD SCCA and DISA Secure Cloud Computing 9

SCCA Technical Components 10

SCCA Roles and Responsibilities 11

# SCCA Requirements: Security and Mission Support Systems 11

Mission Support Systems: Full Packet Capture Oracle Cloud Guidance 18

Functional Requirements: TCCM Oracle Cloud Guidance 20

Oracle Cloud Native Services used in SCCA LZ 26

Oracle Services Limits Required 28

Landing Zone Script 30

CAC and PIV Sign-in to Oracle Cloud’s Console 32

# DoD Information Impact Level 5 Isolation Guidance 33

Customer Isolation 33

Compute Isolation 33

Network Isolation 33

Hardware-based Root of Trust 33

Cryptographic Isolation of Storage 34

Database-as-a-Service Isolation 34

# DoD Security Technology Implementation Guide (STIG) Guidance

Oracle Linux STIG Image 35

STIG Tool for Virtual Machine Database Systems 35

Considerations 36

Deploy 37

Acronyms 38

Additional Information 39

# List of figures

Figure 1. Shared Responsibility in Oracle Cloud 6

Figure 2. Oracle Cloud Regions Map for US Government 7

Figure 3. DoD Boundary Cloud Access Points (BCAPs) 8

Figure 4. NIPRNet and Oracle Cloud Workload Data Transfer 8

Figure 5. DoD Secure Cloud Computing Architecture 9

Figure 6. Roles and Responsibilities for Individual SCCA Components 11

Figure 7. SCCA Deployment Concepts 22

Figure 8. Trusted Cloud Credential Manager 22

Figure 9. Oracle Cloud SCCA LZ Monitoring Architecture 23

Figure 10. Oracle Cloud SCCA LZ Functional Architecture 24

Figure 11. Oracle Cloud SCCA LZ Functional Flow Architecture 25

Figure 12. Oracle Cloud Native SCCA LZ Technical Architecture 25

Figure 13. Oracle Cloud SCCA LZ Native Services 26

# List of tables

Table 1. Authorization, Connectivity, and Impact Levels 7

Table 3. Security Objectives and Components 11

Table 4. Virtual Datacenter Security Stack (VDSS) Requirements 12

Table 5. Virtual Datacenter Managed Services (VDMS) Requirements 15

Table 6. Full Packet Capture Requirements 18

Table 7. Boundary Cloud Access Point (CAP) Requirements 18

Table 8. Trusted Cloud Credential Manager (TCCM) Requirements 20

Table 9. Oracle Cloud Native SCCA Service Limits 28

# Introduction

The purpose of Secure Cloud Computing Architecture (SCCA), as stated by DISA, is to provide a scalable, costeffective approach to securing cloud-based programs under a common security architecture. This framework provides you, as a mission owner, a consistent level of security that enables the use of commercially available Cloud Service Offerings (CSO) for hosting DoD mission applications operating at all DoD Information System Impact Levels (i.e., IL2, IL4, IL5, and IL6).

Oracle’s mission regarding DoD Cloud Computing is to build cloud infrastructure and platform services where you, the DoD mission owner, have effective and manageable security to run your mission-critical workloads and store your data with confidence. This architectural guide highlights DISA guidance from the DISA SCCA Functional Requirements Document (FRD), Oracle best practices, and lessons learned from working with our DoD customers deploying to Oracle Cloud.

In addition to this document, DoD cloud adopters should also reference the following DoD reference guides:

Cloud Computing Security Requirements Guide (CC SRG) version v1r4 Cloud Connection Process Guide (CC-PG)

DISA Cloud Playbook (a general guide and lessons learned by early cloud adopters across the DoD)

\*The Secure Cloud Computing Architecture – Functional Requirements (SCCA FRD) – version 2.9 document requires a Controlled Access Card (CAC) login.

# Benefits of Oracle Cloud Native SCCA

|     |     |
| --- | --- |
| TimeSavings | Oracle is working with the DoD Hosting and Computing Center to pre-ATO our Oracle Cloud NativeSCCA Solution to make a compliant architecture available in hours instead of months. |
| CostAvoidance | The Oracle Cloud Native SCCA Landing Zone (LZ) script and associated technical documentationare provided at no separate or additional charge under a customer's contract. Underlyingconsumable cloud services used to stand up Oracle Cloud Native SCCA in a customer's tenancymay be billable in accordance with the customer's contract. |
| Agility | Customers can use as many LZs as needed. Operations can be delegated to mission supportpartners with less maintenance required instead of relying on complex third-party productmaintenance and the associated skills required. |
| Simplicity | Customers can use out-of-the-box configurations, rules, and templates instead of architecting andmanually configuring on their own. Customers can leverage Oracle Cloud Infrastructure (OCl)-managed Platform as a Service (PaaS) rather than a virtual machine-based implementation.Customers can use guided security configuration with minimal decision points. |

# Oracle Cloud Shared Responsibility Model

Oracle Cloud for Government and DOD include security technology and operational processes to secure enterprise cloud services. For you to securely run your workloads, you must be aware of your security and compliance responsibilities. By design, Oracle provides security of cloud infrastructure and operations such as cloud operator access controls and infrastructure security patching. You as the customer/mission owner are responsible for securely configuring your cloud resources. Security in the cloud is a shared responsibility between you and the Cloud Service Provider (CSP). Figure 1 illustrates this shared responsibility model and how it varies depending on which tier of cloud computing you choose to employ.

With respect to the Shared Responsibility Model, security capabilities identified by the SCCA can be delivered by either DOD, the CSP, or third-party organizations. This presents an opportunity to utilize a mix of DOD-standard security solutions, best-in-class security solutions, and CSP-offered capabilities for a uniquely catered solution that meets security and cost objectives.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/3dff0abafccc1e037bf51a7ffd57ed101d15d05fbd3b9399dd468a7aad2a05fb.jpg)

Figure 1. Shared Responsibility in Oracle Cloud

# DoD Cyber Security Service Provider (CSSP)

The DoD operates a cyber security structure as defined in DoDI 8530.01, "Cyber Security Activities Support to DoD Information Network Operations.” This structure consists of United States Cyber Command (USCYBERCOM) and Joint Forces Headquarters Department of Defense information networks (JFHQ-DoDIN) at the top organizational level and a network of Cyber Security Service Providers (CSSPs) that are accredited by USCYBERCOM IAW DoD policy. Each DoD information system is operated and managed by a mission owner which must be aligned with an accredited CSSP to monitor and protect the information systems and associated assets. CSSPs provide cybersecurity services that help protect, monitor, respond, and sustain capabilities within the Department of Defense Information Network (DoDIN). The mission owner is responsible for the implementation and maintenance of the security posture of your system(s) in accordance with Security Requirements Guides, Security Technology Implementation Guides, and DoD policy in coordination with, or with the assistance of your aligned CSSP. CSSPs report information to USCYBERCOM which maintains cyber situational awareness over all DoD networks and information systems. USCYBERCOM also provides threat information collected from various sources and threat mitigation orders to CSSPs and you as the mission owner. The CSSP provides cyber security services and command and control direction addressing the protection of the network, detection of threats, and response to incidents. DoD Program Managers must ensure that CSSP processes are in place and functional for their application prior to any transition to or use of a Cloud Service Offering (CSO).

Additional CSSP information can be found at [https://cyber.mil/](https://cyber.mil/) (CAC required.)

# Information Impact Levels

The Cloud Computing Security Requirements Guide (CC SRG) provides guidance on acquiring cloud services and understanding levels of data. Both commercial companies and government cloud providers are authorized to provide cloud offerings for different levels of data. The definitions for these data levels are defined in the CC SRG. There are now four levels of data that are used as the framework for authorizing cloud providers: Impact Level (IL) 2, 4, 5, and 6. Table 1 provides a comparison of these Impact Levels, embodying these principles:

 All DoD data is important, but not all data needs to be equally protected.

Information Impact Levels (IILs) consider the potential impact, should the confidentiality and integrity of information be compromised.

 Once a mission owner understands their data level(s), they may determine which CSPs are authorized to provide CSOs for those levels.

Oracle Cloud is currently accredited for DoD workloads up to Information Impact Level 5 (IL2, IL4, IL5). In addition, Oracle is going through the process for IL6 accreditation. Table 1 summarizes and compares the set of Oracle Cloud regions available to various government agencies in the United States.

# Oracle Cloud Regions

Table 1. Authorization, Connectivity, and Impact Levels

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Realm | Region | Authorization andImpact Levels | Customers | Connectivity |
| \[0C2\] | US Gov East \[Gov 1\]US Gov West \[Gov 2\] | FedRAMP High (JAB)DoD Impact Level 4 | US Federal, State,Local, Tribal, HigherEd, ApprovedCommercial Entities | InternetFastConnect |
| \[OC3\] | US DoD East \[Gov 3\]US DoD North \[Gov 4\]US DoD West \[Gov 5\] | FedRAMP High (JAB)DoD Impact Level 5 | Federal GovernmentCommunity CloudUS Intel Community | InternetNIPRNet(via BCAP) |
| \[OC11\] | US Secret East \[Gov 13\]US Secret West \[Gov 14\]US Secret S. Central \[Gov 15\] | DoD Impact Level 6\*IntelligenceCommunity Directive(ICD) 705\*ICD 503\* | US DoDUS Intel Community | SIPRNetFastConnect |
| \[OC6\] | US TS East \[Gov 9\]US TS South Central \[Gov 6\] | DoD Impact Level 6\*ICD 705\*ICD 503\* | US DoDUS Intel Community | Joint WorldwideIntelligenceCommunicationSystem (JWICS)FastConnect |
| \[OC7\] | US TS East \[Gov 7\] | ICD 705\*ICD 503\* | Special AccessProgram (SAP) | JWICSFastConnect |

\*Some of the services are under accreditation by DISA or the U.S. Intelligence Community and may not be available as a general release. US personnel are required for all US government realms.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/c509e28b39e0dbad657501408ab7b682a32f761f2d2478d8a6a5299422000042.jpg)

Figure 2. Oracle Cloud Regions Map for US Government

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/994879db36074d98226ea64c29ee5f6c47bba7429fb3bc942b0569f722dc7299.jpg)

# DoD Boundary Cloud Access Point (BCAP)

A DoD Boundary Cloud Access Point (BCAP) is a system of network boundary protection and monitoring devices, otherwise known as an information assurance stack, through which cloud service provider infrastructure and networks will connect to the Defense Information Systems Network (DISN). Figure 3 illustrates this logical architecture.

C A BCAP is not an architecture or service provided by a Cloud Service Provider (CSP) but required between the DISN and the Cloud Service Offering (CSO) with controlled unclassified information data (IL4/5).

 The BCAP is used to protect the DISN, systems, information, and users residing on the DISN from attacks that may be launched from within a compromised cloud service offering. The BCAP facilitates protected connections between users on a DoD network and systems or applications on the CSO.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/ada7a1a0204dd0006cc55c2cc4235113965ae829e585f1c464f42ece0dbdabe1.jpg)

Figure 3. DoD Boundary Cloud Access Points (BCAPs)

Oracle offers connectivity to two DISA MeetMe points – East and West. Oracle also coordinates connectivity to component CAPs, such as the Defense Health Agency (Med COI) CAP. If you utilize networks other than NIPRNet or SIPRNet, you will need to implement BCAPs or Internet Cloud Access Points (ICAPs) for those networks that provide equivalent protections to those defined in the SCCA FRD when connecting CSP infrastructure to your network. All CAP instantiations, user connections to cloud service providers, and cloud service offerings must be approved by the DoD CIO.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/3e7e40ec380189ff8a28efc73f5386680be4a24300abd91f61de1feeee8c18bc.jpg)

Figure 4. NIPRNet and Oracle Cloud Workload Data Transfer

8 Architecture Guide / Oracle Cloud Native SCCA Landing Zone (LZ) / Version 2.0 Copyright $\\circledcirc$ 2023, Oracle and/or its affiliates / Public

A CAP does not support or provide direct internet access to an Information Impact Level 4/5 CSP-CSO. Information exchanges between a Level 4/5 CSP-CSO and the internet must transit both an Internet Access Point (IAP) and a CAP. As the DoD “Cloud Connection Process Guide” explains, and Figure 4 illustrates, the information flows for Information Impact Levels 2, 4, and 5. These are:

# BCAP

Table 2. BCAP Flow Descriptions

|     |     |
| --- | --- |
| Flow # | Flow description |
| 1.7.a | Information exchanges between a user connected to the NIPRNet and a Cloud Information Technology Project (C-ITP) operating in an Off-Premise Information Impact Level 4 (or 5) CSP- CSO must traverse a DoD CIO-approved BCAP. |
| 1.7.b | Information exchanges between a user connected to the internet and a C-ITP operating in an Off-Premises Information Impact Level 4 or 5 CSP-CSO must traverse a DoD Internet Access Point (IAP), and a DoD CIO-approved BCAP. |
| 1.7.c | Information exchanges between a user connected to the NIPRNet and a C-ITP operating in an Information Impact Level 2 CSP-CSO connected to the internet must traverse a DoD IAP. |
| 1.7.d | Information exchanges between a user connected to the internet and a C-ITP operating in an Information Impact Level 2 CSP-CSO connected to the Internet are direct via the internet. |

# DoD SCCA and DISA Secure Cloud Computing

SCCA is designed to deliver the security capabilities defined by the DoD Cloud Computing Requirements Guide (CC SRG) as necessary to support secure deployment of DoD systems and information into the commercially owned and operated CSP industry segment. A DoD Provisional Authorization (PA) provides a validation of a CSP’s compliance with the DoD CC SRG guidance for hosting systems operating at an indicated DoD System Impact Level. Assuming a CSP has achieved a DoD PA, the SCCA defines DoD system implementation and governance requirements necessary to protect the DISN boundary and commercial cloud hosted DoD mission systems and information. The construction of the SCCA is intended to levy no additional requirements upon the commercial CSP industry other than those related to secure connectivity.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/67906e451d86e93d38b43961ecc249c240a0678864e273ad3cb919ec89b060f2.jpg)

Figure 5. DoD Secure Cloud Computing Architecture

# SCCA Technical Components

The SCCA FRD describes the following four technical components:

1. Cloud Access Point (CAP): The CAP provides access to the cloud, boundary protection of DISN from the cloud, and cyber defense capabilities such as firewall and intrusion detection and prevention (IDS/IPS) at the DISN boundary. Full Packet Capture (FPC) and interface translation may be provided, as needed, to support secure connectivity and access to individual commercial cloud hosting systems. The CAP is specifically tailored to operate at DoD Impact levels 4 and 5. To support both on-premises and off-premises non-DoD CSPs, CAP requirements are decomposed into Internal-CAP (ICAP) and Boundary-CAP (BCAP) requirements.

2. Virtual Datacenter Security Stack (VDSS): The VDSS provides DoD Core Data Center (CDC)-like network security capabilities, such as:


Next-generation Deep packet inspection

firewall (NGFW) Break and inspect

Web application firewall • Micro-segmentation

(WAF)

IDS/IPS

Flow Logs and FPC

The VDSS provides DoD CDC-like network security capabilities such as firewall, intrusion detection, and intrusion prevention systems. It also provides application security capabilities such as WAF and proxy systems. The VDSS can reside within or outside of the CSP’s infrastructure virtually or physically. VDSS capabilities can also be provided as-a-service by a third-party vendor for IaaS or a CSP for IaaS and SaaS. VDSS feeds should be provided to a DoD Cyber Security Service Provider (CSSP) performing enclave boundary defense. The VDSS also supports sharing of security event data among cyber security stakeholders. The VDSS is specifically tailored to operate at all DoD Information Impact Levels.

3. Virtual Datacenter Managed Services (VDMS): The VDMS provides system management network and mission owner system support services, such as:

Assured Compliance Assessment Solution (ACAS)  Host Based Security System (HBSS) Active Directory (AD) / Lightweight Directory Access Protocol (LDAP) / Single Sign-on (SSO) / Online Certificate Status Protocol (OCSP)

Dynamic Host Configuration Protocol (DHCP) / Domain Name System (DNS) / Network Time Protocol (NTP)  Patch Management Log Management

The VDMS provides system management network and mission owner system support services necessary to achieve Joint Information Environment (JIE) management plane connectivity and mission owner system compliance. It provides secure management network connectivity to the DISN, virtual host-based management services, and identity and access management services for DoD CAC authentication to virtual systems. The VDMS is specifically tailored to operate at all DoD mission Impact Levels. VDMS functionality applies directly to IaaS environments but may not be specifically applicable to PaaS and SaaS CSOs as such functionality may be inherent to the associated CSP and validated through the DoD PA.

4. Trusted Cloud Credential Manager (TCCM): The TCCM is an individual or entity appointed by the DoD mission owner’s Authorizing Official (AO) to establish plans and policies for the control of privileged user access to include root account credentials used to establish, configure, and control a mission owner’s Virtual Cloud Network (VCN) configuration once connected to the DISN.

The TCCM is an SCCA business role responsible for credential management with the purpose of enforcing least privilege access for privileged accounts that are established and managed using the CSP’s Identity and Access Management (IdAM) The TCCM establishes and manages Least-Privilege Attribute-Based Access Control (ABAC) accounts and credentials used by privileged DoD users and systems to administer and control DoD CSO configurations. The role of TCCM is intended to operate at all DoD information Impact Levels. However, the TCCM may not apply to some SaaS solutions where DoD account owners are not required to use the CSP’s IdAM system to administer user accounts and service configurations.

# SCCA Roles and Responsibilities

The SCCA is architected to support three primary roles and responsibilities:

1. Mission Owner (MO): The DoD entity responsible for delivering and operating a DoD mission system.

2. Mission Cyberspace Protection (MCP): The DoD entity charged with the responsibility of securing a MO’s enclave and networked systems by establishing and delivering cybersecurity capabilities.

3. DISN Boundary Cyberspace Protection (BCP): The DoD entity charged with the responsibility to establish and deliver cyber security capabilities to protect the DISN.


Figure 6 illustrates the alignment of SCCA Components (right side) to stakeholder communities (left side):

1. CAP: Cyber security information from the CAP supports the mission of the organization providing BCP.

2. VDSS: Cyber security information from the VDSS supports the missions of organizations providing both BCP and MCP.

3. VDMS: The VDMS acts similarly to support the missions of organizations providing both MCP and missions

4. TCCM: Establishment and execution of TCCM governance activities is specifically a MO responsibility.


![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/4c6283e55a7a0ccc789706e2b875cef254e063b9c1c7c051c2d35395509cd01d.jpg)

Figure 6. Roles and Responsibilities for Individual SCCA Components

# SCCA Requirements: Security and Mission Support Systems

The SCCA Functional Requirements Document (FRD) lists requirements in the following categories:

 2.1 Security Requirements

 2.2 System Connectivity Requirements

 2.3 Mission Support System Requirements

 2.4 Performance

 2.5 Continuity of Operations (COOP)

 2.6 System Scalability

 2.7 Backup & Restoration

# SCCA Requirements

Table 3. Security Objectives and Components

Within Security Requirements, the FRD identifies four objectives and allocates them to SCCA components:

|     |     |     |
| --- | --- | --- |
| Security objective | Allocated SCCA component | In this document |
| DISN Boundary Defense | CAP | No |
| Mission Owner Enclave and ApplicationDefense | VDSS | Yes |
| Mission Application End-Point Defense | VDMS | Yes |
| DISN and Mission Defense | TCCM | Yes |

The pages that follow provide Oracle Cloud specific guidance in these categories:

 2.1.2 Security Requirements: VDSS  2.1.3 Security Requirements: VDMS  2.1.4 Security Requirements: TCCM • 2.3.5 Mission Support Systems: Full Packet Capture

# SCCA Functional Requirements

Table 4. Virtual Datacenter Security Stack (VDSS) Requirements

# Functional Requirements: VDSS Oracle Cloud Guidance

|     |     |     |
| --- | --- | --- |
| Req. ID | VDSS Security Requirements | Oracle Cloud NativeServices |
| 2.1.2.1 | The VDSS shall maintain virtual separation of all management, user,and data traffic. | IP Address Management(IPAM), Security List,VCN, Subnets |
| 2.1.2.10 | The VDSS shall provide an interface to conduct ports, protocols, andservice management (PPSM) activities to provide control for MCDoperators. | PPSM Interface,Oracle Cloud SecurityList, Network Firewall |
| 2.1.2.11 | The VDSS shall provide a monitoring capability that captures logfiles and event data for cyber security analysis. | Logging Analytics,Oracle Access Manager(OAM), Oracle IdentityManager (OIM), OracleEnterprise Manager(OEM),Oracle Cloud Monitoring |
| 2.1.2.12 | The VDSS shall provide or feed security information and event datato an allocated archiving system for common collection, storage, andaccess to event logs by privileged users performing Boundary andMission Computer Network Defense (CND) activities. | Logging, ServiceConnector Hub, ObjectStorage |
| Storage |

|     |     |     |
| --- | --- | --- |
| 2.1.2.13 | The VDSS shall provide a FIPS-140-2 compliant encryption keymanagement system for storage of DoD generated and assignedserver private encryption key credentials for access and use by theWeb Application Firewall (WAF) in the execution of SSL/TLS breakand inspection of encrypted communication sessions. | Virtual Private Vault |
| 2.1.2.14 | The VDSS shall provide the capability to detect and identifyapplication session hijacking. | Network Firewall/WAFv2 |
| 2.1.2.15 | The VDSS shall provide a DoD DMZ Extension to support InternetFacing Applications (IFAs). | Network Firewall/WAFv2 |
| 2.1.2.16 | The VDSS shall provide full packet capture (FPC) or cloud serviceequivalent FPC capability for recording and interpreting traversingcommunications. | vTAP |
| 2.1.2.17 | The VDSS shall provide network packet flow metrics and statisticsfor all traversing communications. | vTAP |
| 2.1.2.18 | The VDSS shall provide for the inspection of traffic entering andexiting each mission owner virtual private network. | Virtual Test AccessPoints (vTAP) |
| 2.1.2.2 | The VDSS shall allow the use of encryption for segmentation ofmanagement traffic. | VCN |
| 2.1.2.3 | The VDSS shall provide a reverse proxy capability to handle accessrequests from client systems. | Web App Acceleration |
| 2.1.2.4 | The VDSS shall provide a capability to inspect and filter applicationlayer conversations based on a predefined set of rules (includingHTTP) to identify and block malicious content. | WAF + NGFW |
| 2.1.2.5 | The VDSS shall provide a capability that can distinguish and blockunauthorized application layer traffic. | Oracle Cloud WAF,Network Firewall(NGFW),Oracle CloudObservability andManagement Platform |
| 2.1.2.6 | The VDSS shall provide a capability that monitors network andsystem activities to detect and report malicious activities for trafficentering and exiting Mission Owner virtual privatenetworks/enclaves. | WAF/Network Firewall,Oracle CloudObservability andManagement Platform |
| 2.1.2.7 | The VDSS shall provide a capability that monitors network andsystem activities to stop or block detected malicious activity. | WAF/Network Firewall,Oracle CloudObservability andManagement Platform |
| 2.1.2.8 | The VDSS shall inspect and filter traffic traversing between mission WAF/Network Firewall,owner virtual private networks/enclaves. Oracle CloudObservability andManagement Platform |
| 2.1.2.9 | The VDSS shall perform break and inspection of SSL/TLScommunication traffic supporting single and dual authentication fortraffic destined to systems hosted within the Cloud ServiceEnvironment (CSE). | WAF/Network Firewall,Oracle CloudObservability andManagement Platform |
| 2.3.1.2 | The VDSS shall provide CSO resident or remotely hosted missionenclave perimeter protection and sensing. | Network Firewall, IPAM,VCN, Subnets, SecurityLists |
| 2.3.2.2 | SCCA component managers shalbe able to manage (e.g., setsrity, cnguration, &rouig polics and install pathes) SCCAsystem security and network components. | APIs, Console, SecurityList, OS Management |
| 2.3.2.3 | SCCA component managers shal alow for the confguration,control, and management of Ports, Protocols, and ServicesManagement (PPSM) in accordance with DoDI 8551.0120. | Security List, NetworkFirewall |
| 2.3.2.6 | SCCA components shall provide logically separate networkinterfaces for access from the management network infrastructurethat is logically separate from production. | Oracle Cloud Networking |
| 2.3.2.7 | SCCA components shall support management administration fromthe DISN management system and/or DISA DatacenterManagement System. | Oracle CloudConsole, Identity Domain |
| 2.3.2.9 | SCCA components shall provide for management trafficsegmentation from user and data plane traffc | Oracle Cloud Networking |
| 2.4.2.1 | The VDSS unit processing latency shall be no greater than 35milliseconds. | Oracle Cloud Networking |
| 2.4.2.2 | The VDSS unit packet loss shall be <1%. | Oracle Cloud Networking |
| 2.4.2.5 | The VDSS shall support IP packet forwarding in accordance withMission Owner Differentiated Services Code Point (DSCP) taggedQOS prioritization. | Oracle Cloud Networking |
| 2.5.2.1 | The VDSS management systems shall provide a mechanism formanaging failover in accordance with DoD UCR 2013. | Oracle Cloud Networking |
| 2.5.2.2 | The VDSS management systems shall provide the capability toensure all SCCA element configurations and policies are recoverable. | Oracle CloudHigh AvailabilityNetworking |
| 2.5.2.3 | The VDSS shall maintain offsite backup configurations for therecovery of operations. | Cross-region Replication(Object Storage) |
| 2.5.3.1 | The VDMS management systems shall provide a mechanism formanaging failover. | Oracle Cloud Networking |
| 2.6.2.1 | The VDSS shall be designed to rapidly scale virtual elements up anddown in capacity to achieve negotiated (between componentsprovider and Mission Owner) SLA objectives while minimizingmetered billing CSO costs incurred by DoD procuring component. | OrganizationManagement,Billing / BudgetInstance pool |

Table 5. Virtual Datacenter Managed Services (VDMS) Requirements

|     |     |     |
| --- | --- | --- |
| 2.6.2.2 | The VDSS shall support scalability in increments of 1 Gigabit/secondthroughput at all points within the design without costlymodification. | Oracle Cloud Networking |
| 2.7.2.1 | The VDSS shall provide the ability to backup and restore security,network, account, and system configurations. | Backup, Object storage,Archive storage |
| 2.7.2.2 | The VDSS shall provide the capability to backup configuration andsystem data of all VDSS elements. | Backup, Object storage,Archive storage |
| 2.7.2.3 | The VDSS shall provide the means to restore operational capability. | Backup, Object storage,Archive storage |

# SCCA Functional Requirements

# Functional Requirements: VDMS Oracle Cloud Guidance

|     |     |     |
| --- | --- | --- |
| Req. ID | VDMS Security Requirements | Oracle Cloud NativeServices |
| 2.1.3.2 | The VDMS shall provide Host Based Security System (HBSS), orapproved equivalent, to manage endpoint security for allenclaves within the CSE. | Vulnerability scanning |
| 2.1.3.3 | The VDMS shall provide identity services to include an OnlineCertificate Status Protocol (OCSP) responder for remote systemDoD Common Access Card (CAC) two factor authentication ofDoD privileged users to systems instantiated within the CSE. | Identity Domain |
| 2.1.3.4 | The VDMS shall provide a configuration and updatemanagement system to serve systems and applications for allenclaves within the CSE. | Oracle Cloud ResourceManager, OS ManagementService Repo, YUM |
| 2.1.3.5 | The VDMS shall provide logical domain services to includedirectory access, directory federation, Dynamic HostConfiguration Protocol (DHCP), and Domain Name System(DNS) for all enclaves within the CSE. | DNS |
| 2.1.3.6 | The VDMS shall provide a network for managing systems andapplications within the CSE that is logically separate from theuser and data networks. | Dynamic Routing Gateway(DGR), Local Peering Gateway(LPG), Security Lists,VCN, Subnets |
| 2.1.3.7 | The VDMS shall provide a system, security, application, anduser activity event logging and archiving system for commoncollection, storage, and access to event logs by privileged usersperforming Boundary Cyberspace Protection (BCP) and MissionCyberspace Protection (MCP) activities. | Object Storage, ArchiveStorage, Oracle CloudLogging |
| 2.1.3.8 | The VDMS shall provide for the exchange of DoD privilegeduser authentication and authorization attributes with the CSP'sIdentity and access management system to enable cloudsystem provisioning, deployment, and configuration. | Identity Domain |
| 2.1.3.9 | The VDMS shall implement the technical capabilities necessaryto execute the mission and objectives of the TCCM role. | Identity and AccessManagement (IAM), IdentityDomains |
| 2.2.3.1 | The VDMS enclave shall form the DISN management networkwithin the CSE. | Oracle Cloud Networking |
| 2.2.3.2 | The VDMS shall allow DoD privileged user access to missionowner management interfaces inside the CSO. | IAM |
| 2.2.3.3 | The VDMS shall provide secure connectivity to mission ownermanagement systems inside the CSO that is logically separatefrom mission application traffic. | Oracle Cloud Networking |
| 2.2.4.5 | (Optional) The VDMS enclave shall form the DISN managementnetwork within the CSE and provide the same capabilitiesidentified in Table 9. | Oracle Cloud Networking,Identity Domain |
| 2.3.2.1 | SCCA components shall provide element managers to managethe configuration of system elements comprising the CAP,VDSS, and the VDMS. | Console |
| 2.3.2.4 | SCCA component managers shall provide a capability toimplement and control system configuration, reportconfiguration change incidents, and support DoD Componentchange configuration management systems and processes. | Oracle Cloud ResourceManager, Terraform |
| 2.3.2.5 | SCCA management systems shall support the sharing ofCombatant Commands, Services, Agencies (CC/S/A) log insightdetector event & correlation data with the CC/S/A and CNDService Providers. | Oracle Cloud Analytics,Identity Domain, OracleCloud Logging, Oracle CloudLogging Analytics, ServiceConnector Hub\*Customers are responsiblefor Log Insight Detector |
| 2.3.2.8 | SCCA components shall provide sensor events, performance,and resource utilization metrics to the component operators. | Logging, Identity Domain,Service Connector Hub\*Customers are responsiblefor Log Insight Detector |
|  |  |  |
| 2.3.3.1 | SCCA security elements (i.e., BCAP, ICAP, VDSS, and VDMS)shall provide a performance management capability to monitorthe health and status of security elements. | Oracle Cloud Monitoring,Observability andManagement Platform |
| 2.3.3.2 | SCCA security elements shall provide performance data, such asCPU, bandwidth, memory and disk I/O, and storage utilizationto SCCA management systems for performance analysis andreporting. | Oracle Cloud Monitoring,Metrics, Logging |
| 2.3.3.3 | The SCCA security elements shall be able to generate reportsand alerts based on performance information provided by SCCAsystems. | Oracle Cloud Monitoring,Metrics, Logging |
| 2.3.5.1 | The FPC shall support integration with log insight detectorsystems to effect data search and retrieval, such as thecapability to pullselect timeframes of captured data. | vTaP\*Customers are responsiblefor Log Insight Detector |
| 2.3.5.2 | The FPC shall provide the means to reconstruct all networktraffic sessions traversing the SCCA Component. | vTaP |
| 2.3.5.3 | The FPC shall provide defined data queries that run againstmetadata. | vTaP |
| 2.3.5.4 | The FPC shall provide a capability to request an arbitrary subsetof packets. | vTaP |
| 2.3.5.5 | The FPC shall locally store captured traffic for 30 days. | VTAP, Object Storage |
| 2.3.5.6 | The FPC data shall be isolated from user and data plane trafficvia cryptographic or physical means. | vTaP |
| 2.3.5.7 | The FPC data shal be query-able from a secure remote locationon the management network. | vTaP |
| 2.3.5.8 | The FPC function shall be configurable according to traffic flowsource and destination points to avoid multiple point capture. | vTaP |
| 2.5.3.2 | The VDMS management systems shall provide the capability toensure all SCCA element configurations and policies arerecoverable. | Oracle Cloud High AvailabilityNetworking |
| 2.5.3.3 | The VDMS shall maintain offsite backup configurations for therecovery of operations. | Cross-region Replication(Object Storage) |
| 2.6.3.1 | The VDMS hall bdee piy calevirtal e and down in capacity to achieve negotiated (betweencomponents provider and Mission Owner) SLA objectives whileminimizing metered billing CSO costs incurred by DoDprocuring component. | Organization Management,Billing / BudgetInstance pool |

Table 6. Full Packet Capture Requirements

|     |     |     |
| --- | --- | --- |
| 2.7.3.1 | The VDMS shall provide the ability to backup and restoresecurity, network, account, and system configurations. | Backup, Object storage,Archive storage |
| 2.7.3.2 | The VDMS shall provide the capability to backup configurationand system data of all VDMS elements. | Backup, Object storage,Archive storage |
| 2.7.3.3 | The VDMS shall provide the means to restore operationalcapability. | Backup, Object storage,Archive storage |

# Mission Support Systems

# Mission Support Systems: Full Packet Capture Oracle Cloud Guidance

|     |     |     |
| --- | --- | --- |
| Req. ID | Full Packet Capture (FPC) Requirements | Oracle Cloud NativeServices |
| 2.3.5.1 | The FPC shall support integration with log insight detectorsystems to effect data search and retrieval, such as thecapability to pull select timeframes of captured data. | vTAP\*Customers are responsiblefor Log Insight Detector |
| 2.3.5.2 | The FPC shall provide the means to reconstruct all networktraffic sessions traversing the SCCA Component. | vTAP |
| 2.3.5.3 | The FPC shall provide defined data queries that run againstmetadata. | vTAP |
| 2.3.5.4 | The FPC shall provide a capability to request an arbitrary subsetof packets. | vTAP |
| 2.3.5.5 | The FPC shall locally store captured traffic for 30 days. | VTAP, Object StorageLifecycle |
| 2.3.5.6 | The FPC data shall be isolated from user and data plane trafficvia cryptographic or physical means. | vTAP |
| 2.3.5.7 | The FPC data shall be query-able from a secure remote locationon the management network. | vTAP |
| 2.3.5.8 | The FPC function shall be configurable according to traffic flowsource and destination points to avoid multiple point capture. | vTAP |

Table 7. Boundary Cloud Access Point (CAP) Requirements

# Boundary Cloud Access Point (BCAP)

# Functional Requirements: BCAP Oracle Cloud Guidance

|     |     |     |
| --- | --- | --- |
| Req. ID | Boundary Cloud Access Point Requirement | Oracle Cloud Native Services |
| 2.2.1.1 | The BCAP and ICAP shall extend the DoDIN into the virtualnetwork of the CSE. | Oracle Cloud VCN, FastConnect,DRG |
| 2.2.1.2 | The BCAP shall provide a network connection to establishedMeetMe Points in order to route DISN traffic to impact level4 & 5 mission applications hosted in Off-Premises CSEs. | FastConnect |
| 2.2.1.3 | The MeetMe facility shall provide the capability to host aDISN endpoint router and provide cross connect transport toa CSP router. | Oracle Cloud Infrastructure |
| 2.2.1.4 | The BCAP shall provide a capability to simultaneouslyconnect to multiple CSPs via a MeetMe Point. | Oracle Cloud Networking |
| 2.2.4.2 | The ICAP shall allow secure client access to the by CSPprivileged users to CSP owned and operated managementnetwork. | Oracle Cloud Networking,Identity Domain, Bastion |
| 2.2.4.3 | The ICAP shall allow the transfer of security sensor datafrom the mission owner virtual networks to the DISNmanagement network. | Oracle Cloud Networking |
| 2.2.4.4 | The ICAP shall provide network traffic isolation between theCSP's privileged user (i.e., CSP Personnel) managementnetwork and DoD Mission Owner virtual networks. | Oracle Cloud Networking,Identity Domain |
| 2.2.5.10 | (Optional) The BCAP shall provide secure DNS proxy tosupport cloud hosted system URL resolution of public IPspace using DISN IP translation. | Native DNS |
| 2.2.5.5 | (Optional) The BCAP and ICAP shall provide the capability todynamically manage the opening and closing of UserDatagram Protocol (UDP) ports carrying Real-time TransportProtocol (RTP)/RTP Control Protocol (RTCP) media streams. | Oracle Cloud Networking |
| 2.2.5.9 | (Optional) The BCAP shall provide network addresstranslation (NAT) to translate public IP to DISN IP whenSoftware-as-a-Service (SaaS) CSOs require the use of publicIP. | NAT Gateway |
| 2.3.1.1 | The BCAP, ICAP, and VDSS shall allow approved ports andprotocols communications to include whitelisted missionapplication traffic & services access from internet via theDISN Internet Access Point (IAP). | Ports, Protocols, and ServicesManagement (PPSM) |
| 2.3.1.3 | The BCAP, ICAP, and VDSS shall allow secure connections tothe mission owner application enclave for user plane trafficsourced from within the DISN or the internet via the IAP. | Network Firewall, IPAM, VCN,Subnets, Security Lists |
| 2.3.1.4 | The BCAP, ICAP, and VDSS shall provide for logicalseparation of mission owner application networks. | Network Firewall, IPAM, VCN,Subnets, Security Lists |
| 2.5.1.1 | In the event of a catastrophic site failure, the ICAP andBCAP/MeetMe shallallow the failover of functionality fromone site to another with minimum impact to mission userapplication traffic and mission owner management traffic.The amount of time needed to failover a site should be lessthan 30 seconds once initiated. | Oracle Cloud Disaster Recovery(DRGv2 and transit route viabackbone to another region) |
| 2.5.1.2 | The BCAP/ICAP shall maintain online backup configurationsfor recovery of operations. | Backup, Object storage, Archivestorage |
| 2.5.1.3 | The BCAP/ICAP management systems shall provide amechanism for managing failover. | Oracle Cloud DR(DRGv2 and transit route viabackbone to another region) |
| 2.5.1.4 | The BCAP/ICAP management systems shall provide thecapability to ensure all SCCA element configurations andpolicies are recoverable. | Resource Manager, Backup,Object storage, Archive storage |
| 2.5.1.5 | The BCAP/ICAP shall maintain offsite backup configurationsfor the recovery of operations. | Cross-region Replication (ObjectStorage) |
| 2.6.1.1 | The BCAP/MeetMe shall be designed to scale to meet thebandwidth and session demands of all projected CSO hostedmission applications and to support accessibility by multipleCSPs. | Oracle Cloud Networking |
| 2.6.1.2 | In the event of a failover, the surviving BCAP/MeetMe at analternate site shall have sufficient capacity to meet thecombined bandwidth and session demands of its own plusthose failed over from the other site. | Oracle Cloud Infrastructure |
| 2.6.1.3 | The BCAP/ICAP shall support scalability of up to 10Gigabit/second throughput at all points within the design. | Oracle Cloud Infrastructure |
| 2.7.1.1 | The BCAP/ICAP shall provide the ability to backup andrestore security, network, account, and systemconfigurations. | Backup, Object storage, Archivestorage |
| 2.7.1.2 | The BCAP/ICAP shall provide the capability to backupconfiguration and system data of all SCCA elements. | Backup, Object storage, Archivestorage |
| 2.7.1.3 | The BCAP/ICAP shall provide the means to restoreoperational capability. | Backup, Object storage, Archivestorage |

# Trusted Cloud Credential Manager (TCCM)

Table 8. Trusted Cloud Credential Manager (TCCM) Requirements

# Functional Requirements: TCCM Oracle Cloud Guidance

|     |     |     |
| --- | --- | --- |
| Req. ID | Trusted Cloud Credential Manager Requirements | Oracle Cloud Native Services |
| 2.1.4.1 | The TCCM shall develop and maintain a Cloud CredentialManagement Plan (CCMP) to address the implementation ofpolicies, plans, and procedures that will be applied to missionowner customer portal account credential management. | IAM, Identity Domain |
| 2.1.4.2 | The TCCM shall collect, audit, and archive all Customer Portalactivity logs and alerts. | IAM, Object Storage,Logging |
| 2.1.4.3 | The TCCM shall ensure activity log alerts are shared with,forwarded to, or retrievable by DoD privileged users engaged inMission Cyberspace (MCP) and Boundary Cyberspace Protection(BCP) activities. | IAM, Object Storage,Logging |
| 2.1.4.4 | The TCCM shall, as necessary for information sharing, create logrepository access accounts for access to activity log data byprivileged users performing both Mission Cyberspace Protection(MCP) identified in Cloud Cyberspace Protection Guide (CCPG)and Boundary Cyberspace Protection (BCP) activities. | IAM, Object Storage,Logging |
| 2.1.4.5 | The TCCM shall recover and securely control customer portalaccount credentials prior to mission application connectivity tothe DISN. | Identity Domain, IAM |
| 2.1.4.6 | The TCCM shall create, issue, and revoke, as necessary, role-based access least privileged customer portal credentials tomission owner application and system administrators (i.e., DoDprivileged users). | Identity Domain, IAM |
| 2.1.4.7 | The TCCM shall limit, to the greatest extent possible, the issuanceof customer portal and other CSP service (e.g., API, CLI) end-point privileges to configure network, application, and CSOelements. | Identity Domain |
| 2.1.4.8 | The TCCM shal ensure that privileged users are not allowed touse CSP IdAM derived credentials which possess the ability tounilaterally create unauthorized network connections within theCSE, between the CSO and the CSP's private network, or to theinternet. | Identity Domain |

# Oracle Cloud Native SCCA LZ Reference Architecture

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/bb5d30d5007defbf9ec328fda74f152cdfed5bc05b8f1321ef9ade562cf9f372.jpg)

Figure 7. SCCA Deployment Concepts

Figure 7 above represents the reference architecture for the Cloud Native SCCA Landing Zone that provides the abstract building blocks for constructing SCCA components and configurations for you to become SCCA compliant. You may deploy this architecture based on OCI cloud native services found here. This reference architecture is based on the DISA FRD and has components of CAP/BCAP, VDSS, VDMS, and TCCM.

# Oracle Cloud Native SCCA LZ Reference Architecture for TCCM

Figures 7 and 8 represent high-level SCCA concepts and a reference architecture for deploying your SCCA within an Oracle Cloud tenancy.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/07af47da060338a23c37cfa9f66a97dfaf677ed70ae5858aa969fd3ef5320452.jpg)

Figure 8. Trusted Cloud Credential Manager

Figure 8 shows the DoD Identity, Credential and Access Management (ICAM), OCI Identity and Access Management (IAM), and Identity Domain Services controlling access on a least trust model design. Your DoD network users access the OCI tenancy and workloads through ICAM policies and CAC authorization. Oracle only authenticates users via CAC, X.509, Public Key Infrastructure (PKI), or an external authentication method that is

supported and authorized by the DoD. Welcome emails are sent to the mission owner and administrator. Oracle recommends federating or authenticating from CAC to the DoD user database and disabling local users’ and local administrators’ logins. OCI IAM provides OCI Audit to users who need access to auditing management.

# Oracle Cloud Native SCCA Landing Zone Monitoring Architecture

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/61fa0472bc231bc9f8090bc287f6fdfb59a16084831029e60eef8fd9fe8f6eaa.jpg)

Figure 9. Oracle Cloud SCCA LZ Monitoring Architecture

Figure 9 above represents several services that provide you monitoring capabilities across your tenancy. Services include but not are not limited to Object Storage, Events, Notifications, and Logging Analytics. These services are part of our OCI Monitoring Platform which may be referenced from this link.

As part of this Cloud Native SCCA solution, there is a monitoring structure in the VDSS, VDMS, and workload compartments that fulfills your initial SCCA requirement. This may be adjusted according to your administrators operational model. Services inside OCI provide metrics and events that may be monitored through your metrics dashboard. You may create alerts based upon queries of these metrics and events. You may organize these alerts into groups with topics you create. You may create different topics by compartment (VDSS, VDMS and workload) and assign different monitoring rules assigned to them.

# Oracle Cloud Native SCCA LZ Functional Architecture

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/37682e96c01aa03ce48f5f9b9342935865ab176c74dd59c1e3d77c0a18cca9b8.jpg)

Figure 10. Oracle Cloud SCCA LZ Functional Architecture

Figure 10 above represents the functions of individual components of our Cloud Native SCCA LZ solution for you as the mission owner.

DISA BCAP connection with OCI at MMP: Security capabilities provided by inspect and filter, Cyber Defense Functions (FPC, IDS/IPS), NAT Gateway, FastConnect, and others.

Mission Owners’ workload tenancies: Application security provided by Web Application Firewall, CAC authorization, certificate management, reverse proxy, load balancing, SSO, federation, and others.

VDSS: Network Security Functions: Network firewall, transit routing, traffic isolation, FPC, threat detection/auto-remediation, and others.

VDMS: Virtual Datacenter Managed Services: Secure access to mission owner enclave, monitoring and event capture, key management, VM scanning, patching, vulnerability scanning, and others.

 Logging: Audit logs, application logs, Object Storage, log isolation for mission owners, events, correlations, and others.

Trusted Cloud Credential Manager (TCCM): Tenancy-wide functions include privileged account management, endpoint access management via API/CLI, audit, security logs, least privilege access, and Attribute Based Access Control (ABAC).

 CSSP Access to Tenancy: FPC Log, Object Storage, service logs accessible via Service Connector Hub, and others.

# Oracle Cloud Native SCCA LZ Functional Flow Architecture

Figure 11 below represents the functional flow of our Cloud Native SCCA LZ solution we provide you as the mission owner.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/0748b77bd604ab1f76de741606ca61bf7883a2f42c27980902ab9cd0f9a527cc.jpg)

Figure 11. Oracle Cloud SCCA LZ Functional Flow Architecture

DoDIN or On-premises: The CAP Inspects and Filters Cyber Defense Functions (FPC, IDS/IPS), NAT Gateway, and FastConnect.

VDSS: These network security functions include Network Firewall, transit routing, traffic isolation, Full Packet Capture (FPC), threat detection, and auto-remediation.

Virtual Datacenter Managed Services: This mission owner enclave includes monitoring and event capture, key management, VM scanning, patching, and vulnerability scanning.

Logging: Our solution includes audit logs, application logs, Object Storage, log isolation for mission owners, events, and correlations.

Application Security: Our Security includes Web Application Firewall (WAF), CAC authorization, certificate management, reverse proxy, load balancing, SSO, and Federation.

# Oracle Cloud Native SCCA LZ Technical Architecture

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/8c706963dc8e81f9347d96952bd9e22332b836bbdb945995e5c7a694a521dd58.jpg)

Figure 12. Oracle Cloud Native SCCA LZ Technical Architecture

25 Architecture Guide / Oracle Cloud Native SCCA Landing Zone (LZ) / Version 2.0

Copyright $\\circledcirc$ 2023, Oracle and/or its affiliates / Public

VDSS: The VCN is the single access point in and out for your traffic within your environment and your traffic is isolated and network controlled for routing.

• DRG: Your virtual router to which you can attach VCNs and IPSec tunnels.

• Firewall: Provides intrusion detection and prevention service and filters out incoming traffic based on rules.

VDMS: Corresponds to all the core services required for managing the operations of the environment such as vault, VSS, and object storage.

Virtual Private Vault (VPV): Encryption management service that stores and manages encryption keys and secrets to securely access resources. The VPV will be replicated to DR region for redundancy and key management in case of a disaster.

• Service Connector Hub: Your service to transfer data between services.

• VSS: You must use this to continuously monitor all enclaves within your Cloud Provider environment.

Cloud Guard: This service will use your organization’s tenancy home region as the reporting region. Cloud Guard is used in conjunction with VSS detector recipes to support SCCA requirement \[2.1.3.1\].

Streaming: This capability will ingest and consuming high-volume data streams in real-time

Workload Compartment: Every workload has a dedicated compartment and VCN routing through the VDSS and the Network Firewall to communicate with on-premises systems.

Logging Analytics: Oracle Logging Analytics is a cloud solution in OCI that lets you index, enrich, aggregate, explore, search, analyze, correlate, visualize, and monitor all log data from your applications and system infrastructure on-premises or in the cloud.

Object Storage: This cloud storage service backups logging, audits, and flow logs and will be replicated to a disaster recovery region simultaneously to external logging tenancy for audit review.

• Tenancy-wide services: These services include Identity Domains, IAM, Policies, Auditing, and Cloud Guard.

Independent services: These are tenancy-wide services that will be activated to be used with the LZ, Cloud Guard and VSS.

Logging: This service is available within your tenancy for auditing and includes a compartment where all the audit logs will be dumped into a share location with retention rules so the logs may not be modified. The DoD requirement is for the bucket to be accessible to external users, auditors, etc. without modifying the permissions of the remaining environment.

# Oracle Cloud Native Services used in SCCA LZ

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/7f4eff80f099828338ba4111d63e85fb52fa4e243af96c130bc52458601257a2.jpg)

26 Architecture Guide / Oracle Cloud Native SCCA Landing Zone (LZ) / Version 2.0

Figure 13 above represents the available native services for your SCCA LZ. Below is a list with hyperlinks to the Cloud Native Services available within your SCCA LZ Solution:

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/16821310623b6366dac746fdd178307bd0701e69bc7a78224dc520ee232749f5.jpg)

# VCNs

Virtual Cloud Networks set up virtual versions of traditional network components.

Security List

Security lists let you define a set of security rules that applies to all the Virtual Network Interface Cards (VNICs) in an entire subnet.

These define a set of security rules that applies to a group of VNICs of your choice.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/8c8f0227f322800362e732d5fb04ecf931def5158869f9b60f427cc9c3adab9b.jpg)

API Gateway

These enable you to create governed HTTP/S interfaces for other services, including Oracle Functions, Container Engine for Kubernetes, and Container Registry.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/1c9559730e2e5ef476700ec27595c5b903b6af19253c8c6e766745082873cfae.jpg)

Object Storage

This internet-scale, high-performance storage platform offers reliable and costefficient data durability.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/a289490435502e099c260fce48ba9f432b518665e95606403df2b1885b402fd7.jpg)

Auto Scaling

Oracle Cloud automatically adjusts the number or the lifecycle state of compute instances in an instance pool.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/bc63d7ca97535c01a900ad70d3d3e2fd75e1b5b81a719b3c3c64c684fbc88644.jpg)

Logging and Analytics

vTAP

Oracle Cloud’s solution that lets you index, enrich, aggregate, explore, search, and monitor all log data from your applications and system infrastructure.

vTAP provides a way to mirror traffic from a designated source to a selected target to facilitate troubleshooting, security analysis, and data monitoring.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/51b88f30f14b6247600f6b0fd90eecce09acbdb62b5b0333ad97b15c750f7ef4.jpg)

Identity Domains

A container for managing users and roles, federating and provisioning of users, secure application integration through Oracle Single Sign-On (SSO) configuration, and SAML/OAuth based Identity Provider administration.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/00ed2d2fcb4741707ef7fcd21d98070815926b4e85558471b5d7262557ab3d37.jpg)

Network Firewall

Our Cloud Native managed network firewall and intrusion detection and prevention service for VCN.

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/3f7330ccac6765e4d71219471769541fed074c351a7fc211244fe681660cfdcb.jpg)

Load Balancer

Our service that provides automated traffic distribution from one entry point to multiple servers reachable from your virtual cloud network (VCN).

![](https://www.oracle.com/a/ocom/docs/industries/public-sector/images/747ffd961e11de4fd3e5757cb2dbde3e055850298e0b452c170b1695dd4145bf.jpg)

Vulnerability Scanning

Our service helps improve your security posture by routinely checking hosts and container images for potential vulnerabilities.

Our Logging service provides a highly scalable and fully managed single interface for all your logs.

Our Monitoring platform enables you to monitor your cloud resources using the Metrics and Alarms features actively and passively.

Our Notifications broadcast messages to distributed components through a publish-subscribe pattern, delivering secure, highly reliable, low latency, and durable messages for applications hosted on Oracle Cloud and externally.

# Oracle Services Limits Required

The minimum service limits that you need to run the Cloud Native SCCA Landing Zone in your tenancy are below:

# Oracle Cloud Regions

Table 9. Oracle Cloud Native SCCA Service Limits

|     |     |     |
| --- | --- | --- |
|  | Service Limit Name | Service Limit Value |
| 1 | oci\_announcements\_service\_announcement\_subscription: | 25 |
| 2 | oci\_events\_rule | 50 |
| 3 | oci\_cloud\_guard\_target | 30 |
| 4 | oci\_identity\_compartment | 1000 |
| 5 | oci\_identity\_domain | 10 |
| 6 | oci\_identity\_dynamic\_group | 50 |
| 7 | oci\_identity\_policy | 100 |
| 8 | oci\_kms\_vault | 1 |
| 9 | oci\_kms\_key | 1000 |
| 10 | oci\_oad\_balancer\_load\_balancer | 300 |
| 11 | oci\_load\_balancer\_load\_balancer | 300 |
| 12 | oci\_oad\_balancer\_load\_balancer | 5 |
| 13 | oci\_load\_balancer\_load\_balancer | 100 |
| 14 | oci\_load\_balancer\_load\_balancer | 5 |
| 15 | oci\_load\_balancer\_load\_balancer | 50 |
| 16 | oci\_log\_analytics\_log\_analytics\_og\_group | 50 |
| 17 | oci\_logging\_log | 500 |
| 18 | oci\_logging\_log\_group | 100 |
| 19 | oci\_core\_drg\_route\_distribution | 100 |
| 20 | oc\_core\_drg\_route\_distribution\_statement | 300 |
| 21 | oci\_core\_drg\_route\_table | 100 |
| 22 | oci\_core\_drg\_route\_table\_route\_rule | 100 |
| 23 | oci\_network\_firewall\_network\_firewall | 3 |
| 24 | oci\_network\_firewall\_network\_firewall | 100 |
| 25 | oci\_network\_firewall\_network\_firewall\_policy | 50 |
| 26 | oci\_network\_firewall\_network\_firewall\_policy | 100 |
| 27 | oci\_network\_load\_balancer\_backend\_set | 50 |
| 28 | oci\_network\_load\_balancer\_listener | 50 |
| 29 | oci\_network\_load\_balancer\_network\_load\_balancer | 4 |
| 30 | oci\_ons\_notification\_topic | 100 |
| 31 | oci\_sch\_service\_connector | 20 |
| 32 | oci\_bastion\_bastion | 5 |
| 33 | oci\_core\_service\_gateway | 2 |
| 34 | oci\_streaming\_stream | 15 |
| 35 | oci\_monitoring\_alarm | 100 |
| 36 | oci\_core\_default\_route\_table | 10 |
| 37 | oci\_core\_default\_security\_list | 300 |
| 38 | oci\_core\_drg | 5 |
| 39 | oci\_core\_drg\_attachment | 100 |
| 40 | oci\_core\_route\_table | 300 |
| 41 | oci\_core\_subnet | 300 |
| 42 | oci\_core\_vcn | 50 |
| 43 | oci\_core\_tap | 4 |
| 44 | oci\_vulnerability\_scanning\_host\_scan\_recipe | 100 |
| 45 | oci\_vulnerability\_scanning\_host\_scan\_target | 200 |
| 46 | oci\_waa\_web\_app\_acceleration\_policy | 100 |
| 47 | oci\_waf\_web\_app\_firewall\_policy | 100 |
| 48 | oci\_announcements\_service\_announcement\_subscription: | 25 |
| 49 | oci\_events\_rule | 50 |
| 50 | oci\_cloud\_guard\_target | 30 |
| 51 | oci\_identity\_compartment | 1000 |

# Landing Zone Script

This section below provides a sample Native SCCA Landing Zone script. The entire script will be available to download at Oracle Cloud’s Architecture site, GitHub, and via Oracle Cloud Console.

Example Script - Manage Identity Domain.

# Reference:

# [https://docs.oracle.com/en-us/iaas/Content/API/Concepts/signingrequests.htm\#seven\_\_Python](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/signingrequests.htm\#seven__Python)

# [https://vTAP.ateam-oracle.com/post/oracle-cloud-infrastructure-oci-rest-call-walkthrough-with-curl](https://vtap.ateam-oracle.com/post/oracle-cloud-infrastructure-oci-rest-call-walkthrough-with-curl)

[https://github.com/oracle-quickstart/oci-scca-landingzone](https://github.com/oracle-quickstart/oci-scca-landingzone)

import argparse

import oci

import json

import requests

class ManageIdentityDomain: def **init**(self, domain\_id, group\_names): self.config $=$ oci.config.from\_file() self.auth $=$ oci.Signer( tenancy $=$ self.config\['tenancy'\], user $=$ self.config\['user'\], fingerprin $\\underline { { \\underline { { \\mathbf { \\Pi } } } } } =$ self.config\['fingerprint'\], private\_key\_file\_location $\\mid =$ self.config\['key\_file'\], pass\_phrase $=$ self.config\['pass\_phrase'\] ) self.identity\_client $=$ oci.identity.IdentityClient(self.config)

self.host $=$ self.get\_domain\_url(domain\_id) self.group\_endpoint $=$ self.host $^ +$ "/admin/v1/Groups" self.group\_names $=$ group\_names

def get\_domain\_url(self, domain\_id): print("Waiting for domain to enter ACTIVE state") get\_domain\_response $=$ self.identity\_client.get\_domain(domain\_id $=$ domain\_id) wait\_until\_domain\_available\_response $=$ oci.wait\_until(self.identity\_client, get\_domain\_response, 'lifecycle\_state', 'ACTIVE')

return wait\_until\_domain\_available\_response.data.url

def create\_group(self, group\_name): body $\\begin{array} { r } { \\mathbf { \\Psi } = \\left{ \\begin{array} { r l } \\end{array} \\right. } \\end{array}$ "displayName": group\_name, "schemas": \[ "urn:ietf:params:scim:schemas:core:2.0:Group", "urn:ietf:params:scim:schemas:oracle:idcs:extension:group:Group" \]

}

response $=$ requests.post(self.group\_endpoint, json $=$ body, auth $\\mid =$ self.auth) response.raise\_for\_status()

print(f"Display Name: {group\_name} \\tOCID: {json.loads(response.content)\['ocid'\]}")

def create\_groups(self):

for group in self.group\_names: print(f"Provisioning group {group}") try: self.create\_group(group) except requests.HTTPError as e: print(f"Error creating group {group}") print(e)

def delete\_group(self, group\_name): # $@$ TODO finish delete method and add destroy provisioner return # filter $\\backsimeq$ displayName eq "john" response $=$ requests.delete( self.group\_endpoint $^ +$ f"/", auth $=$ self.auth) response.raise\_for\_status()

def delete\_groups(self):

for group in self.group\_names: print(f"Deleting group {group}") try: self.delete\_group(group) except requests.HTTPError as e: print(f"Error deleting group {group}") print(e)

if **name** $= =$ " **main**":

parser $=$ argparse.ArgumentParser(description $= ^ { 1 }$ "Manage an Identity Domain")

parser.add\_argument(vTAP-d', vTAP--domain\_id', help=" Id of the domain to manage", required $=$ True)

parser.add\_argument(vTAP-g', vTAP--group\_names', nargs $=$ vTAP $^ +$ vTAP, help $=$ vTAP Names of the groups to create (space seperated)vTAP, required $=$ True)

args $=$ parser.parse\_args()

manage\_id $=$ ManageIdentityDomain(args.domain\_id, args.group\_names)

manage\_id.create\_groups()

# CAC and PIV Sign-in to Oracle Cloud’s Console

This section describes how you may use a Common Access Card (CAC) or Personal Identity Verification (PIV) Card to sign into the Oracle Cloud Console.

National Institute of Standards and Technology (NIST) Special Publication (SP) 800-63C provides requirements when using federated identity architectures and assertions to convey the results of authentication processes and relevant identity information to an agency application. Oracle Cloud’s OC3 realm supports NIST SP 800-63C Federated Authentication Level (FAL) 3. FAL3 requires the subscriber to present proof of possession of a cryptographic key referenced in the assertion in addition to the assertion artifact itself. The assertion is signed by the Identity Provider (IdP) and encrypted to the relying parties using approved cryptography.

Oracle Cloud’s DoD customers are expected to provide their own X.509-capable IdP that also support the Security Assertion Markup Language (SAML) Holder-of-Key profile. This functionality is provided by Oracle’s Identity Domain Cloud Service.

# DoD Information Impact Level 5 Isolation Guidance

# Customer Isolation

Oracle Cloud is built around our security-first principles. Our architecture helps reduce risk from advanced threats and isolates tenant data to ensure data privacy and security. You, as a DoD mission owner, may benefit from isolated network virtualization that reduces the risk of hypervisor-based attacks. Your tenancy isolation limits the risk of threat proliferation with hardware-based root of trust that ensures each server is provisioned with clean firmware and network segmentation that isolates services to ensure access is controlled, monitored, and driven by your strict policies.

Oracle Cloud’s DoD realm supports only US Federal Civilian and US Department of Defense and DoD community cloud customers (as defined in SRG) operating up to FedRAMP High or up to DoD Impact Levels 2, 4 or 5. Oracle Cloud’s US DoD realm does not host non-Federal US government tenants, such as state, local, or tribal governments, academic partners, or foreign governments. Per the CC SRG (Section 5.2.2.3), “Information that must be processed and stored at Impact Level 5 can only be processed in a DoD private/community or federal government community cloud, on-premises or off-premises” \[…\] and:

Virtual and logical separation between DoD and Federal Government tenants and missions is sufficient. Virtual and logical separation between tenant and mission systems is minimally required. Physical separation from non-DoD or non-Federal Government tenants (i.e., public, local, and state government tenants) is required.

# Compute Isolation

If you are operating at DoD IL5 and prefer or require an additional level of compute isolation above the virtual or logical separation offered in our community cloud, you may choose to leverage Oracle Cloud Bare Metal or Dedicated Virtual Machine (VM) Host options. A bare metal compute instance provides dedicated physical server access for the highest performance and strong isolation, while Dedicated Virtual Machine Hosts provide the ability to run Compute VM instances on dedicated servers that are a single tenant and not shared with other customers.

# Network Isolation

Oracle Cloud reduces your risk by decoupling network virtualization from the hypervisor. Oracle implemented network virtualization as a highly customized hardware and software layer that moves cloud control away from the hypervisor and host and puts it on its own network. This hardened and monitored layer of control is what enables your isolated network virtualization. Isolated network virtualization is implemented in every data center in every region, which means that all Oracle Cloud tenants benefit from this reduced risk.

Oracle Cloud’s physical network architecture adds a layer of defense to the isolated network virtualization by further isolating your tenancies and limiting the risk of threat proliferation. The physical network components are the racks, routers, and switches that form the physical layer of OCI.

Access control lists (ACLs) are enforced for the top-of-rack (ToR) switches. ACLs enforce adherence to the communications pathways within the topology. For example, the ToR switch drops any packet in which the virtual network source IP address and its corresponding physical network port don’t match the expected mapping. This mismatch would occur if an attacker spoofed the virtual source IP address, to pretend to be a legitimate traffic source to reach other tenants. The ACLs are designed to prevent IP spoofing by associating the expected IP addresses for an isolated network virtualization device with the physical ports that the device is connected to. Additionally, the destination device performs a reverse-path check on packets to prevent encapsulation header tampering.

# Hardware-based Root of Trust

A primary design principle of Oracle Cloud is protecting tenants from firmware-based attacks. Threats from the firmware level are becoming more common, which raises the potential risks for public cloud providers. So that each server is provisioned with clean firmware, Oracle implemented a hardware-based root of trust for the process of wiping and reinstalling the server firmware. Oracle Cloud uses this process every time a new server is provisioned for a tenant or between tenancies, regardless of the instance type.

The hardware-based root of trust is a protected hardware component that’s manufactured to our specification and inspected visually. It’s limited to performing the specific task of wiping and reinstalling firmware. It triggers a power cycle of the hardware host, prompts for the installation of known firmware, and confirms that the process has performed as expected. This method of firmware installation reduces the risk from firmware-based attacks, such as a permanent denial of service attack or attempts to embed backdoors in the firmware to steal data or make it otherwise unavailable.

# Cryptographic Isolation of Storage

Vaults are logical entities where the Vault service creates and durably stores keys and secrets. The type of vault you have determines features and functionality such as degrees of storage isolation, access to management and encryption, scalability, and the ability to back up. The type of vault you have also affects pricing. You cannot change a vault's type after you create the vault.

The Vault service offers different vault types to accommodate your organization's needs and budget. All vault types ensure the security and integrity of the encryption keys and secrets that vaults store. A virtual private vault is an isolated partition on a hardware security module (HSM). Vaults otherwise share partitions on the HSM with other vaults.

Keys are logical entities that represent one or more key versions, each of which contains cryptographic material. A key's cryptographic material is generated for a specific algorithm that lets you use the key for encryption or in digital signing. When used for encryption, a key or key pair encrypts and decrypts data, protecting the data where the data is stored or while the data is in transit. With an AES symmetric key, the same key encrypts and decrypts data. With an RSA asymmetric key, the public key encrypts data and the private key decrypts data.

Conceptually, the Vault service recognizes three types of encryption keys: master encryption keys, wrapping keys, and data encryption keys.

When you create a master encryption key, the Vault service can either generate the key material internally or you can import the key material to the service from an external source. When you create master encryption keys, you create them in a vault, but where a key is stored and processed depends on its protection mode.

Master encryption keys can have one of two protection modes: HSM or software. A master encryption key protected by an HSM is stored on an HSM and cannot be exported from the HSM. All cryptographic operations involving the key also happen on the HSM. Meanwhile, a master encryption key protected by software is stored on a server and, therefore, can be exported from the server to perform cryptographic operations on the client instead of on the server. While at rest, the software-protected key is encrypted by a root key on the HSM. For a softwareprotected key, any processing related to the key happens on the server.

To meet the guidance outlined in the CC SRG, Section 5.11, Oracle recommends customers operating at DoD IL4 and IL5 to use the Virtual Private Vault option in Oracle Cloud.

# Database-as-a-Service Isolation

Oracle Cloud provides multiple options for database-as-a-service. If you are operating at DoD IL5 and prefer or require an additional level of database compute isolation above the virtual or logical separation offered in Oracle’s community cloud, you may choose to leverage Oracle Cloud single-node database systems on bare metal or Exadata Cloud Service.

# DoD Security Technology Implementation Guide (STIG) Guidance

# Oracle Linux STIG Image

Oracle Linux STIG Image is an implementation of the Security Technical Implementation Guide (STIG). With this image, you can create an Oracle Linux 8 instance in Oracle Cloud that you can configure to follow certain security standards and requirements that were set by the Defense Information Systems Agency (DISA).

Oracle Linux STIG Image is available at the following locations:

Oracle Cloud where the image may be accessed by using either the embedded Marketplace or the Oracle Images tab. • Oracle Cloud Marketplace which is outside of OCI.

# STIG Tool for Virtual Machine Database Systems

Oracle Cloud provides a Python script, referred to as the STIG tool, for Oracle Cloud’s virtual machine database systems provisioned using Oracle Linux 8. The STIG tool is used to ensure security compliance with DISA's Oracle Linux 8 STIG.

The STIG tool is provided for all newly provisioned virtual machine database systems in the following OS directory location on virtual machine database system nodes:

/opt/oracle/dcs/bin/dbcsstig

The architecture has the following components:

# 1\. Compartment

The SCCA Landing zone creates a compartment structure that organizes the resources in a way that aligns with the SCCA requirements. The following compartments are created as part of the SCCA Landing Zone: SCCA Parent, VDSS, VDMS, Backup, Logging, and Workload.

# 2\. Identity

The SCCA Landing Zone assumes that the Identity Domain feature is available in the realm where it will be deployed. The X.509 feature flag will be enabled in this deployment of Landing Zones. You, as the DoD mission owner, will need to provide your own X.509 Identity Provider (IdP) which should also support the SAML Holder-of-Key profile. Once this is configured, federated users will be able to sign-in into the Oracle Cloud Console with their Common Access Card (CAC) or Personal Identity Verification (PIV) Card. In order to support SCCA access requirements with the above compartment configuration, the following IAM Groups will be deployed: VDSSAAdmin Group, VDMS Admin Group, and Workload Admin Group.

# 3\. Networking

To protect all the traffic flows (North-South and East-West), Oracle Cloud recommends segmenting the network using a hub and spoke topology, where traffic is routed through a central hub called Virtual Datacenter Security Stack (VDSS) VCN and is connected to multiple distinct networks (spokes) called Virtual Datacenter Managed Services (VDMS) VCN and Workload VCNs.

All traffic between VDMS and Workload, whether to and from the internet, to and from on-premises, or to the Oracle Services Network or between them, is routed through the VDSS and inspected with the network firewall’s multi-layered threat prevention technologies. The role of the Network Firewall is critical and being a PaaS service, performance is managed by Oracle Cloud. The VDSS VCN contains a network firewall based on Palo Alto Technologies, an Oracle internet gateway, a DRG, and an Oracle Service Gateway. The VDSS VCN connects to the spoke (VDMS and Workload) VCNs through a DRG. Each VCN has an attachment to the DRG, which allows them to communicate with each other. For further details about DRG and VCN Attachment please refer to this article: Dynamic Routing Gateways. All spoke (from VDMS and Workload) traffic uses route table rules to route traffic through the DRG to the VDSS for inspection by the network firewall.

The architecture also presents the option to use the new packet capture service in Oracle Cloud called Virtual Testing Access Point (vTAP). Another key component of the architecture is the integration between the Load balancer (deployed in VDMS and Workload) and the Web Application Firewall (WAF).

# 4\. Security

The following Oracle Cloud services will be implemented by the SCCA Landing Zone to help your organization meet the SCCA VDMS Security requirements.

 Vault (Key Management)

 Log Archiving Storage Bucket

 Streams & Events

 Default Log Group

 Service Connector

 Vulnerability Scanning Service (VSS)

 Cloud Guard

 Bastion

# 5\. Monitoring

Our Oracle Cloud Landing Zone provides several services that work together to provide monitoring capabilities across your tenancy. It creates a monitoring structure in the VDSS, VDMS, and workload components that sets fulfills your initial monitoring requirement. This provides a starting point that administrators may adjust according to their own operational model. To avoid excessive cost and a lot of messages, the landing zone deployment will have these alerts disabled by default. Based upon your operational model, you can enable the relevant alerts from the Oracle Cloud console.

# Considerations

Consider the following points when deploying this SCCA LZ architecture:

# 1\. Performance

Within a region, performance isn’t affected by the number of VCNs. When you peer VCNs in different regions, consider latency. When deciding which components or applications will be deployed within the VDMS and mission owner Workload Compartments (Spoke VCNs) you will need to carefully consider the throughput that will need to be implemented at the connectivity level with the on-premises environment on your virtual private network (VPN) or FastConnect.

# 2\. Security

Use appropriate security mechanisms to protect the topology. The topology that you deploy by using the provided Terraform code incorporates the following security characteristics:

The default security list of the VDSS VCN allows SSH traffic from 0.0.0.0/0. Adjust the security list to allow only the hosts and networks that should have SSH access or any other additional services ports to your infrastructure. Spoke VCNs (VDMS and mission owner Workload) are not accessible from the internet.

# 3\. Management

Route management is simplified as most routes will be at the DRG. Using the DRG as the VDSS, it is possible to have up to 300 attachments.

# 4\. Operational Costs

Cloud Consumption should be monitored closely to ensure that operational costs are within your designated budget. Basic compartment-level tagging should be configured for the VDSS and VDMS compartments. Certain cloud resources such as Virtual Private Vault (dedicated HSM) and Network Firewall are SCCA requirements. These services have a higher operating cost and alternative services can be considered in non-production environments, e.g., a Shared Software Vault could be used instead in a nonproduction environment.

# Deploy

The Terraform code for this reference architecture is available as a sample stack in Oracle Cloud’s Resource Manager. You can also download the code from GitHub and customize it to suit your specific requirements.

Deploy using the sample stack in Oracle Cloud’s Resource Manager:

Login to Oracle Cloud Resource Manager

If you aren't already signed in, enter the tenancy and user credentials.

Select the region where you want to deploy the stack.

Follow the on-screen prompts and instructions to create the stack.

After creating the stack, click Terraform Actions and select Plan.

Wait for the job to be completed and review the plan.

To make any changes, return to the Stack Details page, click Edit Stack, and make the required changes.

Then, run the Plan action again.

If no further changes are necessary, return to the Stack Details page, click Terraform Actions and select Apply.

Deploy using the Terraform code in GitHub:

Go to GitHub.

Clone or download the repository to your local computer.

Follow the instructions in the README document.

# Acronyms

BCAP: Boundary CAP BCND: Boundary CND

• CAC: Common Access Card CAP: Cloud Access Point

• CND: Computer Network Defense

• CSE: Cloud Service Environment

• CSO: Cloud Service Offerings CSP: Cloud Service Provider

• CSSP: Cyber Security Service Providers

• DISA: Defense Information Systems Agency

• DISN: Defense Information System Network

• DoD CIO: DoD Chief Information Officer

• DoD: Department of Defense'

• DoDIN: DoD Information Network

• FRD: Functional Requirements Document

• IaaS: Infrastructure as a Service

• IL: Impact Level LZ: Landing Zone MCD: Mission Cyber Defense NSG: Network Security Groups PaaS: Platform as a Service

• PIV: Personal Identity Verification

• RoT: Root of Trust

• SaaS: software as a Service

SCCA LZ: SCCA Landing Zone SCCA: Secure Cloud Computing Architecture SRG: Security Resource Guide STIG: Security Technical Implementation Guides TCCM: Trusted Cloud Credential Manager USCYBERCOM: United States Cyber Command VDMS: Virtual Data-center Managed Services VDSS: Virtual Data-center Security Services vTAP: Virtual Testing Access Point

# Additional Information

For additional information specific to Oracle Cloud Native SCCA Solution, please reach out to Oracle Cloud DoD Product Management team via email below.

[oci-g2s-dod-prod-mgmt\_us\_grp@oracle.com](mailto:oci-g2s-dod-prod-mgmt_us_grp@oracle.com)

This paper will be updated as new guidance, requirements, design patterns, and cloud-native services are released. New or updated guidance, requirements, patterns and/or services will be released at Oracle’s sole discretion.

Connect with us

Call $+ 1 . 8 0 0$ .ORACLE1 or visit oracle.com. Outside North America, find your local office at: oracle.com/contact.

blogs.oracle.com

facebook.com/oracle

twitter.com/oracle
[Sitemap](https://medium.com/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40harjulthakkar%2Fdeploy-secure-landing-zone-on-oracle-cloud-infrastructure-8fe73265218&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](https://medium.com/?source=post_page---top_nav_layout_nav-----------------------------------------)

[Write](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[Search](https://medium.com/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40harjulthakkar%2Fdeploy-secure-landing-zone-on-oracle-cloud-infrastructure-8fe73265218&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

Member-only story

# Deploy Secure Landing Zone on Oracle Cloud Infrastructure

[![Harjul Jobanputra](https://miro.medium.com/v2/resize:fill:32:32/1*EiuGFBs2zP9CD1zY3i03TA.jpeg)](https://medium.com/@harjulthakkar?source=post_page---byline--8fe73265218---------------------------------------)

[Harjul Jobanputra](https://medium.com/@harjulthakkar?source=post_page---byline--8fe73265218---------------------------------------)

Follow

9 min read

·

Dec 15, 2021

1

[Listen](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D8fe73265218&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40harjulthakkar%2Fdeploy-secure-landing-zone-on-oracle-cloud-infrastructure-8fe73265218&source=---header_actions--8fe73265218---------------------post_audio_button------------------)

Share

When you plan to deploy your workload on Public Cloud, you need a secure environment that can be operated efficiently. The [Center for Internet Security](https://www.cisecurity.org/) (CIS) published _CIS Oracle Cloud Infrastructure Foundations Benchmark_, a set of step-by-step security configuration best practices for Oracle Cloud, back in Sep 2020.

To help customers quickly implement a tenancy, that is secure from the get-go, Oracle A-Team recently published a Terraform-based template to setup a Landing Zone on Oracle Cloud that meets the security guidance prescribed in the _CIS Oracle Cloud Infrastructure Foundations Benchmark._

[**Oracle Cloud Infrastructure** \\
\\
**Securing Oracle Cloud Infrastructure An objective, consensus-driven security guideline for the Oracle Cloud…**\\
\\
www.cisecurity.org](https://www.cisecurity.org/benchmark/oracle_cloud/?source=post_page-----8fe73265218---------------------------------------)

Having an OCI tenancy, setup with CIS benchmark, helps setup foundational security measures in Oracle Cloud tenancy that eliminates implementation guesswork for Security professionals. Following these best practices also minimizes complexity and enables security teams better manage risk and audit the use of Oracle Cloud Infrastructure for critical, and regulated information systems.

## Use OCI Landing Zone to accelerate Government of Canada (GoC) Guardrails configuration

The Landing Zone was originally developed to meet the CIS Benchmark for Oracle Cloud (which is widely used in the industry as a security benchmark), however, the same script also enables most of the technical controls defined in the GoC Guardrails within OCI.

The OCI Landing Zone template greatly **accelerates** the **implementation** of GoC Cloud Guardrails and quickly meet the 30-day and Authority-to-Operate (ATO) compliance requirements.

You can reach out to your Oracle Cloud Account Team to get the mapping document between CIS Benchmark and GoC Cloud Guardrails as part of the GC Cloud Operationalization Framework.

## OCI Landing Zone

The OCI Landing Zone Template helps save time by automating the setup of a cloud environment for running secure and scalable workloads while implementing an initial security baseline through the creation of core resources.

## Create an account to read the full story.

The author made this story available to Medium members only.

If you’re new to Medium, create a new account to read this story on us.

[Continue in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3Dregwall&source=-----8fe73265218---------------------post_regwall------------------)

Or, continue in mobile web

[Sign up with Google](https://medium.com/m/connect/google?state=google-%7Chttps%3A%2F%2Fmedium.com%2F%40harjulthakkar%2Fdeploy-secure-landing-zone-on-oracle-cloud-infrastructure-8fe73265218%3Fsource%3D-----8fe73265218---------------------post_regwall------------------%26skipOnboarding%3D1%7Cregister&source=-----8fe73265218---------------------post_regwall------------------)

[Sign up with Facebook](https://medium.com/m/connect/facebook?state=facebook-%7Chttps%3A%2F%2Fmedium.com%2F%40harjulthakkar%2Fdeploy-secure-landing-zone-on-oracle-cloud-infrastructure-8fe73265218%3Fsource%3D-----8fe73265218---------------------post_regwall------------------%26skipOnboarding%3D1%7Cregister&source=-----8fe73265218---------------------post_regwall------------------)

Sign up with email

Already have an account? [Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40harjulthakkar%2Fdeploy-secure-landing-zone-on-oracle-cloud-infrastructure-8fe73265218&source=-----8fe73265218---------------------post_regwall------------------)

[![Harjul Jobanputra](https://miro.medium.com/v2/resize:fill:48:48/1*EiuGFBs2zP9CD1zY3i03TA.jpeg)](https://medium.com/@harjulthakkar?source=post_page---post_author_info--8fe73265218---------------------------------------)

[![Harjul Jobanputra](https://miro.medium.com/v2/resize:fill:64:64/1*EiuGFBs2zP9CD1zY3i03TA.jpeg)](https://medium.com/@harjulthakkar?source=post_page---post_author_info--8fe73265218---------------------------------------)

Follow

[**Written by Harjul Jobanputra**](https://medium.com/@harjulthakkar?source=post_page---post_author_info--8fe73265218---------------------------------------)

[293 followers](https://medium.com/@harjulthakkar/followers?source=post_page---post_author_info--8fe73265218---------------------------------------)

· [10 following](https://medium.com/@harjulthakkar/following?source=post_page---post_author_info--8fe73265218---------------------------------------)

Cloud Geek, Continuous Learner, Passionate about Exploring Ideas, Knowhow on Oracle Cloud \| AWS \| Google Cloud

Follow

## No responses yet

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

Write a response

[What are your thoughts?](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40harjulthakkar%2Fdeploy-secure-landing-zone-on-oracle-cloud-infrastructure-8fe73265218&source=---post_responses--8fe73265218---------------------respond_sidebar------------------)

Cancel

Respond

## More from Harjul Jobanputra

![Configure Autonomous Database Secret Credentials in Oracle Vault](https://miro.medium.com/v2/resize:fit:679/format:webp/1*vLToZkI9eEjTuRczJbkedg.png)

[![Harjul Jobanputra](https://miro.medium.com/v2/resize:fill:20:20/1*EiuGFBs2zP9CD1zY3i03TA.jpeg)](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----0---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[Harjul Jobanputra](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----0---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[**Configure Autonomous Database Secret Credentials in Oracle Vault**\\
\\
**When you are designing application or configuring services in Public Cloud, many a times you need to store credentials or authentication…**](https://medium.com/@harjulthakkar/configure-autonomous-database-secret-credentials-in-oracle-vault-42248b927165?source=post_page---author_recirc--8fe73265218----0---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

Dec 1, 2021

[A clap icon2](https://medium.com/@harjulthakkar/configure-autonomous-database-secret-credentials-in-oracle-vault-42248b927165?source=post_page---author_recirc--8fe73265218----0---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

![Dedicated Exadata Infrastructure Update (Dom0 patching) FAQs](https://miro.medium.com/v2/resize:fit:679/format:webp/1*_th-UzZ2-EGnDFIWlkwWhg.png)

[![Harjul Jobanputra](https://miro.medium.com/v2/resize:fill:20:20/1*EiuGFBs2zP9CD1zY3i03TA.jpeg)](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----1---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[Harjul Jobanputra](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----1---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[**Dedicated Exadata Infrastructure Update (Dom0 patching) FAQs**\\
\\
**Think Oracle Exadata Cloud@Customer for your Oracle Databases if you want to continue running your databases behind the on-premises…**](https://medium.com/@harjulthakkar/dedicated-exadata-infrastructure-update-dom0-patching-faqs-61085bb1e060?source=post_page---author_recirc--8fe73265218----1---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

May 29, 2023

[A clap icon1](https://medium.com/@harjulthakkar/dedicated-exadata-infrastructure-update-dom0-patching-faqs-61085bb1e060?source=post_page---author_recirc--8fe73265218----1---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

![Modify SGA in Autonomous Database](https://miro.medium.com/v2/resize:fit:679/format:webp/1*rfkJaw-ffb7qkHdFuiLBvg.png)

[![Harjul Jobanputra](https://miro.medium.com/v2/resize:fill:20:20/1*EiuGFBs2zP9CD1zY3i03TA.jpeg)](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----2---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[Harjul Jobanputra](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----2---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[**Modify SGA in Autonomous Database**\\
\\
**The System Global Area (SGA) is a group of shared memory structures, known as SGA components, that contain data and control information for…**](https://medium.com/@harjulthakkar/modify-sga-in-autonomous-database-f1aea7b8a24d?source=post_page---author_recirc--8fe73265218----2---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

Feb 1, 2022

[A clap icon2](https://medium.com/@harjulthakkar/modify-sga-in-autonomous-database-f1aea7b8a24d?source=post_page---author_recirc--8fe73265218----2---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

![Password basAuthentication on OCI Compute Instance](https://miro.medium.com/v2/resize:fit:679/format:webp/1*8LES1VRMbA-OQMXUdvEXuA.png)

[![Harjul Jobanputra](https://miro.medium.com/v2/resize:fill:20:20/1*EiuGFBs2zP9CD1zY3i03TA.jpeg)](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----3---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[Harjul Jobanputra](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218----3---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[**Password basAuthentication on OCI Compute Instance**\\
\\
**By default, OCI Compute don’t have password authentication. You must use the private key to connect to the instances. However, you might…**](https://medium.com/@harjulthakkar/password-basauthentication-on-oci-compute-instance-338538bc2403?source=post_page---author_recirc--8fe73265218----3---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

Aug 13, 2021

[A clap icon4](https://medium.com/@harjulthakkar/password-basauthentication-on-oci-compute-instance-338538bc2403?source=post_page---author_recirc--8fe73265218----3---------------------a3dfd024_daa6_4c4b_81d2_1dffdf61d05b--------------)

[See all from Harjul Jobanputra](https://medium.com/@harjulthakkar?source=post_page---author_recirc--8fe73265218---------------------------------------)

## Recommended from Medium

![6 brain images](https://miro.medium.com/v2/resize:fit:679/format:webp/1*Q-mzQNzJSVYkVGgsmHVjfw.png)

[![Write A Catalyst](https://miro.medium.com/v2/resize:fill:20:20/1*KCHN5TM3Ga2PqZHA4hNbaw.png)](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

In

[Write A Catalyst](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

by

[Dr. Patricia Schmidt](https://medium.com/@creatorschmidt?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[**As a Neuroscientist, I Quit These 5 Morning Habits That Destroy Your Brain**\\
\\
**Most people do \#1 within 10 minutes of waking (and it sabotages your entire day)**](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

Jan 14

[A clap icon19.2K\\
\\
A response icon322](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

![Why We are Moving Away from Terraform 2026](https://miro.medium.com/v2/resize:fit:679/format:webp/0*dFoEdj0gHZ8EFKJ9.png)

[![Cloud With Azeem](https://miro.medium.com/v2/resize:fill:20:20/1*oJWwUx75Cf5oGoEfAefJpw.png)](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[Cloud With Azeem](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[**Why We are Moving Away from Terraform 2026**\\
\\
**We left Terraform in 2026 due to licensing, lock-in, and better IaC alternatives like OpenTofu and Pulumi. Here’s what we learned.**](https://medium.com/@cloudwithazeem/moving-away-from-terraform-76766966bb05?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

Aug 24, 2025

[A clap icon170\\
\\
A response icon11](https://medium.com/@cloudwithazeem/moving-away-from-terraform-76766966bb05?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

![Git Confused Me for Years Until I Found This Simple Guide](https://miro.medium.com/v2/resize:fit:679/format:webp/1*YUALkK55VO_6mxjVqq_smQ.png)

[![Let’s Code Future](https://miro.medium.com/v2/resize:fill:20:20/1*QXfeVFVbIzUGnlwXoOZvyQ.png)](https://medium.com/lets-code-future?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

In

[Let’s Code Future](https://medium.com/lets-code-future?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

by

[The Unwritten Algorithm](https://medium.com/@the_unwritten_algorithm?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[**Git Confused Me for Years Until I Found This Simple Guide**\\
\\
**Most developers don’t really understand Git — here’s the simple truth.**](https://medium.com/lets-code-future/git-confused-me-for-years-until-i-found-this-simple-guide-a45223bebb40?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

Dec 19, 2025

[A clap icon2.8K\\
\\
A response icon60](https://medium.com/lets-code-future/git-confused-me-for-years-until-i-found-this-simple-guide-a45223bebb40?source=post_page---read_next_recirc--8fe73265218----0---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

![What a Sex Worker Notices About Gen X and Gen Z Men](https://miro.medium.com/v2/resize:fit:679/format:webp/0*hjbGaG9CLZSyLfF5)

[![Jonatha Czajkiewicz](https://miro.medium.com/v2/resize:fill:20:20/1*9XGxLUkOutVNiUjHml4bKQ.png)](https://medium.com/@jonathacz99?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[Jonatha Czajkiewicz](https://medium.com/@jonathacz99?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[**What a Sex Worker Notices About Gen X and Gen Z Men**\\
\\
**How masculinity changed between Grunge and TikTok**](https://medium.com/@jonathacz99/what-a-sex-worker-notices-about-gen-x-and-gen-z-men-fd0d13b6c203?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

Nov 16, 2025

[A clap icon18K\\
\\
A response icon442](https://medium.com/@jonathacz99/what-a-sex-worker-notices-about-gen-x-and-gen-z-men-fd0d13b6c203?source=post_page---read_next_recirc--8fe73265218----1---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

![Stanford Just Killed Prompt Engineering With 8 Words (And I Can’t Believe It Worked)](https://miro.medium.com/v2/resize:fit:679/format:webp/1*va3sFwIm26snbj5ly9ZsgA.jpeg)

[![Generative AI](https://miro.medium.com/v2/resize:fill:20:20/1*M4RBhIRaSSZB7lXfrGlatA.png)](https://medium.com/generative-ai?source=post_page---read_next_recirc--8fe73265218----2---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

In

[Generative AI](https://medium.com/generative-ai?source=post_page---read_next_recirc--8fe73265218----2---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

by

[Adham Khaled](https://medium.com/@adham__khaled__?source=post_page---read_next_recirc--8fe73265218----2---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[**Stanford Just Killed Prompt Engineering With 8 Words (And I Can’t Believe It Worked)**\\
\\
**ChatGPT keeps giving you the same boring response? This new technique unlocks 2× more creativity from ANY AI model — no training required…**](https://medium.com/generative-ai/stanford-just-killed-prompt-engineering-with-8-words-and-i-cant-believe-it-worked-8349d6524d2b?source=post_page---read_next_recirc--8fe73265218----2---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

Oct 19, 2025

[A clap icon23K\\
\\
A response icon590](https://medium.com/generative-ai/stanford-just-killed-prompt-engineering-with-8-words-and-i-cant-believe-it-worked-8349d6524d2b?source=post_page---read_next_recirc--8fe73265218----2---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

![Why Building AI Agents Is Mostly a Waste of Time](https://miro.medium.com/v2/resize:fit:679/format:webp/0*6w1dzyn44p2-bRS8)

[![Data Science Collective](https://miro.medium.com/v2/resize:fill:20:20/1*0nV0Q-FBHj94Kggq00pG2Q.jpeg)](https://medium.com/data-science-collective?source=post_page---read_next_recirc--8fe73265218----3---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

In

[Data Science Collective](https://medium.com/data-science-collective?source=post_page---read_next_recirc--8fe73265218----3---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

by

[Shenggang Li](https://medium.com/@datalev?source=post_page---read_next_recirc--8fe73265218----3---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[**Why Building AI Agents Is Mostly a Waste of Time**\\
\\
**The Structural, Mathematical, and Economic Limits of RAG Pipelines**](https://medium.com/data-science-collective/why-building-ai-agents-is-mostly-a-waste-of-time-55600b57e692?source=post_page---read_next_recirc--8fe73265218----3---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

Jan 12

[A clap icon2.1K\\
\\
A response icon139](https://medium.com/data-science-collective/why-building-ai-agents-is-mostly-a-waste-of-time-55600b57e692?source=post_page---read_next_recirc--8fe73265218----3---------------------2f7aa8d3_5316_4bdc_b7a8_41d270168823--------------)

[See more recommendations](https://medium.com/?source=post_page---read_next_recirc--8fe73265218---------------------------------------)

[Help](https://help.medium.com/hc/en-us?source=post_page-----8fe73265218---------------------------------------)

[Status](https://status.medium.com/?source=post_page-----8fe73265218---------------------------------------)

[About](https://medium.com/about?autoplay=1&source=post_page-----8fe73265218---------------------------------------)

[Careers](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----8fe73265218---------------------------------------)

[Press](mailto:pressinquiries@medium.com)

[Blog](https://blog.medium.com/?source=post_page-----8fe73265218---------------------------------------)

[Privacy](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----8fe73265218---------------------------------------)

[Rules](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----8fe73265218---------------------------------------)

[Terms](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----8fe73265218---------------------------------------)

[Text to speech](https://speechify.com/medium?source=post_page-----8fe73265218---------------------------------------)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
In today's rapidly evolving digital landscape, organizations are increasingly looking to modernize their infrastructure by migrating on-premises data centers to cloud environments. This transition offers significant benefits including enhanced scalability, improved security, and reduced operational costs. However, when this migration involves complex database systems, particularly Oracle databases, organizations often face unique challenges that require specialized solutions.

At Rezoud Inc., we've guided numerous clients through successful data center migrations to Azure Landing Zones while maintaining seamless integration with Oracle databases in Oracle Cloud Infrastructure (OCI). This comprehensive guide shares our proven approach and technical insights to help you navigate this complex journey with confidence.

## Understanding Azure Landing Zones: The Foundation for Successful Migration

Azure Landing Zones represent a critical foundation for successful cloud migration, providing the necessary infrastructure and configurations to support enterprise workloads. According to [Microsoft's Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/prepare/ready-azure-landing-zone), a properly configured landing zone is essential for migrating workloads efficiently and securely, regardless of whether you use an Azure landing zone reference implementation or create a custom design.

Azure Landing Zones consist of several key components that work together to create a secure, scalable environment:

- Subscription organization
- Identity and access management
- Policy-based governance
- Networking architecture

These landing zones are designed to scale with your organization's needs while maintaining governance and compliance requirements. The landing zone concept emphasizes proper segmentation of resources and responsibilities, allowing different teams to manage their respective areas without compromising overall security or governance.

`From Our Experience:`` When we helped a major financial services client migrate their data center to Azure Landing Zones, we discovered that careful planning of the governance model was critical. The client needed to maintain strict compliance with financial regulations while still enabling their development teams to innovate. We implemented a hub-and-spoke network topology with specialized security controls in the hub, which allowed them to centralize security monitoring while still providing flexibility for individual application teams.`

## OCI Core Landing Zone: The Oracle Cloud Foundation

Similar to Azure's approach, Oracle Cloud Infrastructure provides the [OCI Core Landing Zone](https://docs.public.oneportal.content.oci.oraclecloud.com/en-us/iaas/Content/cloud-adoption-framework/oci-core-landing-zone.htm) as a reference architecture to help organizations achieve greater agility, scalability, and security. This landing zone unifies the Oracle Enterprise Landing Zone and Center for Internet Security (CIS) Landing Zone initiatives, incorporating best practices for security and compliance from the CIS OCI Foundations Benchmark v2.0.

The OCI Core Landing Zone architecture begins with a carefully designed compartment structure that facilitates proper resource organization and access control. It provisions compartments within a designated parent compartment for core infrastructure services, each assigned a specific admin group with appropriate permissions. This design supports the provisioning of multiple Virtual Cloud Networks (VCNs), which can be configured as standalone networks or in a hub-and-spoke architecture.

Identity and Access Management (IAM) plays a crucial role in the OCI Core Landing Zone, with the landing zone automatically creating IAM groups and policies to govern access to provisioned resources, supporting segregation of duties and Role-Based Access Control requirements.

## Bridging Two Cloud Environments: Oracle-Azure Integration

A critical aspect of migrating to Azure while maintaining Oracle databases is understanding the integration options between Microsoft Azure and Oracle Cloud Infrastructure. The [Oracle Database Service for Azure](https://www.techtarget.com/searchdatamanagement/news/252522923/Oracle-Database-Service-for-Azure-connects-Microsoft-to-OCI), which became generally available in July 2022, provides a seamless integration that enables Microsoft Azure users to provision and access Oracle database services running in Oracle's cloud directly from within the Azure environment.

This integration represents an extension of the partnership between Microsoft and Oracle, which has been developing over several years to support interconnection between their respective cloud services. The partnership aims to provide low-latency connections allowing users on either cloud to easily access services from both providers.

The Oracle-Azure Interconnect forms the technical foundation for this integration, creating a private path between Oracle VCN (Virtual Cloud Network) and Azure VNET (Virtual Network). However, it's important to understand the [limitations of this interconnect](https://www.ateam-oracle.com/post/oracle-azure-interconnect-use-cases). According to documentation from Oracle's ATeam, the interconnect supports basic VCN to VNET connectivity, Local Peering Gateway, and Service Gateway configurations. However, it does not support on-premises private connectivity to OCI using VPN Connect or FastConnect, nor does it support Remote Peering Connection.

## Phase 1: Assessment and Planning

### Infrastructure Assessment

Before embarking on your migration journey, a thorough assessment of your current infrastructure is essential. This involves:

- Creating a comprehensive server inventory with detailed specifications
- Documenting your network topology and configurations
- Analyzing storage requirements and utilization patterns
- Mapping application dependencies
- Identifying security requirements and compliance needs

This assessment provides the foundation for your migration plan and helps identify potential challenges before they impact your timeline or budget.

`From Our Experience:`` In our experience working with a healthcare provider's migration project, we found that automated discovery tools alone weren't sufficient for capturing the full picture of their infrastructure. The client had several legacy systems with undocumented dependencies that weren't detected automatically. Our hybrid approach combining automated discovery with stakeholder interviews uncovered critical application dependencies that would have caused significant disruption if missed.`

### Network Planning

Network planning is crucial for ensuring seamless connectivity between your Azure and OCI environments. Key considerations include:

- Designing your Azure Virtual Network (VNet) architecture:
  - Address space allocation
  - Subnet segmentation
  - Network security groups (NSGs)
  - Route tables
- Planning connectivity solutions:
  - ExpressRoute circuits for dedicated connectivity
  - Site-to-Site VPN for backup connectivity
  - Azure Virtual WAN for global presence

When selecting CIDR blocks for Virtual Cloud Networks (VCNs) in OCI or Virtual Networks (VNETs) in Azure, you must ensure they don't overlap with any other networks to which you plan to establish private connections, whether in OCI, on-premises data centers, or other cloud providers.

### Redundancy Strategy

Building redundancy into your migration plan is essential for ensuring business continuity. Consider:

- Regional redundancy:
  - Primary region selection
  - Secondary region for disaster recovery
  - Multi-region load balancing
- Component redundancy:
  - Availability Zones utilization
  - Availability Sets for VM deployments
  - Load balancer configurations

## Phase 2: Azure Landing Zone Implementation

### Core Infrastructure Setup

Setting up your core infrastructure involves:

- Organizing resources efficiently:
  - Management group structure
  - Subscription design
  - Resource groups hierarchy
- Implementing robust identity and access management:
  - Azure AD integration
  - Role-Based Access Control (RBAC)
  - Conditional access policies

This foundation ensures proper governance and security from day one, following best practices from Microsoft's Cloud Adoption Framework.

### Network Implementation

Implementing your network architecture involves:

- Deploying connectivity components:
  - ExpressRoute circuit provisioning
  - VNet peering configuration
  - Hub-and-spoke topology setup
- Implementing security measures:
  - Azure Firewall deployment
  - NSG rules configuration
  - DDoS protection enablement

## Phase 3: Azure-OCI Interconnection

### Cross-Cloud Connectivity

Establishing robust connectivity between Azure and OCI is crucial for your hybrid architecture:

- Azure-OCI FastConnect setup:
  - FastConnect circuit provisioning
  - ExpressRoute configuration
  - BGP routing setup
- Network routing optimization:
  - Route filtering
  - Traffic prioritization
  - Latency optimization

When configuring the Oracle-Azure Interconnect, both environments must be properly configured. In the Azure Portal, you need to create a virtual network gateway with the appropriate configuration, while in the Oracle Console, a Dynamic Routing Gateway (DRG) must be created and attached to the VCN.

### Database Connectivity

Setting up database connectivity involves:

- Database link configuration:
  - Oracle Database configuration
  - TNS setup
  - Connection string management
- Performance optimization:
  - Network latency monitoring
  - Connection pooling
  - Query optimization

The Oracle Database Service for Azure simplifies this process by enabling Azure users to provision and manage Oracle databases through a familiar interface, reducing the learning curve and operational complexity associated with managing resources across multiple cloud environments.

`From Our Experience:`` During a recent migration for a manufacturing client with heavy Oracle database workloads, we encountered unexpected latency issues between their Azure-hosted applications and OCI databases. After extensive troubleshooting, we discovered that the default routing configuration wasn't optimized for their specific query patterns. By implementing a dedicated ExpressRoute circuit with optimized BGP routing and adjusting the Oracle database buffer cache parameters, we reduced query response times by 40%. The key lesson was that standard connectivity solutions often need fine-tuning based on actual workload characteristics...`

## Phase 4: Migration Execution

### Workload Migration

Executing your migration strategy involves:

- Application migration:
  - Rehost (lift and shift) where appropriate
  - Refactor applications as needed
  - Rearchitect for cloud-native features
- Data migration:
  - Database migration tools setup
  - Incremental data sync
  - Cutover planning

The [Oracle Migration Hub](https://www.oracle.com/jo/cloud/migration/) provides resources and expertise to guide organizations through the migration process, regardless of whether they're moving an entire data center, mission-critical workloads, or just a few applications.

### Testing and Validation

Thorough testing is essential for a successful migration:

- Migration testing:
  - Connectivity validation
  - Performance testing
  - Security validation
  - Failover testing

After implementing the necessary configurations and migrating workloads, you must thoroughly test connectivity, functionality, and performance across your on-premises, Azure, and OCI environments.

## Phase 5: Disaster Recovery Implementation

### DR Setup

Implementing disaster recovery capabilities ensures business continuity:

- Azure Site Recovery configuration:
  - Recovery vault setup
  - Replication policies
  - Recovery plans creation
- Backup implementation:
  - Azure Backup configuration
  - Retention policies
  - Recovery point objectives (RPO)
  - Recovery time objectives (RTO)

### Business Continuity

Ensuring business continuity involves:

- Failover procedures:
  - Automated failover setup
  - Manual failover procedures
  - Failback planning
- DR testing schedule:
  - Regular DR drills
  - Documentation updates
  - Team training

## Phase 6: Post-Migration Optimization

### Performance Monitoring

Ongoing monitoring ensures optimal performance:

- Performance monitoring:
  - Azure Monitor implementation
  - Log Analytics workspace setup
  - Application Insights integration
- Cost optimization:
  - Resource right-sizing
  - Reserved instances evaluation
  - Auto-scaling implementation

Security monitoring is another crucial aspect of managing hybrid cloud environments. OCI Core Landing Zone incorporates Cloud Guard to monitor and maintain the security of resources. Cloud Guard employs customizable detector recipes to identify security weaknesses and track risky activities by operators and users.

### Documentation and Training

Comprehensive documentation and training support ongoing operations:

- Documentation:
  - As-built documentation
  - Standard operating procedures
  - Troubleshooting guides
- Team enablement:
  - Administrative training
  - Operational procedures
  - Incident response protocols

## Best Practices and Recommendations

### Security Considerations

- Implement Zero Trust architecture
- Enable Just-In-Time VM access
- Use Private Endpoints for PaaS services
- Implement network segmentation
- Enable encryption at rest and in transit

For resources requiring the highest level of security, OCI provides security zones that enforce Oracle-defined policies based on security best practices.

### Performance Optimization

- Use Azure Front Door for global load balancing
- Implement Azure Cache for Redis
- Optimize network routing
- Use Azure CDN for static content
- Monitor and tune database performance

### Cost Management

- Implement resource tagging
- Set up budget alerts
- Use auto-shutdown for non-production resources
- Leverage reserved instances
- Monitor and optimize resource utilization

## Success Metrics

Monitor these key metrics to ensure migration success:

- Application performance metrics
- Network latency and throughput
- Database response times
- System availability
- Cost comparison with on-premises
- Security compliance scores

`From Our Experience:`` While working with a retail client on their migration, we found that traditional infrastructure metrics weren't telling the full story of migration success. We developed a custom dashboard combining technical metrics like application response time and database throughput with business metrics such as order processing speed and inventory update latency. This holistic view helped executives understand the business impact of the migration beyond just technical improvements.`

## Conclusion

Migrating data centers to Azure Landing Zones with OCI Database Integration represents a complex but valuable undertaking for organizations seeking to modernize their infrastructure while leveraging the strengths of both Microsoft and Oracle cloud platforms. By understanding the key components of Azure Landing Zones and OCI Core Landing Zones, establishing appropriate connectivity between environments, and following a structured migration approach, organizations can successfully navigate this transition.

The partnership between Microsoft and Oracle, exemplified by the Oracle Database Service for Azure and the Oracle-Azure Interconnect, provides powerful capabilities for organizations that need to maintain Oracle databases while taking advantage of Azure's application services. However, understanding the limitations of these integration points, particularly regarding on-premises connectivity, is crucial for designing an effective hybrid architecture.

Remember that migration is an iterative process. Regular review and optimization of the implemented solution ensure long-term success and optimal performance of your cloud infrastructure.

## Have a Data Center Migration Coming Up? Rezoud Can Help

Planning a data center migration to Azure with Oracle database workloads can be complex and challenging. Rezoud Inc. brings years of experience and a team of certified experts who have helped numerous organizations across Canada successfully navigate this journey with minimal disruption and maximum business value.

Our consultative approach ensures that your specific needs are addressed at every step—from initial assessment to post-migration optimization. We partner with you throughout the entire process, providing the expertise and support needed to ensure your success.

Contact Rezoud Inc. for expert advice on migrating your data center to Azure Landing Zone with OCI Database Integration!

Phone: +1 (855) 7-REZOUD

[Email: contact@rezoud.com](mailto:contact@rezoud.com)

## Authors

Open chat
- [Skip to content](https://www.ateam-oracle.com/deployment-modes-for-cis-oci-landing-zone#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/www.ateam-oracle.com/post.php) [Twitter](https://twitter.com/share?url=/www.ateam-oracle.com/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/www.ateam-oracle.com/post.php) [Email](https://www.ateam-oracle.com/placeholder.html)

[Architecture](https://www.ateam-oracle.com/category/atm-architecture), [Identity Access Management and Security](https://www.ateam-oracle.com/category/atm-identity-access-management-and-security)

# Deployment Modes for CIS OCI Landing Zone

May 19, 20256 minute read

![Profile picture of Andre Correa Neto](http://blogs.oracle.com/wp-content/uploads/2025/09/andre_recent.jpg)[Andre Correa Neto](https://www.ateam-oracle.com/authors/andre-correa-neto)
Cloud Solutions Architect

This post describes features of CIS Landing Zone Terraform configuration, which is retired as of May 2025. The last release of CIS Landing Zone Terraform configuration is [Release 2.8.8](https://github.com/oci-landing-zones/oci-cis-landingzone-quickstart/releases/tag/v2.8.8).


- The [CIS compliance checking script](https://github.com/oci-landing-zones/oci-cis-landingzone-quickstart/blob/main/compliance-script.md) is not impacted. Users should continue using it to determine tenancy compliance with the CIS OCI Foundations Benchmark.
- Users looking for a deployment experience similar to CIS Landing Zone should now use [OCI Core Landing Zone](https://github.com/oci-landing-zones/terraform-oci-core-landingzone), where this specific feature is not available. OCI Core Landing Zone evolves CIS Landing Zone and complies with CIS OCI Foundations Benchmark.
- Users looking for a deployment experience based on fully declarable and customizable templates should use the [Operating Entities Landing Zone](https://github.com/oci-landing-zones/oci-landing-zone-operating-entities) or the [OCI Landing Zones Modules](https://github.com/oci-landing-zones/oci-cis-landingzone-quickstart#modules) in the [OCI Landing Zones GitHub organization](https://github.com/oci-landing-zones).

## Introduction

[CIS OCI Landing Zone V1](https://github.com/oracle-quickstart/oci-cis-landingzone-quickstart/tree/stable-1.1.1) requires a user with broad permissions at the tenancy level (typically a member of the Administrators groups) to be provisioned. These tenancy level permissions include the ability to manage IAM resources at the Root compartment level, like managing compartments, policies and groups. In some scenarios these permissions cannot be given to ordinary users, as it can give them a type of power they must not have. But it turns out that some ordinary user may need to provision the Landing Zone, which is especially prevalent in proof of concepts type of scenarios.

Released on July/2021, [CIS OCI Landing Zone V2](https://github.com/oracle-quickstart/oci-cis-landingzone-quickstart/tree/main) adds the ability for a user without those broad permissions to also provision the Landing Zone.

This post goes through the available options for provisioning the Landing Zone in either way.

Throughout this post, we use the terms “admin” to refer to a user with the required IAM permissions at the tenancy level and “non-admin” to refer to a user without those IAM permissions.

V2 introduces options for deploying as a non-admin in such a way that V1’s provisioning experience is completely preserved when deploying as an admin.

These options are:

- **use\_enclosing\_compartment**: Whether the Landing Zone compartments are created within an enclosing compartment. If false, the Landing Zone compartments are created under the Root compartment.
- **existing\_enclosing\_compartment\_ocid**: The enclosing compartment OCID where Landing Zone compartments should be created. If not provided and use\_enclosing\_compartment is true, an enclosing compartment is created in the Root compartment.
- **policies\_in\_root\_compartment**: Whether required policies at the Root compartment should be created or simply used. Valid values are “USE” and “CREATE”. For using “CREATE”, make sure the user executing the stack has permissions to create policies in the Root compartment. If using “USE”, policies must have been created previously.
- **use\_existing\_groups**: Whether existing groups should be reused for this Landing Zone. If false, one set of groups is created. If true, existing group names must be provided and this set will be able to manage resources in this Landing Zone.
- **existing\_\*\_group\_name**: The names of the various existing groups that permissions are granted to. (\* representing the various Landing Zone groups).

## Deploying as an admin

This is the default use case in V2.

Deploying the Landing Zone with the module’s default variables creates the following:

- Four compartments in the Root compartment.
- Management policies in the Root compartment.
- Management groups in the Root compartment.
- A few non-IAM resources in the Root compartment, including Cloud Guard, events rules for IAM and tag defaults.
- Various resources within each one of the four compartments.

V2 adds options to change this behavior, by allowing admins to:

- Provision those four compartments within an enclosing compartment.
- Reuse existing management policies.
- Reuse existing management groups.

