import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { SLIDER_TEST_ID } from './testIds';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const marks = {
  0: '0',
  25: '25',
  50: '50',
  75: '75',
  100: '100',
};

export const WithMarks: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.item}>
      <Slider min={0} max={100} step={25} marks={marks} defaultValue={50} handleTip data-test-id={SLIDER_TEST_ID} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SLIDER_TEST_ID)).toBeVisible();
  },
};
