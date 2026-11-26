import type { TruncateStringProps } from '@ds/truncate-string';
import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, MouseEventHandler, ReactNode } from 'react';

import { Appearance, RoleAppearance, Size } from '../types';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

type PromoTagTruncate = {
  /** Положение многоточия */
  variant: NonNullable<TruncateStringProps['variant']>;
  /** Положение подсказки с полной подписью. По умолчанию сверху */
  tooltipPlacement?: TruncateStringProps['placement'];
};

export type PromoTagOwnProps = {
  /** Текст компонента */
  label?: string;
  /** Сокращает подпись до одной строки при нехватке места */
  truncate?: PromoTagTruncate;
  /** Внешний вид */
  appearance?: Appearance;
  /** Роль, в которой применяется `appearance`: акцентная заливка или декоративная */
  roleAppearance?: RoleAppearance;
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
