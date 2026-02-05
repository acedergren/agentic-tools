### Network Path Analysis

**When standard troubleshooting fails** - trace the full path.

**Diagnosis tree:**
```
Issue: Can't access application

1. Test DNS resolution
   ├─ nslookup app.example.com
   ├─ Should return Cloudflare IPs (104.x.x.x)
   └─ If wrong: DNS propagation or misconfigured CNAME

2. Test Cloudflare edge
   ├─ curl -I https://app.example.com
   ├─ Check HTTP status and headers
   └─ If 5xx: Tunnel or origin issue

3. Test tunnel connection
   ├─ cloudflared tunnel info <TUNNEL_NAME>
   ├─ Should show "connected"
   └─ If disconnected: Check cloudflared logs

4. Test origin from tunnel host
   ├─ curl http://localhost:8080 (from tunnel host)
   ├─ Should return 200 OK
   └─ If fails: Origin service down

5. Test origin configuration
   ├─ Check ingress rules in config.yml
   ├─ Verify hostname matches exactly
   └─ Check service URL (http vs https, port)
```

**Trace command output:**
```bash
# Full diagnostic
cloudflared tunnel info <TUNNEL_NAME>

# Output shows:
# - Tunnel ID and status
# - Connections (should be 4)
# - Connector ID
# - Version

# Detailed logs
cloudflared tunnel run <TUNNEL_NAME> --loglevel debug
```

### Performance Debugging

**Slow response times:**

```bash
# 1. Measure each hop
time curl -o /dev/null -s https://app.example.com

# 2. Check Cloudflare Analytics
# Dashboard → Analytics → Traffic
# Look for: Origin response time vs Total time

# 3. Check tunnel metrics (if exposed)
curl http://localhost:20241/metrics | grep cloudflared_request_duration
```

**Origin performance tuning:**
```yaml
originRequest:
  # Increase connection pool
  keepAliveConnections: 200     # Default: 100

  # Reduce connection timeout (fail fast)
  connectTimeout: 5s            # Default: 30s

  # Enable HTTP/2 to origin
  http2Origin: true

  # Disable chunked encoding for HTTP/2
  disableChunkedEncoding: true

  # TCP keepalive
  tcpKeepAlive: 30s
```

**Connection pooling issues:**
```bash
# Symptoms:
# - High latency spikes
# - "connection refused" intermittently
# - Connection reset errors

# Solution: Tune pool size
keepAliveConnections: 500  # For high-traffic origins
```

### Certificate Troubleshooting

**Certificate validation failures:**

```bash
# Test TLS from tunnel host
openssl s_client -connect localhost:443 -servername app.example.com

# Check:
# - Certificate chain
# - Expiration date
# - Subject Alternative Names (SAN)

# Common issues:
# 1. Self-signed cert → Set noTLSVerify: true (dev only!)
# 2. Expired cert → Renew with Let's Encrypt or provider
# 3. Wrong SAN → Certificate doesn't include hostname
# 4. Missing intermediate → Incomplete chain
```

**mTLS debugging:**
```yaml
# Enable mutual TLS
originRequest:
  originServerName: "app.internal"
  caPool: /etc/cloudflared/ca.pem
  noTLSVerify: false
```

```bash
# Test mTLS
curl --cert client.crt --key client.key https://app.example.com
```

### Connection Limit Issues

**"Too many connections" errors:**

```bash
# Check current connections
ss -tan | grep :8080 | wc -l

# Cloudflare Tunnel limits:
# - 4 connections per tunnel instance
# - 100 total connections per tunnel (25 replicas max)
# - 200 in-flight requests per quick tunnel

# Solutions:
# 1. Add tunnel replicas (up to 25)
# 2. Increase origin connection limit
# 3. Use load balancer for > 100 connections
```

### Metrics Interpretation

**Key metrics to monitor:**

```prometheus
# Request rate
rate(cloudflared_tunnel_total_requests[5m])

# Error rate
rate(cloudflared_tunnel_response_by_code{code="5xx"}[5m])

# Connection count
cloudflared_tunnel_active_connections

# Response time
histogram_quantile(0.95, cloudflared_tunnel_request_duration_seconds)
```

**Alert thresholds:**
```yaml
# Prometheus alerts
groups:
  - name: cloudflare_tunnel
    rules:
      - alert: TunnelDown
        expr: cloudflared_tunnel_active_connections == 0
        for: 5m

      - alert: HighErrorRate
        expr: rate(cloudflared_tunnel_response_by_code{code=~"5.."}[5m]) > 0.05
        for: 10m

      - alert: HighLatency
        expr: histogram_quantile(0.95, cloudflared_tunnel_request_duration_seconds) > 5
        for: 15m
```

---

