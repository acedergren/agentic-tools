# Claude Code Configuration (Deprecated Location)

> **⚠️ Note:** This directory structure is deprecated. Please use the new multi-agent structure.

## New Location

Claude Code configurations have moved to: **[agents/claude/](../agents/claude/)**

## Migration Path

### For User-Level Config

```bash
# Old way (still works)
cp claude/settings/user-level/config.json ~/.config/claude/config.json

# New way (recommended)
cp agents/claude/settings/user-level/config.json ~/.config/claude/config.json
```

### For Project-Level Config

```bash
# Old way (still works)
mkdir -p .claude
cp claude/settings/templates/nodejs-fullstack.json .claude/settings.local.json

# New way (recommended)
mkdir -p .claude
cp agents/claude/settings/templates/nodejs-fullstack.json .claude/settings.local.json
```

### For Hooks

```bash
# Old way (still works)
cp claude/hooks/examples/*.sh .claude/hooks/

# New way (recommended)
cp agents/claude/hooks/examples/*.sh .claude/hooks/
```

## Why the Change?

This repository now supports **multiple AI coding assistants**:

- **[Claude Code](../agents/claude/)** - Permissions, hooks, MCP support
- **[GitHub Copilot](../agents/copilot/)** - VS Code integration
- **[Cursor](../agents/cursor/)** - .cursorrules, Composer mode
- **[Windsurf](../agents/windsurf/)** - Cascade mode

See **[agents/README.md](../agents/README.md)** for the complete guide.

## Backward Compatibility

This directory will remain for backward compatibility but won't receive updates. Please migrate to the new structure at your convenience.

---

**For full documentation, see:** [agents/claude/README.md](../agents/claude/README.md)
