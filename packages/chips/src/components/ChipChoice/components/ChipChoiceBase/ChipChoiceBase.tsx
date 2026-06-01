import { Sun } from '@ds/loader';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { forwardRef, KeyboardEvent, KeyboardEventHandler, MouseEventHandler, ReactNode, useRef, useState } from 'react';

import { CHIP_CHOICE_TEST_IDS, SIZE, SPINNER_SIZE_MAP } from '../../../../constants';
import { ButtonClearValue } from '../../../../helperComponents';
import { BUTTON_CLEAR_VALUE_SIZE_MAP } from '../../constants';
import { ChipChoiceCommonProps } from '../../types';
import styles from './styles.module.scss';

export type ChipChoiceBaseProps = Pick<
  ChipChoiceCommonProps,
  | 'loading'
  | 'tabIndex'
  | 'onClearButtonClick'
  | 'disabled'
  | 'icon'
  | 'label'
  | 'size'
  | 'onClick'
  | 'className'
  | 'truncateVariant'
> & {
  /** Отображаемое значение */
  valueToRender?: ReactNode;
  /** Фактическое значение. Используется для отображения кнопки очистки */
  value?: unknown;
  /** Колбек обработки нажатия клавиш */
  onKeyDown?(e: KeyboardEvent<HTMLDivElement>): void;
};

export const ChipChoiceBase = forwardRef<HTMLDivElement, ChipChoiceBaseProps>(
  (
    {
      size = SIZE.S,
      disabled,
      loading,
      icon,
      label,
      valueToRender,
      value,
      onClick,
      className,
      tabIndex = 0,
      onClearButtonClick,
      onKeyDown,
      truncateVariant = 'middle',
      ...rest
    },
    ref,
  ) => {
    const spinnerSize = SPINNER_SIZE_MAP[size];

    const localRef = useRef<HTMLDivElement>(null);

    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const showClearButton = Boolean(onClearButtonClick && (Array.isArray(value) ? value.length : value));

    const [isDroplistOpened, setIsDroplistOpened] = useState(false);

    const handleChipClick: MouseEventHandler<HTMLDivElement> = e => {
      if (loading || disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      onClick?.(e);

      !isDroplistOpened && setIsDroplistOpened(true);
    };

    const handleChipKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      if (loading || disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      onKeyDown?.(e);

      if (e.key === 'ArrowRight') {
        clearButtonRef.current?.focus();
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const handleClearButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
      onClearButtonClick?.(e);
    };

    const handleClearButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
      switch (e.key) {
        case 'ArrowLeft': {
          localRef.current?.focus();

          return;
        }
        case 'Enter':
        case ' ': {
          e.stopPropagation();
          return;
        }
        default:
          break;
      }
    };

    return (
      <div
        {...extractSupportProps(rest)}
        role='button'
        ref={mergeRefs(localRef, ref)}
        className={cn(styles.choiceChip, className)}
        data-size={size}
        data-icon={Boolean(icon) || undefined}
        data-loading={loading || undefined}
        data-disabled={(!loading && disabled) || undefined}
        data-acrylic-appearance='neutral'
        data-acrylic-level='1Level'
        onClick={handleChipClick}
        onKeyDown={handleChipKeyDown}
        tabIndex={loading || disabled ? -1 : tabIndex}
      >
        <span className={styles.stateLayer} aria-hidden data-state='regularFilled' />

        {icon && (
          <span className={styles.icon} data-test-id={CHIP_CHOICE_TEST_IDS.icon}>
            {icon}
          </span>
        )}

        <span className={styles.labelLayout}>
          {label && (
            <span className={styles.label} data-test-id={CHIP_CHOICE_TEST_IDS.label}>
              {label + ': '}
            </span>
          )}

          {loading ? (
            <span className={styles.spinner} data-test-id={CHIP_CHOICE_TEST_IDS.spinner}>
              <Sun size={spinnerSize} />
            </span>
          ) : (
            <span className={styles.value} data-test-id={CHIP_CHOICE_TEST_IDS.value}>
              <TruncateString text={String(valueToRender ?? value ?? '')} variant={truncateVariant} />
            </span>
          )}
        </span>

        {!disabled && !loading && showClearButton && (
          <ButtonClearValue
            size={BUTTON_CLEAR_VALUE_SIZE_MAP[size]}
            onClick={handleClearButtonClick}
            data-test-id={CHIP_CHOICE_TEST_IDS.clearButton}
            onKeyDown={handleClearButtonKeyDown}
            ref={clearButtonRef}
          />
        )}
      </div>
    );
  },
);
