import { Spinner } from '@ds/loader';
import { extractSupportProps } from '@ds/utils';
import { useId, useMemo } from 'react';

import styles from '../../components/Modal/styles.module.scss';
import { ModalProps } from '../../components/Modal/types';
import { ModalCustom } from '../../components/ModalCustom';
import { MODE, TEST_IDS, WIDTH } from '../../constants';
import slotStyles from '../styles.module.scss';

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
  // `footer` в приоритете над кнопками-слотами; слоты раскладывает сам `ModalCustom.Footer`.
  const hasActions = Boolean(approveButton || cancelButton || additionalButton);
  const hasFooter = (footer != null || hasActions) && !loading;
  const footerActionProps =
    footer != null ? {} : { approveButton, cancelButton, additionalButton, footerActionsOrientation };
  const hasTitle = Boolean(title);
  const supportProps = extractSupportProps(rest);

  const headerProps = {
    title,
    titleId: hasTitle ? titleId : undefined,
    subtitle,
    truncate,
    slotAfterTitle,
    onBackButtonClick,
    testIds: {
      header: TEST_IDS.header,
      title: TEST_IDS.title,
      subtitle: TEST_IDS.subtitle,
      slotAfterTitle: TEST_IDS.slotAfterTitle,
      backButton: TEST_IDS.backButton,
    },
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

      <ModalCustom.Header {...headerProps} />

      <ModalCustom.Body content={bodyContent} />

      {/* Без футера нижнюю safe-area рисовать некому — слот её и несёт. */}
      {!hasFooter && <div className={slotStyles.safeAreaBottom} />}

      {hasFooter && (
        <ModalCustom.Footer data-test-id={TEST_IDS.footer} {...footerActionProps}>
          {footer}
        </ModalCustom.Footer>
      )}
    </ModalCustom>
  );
}
