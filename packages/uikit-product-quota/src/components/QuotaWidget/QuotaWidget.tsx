import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button, ButtonProps } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { WithSupportProps } from '@ds/utils';
import { useState } from 'react';

import { TEST_IDS } from '../../constants';
import { quotaLocale } from '../../locale';
import { QuotaWidgetPropsBase } from '../../types';
import { checkIsExceeded } from '../../utils';
import { QuotaIncreaseButton } from './QuotaIncreaseButton';
import { QuotaMobileHeader } from './QuotaMobileHeader';
import { QuotaWidgetContent } from './QuotaWidgetContent';

export type QuotaWidgetProps = WithSupportProps<
  QuotaWidgetPropsBase & {
    /** Ссылка на страницу квот по проекту */
    quotasUrl: string;
    /** Колбек клика по ссылке на страницу квот по проекту */
    onQuotasUrlClick?: () => void;
    /** Свойства кнопки открытия виджета */
    buttonProps?: Pick<ButtonProps, 'size' | 'className' | 'fullWidth' | 'label' | 'appearance' | 'disabled' | 'view'>;
  }
>;

export function QuotaWidget({
  quotas,
  disableSorting,
  loading,
  error,
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
  const { t } = quotaLocale.useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const rootTestId = props['data-test-id'] as string | undefined;
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

  // На мобилке лист full-height (snap `1`): шапку и кнопку выносим в pinned-слоты BottomSheet
  // (`title` сверху, `footer` снизу), а карточки скроллятся в теле листа — как в макете.
  const showMobileIncreaseButton = isMobile && canEditQuota && !error && !hideIncreaseQuotaButton;

  return (
    <Dropdown
      {...props}
      placement='bottom-end'
      // Mobile: лист на всю высоту экрана (число `1` = full-height snap; safe-area даёт сам BottomSheet).
      snapPoints={[1]}
      title={isMobile ? <QuotaMobileHeader projectName={projectName} /> : undefined}
      footer={showMobileIncreaseButton ? <QuotaIncreaseButton onClick={onIncreaseQuotaClick} /> : undefined}
      open={isOpen}
      onOpenChange={handleOpenChange}
      content={
        <QuotaWidgetContent
          quotas={quotas}
          disableSorting={disableSorting}
          loading={loading}
          error={error}
          onRefresh={onRefresh}
          projectName={projectName}
          quotasUrl={quotasUrl}
          canEditQuota={canEditQuota}
          hideIncreaseQuotaButton={hideIncreaseQuotaButton}
          onIncreaseQuotaClick={onIncreaseQuotaClick}
          onQuotasUrlClick={onQuotasUrlClick}
          hideMobileHeader={isMobile}
          hideMobileIncreaseButton={isMobile}
          data-test-id={contentTestId}
        />
      }
    >
      <Button
        // На мобилке триггер бордюрный (`outline` — как в макете кнопки квот),
        // на desktop — плоский `function`. Переопределяется через `buttonProps.view`.
        view={isMobile ? 'outline' : 'function'}
        label={t('quotas')}
        appearance='neutral'
        iconPosition='after'
        icon={isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
        counter={exhaustedCount > 0 ? { value: exhaustedCount, appearance: 'red' } : undefined}
        size='m'
        data-test-id={triggerTestId}
        {...buttonProps}
      />
    </Dropdown>
  );
}
