## Private Network Routing (Non-HTTP Services)

**Beyond HTTP:** Cloudflare Tunnel can expose ANY TCP/UDP service - SSH, RDP, databases, custom protocols.

### When to Use Private Network Routing

Use for:
- SSH access to servers
- RDP for Windows desktops
- Database connections (PostgreSQL, MySQL, Redis)
- Internal APIs and services
- Custom TCP/UDP applications

### Two Approaches

| Approach | Best For | Setup |
|----------|----------|-------|
| **Application Tunnel** | Specific services (SSH to specific server) | Single ingress rule per service |
| **WARP Routing** | Full private network access (entire CIDR) | `warp-routing` enabled, IP routes |

### Application Tunnel for Specific Services

**Configure non-HTTP protocols in config.yml:**

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /etc/cloudflared/credentials.json

ingress:
  # SSH to specific server
  - hostname: ssh.example.com
    service: ssh://192.168.1.10:22

  # RDP to Windows desktop
  - hostname: rdp.example.com
    service: rdp://192.168.1.20:3389

  # PostgreSQL database
  - hostname: db.example.com
    service: tcp://192.168.1.30:5432

  # Redis
  - hostname: redis.example.com
    service: tcp://192.168.1.40:6379

  # Catch-all
  - service: http_status:404
```

**Route DNS for each service:**
```bash
cloudflared tunnel route dns myapp-tunnel ssh.example.com
cloudflared tunnel route dns myapp-tunnel rdp.example.com
cloudflared tunnel route dns myapp-tunnel db.example.com
```

**Client-side access (user's machine):**

Users need `cloudflared access` command as local proxy:

```bash
# SSH example
cloudflared access ssh --hostname ssh.example.com --destination 192.168.1.10:22

# Or configure SSH config (~/.ssh/config)
Host ssh.example.com
  ProxyCommand cloudflared access ssh --hostname %h
```

**Database access example:**
```bash
# Start local proxy
cloudflared access tcp --hostname db.example.com --url localhost:5432

# Then connect normally
psql -h localhost -p 5432 -U dbuser
```

### WARP Routing for Full Private Networks

**When to use:**
- Need access to entire private network (192.168.0.0/16)
- Many services, don't want individual tunnels
- Dynamic IPs or service discovery

**Setup:**

1. **Enable WARP routing in tunnel:**
   ```bash
   cloudflared tunnel create private-network-tunnel
   ```

2. **Add IP routes:**
   ```bash
   # Route entire private subnet through tunnel
   cloudflared tunnel route ip add 192.168.0.0/16 private-network-tunnel
   cloudflared tunnel route ip add 10.0.0.0/8 private-network-tunnel
   ```

3. **Configure tunnel for WARP routing:**
   ```yaml
   tunnel: <TUNNEL_ID>
   credentials-file: /etc/cloudflared/credentials.json

   warp-routing:
     enabled: true
   ```

4. **Users connect via WARP client:**
   - Install WARP client on user devices
   - Enroll in Zero Trust organization
   - Access entire private network seamlessly

**WARP Connector vs cloudflared:**

| Feature | cloudflared + WARP routing | WARP Connector (beta) |
|---------|---------------------------|----------------------|
| **Use case** | Application tunnels + private network | Site-to-site, mesh networking |
| **Setup** | Install cloudflared, enable WARP routing | Dedicated connector deployment |
| **Routing** | Manual IP route configuration | Automatic route discovery |
| **Bidirectional** | No (only inbound to private network) | Yes (site-to-site) |

### Container Networking for Private Network Routing

**Docker Compose with private network access:**

```yaml
version: '3.8'

services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --config /etc/cloudflared/config.yml run
    volumes:
      - ./cloudflared/config.yml:/etc/cloudflared/config.yml:ro
      - ./cloudflared/credentials.json:/etc/cloudflared/credentials.json:ro
    networks:
      - app-network
      - private-network  # Access to private services
    restart: unless-stopped

  # Private service example
  database:
    image: postgres:16
    networks:
      - private-network
    environment:
      POSTGRES_PASSWORD: secret

networks:
  app-network:
    driver: bridge
  private-network:
    driver: bridge
```

**Important:** Use service names in `ingress` when referencing containers:
```yaml
ingress:
  - hostname: db.example.com
    service: tcp://database:5432  # service name, not localhost
```

### Access Policies for Private Networks

**SSH with Access:**

1. **Create Access application:**
   - Type: Self-hosted
   - Domain: `ssh.example.com`
   - Session duration: 2 hours (shorter for SSH)

2. **Policy with purpose justification:**
   ```
   Name: SSH Access with Justification
   Action: Allow
   Include: Azure AD Groups → DevOps Engineers
   Require: Purpose Justification
   ```

3. **MFA requirement:**
   ```
   Name: SSH Requires MFA
   Action: Allow
   Include: Email domains → @company.com
   Require: Authentication Method → Azure AD MFA
   ```

**Database access policy:**
```
Name: Database Access - Read Only
Action: Allow
Include: Azure AD Groups → Data Analysts
Session Duration: 8 hours
```

### Common Mistakes - Private Networks

**❌ Wrong:**
```yaml
# Using localhost for containerized service
ingress:
  - hostname: db.example.com
    service: tcp://localhost:5432  # Won't work!
```

**✅ Right:**
```yaml
# Using service name
ingress:
  - hostname: db.example.com
    service: tcp://database:5432  # Container service name
```

**❌ Wrong:**
```bash
# Exposing database without Access policy
cloudflared tunnel route dns tunnel db.example.com
# Database now publicly accessible via tunnel!
```

**✅ Right:**
```bash
# Configure Access FIRST
# Dashboard → Access → Applications → Add application
# Type: Self-hosted → db.example.com → Create policies

# THEN route DNS
cloudflared tunnel route dns tunnel db.example.com
```

### Troubleshooting Private Network Access

**"Connection refused" on SSH:**
```bash
# Check tunnel can reach SSH server
cloudflared tunnel info <TUNNEL_NAME>

# Test from tunnel host
ssh -p 22 192.168.1.10  # Should work from tunnel host

# Check ingress rule
grep -A 5 "ssh.example.com" /etc/cloudflared/config.yml
```

**Database connection timeout:**
```bash
# Check TCP connectivity
nc -zv 192.168.1.30 5432  # From tunnel host

# Increase connectTimeout in config.yml
ingress:
  - hostname: db.example.com
    service: tcp://192.168.1.30:5432
    originRequest:
      connectTimeout: 60s  # Default 30s
      tcpKeepAlive: 30s
```

**WARP routing not working:**
```bash
# Verify IP routes
cloudflared tunnel route ip list

# Check warp-routing enabled
grep -A 2 "warp-routing" /etc/cloudflared/config.yml

# Test from WARP client
# User must be enrolled in Zero Trust organization
ping 192.168.1.10  # Should work with WARP connected
```

