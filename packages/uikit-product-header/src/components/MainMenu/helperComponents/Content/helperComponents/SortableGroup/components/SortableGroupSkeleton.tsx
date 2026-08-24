import { Skeleton, SkeletonContext, SkeletonText } from '@ds/skeleton';

import styles from '../styles.module.scss';

type SortableGroupSkeletonProps = {
  isMobile?: boolean;
};

export function SortableGroupSkeleton({ isMobile }: SortableGroupSkeletonProps) {
  return (
    <div className={styles.group}>
      <SkeletonContext.Provider value={true}>
        <div className={styles.skeletonTitle}>
          <SkeletonText lines={1} width={isMobile ? '50%' : '30%'} />
        </div>
        <div className={styles.skeletonBody}>
          <div className={styles.groupBody} data-mobile={isMobile || undefined}>
            <div className={styles.skeletonService}>
              <Skeleton height={24} borderRadius={2} />
            </div>
            <div className={styles.skeletonService}>
              <Skeleton height={24} borderRadius={2} />
            </div>
            <div className={styles.skeletonService}>
              <Skeleton height={24} borderRadius={2} />
            </div>
            <div className={styles.skeletonService}>
              <Skeleton height={24} borderRadius={2} />
            </div>
          </div>
        </div>
      </SkeletonContext.Provider>
    </div>
  );
}
