import { Pagination, PAGINATION_SIZE, VARIANT } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  args: {
    total: 10,
    page: 3,
    size: PAGINATION_SIZE.S,
    variant: VARIANT.Button,
    maxLength: 7,
    onChange: fn(),
  },
  argTypes: {
    total: { control: { type: 'number', min: 1 }, description: 'Общее количество страниц' },
    page: { control: { type: 'number', min: 1 }, description: 'Текущая страница' },
    size: {
      control: 'radio',
      options: Object.values(PAGINATION_SIZE),
      description: 'Размер: s / m',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Тип кнопок: button / link',
    },
    maxLength: {
      control: { type: 'number', min: 5 },
      description: 'Максимальное количество элементов до свёртки',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  },
};
