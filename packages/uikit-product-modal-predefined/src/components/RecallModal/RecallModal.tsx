import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ModalCustom, WIDTH } from '@ds/modal';
import { useRef } from 'react';

import { TEST_IDS } from '../../constants';
import { InputConfirm } from '../../helperComponents';
import { useTextFieldValidation } from '../../hooks';
import { modalPredefinedLocale } from '../../locale';
import { RecallModalProps } from '../../types';
import styles from './styles.module.scss';

export function RecallModal({
  open,
  onClose,
  mode,
  closeOnPopstate,
  titleTooltip,
  onRecall,
  loading,
  description,
  confirmable = false,
  confirmText,
  hideConfirmCopyButton,
  subtitle,
  ...rest
}: RecallModalProps) {
  const { t } = modalPredefinedLocale.useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);
  const { value, error, handleChange, reset, validate } = useTextFieldValidation({
    target: confirmable ? confirmText : undefined,
    errorText: t('confirm.error'),
  });
  const shouldShowConfirm = Boolean(confirmable && confirmText);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleApproveClick = () => {
    if (!validate()) {
      inputRef.current?.focus();
      return;
    }

    onRecall(handleClose);
  };

  return (
    <ModalCustom
      open={open}
      onClose={handleClose}
      mode={mode}
      closeOnPopstate={closeOnPopstate}
      width={WIDTH.S}
      data-test-id={TEST_IDS.recallModal}
      data-confirmable={confirmable || undefined}
      {...rest}
    >
      <div className={styles.safeAreaTop} />
      <ModalCustom.Header title={t('recallModal.title')} subtitle={subtitle} slotAfterHeadline={titleTooltip} />
      <ModalCustom.Body
        className={styles.body}
        content={
          <div className={styles.content}>
            {description ?? t('recallModal.description')}
            {shouldShowConfirm && (
              <InputConfirm
                ref={inputRef}
                confirmText={confirmText ?? ''}
                confirmLabel={t('recallModal.confirmLabel')}
                hideConfirmCopyButton={hideConfirmCopyButton}
                value={value}
                error={error}
                size='l'
                copyLineAlign='start'
                placeholder={t('confirm.namePlaceholder')}
                onChange={handleChange}
              />
            )}
          </div>
        }
      />
      <div className={styles.safeAreaBottom} />
      <ModalCustom.Footer>
        <div className={styles.footer}>
          <Button
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            label={t('recallModal.cancel')}
            onClick={handleClose}
            data-test-id={TEST_IDS.cancelButton}
          />
          <Button
            view={VIEW.Filled}
            appearance={APPEARANCE.Critical}
            label={t('recallModal.approve')}
            loading={loading}
            onClick={handleApproveClick}
            data-test-id={TEST_IDS.approveButton}
          />
        </div>
      </ModalCustom.Footer>
    </ModalCustom>
  );
}
