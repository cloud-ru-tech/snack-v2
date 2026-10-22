import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, MouseEvent } from 'react';

import { DIRECTION } from './constants';

export type Direction = ValueOf<typeof DIRECTION>;

export type AiButtonControlsOwnProps = {
  /** Направление стрелки (ось Way в Figma). */
  direction: Direction;
  /** Блокирует нажатие. */
  disabled?: boolean;
  /** Нажатие на стрелку. Содержимое двигает потребитель. */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Кнопка-стрелка 24×24. Сообщает о нажатии в направлении стрелки; прокрутку выполняет потребитель.
 *
 * Доступное имя по умолчанию — из локали пакета по направлению; переопределяется `aria-label`.
 */
export type AiButtonControlsProps = WithSupportProps<
  AiButtonControlsOwnProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof AiButtonControlsOwnProps | 'type' | 'children'>
>;
