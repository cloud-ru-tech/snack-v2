import { ValueOf } from './valueOf';

/** Константы типов раскладки adaptive-компонентов (mobile / tablet / desktopSmall / desktop). */
export const LAYOUT_TYPE = {
  Desktop: 'desktop',
  DesktopSmall: 'desktopSmall',
  Tablet: 'tablet',
  Mobile: 'mobile',
} as const;

/**
 * Union типов раскладки adaptive-компонентов
 * @function type
 */
export type LayoutType = ValueOf<typeof LAYOUT_TYPE>;
