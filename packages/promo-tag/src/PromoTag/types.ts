import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, MouseEventHandler, ReactNode } from 'react';

import { Appearance, RoleAppearance, Size } from '../types';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

export type PromoTagOwnProps = {
  /** Текст компонента */
  text?: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** Роль промо-тега */
  role?: RoleAppearance;
  /** CSS-класс */
  className?: string;
  /** Колбэк для обработки клика на тег */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Контент перед текстом */
  beforeContent?: ReactNode;
  /** Контент после текста */
  afterContent?: ReactNode;
  /** Размер */
  size?: Size;
};

export type PromoTagProps<T extends ElementType = 'button'> = WithSupportProps<
  PromoTagOwnProps & {
    /** Элемент или компонент для рендера: 'button' | 'a' | Link из react-router-dom и т.п. */
    as?: T;
    /**
     * Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
     * Явный проп вместо forwardRef — как в Button и AiToolBadge.
     */
    innerRef?: PolymorphicRef<T>;
  } & Omit<ComponentPropsWithoutRef<T>, keyof PromoTagOwnProps | 'as' | 'ref' | 'innerRef'>
>;
