module.exports = function generateDataTestId(componentName) {
  const source = `${componentName}`.replace(/^Svg/, '');
  const normalized = source
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    // Keep parity with scripts/symbolId.ts (Smile 2 -> smile2).
    .replace(/-([0-9]+)/g, '$1')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return normalized ? `-${normalized}` : '';
};
