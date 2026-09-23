import { SkeletonText } from '@ds/skeleton';
import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

type QuotaWidgetCardsSkeletonProps = PropsWithChildren<{
  loading: boolean;
  /** Количество строк сетки, заполняемых заглушками. */
  rowCount?: number;
  /** Сетка в одну колонку: строка = одна карточка вместо двух. */
  singleColumn?: boolean;
}>;

const DEFAULT_ROW_COUNT = 4;
const GRID_COLUMN_COUNT = 2;

export function QuotaWidgetCardsSkeleton({
  loading,
  rowCount = DEFAULT_ROW_COUNT,
  singleColumn = false,
  children,
}: QuotaWidgetCardsSkeletonProps) {
  if (loading) {
    const cardCount = Math.max(0, Math.trunc(rowCount)) * (singleColumn ? 1 : GRID_COLUMN_COUNT);

    return [...Array(cardCount)].map((_, index) => (
      <div className={styles.card} key={index}>
        <SkeletonText loading lines={1} variant='body' size='m' width='50%' />
        <SkeletonText loading lines={1} variant='body' size='m' />
        <SkeletonText loading lines={1} variant='body' size='l' />
      </div>
    ));
  }

  return children;
}
