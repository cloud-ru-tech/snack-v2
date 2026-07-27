import { Dropdown } from '@ds/dropdown';
import { ListProps } from '@ds/list';
import { useLang } from '@ds/locale';
import cn from 'classnames';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { DEFAULT_LOCALE } from '../../components/TimePicker/constants';
import styles from '../../components/TimePickerDropdown/styles.module.scss';
import { TimePickerDropdownProps } from '../../components/TimePickerDropdown/TimePickerDropdown';
import { SIZE } from '../../constants';
import { useTimePickerValueBridge } from '../../hooks';
import { BuildCellPropsFunction } from '../../types';
import { getLocale, getTestIdBuilder } from '../../utils';
import { CalendarContext, CalendarContextType } from '../CalendarContext';
import { Footer } from '../Footer';
import { TimePickerBase } from '../TimePickerBase';

const stubFunc = () => {};
const stubBuildCellProps: BuildCellPropsFunction = () => ({ isDisabled: false, isHoliday: false });

export function DesktopTimePickerDropdown({
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
  const [focus, setFocus] = useState<string | undefined>(undefined);
  const today = useMemo(() => (typeof todayProp === 'number' ? new Date(todayProp) : todayProp), [todayProp]);

  const {
    internalValue,
    setValue,
    dateAndTime,
    onTimeChange,
    onDateChange,
    onDateAndTimeChange,
    isDateFilled,
    isTimeFilled,
    isDateAndTimeFilled,
  } = useTimePickerValueBridge({ value: valueProp, defaultValue, onChangeValue, showSeconds });

  const applyButtonRef = useRef<HTMLButtonElement>(null);
  const currentButtonRef = useRef<HTMLButtonElement>(null);
  const hoursKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const minutesKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const secondsKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const ctxLang = useLang();

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
      </CalendarContext.Provider>
    </div>
  );

  // Футер вынесен в `bottomBar` дропдауна (`footer` + `footerDivider`) — divider и
  // паддинги даёт сам Dropdown. Провайдер контекста дублируется здесь, т.к. `footer` —
  // отдельный от `content` регион.
  const footer = (
    <CalendarContext.Provider value={calendarContextValue}>
      <Footer onApply={handleApply} onCurrent={onCurrent} />
    </CalendarContext.Provider>
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
      footer={footer}
      footerDivider
      bodyPadding={false}
      widthStrategy='gte'
    >
      {children}
    </Dropdown>
  );
}
