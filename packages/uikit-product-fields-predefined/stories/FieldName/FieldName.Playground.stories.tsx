import { FieldName } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';

const meta: Meta<typeof FieldName> = {
  title: 'Uikit Product/FieldsPredefined/FieldName',
  component: FieldName,
  parameters: { layout: 'fullscreen' },
  args: {
    required: true,
    maxLength: 64,
    showLabel: true,
    size: 'm',
    'data-test-id': TEST_IDS.fieldName,
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
          <DemoHint>Поле «Имя»: встроенная yup-валидация (латиница/цифры/.-_, до 64 символов, required).</DemoHint>
          <DemoActions block>
            <FieldName {...args} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FieldName>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldName)).toBeVisible();
  },
};
