import { Carousel, CarouselProps, CONTROLS_VISIBILITY } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const SLIDE_COLORS = [
  styles.slideIndigo,
  styles.slideSky,
  styles.slideEmerald,
  styles.slideAmber,
  styles.slidePink,
] as const;

type StoryProps = CarouselProps & {
  itemsCount: number;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'fullscreen' },
  args: {
    showItems: 3,
    scrollBy: 3,
    transition: 0.4,
    swipe: true,
    arrows: true,
    pagination: true,
    infiniteScroll: false,
    autoSwipe: 0,
    swipeActivateLength: 48,
    gap: '',
    controlsVisibility: CONTROLS_VISIBILITY.hover,
    'data-test-id': TEST_IDS.root,
    itemsCount: 11,
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
    itemsCount: {
      name: '[Stories]: itemsCount',
      control: { type: 'number', min: 1, max: 20, step: 1 },
    },
  },
  render: ({ itemsCount, ...args }) => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Карусель слайдов со стрелками и пагинацией.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.container}>
            <Carousel {...args}>
              {Array.from({ length: itemsCount }, (_, i) => (
                <div key={i} className={`${styles.slide} ${SLIDE_COLORS[i % SLIDE_COLORS.length]}`}>
                  Slide {i + 1}
                </div>
              ))}
            </Carousel>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
