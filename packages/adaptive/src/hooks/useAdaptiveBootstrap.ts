import { useMemo } from 'react';

import {
  ADAPTIVE_BREAKPOINT,
  ADAPTIVE_QUERIES,
  AdaptiveBreakpoints,
  buildAdaptiveQueries,
} from '../constants/adaptive';
import { LayoutType } from '../types/layoutTypes';
import { getAdaptive } from '../utils/getAdaptive';
import { useAdaptiveMatchMedia } from './useMatchMedia';

export type UseAdaptiveBootstrapOptions = {
  /** Переопределение брейкпоинтов (max-width в px), напр. `{ mobile: 480 }`. Меняет только пороги, набор тиров прежний. */
  breakpoints?: Partial<AdaptiveBreakpoints>;
  /** User-agent для SSR (на клиенте берётся из `navigator`). См. `getAdaptive`. */
  userAgent?: string;
};

/**
 * Возвращает текущий `layoutType` по типу устройства из user-agent + media-query. SSR-safe: до mount `desktop`.
 * Вызывается один раз в корне приложения, результат передаётся в `<AdaptiveProvider layoutType={...}>`.
 * Не путать с `useAdaptiveLayout` — тем читают уже посчитанную раскладку из контекста внутри компонентов.
 * Для per-app порогов передайте `breakpoints` (мемоизировать объект не нужно).
 * @function React hook
 */
export function useAdaptiveBootstrap(options?: UseAdaptiveBootstrapOptions): { layoutType: LayoutType } {
  const { breakpoints, userAgent } = options ?? {};

  const queryValues = useMemo(
    () => (breakpoints ? buildAdaptiveQueries({ ...ADAPTIVE_BREAKPOINT, ...breakpoints }) : ADAPTIVE_QUERIES),
    // Зависим от значений брейкпоинтов, а не от ссылки объекта — иначе инлайн-`{ mobile: 480 }` переподписывает matchMedia.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [breakpoints?.mobile, breakpoints?.tablet, breakpoints?.desktopSmall, breakpoints?.desktop],
  );

  return getAdaptive(useAdaptiveMatchMedia(queryValues), userAgent);
}
