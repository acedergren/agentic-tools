# OCI Well-Architected Framework Checklist

## Five Pillars Overview

### Pillar 1: Security and Compliance
| Focus Area | Best Practice | CLI Verification |
|------------|---------------|------------------|
| User Authentication | Enable MFA for all IAM users | `oci iam user list --query "data[?\"is-mfa-activated\"==\`false\`]"` |
| Authorization | Use least privilege policies | Review policies for `all-resources` or `any-user` |
| Data Encryption | Enable encryption at rest | `oci vault secret list --compartment-id <id>` |
| Network Security | Use NSGs over Security Lists | `oci network nsg list --compartment-id <id>` |
| Audit Logging | Enable audit logs for all compartments | `oci audit event list --compartment-id <id>` |

### Pillar 2: Reliability and Resilience
| Focus Area | Best Practice | CLI Verification |
|------------|---------------|------------------|
| High Availability | Deploy across multiple ADs | Check instance distribution |
| Backup Strategy | Configure automatic backups | `oci bv backup list --compartment-id <id>` |
| Disaster Recovery | Set up cross-region replication | `oci os replication-policy list` |
| Load Balancing | Use regional load balancers | `oci lb load-balancer list --compartment-id <id>` |

### Pillar 3: Performance and Cost Optimization
| Focus Area | Best Practice | CLI Verification |
|------------|---------------|------------------|
| Right-Sizing | Match instance shapes to workload | Review CPU/Memory utilization metrics |
| Reserved Capacity | Use committed pricing for predictable workloads | `oci limits value list` |
| Storage Tiers | Use appropriate storage classes | Check for overprovisioned volumes |
| Networking | Use Service Gateway for OCI services | `oci network service-gateway list` |

### Pillar 4: Operational Efficiency
| Focus Area | Best Practice | CLI Verification |
|------------|---------------|------------------|
| Infrastructure as Code | Use Terraform for all resources | Check for Resource Manager stacks |
| Monitoring | Set up alarms for critical metrics | `oci monitoring alarm list --compartment-id <id>` |
| Automation | Use OCI Events for automation | `oci events rule list --compartment-id <id>` |
| Tagging | Implement mandatory tagging | `oci iam tag-namespace list --compartment-id <id>` |

### Pillar 5: Distributed Cloud
| Focus Area | Best Practice | CLI Verification |
|------------|---------------|------------------|
| Multi-Region | Deploy critical workloads in multiple regions | Review region distribution |
| Hybrid Cloud | Use FastConnect for on-premises connectivity | `oci network fast-connect-provider-service list` |
| Edge | Use Content Delivery for global distribution | Check CDN configurations |

## CIS OCI Foundations Benchmark Controls

### Identity and Access Management
```bash
# 1.1 Ensure MFA is enabled for all users
oci iam user list --all --query "data[?\"is-mfa-activated\"==\`false\`].{Name:name,OCID:id}"

# 1.2 Ensure API keys rotate every 90 days
oci iam user api-key list --user-id <user-ocid> --query "data[?\"time-created\" < '\`date -v-90d +%Y-%m-%dT%H:%M:%S\`']"

# 1.3 Ensure no policies use "any-user"
oci iam policy list --compartment-id <tenancy-ocid> --all --query "data[?contains(statements[],'any-user')]"
```

### Networking
```bash
# 2.1 Ensure no security lists allow 0.0.0.0/0 ingress
oci network security-list list --compartment-id <id> --all --query "data[].{Name:\"display-name\",Rules:\"ingress-security-rules\"[?source=='0.0.0.0/0']}"

# 2.2 Ensure VCN Flow Logs are enabled
oci network flow-log list --compartment-id <id>

# 2.3 Ensure Service Gateway is used for OCI services
oci network service-gateway list --compartment-id <id>
```

### Logging and Monitoring
```bash
# 3.1 Ensure Audit Log retention is at least 365 days
# Audit logs are retained for 365 days by default and cannot be changed

# 3.2 Ensure Cloud Guard is enabled
oci cloud-guard target list --compartment-id <tenancy-ocid>

# 3.3 Ensure VCN Flow Logs are enabled for all subnets
oci network subnet list --compartment-id <id> --query "data[?!\"vcn-id\"]"
```

### Storage
```bash
# 4.1 Ensure Object Storage buckets are not public
oci os bucket list --compartment-id <id> --query "data[?\"public-access-type\"!='NoPublicAccess']"

# 4.2 Ensure boot volumes are encrypted with Customer-Managed Keys
oci bv boot-volume list --compartment-id <id> --query "data[?!\"kms-key-id\"]"

# 4.3 Ensure block volumes are encrypted with Customer-Managed Keys
oci bv volume list --compartment-id <id> --query "data[?!\"kms-key-id\"]"
```

## Quick Compliance Check Script

```bash
#!/bin/bash
# OCI Quick Compliance Check
COMPARTMENT_ID="$1"

echo "=== Security Checks ==="
echo "Public buckets:"
oci os bucket list --compartment-id $COMPARTMENT_ID --query "data[?\"public-access-type\"!='NoPublicAccess'].name" --output table

echo "Security lists with 0.0.0.0/0:"
oci network security-list list --compartment-id $COMPARTMENT_ID --all --query "data[].{Name:\"display-name\"}" --output table

echo "=== Reliability Checks ==="
echo "Instances without backups:"
# Compare instance list with backup list

echo "=== Cost Checks ==="
echo "Stopped instances (still incurring boot volume cost):"
oci compute instance list --compartment-id $COMPARTMENT_ID --lifecycle-state STOPPED --query "data[].{Name:\"display-name\",Shape:shape}" --output table
```

## Remediation Priority Matrix

| Finding | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Public S3 bucket | Critical | Low | P0 - Fix immediately |
| No MFA enabled | High | Low | P1 - Fix within 24h |
| Open 22/3389 to 0.0.0.0/0 | High | Low | P1 - Fix within 24h |
| No encryption at rest | High | Medium | P2 - Fix within 1 week |
| No backups configured | Medium | Low | P2 - Fix within 1 week |
| Missing tags | Low | Low | P3 - Fix within 1 month |
| Over-provisioned instances | Low | Medium | P3 - Fix within 1 month |
