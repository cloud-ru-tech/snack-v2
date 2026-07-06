import { FieldMask, MASK } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';

const meta: Meta<typeof FieldMask> = {
  title: 'Uikit Product/FieldsPredefined/FieldMask',
  component: FieldMask,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Идентификатор',
    mask: MASK.Uuid,
    size: 'm',
    'data-test-id': TEST_IDS.fieldMask,
  },
  argTypes: {
    mask: { control: 'select', options: Object.values(MASK) },
    // Controlled-режим: контрол `value` перебивает ввод по маске — прячем, uncontrolled работает из коробки.
    value: { table: { disable: true } },
    // Технический instance-override адаптивных пресетов — не для Playground.
    layoutPresets: { table: { disable: true } },
  },
  render: function Render(args) {
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Поле ввода с предустановленной маской (uuid, code, passport, snils, ip).</DemoHint>
          <DemoActions block>
            <FieldMask {...args} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FieldMask>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldMask)).toBeVisible();
  },
};
