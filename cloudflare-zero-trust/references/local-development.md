## Local Development Workflows

**Quick tunnels for development** - no account setup, instant URL, perfect for testing.

### Quick Tunnels (trycloudflare.com)

**Fastest way to test:** One command, random URL, no configuration.

```bash
# Start quick tunnel
cloudflared tunnel --url http://localhost:8080

# Output:
# Your quick Tunnel has been created! Visit it at:
# https://random-words-123.trycloudflare.com
```

**Characteristics:**
- **Free** - no Cloudflare account needed
- **Random subdomain** - changes each run (e.g., `happy-fox-123.trycloudflare.com`)
- **200 concurrent request limit** - sufficient for development
- **No authentication** - publicly accessible (use with caution)
- **Ephemeral** - tunnel stops when command terminates

**When to use:**
- Local feature testing
- Sharing work-in-progress with teammates
- Webhook development (GitHub, Stripe, etc.)
- Mobile app testing (access localhost from phone)

**When NOT to use:**
- Production deployments
- Sensitive data/applications
- Need stable URLs
- >200 concurrent requests

### Named Development Tunnels

**For stable dev URLs** - same subdomain across restarts.

```bash
# Create named tunnel
cloudflared tunnel create dev-tunnel

# Run with config
cloudflared tunnel --config config-dev.yml run dev-tunnel
```

**config-dev.yml:**
```yaml
tunnel: dev-tunnel
credentials-file: ~/.cloudflared/dev-tunnel.json

ingress:
  - hostname: dev.example.com
    service: http://localhost:3000
  - service: http_status:404
```

**Benefits over quick tunnels:**
- Stable URL (dev.example.com)
- Can add Access authentication
- Version control config
- Multiple services

### Preview Environments Pattern

**Per-branch preview URLs** - like Vercel/Netlify for any stack.

```bash
# In CI/CD (GitHub Actions example)
name: Deploy Preview
on: [pull_request]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Create tunnel for PR
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: |
          # Create tunnel named after PR number
          TUNNEL_NAME="pr-${{ github.event.pull_request.number }}"
          cloudflared tunnel create $TUNNEL_NAME

          # Route DNS
          cloudflared tunnel route dns $TUNNEL_NAME pr-${{ github.event.pull_request.number }}.example.com

          # Start tunnel in background
          cloudflared tunnel --config config.yml run $TUNNEL_NAME &

          # Run tests against preview URL
          npm test -- --url https://pr-${{ github.event.pull_request.number }}.example.com
```

**Result:** Each PR gets `https://pr-123.example.com`

### Development vs Production Separation

**Pattern:** Separate tunnels for different environments.

| Environment | Tunnel Name | Domain | Auth |
|-------------|-------------|--------|------|
| Local dev | None (quick tunnel) | random.trycloudflare.com | None |
| Dev | dev-tunnel | dev.example.com | Email-based |
| Staging | staging-tunnel | staging.example.com | Email domain |
| Production | prod-tunnel | app.example.com | Azure AD + MFA |

**Config management:**
```bash
# Directory structure
tunnels/
├── dev/
│   ├── config.yml
│   └── credentials.json
├── staging/
│   ├── config.yml
│   └── credentials.json
└── prod/
    ├── config.yml
    └── credentials.json

# Switch environments
cd tunnels/dev && cloudflared tunnel run dev-tunnel
cd tunnels/prod && cloudflared tunnel run prod-tunnel
```

### Hot Reload Development

**Pattern:** Tunnel stays running, app restarts on changes.

```yaml
# docker-compose-dev.yml
services:
  app:
    build: .
    volumes:
      - .:/app  # Mount source for hot reload
    command: npm run dev
    environment:
      - NODE_ENV=development

  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --url http://app:3000
    depends_on:
      - app
```

```bash
# Start with hot reload
docker-compose -f docker-compose-dev.yml up

# Tunnel URL stays stable while you code
# App restarts on file changes
# No tunnel restart needed
```

### Testing Webhooks Locally

**Pattern:** Expose localhost to receive webhooks.

```bash
# Terminal 1: Start app
npm run dev  # Runs on localhost:3000

# Terminal 2: Start tunnel
cloudflared tunnel --url http://localhost:3000

# Output: https://random-abc-123.trycloudflare.com

# Terminal 3: Configure webhook
curl -X POST https://api.github.com/repos/user/repo/hooks \
  -H "Authorization: token $GITHUB_TOKEN" \
  --data '{
    "name": "web",
    "active": true,
    "events": ["push", "pull_request"],
    "config": {
      "url": "https://random-abc-123.trycloudflare.com/webhooks/github",
      "content_type": "json"
    }
  }'

# Now receive webhook events locally!
```

### Common Development Patterns

**Pattern 1: Frontend + Backend separation**
```bash
# Backend on port 8080
cd backend && npm run dev

# Frontend on port 3000
cd frontend && npm run dev

# Expose both via tunnel
cloudflared tunnel --url http://localhost:3000
# Frontend: https://abc-123.trycloudflare.com

cloudflared tunnel --url http://localhost:8080
# Backend: https://def-456.trycloudflare.com
```

**Pattern 2: Database GUI access**
```bash
# Run database locally
docker run -p 5432:5432 postgres

# Run Adminer (database GUI)
docker run -p 8080:8080 adminer

# Expose GUI via tunnel
cloudflared tunnel --url http://localhost:8080
# Share URL with team: https://db-admin-789.trycloudflare.com
```

**Pattern 3: Mobile app development**
```bash
# Start local API
npm run dev  # localhost:3000

# Expose via tunnel
cloudflared tunnel --url http://localhost:3000
# Output: https://mobile-api-123.trycloudflare.com

# Configure mobile app to use tunnel URL
# Test on physical device without complex network setup
```

---
