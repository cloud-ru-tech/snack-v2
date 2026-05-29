import { Button, ButtonProps } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';
import { useLocale } from '@ds/locale';
import { WithSupportProps } from '@ds/utils';
import { useState } from 'react';

import { TEST_IDS } from '../../constants';
import { QuotaCardsGrid } from '../../helperComponents/QuotaCardsGrid';
import { QuotaWidgetPropsBase } from '../../types';
import { checkIsExceeded } from '../../utils';
import { ProjectHeader } from './components/ProjectHeader';
import styles from './styles.module.scss';

export type QuotaWidgetProps = WithSupportProps<
  QuotaWidgetPropsBase & {
    /** Ссылка на страницу квот по проекту */
    quotasUrl: string;
    /** Колбек клика по ссылке на страницу квот по проекту */
    onQuotasUrlClick?: () => void;
    /** Свойства кнопки открытия виджета */
    buttonProps?: Pick<ButtonProps, 'size' | 'className' | 'fullWidth' | 'label' | 'appearance' | 'disabled'>;
  }
>;

export function QuotaWidget({
  quotas,
  disableSorting,
  isLoading,
  isError,
  onRefresh,
  projectName,
  quotasUrl,
  canEditQuota,
  hideIncreaseQuotaButton,
  onIncreaseQuotaClick,
  onWidgetOpen,
  onQuotasUrlClick,
  buttonProps,
  ...props
}: QuotaWidgetProps) {
  const { t } = useLocale('Quota');
  const [isOpen, setIsOpen] = useState(false);
  const rootTestId = props['data-test-id'];
  const useMatrixTestIds = Boolean(rootTestId && rootTestId !== TEST_IDS.quotaWidget.root);
  const contentTestId = useMatrixTestIds && rootTestId ? `content-${rootTestId}` : TEST_IDS.quotaWidget.content;
  const triggerTestId = useMatrixTestIds && rootTestId ? `trigger-${rootTestId}` : TEST_IDS.quotaWidget.trigger;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      onWidgetOpen?.();
    }
  };

  const exhaustedCount = quotas.filter(checkIsExceeded).length;

  return (
    <Dropdown
      {...props}
      placement='bottom-end'
      open={isOpen}
      onOpenChange={handleOpenChange}
      content={
        <div className={styles.content} data-test-id={contentTestId}>
          <ProjectHeader
            projectName={projectName}
            quotasUrl={quotasUrl}
            canEditQuota={canEditQuota}
            isError={isError}
            onIncreaseQuotaClick={onIncreaseQuotaClick}
            hideIncreaseQuotaButton={hideIncreaseQuotaButton}
            onQuotasUrlClick={onQuotasUrlClick}
          />

          <QuotaCardsGrid
            quotas={quotas}
            disableSorting={disableSorting}
            isLoading={isLoading}
            isError={isError}
            onRefresh={onRefresh}
          />
        </div>
      }
    >
      <Button
        view='function'
        label={t('quotas')}
        appearance='neutral'
        iconPosition='after'
        icon={isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
        counter={exhaustedCount > 0 ? { value: exhaustedCount } : undefined}
        size='m'
        data-test-id={triggerTestId}
        {...buttonProps}
      />
    </Dropdown>
  );
}
