import { FieldDescription } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';

const meta: Meta<typeof FieldDescription> = {
  title: 'Uikit Product/FieldsPredefined/FieldDescription',
  component: FieldDescription,
  parameters: { layout: 'fullscreen' },
  args: {
    required: false,
    maxLength: 255,
    resizable: true,
    addButton: false,
    size: 'm',
    'data-test-id': TEST_IDS.fieldDescription,
  },
  argTypes: {
    // Controlled-режим: контрол `value` блокирует ввод в поле — прячем, uncontrolled работает из коробки.
    value: { table: { disable: true } },
    // Технический instance-override адаптивных пресетов — не для Playground.
    layoutPresets: { table: { disable: true } },
  },
  render: function Render(args) {
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Многострочное описание с yup-валидацией длины (до 255) и счётчиком символов.</DemoHint>
          <DemoActions block>
            <FieldDescription {...args} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FieldDescription>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDescription)).toBeVisible();
  },
};
