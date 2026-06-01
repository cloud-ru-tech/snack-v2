import { TruncateStringProps } from '@ds/truncate-string';
import { ReactNode } from 'react';

import { BUTTON_SIZE, SIZE } from './constants';

export type Size = (typeof SIZE)[keyof typeof SIZE];
export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

export type BaseChipProps = {
  /** Иконка */
  icon?: ReactNode;
  /** Текст чипа */
  label: string;
  /** Отключён */
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** CSS-класс */
  className?: string;
  /** Индекс в порядке фокусировки */
  tabIndex?: number;
  /** Вариант обрезания строки @default 'middle' */
  truncateVariant?: TruncateStringProps['variant'];
};
