import { ReorderableList, ReorderItem, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { REORDERABLE_ITEMS } from '../constants';
import styles from '../List/stories.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ReorderableList> = {
  title: 'Components/List/ReorderableList',
  component: ReorderableList,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.M,
    marker: true,
    'data-test-id': TEST_IDS.reorderableList.root,
  },
  argTypes: {
    // Порядок — управляемый: `items` живут в локальном state render'а, а `onItemsReorder` его
    // обновляет. Оба контрола показывали бы значение, которое story всё равно перезапишет.
    items: { table: { disable: true } },
    onItemsReorder: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ReorderableList>;

// Локальный state обязателен: `ReorderableList` не хранит порядок сам, без `onItemsReorder`
// в state строки визуально не переставятся (см. docs/reorder.mdx «Controlled vs uncontrolled»).
function PlaygroundRender(args: Parameters<typeof ReorderableList>[0]) {
  const [items, setItems] = useState<ReorderItem[]>(REORDERABLE_ITEMS);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Потяните строку за ручку слева. Новый порядок целиком приходит в onItemsReorder и сохраняется в state story.
          Перестановка идёт только среди «братьев» одного уровня; disabled-строка (Настройки) гасит клик, но не ручку.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <ReorderableList {...args} items={items} onItemsReorder={setItems} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.reorderableList.root)).toBeVisible();
  },
};
