import { InputPrivate, TYPE } from '@ds/input-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof InputPrivate> = {
  title: 'Components/InputPrivate',
  component: InputPrivate,
  parameters: { layout: 'centered' },
  args: {
    value: '',
    placeholder: 'Введите значение',
    disabled: false,
    readonly: false,
    type: TYPE.Text,
  },
  argTypes: {
    type: { control: 'select', options: Object.values(TYPE) },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof InputPrivate>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox');
    await expect(input).toBeVisible();
  },
};
