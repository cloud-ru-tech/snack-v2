import { SkeletonText } from '@ds/skeleton';
import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

type QuotaWidgetCardsSkeletonProps = PropsWithChildren<{
  loading: boolean;
}>;

const SKELETON_COUNT = 8;

export function QuotaWidgetCardsSkeleton({ loading, children }: QuotaWidgetCardsSkeletonProps) {
  if (loading) {
    return [...Array(SKELETON_COUNT)].map((_, index) => (
      <div className={styles.card} key={index}>
        <SkeletonText loading lines={1} variant='body' size='m' width='50%' />
        <SkeletonText loading lines={1} variant='body' size='m' />
        <SkeletonText loading lines={1} variant='body' size='l' />
      </div>
    ));
  }

  return children;
}
