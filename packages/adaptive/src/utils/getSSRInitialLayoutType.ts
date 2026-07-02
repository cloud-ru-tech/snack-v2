import { AdaptiveBreakpoints } from '../constants/adaptive';
import { LayoutType } from '../types/layoutTypes';
import { layoutTypeFromUserAgent } from './layoutTypeFromUserAgent';
import { layoutTypeFromWidth } from './layoutTypeFromWidth';

/** Заголовок Client Hints с шириной viewport (Chromium). См. `Critical-CH` в `next.config`. */
export const SEC_CH_VIEWPORT_WIDTH_HEADER = 'sec-ch-viewport-width';

export type GetSSRInitialLayoutTypeOptions = {
  /** `Sec-CH-Viewport-Width` или другое значение ширины (строка из заголовка или число в px). */
  viewportWidth?: string | number | null;
  /** `User-Agent` запроса для SSR-фолбэка без Client Hints. */
  userAgent?: string | null;
  /** Переопределение брейкпоинтов — только для ветки с `viewportWidth`. */
  breakpoints?: AdaptiveBreakpoints;
};

function parseViewportWidth(viewportWidth: string | number): number | null {
  const width = typeof viewportWidth === 'number' ? viewportWidth : Number(viewportWidth);

  if (!Number.isFinite(width) || width <= 0) {
    return null;
  }

  return width;
}

/**
 * Стартовый `layoutType` для SSR в Next.js App Router.
 *
 * 1. Есть валидная ширина (Client Hints на Chromium) → каскад по брейкпоинтам (4 тира).
 * 2. Иначе → `layoutTypeFromUserAgent` (mobile / tablet / desktop).
 *
 * Пара с `getLayoutBootstrapScript()` (pre-paint) и `useLayoutTypeState(initialLayoutType)` на клиенте.
 */
export function getSSRInitialLayoutType({
  viewportWidth,
  userAgent,
  breakpoints,
}: GetSSRInitialLayoutTypeOptions): LayoutType {
  if (viewportWidth != null && viewportWidth !== '') {
    const width = parseViewportWidth(viewportWidth);

    if (width != null) {
      return layoutTypeFromWidth(width, breakpoints);
    }
  }

  return layoutTypeFromUserAgent(userAgent ?? '');
}
