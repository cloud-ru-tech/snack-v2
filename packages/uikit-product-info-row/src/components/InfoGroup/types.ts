import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { DataType, InfoRowPropsBase } from '../InfoRow';

type PropsWithAccessorKey<T extends DataType> = {
  accessorKey: keyof T;
  render?: never;
} & Omit<InfoRowPropsBase, 'content'>;

type PropsWithRender<T extends DataType> = {
  render: (data: T, noDataPlaceholder: string) => ReactNode;
  accessorKey?: never;
} & Omit<InfoRowPropsBase, 'content'>;

export type InfoGroupItem<T extends DataType> = PropsWithRender<T> | PropsWithAccessorKey<T>;

/**
 * `InfoGroup` из `@cloud-ru/uikit-product-info-row@1.1.6`: `data`, `items`, `className`, `loading`,
 * `columns`, `width` и `WithSupportProps`. Поля строк — те же, что у `InfoRow`, кроме `content`
 * (берётся из `accessorKey` / `render`). Дополнительно: `formatBoolean` вместо peer `@cloud-ru/uikit-product-locale`.
 */
export type InfoGroupProps<T extends DataType> = WithSupportProps<{
  data: T | undefined;
  items: InfoGroupItem<T>[];
  className?: string;
  loading?: boolean;
  columns?: 'single' | 'double';
  width?: 'fixed' | 'full';
  /** Локализация булевых значений при выводе по `accessorKey` (вместо peer `@cloud-ru/uikit-product-locale`) */
  formatBoolean?: (value: boolean) => string;
}>;
