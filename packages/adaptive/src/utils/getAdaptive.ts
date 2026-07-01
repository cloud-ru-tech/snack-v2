import { ADAPTIVE_QUERY } from '../constants/adaptive';
import { AdaptiveQuery, MatchMediaGeneric } from '../types/adaptive';
import { LAYOUT_TYPE, LayoutType } from '../types/layoutTypes';
import { getUserAgentInfo } from './getUserAgentInfo';

/**
 * Вычисляет `layoutType` по типу устройства из user-agent + media-query (гибрид «UA + ширина»):
 * - `mobile` → всегда `mobile`;
 * - `tablet` → `mobile` при узком окне (`isTablet`), иначе `tablet`;
 * - desktop / неизвестное → каскад по ширине: `isMobile` → `mobile`, `isTablet` → `tablet`,
 *   `isSmallDesktop` → `desktopSmall`, иначе `desktop`.
 *
 * SSR: передайте `userAgent` из заголовка запроса для корректной ветки в HTML без скачка после
 * гидрации; media-query на сервере нет → `INITIAL_ADAPTIVE_QUERIES_VALUE`.
 */
export function getAdaptive(
  matchMedia: MatchMediaGeneric<AdaptiveQuery>,
  userAgent?: string,
): { layoutType: LayoutType } {
  const { device } = getUserAgentInfo(userAgent);

  const isMobile = matchMedia[ADAPTIVE_QUERY.IsMobile];
  const isTablet = matchMedia[ADAPTIVE_QUERY.IsTablet];
  const isSmallDesktop = matchMedia[ADAPTIVE_QUERY.IsSmallDesktop];

  if (device.type === 'mobile') {
    return { layoutType: LAYOUT_TYPE.Mobile };
  }

  if (device.type === 'tablet') {
    return { layoutType: isTablet ? LAYOUT_TYPE.Mobile : LAYOUT_TYPE.Tablet };
  }

  // desktop / неизвестное устройство — каскад по ширине через все пороги.
  if (isMobile) {
    return { layoutType: LAYOUT_TYPE.Mobile };
  }
  if (isTablet) {
    return { layoutType: LAYOUT_TYPE.Tablet };
  }
  if (isSmallDesktop) {
    return { layoutType: LAYOUT_TYPE.DesktopSmall };
  }

  return { layoutType: LAYOUT_TYPE.Desktop };
}
