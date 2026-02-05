
## Audit Logging & Compliance

**Monitor who accessed what, when** - compliance, security, forensics.

### Access Authentication Logs

**Every authentication attempt is logged:**
- User email/ID
- Application accessed
- IP address and location
- Success or failure
- Authentication method (SSO, email OTP, service token)
- Device information (if WARP)
- Timestamp

**View in Dashboard:**
1. **Zero Trust → Analytics → Access → Logs**
2. **Filter by:**
   - Application
   - User
   - Decision (allow/deny)
   - Time range

### Logpush to SIEM

**Export logs to external systems** - required for compliance.

**Supported destinations:**
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
- Splunk
- Datadog
- Sumo Logic
- HTTP endpoint (custom SIEM)

**Setup via Dashboard:**
1. **Logs → Logpush**
2. **Create job → Zero Trust**
3. **Select dataset:** Access requests
4. **Configure destination**
5. **Enable**

**Setup via API:**
```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/logpush/jobs" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "access-logs-to-s3",
    "logpull_options": "fields=ClientIP,UserEmail,Application,Decision,Timestamp",
    "destination_conf": "s3://my-bucket/access-logs?region=us-east-1",
    "dataset": "access_requests",
    "enabled": true
  }'
```

**Log format (JSON):**
```json
{
  "ClientIP": "203.0.113.10",
  "UserEmail": "user@company.com",
  "Application": "https://app.company.com",
  "Decision": "allow",
  "AuthMethod": "azure_ad",
  "DeviceID": "abc-123-def",
  "Country": "US",
  "Timestamp": "2025-02-05T10:30:00Z",
  "SessionDuration": "24h"
}
```

### Log Retention

**Dashboard:**
- **Free plans:** 24 hours
- **Paid plans:** 6 months

**Logpush:**
- Indefinite retention (you control storage)
- **Enterprise:** Can access up to 18 months via API even without Logpush

**Compliance note:** For SOC2, HIPAA, ISO 27001 - enable Logpush immediately.

### Common Log Queries

**Failed authentication attempts:**
```sql
-- Splunk query
index=cloudflare sourcetype=access_logs Decision=deny
| stats count by UserEmail, ClientIP
| where count > 5

-- Look for:
-- - Brute force attempts (same user, many failures)
-- - Compromised credentials (unusual IPs)
```

**Service token usage:**
```sql
-- Splunk
index=cloudflare AuthMethod=service_token
| stats count by Application, ClientIP
| timechart span=1h count by Application

-- Monitor for:
-- - Unexpected service token usage
-- - High request rates (API abuse)
-- - Unusual source IPs
```

**Geographic anomalies:**
```sql
-- User logging in from unusual country
index=cloudflare
| stats values(Country) as Countries by UserEmail
| where mvcount(Countries) > 3

-- Alert if user appears in multiple countries within short timeframe
```

### Compliance Reports

**Access Report (who accessed what):**
```bash
# Get access logs for last 30 days
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/logs/access_requests?since=2025-01-05T00:00:00Z" \
  -H "Authorization: Bearer ${API_TOKEN}"

# Generate CSV report
jq -r '["User","Application","Time","Decision","IP"], (.result[] | [.user_email, .app_domain, .created_at, .action, .ip_address]) | @csv' \
  access-logs.json > access-report.csv
```

**Failed Authentication Report:**
```bash
# Filter for failed attempts
jq '.result[] | select(.action == "block")' access-logs.json > failed-auth.json

# Group by user
jq -r 'group_by(.user_email) | .[] | "\(.[0].user_email): \(length) failures"' \
  failed-auth.json
```

**Service Token Audit:**
```bash
# List all service tokens
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens" \
  -H "Authorization: Bearer ${API_TOKEN}"

# Check for expired or unused tokens
# Review token names for clarity
# Rotate tokens >90 days old
```

### SIEM Integration Patterns

**Splunk:**
```conf
# inputs.conf
[http://cloudflare_access]
sourcetype = cloudflare:access
index = cloudflare
```

```spl
# Dashboard query
index=cloudflare sourcetype=cloudflare:access
| stats count by Decision
| eval status=if(Decision=="allow", "success", "failure")
| timechart span=1h count by status
```

**Datadog:**
```yaml
# datadog.yaml
logs:
  - type: s3
    bucket: my-cloudflare-logs
    path: access-logs/
    service: cloudflare-access
    source: cloudflare
```

**Elastic (ELK):**
```json
{
  "logstash_config": {
    "input": {
      "s3": {
        "bucket": "my-cloudflare-logs",
        "region": "us-east-1",
        "prefix": "access-logs/"
      }
    },
    "filter": {
      "json": {
        "source": "message"
      }
    },
    "output": {
      "elasticsearch": {
        "hosts": ["localhost:9200"],
        "index": "cloudflare-access-%{+YYYY.MM.dd}"
      }
    }
  }
}
```

### Alerting Patterns

**Critical alerts:**
1. **Multiple failed auth attempts** (brute force)
2. **Service token used from unexpected IP**
3. **Access from blocked country**
4. **Privileged application accessed**
5. **Service token nearing expiration**

**Example alert (PagerDuty):**
```bash
# Splunk alert action
index=cloudflare Decision=deny
| stats count by UserEmail
| where count > 10
| sendalert pagerduty param.description="Possible brute force: $UserEmail$"
```

### Compliance Checklists

**SOC 2:**
- ✅ Enable Logpush to immutable storage
- ✅ Require MFA for all users
- ✅ Log retention >1 year
- ✅ Quarterly access reviews
- ✅ Alert on failed auth attempts

**HIPAA:**
- ✅ Encrypt logs in transit and at rest
- ✅ Access control policies documented
- ✅ Audit log integrity checks
- ✅ User activity monitoring
- ✅ Breach notification procedures

**ISO 27001:**
- ✅ Access control policy (A.9)
- ✅ Logging and monitoring (A.12.4)
- ✅ Incident management (A.16)
- ✅ Regular access reviews

---
