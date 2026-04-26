import { useLayoutEffect } from '@ds/utils';
import cn from 'classnames';
import { useRef } from 'react';

import { AUTOFOCUS, RANGE_POSITION } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { Cell, Size } from '../../types';
import { stringifyAddress } from '../../utils';
import { useKeyboardFocus } from './hooks';
import styles from './styles.module.scss';

type RequiredCellProps = Pick<Cell, 'label'>;
type OptionalCellProps = Partial<Omit<Cell, 'label'>>;

export type CalendarItemProps = RequiredCellProps &
  OptionalCellProps & {
    /**
     * Сегмент для `data-test-id` (`getTestId(segment)`). По умолчанию `item`;
     * подписи дней недели в `WeekRow` используют `header-item` (как в migration E2E).
     */
    testIdSegment?: string;
    /** Размер */
    size: Size;
    /**
     * Отображается ли в интерфейсе (ячейка без содержимого для мобильной сетки)
     * @default true
     */
    visible?: boolean;
    /** CSS-класс */
    className?: string;
  };

export function Item({
  label,
  testIdSegment,
  size,
  checked,
  rangePosition = RANGE_POSITION.Out,
  disabled,
  holiday,
  another,
  current,
  visible = true,
  className,
  tabIndex,
  address,
  date,
  onSelect,
  onPreselect,
  onLeave,
  onKeyDown,
}: CalendarItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const { focus, setFocus, getTestId } = useCalendarContext();

  const dataTestId = getTestId(testIdSegment ?? 'item');

  const navigationEnabled = Boolean(address);

  const keyDownHandler = useKeyboardFocus({
    address: address ?? [0, 0],
    onKeyDown,
    enabled: navigationEnabled,
  });

  useLayoutEffect(() => {
    if (!address) {
      return;
    }
    if (stringifyAddress(address) === focus) {
      ref.current?.focus();
    }
  }, [focus, address]);

  useLayoutEffect(() => {
    if (!address) {
      return;
    }
    if (tabIndex === 0 && focus === AUTOFOCUS) {
      ref.current?.focus();
    }
  }, [focus, tabIndex, address]);

  const attributes = {
    'data-size': size,
    'data-visible': visible || undefined,
    'data-checked': checked || undefined,
    'data-disabled': disabled || undefined,
    'data-another': another || undefined,
    'data-holiday': holiday || undefined,
    'data-current': current || undefined,
    'data-range-position': rangePosition,
  };

  const handleSelect = () => {
    if (!disabled && date && onSelect) {
      onSelect(date);
    }
  };

  const showMarker = !disabled && !another && visible && current;

  return (
    <div className={cn(styles.root, className)} {...attributes}>
      <button
        type='button'
        aria-disabled={disabled}
        className={styles.container}
        onClick={handleSelect}
        onMouseEnter={() => !disabled && date && onPreselect?.(date)}
        onFocus={() => {
          if (address) {
            setFocus(stringifyAddress(address));
          }
          if (!disabled && date) {
            onPreselect?.(date);
          }
        }}
        onMouseLeave={onLeave}
        onBlur={() => {
          if (address) {
            setFocus(undefined);
          }
          onLeave?.();
        }}
        onKeyDown={keyDownHandler}
        ref={ref}
        data-disabled={attributes['data-disabled']}
        data-another={attributes['data-another']}
        data-checked={attributes['data-checked']}
        data-range-position={attributes['data-range-position']}
        {...(dataTestId ? { 'data-test-id': dataTestId } : {})}
        tabIndex={tabIndex}
      >
        <div className={styles.stateLayer} data-state={checked && !another ? 'activatedFilled' : 'regularFilled'} />
        <div className={styles.labelWrapper}>
          <span
            className={styles.label}
            data-disabled={attributes['data-disabled']}
            data-another={attributes['data-another']}
            data-checked={attributes['data-checked']}
            data-range-position={attributes['data-range-position']}
            data-holiday={attributes['data-holiday']}
          >
            {label}
          </span>
          {showMarker && (
            <div className={styles.marker}>
              <div
                className={styles.markerLine}
                data-checked={attributes['data-checked']}
                data-range-position={attributes['data-range-position']}
                data-holiday={attributes['data-holiday']}
              />
            </div>
          )}
        </div>
        <div className={styles.focusLayer} />
      </button>
    </div>
  );
}
