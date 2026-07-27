import { Button } from '@ds/button';
import { Divider } from '@ds/divider';
import { ChevronDownSVG } from '@ds/icons/interface/system';
import { ListProps } from '@ds/list';
import { extractSupportProps, useUncontrolledProp, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties, ReactNode, RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { AUTOFOCUS, CALENDAR_MODE, SIZE, VIEW_MODE } from '../../constants';
import { useDateAndTime } from '../../hooks';
import { calendarLocale } from '../../locale';
import {
  BuildCellPropsFunction,
  CalendarMode,
  FocusDirection,
  PresetsOptions,
  Range,
  Size,
  ViewMode,
} from '../../types';
import { getLocale, getTestIdBuilder, normalizeRangeForMode } from '../../utils';
import { CalendarBody } from '../CalendarBody';
import { CalendarContext, CalendarContextType } from '../CalendarContext';
import { Header } from '../Header';
import { PeriodPresetsList } from '../PeriodPresetsList';
import { getDefaultPresets } from '../PeriodPresetsList/utils';
import { TimePickerBase } from '../TimePickerBase';
import { useGetViewDate, useRange } from './hooks';
import styles from './styles.module.scss';

export type CalendarBaseProps = WithSupportProps<{
  mode: CalendarMode;
  onChangeValue(value: Range): void;
  onFocusLeave?(direction: FocusDirection): void;
  size?: Size;
  value?: Range;
  today?: Date | number;
  buildCellProps?: BuildCellPropsFunction;
  showHolidays?: boolean;
  showSeconds?: boolean;
  style?: CSSProperties;
  className?: string;
  defaultValue?: Range;
  fitToContainer?: boolean;
  autofocus?: boolean;
  locale?: Intl.Locale;
  navigationStartRef?: RefObject<{ focus(): void }>;
  presets?: PresetsOptions;
  /** Рендерится после основной разметки календаря, внутри `CalendarContext` (например футер с Apply в дропдауне). */
  bottomSlot?: ReactNode;
}>;

const CALENDAR_DEFAULT_MODE_MAP: Record<CalendarMode, ViewMode> = {
  [CALENDAR_MODE.Date]: VIEW_MODE.Month,
  [CALENDAR_MODE.DateTime]: VIEW_MODE.Month,
  [CALENDAR_MODE.DateRange]: VIEW_MODE.Month,
  [CALENDAR_MODE.MonthRange]: VIEW_MODE.Year,
  [CALENDAR_MODE.Month]: VIEW_MODE.Year,
  [CALENDAR_MODE.YearRange]: VIEW_MODE.Decade,
  [CALENDAR_MODE.Year]: VIEW_MODE.Decade,
};

export function CalendarBase({
  className,
  mode,
  size = SIZE.M,
  autofocus,
  fitToContainer = true,
  value: valueProp,
  defaultValue,
  onChangeValue,
  today: todayProp,
  showHolidays = false,
  showSeconds = true,
  style,
  locale: localeProp,
  onFocusLeave,
  buildCellProps,
  'data-test-id': testId,
  navigationStartRef,
  presets,
  bottomSlot,
  ...rest
}: CalendarBaseProps) {
  const { t, lang: ctxLang } = calendarLocale.useTranslations();

  const [viewMode, setViewMode] = useState<ViewMode>(CALENDAR_DEFAULT_MODE_MAP[mode]);
  const [viewShift, setViewShift] = useState<number>(0);
  const [value, setValueState] = useUncontrolledProp<Range | undefined>(valueProp, defaultValue, onChangeValue);
  const today = useMemo(() => (typeof todayProp === 'number' ? new Date(todayProp) : todayProp), [todayProp]);
  const [referenceDate] = useState(value?.[0] || today || new Date());
  const viewDate = useGetViewDate(referenceDate, viewMode, viewShift);
  const [focus, setFocus] = useState<string | undefined>(autofocus ? AUTOFOCUS : undefined);

  const {
    dateAndTime,
    onTimeChange,
    onDateChange,
    onDateAndTimeChange,
    isDateFilled,
    isTimeFilled,
    isDateAndTimeFilled,
  } = useDateAndTime({ showSeconds, value: mode === CALENDAR_MODE.DateTime ? value : undefined });

  const applyButtonRef = useRef<HTMLButtonElement>(null);
  const currentButtonRef = useRef<HTMLButtonElement>(null);
  const hoursKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const minutesKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const secondsKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });

  const setValue = useCallback(
    (dates: Range) => {
      setValueState(normalizeRangeForMode(mode, dates));
    },
    [mode, setValueState],
  );

  const { preselectedRange, continuePreselect, completePreselect, restartPreselect, startPreselect } = useRange({
    setValue,
  });

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const locale = useMemo(() => getLocale({ localeProp, ctxLang }), [ctxLang, localeProp]);

  const firstNotDisableCell = useRef<[number, number]>([0, 0]);

  const presetsItems = useMemo(() => {
    if (!presets?.enabled) {
      return undefined;
    }

    if (presets?.items && presets.items.length > 0) {
      return presets.items;
    }

    return getDefaultPresets(t, today);
  }, [presets, t, today]);

  const showPresets =
    mode === CALENDAR_MODE.DateRange && !buildCellProps && presets?.enabled && presetsItems && presetsItems?.length > 0; // TODO PDS-3139
  const showTimePicker = mode === CALENDAR_MODE.DateTime && viewMode === VIEW_MODE.Month;

  const onPresetClick = useCallback(
    (selectedPeriod: Range) => {
      setValue(selectedPeriod);
    },
    [setValue],
  );

  const calendarContextValue = useMemo<CalendarContextType>(
    () => ({
      locale,
      size,
      value,
      firstNotDisableCell,
      fitToContainer,
      today,
      showHolidays,
      viewDate,
      referenceDate,
      preselectedRange,
      mode,
      viewMode,
      viewShift,
      focus,
      setValue,
      setViewMode,
      setViewShift,
      startPreselect,
      continuePreselect,
      completePreselect,
      restartPreselect,
      setFocus,
      getTestId,
      onFocusLeave,
      buildCellProps,
      navigationStartRef,
      showSeconds,
      dateAndTime,
      onTimeChange,
      onDateChange,
      onDateAndTimeChange,
      isDateAndTimeFilled,
      isDateFilled,
      isTimeFilled,
      applyButtonRef,
      currentButtonRef,
      hoursKeyboardNavigationRef,
      minutesKeyboardNavigationRef,
      secondsKeyboardNavigationRef,
    }),
    [
      applyButtonRef,
      buildCellProps,
      completePreselect,
      continuePreselect,
      dateAndTime,
      firstNotDisableCell,
      fitToContainer,
      focus,
      getTestId,
      isDateAndTimeFilled,
      isDateFilled,
      isTimeFilled,
      locale,
      mode,
      navigationStartRef,
      onDateAndTimeChange,
      onDateChange,
      onFocusLeave,
      onTimeChange,
      preselectedRange,
      referenceDate,
      restartPreselect,
      setFocus,
      setValue,
      setViewMode,
      setViewShift,
      showHolidays,
      showSeconds,
      size,
      startPreselect,
      today,
      value,
      viewDate,
      viewMode,
      viewShift,
    ],
  );

  return (
    <div
      className={cn(styles.root, className)}
      data-fit-to-container={fitToContainer || undefined}
      data-mode={mode}
      data-show-holidays={showHolidays || undefined}
      data-show-seconds={mode === CALENDAR_MODE.DateTime ? String(showSeconds) : undefined}
      data-size={size}
      data-test-id={testId}
    >
      <CalendarContext.Provider value={calendarContextValue}>
        <div className={styles.dateWrapper}>
          {showPresets && (
            <>
              <div className={styles.leftPanel}>
                <div className={styles.leftPanelHeader} data-size={size}>
                  <Button
                    label={t('presets')}
                    view='function'
                    appearance='neutral'
                    icon={<ChevronDownSVG />}
                    iconPosition='after'
                    size={size}
                    data-test-id={getTestId('presets-header')}
                  />
                </div>
                <Divider orientation='horizontal' />
                <PeriodPresetsList
                  items={presetsItems}
                  className={styles.presetsList}
                  onChange={onPresetClick}
                  data-test-id={getTestId('presets')}
                />
              </div>
              <div className={styles.verticalDividerWrap}>
                <Divider orientation='vertical' />
              </div>
            </>
          )}
          <div
            className={styles.calendarWrapper}
            {...extractSupportProps(rest)}
            style={style}
            data-fit-to-container={fitToContainer || undefined}
          >
            <Header />

            <Divider orientation='horizontal' />

            <div className={styles.body} data-size={size} data-fit-to-container={fitToContainer || undefined}>
              <CalendarBody />
            </div>
          </div>

          {showTimePicker && (
            <>
              <div className={styles.verticalDividerWrap}>
                <Divider orientation='vertical' />
              </div>
              <TimePickerBase fixedWidth />
            </>
          )}
        </div>
        {bottomSlot}
      </CalendarContext.Provider>
    </div>
  );
}
