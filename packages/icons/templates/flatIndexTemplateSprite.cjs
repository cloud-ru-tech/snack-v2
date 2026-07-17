const path = require('path');

/**
 * Шаблон индекса для sprite-варианта. Экспортируется под обычным именем `XSVG` — для групп
 * с needsSprite: true это единственный вариант компонента (standalone для них не генерируется,
 * см. buildIcons.ts), поэтому суффикс "Sprite" в публичном имени не нужен: потребитель не выбирает
 * между `XSVG` (инлайн) и `XSpriteSVG` (символ) — есть только один компонент, который сам
 * переключается на инлайн-fallback, если символ спрайта не смонтирован (postProcessIconFallback.ts).
 */
function toExportName(basename) {
  const pascal = basename
    .replace(/^Svg/, '')
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toUpperCase());
  return pascal + 'SVG';
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
