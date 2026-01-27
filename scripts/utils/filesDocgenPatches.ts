/**
 * Обновленные функции для создания файлов с поддержкой docgen
 */
import * as fs from 'fs';
import * as path from 'path';

import { logDebug } from './console';
import { PackageConfig } from './files';

export function createDocsIndexMdxWithDocgen(packageDir: string, config: PackageConfig): void {
  const content = `---
title: ${config.packageTitle}
description: ${config.packageDescription || `${config.packageTitle} component`}
version: '0.1.0'
---

import { ${config.componentName} } from '../src';
import {
  ExampleContainer,
  ExampleRow,
  ExampleGrid,
  ExampleItem,
} from '../../../astro/src/components/mdx';

# ${config.packageTitle}

{/* TODO: Add component description */}

**Version:** \`{frontmatter.version}\`

## Installation

\`\`\`bash
npm install @design-system/${config.packageRootFolderName}
# or
yarn add @design-system/${config.packageRootFolderName}
# or
pnpm add @design-system/${config.packageRootFolderName}
\`\`\`

## Changelog

import Changelog from '../../../astro/src/components/astro/Changelog.astro';

<Changelog packageName="${config.packageRootFolderName}" />

import LlmLink from '../../../astro/src/components/astro/LlmLink.astro';

<LlmLink component="${config.packageRootFolderName}" />

## Overview

{/* TODO: Add detailed component overview */}

${config.packageTitle} is a component for... It automatically handles:

- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description

## Live examples

{/* TODO: Add live examples */}

### Basic usage

<ExampleContainer>
  <${config.componentName} />
</ExampleContainer>

## Storybook

import StorybookIframe from '../../../astro/src/components/astro/StorybookIframe.astro';

<StorybookIframe storyId="components-${config.packageRootFolderName}--basic" showControls={true} height="600px" />

## Usage

### Basic example

\`\`\`tsx
import { ${config.componentName} } from '@design-system/${config.packageRootFolderName}';

export function Example() {
  return <${config.componentName} />;
}
\`\`\`

### With props

\`\`\`tsx
import { ${config.componentName} } from '@design-system/${config.packageRootFolderName}';

export function Example() {
  return <${config.componentName} prop="value" />;
}
\`\`\`

## Props

[//]: DOCUMENTATION_SECTION_START
[//]: DOCUMENTATION_SECTION_END

## Accessibility

{/* TODO: Add accessibility information */}

- Semantic HTML structure ensures screen reader compatibility
- Component accepts all standard HTML attributes for customization

## Best practices

{/* TODO: Add best practices */}

1. **Best practice 1** — Description
2. **Best practice 2** — Description
3. **Best practice 3** — Description
`;

  fs.writeFileSync(path.join(packageDir, 'docs', 'index.mdx'), content);
  logDebug('Created docs/index.mdx with docgen placeholders');
}

export function createReadmeWithDocgen(packageDir: string, config: PackageConfig): void {
  const content = `# ${config.packageTitle}

${config.packageDescription || `${config.packageTitle} component for the design system`}

## Installation

\`\`\`bash
npm install @design-system/${config.packageRootFolderName}
# or
yarn add @design-system/${config.packageRootFolderName}
# or
pnpm add @design-system/${config.packageRootFolderName}
\`\`\`

## Exports

\`\`\`typescript
import {
  ${config.componentName},
  type ${config.componentName}Props
} from '@design-system/${config.packageRootFolderName}';
\`\`\`

## Usage

### Basic example

\`\`\`tsx
import { ${config.componentName} } from '@design-system/${config.packageRootFolderName}';

export function Example() {
  return <${config.componentName} />;
}
\`\`\`

## Props

{/* Props table will be auto-generated here from TypeScript types */}

## Best Practices

1. **Best practice 1** — Description
2. **Best practice 2** — Description
3. **Best practice 3** — Description

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)

---

> **Note:** This README is automatically generated from the documentation.  
> To update it, modify the \`docs/index.mdx\` file and run \`npm run docgen:all\`.
`;

  fs.writeFileSync(path.join(packageDir, 'README.md'), content);
  logDebug('Created README.md with docgen notice');
}
