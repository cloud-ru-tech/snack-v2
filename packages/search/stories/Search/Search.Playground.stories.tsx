import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { SEARCH_TEST_ID } from './testIds';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'centered' },
  args: {
    size: SIZE.S,
    placeholder: 'Поиск',
    background: true,
    outline: true,
    disabled: false,
    loading: false,
    'data-test-id': SEARCH_TEST_ID,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер: s / m / l',
    },
    placeholder: { control: 'text', description: 'Плейсхолдер' },
    background: { control: 'boolean', description: 'Наличие фона' },
    outline: { control: 'boolean', description: 'Разделитель между input и buttonField' },
    disabled: { control: 'boolean', description: 'Деактивирован' },
    loading: { control: 'boolean', description: 'Состояние загрузки' },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SEARCH_TEST_ID)).toBeVisible();
  },
};
