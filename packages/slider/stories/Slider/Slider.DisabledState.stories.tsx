import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const DisabledState: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.item}>
      <Slider min={0} max={100} defaultValue={40} disabled />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('slider')).toBeVisible();
  },
};
