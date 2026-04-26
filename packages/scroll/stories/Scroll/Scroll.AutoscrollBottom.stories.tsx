import { AUTOSCROLL_TO, Scroll, ScrollProps } from '@ds/scroll';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { SCROLL_TEST_ID } from './testIds';

const content = (
  <div className={styles.scrollContent}>
    {Array.from({ length: 40 }, (_, i) => (
      <div key={i} className={styles.playgroundLine}>
        Message {i + 1}
      </div>
    ))}
  </div>
);

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll',
  component: Scroll,
};

export default meta;
type Story = StoryObj<ScrollProps>;

export const AutoscrollBottom: Story = {
  tags: ['dev'],
  render: () => (
    <Scroll autoscrollTo={AUTOSCROLL_TO.Bottom} className={styles.scroll} data-test-id={SCROLL_TEST_ID}>
      {content}
    </Scroll>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SCROLL_TEST_ID)).toBeVisible();
  },
};
