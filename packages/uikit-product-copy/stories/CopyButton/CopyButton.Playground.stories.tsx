import { SIZE } from '@ds/button';
import { CopyButton } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof CopyButton> = {
  title: 'Uikit Product/Copy/CopyButton',
  component: CopyButton,
  parameters: { layout: 'fullscreen' },
  args: {
    valueToCopy: 'example-value',
    size: SIZE.S,
    label: '',
    'data-test-id': TEST_IDS.copyButton.root,
  },
  argTypes: {
    valueToCopy: { control: 'text', description: 'Значение для копирования' },
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер кнопки' },
    label: { control: 'text', description: 'Текст рядом с иконкой' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Иконка-кнопка для копирования значения в буфер обмена.</DemoHint>
        <DemoActions align='center'>
          <CopyButton {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.copyButton.root)).toBeVisible();
  },
};
