const path = require('path');

/**
 * Index template for flat icon structure (one icon per file, no S/Xs variants).
 * Creates barrel exports for each icon in the directory.
 */
function toExportName(basename) {
  const pascal = basename
    .replace(/^Svg/, '')
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toUpperCase());
  return pascal + 'SVG';
}

const flatIndexTemplate = filePaths => {
  const exports = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = toExportName(basename);
    return `export { default as ${exportName} } from './${basename}';`;
  });
  return exports.join('\n');
};

module.exports = flatIndexTemplate;
