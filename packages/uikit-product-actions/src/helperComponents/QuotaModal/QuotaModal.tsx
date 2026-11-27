import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { Button } from '@ds/button';
import { ModalCustom } from '@ds/modal';
import { quotaLocale, QuotaWidgetContent } from '@ds/uikit-product-quota';

import { TEST_IDS } from '../../constants';
import { ButtonQuotaProps } from '../ButtonQuota';

// В диалоге используем компактную раскладку без фиксированной ширины desktop-popover.
// Платформа токенов наследуется от внешнего провайдера.
const CompactQuotaContent = withLayoutType(QuotaWidgetContent, LAYOUT_TYPE.Mobile);

type QuotaModalProps = {
  quota: ButtonQuotaProps;
  onClose(): void;
};

export function QuotaModal({ quota, onClose }: QuotaModalProps) {
  const { t } = quotaLocale.useTranslations();

  return (
    <ModalCustom open onClose={onClose} data-test-id={TEST_IDS.quotaModal}>
      <ModalCustom.Header title={t('quotas')} subtitle={quota.projectName} />
      <ModalCustom.Body
        content={
          <CompactQuotaContent
            quotas={quota.quotas}
            quotasUrl={quota.quotasUrl}
            projectName={quota.projectName}
            loading={quota.loading}
            error={quota.error}
            onRefresh={quota.onRefresh}
            canEditQuota={quota.canEditQuota}
            onIncreaseQuotaClick={quota.onIncreaseQuotaClick}
            onQuotasUrlClick={quota.onQuotasUrlClick}
            disableSorting={quota.disableSorting}
            skeletonRowCount={quota.skeletonRowCount}
            hideMobileHeader
          />
        }
      />
      <ModalCustom.Footer>
        <Button
          as='a'
          href={quota.quotasUrl}
          target='_blank'
          onClick={quota.onQuotasUrlClick}
          label={t('widgetTitle.withoutProject')}
          view='simple'
          appearance='neutral'
          data-test-id={TEST_IDS.quotaLink}
        />
      </ModalCustom.Footer>
    </ModalCustom>
  );
}
