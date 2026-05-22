import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Calendar, CALENDAR_MODE, Range, SIZE } from '../../../src';
import { CALENDAR_EXAMPLE_TEST_IDS } from '../../testIds';

const TODAY = new Date(2026, 3, 15);

const meta = {
  title: 'Components/Calendar/Calendar/Examples/RangeSelection',
  component: Calendar,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

/**
 * Range mode: клик start → клик end → проверка, что подсветка диапазона появилась
 * (cell с `data-range-position='start'`/`'end'`) и onChange вызван с tuple.
 */
// `tags: ['dev']` без `'test'`: play использует textual day lookup (см. TODO ниже) —
// до появления стабильных id ячеек play не запускается в Test Runner.
export const RangeSelection: Story = {
  tags: ['dev'],
  render: function RangeSelectionRender() {
    const [value, setValue] = useState<Range | undefined>(undefined);
    const onChangeValue = fn((next: Range) => setValue(next));

    return (
      <DemoPage>
        <DemoPanel width='wide'>
          <DemoTitle>RangeSelection</DemoTitle>
          <DemoHint>Выбор диапазона дат двумя кликами по календарю.</DemoHint>
          <DemoActions align='center'>
            <div data-test-id={CALENDAR_EXAMPLE_TEST_IDS.rangeRoot}>
              <Calendar
                data-test-id={CALENDAR_EXAMPLE_TEST_IDS.range}
                mode={CALENDAR_MODE.DateRange}
                size={SIZE.M}
                today={TODAY}
                value={value}
                onChangeValue={onChangeValue}
              />
              <div data-test-id={CALENDAR_EXAMPLE_TEST_IDS.rangeValue}>
                {value ? `${value[0].toISOString()}|${value[1].toISOString()}` : 'empty'}
              </div>
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // TODO: ячейки даты не имеют стабильного data-test-id (см. Item.tsx — дефолт 'item'),
    // потому фолбэк на текстовый поиск дня. Когда у пакета появятся id вида
    // 'calendar-range__cell-<yyyy-mm-dd>', play-функцию переписать на getByTestId.
    await step('selecting range start (day 10)', async () => {
      const root = canvas.getByTestId('calendar-range');
      const day10 = within(root).getAllByText('10')[0];
      day10.click();
    });

    await step('range start applies data-range-position', async () => {
      const startCells = canvasElement.querySelectorAll(
        '[data-range-position="start"], [data-range-position="start-end"]',
      );
      await expect(startCells.length).toBeGreaterThan(0);
    });
  },
};
