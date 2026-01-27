import type { TypographySize, TypographyVariant, TypographyWeight } from './types';

/** Варианты типографики */
export const VARIANT: Record<TypographyVariant, TypographyVariant> = {
  display: 'display',
  headline: 'headline',
  title: 'title',
  label: 'label',
  body: 'body',
} as const;

/** Размеры типографики */
export const SIZE: Record<TypographySize, TypographySize> = {
  s: 's',
  m: 'm',
  l: 'l',
} as const;

/** Начертания шрифта */
export const WEIGHT: Record<TypographyWeight, TypographyWeight> = {
  regular: 'regular',
  thin: 'thin',
  mono: 'mono',
} as const;

/** Значения по умолчанию */
export const DEFAULT_VARIANT: TypographyVariant = VARIANT.body;
export const DEFAULT_SIZE: TypographySize = SIZE.m;
export const DEFAULT_WEIGHT: TypographyWeight = WEIGHT.regular;
