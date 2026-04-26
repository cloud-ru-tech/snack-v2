import { Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tag',
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
      <Tag label='Удаляемый тег' onDelete={args.onDelete} data-test-id='tag-removable-neutral' />
      <Tag
        appearance='primary'
        label='Primary removable'
        onDelete={args.onDelete}
        data-test-id='tag-removable-primary'
      />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click first remove', async () => {
      const firstRemoveButton = within(canvas.getByTestId('tag-removable-neutral')).getByTestId('tag-remove-button');
      await userEvent.click(firstRemoveButton);
    });
    await step('onDelete fires', async () => {
      expect(args.onDelete).toHaveBeenCalled();
    });
  },
};
