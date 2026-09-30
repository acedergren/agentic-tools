---
name: secrets-management
description: "Use when the user asks to \"store OCI secrets\", \"rotate Vault secrets\", \"debug secret retrieval 403\", \"use instance principals for Vault\", or \"Terraform state secret\"."
version: 2.0.0
keywords:
  - "OCI"
  - "Vault"
  - "Secret Management"
  - "KMS"
  - "BASE64"
  - "secret rotation"
  - "automatic generation"
  - "replication"
  - "dynamic group"
  - "instance principal"
  - "Terraform state"
  - "sensitive"
  - "wallet"
aliases:
  - "oci-secrets"
  - "oci-vault"
domains:
  - "oci"
  - "security"
---
# OCI Vault and Secrets Management

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.

## When to Use

Load this skill for: the user asks to "store OCI secrets", "rotate Vault secrets", "debug secret retrieval 403", "use instance principals for Vault", "replicate secrets", or "Terraform state secret".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `oci/best-practices` as the router.

## NEVER Do This

❌ **NEVER set temp key file permissions AFTER writing content**
```python
# WRONG - world-readable during write (security window exists)
with open('/tmp/key.pem', 'w') as f:
    f.write(private_key)
os.chmod('/tmp/key.pem', 0o600)  # Too late — race condition!

# RIGHT - secure BEFORE writing
fd = os.open('/tmp/key.pem', os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)  # EXCL: never reuse an existing file
with os.fdopen(fd, 'w') as f:
    f.write(private_key)
```

❌ **NEVER use overly broad IAM secret policies**
```
BAD:  "Allow any-user to read secret-family in tenancy"
BAD:  "Allow group Developers to manage secret-family in tenancy"
GOOD: "Allow dynamic-group app-prod to read secret-bundles in compartment AppSecrets
       where target.secret.name = /db-*/"
# Pattern matches use /.../; a quoted 'db-*' only matches a secret literally named db-*
```

❌ **NEVER retrieve secrets without a cache or refresh strategy**
- The Oracle price list has no SKU for secrets (vault keys and private vaults are billed; checked 2026-09-30), so cache for latency, resilience, throttling, and blast-radius control rather than request-cost savings.
- Keep TTL shorter than the rotation detection window.
- Force refresh on authentication failures that may indicate rotated downstream credentials.

❌ **NEVER confuse Console plaintext with API payload encoding** — Console plaintext entry is encoded before submission; API/SDK automation should send BASE64 secret content explicitly.

❌ **NEVER assume Vault prevents Terraform state leakage** — Terraform can still store secret values, generated passwords, wallets, private keys, or sensitive outputs in state and plan files. For Terraform work, pass secret OCIDs and let workloads retrieve secrets at runtime unless state exposure is explicitly accepted and protected.

❌ **NEVER hardcode Vault OCIDs in code** — store in environment variables; OCIDs leak to repos and aren't portable across tenancies

❌ **NEVER log secret contents** — even in debug/error messages; logs are retained in aggregation systems for years

## IAM Permissions (what retrieval actually needs)

`GetSecretBundle` / `GetSecretBundleByName` require only `SECRET_BUNDLE_READ`, which is granted by
`read secret-bundles` (also included in `read secret-family`). The caller does **not** need `use keys`
to read a secret; Vault decrypts on the service side.
```
# Runtime reader (least privilege)
Allow dynamic-group 'Default'/'app-prod' to read secret-bundles in compartment AppSecrets

# Secret administrators — CreateSecret needs KEY_ENCRYPT/KEY_DECRYPT (use keys) and VAULT_CREATE_SECRET (use vaults)
Allow group 'Default'/'SecretAdmins' to manage secret-family in compartment AppSecrets
Allow group 'Default'/'SecretAdmins' to use keys in compartment AppSecrets
Allow group 'Default'/'SecretAdmins' to use vaults in compartment AppSecrets
```
`secret-family` = `secrets`, `secret-versions`, `secret-bundles`.

## Vault Hierarchy (Often Confused)

```
Vault (container)
 └─ Master Encryption Key (for encryption/decryption)
     └─ Secret (encrypted data)
         └─ Secret Versions (rotation over time)
```

**Commands use different CLI services — this trips everyone up:**
- Vault operations: `oci kms management vault ...`
- Key operations: `oci kms management key ... --endpoint <vault-management-endpoint>`
- Secret management: `oci vault secret create-base64 | update-base64 | list | get | schedule-secret-deletion`
- Secret *retrieval*: `oci secrets secret-bundle get --secret-id <ocid>` (a separate `secrets` service)

`oci vault secret` has no plain `create` or `delete` subcommand; use `create-base64` and
`schedule-secret-deletion`.

## Secret Retrieval Error Decision Tree

```
Secret retrieval fails?
│
├─ 401 NotAuthenticated
│  ├─ Local dev? → ~/.oci/config profile, key fingerprint uploaded, clock skew
│  └─ Instance/resource principal? → SDK signer not configured for principals
│
├─ 404 NotAuthorizedOrNotFound (the usual symptom of a missing policy)
│  ├─ Is the caller in the dynamic group? (check the rule vs instance compartment/tags)
│  ├─ Is there "read secret-bundles" (or read secret-family) on the secret's compartment?
│  ├─ Condition on target.secret.name correct? (/pattern*/, not 'pattern*')
│  └─ Right OCID and region? Secret scheduled for deletion?
│
└─ 429 TooManyRequests
   └─ Throttled → cache secrets, retry with exponential backoff and jitter
```

## Secret Rotation (Zero-Downtime)

```bash
# WRONG - a new secret gets a new OCID, breaking every app that references the old one
oci vault secret schedule-secret-deletion --secret-id <secret-ocid>
oci vault secret create-base64 ...

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

**Secret Management is available in OCI commercial regions** — still verify special realms, sovereign regions, and cross-region replication requirements before designing architecture.

**Use managed lifecycle features where possible:**
- Automatic secret generation can reduce password-handling code.
- Automatic rotation supports service-managed rotation for supported targets.
- Cross-region replication can copy a secret to up to three destination regions for DR and locality.

## Instance Principal Auth (Production Pattern)

```bash
# 1. Create dynamic group
oci iam dynamic-group create \
  --name "app-instances" \
  --matching-rule "instance.compartment.id = '<compartment-ocid>'"

# 2. Grant read access to secret contents (no key permission needed for reads)
# "Allow dynamic-group 'Default'/'app-instances' to read secret-bundles in compartment Secrets"

# 3. Application code — no credentials needed on instance
signer = oci.auth.signers.InstancePrincipalsSecurityTokenSigner()
secrets_client = oci.secrets.SecretsClient(config={}, signer=signer)
```

Last verified: 2026-09-30 (docs.oracle.com Vault policy reference; OCI CLI 3.94.1; Oracle price list API)

## Reference Files

**Load** [`references/oci-vault-reference.md`](references/oci-vault-reference.md) only when you need current Oracle documentation anchors for Vault/KMS, BASE64 secret content, automatic generation, rotation, promotion, or cross-region replication. Use the links in the reference instead of loading broad external docs.

**Load** [`../infrastructure-as-code/references/oci-terraform-secrets-state.md`](../infrastructure-as-code/references/oci-terraform-secrets-state.md) when Terraform may write passwords, wallets, private keys, Vault secret content, stack variables, or sensitive outputs to state.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
