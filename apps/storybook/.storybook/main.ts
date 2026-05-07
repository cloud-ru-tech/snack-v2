import { existsSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..', '..');

/**
 * Автоматически собирает алиасы `@ds/<pkg>` для всех `packages/<pkg>` с `src/index.ts`.
 * Чтобы добавить новый пакет в Storybook, достаточно создать `packages/<pkg>/src/index.ts` —
 * вручную править этот список не нужно.
 */
function collectDsAliases(): Record<string, string> {
  const packagesDir = join(root, 'packages');
  return Object.fromEntries(
    readdirSync(packagesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && existsSync(join(packagesDir, entry.name, 'src/index.ts')))
      .map(entry => [`@ds/${entry.name}`, join(packagesDir, entry.name, 'src/index.ts')]),
  );
}

/**
 * Ensure __REACT__ / __REACT_DOM__ are set before manager addon chunks run.
 * Addon chunks may execute before globals-runtime.js in some load orders; this avoids "React is not defined".
 */
const MANAGER_REACT_POLYFILL = `
<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
<script>
(function(){ if (typeof globalThis.__REACT__ !== 'undefined') return;
  globalThis.__REACT__ = globalThis.React;
  globalThis.__REACT_DOM__ = globalThis.ReactDOM;
  var r = globalThis.ReactDOM;
  globalThis.__REACT_DOM_CLIENT__ = r && { createRoot: r.createRoot, hydrateRoot: r.hydrateRoot };
})();
</script>
`;

const config: StorybookConfig = {
  stories: [join(root, 'packages/*/stories/**/*.stories.@(ts|tsx)')],
  managerHead: head => `${MANAGER_REACT_POLYFILL}${head ?? ''}`,
  addons: [
    join(__dirname, 'addons/theme-controls/preset.ts'),
    join(__dirname, 'addons/readme/preset.ts'),
    join(__dirname, 'addons/figma/preset.ts'),
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    // Stories live under packages/* — ensure automatic JSX runtime so JSX works without `import React`.
    config.esbuild = {
      ...config.esbuild,
      jsx: 'automatic',
      jsxImportSource: 'react',
    };

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        ...collectDsAliases(),
        '#storybook/components': join(__dirname, 'components/index.ts'),
        '#storybook/hooks/useDraggable': join(__dirname, 'hooks/useDraggable.ts'),
        '#storybook/hooks': join(__dirname, 'hooks/index.ts'),
        '#docs/lib/figma': join(root, 'apps/docs/src/lib/figma.ts'),
      },
    };

    config.css = {
      ...config.css,
      modules: { localsConvention: 'camelCaseOnly' },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [join(root, 'node_modules')],
        },
      },
    };

    return config;
  },
};

export default config;
