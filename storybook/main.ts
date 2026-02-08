import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-designs',
    path.resolve(__dirname, 'addons/theme-controls/preset.ts'),
  ],
  framework: '@storybook/react-vite',
  base: process.env.STORYBOOK_BASE_PATH || (process.env.CI ? '/storybook/' : '/'),
  viteFinal: async (config, { configType }) => {
    const isProd = configType === 'PRODUCTION';

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '#storybook/components': path.resolve(__dirname, 'components'),
    };

    config.css = config.css || {};
    config.css.modules = {
      ...(config.css.modules || {}),
      localsConvention: 'camelCase',
      generateScopedName: isProd ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
    };

    if (!config.css.preprocessorOptions) {
      config.css.preprocessorOptions = {};
    }
    config.css.preprocessorOptions.scss = {
      ...(config.css.preprocessorOptions.scss || {}),
      additionalData: '',
    };

    // Ensure CSS files are properly handled
    config.assetsInclude = config.assetsInclude || [];

    return config;
  },
};

// eslint-disable-next-line import/no-default-export -- Storybook requires default export
export default config;
