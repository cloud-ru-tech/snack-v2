import { TruncateStringProps } from '@ds/truncate-string';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ElementType } from 'react';

import { APPEARANCE, ROLE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Role = ValueOf<typeof ROLE>;

export type BaseProps = WithSupportProps<{
  /** Текст ссылки */
  label?: string;
  /** Роль
   * @default 'regular'
   */
  role?: Role;
  /** Стилизует ссылку для размещения на цветном фоне
   * @default 'primary'
   */
  appearance?: Appearance;
  /** Находится ли ссылка внутри текста (и можно ли её переносить) */
  insideText?: boolean;
  /**
   * Вариант обрезания строки:
   * <br/> - `end` - с конца;
   * <br/> - `middle` - посередине
   * */
  truncateVariant?: TruncateStringProps['variant'];
  /** Наличие нижнего подчеркивания
   * @default false
   */
  underlined?: boolean;
}>;

export type LinkProps<T extends ElementType = 'a'> = BaseProps & {
  /**
   *
   * Полиморфный компонент.
   *
   * Оформить переданный компонент или html элемент в стиль ссылки.
   *
   * Список атрибутов, которые переданный компонент должен принять:
   * <br/> - `className`
   * <br/> - `data-size`
   * <br/> - `data-text-mode`
   * <br/> - `data-appearance`
   * <br/> - `data-inside-text`
   *
   * @type ComponentType | ElementType
   * @default 'a'
   *
   * */
  as?: T;
} & Omit<ComponentPropsWithoutRef<ElementType extends T ? 'a' : T>, keyof BaseProps>;

export type PickLinkProps<T extends ElementType, SelectedKeys extends keyof LinkProps<T>> = Pick<
  LinkProps<T>,
  SelectedKeys
> &
  Omit<ComponentPropsWithoutRef<ElementType extends T ? 'a' : T>, keyof BaseProps>;
