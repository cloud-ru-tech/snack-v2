# i18n Approach for Component Documentation

## Problem

When documenting components in multiple languages, we face significant code duplication:
- Same structure repeated in each language file
- Same examples, just with different text
- Hard to maintain consistency
- Changes need to be applied to all language versions

## Solution

Use a centralized translation system where:
1. **Structure is defined once** in a single MDX file
2. **Translations are stored separately** in TypeScript files
3. **React components handle** language switching
4. **Examples adapt** based on locale

## Architecture

### 1. Translation Files

Store translations in TypeScript for type safety:

```
packages/avatar/docs/i18n/
  ├── en.ts          # English translations
  ├── ru.ts          # Russian translations
  └── index.ts       # Export all translations
```

**Example: `i18n/en.ts`**

```typescript
export const en = {
  title: 'Avatar',
  description: 'User avatar component...',
  overview: {
    title: 'Overview',
    features: {
      imageLoading: 'Image loading with graceful fallback',
      // ... more nested translations
    },
  },
};

export type AvatarTranslations = typeof en;
```

**Example: `i18n/ru.ts`**

```typescript
import type { AvatarTranslations } from './en';

export const ru: AvatarTranslations = {
  title: 'Avatar (Аватар)',
  description: 'Компонент аватара пользователя...',
  overview: {
    title: 'Обзор',
    features: {
      imageLoading: 'Загрузку изображений с плавной заменой',
      // ... translations
    },
  },
};
```

### 2. Single MDX File

One MDX file uses translations:

**`packages/avatar/docs/index.i18n.mdx`**

```mdx
---
title: Avatar
locale: en  # Will be set dynamically
---

import { translations } from './i18n';
import { LocaleProvider, LocaleSwitch, LocaleCase } from '../../../apps/docs/src/components/Trans';

export const t = translations;

<LocaleProvider locale={frontmatter.locale || 'en'}>

# {t[frontmatter.locale || 'en'].title}

{t[frontmatter.locale || 'en'].description}

## {t[frontmatter.locale || 'en'].overview.title}

- **{t[frontmatter.locale || 'en'].overview.features.imageLoading}**

### Examples with locale-specific content

<LocaleSwitch>
  <LocaleCase locale="en">
    <Avatar name="John Doe" />
  </LocaleCase>
  <LocaleCase locale="ru">
    <Avatar name="Иван Иванов" />
  </LocaleCase>
</LocaleSwitch>

</LocaleProvider>
```

### 3. React Components

**LocaleProvider** - Provides locale context:

```tsx
<LocaleProvider locale="en">
  {/* content */}
</LocaleProvider>
```

**LocaleSwitch/LocaleCase** - Conditional rendering based on locale:

```tsx
<LocaleSwitch>
  <LocaleCase locale="en">English content</LocaleCase>
  <LocaleCase locale="ru">Русский контент</LocaleCase>
</LocaleSwitch>
```

## Benefits

### ✅ No Duplication

- Structure defined once
- Translations stored separately
- Easy to add new languages

### ✅ Type Safety

- TypeScript ensures all translations have same structure
- Autocomplete for translation keys
- Compile-time errors for missing translations

### ✅ Easy Maintenance

- Change structure in one place
- Update translations independently
- Clear separation of concerns

### ✅ Consistent

- Same structure across all languages
- No risk of structural differences
- Easier to review translations

## Comparison

### Old Approach (Duplicated Files)

```
packages/avatar/docs/
  en/
    index.mdx          # 400+ lines
  ru/
    index.mdx          # 400+ lines (90% same structure)
```

❌ 800+ lines of mostly duplicated code
❌ Hard to keep in sync
❌ Changes need to be applied twice

### New Approach (i18n)

```
packages/avatar/docs/
  i18n/
    en.ts              # ~150 lines (translations only)
    ru.ts              # ~150 lines (translations only)
    index.ts           # ~5 lines
  index.i18n.mdx       # ~200 lines (structure once)
```

✅ ~500 lines total
✅ Structure defined once
✅ Easy to maintain

## Migration Guide

### Step 1: Create Translation Files

1. Create `packages/{component}/docs/i18n/` directory
2. Extract all text from existing MDX into `en.ts`
3. Create type-safe interface
4. Copy and translate to `ru.ts`

### Step 2: Create Unified MDX

1. Create `index.i18n.mdx`
2. Import translations and components
3. Replace hard-coded text with `t[locale].key`
4. Use `LocaleSwitch` for locale-specific examples

### Step 3: Update Build Process

Modify `sync-package-docs.js` to:
1. Detect `.i18n.mdx` files
2. Generate locale-specific versions
3. Inject `locale` into frontmatter
4. Sync to appropriate directories

## Best Practices

### 1. Organize Translations Hierarchically

```typescript
export const translations = {
  // Top-level sections
  overview: { ... },
  examples: { ... },
  props: { ... },
  
  // Nest related translations
  useCases: {
    userProfiles: {
      title: '...',
      description: '...',
    },
  },
};
```

### 2. Use Type Safety

```typescript
// Define type from English (source)
export type MyTranslations = typeof en;

// Ensure other languages match
export const ru: MyTranslations = { ... };
```

### 3. Keep Structure Identical

All translations must have same keys:

```typescript
// ✅ Good
en: { title: 'Hello', subtitle: 'World' }
ru: { title: 'Привет', subtitle: 'Мир' }

// ❌ Bad
en: { title: 'Hello', subtitle: 'World' }
ru: { title: 'Привет' }  // Missing subtitle!
```

### 4. Locale-Specific Examples

Use `LocaleSwitch` for examples with real data:

```mdx
<LocaleSwitch>
  <LocaleCase locale="en">
    <Avatar name="John Doe" />
  </LocaleCase>
  <LocaleCase locale="ru">
    <Avatar name="Иван Иванов" />
  </LocaleCase>
</LocaleSwitch>
```

### 5. Keep Code Examples Language-Neutral

```tsx
// ✅ Good - code is universal
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name="John Doe" />;
}
```

Only translate comments if needed:

```tsx
// Comment can be translated via surrounding text
{t[locale].usage.basicExample}

\`\`\`tsx
// English/Russian comment here
\`\`\`
```

## Future Enhancements

### 1. Build-Time Generation

Current approach generates locale versions at sync time. Could enhance to:
- Pre-generate all locale versions during build
- Cache generated files
- Only regenerate when source changes

### 2. Hot Module Replacement

Support HMR for translations:
- Watch translation files
- Reload page when translations change
- Show translation keys during development

### 3. Translation Validation

Add validation to ensure:
- All required keys exist
- No orphaned translations
- Consistent formatting

### 4. CLI Tool

Create CLI for common tasks:

```bash
# Create new translation file
pnpm i18n:new --component=button --locale=es

# Validate translations
pnpm i18n:validate --component=avatar

# Find missing translations
pnpm i18n:check --locale=ru
```

## Summary

The i18n approach significantly reduces duplication while maintaining:
- ✅ Type safety
- ✅ Easy maintenance
- ✅ Consistent structure
- ✅ Locale-specific content where needed

Use this approach for all new component documentation to keep the codebase maintainable and scalable.
