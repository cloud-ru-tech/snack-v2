const symbolPrefix = process.env.SYMBOL_PREFIX || 'snack-uikit-';

module.exports = {
  template: require('./spriteIconComponentTemplate.js')({ size: 24, symbolPrefix }),
  indexTemplate: require('./flatIndexTemplateSprite.js'),
  ext: 'tsx',
  typescript: true,
};
