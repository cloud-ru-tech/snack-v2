/**
 * Каноническое ядро нормализации, в плоском CommonJS, чтобы его можно было require и из
 * scripts/ (TS, через symbolId.ts), и из templates/ (плоский CommonJS, грузится собственным
 * Node-процессом svgr — тот не может require .ts-файл). Раньше было продублировано:
 * templates/generateDataTestId.cjs вручную повторял ту же regex-цепочку, рискуя незаметно
 * разойтись с этим файлом при любой правке одного без другого.
 */
function normalizeToSymbolIdPart(value) {
  return value
    .replace(/\.[^.]+$/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    // SVGR слепляет числовые фрагменты в имена компонентов (Smile 2 -> Smile2).
    .replace(/-([0-9]+)/g, '$1')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

module.exports = { normalizeToSymbolIdPart };
