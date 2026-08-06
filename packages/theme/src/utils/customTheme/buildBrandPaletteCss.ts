import { BRAND } from '../../constants/appearance';
import { buildBrandPaletteVars } from './buildBrandPaletteVars';

// Правило нацелено на сами бренд-классы (`.sn-brandA/B/C/D/E`), а не на один элемент inline: компоненты,
// переэмитящие набор `sn-*` на своих обёртках (Table/Stepper/Alert через `useThemeClassnames`), заново
// объявляют `--sn-brand-color-primary-*` из класса бренда — inline на предке они перекрыли бы, правило
// на том же бренд-классе — нет.
// Один seed переопределяет сразу все бренд-классы (потребитель не знает, в какой бренд-слот завернётся
// его поддерево). TODO FF-8813: возможность задавать seed индивидуально для каждого бренда (brandA/B/C/D/E).
const BRAND_CLASS_SELECTOR = `:is(${Object.values(BRAND)
  .map(brand => `.sn-${brand}`)
  .join(',')})`;

/**
 * Собирает текст CSS-правила, переопределяющего бренд-палитру из seed-цвета на бренд-классах.
 *
 * - Без `scope` — глобально (`:is(.sn-brandA,…){…}`), для white-label в корне приложения: побеждает
 *   по source order на всех бренд-классах страницы, включая порталы.
 * - Со `scope` (CSS-селектор корня поддерева) — ограничивает область потомками и самим корнем; выше
 *   токенной специфичности, поэтому порядок не важен.
 *
 * Невалидный hex → `null`.
 */
export function buildBrandPaletteCss(seedColor: string, scope?: string): string | null {
  const vars = buildBrandPaletteVars(seedColor);
  if (!vars) {
    return null;
  }

  const declarations = Object.entries(vars)
    .map(([name, value]) => `${name}:${value}`)
    .join(';');

  const selector = scope ? `${scope} ${BRAND_CLASS_SELECTOR},${scope}${BRAND_CLASS_SELECTOR}` : BRAND_CLASS_SELECTOR;

  return `${selector}{${declarations}}`;
}
