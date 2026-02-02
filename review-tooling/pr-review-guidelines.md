# Pull Request Review Guidelines

Agent-agnostic guidelines for reviewing pull requests with AI assistance.

## 🎯 Purpose

These guidelines help ensure consistent, thorough code reviews whether you're using Claude Code, GitHub Copilot, Cursor, Windsurf, or other AI coding assistants.

---

## 📖 Review Process

### 1. **Understand the Context** (5 minutes)

Before diving into code:
- Read the PR description completely
- Review linked issues or tickets
- Understand the "why" behind the change
- Check if breaking changes are introduced

**AI Prompt Examples:**
```
"Summarize the changes in this PR and their purpose"
"What problem does this PR solve?"
"List any breaking changes in this PR"
```

---

### 2. **High-Level Review** (10-15 minutes)

Review architecture and approach:
- Does the solution fit the problem?
- Are there simpler alternatives?
- Does it follow project conventions?
- Is the scope appropriate?

**AI Prompt Examples:**
```
"Review the architectural approach in this PR"
"Identify any design patterns used and if they're appropriate"
"Suggest simpler alternatives if any exist"
```

---

### 3. **Code Quality Review** (20-30 minutes)

Deep dive into code:
- Readability and maintainability
- Performance implications
- Error handling
- Edge cases

**AI Prompt Examples:**
```
"Review this file for code quality and best practices"
"Identify potential performance issues"
"Check error handling and edge cases"
"Find any code duplication or opportunities for refactoring"
```

---

### 4. **Security Review** (10-15 minutes)

Check for security vulnerabilities:
- Input validation
- Authentication/authorization
- Data exposure
- Dependency vulnerabilities

**AI Prompt Examples:**
```
"Identify security vulnerabilities in this code"
"Check for proper input validation and sanitization"
"Review authentication and authorization logic"
"Scan for hardcoded secrets or sensitive data"
```

---

### 5. **Testing Review** (10-15 minutes)

Verify test coverage:
- Are new features tested?
- Are edge cases covered?
- Are tests maintainable?

**AI Prompt Examples:**
```
"Evaluate test coverage for this PR"
"Identify untested edge cases"
"Suggest additional test cases"
```

---

## 🤖 Agent-Specific Workflows

### GitHub Copilot
```bash
# Review in VS Code
1. Open PR in GitHub
2. Use Copilot Chat: "@workspace review this PR for security issues"
3. Use inline suggestions for improvements
4. Create review comments directly in GitHub
```

### Claude Code
```bash
# Review with Claude Code CLI
1. Check out PR branch
2. Use Read tool to examine files
3. Ask: "Review these changes for quality and security"
4. Use Edit tool to suggest improvements
```

### Cursor
```bash
# Review in Cursor IDE
1. Open PR branch in Cursor
2. Use Cmd+K: "Review this file for best practices"
3. Use AI chat for specific questions
4. Apply suggested changes inline
```

### Windsurf
```bash
# Review in Windsurf
1. Open PR in editor
2. Use AI assistant: "Review for code quality"
3. Ask follow-up questions
4. Generate review comments
```

---

## ✅ Review Checklist

Use the [code-review-checklist.md](code-review-checklist.md) for a comprehensive list.

### Quick Checklist
- [ ] Code solves the stated problem
- [ ] No obvious bugs or security issues
- [ ] Tests are present and passing
- [ ] Documentation is updated
- [ ] Follows project conventions
- [ ] No unnecessary complexity
- [ ] Performance is acceptable
- [ ] Breaking changes are documented

---

## 💬 Writing Effective Review Comments

### ✅ Good Comments

**Specific and actionable:**
```
Consider extracting this logic into a separate function for reusability.
The `getUserData()` function could become a shared utility.
```

**Educational:**
```
This approach works, but using Array.filter() would be more performant
for large datasets. Here's an example: [code example]
```

**Balanced:**
```
Great error handling here! One suggestion: consider adding a retry
mechanism for transient network failures.
```

### ❌ Poor Comments

**Vague:**
```
This doesn't look right.
```

**Overly critical:**
```
This is terrible code.
```

**Nitpicky without value:**
```
Add a space here.
```

---

## 🎨 Comment Categories

Use these prefixes for clarity:

- **🐛 Bug**: Actual defects that need fixing
- **🔒 Security**: Security vulnerabilities or concerns
- **💡 Suggestion**: Optional improvements
- **❓ Question**: Seeking clarification
- **🎯 Critical**: Must be addressed before merge
- **✨ Praise**: Positive feedback (important!)

**Examples:**
```
🐛 Bug: This will throw a null reference error if user.profile is undefined.

🔒 Security: API key should be loaded from environment variables, not hardcoded.

💡 Suggestion: Consider using a Map instead of an object for O(1) lookups.

❓ Question: Is this backward compatible with the old API format?

🎯 Critical: Missing input validation - this could allow SQL injection.

✨ Praise: Excellent use of the decorator pattern here!
```

---

## 📊 Review Scope Guidelines

### Small PR (< 100 lines)
- **Time**: 15-20 minutes
- **Focus**: Code correctness, basic quality
- **Depth**: Thorough review of all lines

### Medium PR (100-400 lines)
- **Time**: 30-45 minutes
- **Focus**: Architecture, patterns, testing
- **Depth**: Detailed review with AI assistance

### Large PR (> 400 lines)
- **Time**: 60+ minutes or multiple sessions
- **Focus**: Request breakdown into smaller PRs
- **Depth**: High-level architecture review first

**Pro Tip**: If PR is too large, request it to be split:
```
This PR is quite large (1,200 lines). Consider breaking it into:
1. Database schema changes
2. API endpoint updates
3. Frontend UI changes

This would make review more thorough and merge safer.
```

---

## 🚦 Approval Criteria

### Must-Have (Blocking)
- ✅ No critical bugs
- ✅ No security vulnerabilities
- ✅ Tests pass
- ✅ Follows critical coding standards

### Should-Have (Request Changes)
- ⚠️ Missing tests for new functionality
- ⚠️ Performance concerns
- ⚠️ Poor error handling
- ⚠️ Insufficient documentation

### Nice-to-Have (Comment Only)
- 💬 Code style improvements
- 💬 Refactoring opportunities
- 💬 Additional test coverage

---

## 🔄 Follow-up Review

After changes are made:

1. **Verify fixes**: Check that your comments were addressed
2. **Re-review changed files**: Don't just assume fixes are correct
3. **Check for new issues**: Fixes might introduce new problems
4. **Approve or request more changes**: Be clear about status

**AI Prompt Examples:**
```
"Review the changes made since my last review"
"Check if my previous comments were addressed correctly"
"Identify any new issues introduced by recent changes"
```

---

## 📚 Resources

- [Code Review Checklist](code-review-checklist.md) - Comprehensive checklist
- [PR Templates](../git-workflow/pr-templates/) - PR description templates
- [Commit Templates](../git-workflow/commit-templates/) - Commit message templates

---

## 🎓 Best Practices

1. **Review promptly**: Aim for < 24 hours response time
2. **Be respectful**: Remember there's a person behind the code
3. **Provide context**: Explain the "why" behind your suggestions
4. **Praise good work**: Positive feedback is valuable
5. **Use AI wisely**: Use AI for initial scan, human judgment for final decisions
6. **Stay consistent**: Use the same standards for all reviews
7. **Keep learning**: Share knowledge during reviews

---

## 🤝 Reviewer Responsibilities

As a reviewer, you are responsible for:

✅ **Code quality** - Ensuring maintainable, readable code
✅ **Security** - Catching vulnerabilities before production
✅ **Knowledge sharing** - Teaching through reviews
✅ **Timely feedback** - Not blocking progress unnecessarily
✅ **Consistency** - Applying standards fairly

❌ **Not responsible for:**
- Rewriting the entire PR
- Enforcing personal preferences
- Holding up PRs for trivial issues
- Being a gatekeeper instead of a collaborator

---

**Last Updated**: January 2026
**Compatible with**: Claude Code, GitHub Copilot, Cursor, Windsurf, and other AI coding assistants
