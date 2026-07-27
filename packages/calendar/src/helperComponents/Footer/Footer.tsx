import { FooterActions } from '@ds/bottom-sheet';
import { VIEW } from '@ds/button';
import { Divider } from '@ds/divider';
import { getDefaultItemId } from '@ds/list';
import { KeyboardEventHandler, RefObject } from 'react';

import { CALENDAR_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { calendarLocale } from '../../locale';
import { getMonthShift } from '../../utils';
import styles from './styles.module.scss';

export type FooterProps = {
  /** Колбек по клику на Apply */
  onApply?(): void;
  /** Колбек по клику на Current */
  onCurrent?(): void;
  /**
   * Inline-раскладка: футер рендерится внутри тела дропдауна (bottomSlot календаря),
   * поэтому сам рисует divider, паддинги и полную ширину. По умолчанию (`false`)
   * возвращает голые кнопки для `bottomBar`-слота дропдауна (`footer` + `footerDivider`),
   * где обвязку даёт сам Dropdown.
   */
  inline?: boolean;
};

/**
 * Футер календарных дропдаунов (Apply / Current). Кнопки собираются общим
 * `FooterActions` из `@ds/bottom-sheet` — единый источник правды с футерами
 * modal / drawer / bottom-sheet (Figma `popupDropdownFooter`). Читает состояние из
 * `CalendarContext`, поэтому рендерится только внутри провайдера контекста.
 */
export function Footer({ onApply, onCurrent, inline = false }: FooterProps) {
  const {
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
    size,
  } = useCalendarContext();

  const { t } = calendarLocale.useTranslations();

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

  const actions = (
    <FooterActions
      // Кнопки футера следуют размеру календаря: в мастере дропдаунов они 24 / 32 / 40 при s / m / l.
      size={size}
      approveButton={{
        label: t('apply'),
        disabled: isApplyButtonDisabled,
        innerRef: applyButtonRef as RefObject<HTMLButtonElement>,
        onClick: handleApplySelection,
        onKeyDown: handleApplyKeyDown,
      }}
      additionalButton={{
        label: t('current'),
        // `popupDropdownFooter` держит третью кнопку на `function`, а не на дефолтном
        // из `FooterActions` `simple`: у `simple` остаётся горизонтальный паддинг.
        view: VIEW.Function,
        innerRef: currentButtonRef as RefObject<HTMLButtonElement>,
        onClick: handleCurrentClick,
        onKeyDown: handleCurrentKeyDown,
      }}
      testIds={{
        approve: getTestId('apply-button') ?? '',
        additional: getTestId('current-button') ?? '',
        cancel: '',
      }}
      actionsClassName={inline ? styles.actions : undefined}
    />
  );

  if (!inline) {
    return actions;
  }

  return (
    <div className={styles.inline}>
      <Divider className={styles.divider} />
      {actions}
    </div>
  );
}
