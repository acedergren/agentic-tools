# Autonomous Database Security Reference

Comprehensive security configuration for Oracle Autonomous Database.

## Security Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                          │
├─────────────────────────────────────────────────────────────┤
│  Network Security    │ VCN, Private Endpoint, ACL, NSG     │
├─────────────────────────────────────────────────────────────┤
│  Identity & Access   │ IAM, Database Users, Roles          │
├─────────────────────────────────────────────────────────────┤
│  Data Protection     │ TDE, Data Redaction, Data Masking   │
├─────────────────────────────────────────────────────────────┤
│  Access Control      │ Database Vault, Label Security      │
├─────────────────────────────────────────────────────────────┤
│  Monitoring          │ Unified Audit, Data Safe, SQL Firewall│
└─────────────────────────────────────────────────────────────┘
```

## Transparent Data Encryption (TDE)

TDE is **automatically enabled** for all Autonomous Databases. All data at rest is encrypted using AES-256.

### Key Management Options

| Option | Description | Use Case |
|--------|-------------|----------|
| Oracle-managed | Oracle manages keys automatically | Default, simplest option |
| Customer-managed (OCI Vault) | Keys in OCI Vault | Compliance, key rotation control |
| Customer-managed (External) | Keys in external HSM | Enterprise key management |

### Configure Customer-Managed Keys

```bash
# Create OCI Vault key
oci kms management key create \
  --compartment-id $C \
  --display-name "adb-master-key" \
  --key-shape '{"algorithm":"AES","length":256}' \
  --endpoint $VAULT_ENDPOINT

# Associate key with ADB
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --kms-key-id $KEY_OCID \
  --vault-id $VAULT_OCID
```

### Rotate Encryption Keys

```sql
-- Check current key status
SELECT * FROM v$encryption_wallet;

-- Rotate TDE master key (automatic in ADB)
-- Triggered via OCI Console or API when using customer-managed keys
```

## Database Vault

Prevents privileged user access to application data.

### Enable Database Vault

```sql
-- Check if enabled
SELECT * FROM dba_dv_status;

-- Configure Database Vault owner and account manager
BEGIN
  DVSYS.DBMS_MACADM.ENABLE_DV(
    'C##DV_OWNER',
    'C##DV_ACCTMGR'
  );
END;
/

-- Restart required after enabling
```

### Create Realm

```sql
-- Create realm to protect schema
BEGIN
  DVSYS.DBMS_MACADM.CREATE_REALM(
    realm_name        => 'FINANCE_REALM',
    description       => 'Protect finance schema',
    enabled           => DVSYS.DBMS_MACUTL.G_YES,
    audit_options     => DVSYS.DBMS_MACUTL.G_REALM_AUDIT_FAIL,
    realm_type        => 0
  );
END;
/

-- Add objects to realm
BEGIN
  DVSYS.DBMS_MACADM.ADD_OBJECT_TO_REALM(
    realm_name   => 'FINANCE_REALM',
    object_owner => 'FINANCE',
    object_name  => '%',
    object_type  => '%'
  );
END;
/

-- Authorize users
BEGIN
  DVSYS.DBMS_MACADM.ADD_AUTH_TO_REALM(
    realm_name  => 'FINANCE_REALM',
    grantee     => 'FINANCE_APP',
    auth_options => DVSYS.DBMS_MACUTL.G_REALM_AUTH_OWNER
  );
END;
/
```

### Command Rules

```sql
-- Prevent DROP TABLE during business hours
BEGIN
  DVSYS.DBMS_MACADM.CREATE_COMMAND_RULE(
    command      => 'DROP TABLE',
    rule_set_name => 'BUSINESS_HOURS_RULE',
    object_owner  => 'FINANCE',
    object_name   => '%',
    enabled       => DVSYS.DBMS_MACUTL.G_YES
  );
END;
/
```

## Data Redaction

Mask sensitive data in real-time for unauthorized users.

### Redaction Policies

```sql
-- Full redaction (replace with fixed value)
BEGIN
  DBMS_REDACT.ADD_POLICY(
    object_schema       => 'HR',
    object_name         => 'EMPLOYEES',
    column_name         => 'SALARY',
    policy_name         => 'REDACT_SALARY',
    function_type       => DBMS_REDACT.FULL,
    expression          => 'SYS_CONTEXT(''USERENV'',''SESSION_USER'') != ''HR_ADMIN'''
  );
END;
/

-- Partial redaction (show last 4 digits)
BEGIN
  DBMS_REDACT.ADD_POLICY(
    object_schema       => 'HR',
    object_name         => 'EMPLOYEES',
    column_name         => 'SSN',
    policy_name         => 'REDACT_SSN',
    function_type       => DBMS_REDACT.PARTIAL,
    function_parameters => 'VVVVVVVVV,VVVVVVVVV,X,1,5',
    expression          => 'SYS_CONTEXT(''USERENV'',''SESSION_USER'') != ''HR_ADMIN'''
  );
END;
/

-- Regular expression redaction (mask email domain)
BEGIN
  DBMS_REDACT.ADD_POLICY(
    object_schema          => 'HR',
    object_name            => 'EMPLOYEES',
    column_name            => 'EMAIL',
    policy_name            => 'REDACT_EMAIL',
    function_type          => DBMS_REDACT.REGEXP,
    regexp_pattern         => '@.*',
    regexp_replace_string  => '@redacted.com',
    expression             => 'SYS_CONTEXT(''USERENV'',''SESSION_USER'') != ''HR_ADMIN'''
  );
END;
/
```

### Manage Redaction Policies

```sql
-- List policies
SELECT * FROM redaction_policies;
SELECT * FROM redaction_columns;

-- Disable policy
BEGIN
  DBMS_REDACT.ALTER_POLICY(
    object_schema => 'HR',
    object_name   => 'EMPLOYEES',
    policy_name   => 'REDACT_SALARY',
    action        => DBMS_REDACT.DISABLE
  );
END;
/

-- Drop policy
BEGIN
  DBMS_REDACT.DROP_POLICY(
    object_schema => 'HR',
    object_name   => 'EMPLOYEES',
    policy_name   => 'REDACT_SALARY'
  );
END;
/
```

## Label Security

Row-level security based on data classification labels.

### Configure Label Security

```sql
-- Create policy
BEGIN
  SA_SYSDBA.CREATE_POLICY(
    policy_name      => 'DOC_POLICY',
    column_name      => 'DOC_LABEL',
    default_options  => 'READ_CONTROL,WRITE_CONTROL'
  );
END;
/

-- Create levels
BEGIN
  SA_COMPONENTS.CREATE_LEVEL(
    policy_name => 'DOC_POLICY',
    level_num   => 10,
    short_name  => 'PUB',
    long_name   => 'PUBLIC'
  );
  SA_COMPONENTS.CREATE_LEVEL(
    policy_name => 'DOC_POLICY',
    level_num   => 20,
    short_name  => 'CONF',
    long_name   => 'CONFIDENTIAL'
  );
  SA_COMPONENTS.CREATE_LEVEL(
    policy_name => 'DOC_POLICY',
    level_num   => 30,
    short_name  => 'SEC',
    long_name   => 'SECRET'
  );
END;
/

-- Apply policy to table
BEGIN
  SA_POLICY_ADMIN.APPLY_TABLE_POLICY(
    policy_name   => 'DOC_POLICY',
    schema_name   => 'APP',
    table_name    => 'DOCUMENTS',
    table_options => 'READ_CONTROL,WRITE_CONTROL,LABEL_DEFAULT'
  );
END;
/

-- Set user label authorization
BEGIN
  SA_USER_ADMIN.SET_USER_LABELS(
    policy_name => 'DOC_POLICY',
    user_name   => 'APP_USER',
    max_level   => 'CONF'
  );
END;
/
```

## Unified Auditing

Centralized audit framework (enabled by default in ADB).

### Audit Policies

```sql
-- Create audit policy
CREATE AUDIT POLICY sensitive_data_access
  ACTIONS SELECT ON hr.employees,
          SELECT ON hr.salaries,
          UPDATE ON hr.salaries
  WHEN 'SYS_CONTEXT(''USERENV'',''SESSION_USER'') NOT IN (''HR_ADMIN'')'
  EVALUATE PER SESSION;

-- Enable policy
AUDIT POLICY sensitive_data_access;

-- Audit all DBA activities
AUDIT POLICY ORA_DBA_POLICY;

-- Audit schema changes
CREATE AUDIT POLICY schema_changes
  ACTIONS CREATE TABLE, ALTER TABLE, DROP TABLE,
          CREATE INDEX, DROP INDEX,
          CREATE VIEW, DROP VIEW;
AUDIT POLICY schema_changes;

-- Audit logon/logoff
AUDIT POLICY ORA_LOGON_FAILURES;
```

### Query Audit Trail

```sql
-- Recent audit events
SELECT event_timestamp, dbusername, action_name, object_schema, object_name,
       return_code, client_program_name
FROM unified_audit_trail
WHERE event_timestamp > SYSDATE - 1
ORDER BY event_timestamp DESC
FETCH FIRST 100 ROWS ONLY;

-- Failed login attempts
SELECT event_timestamp, dbusername, os_username, userhost,
       authentication_type, return_code
FROM unified_audit_trail
WHERE action_name = 'LOGON' AND return_code != 0
ORDER BY event_timestamp DESC;

-- Privileged user activity
SELECT event_timestamp, dbusername, action_name, sql_text
FROM unified_audit_trail
WHERE dbusername IN ('ADMIN', 'SYS')
ORDER BY event_timestamp DESC;
```

### Manage Audit Data

```sql
-- Check audit trail size
SELECT COUNT(*), ROUND(SUM(LENGTH(sql_text))/1024/1024,2) AS size_mb
FROM unified_audit_trail;

-- Archive old audit data (before purging)
CREATE TABLE audit_archive AS
SELECT * FROM unified_audit_trail
WHERE event_timestamp < SYSDATE - 90;

-- Purge audit trail (requires AUDIT_ADMIN role)
BEGIN
  DBMS_AUDIT_MGMT.CLEAN_AUDIT_TRAIL(
    audit_trail_type => DBMS_AUDIT_MGMT.AUDIT_TRAIL_UNIFIED,
    use_last_arch_timestamp => FALSE
  );
END;
/
```

## SQL Firewall (26ai+)

Protect against SQL injection and unauthorized SQL.

### Configure SQL Firewall

```sql
-- Enable SQL Firewall
BEGIN
  DBMS_SQL_FIREWALL.ENABLE;
END;
/

-- Start capture mode for user
BEGIN
  DBMS_SQL_FIREWALL.CREATE_CAPTURE(
    username     => 'APP_USER',
    top_level_only => TRUE,
    start_capture  => TRUE
  );
END;
/

-- Stop capture and generate allow list
BEGIN
  DBMS_SQL_FIREWALL.STOP_CAPTURE(username => 'APP_USER');
  DBMS_SQL_FIREWALL.GENERATE_ALLOW_LIST(username => 'APP_USER');
END;
/

-- Enable enforcement
BEGIN
  DBMS_SQL_FIREWALL.ENABLE_ALLOW_LIST(
    username => 'APP_USER',
    enforce  => DBMS_SQL_FIREWALL.ENFORCE_ALL,
    block    => TRUE
  );
END;
/
```

## Data Safe Integration

Oracle Data Safe provides centralized security management for ADB.

### Features
- **Security Assessment**: Evaluate database security posture
- **User Assessment**: Analyze user privileges and risks
- **Data Discovery**: Find sensitive data automatically
- **Data Masking**: Mask production data for dev/test
- **Activity Auditing**: Centralized audit collection

### Enable Data Safe

```bash
# Register ADB with Data Safe (OCI Console or CLI)
oci data-safe target-database create \
  --compartment-id $C \
  --database-details '{"autonomousDatabaseId":"'$ADB_ID'","databaseType":"AUTONOMOUS_DATABASE"}'
```

## User Management Best Practices

### Create Application User

```sql
-- Standard application user
CREATE USER app_user IDENTIFIED BY :password
  DEFAULT TABLESPACE data
  TEMPORARY TABLESPACE temp
  QUOTA UNLIMITED ON data;

-- Grant minimal privileges
GRANT CREATE SESSION TO app_user;
GRANT SELECT, INSERT, UPDATE ON app_schema.orders TO app_user;
GRANT EXECUTE ON app_schema.process_order TO app_user;

-- No direct table access - use views
CREATE VIEW app_user.orders_v AS
  SELECT order_id, customer_id, order_date, status
  FROM app_schema.orders
  WHERE customer_id = SYS_CONTEXT('APP_CTX', 'CUSTOMER_ID');

GRANT SELECT ON app_user.orders_v TO app_user;
```

### Password Policies

```sql
-- Create password profile
CREATE PROFILE app_profile LIMIT
  PASSWORD_LIFE_TIME 90
  PASSWORD_REUSE_TIME 365
  PASSWORD_REUSE_MAX 12
  PASSWORD_VERIFY_FUNCTION ora12c_strong_verify_function
  FAILED_LOGIN_ATTEMPTS 5
  PASSWORD_LOCK_TIME 1/24;

-- Apply to user
ALTER USER app_user PROFILE app_profile;
```

### Least Privilege Roles

```sql
-- Read-only role
CREATE ROLE read_only_role;
GRANT SELECT ANY TABLE TO read_only_role;
GRANT SELECT ON dba_tables TO read_only_role;

-- Developer role
CREATE ROLE developer_role;
GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW,
      CREATE PROCEDURE, CREATE SEQUENCE TO developer_role;

-- Assign roles
GRANT read_only_role TO report_user;
GRANT developer_role TO dev_user;
```

## Network Security

### Private Endpoint

```bash
# Configure private endpoint
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --subnet-id $PRIVATE_SUBNET_OCID \
  --nsg-ids '["'$NSG_OCID'"]'
```

### Access Control Lists

```bash
# Restrict to specific IPs
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --whitelisted-ips '["192.168.1.0/24","10.0.0.0/8"]'

# Allow VCN only
oci db autonomous-database update \
  --autonomous-database-id $ADB_ID \
  --is-access-control-enabled true \
  --are-primary-whitelisted-ips-used false
```

## Security Checklist

### Initial Setup
- [ ] Enable TDE with customer-managed keys (if required)
- [ ] Configure private endpoint
- [ ] Set up Access Control Lists
- [ ] Create application-specific users (not ADMIN)
- [ ] Enable unified auditing
- [ ] Register with Data Safe

### Ongoing Operations
- [ ] Review audit logs weekly
- [ ] Run security assessments monthly
- [ ] Rotate credentials quarterly
- [ ] Update ACLs when IPs change
- [ ] Review user privileges semi-annually
