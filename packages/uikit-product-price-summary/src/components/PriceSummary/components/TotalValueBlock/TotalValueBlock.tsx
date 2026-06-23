import { Link, ROLE } from '@ds/link';
import { Tooltip } from '@ds/tooltip';
import { SIZE, Typography, VARIANT, WEIGHT } from '@ds/typography';
import { ReactNode } from 'react';

import { APPEARANCE_STATE } from '../../../../constants';
import { formatCurrency } from '../../../../helpers';
import { priceSummaryLocale } from '../../../../locale';
import { AppearanceState, PriceDeltaDetails, TotalSumType } from '../../../../types';
import { getAppearanceIcon } from '../../../../utils';
import styles from './styles.module.scss';

export type TotalValueBlockProps = {
  value?: number;
  valueDelta?: PriceDeltaDetails;
  totalSumType?: TotalSumType;
  hint?: string;
  hintAppearance?: AppearanceState;
  showHintTooltip?: boolean;
  hintTooltipText?: ReactNode;
  hintLink?: {
    href?: string;
    text: string;
  };
  showHintLink?: boolean;
};

export function TotalValueBlock({
  value,
  totalSumType = 'equal',
  hint,
  hintAppearance = APPEARANCE_STATE.Default,
  showHintTooltip,
  hintTooltipText,
  hintLink,
  showHintLink,
  valueDelta,
}: TotalValueBlockProps) {
  const { t } = priceSummaryLocale.useTranslations();

  const totalSumPrefix = totalSumType === 'from' ? `${t('totalSumFromPrefix')} ` : '';

  return (
    <div className={styles.content} data-appearance={hintAppearance}>
      <Typography variant={VARIANT.headline} size={SIZE.s} weight={WEIGHT.thin}>
        {value !== undefined
          ? `${totalSumPrefix}${formatCurrency(Number(value))}`
          : (t as (key: string) => string)('notAvailable')}
      </Typography>

      {valueDelta && (
        <Typography variant={VARIANT.body} size={SIZE.s} className={styles.valueDelta}>
          {`${t(`${valueDelta.type}Price`)} ${formatCurrency(valueDelta.value)}`}
        </Typography>
      )}

      <Tooltip
        open={showHintTooltip && hintTooltipText ? undefined : false}
        tip={hintTooltipText}
        placement='left-start'
      >
        {hint && (
          <div className={styles.hint} data-appearance={hintAppearance}>
            {getAppearanceIcon(hintAppearance, styles.hintIcon)}
            <Typography variant={VARIANT.body} size={SIZE.s}>
              {hint}
            </Typography>
          </div>
        )}
      </Tooltip>
      {showHintLink && (
        <Link
          role={ROLE.OnAccent}
          appearance='neutral'
          href={hintLink?.href}
          text={hintLink?.text}
          className={styles.link}
        />
      )}
    </div>
  );
}
