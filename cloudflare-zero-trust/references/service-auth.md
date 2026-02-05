## Service Authentication (M2M / API Access)

**Use service tokens for automated systems and APIs** - no identity provider login required.

### When to Use Service Tokens

Use for:
- CI/CD pipelines accessing APIs
- Microservice-to-microservice communication
- Scheduled jobs and cron tasks
- Monitoring systems and health checks
- Infrastructure automation tools
- Any non-human authentication

**Don't use for:**
- User authentication (use SSO/OIDC instead)
- Interactive applications
- Any scenario with a human user

### How Service Tokens Work

1. **Generate token** in Cloudflare dashboard → Zero Trust → Access → Service Auth
2. **Receive Client ID + Client Secret** (ONLY shown once!)
3. **Add to HTTP headers:**
   ```
   CF-Access-Client-Id: <client-id>
   CF-Access-Client-Secret: <client-secret>
   ```
4. **Access evaluates** → Generates JWT → Grants access

### Creating Service Tokens

**Dashboard:**
1. **Zero Trust → Access → Service Auth → Create Service Token**
2. **Name:** `ci-cd-pipeline` (descriptive)
3. **Duration:** 1 year (or custom)
4. **Save Client ID and Secret** immediately (can't retrieve later)

**API:**
```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "CI Pipeline Token",
    "duration": "8760h"
  }'
```

**Response contains:**
```json
{
  "client_id": "abc123...",
  "client_secret": "def456...",  // SAVE THIS - won't be shown again
  "name": "CI Pipeline Token"
}
```

### Using Service Tokens

**Curl example:**
```bash
curl -H "CF-Access-Client-Id: abc123..." \
     -H "CF-Access-Client-Secret: def456..." \
     https://api.example.com/endpoint
```

**Python example:**
```python
import requests

headers = {
    "CF-Access-Client-Id": "abc123...",
    "CF-Access-Client-Secret": "def456..."
}

response = requests.get("https://api.example.com/endpoint", headers=headers)
```

**Node.js example:**
```javascript
const axios = require('axios');

const headers = {
  'CF-Access-Client-Id': process.env.CF_CLIENT_ID,
  'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET
};

const response = await axios.get('https://api.example.com/endpoint', { headers });
```

**Docker container:**
```yaml
services:
  api-consumer:
    image: myapp:latest
    environment:
      - CF_CLIENT_ID=${CF_CLIENT_ID}
      - CF_CLIENT_SECRET=${CF_CLIENT_SECRET}
```

### Configuring Service Auth Policies

**Service-only policy:**
```
Name: API Service Authentication
Action: Service Auth
Include: Service Token → ci-cd-pipeline
```

**Important:** Service Auth policy type accepts ONLY service tokens (no user login).

**Mixed policy (users OR service tokens):**
```
Policy 1: Allow Users
  Action: Allow
  Include: Email domains → @company.com

Policy 2: Allow Service Tokens
  Action: Service Auth
  Include: Service Token → ci-cd-pipeline
```

**Per-endpoint policies:**
```yaml
# In your application, check CF_Authorization cookie claims
# Service tokens have distinct claims:
{
  "type": "service_token",
  "sub": "abc123...",  // Client ID
  "aud": ["https://api.example.com"]
}
```

### Token Rotation Strategy

**Best practices:**
1. **Generate new token** before old expires
2. **Update consuming services** with new credentials
3. **Test** new token works
4. **Revoke old token** after grace period

**Rotation workflow:**
```bash
# 1. Create new token
curl -X POST ".../access/service_tokens" \
  --data '{"name": "ci-pipeline-2025-02", "duration": "8760h"}'

# 2. Update secrets in CI/CD
# GitHub: Settings → Secrets → Update CF_CLIENT_ID, CF_CLIENT_SECRET
# GitLab: Settings → CI/CD → Variables → Update

# 3. Test new token
curl -H "CF-Access-Client-Id: NEW_ID" \
     -H "CF-Access-Client-Secret: NEW_SECRET" \
     https://api.example.com/health

# 4. Revoke old token (after grace period)
curl -X DELETE ".../access/service_tokens/${OLD_TOKEN_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Automated rotation (recommended):**
- Rotate every 90 days
- Use secrets manager (AWS Secrets Manager, HashiCorp Vault, OCI Vault)
- Automate with Terraform or scripts

### Security Best Practices

**Storage:**
- ✅ **Store in environment variables or secrets manager**
- ✅ **Never commit to git**
- ✅ **Use secrets scanning** (GitHub secret scanning, GitGuardian)
- ❌ **Never hardcode in source**
- ❌ **Never log or print secrets**

**Scoping:**
- Create separate tokens per service (easier rotation, blast radius control)
- Use descriptive names: `github-actions-prod`, `jenkins-staging`
- Set shortest duration needed

**Monitoring:**
```bash
# Access authentication logs show service token usage
# Dashboard → Analytics → Access → Logs
# Filter by: Authentication Method = Service Token

# Look for:
# - Failed auth attempts (compromise indicator)
# - Unexpected source IPs
# - High request volume
```

**Revocation:**
```bash
# Immediate revocation if compromised
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens/${TOKEN_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Common Patterns

**CI/CD Pipeline (GitHub Actions):**
```yaml
name: Deploy API
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        env:
          CF_CLIENT_ID: ${{ secrets.CF_CLIENT_ID }}
          CF_CLIENT_SECRET: ${{ secrets.CF_CLIENT_SECRET }}
        run: |
          curl -H "CF-Access-Client-Id: $CF_CLIENT_ID" \
               -H "CF-Access-Client-Secret: $CF_CLIENT_SECRET" \
               https://api.example.com/deploy
```

**Kubernetes Job:**
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: api-sync
spec:
  template:
    spec:
      containers:
      - name: sync
        image: myapp:latest
        env:
        - name: CF_CLIENT_ID
          valueFrom:
            secretKeyRef:
              name: cloudflare-service-token
              key: client-id
        - name: CF_CLIENT_SECRET
          valueFrom:
            secretKeyRef:
              name: cloudflare-service-token
              key: client-secret
```

**Monitoring health check:**
```python
# health_check.py
import os
import requests
from datetime import datetime

def check_api():
    headers = {
        "CF-Access-Client-Id": os.environ["CF_CLIENT_ID"],
        "CF-Access-Client-Secret": os.environ["CF_CLIENT_SECRET"]
    }

    try:
        r = requests.get("https://api.example.com/health", headers=headers)
        r.raise_for_status()
        print(f"[{datetime.now()}] API healthy: {r.status_code}")
    except Exception as e:
        print(f"[{datetime.now()}] API unhealthy: {e}")
        # Alert on-call

if __name__ == "__main__":
    check_api()
```

### Troubleshooting Service Tokens

**"Access Denied" with service token:**
```bash
# Check token exists
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens" \
  -H "Authorization: Bearer ${API_TOKEN}"

# Check policy includes token
# Dashboard → Access → Applications → Your App → Policies
# Look for: Service Auth policy with token name

# Verify headers sent correctly
curl -v \
  -H "CF-Access-Client-Id: ${CLIENT_ID}" \
  -H "CF-Access-Client-Secret: ${CLIENT_SECRET}" \
  https://api.example.com/endpoint
# Look for: CF_Authorization cookie in response
```

**Token expired:**
```bash
# Check token expiration
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens/${TOKEN_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"

# Response includes:
{
  "expires_at": "2025-12-31T23:59:59Z"
}

# If expired, create new token (can't extend existing)
```

**Headers not reaching Access:**
```bash
# Check if application behind additional proxy
# Some proxies strip CF-Access-* headers

# Solution: Configure proxy to preserve headers
# nginx example:
proxy_set_header CF-Access-Client-Id $http_cf_access_client_id;
proxy_set_header CF-Access-Client-Secret $http_cf_access_client_secret;
```

