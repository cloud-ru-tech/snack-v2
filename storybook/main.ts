import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  managerHead: head => `${MANAGER_REACT_POLYFILL}${head ?? ''}`,
  addons: [
    path.resolve(__dirname, 'addons/readme-panel/preset.ts'),
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
      '#storybook/hooks': path.resolve(__dirname, 'hooks'),
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
