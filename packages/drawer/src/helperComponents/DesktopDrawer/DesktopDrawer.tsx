import { buildFooterActions } from '@ds/bottom-sheet';
import cn from 'classnames';

import { NESTED_DRAWER_PUSH_DISTANCE } from '../../components/Drawer/constants';
import styles from '../../components/Drawer/styles.module.scss';
import { DrawerProps } from '../../components/Drawer/types';
import { DrawerCustom } from '../../components/DrawerCustom';
import { TEST_IDS } from '../../constants';

/** Desktop-поверхность Drawer'а: панель (`DrawerCustom`) с пресетной разметкой. Internal. */
export function DesktopDrawer({
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
  disclaimer,
  footer,
  nestedDrawer,
  className,
  ...rest
}: DrawerProps) {
  const showHeader = Boolean(title || subtitle || slotAfterTitle);
  // Футер: произвольный `footer` (приоритет) либо сборка из слотов через общий `buildFooterActions`.
  const footerContent =
    footer ??
    buildFooterActions({
      approveButton,
      cancelButton,
      additionalButton,
      footerActionsOrientation,
      disclaimer,
      testIds: {
        approve: TEST_IDS.footerApprove,
        cancel: TEST_IDS.footerCancel,
        additional: TEST_IDS.footerAdditional,
        disclaimer: TEST_IDS.footerDisclaimer,
      },
      disclaimerClassName: styles.disclaimer,
      actionsClassName: styles.footerActions,
      align: 'end',
    });

  return (
    <DrawerCustom
      {...rest}
      resizable={undefined}
      className={cn(styles.drawer, className)}
      push={Boolean(nestedDrawer) && { distance: NESTED_DRAWER_PUSH_DISTANCE }}
    >
      {media}

      <div className={styles.safeAreaTop} />

      {showHeader && (
        <DrawerCustom.Header
          title={title}
          slotAfterTitle={slotAfterTitle}
          subtitle={subtitle}
          onBackButtonClick={onBackButtonClick}
          data-test-id={TEST_IDS.header}
        />
      )}

      <DrawerCustom.Body data-test-id={TEST_IDS.body} content={content} />

      <div className={styles.safeAreaBottom} />

      {footerContent != null && (
        <DrawerCustom.Footer data-test-id={TEST_IDS.footer}>{footerContent}</DrawerCustom.Footer>
      )}

      {nestedDrawer}
    </DrawerCustom>
  );
}
