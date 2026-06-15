import { DATE_MODE, DateValue, FieldDate, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

// Режим `date-time`: значение — `Date | undefined` с компонентой времени. Маска ДД.ММ.ГГГГ чч:мм:сс,
// календарь с пикером времени; новое значение эмитится по Apply.
function DateTimeDemo() {
  const [value, setValue] = useState<DateValue>(new Date(2026, 5, 15, 14, 30, 0));

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>DateTime</DemoTitle>
        <DemoHint>
          Дата со временем: маска ДД.ММ.ГГГГ чч:мм:сс (`showSeconds`), календарь с пикером времени и кнопкой Apply.
        </DemoHint>
        <DemoActions block>
          <FieldDate
            data-test-id={TEST_IDS.fieldDate}
            label='Дата и время'
            mode={DATE_MODE.DateTime}
            showSeconds
            value={value}
            onChange={setValue}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldDate> = {
  title: 'Components/Fields/FieldDate/Examples/DateTime',
  component: FieldDate,
  parameters: { layout: 'fullscreen' },
  render: () => <DateTimeDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldDate>;

export const DateTime: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDate)).toBeVisible();
  },
};
