import { APPEARANCE, Button } from '@ds/button';
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

export const Appearances: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Button appearance={APPEARANCE.Primary} label='Primary' />
      <Button appearance={APPEARANCE.Neutral} label='Neutral' />
      <Button appearance={APPEARANCE.Critical} label='Critical' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Primary' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Neutral' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Critical' })).toBeVisible();
  },
};
