import { COLOR_MODE, ColorPicker } from '@ds/color-picker';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker/Tests/Interaction',
  component: ColorPicker,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onChange: fn(),
    value: '#389f74',
    autoApply: false,
    withAlpha: false,
    availableModes: [COLOR_MODE.Hex, COLOR_MODE.Rgb, COLOR_MODE.Hsv],
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Проверка Apply/Cancel — onChange срабатывает только на Apply.</DemoHint>
        <DemoActions align='center'>
          <ColorPicker {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);

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
