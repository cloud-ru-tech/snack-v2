import { buildFooterActions } from '@ds/bottom-sheet';
import { Spinner } from '@ds/loader';
import { extractSupportProps } from '@ds/utils';
import { useId, useMemo } from 'react';

import styles from '../../components/Modal/styles.module.scss';
import { ModalProps } from '../../components/Modal/types';
import { ModalCustom } from '../../components/ModalCustom';
import { MODE, TEST_IDS, WIDTH } from '../../constants';

/** Desktop-поверхность Modal'а: `ModalCustom` с пресетной разметкой. Internal. */
export function DesktopModal({
  open = false,
  onClose,
  mode = MODE.Regular,
  title,
  truncate,
  slotAfterTitle,
  subtitle,
  content,
  loading = false,
  loadingState,
  media,
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation,
  disclaimer,
  footer,
  className,
  rootClassName,
  width = WIDTH.S,
  heightAuto = true,
  onBackButtonClick,
  container,
  closeOnPopstate,
  ...rest
}: ModalProps) {
  const titleId = useId();
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
  const hasFooter = footerContent != null && !loading;
  const hasTitle = Boolean(title);
  const supportProps = extractSupportProps(rest);

  const headerProps = {
    title,
    titleId: hasTitle ? titleId : undefined,
    subtitle,
    truncate,
    slotAfterTitle,
    onBackButtonClick,
    'data-test-id': TEST_IDS.header,
  };

  const bodyContent = useMemo(() => {
    if (loading) {
      if (loadingState) {
        return loadingState;
      }

      return (
        <div className={styles.loaderWrapper}>
          <Spinner size='m' data-test-id={TEST_IDS.loadingSpinner} />
        </div>
      );
    }

    return content;
  }, [content, loading, loadingState]);

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      mode={mode}
      className={className}
      rootClassName={rootClassName}
      width={width}
      heightAuto={heightAuto}
      container={container}
      closeOnPopstate={closeOnPopstate}
      aria-labelledby={hasTitle ? titleId : undefined}
      {...supportProps}
    >
      {media}

      <div className={styles.safeAreaTop} />

      <ModalCustom.Header {...headerProps} />

      <ModalCustom.Body content={bodyContent} />

      <div className={styles.safeAreaBottom} />

      {hasFooter && <ModalCustom.Footer data-test-id={TEST_IDS.footer}>{footerContent}</ModalCustom.Footer>}
    </ModalCustom>
  );
}
