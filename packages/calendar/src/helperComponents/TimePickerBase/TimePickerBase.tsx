import { Divider } from '@ds/divider';
import { getDefaultItemId } from '@ds/list';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';

import { AUTOFOCUS, HOURS, MINUTES, SECONDS } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { OnKeyDownGetter } from '../../types';
import { TimeList } from '../TimeList';
import styles from './styles.module.scss';

export type TimePickerBaseProps = {
  /** CSS-класс */
  className?: string;
  /** Фиксированная ширина (оверрайдит fitToContainer) */
  fixedWidth?: boolean;
};

export function TimePickerBase({ className, fixedWidth }: TimePickerBaseProps) {
  const {
    size,
    mode,
    fitToContainer,
    showSeconds,
    dateAndTime,
    onTimeChange,
    applyButtonRef,
    currentButtonRef,
    hoursKeyboardNavigationRef,
    minutesKeyboardNavigationRef,
    secondsKeyboardNavigationRef,
    setFocus,
    getTestId,
    navigationStartRef,
    onFocusLeave,
  } = useCalendarContext();

  const hours = dateAndTime?.hours;
  const minutes = dateAndTime?.minutes;
  const seconds = dateAndTime?.seconds;

  const getTimeChangeHandler = useCallback(
    (propName: 'hours' | 'minutes' | 'seconds') => (value: number) => {
      onTimeChange({
        hours: dateAndTime?.hours ?? 0,
        minutes: dateAndTime?.minutes ?? 0,
        seconds: dateAndTime?.seconds ?? 0,
        [propName]: value ?? dateAndTime?.[propName] ?? 0,
      });
    },
    [dateAndTime, onTimeChange],
  );

  const onHoursChange = getTimeChangeHandler('hours');
  const onMinutesChange = getTimeChangeHandler('minutes');
  const onSecondsChange = getTimeChangeHandler('seconds');

  const onHourKeyDownGetter: OnKeyDownGetter = useCallback(
    id => event => {
      switch (event.key) {
        case 'Tab':
          if (mode === 'time' && event.shiftKey) {
            onFocusLeave?.('prev');
            break;
          }

          event.stopPropagation();
          event.preventDefault();

          if (event.shiftKey) {
            setFocus(AUTOFOCUS);
          } else {
            minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(minutes ?? 0));
          }
          break;
        case 'Enter':
          minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(minutes ?? 0));
          break;
        case 'ArrowUp':
          if (mode === 'time' && id === 0) {
            onFocusLeave?.('prev');
            break;
          }
          break;
        default:
          break;
      }
    },
    [minutes, minutesKeyboardNavigationRef, mode, onFocusLeave, setFocus],
  );

  const onMinuteKeyDownGetter: OnKeyDownGetter = useCallback(
    () => event => {
      switch (event.key) {
        case 'Tab':
          event.stopPropagation();
          event.preventDefault();

          if (event.shiftKey) {
            hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(hours ?? 0));
          } else {
            if (showSeconds) {
              secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(seconds ?? 0));
            } else {
              currentButtonRef.current?.focus();
            }
          }
          break;
        case 'Enter':
          if (showSeconds) {
            secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(seconds ?? 0));
          } else {
            applyButtonRef.current?.focus();
          }
          break;
        default:
          break;
      }
    },
    [
      applyButtonRef,
      currentButtonRef,
      hours,
      hoursKeyboardNavigationRef,
      seconds,
      secondsKeyboardNavigationRef,
      showSeconds,
    ],
  );

  const onSecondKeyDownGetter: OnKeyDownGetter = useCallback(
    () => event => {
      switch (event.key) {
        case 'Tab':
          event.stopPropagation();
          event.preventDefault();

          if (event.shiftKey) {
            minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(minutes ?? 0));
          } else {
            currentButtonRef.current?.focus();
          }
          break;
        case 'Enter':
          applyButtonRef.current?.focus();
          break;
        default:
          break;
      }
    },
    [applyButtonRef, currentButtonRef, minutes, minutesKeyboardNavigationRef],
  );

  const timeValue = useMemo(() => {
    const selectedTime = [hours, minutes];

    if (showSeconds) {
      selectedTime.push(seconds);
    }

    return selectedTime
      .map(value => {
        if (value) {
          return value.toString().padStart(2, '0');
        }

        return '00';
      })
      .join(':');
  }, [hours, minutes, seconds, showSeconds]);

  return (
    <div className={cn(styles.root, className)} data-size={size} data-fit-to-container={fitToContainer || undefined}>
      <div className={styles.header} data-size={size}>
        <div className={styles.time} data-size={size}>
          {timeValue}
        </div>
      </div>

      <Divider className={styles.divider} orientation='horizontal' />

      <div
        className={styles.listTimeDesktop}
        data-size={size}
        data-fit-to-container={fitToContainer || undefined}
        data-fixed-width={fixedWidth || undefined}
      >
        <TimeList
          className={styles.timeListColumn}
          value={hours}
          onChange={onHoursChange}
          data-test-id={getTestId('hours')}
          numberOfItems={HOURS}
          onKeyDownGetter={onHourKeyDownGetter}
          keyboardNavigationRef={hoursKeyboardNavigationRef}
          navigationStartRef={mode === 'time' ? navigationStartRef : undefined}
        />

        <Divider className={styles.divider} orientation='vertical' />

        <TimeList
          className={styles.timeListColumn}
          value={minutes}
          onChange={onMinutesChange}
          data-test-id={getTestId('minutes')}
          numberOfItems={MINUTES}
          onKeyDownGetter={onMinuteKeyDownGetter}
          keyboardNavigationRef={minutesKeyboardNavigationRef}
        />

        {showSeconds && (
          <>
            <Divider className={styles.divider} orientation='vertical' />

            <TimeList
              className={styles.timeListColumn}
              value={seconds}
              onChange={onSecondsChange}
              data-test-id={getTestId('seconds')}
              numberOfItems={SECONDS}
              onKeyDownGetter={onSecondKeyDownGetter}
              keyboardNavigationRef={secondsKeyboardNavigationRef}
            />
          </>
        )}
      </div>
    </div>
  );
}
