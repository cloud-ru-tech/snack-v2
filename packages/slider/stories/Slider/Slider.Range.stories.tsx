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

export const Range: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.item}>
      <Slider range min={0} max={100} defaultValue={[20, 70]} handleTip />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const sliders = within(canvasElement).getAllByRole('slider');
    expect(sliders.length).toBeGreaterThanOrEqual(2);
  },
};
