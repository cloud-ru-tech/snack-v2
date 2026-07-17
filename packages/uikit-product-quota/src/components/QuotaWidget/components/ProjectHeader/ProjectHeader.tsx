import { Button } from '@ds/button';
import { QuotaSVG } from '@ds/icons/interface/product';
import { TitleClickable } from '@ds/uikit-product-title-clickable';

import { TEST_IDS } from '../../../../constants';
import { quotaLocale } from '../../../../locale';
import { QuotaWidgetPropsBase } from '../../../../types';
import styles from './styles.module.scss';

type ProjectHeaderProps = Pick<
  QuotaWidgetPropsBase,
  'projectName' | 'canEditQuota' | 'isError' | 'hideIncreaseQuotaButton' | 'onIncreaseQuotaClick'
> & {
  quotasUrl: string;
  onQuotasUrlClick?: () => void;
};

const RUSSIAN_CHARS_REGEXP = /[А-Яа-яЁё]/;

export function ProjectHeader({
  projectName,
  quotasUrl,
  canEditQuota,
  isError,
  onIncreaseQuotaClick,
  hideIncreaseQuotaButton,
  onQuotasUrlClick,
}: ProjectHeaderProps) {
  const { t } = quotaLocale.useTranslations();

  const widgetTitle = RUSSIAN_CHARS_REGEXP.test(projectName) ? 'widgetTitle.quotes' : 'widgetTitle.noQuotes';

  return (
    <div className={styles.header} data-test-id={TEST_IDS.quotaWidget.projectHeader}>
      <div className={styles.projectWrapper}>
        <TitleClickable
          className={styles.titleLink}
          title={t(widgetTitle, { project: projectName })}
          href={quotasUrl}
          target='_blank'
          icon={<QuotaSVG />}
          onClick={onQuotasUrlClick}
        />

        <p className={styles.subtitle}>{t('widgetSubtitle')}</p>
      </div>

      {canEditQuota && !isError && !hideIncreaseQuotaButton && (
        <Button
          view='outline'
          appearance='neutral'
          label={t('increaseQuota')}
          size='m'
          onClick={onIncreaseQuotaClick}
        />
      )}
    </div>
  );
}
