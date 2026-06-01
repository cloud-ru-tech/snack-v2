import { TimePickerDropdown, TimePickerDropdownProps } from '@ds/calendar';
import { useLocale } from '@ds/locale';
import { useValueControl } from '@ds/utils';
import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DEFAULT_LOCALE, TIME_PICKER_SIZE_MAP } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

const getStringTimeValue = (
  time: TimePickerDropdownProps['value'],
  { showSeconds, locale }: Pick<TimePickerDropdownProps, 'showSeconds'> & { locale: Intl.Locale },
) => {
  if (!time) {
    return '';
  }

  const date = new Date();
  date.setHours(time.hours ?? 0);
  date.setMinutes(time.minutes ?? 0);
  date.setSeconds(time.seconds ?? 0);

  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: showSeconds ? 'numeric' : undefined,
  });
};

type TimeValue = TimePickerDropdownProps['value'];

export type ChipChoiceTimeProps = Omit<ChipChoiceCommonProps, 'widthStrategy'> &
  Pick<TimePickerDropdownProps, 'value' | 'defaultValue' | 'showSeconds'> & {
    /** Колбек смены значения */
    onChange?(value: TimeValue): void;
    /** Колбек формирующий строковое представление выбранного значения */
    valueRender?(value?: TimeValue): ReactNode;
  };

export function ChipChoiceTime({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  dropDownClassName,
  showSeconds = true,
  placement,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  disabled,
  loading,
  ...rest
}: ChipChoiceTimeProps) {
  const [selectedValue, setSelectedValue] = useValueControl<TimeValue>({ value, defaultValue, onChange });

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

    return getStringTimeValue(selectedValue, { showSeconds, locale: DEFAULT_LOCALE });
  }, [selectedValue, showSeconds, t, valueRender]);

  const navigationStartRef = useRef<HTMLButtonElement>(null);
  const focusNavigationStartItem = () => setTimeout(() => navigationStartRef.current?.focus(), 0);

  return (
    <TimePickerDropdown
      trigger='click'
      size={TIME_PICKER_SIZE_MAP[size]}
      value={selectedValue}
      fitToContainer={false}
      onChangeValue={setSelectedValue}
      navigationStartRef={navigationStartRef}
      onFocusLeave={closeDroplist}
      showSeconds={showSeconds}
      placement={placement}
      outsideClick
      closeOnApply
      triggerRef={localRef}
      open={disabled || loading ? false : open}
      onOpenChange={handleOpenChange}
      className={dropDownClassName}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
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
    </TimePickerDropdown>
  );
}
