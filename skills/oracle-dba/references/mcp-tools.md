# Oracle MCP Server Tools Reference

Complete catalog of Oracle MCP server tools for AI-assisted database management.

## Oracle SQLcl MCP Server

The SQLcl MCP server enables AI agents to execute SQL and manage database connections.

### Installation

```bash
# Install via npx (requires SQLcl 25.1+)
npx @anthropics/model-context-protocol run oracle-sqlcl

# Or configure in MCP settings
{
  "mcpServers": {
    "oracle-sqlcl": {
      "command": "npx",
      "args": ["@anthropics/model-context-protocol", "run", "oracle-sqlcl"]
    }
  }
}
```

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `list-connections` | List all available database connections | None |
| `connect` | Connect to a database | `connection_name` (required) |
| `disconnect` | Disconnect from current database | None |
| `run-sql` | Execute SQL statement | `sql` (required) |
| `run-sqlcl` | Execute SQLcl command | `command` (required) |
| `schema-information` | Get schema metadata | `schema` (optional) |

### Usage Pattern

```
1. list-connections → Get available connections
2. connect → Establish connection
3. run-sql/run-sqlcl → Execute queries
4. disconnect → Clean up
```

### Example: Query Execution

```json
{
  "tool": "run-sql",
  "arguments": {
    "sql": "SELECT table_name, num_rows FROM user_tables ORDER BY num_rows DESC FETCH FIRST 5 ROWS ONLY"
  }
}
```

## Oracle Database MCP Server (100+ Tools)

Comprehensive database management capabilities.

### Installation

```bash
# Clone and install
git clone https://github.com/oracle-samples/oracle-mcp-servers.git
cd oracle-mcp-servers/database-mcp-server
npm install
npm run build
```

### Tool Categories

#### Schema Discovery

| Tool | Description |
|------|-------------|
| `list_schemas` | List all schemas in database |
| `list_tables` | List tables in a schema |
| `list_views` | List views in a schema |
| `list_columns` | List columns for a table |
| `list_indexes` | List indexes for a table |
| `list_constraints` | List constraints (PK, FK, UK, CHECK) |
| `list_procedures` | List stored procedures |
| `list_functions` | List stored functions |
| `list_packages` | List PL/SQL packages |
| `list_triggers` | List triggers |
| `list_sequences` | List sequences |
| `list_synonyms` | List synonyms |
| `list_types` | List user-defined types |

#### Query Execution

| Tool | Description |
|------|-------------|
| `execute_query` | Execute SELECT statement |
| `execute_dml` | Execute INSERT/UPDATE/DELETE |
| `execute_ddl` | Execute CREATE/ALTER/DROP |
| `execute_plsql` | Execute PL/SQL block |
| `explain_plan` | Get execution plan for query |
| `get_execution_stats` | Get query execution statistics |

#### Performance Analysis

| Tool | Description |
|------|-------------|
| `get_awr_report` | Generate AWR report |
| `get_addm_report` | Generate ADDM recommendations |
| `get_ash_report` | Generate ASH report |
| `list_top_sql` | List top SQL by various metrics |
| `list_wait_events` | List current wait events |
| `list_sessions` | List active sessions |
| `get_session_details` | Get details for a session |
| `list_locks` | List current locks |
| `list_blocking_sessions` | Find blocking sessions |

#### Security Management

| Tool | Description |
|------|-------------|
| `list_users` | List database users |
| `list_roles` | List roles |
| `list_privileges` | List privileges for user/role |
| `list_audit_policies` | List audit policies |
| `get_user_details` | Get user account details |

#### Backup and Recovery

| Tool | Description |
|------|-------------|
| `list_backups` | List database backups |
| `list_restore_points` | List restore points |
| `get_backup_status` | Get backup job status |
| `list_archived_logs` | List archived redo logs |

#### Space Management

| Tool | Description |
|------|-------------|
| `list_tablespaces` | List tablespaces |
| `get_tablespace_usage` | Get tablespace space usage |
| `list_datafiles` | List datafiles |
| `list_segments` | List segments (tables, indexes) |
| `get_segment_size` | Get segment size details |

#### Data Dictionary

| Tool | Description |
|------|-------------|
| `get_table_ddl` | Get CREATE TABLE statement |
| `get_index_ddl` | Get CREATE INDEX statement |
| `get_view_ddl` | Get CREATE VIEW statement |
| `get_procedure_ddl` | Get CREATE PROCEDURE source |
| `get_package_ddl` | Get CREATE PACKAGE source |

### Example: Performance Analysis

```json
{
  "tool": "list_top_sql",
  "arguments": {
    "metric": "elapsed_time",
    "limit": 10,
    "since_hours": 1
  }
}
```

## Oracle DB Documentation MCP Server

Search official Oracle documentation.

### Installation

```bash
cd oracle-mcp-servers/oracle-db-doc-mcp-server
npm install
npm run build
```

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_oracle_database_documentation` | Search Oracle docs | `query` (required), `max_results` (optional, default: 10) |

### Example: Documentation Search

```json
{
  "tool": "search_oracle_database_documentation",
  "arguments": {
    "query": "VECTOR_DISTANCE function syntax",
    "max_results": 5
  }
}
```

## OCI Database Tools MCP Server

Manage OCI Database Tools connections.

### Tools

| Tool | Description |
|------|-------------|
| `list_connections` | List Database Tools connections |
| `get_connection` | Get connection details |
| `create_connection` | Create new connection |
| `delete_connection` | Delete connection |
| `validate_connection` | Test connection |

## Best Practices

### Connection Management
- Always disconnect when done to free resources
- Use connection pooling for high-frequency operations
- Store credentials securely (OCI Vault, environment variables)

### Query Safety
- Use bind variables for all user input
- Validate SQL before execution in production
- Set appropriate timeouts for long-running queries

### Performance Monitoring
- Use AWR/ADDM tools for baseline analysis
- Monitor wait events for bottleneck identification
- Check top SQL regularly for optimization opportunities

### Security
- Use least-privilege accounts for MCP connections
- Enable unified auditing for MCP operations
- Rotate credentials periodically

## Troubleshooting

### Connection Failures
```bash
# Test connectivity
sql -L admin@adb_high

# Check TNS resolution
tnsping adb_high
```

### Permission Errors
```sql
-- Grant necessary privileges
GRANT SELECT ON v_$session TO mcp_user;
GRANT SELECT ON dba_tables TO mcp_user;
GRANT EXECUTE ON DBMS_WORKLOAD_REPOSITORY TO mcp_user;
```

### Timeout Issues
- Increase MCP server timeout configuration
- Optimize slow queries identified via explain plan
- Consider async execution for long-running operations
