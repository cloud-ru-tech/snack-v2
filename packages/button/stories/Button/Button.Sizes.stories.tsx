import { Button, SIZE } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Button size={SIZE.S} label='Small' />
      <Button size={SIZE.M} label='Medium' />
      <Button size={SIZE.L} label='Large' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole('button');
    expect(buttons).toHaveLength(3);
    for (const btn of buttons) {
      await expect(btn).toBeVisible();
    }
  },
};
