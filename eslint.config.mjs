import monorepoEslintConfig from '@cloud-ru/eslint-config/monorepo';
import ssrSafe from '@cloud-ru/eslint-plugin-ssr-safe-react';

export default [
  ...monorepoEslintConfig,
  ssrSafe.recommended,
  {
    plugins: {
      '@cloud-ru/ssr-safe-react': ssrSafe,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      'prettier/prettier': 'off',
      // Explicit options required — @vitest/eslint-plugin@1.6.6 has a broken
      // meta.defaultOptions that crashes under @typescript-eslint/utils@8.58+.
      'vitest/no-standalone-expect': ['error', { additionalTestBlockFunctions: [] }],
    },
  },
  {
    ignores: [
      '**/dist/**/*',
      '**/storybook-static/**/*',
      '**/.astro/**/*',
      '**/*.astro',
      'packages/icons/src/components/**/*',
      'packages/icons/templates/**/*',
      'packages/icons/scripts/**/*',
      // Placeholder-templated source for scaffolded packages — not valid TS.
      'scripts/templates/**/*',
      // Generated design tokens — не линтим (байт-в-байт с build:tokens, eslint OOM на styles.js).
      'packages/figma-variables/build/**/*',
      // Вендоренный Figma-CLI (Node): под React/SSR-eslint репы даёт ложь — правило
      // ssr-safe-react/domApi флагает поле `nodeEntry.document` Figma REST API как браузерный глобал.
      'apps/figma-selected-block/**/*',
    ],
  },
  {
    files: ['packages/**/__test__/**/*.ts', 'packages/**/scripts/**/*.ts', 'tests/**/*.ts'],
    rules: {
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: ['packages/**/__tests__/**/*.test.ts', 'scripts/__tests__/**/*.test.ts'],
    rules: {
      'vitest/consistent-test-it': ['error', { fn: 'it' }],
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: ['packages/*/stories/**/*', 'apps/storybook/**/*'],
    rules: {
      'react/function-component-definition': 'off',
      '@cloud-ru/ssr-safe-react/domApi': 'off',
      'import/no-default-export': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: [
      'apps/storybook/.storybook/**/*',
      'apps/docs/astro.config.mjs',
      'scripts/**/*.ts',
      'scripts/**/*.mts',
      'eslint.config.mjs',
      'vitest.config.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['scripts/**/*.mts'],
    rules: {
      // Tooling scripts: react-docgen `prop.parent`, TS helpers defined below use sites.
      '@cloud-ru/ssr-safe-react/domApi': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-nested-ternary': 'off',
    },
  },
  {
    files: ['apps/docs/src/**/*'],
    rules: {
      '@cloud-ru/ssr-safe-react/domApi': 'off',
      'import/no-default-export': 'off',
    },
  },
];
