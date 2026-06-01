import { Sun } from '@ds/loader';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { CHIP_ASSIST_TEST_IDS, SIZE, SPINNER_SIZE_MAP } from '../../constants';
import { BaseChipProps, Size } from '../../types';
import styles from './styles.module.scss';

export type ChipAssistProps = WithSupportProps<
  BaseChipProps & {
    /** Размер */
    size?: Size;
    /** Колбек обработки клика */
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
>;

/** Чип с лейблом */
export function ChipAssist({
  icon,
  size = SIZE.S,
  label,
  disabled,
  loading,
  onClick,
  className,
  tabIndex,
  truncateVariant = 'middle',
  ...rest
}: ChipAssistProps) {
  const spinnerSize = SPINNER_SIZE_MAP[size];

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (disabled || loading) {
      return;
    }

    onClick?.(e);
  };

  return (
    <button
      type='button'
      {...extractSupportProps(rest)}
      tabIndex={tabIndex}
      data-size={size}
      data-loading={loading || undefined}
      data-icon={Boolean(icon) || undefined}
      data-disabled={(!loading && disabled) || undefined}
      data-acrylic-appearance='neutral'
      data-acrylic-level='1Level'
      disabled={!loading && disabled}
      onClick={handleClick}
      className={cn(styles.assistChip, className)}
    >
      <span className={styles.stateLayer} aria-hidden data-state='regularFilled' />

      {icon && !loading && (
        <span className={styles.icon} data-test-id={CHIP_ASSIST_TEST_IDS.icon}>
          {icon}
        </span>
      )}

      {loading && (
        <span className={styles.spinner} data-test-id={CHIP_ASSIST_TEST_IDS.spinner}>
          <Sun size={spinnerSize} />
        </span>
      )}

      <span className={styles.label} data-test-id={CHIP_ASSIST_TEST_IDS.label}>
        <TruncateString text={label} variant={truncateVariant} />
      </span>
    </button>
  );
}
