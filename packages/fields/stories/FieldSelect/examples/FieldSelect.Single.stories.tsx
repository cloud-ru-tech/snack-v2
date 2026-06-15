import { FieldSelect, TEST_IDS } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const OPTIONS: ItemProps[] = [
  { id: 's', content: { option: 'Small (1 vCPU, 2 GB)' } },
  { id: 'm', content: { option: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { option: 'Large (4 vCPU, 8 GB)' } },
  { id: 'xl', content: { option: 'X-Large (8 vCPU, 16 GB)' } },
];

// Single-режим: значение — `ItemId | undefined`, потребитель ведёт его сам (controlled useState).
// Этот стейт нельзя выразить ни args Playground'а, ни строкой VisualMatrix — нужен живой сценарий.
function SingleDemo() {
  const [value, setValue] = useState<ItemId | undefined>('m');

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Single selection</DemoTitle>
        <DemoHint>
          Один выбор: значение — `ItemId | undefined`. Клик по пункту заменяет значение, кнопка очистки сбрасывает в
          `undefined`.
        </DemoHint>
        <DemoActions block>
          <FieldSelect
            data-test-id={TEST_IDS.fieldSelect}
            label='Instance size'
            placeholder='Choose…'
            items={OPTIONS}
            selection='single'
            value={value}
            onChange={setValue}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSelect> = {
  title: 'Components/Fields/FieldSelect/Examples/Single',
  component: FieldSelect,
  parameters: { layout: 'fullscreen' },
  render: () => <SingleDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldSelect>;

export const Single: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSelect)).toBeVisible();
  },
};
