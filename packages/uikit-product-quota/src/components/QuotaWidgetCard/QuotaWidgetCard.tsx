import { Button } from '@ds/button';
import { UpdateSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';
import { ProgressBar } from '@ds/progress-bar';
import { SkeletonText } from '@ds/skeleton';
import { Tooltip } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { WithSupportProps } from '@ds/utils';

import { quotaLocale } from '../../locale';
import { QuotaItem } from '../../types';
import { checkIsExceeded, formatNumber, getPercent } from '../../utils';
import { QuotaTooltip } from './components/QuotaTooltip';
import styles from './styles.module.scss';

export type QuotaWidgetCardProps = WithSupportProps<{
  /** Отображаемая квота */
  quota: QuotaItem;
  /** Состояние «не удалось загрузить данные» (Figma: noData=true) */
  noData?: boolean;
  /** Состояние загрузки (Figma: loading=true) */
  loading?: boolean;
  /** Колбек кнопки «Обновить» в состоянии noData */
  onRefresh?: () => void;
}>;

const QUOTA_USAGE_PROGRESS = {
  HIGH: 90,
  MEDIUM: 70,
} as const;

function getProgressAppearance(percent: number) {
  if (percent >= QUOTA_USAGE_PROGRESS.HIGH) {
    return 'red';
  }
  if (percent >= QUOTA_USAGE_PROGRESS.MEDIUM) {
    return 'yellow';
  }
  return 'green';
}

export function QuotaWidgetCard({ quota, noData = false, loading = false, onRefresh, ...props }: QuotaWidgetCardProps) {
  const { t } = quotaLocale.useTranslations();

  if (noData) {
    return (
      <div className={styles.card} data-no-data {...props}>
        <InfoBlock
          size='s'
          align='vertical'
          title={quota.name}
          content={t('errorText')}
          footer={
            onRefresh ? (
              <Button
                view='simple'
                appearance='neutral'
                size='s'
                label={t('errorButton')}
                icon={<UpdateSVG size={16} />}
                iconPosition='after'
                onClick={onRefresh}
              />
            ) : undefined
          }
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.card} data-loading {...props}>
        <SkeletonText loading lines={1} variant='body' size='m' />
        <SkeletonText loading lines={1} variant='body' size='m' />
        <SkeletonText loading lines={1} variant='body' size='l' />
      </div>
    );
  }

  const percent = getPercent(quota);

  const rows = [
    {
      label: t('cardAvailable'),
      value: quota.limit,
    },
    {
      label: t('cardRemaining'),
      value: quota.remains,
    },
  ];

  return (
    <Tooltip triggerClassName={styles.tooltip} hoverDelayOpen={500} tip={<QuotaTooltip quota={quota} />}>
      <div className={styles.card} data-exhausted={checkIsExceeded(quota)} {...props}>
        <div className={styles.header}>
          <Typography variant='body' size='m' className={styles.title}>
            <TruncateString maxLines={2} text={quota.name} />
          </Typography>

          <span className={styles.percent}>{Math.round(percent)}%</span>
        </div>

        <ProgressBar
          className={styles.progressBar}
          progress={percent}
          size='xs'
          appearance={getProgressAppearance(percent)}
        />

        <div className={styles.info}>
          {rows.map(row => (
            <div className={styles.row} key={row.label}>
              <span className={styles.label}>{row.label}</span>

              <span className={styles.value}>
                {formatNumber(row.value)} <span className={styles.unit}>{quota.unitDisplayName}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Tooltip>
  );
}
