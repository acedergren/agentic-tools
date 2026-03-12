### [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/iaas/Content/home.htm)     [Try Free Tier](https://www.oracle.com/cloud/free/?source=:ow:o:h:po:OHPPanel1nav0625&intcmp=:ow:o:h:po:OHPPanel1nav0625)

* * *

All Pages


[Skip to main content](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#dcoc-content-body)

Updated 2026-01-22

# Overview of Vaults and Key Management

The Key Management service stores and manages keys within vaults for secure access to resources.

The Oracle Cloud Infrastructure (OCI) [Key Management Service](https://www.oracle.com/security/cloud-security/key-management/) (KMS) is a cloud-based service that provides centralized management and control of encryption keys for data stored in OCI.

OCI KMS does the following:

- Simplifies key management by centrally storing and managing encryption keys.
- Protects data at rest and in transit by supporting various encryption key types, including symmetric keys and, asymmetric keys.
- Addresses security and compliance requirements with several options for creating and storing keys. Features for this include: importing key material to OCI ("Bring Your Own Keys" or BYOK), creating keys in OCI, and storing keys externally ("Hold Your Own Keys" or HYOK) using [external key management](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/external_key_management.htm "With Oracle Cloud Infrastructure External Key Management Service (EKMS) you can create and manage encryption keys that are hosted outside of OCI. EKMS integrates with supported third-party key management systems to perform cryptographic operations without importing key material into OCI."). Key Management supports FIPS 140-2 Level 3-certified hardware security modules (HSMs) to store and protect your encryption keys.
- Integrates encryption with other OCI services such as storage, database, and Fusion Applications for protecting data stored in these services.

**Note**

The secrets functionality of Vault, including secret tags and secret rules, has moved to a new Secret Management Service. For more information, see [Secret Management Service](https://docs.oracle.com/iaas/Content/secret-management/home.htm).

## Vault and Key Management Concepts 🔗

Understand vault and key management concepts for accessing and managing vaults and keys.

VaultsVaults are logical entities where the Key Management service creates and durably stores vault keys and [secrets](https://docs.oracle.com/iaas/Content/secret-management/home.htm). The type of vault you have determines features and functionality such as degrees of storage isolation, access to management and encryption, scalability, and the ability to back up. The type of vault you have also affects pricing. You can't change a vault's type after you create the vault.The Key Management service offers different vault types to accommodate your organization's needs and budget. All vault types ensure the security and integrity of the encryption keys and secrets that vaults store. A virtual private vault is an isolated partition on a hardware security module (HSM). Vaults otherwise share partitions on the HSM with other vaults.Virtual private vaults include 1000 key versions by default. If you don't require the greater degree of isolation or the ability to back up the vault, you don't need a virtual private vault. Without a virtual private vault, you can manage costs by paying for key versions individually, as you need them. (Key versions count toward your key limit and costs. A vault key always contains at least one active key version. Similarly, a secret always has at least one secret version. However, limits on secrets apply to the tenancy, rather than a vault.)

For customers who have regulatory compliance to store keys outside Oracle cloud or any third-party cloud premises, OCI KMS now offers a functionality called External Key Management Service (External KMS). In External KMS, you can store and control master encryption keys (as external keys) on a third-party key management system hosted outside OCI. You can then use these keys for encrypting your data in Oracle. You can also disable your keys anytime. With the actual keys residing in the third-party key management system, you create only key references (associated with the key material) in OCI.

OCI KMS offers the Dedicated KMS, which is a customer-managed, highly available, single-tenant HSM partition resource as a service. It enables you to have greater control by owning the HSM partition and encrypted keys and the users in the partition. In a Dedicated KMS setup, the HSM Cluster comes with three HSM partitions by default, which are auto synchronized. You can manage keys and users in the HSMs integrated with OCI compute instances through Client utilities and PKCS #11 libraries. Dedicated KMS supports only HSM-protected keys and doesn't support Software protected keys. For cryptographic operations, the solution supports both symmetric and asymmetric encryption using AES, RSA, and ECDSA algorithms .

The Vault service designates vaults as an Oracle Cloud Infrastructure resource.KeysKeys are logical entities that represent one or more key versions, each of which contains cryptographic material. A vault key's cryptographic material is generated for a specific algorithm that lets you use the key for encryption or in digital signing. When used for encryption, a key or key pair encrypts and decrypts data, protecting the data where the data is stored or while the data is in transit. With an AES symmetric key, the same key encrypts and decrypts data. With an RSA asymmetric key, the public key encrypts data and the private key decrypts data.You can use AES keys in encryption and decryption, but not in digital signing.
RSA keys, however, can be used not only to encrypt and decrypt data, but also to
digitally sign data and verify the authenticity of signed data. You can use
ECDSA keys in digital signing, but not to encrypt or decrypt data.When processed as part of an encryption algorithm, a key specifies how to transform plaintext into ciphertext during encryption and how to transform ciphertext into plaintext during decryption. When processed as part of a signing algorithm, together, the private key of an asymmetric key and a message produce a digital signature that goes with the message in transit. When processed as part of a signature verifying algorithm by the recipient of the signed message, the message, signature, and the public key of the same asymmetric key confirm or deny the authenticity and integrity of the message.Conceptually, the Key Management service recognizes three types of encryption keys: master encryption keys, wrapping keys, and data encryption keys.The encryption algorithms that the Key Management service supports for vault master encryption keys include AES, RSA, and ECDSA. You can create AES, RSA, or ECDSA master encryption keys by using the Console, CLI, or API. When you create a master encryption key, the Key Management service can either generate the key material internally or you can import the key material to the service from an external source. (Support for importing key material depends on the encryption algorithm of the key material.) When you create vault master encryption keys, you create them in a vault, but where a key is stored and processed depends on its protection mode.Vault master encryption keys can have one of two protection modes: HSM or software. A master encryption key protected by an HSM is stored on an HSM and can't be exported from the HSM. All cryptographic operations involving the key also happen on the HSM. Meanwhile, a master encryption key protected by software is stored on a server and, therefore, can be exported from the server to perform cryptographic operations on the client instead of on the server. While at rest, the software-protected key is encrypted by a root key on the HSM. For a software-protected key, any processing related to the key happens on the server. A key's protection mode affects pricing and can't be changed after you create the key.After you create your first symmetric master encryption key, you can then use the API to generate data encryption keys that the Key Management service returns to you. Note that a data encryption key needs to have equal or greater encryption strength than the master encryption key used to create it. Some services can use a symmetric master encryption key to generate their own data encryption keys.A type of encryption key that comes included with each vault by default is a wrapping key. A wrapping key is a 4096-bit asymmetric encryption key based on the RSA algorithm. The public and private key pair don't count against service limits. They also don't incur service costs. You use the public key as the key encryption key when you need to wrap key material for import into the Key Management service. You can't create, delete, or rotate wrapping keys.The Key Management service recognizes master encryption keys as an Oracle Cloud Infrastructure resource.Key Versions & RotationsEach master encryption key is automatically assigned a key version. When you rotate a key, the Key Management service generates a new key version. The Key Management service can generate the key material for the new key version or you can import your own key material.Periodically rotating keys limits the amount of data encrypted or signed by one key version. If a key is ever compromised, key rotation thus reduces the risk. A key's unique, Oracle-assigned identifier, called an Oracle Cloud ID (OCID), remains the same across rotations, but the key version lets the Key Management service seamlessly rotate keys to meet any compliance requirements you might have.Although you can't use an older key version for encryption after you rotate a key, the key version remains available to decrypt any data that it was used to encrypt. If you rotate an asymmetric key, the public key can no longer be used to encrypt data, but the private key remains available to decrypt data that was encrypted by the public key. When you rotate an asymmetric key used in digital signing, you can no longer use the private key version to sign data, but the public key version remains available to verify the digital signature of data previously signed by the older private key version.For symmetric keys, you don't need to track which key version was used to encrypt what data because the key's ciphertext contains the information that the service needs for decryption purposes. Through rotations of asymmetric keys, however, you must track which key version was used to encrypt or sign what data. With asymmetric keys, the key's ciphertext doesn't contain the information that the service requires for decryption or verification.With AES symmetric keys, each key version counts as one key version when
calculating service limits usage. However, with RSA and ECDSA asymmetric keys,
each key version counts as two when calculating usage against service limits
because an asymmetric key has both a public key and private key. (Asymmetric
keys are also known as key pairs.)Automatic Key Rotation

**Note**

This feature is available only for private vaults.




OCI's Key Management service lets you schedule automatic key rotation for an encryption key in a virtual private vault. When you configure automatic rotation, you set the frequency of rotation and the start date of the rotation schedule. For the frequency, you chose a rotation interval between 60 days and 365 days. KMS supports automatic key rotation for both HSM and software keys, and supports automatic rotation of both symmetric and asymmetric keys. Note that a key must be in the "enabled" state to configure automatic rotation.

Features and requirements of automatic key rotation:

- You can update the rotation schedule for a key after you enable automatic rotation, as needed.
- You can rotate a key on-demand (perform a manual rotation) when automatic key rotation is enabled for the key.
- You can track automatic key rotation activities for a key, including the last rotation status and status message, updates to the rotation interval, and next rotation start date.
- You can send an event notification if a key rotation fails.


**Auto rotation event notification:** To receive automatic key rotation event notifications, you must configure the OCI
Events service. After every key rotation, KMS sends out a notification about the rotation status and error messages, if any. The OCI
Events service lets you use events rules to invoke a function, which you can use for automation. For example, you can use functions to automate the following tasks:

- Re-encrypt data with a new key version
- Delete an old key version
- Distribute the public part of asymmetric keys for signing or verifying data

See [Creating an Events Rule](https://docs.oracle.com/iaas/Content/Events/Task/create-events-rule.htm) and [Overview of Functions](https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm) for more information.

Hardware Security ModulesWhen you create an AES symmetric master encryption key with the protection mode set to HSM, the Key Management service stores the key version within a hardware security module (HSM) to provide a layer of physical security. (When you create a secret, secret versions are base64-encoded and encrypted by a master encryption key, but are not stored within the HSM.) After you create the resources, the service maintains copies of any given key version or secret version within the service infrastructure to provide resilience against hardware failures. Key versions of HSM-protected keys aren't otherwise stored anywhere else and can't be exported from an HSM.When you create an RSA or ECDSA asymmetric master encryption key with the protection mode set to HSM, the Key Management service stores the private key within an HSM and doesn't allow its export from the HSM. However, you can download the public key.The Key Management service uses HSMs that meet Federal Information Processing Standards (FIPS) 140-2 Security Level 3 security certification. This certification means that the HSM hardware is tamper-evident, has physical safeguards for tamper-resistance, requires identity-based authentication, and deletes keys from the device when it detects tampering.Envelope EncryptionThe data encryption key used to encrypt your data is, itself, encrypted with a master encryption key. This concept is known as envelope encryption. Oracle Cloud Infrastructure services don't have access to the plaintext data without interacting with the Key Management service and without access to the master encryption key that's protected by Oracle Cloud Infrastructure Identity and Access Management (IAM). For decryption purposes, integrated services such as Object Storage, Block Volume, and File Storage store only the encrypted form of the data encryption key.

## Regions and Availability Domains 🔗

The Vault service is available in all Oracle Cloud Infrastructure commercial regions. See [About Regions and Availability Domains](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm#About) for the [list](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm#About__The) of available regions, along with associated locations, region identifiers, region keys, and availability domains.

Unlike some Oracle Cloud Infrastructure services, however, the Vault service does not have one regional endpoint for all API operations. The service has one regional endpoint for the provisioning service that handles create, update, and list operations for vaults. For create, update, and list operations for keys, service endpoints are distributed across multiple independent clusters. Service endpoints for secrets are distributed further still across different independent clusters.

Because the Vault service has public endpoints, you can directly use data encryption keys generated by the service for cryptographic operations in your applications. However, if you want to use master encryption keys with a service that has integrated with Vault, you can do so only when the service and the vault that holds the key both exist within the same region. Different endpoints exist for key management operations, key cryptographic operations, secret management operations, and secret retrieval operations. For more information, see [Oracle Cloud Infrastructure API Documentation](https://docs.oracle.com/iaas/api/)

The Vault service maintains copies of vaults and their contents to durably persist them and to make it possible for the Vault service to produce keys or secrets upon request, even when an availability domain is unavailable. This replication is independent of any cross-region replication that a customer might configure.

For regions with multiple availability domains, the Vault service maintains copies of encryption keys across all availability domains within the region. Regions with multiple availability domains have one rack for each availability domain, which means that the replication happens across three total racks in these regions, where each rack belongs to a different availability domain. In regions with a single availability domain, the Vault service maintains encryption key copies across fault domains.

For secrets, in regions with multiple availability domains, the Vault service distributes secret copies across two different availability domains. In regions with a single availability domain, the Vault service distributes the copies across two different fault domains.

Every availability domain has three fault domains. Fault domains help provide high availability and fault tolerance by making it possible for the Vault service to distribute resources across different physical hardware within a given availability domain. The physical hardware itself also has independent and redundant power supplies that prevent a power outage in one fault domain from affecting other fault domains.

All of this makes it possible for the Vault service to produce keys and secrets upon request, even when an availability domain is unavailable in a region with multiple availability domains or when a fault domain is unavailable in a region with a single availability domain.

## Private Access to Vault 🔗

The Vault service supports private access from Oracle Cloud Infrastructure resources in a virtual cloud network (VCN) through a service gateway. Setting up and using a service gateway on a VCN lets resources (such as the instances that your encrypted volumes are attached to) access public Oracle Cloud Infrastructure services such as the Vault service without exposing them to the public internet. No internet gateway is required and resources can be in a private subnet and use only private IP addresses. For more information, see [Access to Oracle Services: Service Gateway](https://docs.oracle.com/iaas/Content/Network/Tasks/servicegateway.htm).

## Resource Identifiers 🔗

The Vault service supports vaults, keys, and secrets as Oracle Cloud Infrastructure resources. Most types of Oracle Cloud Infrastructure resources have a unique, Oracle-assigned identifier called an Oracle Cloud ID (OCID). For information about the OCID format and other ways to identify your resources, see [Resource Identifiers](https://docs.oracle.com/iaas/Content/General/Concepts/identifiers.htm)..

## Ways to Access Oracle Cloud Infrastructure 🔗

You can access the Oracle Cloud Infrastructure by entering your cloud account.

You can access Oracle Cloud Infrastructure (OCI) by using the [Console](https://docs.oracle.com/iaas/Content/GSG/Tasks/signingin_topic-Signing_In_for_the_First_Time.htm) (a browser-based interface), [REST API](https://docs.oracle.com/iaas/Content/API/Concepts/usingapi.htm), or [OCI CLI](https://docs.oracle.com/iaas/Content/API/Concepts/cliconcepts.htm). Instructions for using the Console, API, and CLI are included in topics throughout this documentation.For a list of available SDKs, see [Software Development Kits and Command Line Interface](https://docs.oracle.com/iaas/Content/API/Concepts/sdks.htm).

To access the [Console](https://cloud.oracle.com/), you must use a [supported browser](https://docs.oracle.com/iaas/Content/GSG/Tasks/signinginIdentityDomain.htm#supported-browsers). To go to the Console sign-in page, open the navigation menu at the top of this page and select **Infrastructure Console**. You are prompted to enter your cloud tenant, your user name, and your password.

## Authentication and Authorization 🔗

Each service in Oracle Cloud Infrastructure integrates with IAM for authentication and authorization, for all interfaces (the Console, SDK or CLI, and REST API).

An administrator in an organization needs to set up **groups**, **compartments**, and **policies** that control which users can access which services, which resources, and the type of access. For example, the policies control who can create new users, create and manage the cloud network, create instances, create buckets, download objects, and so on. For more information, see [Managing Identity Domains](https://docs.oracle.com/iaas/Content/Identity/domains/overview.htm). For specific details about writing policies for each of the different services, see [Policy Reference](https://docs.oracle.com/iaas/Content/Identity/Reference/policyreference.htm).

If you're a regular user (not an administrator) who needs to use the Oracle Cloud Infrastructure resources that the company owns, contact an administrator to set up a user ID for you. The administrator can confirm which compartment or compartments you can use.

## Creating Automation with Events 🔗

You can create automation based on state changes for Oracle Cloud Infrastructure resources by using event types, rules, and actions. For more information, see [Overview of Events](https://docs.oracle.com/iaas/Content/Events/Concepts/eventsoverview.htm).

See [Events for Vaults and Keys](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/event_notification.htm "Learn about Key Management event notifications for success and failure scenarios.") for more information.

## Limits on Vault Resources 🔗

Know the Vault Service limitation and its resource usage before you begin to use them.

For a list of applicable limits and [instructions for requesting a limit increase](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits-request-increase.htm), see [Limits by Service](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm). To set compartment-specific limits on a resource or resource family, administrators can use [compartment quotas](https://docs.oracle.com/iaas/Content/Quotas/Concepts/resourcequotas.htm).

For instructions to view your usage level against the tenancy's resource limits, see [Viewing a Tenancy's Limits and Usage](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits-view-tenancy.htm). You can also get each individual vault's usage against key limits by viewing key and key version counts in the vault details.

Was this article helpful?

YesNo

- [Overview of Vaults and Key Management](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#Overview_of_Vault)
- [Vault and Key Management Concepts](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#concepts)
- [Regions and Availability Domains](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#regions)
- [Private Access to Vault](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#privateaccess)
- [Resource Identifiers](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#resource)
- [Ways to Access Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#access)
- [Authentication and Authorization](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#authentication)
- [Creating Automation with Events](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#events)
- [Limits on Vault Resources](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#limits)

Was this article helpful?

YesNo

Updated 2026-01-22
- [Skip to content](https://www.ateam-oracle.com/how-to-monitor-key-usage-in-oci-kms-enable-service-logs-for-data-plane-operations#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/www.ateam-oracle.com/post.php) [Twitter](https://twitter.com/share?url=/www.ateam-oracle.com/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/www.ateam-oracle.com/post.php) [Email](https://www.ateam-oracle.com/placeholder.html)

# How to Monitor KMS Key usage in OCI Vault: Enable Service Logs for cryptographic Operations

August 13, 20253 minute read

![Profile picture of Suyog Pathak](http://blogs.oracle.com/wp-content/uploads/2025/09/IMG_3226-2.jpg)[Suyog Pathak](https://www.ateam-oracle.com/authors/suyog-pathak)
Principal Product Manager- OCI Security and Cryptography

![Profile picture of Ramesh Balajepalli](http://blogs.oracle.com/wp-content/uploads/2025/09/Ramesh-Balajepalli-author.png)[Ramesh Balajepalli](https://www.ateam-oracle.com/authors/ramesh-balajepalli)
Master Principal Cloud Architect

In security-concscious environments, managing encryption keys is only part of the story. It’s equally critical to know how those keys are used. Oracle Cloud Infrastructure (OCI) Vault’s Key Management Service provides tools to help protect sensitive data with customer-managed keys. But here’s what many users may not realize: you can use service logs to get better visibility into how those keys are used.

This post shows how to enable OCI Logging for KMS to capture cryptographic operations, such as:

- Decrypt and encrypt
- GenerateDataEncryptionKey

By capturing and analyzing these logs, you can:

- Analyzing key usage
- Monitoring for unusual activity
- Correlating application behavior with cryptographic operations

Whether you’re strengthening your security posture or investigating how encryption keys are used in your applications, enabling service logs can help give the visibility you need.

**Step 1: Understand What KMS Service Logs Capture**

By default, OCI Audit logs capture management operations on KMS resources such as vaults and keys like CreateVault, CreateKey, and RotateKey. However, cryptographic operations like Decrypt and GenerateDataEncryptionKey are available in service logs, which must be enabled explicitly.

Service logs do not contain any critical information that can impact the integrity of customer data. Instead, they capture metadata such as:

- Calling principal (user, function, or instance)
- Key OCID and version
- Operation type (e.g., Decrypt)
- Timestamp
- Vault and compartment details

**Step 2: Prerequisites**

Before enabling service logs, ensure:

- You have the required IAM permissions.
- Logging is enabled per vault, so repeat this for each vault in each region.

**Step 3: Enable Service Logs for a KMS Vault**

1. In the OCI Console, go to:
   - Observability & Management > Logging > Logs
     - Click Enable Service Log

![](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/uploaded-image-1763456521627.png)

3\. Make appropriate selections to configure the log:

- Compartment: Select the one containing your Vault
- Service: Key Management Service
- Resource: Select the Vault you want to monitor
- Log Category: Crypto Operations
- Log Name: Choose a name for the log

![](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/uploaded-image-1763456522401.png)

This enables the collection of cryptographic operations performed in the selected vault.

**Step 4: View and Query KMS Logs**

To explore the logs:

1. Go to: Logging > Logs
2. Navigate to the Log created in Step 4

![](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/uploaded-image-1763456523637.png)

3. Each Log entry will have additional details as shown below


![](https://www.ateam-oracle.com/wp-content/uploads/sites/134/2025/11/uploaded-image-1763456524336.png)

This helps you quickly identify decryption events and their context. Modify the query as needed to query on other fields.

**Step 5 (Optional): Send Logs to Object Storage or SIEM**

By default, Services Logs are stored for 30 days. For long-term retention or external analysis, use Service Connector Hub to forward logs to:

- Object Storage (for archival)
- Logging Analytics
- External tools like SIEM platforms

**Conclusion**

Enabling service logs for KMS gives you deeper insight into how, when, and by whom your keys are used. This enhances your security posture, helps meet compliance requirements and improves operational visibility.

### Authors

![Profile picture of Suyog Pathak](http://blogs.oracle.com/wp-content/uploads/2025/09/IMG_3226-2.jpg)

#### Suyog Pathak

##### Principal Product Manager- OCI Security and Cryptography

Suyog manages security and cryptography products at Oracle Cloud Infrastructure, driving innovation in secrets management, encryption, key management, and compliance. His mission is to enable customers to adopt OCI with confidence by delivering secure, scalable, and resilient solutions.

![Profile picture of Ramesh Balajepalli](http://blogs.oracle.com/wp-content/uploads/2025/09/Ramesh-Balajepalli-author.png)

#### Ramesh Balajepalli

##### Master Principal Cloud Architect

Ramesh Balajepalli is a Cloud Architect at OCI. He works with customers to design secured, scalable, and well-architected solutions on Oracle Cloud Infrastructure. He is passionate about solving complex business problems with the ever-growing capabilities of technology.

[Previous post](https://www.ateam-oracle.com/securing-your-dns-records-with-dnssec-on-oci "Securing Your DNS Records with DNSSEC on OCI")

#### Securing Your DNS Records with DNSSEC on OCI

[Mohsin Kamal](https://www.ateam-oracle.com/authors/mohsin-kamal) \| 2 minute read

[Next post](https://www.ateam-oracle.com/troubleshoot-faster-see-more-discover-more-loganai "Troubleshoot Faster, See More, Discover More with LoganAI")

#### Troubleshoot Faster, See More, Discover More with LoganAI

[Kumar Varun](https://www.ateam-oracle.com/authors/kumar-varun-2) \| 2 minute read
- [Skip to content](https://www.oracle.com/security/cloud-security/key-management/#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Oracle Home](https://www.oracle.com/)[Oracle Cloud Infrastructure](https://www.oracle.com/cloud/)

Close Search

Search Oracle.com

- QUICK LINKS
- [Oracle Fusion Cloud Applications](https://www.oracle.com/applications/)
- [Oracle Database](https://www.oracle.com/database/)
- [Download Java](https://www.oracle.com/java/technologies/downloads/)
- [Careers at Oracle](https://www.oracle.com/careers/)

Search

[Country![United States selected](https://www.oracle.com/asset/web/i/flg-us.svg)](https://www.oracle.com/countries-list.html#countries)
Close

[MenuMenu](https://www.oracle.com/oci-menu-v3/) [Contact Sales](https://www.oracle.com/corporate/contact/ "Contact Sales") [Sign in to Oracle Cloud](https://www.oracle.com/cloud/sign-in.html)

[Contact Sales](https://www.oracle.com/corporate/contact/ "Contact Sales") [Sign in to Oracle Cloud](https://www.oracle.com/cloud/sign-in.html)

# Key Management

Centrally manage and maintain control of the encryption keys that protect enterprise data and the secret credentials used to securely access key vault resources.

[Try Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/?source=:ow:o:p:nav:062520KeyManagement&intcmp=:ow:o:p:nav:062520KeyManagement)

![](https://www.oracle.com/a/ocom/img/rh03-oci-vault-demonstration-thumbnail.jpeg)

Watch our demonstration of OCI Vault (1:45)

- [Overview](https://www.oracle.com/security/cloud-security/key-management/)
- [FAQ](https://www.oracle.com/security/cloud-security/key-management/faq/)

- **[OCI Vault](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/managingvaults.htm)**
A customer-managed encryption service that enables you to control the keys that are hosted in Oracle Cloud Infrastructure (OCI) hardware security modules (HSMs) while Oracle administers the HSMs.



[Learn more about OCI Vault](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/managingvaults.htm)

- **[OCI Dedicated KMS](https://blogs.oracle.com/cloudsecurity/post/key-management-key-to-protecting-data-in-oracle-cloud)**
A single-tenant HSM partition as a service that provides a fully isolated environment for storing and managing encryption keys. You can control and claim ownership of the HSM partitions and use standard interfaces, such as PKCS#11, to perform cryptographic operations.



[Learn more about OCI Dedicated KMS](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/dedicated_kms.htm)

- **[OCI External KMS](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/external_key_management.htm)**
Enables you to use your own third-party key management system to protect data in OCI services. You control the keys and HSMs outside OCI, and you’re responsible for the administration and manageability of those HSMs.



[Learn more about OCI External KMS](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/external_key_management.htm)


Adopt a cloud key management service to encrypt enterprise data.

Protect enterprise data with secure keysAdopt a managed service focused on secure keysIntegrate secure keys with identity and audit servicesCreate and manage keys outside OCI

### Store keys in a certified security module

Manage the security of encryption keys that protect data and the secret credentials used to securely access resources by storing them in a FIPS 140-2, Level 3-certified, hardware security module (HSM).

### Optimize resources for key management

Focus on enterprise encryption needs rather than procuring, provisioning, configuring, updating, and maintaining HSMs and key management software.

### Enhance access control and compliance auditing

Control permissions for individual keys and vaults with Oracle Cloud Infrastructure Identity and Access Management. Monitor key lifecycle with Oracle Audit to meet enhanced compliance requirements.

### Maintain custody of your keys at your own site

Built in partnership with Thales, OCI External Key Management Service allows you to encrypt your data using encryption keys that you create and manage outside OCI.

**October 25, 2023**

### OCI Key Management: The key to protecting your data in Oracle Cloud

Frederick Bosco, Oracle Principal Product Manager

Oracle Cloud Infrastructure Key Management Service is a cloud-based service that provides centralized management and control of encryption keys for data stored in OCI. OCI encryption offerings are divided into two categories: Oracle-managed encryption and customer-managed encryption.

[Read the complete post](https://blogs.oracle.com/cloudsecurity/post/key-management-key-to-protecting-data-in-oracle-cloud)

#### Featured blogs

[View all](https://blogs.oracle.com/cloudsecurity/)

### Key Management resources

Cloud readinessDocumentationCustomer communityCloud learning

#### Oracle Cloud Free Tier

Build, test and deploy applications on Oracle Cloud—for free. Sign up once, get access to two free offers.

[Start with Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/?source=:ow:o:p:nav:082620OracleCloudInfrastructureVaultResources&intcmp=:ow:o:p:nav:082620OracleCloudInfrastructureVaultResources)

#### Oracle Vault Overview

Get the latest documentation for Oracle Vault.

[Learn more](https://docs.cloud.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm)

[FAQ](https://www.oracle.com/cloud/security/cloud-services/key-management-faq.html)

#### Join a community of peers

Cloud Customer Connect is Oracle's premier online cloud community. With more than 200,000 members, it’s designed to promote peer-to-peer collaboration and sharing of best practices, product updates, and feedback.

[Join today](https://cloudcustomerconnect.oracle.com/pages/home)

#### Develop Oracle Cloud Security skills

Oracle University provides training and certification to ensure the organization’s success, all delivered in a choice of formats.

[Learn more](https://education.oracle.com/paas/security/pFamily_654)

## Additional areas of interest:

#### Isolated Network Virtualization

##### SmartNIC to protect the network

[Learn more](https://www.oracle.com/cloud/security/isolated-network-virtualization/)

#### Autonomous Linux

##### Get to know about the world’s first autonomous operating system

[See the benefits](https://www.oracle.com/cloud/compute/autonomous-linux.html)

#### Achieving Compliance

##### Learn how Oracle Cloud Infrastructure is addressing global compliance concerns

[Get compliant](https://www.oracle.com/cloud/cloud-infrastructure-compliance/)

#### Oracle Cloud Infrastructure Regions

##### See Oracle Cloud Infrastructure Data Center Regions

[Get the list of regions](https://www.oracle.com/cloud/architecture-and-regions.html)

## Get started with OCI Vault

### Oracle Cloud Infrastructure Security

Read the architecture report.

[Read now (PDF)](https://www.oracle.com/a/ocom/docs/oracle-cloud-infrastructure-security-architecture.pdf)

### Try Oracle Cloud

Take advantage of the Oracle Cloud free tier.

[Try it for free](https://www.oracle.com/cloud/free/?source=:ow:o:p:nav:082620OracleCloudInfrastructureVaultGetStarted&intcmp=:ow:o:p:nav:082620OracleCloudInfrastructureVaultGetStarted)

### Security Differentiators of Oracle Cloud

Learn more about Oracle Cloud Infrastructure Security differentiators.

[Learn more (PDF)](https://www.oracle.com/a/ocom/docs/cloud/oracle-cloud-infrastructure-security-infographic.pdf)

consent.trustarc.com

# consent.trustarc.com is blocked

This page has been blocked by an extension

- Try disabling your extensions.

ERR\_BLOCKED\_BY\_CLIENT

Reload


This page has been blocked by an extension

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)

Talk to sales

Chatnow

CallUSSales

[+1.800.633.0738](tel:18006330738)

Complete list of [local country numbers](https://www.oracle.com/corporate/contact/global.html)

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
You're viewing OCI IAM documentation for new tenancies in regions that have been updated to use identity domains.

[Was my region updated?](https://docs.oracle.com/iaas/Content/Identity/getstarted/identity-domains.htm#identity_documentation)

- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
    - [Overview of IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/getstarted/identity-domains.htm)
    - [Working with Identity Domains](https://docs.oracle.com/en-us/iaas/Content/Identity/resources/manage-iam-resources.htm)
    - [Managing IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/iam/manage-iam.htm)
    - [Managing Access to Resources](https://docs.oracle.com/en-us/iaas/Content/Identity/access/manage-accessresources.htm)
      - [Understanding Administrator Roles](https://docs.oracle.com/en-us/iaas/Content/Identity/roles/understand-administrator-roles.htm)
      - [IAM Policies Overview](https://docs.oracle.com/en-us/iaas/Content/Identity/policieshow/Policy_Basics.htm)
      - [Advanced Policy Features](https://docs.oracle.com/en-us/iaas/Content/Identity/policiesadvfeatures/policyadvancedfeatures.htm)
      - [Overview of Working with Policies](https://docs.oracle.com/en-us/iaas/Content/Identity/policymgmt/managingpolicies.htm)
      - [Managing User Credentials](https://docs.oracle.com/en-us/iaas/Content/Identity/access/managing-user-credentials.htm)
      - [Overview of Network Sources](https://docs.oracle.com/en-us/iaas/Content/Identity/networksources/managingnetworksources.htm)
      - [Managing Sign-On Policies](https://docs.oracle.com/en-us/iaas/Content/Identity/signonpolicies/managingsignonpolicies.htm)
      - [Detailed Service Policy Reference](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference.htm)
        - [General Variables for All Requests](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference_topic-General_Variables_for_All_Requests.htm)
        - [Details for the Announcements Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/announcementspolicyreference.htm)
        - [Details for API Gateway](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/apigatewaypolicyreference.htm)
        - [Details for Application Performance Monitoring](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/apmpolicyreference.htm)
        - [Details for the Audit Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/auditpolicyreference.htm)
        - [Details for the Certificates Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/certificatespolicyreference.htm)
        - [Details for Cloud Shell](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/cloudshellpolicyreference.htm)
        - [Details for Service Connector Hub](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/serviceconnectorhubpolicyreference.htm)
        - [Details for the Core Services](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/corepolicyreference.htm)
        - [Details for the Database Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/databasepolicyreference.htm)
        - [Details for Database Management](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/dbmgmtpolicyreference.htm)
        - [Details for the DNS Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/dnspolicyreference.htm)
        - [Details for the Email Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/emailpolicyreference.htm)
        - [Details for the Events Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/cloudeventspolicyreference.htm)
        - [Details for the File Storage Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/filestoragepolicyreference.htm)
        - [Details for Functions](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/functionspolicyreference.htm)
        - [Details for Globally Distributed Exadata Database on Exascale Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/gldistributedexadata.htm)
        - [Details for the Health Checks Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/healthcheckpolicyreference.htm)
        - [Details for IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/iampolicyreference.htm)
        - [Details for the Internet of Things Platform](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/iot-policy-reference.htm)
        - [Details for the Java Management Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/javamanagementreference.htm)
        - [Details for Kubernetes Engine](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/contengpolicyreference.htm)
        - [Details for License Manager](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/licensemanagerpolicyreference.htm)
        - [Details for Load Balancing](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/lbpolicyreference.htm)
        - [Details for Logging](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/loggingpolicyreference.htm)
        - [Details for Log Analytics](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/loganalyticspolicyreference.htm)
        - [Details for Management Agent](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/managementagentpolicyreference.htm)
        - [Details for Management Dashboard](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/managementdashboardpolicyreference.htm)
        - [Details for the Marketplace Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/marketplacepolicyreference.htm)
        - [Details for Monitoring](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/monitoringpolicyreference.htm)
        - [Details for the Network Load Balancer Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/nlbpolicyreference.htm)
        - [Details for the Notifications Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/notificationpolicyreference.htm)
        - [Details for Archive Storage, Object Storage, and Data Transfer](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/objectstoragepolicyreference.htm)
        - [Details for Operations Insights](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/operationsinsightspolicyreference.htm)
        - [Details for Oracle Cloud VMware Solution](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/ocvspolicyreference.htm)
        - [Details for Organization Management](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/organizationsreference.htm)
        - [Details for the Process Automation Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/processautomationpolicyreference.htm)
        - [Details for Private Service Access](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/psa-policyreference.htm)
        - [Details for the Quotas Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/quotaspolicyreference.htm)
        - [Details for Registry](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/registrypolicyreference.htm)
        - [Details for Resource Manager](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/resourcemanagerpolicyreference.htm)
        - [Details for Resource Scheduler](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policy-reference_ResourceScheduler.htm)
        - [Details for Search](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/searchpolicyreference.htm)
        - [Details for Stack Monitoring](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/stackmonitoringpolicyreference.htm)
        - [Details for the Streaming Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/streamingpolicyreference.htm)
        - [Details for Subscriptions, Invoices, and Payment History](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/subsinvoicepaymenthistoryreference.htm)
        - [Details for Vault, Key Management, and Secret Management Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm)
        - [Details for the Web Application Firewall Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/wafpolicyreference.htm)
        - [Details for the Web Application Accelerator Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/waapolicyreference.htm)
    - [Federating with Identity Providers](https://docs.oracle.com/en-us/iaas/Content/Identity/federating/federating_section.htm)
    - [Managing Provisioning](https://docs.oracle.com/en-us/iaas/Content/Identity/provisioning/provisioning_section.htm)
    - [Managing Application Integrations](https://docs.oracle.com/en-us/iaas/Content/Identity/appinteg/manage-appinteg.htm)
    - [Securing IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/securing/securingiam.htm)
    - [Identity Domains User Guide](https://docs.oracle.com/en-us/iaas/Content/Identity/using/aboutidentitydomains.htm)
    - [IAM Identity Domains Application Catalog](https://docs.oracle.com/en-us/iaas/Content/identity-domains/overview.htm)
    - [Identity Cloud Service Instances Become Identity Domains in IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/conversion/overview.htm)
    - [Getting Started with the Identity Domains REST API](https://docs.oracle.com/en-us/iaas/Content/Identity/api-getstarted/api-get-started.htm)
    - [Known Issues](https://docs.oracle.com/en-us/iaas/Content/Identity/known-issues/known-issues_root.htm)
    - [Troubleshooting](https://docs.oracle.com/en-us/iaas/Content/Identity/troubleshooting/troubleshooting_root.htm)
    - [Tutorials](https://docs.oracle.com/en-us/iaas/Content/Identity/tutorials/iam-tutorials.htm)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

### [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/iaas/Content/home.htm)     [Try Free Tier](https://www.oracle.com/cloud/free/?source=:ow:o:h:po:OHPPanel1nav0625&intcmp=:ow:o:h:po:OHPPanel1nav0625)

* * *

[Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm) [IAM with Identity Domains](https://docs.oracle.com/en-us/iaas/Content/Identity/home.htm) [Managing Access to Resources](https://docs.oracle.com/en-us/iaas/Content/Identity/access/manage-accessresources.htm) [Detailed Service Policy Reference](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference.htm)

All Pages


- [Getting Started](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
- [Oracle Multicloud](https://docs.oracle.com/en-us/iaas/Content/multicloud/Oraclemulticloud.htm)
- [Oracle EU Sovereign Cloud](https://docs.oracle.com/en-us/iaas/Content/sovereign-cloud/eu-sovereign-cloud.htm)
- [Applications Services](https://docs.oracle.com/en-us/iaas/Content/applications-manager/applications-services-home.htm)
- [Infrastructure Services](https://docs.oracle.com/en-us/iaas/Content/services.htm)
    - [Overview of IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/getstarted/identity-domains.htm)
    - [Working with Identity Domains](https://docs.oracle.com/en-us/iaas/Content/Identity/resources/manage-iam-resources.htm)
    - [Managing IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/iam/manage-iam.htm)
    - [Managing Access to Resources](https://docs.oracle.com/en-us/iaas/Content/Identity/access/manage-accessresources.htm)
      - [Understanding Administrator Roles](https://docs.oracle.com/en-us/iaas/Content/Identity/roles/understand-administrator-roles.htm)
      - [IAM Policies Overview](https://docs.oracle.com/en-us/iaas/Content/Identity/policieshow/Policy_Basics.htm)
      - [Advanced Policy Features](https://docs.oracle.com/en-us/iaas/Content/Identity/policiesadvfeatures/policyadvancedfeatures.htm)
      - [Overview of Working with Policies](https://docs.oracle.com/en-us/iaas/Content/Identity/policymgmt/managingpolicies.htm)
      - [Managing User Credentials](https://docs.oracle.com/en-us/iaas/Content/Identity/access/managing-user-credentials.htm)
      - [Overview of Network Sources](https://docs.oracle.com/en-us/iaas/Content/Identity/networksources/managingnetworksources.htm)
      - [Managing Sign-On Policies](https://docs.oracle.com/en-us/iaas/Content/Identity/signonpolicies/managingsignonpolicies.htm)
      - [Detailed Service Policy Reference](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference.htm)
        - [General Variables for All Requests](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference_topic-General_Variables_for_All_Requests.htm)
        - [Details for the Announcements Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/announcementspolicyreference.htm)
        - [Details for API Gateway](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/apigatewaypolicyreference.htm)
        - [Details for Application Performance Monitoring](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/apmpolicyreference.htm)
        - [Details for the Audit Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/auditpolicyreference.htm)
        - [Details for the Certificates Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/certificatespolicyreference.htm)
        - [Details for Cloud Shell](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/cloudshellpolicyreference.htm)
        - [Details for Service Connector Hub](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/serviceconnectorhubpolicyreference.htm)
        - [Details for the Core Services](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/corepolicyreference.htm)
        - [Details for the Database Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/databasepolicyreference.htm)
        - [Details for Database Management](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/dbmgmtpolicyreference.htm)
        - [Details for the DNS Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/dnspolicyreference.htm)
        - [Details for the Email Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/emailpolicyreference.htm)
        - [Details for the Events Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/cloudeventspolicyreference.htm)
        - [Details for the File Storage Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/filestoragepolicyreference.htm)
        - [Details for Functions](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/functionspolicyreference.htm)
        - [Details for Globally Distributed Exadata Database on Exascale Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/gldistributedexadata.htm)
        - [Details for the Health Checks Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/healthcheckpolicyreference.htm)
        - [Details for IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/iampolicyreference.htm)
        - [Details for the Internet of Things Platform](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/iot-policy-reference.htm)
        - [Details for the Java Management Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/javamanagementreference.htm)
        - [Details for Kubernetes Engine](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/contengpolicyreference.htm)
        - [Details for License Manager](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/licensemanagerpolicyreference.htm)
        - [Details for Load Balancing](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/lbpolicyreference.htm)
        - [Details for Logging](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/loggingpolicyreference.htm)
        - [Details for Log Analytics](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/loganalyticspolicyreference.htm)
        - [Details for Management Agent](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/managementagentpolicyreference.htm)
        - [Details for Management Dashboard](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/managementdashboardpolicyreference.htm)
        - [Details for the Marketplace Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/marketplacepolicyreference.htm)
        - [Details for Monitoring](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/monitoringpolicyreference.htm)
        - [Details for the Network Load Balancer Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/nlbpolicyreference.htm)
        - [Details for the Notifications Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/notificationpolicyreference.htm)
        - [Details for Archive Storage, Object Storage, and Data Transfer](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/objectstoragepolicyreference.htm)
        - [Details for Operations Insights](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/operationsinsightspolicyreference.htm)
        - [Details for Oracle Cloud VMware Solution](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/ocvspolicyreference.htm)
        - [Details for Organization Management](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/organizationsreference.htm)
        - [Details for the Process Automation Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/processautomationpolicyreference.htm)
        - [Details for Private Service Access](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/psa-policyreference.htm)
        - [Details for the Quotas Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/quotaspolicyreference.htm)
        - [Details for Registry](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/registrypolicyreference.htm)
        - [Details for Resource Manager](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/resourcemanagerpolicyreference.htm)
        - [Details for Resource Scheduler](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policy-reference_ResourceScheduler.htm)
        - [Details for Search](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/searchpolicyreference.htm)
        - [Details for Stack Monitoring](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/stackmonitoringpolicyreference.htm)
        - [Details for the Streaming Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/streamingpolicyreference.htm)
        - [Details for Subscriptions, Invoices, and Payment History](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/subsinvoicepaymenthistoryreference.htm)
        - [Details for Vault, Key Management, and Secret Management Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm)
        - [Details for the Web Application Firewall Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/wafpolicyreference.htm)
        - [Details for the Web Application Accelerator Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/waapolicyreference.htm)
    - [Federating with Identity Providers](https://docs.oracle.com/en-us/iaas/Content/Identity/federating/federating_section.htm)
    - [Managing Provisioning](https://docs.oracle.com/en-us/iaas/Content/Identity/provisioning/provisioning_section.htm)
    - [Managing Application Integrations](https://docs.oracle.com/en-us/iaas/Content/Identity/appinteg/manage-appinteg.htm)
    - [Securing IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/securing/securingiam.htm)
    - [Identity Domains User Guide](https://docs.oracle.com/en-us/iaas/Content/Identity/using/aboutidentitydomains.htm)
    - [IAM Identity Domains Application Catalog](https://docs.oracle.com/en-us/iaas/Content/identity-domains/overview.htm)
    - [Identity Cloud Service Instances Become Identity Domains in IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/conversion/overview.htm)
    - [Getting Started with the Identity Domains REST API](https://docs.oracle.com/en-us/iaas/Content/Identity/api-getstarted/api-get-started.htm)
    - [Known Issues](https://docs.oracle.com/en-us/iaas/Content/Identity/known-issues/known-issues_root.htm)
    - [Troubleshooting](https://docs.oracle.com/en-us/iaas/Content/Identity/troubleshooting/troubleshooting_root.htm)
    - [Tutorials](https://docs.oracle.com/en-us/iaas/Content/Identity/tutorials/iam-tutorials.htm)
- [Developer Resources](https://docs.oracle.com/en-us/iaas/Content/devtoolshome.htm)
- [Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)
- [Marketplace](https://docs.oracle.com/en-us/iaas/Content/Marketplace/home.htm)
- [More Resources](https://docs.oracle.com/en-us/iaas/Content/General/Reference/more.htm)
- [Glossary](https://docs.oracle.com/en-us/iaas/Content/libraries/glossary/glossary-intro.htm)

[Skip to main content](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#dcoc-content-body)

Updated 2026-01-22

# Details for Vault, Key Management, and Secret Management Service

This topic covers details for writing policies to control access to vaults, keys, and secrets.

## Individual Resource-Types 🔗

`vaults`

`keys`

`key-delegate`

`hsm-cluster`

`secrets`

`secret-versions`

`secret-bundles`

`secret-replication`

## Aggregate Resource-Type 🔗

`secret-family`

A policy that uses `<verb> secret-family` is equivalent to writing one with a separate `<verb> <individual resource-type>` statement for each of the individual secret resource-types. (Secret resource-types include only `secrets`, `secret-versions`, and `secret-bundles`. Note that the resource type `secret-replication` is NOT included in the `secret-family` verb.)

See the table in [Details for Verb + Resource-Type Combinations](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#Details) for details of the API operations covered by each verb, for each individual resource-type included in `secret-family`.

## Supported Variables 🔗

Vault supports all the general variables, plus the ones
listed here. For more information about general variables supported by Oracle Cloud Infrastructure services, see [General Variables for All Requests](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference_topic-General_Variables_for_All_Requests.htm "Use the following general variables for all requests").

| Variable | Variable Type | Comments |
| --- | --- | --- |
| `request.includePlainTextKey` | String | Use this variable to control whether to return the plaintext key, in addition to the encrypted key, in response to a request to generate a data encryption key. |
| `request.kms-key.id` | String | Use this variable to control whether block volumes or buckets can be<br> created without a Vault master encryption<br> key. |
| `target.boot-volume.kms-key.id` | String | Use this variable to control whether Compute instances can be launched with<br> boot volumes that were created without a Vault master encryption key. |
| `target.key.id` | Entity (OCID) | Use this variable to control access to specific keys by OCID. |
| `target.vault.id` | Entity (OCID) | Use this variable to control access to specific vaults by OCID. |
| `target.secret.name` | String | Use this variable to control access to specific secrets, secret versions, and secret bundles by name. |
| `target.secret.id` | Entity (OCID) | Use this variable to control access to specific secrets, secret versions, and secret bundles by OCID. |

## Details for Verb + Resource-Type Combinations 🔗

The following tables show the [permissions](https://docs.oracle.com/iaas/Content/Identity/policies/permissions.htm) and API operations covered by each verb. The level of access is cumulative as you go from `inspect` \> `read` \> `use` \> `manage`. For example, a group that can use a resource can also inspect and read that resource. A plus sign (+) in a table cell indicates incremental access compared to the cell directly above it, whereas "no extra" indicates no incremental access.

For example, the `use` verb for the `keys` resource-type includes the same permissions and API operations as the `read` verb, plus the KEY\_ENCRYPT and KEY\_DECRYPT permissions and a number of API operations (`Encrypt`, `Decrypt`, and `GenerateDataEncryptionKey`). The `manage` verb allows even more permissions and API operations when compared to the `use` verb.

[vaults](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

| Verbs | Permissions | APIs Fully Covered | APIs Partially Covered |
| --- | --- | --- | --- |
| inspect | VAULT\_INSPECT | `ListVaults` | none |
| read | INSPECT +<br>VAULT\_READ | INSPECT +<br>`GetVault`<br>`GetVaultUsage` | none |
| use | READ +<br>VAULT\_CREATE\_KEY<br>VAULT\_IMPORT\_KEY<br>VAULT\_CREATE\_SECRET | no extra | `CreateKey` (also needs `manage keys`)<br>`ImportKey` (also needs `manage keys`)<br>`CreateSecret` (also needs `manage secrets`) |
| manage | USE +<br>VAULT\_CREATE<br>VAULT\_UPDATE<br>VAULT\_DELETE<br>VAULT\_MOVE<br>VAULT\_BACKUP<br>VAULT\_RESTORE<br>VAULT\_REPLICATE | USE +<br>`CreateVault`<br>`UpdateVault`<br>`ScheduleVaultDeletion`<br>`CancelVaultDeletion`<br>`ChangeVaultCompartment`<br>`BackupVault`<br>`RestoreVaultFromFile`<br>`RestoreVaultFromObjectStore`<br>`CreateVaultReplica`<br>`DeleteVaultReplica` | none |

[keys](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

| Verbs | Permissions | APIs Fully Covered | APIs Partially Covered |
| --- | --- | --- | --- |
| inspect | KEY\_INSPECT | `ListKeys`<br>`ListKeyVersions` | none |
| read | INSPECT +<br>KEY\_READ | INSPECT +<br>`GetKey`<br>`GetKeyVersion` | none |
| use | READ +<br>KEY\_ENCRYPT<br>KEY\_DECRYPT<br>KEY\_EXPORT<br>KEY\_SIGN<br>KEY\_VERIFY | READ +<br>`Encrypt`<br>`Decrypt`<br>`ExportKey`<br>`Sign`<br>`Verify` | none |
| manage | USE +<br>KEY\_CREATE<br>KEY\_UPDATE<br>KEY\_ROTATE<br>KEY\_DELETE<br>KEY\_MOVE<br>KEY\_IMPORT<br>KEY\_BACKUP<br>KEY\_RESTORE | USE +<br>`UpdateKey`<br>`CreateKeyVersion`<br>`CancelKeyDeletion`<br>`ChangeKeyCompartment`<br>`ImportKeyVersion`<br>`BackupKey`<br>`RestoreKeyFromFile`<br>`RestoreKeyFromObjectStore` | `CreateKey` (also needs `use vaults`)<br>`ImportKey` (also needs `use vaults`) |

[key-delegate](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

**Note**

key-delegate permissions are used to allow integrated OCI services to use a specific key in a specific compartment. For example, you can use this permission type to enable the Object Storage service to create or update an encrypted bucket, and to let the service encrypt or decrypt data in the bucket. Users granted delegate permissions don't have permission to use the specified key itself, but rather have permission to let specified services use the key. See the following common policies for details:

- [Let a user group delegate key usage in a compartment](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#os-bv-admins-use-key-id)
- [Let a dynamic group delegate key usage in a compartment](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#bvdelegatekey)
- [Let Block Volume, Object Storage, Kubernetes Engine, and Streaming services encrypt and decrypt volumes, volume backups, buckets, Kubernetes secrets, and stream pools](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#services-use-key)

| Verbs | Permissions | APIs Fully Covered | APIs Partially Covered |
| --- | --- | --- | --- |
| use | KEY\_ASSOCIATE<br>KEY\_DISASSOCIATE | `Encrypt`<br>`GenerateDataEncryptionKey`<br>`Decrypt` | none |

[hsm-cluster](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

| Verbs | Permissions | API Fully Covered | API Partially Covered |
| --- | --- | --- | --- |
| Inspect | HSM\_CLUSTER\_INSPECT | ListHsmClusters<br>ListHsmPartitions | None |
| read | INSPECT +<br>HSM\_CLUSTER\_READ | GetHsmCluster<br>GetHsmPartition | None |
| use | READ +<br>HSM\_CLUSTER\_UPDATE | GetPreCoUserCredentials<br>DownloadCertificateSigningRequest<br>UpdateHsmCluster<br>UploadPartitionCertificates | None |
| manage | USE +<br>HSM\_CLUSTER\_DELETE<br>HSM\_CLUSTER\_CREATE<br>HSM\_CLUSTER\_MOVE | CreateHsmCluster<br>ChangeHsmClusterCompartment<br>ScheduleHsmClusterDeletion<br>CancelHsmClusterDeletion | None |

[secrets](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

| Verbs | Permissions | APIs Fully Covered | APIs Partially Covered |
| --- | --- | --- | --- |
| inspect | SECRET\_INSPECT | `ListSecrets` | none |
| read | INSPECT +<br>SECRET\_READ | INSPECT +<br>`GetSecret` | none |
| use | READ +<br>SECRET\_UPDATE<br>SECRET\_ROTATE | READ +<br>`CancelRotation` | READ +<br>`UpdateSecret` (for cross-region secret replication feature only, also needs `manage secrets` or the `SECRET_REPLICATE_CONFIGURE` permission)<br>`ChangeSecretCompartment` (also needs `manage secrets)`<br>`ScheduleSecretVersionDeletion` (also needs `manage secret-versions`)<br>`CancelSecretVersionDeletion` (also needs `manage secret-versions`) |
| manage | USE +<br>SECRET\_CREATE<br>SECRET\_DELETE<br>SECRET\_MOVE<br>SECRET\_ROTATE<br>SECRET\_REPLICATE\_CONFIGURE | USE +<br>`ScheduleSecretDeletion`<br>`CancelSecretDeletion`<br>`RotateSecret` | USE +<br>`CreateSecret` (also needs `use vaults`)<br>`ChangeSecretCompartment` (also needs `use secrets`) |

[secret-versions](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

| Verbs | Permissions | APIs Fully Covered | APIs Partially Covered |
| --- | --- | --- | --- |
| inspect | SECRET\_VERSION\_INSPECT | `ListSecretVersions` | none |
| read | INSPECT +<br>SECRET\_VERSION\_READ | INSPECT +<br>`GetKeyVersion` | none |
| manage | READ +<br>SECRET\_VERSION\_DELETE | no extra | `ScheduleSecretVersionDeletion` (also needs `use secrets`)<br>`CancelSecretVersionDeletion` (also needs `use secrets`) |

[secret-replication](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

| Verbs | Permissions | APIs Fully Covered | APIs Partially Covered |
| --- | --- | --- | --- |
| use | SECRET\_REPLICATE | `none` | required permission to be granted to a vaultsecret resource principal to allow cross-region secret replication. |

[secret-bundles](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#)

| Verbs | Permissions | APIs Fully Covered | APIs Partially Covered |
| --- | --- | --- | --- |
| inspect | SECRET\_BUNDLE\_INSPECT | `ListSecretBundles` | none |
| read | INSPECT +<br>SECRET\_BUNDLE\_READ | INSPECT +<br>`GetSecretBundle` | none |

## Permissions Required for Each API Operation 🔗

Permission for Vault API operations.

The following table lists the API operations in a logical order, grouped by resource type.

For information about permissions, see [Permissions](https://docs.oracle.com/en-us/iaas/Content/Identity/policies/permissions.htm "Permissions are the atomic units of authorization that control a user's ability to perform operations on resources. Oracle defines all the permissions in the policy language.").

| API Operation | Permissions Required to Use the Operation |
| --- | --- |
| `ListVaults` | VAULT\_INSPECT |
| `GetVault` | VAULT\_READ |
| `CreateVault` | VAULT\_CREATE |
| `UpdateVault` | VAULT\_UPDATE |
| `ScheduleVaultDeletion` | VAULT\_DELETE |
| `CancelVaultDeletion` | VAULT\_DELETE |
| `ChangeVaultCompartment` | VAULT\_MOVE |
| `BackupVault` | VAULT\_BACKUP |
| `RestoreVaultFromFile` | VAULT\_RESTORE |
| `RestoreVaultFromObjectStore` | VAULT\_RESTORE |
| `ListVaultReplicas` | VAULT\_INSPECT |
| `CreateVaultReplica` | VAULT\_REPLICATE |
| `DeleteVaultReplica` | VAULT\_REPLICATE |
| `GetVaultUsage` | VAULT\_READ |
| `ListKeys` | KEY\_INSPECT |
| `ListKeyVersions` | KEY\_INSPECT |
| `GetKey` | KEY\_READ |
| `CreateKey` | KEY\_CREATE and VAULT\_CREATE\_KEY |
| `EnableKey` | KEY\_UPDATE |
| `DisableKey` | KEY\_UPDATE |
| `UpdateKey` | KEY\_UPDATE |
| `ScheduleKeyDeletion` | KEY\_DELETE |
| `CancelKeyDeletion` | KEY\_DELETE |
| `ChangeKeyCompartment` | KEY\_MOVE |
| `BackupKey` | KEY\_BACKUP |
| `RestoreKeyFromFile` | KEY\_RESTORE |
| `RestoreKeyFromObjectStore` | KEY\_RESTORE |
| `GetKeyVersion` | KEY\_READ |
| `CreateKeyVersion` | KEY\_ROTATE |
| `ImportKey` | KEY\_IMPORT and VAULT\_IMPORT\_KEY |
| `ImportKeyVersion` | KEY\_IMPORT |
| `ExportKey` | KEY\_EXPORT |
| `GenerateDataEncryptionKey` | KEY\_ENCRYPT (Use KEY\_ASSOCIATE when [delegating permission](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#keydelegate) to an integrated service) |
| `Encrypt` | KEY\_ENCRYPT (Use KEY\_ASSOCIATE when [delegating permission](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#keydelegate) to an integrated service) |
| `Decrypt` | KEY\_DECRYPT (Use KEY\_ASSOCIATE when [delegating permission](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#keydelegate) to an integrated service) |
| `Sign` | KEY\_SIGN |
| `Verify` | KEY\_VERIFY |
| `CreateSecret` | KEY\_ENCRYPT, KEY\_DECRYPT, SECRET\_CREATE , and VAULT\_CREATE\_SECRET (add SECRET\_REPLICATE\_CONFIGURE to allow configuration of cross-region replication in the region of the source secret) |
| `UpdateSecret` | SECRET\_UPDATE (add SECRET\_REPLICATE\_CONFIGURE to allow configuration of cross-region replication in the region of the source secret) |
| `ListSecrets` | SECRET\_INSPECT |
| `GetSecret` | SECRET\_READ |
| `RotateSecret` | SECRET\_ROTATE |
| `ScheduleSecretDeletion` | SECRET\_DELETE |
| `ChangeSecretCompartment` | SECRET\_MOVE and SECRET\_UPDATE |
| `ListSecretVersions` | SECRET\_VERSION\_INSPECT |
| `GetSecretVersion` | SECRET\_VERSION\_READ |
| `ScheduleSecretVersionDeletion` | SECRET\_VERSION\_DELETE and SECRET\_UPDATE |
| `CancelSecretVersionDeletion` | SECRET\_VERSION\_DELETE and SECRET\_UPDATE |
| `ListSecretBundles` | SECRET\_BUNDLE\_INSPECT |
| `GetSecretBundle` | SECRET\_BUNDLE\_READ |
| `GetSecretBundleByName` | SECRET\_BUNDLE\_READ |
| `ScheduleSecretVersionDeletion` | SECRET\_VERSION\_DELETE and SECRET\_UPDATE |
| `CancelSecretVersionDeletion` | SECRET\_VERSION\_DELETE and SECRET\_UPDATE |
| `ListSecretBundles` | SECRET\_BUNDLE\_INSPECT |
| `GetSecretBundle` | SECRET\_BUNDLE\_READ |
| `GetSecretBundleByName` | SECRET\_BUNDLE\_READ |
| `CreateHsmCluster` | HSM\_CLUSTER\_CREATE |
| `GetHsmCluster` | HSM\_CLUSTER\_READ |
| `GetHsmPartition` | HSM\_CLUSTER\_READ |
| `GetPreCoUserCredentials` | HSM\_CLUSTER\_UPDATE |
| `DownloadCertificateSigningRequest` | HSM\_CLUSTER\_UPDATE |
| `UpdateHsmCluster` | HSM\_CLUSTER\_UPDATE |
| `ChangeHsmClusterCompartment` | HSM\_CLUSTER\_MOVE |
| `UploadPartitionOwnerCertificate` | HSM\_CLUSTER\_UPDATE |
| `ScheduleHsmClusterDeletion` | HSM\_CLUSTER\_DELETE |
| `CancelDeletion` | HSM\_CLUSTER\_DELETE |
| `ListHsmClusters` | HSM\_CLUSTER\_INSPECT |
| `ListHsmPartitions` | HSM\_CLUSTER\_INSPECT |

Was this article helpful?

YesNo

- Expand All Expandable Areas

- [Details for Vault, Key Management, and Secret Management Service](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#Details_for_the_Vault_Service)
- [Individual Resource-Types](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#resource-types)
- [Aggregate Resource-Type](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#aggregateresource-type)
- [Supported Variables](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#variables)
- [Details for Verb + Resource-Type Combinations](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#Details)
- [Permissions Required for Each API Operation](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/keypolicyreference.htm#permissions)

Was this article helpful?

YesNo

Updated 2026-01-22
[Sitemap](https://medium.com/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2Foracledevs%2Foci-vault-basics-for-beginners-29988c375753&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](https://medium.com/?source=post_page---top_nav_layout_nav-----------------------------------------)

[Write](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[Search](https://medium.com/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2Foracledevs%2Foci-vault-basics-for-beginners-29988c375753&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

[**Oracle Developers**](https://medium.com/oracledevs?source=post_page---publication_nav-749dcac244ef-29988c375753---------------------------------------)

·

Follow publication

[![Oracle Developers](https://miro.medium.com/v2/resize:fill:38:38/1*RS7-qSTx76xpN2FcHDppBw.jpeg)](https://medium.com/oracledevs?source=post_page---post_publication_sidebar-749dcac244ef-29988c375753---------------------------------------)

Aggregation of articles from Oracle engineers, Oracle ACEs, and Java Champions on all things Oracle technology. The views expressed are those of the authors and not necessarily of Oracle.

Follow publication

# OCI Vault Basics for Beginners

[![Victor Agreda Jr](https://miro.medium.com/v2/resize:fill:32:32/0*uoaLaSJkzVJDGXSt.jpg)](https://medium.com/@vagredajr?source=post_page---byline--29988c375753---------------------------------------)

[Victor Agreda Jr](https://medium.com/@vagredajr?source=post_page---byline--29988c375753---------------------------------------)

Follow

19 min read

·

Apr 21, 2023

12

2

[Listen](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D29988c375753&operation=register&redirect=https%3A%2F%2Fmedium.com%2Foracledevs%2Foci-vault-basics-for-beginners-29988c375753&source=---header_actions--29988c375753---------------------post_audio_button------------------)

Share

Chances are you have a set of keys on you, or nearby. It’s a comforting thought that we can control access to our vehicle, home, post box, or anything needing a key by just reaching into a pocket and grabbing our keys. That idea is quite similar to how OCI Vault was designed. A sort of “central store” of keys for cloud operations, allowing users or an API to access what is needed without messing about with unsecured text files or personal password managers. Yes, tools like personal password managers are useful, but at scale we need a way to authenticate both automated and manual processes in a secure way without constantly regenerating new keys.

![](https://miro.medium.com/v2/resize:fit:666/1*zXK56ApM4N9qGETwSoAjxQ.png)

Enter: OCI Vault! Here’s a top-down view of how it works, and an example of Vault in practice.

You can read the full docs on Vault on [docs.oracle.com](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/home.htm).

You can also check out useful Vault articles at [developer.oracle.com](https://developer.oracle.com/).

The architecture of Vault is quite simple. You can store keys, secrets, even hardware security modules (the keys for them) in Vault. These stored values use a Data Encryption Key (DEK) for encryption. As you can see in the docs, [Oracle supports a variety of encryption methods](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/managingkeys_topic-To_create_a_new_key.htm) — choose your own adventure!

Most importantly, the master encryption keys can be used in a variety of ways, including (but not limited to) rotating keys, creating vaults, metadata management, and encrypting/decrypting data at rest or in transit. That last one is important, as we may have data flowing through a stream, stored in buckets, or in a file system. The Vault service can handle all of those with aplomb, making processes easier and more secure when you go to create new projects or manage existing ones.

Oracle provides a considerable amount of flexibility with Vaults, too. The [docs tell the full story](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/managingvaults.htm), but suffice it to say you can start with a very simple vault for testing and scale up as needed (keep in mind pricing will also scale up). Ultimately Vaults are “logical entities”; in other words, a representation of “things” consumed or produced by logical activities.

## Getting Started: What’s a key?

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*iEgcs5s7OfHMNQ5ltTILGA.jpeg)

What’s a vault without a key, right? In practice, it’s a little more complicated than just _one_ key. If you think about the real world, we have keys that open doors, but also “keys” in the form of cryptographic keys that can create text that is (virtually) indecipherable without the key to decode it. Thus, the Vault service recognizes three types of encryption keys: master encryption keys, wrapping keys, and data encryption keys. You can [read more about keys here](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Concepts/keyoverview.htm#concepts). In some cases, the type of key you use will also dictate what type of encryption you use.

### Master Encryption Keys

The encryption algorithms that the Vault service supports for vault master encryption keys include [AES](https://www.techtarget.com/searchsecurity/definition/Advanced-Encryption-Standard), [RSA](https://www.techtarget.com/searchsecurity/definition/RSA), and [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). You can create AES, RSA, or ECDSA master encryption keys by using the Console, CLI, or API. When you create a master encryption key, the Vault service can either generate the key material internally or you can import the key material to the service from an external source. (Support for importing key material depends on the encryption algorithm of the key material.) When you create vault master encryption keys, you create them in a vault, but where a key is stored and processed depends on its protection mode. Note that we’ll be discussing software keys, but Oracle supports hardware security modules as well (called HSM in the docs), which might be a physical dongle or number generator, etc. That sort of security is not only more advanced, but more expensive as well. For a software-protected key, any processing related to the key happens on the server.

### Wrapping Keys

Oracle offers an array of inherent security features, and “wrapping keys” are a good example. This type of encryption key comes included with each vault by default! Despite that rhyme, it’s a \_wrapping\_ key, not a rapping key. A wrapping key is a 4096-bit asymmetric encryption key based on the RSA algorithm. The public and private key pair do not count against service limits. They also do not incur service costs. You use the public key as the key encryption key when you need to wrap key material for import into the Vault service. You cannot create, delete, or rotate wrapping keys.

### Encryption Keys

Encryption Keys are keys you can rotate. Periodically rotating keys limits the amount of data encrypted or signed by one key version. If a key is ever compromised, key rotation reduces the security risk. A key’s unique, Oracle-assigned identifier, called an Oracle Cloud ID (OCID), remains the same across rotations, but the key version lets the Vault service seamlessly rotate keys to meet any compliance requirements you might have.

While hardware security modules are available, we won’t dive into those in this explainer, but again [it’s in the docs](https://docs.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/managingkeys_topic-To_create_a_new_key.htm)…

## Getting Started: Secrets

Secrets are credentials such as passwords, certificates, SSH keys, or authentication tokens that you use with Oracle Cloud Infrastructure services. The key here (pun intended?) is that it’s a lot safer to store these in the Vault than in configuration files or in code. Perhaps you’ve read about user data being stored in apps as plaintext? Yeah, that’s not a good idea. So it’s important to guard these secrets, just like the formula for Coca-Cola. Secrets, like keys, can be rotated, rolled back (in a secure manner), and imported/exported. Like many Vault features, you can create secrets via the Console, your favorite CLI, or even an API. We’ll choose one of those adventures later.

A vault secret bundle consists of the secret contents, properties of the secret and secret version (such as version number or rotation state), and user-provided contextual metadata for the secret. That’s why they’re called a bundle — it wraps everything up in a nice little bundle for Vault to manage as needed. Handy if you have a security breach or data loss and need to recover something.

### Where in the world are my Vaults? And what are my limits?

As the title of this article suggest, this article is for absolute beginners. While we can’t anticipate every use case, the documentation has this covered. Take good stuff like availability domains, for example. Vaults will duplicate across things like availability domains, and within fault domains, etc. All you have to know for now is that OCI’s priority is to allow access to your keys and secrets when you need them and is highly fault-tolerant without a bunch of messing about with trying to copy stuff over, or any other overhead hassles. It’s one of the coolest features of working in OCI to begin with!

However, depending on your needs you’ll want to keep an eye on costs. That’s where things like service limits come into play. Free tier, for example, won’t have as many bells and whistles as someone using a higher-priced tier with more features. You can still do a LOT of things with free tier, but in order to keep costs low overall and keep the services reliable and scalable, it’s good to familiarize yourself with the [concepts of our service limits in this document](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/servicelimits.htm#top).

### Other cool OCI stuff!

Your Vaults work flawlessly with [VCN’s](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/overview.htm), so you can restrict access via the network connections you specify, and they support OCID, our method of tracking unique resources. You can also manage Vault access by prudent use of groups, compartments, and policies. Speaking of access, did I mention you can hop into all this right from your browser using the OCI Console? There’s also a REST API, SDK, and of course you can use a CLI from the comfort of your own machine.

We also support hardware security modules (HSM), adding a layer of physical security to Vault operations. While it’s beyond the scope of this article, here are a couple of key points from the docs about this feature:

“After you create the resources, the service maintains copies of any given key version or secret version within the service infrastructure to provide resilience against hardware failures. Key versions of HSM-protected keys are not otherwise stored anywhere else and cannot be exported from an HSM.

When you create an RSA or ECDSA asymmetric master encryption key with the protection mode set to HSM, the Vault service stores the private key within an HSM and does not allow its export from the HSM. However, you can download the public key.”

## Vault Management

![](https://miro.medium.com/v2/resize:fit:606/1*28Y7lGQbLEV7LvJbS28H4w.jpeg)

Now let’s get down to brass tacks. Let’s create a Vault, create a key, and use it. It’s like starting your own bank but with 99% less regulatory oversight! Of course, we’ll be flying high above here, hitting the important notes, but everything you need to know is in the documentation, of course. My goal is to demystify OCI Vault for first-timers, and show how easy it is to get started.

We’ll do all this in the Console, but you can, of course, do it from a command line or via API, depending on your needs. I think a future article will focus on the API track, as this is handy for developers who will need to manage a number of keys, secrets, and so forth when creating applications. We’re (hopefully) a long way past storing user keys in plaintext files in our applications, right?

One important note: You cannot change the vault type after the vault is created. So, if you make a virtual private vault, you can’t later open that up. Again, using modern best practices assumes you’ve scoped out who needs this vault and how they’ll be using it.

Also, we’re assuming you’re the admin of this OCI account — IAM policies are robust and at times labyrinthine in OCI for good reason. You can specify with extreme granularity how every resource in your tenancy is used. That’s both good resource management and good security practice. Now, let’s get to it.

HOW TO CREATE A VAULT IN CONSOLE:

1. Open the navigation menu, click **Identity & Security**, and then click **Vault**.
2. Under List Scope, in the Compartment list, click the name of the compartment where you want to create the vault.
3. Click **Create Vault**.
4. In the Create Vault dialog box, click **Name**, and then enter a display name for the vault. Avoid entering confidential information.
5. Optionally, make the vault a virtual private vault by selecting the “Make it a virtual private vault” check box. For more information about vault types, see Key and Secret Management Concepts.
6. If you have permissions to create a resource, then you also have permissions to apply free-form tags to that resource. To apply a defined tag, you must have permissions to use the tag namespace. For more information about tagging, see Resource Tags. If you are not sure whether to apply tags, skip this option (you can apply tags later) or ask your administrator.
7. When you are finished, click **Create Vault**.

Well, now that you have a shiny new vault, you’ll need a set of master keys to open it or lock it, right? Just like a bank! We’ll create a _Master Encryption Key_ for this purpose, and again use Console to do it.

### Key Management

HOW TO CREATE A MASTER ENCRYPTION KEY:

1. Open the navigation menu, click **Identity & Security**, and then click **Vault**.
2. Under List Scope, in the Compartment list, click the name of the compartment where you want to create the key.
3. Click the name of the vault where you want to create the key.
4. Click **Master Encryption Keys**, and then click **Create Key**.
5. In the Create Key dialog box, choose a compartment from the Create in Compartment list. (Keys can exist outside the compartment the vault is in.)
6. Click **Protection Mode**, and then choose **Software**. (NOTE: This is the one you want, as HSM’s are a bit overkill for this first experience). You can’t change this later, but we won’t need to in this example.
7. Click **Name**, and then enter a name to identify the key. Avoid entering confidential information.
8. Click **Key Shape: Algorithm**, and then choose from one of the following algorithms:

- AES. Advanced Encryption Standard (AES) keys are symmetric keys that you can use to encrypt data at rest.
- RSA. Rivest-Shamir-Adleman (RSA) keys are asymmetric keys, also known as key pairs consisting of a public key and a private key, that you can use to encrypt data in transit, to sign data, and to verify the integrity of signed data.
- ECDSA. Elliptic curve cryptography digital signature algorithm (ECDSA) keys are asymmetric keys that you can use to sign data and to verify the integrity of signed data.

9\. Depending on what you chose in the previous step, either click **Key Shape: Length** or **Key Shape: Curve ID**, and then choose the key length, in bits, for AES and RSA keys, or specify the curve ID for ECDSA keys. For AES keys, the Vault service supports keys that are exactly 128 bits, 192 bits, or 256 bits in length. For RSA keys, the service supports keys that are 2048 bits, 3072 bits, or 4096 bits. With ECDSA keys, you can create keys that have an elliptic curve ID of NIST\_P256, NIST\_P384, or NIST\_P521.

## Get Victor Agreda Jr’s stories in your inbox

Join Medium for free to get updates from this writer.

Subscribe

Subscribe

10\. Optionally, to apply tags, click **Show Advanced Options**. (We’re not covering tags in this article, but they are SUPER handy for organizing resources, especially across various resources in OCI and are worth the time to master as you grow your expertise or the size of your projects!) If you have permissions to create a resource, then you also have permissions to apply free-form tags to that resource.

11\. When you are finished, click **Create Key**.

Not too bad, eh? Again, tags are great, but for now we’ll zoom past them. And side note, the operation [CreateKey](https://docs.oracle.com/iaas/api/#/en/key/latest/Key/CreateKey) is how we’d create a key using the API. Logical, no?

Now, there’s actually a few more steps. While our steps created a key, we need to _enable_ it as well. That’s easy enough from the Console:

1\. Open the navigation menu, click **Identity & Security**, and then click **Vault**.

2\. Under List Scope, in the Compartment list, click the name of the compartment that contains the vault with the key you want to enable.

3\. From the list of vaults in the compartment, click the vault name.

4\. Click **Master Encryption Keys**, locate the key you want to enable, and then select the check box next to the key name. (If needed, first change the list scope to the compartment that contains the key.)

5\. In the Actions menu, click **Enable**.

Of course, as you can see in our docs, you can rotate keys (good practice is to do this at set intervals), disable or delete keys, view and update them, and so on. But wait a moment… _delete a key?_ Yeah, as you might imagine that’s a bit like when Uncle Billy lost the deposits to the Savings and Loan in It’s a Wonderful Life — chaos can ensue. As the docs state:

> When you set a key to the Pending Deletion state, anything encrypted by that key immediately becomes inaccessible. This includes secrets. The key also cannot be assigned or unassigned to any resources or otherwise updated. When the key is deleted, all key material and metadata is irreversibly destroyed. Before you delete a key, either assign a new key to resources currently encrypted by the key or preserve your data another way. If you want to restore use of a key before it is permanently deleted, you can cancel its deletion.

Whew, so you have a bit of a chance to step back from oblivion should someone accidentally try to delete a key that is needed to access secrets or other resources tied to that key. Note that this doesn’t destroy the Vault, but it is something you need to be wary about!

## Assigning Keys

OK, sure, you’ve created keys and enabled them, but now they’re just sitting on a desk (so to speak). The rubber hits the road when we assign them to resources! Keep in mind that if you remove a Vault master encryption key assignment from a resource, the service returns to using an Oracle-managed key for cryptography. What’s cool is that you can assign master encryption keys that you manage to block or boot volumes, databases, file systems, buckets, and stream pools. Block Volume, Database, File Storage, Object Storage, and Streaming use the keys to decrypt the data encryption keys that protect the data that is stored by each respective service.

But wait, there’s more! You can also assign master encryption keys to clusters that you create using [Container Engine for Kubernetes](https://www.oracle.com/cloud/cloud-native/container-engine-kubernetes/) to encrypt Kubernetes secrets at rest in the etcd key-value store.

However, it’s important to note that “Keys associated with volumes, buckets, file systems, clusters, and stream pools will not work unless you authorize Block Volume, Object Storage, File Storage, Container Engine for Kubernetes, and Streaming to use keys on your behalf. Additionally, you must also authorize users to delegate key usage to these services in the first place.” Plus, keys connected to databases won’t work unless you authorize a [Dynamic Group](https://docs.oracle.com/en-us/iaas/data-science/using/create-dynamic-groups.htm) that includes all the nodes in the DB system to manage keys in the tenancy. For more information, see [Required IAM Policy in Exadata Cloud Service](https://docs.oracle.com/iaas/exadatacloud/exacs/preparing-for-ecc-deployment.html#GUID-EA03F7BC-7D8E-4177-AFF4-615F71C390CD). And for more information on [delegating key usage see here](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#os-bv-admins-use-key-id), and for various storage and containers, [check out these docs](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/commonpolicies.htm#services-use-key).

Anyway, back to the fun stuff. One of the more common places to put your “things” in OCI will be in an Object Storage Bucket. As the name implies, it’s a basic storage place for all kinds of things in your compartment, but you can [read more about object storage buckets here](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/managingbuckets.htm). As with nearly everything in OCI, there are lots of ways to control access to buckets (IAM policies, of course), but for our purposes we’re going to encrypt our bucket using our Vault’s service master encryption key. If you think about this, it’s like Mission Impossible, where Tom Cruise tries to get into a secure location but after negotiating several layers of security policies, finds that the hard drive is ALSO encrypted. I guess that’s why they make sequels, right?

Likewise, we’ll encrypt our storage bucket and use the master key to get in. To assign our previously-enabled key in the Console, it’s pretty easy:

1. Open the navigation menu and click **Storage**. Under Object Storage, click **Buckets**.
2. Under List Scope, in the Compartment list, choose the compartment where you want to create a bucket that’s encrypted with a Vault service master encryption key.
3. Click **Create Bucket**, and then follow the instructions in [Creating a Bucket](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/managingbuckets_topic-To_create_a_bucket.htm#top).

Note that keys can be assigned to boot volumes, block volumes, file systems and more. Just remember that any objects have to be authorized to use these keys to begin with! That’s true of REST API’s, CLI, or the Console.

## Using Keys

Oh yeah, you’ll want to use those keys, right? As you may already know, the key to using the keys (pun intended) is viewing the Public Key so you can use that. To view the asymmetric public key using the OCI Console:

1. Open the navigation menu, click **Identity & Security**, and then click **Vault**.
2. Under List Scope, in the Compartment list, click the name of the compartment that contains the vault with the key you want to rotate.
3. From the list of vaults in the compartment, click the vault name.
4. Click **Master Encryption Keys**, and then click the name of the master encryption key that you want to rotate to a new key version.
5. In the list of key versions, find the key for which you want to view the public key, click the **Actions** menu, and then click **View Public Key**.
6. Then, do one of the following:

\\* To copy the contents of the public key, click **Copy**. The contents of the public key are copied to your clipboard.

\\* To download the public key, click **Download**. The file is automatically downloaded to your local computer.
7. When you are finished, click **Close**.

## Encrypting and Decrypting Data using Master Encryption Key

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*cUNYG4gc83iEXu3k57ecJA.jpeg)

Now we must shift gears a bit. Because certain tasks are not accessible in the Console, for good (security) reasons. Much of what you’ll be doing with keys involves encrypting and decrypting data, which simply isn’t part of what the Console does. That’s more likely going to happen in your application via API or in a CLI when building your application. Thus, we’ll switch to a CLI for now…

You can bring your own CLI to the party and SSH into your compute instance OR you can just use Cloud Shell in the Console. We’ll assume the latter (because you may not even have an instance set up, but Cloud Shell will instantiate what you need to proceed).

And here’s a very important note:

> You can use either AES symmetric keys or RSA asymmetric keys to encrypt or decrypt data. ECDSA keys do not support vault cryptography required to encrypt or decrypt data. If you want to encrypt data by using an RSA asymmetric key, then you must also provide the — key-version-id of the key. To decrypt the data, you need to provide the same — key-version-id. The need to track key versions exists because, unlike symmetric keys, an asymmetric key’s ciphertext does not contain the information that the service needs for decryption purposes.

Now let’s look at how this works in practice. Bear in mind some assumptions we’ve made, specifically that we’ve created a resource (like a storage bucket), and a key (which we’ve enabled), and a Vault. We’ve also copied our public key and put it somewhere we can get to.

Essentially we spun up a data resource worth encrypting, which has an endpoint (which is how you’d access it if you were performing normal data operations on it). This data plane will be needed in order to encrypt it, as we have to tell OCI where our data is (like ordering a pizza, they need your address). Of course, this could be a MySQL database or whatever, but they’ll all have an endpoint for you to use (which could be private or public, it just depends on what you plan to do with it).

We also created a key and viewed the asymmetric public key as noted earlier. In my case I’ll use an RSA asymmetric key because I already viewed and stored my public key on my local drive.

The format OCI is expecting will look like this:

```
oci kms crypto encrypt --key-id <key_OCID> --plaintext <base64_string> --endpoint <data_plane_url>
```

The Key ID you can get from the Console via **Identity & Security** \> **Vault**. Under List Scope in the Compartment list, you’ll choose the compartment where you created that key. Choose the Vault you created earlier. And in Master Encryption Keys the console will show you all the pertinent info, like OCID, when it was created, what compartment it’s in, etc. Yep, that OCID for the key is what you’ll put in `<key_OCID>`.

You’ll plug the public key into `<base64_string>` which is, of course, plain text. And then there’s the endpoint, which will be the URL of your data object, whatever it may be.

There’s an optional parameter here too, called associated-data. This must be properly-formatted JSON, but you can add information that doesn’t need to be secret info just about the encrypted data. Here’s an example of all of this put together plus some associated data for fun:

```
oci kms crypto encrypt --key-id ocid1.key.region1.sea.exampleaaacu2.examplesmtpsuqmoy4m5cvblugmizcoeu2nfc6b3zfaux2lmqz245gezevsq --plaintext VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZy4= --associated-data '{"CustomerId":"12345", "Custom Data":"custom data"}' --endpoint https://exampleaaacu3-crypto.kms.us-ashburn-1.oraclecloud.com
```

Pretty cool, yeah?

## Decrypting Data

To decrypt our data, well, it’s time for a little fishing trip to the old API watering hole. Yep, you can’t do this in Console (why would you?) and you wouldn’t manually decrypt data in the CLI as a production solution (unless you are extremely bored) but you can use the CLI to make a call to the Vault Service’s API. So we’ll use the CLI to demonstrate how decryption works. Decrypting data is normally one of those things you do when you’re DOING something with your data. That’s why we’ll use an API call to access the data, decrypt it, and then send it along for whatever processing we need to do to it. I won’t cover every scenario here, but I will point out all the trails you might want to hike depending on the languages and tools you might use (although it’s still not an exhaustive list, and we may add more as time goes on — that’s progress for you!).

Lucas Jellema has a [great example in this Medium article](https://medium.com/oracledevs/oracle-cloud-infrastructure-vault-service-to-generate-manage-and-encrypt-decrypt-using-keys-4122c3ef80b0), where he takes the opening text of Anna Karanenina and uses the OCI CLI to make a call to the Vault Service’s API thusly:

```
keys=$(oci kms management key list -c $compartmentId --endpoint $vaultManagementEndpoint)

export keyOCID=$(echo $keys | jq -r --arg display_name "lab-key" '.data | map(select(."display-name" == $display_name)) | .[0] | .id')

toEncrypt=$(echo "Happy families are all alike,every unhappy family is unhappy in its own way." | base64)

# the next line removes the spaces from $toEncrypt variable

toEncrypt=$(echo $toEncrypt| tr -d ' ')

encrypted=$(oci kms crypto encrypt --key-id $keyOCID --plaintext $toEncrypt --endpoint $vaultCryptoEndpoint)

export cipher=$(echo $encrypted | jq -r '.data | .ciphertext')

echo "This is the result of the encryption, a text that we can send anywhere and that no one will understand: $cipher"
```

If someone were to try and look at the output of this without the key, they’d see a bunch of nonsense!

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*6xMa6mss-DhVpEJDvWBZcw.png)

encrypted text

So we want to use this text and make it readable, and to do that we’ll use the key in the vault. In Lucas’s example (note he’s using base64 encoding which is used to encode binary data as printable text):

```
decrypted=$(oci kms crypto decrypt --key-id $keyOCID  --ciphertext $cipher --endpoint $vaultCryptoEndpoint)

export b64encodedPlaintext=$(echo $decrypted | jq -r '.data | .plaintext')

echo $b64encodedPlaintext | base64 --decode
```

Let’s dissect this a bit. Above this block of code is where you’d put the encrypted data. That mess of gibberish that was spat out previously in his example.

First, we use `$decrypted` to pass along our `decrypt` command with the keyID parameter, the ciphertext, and a Vault endpoint. Of course, these values are set using pretty clear names in his example (keyOCID and so on). We then tell the system to export the decrypted data as plaintext, specifically using base64 so we can, you know, read it (unless you tend to read binary code!).

Todd Sharp also has a [great rundown of how to go from zero to Vault with decrypted text](https://blogs.oracle.com/developers/post/protect-your-sensitive-data-with-secrets-in-the-oracle-cloud) in a short time, and adds in a serverless function that will retrieve and decrypt secrets for you. As we discussed earlier, he uses the OCI Console to create a Vault, a key, and a secret (in Jellema’s article he’s just using some plaintext, not actually a “secret” per se).

Todd copies the OCID of the secret, and then uses that in the function to direct the system to the proper place. He also dives into the dependencies you’ll need to work with for the OCI SDK and an extra bit you’ll need if you’re using anything above Java 8.

Secrets are particularly useful when you’re building applications, especially if you’re joining us in the 21st century, where we take nothing for granted.

## Wrap Up

This has been a brief flyover of the OCI Vault service, how to get started, and where to go once you’ve got a vault and some keys generated. Of course, there’s a lot more to it than this (like those HSMs), but you can always drop into our [Oracle Developer Slack](https://bit.ly/odevrel_slack) to ask where to go from here, or try our [Free Tier](https://signup.cloud.oracle.com/?language=en) and kick the tires yourself. Enjoy!

[Security](https://medium.com/tag/security?source=post_page-----29988c375753---------------------------------------)

[Oci](https://medium.com/tag/oci?source=post_page-----29988c375753---------------------------------------)

[Vault](https://medium.com/tag/vault?source=post_page-----29988c375753---------------------------------------)

[Keys](https://medium.com/tag/keys?source=post_page-----29988c375753---------------------------------------)

[![Oracle Developers](https://miro.medium.com/v2/resize:fill:48:48/1*RS7-qSTx76xpN2FcHDppBw.jpeg)](https://medium.com/oracledevs?source=post_page---post_publication_info--29988c375753---------------------------------------)

[![Oracle Developers](https://miro.medium.com/v2/resize:fill:64:64/1*RS7-qSTx76xpN2FcHDppBw.jpeg)](https://medium.com/oracledevs?source=post_page---post_publication_info--29988c375753---------------------------------------)

Follow

[**Published in Oracle Developers**](https://medium.com/oracledevs?source=post_page---post_publication_info--29988c375753---------------------------------------)

[41K followers](https://medium.com/oracledevs/followers?source=post_page---post_publication_info--29988c375753---------------------------------------)

· [Last published 4 days ago](https://medium.com/oracledevs/filesystem-vs-database-for-agent-memory-8b525380cd6d?source=post_page---post_publication_info--29988c375753---------------------------------------)

Aggregation of articles from Oracle engineers, Oracle ACEs, and Java Champions on all things Oracle technology. The views expressed are those of the authors and not necessarily of Oracle.

Follow

[![Victor Agreda Jr](https://miro.medium.com/v2/resize:fill:48:48/0*uoaLaSJkzVJDGXSt.jpg)](https://medium.com/@vagredajr?source=post_page---post_author_info--29988c375753---------------------------------------)

[![Victor Agreda Jr](https://miro.medium.com/v2/resize:fill:64:64/0*uoaLaSJkzVJDGXSt.jpg)](https://medium.com/@vagredajr?source=post_page---post_author_info--29988c375753---------------------------------------)

Follow

[**Written by Victor Agreda Jr**](https://medium.com/@vagredajr?source=post_page---post_author_info--29988c375753---------------------------------------)

[50 followers](https://medium.com/@vagredajr/followers?source=post_page---post_author_info--29988c375753---------------------------------------)

· [26 following](https://medium.com/@vagredajr/following?source=post_page---post_author_info--29988c375753---------------------------------------)

Follow

## Responses (2)

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

Write a response

[What are your thoughts?](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Foracledevs%2Foci-vault-basics-for-beginners-29988c375753&source=---post_responses--29988c375753---------------------respond_sidebar------------------)

Cancel

Respond

[![Wagner Franchin](https://miro.medium.com/v2/resize:fill:32:32/1*aq7JoGFF1b8KmmWU0LFLJA.png)](https://medium.com/@wagnerjfr?source=post_page---post_responses--29988c375753----0-----------------------------------)

[Wagner Franchin](https://medium.com/@wagnerjfr?source=post_page---post_responses--29988c375753----0-----------------------------------)

[May 14, 2023](https://medium.com/@wagnerjfr/hey-victor-how-can-i-publish-my-mysql-articles-in-oracle-developers-at-medium-c40d029332a3?source=post_page---post_responses--29988c375753----0-----------------------------------)

This has been a brief flyover

```
Hey Victor, how can I publish my MySQL Articles in Oracle Developers at Medium?
```

1

1 reply

Reply

[![Bala Guddeti](https://miro.medium.com/v2/resize:fill:32:32/1*QqdrBVlYyr5ARG2k1GwALQ.jpeg)](https://medium.com/@AIMLbyBala?source=post_page---post_responses--29988c375753----1-----------------------------------)

[Bala Guddeti](https://medium.com/@AIMLbyBala?source=post_page---post_responses--29988c375753----1-----------------------------------)

[Apr 5, 2025](https://medium.com/@AIMLbyBala/easy-to-follow-flow-good-work-12272628030b?source=post_page---post_responses--29988c375753----1-----------------------------------)

```
easy to follow flow, good work!
```

Reply

## More from Victor Agreda Jr and Oracle Developers

![Use Data Streaming on OCI to provide actionable health information — Part one](https://miro.medium.com/v2/resize:fit:679/format:webp/1*4vg1zjytZSRo26EjKZnfkA.jpeg)

[![Oracle Developers](https://miro.medium.com/v2/resize:fill:20:20/1*RS7-qSTx76xpN2FcHDppBw.jpeg)](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----0---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

In

[Oracle Developers](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----0---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[Victor Agreda Jr](https://medium.com/@vagredajr?source=post_page---author_recirc--29988c375753----0---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[**Use Data Streaming on OCI to provide actionable health information — Part one**\\
\\
**Let’s combine a few data sources in OCI, starting with weather, then adding public health data for a fuller picture.**](https://medium.com/oracledevs/use-data-streaming-on-oci-to-provide-actionable-health-information-part-one-11ccd4b015b3?source=post_page---author_recirc--29988c375753----0---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

Jan 17, 2023

[A clap icon58](https://medium.com/oracledevs/use-data-streaming-on-oci-to-provide-actionable-health-information-part-one-11ccd4b015b3?source=post_page---author_recirc--29988c375753----0---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

![Tutorial: Building a Code Review Assistant with MCP in Agent Spec](https://miro.medium.com/v2/resize:fit:679/format:webp/1*_LJLsR-EL1Ua_vXIAuBLxg.png)

[![Oracle Developers](https://miro.medium.com/v2/resize:fill:20:20/1*RS7-qSTx76xpN2FcHDppBw.jpeg)](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----1---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

In

[Oracle Developers](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----1---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[Sathvik Bhagavan](https://medium.com/@sathvikbhagavan?source=post_page---author_recirc--29988c375753----1---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[**Tutorial: Building a Code Review Assistant with MCP in Agent Spec**\\
\\
**In this tutorial, we will create a powerful code review assistant using Agent Spec and MCP to automate pull request reviews, enhancing code…**](https://medium.com/oracledevs/tutorial-building-a-code-review-assistant-with-mcp-in-agent-spec-aa1324c99ee1?source=post_page---author_recirc--29988c375753----1---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

Jan 13

[A clap icon218](https://medium.com/oracledevs/tutorial-building-a-code-review-assistant-with-mcp-in-agent-spec-aa1324c99ee1?source=post_page---author_recirc--29988c375753----1---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

![Goodbye ingress-nginx, hello kgateway — Part 1: Introduction](https://miro.medium.com/v2/resize:fit:679/format:webp/1*pMZWeOMgbHe27Ojx-n-akg.png)

[![Oracle Developers](https://miro.medium.com/v2/resize:fill:20:20/1*RS7-qSTx76xpN2FcHDppBw.jpeg)](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----2---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

In

[Oracle Developers](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----2---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[Ali Mukadam](https://medium.com/@lmukadam?source=post_page---author_recirc--29988c375753----2---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[**Goodbye ingress-nginx, hello kgateway — Part 1: Introduction**\\
\\
**Goodbye ingress-nginx, hello kgateway**](https://medium.com/oracledevs/goodbye-ingress-nginx-hello-kgateway-part-1-introduction-9827845985b5?source=post_page---author_recirc--29988c375753----2---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

Nov 20, 2025

[A clap icon61](https://medium.com/oracledevs/goodbye-ingress-nginx-hello-kgateway-part-1-introduction-9827845985b5?source=post_page---author_recirc--29988c375753----2---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

![Get Started with Oracle Generative AI using Oracle JET](https://miro.medium.com/v2/resize:fit:679/format:webp/0*xaCZZDiuZG8CAbi8)

[![Oracle Developers](https://miro.medium.com/v2/resize:fill:20:20/1*RS7-qSTx76xpN2FcHDppBw.jpeg)](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----3---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

In

[Oracle Developers](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753----3---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[Victor Agreda Jr](https://medium.com/@vagredajr?source=post_page---author_recirc--29988c375753----3---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[**Get Started with Oracle Generative AI using Oracle JET**\\
\\
**Generative AI offers organizations the opportunity to build better solutions for customers. Try Oracle Generative AI using Oracle JET…**](https://medium.com/oracledevs/get-started-with-oracle-generative-ai-using-oracle-jet-cef23bfda5c7?source=post_page---author_recirc--29988c375753----3---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

Jan 23, 2024

[A clap icon117](https://medium.com/oracledevs/get-started-with-oracle-generative-ai-using-oracle-jet-cef23bfda5c7?source=post_page---author_recirc--29988c375753----3---------------------1d8cdab0_ff71_4ccc_afeb_22e7d1cb5aa2--------------)

[See all from Victor Agreda Jr](https://medium.com/@vagredajr?source=post_page---author_recirc--29988c375753---------------------------------------)

[See all from Oracle Developers](https://medium.com/oracledevs?source=post_page---author_recirc--29988c375753---------------------------------------)

## Recommended from Medium

![6 brain images](https://miro.medium.com/v2/resize:fit:679/format:webp/1*Q-mzQNzJSVYkVGgsmHVjfw.png)

[![Write A Catalyst](https://miro.medium.com/v2/resize:fill:20:20/1*KCHN5TM3Ga2PqZHA4hNbaw.png)](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

In

[Write A Catalyst](https://medium.com/write-a-catalyst?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[Dr. Patricia Schmidt](https://medium.com/@creatorschmidt?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[**As a Neuroscientist, I Quit These 5 Morning Habits That Destroy Your Brain**\\
\\
**Most people do \#1 within 10 minutes of waking (and it sabotages your entire day)**](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

Jan 14

[A clap icon19.3K\\
\\
A response icon323](https://medium.com/write-a-catalyst/as-a-neuroscientist-i-quit-these-5-morning-habits-that-destroy-your-brain-3efe1f410226?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

![Stanford Just Killed Prompt Engineering With 8 Words (And I Can’t Believe It Worked)](https://miro.medium.com/v2/resize:fit:679/format:webp/1*va3sFwIm26snbj5ly9ZsgA.jpeg)

[![Generative AI](https://miro.medium.com/v2/resize:fill:20:20/1*M4RBhIRaSSZB7lXfrGlatA.png)](https://medium.com/generative-ai?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

In

[Generative AI](https://medium.com/generative-ai?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[Adham Khaled](https://medium.com/@adham__khaled__?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[**Stanford Just Killed Prompt Engineering With 8 Words (And I Can’t Believe It Worked)**\\
\\
**ChatGPT keeps giving you the same boring response? This new technique unlocks 2× more creativity from ANY AI model — no training required…**](https://medium.com/generative-ai/stanford-just-killed-prompt-engineering-with-8-words-and-i-cant-believe-it-worked-8349d6524d2b?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

Oct 19, 2025

[A clap icon23K\\
\\
A response icon590](https://medium.com/generative-ai/stanford-just-killed-prompt-engineering-with-8-words-and-i-cant-believe-it-worked-8349d6524d2b?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

![What a Sex Worker Notices About Gen X and Gen Z Men](https://miro.medium.com/v2/resize:fit:679/format:webp/0*hjbGaG9CLZSyLfF5)

[![Jonatha Czajkiewicz](https://miro.medium.com/v2/resize:fill:20:20/1*9XGxLUkOutVNiUjHml4bKQ.png)](https://medium.com/@jonathacz99?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[Jonatha Czajkiewicz](https://medium.com/@jonathacz99?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[**What a Sex Worker Notices About Gen X and Gen Z Men**\\
\\
**How masculinity changed between Grunge and TikTok**](https://medium.com/@jonathacz99/what-a-sex-worker-notices-about-gen-x-and-gen-z-men-fd0d13b6c203?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

Nov 16, 2025

[A clap icon18.1K\\
\\
A response icon442](https://medium.com/@jonathacz99/what-a-sex-worker-notices-about-gen-x-and-gen-z-men-fd0d13b6c203?source=post_page---read_next_recirc--29988c375753----0---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

![I Handed ChatGPT $100 to Trade Stocks — Here’s What Happened in 2 Months.](https://miro.medium.com/v2/resize:fit:679/format:webp/1*6o82nTO9HDRHNNlmCLlxvw.png)

[![Coding Nexus](https://miro.medium.com/v2/resize:fill:20:20/1*KCZtO6-wFqmTaMmbTMicbw.png)](https://medium.com/coding-nexus?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

In

[Coding Nexus](https://medium.com/coding-nexus?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[Civil Learning](https://medium.com/@civillearning?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[**I Handed ChatGPT $100 to Trade Stocks — Here’s What Happened in 2 Months.**\\
\\
**What happens when you let a chatbot play Wall Street? It’s up 29% while the S&P 500 lags at 4%.**](https://medium.com/coding-nexus/i-handed-chatgpt-100-to-trade-stocks-heres-what-happened-in-2-months-ca1dfeb92edb?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

Sep 2, 2025

[A clap icon9K\\
\\
A response icon267](https://medium.com/coding-nexus/i-handed-chatgpt-100-to-trade-stocks-heres-what-happened-in-2-months-ca1dfeb92edb?source=post_page---read_next_recirc--29988c375753----1---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

![Why We are Moving Away from Terraform 2026](https://miro.medium.com/v2/resize:fit:679/format:webp/0*dFoEdj0gHZ8EFKJ9.png)

[![Cloud With Azeem](https://miro.medium.com/v2/resize:fill:20:20/1*oJWwUx75Cf5oGoEfAefJpw.png)](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--29988c375753----2---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[Cloud With Azeem](https://medium.com/@cloudwithazeem?source=post_page---read_next_recirc--29988c375753----2---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[**Why We are Moving Away from Terraform 2026**\\
\\
**We left Terraform in 2026 due to licensing, lock-in, and better IaC alternatives like OpenTofu and Pulumi. Here’s what we learned.**](https://medium.com/@cloudwithazeem/moving-away-from-terraform-76766966bb05?source=post_page---read_next_recirc--29988c375753----2---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

Aug 24, 2025

[A clap icon170\\
\\
A response icon11](https://medium.com/@cloudwithazeem/moving-away-from-terraform-76766966bb05?source=post_page---read_next_recirc--29988c375753----2---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

![Git Confused Me for Years Until I Found This Simple Guide](https://miro.medium.com/v2/resize:fit:679/format:webp/1*YUALkK55VO_6mxjVqq_smQ.png)

[![Let’s Code Future](https://miro.medium.com/v2/resize:fill:20:20/1*QXfeVFVbIzUGnlwXoOZvyQ.png)](https://medium.com/lets-code-future?source=post_page---read_next_recirc--29988c375753----3---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

In

[Let’s Code Future](https://medium.com/lets-code-future?source=post_page---read_next_recirc--29988c375753----3---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[The Unwritten Algorithm](https://medium.com/@the_unwritten_algorithm?source=post_page---read_next_recirc--29988c375753----3---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[**Git Confused Me for Years Until I Found This Simple Guide**\\
\\
**Most developers don’t really understand Git — here’s the simple truth.**](https://medium.com/lets-code-future/git-confused-me-for-years-until-i-found-this-simple-guide-a45223bebb40?source=post_page---read_next_recirc--29988c375753----3---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

Dec 19, 2025

[A clap icon2.8K\\
\\
A response icon60](https://medium.com/lets-code-future/git-confused-me-for-years-until-i-found-this-simple-guide-a45223bebb40?source=post_page---read_next_recirc--29988c375753----3---------------------48aeac4a_f4e0_437a_89ff_a64c0f443f4c--------------)

[See more recommendations](https://medium.com/?source=post_page---read_next_recirc--29988c375753---------------------------------------)

[Help](https://help.medium.com/hc/en-us?source=post_page-----29988c375753---------------------------------------)

[Status](https://status.medium.com/?source=post_page-----29988c375753---------------------------------------)

[About](https://medium.com/about?autoplay=1&source=post_page-----29988c375753---------------------------------------)

[Careers](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----29988c375753---------------------------------------)

[Press](mailto:pressinquiries@medium.com)

[Blog](https://blog.medium.com/?source=post_page-----29988c375753---------------------------------------)

[Privacy](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----29988c375753---------------------------------------)

[Rules](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----29988c375753---------------------------------------)

[Terms](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----29988c375753---------------------------------------)

[Text to speech](https://speechify.com/medium?source=post_page-----29988c375753---------------------------------------)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
- [Skip to content](https://blogs.oracle.com/cloud-infrastructure/introducing-dedicated-secret-management-console#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/cloud-infrastructure/post.php) [Twitter](https://twitter.com/share?url=/cloud-infrastructure/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/cloud-infrastructure/post.php) [Email](https://blogs.oracle.com/cloud-infrastructure/placeholder.html)

[Cloud Infrastructure Security](https://blogs.oracle.com/cloud-infrastructure/category/oci-cloud-infrastructure-security)

# Introducing a dedicated Secret Management console experience

January 22, 20263 minute read

![Profile picture of Sri Meghana Vyakaranam](http://blogs.oracle.com/cloud-infrastructure/wp-content/uploads/sites/83/2025/12/Meghana_Screenshot-2025-12-11-174849.jpg)[Sri Meghana Vyakaranam](https://blogs.oracle.com/authors/srimeghana-vyakaranam)

**OCI Secret Management** helps you securely store, retrieve, and manage sensitive information, such as passwords, API keys, and tokens across your cloud environments. Secrets are an essential part of modern application security, enabling safe automation and secure communication between services without exposing credentials.

Now, OCI is introducing a **new dedicated console experience** for Secrets where customers will be able to easily find their secrets in the dedicated “Secrets” console under the Identity & Security tab in the OCI Console. This update provides a cleaner layout, faster navigation, and a more intuitive workflow for managing secrets. All APIs, SDKs, CLI workflows, automation scripts, permissions and policies remain fully unchanged.

## Key Benefits

**Simpler experience, faster access:**

Customers can now access Secrets directly from the Identity & Security menu making it faster and easier to find and manage secrets.

**Improved visibility and control:**

A dedicated interface gives you clear visibility into your secrets inventory and makes features like cross-region replication easier to understand and use.

## How does the new UI change look?

When you enter the Console, you will see a new section for Secrets Management under ‘Identity & Security’ called ‘Secret Management.’

## How to Create a Secret

- In the OCI Console, open the **☰ (hamburger menu)** and go to **Identity & Security → Secret Management**.


![Image of main OCI Console, under the "Identity and Security" TAB.](https://blogs.oracle.com/cloud-infrastructure/wp-content/uploads/sites/83/2025/12/Secrets_Picture1-1024x405.png)

- Click **Create Secret**.

- If you don’t already have a **Vault** or **Key**, you’ll see a notification with quick links to create them. You need a key to encrypt the secret and a vault to store the encrypted key.

- Enter the **Name** and **Description** for your secret.

- Choose the **Vault compartment** and **Vault** where your encryption key is stored.

- Select the **Encryption key compartment** and **Encryption key**, then complete the remaining fields as usual.

- Click **Create** **Secret** to finish.


![Image of the "Create  a Secret" screen in the OCI Console.](https://blogs.oracle.com/cloud-infrastructure/wp-content/uploads/sites/83/2026/01/Secrets_Picture2-1024x596.png)

## How to View Your Secrets

- Go to **Identity & Security → Secret Management** in the OCI Console.

- You will see your secrets from the **most recently used vault**.

- To view secrets from another vault, use the **Vault filter** at the top of the page.

- Each secret shows key details such as **Name**, **Status**, **Cross-region replication**, **Auto-generation**, **Auto-rotation**, and **Created time**.

- To find the **Vault OCID**, click the **“…” (More options)** next to the _Created_ column.

![OCI console screen for viewing Secrets](https://blogs.oracle.com/cloud-infrastructure/wp-content/uploads/sites/83/2026/01/3-4-1024x500.png)

## What remains the same?

No changes to APIs, SDKs, or CLI workflows for Secrets or Key Management. All automation, scripts, and programmatic tools will continue to function as before. Any backend relationships or permissions required for secrets, vaults and keys remain unchanged at this time. Secrets will still use vaults for encryption and key storage. All existing behaviors, including the requirement for secret name uniqueness within each vault, remain unchanged. The customer support portal, documentation links still fall under KMS. Customers would still have to write vault IAM policies to manage secrets.

## What’s next?

Read more about how the feature works in the [technical documentation](https://docs.oracle.com/iaas/Content/secret-management/home.htm).

The best way to learn about it is to give it a try! Visit our [website](https://www.oracle.com/security/cloud-security/) to learn more about Oracle Cloud Infrastructure Security products and sign up for a Free Tier account and to take a closer look.

### Authors

![Profile picture of Sri Meghana Vyakaranam](http://blogs.oracle.com/cloud-infrastructure/wp-content/uploads/sites/83/2025/12/Meghana_Screenshot-2025-12-11-174849.jpg)

#### Sri Meghana Vyakaranam

[Previous post](https://blogs.oracle.com/cloud-infrastructure/realtime-data-with-oci-kafka-deltastream "Realtime Data Transformation on OCI Streaming with Apache Kafka and DeltaStream")

#### Realtime Data Transformation on OCI Streaming with Apache Kafka and DeltaStream

[Abhishek Bhaumik](https://blogs.oracle.com/authors/abhishek-bhaumik) \| 2 minute read

[Next post](https://blogs.oracle.com/cloud-infrastructure/oracle-linux-7-arm-support-ended-actions-for-oke "Oracle Linux 7 (ARM) support ended—actions for OKE customers")

#### Oracle Linux 7 (ARM) support ended—actions for OKE customers

[Jordan Spore](https://blogs.oracle.com/authors/jordan-spore) \| 2 minute read

consent.trustarc.com

# consent.trustarc.com is blocked

This page has been blocked by an extension

- Try disabling your extensions.

ERR\_BLOCKED\_BY\_CLIENT

Reload


This page has been blocked by an extension

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)

Talk to sales
Manage Consent

To provide the best experiences, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. Not consenting or withdrawing consent, may adversely affect certain features and functions.

FunctionalFunctional
Always active

The technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network.

PreferencesPreferences

The technical storage or access is necessary for the legitimate purpose of storing preferences that are not requested by the subscriber or user.

StatisticsStatistics

The technical storage or access that is used exclusively for statistical purposes.The technical storage or access that is used exclusively for anonymous statistical purposes. Without a subpoena, voluntary compliance on the part of your Internet Service Provider, or additional records from a third party, information stored or retrieved for this purpose alone cannot usually be used to identify you.

MarketingMarketing

The technical storage or access is required to create user profiles to send advertising, or to track the user on a website or across several websites for similar marketing purposes.

- [Manage options](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)
- [Manage services](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)
- [Manage {vendor\_count} vendors](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)
- [Read more about these purposes](https://cookiedatabase.org/tcf/purposes/)

AcceptDenyView preferencesSave preferences [View preferences](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)

- [{title}](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)
- [{title}](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)
- [{title}](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)

Manage Consent

To provide the best experiences, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. Not consenting or withdrawing consent, may adversely affect certain features and functions.

FunctionalFunctional
Always active

The technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network.

PreferencesPreferences

The technical storage or access is necessary for the legitimate purpose of storing preferences that are not requested by the subscriber or user.

StatisticsStatistics

The technical storage or access that is used exclusively for statistical purposes.The technical storage or access that is used exclusively for anonymous statistical purposes. Without a subpoena, voluntary compliance on the part of your Internet Service Provider, or additional records from a third party, information stored or retrieved for this purpose alone cannot usually be used to identify you.

MarketingMarketing

The technical storage or access is required to create user profiles to send advertising, or to track the user on a website or across several websites for similar marketing purposes.

- [Manage options](https://k21academy.com/course/aws-aiml-online-training-course/#cmplz-manage-consent-container)
- [Manage services](https://k21academy.com/course/aws-aiml-online-training-course/#cmplz-cookies-overview)
- [Manage {vendor\_count} vendors](https://k21academy.com/course/aws-aiml-online-training-course/#cmplz-tcf-wrapper)
- [Read more about these purposes](https://cookiedatabase.org/tcf/purposes/)

AcceptDenyView preferencesSave preferences [View preferences](https://k21academy.com/course/aws-aiml-online-training-course/#cmplz-manage-consent-container)

- [Privacy Statement](https://k21academy.com/privacy-policy/)
- [{title}](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)

[Skip to content](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#content)

- [Home](https://k21academy.com/)
- [Blog](https://k21academy.com/blog/)
- Secret Management In Oracle Cloud (OCI)

- [Home](https://k21academy.com/)
- [Blog](https://k21academy.com/blog/)

# Secret Management In Oracle Cloud (OCI)

- April 14, 2020
- [Atul Kumar](https://k21academy.com/author/mike/)
- 128

Oracle

## Share Post Now :

[Join Free Class](https://k21academy.com/oraclecloud-freeclass/)

[![](https://k21academy.com/wp-content/uploads/2025/11/Oracle-Cloud-Free-MasterClass-922x1024.png)](https://k21academy.com/oraclecloud-freeclass/)

[![](https://k21academy.com/wp-content/uploads/2025/11/K21-Academy-BookaCall-3-904x1024.png)](https://k21academy.com/bookyourcall/?utm_source=website&utm_medium=referral&utm_campaign=bookcall_sidebar&el=website_referral_bookcall_sidebar)

##### HOW TO GET HIGH PAYING JOBS IN AWS CLOUD

Even as a beginner with NO Experience Coding Language

[BOOK YOUR FREE SEAT](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#)

Explore Free course Now

![](https://k21academy.com/wp-content/uploads/2025/10/1pm_Mittal_Family-6-removebg-scaled-1.png)

![](https://k21academy.com/wp-content/uploads/2025/10/Screenshot-2025-09-22-184938-Photoroom.png)

Table of Contents

- [Overview Of Secret Management System](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-0)

- [Advantages Of Secrets](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-1)

- [Steps To Configure Secret In Vault](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-2)

- [Steps Of Rotating A Secret (Versioning)](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-3)

- [![Create Secret version](https://k21academy.com/wp-content/uploads/2020/04/S_2.png)](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-4)

- [![Updating Secret content](https://k21academy.com/wp-content/uploads/2020/04/S_3-1.png)](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-5)

- [![New Secret Version](https://k21academy.com/wp-content/uploads/2020/04/S_4.png)](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-6)

- [Conclusion](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-7)

- [Related/Further Readings](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-8)

- [Next Task For You](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-9)

- [![1z0-997](https://k21academy.com/wp-content/uploads/2020/04/997-content-upgrade-1-scaled.gif)](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/#elementor-toc__heading-anchor-10)


12 Views
, 4 views today

When we are working on an application or over a project on Oracle Cloud there are some **Data that are confidential** like API tokens, passwords, and more. This data is called **Secret** data **.**

For this, we need a centralized space in our **Oracle Cloud Infrastructure (OCI)** where we can store, manage, and access these Secrets.

In this blog, I will discuss **Secret Management** & **Steps** to configure it.

## **![Secret management system](https://k21academy.com/wp-content/uploads/2020/04/1.png)Overview Of Secret Management System**

Recently a **New Feature, Secrets** has been introduced to the OCI Vaults Service. These Secrets are stored in a vault and applications can use them as needed. We have to create a vault and key before creating a secret. Secrets are stored in a vault and encrypted using the key that we choose while creating a secret.

To know in more detail about Vaults and keys and steps to configure KMS then **[click here](https://k21academy.com/1z099716)**.

## **Advantages Of Secrets**

- You can centralize secrets management and only administrators will have Create, Update, and Delete permissions on secrets
- You can rotate/update secrets without any changes in the consumer application

## **Steps To Configure Secret In Vault**

Oracle **Vault** is a logical grouping of Keys and Secrets. There are two types of Vaults: Private and Virtual, which have different levels of isolation, pricing, and computing.

**1)** Navigate to the Vault in which we want to create Secret **(Demo\_Vault)**

![Vaults](https://k21academy.com/wp-content/uploads/2020/04/S_1.png)

**2)** Click **Secrets** under **Resources** and then Click **Create Secrets.**

**![Create Secret](https://k21academy.com/wp-content/uploads/2020/04/16-2.png)**

**3)** Enter the following information:

- Compartment: k21acad (root)
- Name : Object\_secret
- Description:
- Select Encryption key: **Object\_Storage\_key**(created earlier)
- Secret Type Template: **Plain-Text/Base64**
- Secret Contents: The information (Secret) you want to encrypt

![Add Secret details](https://k21academy.com/wp-content/uploads/2020/04/17-2.png)

**4)** Click on the Secret created ( **Object\_secret**)

**![Secret created](https://k21academy.com/wp-content/uploads/2020/04/18-1.png)**

**5)** In the details of the Secret Created, Click on Versions and click on the **Action icon(three dots)** ahead of the version. Click **View Secret Contents.**

**![view secret content](https://k21academy.com/wp-content/uploads/2020/04/19-1.png)**

**6)** We will be able to see the **Encrypted Secret** content. Click on **Show decoded Base64 digit.**

**![Encrypted Secret Content](https://k21academy.com/wp-content/uploads/2020/04/20.png)**

**7)** Now we will be able to see the secret content in plain-text.

![Secret content in plain-text](https://k21academy.com/wp-content/uploads/2020/04/21-2.png)

To know more about **Secrets Management in OCI** [click here](https://docs.cloud.oracle.com/en-us/iaas/Content/KeyManagement/Tasks/managingsecrets.htm).

## **Steps Of Rotating A Secret (Versioning)**

Once a Secret has created a default version of the secret is also created. If we want to update the content of the created secret we need to **Rotate the version of the key**. Once the new version is created we can see the status of the new version created as **Current.**

Follow the steps to rotate the secret version.

**1)** Navigate to the secret created, Under table scope click **Versions** and then click **Create Secret Version.**

## **![Create Secret version](https://k21academy.com/wp-content/uploads/2020/04/S_2.png)**

**2)** Add the updated content and click **Create Secret Version**.

## **![Updating Secret content](https://k21academy.com/wp-content/uploads/2020/04/S_3-1.png)**

**3)** We can see that the new version of Secret has created and status is also set to **Current**.

## **![New Secret Version](https://k21academy.com/wp-content/uploads/2020/04/S_4.png)**

**4)** We can set any Version as current if we want to

![current version](https://k21academy.com/wp-content/uploads/2020/04/S_5.png)

## **Conclusion**

We need a centralized & Secured place in OCI to store data like password, API tokens, and more that are needed frequently by an application developer. For this Oracle has introduces a feature Secrets in Vault Service of OCI. In this post, I have covered the overview of the Secret Management System and steps to configure and rotate the secret version in OCI. I hope it will help you understand the concept of Secrets in OCI.

KMS is also covered in our **OCI Architect Professional \[1z0-997\] Certification training**. To know more about this training **[click here](https://k21academy.com/1z099703).**

## **Related/Further Readings**

- **[Oracle Cloud Infrastructure 2019 Architect Professional \| 1Z0-997](https://k21academy.com/1z099711)**
- **[\[1Z0-997\]Oracle Cloud Infrastructure (OCI) Architect Professional Certification: Step by Step Hands-On Lab](https://k21academy.com/1z099705)**
- [**SSL/TLS on Load Balancer**](https://k21academy.com/1z099714)
- [**Data Safe in OCI**](https://k21academy.com/1z099720)
- [**Functions & Events in OCI**](https://k21academy.com/1z099719)

## **Next Task For You**

In our [**OCI Architect Professional \[1Z0-997\] Certification training**](https://k21academy.com/1z099703), we cover **KMS in OCI** in **Design for Security & Compliance** module. In this module, we also cover the **Security Overview, Identity & Access Management (IAM), Web Application Firewall (WAF), Data Safe.**

For the list of Hands-On guide [**click here**](https://k21academy.com/1z099705).

## [![1z0-997](https://k21academy.com/wp-content/uploads/2020/04/997-content-upgrade-1-scaled.gif)](https://k21academy.com/1z099702)

[![Picture of Atul Kumar](https://k21academy.com/wp-content/uploads/2025/08/mike_avatar_1-80x80.png)](https://k21academy.com/)

[**Atul Kumar**](https://k21academy.com/)

I started my IT career in 2000 as an Oracle DBA/Apps DBA. The first few years were tough (<0/month), with very little growth.

In 2004, I moved to the UK. After working really hard, I landed a job that paid me £2700 per month.

In February 2005, I saw a job that was £450 per day, which was nearly 4 times of my then salary.

## Recent Posts

[![Master OCI Generative AI Certification: Complete Guide & Learning Path 2025](https://k21academy.com/wp-content/uploads/2025/12/Oracle-Cloud-Infrastructure-AI-Foundations-Associate-Certification-1Z0-1122-25-Exam-Guide-1-1-1.png)](https://k21academy.com/oci-ai/oci-generative-ai-certification-complete-guide/)

## [Master OCI Generative AI Certification: Complete Guide & Learning Path 2025](https://k21academy.com/oci-ai/oci-generative-ai-certification-complete-guide/)

December 22, 2025

[![Oracle Cloud Infrastructure AI Foundations Associate Certification [1Z0-1122-25] : Exam Guide | K21 Academy](https://k21academy.com/wp-content/uploads/2025/12/Oracle-Cloud-Infrastructure-AI-Foundations-Associate-Certification-1Z0-1122-25-Exam-Guide-1-2.png)](https://k21academy.com/oci-ai/oracle-cloud-infrastructure-ai-foundations-associate/)

## [Oracle Cloud Infrastructure AI Foundations Associate Certification \[1Z0-1122-25\] : Exam Guide \| K21 Academy](https://k21academy.com/oci-ai/oracle-cloud-infrastructure-ai-foundations-associate/)

December 13, 2025

[![Microsoft Agentic AI Business Solutions Architect [AB-100] | K21 Academy](https://k21academy.com/wp-content/uploads/2025/11/Microsoft-Agentic-AI-Business-Solutions-Architect-AB-100-Exam-Overview1.png)](https://k21academy.com/azure-aiml/microsoft-agentic-ai-business-solutions-architect-2/)

## [Microsoft Agentic AI Business Solutions Architect \[AB-100\] \| K21 Academy](https://k21academy.com/azure-aiml/microsoft-agentic-ai-business-solutions-architect-2/)

November 19, 2025

## Most Popluar Posts

[![AWS Salary in India 2026: Freshers and Experienced](https://k21academy.com/wp-content/uploads/2025/10/AWS-Salary-2026.png)](https://k21academy.com/aws-cloud/aws-salary-in-india-2026/)

## [AWS Salary in India 2026: Freshers and Experienced](https://k21academy.com/aws-cloud/aws-salary-in-india-2026/)

October 13, 2025

[![Top AWS & Azure Cloud Projects in 2026 | K21 Academy](https://k21academy.com/oracle/new-feature-secret-management-in-oracle-cloud-oci/)](https://k21academy.com/aws-cloud/top-aws-azure-cloud-projects-2026/)

## [Top AWS & Azure Cloud Projects in 2026 \| K21 Academy](https://k21academy.com/aws-cloud/top-aws-azure-cloud-projects-2026/)

September 29, 2025

[![AWS Cloud Job Oriented Program: Step-by-Step Hands-on Labs & Projects](https://k21academy.com/wp-content/uploads/2023/10/AWS-Job-Oriented-Cloud-Program-Step-by-Step-Hands-on-Lab-Projects-blog-image-1.png)](https://k21academy.com/aws-cloud/aws-cloud-job-oriented-program-step-by-step-hands-on-lab-projects/)

## [AWS Cloud Job Oriented Program: Step-by-Step Hands-on Labs & Projects](https://k21academy.com/aws-cloud/aws-cloud-job-oriented-program-step-by-step-hands-on-lab-projects/)

September 18, 2025

##### Categories

[![](https://k21academy.com/wp-content/uploads/2025/11/Oracle-Integration-CloudOLC-Free-Masterclass-922x1024.png)](https://k21academy.com/free-class-oracle-integration-cloud-services)

[PrevPrevious PostKey Management System in OCI](https://k21academy.com/oracle/key-management-system-kms-in-oracle-cloud-oci/)

[Next Post\[Video\] Create Oracle Autonomous Data Warehouse 19c on OCINext](https://k21academy.com/oracle/video-create-oracle-autonomous-data-warehouse-18c-on-oci/)

Manage consentManage consent
- [Docs](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/index.html) »
- KmsCryptoClient
- [Edit on GitHub](https://github.com/oracle/oci-python-sdk/blob/rtd-config/docs/api/key_management/client/oci.key_management.KmsCryptoClient.rst)

* * *

# KmsCryptoClient [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html\#kmscryptoclient "Permalink to this headline")

_class_`oci.key_management.``KmsCryptoClient`( _config_, _service\_endpoint_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient "Permalink to this definition")

API for managing and performing operations with keys and vaults. (For the API for managing secrets, see the Vault Service
Secret Management API. For the API for retrieving secrets, see the Vault Service Secret Retrieval API.)

**Methods**

|     |     |
| --- | --- |
| [`__init__`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.__init__ "oci.key_management.KmsCryptoClient.__init__")(config, service\_endpoint, \*\*kwargs) | Creates a new service client |
| [`decrypt`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.decrypt "oci.key_management.KmsCryptoClient.decrypt")(decrypt\_data\_details, \*\*kwargs) | Decrypts data using the given [\`DecryptDataDetails\`\_\_](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#id5) resource. |
| [`encrypt`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.encrypt "oci.key_management.KmsCryptoClient.encrypt")(encrypt\_data\_details, \*\*kwargs) | Encrypts data using the given [\`EncryptDataDetails\`\_\_](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#id5) resource. |
| [`export_key`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.export_key "oci.key_management.KmsCryptoClient.export_key")(export\_key\_details, \*\*kwargs) | Exports a specific version of a master encryption key according to the details of the request. |
| [`generate_data_encryption_key`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.generate_data_encryption_key "oci.key_management.KmsCryptoClient.generate_data_encryption_key")(…) | Generates a key that you can use to encrypt or decrypt data. |
| [`sign`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.sign "oci.key_management.KmsCryptoClient.sign")(sign\_data\_details, \*\*kwargs) | Creates a digital signature for a message or message digest by using the private key of a public-private key pair, also known as an asymmetric key. |
| [`verify`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.verify "oci.key_management.KmsCryptoClient.verify")(verify\_data\_details, \*\*kwargs) | Verifies a digital signature that was generated by the [\`Sign\`\_\_](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#id5) operation by using the public key of the same asymmetric key that was used to sign the data. |

`__init__`( _config_, _service\_endpoint_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.__init__ "Permalink to this definition")

Creates a new service client

| Parameters: | - **config** ( _dict_) – Configuration keys and values as per [SDK and Tool Configuration](https://docs.cloud.oracle.com/Content/API/Concepts/sdkconfig.htm).<br>  The [`from_file()`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/config.html#oci.config.from_file "oci.config.from_file") method can be used to load configuration from a file. Alternatively, a `dict` can be passed. You can validate\_config<br>  the dict using [`validate_config()`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/config.html#oci.config.validate_config "oci.config.validate_config")<br>- **service\_endpoint** ( _str_) – The endpoint of the service to call using this client. For example `https://iaas.us-ashburn-1.oraclecloud.com`.<br>- **timeout** ( _float_ _or_ _tuple_ _(_ _float_ _,_ _float_ _)_) – (optional)<br>  The connection and read timeouts for the client. The default values are connection timeout 10 seconds and read timeout 60 seconds. This keyword argument can be provided<br>  as a single float, in which case the value provided is used for both the read and connection timeouts, or as a tuple of two floats. If<br>  a tuple is provided then the first value is used as the connection timeout and the second value as the read timeout.<br>- **signer** (`AbstractBaseSigner`) – <br>  (optional)<br>  The signer to use when signing requests made by the service client. The default is to use a [`Signer`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/signing.html#oci.signer.Signer "oci.signer.Signer") based on the values<br>  provided in the config parameter.<br>  <br>  One use case for this parameter is for [Instance Principals authentication](https://docs.cloud.oracle.com/Content/Identity/Tasks/callingservicesfrominstances.htm)<br>  by passing an instance of [`InstancePrincipalsSecurityTokenSigner`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/signing.html#oci.auth.signers.InstancePrincipalsSecurityTokenSigner "oci.auth.signers.InstancePrincipalsSecurityTokenSigner") as the value for this keyword argument<br>  <br>- **retry\_strategy** ( _obj_) – <br>  (optional)<br>  A retry strategy to apply to all calls made by this service client (i.e. at the client level). There is no retry strategy applied by default.<br>  Retry strategies can also be applied at the operation level by passing a `retry_strategy` keyword argument as part of calling the operation.<br>  Any value provided at the operation level will override whatever is specified at the client level.<br>  <br>  This should be one of the strategies available in the [`retry`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#module-oci.retry "oci.retry") module. A convenience [`DEFAULT_RETRY_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.DEFAULT_RETRY_STRATEGY "oci.retry.DEFAULT_RETRY_STRATEGY")<br>  is also available. The specifics of the default retry strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/retries.html).<br>  <br>- **circuit\_breaker\_strategy** ( _obj_) – (optional)<br>  A circuit breaker strategy to apply to all calls made by this service client (i.e. at the client level).<br>  This client uses [`DEFAULT_CIRCUIT_BREAKER_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/circuit_breaker.html#oci.circuit_breaker.DEFAULT_CIRCUIT_BREAKER_STRATEGY "oci.circuit_breaker.DEFAULT_CIRCUIT_BREAKER_STRATEGY") as default if no circuit breaker strategy is provided.<br>  The specifics of circuit breaker strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/circuit_breakers.html).<br>- **circuit\_breaker\_callback** ( _function_) – (optional)<br>  Callback function to receive any exceptions triggerred by the circuit breaker.<br>- **allow\_control\_chars** – (optional)<br>  allow\_control\_chars is a boolean to indicate whether or not this client should allow control characters in the response object. By default, the client will not<br>  allow control characters to be in the response object. |

`decrypt`( _decrypt\_data\_details_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.decrypt "Permalink to this definition")

Decrypts data using the given [\`DecryptDataDetails\`\_\_](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#id5) resource.

| Parameters: | - **decrypt\_data\_details** ( _oci.key\_management.models.DecryptDataDetails_) – (required)<br>  DecryptDataDetails<br>- **opc\_request\_id** ( _str_) – (optional)<br>  Unique identifier for the request. If provided, the returned request ID<br>  will include this value. Otherwise, a random request ID will be<br>  generated by the service.<br>- **retry\_strategy** ( _obj_) – <br>  (optional)<br>  A retry strategy to apply to this specific operation/call. This will override any retry strategy set at the client-level.<br>  <br>  This should be one of the strategies available in the [`retry`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#module-oci.retry "oci.retry") module. This operation will not retry by default, users can also use the convenient [`DEFAULT_RETRY_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.DEFAULT_RETRY_STRATEGY "oci.retry.DEFAULT_RETRY_STRATEGY") provided by the SDK to enable retries for it.<br>  The specifics of the default retry strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/retries.html).<br>  <br>  To have this operation explicitly not perform any retries, pass an instance of [`NoneRetryStrategy`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.NoneRetryStrategy "oci.retry.NoneRetryStrategy").<br>  <br>- **allow\_control\_chars** ( _bool_) – (optional)<br>  allow\_control\_chars is a boolean to indicate whether or not this request should allow control characters in the response object.<br>  By default, the response will not allow control characters in strings |
| Returns: | A [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") object with data of type `DecryptedData` |
| Return type: | [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") |
| Example: |  |

Click [here](https://docs.cloud.oracle.com/en-us/iaas/tools/python-sdk-examples/latest/keymanagement/decrypt.py.html) to see an example of how to use decrypt API.

`encrypt`( _encrypt\_data\_details_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.encrypt "Permalink to this definition")

Encrypts data using the given [\`EncryptDataDetails\`\_\_](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#id5) resource.
Plaintext included in the example request is a base64-encoded value of a UTF-8 string.

| Parameters: | - **encrypt\_data\_details** ( _oci.key\_management.models.EncryptDataDetails_) – (required)<br>  EncryptDataDetails<br>- **opc\_request\_id** ( _str_) – (optional)<br>  Unique identifier for the request. If provided, the returned request ID<br>  will include this value. Otherwise, a random request ID will be<br>  generated by the service.<br>- **retry\_strategy** ( _obj_) – <br>  (optional)<br>  A retry strategy to apply to this specific operation/call. This will override any retry strategy set at the client-level.<br>  <br>  This should be one of the strategies available in the [`retry`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#module-oci.retry "oci.retry") module. This operation will not retry by default, users can also use the convenient [`DEFAULT_RETRY_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.DEFAULT_RETRY_STRATEGY "oci.retry.DEFAULT_RETRY_STRATEGY") provided by the SDK to enable retries for it.<br>  The specifics of the default retry strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/retries.html).<br>  <br>  To have this operation explicitly not perform any retries, pass an instance of [`NoneRetryStrategy`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.NoneRetryStrategy "oci.retry.NoneRetryStrategy").<br>  <br>- **allow\_control\_chars** ( _bool_) – (optional)<br>  allow\_control\_chars is a boolean to indicate whether or not this request should allow control characters in the response object.<br>  By default, the response will not allow control characters in strings |
| Returns: | A [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") object with data of type `EncryptedData` |
| Return type: | [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") |
| Example: |  |

Click [here](https://docs.cloud.oracle.com/en-us/iaas/tools/python-sdk-examples/latest/keymanagement/encrypt.py.html) to see an example of how to use encrypt API.

`export_key`( _export\_key\_details_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.export_key "Permalink to this definition")

Exports a specific version of a master encryption key according to the details of the request. For their protection,
keys that you create and store on a hardware security module (HSM) can never leave the HSM. You can only export keys
stored on the server. For export, the key version is encrypted by an RSA public key that you provide.

| Parameters: | - **export\_key\_details** ( _oci.key\_management.models.ExportKeyDetails_) – (required)<br>  ExportKeyDetails<br>- **retry\_strategy** ( _obj_) – <br>  (optional)<br>  A retry strategy to apply to this specific operation/call. This will override any retry strategy set at the client-level.<br>  <br>  This should be one of the strategies available in the [`retry`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#module-oci.retry "oci.retry") module. This operation will not retry by default, users can also use the convenient [`DEFAULT_RETRY_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.DEFAULT_RETRY_STRATEGY "oci.retry.DEFAULT_RETRY_STRATEGY") provided by the SDK to enable retries for it.<br>  The specifics of the default retry strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/retries.html).<br>  <br>  To have this operation explicitly not perform any retries, pass an instance of [`NoneRetryStrategy`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.NoneRetryStrategy "oci.retry.NoneRetryStrategy").<br>  <br>- **allow\_control\_chars** ( _bool_) – (optional)<br>  allow\_control\_chars is a boolean to indicate whether or not this request should allow control characters in the response object.<br>  By default, the response will not allow control characters in strings |
| Returns: | A [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") object with data of type `ExportedKeyData` |
| Return type: | [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") |
| Example: |  |

Click [here](https://docs.cloud.oracle.com/en-us/iaas/tools/python-sdk-examples/latest/keymanagement/export_key.py.html) to see an example of how to use export\_key API.

`generate_data_encryption_key`( _generate\_key\_details_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.generate_data_encryption_key "Permalink to this definition")

Generates a key that you can use to encrypt or decrypt data.

| Parameters: | - **generate\_key\_details** ( _oci.key\_management.models.GenerateKeyDetails_) – (required)<br>  GenerateKeyDetails<br>- **opc\_request\_id** ( _str_) – (optional)<br>  Unique identifier for the request. If provided, the returned request ID<br>  will include this value. Otherwise, a random request ID will be<br>  generated by the service.<br>- **retry\_strategy** ( _obj_) – <br>  (optional)<br>  A retry strategy to apply to this specific operation/call. This will override any retry strategy set at the client-level.<br>  <br>  This should be one of the strategies available in the [`retry`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#module-oci.retry "oci.retry") module. This operation will not retry by default, users can also use the convenient [`DEFAULT_RETRY_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.DEFAULT_RETRY_STRATEGY "oci.retry.DEFAULT_RETRY_STRATEGY") provided by the SDK to enable retries for it.<br>  The specifics of the default retry strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/retries.html).<br>  <br>  To have this operation explicitly not perform any retries, pass an instance of [`NoneRetryStrategy`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.NoneRetryStrategy "oci.retry.NoneRetryStrategy").<br>  <br>- **allow\_control\_chars** ( _bool_) – (optional)<br>  allow\_control\_chars is a boolean to indicate whether or not this request should allow control characters in the response object.<br>  By default, the response will not allow control characters in strings |
| Returns: | A [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") object with data of type `GeneratedKey` |
| Return type: | [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") |
| Example: |  |

Click [here](https://docs.cloud.oracle.com/en-us/iaas/tools/python-sdk-examples/latest/keymanagement/generate_data_encryption_key.py.html) to see an example of how to use generate\_data\_encryption\_key API.

`sign`( _sign\_data\_details_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.sign "Permalink to this definition")

Creates a digital signature for a message or message digest by using the private key of a public-private key pair,
also known as an asymmetric key. To verify the generated signature, you can use the [\`Verify\`\_\_](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#id5)
operation. Or, if you want to validate the signature outside of the service, you can do so by using the public key of the same asymmetric key.

| Parameters: | - **sign\_data\_details** ( _oci.key\_management.models.SignDataDetails_) – (required)<br>  SignDataDetails<br>- **opc\_request\_id** ( _str_) – (optional)<br>  Unique identifier for the request. If provided, the returned request ID<br>  will include this value. Otherwise, a random request ID will be<br>  generated by the service.<br>- **retry\_strategy** ( _obj_) – <br>  (optional)<br>  A retry strategy to apply to this specific operation/call. This will override any retry strategy set at the client-level.<br>  <br>  This should be one of the strategies available in the [`retry`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#module-oci.retry "oci.retry") module. This operation will not retry by default, users can also use the convenient [`DEFAULT_RETRY_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.DEFAULT_RETRY_STRATEGY "oci.retry.DEFAULT_RETRY_STRATEGY") provided by the SDK to enable retries for it.<br>  The specifics of the default retry strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/retries.html).<br>  <br>  To have this operation explicitly not perform any retries, pass an instance of [`NoneRetryStrategy`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.NoneRetryStrategy "oci.retry.NoneRetryStrategy").<br>  <br>- **allow\_control\_chars** ( _bool_) – (optional)<br>  allow\_control\_chars is a boolean to indicate whether or not this request should allow control characters in the response object.<br>  By default, the response will not allow control characters in strings |
| Returns: | A [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") object with data of type `SignedData` |
| Return type: | [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") |
| Example: |  |

Click [here](https://docs.cloud.oracle.com/en-us/iaas/tools/python-sdk-examples/latest/keymanagement/sign.py.html) to see an example of how to use sign API.

`verify`( _verify\_data\_details_, _\*\*kwargs_) [¶](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#oci.key_management.KmsCryptoClient.verify "Permalink to this definition")

Verifies a digital signature that was generated by the [\`Sign\`\_\_](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html#id5) operation
by using the public key of the same asymmetric key that was used to sign the data. If you want to validate the
digital signature outside of the service, you can do so by using the public key of the asymmetric key.

| Parameters: | - **verify\_data\_details** ( _oci.key\_management.models.VerifyDataDetails_) – (required)<br>  VerifyDataDetails<br>- **opc\_request\_id** ( _str_) – (optional)<br>  Unique identifier for the request. If provided, the returned request ID<br>  will include this value. Otherwise, a random request ID will be<br>  generated by the service.<br>- **retry\_strategy** ( _obj_) – <br>  (optional)<br>  A retry strategy to apply to this specific operation/call. This will override any retry strategy set at the client-level.<br>  <br>  This should be one of the strategies available in the [`retry`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#module-oci.retry "oci.retry") module. This operation will not retry by default, users can also use the convenient [`DEFAULT_RETRY_STRATEGY`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.DEFAULT_RETRY_STRATEGY "oci.retry.DEFAULT_RETRY_STRATEGY") provided by the SDK to enable retries for it.<br>  The specifics of the default retry strategy are described [here](https://docs.oracle.com/en-us/iaas/tools/python/latest/sdk_behaviors/retries.html).<br>  <br>  To have this operation explicitly not perform any retries, pass an instance of [`NoneRetryStrategy`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/retry.html#oci.retry.NoneRetryStrategy "oci.retry.NoneRetryStrategy").<br>  <br>- **allow\_control\_chars** ( _bool_) – (optional)<br>  allow\_control\_chars is a boolean to indicate whether or not this request should allow control characters in the response object.<br>  By default, the response will not allow control characters in strings |
| Returns: | A [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") object with data of type `VerifiedData` |
| Return type: | [`Response`](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/request_and_response.html#oci.response.Response "oci.response.Response") |
| Example: |  |

Click [here](https://docs.cloud.oracle.com/en-us/iaas/tools/python-sdk-examples/latest/keymanagement/verify.py.html) to see an example of how to use verify API.

Versions**[latest](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/key_management/client/oci.key_management.KmsCryptoClient.html)**On Read the Docs[Project Home](https://app.readthedocs.org/projects/oracle-cloud-infrastructure-python-sdk/?utm_source=oracle-cloud-infrastructure-python-sdk&utm_content=flyout)[Builds](https://app.readthedocs.org/projects/oracle-cloud-infrastructure-python-sdk/builds/?utm_source=oracle-cloud-infrastructure-python-sdk&utm_content=flyout)Search

* * *

[Addons documentation](https://docs.readthedocs.io/page/addons.html?utm_source=oracle-cloud-infrastructure-python-sdk&utm_content=flyout) ― Hosted by
[Read the Docs](https://about.readthedocs.com/?utm_source=oracle-cloud-infrastructure-python-sdk&utm_content=flyout)
- [Skip to content](https://www.ateam-oracle.com/how-to-select-the-best-oci-vault-for-your-use-case#maincontent)
- [Accessibility Policy](https://www.oracle.com/corporate/accessibility/)

[Facebook](https://www.facebook.com/dialog/share?app_id=209650819625026&href=/www.ateam-oracle.com/post.php) [Twitter](https://twitter.com/share?url=/www.ateam-oracle.com/post.php) [LinkedIn](https://www.linkedin.com/shareArticle?url=/www.ateam-oracle.com/post.php) [Email](https://www.ateam-oracle.com/placeholder.html)

[Tell Me About](https://www.ateam-oracle.com/category/atm)

# How to Select the Best OCI Vault for Your Use Case

May 28, 20253 minute read

![Profile picture of Ramesh Balajepalli](http://blogs.oracle.com/wp-content/uploads/2025/09/Ramesh-Balajepalli-author.png)[Ramesh Balajepalli](https://www.ateam-oracle.com/authors/ramesh-balajepalli)
Master Principal Cloud Architect

Oracle Cloud Infrastructure (OCI) offers secure and flexible options for managing encryption keys and sensitive data. But with multiple vault types available, how do you know which one is right for your needs?

This guide will help you understand the differences between keys and secrets, explore the vault types available in OCI and choose the right option based on your specific requirements.

**Keys vs. Secrets: What’s the Difference?**

Before picking a vault, it’s important to know what you’re storing.

– **Keys** are cryptographic objects used to encrypt and decrypt data. They can be symmetric or asymmetric and are stored in hardware security modules (HSMs) for strong protection.

– **Secrets** include sensitive values like passwords, tokens and certificates. Secrets are not stored in HSMs, but their content is encrypted using a master key from the vault. This provides a secure and cost effective way to manage application secrets.

**OCI Vault Options**

OCI provides several key management services, each designed for different use cases:

**Virtual Vault (Default)**

– When to use: Most general purpose needs

– Why: Cost effective and secure by default. It uses a multitenant HSM but still meets strong compliance (FIPS 140-2 Level 3).

**Virtual Private Vault**

– When to use: You need stronger isolation or performance

– Why: Offers a dedicated HSM partition with dedicated processing. Ideal for high-security or regulated workloads.

**Dedicated KMS**

– When to use: You need complete control of your own HSM environment

– Why: Gives you ownership of a single tenant HSM. Useful when you need to integrate with custom security systems.

**External KMS**

– When to use: You need to keep your master keys outside of OCI

– Why: Allows you to use a third party key management system. Encrypt and decrypt operations happen outside OCI, giving you full control of your keys.

**Software Keys vs. HSM-Backed Keys**

OCI also supports **software keys**, which are master encryption keys protected by software and stored on a server. These keys can be exported to perform cryptographic operations on the client rather than on the server. While at rest, they are encrypted by a root key stored on the HSM, adding an extra layer of protection. Software keys are **FIPS 140-2 Level 1 compliant**, making them suitable for development environments or workloads with lower security requirements.

For production environments or handling regulated data, **HSM-backed keys** in a vault are recommended due to their stronger, hardware-based protection and non-exportability.

**What About Secrets?**

Secrets are supported in all vault types but are commonly used with the default Virtual Vault. Since secrets are not stored inside the HSM, using the cost effective Virtual Vault makes sense for most workloads.

**Quick Comparison Table**

Here is a simple table to help decide which option fits your needs

| Option | When to Use | Key Features |
| --- | --- | --- |
| Virtual Vault | General-purpose, cost-sensitive workloads | Multitenant HSM, FIPS 140-2 Level 3, cost-effective |
| Virtual Private Vault | High-security or regulated environments | Dedicated HSM partition, higher cost |
| Dedicated KMS | Full control and advanced crypto integration | Manage HSM partitions and admin users directly, PKCS#11 support |
| External KMS | Regulatory need to store keys outside OCI | customer-owned HSM |

For most teams, the default Virtual Vault offers the right balance between cost, security and ease of use. If your organization requires higher isolation, regulatory compliance or external key control, other vault options are available to meet those needs.

For more details on key types, vault configurations and OCI’s key management capabilities, refer to Oracle’s official Key Management [FAQ](https://www.oracle.com/security/cloud-security/key-management/faq/)

### Authors

![Profile picture of Ramesh Balajepalli](http://blogs.oracle.com/wp-content/uploads/2025/09/Ramesh-Balajepalli-author.png)

#### Ramesh Balajepalli

##### Master Principal Cloud Architect

Ramesh Balajepalli is a Cloud Architect at OCI. He works with customers to design secured, scalable, and well-architected solutions on Oracle Cloud Infrastructure. He is passionate about solving complex business problems with the ever-growing capabilities of technology.

[Previous post](https://www.ateam-oracle.com/oci-fdi-pe "Securely Connecting to Fusion Data Intelligence Using a Private Endpoint in OCI")

#### Securely Connecting to Fusion Data Intelligence Using a Private Endpoint in OCI

[Atefeh (Ati) Yousefi Attaei](https://www.ateam-oracle.com/authors/atefeh-ati-yousefi-attaei) \| 2 minute read

[Next post](https://www.ateam-oracle.com/leveraging-threat-intelligence-to-configure-waf-and-secure-data-plane-apis-in-oci "Leveraging Threat Intelligence to configure WAF and secure Data Plane APIs in OCI")

#### Leveraging Threat Intelligence to configure WAF and secure Data Plane APIs in OCI

[Amit Chakraborty](https://www.ateam-oracle.com/authors/amit-chakraborty) \| 2 minute read
|     |     |     |     |
| --- | --- | --- | --- |
| [Go to Blogger.com](https://www.blogger.com/ "Go to Blogger.com") | |     |     |
| --- | --- |
|  |  | | MoreShare by emailShare with FacebookShare with TwitterReport Abuse | [Create Blog](https://www.blogger.com/onboarding) [Sign In](https://www.blogger.com/) |

[![Insights on Oracle & Tech](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3MzPL36I7JzEC6LFOpvW8xq3-hEhydDxgIbs2Clz3ixaVu8zDXYPswxdaeoYLTZ-l_xBuVfcYZSOFHZNrvHWzmF2z7JIG7jU2aLnBjmEwYYPAbCbptOOs4zyxpP01HoYn0qbyfNyKZS7h/s960/Alaska.jpg)](https://xmlandmore.blogspot.com/)

## Cross Column

## Friday, December 21, 2018

### Oracle Cloud Infrastructure―OCI Key Management Basics

[Oracle Cloud Infrastructure](https://docs.cloud.oracle.com/iaas/Content/home.htm) ( **OCI**) [Key Management](https://docs.cloud.oracle.com/iaas/Content/KeyManagement/Concepts/keyoverview.htm) provides you with centralized management of the encryption of your data. You can use Key Management to create [master encryption keys](https://en.wikipedia.org/wiki/Cryptographic_key_types) and [data encryption keys](https://en.wikipedia.org/wiki/Cryptographic_key_types), rotate keys to generate new cryptographic material, enable or disable keys for use in cryptographic operations, assign keys to resources, and use keys for encryption and decryption.

### Encryption Key Storage

Encryption keys are a specific type of secret that are used for encrypting and decrypting data. As with secrets configuration, there are many benefits to using a special-purpose service for this type of data, such as being able to perform [wrap](https://en.wikipedia.org/wiki/Key_Wrap) and unwrap operations without exposing the master key.

You need to identify any assets that store encryption keys and carefully control access to these in addition to controlling access to the encrypted data.  The main types of encryption key storage are:

- Dedicated [Hardware Security Modules](https://en.wikipedia.org/wiki/Hardware_security_module) (HSMs)
- Multi-tenant Key Management Systems (e.g., OCI [Key Management](https://docs.cloud.oracle.com/iaas/Content/KeyManagement/Concepts/keyoverview.htm))

OCI Level 100 - Key Management - YouTube

[Photo image of Oracle Learning](https://www.youtube.com/channel/UCpcndhe5IebWrJrdLRGRsvw?embeds_referring_euri=https%3A%2F%2Fxmlandmore.blogspot.com%2F)

Oracle Learning

153K subscribers

[OCI Level 100 - Key Management](https://www.youtube.com/watch?v=6OyrVWSL_D4)

Oracle Learning

Search

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

Watch later

Share

Copy link

Watch on

0:00

/

•Live

•

### Hardware Security Module\[7\]

In traditional on-premises environments with high security requirements, you would purchase a [Hardware Security Module](https://en.wikipedia.org/wiki/Hardware_security_module) ( **HSM**) to hold your encryption keys.  It is a physical computing device that safeguards digital keys and provides crypto processing; it has significant logical and physical protections against unauthorized access.

Some cloud providers have an option to rent a dedicated HSM for your environment. While this may be required for the highest-security environments, a dedicated HSM is still expensive in a cloud environment.

A Key Management Service ( **KMS**) is a multitenant service that uses an HSM on the back end to keep keys safe. You do have to trust both the HSM and the KMS (instead of just the HSM), which adds a little additional risk. However, compared to performing your own key management (often incorrectly), a KMS provides excellent security at zero or very low cost. You can have the benefits of proper key management in projects with more modest security budgets.

|     |
| --- |
| [![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsXEzXA296z4WK7I8TBVhYuvilUmLPf6noE0ilkMbhRNRNrIp19MqPvu7llOoF-yQC3hLHUuH0E4W4YmVFvTAcZlm8vSawN8ceqNjmpiZHhk3AzpCpYi84U_LdYqzK4P4q3-nmhSKXS8Bx/s1600/envelopeEncryption.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsXEzXA296z4WK7I8TBVhYuvilUmLPf6noE0ilkMbhRNRNrIp19MqPvu7llOoF-yQC3hLHUuH0E4W4YmVFvTAcZlm8vSawN8ceqNjmpiZHhk3AzpCpYi84U_LdYqzK4P4q3-nmhSKXS8Bx/s1600/envelopeEncryption.jpg) |
| **Figure 1.  Envelope Encryption** |

### Envelope Encryption

OCI services do not have access to the plaintext data without interacting with Key Management and without access to the master key that is protected by OCI [Identity and Access Management](https://docs.cloud.oracle.com/iaas/Content/Identity/Concepts/overview.htm) ( **IAM**). For decryption purposes, Object Storage and Block Volume store only the encrypted form of the data key.

The data key used to encrypt your data is, itself, encrypted with a master key. This concept is known as [envelope encryption](https://devender.me/2016/07/13/envelope-encryption/) (see Figure 1). This is how it works:\[10\]

1. Typically there are many master keys (or key-encrypting keys) that is held in a key management system (KMS).

   - When you need to encrypt some message :
   - A request is sent to the KMS to generate a data key  based on one of the master keys.
   - KMS returns a data key, which usually contains both the plain text version and the encrypted version of the data key.
   - The message is encrypted using the plain text key.
   - Then both the encrypted message and the encrypted data key are packaged into a structure (sometimes called **envelope**) and written.
   - The plain text key is immediately removed from memory.

3. When it comes time to decrypt the message:
   - The encrypted data key is extracted from the envelope.
   - KMS is requested to decrypt the data key using the same master key as that was used to generate it.
   - Once the plain text version of the data key is obtained then the encrypted message itself is decrypted.

**Master Encryption Key in OCI**

Note that master key is stored (in HSM) and managed (by KMS) separately from the data key itself. You create a master encryption key using the [Console](https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/signingin.htm#SigningIntotheConsole) (see Figure 2) or [API](https://docs.cloud.oracle.com/iaas/Content/API/Concepts/usingapi.htm), Key Management stores the [key version](https://docs.cloud.oracle.com/iaas/Content/KeyManagement/Concepts/keyoverview.htm) (or versioned master key) within a hardware security module (HSM) to provide a layer of physical security. Any given key version, after it’s created, is replicated within the service infrastructure as a measure of protection against hardware failures. Key versions are not otherwise stored anywhere else and cannot be exported from an HSM.

Key Management uses HSMs that meet [Federal Information Processing Standards (FIPS) 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf) Security Level 3 security certification. This means that the HSM hardware is tamper-evident, has physical safeguards for tamper-resistance, requires identity-based authentication, and deletes keys from the device when it detects tampering.

|     |
| --- |
| [![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2SlUhyphenhyphenF6aBpvl_MgwqxjQc_DeadkasLo0JyV-sRoURrz4UdQYvefX44AgiIjSl5O6DS55n0mpM-qMrE-aRPt7iUF9pGqZh-Ck59TGroI8NtgeSHtsVnXd-LOOZeOsZMlL8PUTPfCcuV4F/s640/CentralizedKeyManagement.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2SlUhyphenhyphenF6aBpvl_MgwqxjQc_DeadkasLo0JyV-sRoURrz4UdQYvefX44AgiIjSl5O6DS55n0mpM-qMrE-aRPt7iUF9pGqZh-Ck59TGroI8NtgeSHtsVnXd-LOOZeOsZMlL8PUTPfCcuV4F/s1600/CentralizedKeyManagement.jpg) |
| **Figure 2.  Centralized Key Management** |

### OCI Key Management Capabilities

Oracle key management is a regional service in OCI, which replicates encryption keys across 3 availability domains in a region. It provides the following capabilities:

- **Centralized key management capabilities**


    - Waiting period for vault deletion is 7 to 30 days

    - Key Management uses the [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (AES) as its encryption algorithm and its keys are AES symmetric keys

      - Supports all key lengths of the [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (AES) algorithm (i.e., 128, 192 and 256)

    - Rotates your keys (i.e, which creates versioned master keys)  if you suspect they may have leaked out
      - Rotating key does not automatically re-encrypt data that was previously encrypted with the old key version; this data is re-encrypted the next time when it's modified by the user.

- **Secures key storage using per-customer isolated partitions in HSMs**

  - OCI HSMs meet Federal Information Processing Standards (FIPS) 140-2 Security Level 3 security certification.

- **Integrates with Other OCI services**

    - Let you control who and what services can access which keys and what they can do with those keys.


    - Tracks administrative actions on keys and vaults
    - Monitor key usage

    - Both integrate with Key Management to support encryption of data in buckets and block or boot volumes

|     |
| --- |
| [![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh7wfemppnmPKG22ny3NgD1nkwz-ZSd6ie1uAhBfigmUDfvPNAQpn_NwiZnWMzxZi8d2iivewZsm9ju8uuIJUuFNoGgLCxYL5REXMvx7vRt6rnXtfI-KNzsyYvyohqGczpKa22t8BcQIyt/s640/BlockVolumeEncryption.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh7wfemppnmPKG22ny3NgD1nkwz-ZSd6ie1uAhBfigmUDfvPNAQpn_NwiZnWMzxZi8d2iivewZsm9ju8uuIJUuFNoGgLCxYL5REXMvx7vRt6rnXtfI-KNzsyYvyohqGczpKa22t8BcQIyt/s1600/BlockVolumeEncryption.jpg) |
| **Figure 3.  Block Volume Encryption** |

**Limits**\[11\]

Key Management limits are global.

| Resources | Monthly Universal Credits | Pay-as-You-Go or Promo |
| --- | --- | --- |
| Vaults in a tenancy | [Contact Oracle](https://support.oracle.com/) | [Contact Oracle](https://support.oracle.com/) |
| --- | --- | --- |
| Keys in a vault(Key versions, whether enabled or disabled, count against your limits.) | [Contact Oracle](https://support.oracle.com/) | [Contact Oracle](https://support.oracle.com/) |
| --- | --- | --- |

### References

01. [Overview of Key Management](https://docs.cloud.oracle.com/iaas/Content/KeyManagement/Concepts/keyoverview.htm)
02. [Oracle Cloud Infrastructure Key Management FAQ](https://cloud.oracle.com/cloud-security/kms/faq)
03. [OCI Level 100 - Key Management](https://www.youtube.com/watch?v=6OyrVWSL_D4) (YouTube video)
04. IaaS - Enterprise Cloud - Oracle Cloud Infrastructure (YouTube [playlist](https://www.youtube.com/watch?v=vDlI7cwSWhg&list=PLynT7cdnbm0vCvgfuGt1Pvhbd9Mg69bMo))
05. OCI Level 100 Training (YouTube [playlist](https://www.youtube.com/watch?v=eTSOyISOa44&list=PLKCk3OyNwIzvn8dpgrIKNdBOHT7AoMZlw))
06. OCI Level 200 Training (YouTube [playlist](https://www.youtube.com/watch?v=f6921B2hXw0&list=PLKCk3OyNwIzuBQ13lwsZpqO4__rLrO1eA))
07. [Practical Cloud Security](https://www.amazon.com/Practical-Cloud-Security-Secure-Deployment/dp/1492037516/ref=sr_1_3?ie=UTF8&qid=1545328802&sr=8-3&keywords=practical+cloud+security)
08. [Getting Started with IAM Policies](https://docs.cloud.oracle.com/iaas/Content/Identity/Concepts/policygetstarted.htm)
09. [Applied Cryptography: Protocols, Algorithms and Source Code in C](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=Applied+Cryptography&rh=i%3Aaps%2Ck%3AApplied+Cryptography)
10. [Envelope Encryption](https://devender.me/2016/07/13/envelope-encryption/)
11. [Key Management Limits](https://docs.cloud.oracle.com/iaas/Content/General/Concepts/servicelimits.htm) (OCI)
12. [Oracle Cloud Infrastructure](https://redthunder.blog/tag/oracle-cloud-infrastructure/) (redthunder.blog)
13. [More articles on OCI](https://xmlandmore.blogspot.com/search/label/Oracle%20Cloud%20Infrastructure) (XML and More)

Posted by
[Travel for Life](https://www.blogger.com/profile/14903166424561297055 "author profile")
at

[11:23 AM](https://xmlandmore.blogspot.com/2018/12/oracle-cloud-infrastructureoci-key.html "permanent link")[![](https://resources.blogblog.com/img/icon18_email.gif)](https://www.blogger.com/email-post/748094882401183761/3917079862752034912 "Email Post")[![](https://resources.blogblog.com/img/icon18_edit_allbkg.gif)](https://www.blogger.com/post-edit.g?blogID=748094882401183761&postID=3917079862752034912&from=pencil "Edit Post")

[Email This](https://www.blogger.com/share-post.g?blogID=748094882401183761&postID=3917079862752034912&target=email "Email This") [BlogThis!](https://www.blogger.com/share-post.g?blogID=748094882401183761&postID=3917079862752034912&target=blog "BlogThis!") [Share to X](https://www.blogger.com/share-post.g?blogID=748094882401183761&postID=3917079862752034912&target=twitter "Share to X") [Share to Facebook](https://www.blogger.com/share-post.g?blogID=748094882401183761&postID=3917079862752034912&target=facebook "Share to Facebook") [Share to Pinterest](https://www.blogger.com/share-post.g?blogID=748094882401183761&postID=3917079862752034912&target=pinterest "Share to Pinterest")

Labels:
[Data Encryption Key](https://xmlandmore.blogspot.com/search/label/Data%20Encryption%20Key),
[Encryption Key Storage](https://xmlandmore.blogspot.com/search/label/Encryption%20Key%20Storage),
[Envelope Encryption](https://xmlandmore.blogspot.com/search/label/Envelope%20Encryption),
[Hardware Security Module](https://xmlandmore.blogspot.com/search/label/Hardware%20Security%20Module),
[Master Encryption Key](https://xmlandmore.blogspot.com/search/label/Master%20Encryption%20Key),
[OCI Key Management](https://xmlandmore.blogspot.com/search/label/OCI%20Key%20Management),
[Oracle Cloud Infrastructure](https://xmlandmore.blogspot.com/search/label/Oracle%20Cloud%20Infrastructure)

#### 2 comments:

[![](https://www.blogger.com/img/blogger_logo_round_35.png)](https://www.blogger.com/profile/13990833655354839456)

[Nanafauda](https://www.blogger.com/profile/13990833655354839456)
said...

Great

[January 4, 2024 at 4:20 AM](https://xmlandmore.blogspot.com/2018/12/oracle-cloud-infrastructureoci-key.html?showComment=1704360021046#c1127910212067863189 "comment permalink")[![](https://resources.blogblog.com/img/icon_delete13.gif)](https://www.blogger.com/comment/delete/748094882401183761/1127910212067863189 "Delete Comment")

[![](https://www.blogger.com/img/blogger_logo_round_35.png)](https://www.blogger.com/profile/13990833655354839456)

[Nanafauda](https://www.blogger.com/profile/13990833655354839456)
said...

For 20 years, GloNet Security & Lock Services has specialized in crafting personalized security solutions for homes and businesses throughout the Greater Toronto Area. Situated in Oakville, our expertise extends across Mississauga, Brampton, Burlington, Guelph, Halton, Hamilton, and Toronto, focusing on comprehensive key and [key management services](https://www.glonetsecurity.com/keys-and-key-management/).

[January 4, 2024 at 4:21 AM](https://xmlandmore.blogspot.com/2018/12/oracle-cloud-infrastructureoci-key.html?showComment=1704360069656#c4101392801186573547 "comment permalink")[![](https://resources.blogblog.com/img/icon_delete13.gif)](https://www.blogger.com/comment/delete/748094882401183761/4101392801186573547 "Delete Comment")

[Post a Comment](https://www.blogger.com/comment/fullpage/post/748094882401183761/3917079862752034912)

[Newer Post](https://xmlandmore.blogspot.com/2019/01/oracle-cloud-infrastructurecontainer.html "Newer Post")[Older Post](https://xmlandmore.blogspot.com/2018/12/oracle-cloud-infrastructureoci-dns.html "Older Post")[Home](https://xmlandmore.blogspot.com/)

Subscribe to:
[Post Comments (Atom)](https://xmlandmore.blogspot.com/feeds/3917079862752034912/comments/default)

## Disclaimer

The statements and opinions expressed here are my own and do not necessarily represent those of Oracle.

For your computer health, follow me [@xmlandmore](https://twitter.com/XMLAndMore). To improve your personal health, follow me [@travel2health](https://twitter.com/travel2health).

## Total Pageviews

|  |  |
| --- | --- |
| 0 | 10 |
| 1 | 12 |
| 2 | 18 |
| 3 | 16 |
| 4 | 10 |
| 5 | 10 |
| 6 | 16 |
| 7 | 29 |
| 8 | 27 |
| 9 | 50 |
| 10 | 91 |
| 11 | 28 |
| 12 | 12 |
| 13 | 11 |
| 14 | 22 |
| 15 | 24 |
| 16 | 18 |
| 17 | 55 |
| 18 | 100 |
| 19 | 89 |
| 20 | 40 |
| 21 | 18 |
| 22 | 31 |
| 23 | 25 |
| 24 | 60 |
| 25 | 16 |
| 26 | 37 |
| 27 | 32 |
| 28 | 26 |
| 29 | 35 |

2,337,319

## Categories

- [Oracle WebLogic Server](https://xmlandmore.blogspot.com/search/label/Oracle%20WebLogic%20Server)(30)
- [Performance Tuning](https://xmlandmore.blogspot.com/search/label/Performance%20Tuning)(27)
- [Oracle Fusion Applications](https://xmlandmore.blogspot.com/search/label/Oracle%20Fusion%20Applications)(23)
- [Hotspot VM](https://xmlandmore.blogspot.com/search/label/Hotspot%20VM)(21)
- [Oracle Database 11g](https://xmlandmore.blogspot.com/search/label/Oracle%20Database%2011g)(21)
- [Troubleshooting](https://xmlandmore.blogspot.com/search/label/Troubleshooting)(17)
- [JVM](https://xmlandmore.blogspot.com/search/label/JVM)(15)
- [Java Performance](https://xmlandmore.blogspot.com/search/label/Java%20Performance)(13)
- [WebLogic Server](https://xmlandmore.blogspot.com/search/label/WebLogic%20Server)(13)
- [Big Data](https://xmlandmore.blogspot.com/search/label/Big%20Data)(10)
- [G1 GC](https://xmlandmore.blogspot.com/search/label/G1%20GC)(10)
- [JMeter](https://xmlandmore.blogspot.com/search/label/JMeter)(10)
- [Oracle Analytics Cloud](https://xmlandmore.blogspot.com/search/label/Oracle%20Analytics%20Cloud)(9)
- [JRockit](https://xmlandmore.blogspot.com/search/label/JRockit)(8)
- [Oracle Application Testing Suite](https://xmlandmore.blogspot.com/search/label/Oracle%20Application%20Testing%20Suite)(8)
- [Heap Analysis](https://xmlandmore.blogspot.com/search/label/Heap%20Analysis)(6)

## About Me

[![My photo](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJdhSt4fmkfrZMUdDpmJxAAca586WHbfZEUZu4Lr-WCtNg65QXvnSgXbuCg0rW3Ao4uc9O12thMxh6EZgcOD7oZq2wrvFxpZ81LPpz0gysLU3Tn7uT0Mz1UWOElir_AOuN3m8zwADT_m1EKANQcERTqA_IewtQlDdw2X83eXqyy5yN1po/s1600/tfl%202.png)](https://www.blogger.com/profile/14903166424561297055)[Travel for Life](https://www.blogger.com/profile/14903166424561297055)

Welcome to **Travel for Life**! I share immersive travel experiences designed to inspire a lifetime of exploration.

I believe that travel is the key to understanding our world. As the creator of **Travel 4 a Purpose** and **Travel 2 Health**, I combine the beauty of global destinations with a mindful approach to living well.

𓆝 𓆟 𓆞 “Travel is fatal to prejudice, bigotry, and narrow-mindedness.” — Mark Twain

Be a traveler, not a tourist. Look beyond what’s right in front of you.[View my complete profile](https://www.blogger.com/profile/14903166424561297055)

![Google](https://www.google.com/images/poweredby_transparent/poweredby_FFFFFF.gif)

Custom Search


## Publications & Activities

[Stanley's LinkedIn profile](http://www.linkedin.com/in/stanleyguan) - [Publication in XML Europe 2001](http://www.gca.org/papers/xmleurope2001/papers/bio/s28-3auth2.html)
- [Publication on Volume Rendering (1)](http://portal.acm.org/citation.cfm?id=645605.663083&coll=&dl=)
- [Publication on Volume Rendering (2)](http://adsabs.harvard.edu/abs/1994SPIE.2164..382G)
- [Involvement in WebDev Work Group](https://www.google.com/search?q=Stanley+Guan+WebDav&rls=com.microsoft:en-us:IE-SearchBox&ie=UTF-8&oe=UTF-8&sourceid=ie7&rlz=1I7SKPB_en)
- [Activites in XML Schema Expert Group](https://www.google.com/search?q=Stanley+Guan+XML+Schema&rls=com.microsoft:en-us:IE-SearchBox&ie=UTF-8&oe=UTF-8&sourceid=ie7&rlz=1I7SKPB_en)
- [Activities in JAXB Expert Group](https://www.google.com/search?q=Stanley+Guan+JAXB&rls=com.microsoft:en-us:IE-SearchBox&ie=UTF-8&oe=UTF-8&sourceid=ie7&rlz=1I7SKPB_en)
- [Travel for Life](http://travel4apurpose.blogspot.com/)
- [Travel To Health](http://travel2health.blogspot.com/)
- [Travel To Wellness](http://travel2wellness.blogspot.com/)

## Popular Posts

- [Three Benchmarks for SQL Coverage in HiBench Suite ― a Bigdata Micro Benchmark Suite](https://xmlandmore.blogspot.com/2017/03/three-benchmarks-for-sql-coverage-in.html)



HiBench Suite is a bigdata micro benchmark suite that helps evaluate different big data frameworks in terms of speed, throughput and syste...

- [JDK 8: Thread Stack Size Tuning](https://xmlandmore.blogspot.com/2014/09/jdk-8-thread-stack-size-tuning.html)



When you upgrade JDK, you should re-examine all JVM options you have set in your Java applications.  For example, let's look at thre...

- [![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0wIPsjmQVAJelAhmLTE3WZH3KCsCVWCGXqY5-IMjx5cA_jcterSxdmMPkJLFrAtnajnYLJTTYtuP7EJaqgYoraav4iiUmNZpsAizzmqWwmw-cYkFQi3pi7b3tjx8_FhOPVy4TZVg3OMR6/w72-h72-p-k-no-nu/OatsADFLoad.jpg)](https://xmlandmore.blogspot.com/2013/11/how-to-create-load-testing-scripts.html)



[How to Create Load Testing Scripts Using OpenScript](https://xmlandmore.blogspot.com/2013/11/how-to-create-load-testing-scripts.html)



This article is one of the Oracle Application Test Suite ( OATS ) \[1\] series published on Xml and More , which includes the following: ...

- [![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_sOi-xM6QPp7efQLzfHwsVUlMM4UXrEuu8YNneCs-avXCM2bWgwbey-HJJZGUR53cUGZU3kQQdMGYE2FtpvNnlPQt4k6cOicOi9UA4=w72-h72-n-k-no-nu)](https://xmlandmore.blogspot.com/2019/03/oacknowing-dimensional-modelling-basics.html)



[OAC―Knowing the Dimensional Modelling Basics (2/2)](https://xmlandmore.blogspot.com/2019/03/oacknowing-dimensional-modelling-basics.html)



Video 1. Create your initial data model from Relational Sources using Data Modeler Video 2.  Create Time Dimension Tables Using ...

- [![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCARVhSATJ77QHdOQD6dYSYEO5Sm36Nzz5TNQuRZwJ5GORaCGWwKvx-_l9TgGMlNHy1QY9btVS-pZdWg14Xgs-HXS_UxiBhEcLtpkSdTRNZcvi4QNDNqfxPzZwBiuxdh0e9AdrQb57ASAr/w72-h72-p-k-no-nu/ADR_Diretory.jpg)](https://xmlandmore.blogspot.com/2012/12/understanding-incident-and-diagnostic.html)



[Understanding WebLogic Incident and the Diagnostic Framework behind It](https://xmlandmore.blogspot.com/2012/12/understanding-incident-and-diagnostic.html)



From the WebLogic Server log, I have found the following incident: \[INCIDENT\_ERROR\] \[\_createIncident\] An incident was created. The detail...


## My Blog List

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_vViBN911naS-rr_Gaxc_pB3hYXt8QVC7KWUMz6PpnY8COMrX1B6fyQlmT6IF36spYZ-MYQVSocTQE3sY4-nCF4YqoB5Z1PWXQ=s16-w16-h16)



[Zero Hedge](https://www.zerohedge.com/)



[Langley Plants The Flag: CIA Takes Point In Post-Maduro Venezuela](https://www.zerohedge.com/geopolitical/langley-plants-flag-cia-takes-point-post-maduro-venezuela)


1 hour ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_ubioWAPyh8N_oc1fVBhNo7ZknRBOaCr2xT-VgjRF_uacNvOgmiaPjCQcyV5VjBGXEOqaOIQ3Bui7Nkb0lAh5cxK1j0MDfxf_vvGdI=s16-w16-h16)



[Juggling Dynamite](https://jugglingdynamite.com/)



[Humanity, AI and financial markets](https://jugglingdynamite.com/2026/01/28/humanity-ai-and-financial-markets/)


1 hour ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uvkThOo-tqzYD4e6oKWcbIfYKdjORV9hJsBCi1mZA_yc4bd5qvIR67p4HQ9vNa2aeaQGokVyfTzqWbn1JPfTJdumVZqLMlIeEYzq4BPlOO=s16-w16-h16)



[Mortgage Rate Watch](http://www.mortgagenewsdaily.com/topic/mortgage-rates)



[Mortgage Rate Winning Streak Continues](https://www.mortgagenewsdaily.com/markets/mortgage-rates-01272026)


15 hours ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uq7Pr_DyC-uaVHbdGKAhy8wK7DLeqCBimlkdwtykyEN3DBwjzksxZ3JNTRB80sUjUdp_2t460BUwpKfGOLj-MVMUWUyx8C-aqOP6JQYBlgJqsnmw=s16-w16-h16)



[oftwominds-Charles Hugh Smith](http://charleshughsmith.blogspot.com/)



[Why the Next Recession Will Be the Catalyst for Depression](http://charleshughsmith.blogspot.com/2026/01/why-next-recession-will-be-catalyst-for.html)


16 hours ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_sSs2Z93QHs7lgPXgOZDrff0-srY7KpJvKk92zasY8ofoBU7MehGrXy5D58-Caog4U_qx7UouHPo50aOyd7=s16-w16-h16)



[HBR.org](http://hbr.org/)



[When Tipping Becomes a Customer Experience Problem](https://hbr.org/2026/01/when-tipping-becomes-a-customer-experience-problem)


22 hours ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_vFclqw__tjOJZ-mzLue0F8RBusyaSjXOsLlGs0vlNlEK5ZfYWJ9i9G8a_I5IoAPXtWfeDnANgNX1JclmeQ5LeZSFj_LUcezjAx_A=s16-w16-h16)



[Marc to Market](http://www.marctomarket.com/)





[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEguQI-spCmY_rXK7MD-iNmaCasgF5aLXeJkUZ3uDFrzM9XNL6imCkG-a6lz9b4jFKo4SdOSdcPTMYHo0sgJjx_zhalO4AJGVaEQ0lqw00OK3MWYhNl_VyWLidY-nIhWAC7MVP-v5-DCG8R5-v5FGRw8eq1yVVVMOnb7PyVfyr0BCi0NC-k3l9f90vDuLNAj/s72-c/Tuesday%20.png)](http://www.marctomarket.com/)

[Greenback Mostly Consolidates, while Yen Gyrations Point to Nervous Market](http://www.marctomarket.com/2026/01/greenback-mostly-consolidates-while-yen.html)


1 day ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_vV-tMtl_enOGbNtf6-wT1d40qP4P7f9KxLnmzRR96N7gZAUlD0e_lFhlH5c1fWtzuG5rqj3IWDdMRQLlsMaFJPh8iZcDrneeSdlGTxUNM=s16-w16-h16)



[The Conference Board News](http://www.conference-board.org/)



[US Consumer Confidence Fell Sharply in January](http://www.conference-board.org/press/pressdetail.cfm?pressid=25559)


1 day ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_sC7zl2YA7BSLFipYLC7myfFwPw2_t24uqqAmRVPQtV1AckvLKBoTKVn5ZzHxnPVNFly_LrVoTvSNgrb-frhQ1P91CKNsty2gnRmkkMYrNdww=s16-w16-h16)



[Wellness blogger](https://travel2health.blogspot.com/)





[![](https://lh7-rt.googleusercontent.com/sitesz/AClOY7ouSDXuwSgYZbSTY5cV2Lh8vtUrlmhYfP1Syb8WfE8kBeVKeL5O-fjcsEVFch5Zconup8pRE1wi8v9UvPQW6voPBUMpFJqh3kch7BFFFQYBDjQg-FbJ0gFJSL9IVTXVOfL6jBdTrYrUJKkScgnasb_uJdXNuRRQ0oUwY1aAZkAekVAW2IQC=s72-w640-h395-c?key=DfbvvmI09zHEJ6Ji_B9zyw)](https://travel2health.blogspot.com/)

[Your Longevity Blueprint: Part 3 — Seek essential sleep](https://travel2health.blogspot.com/2026/01/your-longevity-blueprint-part-3-seek.html)


2 days ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_tOKjelkj9CkWydONN4YKP9aixonGTxVQEQ0CUnGaUGOGOGvITSd93WuDWZkfofrhDsXfIdFOq64CK3V0qVBDthzGDNI5alXxBUYF8NYhiF2tIgmw=s16-w16-h16)



[Wanderlust Investor blogger](https://travel2wellness.blogspot.com/)





[![](https://img.youtube.com/vi/b-aPcsT3F3E/default.jpg)](https://travel2wellness.blogspot.com/)

[Announcement: A Cleaner, Safer Reading Experience](https://travel2wellness.blogspot.com/2026/01/announcement-cleaner-safer-reading.html)


2 days ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_v1wdjCKUIAjivmm_NWaeYhHPW0Vmd-r-oC0eYD3v9Xa5Jaf6o8BWxz8zYd25j-DzrT4JSwtARNO6NrtnUdLGV9D_dgy9TZNjVgDNgR5aIAB4NIxg=s16-w16-h16)



[Musings on Markets](https://aswathdamodaran.blogspot.com/)





[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipPEI-T2qQKGFSBs9llxjzhEJVNTU3iKbDW5www2eNa3_J8OJ2YLUwRf8WdgSPTfvjapYhggi0SAzMzIVbrpbgAOTgAx8ktMKzB3_aN1_cHyOQpTQMpgFXAATjUOOIh3-2mz1ZOXLsghBSNso_juSa6joIiDLX9CIVr-F2e3qWphI_tMCKe3WprRbiU5s/s72-w400-h288-c/USIndices2025.jpg)](https://aswathdamodaran.blogspot.com/)

[Data Update 2 for 2026: Equities get tested, and pass again!](https://aswathdamodaran.blogspot.com/2026/01/data-update-2-for-2026-equities-get.html)


4 days ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_s6AFCa5vaArjD0k5TjmJyMCcVoReJbLqjizgcUujn0WyTvxt2lZvDt1baUOTYA95jAkMRJ0pB8I78O3N75V-8lwau44FKTN73jNGtRKSfxiQ=s16-w16-h16)



[Calculated Risk](http://www.calculatedriskblog.com/)



[This is the End and a New Beginning](http://www.calculatedriskblog.com/2026/01/this-is-end-and-new-beginning.html)


2 weeks ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uWCPfFl-oLiVhc8C2V5QKxFZ1O87jrTorUF_m9-XObKxKpASpKUAHnCBlaZMe3SAm6yEtNOwLm9AeDnpPNIV6NhhkokADKWxwONwiiNo2N5q9-sg=s16-w16-h16)



[Adventure Blogger](https://travel4apurpose.blogspot.com/)





[![](https://img.youtube.com/vi/ApocciFQ9OU/default.jpg)](https://travel4apurpose.blogspot.com/)

[A Tapestry of Gold and Light: The Evening Transformation of Yuushien](https://travel4apurpose.blogspot.com/2026/01/a-tapestry-of-gold-and-light-evening.html)


2 weeks ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_vHnV3AhQDvXgg4M8bmZIMFaZSRLXM5zaqp5vsjeqFvsNB2N9ozU4WEV3eu0ngXaFp542tG9zlpO02uQa3YwCng=s16-w16-h16)



[Gavekal’s China technology expert](https://danwang.co/)



[2025 letter](https://danwang.co/2025-letter/)


3 weeks ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_s1Wv8agwQH9bb20RFyMgAFcbP3NaxCb609XzXqTzrL53uzLvgPifkaicZ-SG_khQ=s16-w16-h16)



[All MayoClinic.com Topics](https://xmlandmore.blogspot.com/rss/all-health-information-topics)



[Rheumatoid arthritis: Is exercise important?](http://www.mayoclinic.org/diseases-conditions/rheumatoid-arthritis/in-depth/rheumatoid-arthritis-exercise/art-20096222)


9 months ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_vRPWW42FP6USQr_k_4L-K7FHohezb4ILiK7ixwfiGWmvifWAUvMZwU0C7oQbOUaq11Yo9LycnmfxT9IU1VTQcCbYdKdXIYa9yheqGi=s16-w16-h16)



[Get Rich Slowly](https://www.getrichslowly.org/)



[Air Miles and Points Credit Cards from Our Partners](https://www.getrichslowly.org/best-rewards-card/)


2 years ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_s1Wv8agwQH9bb20RFyMgAFcbP3NaxCb609XzXqTzrL53uzLvgPifkaicZ-SG_khQ=s16-w16-h16)



[Traders' Insight](https://xmlandmore.blogspot.com/2018/12/oracle-cloud-infrastructureoci-key.html)



[Chart Advisor: Energy Up, Tech Down](https://tradersinsight.news/traders-insight/securities/macro/chart-advisor-energy-up-tech-down/)


2 years ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_vAkI3Ni23WQGRMyAR23U8mdeq1FCT_EUuWmxt49TShhhjzG2sPCTwzozdnVEBCGKa_b3qlK4iGIBbK5wpNebGRX6kRA3LXaQ=s16-w16-h16)



[Oracle Blogs \| Oracle Analytics Cloud Blog](https://blogs.oracle.com/)



[Analytics in Finance – Where do YOU stand?](https://blogs.oracle.com/analytics/done-cancel-v12)


4 years ago

- ![](https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_vWzKNLZeAzI0N4eggyup-o9HVlEmBCJJV5i5I0k0smoZ8ZUZAPZrj2dukNHepcNB5v5bRAqjG1eV3i-XhyQrc-ngI=s16-w16-h16)



[OPEC Flash News](http://www.opec.org/opec_web/en/news.rss)



[Dr. Fadhil J. Chalabi: a distinguished OPEC diplomat](http://www.opec.org/opec_web/en/5778.htm)


6 years ago


Show 5

Show All

## Subscribe To

![](https://resources.blogblog.com/img/widgets/arrow_dropdown.gif)![](https://resources.blogblog.com/img/icon_feed12.png)
Posts

[![](https://resources.blogblog.com/img/widgets/subscribe-netvibes.png)](https://www.netvibes.com/subscribe.php?url=https%3A%2F%2Fxmlandmore.blogspot.com%2Ffeeds%2Fposts%2Fdefault)[![](https://resources.blogblog.com/img/widgets/subscribe-yahoo.png)](https://add.my.yahoo.com/content?url=https%3A%2F%2Fxmlandmore.blogspot.com%2Ffeeds%2Fposts%2Fdefault)[![](https://resources.blogblog.com/img/icon_feed12.png)\\
Atom](https://xmlandmore.blogspot.com/feeds/posts/default)

![](https://resources.blogblog.com/img/widgets/arrow_dropdown.gif)![](https://resources.blogblog.com/img/icon_feed12.png)
Posts

![](https://resources.blogblog.com/img/widgets/arrow_dropdown.gif)![](https://resources.blogblog.com/img/icon_feed12.png)
Comments

[![](https://resources.blogblog.com/img/widgets/subscribe-netvibes.png)](https://www.netvibes.com/subscribe.php?url=https%3A%2F%2Fxmlandmore.blogspot.com%2Ffeeds%2F3917079862752034912%2Fcomments%2Fdefault)[![](https://resources.blogblog.com/img/widgets/subscribe-yahoo.png)](https://add.my.yahoo.com/content?url=https%3A%2F%2Fxmlandmore.blogspot.com%2Ffeeds%2F3917079862752034912%2Fcomments%2Fdefault)[![](https://resources.blogblog.com/img/icon_feed12.png)\\
Atom](https://xmlandmore.blogspot.com/feeds/3917079862752034912/comments/default)

![](https://resources.blogblog.com/img/widgets/arrow_dropdown.gif)![](https://resources.blogblog.com/img/icon_feed12.png)
Comments

|     |     |
| --- | --- |
|  |  |

Travel theme. Powered by [Blogger](https://www.blogger.com/).
