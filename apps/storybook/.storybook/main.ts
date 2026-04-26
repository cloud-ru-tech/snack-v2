import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..', '..');

const config: StorybookConfig = {
  stories: [join(root, 'packages/*/stories/**/*.stories.@(ts|tsx)')],
  addons: ['@storybook/addon-a11y'],
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
        // <add-package:aliases>
        '@ds/button': join(root, 'packages/button/src/index.ts'),
        '@ds/avatar': join(root, 'packages/avatar/src/index.ts'),
        '@ds/utils': join(root, 'packages/utils/src/index.ts'),
        '@ds/icons': join(root, 'packages/icons/src/index.ts'),
        '@ds/counter': join(root, 'packages/counter/src/index.ts'),
        '@ds/loader': join(root, 'packages/loader/src/index.ts'),
        '@ds/divider': join(root, 'packages/divider/src/index.ts'),
        '@ds/block': join(root, 'packages/block/src/index.ts'),
        '@ds/hot-spot': join(root, 'packages/hot-spot/src/index.ts'),
        '@ds/icon-predefined': join(root, 'packages/icon-predefined/src/index.ts'),
        '@ds/portal-context': join(root, 'packages/portal-context/src/index.ts'),
        '@ds/scroll': join(root, 'packages/scroll/src/index.ts'),
        '@ds/skeleton': join(root, 'packages/skeleton/src/index.ts'),
        '@ds/popover-private': join(root, 'packages/popover-private/src/index.ts'),
        '@ds/progress-bar': join(root, 'packages/progress-bar/src/index.ts'),
        '@ds/timeline': join(root, 'packages/timeline/src/index.ts'),
        '@ds/dropzone': join(root, 'packages/dropzone/src/index.ts'),
        '@ds/typography': join(root, 'packages/typography/src/index.ts'),
        '@ds/locale': join(root, 'packages/locale/src/index.ts'),
        '@ds/breadcrumbs': join(root, 'packages/breadcrumbs/src/index.ts'),
        '@ds/info-block': join(root, 'packages/info-block/src/index.ts'),
        '@ds/popover': join(root, 'packages/popover/src/index.ts'),
        '@ds/promo-tag': join(root, 'packages/promo-tag/src/index.ts'),
        '@ds/rating': join(root, 'packages/rating/src/index.ts'),
        '@ds/status': join(root, 'packages/status/src/index.ts'),
        '@ds/toggles': join(root, 'packages/toggles/src/index.ts'),
        '@ds/stepper': join(root, 'packages/stepper/src/index.ts'),
        '@ds/tooltip': join(root, 'packages/tooltip/src/index.ts'),
        '@ds/input-private': join(root, 'packages/input-private/src/index.ts'),
        '@ds/pagination': join(root, 'packages/pagination/src/index.ts'),
        '@ds/tabs': join(root, 'packages/tabs/src/index.ts'),
        '@ds/dropdown': join(root, 'packages/dropdown/src/index.ts'),
        '@ds/truncate-string': join(root, 'packages/truncate-string/src/index.ts'),
        '@ds/search-private': join(root, 'packages/search-private/src/index.ts'),
        '@ds/slider': join(root, 'packages/slider/src/index.ts'),
        '@ds/carousel': join(root, 'packages/carousel/src/index.ts'),
        '@ds/link': join(root, 'packages/link/src/index.ts'),
        '@ds/alert': join(root, 'packages/alert/src/index.ts'),
        '@ds/tag': join(root, 'packages/tag/src/index.ts'),
        '@ds/search': join(root, 'packages/search/src/index.ts'),
        '@ds/modal': join(root, 'packages/modal/src/index.ts'),
        '@ds/drawer': join(root, 'packages/drawer/src/index.ts'),
        // </add-package:aliases>
        '#storybook/components': join(__dirname, 'components/index.ts'),
        '#storybook/hooks/useDraggable': join(__dirname, 'hooks/useDraggable.ts'),
        '#storybook/hooks': join(__dirname, 'hooks/index.ts'),
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
