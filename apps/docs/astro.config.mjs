import { resolve } from 'path';
import { fileURLToPath } from 'url';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';

import { remarkExampleCode } from './src/plugins/remark-example-code.mjs';
import { remarkInternalBaseUrl } from './src/plugins/remark-internal-base-url.mjs';

const dir = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(dir, '../..');

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
      noExternal: ['@snack-uikit/list'],
    },
    resolve: {
      alias: {
        // ~docs points to apps/docs/src — used by package demos to import Canvas etc.
        '~docs': resolve(dir, 'src'),
        // <add-package:aliases>
        // Resolve @ds/* workspace packages from source so SCSS modules work in dev
        '@ds/button': resolve(root, 'packages/button/src/index.ts'),
        '@ds/avatar': resolve(root, 'packages/avatar/src/index.ts'),
        '@ds/utils': resolve(root, 'packages/utils/src/index.ts'),
        '@ds/icons': resolve(root, 'packages/icons/src/index.ts'),
        '@ds/counter': resolve(root, 'packages/counter/src/index.ts'),
        '@ds/loader': resolve(root, 'packages/loader/src/index.ts'),
        '@ds/divider': resolve(root, 'packages/divider/src/index.ts'),
        '@ds/block': resolve(root, 'packages/block/src/index.ts'),
        '@ds/hot-spot': resolve(root, 'packages/hot-spot/src/index.ts'),
        '@ds/icon-predefined': resolve(root, 'packages/icon-predefined/src/index.ts'),
        '@ds/portal-context': resolve(root, 'packages/portal-context/src/index.ts'),
        '@ds/scroll': resolve(root, 'packages/scroll/src/index.ts'),
        '@ds/skeleton': resolve(root, 'packages/skeleton/src/index.ts'),
        '@ds/popover-private': resolve(root, 'packages/popover-private/src/index.ts'),
        '@ds/progress-bar': resolve(root, 'packages/progress-bar/src/index.ts'),
        '@ds/timeline': resolve(root, 'packages/timeline/src/index.ts'),
        '@ds/dropzone': resolve(root, 'packages/dropzone/src/index.ts'),
        '@ds/typography': resolve(root, 'packages/typography/src/index.ts'),
        '@ds/locale': resolve(root, 'packages/locale/src/index.ts'),
        '@ds/breadcrumbs': resolve(root, 'packages/breadcrumbs/src/index.ts'),
        '@ds/info-block': resolve(root, 'packages/info-block/src/index.ts'),
        '@ds/popover': resolve(root, 'packages/popover/src/index.ts'),
        '@ds/promo-tag': resolve(root, 'packages/promo-tag/src/index.ts'),
        '@ds/rating': resolve(root, 'packages/rating/src/index.ts'),
        '@ds/status': resolve(root, 'packages/status/src/index.ts'),
        '@ds/toggles': resolve(root, 'packages/toggles/src/index.ts'),
        '@ds/stepper': resolve(root, 'packages/stepper/src/index.ts'),
        '@ds/tooltip': resolve(root, 'packages/tooltip/src/index.ts'),
        '@ds/input-private': resolve(root, 'packages/input-private/src/index.ts'),
        '@ds/pagination': resolve(root, 'packages/pagination/src/index.ts'),
        '@ds/tabs': resolve(root, 'packages/tabs/src/index.ts'),
        '@ds/dropdown': resolve(root, 'packages/dropdown/src/index.ts'),
        '@ds/truncate-string': resolve(root, 'packages/truncate-string/src/index.ts'),
        '@ds/search-private': resolve(root, 'packages/search-private/src/index.ts'),
        '@ds/slider': resolve(root, 'packages/slider/src/index.ts'),
        '@ds/carousel': resolve(root, 'packages/carousel/src/index.ts'),
        '@ds/link': resolve(root, 'packages/link/src/index.ts'),
        '@ds/alert': resolve(root, 'packages/alert/src/index.ts'),
        '@ds/tag': resolve(root, 'packages/tag/src/index.ts'),
        '@ds/search': resolve(root, 'packages/search/src/index.ts'),
        '@ds/modal': resolve(root, 'packages/modal/src/index.ts'),
        '@ds/drawer': resolve(root, 'packages/drawer/src/index.ts'),
        // </add-package:aliases>
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
