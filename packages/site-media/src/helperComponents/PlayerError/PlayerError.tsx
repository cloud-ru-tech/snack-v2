import { Button } from '@ds/button';

import { TEST_IDS } from '../../constants';
import { siteMediaLocale } from '../../locale';
import styles from './styles.module.scss';

type PlayerErrorProps = { onRetry?(): void };

export function PlayerError({ onRetry }: PlayerErrorProps) {
  const { t } = siteMediaLocale.useTranslations();
  return (
    <div className={styles.root} role='status' data-test-id={TEST_IDS.error}>
      <div className={styles.title}>{t('errorTitle')}</div>
      <div className={styles.description}>{t('errorDescription')}</div>
      {onRetry && <Button label={t('retry')} onClick={onRetry} data-test-id={TEST_IDS.retry} />}
    </div>
  );
}
