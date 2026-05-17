const symbolPrefix = process.env.SYMBOL_PREFIX || 'snack-uikit-';

module.exports = {
  template: require('./spriteIconComponentTemplate.cjs')({ size: 24, symbolPrefix }),
  indexTemplate: require('./flatIndexTemplateSprite.cjs'),
  ext: 'tsx',
  typescript: true,
};
