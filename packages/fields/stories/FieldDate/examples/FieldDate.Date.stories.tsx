import { DATE_MODE, DateValue, FieldDate, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

// Режим `date`: значение — одиночная `Date | undefined`. Маска ДД.ММ.ГГГГ + календарь.
// Контролируемый стейт потребитель пишет сам — не выражается args Playground'а.
function DateDemo() {
  // `globalThis.Date`: экспорт стори `Date` затеняет глобальный конструктор в этом модуле.
  const [value, setValue] = useState<DateValue>(new globalThis.Date(2026, 5, 15));

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Date</DemoTitle>
        <DemoHint>Одиночная дата (`Date | undefined`): ввод по маске ДД.ММ.ГГГГ или выбор в календаре.</DemoHint>
        <DemoActions block>
          <FieldDate
            data-test-id={TEST_IDS.fieldDate}
            label='Дата'
            mode={DATE_MODE.Date}
            value={value}
            onChange={setValue}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldDate> = {
  title: 'Components/Fields/FieldDate/Examples/Date',
  component: FieldDate,
  parameters: { layout: 'fullscreen' },
  render: () => <DateDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldDate>;

export const Date: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDate)).toBeVisible();
  },
};
