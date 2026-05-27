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
  "best-practices"
  "bugfix"
  "compute-management"
  "database-management"
  "doc-sync"
  "fastify-better-auth-bridge"
  "find-skills"
  "finops-cost-optimization"
  "firecrawl"
  "genai-services"
  "health-check"
  "humanizer"
  "iam-identity-management"
  "implement"
  "infrastructure-as-code"
  "landing-zones"
  "migrate"
  "monitoring-operations"
  "networking-management"
  "oci"
  "oci-events"
  "oci-pptx"
  "oci/managed-bastion-access"
  "oci/oci-resource-manager"
  "oci/oci-security-control-plane"
  "oci/zpr-security"
  "oracle-dba"
  "oracle-idcs-better-auth-setup"
  "oracle-idcs-org-provisioning"
  "orchestrate"
  "phase-kickoff"
  "prd"
  "prod-readiness"
  "publish-skill"
  "quality-commit"
  "refactor-module"
  "review-all"
  "secrets-management"
  "semgrep-coderabbit"
  "shadcn-svelte"
  "sqlite-to-oracle-planner"
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
  "best-practices"
  "compute-management"
  "database-management"
  "finops-cost-optimization"
  "genai-services"
  "iam-identity-management"
  "infrastructure-as-code"
  "landing-zones"
  "monitoring-operations"
  "networking-management"
  "oci-events"
  "oci/managed-bastion-access"
  "oci/oci-resource-manager"
  "oci/oci-security-control-plane"
  "oci/zpr-security"
  "oracle-dba"
  "secrets-management"
  "fastify-better-auth-bridge"
  "oci-pptx"
  "oracle-idcs-better-auth-setup"
  "oracle-idcs-org-provisioning"
  "sqlite-to-oracle-planner"
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
