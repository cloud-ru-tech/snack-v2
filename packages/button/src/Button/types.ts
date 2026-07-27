import { CounterProps } from '@ds/counter';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

import { APPEARANCE, ICON_POSITION, SIZE, VIEW } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;
export type IconPosition = ValueOf<typeof ICON_POSITION>;
export type Size = ValueOf<typeof SIZE>;
export type View = ValueOf<typeof VIEW>;

export type BaseButtonProps = WithSupportProps<{
  /** Текст кнопки */
  label?: string;
  /** Иконка */
  icon?: ReactNode;
  /** Позиция иконки относительно текста */
  iconPosition?: IconPosition;
  /** Вариант оформления */
  appearance?: Appearance;
  /** Размер */
  size?: Size;
  /** Отключена */
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** На всю ширину */
  fullWidth?: boolean;
  /**
   * Минимальная ширина контейнера (`min-width` из токена размера). По умолчанию `true`.
   * `false` — кнопка сжимается по контенту вместо фиксированного минимума.
   */
  minWidth?: boolean;
  /** Дополнительный класс */
  className?: string;
  /** Вариант кнопки (Figma: filled, outline, function, simple, elevated) */
  view?: View;
  /** Пропсы для counter */
  counter?: Omit<CounterProps, 'size' | 'appearance'>;
}>;

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

/**
 * Полиморфный проп: рендер как button (по умолчанию), как a или как кастомный компонент (например Link из react-router-dom).
 * Для as="a" передавайте href, target и т.д.; для as={Link} — to, и т.д.
 */
export type ButtonProps<T extends ElementType = 'button'> = BaseButtonProps & {
  /** Элемент или компонент для рендера: 'button' | 'a' | ComponentType (например Link из react-router-dom) */
  as?: T;
  /**
   * Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseButtonProps | 'as' | 'ref'>;
