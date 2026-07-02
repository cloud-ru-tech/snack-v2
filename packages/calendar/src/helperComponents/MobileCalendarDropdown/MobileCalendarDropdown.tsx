import { useValueControl } from '@ds/utils';
import { useCallback, useMemo } from 'react';

import { getNormalizedValue } from '../../components/Calendar/utils';
import { CalendarDropdownProps } from '../../components/CalendarDropdown/CalendarDropdown';
import { useOpenTrigger } from '../../hooks';
import { CalendarMode, Range } from '../../types';
import { MobileCalendar } from '../MobileCalendar';

const SINGLE_VALUE_MODES: CalendarMode[] = ['date', 'date-time', 'month', 'year'];

/**
 * Адаптер: значение нормализуется в Range (внутри), наружу отдаётся в форме режима.
 */
export function MobileCalendarDropdown(props: CalendarDropdownProps) {
  const {
    children,
    mode,
    value,
    defaultValue,
    onChangeValue,
    closeOnApply = false,
    onApply,
    onCurrent,
    open: openProp,
    onOpenChange,
    closeOnPopstate,
    size,
    today,
    showHolidays,
    buildCellProps,
    locale,
    presets,
    'data-test-id': testId,
  } = props;
  // `showSeconds` есть только у date-time-члена дискриминированного union'а.
  const showSeconds = 'showSeconds' in props ? props.showSeconds : undefined;

  const [open, setOpen] = useValueControl<boolean>({ value: openProp, defaultValue: false, onChange: onOpenChange });

  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);

  const normalizedValue = useMemo(() => getNormalizedValue(value), [value]);
  const normalizedDefaultValue = useMemo(() => getNormalizedValue(defaultValue), [defaultValue]);

  const handleChangeValue = useCallback(
    (next: Range) => {
      if (SINGLE_VALUE_MODES.includes(mode)) {
        (onChangeValue as ((value: Date) => void) | undefined)?.(next[0]);
        return;
      }
      (onChangeValue as ((value: Range) => void) | undefined)?.(next);
    },
    [mode, onChangeValue],
  );

  const trigger = useOpenTrigger(children, handleOpen);

  return (
    <>
      {trigger}
      <MobileCalendar
        open={open ?? false}
        onClose={handleClose}
        mode={mode}
        size={size}
        today={today}
        showHolidays={showHolidays}
        showSeconds={showSeconds}
        buildCellProps={buildCellProps}
        locale={locale}
        presets={presets}
        value={normalizedValue}
        defaultValue={normalizedDefaultValue}
        onChangeValue={handleChangeValue}
        onApply={onApply}
        onCurrent={onCurrent}
        closeOnApply={closeOnApply}
        closeOnPopstate={closeOnPopstate}
        data-test-id={testId}
      />
    </>
  );
}
