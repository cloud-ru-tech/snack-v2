import { CalendarDropdown, CalendarDropdownProps } from '@ds/calendar';
import { ReactNode, useCallback, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { chipsLocale } from '../../../locale';
import { CALENDAR_SIZE_MAP, DEFAULT_LOCALE } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps, Range } from '../types';
import { defaultRangeFormatter } from '../utils';
import { ChipChoiceBase } from './ChipChoiceBase';

export type ChipChoiceDateRangeProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Range;
  /** Значение компонента по умолчанию */
  defaultValue?: Range;
  /** Колбек смены значения */
  onChange?(value: Range): void;
  /** Колбек формирующий строковое представление выбранного значения */
  valueRender?(value?: Range): ReactNode;
  /** Колбек свойств для управления ячейками календаря */
  buildCalendarCellProps?: CalendarDropdownProps['buildCellProps'];
};

export function ChipChoiceDateRange({
  size = SIZE.M,
  value,
  defaultValue,
  onChange,
  valueRender,
  dropDownClassName,
  buildCalendarCellProps,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  disabled,
  loading,
  ...rest
}: ChipChoiceDateRangeProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<Range>(value, defaultValue, onChange);

  const { t } = chipsLocale.useTranslations();

  const valueToRender = valueRender
    ? valueRender(selectedValue)
    : defaultRangeFormatter({ value: selectedValue, allLabel: t('allLabel') });
  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);

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

  const handleChangeValue = (value: Range) => {
    setSelectedValue(value);
    closeDroplist();
  };

  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  return (
    <CalendarDropdown
      trigger='click'
      mode='date-range'
      size={CALENDAR_SIZE_MAP[size]}
      value={selectedValue}
      onChangeValue={handleChangeValue}
      locale={DEFAULT_LOCALE}
      onFocusLeave={closeDroplist}
      buildCellProps={buildCalendarCellProps}
      outsideClick
      closeOnApply
      triggerRef={localRef}
      open={disabled || loading ? false : open}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      onOpenChange={handleOpenChange}
      className={dropDownClassName}
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
        onKeyDown={handleOnKeyDown()}
      />
    </CalendarDropdown>
  );
}
