import { APPEARANCE, Divider } from '@ds/divider';
import { Typography } from '@ds/typography';

import { TEST_IDS } from '../../../../constants';
import { quotaLocale } from '../../../../locale';
import { QuotaItem } from '../../../../types';
import { checkIsExceeded, formatNumber } from '../../../../utils';
import styles from './styles.module.scss';

type QuotaTooltipProps = {
  quota: QuotaItem;
};

export function QuotaTooltip({ quota }: QuotaTooltipProps) {
  const { t } = quotaLocale.useTranslations();

  const rows = [
    { label: t('tooltipAvailable'), value: quota.limit },
    { label: t('tooltipUsed'), value: quota.usage },
    { label: t('tooltipRemaining'), value: quota.remains },
  ];

  const exhaustedHint = `${t('tooltipExhaustedHint.first')} ${t('tooltipExhaustedHint.second')}`;

  return (
    <div className={styles.content} data-test-id={TEST_IDS.quotaWidgetCard.tooltip}>
      <div className={styles.lists}>
        {rows.map(row => (
          <div className={styles.row} key={row.label}>
            <span className={styles.rowLabel}>{row.label}</span>
            <span className={styles.rowValue}>
              {formatNumber(row.value)} {quota.unitDisplayName}
            </span>
          </div>
        ))}
      </div>

      {checkIsExceeded(quota) && (
        <>
          <Divider appearance={APPEARANCE.OnComplementary} />
          <Typography variant='body' size='m'>
            {exhaustedHint}
          </Typography>
        </>
      )}
    </div>
  );
}
