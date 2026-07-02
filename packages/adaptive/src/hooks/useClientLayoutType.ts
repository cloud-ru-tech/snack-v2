import { useLayoutEffect } from '@ds/utils';
import { useMemo, useState } from 'react';

import {
  ADAPTIVE_BREAKPOINT,
  ADAPTIVE_QUERIES,
  AdaptiveBreakpoints,
  buildAdaptiveQueries,
  INITIAL_ADAPTIVE_QUERIES_VALUE,
} from '../constants/adaptive';
import { LayoutType } from '../types';
import { getMatchMediaGeneric, getMediaQueryListGeneric } from '../utils/getMatchMedia';
import { layoutTypeFromMatchMedia } from '../utils/layoutTypeFromMatchMedia';

/**
 * Раскладка с коррекцией ДО первой отрисовки. Старт — `initialLayoutType` с сервера (Client Hints
 * → точная ширина на Chromium; иначе desktop), поэтому первый клиентский рендер совпадает с SSR
 * (чистая гидратация). Уточнение по media-query — в `useLayoutEffect` (синхронно перед paint), а не
 * в `useEffect`: на узком окне в FF/Safari переключение происходит до отрисовки, без видимого прыжка.
 * `<html data-layout-type>` держим синхронизированным для адаптивного CSS (его же ставит pre-paint скрипт).
 */
export function useClientLayoutType(initialLayoutType: LayoutType, breakpoints?: AdaptiveBreakpoints): LayoutType {
  const [layoutType, setLayoutType] = useState<LayoutType>(initialLayoutType);

  const queryValues = useMemo(
    () => (breakpoints ? buildAdaptiveQueries({ ...ADAPTIVE_BREAKPOINT, ...breakpoints }) : ADAPTIVE_QUERIES),
    // Зависим от значений брейкпоинтов, а не от ссылки объекта — иначе инлайн-override переподписывает matchMedia.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [breakpoints?.mobile, breakpoints?.tablet, breakpoints?.desktopSmall, breakpoints?.desktop],
  );

  useLayoutEffect(() => {
    const apply = () => {
      const next = layoutTypeFromMatchMedia(
        getMatchMediaGeneric({ queryValues, initialValues: INITIAL_ADAPTIVE_QUERIES_VALUE }),
      );
      document.documentElement.dataset.layoutType = next;
      setLayoutType(next);
    };

    apply();
    const handler = () => apply();
    const mediaQueryList = getMediaQueryListGeneric({ queryValues });

    mediaQueryList.forEach(([, mql]) => mql.addEventListener('change', handler));

    return () => mediaQueryList.forEach(([, mql]) => mql.removeEventListener('change', handler));
  }, [queryValues]);

  return layoutType;
}
