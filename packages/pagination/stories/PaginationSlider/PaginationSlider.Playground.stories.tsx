import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import readme from '../../README.md?raw';
import { PAGINATION_SLIDER_SIZE, PaginationSlider, type PaginationSliderProps } from '../../src';

const meta: Meta<PaginationSliderProps> = {
  title: 'Components/Pagination/Pagination Slider',
  component: PaginationSlider,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5707-1749&m=dev',
    },
  },
  args: {
    'data-test-id': 'pagination-slider',
    total: 5,
    page: 1,
    size: 'xs',
  },
  argTypes: {
    'data-test-id': {
      control: 'text',
      description: 'Test ID для e2e',
    },
    total: {
      control: { type: 'number', min: 2, max: 10, step: 1 },
      description: 'Общее количество страниц (слайдов)',
    },
    page: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Текущая страница',
    },
    size: {
      control: 'select',
      options: Object.values(PAGINATION_SLIDER_SIZE),
      description: 'Размер',
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS-класс для nav',
    },
  },
};

export default meta;

type Story = StoryObj<PaginationSliderProps>;

function PaginationSliderControlled(args: PaginationSliderProps) {
  const [page, setPage] = useState(args.page);
  return <PaginationSlider {...args} page={page} onChange={newPage => setPage(newPage)} />;
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PaginationSliderControlled {...args} />,
};
