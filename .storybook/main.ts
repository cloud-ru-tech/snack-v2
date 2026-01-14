import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-designs',
  ],
  framework: '@storybook/react-vite',
  // Base path for GitLab Pages deployment
  // Storybook is served from /storybook/ subdirectory
  base: process.env.STORYBOOK_BASE_PATH || (process.env.CI ? '/storybook/' : '/'),
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // '@design-system/button': path.resolve(dirname, '../packages/button/src'),
      // '@design-system/link': path.resolve(dirname, '../packages/link/src'),
      // '@design-system/avatar': path.resolve(dirname, '../packages/avatar/src'),
    };

    // Ensure CSS modules are properly handled
    config.css = config.css || {};
    config.css.modules = {
      ...(config.css.modules || {}),
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    };

    // Ensure SCSS is properly configured
    if (!config.css.preprocessorOptions) {
      config.css.preprocessorOptions = {};
    }
    config.css.preprocessorOptions.scss = {
      ...(config.css.preprocessorOptions.scss || {}),
      additionalData: '',
    };

    return config;
  },
};
export default config;
