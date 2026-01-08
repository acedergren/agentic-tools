## ⚠️ Breaking Change

<!-- High-level summary of the breaking change -->

## Motivation

<!-- Why is this breaking change necessary? -->
<!-- Why couldn't it be backward compatible? -->


## Breaking Changes

<!-- List all breaking changes introduced by this PR -->

1. **[Area/Component]**: Description of what breaks
2. **[Area/Component]**: Description of what breaks
3. ...

## Before vs After

### API Changes

**Before:**
```javascript
// Old API usage

```

**After:**
```javascript
// New API usage

```

### Behavior Changes

<!-- Describe any changes in behavior, side effects, or expected outcomes -->


## Migration Guide

<!-- Provide clear, step-by-step instructions for users to migrate -->

### For API Users

1. **Step 1**: Description
   ```javascript
   // Code example
   ```

2. **Step 2**: Description
   ```javascript
   // Code example
   ```

### For Package Consumers

```bash
# Update command
npm update package-name@latest

# Or with breaking change flag
npm install package-name@2.0.0
```

### Configuration Changes

**Old Configuration:**
```json
{
  "old": "config"
}
```

**New Configuration:**
```json
{
  "new": "config"
}
```

## Impact Assessment

### Who is Affected?

- [ ] All users
- [ ] API consumers only
- [ ] Specific feature users (list below)
- [ ] Internal systems only

**Affected areas:**
-
-
-

### Estimated Migration Effort

- [ ] Trivial (< 1 hour)
- [ ] Low (1-4 hours)
- [ ] Medium (1-2 days)
- [ ] High (> 2 days)

### Breaking Change Severity

- [ ] Minor - Easy to adapt
- [ ] Moderate - Requires code changes
- [ ] Major - Significant refactoring needed

## Deprecation Timeline (if applicable)

<!-- If this deprecates old functionality, provide timeline -->

- **Deprecation announced**: [date]
- **Old API still supported until**: [date]
- **Old API removed in**: [version]
- **Warning added to old API**: Yes/No

## Rollback Plan

<!-- How can this change be reverted if issues arise? -->

**Rollback steps:**
1.
2.
3.

**Rollback risk**: Low / Medium / High

## Testing

### Test Coverage

- [ ] Unit tests updated
- [ ] Integration tests updated
- [ ] E2E tests updated
- [ ] Backward compatibility tests (if applicable)
- [ ] Migration tests added

### Manual Testing Checklist

- [ ] Tested migration from previous version
- [ ] Tested new API/behavior
- [ ] Tested error cases
- [ ] Tested with real-world scenarios

## Documentation

- [ ] CHANGELOG.md updated with BREAKING CHANGE section
- [ ] README.md updated
- [ ] API documentation updated
- [ ] Migration guide created/updated
- [ ] Release notes drafted

## Communication Plan

<!-- How will users be notified of this breaking change? -->

- [ ] GitHub release notes
- [ ] Blog post
- [ ] Email to users
- [ ] In-app notification
- [ ] Social media announcement
- [ ] Documentation banner/warning

## Alternatives Considered

<!-- What other approaches were considered? Why was this chosen? -->

1. **Alternative 1**: Description
   - Pros:
   - Cons:
   - Why not chosen:

2. **Alternative 2**: Description
   - Pros:
   - Cons:
   - Why not chosen:

## Checklist

- [ ] Breaking changes clearly documented in commit message
- [ ] Migration guide complete and tested
- [ ] Impact assessment completed
- [ ] All affected tests updated
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Release notes drafted
- [ ] Rollback plan documented
- [ ] Communication plan defined
- [ ] Version bump planned (major version)

## Additional Notes

<!-- Any other context about this breaking change -->
