import { TruncateString } from '@ds/truncate-string';

import { quotaLocale } from '../../locale';
import styles from './styles.module.scss';

/** Мобильная шапка квота-виджета (макет): заголовок «Квоты» + имя проекта, слева, без пиктограмм. */
export function QuotaMobileHeader({ projectName }: { projectName: string }) {
  const { t } = quotaLocale.useTranslations();

  return (
    <div className={styles.mobileHeader}>
      <h2 className={styles.mobileTitle}>{t('quotas')}</h2>
      <div className={styles.mobileSubtitle}>
        <TruncateString maxLines={1} text={projectName} />
      </div>
    </div>
  );
}
