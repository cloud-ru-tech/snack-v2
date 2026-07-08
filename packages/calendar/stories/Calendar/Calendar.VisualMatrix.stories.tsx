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

// date + date-range — узкие режимы, живут в одной таблице.
function dateColumnsRow(size: Size): StoryTableRow {
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
    ],
  };
}

// date-time шире (календарь + тайм-панель): size L даёт ~504px, и вместе с date/date-range
// таблица переполняет вьюпорт → секцию обрезает справа. Выносим в отдельную StoryTable,
// чтобы кадр помещался целиком. `assertVisualMatrixSnapshot` склеит обе секции по вертикали.
function dateTimeRow(size: Size): StoryTableRow {
  return {
    variantLabel: `size ${size}`,
    cells: [
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
  <div className={styles.matrix}>
    <StoryTable
      sectionTitle='Calendar — размер × режим (date / date-range)'
      columnHeaders={['date', 'date-range']}
      firstColumnHeader='Variant'
      rows={sizes.map(dateColumnsRow)}
    />
    <StoryTable
      sectionTitle='Calendar — date-time (широкий режим)'
      columnHeaders={['date-time']}
      firstColumnHeader='Variant'
      rows={sizes.map(dateTimeRow)}
    />
  </div>
);

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: Template,
};
