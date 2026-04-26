import { Carousel, CONTROLS_VISIBILITY } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
  args: {
    showItems: 1,
    transition: 0.4,
    swipe: true,
    arrows: true,
    pagination: true,
    infiniteScroll: false,
    swipeActivateLength: 48,
    controlsVisibility: CONTROLS_VISIBILITY.hover,
  },
  argTypes: {
    showItems: { control: { type: 'number', min: 1, max: 6 } },
    scrollBy: { control: { type: 'number', min: 1, max: 6 } },
    transition: { control: { type: 'number', min: 0, step: 0.1 } },
    swipe: { control: 'boolean' },
    arrows: { control: 'boolean' },
    pagination: { control: 'boolean' },
    infiniteScroll: { control: 'boolean' },
    autoSwipe: { control: { type: 'number', min: 0, step: 1 } },
    swipeActivateLength: { control: { type: 'number', min: 0, step: 1 } },
    gap: { control: 'text' },
    controlsVisibility: {
      control: 'radio',
      options: Object.values(CONTROLS_VISIBILITY),
    },
  },
  render: args => (
    <div className={styles.container}>
      <Carousel {...args}>
        <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
        <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
        <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
      </Carousel>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Slide 1')).toBeVisible();
  },
};
