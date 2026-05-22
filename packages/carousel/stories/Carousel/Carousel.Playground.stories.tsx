import { Carousel, CONTROLS_VISIBILITY } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'fullscreen' },
  args: {
    showItems: 1,
    scrollBy: 1,
    transition: 0.4,
    swipe: true,
    arrows: true,
    pagination: true,
    infiniteScroll: false,
    autoSwipe: 0,
    swipeActivateLength: 48,
    gap: '0px',
    controlsVisibility: CONTROLS_VISIBILITY.hover,
    'data-test-id': TEST_IDS.root,
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
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Карусель слайдов со стрелками и пагинацией.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.container}>
            <Carousel {...args}>
              <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
              <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
              <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
            </Carousel>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
