# SQL & PLSQL Patterns for Autonomous Database

Optimized SQL patterns and PLSQL best practices for Oracle ADB.

## SQL Best Practices

### Always Use Bind Variables

```sql
-- ✅ CORRECT: Bind variables
SELECT * FROM users WHERE id = :user_id;
SELECT * FROM orders WHERE created_at > :start_date;
UPDATE inventory SET quantity = :qty WHERE product_id = :pid;

-- ❌ WRONG: String concatenation (SQL injection risk)
SELECT * FROM users WHERE id = '${userId}';
EXECUTE IMMEDIATE 'SELECT * FROM users WHERE id = ''' || v_id || '''';
```

### Oracle-Specific Syntax

```sql
-- Use FETCH FIRST (not LIMIT)
SELECT * FROM orders ORDER BY created_at DESC FETCH FIRST 10 ROWS ONLY;

-- With offset (pagination)
SELECT * FROM orders ORDER BY created_at DESC
OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;

-- Use NVL/COALESCE for nulls
SELECT NVL(nickname, first_name) AS display_name FROM users;
SELECT COALESCE(phone_mobile, phone_home, phone_work) AS contact FROM users;

-- Use SYS_GUID() for UUIDs
INSERT INTO orders (id, customer_id) VALUES (SYS_GUID(), :customer_id);

-- String concatenation with ||
SELECT first_name || ' ' || last_name AS full_name FROM users;
```

### Date Operations

```sql
-- Current timestamp
SELECT SYSTIMESTAMP FROM dual;
SELECT CURRENT_TIMESTAMP FROM dual;  -- Session timezone

-- Date arithmetic
SELECT order_date + 7 AS delivery_date FROM orders;  -- Add 7 days
SELECT order_date + INTERVAL '2' HOUR FROM orders;   -- Add 2 hours

-- Date formatting
SELECT TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') FROM events;
SELECT TO_DATE('2024-01-15', 'YYYY-MM-DD') FROM dual;
SELECT TO_TIMESTAMP('2024-01-15 10:30:00', 'YYYY-MM-DD HH24:MI:SS') FROM dual;

-- Date truncation
SELECT TRUNC(order_date) AS order_day FROM orders;           -- Day
SELECT TRUNC(order_date, 'MM') AS order_month FROM orders;   -- Month
SELECT TRUNC(order_date, 'Q') AS order_quarter FROM orders;  -- Quarter

-- Date ranges
SELECT * FROM orders
WHERE created_at BETWEEN :start_date AND :end_date;

SELECT * FROM orders
WHERE created_at >= TRUNC(SYSDATE) - 30;  -- Last 30 days
```

### JSON Operations

```sql
-- JSON column definition
CREATE TABLE documents (
  id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
  data CLOB CHECK (data IS JSON)
);

-- Insert JSON
INSERT INTO documents (data) VALUES ('{"name": "John", "age": 30}');

-- Query JSON values
SELECT JSON_VALUE(data, '$.name') AS name FROM documents;
SELECT JSON_VALUE(data, '$.age' RETURNING NUMBER) AS age FROM documents;

-- JSON query (returns JSON)
SELECT JSON_QUERY(data, '$.address') FROM documents;

-- JSON exists
SELECT * FROM documents WHERE JSON_EXISTS(data, '$.premium');

-- JSON table (unnest arrays)
SELECT d.id, jt.item_name, jt.quantity
FROM documents d,
     JSON_TABLE(d.data, '$.items[*]'
       COLUMNS (
         item_name VARCHAR2(100) PATH '$.name',
         quantity NUMBER PATH '$.qty'
       )
     ) jt;

-- Update JSON
UPDATE documents
SET data = JSON_TRANSFORM(data, SET '$.status' = 'active')
WHERE id = :id;

-- JSON Duality Views (23ai+)
CREATE JSON RELATIONAL DUALITY VIEW orders_dv AS
  SELECT JSON {
    '_id': o.order_id,
    'customer': c.customer_name,
    'items': [
      SELECT JSON {'product': p.name, 'qty': oi.quantity}
      FROM order_items oi, products p
      WHERE oi.order_id = o.order_id AND oi.product_id = p.product_id
    ]
  }
  FROM orders o, customers c
  WHERE o.customer_id = c.customer_id;
```

## AI Vector Search (23ai+)

### Vector Column Definition

```sql
-- Create table with vector column
CREATE TABLE documents (
  id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
  content CLOB,
  embedding VECTOR(1024, FLOAT32)
);

-- Create vector index
CREATE VECTOR INDEX doc_embedding_idx ON documents(embedding)
  ORGANIZATION NEIGHBOR PARTITIONS
  DISTANCE COSINE
  WITH TARGET ACCURACY 95;
```

### Vector Similarity Search

```sql
-- Basic similarity search
SELECT id, content,
       VECTOR_DISTANCE(embedding, :query_embedding, COSINE) AS score
FROM documents
ORDER BY score
FETCH FIRST 10 ROWS ONLY;

-- With threshold
SELECT id, content,
       VECTOR_DISTANCE(embedding, :query_embedding, COSINE) AS score
FROM documents
WHERE VECTOR_DISTANCE(embedding, :query_embedding, COSINE) < 0.5
ORDER BY score
FETCH FIRST 10 ROWS ONLY;

-- Hybrid search (vector + keyword)
SELECT id, content,
       (0.6 * vector_score + 0.4 * text_score) AS combined_score
FROM (
  SELECT id, content,
         VECTOR_DISTANCE(embedding, :query_embedding, COSINE) AS vector_score,
         CASE WHEN CONTAINS(content, :keywords, 1) > 0 THEN SCORE(1) ELSE 0 END AS text_score
  FROM documents
  WHERE CONTAINS(content, :keywords, 1) > 0
     OR VECTOR_DISTANCE(embedding, :query_embedding, COSINE) < 0.7
)
ORDER BY combined_score
FETCH FIRST 10 ROWS ONLY;
```

### Generate Embeddings with DBMS_VECTOR

```sql
-- Generate embedding using OCI GenAI
DECLARE
  v_embedding VECTOR;
BEGIN
  v_embedding := DBMS_VECTOR.UTL_TO_EMBEDDING(
    'This is the text to embed',
    JSON('{"provider":"oci", "model":"cohere.embed-english-v3.0"}')
  );
  -- Use v_embedding...
END;
/

-- Batch embedding generation
INSERT INTO documents (content, embedding)
SELECT content,
       DBMS_VECTOR.UTL_TO_EMBEDDING(content,
         JSON('{"provider":"oci", "model":"cohere.embed-english-v3.0"}'))
FROM staging_documents;
```

## Select AI (23ai+)

```sql
-- Configure AI profile
BEGIN
  DBMS_CLOUD_AI.CREATE_PROFILE(
    profile_name => 'OCI_GENAI',
    attributes   => '{"provider":"oci",
                      "model":"cohere.command-r-plus",
                      "oci_compartment_id":"ocid1.compartment...",
                      "object_list":[{"owner":"SALES","name":"ORDERS"},
                                     {"owner":"SALES","name":"CUSTOMERS"}]}'
  );
END;
/

-- Set profile for session
EXEC DBMS_CLOUD_AI.SET_PROFILE('OCI_GENAI');

-- Natural language to SQL
SELECT AI('Show me total sales by region for last month');

-- Chat mode
SELECT AI CHAT('What were our top 5 products by revenue?');

-- Narrate data
SELECT AI NARRATE('Explain this sales data') FROM sales_summary;
```

## Performance Optimization

### Efficient Joins

```sql
-- Use explicit JOIN syntax
SELECT o.order_id, c.customer_name, p.product_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= TRUNC(SYSDATE) - 30;

-- Use EXISTS instead of IN for subqueries
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.customer_id
  AND o.order_date >= TRUNC(SYSDATE) - 30
);
```

### Indexing Strategies

```sql
-- B-tree index (default, most common)
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Composite index (column order matters!)
CREATE INDEX idx_orders_cust_date ON orders(customer_id, order_date);

-- Function-based index
CREATE INDEX idx_orders_year ON orders(EXTRACT(YEAR FROM order_date));
CREATE INDEX idx_customers_upper_name ON customers(UPPER(last_name));

-- Bitmap index (low cardinality, DW workloads)
CREATE BITMAP INDEX idx_orders_status ON orders(status);

-- Invisible index (test without affecting optimizer)
CREATE INDEX idx_test INVISIBLE ON orders(region);
ALTER INDEX idx_test VISIBLE;

-- Monitor index usage
SELECT index_name, monitoring, used
FROM v$object_usage;
```

### Query Hints

```sql
-- Force index use
SELECT /*+ INDEX(o idx_orders_date) */ *
FROM orders o WHERE order_date > SYSDATE - 30;

-- Force full table scan
SELECT /*+ FULL(o) */ * FROM orders o WHERE status = 'PENDING';

-- Parallel execution
SELECT /*+ PARALLEL(o, 4) */ COUNT(*) FROM orders o;

-- Optimizer goal
SELECT /*+ FIRST_ROWS(10) */ * FROM orders ORDER BY created_at DESC;
SELECT /*+ ALL_ROWS */ * FROM orders WHERE region = :region;
```

### Execution Plan Analysis

```sql
-- Explain plan
EXPLAIN PLAN FOR
SELECT * FROM orders WHERE customer_id = :cid;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- With statistics
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(NULL, NULL, 'ALL'));

-- From cursor cache
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(:sql_id, NULL, 'ALL'));

-- AWR historical
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_AWR(:sql_id));
```

## PLSQL Patterns

### Result Caching

```sql
CREATE OR REPLACE FUNCTION get_customer_tier(p_customer_id IN NUMBER)
  RETURN VARCHAR2
  RESULT_CACHE RELIES_ON (customers)
IS
  v_tier VARCHAR2(20);
BEGIN
  SELECT tier INTO v_tier
  FROM customers
  WHERE customer_id = p_customer_id;
  RETURN v_tier;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN 'STANDARD';
END;
/
```

### Bulk Operations

```sql
-- Bulk collect
DECLARE
  TYPE t_orders IS TABLE OF orders%ROWTYPE;
  v_orders t_orders;
BEGIN
  SELECT * BULK COLLECT INTO v_orders
  FROM orders
  WHERE status = 'PENDING'
  FETCH FIRST 1000 ROWS ONLY;

  -- Process in batches
  FORALL i IN 1..v_orders.COUNT
    UPDATE orders
    SET status = 'PROCESSING'
    WHERE order_id = v_orders(i).order_id;

  COMMIT;
END;
/

-- FORALL with SAVE EXCEPTIONS
DECLARE
  TYPE t_ids IS TABLE OF NUMBER;
  v_ids t_ids := t_ids(1, 2, 3, 4, 5);
  bulk_errors EXCEPTION;
  PRAGMA EXCEPTION_INIT(bulk_errors, -24381);
BEGIN
  FORALL i IN 1..v_ids.COUNT SAVE EXCEPTIONS
    DELETE FROM orders WHERE order_id = v_ids(i);
EXCEPTION
  WHEN bulk_errors THEN
    FOR j IN 1..SQL%BULK_EXCEPTIONS.COUNT LOOP
      DBMS_OUTPUT.PUT_LINE('Error on index ' ||
        SQL%BULK_EXCEPTIONS(j).ERROR_INDEX || ': ' ||
        SQLERRM(-SQL%BULK_EXCEPTIONS(j).ERROR_CODE));
    END LOOP;
END;
/
```

### Error Handling

```sql
CREATE OR REPLACE PROCEDURE process_order(p_order_id IN RAW)
IS
  e_order_not_found EXCEPTION;
  PRAGMA EXCEPTION_INIT(e_order_not_found, -20001);
  v_order orders%ROWTYPE;
BEGIN
  SELECT * INTO v_order
  FROM orders
  WHERE order_id = p_order_id
  FOR UPDATE NOWAIT;

  -- Process order...

  UPDATE orders SET status = 'PROCESSED' WHERE order_id = p_order_id;
  COMMIT;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE_APPLICATION_ERROR(-20001, 'Order not found: ' || p_order_id);
  WHEN ORA_00054 THEN  -- Resource busy
    RAISE_APPLICATION_ERROR(-20002, 'Order locked by another session');
  WHEN OTHERS THEN
    ROLLBACK;
    -- Log error
    INSERT INTO error_log (error_code, error_message, context)
    VALUES (SQLCODE, SQLERRM, 'process_order:' || p_order_id);
    COMMIT;
    RAISE;
END;
/
```

### Autonomous Transactions

```sql
-- Logging procedure that commits independently
CREATE OR REPLACE PROCEDURE log_event(
  p_event_type IN VARCHAR2,
  p_message IN VARCHAR2
)
IS
  PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
  INSERT INTO event_log (event_type, message, created_at)
  VALUES (p_event_type, p_message, SYSTIMESTAMP);
  COMMIT;
END;
/

-- Usage: Log persists even if main transaction rolls back
BEGIN
  log_event('ORDER_START', 'Processing order ' || :order_id);

  -- Process order...
  -- If this fails and rolls back, log entry is preserved

  log_event('ORDER_COMPLETE', 'Order ' || :order_id || ' processed');
EXCEPTION
  WHEN OTHERS THEN
    log_event('ORDER_ERROR', SQLERRM);
    RAISE;
END;
/
```

## Common Queries

### Top N by Group

```sql
-- Top 3 orders per customer
SELECT customer_id, order_id, total_amount, rn
FROM (
  SELECT customer_id, order_id, total_amount,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS rn
  FROM orders
)
WHERE rn <= 3;
```

### Running Totals

```sql
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;
```

### Gap Detection

```sql
-- Find gaps in sequence
SELECT prev_id + 1 AS gap_start, id - 1 AS gap_end
FROM (
  SELECT id, LAG(id) OVER (ORDER BY id) AS prev_id
  FROM sequence_table
)
WHERE id > prev_id + 1;
```

### Pivot/Unpivot

```sql
-- Pivot: Rows to columns
SELECT * FROM (
  SELECT region, quarter, sales
  FROM quarterly_sales
)
PIVOT (
  SUM(sales) FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4')
);

-- Unpivot: Columns to rows
SELECT region, quarter, sales
FROM quarterly_wide
UNPIVOT (sales FOR quarter IN (q1, q2, q3, q4));
```

### Hierarchical Queries

```sql
-- Employee hierarchy
SELECT LPAD(' ', 2 * LEVEL - 2) || employee_name AS tree,
       employee_id, manager_id, LEVEL
FROM employees
START WITH manager_id IS NULL
CONNECT BY PRIOR employee_id = manager_id
ORDER SIBLINGS BY employee_name;

-- Recursive CTE (23ai+)
WITH org_tree (emp_id, emp_name, mgr_id, lvl) AS (
  SELECT employee_id, employee_name, manager_id, 1
  FROM employees
  WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.employee_name, e.manager_id, t.lvl + 1
  FROM employees e
  JOIN org_tree t ON e.manager_id = t.emp_id
)
SELECT * FROM org_tree;
```
