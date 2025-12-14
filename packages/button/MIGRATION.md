# Migration Guide

This guide provides instructions for LLM agents to migrate between versions of the `@design-system/button` package.

## Purpose

This migration guide is designed to help LLM agents automatically migrate code when upgrading between major versions of the `@design-system/button` package. Each major version change includes detailed instructions about:

- Breaking changes in the API
- Prop renames or removals
- Type changes
- Required code modifications
- Examples of before/after code

## Version 0.1.0

### Initial Release

This is the initial release of the Button component. No migration is needed as this is the first version.

**Key features:**

- Three variants: `primary`, `secondary`, `ghost`
- Three sizes: `sm`, `md`, `lg`
- Full width support
- IconButton component
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
     <Button oldProp="value">Click</Button>

     // After
     <Button newProp="value">Click</Button>
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

## Notes for LLM Agents

- Always check the CHANGELOG.md for detailed version history
- Breaking changes are only introduced in major version bumps (X.0.0)
- Minor and patch versions (0.X.Y) are backward compatible
- When in doubt, refer to the component's TypeScript types for the current API
- Test migrations in a separate branch before applying to main codebase
