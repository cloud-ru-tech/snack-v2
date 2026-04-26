module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', 'stylelint-config-clean-order'],
  rules: {
    'no-descending-specificity': true,
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: {
        'scss/at-import-partial-extension': null,
      },
    },
    {
      files: ['apps/docs/src/styles/**/*.scss', 'apps/docs/src/components/**/*.scss'],
      rules: {
        'declaration-no-important': null,
        'no-descending-specificity': null,
      },
    },
    {
      files: ['apps/storybook/.storybook/components/**/*.scss'],
      rules: {
        'declaration-property-value-allowed-list': null,
      },
    },
  ],
  ignoreFiles: [
    '**/dist/**',
    '**/node_modules/**',
    '**/storybook-static/**',
    '**/.astro/**',
    '**/packages/icons/**',
  ],
};
