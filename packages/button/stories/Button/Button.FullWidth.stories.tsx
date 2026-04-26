import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FullWidth: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.narrow}>
      <Button fullWidth label='Continue' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button')).toHaveAttribute('data-full-width', 'true');
  },
};
