import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

import { SIZE, VARIANT } from './constants';

export type Variant = (typeof VARIANT)[keyof typeof VARIANT];
export type Size = (typeof SIZE)[keyof typeof SIZE];

export type AiFieldBannerOwnProps = {
  /** Семантический вариант баннера (ось `Variant` в Figma). По умолчанию `information`. */
  variant?: Variant;
  /** Размер: без `bottomContent` — `s` 400×48, `m` 400×60; с ним — `s` 400×72, `m` 400×84. */
  size?: Size;
  /** Текст или контент основной строки. Не рендерится, если не задан. */
  content?: ReactNode;
  /** Дополнительный слот под основной строкой. Не рендерится, если не задан. */
  bottomContent?: ReactNode;
  /** Иконка слева от текста */
  icon?: ReactNode;
  /** Подпись кнопки действия справа. Кнопка не рендерится, если не задана. */
  actionLabel?: string;
  /** Обработчик клика по кнопке действия. */
  onActionClick?(event: MouseEvent<HTMLButtonElement>): void;
  /** Доп. класс корня. */
  className?: string;
};

export type AiFieldBannerProps = WithSupportProps<
  AiFieldBannerOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiFieldBannerOwnProps | 'children'>
>;
