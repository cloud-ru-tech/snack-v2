import { FieldCombo, FieldComboProps, VALIDATION_STATE } from '@ds/fields';
import { TruncateString } from '@ds/truncate-string';
import { CopyButton } from '@ds/uikit-product-copy';
import { WithSupportProps } from '@ds/utils';
import { forwardRef } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type InputConfirmProps = WithSupportProps<{
  /** Текст, который нужно ввести для подтверждения */
  confirmText: string;
  /** Инструкция над текстом подтверждения */
  confirmLabel?: string;
  /** Скрыть кнопку копирования */
  hideConfirmCopyButton?: boolean;
  /** Значение поля */
  value: string;
  /** Текст ошибки */
  error?: string;
  /** Label поля */
  label?: string;
  /** Размер поля */
  size?: FieldComboProps['size'];
  /** Выравнивание copy-line */
  copyLineAlign?: 'start' | 'space-between';
  /** Placeholder поля */
  placeholder: string;
  /** Колбэк изменения значения */
  onChange(value: string): void;
}>;

export const InputConfirm = forwardRef<HTMLInputElement, InputConfirmProps>(function InputConfirm(
  {
    confirmText,
    confirmLabel,
    hideConfirmCopyButton,
    value,
    error,
    label,
    size = 'm',
    copyLineAlign = 'space-between',
    placeholder,
    onChange,
    ...rest
  },
  ref,
) {
  return (
    <div className={styles.root}>
      {confirmLabel && <span className={styles.confirmLabel}>{confirmLabel}</span>}
      <div className={styles.confirmText} data-align={copyLineAlign}>
        <TruncateString className={styles.confirmValue} variant='middle' text={confirmText} />
        {!hideConfirmCopyButton && <CopyButton valueToCopy={confirmText} data-test-id={TEST_IDS.confirmCopyButton} />}
      </div>

      <FieldCombo
        {...rest}
        ref={ref}
        inputMode='text'
        label={label}
        required={Boolean(label)}
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hint={error}
        validationState={error ? VALIDATION_STATE.Error : VALIDATION_STATE.Default}
        data-test-id={TEST_IDS.confirmInput}
      />
    </div>
  );
});
