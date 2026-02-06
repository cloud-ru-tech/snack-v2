module.exports = {
  ...require('@cloud-ru/ft-config-lint-staged').defaultLintStagedConfig,
  '*.css': ['stylelint --fix'],
  '*.scss': ['stylelint --fix'],
};
