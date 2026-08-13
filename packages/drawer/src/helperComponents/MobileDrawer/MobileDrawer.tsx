import { BottomSheet } from '@ds/bottom-sheet';
import { extractSupportProps } from '@ds/utils';

import { DrawerProps } from '../../components/Drawer/types';
import { TEST_IDS } from '../../constants';

/**
 * Mobile-поверхность Drawer'а: контент в `BottomSheet`, слоты маппятся на API sheet'а
 * (`subtitle` 1:1, `showBlackout→showBackdrop`, остальное 1:1). Internal. Desktop-only пропы
 * уходят в `...rest`.
 */
export function MobileDrawer({
  content,
  media,
  title,
  slotAfterTitle,
  subtitle,
  onBackButtonClick,
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation,
  footer,
  className,
  rootClassName,
  open,
  onClose,
  showBlackout,
  container,
  closeOnPopstate,
  swipeEnabled,
  snapPoints,
  snapIndex,
  onSnapIndexChange,
  safeArea,
  ...rest
}: DrawerProps) {
  // Футер собирает сам `BottomSheet`.
  return (
    <BottomSheet
      // Дефолт `withDividers` сменился на `true` — здесь вид сохраняем прежним.
      withDividers={false}
      open={open}
      onClose={onClose}
      showBackdrop={showBlackout}
      title={title}
      subtitle={subtitle}
      slotAfterTitle={slotAfterTitle}
      onBackButtonClick={onBackButtonClick}
      media={media}
      content={content}
      approveButton={approveButton}
      cancelButton={cancelButton}
      additionalButton={additionalButton}
      footerActionsOrientation={footerActionsOrientation}
      footer={footer}
      // Те же id футера, что у desktop-поверхности — стабильный селектор при свапе surface.
      footerTestIds={{
        approve: TEST_IDS.footerApprove,
        cancel: TEST_IDS.footerCancel,
        additional: TEST_IDS.footerAdditional,
      }}
      className={className}
      rootClassName={rootClassName}
      container={container}
      closeOnPopstate={closeOnPopstate}
      swipeEnabled={swipeEnabled}
      snapPoints={snapPoints}
      snapIndex={snapIndex}
      onSnapIndexChange={onSnapIndexChange}
      safeArea={safeArea}
      {...extractSupportProps(rest)}
    />
  );
}
