import { AiShimmerFontMetrics, AiShimmerSize, AiShimmerVariant, AiShimmerWeight } from './types';

export const TEST_IDS = {
  root: 'ai-shimmer',
  text: 'ai-shimmer__text',
  shimmer: 'ai-shimmer__shimmer',
  spread: 'ai-shimmer__spread',
  icon: 'ai-shimmer__icon',
} as const;

/** Варианты типографики. */
export const VARIANT: Record<AiShimmerVariant, AiShimmerVariant> = {
  display: 'display',
  headline: 'headline',
  title: 'title',
  label: 'label',
  body: 'body',
} as const;

/** Размеры типографики. */
export const SIZE: Record<AiShimmerSize, AiShimmerSize> = {
  s: 's',
  m: 'm',
  l: 'l',
} as const;

/** Начертания шрифта. */
export const WEIGHT: Record<AiShimmerWeight, AiShimmerWeight> = {
  regular: 'regular',
  thin: 'thin',
  mono: 'mono',
} as const;

/** Вариант по умолчанию — body, как в `@ds/typography`. */
export const DEFAULT_VARIANT: AiShimmerVariant = VARIANT.body;

/** Размер по умолчанию — M, как в `@ds/typography`. */
export const DEFAULT_SIZE: AiShimmerSize = SIZE.m;

/** Начертание по умолчанию — regular, как в `@ds/typography`. */
export const DEFAULT_WEIGHT: AiShimmerWeight = WEIGHT.regular;

/** Размер ведущей иконки по умолчанию (px), когда задан `iconMask`. */
export const DEFAULT_ICON_SIZE = 16;

const DEFAULT_FONT_METRICS: AiShimmerFontMetrics = {
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
};

/** Fallback-метрики body regular для расчёта высоты до замера DOM. */
export const TYPOGRAPHY_FONT_METRICS: Partial<Record<string, AiShimmerFontMetrics>> = {
  'regular-body-s': { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  'regular-body-m': DEFAULT_FONT_METRICS,
  'regular-body-l': { fontSize: 20, lineHeight: 28, fontWeight: '400' },
};

export function fontMetricsForTypography(
  variant: AiShimmerVariant = DEFAULT_VARIANT,
  size: AiShimmerSize = DEFAULT_SIZE,
  weight: AiShimmerWeight = DEFAULT_WEIGHT,
): AiShimmerFontMetrics {
  const key = `${weight}-${variant}-${size}`;

  return TYPOGRAPHY_FONT_METRICS[key] ?? DEFAULT_FONT_METRICS;
}

/**
 * Геометрия SVG-маски shimmer: ширина/смещение маски, типографские метрики строк
 * и ограничения по высоте контейнера и "хвоста" анимации.
 */
/** Ширина корня по умолчанию: используется до первого замера (SSR/первый рендер). */
export const DEFAULT_ROOT_WIDTH = 400;
/** Горизонтальное смещение маски относительно контейнера. */
export const MASK_OFFSET_X = 0.6;
/** Вертикальное смещение маски относительно контейнера. */
export const MASK_OFFSET_Y = 3.892;
/** Базовая линия первой текстовой строки в SVG. */
export const BASELINE_FIRST_LINE = 9.24;
/** Базовая высота маски для одной строки текста. */
export const BASE_MASK_HEIGHT = 11.268;
/** Дополнительная высота для конечной фазы spread-анимации. */
export const END_HEIGHT_EXTRA = 40;
/** Размер шрифта текста в SVG-маске. */
export const MASK_TEXT_FONT_SIZE = 12;
/** Межбуквенный интервал текста в SVG-маске. */
export const MASK_TEXT_LETTER_SPACING = 0.1;
/** Семейство шрифтов текста в SVG-маске. */
export const MASK_TEXT_FONT_FAMILY = "'SB Sans Interface','Inter','Segoe UI',sans-serif";
