import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, Ref } from 'react';

import { APPEARANCE, ICON_POSITION, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;
export type Size = ValueOf<typeof SIZE>;
export type IconPosition = ValueOf<typeof ICON_POSITION>;

export type BaseGigaButtonOwnProps = {
  /** Оформление подписи: primary использует primary/text, neutral — neutral/text. Обводка есть у Outline и Mama. */
  appearance?: Appearance;
  /** Показывает индикатор и блокирует действие, сохраняя фокус и ширину кнопки. Имеет приоритет над disabled. */
  loading?: boolean;
  /** Нативно отключает кнопку, когда loading=false; глобус сохраняет цвет. */
  disabled?: boolean;
  /** Дополнительный CSS-класс корневой кнопки. */
  className?: string;
  /** Ссылка на корневой HTMLButtonElement. */
  innerRef?: Ref<HTMLButtonElement>;
};

export type BaseGigaButtonProps = WithSupportProps<
  BaseGigaButtonOwnProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseGigaButtonOwnProps | 'children' | 'ref'>
>;
