import { BottomSheet } from '@ds/bottom-sheet';
import { Spinner } from '@ds/loader';
import { extractSupportProps } from '@ds/utils';

import styles from '../../components/Modal/styles.module.scss';
import { ModalProps } from '../../components/Modal/types';
import { TEST_IDS } from '../../constants';

/**
 * Mobile-поверхность Modal'а: контент в `BottomSheet`, слоты маппятся на API sheet'а
 * (пропы 1:1). Internal. Desktop-only пропы уходят в `...rest`.
 */
export function MobileModal({
  open = false,
  onClose,
  title,
  subtitle,
  slotAfterTitle,
  onBackButtonClick,
  content,
  media,
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation,
  disclaimer,
  footer,
  loading = false,
  loadingState,
  className,
  rootClassName,
  container,
  closeOnPopstate,
  ...rest
}: ModalProps) {
  let bodyContent = content;
  if (loading) {
    bodyContent = loadingState ?? (
      <div className={styles.loaderWrapper}>
        <Spinner size='m' data-test-id={TEST_IDS.loadingSpinner} />
      </div>
    );
  }

  // Футер собирает сам `BottomSheet`; при `loading` его скрываем (как на desktop).
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      slotAfterTitle={slotAfterTitle}
      onBackButtonClick={onBackButtonClick}
      media={media}
      content={bodyContent}
      approveButton={loading ? undefined : approveButton}
      cancelButton={loading ? undefined : cancelButton}
      additionalButton={loading ? undefined : additionalButton}
      footerActionsOrientation={footerActionsOrientation}
      disclaimer={loading ? undefined : disclaimer}
      footer={loading ? undefined : footer}
      // Те же id футера, что у desktop-поверхности — стабильный селектор при свапе surface.
      footerTestIds={{
        approve: TEST_IDS.footerApprove,
        cancel: TEST_IDS.footerCancel,
        additional: TEST_IDS.footerAdditional,
        disclaimer: TEST_IDS.footerDisclaimer,
      }}
      className={className}
      rootClassName={rootClassName}
      container={container}
      closeOnPopstate={closeOnPopstate}
      {...extractSupportProps(rest)}
    />
  );
}
