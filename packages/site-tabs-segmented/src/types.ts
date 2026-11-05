import { ValueOf, WithSupportProps } from '@ds/utils';
import { MouseEvent } from 'react';

import { APPEARANCE, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type Appearance = ValueOf<typeof APPEARANCE>;

export type TabsSegmentedItem = WithSupportProps<{
  /** Значение вкладки. */
  value: string;
  /** Текст вкладки. */
  label: string;
  /** Вкладка недоступна для выбора. */
  disabled?: boolean;
  /** CSS-класс вкладки. */
  className?: string;
  /** Колбэк клика по вкладке. */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}>;

export type TabsSegmentedProps = WithSupportProps<{
  /** Вкладки. */
  items: TabsSegmentedItem[];
  /** Значение выбранной вкладки (controlled). */
  value?: string;
  /** Значение вкладки, выбранной изначально (uncontrolled). По умолчанию — первая вкладка. */
  defaultValue?: string;
  /** Колбэк выбора вкладки. */
  onChange?(value: string): void;
  /** Размер. */
  size?: Size;
  /** Оформление. */
  appearance?: Appearance;
  /** Переносить вкладки на новую строку. Без переноса ряд прокручивается по горизонтали. */
  wrap?: boolean;
  /** CSS-класс корня. */
  className?: string;
}>;
