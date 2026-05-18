import { COLOR_MODE, ColorPicker, TEST_IDS } from '@ds/color-picker';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { COLOR_PICKER_TEST_ID } from './testIds';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered', controls: { disable: true } },
  args: {
    onChange: fn(),
    value: '#389f74',
    autoApply: false,
    withAlpha: false,
    availableModes: [COLOR_MODE.Hex, COLOR_MODE.Rgb, COLOR_MODE.Hsv],
    'data-test-id': COLOR_PICKER_TEST_ID,
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(COLOR_PICKER_TEST_ID);

    await step('renders root', async () => {
      await expect(root).toBeVisible();
    });

    await step('click: Apply triggers onChange', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.apply));
      expect(args.onChange).toHaveBeenCalled();
    });

    await step('click: Cancel does not trigger onChange', async () => {
      (args.onChange as ReturnType<typeof fn>).mockClear();
      await userEvent.click(canvas.getByTestId(TEST_IDS.cancel));
      expect(args.onChange).not.toHaveBeenCalled();
    });
  },
};
