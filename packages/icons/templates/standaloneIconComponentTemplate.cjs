const generateDataTestId = require('./generateDataTestId.cjs');

/**
 * Шаблон standalone-иконки: тонкая обёртка над рантайм-фабрикой `createStandaloneIcon` —
 * файл несёт только данные (testId, нативные размеры, JSX-содержимое), вся логика рендера
 * живёт в одном экземпляре `src/factory/createStandaloneIcon.tsx`. Глубину относительного
 * импорта фабрики чинит fixTypesImport.ts (см. порядок шагов в buildIcons.ts).
 */

/**
 * Читает собственные width/height ИСХОДНОГО svg из разобранного JSX AST (svgr/babel отдаёт здесь
 * атрибуты исходного корневого `<svg>`, а не только его детей). Нужно потому, что большинство
 * иконок 24×24, но wordmark-логотипы — нет (например, `CloudLogoHybridLight` — 77×24); хардкод
 * `viewBox='0 0 24 24'` для них молча обрезал всё после x=24 (был виден только квадратный
 * значок, текстовый бейдж рядом с ним обрезался).
 */
function getRootAttr(jsxNode, name) {
  const attributes = (jsxNode.openingElement && jsxNode.openingElement.attributes) || [];
  const attr = attributes.find(a => a.name && a.name.name === name);
  if (!attr || !attr.value) return undefined;
  return attr.value.value !== undefined ? attr.value.value : attr.value.expression && attr.value.expression.value;
}

function getNativeSize(jsxNode) {
  const getNumericAttr = name => {
    const num = Number(getRootAttr(jsxNode, name));
    return Number.isFinite(num) ? num : undefined;
  };
  return {
    width: getNumericAttr('width') || 24,
    height: getNumericAttr('height') || 24,
  };
}

const standaloneIconComponentTemplate =
  ({ size = 24, colorMode = 'currentColor' }) =>
  ({ componentName, jsx }, { tpl }) => {
    const baseName = componentName.replace(/^Svg/, '');
    const standaloneComponentName = baseName + 'SVG';
    const testId = generateDataTestId(componentName);
    const { width: nativeWidth, height: nativeHeight } = getNativeSize(jsx);

    // preserve: флаги/логотипы/брендовые иконки сохраняют буквальный fill/stroke, выставленный
    // fixIcons.ts; иначе иконка монохромная и наследует цвет через currentColor (см. фабрику).
    // Свойство эмитится всегда (без условных строк): пустой placeholder в tpl ломает подстановку
    // @babel/template (BABEL_TRANSFORM_ERROR). `size` из конфига не эмитится — он всегда равен
    // дефолту фабрики (24).
    const preserveColor = String(colorMode === 'preserve');
    // fill корневого <svg> исходника: пути без собственного fill (stroke-контуры) наследуют его.
    // Без проброса при preserveColor они получили бы SVG-дефолт fill=black (см. фабрику).
    const rootFillRaw = getRootAttr(jsx, 'fill');
    const rootFill = typeof rootFillRaw === 'string' ? `"${rootFillRaw}"` : 'undefined';

    return tpl`
    // DO NOT EDIT MANUALLY

    import { createStandaloneIcon } from '../../../factory/createStandaloneIcon';

    const ${standaloneComponentName} = createStandaloneIcon({
      testId: "${testId}",
      nativeWidth: ${String(nativeWidth)},
      nativeHeight: ${String(nativeHeight)},
      preserveColor: ${preserveColor},
      rootFill: ${rootFill},
      children: (${jsx}).props.children,
    });

    export default ${standaloneComponentName};
    `;
  };

module.exports = standaloneIconComponentTemplate;
