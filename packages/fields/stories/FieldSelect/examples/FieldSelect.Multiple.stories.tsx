import { FieldSelect, TEST_IDS } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const OPTIONS: ItemProps[] = [
  { id: 'ru-central1-a', content: { option: 'ru-central1-a' } },
  { id: 'ru-central1-b', content: { option: 'ru-central1-b' } },
  { id: 'ru-central1-c', content: { option: 'ru-central1-c' } },
  { id: 'kz-central1-a', content: { option: 'kz-central1-a' } },
];

// Multiple-режим: значение — `ItemId[]`, выбранные показываются чипами (@ds/tag) внутри поля.
// Backspace удаляет последний чип; потребитель ведёт массив сам (controlled useState).
function MultipleDemo() {
  const [value, setValue] = useState<ItemId[]>(['ru-central1-a', 'ru-central1-b']);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Multiple selection</DemoTitle>
        <DemoHint>
          Множественный выбор: значение — `ItemId[]`, выбранное показывается чипами. Backspace на пустом вводе удаляет
          последний чип, кнопка очистки сбрасывает в `[]`.
        </DemoHint>
        <DemoActions block>
          <FieldSelect
            data-test-id={TEST_IDS.fieldSelect}
            label='Availability zones'
            placeholder='Add zones…'
            items={OPTIONS}
            selection='multiple'
            chips
            value={value}
            onChange={setValue}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSelect> = {
  title: 'Components/Fields/FieldSelect/Examples/Multiple',
  component: FieldSelect,
  parameters: { layout: 'fullscreen' },
  render: () => <MultipleDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldSelect>;

export const Multiple: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSelect)).toBeVisible();
  },
};
