import { FieldStepper, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

const meta: Meta<typeof FieldStepper> = {
  title: 'Components/Fields/FieldStepper',
  component: FieldStepper,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Quantity',
    hint: 'Hint text',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: false,
    background: true,
    disabled: false,
    readonly: false,
    defaultValue: 1,
    min: 0,
    max: 99,
    step: 1,
    allowMoreThanLimits: false,
    prefix: '₽',
    postfix: 'шт',
    minusButtonTooltip: { tip: 'Уменьшить' },
    plusButtonTooltip: { tip: 'Увеличить' },
    'data-test-id': TEST_IDS.fieldStepper,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    // дробный шаг через step=0.1; min/max docgen выводит как number-контролы сам.
    step: { control: { type: 'number', min: 0.1 } },
    // uncontrolled-режим Playground: значение держит сам компонент через defaultValue,
    // чтобы кнопки +/− и кламп работали без внешнего useState. value скрыт из панели.
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    clampTooltipText: { table: { disable: true } },
  },
  render: function Render(args) {
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Числовое поле с кнопками +/− и опциональным клампом значения к границам min/max.</DemoHint>
          <DemoActions block>
            <DemoResizable width='narrow'>
              <FieldStepper {...args} />
            </DemoResizable>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FieldStepper>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldStepper)).toBeVisible();
  },
};
