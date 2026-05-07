import { SearchPrivate, SIZE } from '@ds/search-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof SearchPrivate> = {
  title: 'Components/SearchPrivate',
  component: SearchPrivate,
  parameters: { layout: 'centered', figma: { disable: true } },
  args: {
    size: SIZE.S,
    placeholder: 'Поиск',
    disabled: false,
    loading: false,
    showClearButton: true,
    'data-test-id': 'search-private',
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchPrivate>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('search-private')).toBeVisible();
  },
};
