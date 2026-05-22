import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StoryTable, StoryTableRow } from '#storybook/components';

import calendarReadme from '../../README.md?raw';
import { Calendar, CALENDAR_MODE, SIZE } from '../../src';
import { Range, Size } from '../../src/types';
import styles from './styles.module.scss';

const meta = {
  title: 'Components/Calendar/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    readme: { content: calendarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3839-193281&m=dev',
    },
  },
  args: {},
} satisfies Meta;

export default meta;

type Story = StoryObj;

/** Фиксированные даты для стабильных скриншотов визуальной регрессии */
const refToday = new Date(2026, 3, 15);
const locale = new Intl.Locale('ru-RU');

const sizes = Object.values(SIZE);

const dateValue = new Date(2026, 3, 10);
const dateTimeValue = new Date(2026, 3, 10, 14, 30, 0);
const rangeShort: Range = [new Date(2026, 3, 5), new Date(2026, 3, 25)];

function matrixRow(size: Size): StoryTableRow {
  return {
    variantLabel: `size ${size}`,
    cells: [
      <div key='date' className={styles.cell}>
        <Calendar
          data-test-id={`calendar-matrix-date-${size}`}
          fitToContainer={false}
          locale={locale}
          mode={CALENDAR_MODE.Date}
          size={size}
          today={refToday}
          value={dateValue}
        />
      </div>,
      <div key='date-range' className={styles.cell}>
        <Calendar
          data-test-id={`calendar-matrix-date-range-${size}`}
          fitToContainer={false}
          locale={locale}
          mode={CALENDAR_MODE.DateRange}
          size={size}
          today={refToday}
          value={rangeShort}
        />
      </div>,
      <div key='date-time' className={styles.cell}>
        <Calendar
          data-test-id={`calendar-matrix-date-time-${size}`}
          fitToContainer={false}
          locale={locale}
          mode={CALENDAR_MODE.DateTime}
          showSeconds
          size={size}
          today={refToday}
          value={dateTimeValue}
        />
      </div>,
    ],
  };
}

const Template: StoryFn = () => (
  <StoryTable
    sectionTitle='Calendar — размер × режим (date / date-range / date-time)'
    columnHeaders={['date', 'date-range', 'date-time']}
    firstColumnHeader='Variant'
    rows={sizes.map(size => matrixRow(size))}
  />
);

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: Template,
};
