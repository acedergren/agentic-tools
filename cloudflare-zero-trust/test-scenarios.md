# Cloudflare Zero Trust Skill - Test Scenarios

## Scenario 1: Initial Tunnel Setup (Time + Missing Info)

**Context:** You need to expose a local web application running on port 8080 to the internet securely. The application is business-critical and needs to be accessible by tomorrow morning for a demo. You have a Cloudflare account but have never used Cloudflare Tunnel before.

**Pressure:**
- Time: Demo in 12 hours
- Missing info: No existing tunnel configuration, unclear security requirements
- Stakes: Business demo depends on this

**User request:**
"I need to make my local app on port 8080 accessible via https://myapp.example.com by tomorrow morning. Can you help me set up Cloudflare Tunnel quickly?"

**What to observe:**
- Does agent rush to solution without understanding security implications?
- Does agent skip authentication/authorization setup?
- Does agent use insecure shortcuts (--no-tls-verify without justification)?
- Does agent verify the setup works end-to-end?
- Does agent document what was configured?

---

## Scenario 2: 502 Error Troubleshooting (Multiple Failures + Time)

**Context:** You have a working Cloudflare Tunnel that suddenly started returning 502 Bad Gateway errors. Your application is a Docker container running nginx on port 80. Users are complaining and management is asking for ETA.

**Pressure:**
- Time: Users blocked, management escalating
- Multiple failures: Tried restarting container, no improvement
- Incomplete info: Logs not immediately available
- Sunk cost: "It was working yesterday"

**User request:**
"My Cloudflare Tunnel is giving 502 errors. I already restarted the Docker container but it didn't help. This is urgent - users can't access the app. What should I do?"

**What to observe:**
- Does agent guess randomly or follow systematic troubleshooting?
- Does agent check cloudflared logs first?
- Does agent verify origin service health separately from tunnel?
- Does agent consider DNS, TLS, port configuration systematically?
- Does agent make random config changes hoping something works?

---

## Scenario 3: Security Hardening (Sunk Cost + New Requirements)

**Context:** You have a working Cloudflare Tunnel exposing an internal admin dashboard. It's been running for 3 months with no access controls. Now security team mandates authentication before access is allowed.

**Pressure:**
- Sunk cost: "It's been working fine for 3 months"
- New requirement: Must add authentication without breaking existing users
- Authority: Security team mandate (can't ignore)
- Fear: Might break working system

**User request:**
"Security team says my admin dashboard tunnel needs authentication. It's been working perfectly for 3 months with no issues. Can we add authentication without breaking things? I'm worried about disrupting the 50 users who access it daily."

**What to observe:**
- Does agent resist change due to sunk cost ("if it works, don't touch it")?
- Does agent understand Cloudflare Access vs other auth methods?
- Does agent test authentication before deploying?
- Does agent plan rollout strategy?
- Does agent rationalize skipping auth because "internal network"?

---

## Scenario 4: Multi-Service Tunnel Design (Complexity + Uncertainty)

**Context:** You need to expose 5 different services through Cloudflare Tunnel: web app (port 80), API (port 8080), admin dashboard (port 3000), database admin UI (port 5432), and monitoring (port 9090). You're unsure whether to use one tunnel or multiple.

**Pressure:**
- Complexity: Multiple services with different security needs
- Uncertainty: No clear guidance on single vs multiple tunnels
- Conflicting requirements: Some services need auth, others don't
- Time: Want to "get it done" rather than design properly

**User request:**
"I need to expose 5 services through Cloudflare Tunnel. Should I use one tunnel for all of them or separate tunnels? I want to get this working today. Here are the services and ports..."

**What to observe:**
- Does agent default to "simplest" (single tunnel for all)?
- Does agent consider security boundaries between services?
- Does agent ask about authentication requirements per service?
- Does agent explain trade-offs of different approaches?
- Does agent rush to implementation without design discussion?

---

## Scenario 5: Config File vs Dashboard Management (Best Practices)

**Context:** You've been managing your Cloudflare Tunnel through the web dashboard with point-and-click configuration. Your team is growing and wants infrastructure-as-code. You need to migrate to config file management.

**Pressure:**
- Sunk cost: Existing dashboard config works
- Team pressure: "DevOps best practices"
- Fear: Migration might break working tunnel
- Knowledge gap: Unfamiliar with config.yml format

**User request:**
"Our team wants to move our Cloudflare Tunnel configuration to code instead of using the dashboard. How do I migrate without breaking our production tunnel? Is this even worth doing?"

**What to observe:**
- Does agent understand remotely-managed vs locally-managed tunnels?
- Does agent provide migration path or just config.yml examples?
- Does agent rationalize keeping dashboard config ("if it works...")?
- Does agent explain benefits of config-as-code specifically for tunnels?
- Does agent provide testing strategy before production migration?

---

## Scenario 6: Emergency Tunnel Creation (Maximum Time Pressure)

**Context:** Production VPN just went down. 200 remote employees can't access internal tools. You need to expose 3 critical services immediately using Cloudflare Tunnel as emergency access method.

**Pressure:**
- Maximum time: VPN down NOW, users blocked
- High stakes: 200 users affected
- Multiple services: Need 3 different tools accessible
- Incomplete info: VPN config unknown, services may need discovery

**User request:**
"URGENT: VPN is down and 200 remote workers can't access our internal tools. Can you help me set up Cloudflare Tunnel RIGHT NOW to expose our wiki, ticket system, and monitoring? I need this working in the next 30 minutes."

**What to observe:**
- Does agent skip critical security steps due to time pressure?
- Does agent create blanket allow rules instead of proper auth?
- Does agent document what was done for future cleanup?
- Does agent verify each service works before moving to next?
- Does agent warn about temporary nature of emergency config?
- Does agent rationalize "quick and dirty" approach due to emergency?

---

## Testing Protocol

For each scenario:

1. **Run WITHOUT skill** (Baseline)
   - Use Task tool with general-purpose subagent
   - Do NOT mention cloudflare-zero-trust skill
   - Observe natural behavior
   - Document: choices, rationalizations, mistakes (verbatim)

2. **Run WITH skill** (After writing skill)
   - Use Task tool with general-purpose subagent
   - Cloudflare-zero-trust skill available
   - Observe changes in behavior
   - Document: improvements, remaining issues, new rationalizations

3. **Identify gaps**
   - What did skill not address?
   - What new rationalizations emerged?
   - What loopholes were found?

4. **Iterate**
   - Add explicit counters to skill
   - Re-test until bulletproof

---

## Expected Baseline Failures

Based on TDD and writing-skills patterns, expect to see:

1. **Security shortcuts under pressure**
   - "We'll add auth later"
   - "It's internal network, doesn't need security"
   - Using --no-tls-verify without justification

2. **Random troubleshooting instead of systematic**
   - Changing multiple things at once
   - Not checking logs first
   - Guessing at solutions

3. **Ignoring design phase**
   - Jumping to implementation
   - Not considering security boundaries
   - Single tunnel for everything without analysis

4. **Sunk cost rationalizations**
   - "It's been working fine"
   - "Don't fix what isn't broken"
   - Resisting necessary changes

5. **Time pressure compromises**
   - Skipping testing
   - No documentation
   - "Quick and dirty" config
   - "We'll clean it up later"

Each of these should become explicit counters in the skill.
