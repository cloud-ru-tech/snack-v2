import { Button } from '@ds/button';

import { TEST_IDS } from '../../constants';
import { tableLocale } from '../../locale';
import styles from './styles.module.scss';

export type LoadMoreButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  hasMore?: boolean;
};

export function LoadMoreButton({ onClick, loading = false, hasMore = false }: LoadMoreButtonProps) {
  const { t } = tableLocale.useTranslations();

  if (!hasMore && !loading) {
    return null;
  }

  return (
    <div className={styles.footer}>
      <Button
        data-test-id={TEST_IDS.loadMoreButton}
        label={t('loadMore')}
        appearance='neutral'
        view='outline'
        size='s'
        loading={loading}
        disabled={!hasMore || loading}
        onClick={onClick}
      />
    </div>
  );
}
