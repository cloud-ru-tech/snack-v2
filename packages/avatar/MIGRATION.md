# Migration Guide

This guide provides instructions for LLM agents to migrate between versions of the `@design-system/avatar` package.

## Purpose

This migration guide is designed to help LLM agents automatically migrate code when upgrading between major versions of the `@design-system/avatar` package. Each major version change includes detailed instructions about:

- Breaking changes in the API
- Prop renames or removals
- Type changes
- Required code modifications
- Examples of before/after code

## Version 0.1.0

### Initial Release

This is the initial release of the Avatar component. No migration is needed as this is the first version.

**Key features:**

- Image support with fallback to initials
- Multiple sizes and shapes
- Color schemes
- TypeScript support

## Future Versions

When new major versions are released, migration instructions will be added here following this format:

### Migration from X.Y.Z to A.B.C

#### Breaking Changes

1. **Prop Rename: `oldProp` → `newProp`**
   - **Reason:** Better naming convention
   - **Action Required:** Replace all instances of `oldProp` with `newProp`
   - **Example:**

     ```tsx
     // Before
     <Avatar name="John" oldProp="value" />

     // After
     <Avatar name="John" newProp="value" />
     ```

2. **Removed Prop: `deprecatedProp`**
   - **Reason:** No longer needed, functionality merged into another prop
   - **Action Required:** Remove `deprecatedProp` and use `newProp` instead
   - **Example:**

     ```tsx
     // Before
     <Avatar name="John" deprecatedProp="value" />

     // After
     <Avatar name="John" newProp="value" />
     ```

3. **Type Change: `size` prop**
   - **Reason:** Expanded size options
   - **Action Required:** Update size values to new enum
   - **Example:**

     ```tsx
     // Before
     <Avatar name="John" size="large" />

     // After
     <Avatar name="John" size={SIZE.Xl} />
     ```

#### Non-Breaking Changes

- New optional props added (no migration needed)
- Performance improvements (no migration needed)
- Bug fixes (no migration needed)

#### Migration Steps

1. Update package version in `package.json`
2. Review breaking changes section
3. Search codebase for affected props/APIs
4. Apply code transformations as shown in examples
5. Run type checking: `tsc --noEmit`
6. Test affected components
7. Update tests if needed

#### Automated Migration Script

For LLM agents, here's a pattern to follow:

```typescript
// Migration pattern for LLM agents
function migrateAvatarComponent(code: string, fromVersion: string, toVersion: string): string {
  // 1. Parse code to AST
  // 2. Find all Avatar component usages
  // 3. Apply transformations based on version differences
  // 4. Return migrated code
  // Example transformations:
  // - Replace prop names
  // - Update import paths
  // - Fix type annotations
  // - Remove deprecated props
}
```

## Notes for LLM Agents

- Always check the CHANGELOG.md for detailed version history
- Breaking changes are only introduced in major version bumps (X.0.0)
- Minor and patch versions (0.X.Y) are backward compatible
- When in doubt, refer to the component's TypeScript types for the current API
- Test migrations in a separate branch before applying to main codebase

















