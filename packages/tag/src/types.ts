import { PolymorphicRef, ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ElementType, MouseEvent, MouseEventHandler, Ref } from 'react';

import { APPEARANCE, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;

export type LinkProps = {
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
  target?: HTMLAnchorElement['target'];
};

export type TagRowItem = {
  id?: string;
  label: string;
  appearance?: Appearance;
} & Partial<LinkProps>;

export type TagRowItemInner = Omit<TagRowItem, 'appearance'> & {
  appearance: Appearance;
};

export type CommonTagProps = {
  label: string;
  size?: Size;
  appearance?: Appearance;
  className?: string;
  tabIndex?: number;
  /** Обработчик удаления тега. Если задан — отображается крестик-remove */
  onDelete?: MouseEventHandler<HTMLButtonElement>;
};

export type TagBaseProps = WithSupportProps<{
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Ref на корневой DOM-элемент.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: Ref<HTMLSpanElement>;
}> &
  CommonTagProps;

/**
 * Полиморфные пропсы тега-ссылки. По умолчанию рендер как <a>; с as можно передать
 * кастомный компонент (например Link из react-router-dom), тогда в rest — его пропсы (to, etc.).
 */
export type TagLinkProps<T extends ElementType = 'a'> = WithSupportProps<
  Omit<CommonTagProps, 'onDelete'> & {
    /** Элемент или компонент для рендера: 'a' | ComponentType (например Link из react-router-dom) */
    as?: T;
    /**
     * Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
     * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
     */
    innerRef?: PolymorphicRef<T>;
  } & Omit<ComponentPropsWithoutRef<T>, keyof CommonTagProps | 'as' | 'ref'>
>;

export type TagProps = TagBaseProps | TagLinkProps;

export type TagRowProps = WithSupportProps<{
  items: TagRowItem[];
  rowLimit?: number;
  size?: Size;
  moreButtonLabel?: string;
  className?: string;
  onItemRemove?(item: string): void;
}>;
