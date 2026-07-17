const generateDataTestId = require('./generateDataTestId.cjs');

/**
 * Шаблон sprite-иконки: тонкая обёртка над рантайм-фабрикой `createSpriteIcon` — файл несёт
 * только данные (symbolId, testId, fallback), вся логика рендера живёт в одном экземпляре
 * `src/factory/createSpriteIcon.tsx`. Публичное имя — обычное `XSVG`, без суффикса "Sprite":
 * для групп, где этот шаблон применяется (needsSprite: true), это единственный вариант компонента.
 *
 * `fallback: ""` — плейсхолдер: содержимое инлайн-fallback подставляет postProcessIconFallback.ts
 * (svgr на этом этапе не даёт доступа к исходному SVG-тексту). Глубину относительного импорта
 * фабрики чинит fixTypesImport.ts (см. порядок шагов в buildIcons.ts).
 */
const spriteIconComponentTemplate =
  ({ size, symbolPrefix = 'snack-uikit-' }) =>
  ({ componentName }, { tpl }) => {
    const baseName = componentName.replace(/^Svg/, '');
    const spriteComponentName = baseName + 'SVG';
    const testId = generateDataTestId(componentName);
    const symbolId = symbolPrefix + testId.replace(/^-/, '');
    // `size` из конфига не эмитится — он всегда равен дефолту фабрики (24); условная строка
    // здесь невозможна: пустой placeholder в tpl ломает подстановку @babel/template.
    void size;

    return tpl`
    // DO NOT EDIT MANUALLY

    import { createSpriteIcon } from '../../../factory/createSpriteIcon';

    const ${spriteComponentName} = createSpriteIcon({
      symbolId: "${symbolId}",
      testId: "${testId}",
      fallback: "",
    });

    export default ${spriteComponentName};
    `;
  };

module.exports = spriteIconComponentTemplate;
