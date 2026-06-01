import { CalendarDropdown, CalendarDropdownProps } from '@ds/calendar';
import { useLocale } from '@ds/locale';
import { useValueControl } from '@ds/utils';
import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { CALENDAR_SIZE_MAP, DEFAULT_LOCALE } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

type ChipChoiceDateWithSeconds = {
  /** Режим выбора даты и времени */
  mode?: 'date-time';
  /** Показывать секунды в выборе и отображении времени */
  showSeconds?: boolean;
};

export type ChipChoiceDateProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Date;
  /** Значение компонента по-умолчанию */
  defaultValue?: Date;
  /** Колбек смены значения */
  onChange?(value: Date): void;
  /** Колбек формирующий строковое представление выбранного значения */
  valueRender?(value?: Date): ReactNode;
  /** Режим выбора даты */
  mode?: Exclude<CalendarDropdownProps['mode'], 'date-range' | 'month-range' | 'year-range'>;
  /** Колбек свойств для управления ячейками календаря */
  buildCalendarCellProps?: CalendarDropdownProps['buildCellProps'];
} & (
    | ChipChoiceDateWithSeconds
    | {
        /** Режим выбора даты без времени */
        mode?: 'date' | 'month' | 'year';
      }
  );

export function ChipChoiceDate({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  dropDownClassName,
  mode = 'date',
  placement,
  buildCalendarCellProps,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  disabled,
  loading,
  ...rest
}: ChipChoiceDateProps) {
  const [selectedValue, setSelectedValue] = useValueControl<Date>({ value, defaultValue, onChange });

  const showSeconds = mode === 'date-time' ? ((rest as ChipChoiceDateWithSeconds).showSeconds ?? true) : undefined;

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (disabled || loading) {
        setOpen(false);
        return;
      }

      setOpen(isOpen);
    },
    [disabled, loading, setOpen],
  );

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, [setOpen]);

  const { t } = useLocale('Chips');

  const valueToRender = useMemo(() => {
    if (valueRender) {
      return valueRender(selectedValue);
    }

    if (!selectedValue) return t('allLabel');

    const date = new Date(selectedValue);

    if (mode === 'date-time') {
      return date.toLocaleString(DEFAULT_LOCALE, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
      });
    }

    return date.toLocaleDateString(DEFAULT_LOCALE, {
      year: 'numeric',
      month: mode === 'date' || mode === 'month' ? 'numeric' : undefined,
      day: mode === 'date' ? 'numeric' : undefined,
    });
  }, [mode, selectedValue, showSeconds, t, valueRender]);

  const handleChangeValue = useCallback(
    (value: Date) => {
      setSelectedValue(value);
      closeDroplist();
    },
    [closeDroplist, setSelectedValue],
  );

  const navigationStartRef = useRef<HTMLButtonElement>(null);
  const focusNavigationStartItem = () => setTimeout(() => navigationStartRef.current?.focus(), 0);

  return (
    <CalendarDropdown
      placement={placement}
      outsideClick
      closeOnApply
      triggerRef={localRef}
      open={disabled || loading ? false : open}
      onOpenChange={handleOpenChange}
      className={dropDownClassName}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      mode={mode}
      size={CALENDAR_SIZE_MAP[size]}
      value={selectedValue}
      fitToContainer={false}
      onChangeValue={handleChangeValue}
      navigationStartRef={navigationStartRef}
      onFocusLeave={closeDroplist}
      showSeconds={showSeconds}
      locale={DEFAULT_LOCALE}
      buildCellProps={buildCalendarCellProps}
    >
      <ChipChoiceBase
        {...rest}
        ref={localRef}
        onClearButtonClick={onClearButtonClick}
        value={selectedValue}
        valueToRender={valueToRender}
        disabled={disabled}
        loading={loading}
        size={size}
        onKeyDown={handleOnKeyDown(focusNavigationStartItem)}
      />
    </CalendarDropdown>
  );
}
