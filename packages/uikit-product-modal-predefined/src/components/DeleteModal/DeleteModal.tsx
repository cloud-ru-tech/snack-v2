import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ModalCustom, WIDTH } from '@ds/modal';
import { QuestionTooltip } from '@ds/tooltip';
import { useRef } from 'react';

import { CONFIRM_TEXT_VARIANT, TEST_IDS } from '../../constants';
import { InputConfirm } from '../../helperComponents';
import { useTextFieldValidation } from '../../hooks';
import { modalPredefinedLocale } from '../../locale';
import { DeleteModalProps } from '../../types';
import styles from './styles.module.scss';

export function DeleteModal({
  open,
  onClose,
  mode,
  closeOnPopstate,
  objectType,
  titleTooltip,
  onDelete,
  deleting,
  description,
  confirmable = false,
  confirmText,
  hideConfirmCopyButton,
  subtitle,
  confirmTextVariant = CONFIRM_TEXT_VARIANT.Name,
  ...rest
}: DeleteModalProps) {
  const { t } = modalPredefinedLocale.useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);
  const { value, error, handleChange, reset, validate } = useTextFieldValidation({
    target: confirmable ? confirmText : undefined,
    errorText: t('confirm.error'),
  });
  const shouldShowConfirm = Boolean(confirmable && confirmText);
  const title = objectType ? t('deleteModal.title', { objectType }) : t('deleteModal.fallbackTitle');
  const confirmPlaceholder =
    confirmTextVariant === CONFIRM_TEXT_VARIANT.Text ? t('confirm.textPlaceholder') : t('confirm.namePlaceholder');

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleApproveClick = () => {
    if (!validate()) {
      inputRef.current?.focus();
      return;
    }

    onDelete(handleClose);
  };

  return (
    <ModalCustom
      open={open}
      onClose={handleClose}
      mode={mode}
      closeOnPopstate={closeOnPopstate}
      width={WIDTH.S}
      data-test-id={TEST_IDS.deleteModal}
      data-confirmable={confirmable || undefined}
      {...rest}
    >
      <div className={styles.safeAreaTop} />
      <ModalCustom.Header
        title={title}
        subtitle={subtitle}
        slotAfterHeadline={titleTooltip ? <QuestionTooltip size='s' tip={titleTooltip} /> : undefined}
      />
      <ModalCustom.Body
        className={styles.body}
        content={
          <div className={styles.content}>
            {description ?? t('deleteModal.description')}
            {shouldShowConfirm && (
              <InputConfirm
                ref={inputRef}
                confirmText={confirmText ?? ''}
                hideConfirmCopyButton={hideConfirmCopyButton}
                value={value}
                error={error}
                size='l'
                copyLineAlign='start'
                confirmLabel={t('deleteModal.confirmLabel')}
                placeholder={confirmPlaceholder}
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
            label={t('deleteModal.cancel')}
            onClick={handleClose}
            data-test-id={TEST_IDS.cancelButton}
          />
          <Button
            view={VIEW.Filled}
            appearance={APPEARANCE.Critical}
            label={t('deleteModal.approve')}
            loading={deleting}
            onClick={handleApproveClick}
            data-test-id={TEST_IDS.approveButton}
          />
        </div>
      </ModalCustom.Footer>
    </ModalCustom>
  );
}
