const path = require('path');

/**
 * Index template for Sprite variant - export names include "Sprite".
 */
function toExportName(basename) {
  const pascal = basename
    .replace(/^Svg/, '')
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toUpperCase());
  return pascal + 'SpriteSVG';
}

const flatIndexTemplateSprite = filePaths => {
  const exports = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = toExportName(basename);
    return `export { default as ${exportName} } from './${basename}';`;
  });
  return exports.join('\n');
};

module.exports = flatIndexTemplateSprite;
