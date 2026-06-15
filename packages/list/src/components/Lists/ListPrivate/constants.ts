import { SpinnerProps } from '@ds/loader';

import { Size } from '../../../types';

// Фактические высоты однострочного item в compact-density (s=24 / m=32 / l=40). Оценка
// виртуализатора должна совпадать с рендером: завышенный estimate даёт «скачок» скролла —
// измеренные строки сжимают totalSize по мере прокрутки (MR!101).
export const LARGE_SIZE_HEIGHT = 40;
export const MEDIUM_SIZE_HEIGHT = 32;
export const SMALL_SIZE_HEIGHT = 24;

export const ALL_SIZES: Record<Size, number> = {
  m: MEDIUM_SIZE_HEIGHT,
  s: SMALL_SIZE_HEIGHT,
  l: LARGE_SIZE_HEIGHT,
};

export const SPINNER_SIZE_MAP: Record<Size, SpinnerProps['size']> = {
  s: 'xs',
  m: 'xs',
  l: 's',
};
