import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useMemo } from 'react';

import readme from '../../README.md?raw';
import { Carousel, type CarouselProps } from '../../src';
import { StoryCard } from './helperComponents';
import styles from './styles.module.scss';

const ITEMS_COUNT = 8;

function carouselChildren(count: number = ITEMS_COUNT): ReactElement[] {
  return Array.from({ length: count }, (_, i) => <StoryCard key={i} title={`Item ${i + 1}`} />);
}

function MatrixCarousel(props: Omit<CarouselProps, 'children'>) {
  const children = useMemo(() => carouselChildren(), []);
  return <Carousel {...props}>{children}</Carousel>;
}

const meta: Meta<CarouselProps> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    readme: { content: readme },
  },
};

export default meta;

type Story = StoryObj<CarouselProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div>
      <section className={styles.matrixSection} aria-labelledby='matrix-heading-arrows'>
        <h2 id='matrix-heading-arrows'>Видимость стрелок</h2>
        <div className={styles.matrixItem}>
          <h3>hover</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2.5} scrollBy={2} controlsVisibility='hover' />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>always</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2.5} scrollBy={2} controlsVisibility='always' />
          </div>
        </div>
      </section>

      <section className={styles.matrixSection} aria-labelledby='matrix-heading-nav'>
        <h2 id='matrix-heading-nav'>Навигация и свайп</h2>
        <div className={styles.matrixItem}>
          <h3>все</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} arrows pagination swipe />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>без стрелок</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} arrows={false} pagination swipe />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>без пагинации</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} arrows pagination={false} swipe />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>без свайпа</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} arrows pagination swipe={false} />
          </div>
        </div>
      </section>

      <section className={styles.matrixSection} aria-labelledby='matrix-heading-items'>
        <h2 id='matrix-heading-items'>Кол-во айтемов в слайде</h2>
        <div className={styles.matrixItem}>
          <h3>1</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={1} scrollBy={1} />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>1.5</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={1.5} scrollBy={1} />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>2</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>2.5</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2.5} scrollBy={2} />
          </div>
        </div>
      </section>

      <section className={styles.matrixSection} aria-labelledby='matrix-heading-infinite'>
        <h2 id='matrix-heading-infinite'>Цикличная прокрутка</h2>
        <div className={styles.matrixItem}>
          <h3>вкл</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} infiniteScroll />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>выкл</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} infiniteScroll={false} />
          </div>
        </div>
      </section>

      <section className={styles.matrixSection} aria-labelledby='matrix-heading-gap'>
        <h2 id='matrix-heading-gap'>Расстояние между айтемами</h2>
        <div className={styles.matrixItem}>
          <h3>по умолчанию</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} />
          </div>
        </div>
        <div className={styles.matrixItem}>
          <h3>24px</h3>
          <div className={styles.matrixDemo}>
            <MatrixCarousel showItems={2} scrollBy={1} gap='24px' />
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className={styles.matrixDecorator}>
        <Story />
      </div>
    ),
  ],
};
