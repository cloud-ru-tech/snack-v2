import { APPEARANCE, Avatar, SHAPE, SIZE } from '@ds/avatar';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  args: {
    name: 'John Doe',
    size: SIZE.S,
    shape: SHAPE.Round,
    appearance: APPEARANCE.Neutral,
    showTwoSymbols: false,
    className: '',
    src: '',
    'data-test-id': 'avatar',
  },
  argTypes: {
    name: { control: 'text', description: 'Имя для аббревиатуры' },
    src: { control: 'text', description: 'URL изображения' },
    size: { control: 'select', options: Object.values(SIZE), description: 'Размер' },
    shape: { control: 'radio', options: Object.values(SHAPE), description: 'Форма' },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    showTwoSymbols: { control: 'boolean', description: 'Показать две заглавные буквы' },
    className: { control: 'text', table: { category: 'Testing' } },
    'data-test-id': { control: 'text', table: { category: 'Testing' } },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('avatar')).toBeVisible();
  },
};
