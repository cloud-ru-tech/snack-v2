import { Carousel } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { CAROUSEL_TEST_ID } from './testIds';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const NoControls: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.containerNarrow}>
      <Carousel arrows={false} pagination={false} swipe data-test-id={CAROUSEL_TEST_ID}>
        <div className={`${styles.slide} ${styles.slidePink}`}>Swipe only 1</div>
        <div className={`${styles.slide} ${styles.slideSky}`}>Swipe only 2</div>
        <div className={`${styles.slide} ${styles.slideEmerald}`}>Swipe only 3</div>
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByTestId(CAROUSEL_TEST_ID)).toBeVisible();
  },
};
