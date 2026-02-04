# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

We support only the latest version. Please upgrade to the most recent release for security updates.

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, report security issues by:

1. **GitHub Security Advisory**: Use GitHub's private vulnerability reporting feature
2. **Private Contact**: Create a private issue or contact the maintainer directly

### What to include

- **Description**: Clear description of the vulnerability
- **Impact**: What can an attacker do?
- **Affected components**: Which skills, configs, or hooks are affected?
- **Reproduction**: Step-by-step instructions to reproduce
- **Suggested fix**: If you have one

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity
  - Critical: Days
  - High: 1-2 weeks
  - Medium/Low: Best effort

## Security Best Practices

### Using Claude Code Permissions

**Configuration security:**
- Review permissions before applying them
- Understand what each permission allows
- Use project-level configs for project-specific tools
- Keep sensitive operations in user-level config
- Never grant overly broad permissions (e.g., `Bash(*)`)

### Using Hooks

**Hook security:**
- Review hook scripts before installation
- Understand what each hook does
- Be cautious with hooks that modify files
- Validate hook inputs and outputs
- Never execute untrusted hook scripts

### Credential Management

**Never commit:**
- API keys or tokens
- SSH keys or certificates
- Cloud credentials (AWS, GCP, Azure, OCI)
- Database passwords
- `.env` files or `.env.local`

**Add to `.gitignore`:**
```
.env*
*.local
*.key
*.pem
*credentials*
```

### Skills Security

**When using skills:**
- Review skill content before loading
- Be aware of what data skills might access
- Don't execute untrusted skill code
- Verify skill sources and authors

**When creating skills:**
- Don't include credentials in examples
- Don't log sensitive data
- Validate user inputs
- Use secure coding practices

### OCI-Related Tools

For skills and tools that interact with Oracle Cloud:
- Store OCI credentials securely in `~/.oci/config`
- Use restrictive file permissions (`chmod 600`)
- Enable OCI audit logging
- Monitor for unusual API activity
- Follow Oracle's security best practices

## Known Security Considerations

### Claude Code Permissions

The permission configurations grant Claude Code access to various system commands. Understand:
- What each command can do
- Potential for destructive operations
- Data that could be accessed
- Network connections that could be made

### Hooks Execution

Hooks execute arbitrary code in response to Claude Code events. Risks:
- Malicious hooks could access or modify files
- Hooks run with your user permissions
- Untrusted hooks could exfiltrate data

### Third-Party Dependencies

Some skills reference external tools and libraries:
- Verify tool sources before installation
- Keep dependencies updated
- Monitor for security advisories

## Disclosure Policy

- Vulnerabilities will be disclosed after a fix is available
- Credit will be given to reporters (unless anonymous)
- Security advisories published on GitHub
- Users notified through GitHub releases

## Security Checklist

**Before using this project:**
- [ ] Review all configurations and permissions
- [ ] Understand what each hook does
- [ ] Add sensitive files to `.gitignore`
- [ ] Use restrictive file permissions for credentials
- [ ] Keep project dependencies updated
- [ ] Monitor for security advisories

**Regular maintenance:**
- [ ] Periodically review granted permissions
- [ ] Audit installed hooks
- [ ] Check for updates to skills and tools
- [ ] Review access logs if available

## Responsible Disclosure

We believe in responsible disclosure:
- Report vulnerabilities privately first
- Allow reasonable time for fixes (typically 90 days)
- Coordinate public disclosure timing
- Give credit to security researchers

## Comments

This is a community project. Security issues related to:
- **Oracle Cloud services**: Report to Oracle through official channels
- **Claude Code itself**: Report to Anthropic through official channels
- **Third-party tools**: Report to respective maintainers

This project's security scope covers only the skills, configurations, hooks, and documentation contained in this repository.
