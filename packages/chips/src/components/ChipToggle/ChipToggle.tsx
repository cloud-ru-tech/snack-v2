import { Sun } from '@ds/loader';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ChangeEvent, ChangeEventHandler } from 'react';

import { CHIP_TOGGLE_TEST_IDS, SIZE, SPINNER_SIZE_MAP } from '../../constants';
import { BaseChipProps, Size } from '../../types';
import styles from './styles.module.scss';

export type ChipToggleProps = WithSupportProps<
  BaseChipProps & {
    /** Отмечен ли компонент */
    checked: boolean;
    /** Размер */
    size?: Size;
    /** Колбек смены значения */
    onChange(checked: boolean, e: ChangeEvent<HTMLInputElement>): void;
  }
>;

/** Чип с состоянием выбран/не выбран */
export function ChipToggle({
  icon,
  size = SIZE.M,
  label,
  checked,
  disabled,
  loading,
  onChange,
  className,
  tabIndex = 0,
  truncateVariant = 'middle',
  ...rest
}: ChipToggleProps) {
  const spinnerSize = SPINNER_SIZE_MAP[size];

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (disabled || loading) {
      return;
    }

    onChange?.(!checked, e);
  };

  return (
    <label
      {...extractSupportProps(rest)}
      data-size={size}
      data-loading={loading || undefined}
      data-disabled={(!loading && disabled) || undefined}
      data-icon={Boolean(icon) || undefined}
      data-checked={checked || undefined}
      className={cn(styles.toggleChip, className)}
    >
      <input
        data-test-id={CHIP_TOGGLE_TEST_IDS.input}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        disabled={!loading && disabled}
        tabIndex={disabled ? -1 : tabIndex}
        className={styles.toggleChipInput}
      />
      <span
        className={styles.stateLayer}
        aria-hidden
        data-state={checked && !disabled ? 'activatedFilled' : 'regularFilled'}
      />

      <span className={styles.toggleChipContent} data-size={size}>
        {icon && !loading && (
          <span className={styles.icon} data-test-id={CHIP_TOGGLE_TEST_IDS.icon}>
            {icon}
          </span>
        )}

        {loading && (
          <span className={styles.spinner} data-test-id={CHIP_TOGGLE_TEST_IDS.spinner}>
            <Sun size={spinnerSize} />
          </span>
        )}

        <span className={styles.label} data-test-id={CHIP_TOGGLE_TEST_IDS.label}>
          <TruncateString text={label} variant={truncateVariant} />
        </span>
      </span>
    </label>
  );
}
