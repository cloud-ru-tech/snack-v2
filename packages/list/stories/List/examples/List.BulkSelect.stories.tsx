import { FolderSVG } from '@ds/icons/interface/system';
import { ItemProps as Item, List, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

// Figma reference — listItemGroup со slotBulkSelectButton (group-select).
// Узел: https://www.figma.com/design/wKxqVGm5YH01EgQMBK4a3G/list?node-id=27832-59174.
const FIGMA_GROUP_SELECT_URL = 'https://www.figma.com/design/wKxqVGm5YH01EgQMBK4a3G/list?node-id=27832-59174';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/BulkSelect',
  component: List,
  parameters: { layout: 'fullscreen', design: { type: 'figma', url: FIGMA_GROUP_SELECT_URL } },
};

export default meta;
type Story = StoryObj<typeof List>;

const items: Item[] = [
  {
    type: 'group-select',
    id: 'group-projects',
    label: 'Projects',
    beforeContent: <FolderSVG />,
    groupVariant: 'subtitle',
    selectButtonLabel: 'Select all',
    items: [
      { id: 'p1', content: { option: 'Project alpha' } },
      { id: 'p2', content: { option: 'Project beta' } },
      { id: 'p3', content: { option: 'Project gamma' } },
      { id: 'p4', content: { option: 'Project delta' } },
    ],
  },
];

// Controlled group-select: bulk-кнопка переключает всю группу разом.
// `group-select` имеет смысл только в multiple-режиме (в single/none падает в обычный
// Separator без bulk-кнопки — см. rendering.spec).
function BulkSelectScenario() {
  const [value, setValue] = useState<Array<string | number>>(['p1']);
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Bulk select</DemoTitle>
        <DemoHint>group-select: bulk-кнопка выбирает/снимает всю группу (indeterminate → all → none).</DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List
              data-test-id={TEST_IDS.list.bulkSelectScenario}
              size='m'
              items={items}
              selection={{ mode: 'multiple', value, onChange: setValue }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const BulkSelect: Story = {
  tags: ['dev', 'test'],
  render: () => <BulkSelectScenario />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.list.bulkSelectScenario);
    const bulkButton = canvas.getByTestId(INTERNAL_TEST_IDS.bulkSelectButton);
    const itemId = (id: string) => `${INTERNAL_TEST_IDS.baseItem}_${id}`;
    const ids = ['p1', 'p2', 'p3', 'p4'];

    await step('starts partial (only p1 selected)', async () => {
      await expect(root).toBeVisible();
      await expect(canvas.getByTestId(itemId('p1'))).toHaveAttribute('data-checked', 'true');
      await expect(canvas.getByTestId(itemId('p2'))).not.toHaveAttribute('data-checked', 'true');
    });

    await step('bulk button from partial selects the whole group', async () => {
      await userEvent.click(bulkButton);
      for (const id of ids) {
        await expect(canvas.getByTestId(itemId(id))).toHaveAttribute('data-checked', 'true');
      }
    });

    await step('bulk button from all clears the whole group', async () => {
      await userEvent.click(bulkButton);
      for (const id of ids) {
        await expect(canvas.getByTestId(itemId(id))).not.toHaveAttribute('data-checked', 'true');
      }
    });
  },
};
