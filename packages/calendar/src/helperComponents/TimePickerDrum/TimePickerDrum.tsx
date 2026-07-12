import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

import { HOURS, MINUTES, SECONDS, SIZE } from '../../constants';
import { noop, TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { TimePickerDrumWheelColumn, TimePickerDrumWheelColumnHandle } from './TimePickerDrumWheelColumn';
import { TimePickerDrumProps } from './types';
import {
  buildColumnValues,
  formatDisplayPart,
  formatSelectedDateLabelForDisplay,
  getSizeLimits,
  nearestInSortedValues,
} from './utils';

/** Императивный интерфейс барабана: форсит «оседание» всех колонок (см. FF-8654, комментарий #2). */
export type TimePickerDrumHandle = {
  /** Синхронно завершает незакоммиченные жесты во всех колонках и возвращает итоговое время. */
  flush(): { hours: number; minutes: number; seconds: number };
};

export const TimePickerDrum = forwardRef<TimePickerDrumHandle, TimePickerDrumProps>(function TimePickerDrum(
  {
    size = SIZE.M,
    showSeconds = true,
    selectedDateLabel,
    hours,
    minutes,
    seconds,
    onHoursChange,
    onMinutesChange,
    onSecondsChange,
    customOptions,
    className,
    'data-test-id': dataTestId,
    ...rest
  }: TimePickerDrumProps,
  ref,
) {
  const { itemHeight, pickerHeight } = useMemo(() => getSizeLimits(size), [size]);

  const hoursColumnRef = useRef<TimePickerDrumWheelColumnHandle>(null);
  const minutesColumnRef = useRef<TimePickerDrumWheelColumnHandle>(null);
  const secondsColumnRef = useRef<TimePickerDrumWheelColumnHandle>(null);

  useImperativeHandle(
    ref,
    () => ({
      flush: () => ({
        hours: hoursColumnRef.current?.flush() ?? hours,
        minutes: minutesColumnRef.current?.flush() ?? minutes,
        seconds: secondsColumnRef.current?.flush() ?? seconds ?? 0,
      }),
    }),
    [hours, minutes, seconds],
  );

  const hourValues = useMemo(
    () => buildColumnValues(HOURS, customOptions?.allowedHours, customOptions?.minHour),
    [customOptions?.allowedHours, customOptions?.minHour],
  );

  const minuteValues = useMemo(
    () => buildColumnValues(MINUTES, customOptions?.allowedMinutes, customOptions?.minMinute),
    [customOptions?.allowedMinutes, customOptions?.minMinute],
  );

  const secondValues = useMemo(
    () => buildColumnValues(SECONDS, customOptions?.allowedSeconds, customOptions?.minSecond),
    [customOptions?.allowedSeconds, customOptions?.minSecond],
  );

  /**
   * Подгонка `hours` / `minutes` / `seconds` под `customOptions`: при несовпадении с допустимым набором
   * вызывается ближайший `on*Change`. В контролируемом режиме колбэк обязан обновить проп до этого значения;
   * иначе эффект будет срабатывать на каждом рендере (риск цикла обновлений).
   */
  useEffect(() => {
    const next = nearestInSortedValues(hourValues, hours);
    if (!Number.isFinite(next) || next === hours) {
      return;
    }
    onHoursChange(next);
  }, [hourValues, hours, onHoursChange]);

  useEffect(() => {
    const next = nearestInSortedValues(minuteValues, minutes);
    if (!Number.isFinite(next) || next === minutes) {
      return;
    }
    onMinutesChange(next);
  }, [minuteValues, minutes, onMinutesChange]);

  useEffect(() => {
    if (!showSeconds || onSecondsChange == null) {
      return;
    }
    const s = seconds ?? 0;
    const next = nearestInSortedValues(secondValues, s);
    if (!Number.isFinite(next) || next === s) {
      return;
    }
    onSecondsChange(next);
  }, [onSecondsChange, secondValues, seconds, showSeconds]);

  const timeDisplay = useMemo(() => {
    const h = formatDisplayPart(hours);
    const m = formatDisplayPart(minutes);
    if (showSeconds) {
      const s = formatDisplayPart(seconds ?? 0);
      return { main: `${h}:${m}`, secondsPart: `:${s}` };
    }
    return { main: `${h}:${m}`, secondsPart: undefined };
  }, [hours, minutes, seconds, showSeconds]);

  const selectedDateLabelDisplay = useMemo(() => {
    if (!selectedDateLabel) {
      return '';
    }
    return formatSelectedDateLabelForDisplay(selectedDateLabel);
  }, [selectedDateLabel]);

  return (
    <div
      className={cn(styles.root, className)}
      data-size={size}
      data-show-seconds={showSeconds || undefined}
      // Барабан сам обрабатывает вертикальный pointer-жест — отключаем перехват drag'ом bottom-sheet'а
      // (иначе свайп вниз по барабану закрывал бы sheet вместо прокрутки колонок).
      data-bottom-sheet-no-drag
      data-test-id={dataTestId ?? TEST_IDS.root}
      {...extractSupportProps(rest)}
    >
      <div className={styles.selectedTime} data-test-id={TEST_IDS.selectedTime}>
        {selectedDateLabelDisplay !== '' && (
          <div className={styles.dateLabel} data-test-id={TEST_IDS.selectedDate}>
            {selectedDateLabelDisplay}
          </div>
        )}
        <div className={styles.timeRow}>
          <span className={styles.timeMain}>{timeDisplay.main}</span>
          {timeDisplay.secondsPart != null && <span className={styles.timeSeconds}>{timeDisplay.secondsPart}</span>}
        </div>
      </div>

      <div className={styles.drum} data-test-id={TEST_IDS.drum}>
        <TimePickerDrumWheelColumn
          ref={hoursColumnRef}
          className={styles.column}
          value={hours}
          options={hourValues}
          formatLabel={formatDisplayPart}
          height={pickerHeight}
          itemHeight={itemHeight}
          data-test-id={TEST_IDS.hoursColumn}
          onChange={onHoursChange}
        />
        <TimePickerDrumWheelColumn
          ref={minutesColumnRef}
          className={styles.column}
          value={minutes}
          options={minuteValues}
          formatLabel={formatDisplayPart}
          height={pickerHeight}
          itemHeight={itemHeight}
          data-test-id={TEST_IDS.minutesColumn}
          onChange={onMinutesChange}
        />
        {showSeconds && (
          <TimePickerDrumWheelColumn
            ref={secondsColumnRef}
            className={styles.column}
            value={seconds ?? 0}
            options={secondValues}
            formatLabel={formatDisplayPart}
            height={pickerHeight}
            itemHeight={itemHeight}
            data-test-id={TEST_IDS.secondsColumn}
            onChange={onSecondsChange ?? noop}
          />
        )}
      </div>
    </div>
  );
});
