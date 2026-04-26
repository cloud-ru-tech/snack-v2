import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { BUTTON_TEST_ID } from './testIds';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FullWidth: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.narrow}>
      <Button fullWidth label='Continue' data-test-id={BUTTON_TEST_ID} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-full-width', 'true');
  },
};
