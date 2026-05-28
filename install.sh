#!/bin/bash
# install.sh — Install agentic-tools skills, agents, and hooks into a Claude Code project
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-.}"

echo "Agentic Tools Installer"
echo "======================="
echo ""
echo "Source: $SCRIPT_DIR"
echo "Target: $(cd "$TARGET_DIR" && pwd)"
echo ""

# Ensure target has .claude directory
mkdir -p "$TARGET_DIR/.claude/skills"
mkdir -p "$TARGET_DIR/.claude/agents"
mkdir -p "$TARGET_DIR/.claude/hooks"

# --- Skills ---
echo "Installing skills..."

SKILLS=(
  "api-audit"
  "oci/best-practices"
  "bugfix"
  "oci/compute-management"
  "oci/database-management"
  "doc-sync"
  "oci/fastify-better-auth-bridge"
  "find-skills"
  "oci/finops-cost-optimization"
  "firecrawl"
  "oci/genai-services"
  "health-check"
  "humanizer"
  "oci/iam-identity-management"
  "implement"
  "oci/infrastructure-as-code"
  "oci/landing-zones"
  "migrate"
  "oci/monitoring-operations"
  "oci/networking-management"
  "oci"
  "oci/oci-events"
  "oci/oci-pptx"
  "oci/managed-bastion-access"
  "oci/oci-resource-manager"
  "oci/oci-security-control-plane"
  "oci/zpr-security"
  "oci/oracle-dba"
  "oci/oracle-idcs-better-auth-setup"
  "oci/oracle-idcs-org-provisioning"
  "orchestrate"
  "phase-kickoff"
  "plane"
  "plane/api-operations"
  "plane/work-item-management"
  "plane/planning-structure"
  "plane/pages-content"
  "plane/intake-customer-triage"
  "plane/agent-webhook-automation"
  "plane/reporting-audit"
  "prd"
  "prod-readiness"
  "publish-skill"
  "quality-commit"
  "refactor-module"
  "review-all"
  "oci/secrets-management"
  "semgrep-coderabbit"
  "shadcn-svelte"
  "oci/sqlite-to-oracle-planner"
  "stitch-design-system"
  "stitch-prompt-engineer"
  "stitch-to-react"
  "tanstack-query"
  "tdd"
  "turborepo"
  "write-natural-swedish"
  "write-tests"
)

# OCI and Oracle-owned skills. Keep in sync with skills/oci/manifest.json.
OCI_SKILLS=(
  "oci"
  "oci/best-practices"
  "oci/compute-management"
  "oci/database-management"
  "oci/finops-cost-optimization"
  "oci/genai-services"
  "oci/iam-identity-management"
  "oci/infrastructure-as-code"
  "oci/landing-zones"
  "oci/monitoring-operations"
  "oci/networking-management"
  "oci/oci-events"
  "oci/managed-bastion-access"
  "oci/oci-resource-manager"
  "oci/oci-security-control-plane"
  "oci/zpr-security"
  "oci/oracle-dba"
  "oci/secrets-management"
  "oci/fastify-better-auth-bridge"
  "oci/oci-pptx"
  "oci/oracle-idcs-better-auth-setup"
  "oci/oracle-idcs-org-provisioning"
  "oci/sqlite-to-oracle-planner"
)

# Plane-owned skills. Keep in sync with skills/plane/manifest.json.
PLANE_SKILLS=(
  "plane"
  "plane/api-operations"
  "plane/work-item-management"
  "plane/planning-structure"
  "plane/pages-content"
  "plane/intake-customer-triage"
  "plane/agent-webhook-automation"
  "plane/reporting-audit"
)

for skill in "${SKILLS[@]}"; do
  if [ -d "$SCRIPT_DIR/skills/$skill" ]; then
    rm -rf "$TARGET_DIR/.claude/skills/$skill"
    mkdir -p "$(dirname "$TARGET_DIR/.claude/skills/$skill")"
    cp -r "$SCRIPT_DIR/skills/$skill" "$TARGET_DIR/.claude/skills/$skill"
    echo "  + $skill"
  fi
done

# --- Agents ---
echo ""
echo "Installing agents..."

AGENTS=(
  "mock-debugger.md"
  "security-reviewer.md"
)

for agent in "${AGENTS[@]}"; do
  if [ -f "$SCRIPT_DIR/claude/agents/$agent" ]; then
    cp "$SCRIPT_DIR/claude/agents/$agent" "$TARGET_DIR/.claude/agents/"
    echo "  + ${agent%.md}"
  fi
done

# --- Hooks ---
echo ""
echo "Installing hook examples..."

if [ -d "$SCRIPT_DIR/claude/hooks/examples" ]; then
  cp -r "$SCRIPT_DIR/claude/hooks/examples/"*.sh "$TARGET_DIR/.claude/hooks/" 2>/dev/null || true
  echo "  + $(ls "$SCRIPT_DIR/claude/hooks/examples/"*.sh 2>/dev/null | wc -l | tr -d ' ') hook scripts"
fi

# --- Summary ---
echo ""
echo "Installation complete!"
echo ""
echo "Installed:"
echo "  Skills: ${#SKILLS[@]}"
echo "  Agents: ${#AGENTS[@]}"
echo ""
echo "Next steps:"
echo "  1. Review installed skills in .claude/skills/"
echo "  2. Register hooks in .claude/settings.json (see claude/hooks/README.md)"
echo "  3. Customize skill paths for your project structure"
echo "  4. Try: /implement, /tdd, /review-all, /health-check, /prd"
echo ""
echo "Full pipeline:"
echo "  /prd → /prd --to-plan → /orchestrate <plan> → /review-all → /health-check"
