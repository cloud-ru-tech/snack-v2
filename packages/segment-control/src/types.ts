import { ValueOf } from '@ds/utils';
import { ReactNode } from 'react';

import { ICON_POSITION, SIZE, WIDTH } from './constants';

export type IdType = string | number;

export type Size = ValueOf<typeof SIZE>;

export type Width = ValueOf<typeof WIDTH>;

export type IconPosition = ValueOf<typeof ICON_POSITION>;

export type Segment<Value extends IdType = IdType> = {
  /** Идентификатор сегмента. */
  value: Value;
  /** Текстовый заголовок сегмента. */
  label?: string;
  /** Состояние активности сегмента. */
  disabled?: boolean;
  /** Иконка сегмента. */
  icon?: ReactNode;
  /** Позиция иконки относительно лейбла. */
  iconPosition?: IconPosition;
  /** Счётчик в сегменте (отображается после лейбла). */
  counter?: string | number;
  /** Render-обёртка над сегментом. */
  renderWrapSegment?: (segment: ReactNode) => ReactNode;
};

export type SelectionPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};
