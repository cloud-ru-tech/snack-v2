const { normalizeToSymbolIdPart } = require('../scripts/shared/symbolId.cjs');

/**
 * Суффикс data-test-id для сгенерированного компонента иконки. Тонкая обёртка над общей
 * normalizeToSymbolIdPart (scripts/shared/symbolId.cjs) — раньше была независимой копией той же
 * regex-цепочки, рискующей незаметно разойтись со scripts/shared/symbolId.ts.
 */
module.exports = function generateDataTestId(componentName) {
  const stripped = `${componentName}`.replace(/^Svg/, '');
  const normalized = normalizeToSymbolIdPart(stripped);
  return normalized ? `-${normalized}` : '';
};
