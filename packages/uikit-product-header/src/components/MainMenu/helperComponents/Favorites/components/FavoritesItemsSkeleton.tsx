import { Skeleton, SkeletonContext } from '@ds/skeleton';

import styles from '../styles.module.scss';

export function FavoritesItemsSkeleton() {
  return (
    <SkeletonContext.Provider value={true}>
      <div className={styles.skeleton}>
        <Skeleton className={styles.skeletonItem} />
        <Skeleton className={styles.skeletonItem} />
        <Skeleton className={styles.skeletonItem} />
      </div>
    </SkeletonContext.Provider>
  );
}
