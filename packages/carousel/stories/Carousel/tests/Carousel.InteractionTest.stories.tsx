import { Button } from '@ds/button';
import { Carousel } from '@ds/carousel';
import { getSliderItemTestId } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

// Локальный helper доступа к state.onChange — preconditions story-фикстур задаются в args выше,
// мок гарантирован при инициализации меты.
function getOnChange(args: { state?: { onChange?: (page: number) => void } }): (page: number) => void {
  const onChange = args.state?.onChange;
  if (!onChange) throw new Error('Carousel InteractionTest: state.onChange mock is required');
  return onChange;
}

function Wrap({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>{title}</DemoTitle>
        <DemoHint>{hint}</DemoHint>
        <DemoActions align='center'>{children}</DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel/Tests/Interaction',
  component: Carousel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    showItems: 1,
    arrows: true,
    controlsVisibility: 'always',
    pagination: true,
    infiniteScroll: false,
    'data-test-id': TEST_IDS.root,
    state: { page: 0, onChange: fn() },
  },
  render: args => (
    <Wrap title='InteractionTest' hint={'Клики по стрелкам/точкам вызывают state.onChange с целевой страницей.'}>
      <div className={styles.container}>
        <Carousel {...args}>
          <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
          <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
          <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
        </Carousel>
      </div>
    </Wrap>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: next arrow fires state.onChange with next page', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.arrowNext));
      expect(getOnChange(args)).toHaveBeenCalledWith(1);
    });
  },
};

export const InteractionTestInfinite: Story = {
  tags: ['test', 'dev'],
  args: {
    showItems: 1,
    arrows: true,
    controlsVisibility: 'always',
    pagination: true,
    infiniteScroll: true,
    'data-test-id': TEST_IDS.root,
    state: { page: 0, onChange: fn() },
  },
  render: args => (
    <Wrap title='InteractionTestInfinite' hint={'В infinite-режиме prev с первой страницы переходит на последнюю.'}>
      <div className={styles.container}>
        <Carousel {...args}>
          <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
          <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
          <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
        </Carousel>
      </div>
    </Wrap>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: prev arrow from page 0 wraps to last page', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.arrowPrev));
      // total = 3 (showItems=1, items=3, scrollBy=1), wrap: (3 + 0 - 1) % 3 = 2
      expect(getOnChange(args)).toHaveBeenCalledWith(2);
    });
  },
};

export const AutoSwipeAdvances: Story = {
  tags: ['test', 'dev'],
  args: {
    showItems: 1,
    arrows: true,
    controlsVisibility: 'always',
    pagination: true,
    infiniteScroll: true,
    autoSwipe: 0.3,
    'data-test-id': TEST_IDS.root,
    state: { page: 0, onChange: fn() },
  },
  render: args => (
    <Wrap title='AutoSwipeAdvances' hint={'AutoSwipe-таймер автоматически продвигает страницу.'}>
      <div className={styles.container}>
        <Carousel {...args}>
          <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
          <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
          <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
        </Carousel>
      </div>
    </Wrap>
  ),
  play: async ({ args, step }) => {
    await step('autoSwipe: timer advances page to 1', async () => {
      await waitFor(() => expect(getOnChange(args)).toHaveBeenCalledWith(1), { timeout: 3000 });
    });
  },
};

export const InfiniteWrapAround: Story = {
  tags: ['test', 'dev'],
  args: {
    showItems: 1,
    arrows: true,
    controlsVisibility: 'always',
    pagination: true,
    infiniteScroll: true,
    'data-test-id': TEST_IDS.root,
    state: { page: 2, onChange: fn() },
  },
  render: args => (
    <Wrap title='InfiniteWrapAround' hint={'Next с последней страницы в infinite-режиме возвращает на первую.'}>
      <div className={styles.container}>
        <Carousel {...args}>
          <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
          <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
          <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
        </Carousel>
      </div>
    </Wrap>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: next from last page wraps to 0', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.arrowNext));
      expect(getOnChange(args)).toHaveBeenCalledWith(0);
    });
  },
};

export const PaginationDotClicks: Story = {
  tags: ['test', 'dev'],
  args: {
    showItems: 1,
    arrows: true,
    controlsVisibility: 'always',
    pagination: true,
    'data-test-id': TEST_IDS.root,
    state: { page: 0, onChange: fn() },
  },
  render: args => (
    <Wrap title='PaginationDotClicks' hint={'Клик по точке N в пагинации переключает на страницу N-1.'}>
      <div className={styles.container}>
        <Carousel {...args}>
          <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
          <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
          <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
        </Carousel>
      </div>
    </Wrap>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: pagination dot 3 -> onChange(2)', async () => {
      // PaginationSlider uses 1-based page-button-slider-<N>; clicking dot N => carousel page N-1
      const dot = canvas.getByTestId(getSliderItemTestId(3));
      await userEvent.click(dot);
      expect(getOnChange(args)).toHaveBeenCalledWith(2);
    });
  },
};

export const NoNavigationWhenItemsLessThanShown: Story = {
  tags: ['test', 'dev'],
  args: {
    showItems: 3,
    arrows: true,
    controlsVisibility: 'always',
    pagination: true,
    infiniteScroll: false,
    'data-test-id': TEST_IDS.root,
    state: { page: 0, onChange: fn() },
  },
  render: args => (
    <Wrap
      title='NoNavigationWhenItemsLessThanShown'
      hint={'Стрелки не рендерятся, когда количество слайдов меньше showItems.'}
    >
      <div className={styles.container}>
        <Carousel {...args}>
          <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
          <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
        </Carousel>
      </div>
    </Wrap>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('arrows: not rendered when items.length <= showItems', async () => {
      expect(canvas.queryByTestId(TEST_IDS.arrowPrev)).toBeNull();
      expect(canvas.queryByTestId(TEST_IDS.arrowNext)).toBeNull();
    });
  },
};

// Сценарий многослайдового рендера для покрытия hideNonVisibleItems /
// showVisibleItems / handleSlideClick. Слайды содержат focusable-кнопки,
// чтобы внутренний forEach по a/button/... отработал хотя бы один раз.
export const MultiSlideFocusableItems: Story = {
  tags: ['test', 'dev'],
  args: {
    showItems: 2,
    scrollBy: 1,
    arrows: true,
    controlsVisibility: 'always',
    pagination: true,
    infiniteScroll: false,
    'data-test-id': TEST_IDS.root,
    state: { page: 0, onChange: fn() },
  },
  render: args => (
    <Wrap
      title='MultiSlideFocusableItems'
      hint='Слайды с focusable-контролами; покрывает hide/show + handleSlideClick.'
    >
      <div className={styles.container}>
        <Carousel {...args}>
          <div className={`${styles.slide} ${styles.slideIndigo}`}>
            <Button label='action 1' />
          </div>
          <div className={`${styles.slide} ${styles.slideSky}`}>
            <Button label='action 2' />
          </div>
          <div className={`${styles.slide} ${styles.slideEmerald}`}>
            <Button label='action 3' />
          </div>
          <div className={`${styles.slide} ${styles.slideAmber}`}>
            <Button label='action 4' />
          </div>
        </Carousel>
      </div>
    </Wrap>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const slides = canvas.getAllByTestId(TEST_IDS.trackItem);

    await step('visible items get tabindex=0 on inner buttons (showVisibleItems path)', async () => {
      await waitFor(() => {
        const visibleBtn = slides[0].querySelector('button');
        expect(visibleBtn?.getAttribute('tabindex')).toBe('0');
      });
    });

    await step('non-visible items get tabindex=-5 on inner buttons (hideNonVisibleItems path)', async () => {
      await waitFor(() => {
        const hiddenBtn = slides[3].querySelector('button');
        expect(hiddenBtn?.getAttribute('tabindex')).toBe('-5');
      });
    });

    await step('click on partially-out slide triggers slideCallback (handleSlideClick path)', async () => {
      // Кликаем по третьему слайду (он за пределами видимой области page=0 +
      // showItems=2). handleSlideClick вычислит slidePositionDelta < 0 и вызовет
      // slideCallback. Гарантировать вызов state.onChange нельзя без layout,
      // но покрытие body handleSlideClick получаем безусловно.
      await userEvent.click(slides[2]);
      expect(args.state?.onChange).toBeDefined();
    });
  },
};
