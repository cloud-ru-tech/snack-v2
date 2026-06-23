import { SIZE, Typography, VARIANT } from '@ds/typography';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { WithLayoutType } from '@ds/utils';

import { PERIOD_OPTION_TEST_IDS, TEST_IDS } from '../../../../constants';
import { usePeriodFormat } from '../../../../hooks';
import { priceSummaryLocale } from '../../../../locale';
import { PricePeriod } from '../../../../types';
import styles from './styles.module.scss';

export type PeriodDropdownProps = WithLayoutType<{
  period: PricePeriod;
  periodOptions: PricePeriod[];
  onPeriodChanged?: (period: PricePeriod) => void;
}>;

export function PeriodDropdown({ period, onPeriodChanged = () => {}, periodOptions, layoutType }: PeriodDropdownProps) {
  const { t } = priceSummaryLocale.useTranslations();
  const formatPeriod = usePeriodFormat();

  const actions = periodOptions
    .filter(item => item !== period)
    .map(item => ({
      id: item,
      content: { option: formatPeriod(item) },
      onClick: () => onPeriodChanged(item),
      'data-test-id': PERIOD_OPTION_TEST_IDS[item],
    }));

  return (
    <div className={styles.period} data-single={actions.length === 0 ? true : undefined}>
      <Typography variant={VARIANT.body} size={SIZE.m}>
        {t('total')}
      </Typography>

      {actions.length === 0 && (
        <div className={styles.single}>
          <Typography variant={VARIANT.body} size={SIZE.m}>
            {formatPeriod(period)}
          </Typography>
        </div>
      )}

      {actions.length > 0 && (
        <ButtonDropdown
          size='s'
          label={formatPeriod(period)}
          items={actions}
          closeDroplistOnItemClick
          layoutType={layoutType}
          data-test-id={TEST_IDS.periodDropdown}
        />
      )}
    </div>
  );
}
