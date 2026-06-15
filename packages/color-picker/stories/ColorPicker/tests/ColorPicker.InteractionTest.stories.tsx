import { COLOR_MODE, ColorPicker, NATIVE_INPUT_SUFFIX } from '@ds/color-picker';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

// SegmentControl задаёт сегментам test-id `section-<value>`; кросс-пакетный импорт в story запрещён.
const SEGMENT_HEX = 'section-hex';
const SEGMENT_RGB = 'section-rgb';
const SEGMENT_HSV = 'section-hsv';

const HEX_INPUT = `${TEST_IDS.fieldHex}${NATIVE_INPUT_SUFFIX}`;

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker/Tests/Interaction',
  component: ColorPicker,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onChange: fn(),
    value: '#389f74',
    autoApply: false,
    withAlpha: true,
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
        <DemoHint>
          Переключение моделей, правка поля и клавиатура слайдера; onChange срабатывает только на Apply.
        </DemoHint>
        <DemoActions align='center'>
          <ColorPicker {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);
    const onChange = args.onChange as ReturnType<typeof fn>;

    await step('renders root in hex mode by default', async () => {
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute('data-mode', COLOR_MODE.Hex);
      await expect(canvas.getByTestId(TEST_IDS.fieldHex)).toBeVisible();
    });

    await step('mode switch: hex → rgb → hsv toggles data-mode and fields', async () => {
      await userEvent.click(canvas.getByTestId(SEGMENT_RGB));
      await expect(root).toHaveAttribute('data-mode', COLOR_MODE.Rgb);
      await expect(canvas.getByTestId(TEST_IDS.fieldR)).toBeVisible();

      await userEvent.click(canvas.getByTestId(SEGMENT_HSV));
      await expect(root).toHaveAttribute('data-mode', COLOR_MODE.Hsv);
      await expect(canvas.getByTestId(TEST_IDS.fieldH)).toBeVisible();

      await userEvent.click(canvas.getByTestId(SEGMENT_HEX));
      await expect(root).toHaveAttribute('data-mode', COLOR_MODE.Hex);
    });

    await step('keyboard: hue slider ArrowRight increments aria-valuenow', async () => {
      const slider = canvas.getByTestId(TEST_IDS.sliderH);
      slider.focus();
      const before = Number(slider.getAttribute('aria-valuenow'));
      await userEvent.keyboard('{ArrowRight}');
      await expect(slider).toHaveAttribute('aria-valuenow', String(before + 1));
    });

    await step('keyboard: hue slider Home / End jump to bounds', async () => {
      const slider = canvas.getByTestId(TEST_IDS.sliderH);
      slider.focus();
      await userEvent.keyboard('{Home}');
      await expect(slider).toHaveAttribute('aria-valuenow', '0');
      await userEvent.keyboard('{End}');
      await expect(slider).toHaveAttribute('aria-valuenow', '359');
    });

    await step('keyboard: hue slider ArrowLeft / ArrowDown decrement', async () => {
      const slider = canvas.getByTestId(TEST_IDS.sliderH);
      slider.focus();
      await userEvent.keyboard('{End}');
      await userEvent.keyboard('{ArrowLeft}');
      await expect(slider).toHaveAttribute('aria-valuenow', '358');
      await userEvent.keyboard('{ArrowDown}');
      await expect(slider).toHaveAttribute('aria-valuenow', '357');
    });

    await step('alpha slider and field are present and interactive (withAlpha)', async () => {
      const alphaSlider = canvas.getByTestId(TEST_IDS.sliderAlpha);
      alphaSlider.focus();
      await userEvent.keyboard('{Home}');
      await expect(alphaSlider).toHaveAttribute('aria-valuenow', '0');
      await userEvent.keyboard('{ArrowRight}');
      await expect(alphaSlider).toHaveAttribute('aria-valuenow', '1');
      await expect(canvas.getByTestId(TEST_IDS.fieldAlpha)).toBeVisible();
    });

    await step('field edit: typing a valid hex updates and Apply fires onChange', async () => {
      const hexInput = canvas.getByTestId(HEX_INPUT);
      await userEvent.clear(hexInput);
      await userEvent.type(hexInput, '00ff00');
      await userEvent.tab();

      onChange.mockClear();
      await userEvent.click(canvas.getByTestId(TEST_IDS.apply));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect((onChange.mock.calls[0][0] as { hex: string }).hex).toBe('#00ff00');
    });

    await step('Cancel does not fire onChange and reverts the field', async () => {
      const hexInput = canvas.getByTestId(HEX_INPUT);
      await userEvent.clear(hexInput);
      await userEvent.type(hexInput, 'ff0000');
      await userEvent.tab();

      onChange.mockClear();
      await userEvent.click(canvas.getByTestId(TEST_IDS.cancel));
      expect(onChange).not.toHaveBeenCalled();
      await expect(hexInput).toHaveValue('389f74');
    });
  },
};
