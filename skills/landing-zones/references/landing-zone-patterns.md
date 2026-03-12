# OCI Landing Zone Patterns Reference

## Landing Zone Topology Patterns

### Pattern 1: Hub-Spoke Topology (Recommended for Multi-Tenancy)

```
                    ┌─────────────────────────┐
                    │   Hub VCN (10.0.0.0/16) │
                    │                         │
                    │  - Network Firewall     │
                    │  - NAT Gateway          │
                    │  - Service Gateway      │
                    │  - DRG (on-prem)        │
                    └────────────┬────────────┘
                                 │
                                DRG
                    ┌────────────┼────────────┐
                    │            │            │
        ┌───────────▼──┐  ┌──────▼─────┐  ┌──▼───────────┐
        │ Spoke 1 VCN  │  │ Spoke 2 VCN│  │ Spoke 3 VCN  │
        │ App1-Prod    │  │ App2-Prod  │  │ Shared-Svcs  │
        │ 10.10.0.0/16 │  │ 10.20.0.0/16│ │ 10.30.0.0/16 │
        └──────────────┘  └────────────┘  └──────────────┘

Benefits:
- Centralized egress control (cost + security)
- Spoke isolation (network segmentation)
- Shared services (DNS, monitoring, bastion)
- Transitive routing via DRG

Cost savings: $3,000-5,000/month via single NAT Gateway vs per-VCN
```

### Pattern 2: Multi-Compartment Hierarchy

```
Tenancy (Root)
│
├─ Network [Network admins only]
│   ├─ Hub
│   └─ Spokes
│
├─ Security [Security team only]
│   ├─ Vault (keys, secrets)
│   ├─ Bastion
│   └─ Logging (audit logs, flow logs)
│
├─ Workloads [Application teams]
│   ├─ App1
│   │   ├─ Dev [Developers full access]
│   │   ├─ Test [QA full access]
│   │   └─ Prod [SRE read, operators limited write]
│   │
│   └─ App2
│       ├─ Dev
│       ├─ Test
│       └─ Prod
│
├─ Shared-Services [Platform team]
│   ├─ Identity (IDCS, federation)
│   ├─ Monitoring (APM, Logging Analytics)
│   └─ DevOps (CI/CD, artifact registry)
│
└─ Sandbox [Developers experiment, auto-delete after 30 days]
    ├─ User1-Sandbox
    └─ User2-Sandbox

Policy inheritance:
- Network policies apply to Hub + Spokes
- Workload policies apply to all App environments
- Sandbox policies enforce auto-cleanup
```

### Pattern 3: Security Zones & Cloud Guard Integration

```
Compartment: Prod
│
├─ Security Zone Recipe: CIS-Level-1
│   ├─ deny-public-ip-on-compute
│   ├─ deny-public-bucket
│   ├─ require-encryption-at-rest
│   ├─ require-encryption-in-transit
│   └─ deny-internet-gateway-in-private-subnet
│
├─ Cloud Guard Target
│   ├─ Detector: Configuration issues
│   ├─ Detector: Activity anomalies
│   └─ Responder: Auto-remediate violations
│
└─ Resources
    ├─ Compute: Public IP blocked ✓
    ├─ Object Storage: Private only ✓
    ├─ ADB: TDE enabled ✓
    └─ Load Balancer: SSL enforced ✓

Result: Security violations prevented at creation time, not detected after
```

## Compartment Design Decision Tree

```
"How should I structure compartments?"
│
├─ Single application, simple lifecycle?
│   └─ Pattern: Workload-centric
│       Workloads/
│         └─ MyApp/
│             ├─ Dev
│             ├─ Test
│             └─ Prod
│
├─ Multiple applications, shared platform?
│   └─ Pattern: Environment-centric
│       Workloads/
│         ├─ Dev/
│         │   ├─ App1
│         │   └─ App2
│         ├─ Test/
│         │   ├─ App1
│         │   └─ App2
│         └─ Prod/
│             ├─ App1
│             └─ App2
│
├─ Multi-tenant SaaS (customers isolated)?
│   └─ Pattern: Tenant-centric
│       Tenants/
│         ├─ Customer-A/
│         │   ├─ Network
│         │   ├─ Compute
│         │   └─ Database
│         └─ Customer-B/
│             ├─ Network
│             ├─ Compute
│             └─ Database
│
└─ Large enterprise, multiple business units?
    └─ Pattern: Business-unit-centric
        BusinessUnits/
          ├─ BU-Engineering/
          │   └─ [Workload-centric per BU]
          ├─ BU-Marketing/
          │   └─ [Workload-centric per BU]
          └─ BU-Sales/
              └─ [Workload-centric per BU]

Key principle: Choose hierarchy that matches org structure + cost allocation
```

## Network Topology Decision Tree

```
"Which network pattern should I use?"
│
├─ Single application, no shared services?
│   └─ Single VCN
│       Cost: Lowest
│       Complexity: Simplest
│       Use when: Proof of concept, single app
│
├─ Multiple apps, need isolation, shared egress?
│   └─ Hub-Spoke via DRG
│       Cost: $100/month DRG + $45/month NAT (shared)
│       Complexity: Medium
│       Egress savings: $3,000-5,000/month
│       Use when: Multi-app production
│
├─ Multi-region disaster recovery?
│   └─ Hub-Spoke + DRG Remote Peering
│       Primary Region: Hub-Spoke
│       DR Region: Hub-Spoke
│       Cost: +$100/month DRG per region
│       Use when: RTO < 1 hour required
│
└─ On-premises integration?
    └─ Hub-Spoke + FastConnect
        Hub VCN: FastConnect → On-prem
        Spokes: Route via hub
        Cost: $500-2,000/month FastConnect
        Use when: Hybrid cloud architecture
```

## Tagging Strategy

### Required Tags (Mandatory)
```yaml
Tag Namespace: Organization
Tags:
  - CostCenter: [Finance code for chargeback]
    Type: String
    Mandatory: Yes
    Default: None

  - Environment: [Dev | Test | Prod | Sandbox]
    Type: Enum
    Mandatory: Yes
    Default: None

  - Owner: [Email or team name]
    Type: String
    Mandatory: Yes
    Default: ${iam.principal.name}

  - DataClassification: [Public | Internal | Confidential | Restricted]
    Type: Enum
    Mandatory: Yes (for data resources)
    Default: Internal

  - BackupPolicy: [None | Bronze | Silver | Gold]
    Type: Enum
    Mandatory: Yes (for stateful resources)
    Default: Bronze
```

### Optional Tags (Recommended)
```yaml
  - Project: [Project or product name]
  - ExpiryDate: [Auto-cleanup date for sandbox]
  - Compliance: [PCI | HIPAA | SOC2]
  - ManagedBy: [Terraform | Manual | Ansible]
```

## Cost Allocation Patterns

### Budget Hierarchy
```
Tenancy Budget: $100,000/month
├─ Network: $10,000/month (fixed)
├─ Security: $5,000/month (fixed)
├─ Workloads: $75,000/month
│   ├─ App1-Dev: $5,000/month
│   ├─ App1-Test: $8,000/month
│   ├─ App1-Prod: $25,000/month
│   ├─ App2-Dev: $3,000/month
│   ├─ App2-Test: $4,000/month
│   └─ App2-Prod: $30,000/month
└─ Shared-Services: $10,000/month

Alerts:
- 50% threshold: Warning
- 80% threshold: Critical (page on-call)
- 100% threshold: Auto-stop dev/test resources
```
