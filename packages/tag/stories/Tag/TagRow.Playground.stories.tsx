import { SIZE, TagRow } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof TagRow> = {
  title: 'Components/Tag/TagRow',
  component: TagRow,
  parameters: { layout: 'centered' },
  args: {
    size: SIZE.Xs,
    items: [
      { id: '1', label: 'Frontend', appearance: 'blue' },
      { id: '2', label: 'Backend', appearance: 'green' },
      { id: '3', label: 'Design', appearance: 'violet' },
      { id: '4', label: 'Mobile', appearance: 'orange' },
    ],
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    rowLimit: { control: 'number' },
  },
  decorators: [
    Story => (
      <div className={styles.rowContainer}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TagRow>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Frontend')).toBeVisible();
  },
};
