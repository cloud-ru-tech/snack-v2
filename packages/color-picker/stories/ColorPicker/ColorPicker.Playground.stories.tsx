import { COLOR_MODE, ColorPicker, SIZE } from '@ds/color-picker';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Выбор цвета с поддержкой режимов HEX, RGB и HSV.</DemoHint>
        <DemoActions align='center'>
          <ColorPicker {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    size: SIZE.M,
    withAlpha: true,
    autoApply: false,
    value: '#389f74',
    availableModes: [COLOR_MODE.Hex, COLOR_MODE.Rgb, COLOR_MODE.Hsv],
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    withAlpha: { control: 'boolean' },
    autoApply: { control: 'boolean' },
    value: { control: 'color' },
    availableModes: { control: 'check', options: Object.values(COLOR_MODE) },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
