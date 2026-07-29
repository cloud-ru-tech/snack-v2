import { Button } from '@ds/button';

import { quotaLocale } from '../../locale';
import styles from './styles.module.scss';

/** Кнопка «Увеличить квоту» (outline, на всю ширину) — низ мобильного листа / footer-слот BottomSheet. */
export function QuotaIncreaseButton({ onClick }: { onClick?: () => void }) {
  const { t } = quotaLocale.useTranslations();

  return (
    <Button
      className={styles.increaseButton}
      view='outline'
      appearance='neutral'
      label={t('increaseQuota')}
      size='m'
      fullWidth
      onClick={onClick}
    />
  );
}
