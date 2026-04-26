import { Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Removable: Story = {
  tags: ['dev', 'test'],
  args: { onDelete: fn() },
  render: args => (
    <div className={styles.row}>
      <Tag label='Удаляемый тег' onDelete={args.onDelete} />
      <Tag appearance='primary' label='Primary removable' onDelete={args.onDelete} />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click first remove', async () => {
      await userEvent.click(canvas.getAllByRole('button')[0]);
    });
    await step('onDelete fires', async () => {
      expect(args.onDelete).toHaveBeenCalled();
    });
  },
};
