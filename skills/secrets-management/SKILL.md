---
name: secrets-management
description: "Use when storing secrets in OCI Vault, debugging 401/403 secret retrieval errors, implementing secret rotation, configuring instance principal auth, or caching Vault API calls. Covers IAM dual-permission gotcha, vault hierarchy confusion, temp file security window, BASE64 encoding requirement, and cost optimization."
---

# OCI Vault and Secrets Management

## NEVER Do This

❌ **NEVER set temp key file permissions AFTER writing content**
```python
# WRONG - world-readable during write (security window exists)
with open('/tmp/key.pem', 'w') as f:
    f.write(private_key)
os.chmod('/tmp/key.pem', 0o600)  # Too late — race condition!

# RIGHT - secure BEFORE writing
fd = os.open('/tmp/key.pem', os.O_CREAT | os.O_WRONLY, 0o600)
with os.fdopen(fd, 'w') as f:
    f.write(private_key)
```

❌ **NEVER use overly broad IAM secret policies**
```
BAD:  "Allow any-user to read secret-family in tenancy"
BAD:  "Allow group Developers to manage secret-family in tenancy"
GOOD: "Allow dynamic-group app-prod to read secret-family in compartment AppSecrets
       where target.secret.name = 'db-*'"
```

❌ **NEVER retrieve secrets without caching**
- Cost: $0.03 per 10,000 requests (first 10k/month free)
- Without cache: 1000 req/hr × 24 × 30 = 720k/month = **$2.16/month**
- With 60-min cache: 24 calls/day = 720/month = **FREE** (98% cost reduction)

❌ **NEVER use PLAIN content type** — always use BASE64 encoding; PLAIN is deprecated and may fail in future API versions

❌ **NEVER hardcode Vault OCIDs in code** — store in environment variables; OCIDs leak to repos and aren't portable across tenancies

❌ **NEVER log secret contents** — even in debug/error messages; logs are retained in aggregation systems for years

## IAM Permission Gotcha (Critical)

Secret retrieval requires **BOTH** of these:
```
"Allow dynamic-group X to read secret-family in compartment Y"
"Allow dynamic-group X to use keys in compartment Y"
```

- `read secret-family` → list secrets and read metadata
- `use keys` → **decrypt secret content** (all secrets are encrypted with a master key)

**Without `use keys`**: Confusing 403 — "User not authorized to perform this operation." Hours of debugging because the error message doesn't mention key permissions.

## Vault Hierarchy (Often Confused)

```
Vault (container)
 └─ Master Encryption Key (for encryption/decryption)
     └─ Secret (encrypted data)
         └─ Secret Versions (rotation over time)
```

**Commands use different services — this trips everyone up:**
- Vault operations: `oci kms management vault ...`
- Key operations: `oci kms management key ... --endpoint <vault-management-endpoint>`
- Secret operations: `oci vault secret ...` (NOT `oci kms`!)

Common mistake: `oci vault-secret create` (no such command) vs `oci vault secret create` (correct)

## Secret Retrieval Error Decision Tree

```
Secret retrieval fails?
│
├─ 401 Unauthorized
│  ├─ On OCI compute? → Check dynamic group membership
│  ├─ Local dev? → Check ~/.oci/config, verify API key uploaded
│  └─ After rotation? → Cache has old credentials (wait for TTL)
│
├─ 403 Forbidden
│  ├─ Have "read secret-family"? → Add if missing
│  └─ Have "use keys"? → THIS IS USUALLY THE ISSUE
│
├─ 404 Not Found
│  ├─ Wrong OCID? → Verify env variable
│  ├─ Wrong compartment? → Secrets client must use secret's compartment
│  └─ Secret deleted? → Check vault for secret status
│
└─ 500 Internal Server Error
   └─ Vault rate limit → Retry with exponential backoff
```

## Secret Rotation (Zero-Downtime)

```bash
# WRONG - creates new OCID, breaks all running apps
oci vault secret delete --secret-id <secret-ocid>
oci vault secret create ...

# RIGHT - create new VERSION of existing secret (OCID unchanged)
oci vault secret update-base64 \
  --secret-id <secret-ocid> \
  --secret-content-content "$(echo -n 'new-value' | base64)"
```

Apps pick up new version on next cache refresh — no restart needed. Old version retained for rollback.

## Cache TTL Selection

| Security Requirements | Cache TTL | Reasoning |
|----------------------|-----------|-----------|
| High (rotate daily) | 5-15 min | 90%+ savings, frequent refresh |
| Standard (rotate monthly) | 30-60 min | Balance security and cost |
| Dev/Test | No cache | Always fresh |

**Rule**: Cache TTL must be **less than** secret rotation window.

## OCI-Specific Gotchas

**Vault management endpoint is required for key operations:**
```bash
# Find vault's management endpoint
oci kms management vault get --vault-id <vault-ocid> \
  --query 'data."management-endpoint"' --raw-output

# Required for all key commands
oci kms management key create ... \
  --endpoint https://xxxxx-management.kms.us-ashburn-1.oraclecloud.com
```

**Secret bundle requires explicit base64 decode:**
```python
secret_bundle = secrets_client.get_secret_bundle(secret_ocid)
encoded = secret_bundle.data.secret_bundle_content.content
decoded = base64.b64decode(encoded).decode('utf-8')  # Both steps required
```

**Not all OCI regions have Vault service** — check availability before designing architecture. Cross-region secret access adds 10-50ms latency.

## Instance Principal Auth (Production Pattern)

```bash
# 1. Create dynamic group
oci iam dynamic-group create \
  --name "app-instances" \
  --matching-rule "instance.compartment.id = '<compartment-ocid>'"

# 2. Grant Vault access (both policies required — see IAM gotcha above)
# "Allow dynamic-group app-instances to read secret-family in compartment Secrets"
# "Allow dynamic-group app-instances to use keys in compartment Secrets"

# 3. Application code — no credentials needed on instance
signer = oci.auth.signers.InstancePrincipalsSecurityTokenSigner()
secrets_client = oci.secrets.SecretsClient(config={}, signer=signer)
```

## Reference Files

**Load** [`references/oci-vault-reference.md`](references/oci-vault-reference.md) when you need:
- Comprehensive Vault/KMS API documentation
- HSM-backed key protection setup
- Cross-region secret replication
- Official Oracle guidance on Vault architecture
