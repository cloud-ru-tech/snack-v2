# Multilingual Documentation Guide

## Overview

The documentation system now supports multiple languages (English and Russian by default). Starlight provides automatic language switching in the UI.

## Structure

### Package Documentation

For each package, create locale-specific documentation:

```
packages/
  avatar/
    docs/
      en/
        index.mdx
      ru/
        index.mdx
```

### Content Documentation

Main content pages are also organized by locale:

```
apps/docs/src/content/docs/
  en/
    index.mdx
    guides/
      button-layout-patterns.mdx
  ru/
    index.mdx
    guides/
      button-layout-patterns.mdx
```

## How It Works

### 1. Locales Configuration

Locales are configured in `apps/docs/astro.config.mjs`:

```js
locales: {
  en: {
    label: 'English',
    lang: 'en',
  },
  ru: {
    label: 'Русский',
    lang: 'ru',
  },
}
```

### 2. Automatic Sync

The `sync-package-docs` integration automatically:

- Detects locale structure in `packages/*/docs/{locale}/`
- Syncs files to `apps/docs/src/content/docs/{locale}/components/*/`
- Transforms import paths appropriately
- Supports both new locale structure and legacy structure (treated as 'en')

### 3. Language Switcher

Starlight automatically adds a language switcher to the UI. Users can switch between languages seamlessly.

## Adding a New Language

1. **Update Astro Config** (`apps/docs/astro.config.mjs`):

```js
locales: {
  en: { label: 'English', lang: 'en' },
  ru: { label: 'Русский', lang: 'ru' },
  es: { label: 'Español', lang: 'es' }, // Add new locale
}
```

2. **Update Sync Integration** (`apps/docs/src/integrations/sync-package-docs.js`):

```js
const SUPPORTED_LOCALES = ['en', 'ru', 'es']; // Add locale
```

3. **Create Locale Directories**:

```bash
# For package docs
mkdir -p packages/avatar/docs/es

# For content docs
mkdir -p apps/docs/src/content/docs/es
```

4. **Add Translations**:

- Create `index.mdx` for main page
- Translate component documentation
- Translate guides

## Writing Localized Documentation

### Frontmatter

Each MDX file should have proper frontmatter:

```mdx
---
title: Avatar
description: Component description
version: '0.1.0'
---
```

### Import Paths

Use relative paths from the docs directory:

```tsx
// In packages/avatar/docs/en/index.mdx or packages/avatar/docs/ru/index.mdx
import { Avatar } from '../../src';
import { ExampleContainer } from '../../../../../apps/docs/src/components/ExampleComponents';
```

The sync integration will automatically transform these paths during the sync process.

### Sidebar Translations

Update sidebar labels in `astro.config.mjs`:

```js
sidebar: [
  {
    label: 'Guides',
    translations: {
      ru: 'Руководства',
      es: 'Guías',
    },
    autogenerate: { directory: 'guides' },
  },
]
```

## Best Practices

1. **Keep Structure Consistent**: Use the same file structure for all locales
2. **Translate Everything**: Include titles, descriptions, examples, and code comments
3. **Use Native Examples**: Adapt examples to be culturally relevant when appropriate
4. **Version Sync**: Version numbers are automatically synced from package.json
5. **CHANGELOG and MIGRATION**: These are only generated for the 'en' locale to avoid duplication

## Development

When running the dev server, the sync integration watches for changes:

```bash
cd apps/docs
pnpm dev
```

Changes to package docs are automatically synced and hot-reloaded.

## Testing

Visit the documentation site and use the language switcher in the navigation to verify:

- All pages are available in both languages
- Language switching works correctly
- Component examples render properly
- All links work in both languages
