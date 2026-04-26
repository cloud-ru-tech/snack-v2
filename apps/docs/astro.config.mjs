import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { remarkExampleCode } from './src/plugins/remark-example-code.mjs';
import { remarkInternalBaseUrl } from './src/plugins/remark-internal-base-url.mjs';

const dir = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(dir, '../..');

/** Vite aliases: @ds/* → package source so SCSS modules resolve in docs dev/build. */
function dsWorkspaceSourceAliases() {
  const packagesDir = resolve(root, 'packages');
  const aliases = {};
  for (const folder of fs.readdirSync(packagesDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const manifestPath = resolve(packagesDir, folder.name, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;
    const pkg = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (typeof pkg.name !== 'string' || !pkg.name.startsWith('@ds/')) continue;
    const entry = resolve(packagesDir, folder.name, 'src/index.ts');
    if (!fs.existsSync(entry)) continue;
    aliases[pkg.name] = entry;
  }
  return aliases;
}

export default defineConfig({
  // Support deployment on subpaths via BASE_PATH env variable
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkExampleCode, remarkInternalBaseUrl],
    }),
    pagefind(),
  ],
  vite: {
    // @snack-uikit/list ESM entry re-exports `./components` (directory); Node SSR
    // rejects that unless Vite bundles the package.
    ssr: {
      noExternal: [
        '@snack-uikit/list',
        '@snack-uikit/dropdown',
        '@snack-uikit/popover-private',
        '@snack-uikit/popover',
        '@snack-uikit/utils',
        '@snack-uikit/button',
        '@snack-uikit/counter',
        '@snack-uikit/loaders',
        '@snack-uikit/divider',
        '@snack-uikit/locale',
        '@snack-uikit/truncate-string',
        '@snack-uikit/tooltip',
        '@snack-uikit/icons',
        '@snack-uikit/info-block',
        '@snack-uikit/icon-predefined',
        '@snack-uikit/typography',
        '@snack-uikit/toggles',
        '@snack-uikit/scroll',
        '@snack-uikit/search-private',
        '@snack-uikit/input-private',
      ],
    },
    resolve: {
      alias: {
        // ~docs points to apps/docs/src — used by package demos to import Canvas etc.
        '~docs': resolve(dir, 'src'),
        ...dsWorkspaceSourceAliases(),
      },
    },
    css: {
      modules: { localsConvention: 'camelCaseOnly' },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [resolve(root, 'node_modules')],
        },
      },
    },
  },
});
