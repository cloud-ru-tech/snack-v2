import { SkeletonText } from '@ds/skeleton';
import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

type QuotaWidgetCardsSkeletonProps = PropsWithChildren<{
  isLoading: boolean;
}>;

const SKELETON_COUNT = 6;

export function QuotaWidgetCardsSkeleton({ isLoading, children }: QuotaWidgetCardsSkeletonProps) {
  if (isLoading) {
    return [...Array(SKELETON_COUNT)].map((_, index) => (
      <div className={styles.card} key={index}>
        <SkeletonText loading lines={1} variant='body' size='m' />
        <SkeletonText loading lines={1} variant='body' size='m' />
        <SkeletonText loading lines={1} variant='body' size='l' />
      </div>
    ));
  }

  return children;
}
