---
title: OCI Skill Catalog and Use Cases
tldr: Complete catalog of OCI and Oracle-related skills in the agentic-tools OCI pack, with routing guidance and example prompts.
business_value: Helps humans and agents pick the right OCI specialist skill quickly, reducing duplicated guidance and stale Oracle Cloud answers.
complexity: medium
last_verified: 2026-05-27
stakeholder_relevant: true
dependencies:
  - skills/oci/manifest.json
  - skills/oci/SKILL.md
---

# OCI Skill Catalog and Use Cases

## TL;DR

**What**: A complete catalog of every OCI and Oracle-related skill in this repository.

**Why**: OCI work has many overlapping domains. This catalog keeps skill selection explicit, keeps the OCI ownership boundary visible, and gives agents concrete prompts that should route to the right specialist.

**How**: Use `skills/oci/manifest.json` as the source of truth, load the narrowest matching skill first, and use the examples below as realistic trigger and test prompts.

**Dependencies**: `skills/oci/manifest.json`, `skills/oci/SKILL.md`, and the individual `skills/oci/<skill-name>/SKILL.md` files.

## Maintenance Rules

- Keep this document in sync with `skills/oci/manifest.json`.
- Add every new OCI or Oracle-related skill under `skills/oci/<skill-name>/`.
- Use skill IDs in the `oci/<skill-name>` form for nested specialist skills.
- Keep examples as user prompts, not implementation notes.
- Keep high-drift service facts inside specialist references, not in this catalog.
- Re-run `node scripts/ci/validate-skill-library.mjs` after changing the OCI pack.

## Routing At A Glance

| User problem | Start with | Then load |
| --- | --- | --- |
| "Which OCI skill should handle this?" | `oci` | The specialist named by the router |
| Broad OCI architecture or migration review | `oci/best-practices` | Service specialists for each risk |
| Broad OCI security control choice | `oci/oci-security-control-plane` | `oci/zpr-security`, `oci/managed-bastion-access`, `oci/secrets-management`, `oci/iam-identity-management`, or `oci/networking-management` |
| Terraform or Resource Manager confusion | `oci/infrastructure-as-code` | `oci/oci-resource-manager`, plus the affected service skill |
| Database provisioning choice | `oci/database-management` | `oci/oracle-dba` for Autonomous AI Database operations |
| Identity, 403s, dynamic groups, IDCS compatibility | `oci/iam-identity-management` | App auth specialists when Better Auth is involved |
| Private access to OCI instances | `oci/managed-bastion-access` | `oci/compute-management`, `oci/networking-management`, or `oci/iam-identity-management` |
| Cost, quotas, capacity, and bill review | `oci/finops-cost-optimization` | `oci/compute-management`, `oci/oracle-dba`, or `oci/networking-management` |

## Pack And Router Skills

### `oci`

**Purpose**: Owns OCI skill-pack discovery, installation, routing, and separation-of-duties questions.

**Use cases**:

- "Find the right OCI skill for debugging a VCN outage."
- "Review whether all Oracle-related skills live under the OCI folder."
- "Install the OCI skill pack globally in Codex."
- "Which skill owns Resource Manager dynamic group troubleshooting?"

**Pair with**: Any specialist skill selected by the routing table in `skills/oci/SKILL.md`.

**References**: `skills/oci/manifest.json`.

### `oci/best-practices`

**Purpose**: Routes broad OCI architecture, migration, and Well-Architected review work into the correct specialist skills.

**Use cases**:

- "Review this OCI architecture for anti-patterns before production."
- "Plan an Oracle Cloud migration and identify risk areas."
- "Evaluate whether this tenancy follows OCI Well-Architected principles."
- "Choose which OCI skills should review this landing-zone design."

**Pair with**: `oci/landing-zones`, `oci/networking-management`, `oci/iam-identity-management`, `oci/finops-cost-optimization`, and `oci/oci-security-control-plane`.

**References**: `references/oci-well-architected-checklist.md`.

### `oci/database-management`

**Purpose**: Routes Oracle database provisioning and lifecycle work, especially DB Systems, PDB/CDB work, and ADB handoff.

**Use cases**:

- "Create an OCI database and decide between DB System and Autonomous AI Database."
- "Plan PDB lifecycle operations for an Oracle database fleet."
- "Route this ADB wallet issue to the right database skill."
- "Help me choose the database shape and provisioning path."

**Pair with**: `oci/oracle-dba` for Autonomous AI Database operations and `oci/infrastructure-as-code` for Terraform provisioning.

**References**: `references/oci-dbcs-cli.md`.

### `oci/oci-security-control-plane`

**Purpose**: Routes broad OCI security questions to the control that owns the problem.

**Use cases**:

- "Which OCI security control owns this: Cloud Guard, Security Zone, ZPR, IAM, Vault, or Bastion?"
- "Should this be solved with ZPR or NSGs?"
- "Should we use Bastion or expose public SSH temporarily?"
- "Route this security architecture review to the right OCI specialist."

**Pair with**: `oci/zpr-security`, `oci/managed-bastion-access`, `oci/secrets-management`, `oci/iam-identity-management`, `oci/networking-management`, and `oci/landing-zones`.

## Core OCI Operations Skills

### `oci/compute-management`

**Purpose**: Handles OCI Compute instances, shapes, boot volumes, capacity, instance principals, and compute-related cost posture.

**Use cases**:

- "Choose the right OCI shape for this workload."
- "Debug out-of-host-capacity during instance launch."
- "Configure instance principals for a compute workload."
- "Review whether this instance should use Bastion, public SSH, or private access."

**Pair with**: `oci/managed-bastion-access`, `oci/networking-management`, `oci/iam-identity-management`, and `oci/finops-cost-optimization`.

**References**: `references/oci-compute-shapes-reference.md`.

### `oci/networking-management`

**Purpose**: Handles VCNs, subnets, NSGs, security lists, routing, DRG, FastConnect, VPN, Service Gateway, DNS, and private connectivity.

**Use cases**:

- "Debug why this private subnet cannot reach Object Storage."
- "Choose NSG vs security list for this application tier."
- "Plan a FastConnect or VPN design for OCI."
- "Review Terraform networking for route-table, NAT Gateway, and VCN CIDR traps."

**Pair with**: `oci/zpr-security`, `oci/managed-bastion-access`, `oci/infrastructure-as-code`, and `oci/landing-zones`.

**References**: `references/oci-networking-reference.md`, `references/oci-terraform-networking-patterns.md`.

### `oci/iam-identity-management`

**Purpose**: Handles IAM policies, compartments, identity domains, IDCS compatibility, dynamic groups, federation, OIDC, and 403 troubleshooting.

**Use cases**:

- "Terraform apply gets 403 when creating a VCN."
- "Write an OCI IAM policy for Resource Manager dynamic groups."
- "Map identity-domain groups to tenancy permissions."
- "Explain the difference between IAM groups, identity-domain groups, and dynamic groups."

**Pair with**: `oci/oci-resource-manager`, `oci/infrastructure-as-code`, `oci/secrets-management`, `oci/oracle-idcs-better-auth-setup`, and `oci/oracle-idcs-org-provisioning`.

**References**: `references/oci-iam-policies-reference.md`.

### `oci/infrastructure-as-code`

**Purpose**: Canonical OCI Terraform hub for state backends, provider auth, Resource Manager boundaries, import/adoption, drift, modules, realms, and Terraform security automation.

**Use cases**:

- "Set up Terraform state on OCI using the native backend."
- "Explain local Terraform vs OCI Resource Manager."
- "Pick Terraform auth for GitHub Actions, Cloud Shell, Resource Manager, and Compute."
- "Safely import existing OCI resources into Terraform."
- "Review Terraform that adds ZPR attributes or creates a Bastion."

**Pair with**: `oci/oci-resource-manager`, `oci/networking-management`, `oci/iam-identity-management`, `oci/secrets-management`, `oci/zpr-security`, and `oci/managed-bastion-access`.

**References**: `references/oci-terraform-state-backends.md`, `references/oci-terraform-auth-matrix.md`, `references/oci-terraform-secrets-state.md`, `references/oci-terraform-import-drift.md`, `references/oci-terraform-module-quality.md`, `references/oci-terraform-realms-regions.md`, `references/oci-terraform-zpr.md`, `references/oci-terraform-bastion.md`.

### `oci/oci-resource-manager`

**Purpose**: Handles OCI Resource Manager stacks, jobs, variables, state handling, source providers, private endpoints, provider versions, IAM policies, and dynamic groups.

**Use cases**:

- "Create an OCI Resource Manager stack from a GitHub source provider."
- "Debug a Resource Manager job that fails with missing permissions."
- "Use a Resource Manager private endpoint for private network access."
- "Retrieve state from a Resource Manager job and compare it with local Terraform state."

**Pair with**: `oci/infrastructure-as-code`, `oci/iam-identity-management`, `oci/networking-management`, and the service skill for the managed resource.

**References**: `references/resource-manager-reference.md`.

### `oci/landing-zones`

**Purpose**: Handles tenancy foundations: compartments, Security Zones, Cloud Guard, hub-spoke networks, tag defaults, CIS Foundations, and governance guardrails.

**Use cases**:

- "Design an OCI landing zone for a new product team."
- "Plan compartment structure and tag defaults."
- "Enable Security Zones without breaking workload deployment."
- "Review a hub-spoke tenancy design against CIS OCI Foundations."

**Pair with**: `oci/best-practices`, `oci/networking-management`, `oci/iam-identity-management`, `oci/oci-security-control-plane`, and `oci/finops-cost-optimization`.

**References**: `references/landing-zone-patterns.md`, `references/landing-zone-cli.md`, `references/oci-well-architected-framework.md`, `references/security-zone-automation.md`.

### `oci/monitoring-operations`

**Purpose**: Handles OCI Monitoring, alarms, MQL, metrics, Logging, Service Connector, Log Analytics, and missing-metric troubleshooting.

**Use cases**:

- "Create OCI alarms for compute and database health."
- "Debug missing `oci_computeagent` metrics."
- "Write MQL for a custom threshold alarm."
- "Route logs through Service Connector for downstream processing."

**Pair with**: `oci/compute-management`, `oci/oracle-dba`, `oci/oci-events`, and `oci/finops-cost-optimization`.

**References**: `references/oci-monitoring-reference.md`.

### `oci/finops-cost-optimization`

**Purpose**: Handles OCI billing, budgets, cost analysis, egress review, right-sizing, Resource Scheduler savings, quotas, and capacity-vs-limit checks.

**Use cases**:

- "Investigate why the OCI bill increased this month."
- "Estimate egress risk without hardcoding stale prices."
- "Plan Resource Scheduler stop/start savings."
- "Distinguish a Terraform plan from actual quota and capacity availability."

**Pair with**: `oci/compute-management`, `oci/networking-management`, `oci/oracle-dba`, and `oci/infrastructure-as-code`.

**References**: `references/oci-cost-cli.md`.

### `oci/secrets-management`

**Purpose**: Handles OCI Vault, KMS, secret retrieval, rotation, automatic generation, replication, dynamic groups, instance principals, and Terraform state safety.

**Use cases**:

- "Store and rotate an OCI Vault secret."
- "Debug secret retrieval 403 from an instance principal."
- "Explain why `sensitive = true` does not remove a secret from Terraform state."
- "Plan how to keep wallets, private keys, and generated passwords out of durable state."

**Pair with**: `oci/iam-identity-management`, `oci/infrastructure-as-code`, `oci/compute-management`, and `oci/oracle-dba`.

**References**: `references/oci-vault-reference.md`.

### `oci/genai-services`

**Purpose**: Handles OCI Generative AI usage, model selection, model catalog checks, RAG planning, SDK/API choices, throttling, and high-drift model availability.

**Use cases**:

- "Choose an OCI GenAI model for a RAG assistant."
- "Debug OCI Generative AI 429 errors."
- "Compare Command A, Llama, Gemini, and gpt-oss options with current docs."
- "Plan an OCI RAG architecture without relying on stale model tables."

**Pair with**: `oci/monitoring-operations`, `oci/secrets-management`, `oci/infrastructure-as-code`, and `oci/finops-cost-optimization`.

**References**: `references/oci-genai-reference.md`.

### `oci/oci-events`

**Purpose**: Handles OCI Events rules, filters, CloudEvents payloads, Functions, Streaming, Notifications, and event delivery troubleshooting.

**Use cases**:

- "Create an OCI Events rule that triggers a Function."
- "Filter CloudEvents for object storage changes."
- "Route events to Streaming or Notifications."
- "Debug why an Events rule did not deliver."

**Pair with**: `oci/monitoring-operations`, `oci/iam-identity-management`, and the target service skill.

**References**: `references/oci-events-reference.md`, `references/events-patterns.md`, `references/events-cli.md`.

## OCI Security Specialist Skills

### `oci/zpr-security`

**Purpose**: Handles Zero Trust Packet Routing, security attributes, ZPL/ZPR policy, protected resources, safe rollout, troubleshooting, and rollback checks.

**Use cases**:

- "Configure ZPR for a database and application tier."
- "I enabled ZPR and added a security attribute; now the DB is unreachable."
- "Can ZPR replace NSGs or security lists?"
- "Terraform should add ZPR attributes to production resources safely."

**Pair with**: `oci/oci-security-control-plane`, `oci/networking-management`, `oci/iam-identity-management`, and `oci/infrastructure-as-code`.

**References**: `references/zpr-reference.md`.

### `oci/managed-bastion-access`

**Purpose**: Handles OCI Bastion, Managed SSH, port forwarding, dynamic SOCKS5, client CIDR allowlists, Bastion plugin requirements, TTLs, and session cleanup.

**Use cases**:

- "Create Managed SSH access to a private OCI instance."
- "A Bastion session is ACTIVE but SSH closes immediately."
- "Temporarily add my current IP to the Bastion allowlist."
- "Use dynamic port forwarding for private database access."

**Pair with**: `oci/oci-security-control-plane`, `oci/compute-management`, `oci/networking-management`, `oci/iam-identity-management`, and `oci/infrastructure-as-code`.

**References**: `references/managed-bastion-reference.md`.

## Oracle Database And Migration Skills

### `oci/oracle-dba`

**Purpose**: Canonical Autonomous AI Database and Oracle Database operations skill for ADB, wallet, SQLcl, ECPU guidance, HA/DR, performance, wait events, and security.

**Use cases**:

- "Manage an Autonomous AI Database wallet connection."
- "Debug ADB performance using SQLcl and wait events."
- "Optimize ECPU cost for an Autonomous AI Database."
- "Review ADB backup, security, and HA/DR posture."

**Pair with**: `oci/database-management`, `oci/secrets-management`, `oci/monitoring-operations`, and `oci/finops-cost-optimization`.

**References**: `references/sqlcl-workflows.md`, `references/oci-cli-adb.md`, `references/oci-adb-best-practices.md`, `references/adb-security.md`, `references/adb-ha-dr.md`, `references/sql-patterns.md`, `references/cost-reference.md`, `references/mcp-tools.md`, `references/api_reference.md`.

### `oci/sqlite-to-oracle-planner`

**Purpose**: Plans migrations from SQLite to Oracle by finding touch points, schema differences, driver changes, transaction differences, and application migration risks.

**Use cases**:

- "Migrate this app from SQLite to Oracle."
- "Replace `better-sqlite3` with Oracle access."
- "Convert SQLite schema assumptions to Oracle."
- "Find all SQLite touch points before migration planning."

**Pair with**: `oci/oracle-dba`, `oci/database-management`, and app-specific implementation skills.

## Oracle Identity And App Integration Skills

### `oci/oracle-idcs-better-auth-setup`

**Purpose**: Handles Better Auth integration with OCI IAM Identity Domains, IDCS compatibility, OIDC metadata, callback URLs, trusted origins, and provider bootstrap.

**Use cases**:

- "Connect Better Auth to OCI IAM Identity Domains."
- "Fix an IDCS callback URL mismatch."
- "Set trusted origins for Oracle identity-domain auth."
- "Bootstrap an Oracle OIDC provider for Better Auth."

**Pair with**: `oci/iam-identity-management`, `oci/fastify-better-auth-bridge`, and `oci/oracle-idcs-org-provisioning`.

**Scripts**: `scripts/validate-idcs-env.js`, `scripts/print-auth-checklist.js`.

### `oci/oracle-idcs-org-provisioning`

**Purpose**: Handles identity-domain or IDCS group-to-organization mapping, Better Auth organization membership, first-admin bootstrap, and tenant resolution.

**Use cases**:

- "Map IDCS groups to tenant organizations."
- "Provision `org_members` from identity-domain groups."
- "Fix Better Auth active organization after Oracle login."
- "Bootstrap the first admin from an identity-domain group."

**Pair with**: `oci/iam-identity-management`, `oci/oracle-idcs-better-auth-setup`, and `oci/fastify-better-auth-bridge`.

**Scripts**: `scripts/preview-group-role-mapping.js`, `scripts/verify-org-resolution.js`.

### `oci/fastify-better-auth-bridge`

**Purpose**: Handles Fastify 5 and Better Auth request bridging, Web Request conversion, cookie forwarding, request decorators, and Oracle identity org-context patching.

**Use cases**:

- "Bridge Better Auth into a Fastify route."
- "Fix Fastify session resolution when cookies are not forwarded."
- "Decorate Fastify requests with Better Auth session context."
- "Patch Oracle IDCS organization context into backend auth."

**Pair with**: `oci/oracle-idcs-better-auth-setup`, `oci/oracle-idcs-org-provisioning`, and framework-specific backend skills.

**Scripts**: `scripts/check-fastify-auth-bridge.js`.

## Oracle Artifact Skill

### `oci/oci-pptx`

**Purpose**: Handles Oracle-branded PowerPoint work, CloudWorld-style decks, Oracle Sans usage, brand colors, PPTX validation, thumbnails, and deck editing.

**Use cases**:

- "Create an Oracle-branded slide deck for this architecture."
- "Review whether this PPTX follows Oracle branding."
- "Apply Oracle colors and typography to these slides."
- "Build a CloudWorld-style presentation from this technical outline."

**Pair with**: `presentations` for general deck production and domain skills for OCI content accuracy.

**References and scripts**: `README.md`, `editing.md`, `pptxgenjs.md`, `references/color-palettes.md`, `references/implementation-examples.md`, `scripts/thumbnail.py`, `scripts/clean.py`, `scripts/add_slide.py`.

## Example Multi-Skill Workflows

### Terraform Deploys A Private Workload

1. Load `oci/infrastructure-as-code` for state, auth, provider, and import rules.
2. Load `oci/networking-management` for VCN, subnet, route table, private endpoint, and NSG design.
3. Load `oci/iam-identity-management` for principal type and policy scope.
4. Load `oci/managed-bastion-access` only if private operator access is required.
5. Load `oci/finops-cost-optimization` for quota, capacity, and cost checks before execution.

Example prompt: "Review this Terraform plan for a private OCI web tier with Bastion access and native OCI state."

### Production Security Control Choice

1. Load `oci/oci-security-control-plane` to choose the owner control.
2. Load `oci/zpr-security` for protected-resource and security-attribute rollout.
3. Load `oci/networking-management` to preserve L4 network controls.
4. Load `oci/iam-identity-management` for policy and principal boundaries.
5. Load `oci/infrastructure-as-code` if Terraform will apply the change.

Example prompt: "Can ZPR replace our NSGs, and how should Terraform roll it out safely?"

### Autonomous Database Application Integration

1. Load `oci/database-management` to confirm the database path.
2. Load `oci/oracle-dba` for ADB wallet, SQLcl, ECPU, security, and performance work.
3. Load `oci/secrets-management` for wallet and secret handling.
4. Load `oci/iam-identity-management` for dynamic group or service principal access.
5. Load `oci/monitoring-operations` for database health and alarms.

Example prompt: "Move this app to Autonomous AI Database, keep wallets out of state, and add monitoring."

### Oracle Identity With Better Auth

1. Load `oci/oracle-idcs-better-auth-setup` for identity-domain OIDC setup.
2. Load `oci/oracle-idcs-org-provisioning` for group-to-org membership.
3. Load `oci/fastify-better-auth-bridge` for backend session resolution.
4. Load `oci/iam-identity-management` only when OCI IAM policy or identity-domain permissions are part of the task.

Example prompt: "Connect Better Auth to an Oracle identity domain and map IDCS groups into tenant orgs."

## Validation Prompts

Use these prompts to pressure-test routing after changing the pack:

- "Which OCI skill should load for native Terraform state on Object Storage?"
- "I enabled ZPR and now the database is unreachable."
- "A Managed SSH Bastion session is active but SSH closes immediately."
- "Terraform apply gets 403 from Resource Manager."
- "Map identity-domain groups to Better Auth organizations."
- "ADB wallet connection fails from a private compute instance."
- "Create an OCI Events rule that triggers a Function."
- "Review whether this Oracle deck follows brand rules."
- "Estimate OCI egress risk without hardcoded stale prices."
- "Choose an OCI GenAI model for a RAG app using current docs."
