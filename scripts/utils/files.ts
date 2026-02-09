import * as fs from 'fs';
import * as path from 'path';

import { logDebug, logSuccess } from './console';
import { ensureDirectory } from './ensureDirectory';
import { createDocsIndexMdxWithDocgen, createReadmeWithDocgen } from './filesDocgenPatches';

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
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
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
    description: config.packageDescription || `${config.packageTitle} component for the design system`,
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
    dependencies: {
      classnames: '2.5.1',
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
  const readmeVarName = `${config.packageRootFolderName.replace(/-/g, '')}Readme`;
  const packageScopeName = `@design-system/${config.packageRootFolderName}`;

  const content = `import type { Meta, StoryObj } from '@storybook/react';

import ${readmeVarName} from '../../README.md?raw';
import { ${config.componentName}, ${config.componentName}Props } from '../../src';

const meta: Meta<${config.componentName}Props> = {
  title: 'Components/${config.componentName}',
  component: ${config.componentName},
  parameters: {
    readme: { content: ${readmeVarName} },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
    docs: {
      description: {
        component: \`
# ${config.componentName}

Краткое описание компонента и его назначения.

## Features

- Ключевая особенность 1
- Ключевая особенность 2

## Installation

\\\`\\\`\\\`bash
pnpm add ${packageScopeName}
\\\`\\\`\\\`

## Quick Start

\\\`\\\`\\\`tsx
import { ${config.componentName} } from '${packageScopeName}';

function Example() {
  return <${config.componentName} />;
}
\\\`\\\`\\\`
        \`,
      },
    },
  },
  args: {},
  argTypes: {
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<${config.componentName}Props>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
`;

  const storiesComponentDir = path.join(packageDir, 'stories', config.componentName);
  ensureDirectory(storiesComponentDir);
  fs.writeFileSync(path.join(storiesComponentDir, `${config.componentName}.Playground.stories.tsx`), content);
  logDebug(`Created stories/${config.componentName}/${config.componentName}.Playground.stories.tsx`);
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

function addPackageToTsconfigReferences(packageRootFolderName: string): void {
  const tsconfigCjsPath = path.join(PACKAGES_DIR, 'tsconfig.cjs.json');
  const tsconfigEsmPath = path.join(PACKAGES_DIR, 'tsconfig.esm.json');

  const addReference = (configPath: string, refPath: string): void => {
    const content = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(content) as { references: Array<{ path: string }> };
    const newRef = { path: refPath };
    if (config.references.some(r => r.path === newRef.path)) {
      return;
    }
    config.references.push(newRef);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  };

  addReference(tsconfigCjsPath, `./${packageRootFolderName}/tsconfig.cjs.json`);
  addReference(tsconfigEsmPath, `./${packageRootFolderName}/tsconfig.esm.json`);
  logDebug('Added package to packages/tsconfig.cjs.json and packages/tsconfig.esm.json references');
}

/**
 * Bootstrap files for a new package
 */
export function bootstrapFiles(config: PackageConfig): void {
  const packageDir = path.join(PACKAGES_DIR, config.packageRootFolderName);

  ensureDirectory(packageDir);
  ensureDirectory(path.join(packageDir, 'src'));
  ensureDirectory(path.join(packageDir, 'docs'));

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

  // Create docs/index.mdx with docgen placeholders
  createDocsIndexMdxWithDocgen(packageDir, config);

  // Create README with docgen notice
  createReadmeWithDocgen(packageDir, config);

  // Create CHANGELOG
  createChangelog(packageDir, config);

  // Create MIGRATION
  createMigration(packageDir);

  // Add package to packages/tsconfig.cjs.json and packages/tsconfig.esm.json references
  addPackageToTsconfigReferences(config.packageRootFolderName);

  logSuccess(`Created package structure in ${packageDir}`);
}
