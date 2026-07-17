const path = require('path');

/**
 * Шаблон индекса для плоской структуры иконок (одна иконка на файл, без S/Xs-вариантов).
 * Создаёт баррель-экспорты для каждой иконки в директории.
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
