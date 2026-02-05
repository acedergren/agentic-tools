# Cloudflare Zero Trust API Automation

**Complete API reference for automating Cloudflare Tunnel and Access via REST API.**

## Authentication

All requests require API token authentication:

```bash
# Token authentication (recommended)
curl -X GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/..." \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json"

# Legacy: API key + email (not recommended)
curl -X GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/..." \
  -H "X-Auth-Email: ${EMAIL}" \
  -H "X-Auth-Key: ${API_KEY}"
```

**API token scopes required:**
- Account → Zero Trust → Edit
- Account → Cloudflare Tunnel → Edit
- Zone → DNS → Edit (for tunnel DNS routes)

**Base URL:** `https://api.cloudflare.com/client/v4/`

**Rate limits:** 1200 requests per 5 minutes per token

---

## Access Applications API

### List Applications

```bash
GET /accounts/{account_id}/access/apps

# Example
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Response:**
```json
{
  "success": true,
  "result": [
    {
      "id": "abc123...",
      "name": "Internal Dashboard",
      "domain": "dashboard.example.com",
      "type": "self_hosted",
      "session_duration": "24h",
      "auto_redirect_to_identity": false,
      "enable_binding_cookie": false,
      "allowed_idps": [],
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-02-01T14:30:00Z"
    }
  ]
}
```

### Get Application

```bash
GET /accounts/{account_id}/access/apps/{app_id}

# Example
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Create Application

```bash
POST /accounts/{account_id}/access/apps

# Self-hosted application
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Internal API",
    "domain": "api.example.com",
    "type": "self_hosted",
    "session_duration": "24h",
    "auto_redirect_to_identity": true,
    "enable_binding_cookie": false,
    "allowed_idps": [],
    "cors_headers": {
      "enabled": true,
      "allowed_origins": ["https://app.example.com"],
      "allowed_methods": ["GET", "POST", "PUT", "DELETE"],
      "allow_credentials": true,
      "max_age": 3600
    }
  }'
```

**Key fields:**
- `type`: `"self_hosted"` or `"saas"` or `"ssh"` or `"vnc"` or `"app_launcher"`
- `session_duration`: `"15m"`, `"30m"`, `"6h"`, `"12h"`, `"24h"`, `"168h"` (1 week), `"730h"` (1 month)
- `auto_redirect_to_identity`: Skip Access landing page
- `enable_binding_cookie`: Bind session to browser
- `allowed_idps`: Empty array = all IdPs, or list specific IdP IDs

**SaaS application example:**
```json
{
  "name": "Salesforce",
  "type": "saas",
  "saas_app": {
    "consumer_service_url": "https://company.my.salesforce.com",
    "sp_entity_id": "https://company.my.salesforce.com",
    "name_id_format": "email"
  }
}
```

### Update Application

```bash
PUT /accounts/{account_id}/access/apps/{app_id}

# Update session duration
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "session_duration": "168h"
  }'
```

### Delete Application

```bash
DELETE /accounts/{account_id}/access/apps/{app_id}

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Revoke Application Tokens

**Force all users to re-authenticate:**

```bash
POST /accounts/{account_id}/access/apps/{app_id}/revoke_tokens

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/revoke_tokens" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Use case:** Security incident, credential compromise, policy changes

---

## Access Policies API

### List Policies

```bash
# List all reusable policies
GET /accounts/{account_id}/access/policies

# List policies for specific application
GET /accounts/{account_id}/access/apps/{app_id}/policies

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Get Policy

```bash
GET /accounts/{account_id}/access/policies/{policy_id}

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/policies/${POLICY_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Create Policy

```bash
POST /accounts/{account_id}/access/apps/{app_id}/policies

# Allow policy with email domain
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Allow Company Employees",
    "decision": "allow",
    "precedence": 1,
    "include": [
      {
        "email_domain": {
          "domain": "company.com"
        }
      }
    ]
  }'
```

**Policy structure:**

```json
{
  "name": "Policy Name",
  "decision": "allow",  // "allow", "deny", "non_identity", "bypass"
  "precedence": 1,       // Lower = higher priority
  "include": [],         // At least one must match
  "exclude": [],         // None can match (optional)
  "require": [],         // All must match (optional)
  "session_duration": "24h"  // Override app default (optional)
}
```

**Rule types in include/exclude/require:**

**Email:**
```json
{"email": {"email": "user@company.com"}}
```

**Email domain:**
```json
{"email_domain": {"domain": "company.com"}}
```

**Email list:**
```json
{"email_list": {"id": "list-id-123"}}
```

**Everyone:**
```json
{"everyone": {}}
```

**IP ranges:**
```json
{"ip": {"ip": "203.0.113.0/24"}}
```

**Azure AD group:**
```json
{"azureAD": {"id": "group-id", "connection_id": "idp-id"}}
```

**Okta group:**
```json
{"okta": {"name": "Developers", "connection_id": "idp-id"}}
```

**Generic OIDC group:**
```json
{"oidc": {"claim": "groups", "value": "admin", "connection_id": "idp-id"}}
```

**Service token:**
```json
{"service_token": {"token_id": "token-id-123"}}
```

**Country:**
```json
{"geo": {"country_code": "US"}}
```

**Device posture:**
```json
{"device_posture": {"integration_uid": "posture-rule-id"}}
```

**Authentication method (MFA):**
```json
{"auth_method": {"auth_method": "warp"}}  // or "mTLS", "swg", "hwk"
```

**Complete policy example:**
```json
{
  "name": "Allow Admins with MFA",
  "decision": "allow",
  "precedence": 1,
  "include": [
    {
      "azureAD": {
        "id": "admin-group-id",
        "connection_id": "azure-idp-id"
      }
    }
  ],
  "require": [
    {
      "auth_method": {"auth_method": "warp"}
    }
  ],
  "session_duration": "8h"
}
```

### Update Policy

```bash
PUT /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies/${POLICY_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "session_duration": "12h"
  }'
```

### Delete Policy

```bash
DELETE /accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies/${POLICY_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Reorder Policies (Change Precedence)

```bash
PUT /accounts/{account_id}/access/apps/{app_id}/policies/reorder

# Move policy to different precedence
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies/reorder" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "order": [
      "policy-id-1",  // Precedence 1
      "policy-id-3",  // Precedence 2
      "policy-id-2"   // Precedence 3
    ]
  }'
```

---

## Access Groups API

**Reusable groups for policies** - define once, use in multiple policies.

### List Groups

```bash
GET /accounts/{account_id}/access/groups

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/groups" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Get Group

```bash
GET /accounts/{account_id}/access/groups/{group_id}
```

### Create Group

```bash
POST /accounts/{account_id}/access/groups

# Create "Developers" group
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/groups" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Developers",
    "include": [
      {
        "email_domain": {"domain": "company.com"}
      }
    ],
    "exclude": [
      {
        "email": {"email": "contractor@company.com"}
      }
    ]
  }'
```

**Use group in policy:**
```json
{
  "include": [
    {"group": {"id": "group-id-123"}}
  ]
}
```

### Update Group

```bash
PUT /accounts/{account_id}/access/groups/{group_id}
```

### Delete Group

```bash
DELETE /accounts/{account_id}/access/groups/{group_id}
```

---

## Tunnel Management API

### List Tunnels

```bash
GET /accounts/{account_id}/cfd_tunnel

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Response:**
```json
{
  "success": true,
  "result": [
    {
      "id": "tunnel-uuid",
      "name": "prod-api-tunnel",
      "created_at": "2025-01-15T10:00:00Z",
      "connections": [
        {
          "colo_name": "IAD",
          "id": "connection-uuid",
          "is_pending_reconnect": false,
          "client_id": "client-uuid",
          "client_version": "2024.1.0",
          "opened_at": "2025-02-05T08:00:00Z",
          "origin_ip": "192.168.1.10"
        }
      ],
      "conns_active_at": "2025-02-05T10:30:00Z",
      "conns_inactive_at": null,
      "tun_type": "cfd_tunnel",
      "status": "healthy",
      "remote_config": false
    }
  ]
}
```

**Key fields:**
- `status`: `"healthy"`, `"degraded"`, `"down"`, `"inactive"`
- `remote_config`: `true` if dashboard-managed, `false` if config.yml
- `connections`: Active cloudflared replicas (max 4 per instance)

### Get Tunnel

```bash
GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Create Tunnel

```bash
POST /accounts/{account_id}/cfd_tunnel

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "api-tunnel",
    "tunnel_secret": "'$(openssl rand -base64 32)'"
  }'
```

**Response includes:**
```json
{
  "result": {
    "id": "tunnel-uuid",
    "name": "api-tunnel",
    "token": "eyJh...",  // Use this token with cloudflared
    "account_tag": "account-id"
  }
}
```

**Run tunnel with token:**
```bash
cloudflared tunnel run --token ${TOKEN}
```

### Update Tunnel

```bash
PATCH /accounts/{account_id}/cfd_tunnel/{tunnel_id}

# Rename tunnel
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "new-tunnel-name"
  }'
```

### Delete Tunnel

```bash
DELETE /accounts/{account_id}/cfd_tunnel/{tunnel_id}

# Force delete (even with active connections)
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}?cascade=true" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Note:** Set `cascade=true` to delete DNS records automatically

### Get Tunnel Configuration

```bash
GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/configurations" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Response:**
```json
{
  "result": {
    "tunnel_id": "tunnel-uuid",
    "version": 3,
    "config": {
      "ingress": [
        {
          "hostname": "api.example.com",
          "service": "http://localhost:8080"
        },
        {
          "service": "http_status:404"
        }
      ],
      "warp-routing": {
        "enabled": false
      }
    },
    "source": "cloudflare",
    "created_at": "2025-02-01T10:00:00Z"
  }
}
```

### Update Tunnel Configuration

```bash
PUT /accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations

# Update ingress rules
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/configurations" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "config": {
      "ingress": [
        {
          "hostname": "api.example.com",
          "service": "http://api-service:8080",
          "originRequest": {
            "connectTimeout": 30,
            "noTLSVerify": false,
            "keepAliveConnections": 100,
            "keepAliveTimeout": 90
          }
        },
        {
          "hostname": "admin.example.com",
          "service": "http://admin-service:3000"
        },
        {
          "service": "http_status:404"
        }
      ],
      "warp-routing": {
        "enabled": true
      }
    }
  }'
```

**Ingress rule fields:**
- `hostname`: Public domain (omit for catch-all)
- `service`: Origin URL (`http://`, `https://`, `tcp://`, `ssh://`, `rdp://`)
- `originRequest`: Optional tuning parameters

**originRequest parameters:**
```json
{
  "connectTimeout": 30,           // Seconds to connect to origin
  "tlsTimeout": 10,               // TLS handshake timeout
  "tcpKeepAlive": 30,            // TCP keepalive interval
  "noTLSVerify": false,          // Skip TLS verification (dev only!)
  "disableChunkedEncoding": false,
  "keepAliveConnections": 100,    // Connection pool size
  "keepAliveTimeout": 90,        // Idle connection timeout (seconds)
  "httpHostHeader": "example.com",
  "originServerName": "origin.internal",
  "caPool": "/path/to/ca.pem",
  "http2Origin": false           // Enable HTTP/2 to origin
}
```

**CRITICAL:** Configuration changes apply immediately to all tunnel replicas. No restart needed.

### List Tunnel Connections

**Monitor active cloudflared replicas:**

```bash
GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}/connections

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/connections" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Response:**
```json
{
  "result": [
    {
      "id": "connection-uuid",
      "colo_name": "IAD",
      "is_pending_reconnect": false,
      "client_id": "client-uuid",
      "client_version": "2024.1.0",
      "opened_at": "2025-02-05T08:00:00Z",
      "origin_ip": "192.168.1.10",
      "uuid": "cloudflared-instance-uuid"
    }
  ]
}
```

**Use for:**
- Health checks (expect 4 connections per running instance)
- Replica count monitoring
- Version auditing (check `client_version`)

### Clean Up Tunnel Connections

**Force disconnect stale connections:**

```bash
DELETE /accounts/{account_id}/cfd_tunnel/{tunnel_id}/connections

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/connections" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Use case:** Stuck connections, replica scaling down

---

## Service Tokens API

### List Service Tokens

```bash
GET /accounts/{account_id}/access/service_tokens

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Create Service Token

```bash
POST /accounts/{account_id}/access/service_tokens

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "CI Pipeline Token",
    "duration": "8760h"
  }'
```

**Response (SAVE IMMEDIATELY - only shown once):**
```json
{
  "result": {
    "id": "token-uuid",
    "name": "CI Pipeline Token",
    "client_id": "abc123...",
    "client_secret": "def456...",  // Never shown again!
    "expires_at": "2026-02-05T00:00:00Z",
    "created_at": "2025-02-05T10:00:00Z"
  }
}
```

**Duration options:** `"8760h"` (1 year), `"17520h"` (2 years), `"43800h"` (5 years)

### Get Service Token

```bash
GET /accounts/{account_id}/access/service_tokens/{token_id}
```

**Note:** Response does NOT include `client_secret`

### Update Service Token

```bash
PUT /accounts/{account_id}/access/service_tokens/{token_id}

# Extend duration
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens/${TOKEN_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "duration": "17520h"
  }'
```

### Refresh Service Token

**Rotate token (new client_secret generated):**

```bash
POST /accounts/{account_id}/access/service_tokens/{token_id}/refresh

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens/${TOKEN_ID}/refresh" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Response includes NEW client_secret (save immediately)**

### Delete Service Token

```bash
DELETE /accounts/{account_id}/access/service_tokens/{token_id}

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens/${TOKEN_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

---

## Identity Providers API

### List Identity Providers

```bash
GET /accounts/{account_id}/access/identity_providers

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/identity_providers" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Get Identity Provider

```bash
GET /accounts/{account_id}/access/identity_providers/{idp_id}
```

### Create Identity Provider

**Azure AD example:**
```bash
POST /accounts/{account_id}/access/identity_providers

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/identity_providers" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Azure AD",
    "type": "azureAD",
    "config": {
      "client_id": "azure-app-id",
      "client_secret": "azure-client-secret",
      "directory_id": "azure-tenant-id",
      "support_groups": true
    }
  }'
```

**Okta example:**
```json
{
  "name": "Okta",
  "type": "okta",
  "config": {
    "client_id": "okta-client-id",
    "client_secret": "okta-client-secret",
    "okta_account": "https://company.okta.com",
    "support_groups": true
  }
}
```

**Generic OIDC example:**
```json
{
  "name": "Custom OIDC",
  "type": "oidc",
  "config": {
    "client_id": "oidc-client-id",
    "client_secret": "oidc-client-secret",
    "auth_url": "https://provider.com/oauth2/authorize",
    "token_url": "https://provider.com/oauth2/token",
    "certs_url": "https://provider.com/.well-known/jwks.json",
    "scopes": ["openid", "email", "profile", "groups"]
  }
}
```

**Provider types:** `"azureAD"`, `"okta"`, `"google"`, `"github"`, `"oidc"`, `"saml"`, `"onelogin"`, `"centrify"`, `"linkedin"`, `"yandex"`

### Update Identity Provider

```bash
PUT /accounts/{account_id}/access/identity_providers/{idp_id}

# Rotate client secret
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/identity_providers/${IDP_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "config": {
      "client_secret": "new-secret"
    }
  }'
```

### Delete Identity Provider

```bash
DELETE /accounts/{account_id}/access/identity_providers/{idp_id}
```

---

## Analytics & Logs API

### Access Request Logs

```bash
GET /accounts/{account_id}/access/logs/access_requests

# Filter by time range
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/logs/access_requests?since=2025-02-01T00:00:00Z&until=2025-02-05T23:59:59Z" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Query parameters:**
- `since`: ISO 8601 timestamp (default: 1 hour ago)
- `until`: ISO 8601 timestamp (default: now)
- `limit`: Max records (default: 100, max: 1000)
- `page`: Pagination

**Response:**
```json
{
  "result": [
    {
      "user_email": "user@company.com",
      "app_uid": "app-uuid",
      "app_domain": "dashboard.example.com",
      "action": "login",
      "allowed": true,
      "created_at": "2025-02-05T10:30:00Z",
      "connection": "Azure AD",
      "country": "US",
      "ip_address": "203.0.113.10",
      "ray_id": "abc123..."
    }
  ],
  "result_info": {
    "count": 100,
    "page": 1,
    "per_page": 100,
    "total_count": 523
  }
}
```

### User Activity Summary

```bash
GET /accounts/{account_id}/access/users/{user_id}/active_sessions
```

### Access Analytics (Aggregated)

```bash
GET /accounts/{account_id}/access/analytics/access_requests

# Last 7 days aggregated by app
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/analytics/access_requests?since=2025-01-29&metrics=count&dimensions=appID" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

---

## Device Posture API

### List Posture Rules

```bash
GET /accounts/{account_id}/devices/posture

curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/devices/posture" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

### Create Posture Rule

**File exists check:**
```bash
POST /accounts/{account_id}/devices/posture

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/devices/posture" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Antivirus Running",
    "type": "file",
    "input": {
      "path": "/Applications/Antivirus.app",
      "exists": true,
      "operator": "=="
    },
    "match": [
      {"platform": "mac"}
    ]
  }'
```

**OS version check:**
```json
{
  "name": "macOS 13+ Required",
  "type": "os_version",
  "input": {
    "version": "13.0",
    "operator": ">="
  },
  "match": [
    {"platform": "mac"}
  ]
}
```

**Disk encryption check:**
```json
{
  "name": "Disk Encryption Enabled",
  "type": "disk_encryption",
  "input": {
    "enabled": true
  }
}
```

**Rule types:** `"file"`, `"os_version"`, `"disk_encryption"`, `"firewall"`, `"domain_joined"`, `"serial_number"`, `"client_certificate"`

### Update Posture Rule

```bash
PUT /accounts/{account_id}/devices/posture/{rule_id}
```

### Delete Posture Rule

```bash
DELETE /accounts/{account_id}/devices/posture/{rule_id}
```

---

## Common Workflows

### Workflow 1: Create Application + Policy

```bash
#!/bin/bash
set -e

# 1. Create application
APP_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Internal Dashboard",
    "domain": "dashboard.example.com",
    "type": "self_hosted",
    "session_duration": "24h"
  }')

APP_ID=$(echo $APP_RESPONSE | jq -r '.result.id')
echo "Created app: $APP_ID"

# 2. Create Allow policy
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps/${APP_ID}/policies" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "Allow Employees",
    "decision": "allow",
    "precedence": 1,
    "include": [
      {"email_domain": {"domain": "company.com"}}
    ]
  }'

echo "Policy created successfully"
```

### Workflow 2: Update Tunnel Ingress (Zero Downtime)

```bash
#!/bin/bash
set -e

# Get current configuration
CURRENT_CONFIG=$(curl -s "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/configurations" \
  -H "Authorization: Bearer ${API_TOKEN}")

# Update with new service
curl -s -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/configurations" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "config": {
      "ingress": [
        {"hostname": "api.example.com", "service": "http://api-v2:8080"},
        {"hostname": "admin.example.com", "service": "http://admin:3000"},
        {"service": "http_status:404"}
      ]
    }
  }'

echo "Tunnel configuration updated (no restart needed)"
```

### Workflow 3: Rotate Service Token

```bash
#!/bin/bash
set -e

# 1. Create new token
NEW_TOKEN=$(curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"name": "CI Pipeline v2", "duration": "8760h"}')

NEW_CLIENT_ID=$(echo $NEW_TOKEN | jq -r '.result.client_id')
NEW_CLIENT_SECRET=$(echo $NEW_TOKEN | jq -r '.result.client_secret')

echo "New token created: $NEW_CLIENT_ID"
echo "Secret (save now): $NEW_CLIENT_SECRET"

# 2. Update CI/CD secrets
# (Manual step or via CI/CD API)

# 3. Test new token
curl -H "CF-Access-Client-Id: $NEW_CLIENT_ID" \
     -H "CF-Access-Client-Secret: $NEW_CLIENT_SECRET" \
     https://api.example.com/health

# 4. Delete old token after grace period
# curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/service_tokens/${OLD_TOKEN_ID}" \
#   -H "Authorization: Bearer ${API_TOKEN}"
```

---

## Error Handling

**Standard error response:**
```json
{
  "success": false,
  "errors": [
    {
      "code": 1000,
      "message": "Invalid tunnel configuration"
    }
  ],
  "messages": [],
  "result": null
}
```

**Common error codes:**
- `1000`: Invalid request
- `1001`: Rate limit exceeded
- `1002`: Authentication failed
- `1003`: Insufficient permissions
- `1004`: Resource not found
- `1005`: Resource already exists
- `10000`: Internal server error

**Rate limit headers:**
```
X-RateLimit-Limit: 1200
X-RateLimit-Remaining: 1150
X-RateLimit-Reset: 1644077400
```

**Retry strategy:**
```bash
#!/bin/bash
MAX_RETRIES=3
RETRY_DELAY=5

for i in $(seq 1 $MAX_RETRIES); do
  RESPONSE=$(curl -s -w "\n%{http_code}" "${URL}" -H "Authorization: Bearer ${API_TOKEN}")
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | head -n-1)

  if [ "$HTTP_CODE" = "200" ]; then
    echo "$BODY"
    exit 0
  elif [ "$HTTP_CODE" = "429" ]; then
    echo "Rate limited, retrying in ${RETRY_DELAY}s..." >&2
    sleep $RETRY_DELAY
  else
    echo "Error $HTTP_CODE: $BODY" >&2
    exit 1
  fi
done

echo "Max retries exceeded" >&2
exit 1
```

---

## Pagination

**List endpoints support pagination:**

```bash
# Page 1
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps?page=1&per_page=50" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

**Response includes pagination info:**
```json
{
  "result": [...],
  "result_info": {
    "page": 1,
    "per_page": 50,
    "count": 50,
    "total_count": 123,
    "total_pages": 3
  }
}
```

**Fetch all pages:**
```bash
#!/bin/bash
PAGE=1
while true; do
  RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps?page=${PAGE}&per_page=100" \
    -H "Authorization: Bearer ${API_TOKEN}")

  echo "$RESPONSE" | jq -r '.result[]'

  TOTAL_PAGES=$(echo "$RESPONSE" | jq -r '.result_info.total_pages')
  if [ "$PAGE" -ge "$TOTAL_PAGES" ]; then
    break
  fi

  PAGE=$((PAGE + 1))
done
```

---

## Best Practices

### 1. Use Specific API Tokens

**Don't use Global API Key** - create tokens with minimum required permissions:

```
Account → Zero Trust → Edit
Zone → DNS → Edit (if managing DNS routes)
```

### 2. Store Secrets Securely

```bash
# Environment variables
export CLOUDFLARE_API_TOKEN="..."
export CLOUDFLARE_ACCOUNT_ID="..."

# Or secrets manager
aws secretsmanager get-secret-value --secret-id cloudflare/api-token
```

### 3. Handle Rate Limits

- 1200 requests per 5 minutes per token
- Implement exponential backoff
- Cache responses when possible

### 4. Version Control Configuration

```bash
# Export current configuration
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/access/apps" \
  -H "Authorization: Bearer ${API_TOKEN}" | jq > access-apps-backup.json

# Commit to git
git add access-apps-backup.json
git commit -m "Backup Access configuration"
```

### 5. Test in Staging First

```bash
# Staging account
ACCOUNT_ID="staging-account-id" ./deploy-access-config.sh

# Verify
curl https://staging.example.com

# Then production
ACCOUNT_ID="prod-account-id" ./deploy-access-config.sh
```

### 6. Audit Logging

```bash
# Daily backup of access logs
0 2 * * * /scripts/backup-access-logs.sh
```

---

## SDK Libraries

**Official SDKs:**

**Python:**
```python
from cloudflare import Cloudflare

client = Cloudflare(api_token="your-token")

# List tunnels
tunnels = client.zero_trust.tunnels.list(account_id="account-id")

# Create application
app = client.zero_trust.access.applications.create(
    account_id="account-id",
    name="Internal App",
    domain="app.example.com",
    type="self_hosted"
)
```

**Node.js:**
```javascript
import Cloudflare from 'cloudflare';

const cf = new Cloudflare({apiToken: 'your-token'});

// List applications
const apps = await cf.zeroTrust.access.applications.list({
  account_id: 'account-id'
});

// Create policy
await cf.zeroTrust.access.policies.create({
  account_id: 'account-id',
  app_id: 'app-id',
  name: 'Allow Employees',
  decision: 'allow',
  include: [{email_domain: {domain: 'company.com'}}]
});
```

**Go:**
```go
import "github.com/cloudflare/cloudflare-go"

api, _ := cloudflare.NewWithAPIToken("your-token")

// List tunnels
tunnels, _ := api.ListTunnels(ctx, cloudflare.AccountIdentifier("account-id"))

// Create service token
token, _ := api.CreateAccessServiceToken(ctx, cloudflare.AccountIdentifier("account-id"), cloudflare.CreateAccessServiceTokenParams{
    Name: "CI Token",
    Duration: "8760h",
})
```

---

## Additional Resources

- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [Zero Trust API Reference](https://developers.cloudflare.com/api/resources/zero_trust/)
- [API Token Permissions](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
- [Rate Limiting](https://developers.cloudflare.com/fundamentals/api/reference/limits/)
