/**
 * Модульная шкала отступов (m = модуль 8px), привязанная к dimension-токенам DS.
 * Единственно допустимые значения `gap` / `columnGap` / `rowGap` — токены этой шкалы.
 *
 * <pre>
 * 025m → 2px    4m → 32px
 * 050m → 4px    5m → 40px
 * 1m   → 8px    6m → 48px
 * 2m   → 16px   7m → 56px
 * 3m   → 24px   8m → 64px
 *               9m → 72px
 *               10m → 80px
 * </pre>
 */
export const GAP_SIZE = {
  Gap025: '025m',
  Gap050: '050m',
  Gap1: '1m',
  Gap2: '2m',
  Gap3: '3m',
  Gap4: '4m',
  Gap5: '5m',
  Gap6: '6m',
  Gap7: '7m',
  Gap8: '8m',
  Gap9: '9m',
  Gap10: '10m',
} as const;

/**
 * Keyword-значения размеров (`width` / `height`). Маппятся через `data-*` + SCSS
 * (не инлайн). Произвольные числа/строки идут в инлайн-`style`.
 */
export const ELEMENT_SIZE = {
  MaxContent: 'max-content',
  MinContent: 'min-content',
  FitContent: 'fit-content',
  Auto: 'auto',
  Inherit: 'inherit',
  Initial: 'initial',
  Unset: 'unset',
} as const;
