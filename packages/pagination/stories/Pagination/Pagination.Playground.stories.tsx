import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import readme from '../../README.md?raw';
import { Pagination, PAGINATION_SIZE, type PaginationProps, VARIANT } from '../../src';

const meta: Meta<PaginationProps> = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5707-1465&m=dev',
    },
  },
  args: {
    'data-test-id': 'pagination',
    total: 10,
    page: 1,
    size: 's',
    variant: 'button',
    maxLength: 7,
  },
  argTypes: {
    'data-test-id': {
      control: 'text',
      description: 'Test ID для e2e',
    },
    total: {
      control: { type: 'number', min: 1, max: 999, step: 1 },
      description: 'Общее количество страниц',
    },
    page: {
      control: { type: 'number', min: 1, max: 999, step: 1 },
      description: 'Текущая страница',
    },
    size: {
      control: 'select',
      options: Object.values(PAGINATION_SIZE),
      description: 'Размер',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант: button или link',
    },
    maxLength: {
      control: { type: 'number', min: 5, max: 15, step: 1 },
      description: 'Макс. количество элементов до транкейта',
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS-класс для nav',
    },
  },
};

export default meta;

type Story = StoryObj<PaginationProps>;

function PaginationControlled(args: PaginationProps) {
  const [page, setPage] = useState(args.page);
  return <Pagination {...args} page={page} onChange={newPage => setPage(newPage)} />;
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PaginationControlled {...args} />,
};
