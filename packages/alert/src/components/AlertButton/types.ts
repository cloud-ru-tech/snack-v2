import { ValueOf } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

import { ButtonSize, ButtonVariant } from '../../types';
import { ICON_POSITION } from './constants';

export type IconPosition = ValueOf<typeof ICON_POSITION>;

export type BaseButtonProps = {
  /** Текст кнопки */
  label?: string;
  /** Иконка */
  icon?: ReactNode;
  /** Позиция иконки относительно текста */
  iconPosition?: IconPosition;
  /** Размер */
  size?: ButtonSize;
  /** Отключена */
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** Дополнительный класс */
  className?: string;
  /** Вариант оформления */
  variant?: ButtonVariant;
  /** Инвертировать цвет фокусного контура */
  invertFocusOutlineColor?: boolean;
};

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

/**
 * Полиморфный проп: рендер как button (по умолчанию), как a или как кастомный компонент (например Link из react-router-dom).
 * Для as="a" передавайте href, target и т.д.; для as={Link} — to, и т.д.
 */
export type AlertButtonProps<T extends ElementType = 'button'> = BaseButtonProps & {
  /** Элемент или компонент для рендера: 'button' | 'a' | ComponentType (например Link из react-router-dom) */
  as?: T;
  /**
   * Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseButtonProps | 'as' | 'ref'>;
