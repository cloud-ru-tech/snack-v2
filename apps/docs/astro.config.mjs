import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { remarkExampleCode } from './src/plugins/remark-example-code.mjs';
import { remarkExampleHeadings } from './src/plugins/remark-example-headings.mjs';
import { remarkInternalBaseUrl } from './src/plugins/remark-internal-base-url.mjs';
import { remarkPropsTableHeadings } from './src/plugins/remark-props-table-headings.mjs';
import { remarkSectionOrder } from './src/plugins/remark-section-order.mjs';

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
      remarkPlugins: [
        remarkExampleCode,
        remarkInternalBaseUrl,
        remarkExampleHeadings,
        remarkPropsTableHeadings,
        remarkSectionOrder,
      ],
    }),
    // Pagefind index is expensive (~2-4s). Skip it for local fast builds via SKIP_PAGEFIND=1.
    ...(process.env.SKIP_PAGEFIND ? [] : [pagefind()]),
  ],
  vite: {
    // @snack-uikit/* ESM пакеты re-exports `./components` (директория без extensions).
    // Node native ESM этого не любит, vite SSR должен пребандлить весь скоуп.
    // На astro build prerender ssr.noExternal не применяется (астра грузит модули через
    // Node native loader) — там компоненты с legacy-deps помечаются `client:only='react'`.
    ssr: {
      noExternal: [
        // Toolbar persist → @cloud-ru/ft-request-payload-transform.
        /^@cloud-ru\/ft-/,
        // Toolbar → @sbercloud/snack-v2-* (chips, bottom-sheet, …).
        /^@sbercloud\/snack-v2-/,
        'uncontrollable',
        // CJS (UMD main) with named exports (cancelable) — tree hooks; bundle for SSR interop.
        'cancelable-promise',
      ],
    },
    resolve: {
      alias: [
        ...Object.entries({
          '#docs': resolve(dir, 'src'),
          '@sbercloud/snack-v2-locale': resolve(root, 'packages/locale/src/index.ts'),
          // Barrel dist/esm/index.js re-exports ./formatters/* without .js — SSR/prebundle fail.
        '@cloud-ru/ft-formatters': resolve(
          root,
          'node_modules/@cloud-ru/ft-formatters/dist/esm/formatters/formatNumber.js',
        ),...dsWorkspaceSourceAliases(),
        }).map(([find, replacement]) => ({ find, replacement })),
      ],
    },
    optimizeDeps: {
      // Alias points at a single .js file; prebundling under package id breaks client hydration.
      exclude: ['@cloud-ru/ft-formatters'],
    },
    css: {
      modules: { localsConvention: 'camelCaseOnly' },
      devSourcemap: false,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [resolve(root, 'node_modules')],
        },
      },
    },
    build: {
      // Disable CSS code-splitting so every module's CSS ends up in a single
      // stylesheet per-entry; fixes CSS-modules from @ds/* packages vanishing
      // from React island chunks due to aggressive Rollup tree-shaking.
      cssCodeSplit: false,
      sourcemap: false,
      rollupOptions: {
        // Подавляем circular-chunk warning между barrel'ами @ds/tag
        // (export * через несколько уровней index.ts) — на рантайм не влияет.
        onwarn(warning, defaultHandler) {
          const msg = String(warning.message || '');
          if (msg.includes('reexported through module') && msg.includes('different chunks')) return;
          if (warning.code === 'CIRCULAR_DEPENDENCY') return;
          defaultHandler(warning);
        },
      },
    },
  },
});
