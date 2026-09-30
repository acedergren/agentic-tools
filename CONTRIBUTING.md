# Contributing to Agentic Tools

Thank you for your interest in contributing! This project provides high-quality AI agent skills and automation tools for Claude Code and compatible agents.

## Ways to Contribute

- **Skills**: Create new skills or improve existing ones
- **Documentation**: Enhance READMEs, guides, and examples
- **Tools**: Add automation scripts, hooks, or templates
- **Bug Reports**: Report issues or suggest improvements

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a branch** for your changes
4. **Make your changes** following the guidelines below
5. **Test your changes** thoroughly
6. **Submit a pull request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/agentic-tools.git
cd agentic-tools

# Create a branch
git checkout -b feature/your-feature-name

# Make changes and test
# (Testing procedures depend on what you're contributing)

# Commit your changes
git add .
git commit -m "feat: your descriptive commit message"
git push origin feature/your-feature-name
```

## Contributing Skills

### Skill Quality Standards

All skills must meet these criteria:

1. **Knowledge Delta**: Provide expert insights, not basics Claude already knows
2. **Decision Frameworks**: Clear guidance on when/how to apply patterns
3. **Anti-Patterns**: Specific "NEVER do X because Y" with reasons
4. **Progressive Disclosure**: Core content < 300 lines, details in references/
5. **Practical Usability**: Working examples, error recovery procedures

### Skill Structure

```
skills/your-skill-name/
├── SKILL.md              # Main skill content
├── README.md             # Documentation of improvements (if applicable)
└── references/           # Optional: additional reference materials
```

### SKILL.md Format

```yaml
---
name: your-skill-name
version: 1.0.0
description: |
  Clear description of what this skill does and when to use it.
  Focus on triggering conditions and use cases.
---

# Skill Name

[Skill content following best practices]
```

### Testing Skills

Before submitting a skill:
- Test with Claude Code to ensure it loads correctly
- Verify the skill achieves its intended purpose
- Check that examples are accurate and working
- Ensure no security issues or credential exposure

## Contributing Configuration & Hooks

### Configuration Files

When contributing Claude Code configurations:
- Follow existing permission patterns
- Organize by category
- Add clear comments
- Test in your environment first

### Hooks

When contributing hooks:
- Provide clear documentation
- Include usage examples
- Note any dependencies
- Test across different scenarios

## Code Standards

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
```
feat(skills): add performance-optimization skill
fix(tdd): correct mock bootstrap guidance
docs: update installation instructions
```

### Documentation

- Use clear, concise language
- Include examples where helpful
- Keep README files up to date
- Add comments for complex logic

## Pull Request Process

1. **Update documentation** for any changes
2. **Test thoroughly** in your environment
3. **Follow commit conventions**
4. **Provide clear PR description**:
   - What does this change?
   - Why is it needed?
   - How was it tested?
5. **Link related issues** if applicable
6. **Request review** from maintainers

## Skill Quality Bar

A skill earns its place only if it adds knowledge, guardrails, or workflows a strong model would not reliably produce on its own (recent or obscure facts, exact CLI flags, gotchas, opinionated procedures). Before opening a PR:

1. **Cut generic advice.** Remove anything a frontier model already says unprompted ("tag your resources", "don't log secrets").
2. **Verify every fact you add.** Check CLI flags with `<cli> <command> --help`, service behavior against the vendor docs, and prices against the vendor price list. If you cannot verify a claim, leave it out.
3. **Date drift-prone content.** Add or update a `Last verified: YYYY-MM-DD` line in skills whose facts can drift.
4. **Do not hard-code prices** unless they are verified, dated, and sourced.
5. **Run `npm run skills:ci`.** It validates structure and registries, runs the install smoke test and secret scan, and lints OCI commands and IAM policy syntax (`scripts/ci/lint-oci-content.mjs`).
   The CLI half needs the OCI CLI (`pip install oci-cli`); without it the lint warns and checks policy syntax only. Run it alone with `npm run skills:oci-lint`.
6. **Use the OCI pressure scenarios** in `skills/oci-skill-pressure-scenarios.md` when editing Oracle skills.

## Reporting Issues

### Bug Reports

Include:
- **Description**: What's broken?
- **Expected behavior**: What should happen?
- **Actual behavior**: What happens instead?
- **Steps to reproduce**: Minimal example
- **Environment**: Claude Code version, OS, relevant config

### Feature Requests

Include:
- **Problem**: What problem does this solve?
- **Proposed solution**: How would it work?
- **Alternatives**: Other approaches considered?
- **Use cases**: Who would benefit?

## Code Review Guidelines

**For contributors:**
- Keep PRs focused (one skill/feature per PR)
- Respond to feedback constructively
- Be patient with the review process

**For reviewers:**
- Be respectful and constructive
- Focus on skill quality and usability
- Suggest improvements, don't demand perfection

## Questions?

- **Documentation**: See [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/acedergren/agentic-tools/issues)

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Community Standards

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards.
