import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, MouseEvent } from 'react';

import { SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

/** Наборы Figma: ButtonCloseOutlineXs, ButtonCloseOutlineS, ButtonCloseS, ButtonCloseM. */
export type AiButtonCloseOwnProps = {
  /** Размер: `xs` 16×16, `s` 24×24, `m` 32×32. По умолчанию `s`. */
  size?: Size;
  /** Подложка с обводкой. У `xs` включена всегда, у `m` не применяется. По умолчанию `false`. */
  outline?: boolean;
  /** Блокирует нажатие. */
  disabled?: boolean;
  /** Нажатие на крестик. Что происходит после нажатия, решает потребитель. */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Кнопка-крестик. Сообщает о нажатии; закрыть блок или удалить вложение решает потребитель.
 *
 * Доступное имя по умолчанию — «Закрыть» из локали пакета; переопределяется `aria-label`.
 */
export type AiButtonCloseProps = WithSupportProps<
  AiButtonCloseOwnProps & Omit<ComponentPropsWithoutRef<'button'>, keyof AiButtonCloseOwnProps | 'type' | 'children'>
>;
