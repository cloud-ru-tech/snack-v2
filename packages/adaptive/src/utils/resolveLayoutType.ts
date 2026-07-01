import { DEFAULT_LAYOUT_TYPE, LAYOUT_SPLIT_MOBILE_TIERS } from '../constants/adaptive';
import { LayoutType } from '../types/layoutTypes';

/**
 * Нормализует опциональный `layoutType` к desktop-дефолту. Единая точка SSR-решения:
 * на сервере и до mount, когда раскладка не передана, считаем desktop.
 */
export function resolveLayoutType(layoutType?: LayoutType): LayoutType {
  return layoutType ?? DEFAULT_LAYOUT_TYPE;
}

/**
 * Канон ветвления `Adaptive*`-обёрток: mobile-путь строго на `mobile`,
 * tablet/desktopSmall/desktop → desktop-ветка.
 */
export function isMobileLayout(layoutType?: LayoutType): boolean {
  return (LAYOUT_SPLIT_MOBILE_TIERS.mobileOnly as readonly LayoutType[]).includes(resolveLayoutType(layoutType));
}
