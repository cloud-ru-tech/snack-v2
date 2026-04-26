import { LOADER_SIZE, Spinner } from '@ds/loader';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Loader/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  args: { size: LOADER_SIZE.M },
  argTypes: {
    size: { control: 'radio', options: Object.values(LOADER_SIZE), description: 'Размер' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('svg')).toBeVisible();
  },
};
