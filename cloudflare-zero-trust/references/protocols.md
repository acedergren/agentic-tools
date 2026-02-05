## Modern Protocols (WebSockets, HTTP/2, gRPC)

**Cloudflare Tunnel fully supports modern protocols** - WebSockets, HTTP/2, and gRPC work by default with specific configuration.

### WebSockets Support

**Status:** ✅ Fully supported, no additional configuration needed

WebSockets work automatically through Cloudflare Tunnel:

```yaml
ingress:
  - hostname: ws.example.com
    service: http://localhost:8080  # WebSocket server
  - service: http_status:404
```

**Connection flow:**
1. Client connects to `wss://ws.example.com`
2. Cloudflare Tunnel proxies WebSocket upgrade request
3. Connection persists for duration of session
4. Bidirectional communication maintained

**Configuration tips:**

```yaml
ingress:
  - hostname: ws.example.com
    service: http://localhost:8080
    originRequest:
      noTLSVerify: false
      connectTimeout: 30s
      # WebSocket-specific tuning
      keepAliveTimeout: 90s      # Keep connection alive
      keepAliveConnections: 100  # Connection pool size
```

**Common issues:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Connection drops after 100s | Default keepalive timeout | Increase `keepAliveTimeout: 300s` |
| High reconnection rate | Connection pool too small | Increase `keepAliveConnections` |
| Initial handshake fails | TLS verification mismatch | Check `noTLSVerify` setting |

**Test WebSocket connection:**
```javascript
// Client-side test
const ws = new WebSocket('wss://ws.example.com');

ws.onopen = () => {
  console.log('Connected via Cloudflare Tunnel');
  ws.send(JSON.stringify({ type: 'ping' }));
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};
```

### HTTP/2 Support

**Status:** ✅ Supported with origin configuration

Cloudflare can connect to your origin using HTTP/2:

**Requirements:**
- Origin must support HTTP/2 (most modern servers do)
- TLS required on origin
- Certificate must be valid (or `noTLSVerify: true`)

**Configuration:**

```yaml
ingress:
  - hostname: api.example.com
    service: https://localhost:443  # HTTPS origin
    originRequest:
      http2Origin: true             # Enable HTTP/2 to origin
      disableChunkedEncoding: true  # Required for HTTP/2
```

**Benefits of HTTP/2:**
- Multiplexing (multiple requests over single connection)
- Header compression (reduced overhead)
- Server push (proactive resource delivery)
- Better performance for high-traffic origins

**Troubleshooting:**

```bash
# Test HTTP/2 support from tunnel host
curl -v --http2 https://localhost:443

# Look for:
# * ALPN, offering h2
# * Using HTTP2, server supports multi-use

# If not working:
# - Check origin server HTTP/2 configuration
# - Verify TLS certificate is valid
# - Ensure no intermediate proxies downgrade to HTTP/1.1
```

### gRPC Support

**Status:** ✅ Supported for private network routing (not public hostname yet)

**Important limitations:**
- gRPC over **private network routing** (WARP) - ✅ Fully supported
- gRPC over **public hostname** - ❌ Not yet supported

**For private network gRPC:**

1. **Enable WARP routing:**
   ```yaml
   warp-routing:
     enabled: true
   ```

2. **Route gRPC service:**
   ```bash
   cloudflared tunnel route ip add 10.0.0.0/24 grpc-tunnel
   ```

3. **gRPC requirements met:**
   - HTTP/2 advertised over ALPN ✅
   - `Content-Type: application/grpc` or `application/grpc+proto` ✅
   - Bidirectional streaming ✅

**gRPC configuration:**

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /etc/cloudflared/credentials.json

warp-routing:
  enabled: true

ingress:
  - service: http_status:404
```

**Client connection (via WARP):**
```python
import grpc

# User must be connected to WARP
# Then can access private gRPC service directly
channel = grpc.insecure_channel('10.0.0.50:50051')
stub = MyServiceStub(channel)
```

**Docker with gRPC:**

```yaml
# docker-compose.yml
services:
  grpc-server:
    image: grpc-app:latest
    ports:
      - "50051:50051"
    networks:
      - private-network

  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --config /etc/cloudflared/config.yml run
    volumes:
      - ./config.yml:/etc/cloudflared/config.yml:ro
      - ./credentials.json:/etc/cloudflared/credentials.json:ro
    networks:
      - private-network
```

### Protocol Detection and ALPN

**How Cloudflare determines protocol:**

1. **TLS/ALPN negotiation:**
   - Client advertises supported protocols (h2, http/1.1)
   - Cloudflare selects based on server support
   - Protocol established during handshake

2. **Without ALPN:**
   - Falls back to HTTP/1.1
   - WebSocket upgrades still work

**Verify ALPN:**
```bash
# Check ALPN support
openssl s_client -connect your-origin:443 -alpn h2,http/1.1 < /dev/null | grep ALPN

# Expected output:
# ALPN protocol: h2

# If empty:
# - Origin doesn't support HTTP/2
# - TLS configuration incomplete
# - Certificate issue
```

### Performance Optimization for Modern Protocols

**WebSocket tuning:**
```yaml
originRequest:
  keepAliveTimeout: 300s      # Long-lived connections
  keepAliveConnections: 200   # Higher pool for WS
  tcpKeepAlive: 30s          # TCP-level keepalive
```

**HTTP/2 tuning:**
```yaml
originRequest:
  http2Origin: true
  disableChunkedEncoding: true
  connectTimeout: 10s         # Faster for multiplexed
  keepAliveConnections: 50    # Fewer needed with multiplexing
```

**gRPC best practices:**
- Use WARP routing, not public hostname attempts
- Enable HTTP/2 on origin
- Configure load balancing for gRPC (client-side or proxy)
- Monitor connection counts (gRPC reuses connections)

### Common Mistakes - Modern Protocols

**❌ Wrong: HTTP/2 without TLS**
```yaml
ingress:
  - hostname: api.example.com
    service: http://localhost:80  # HTTP only
    originRequest:
      http2Origin: true  # Won't work without TLS!
```

**✅ Right:**
```yaml
ingress:
  - hostname: api.example.com
    service: https://localhost:443  # HTTPS
    originRequest:
      http2Origin: true
```

**❌ Wrong: gRPC over public hostname**
```yaml
ingress:
  - hostname: grpc.example.com  # Not supported yet
    service: http://localhost:50051
```

**✅ Right:**
```yaml
# Use WARP routing instead
warp-routing:
  enabled: true
# Then cloudflared tunnel route ip add 10.0.0.0/24 tunnel-name
```

**❌ Wrong: Small keepalive for WebSockets**
```yaml
originRequest:
  keepAliveTimeout: 30s  # Too short, connections drop
```

**✅ Right:**
```yaml
originRequest:
  keepAliveTimeout: 300s  # 5 minutes, stable connections
```

