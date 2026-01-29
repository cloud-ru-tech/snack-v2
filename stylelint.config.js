module.exports = {
  extends: ['@cloud-ru/ft-config-stylelint'],
  rules: {
    'no-descending-specificity': true,
    'at-rule-empty-line-before': ['always', { except: ['first-nested', 'blockless-after-same-name-blockless'] }],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
  overrides: [
    {
      files: ['astro/src/components/mdx/**/*.scss'],
      rules: { 'declaration-no-important': null },
    },
    {
      files: ['storybook/components/ControlPanel/**/*.scss'],
      rules: { 'declaration-property-value-allowed-list': null },
    },
  ],
};
