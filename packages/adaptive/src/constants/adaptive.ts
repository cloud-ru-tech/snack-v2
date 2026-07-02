import { LAYOUT_TYPE, LayoutType } from '../types/layoutTypes';

/** Брейкпоинты adaptive-раскладки (max-width в px). Форма дефолта `ADAPTIVE_BREAKPOINT`. */
export type AdaptiveBreakpoints = {
  mobile: number;
  tablet: number;
  desktopSmall: number;
  desktop: number;
};

/** Брейкпоинты adaptive-раскладки (max-width в px), по которым `useAdaptiveBootstrap` выбирает `layoutType`. */
export const ADAPTIVE_BREAKPOINT: AdaptiveBreakpoints = {
  mobile: 767,
  tablet: 1023,
  desktopSmall: 1279,
  desktop: 1439,
};

/** CSS media-query строки, собранные из `ADAPTIVE_BREAKPOINT`. */
export const CSS_BREAKPOINTS = {
  mobile: `(max-width: ${ADAPTIVE_BREAKPOINT.mobile}px)`,
  tablet: `(max-width: ${ADAPTIVE_BREAKPOINT.tablet}px)`,
  desktopSmall: `(max-width: ${ADAPTIVE_BREAKPOINT.desktopSmall}px)`,
  desktop: `(max-width: ${ADAPTIVE_BREAKPOINT.desktop}px)`,
  large: `(min-width: ${ADAPTIVE_BREAKPOINT.desktop + 1}px)`,
} as const;

/** Ключи media-query, отслеживаемых `useAdaptiveMatchMedia`. */
export const ADAPTIVE_QUERY = {
  IsMobile: 'isMobile',
  IsTablet: 'isTablet',
  IsSmallDesktop: 'isSmallDesktop',
  IsDesktop: 'isDesktop',
  IsLarge: 'isLarge',
} as const;

/** Карта `query-key → media-query строка` для подписки. */
export const ADAPTIVE_QUERIES = {
  [ADAPTIVE_QUERY.IsMobile]: CSS_BREAKPOINTS.mobile,
  [ADAPTIVE_QUERY.IsTablet]: CSS_BREAKPOINTS.tablet,
  [ADAPTIVE_QUERY.IsSmallDesktop]: CSS_BREAKPOINTS.desktopSmall,
  [ADAPTIVE_QUERY.IsDesktop]: CSS_BREAKPOINTS.desktop,
  [ADAPTIVE_QUERY.IsLarge]: CSS_BREAKPOINTS.large,
} as const;

/** Собирает карту adaptive media-query из произвольных брейкпоинтов — для per-app override. */
export function buildAdaptiveQueries(breakpoints: AdaptiveBreakpoints) {
  return {
    [ADAPTIVE_QUERY.IsMobile]: `(max-width: ${breakpoints.mobile}px)`,
    [ADAPTIVE_QUERY.IsTablet]: `(max-width: ${breakpoints.tablet}px)`,
    [ADAPTIVE_QUERY.IsSmallDesktop]: `(max-width: ${breakpoints.desktopSmall}px)`,
    [ADAPTIVE_QUERY.IsDesktop]: `(max-width: ${breakpoints.desktop}px)`,
    [ADAPTIVE_QUERY.IsLarge]: `(min-width: ${breakpoints.desktop + 1}px)`,
  };
}

/** SSR-safe начальные значения (на сервере ни один media-query не матчится). */
export const INITIAL_ADAPTIVE_QUERIES_VALUE = {
  [ADAPTIVE_QUERY.IsMobile]: false,
  [ADAPTIVE_QUERY.IsTablet]: false,
  [ADAPTIVE_QUERY.IsSmallDesktop]: false,
  [ADAPTIVE_QUERY.IsDesktop]: false,
  [ADAPTIVE_QUERY.IsLarge]: false,
} as const;

/** SSR-baseline раскладки адаптивных компонентов: на сервере и до mount — desktop. */
export const DEFAULT_LAYOUT_TYPE: LayoutType = LAYOUT_TYPE.Desktop;

/** Наборы `layoutType`, уходящие по mobile-ветке surface-swap. Один источник для runtime, stories и docs. */
export const LAYOUT_SPLIT_MOBILE_TIERS = {
  /** Только phone уходит в mobile-ветку. */
  mobileOnly: [LAYOUT_TYPE.Mobile],
} as const;
