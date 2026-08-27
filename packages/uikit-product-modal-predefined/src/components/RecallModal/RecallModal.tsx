import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ModalCustom, WIDTH } from '@ds/modal';
import { QuestionTooltip } from '@ds/tooltip';
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
  content,
  confirmText,
  hideConfirmCopyButton,
  subtitle,
  ...rest
}: RecallModalProps) {
  const { t } = modalPredefinedLocale.useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);
  const { value, error, handleChange, reset, validate } = useTextFieldValidation({
    target: confirmText,
    errorText: t('confirm.error'),
  });
  const shouldShowConfirm = Boolean(confirmText);

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
      {...rest}
    >
      <ModalCustom.Header
        title={t('recallModal.title')}
        subtitle={subtitle}
        slotAfterTitle={titleTooltip ? <QuestionTooltip size='s' tip={titleTooltip} /> : undefined}
      />
      <ModalCustom.Body
        className={styles.body}
        content={
          <div className={styles.content}>
            {content ?? t('recallModal.content')}
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
