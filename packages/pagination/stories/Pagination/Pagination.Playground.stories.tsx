import { Pagination, PAGINATION_SIZE, VARIANT } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  parameters: { layout: 'fullscreen' },
  args: {
    total: 10,
    page: 3,
    size: PAGINATION_SIZE.S,
    variant: VARIANT.Button,
    maxLength: 7,
    onChange: fn(),
    'data-test-id': TEST_IDS.pagination.root,
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
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Постраничная навигация по списку.</DemoHint>
        <DemoActions align='center'>
          <Pagination {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.pagination.root)).toBeVisible();
  },
};
