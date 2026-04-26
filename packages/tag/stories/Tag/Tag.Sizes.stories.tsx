import { SIZE, Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Tag size={SIZE.Xs} label='Extra small' />
      <Tag size={SIZE.S} label='Small' />
      <Tag size={SIZE.M} label='Medium' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Extra small')).toBeVisible();
    expect(within(canvasElement).getByText('Small')).toBeVisible();
    expect(within(canvasElement).getByText('Medium')).toBeVisible();
  },
};
