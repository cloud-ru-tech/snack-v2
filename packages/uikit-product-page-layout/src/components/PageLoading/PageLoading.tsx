import { LOADER_SIZE, Spinner } from '@ds/loader';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import styles from './styles.module.scss';

export type PageLoadingProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
}>;

export function PageLoading({ className, ...rest }: PageLoadingProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      <Spinner size={LOADER_SIZE.M} className={styles.spinner} />
    </div>
  );
}
