import { Scroll } from '@ds/scroll';
import { StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import calendarReadme from '../../README.md?raw';
import { Calendar, CALENDAR_MODE, CalendarMode, CalendarProps, Range, SIZE, Size } from '../../src';
import { TEST_IDS } from '../testIds';
import {
  CalendarStoryBuildCellPropsMode,
  coerceStoryDate,
  getBuildCellProps,
  parseDefaultValueFromStory,
  parseValueFromStory,
} from './helpers';
import styles from './styles.module.scss';
import { ControlledValue } from './types.ts';

const SCROLL_SIZE = {
  [SIZE.S]: styles.scrollS,
  [SIZE.M]: styles.scrollM,
  [SIZE.L]: styles.scrollL,
};

const meta = {
  title: 'Components/Calendar/Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
    readme: { content: calendarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3839-193281&m=dev',
    },
  },
};

type StoryProps = {
  mode: CalendarMode;
  size: Size;
  localeName?: string;
  /** `today`: контрол Storybook типа date */
  dateToday: unknown;
  /** Одна дата: контрол date (value) */
  dateValue: unknown;
  /** Одна дата: default для uncontrolled, только `date` / `date-time` (как в migration story) */
  dateDefaultValue: unknown;
  rangeValueStart: unknown;
  rangeValueEnd: unknown;
  rangeDefaultValueStart: unknown;
  rangeDefaultValueEnd: unknown;
  showPeriodPresets: boolean;
  showSeconds: boolean;
  showHolidays: boolean;
  fitToContainer: boolean;
  withFixedSizes: boolean;
  withBackground: boolean;
  /** Колбэк ячеек для сценариев E2E / migration (`for-tests`, `disable-past`). */
  modeBuildCellProps: CalendarStoryBuildCellPropsMode;
};

const Template: StoryFn<StoryProps> = ({
  mode,
  size,
  localeName,
  dateToday,
  dateValue,
  dateDefaultValue,
  rangeValueStart,
  rangeValueEnd,
  rangeDefaultValueStart,
  rangeDefaultValueEnd,
  showPeriodPresets,
  showSeconds,
  showHolidays,
  fitToContainer,
  withFixedSizes,
  withBackground,
  modeBuildCellProps,
}: StoryProps) => {
  const today = coerceStoryDate(dateToday);

  const defaultFromControls = parseDefaultValueFromStory(
    mode,
    dateDefaultValue,
    rangeDefaultValueStart,
    rangeDefaultValueEnd,
  );

  const [selectedValue, setSelectedValue] = useState<ControlledValue>(() => {
    const fromValue = parseValueFromStory(mode, dateValue, rangeValueStart, rangeValueEnd);
    return fromValue ?? defaultFromControls;
  });

  useEffect(() => {
    const nextValue = parseValueFromStory(mode, dateValue, rangeValueStart, rangeValueEnd);
    const nextDefault = parseDefaultValueFromStory(
      mode,
      dateDefaultValue,
      rangeDefaultValueStart,
      rangeDefaultValueEnd,
    );
    setSelectedValue(nextValue ?? nextDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- намеренно только `mode`; иначе любое изменение контролов сбрасывает выбор из UI
  }, [mode]);

  const onChangeValue = (v: Date | Range) => {
    setSelectedValue(v);
  };

  const presets = mode === CALENDAR_MODE.DateRange && showPeriodPresets ? { enabled: true } : undefined;

  const common = {
    size,
    locale: localeName ? new Intl.Locale(localeName) : undefined,
    today,
    showHolidays,
    fitToContainer,
    buildCellProps: getBuildCellProps(modeBuildCellProps),
    'data-test-id': TEST_IDS.calendarPlayground,
  };

  let calendar: CalendarProps;

  switch (mode) {
    case CALENDAR_MODE.Date:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.Date,
        value: selectedValue as Date | undefined,
        defaultValue: defaultFromControls as Date | undefined,
        onChangeValue: onChangeValue,
      };
      break;
    case CALENDAR_MODE.DateTime:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.DateTime,
        value: selectedValue as Date | undefined,
        defaultValue: defaultFromControls as Date | undefined,
        onChangeValue: onChangeValue,
        showSeconds,
      };
      break;
    case CALENDAR_MODE.DateRange:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.DateRange,
        value: selectedValue as Range | undefined,
        defaultValue: defaultFromControls as Range | undefined,
        onChangeValue: onChangeValue,
        presets,
      };
      break;
    case CALENDAR_MODE.Month:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.Month,
        value: selectedValue as Date | undefined,
        onChangeValue: onChangeValue,
      };
      break;
    case CALENDAR_MODE.MonthRange:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.MonthRange,
        value: selectedValue as Range | undefined,
        defaultValue: defaultFromControls as Range | undefined,
        onChangeValue: onChangeValue,
      };
      break;
    case CALENDAR_MODE.Year:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.Year,
        value: selectedValue as Date | undefined,
        onChangeValue: onChangeValue,
      };
      break;
    case CALENDAR_MODE.YearRange:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.YearRange,
        value: selectedValue as Range | undefined,
        defaultValue: defaultFromControls as Range | undefined,
        onChangeValue: onChangeValue,
      };
      break;
    default:
      calendar = {
        ...common,
        mode: CALENDAR_MODE.Date,
        value: selectedValue as Date | undefined,
        defaultValue: defaultFromControls as Date | undefined,
        onChangeValue: onChangeValue,
      };
  }

  const singleValueMs = selectedValue instanceof Date && selectedValue.valueOf();
  const rangeStartValueMs = Array.isArray(selectedValue) && selectedValue[0].valueOf();
  const rangeEndValueMs = Array.isArray(selectedValue) && selectedValue[1].valueOf();

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Календарь: date / date-time / date-range / month / month-range / year / year-range.</DemoHint>
        <DemoActions align='center'>
          <div
            key={mode}
            className={cn(styles.story, withFixedSizes && SCROLL_SIZE[size || SIZE.S])}
            data-view-mode={mode}
            data-with-presets={Boolean(presets) || undefined}
            data-with-background={withBackground || undefined}
          >
            <Scroll>
              <Calendar {...calendar} />
            </Scroll>

            <div className={styles.valueHolder} data-test-id={TEST_IDS.calendarValueHolder}>
              {singleValueMs}
              {rangeStartValueMs}
              {rangeEndValueMs}
            </div>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    mode: CALENDAR_MODE.Date,
    size: SIZE.S,
    withFixedSizes: true,
    showPeriodPresets: false,
    fitToContainer: true,
    withBackground: true,
    dateToday: new Date(Date.UTC(2026, 3, 15)).valueOf(),
    dateValue: new Date(Date.UTC(2026, 3, 10)).valueOf(),
    dateDefaultValue: undefined,
    rangeValueStart: new Date(Date.UTC(2026, 3, 1)).valueOf(),
    rangeValueEnd: new Date(Date.UTC(2026, 3, 20)).valueOf(),
    rangeDefaultValueStart: undefined,
    rangeDefaultValueEnd: undefined,
    showSeconds: true,
    showHolidays: false,
    localeName: undefined,
    modeBuildCellProps: 'none',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: Object.values(CALENDAR_MODE),
    },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
    },
    localeName: {
      control: 'select',
      options: ['ru-RU', 'en-US'],
      description: 'Локаль (оверрайдит значение из LocaleProvider/настройки сторибука)',
    },
    dateToday: {
      control: { type: 'date' },
    },
    dateValue: {
      name: 'value',
      description: 'Контролируемое value для одной даты (date, date-time, month, year)',
      control: { type: 'date' },
      if: { arg: 'mode', neq: CALENDAR_MODE.DateRange },
    },
    dateDefaultValue: {
      name: 'defaultValue',
      description: 'Только для режимов `date` и `date-time` (как в migration story)',
      control: { type: 'date' },
      if: { arg: 'mode', neq: CALENDAR_MODE.DateRange },
    },
    rangeValueStart: {
      name: 'value start',
      description: 'Начало диапазона (date-range, month-range, year-range)',
      control: { type: 'date' },
    },
    rangeValueEnd: {
      name: 'value end',
      description: 'Конец диапазона',
      control: { type: 'date' },
    },
    rangeDefaultValueStart: {
      name: 'defaultValue start',
      description: 'Default для uncontrolled в режимах диапазона',
      control: { type: 'date' },
    },
    rangeDefaultValueEnd: {
      name: 'defaultValue end',
      control: { type: 'date' },
    },
    showPeriodPresets: {
      name: '[Stories]: Show period presets for data-range mode',
      if: { arg: 'mode', eq: CALENDAR_MODE.DateRange },
    },
    showSeconds: {
      if: { arg: 'mode', eq: CALENDAR_MODE.DateTime },
    },
    withFixedSizes: {
      name: '[Stories]: Enable fixed sizes of story wrapper',
      control: { type: 'boolean' },
    },
    withBackground: {
      name: '[Stories]: Enable white background for story wrapper',
      control: { type: 'boolean' },
    },
    modeBuildCellProps: {
      name: '[Stories]: buildCellProps preset',
      control: 'select',
      options: ['none', 'for-tests', 'disable-past'],
      description:
        '`for-tests` отключает числа 1–13 в месячном виде (как migration E2E); `disable-past` — прошлые даты.',
    },
  },
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.calendarPlayground)).toBeVisible();
  },
};
