import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { ChevronDownSVG, FunctionSettingsSVG, WatchSVG } from '@ds/icons';
import { ListProps } from '@ds/list';
import { useLayoutEffect } from '@ds/utils';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CALENDAR_MODE, SIZE, TEST_IDS, VIEW_MODE } from '../../constants';
import { useDateAndTime } from '../../hooks';
import { calendarLocale } from '../../locale';
import { BuildCellPropsFunction, CalendarMode, DateAndTime, PresetsOptions, Range, Size, ViewMode } from '../../types';
import { getLocale, getTestIdBuilder, normalizeRangeForMode } from '../../utils';
import { useRange } from '../CalendarBase/hooks';
import { CalendarContext, CalendarContextType } from '../CalendarContext';
import { MobileFooter } from '../MobileFooter';
import { MobilePeriodScroller } from '../MobilePeriodScroller';
import { MobilePresetsScreen } from '../MobilePresetsScreen';
import { MobileTimeScreen } from '../MobileTimeScreen';
import { getDefaultPresets } from '../PeriodPresetsList/utils';
import { TimePickerDrumHandle } from '../TimePickerDrum';
import { WeekRow } from '../WeekRow';
import { getLevelConfig } from './levelConfig';
import styles from './styles.module.scss';

type MobileScreen = 'calendar' | 'presets' | 'time';

/** Уровень, с которого открывается режим (как `CALENDAR_DEFAULT_MODE_MAP` десктопа). */
const INITIAL_LEVEL: Record<CalendarMode, ViewMode> = {
  [CALENDAR_MODE.Date]: VIEW_MODE.Month,
  [CALENDAR_MODE.DateTime]: VIEW_MODE.Month,
  [CALENDAR_MODE.DateRange]: VIEW_MODE.Month,
  [CALENDAR_MODE.Month]: VIEW_MODE.Year,
  [CALENDAR_MODE.MonthRange]: VIEW_MODE.Year,
  [CALENDAR_MODE.Year]: VIEW_MODE.Decade,
  [CALENDAR_MODE.YearRange]: VIEW_MODE.Decade,
};

export type MobileCalendarProps = {
  open: boolean;
  onClose(): void;
  mode: CalendarMode;
  size?: Size;
  today?: Date | number;
  showHolidays?: boolean;
  showSeconds?: boolean;
  buildCellProps?: BuildCellPropsFunction;
  locale?: Intl.Locale;
  presets?: PresetsOptions;
  value?: Range;
  defaultValue?: Range;
  onChangeValue(value: Range): void;
  onApply?(): void;
  onCurrent?(): void;
  closeOnApply?: boolean;
  closeOnPopstate?: boolean;
  'data-test-id'?: string;
};

const noop = () => {};
const refStub = { current: null };
const keyboardNavStub: NonNullable<ListProps['keyboardNavigationRef']> = { current: { focusItem: noop } };
const firstNotDisableCellStub: MutableRefObject<[number, number]> = { current: [0, 0] };

/**
 * Мобильная поверхность календаря в `BottomSheet`: скролл периодов (широкий диапазон), шапка-дропдаун
 * переключения уровня (month → year → decade), футер «Выбрано:» + Current/Apply. Единственный
 * `CalendarContext.Provider` оборачивает sheet (контекст проходит сквозь портал), поэтому селекция
 * сохраняется между экранами. Селекция/значение — общие с десктопом (`useRange`, `normalizeRangeForMode`).
 */
export function MobileCalendar({
  open,
  onClose,
  mode,
  size = SIZE.M,
  today: todayProp,
  showHolidays = false,
  showSeconds = true,
  buildCellProps,
  locale: localeProp,
  presets,
  value: valueProp,
  defaultValue,
  onChangeValue,
  onApply,
  onCurrent,
  closeOnApply = false,
  closeOnPopstate,
  'data-test-id': testId,
}: MobileCalendarProps) {
  const { t, lang: ctxLang } = calendarLocale.useTranslations();

  // Модель «черновик + один Apply» (FF-8654, #4/#5): правки (тап дня, скролл времени) пишутся в локальный
  // черновик, а наружу (`onChangeValue`) коммитятся ТОЛЬКО по «Применить». Закрытие/свайп = отмена (черновик
  // пересобирается из закоммиченного значения при следующем открытии).
  const [committedValue, commit] = useUncontrolledProp<Range | undefined>(valueProp, defaultValue, onChangeValue);
  // Актуальное закоммиченное значение для чтения в effect открытия без перезапуска на каждом его изменении.
  const committedRef = useRef(committedValue);
  committedRef.current = committedValue;
  // Черновик диапазона для режимов date/month/year/*-range (для date-time черновик — `dateAndTime` ниже).
  const [draftRange, setDraftRange] = useState<Range | undefined>(committedValue);
  const today = useMemo(() => (typeof todayProp === 'number' ? new Date(todayProp) : todayProp), [todayProp]);
  const [origin] = useState(() => committedValue?.[0] || today || new Date());
  const locale = useMemo(() => getLocale({ localeProp, ctxLang }), [ctxLang, localeProp]);
  // Ref барабана времени: форс-коммит незавершённого жеста при уходе с экрана времени (FF-8654, #2).
  const drumRef = useRef<TimePickerDrumHandle>(null);

  const [level, setLevel] = useState<ViewMode>(INITIAL_LEVEL[mode]);
  // anchorDate — период, на который центрируется скролл (drill/level-up/Current); меняется ТОЛЬКО при
  // навигации, не при свободном скролле и не при выборе видимого дня (иначе список «прыгал» бы).
  const [anchorDate, setAnchorDate] = useState<Date>(origin);
  // headerDate — период, который показывает селектор в шапке: это ВЫБРАННОЕ/наведённое значение
  // (а не состояние прокрутки). Обновляется при выборе, drill-навигации и Current.
  const [headerDate, setHeaderDate] = useState<Date>(origin);
  const [screen, setScreen] = useState<MobileScreen>('calendar');

  const setValue = useCallback((dates: Range) => setDraftRange(normalizeRangeForMode(mode, dates)), [mode]);

  const {
    dateAndTime,
    setDateAndTime,
    onTimeChange,
    onDateChange,
    onDateAndTimeChange,
    isDateFilled,
    isTimeFilled,
    isDateAndTimeFilled,
  } = useDateAndTime({ showSeconds, value: undefined });

  // Актуальный `dateAndTime` для снятия снапшота времени при входе на экран времени без лишних зависимостей.
  const dateAndTimeRef = useRef(dateAndTime);
  dateAndTimeRef.current = dateAndTime;
  // Снапшот времени на момент входа на экран времени: уход назад/свайпом откатывает правки барабана к нему
  // (время «применяется» ТОЛЬКО кнопкой Apply экрана времени, FF-8654, #4). null — вне экрана времени.
  const timeSnapshotRef = useRef<Pick<DateAndTime, 'hours' | 'minutes' | 'seconds'> | null>(null);

  // При каждом открытии sheet'а: возвращаем на главный экран (calendar) и начальный уровень (сброс
  // под-экрана времени/пресетов и уровня года/декады), пересобираем черновик из закоммиченного значения
  // (отмена незакоммиченных правок прошлой сессии) и центрируем скролл на ВЫБРАННОЕ значение (а не на
  // сегодня) — если значения нет, на origin. useLayoutEffect — до отрисовки открытия (без мелькания
  // под-экрана/компактной высоты и без рывка скролла).
  useLayoutEffect(() => {
    if (open) {
      const committed = committedRef.current;
      const target = committed?.[0] ?? origin;
      setScreen('calendar');
      setLevel(INITIAL_LEVEL[mode]);
      setAnchorDate(target);
      setHeaderDate(target);
      setDraftRange(committed);
      timeSnapshotRef.current = null;
      if (mode === CALENDAR_MODE.DateTime) {
        const c = committed?.[0];
        setDateAndTime(
          c
            ? {
                year: c.getFullYear(),
                month: c.getMonth(),
                day: c.getDate(),
                hours: c.getHours(),
                minutes: c.getMinutes(),
                seconds: c.getSeconds(),
              }
            : {},
        );
      }
    }
  }, [open, mode, origin, setDateAndTime]);

  // Вход на экран времени: снимаем снапшот времени (для отката при уходе назад без Apply).
  useEffect(() => {
    if (screen === 'time') {
      const { hours, minutes, seconds } = dateAndTimeRef.current;
      timeSnapshotRef.current = { hours, minutes, seconds };
    }
  }, [screen]);

  const { preselectedRange, startPreselect, continuePreselect, restartPreselect, completePreselect } = useRange({
    setValue,
  });

  // Значение для подсветки ячеек / строки «Выбрано» — из ЧЕРНОВИКА (live), а не из закоммиченного:
  // для date-time собирается из `dateAndTime`, для остальных режимов — `draftRange`.
  const selectionValue = useMemo<Range | undefined>(() => {
    if (mode === CALENDAR_MODE.DateTime) {
      if (!isDateFilled()) {
        return undefined;
      }
      const d = new Date(
        dateAndTime.year ?? 0,
        dateAndTime.month ?? 0,
        dateAndTime.day ?? 0,
        dateAndTime.hours ?? 0,
        dateAndTime.minutes ?? 0,
        showSeconds ? (dateAndTime.seconds ?? 0) : 0,
      );
      return [d, d];
    }
    return draftRange;
  }, [mode, draftRange, dateAndTime, isDateFilled, showSeconds]);

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const config = useMemo(() => getLevelConfig(level, origin, locale), [level, origin, locale]);

  const presetsItems = useMemo(() => {
    if (mode !== CALENDAR_MODE.DateRange || buildCellProps || !presets?.enabled) {
      return undefined;
    }
    if (presets.items && presets.items.length > 0) {
      return presets.items;
    }
    return getDefaultPresets(t, today);
  }, [mode, buildCellProps, presets, t, today]);

  const showPresetsAction = Boolean(presetsItems && presetsItems.length > 0);
  const showTimeAction = mode === CALENDAR_MODE.DateTime && level === VIEW_MODE.Month;

  const handlePresetSelect = useCallback(
    (range: Range) => {
      setValue(range);
      // Возврат на календарь центрирует скролл на начало выбранного диапазона (а не на origin):
      // скроллер при возврате ремаунтится и читает anchorDate, поэтому двигаем и его, и подпись шапки.
      const target = range[0];
      setAnchorDate(target);
      setHeaderDate(target);
      setScreen('calendar');
    },
    [setValue],
  );

  const handleBack = useCallback(() => {
    // Уход с экрана времени назад/свайпом/оверлеем = ОТКАТ: правки барабана не «применяются», время
    // возвращается к снапшоту на момент входа. Применить время можно только кнопкой Apply (FF-8654, #4).
    const snapshot = timeSnapshotRef.current;
    if (snapshot) {
      setDateAndTime(prev => ({ ...prev, ...snapshot }));
      timeSnapshotRef.current = null;
    }
    setScreen('calendar');
  }, [setDateAndTime]);

  // Apply на экране времени: фиксирует ПОКАЗАННОЕ время (включая нетронутые колонки) в черновик и
  // возвращает на календарь. В форму значение НЕ коммитит — это делает только Apply экрана календаря
  // (FF-8654, #4/#5: единая точка коммита — календарь; время применяется только по кнопке).
  const handleTimeApply = useCallback(() => {
    const flushed = drumRef.current?.flush();
    if (flushed) {
      onTimeChange({ hours: flushed.hours, minutes: flushed.minutes, seconds: flushed.seconds });
    }
    timeSnapshotRef.current = null;
    setScreen('calendar');
  }, [onTimeChange]);

  const handleSelect = useCallback(
    (date: Date) => {
      // Любой выбор/навигация переносит подпись шапки на этот период (selected, не scroll).
      setHeaderDate(date);

      if (level === VIEW_MODE.Decade) {
        if (mode === CALENDAR_MODE.YearRange) {
          preselectedRange ? completePreselect(date) : startPreselect(date);
        } else if (mode === CALENDAR_MODE.Year) {
          setValue([date, date]);
        } else {
          setAnchorDate(date);
          setLevel(VIEW_MODE.Year);
        }
        return;
      }

      if (level === VIEW_MODE.Year) {
        if (mode === CALENDAR_MODE.MonthRange) {
          preselectedRange ? completePreselect(date) : startPreselect(date);
        } else if (mode === CALENDAR_MODE.Month) {
          setValue([date, date]);
        } else {
          setAnchorDate(date);
          setLevel(VIEW_MODE.Month);
        }
        return;
      }

      // month level
      if (mode === CALENDAR_MODE.DateTime) {
        onDateChange(date);
        // Полный флоу: если время ещё не задано (свежее значение), сразу переводим на выбор времени.
        if (!isTimeFilled()) {
          setScreen('time');
        }
        return;
      }
      if (mode === CALENDAR_MODE.DateRange) {
        preselectedRange ? completePreselect(date) : startPreselect(date);
        return;
      }
      setValue([date, date]);
    },
    [level, mode, preselectedRange, completePreselect, startPreselect, setValue, onDateChange, isTimeFilled],
  );

  const levelUpDisabled = level === VIEW_MODE.Decade;

  const handleLevelUp = useCallback(() => {
    // Вверх по уровню — от периода, который показывает шапка (а не от позиции скролла).
    setAnchorDate(headerDate);
    setLevel(prev => (prev === VIEW_MODE.Month ? VIEW_MODE.Year : VIEW_MODE.Decade));
  }, [headerDate]);

  const applyDisabled = mode === CALENDAR_MODE.DateTime ? !isDateAndTimeFilled() : !draftRange;

  // Единственная точка коммита наружу (`onChangeValue`): собирает финальное значение из черновика.
  // Экран времени в форму НЕ коммитит (его Apply лишь фиксирует время в черновик и возвращает сюда);
  // коммит в форму — только здесь, кнопкой Apply экрана календаря (FF-8654, #4/#5).
  const handleApply = useCallback(() => {
    if (mode === CALENDAR_MODE.DateTime) {
      if (dateAndTime && isDateAndTimeFilled()) {
        const todayDate = today || new Date();
        const {
          year = todayDate.getFullYear(),
          month = todayDate.getMonth(),
          day = todayDate.getDate(),
          hours = 0,
          minutes = 0,
          seconds = 0,
        } = dateAndTime;
        const next = new Date(year, month, day, hours, minutes, showSeconds ? seconds : 0);
        commit(normalizeRangeForMode(mode, [next, next]));
      }
    } else if (draftRange) {
      commit(draftRange);
    }
    onApply?.();
    if (closeOnApply) {
      onClose();
    }
  }, [mode, dateAndTime, isDateAndTimeFilled, today, showSeconds, draftRange, commit, onApply, closeOnApply, onClose]);

  const handleCurrent = useCallback(() => {
    const todayDate = today || new Date();
    if (screen === 'time') {
      // На экране времени «Сейчас» правит только ВРЕМЯ в черновике (провизорно, как скролл барабана):
      // уход назад откатит его по снапшоту, фиксация — кнопкой Apply экрана времени.
      onTimeChange(todayDate);
      onCurrent?.();
      return;
    }
    if (mode === CALENDAR_MODE.DateTime) {
      // date-time: заполняем дату+время «сейчас» (значение коммитится по Apply календаря).
      onDateAndTimeChange(todayDate);
    } else {
      // Остальные режимы (date / month / year / *-range): выбираем текущий период.
      // `normalizeRangeForMode` приведёт к границам месяца/года для соответствующих режимов.
      setValue([todayDate, todayDate]);
    }
    setAnchorDate(new Date(todayDate));
    setHeaderDate(new Date(todayDate));
    setLevel(INITIAL_LEVEL[mode]);
    onCurrent?.();
  }, [today, screen, mode, onTimeChange, onDateAndTimeChange, setValue, onCurrent]);

  const contextValue = useMemo<CalendarContextType>(
    () => ({
      size,
      today,
      referenceDate: origin,
      viewDate: anchorDate,
      showHolidays,
      showSeconds,
      fitToContainer: true,
      value: selectionValue,
      firstNotDisableCell: firstNotDisableCellStub,
      mode,
      preselectedRange,
      viewMode: level,
      viewShift: 0,
      focus: undefined,
      locale,
      buildCellProps,
      setFocus: noop,
      setValue,
      setViewMode: noop,
      setViewShift: noop,
      startPreselect,
      restartPreselect,
      continuePreselect,
      completePreselect,
      getTestId,
      dateAndTime,
      onDateChange,
      onTimeChange,
      onDateAndTimeChange,
      isDateAndTimeFilled,
      isTimeFilled,
      isDateFilled,
      applyButtonRef: refStub,
      currentButtonRef: refStub,
      hoursKeyboardNavigationRef: keyboardNavStub,
      minutesKeyboardNavigationRef: keyboardNavStub,
      secondsKeyboardNavigationRef: keyboardNavStub,
    }),
    [
      size,
      today,
      origin,
      anchorDate,
      showHolidays,
      showSeconds,
      selectionValue,
      mode,
      preselectedRange,
      level,
      locale,
      buildCellProps,
      setValue,
      startPreselect,
      restartPreselect,
      continuePreselect,
      completePreselect,
      getTestId,
      dateAndTime,
      onDateChange,
      onTimeChange,
      onDateAndTimeChange,
      isDateAndTimeFilled,
      isTimeFilled,
      isDateFilled,
    ],
  );

  // Шапка календаря — три фиксированных слота: пресеты слева (зарезервировано), селектор уровня по
  // центру, время справа. Боковые слоты резервируют место (1fr) даже пустыми, чтобы селектор не «прыгал».
  const calendarTitle = (
    <div className={styles.headerRow}>
      <div className={styles.headerSlotStart}>
        {showPresetsAction && (
          <Button
            view='function'
            appearance='neutral'
            icon={<FunctionSettingsSVG />}
            aria-label={t('presets')}
            size={size}
            onClick={() => setScreen('presets')}
            data-test-id={TEST_IDS.calendarMobilePresetsButton}
          />
        )}
      </div>
      <div className={styles.headerSlotCenter}>
        <Button
          view='function'
          appearance='neutral'
          label={config.label(headerDate)}
          icon={levelUpDisabled ? undefined : <ChevronDownSVG />}
          iconPosition='after'
          size={size}
          disabled={levelUpDisabled}
          onClick={handleLevelUp}
          data-test-id={TEST_IDS.calendarMobileHeaderLevel}
        />
      </div>
      <div className={styles.headerSlotEnd}>
        {showTimeAction && (
          <Button
            view='function'
            appearance='neutral'
            icon={<WatchSVG />}
            aria-label={t('time')}
            size={size}
            onClick={() => setScreen('time')}
            data-test-id={TEST_IDS.calendarMobileTimeButton}
          />
        )}
      </div>
    </div>
  );

  const isTimeScreen = screen === 'time';
  const isPresetsScreen = screen === 'presets';

  return (
    <CalendarContext.Provider value={contextValue}>
      {/* Календарь + пресеты — full-height sheet (бесконечный скролл / длинный список). */}
      <BottomSheet
        open={open && !isTimeScreen}
        onClose={onClose}
        closeOnPopstate={closeOnPopstate}
        snapPoints={[1]}
        bodyPadding={false}
        withDividers
        data-test-id={testId}
        title={isPresetsScreen ? t('presets') : undefined}
        onBackButtonClick={isPresetsScreen ? handleBack : undefined}
        subHeadline={
          isPresetsScreen ? undefined : (
            <div className={styles.calendarHeader}>
              {calendarTitle}
              {level === VIEW_MODE.Month && (
                <div className={styles.weekRow}>
                  <WeekRow />
                </div>
              )}
            </div>
          )
        }
        content={
          isPresetsScreen ? (
            <MobilePresetsScreen items={presetsItems ?? []} onSelect={handlePresetSelect} />
          ) : (
            <MobilePeriodScroller
              key={level}
              level={level}
              config={config}
              size={size}
              anchorDate={anchorDate}
              onSelect={handleSelect}
            />
          )
        }
        footer={
          isPresetsScreen ? undefined : (
            <MobileFooter onApply={handleApply} onCurrent={handleCurrent} applyDisabled={applyDisabled} />
          )
        }
      />

      {/* Время (date-time) — отдельный компактный sheet по контенту (как timePickerBottomSheet в Figma),
          а не full-height: переключение по `screen` закрывает календарь и открывает компактный sheet.
          Apply (`handleTimeApply`) фиксирует показанное время в черновик и возвращает на календарь (в форму
          НЕ коммитит). Оверлей/свайп/Esc/стрелка назад (`handleBack`) — откат: время возвращается к снапшоту
          входа, шаг назад на календарь без применения (время применяется только кнопкой Apply, FF-8654 #4). */}
      <BottomSheet
        open={open && isTimeScreen}
        onClose={handleBack}
        closeOnPopstate={closeOnPopstate}
        title={t('time')}
        onBackButtonClick={handleBack}
        approveButton={{ label: t('apply'), onClick: handleTimeApply }}
        additionalButton={{ label: t('current'), view: 'function', onClick: handleCurrent }}
        footerTestIds={{ approve: TEST_IDS.calendarMobileApply, additional: TEST_IDS.calendarMobileCurrent }}
        content={<MobileTimeScreen size={size} drumRef={drumRef} />}
      />
    </CalendarContext.Provider>
  );
}
