import { TagRow } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';

import styles from './stories.module.scss';
import { TAG_ROW_TEST_ID } from './testIds';

const meta: Meta<typeof TagRow> = {
  title: 'Components/Tag/TagRow',
  component: TagRow,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof TagRow>;

const items = [
  { id: '1', label: 'Frontend', appearance: 'blue' as const },
  { id: '2', label: 'Backend', appearance: 'green' as const },
  { id: '3', label: 'Design', appearance: 'violet' as const },
  { id: '4', label: 'DevOps', appearance: 'orange' as const },
  { id: '5', label: 'Mobile', appearance: 'pink' as const },
  { id: '6', label: 'Data', appearance: 'yellow' as const },
];

export const Truncated: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.rowNarrow}>
      <TagRow items={items} rowLimit={1} moreButtonLabel='+{count}' data-test-id={TAG_ROW_TEST_ID} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(canvasElement.firstElementChild).toBeTruthy();
  },
};
