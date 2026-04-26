import { ButtonGroup } from '@ds/button';
import { Divider } from '@ds/divider';
import { useLocale } from '@ds/locale';
import { KeyboardEventHandler, RefObject } from 'react';

import { getDefaultItemId } from '@snack-uikit/list';

import { CALENDAR_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { getMonthShift } from '../../utils';
import styles from './styles.module.scss';

export type FooterProps = {
  /** Колбек по клику на Apply */
  onApply?(): void;
  /** Колбек по клику на Current */
  onCurrent?(): void;
};

export function Footer({ onApply, onCurrent }: FooterProps) {
  const {
    size,
    viewMode,
    mode,
    today,
    setValue,
    dateAndTime,
    isTimeFilled,
    isDateAndTimeFilled,
    onDateAndTimeChange,
    applyButtonRef,
    currentButtonRef,
    hoursKeyboardNavigationRef,
    minutesKeyboardNavigationRef,
    secondsKeyboardNavigationRef,
    showSeconds,
    getTestId,
    referenceDate,
    setViewShift,
    onFocusLeave,
  } = useCalendarContext();

  const { t } = useLocale('Calendar');

  if (![CALENDAR_MODE.DateTime, 'time'].includes(mode) || viewMode !== 'month') {
    return null;
  }

  const isApplyButtonDisabled = mode === 'time' ? !isTimeFilled() : !isDateAndTimeFilled();

  const handleCurrentKeyDown: KeyboardEventHandler = event => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        event.preventDefault();

        if (showSeconds) {
          secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.seconds ?? 0));
        } else {
          minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.minutes ?? 0));
        }
      } else {
        if (isApplyButtonDisabled) {
          onFocusLeave?.('next');
        }
      }
    }
  };

  const handleApplyKeyDown: KeyboardEventHandler = event => {
    if (event.key === 'Tab' && !event.shiftKey) {
      onFocusLeave?.('next');
    }
  };

  const handleCurrentClick = () => {
    const todayDate = today || new Date();

    onDateAndTimeChange(todayDate);
    setViewShift(getMonthShift(referenceDate, todayDate));

    hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(todayDate.getHours() ?? 0));
    minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(todayDate.getMinutes() ?? 0));
    secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(todayDate.getSeconds() ?? 0));

    applyButtonRef.current?.focus();
    onCurrent?.();
  };

  const handleApplySelection = () => {
    if (!dateAndTime) {
      return;
    }

    const todayDate = today || new Date();

    const {
      year = todayDate.getFullYear(),
      month = todayDate.getMonth(),
      day = todayDate.getDay(),
      hours,
      minutes,
      seconds,
    } = dateAndTime;

    const newDate = new Date(year, month, day, hours, minutes, showSeconds ? seconds : 0);

    setValue([newDate, newDate]);
    onApply?.();
  };

  return (
    <div className={styles.footer} data-size={size}>
      <Divider className={styles.divider} />

      <ButtonGroup
        className={styles.buttonGroup}
        size={size === 's' ? 's' : 'm'}
        primaryAction={{
          label: t('apply'),
          appearance: 'primary',
          view: 'filled',
          disabled: isApplyButtonDisabled,
          innerRef: applyButtonRef as RefObject<HTMLButtonElement>,
          onClick: handleApplySelection,
          onKeyDown: handleApplyKeyDown,
          'data-test-id': getTestId('apply-button'),
        }}
        tertiaryAction={{
          label: t('current'),
          appearance: 'neutral',
          view: 'simple',
          onClick: handleCurrentClick,
          innerRef: currentButtonRef as RefObject<HTMLButtonElement>,
          onKeyDown: handleCurrentKeyDown,
          'data-test-id': getTestId('current-button'),
        }}
      />
    </div>
  );
}
