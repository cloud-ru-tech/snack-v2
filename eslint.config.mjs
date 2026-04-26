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
    ],
  },
  {
    files: ['packages/**/__test__/**/*.ts', 'packages/**/scripts/**/*.ts', 'tests/**/*.ts'],
    rules: {
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: ['packages/**/__unit__/**/*.ts'],
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
      'eslint.config.mjs',
      'vitest.config.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
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
