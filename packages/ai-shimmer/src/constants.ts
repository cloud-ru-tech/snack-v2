import { AiShimmerSize, AiShimmerVariant, AiShimmerWeight } from './types';

export const TEST_IDS = {
  root: 'ai-shimmer',
  text: 'ai-shimmer__text',
  icon: 'ai-shimmer__icon',
  slot: 'ai-shimmer__slot',
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

/** Ширина строки до первого замера DOM (SSR и первый рендер). */
export const DEFAULT_ROOT_WIDTH = 400;

/**
 * Стопы волны: единственный источник для CSS-градиента текста и SVG-градиента иконки.
 * Цвета литералами — токенов под них в `@ds/figma-variables` пока нет.
 */
export const WAVE_STOPS = [
  { offset: 0, rgb: [51, 140, 235], opacity: 0 },
  { offset: 0.3, rgb: [51, 140, 235], opacity: 0 },
  { offset: 0.4, rgb: [51, 140, 235], opacity: 1 },
  { offset: 0.48, rgb: [59, 174, 209], opacity: 1 },
  { offset: 0.54, rgb: [67, 208, 183], opacity: 1 },
  { offset: 0.6, rgb: [52, 203, 151], opacity: 1 },
  { offset: 0.68, rgb: [36, 198, 118], opacity: 1 },
  { offset: 0.78, rgb: [36, 198, 118], opacity: 0 },
  { offset: 1, rgb: [36, 198, 118], opacity: 0 },
] as const;

/** Цвет стопа как CSS `rgb()`: без альфы для SVG `stop-color`, с альфой — для градиента. */
export function waveStopColor({ rgb: [r, g, b], opacity }: (typeof WAVE_STOPS)[number], withAlpha = false): string {
  return withAlpha ? `rgb(${r} ${g} ${b} / ${opacity * 100}%)` : `rgb(${r} ${g} ${b})`;
}

/** Те же стопы как CSS `linear-gradient` — уходит в стили через `--ai-shimmer-wave-gradient`. */
export const WAVE_GRADIENT = `linear-gradient(90deg, ${WAVE_STOPS.map(
  stop => `${waveStopColor(stop, true)} ${stop.offset * 100}%`,
).join(', ')})`;
