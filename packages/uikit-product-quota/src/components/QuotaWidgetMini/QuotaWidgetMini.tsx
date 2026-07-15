import { Accordion } from '@ds/accordion';
import { Button } from '@ds/button';
import { Counter } from '@ds/counter';
import { TruncateString } from '@ds/truncate-string';
import { WithSupportProps } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { QuotaCardsGrid } from '../../helperComponents/QuotaCardsGrid';
import { quotaLocale } from '../../locale';
import { QuotaWidgetPropsBase } from '../../types';
import { checkIsExceeded } from '../../utils';
import styles from './styles.module.scss';

export type QuotaWidgetMiniProps = WithSupportProps<
  QuotaWidgetPropsBase & {
    /** Флаг раскрытия аккордиона по умолчанию */
    isExpandedDefault?: boolean;
  }
>;

const ACCORDION_ID = 'quotas-widget-accordion';

export function QuotaWidgetMini({
  quotas,
  disableSorting,
  loading,
  isError,
  onRefresh,
  projectName,
  canEditQuota,
  isExpandedDefault,
  hideIncreaseQuotaButton,
  onIncreaseQuotaClick,
  onWidgetOpen,
  'data-test-id': dataTestId,
  ...props
}: QuotaWidgetMiniProps) {
  const { t } = quotaLocale.useTranslations();

  const exhaustedCount = quotas.filter(checkIsExceeded).length;

  const handleExpandedChange = (expanded: string | undefined) => {
    if (expanded) {
      onWidgetOpen?.();
    }
  };

  return (
    <div data-test-id={dataTestId ?? TEST_IDS.quotaWidgetMini.root}>
      <Accordion
        {...props}
        expandedDefault={isExpandedDefault ? ACCORDION_ID : undefined}
        onExpandedChange={handleExpandedChange}
      >
        <Accordion.CollapseBlockSecondary
          id={ACCORDION_ID}
          className={styles.collapse}
          data-test-id={TEST_IDS.quotaWidgetMini.trigger}
          title={t('quotas')}
          afterTitle={
            !isError && !loading && exhaustedCount > 0 ? (
              <Counter value={exhaustedCount} size='xs' appearance='red' />
            ) : undefined
          }
          subTitle={<TruncateString maxLines={1} text={projectName} />}
        >
          <div className={styles.body} data-test-id={TEST_IDS.quotaWidgetMini.content}>
            <QuotaCardsGrid
              isAccordion
              quotas={quotas}
              disableSorting={disableSorting}
              loading={loading}
              isError={isError}
              onRefresh={onRefresh}
            />

            {!isError && canEditQuota && !hideIncreaseQuotaButton && (
              <Button
                className={styles.button}
                fullWidth
                view='outline'
                appearance='neutral'
                label={t('increaseQuota')}
                size='m'
                onClick={onIncreaseQuotaClick}
              />
            )}
          </div>
        </Accordion.CollapseBlockSecondary>
      </Accordion>
    </div>
  );
}
