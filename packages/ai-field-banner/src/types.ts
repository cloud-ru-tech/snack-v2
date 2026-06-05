import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

import { SIZE, TYPE } from './constants';

export type Type = (typeof TYPE)[keyof typeof TYPE];
export type Size = (typeof SIZE)[keyof typeof SIZE];

export type AiFieldBannerOwnProps = {
  /** Семантический вариант баннера (ось `Type` в Figma). По умолчанию `information`. */
  variant?: Type;
  /** Размер: без `children` — `s` 400×48, `m` 400×60; с `children` — `s` 400×72, `m` 400×84. */
  size?: Size;
  /** Текст или контент основной строки. Не рендерится, если не задан. */
  description?: ReactNode;
  /** Дополнительный слот под основной строкой. Не рендерится, если не задан. */
  children?: ReactNode;
  /** Принудительно добавляет высоту компонента на 12px, даже если `children` не задан. */
  hasAdditional?: boolean;
  /** Иконка слева от текста */
  icon?: ReactNode;
  /** Подпись кнопки действия справа. Кнопка не рендерится, если не задана. */
  actionLabel?: string;
  /** Обработчик клика по кнопке действия. */
  onActionClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Доп. класс корня. */
  className?: string;
};

export type AiFieldBannerProps = WithSupportProps<
  AiFieldBannerOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiFieldBannerOwnProps>
>;
