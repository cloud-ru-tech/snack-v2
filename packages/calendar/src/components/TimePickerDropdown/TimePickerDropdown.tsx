import { Dropdown, DropdownProps } from '@ds/dropdown';
import { useLocale } from '@ds/locale';
import { useEventHandler, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { ListProps } from '@snack-uikit/list';

import { SIZE } from '../../constants';
import { CalendarContext, CalendarContextType, Footer, TimePickerBase } from '../../helperComponents';
import { useDateAndTime } from '../../hooks';
import { BuildCellPropsFunction, Range, TimeValue } from '../../types';
import { getLocale, getTestIdBuilder, isTimePortionComplete, timeValuesEqual } from '../../utils';
import { TimePickerProps } from '../TimePicker';
import { DEFAULT_LOCALE } from '../TimePicker/constants';
import styles from './styles.module.scss';

const stubFunc = () => {};
const stubBuildCellProps: BuildCellPropsFunction = () => ({ isDisabled: false, isHoliday: false });

type DropdownBridgeProps = Pick<
  DropdownProps,
  | 'triggerClassName'
  | 'trigger'
  | 'placement'
  | 'hoverDelayOpen'
  | 'hoverDelayClose'
  | 'closeOnEscapeKey'
  | 'triggerClickByKeys'
  | 'triggerRef'
  | 'outsideClick'
  | 'fallbackPlacements'
  | 'disableSpanWrapper'
  | 'closeOnPopstate'
  | 'open'
  | 'onOpenChange'
>;

export type TimePickerDropdownProps = WithSupportProps<
  TimePickerProps &
    DropdownBridgeProps & {
      /** Контент триггера открытия dropdown */
      children?: ReactNode;
      /** Закрыть dropdown после нажатия кнопки Apply */
      closeOnApply?: boolean;
      /** Колбек по нажатию Apply */
      onApply?(): void;
      /** Колбек по нажатию Current */
      onCurrent?(): void;
    }
>;

export function TimePickerDropdown({
  className,
  size = SIZE.M,
  fitToContainer = false,
  value: valueProp,
  defaultValue,
  onChangeValue,
  onFocusLeave,
  'data-test-id': testId,
  navigationStartRef,
  showSeconds = true,
  today: todayProp,
  children,
  closeOnApply = false,
  onApply,
  onCurrent,
  open: openProp,
  onOpenChange,
  triggerClassName,
  trigger = 'click',
  placement = 'bottom-start',
  hoverDelayOpen,
  hoverDelayClose,
  closeOnEscapeKey,
  triggerClickByKeys,
  triggerRef,
  outsideClick,
  fallbackPlacements,
  disableSpanWrapper,
  closeOnPopstate,
}: TimePickerDropdownProps) {
  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const [value, setValueState] = useUncontrolledProp<TimeValue | undefined>(valueProp, defaultValue, onChangeValue);
  const setValueEventHandler = useEventHandler(setValueState);
  const [internalValue, setInternalValue] = useState<Range | undefined>();
  const [focus, setFocus] = useState<string | undefined>(undefined);
  const today = useMemo(() => (typeof todayProp === 'number' ? new Date(todayProp) : todayProp), [todayProp]);
  const previousValueRef = useRef(value);

  useEffect(() => {
    if (!internalValue?.[0]) {
      return;
    }

    const hours = internalValue[0].getHours() ?? 0;
    const minutes = internalValue[0].getMinutes() ?? 0;
    const seconds = internalValue[0].getSeconds() ?? 0;

    setValueEventHandler({ hours, minutes, seconds });
  }, [internalValue, setValueEventHandler]);

  const setValue = useCallback((dates: Range) => {
    const newDate = dates[0];
    setInternalValue([newDate, newDate]);
  }, []);

  const {
    dateAndTime,
    onTimeChange,
    onDateChange,
    onDateAndTimeChange,
    isDateFilled,
    isTimeFilled,
    isDateAndTimeFilled,
  } = useDateAndTime({ showSeconds, value });

  useEffect(() => {
    const wasValueCleared = value === undefined && previousValueRef.current !== undefined;
    previousValueRef.current = value;

    if (wasValueCleared) {
      return;
    }

    if (!isTimePortionComplete(dateAndTime, showSeconds)) {
      return;
    }

    const next: TimeValue = {
      hours: dateAndTime.hours ?? 0,
      minutes: dateAndTime.minutes ?? 0,
      seconds: dateAndTime.seconds ?? 0,
    };

    if (timeValuesEqual(value, next)) {
      return;
    }

    setValueEventHandler(next);
  }, [dateAndTime, showSeconds, setValueEventHandler, value]);

  const applyButtonRef = useRef<HTMLButtonElement>(null);
  const currentButtonRef = useRef<HTMLButtonElement>(null);
  const hoursKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const minutesKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const secondsKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const { lang: ctxLang } = useLocale();

  const locale = useMemo(() => getLocale({ localeProp: DEFAULT_LOCALE, ctxLang }), [ctxLang]);

  const handleApply = useCallback(() => {
    onApply?.();

    if (closeOnApply) {
      setOpen(false);
    }
  }, [closeOnApply, onApply, setOpen]);

  const calendarContextValue = useMemo<CalendarContextType>(() => {
    const stubDate = new Date();

    return {
      mode: 'time',
      locale,
      size,
      value: internalValue,
      fitToContainer,
      focus,
      setValue,
      setFocus,
      getTestId,
      onFocusLeave,
      navigationStartRef,
      showSeconds,
      dateAndTime,
      onTimeChange,
      onDateAndTimeChange,
      isTimeFilled,
      applyButtonRef,
      currentButtonRef,
      hoursKeyboardNavigationRef,
      minutesKeyboardNavigationRef,
      secondsKeyboardNavigationRef,
      today,

      // Stub props
      viewMode: 'month',
      showHolidays: false,
      viewDate: stubDate,
      referenceDate: stubDate,
      preselectedRange: undefined,
      viewShift: 0,
      setViewMode: stubFunc,
      setViewShift: stubFunc,
      startPreselect: stubFunc,
      continuePreselect: stubFunc,
      completePreselect: stubFunc,
      restartPreselect: stubFunc,
      buildCellProps: stubBuildCellProps,
      onDateChange,
      isDateAndTimeFilled,
      isDateFilled,
    };
  }, [
    applyButtonRef,
    currentButtonRef,
    dateAndTime,
    fitToContainer,
    focus,
    getTestId,
    hoursKeyboardNavigationRef,
    internalValue,
    isDateAndTimeFilled,
    isDateFilled,
    isTimeFilled,
    locale,
    minutesKeyboardNavigationRef,
    navigationStartRef,
    onDateAndTimeChange,
    onDateChange,
    onFocusLeave,
    onTimeChange,
    secondsKeyboardNavigationRef,
    setFocus,
    setValue,
    showSeconds,
    size,
    today,
  ]);

  const content = (
    <div
      className={cn(styles.timePickerDropdownContent, className)}
      data-size={size}
      data-test-id={getTestId('content')}
    >
      <CalendarContext.Provider value={calendarContextValue}>
        <TimePickerBase className={styles.timePickerBaseLimited} />
        <Footer onApply={handleApply} onCurrent={onCurrent} />
      </CalendarContext.Provider>
    </div>
  );

  return (
    <Dropdown
      className={styles.dropdown}
      data-test-id={testId}
      triggerClassName={triggerClassName}
      trigger={trigger}
      placement={placement}
      hoverDelayOpen={hoverDelayOpen}
      hoverDelayClose={hoverDelayClose}
      closeOnEscapeKey={closeOnEscapeKey}
      triggerClickByKeys={triggerClickByKeys}
      triggerRef={triggerRef}
      outsideClick={outsideClick}
      fallbackPlacements={fallbackPlacements}
      disableSpanWrapper={disableSpanWrapper}
      closeOnPopstate={closeOnPopstate}
      open={open}
      onOpenChange={setOpen}
      content={content}
      widthStrategy='gte'
    >
      {children}
    </Dropdown>
  );
}
