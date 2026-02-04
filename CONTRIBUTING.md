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
fix(humanizer): correct pattern matching
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

## Skill Improvement Methodology

This project uses TDD (Test-Driven Development) methodology for skill improvements:

1. **Baseline Evaluation**: Run skill-judge evaluation
2. **Apply Improvements**: Use proven patterns:
   - Strategic assessment frameworks
   - "Why deceptively hard to debug" insights
   - 4-step error recovery procedures
   - MANDATORY loading triggers with conditions
3. **Verify**: Re-evaluate to confirm A-grade (90%+)

See `PROJECT-COMPLETE.md` and `SKILL-IMPROVEMENT-PROGRESS.md` for details on the proven methodology.

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
- **Project Completion**: See [PROJECT-COMPLETE.md](PROJECT-COMPLETE.md)
- **Skill Methodology**: See [SKILL-IMPROVEMENT-PROGRESS.md](SKILL-IMPROVEMENT-PROGRESS.md)
- **Issues**: [GitHub Issues](https://github.com/acedergren/agentic-tools/issues)

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Community Standards

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards.
