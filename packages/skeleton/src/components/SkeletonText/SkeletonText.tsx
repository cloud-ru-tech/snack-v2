import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { useIsLoadingValue } from '../../hooks';
import { Skeleton, SkeletonProps } from '../Skeleton';
import styles from './styles.module.scss';
import { Align, Size, Variant } from './types';

export type SkeletonTextProps = WithSupportProps<
  Omit<SkeletonProps, 'height' | 'borderRadius'> & {
    /** Количество строк. */
    lines?: number;
    /** CSS-класс строки */
    rowClassName?: string;
    /** CSS-класс линии */
    lineClassName?: string;
    /** Роль типографики (размер по anatomy) */
    variant?: Variant;
    /** Масштаб: s, m, l */
    size?: Size;
    /** Выравнивание: left, right */
    align?: Align;
  }
>;

export function SkeletonText({
  width,
  className,
  rowClassName,
  lineClassName,
  children,
  loading,
  lines = 3,
  variant = 'body',
  size = 'm',
  align = 'left',
  ...restProps
}: SkeletonTextProps) {
  const lineTestId = restProps['data-test-id'] ? TEST_IDS.skeletonText.line : undefined;

  const rows = useMemo(
    () =>
      Array(lines)
        .fill(true)
        .map((_, index, array) => (
          <div key={index} className={cn(styles.skeletonTextRow, rowClassName)}>
            <Skeleton data-test-id={lineTestId} loading className={cn(styles.skeletonTextLine, lineClassName)} />
            {index === array.length - 1 && <div className={styles.skeletonTextLine}></div>}
          </div>
        )),
    [lines, rowClassName, lineTestId, lineClassName],
  );

  const isLoading = useIsLoadingValue(loading);

  if (isLoading) {
    return (
      <div
        {...restProps}
        className={cn(className, styles.skeletonText)}
        style={{ width }}
        data-purpose={variant}
        data-size={size}
        data-align={align}
      >
        {rows}
      </div>
    );
  }

  return <>{children}</>;
}
