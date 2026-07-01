import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { DesktopInfoRow } from '../DesktopInfoRow';
import { DataType, useGetContent } from '../shared';
import styles from './styles.module.scss';
import { DesktopInfoGroupProps, InfoGroupItem } from './types';

export function DesktopInfoGroup<T extends DataType>({
  data,
  items,
  className,
  loading,
  columns = 'single',
  width = 'fixed',
  formatBoolean,
  ...rest
}: DesktopInfoGroupProps<T>) {
  const getContent = useGetContent({ formatBoolean });

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.wrapper, className)}
      data-columns={columns}
      data-width={width}
    >
      {items.map((item: InfoGroupItem<T>, index: number) => {
        const { label, accessorKey, render, labelClassName, className: rowClass, rowClassName, ...rest } = item;
        const content = getContent<T>({ data, render, accessorKey });
        const rowWidth = columns === 'double' || width === 'full' ? 'full' : 'fixed';
        const showTopDivider = columns === 'double' ? index < 2 : index === 0;
        const isDouble = columns === 'double';

        return (
          <div className={styles.infoRowWrapper} data-width={width} key={String(accessorKey ?? label)}>
            <DesktopInfoRow
              label={label}
              content={content}
              topDivider={showTopDivider}
              bottomDivider
              loading={loading}
              width={rowWidth}
              labelClassName={cn(
                width === 'fixed' && isDouble ? styles.infoRowLabelDoubleFixed : undefined,
                width === 'full' && isDouble ? styles.infoRowLabelDoubleFull : undefined,
                labelClassName,
              )}
              className={cn(isDouble ? styles.contentDouble : undefined, rowClass)}
              rowClassName={cn(isDouble ? styles.contentDouble : undefined, rowClassName)}
              {...rest}
            />
          </div>
        );
      })}
    </div>
  );
}
