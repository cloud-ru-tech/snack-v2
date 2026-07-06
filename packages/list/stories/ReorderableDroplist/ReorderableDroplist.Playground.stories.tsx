import { Button, VIEW } from '@ds/button';
import { ReorderableDroplist, ReorderItem, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { REORDERABLE_ITEMS } from '../constants';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ReorderableDroplist> = {
  title: 'Components/List/ReorderableDroplist',
  component: ReorderableDroplist,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.M,
    placement: 'bottom-start',
    trigger: 'click',
    'data-test-id': TEST_IDS.reorderableDroplist.root,
  },
  argTypes: {
    // Открытие — действие по триггеру, а не arg (см. rules/trigger-based-stories.md).
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    // Порядок управляемый: живёт в локальном state render'а.
    items: { table: { disable: true } },
    onItemsReorder: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ReorderableDroplist>;

function PlaygroundRender(args: Parameters<typeof ReorderableDroplist>[0]) {
  const [items, setItems] = useState<ReorderItem[]>(REORDERABLE_ITEMS);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Откройте дроплист триггером и потяните строку за ручку слева — порядок сохраняется через onItemsReorder. Драг
          внутри поповера завершается по отпусканию кнопки: dnd-kit слушает mouseup на document, поэтому дроплист не
          гасит это событие.
        </DemoHint>
        <DemoActions align='center'>
          <ReorderableDroplist {...args} items={items} onItemsReorder={setItems}>
            <Button
              data-test-id={TEST_IDS.reorderableDroplist.triggerOpen}
              label='Открыть дроплист'
              view={VIEW.Outline}
              appearance='neutral'
              size='m'
            />
          </ReorderableDroplist>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.reorderableDroplist.triggerOpen)).toBeVisible();
  },
};
