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

export const Infinite: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.container}>
      <Carousel infiniteScroll data-test-id={CAROUSEL_TEST_ID}>
        <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
        <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
        <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
        <div className={`${styles.slide} ${styles.slideAmber}`}>Slide 4</div>
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByTestId(CAROUSEL_TEST_ID)).toBeVisible();
  },
};
