import { useEventHandler } from '@ds/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Range, TimeValue } from '../types';
import { isTimePortionComplete, timeValuesEqual } from '../utils';
import { useDateAndTime } from './useDateAndTime';

export type UseTimePickerValueBridgeParams = {
  value?: TimeValue;
  defaultValue?: TimeValue;
  onChangeValue?(value: TimeValue): void;
  showSeconds: boolean;
};

export type TimePickerValueBridge = {
  /** Контролируемое/неконтролируемое значение времени (наружу). */
  value?: TimeValue;
  /** Внутреннее `Range`-представление выбранного времени для `CalendarContext.value`. */
  internalValue?: Range;
  /** `CalendarContext.setValue` — принимает `Range`, обновляет `internalValue`. */
  setValue(dates: Range): void;
} & Pick<
  ReturnType<typeof useDateAndTime>,
  | 'dateAndTime'
  | 'onTimeChange'
  | 'onDateChange'
  | 'onDateAndTimeChange'
  | 'isDateFilled'
  | 'isTimeFilled'
  | 'isDateAndTimeFilled'
>;

/**
 * Мост значения для time-picker'ов (desktop popover и mobile bottom sheet): связывает публичное `TimeValue`
 * с внутренним `dateAndTime` через `Range`-буфер `internalValue`, с защитой от цикла обновлений при внешней
 * смене `value` (см. `lastValueKeyRef`). Выделен из `TimePickerDropdown`, чтобы обе поверхности шарили логику.
 */
export function useTimePickerValueBridge({
  value: valueProp,
  defaultValue,
  onChangeValue,
  showSeconds,
}: UseTimePickerValueBridgeParams): TimePickerValueBridge {
  const [value, setValueState] = useUncontrolledProp<TimeValue | undefined>(valueProp, defaultValue, onChangeValue);
  const setValueEventHandler = useEventHandler(setValueState);
  const [internalValue, setInternalValue] = useState<Range | undefined>();
  const previousValueRef = useRef(value);

  useEffect(() => {
    if (!internalValue?.[0]) {
      return;
    }

    const hours = internalValue[0].getHours();
    const minutes = internalValue[0].getMinutes();
    const seconds = internalValue[0].getSeconds();

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

  // Этот эффект распространяет правки времени из пикера (dateAndTime) → value. Внешнее изменение
  // `value` синхронизируется в dateAndTime ОТДЕЛЬНЫМ эффектом (useDateAndTime), который отрабатывает
  // на рендер позже. Без guard'а в цикле внешней смены value этот эффект видит УСТАРЕВШИЙ dateAndTime
  // и эмитит его обратно, откатывая внешнее значение → бесконечный ре-рендер. Поэтому в цикл, где
  // value изменился извне, эмит пропускаем и даём dateAndTime догнаться.
  const lastValueKeyRef = useRef<string | null>(null);
  useEffect(() => {
    const wasValueCleared = value === undefined && previousValueRef.current !== undefined;
    previousValueRef.current = value;

    // Ключ внешнего value: если он изменился с прошлого рендера, значит value пришёл извне,
    // а dateAndTime ещё не догнался — эмит в этом цикле пропускаем.
    const valueKey = value ? `${value.hours}:${value.minutes}:${value.seconds}` : null;
    const externalValueChanged = valueKey !== lastValueKeyRef.current;
    lastValueKeyRef.current = valueKey;

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

    if (timeValuesEqual(value, next) || externalValueChanged) {
      return;
    }

    setValueEventHandler(next);
  }, [dateAndTime, showSeconds, setValueEventHandler, value]);

  return {
    value,
    internalValue,
    setValue,
    dateAndTime,
    onTimeChange,
    onDateChange,
    onDateAndTimeChange,
    isDateFilled,
    isTimeFilled,
    isDateAndTimeFilled,
  };
}
