import { Alert, ALIGN, APPEARANCE, SIZE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  args: {
    title: 'Alert title',
    description: 'Alert description text',
    appearance: APPEARANCE.Neutral,
    size: SIZE.M,
    align: ALIGN.Horizontal,
    icon: true,
    outline: false,
    collapsible: false,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    appearance: { control: 'select', options: Object.values(APPEARANCE) },
    size: { control: 'radio', options: Object.values(SIZE) },
    align: { control: 'radio', options: Object.values(ALIGN) },
    icon: { control: 'boolean' },
    outline: { control: 'boolean' },
    collapsible: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('alert')).toBeVisible();
  },
};
