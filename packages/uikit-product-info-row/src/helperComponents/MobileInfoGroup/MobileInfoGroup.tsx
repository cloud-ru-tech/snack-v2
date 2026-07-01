import { extractSupportProps } from '@ds/utils';

import { MobileInfoRow } from '../MobileInfoRow';
import { DataType, useGetContent } from '../shared';
import { MobileInfoGroupItem, MobileInfoGroupProps } from './types';

export function MobileInfoGroup<T extends DataType>({
  data,
  items,
  className,
  loading,
  formatBoolean,
  ...rest
}: MobileInfoGroupProps<T>) {
  const getContent = useGetContent({ formatBoolean });

  return (
    <div {...extractSupportProps(rest)} className={className}>
      {items.map((item: MobileInfoGroupItem<T>, index: number) => {
        const { label, accessorKey, render, ...rowRest } = item;
        const content = getContent<T>({ data, render, accessorKey });

        return (
          <MobileInfoRow
            key={String(accessorKey ?? label)}
            label={label}
            content={content}
            topDivider={index === 0}
            bottomDivider
            loading={loading}
            {...rowRest}
          />
        );
      })}
    </div>
  );
}
