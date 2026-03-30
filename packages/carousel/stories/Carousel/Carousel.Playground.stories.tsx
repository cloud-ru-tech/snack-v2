import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import readme from '../../README.md?raw';
import { Carousel, type CarouselProps } from '../../src';
import { CONTROLS_VISIBILITY } from '../../src/constants';
import { StoryCard } from './helperComponents';
import styles from './styles.module.scss';

type CarouselPlaygroundArgs = Omit<CarouselProps, 'children'> & {
  page?: number;
  itemsCount?: number;
};

const meta: Meta<CarouselPlaygroundArgs> = {
  title: 'Components/Carousel',
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5314-429&m=dev',
    },
  },
  args: {
    showItems: 2.5,
    scrollBy: 2,
    transition: 0.4,
    swipe: true,
    arrows: true,
    pagination: true,
    infiniteScroll: true,
    autoSwipe: 5,
    itemsCount: 12,
    page: 1,
    controlsVisibility: CONTROLS_VISIBILITY.hover,
    'data-test-id': undefined,
  },
  argTypes: {
    page: {
      name: '[Story]: pagination page as controlled state',
    },
    itemsCount: {
      name: '[Story]: count demo cards',
    },
    controlsVisibility: {
      control: 'select',
      options: Object.values(CONTROLS_VISIBILITY),
    },
  },
};

export default meta;

type Story = StoryObj<CarouselPlaygroundArgs>;

function CarouselPlayground({ page: pageProp, itemsCount, ...args }: CarouselPlaygroundArgs) {
  const [page, setPage] = useState<number>(pageProp ? pageProp - 1 : 0);

  useEffect(() => {
    setPage(pageProp ? pageProp - 1 : 0);
  }, [pageProp]);

  return (
    <div className={styles.wrapper}>
      <Carousel
        {...args}
        state={{
          page,
          onChange: setPage,
        }}
      >
        {Array.from({ length: itemsCount ?? 12 }).map((_, i) => (
          <StoryCard key={i} title={`Item ${i + 1}`} />
        ))}
      </Carousel>

      <span data-test-id='carousel__hidden-page-counter' className={styles.hiddenPageCounter}>
        {page + 1}
      </span>
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: args => <CarouselPlayground {...args} />,
};
