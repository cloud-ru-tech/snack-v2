import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

import styles from './styles.module.scss';

export type ToastButtonComposition = 'labelOnly' | 'iconOnly';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

type BaseToastButtonProps = {
  /** `labelOnly` — текстовая кнопка с padding; `iconOnly` — квадратная под SVG-иконку. */
  composition: ToastButtonComposition;
  /** Текст для `composition='labelOnly'`. */
  label?: string;
  /** Иконка для `composition='iconOnly'`. */
  children?: ReactNode;
  /** Критический вариант (красная палитра, для errorCritical / Cancel-сценариев). */
  critical?: boolean;
  /** Доп. класс на корень. */
  className?: string;
};

/**
 * Полиморфная кнопка тоста (Figma 8174:17980). По умолчанию `<button type="button">`;
 * через `as` можно отрендерить как `<a>`, `Link` из react-router-dom, NextLink и пр.
 * Для `as='a'` — передавайте `href`/`target`; для `as={Link}` — `to`, и т.д.
 *
 * Состояния default/hovered/pressed/focused — через CSS pseudo-classes, без props.
 */
export type ToastButtonProps<T extends ElementType = 'button'> = WithSupportProps<
  BaseToastButtonProps & {
    /** Элемент или компонент для рендера: 'button' | 'a' | любой компонент (Link и т.п.) */
    as?: T;
    /** Ref на DOM/instance, рендерящийся через `as`. */
    innerRef?: PolymorphicRef<T>;
  } & Omit<ComponentPropsWithoutRef<T>, keyof BaseToastButtonProps | 'as' | 'ref'>
>;

export function ToastButton<T extends ElementType = 'button'>({
  composition,
  label,
  children,
  critical,
  className,
  as,
  innerRef,
  ...rest
}: ToastButtonProps<T>) {
  const Component: ElementType = as ?? 'button';
  const isNativeButton = Component === 'button';
  const content = composition === 'iconOnly' ? children : label;
  const support = extractSupportProps(rest);
  const { type: explicitType, ...passthrough } = rest as ComponentPropsWithoutRef<'button'> & Record<string, unknown>;
  return (
    <Component
      {...passthrough}
      {...support}
      ref={innerRef}
      type={isNativeButton ? (explicitType ?? 'button') : undefined}
      className={cn(styles.toastButton, className)}
      data-composition={composition}
      data-critical={critical || undefined}
    >
      {content}
    </Component>
  );
}
