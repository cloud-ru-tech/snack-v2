import * as fs from 'fs';
import * as path from 'path';

import { logDebug, logSuccess } from './console';
import { ensureDirectory } from './ensureDirectory';

const PACKAGES_DIR = path.resolve(__dirname, '../../packages');

/**
 * Get list of existing package names
 */
export function getExistingPackageNames(): string[] {
  if (!fs.existsSync(PACKAGES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export const ExistingPackageNames = getExistingPackageNames();

export type PackageConfig = {
  packageRootFolderName: string;
  user: string;
  email: string;
  packageTitle: string;
  packageName: string;
  componentName: string;
  packageDescription: string;
};

// Function declarations (hoisted)
function createPackageJson(packageDir: string, config: PackageConfig): void {
  const content = {
    name: `@design-system/${config.packageRootFolderName}`,
    version: '0.1.0',
    private: false,
    description:
      config.packageDescription || `${config.packageTitle} component for the design system`,
    types: './dist/esm/index.d.ts',
    main: './dist/cjs/index.js',
    module: './dist/esm/index.js',
    exports: {
      '.': {
        types: './dist/esm/index.d.ts',
        import: './dist/esm/index.js',
        require: './dist/cjs/index.js',
      },
      './package.json': './package.json',
    },
    files: ['dist/cjs', 'dist/esm', 'src', 'README.md', 'CHANGELOG.md', 'MIGRATION.md'],
    sideEffects: ['**/*.css', '**/*.scss'],
    scripts: {},
    peerDependencies: {
      react: '>=18.3.0',
      'react-dom': '>=18.3.0',
    },
    devDependencies: {
      react: '^19.2.1',
      'react-dom': '^19.2.1',
    },
    dependencies: {
      classnames: '^2.5.1',
    },
    publishConfig: {
      access: 'public',
    },
  };

  fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(content, null, 2));
  logDebug('Created package.json');
}

function createTsConfigs(packageDir: string): void {
  const esmConfig = {
    extends: '../tsconfig.esm.json',
    compilerOptions: {
      rootDir: './src',
      outDir: './dist/esm',
    },
    include: ['./src', '../../types'],
    exclude: ['./dist', './stories', './__tests__', './__test__', './docs'],
  };

  const cjsConfig = {
    extends: '../tsconfig.cjs.json',
    compilerOptions: {
      rootDir: './src',
      outDir: './dist/cjs',
    },
    include: ['./src', '../../types'],
    exclude: ['./dist', './stories', './__tests__', './__test__', './docs'],
  };

  fs.writeFileSync(path.join(packageDir, 'tsconfig.esm.json'), JSON.stringify(esmConfig, null, 2));
  fs.writeFileSync(path.join(packageDir, 'tsconfig.cjs.json'), JSON.stringify(cjsConfig, null, 2));
  logDebug('Created tsconfig.esm.json and tsconfig.cjs.json');
}

function createComponentFile(packageDir: string, config: PackageConfig): void {
  const content = `import styles from './styles.module.scss';

export interface ${config.componentName}Props {
  // TODO: Добавьте props для компонента
}

/**
 * ${config.packageTitle} компонент
 * 
 * TODO: Добавьте описание компонента
 */
export function ${config.componentName}(props: ${config.componentName}Props) {
  // TODO: Реализуйте компонент
  return null;
}
`;

  fs.writeFileSync(path.join(packageDir, 'src', `${config.componentName}.tsx`), content);
  logDebug(`Created ${config.componentName}.tsx`);
}

function createIndexFile(packageDir: string, config: PackageConfig): void {
  const content = `export { ${config.componentName} } from './${config.componentName}';
export type { ${config.componentName}Props } from './${config.componentName}';
`;

  fs.writeFileSync(path.join(packageDir, 'src', 'index.ts'), content);
  logDebug('Created index.ts');
}

function createTypesFile(packageDir: string): void {
  const content = `// TODO: Добавьте типы для компонента
`;

  fs.writeFileSync(path.join(packageDir, 'src', 'types.ts'), content);
  logDebug('Created types.ts');
}

function createConstantsFile(packageDir: string): void {
  const content = `// TODO: Добавьте константы для компонента (например, размеры, варианты и т.д.)
`;

  fs.writeFileSync(path.join(packageDir, 'src', 'constants.ts'), content);
  logDebug('Created constants.ts');
}

function createStylesFile(packageDir: string, config: PackageConfig): void {
  const content = `// Базовые функции и миксины из пакета
@use '@sbercloud/figma-variables/build/scss/styles/styles.module' as base;

// TODO: Подключите нужный компонент из Figma Variables
// @use '@sbercloud/figma-variables/build/scss/components/button.module' as button;

// TODO: Добавьте стили для компонента
.${config.packageRootFolderName.replace(/-/g, '_')} {
  // Ваши стили здесь
}
`;

  fs.writeFileSync(path.join(packageDir, 'src', 'styles.module.scss'), content);
  logDebug('Created styles.module.scss');
}

function createStoryFile(packageDir: string, config: PackageConfig): void {
  const content = `import type { Meta, StoryObj } from '@storybook/react';
import { ${config.componentName}, ${config.componentName}Props } from '../src';

const meta: Meta<${config.componentName}Props> = {
  title: 'Components/${config.packageTitle}',
  component: ${config.componentName},
  parameters: {
    // TODO: Добавьте ссылку на Figma дизайн
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
  },
};

export default meta;
type Story = StoryObj<${config.componentName}Props>;

// TODO: Добавьте stories для компонента
export const Basic: Story = {
  args: {},
};
`;

  const storiesDir = path.join(packageDir, 'stories');
  fs.writeFileSync(path.join(storiesDir, `${config.componentName}.stories.tsx`), content);
  logDebug(`Created stories/${config.componentName}.stories.tsx`);
}

function createDocsIndexMdx(packageDir: string, config: PackageConfig): void {
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
import { LocaleProvider, LocaleSwitch, LocaleCase } from '../../../astro/src/components/mdx';
import { translations } from './i18n';

export const t = translations;

<LocaleProvider locale={frontmatter.locale || 'en'}>

# {t[frontmatter.locale || 'en'].title}

{/* TODO: Добавьте введение для компонента */}

**Version:** \`{frontmatter.version}\`

## Changelog

import Changelog from '../../../astro/src/components/astro/Changelog.astro';

<Changelog packageName="${config.packageRootFolderName}" />

import LlmLink from '../../../astro/src/components/astro/LlmLink.astro';

<LlmLink component="${config.packageRootFolderName}" />

## Overview

{/* TODO: Добавьте описание компонента */}

- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description

## Examples

{/* TODO: Добавьте примеры использования */}

### Basic Usage

\`\`\`tsx
import { ${config.componentName} } from '@design-system/${config.packageRootFolderName}';

export function Example() {
  return <${config.componentName} />;
}
\`\`\`

<ExampleContainer>
  <${config.componentName} />
</ExampleContainer>

## API Reference

{/* TODO: Добавьте документацию по API */}

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ... | ... | ... | ... |

## Accessibility

{/* TODO: Добавьте информацию об accessibility */}

## Best Practices

{/* TODO: Добавьте best practices */}

1. Recommendation 1
2. Recommendation 2
3. Recommendation 3

</LocaleProvider>
`;

  fs.writeFileSync(path.join(packageDir, 'docs', 'index.mdx'), content);
  logDebug('Created docs/index.mdx');
}

function createReadme(packageDir: string, config: PackageConfig): void {
  const content = `# ${config.packageTitle}

<!-- TODO: Добавьте описание компонента -->

**Version:** \`0.1.0\`

**Package:** \`@design-system/${config.packageRootFolderName}\`

## Installation

\`\`\`bash
pnpm add @design-system/${config.packageRootFolderName}
\`\`\`

## Usage

<!-- TODO: Добавьте примеры использования -->

\`\`\`tsx
import { ${config.componentName} } from '@design-system/${config.packageRootFolderName}';

export function Example() {
  return <${config.componentName} />;
}
\`\`\`

## Documentation

- [Storybook](../../storybook) - Interactive examples
- [Full Documentation](./docs/index.mdx) - Complete API reference
- [Changelog](./CHANGELOG.md) - Version history
- [Migration Guide](./MIGRATION.md) - Migration instructions
`;

  fs.writeFileSync(path.join(packageDir, 'README.md'), content);
  logDebug('Created README.md');
}

function createChangelog(packageDir: string, config: PackageConfig): void {
  const today = new Date().toISOString().split('T')[0];
  const content = `# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - ${today}

### Added

- Initial release of ${config.packageTitle}
- Basic component implementation
- TypeScript support
- Storybook integration
`;

  fs.writeFileSync(path.join(packageDir, 'CHANGELOG.md'), content);
  logDebug('Created CHANGELOG.md');
}

function createMigration(packageDir: string): void {
  const content = `# Migration Guide

## Upgrading to 0.1.0

Initial release. No migration needed.
`;

  fs.writeFileSync(path.join(packageDir, 'MIGRATION.md'), content);
  logDebug('Created MIGRATION.md');
}

function createI18nFiles(packageDir: string, config: PackageConfig): void {
  const enContent = {
    title: config.packageTitle,
    description: config.packageDescription || `${config.packageTitle} component`,
  };

  const ruContent = {
    title: config.packageTitle,
    description: config.packageDescription || `Компонент ${config.packageTitle}`,
  };

  const indexContent = `export { default as en } from './en.json';
export { default as ru } from './ru.json';
`;

  fs.writeFileSync(
    path.join(packageDir, 'docs/i18n', 'en.json'),
    JSON.stringify(enContent, null, 2)
  );
  fs.writeFileSync(
    path.join(packageDir, 'docs/i18n', 'ru.json'),
    JSON.stringify(ruContent, null, 2)
  );
  fs.writeFileSync(path.join(packageDir, 'docs/i18n', 'index.ts'), indexContent);

  logDebug('Created i18n files');
}

/**
 * Bootstrap files for a new package
 */
export function bootstrapFiles(config: PackageConfig): void {
  const packageDir = path.join(PACKAGES_DIR, config.packageRootFolderName);

  ensureDirectory(packageDir);
  ensureDirectory(path.join(packageDir, 'src'));
  ensureDirectory(path.join(packageDir, 'docs'));
  ensureDirectory(path.join(packageDir, 'docs/i18n'));

  // Create package.json
  createPackageJson(packageDir, config);

  // Create tsconfig.esm.json and tsconfig.cjs.json
  createTsConfigs(packageDir);

  // Create source files
  createComponentFile(packageDir, config);
  createIndexFile(packageDir, config);
  createTypesFile(packageDir);
  createConstantsFile(packageDir);
  createStylesFile(packageDir, config);

  // Create stories directory and story file
  ensureDirectory(path.join(packageDir, 'stories'));
  createStoryFile(packageDir, config);

  // Create docs/index.mdx
  createDocsIndexMdx(packageDir, config);

  // Create README
  createReadme(packageDir, config);

  // Create CHANGELOG
  createChangelog(packageDir, config);

  // Create MIGRATION
  createMigration(packageDir);

  // Create i18n files
  createI18nFiles(packageDir, config);

  logSuccess(`Created package structure in ${packageDir}`);
}
