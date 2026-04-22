import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { DataType } from '../InfoRow';
import { MobileInfoRowPropsBase } from '../MobileInfoRow/types.ts';

type PropsWithAccessorKey<T extends DataType> = {
  accessorKey: keyof T;
  render?: never;
} & Omit<MobileInfoRowPropsBase, 'content'>;

type PropsWithRender<T extends DataType> = {
  render: (data: T, noDataPlaceholder: string) => ReactNode;
  accessorKey?: never;
} & Omit<MobileInfoRowPropsBase, 'content'>;

export type MobileInfoGroupItem<T extends DataType> = PropsWithRender<T> | PropsWithAccessorKey<T>;

export type MobileInfoGroupProps<T extends DataType> = WithSupportProps<{
  data: T | undefined;
  items: MobileInfoGroupItem<T>[];
  className?: string;
  loading?: boolean;
  formatBoolean?: (value: boolean) => string;
}>;
