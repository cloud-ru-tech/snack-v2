import { PAGINATION_SLIDER_SIZE, PaginationSlider } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

const meta: Meta<typeof PaginationSlider> = {
  title: 'Components/Pagination/PaginationSlider',
  component: PaginationSlider,
  parameters: { layout: 'centered' },
  args: {
    total: 6,
    page: 2,
    size: PAGINATION_SLIDER_SIZE.Xs,
    onChange: fn(),
    'data-test-id': 'pagination-slider',
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
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('pagination-slider')).toBeVisible();
  },
};
