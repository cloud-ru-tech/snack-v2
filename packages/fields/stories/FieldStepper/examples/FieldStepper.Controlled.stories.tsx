import { FieldStepper, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

// Контролируемый режим: родитель держит value в useState, кнопки +/− и ручной ввод
// отражают внешний стейт. Контракт не выражается uncontrolled-args Playground'а
// (URL-args фиксируют value), поэтому отдельный пример.
const VALUE_LABEL_TEST_ID = 'field-stepper-controlled-value';

function ControlledStepper() {
  const [value, setValue] = useState(2);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Controlled value</DemoTitle>
        <DemoHint>
          Родитель держит value в useState. Кнопки +/− и ручной ввод меняют внешнее состояние, отражённое в подписи.
        </DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldStepper
              data-test-id={TEST_IDS.fieldStepper}
              label='Quantity'
              postfix='шт'
              min={0}
              max={10}
              value={value}
              onChange={setValue}
            />
          </DemoResizable>
          <span data-test-id={VALUE_LABEL_TEST_ID}>Текущее значение: {value}</span>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldStepper> = {
  title: 'Components/Fields/FieldStepper/Examples/Controlled',
  component: FieldStepper,
  parameters: { layout: 'fullscreen' },
  render: () => <ControlledStepper />,
};

export default meta;
type Story = StoryObj<typeof FieldStepper>;

export const Controlled: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.fieldStepper);
    const input = within(root).getByTestId(TEST_IDS.fieldStepperInput);
    const plus = within(root).getByTestId(TEST_IDS.fieldStepperPlus);
    const valueLabel = canvas.getByTestId(VALUE_LABEL_TEST_ID);

    await step('renders the field with the controlled initial value', async () => {
      await expect(input).toHaveValue(2);
      await expect(valueLabel).toHaveTextContent('Текущее значение: 2');
    });

    await step('clicking + updates both the field and the external state', async () => {
      await userEvent.click(plus);
      await expect(input).toHaveValue(3);
      await expect(valueLabel).toHaveTextContent('Текущее значение: 3');
    });
  },
};
