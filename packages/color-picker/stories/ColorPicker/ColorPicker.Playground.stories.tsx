import { COLOR_MODE, ColorPicker, SIZE } from '@ds/color-picker';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { COLOR_PICKER_TEST_ID } from './testIds';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered' },
  args: {
    size: SIZE.M,
    withAlpha: true,
    autoApply: false,
    value: '#389f74',
    availableModes: [COLOR_MODE.Hex, COLOR_MODE.Rgb, COLOR_MODE.Hsv],
    'data-test-id': COLOR_PICKER_TEST_ID,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    withAlpha: { control: 'boolean' },
    autoApply: { control: 'boolean' },
    value: { control: 'text' },
    availableModes: { control: 'check', options: Object.values(COLOR_MODE) },
    onChange: { action: 'change' },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(COLOR_PICKER_TEST_ID)).toBeVisible();
  },
};
