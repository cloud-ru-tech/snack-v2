import { DATE_MODE, DateRangeValue, FieldDate, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

// Режим `date-range`: значение — `[Date | undefined, Date | undefined]`. Два инпута «дата – дата»
// и общий календарь, выделяющий период (в т.ч. за границей месяца). Период может быть заполнен частично.
function RangeDemo() {
  const [value, setValue] = useState<DateRangeValue>([new Date(2026, 5, 10), new Date(2026, 6, 2)]);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Range</DemoTitle>
        <DemoHint>
          Период дат (`[Date?, Date?]`): инпуты «от – до» и календарь с выделением диапазона. Допускается частично
          заполненный период.
        </DemoHint>
        <DemoActions block>
          <FieldDate
            data-test-id={TEST_IDS.fieldDate}
            label='Период'
            mode={DATE_MODE.DateRange}
            value={value}
            onChange={setValue}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldDate> = {
  title: 'Components/Fields/FieldDate/Examples/Range',
  component: FieldDate,
  parameters: { layout: 'fullscreen' },
  render: () => <RangeDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldDate>;

export const Range: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDate)).toBeVisible();
  },
};
