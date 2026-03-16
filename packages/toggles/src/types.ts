import { ValueOf, WithSupportProps } from '@design-system/utils';
import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode, RefObject } from 'react';

import { FAVOURITE_ICON, MODE, SELECTION_MODE, SIZE } from './constants';

export type DataAttributes = Record<`data-${string}`, string | boolean>;

export type Size = ValueOf<typeof SIZE>;
export type Mode = ValueOf<typeof MODE>;
export type SelectionMode = ValueOf<typeof SELECTION_MODE>;
export type FavouriteIcon = ValueOf<typeof FAVOURITE_ICON>;

export type InputVisualState = {
  focusVisible: boolean;
  disabled: boolean;
  checked: boolean;
  hover: boolean;
  size: Size;
};

type TogglePropsBase = WithSupportProps<{
  /** Размер */
  size?: Size;
  /** Колбек рендера компонента */
  render: (visualState: InputVisualState) => ReactNode;
  /** HTML-аттрибут id */
  id?: string;
  /** Режим работы */
  mode?: Mode;
  /** HTML-аттрибут value */
  value?: string;
  /** HTML-аттрибут name */
  name?: string;
  /** HTML-аттрибут tab-index */
  tabIndex?: number;
  /** HTML-аттрибут autofocus */
  autofocus?: boolean;
  /** HTML-аттрибут checked */
  checked?: boolean;
  /** HTML-аттрибут checked по-умолчанию */
  defaultChecked?: boolean;
  /** HTML-аттрибут disabled */
  disabled?: boolean;
  /** Колбек смены значения */
  onChange?: (checked: boolean) => void;
  /** Колбек клика */
  onClick?: MouseEventHandler<HTMLInputElement>;
  /** Колбек потери фокуса */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Колбек приобретения фокуса */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Колбек нажатия клавиши клавиатуры */
  onKeyUp?: KeyboardEventHandler<HTMLDivElement>;
  /** CSS-класс */
  className?: string;
}>;

export type ToggleProps = WithSupportProps<
  Pick<
    TogglePropsBase,
    | 'id'
    | 'name'
    | 'value'
    | 'tabIndex'
    | 'autofocus'
    | 'checked'
    | 'defaultChecked'
    | 'disabled'
    | 'onChange'
    | 'onClick'
    | 'onBlur'
    | 'onFocus'
    | 'className'
    | 'size'
  > & {
    inputRef?: RefObject<HTMLInputElement>;
    /** Состояние загрузки */
    loading?: boolean;
  }
>;
