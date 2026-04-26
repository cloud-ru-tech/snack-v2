import { Carousel, CONTROLS_VISIBILITY } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const AlwaysArrows: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.container}>
      <Carousel controlsVisibility={CONTROLS_VISIBILITY.always}>
        <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
        <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
        <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByText('Slide 1')).toBeVisible();
  },
};
