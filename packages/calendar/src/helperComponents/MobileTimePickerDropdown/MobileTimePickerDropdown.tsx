import { BottomSheet } from '@ds/bottom-sheet';
import { extractSupportProps, useLayoutEffect, useValueControl } from '@ds/utils';
import { useCallback, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { TimePickerDropdownProps } from '../../components/TimePickerDropdown/TimePickerDropdown';
import { SIZE, TEST_IDS } from '../../constants';
import { useDateAndTime, useOpenTrigger, useTimeDrumHandlers } from '../../hooks';
import { calendarLocale } from '../../locale';
import { TimeValue } from '../../types';
import { TimePickerDrum, TimePickerDrumHandle } from '../TimePickerDrum';

/**
 * Черновик + Apply модель: правки берутся в локальный черновик, коммитятся наружу только по Apply.
 * Закрытие/свайп = отмена (убирает авто-коммит после каждого оседания).
 */
export function MobileTimePickerDropdown({
  children,
  size = SIZE.M,
  value,
  defaultValue,
  onChangeValue,
  showSeconds = true,
  today: todayProp,
  closeOnApply = false,
  onApply,
  onCurrent,
  open: openProp,
  onOpenChange,
  closeOnPopstate,
  'data-test-id': testId,
  ...rest
}: TimePickerDropdownProps) {
  const { t } = calendarLocale.useTranslations();
  const [open, setOpen] = useValueControl<boolean>({ value: openProp, defaultValue: false, onChange: onOpenChange });

  const today = useMemo(() => (typeof todayProp === 'number' ? new Date(todayProp) : todayProp), [todayProp]);

  // Закоммиченное значение (внутренний state в uncontrolled-режиме); наружу коммитится только по Apply.
  const [committedValue, commit] = useUncontrolledProp<TimeValue | undefined>(value, defaultValue, onChangeValue);
  const committedRef = useRef(committedValue);
  committedRef.current = committedValue;

  const { dateAndTime, setDateAndTime, onTimeChange, isTimeFilled } = useDateAndTime({ showSeconds, value: undefined });
  const drumRef = useRef<TimePickerDrumHandle>(null);

  // При каждом открытии пересобираем черновик из закоммиченного значения (отмена незакоммиченных правок прошлой сессии).
  useLayoutEffect(() => {
    if (open) {
      const v = committedRef.current;
      setDateAndTime(
        v
          ? {
              year: undefined,
              month: undefined,
              day: undefined,
              hours: v.hours,
              minutes: v.minutes,
              seconds: v.seconds,
            }
          : {},
      );
    }
  }, [open, setDateAndTime]);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);

  const drumHandlers = useTimeDrumHandlers(dateAndTime, onTimeChange);

  const handleCurrent = useCallback(() => {
    onTimeChange(today ?? new Date());
    onCurrent?.();
  }, [onCurrent, onTimeChange, today]);

  const handleApply = useCallback(() => {
    // Форсим оседание незавершённого жеста барабана перед коммитом, иначе быстрый флик→Apply
    // закоммитил бы значение до флика (FF-8654, #2). Кнопка активна только при заполненном времени.
    const flushed = drumRef.current?.flush() ?? {
      hours: dateAndTime.hours ?? 0,
      minutes: dateAndTime.minutes ?? 0,
      seconds: dateAndTime.seconds ?? 0,
    };
    commit({
      hours: flushed.hours,
      minutes: flushed.minutes,
      seconds: showSeconds ? flushed.seconds : 0,
    });
    onApply?.();

    if (closeOnApply) {
      handleClose();
    }
  }, [dateAndTime, showSeconds, commit, onApply, closeOnApply, handleClose]);

  const trigger = useOpenTrigger(children, handleOpen);

  return (
    <>
      {trigger}
      <BottomSheet
        open={open ?? false}
        onClose={handleClose}
        onBackButtonClick={handleClose}
        title={t('time')}
        closeOnPopstate={closeOnPopstate}
        approveButton={{ label: t('apply'), disabled: !isTimeFilled(), onClick: handleApply }}
        additionalButton={{ label: t('current'), view: 'function', onClick: handleCurrent }}
        footerTestIds={{ approve: TEST_IDS.timePickerMobileApply, additional: TEST_IDS.timePickerMobileCurrent }}
        content={
          <TimePickerDrum
            ref={drumRef}
            size={size}
            showSeconds={showSeconds}
            hours={dateAndTime?.hours ?? 0}
            minutes={dateAndTime?.minutes ?? 0}
            seconds={dateAndTime?.seconds ?? 0}
            {...drumHandlers}
          />
        }
        {...extractSupportProps(rest)}
        data-test-id={testId}
      />
    </>
  );
}
