import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SIZE } from '../../src';
import {
  TimePickerDrum,
  type TimePickerDrumCustomOptions,
  type TimePickerDrumProps,
} from '../../src/helperComponents/TimePickerDrum';
import { coerceStoryDate } from '../Calendar/helpers';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=12303-72025&m=dev';

/** Часы 9–13 и 15–19 для режима `allowed` в Playground. */
const PLAYGROUND_ALLOWED_HOURS = [9, 10, 11, 12, 13, 15, 16, 17, 18, 19] as const;

type CustomOptionsStoryMode = 'all' | 'allowed' | 'min';

/** Только дата для подписи (как в макете над `timeRow`). */
function formatDateOnlyFromCalendar(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function customOptionsForMode(mode: CustomOptionsStoryMode): TimePickerDrumCustomOptions | undefined {
  if (mode === 'all') {
    return undefined;
  }
  if (mode === 'allowed') {
    return { allowedHours: [...PLAYGROUND_ALLOWED_HOURS] };
  }
  return {
    minHour: 12,
    minMinute: 30,
    minSecond: 30,
  };
}

type StoryProps = Omit<TimePickerDrumProps, 'selectedDateLabel' | 'hours' | 'minutes' | 'seconds' | 'customOptions'> & {
  /** Как `dateValue` в Calendar Playground: контрол Storybook `date` (timestamp / Date). Опционально — без значения используется `new Date()`. */
  selectedDateLabelAt?: unknown;
  /** Режим `customOptions` у `TimePickerDrum`: без ограничений, whitelist часов или нижние границы часов/минут/секунд. */
  options: CustomOptionsStoryMode;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Calendar/Time Picker Drum',
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  args: {
    'data-test-id': TEST_IDS.timePickerDrum,
    size: SIZE.S,
    showSeconds: true,
    options: 'all',
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    options: {
      description:
        '`all` — без `customOptions`; `allowed` — часы только 9–13 и 15–19; `min` — часы с 12, минуты и секунды с 30.',
      control: 'radio',
      options: ['all', 'allowed', 'min'],
    },
    selectedDateLabelAt: {
      name: 'selectedDateLabel',
      description:
        'Дата для подписи над дисплеем (как `dateValue` в Calendar Playground). Если не задано — берётся текущий момент `new Date()` (с секундами). Не кладите `Date.now()` в `args`: контрол `date` в Storybook нормализует значение к полуночи и обнуляет время. При смене даты синхронизирует барабан.',
      control: { type: 'date' },
    },
    onHoursChange: { table: { disable: true } },
    onMinutesChange: { table: { disable: true } },
    onSecondsChange: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: function PlaygroundRender(args) {
    const { selectedDateLabelAt, options, ...pickerArgs } = args;

    const baseDate = useMemo(() => coerceStoryDate(selectedDateLabelAt) ?? new Date(), [selectedDateLabelAt]);

    const customOptions = useMemo(() => customOptionsForMode(options), [options]);

    const [hours, setHours] = useState(() => baseDate.getHours());
    const [minutes, setMinutes] = useState(() => baseDate.getMinutes());
    const [seconds, setSeconds] = useState(() => baseDate.getSeconds());

    useEffect(() => {
      setHours(baseDate.getHours());
      setMinutes(baseDate.getMinutes());
      setSeconds(baseDate.getSeconds());
    }, [baseDate]);

    const selectedDateLabel = useMemo(() => formatDateOnlyFromCalendar(baseDate), [baseDate]);

    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Барабанный пикер времени с подписью даты сверху.</DemoHint>
          <DemoActions align='center'>
            <div className={styles.storyWrapper}>
              <div className={styles.story}>
                <TimePickerDrum
                  {...pickerArgs}
                  customOptions={customOptions}
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                  selectedDateLabel={selectedDateLabel}
                  onHoursChange={setHours}
                  onMinutesChange={setMinutes}
                  onSecondsChange={setSeconds}
                />
              </div>
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.timePickerDrum)).toBeVisible();
  },
};
