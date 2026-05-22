import { PAGINATION_SLIDER_SIZE, PaginationSlider } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PaginationSlider> = {
  title: 'Components/Pagination/PaginationSlider',
  component: PaginationSlider,
  parameters: { layout: 'fullscreen' },
  args: {
    total: 6,
    page: 2,
    size: PAGINATION_SLIDER_SIZE.Xs,
    onChange: fn(),
    'data-test-id': TEST_IDS.paginationSlider.root,
  },
  argTypes: {
    total: { control: { type: 'number', min: 1 }, description: 'Общее количество страниц' },
    page: { control: { type: 'number', min: 1 }, description: 'Текущая страница' },
    size: {
      control: 'radio',
      options: Object.values(PAGINATION_SLIDER_SIZE),
      description: 'Размер: xs / s',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationSlider>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Компактная пагинация-слайдер для небольших списков.</DemoHint>
        <DemoActions align='center'>
          <PaginationSlider {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.paginationSlider.root)).toBeVisible();
  },
};
