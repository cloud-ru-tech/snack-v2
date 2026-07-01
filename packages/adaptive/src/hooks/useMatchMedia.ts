import { useLayoutEffect } from '@ds/utils';
import { useState } from 'react';

import { ADAPTIVE_QUERIES, INITIAL_ADAPTIVE_QUERIES_VALUE } from '../constants/adaptive';
import { AdaptiveQuery, MatchMediaGeneric } from '../types/adaptive';
import { getMatchMediaGeneric, getMediaQueryListGeneric } from '../utils/getMatchMedia';

/**
 * Подписывается на набор media-query и возвращает их состояние (`query-key → matched?`).
 * SSR-safe: первый рендер — и на сервере, и при гидрации на клиенте — берёт `initialValues`, что
 * совпадает с серверным HTML и не даёт hydration mismatch. Реальное состояние media-query читается
 * уже после mount в `useLayoutEffect` (синхронно, до paint — без видимого скачка), там же — подписка
 * на `change`.
 * @function React hook
 */
export const useMatchMediaGeneric = <T extends string>({
  queryValues,
  initialValues,
}: {
  queryValues: Record<T, string>;
  initialValues: MatchMediaGeneric<T>;
}): MatchMediaGeneric<T> => {
  const [value, setValue] = useState<MatchMediaGeneric<T>>(initialValues);

  useLayoutEffect(() => {
    const read = () => getMatchMediaGeneric({ queryValues, initialValues });
    // Синхронизируемся с реальным matchMedia на клиенте — устраняем рассинхрон с SSR-initialValues.
    setValue(read());

    const handler = () => setValue(read());
    const mediaQueryList = getMediaQueryListGeneric({ queryValues });

    mediaQueryList.forEach(([, mql]) => mql.addEventListener('change', handler));

    return (): void => mediaQueryList.forEach(([, mql]) => mql.removeEventListener('change', handler));
    // queryValues/initialValues стабильны по ссылке (useAdaptiveBootstrap мемоизирует queryValues); смена
    // breakpoints на лету пере-подписывает на новые media-query.
  }, [queryValues, initialValues]);

  return value;
};

/**
 * Состояние adaptive media-query (`isMobile` / `isTablet` / …). По умолчанию — дефолтные брейкпоинты DS.
 * Для per-app override передайте свою карту запросов; она должна быть стабильной по ссылке.
 */
export function useAdaptiveMatchMedia(queryValues: Record<AdaptiveQuery, string> = ADAPTIVE_QUERIES) {
  return useMatchMediaGeneric({
    queryValues,
    initialValues: INITIAL_ADAPTIVE_QUERIES_VALUE,
  });
}
