# Unified i18n Template System

## Overview

The documentation system now uses a **single unified template** with **separate translation dictionaries** to avoid code duplication across languages.

## How It Works

### 1. Single Template File

Each component has one `index.mdx` file in `packages/{component}/docs/`:

```
packages/avatar/docs/
  ├── index.mdx           # Single template file
  └── i18n/               # Translation dictionaries
      ├── en.ts
      ├── ru.ts
      └── index.ts
```

###  2. Translation Dictionaries

Translations are stored in TypeScript files with type safety:

```typescript
// packages/avatar/docs/i18n/en.ts
export const en = {
  title: 'Avatar',
  description: 'Component description',
  overview: {
    title: 'Overview',
    text: 'Component overview...',
  },
};

export type AvatarTranslations = typeof en;
```

```typescript
// packages/avatar/docs/i18n/ru.ts
import type { AvatarTranslations } from './en';

export const ru: AvatarTranslations = {
  title: 'Avatar (Аватар)',
  description: 'Описание компонента',
  overview: {
    title: 'Обзор',
    text: 'Обзор компонента...',
  },
};
```

### 3. Template Syntax

Use translation keys in the template:

```mdx
---
title: Avatar
---

import { translations } from './i18n';
import { LocaleProvider, LocaleSwitch, LocaleCase } from '../../../apps/docs/src/components/Trans';

export const t = translations;

<LocaleProvider locale={frontmatter.locale || 'en'}>

# {t[frontmatter.locale || 'en'].title}

{t[frontmatter.locale || 'en'].description}

## {t[frontmatter.locale || 'en'].overview.title}

{t[frontmatter.locale || 'en'].overview.text}

</LocaleProvider>
```

### 4. Locale-Specific Content

Use `LocaleSwitch` for content that varies by locale:

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

### 5. Automatic Generation

The build system automatically:
1. Detects i18n templates (files with `import from './i18n'`)
2. Copies i18n translations to shared location
3. Generates locale-specific versions:
   - `apps/docs/src/content/docs/en/components/{pkg}/index.mdx`
   - `apps/docs/src/content/docs/ru/components/{pkg}/index.mdx`
4. Injects `locale` field into frontmatter
5. Transforms import paths

## File Structure

### Source (in packages)

```
packages/avatar/docs/
  ├── index.mdx           # Unified template
  ├── i18n/
  │   ├── en.ts          # English translations
  │   ├── ru.ts          # Russian translations
  │   └── index.ts       # Export
  ├── CHANGELOG.md        # Auto-synced (en only)
  └── MIGRATION.md        # Auto-synced (en only)
```

### Generated (in apps/docs)

```
apps/docs/src/content/docs/
  ├── components/
  │   └── avatar/
  │       └── i18n/       # Shared translations
  │           ├── en.ts
  │           ├── ru.ts
  │           └── index.ts
  ├── en/
  │   └── components/
  │       └── avatar/
  │           ├── index.mdx      # EN version (locale: en)
  │           ├── CHANGELOG.mdx
  │           └── MIGRATION.mdx
  └── ru/
      └── components/
          └── avatar/
              └── index.mdx      # RU version (locale: ru)
```

## Benefits

### ✅ No Duplication
- Structure defined once
- Translations separate
- Easy to maintain

### ✅ Type Safety
- TypeScript checks structure consistency
- Autocomplete for translation keys
- Compile-time error detection

### ✅ Code Reduction
- **Old approach**: ~874 lines (437 × 2 languages)
- **New approach**: ~500 lines (200 structure + 150 × 2 translations)
- **Savings**: 42% less code

### ✅ Easy to Add Languages
Just create new translation file:

```typescript
// packages/avatar/docs/i18n/es.ts
import type { AvatarTranslations } from './en';

export const es: AvatarTranslations = {
  // ... Spanish translations
};
```

Update `sync-package-docs.js`:
```javascript
const SUPPORTED_LOCALES = ['en', 'ru', 'es'];
```

Done! All documentation automatically available in Spanish.

## Components

### LocaleProvider
Provides locale context to child components:

```tsx
<LocaleProvider locale="en">
  {/* content */}
</LocaleProvider>
```

### LocaleSwitch / LocaleCase
Conditional rendering based on locale:

```tsx
<LocaleSwitch>
  <LocaleCase locale="en">English content</LocaleCase>
  <LocaleCase locale="ru">Русский контент</LocaleCase>
</LocaleSwitch>
```

## Migration Guide

### From Old Structure

**Before:**
```
packages/avatar/docs/
  ├── en/
  │   └── index.mdx      # 437 lines
  └── ru/
      └── index.mdx      # 437 lines
```

**After:**
```
packages/avatar/docs/
  ├── index.mdx          # 200 lines (structure)
  └── i18n/
      ├── en.ts          # 150 lines (translations)
      ├── ru.ts          # 150 lines (translations)
      └── index.ts       # 5 lines
```

### Steps

1. **Extract translations** from en/index.mdx to i18n/en.ts
2. **Extract translations** from ru/index.mdx to i18n/ru.ts
3. **Create unified template** index.mdx using translation keys
4. **Delete** old en/ and ru/ directories
5. **Restart** dev server to regenerate

## Best Practices

### 1. Hierarchical Structure
Organize translations logically:

```typescript
export const translations = {
  title: '...',
  sections: {
    overview: { ... },
    examples: { ... },
  },
  useCases: { ... },
};
```

### 2. Type Safety
Always use the base language type:

```typescript
export type ComponentTranslations = typeof en;
export const ru: ComponentTranslations = { ... };
```

### 3. Consistent Keys
All languages must have identical structure:

```typescript
// ✅ Good
en: { title: 'Hello', subtitle: 'World' }
ru: { title: 'Привет', subtitle: 'Мир' }

// ❌ Bad
en: { title: 'Hello', subtitle: 'World' }
ru: { title: 'Привет' }  // Missing subtitle!
```

### 4. Locale-Specific Examples
Use real, culturally appropriate examples:

```tsx
<LocaleSwitch>
  <LocaleCase locale="en">
    <Avatar name="John Doe" />
  </LocaleCase>
  <LocaleCase locale="ru">
    <Avatar name="Иван Иванов" />
  </LocaleCase>
</LocaleSwitch>
```

### 5. Code Examples
Keep code examples universal (English is standard):

```tsx
// Universal - no translation needed
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name="John Doe" />;
}
```

## Technical Details

### Detection
System detects i18n templates by checking:
1. File exists: `packages/*/docs/index.mdx`
2. Directory exists: `packages/*/docs/i18n/`
3. Content includes: `from './i18n'`

### Generation Process
For each template:
1. Read template file
2. Update version in frontmatter
3. Copy i18n directory to shared location
4. For each locale:
   - Inject `locale: {lang}` into frontmatter
   - Transform import paths
   - Fix i18n import path
   - Write to locale-specific directory

### Import Path Transformations
```typescript
// Source: packages/avatar/docs/index.mdx
from '../src'                           // Component imports
from '../../../apps/docs/src/components' // Doc components
from './i18n'                           // Translations

// Generated: apps/docs/src/content/docs/en/components/avatar/index.mdx
from '@packages/avatar/src'             // Component imports
from '../../../../../components'       // Doc components
from '../../components/avatar/i18n'    // Translations
```

## Troubleshooting

### Translation Keys Not Found
**Symptom**: `undefined` displayed instead of text

**Solution**: Check that all translation files have the same structure:
```bash
# Compare structures
diff <(jq -S 'keys' i18n/en.ts) <(jq -S 'keys' i18n/ru.ts)
```

### Import Errors
**Symptom**: `Cannot find module './i18n'`

**Solution**: Restart dev server to regenerate files and copy i18n directory

### Locale Not Switching
**Symptom**: Always shows English

**Solution**: Check frontmatter has `locale` field:
```yaml
---
locale: en  # or ru
---
```

## Summary

The unified i18n template system provides:
- ✅ **42% less code** compared to duplicated files
- ✅ **Type-safe translations** with TypeScript
- ✅ **Easy maintenance** - change structure once
- ✅ **Simple to add languages** - just one file
- ✅ **Automatic generation** - no manual sync needed

Use this approach for all new component documentation!
