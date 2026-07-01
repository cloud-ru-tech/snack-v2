import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { DesktopInfoRowPropsBase } from '../DesktopInfoRow';
import { DataType } from '../shared';

type PropsWithAccessorKey<T extends DataType> = {
  accessorKey: keyof T;
  render?: never;
} & Omit<DesktopInfoRowPropsBase, 'content'>;

type PropsWithRender<T extends DataType> = {
  render: (data: T, noDataPlaceholder: string) => ReactNode;
  accessorKey?: never;
} & Omit<DesktopInfoRowPropsBase, 'content'>;

export type InfoGroupItem<T extends DataType> = PropsWithRender<T> | PropsWithAccessorKey<T>;

/**
 * Пропы `DesktopInfoGroup`: `data`, `items`, `className`, `loading`, `columns`, `width` и `WithSupportProps`.
 * Поля строк — те же, что у `DesktopInfoRow`, кроме `content` (берётся из `accessorKey` / `render`).
 * Дополнительно: `formatBoolean` — локализация булевых значений.
 */
export type DesktopInfoGroupProps<T extends DataType> = WithSupportProps<{
  data: T | undefined;
  items: InfoGroupItem<T>[];
  className?: string;
  loading?: boolean;
  columns?: 'single' | 'double';
  width?: 'fixed' | 'full';
  /** Локализация булевых значений при выводе по `accessorKey` */
  formatBoolean?: (value: boolean) => string;
}>;
