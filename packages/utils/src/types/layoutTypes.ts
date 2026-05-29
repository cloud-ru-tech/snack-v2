import { ValueOf } from './valueOf';

/** Константы типов раскладки adaptive-компонентов (desktop / mobile). */
export const LAYOUT_TYPE = {
  Desktop: 'desktop',
  Mobile: 'mobile',
} as const;

/**
 * Union типов раскладки adaptive-компонентов
 * @function type
 */
export type LayoutType = ValueOf<typeof LAYOUT_TYPE>;

/**
 * Utility-тип, добавляющий опциональный prop `layoutType` к props компонента
 * @function type
 */
export type WithLayoutType<T> = T & {
  layoutType?: LayoutType;
};
