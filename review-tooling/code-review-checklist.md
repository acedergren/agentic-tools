# Code Review Checklist

A comprehensive, agent-agnostic checklist for reviewing code changes with AI coding assistants.

## 📋 Pre-Review Setup

- [ ] Understand the context: What problem is being solved?
- [ ] Review linked issues or requirements
- [ ] Check branch naming follows project conventions
- [ ] Verify PR/commit title is descriptive

---

## 🔍 Code Quality

### Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled properly
- [ ] Error handling is appropriate and informative
- [ ] No obvious bugs or logic errors

### Readability
- [ ] Code is self-documenting with clear variable/function names
- [ ] Complex logic has explanatory comments
- [ ] Functions/methods are focused and single-purpose
- [ ] Code follows project style guide

### Performance
- [ ] No unnecessary computations or loops
- [ ] Efficient algorithms and data structures used
- [ ] Database queries are optimized (if applicable)
- [ ] Resource cleanup is handled (connections, files, etc.)

### Maintainability
- [ ] Code follows DRY principle (Don't Repeat Yourself)
- [ ] Magic numbers/strings are replaced with named constants
- [ ] Dependencies are minimal and justified
- [ ] Code is modular and reusable

---

## 🧪 Testing

- [ ] Unit tests cover new functionality
- [ ] Integration tests for connected components
- [ ] Edge cases and error paths are tested
- [ ] Tests are clear and maintainable
- [ ] All tests pass locally
- [ ] No tests were removed without justification

---

## 🔒 Security

- [ ] Input validation and sanitization
- [ ] No hardcoded secrets, passwords, or API keys
- [ ] Authentication and authorization checks
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] CSRF protection (where applicable)
- [ ] Sensitive data is properly encrypted
- [ ] Dependencies are from trusted sources
- [ ] No known vulnerabilities in new dependencies

---

## 📚 Documentation

- [ ] Public APIs have documentation
- [ ] Complex algorithms are explained
- [ ] README updated if needed
- [ ] Changelog updated (if applicable)
- [ ] Breaking changes are documented
- [ ] Migration guides provided (if needed)

---

## 🏗️ Architecture & Design

- [ ] Follows existing patterns and conventions
- [ ] Doesn't introduce unnecessary complexity
- [ ] Respects separation of concerns
- [ ] Interfaces/contracts are well-defined
- [ ] No tight coupling introduced
- [ ] Scalability considerations addressed

---

## 🔄 Git & Version Control

- [ ] Commits are atomic and focused
- [ ] Commit messages are clear and descriptive
- [ ] No unnecessary files in commits (build artifacts, etc.)
- [ ] Branch is up to date with target branch
- [ ] No merge conflicts
- [ ] History is clean (no debug commits)

---

## 💾 Database & Data

- [ ] Migrations are reversible
- [ ] Data integrity is maintained
- [ ] Indexes are appropriate
- [ ] No N+1 query problems
- [ ] Backward compatibility considered

---

## 🌐 API & Integration

- [ ] API contracts are maintained
- [ ] Versioning strategy followed
- [ ] Error responses are consistent
- [ ] Rate limiting considered
- [ ] Backwards compatibility maintained

---

## ♿ Accessibility (if UI changes)

- [ ] Semantic HTML used
- [ ] ARIA attributes where needed
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Sufficient color contrast

---

## 📱 Responsive Design (if UI changes)

- [ ] Works on mobile devices
- [ ] Works on tablets
- [ ] Works on desktop
- [ ] Touch targets are appropriate size
- [ ] Text is readable on all screen sizes

---

## 🚀 Deployment & Operations

- [ ] Environment variables documented
- [ ] Configuration changes documented
- [ ] Deployment steps documented
- [ ] Rollback plan exists (for risky changes)
- [ ] Monitoring/logging added for new features
- [ ] Performance impact assessed

---

## ✅ Final Checks

- [ ] All automated checks pass (CI/CD)
- [ ] No new warnings introduced
- [ ] Code compiles/builds successfully
- [ ] Manual testing completed
- [ ] Peer review completed (if required)
- [ ] All review comments addressed

---

## 💡 Reviewer Notes

Use this space to add specific notes about the review:

**Strengths:**
- 

**Concerns:**
- 

**Suggestions:**
- 

**Blockers:**
- 

---

## 🤖 AI Agent Tips

This checklist works with all AI coding assistants:

- **Claude Code**: Use in hooks or as reference during code review
- **GitHub Copilot**: Reference when reviewing pull requests
- **Cursor**: Use as part of your review workflow
- **Windsurf**: Include in review prompts
- **Codeium**: Reference for code quality checks

---

**Last Updated**: January 2026
