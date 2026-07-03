import { FieldStepper, FieldStepperProps, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel, DemoResizable } from '#storybook/components';

function InteractionScenario(args: FieldStepperProps) {
  const [value, setValue] = useState(5);

  const handleChange: FieldStepperProps['onChange'] = (next, event) => {
    setValue(next);
    args.onChange?.(next, event);
  };

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldStepper
              data-test-id={TEST_IDS.fieldStepper}
              label='Quantity'
              min={0}
              max={8}
              step={1}
              allowMoreThanLimits={false}
              value={value}
              onChange={handleChange}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldStepper> = {
  title: 'Components/Fields/FieldStepper/Tests/Interaction',
  component: FieldStepper,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onChange: fn() },
  render: args => <InteractionScenario {...args} />,
};

export default meta;
type Story = StoryObj<typeof FieldStepper>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(TEST_IDS.fieldStepperInput);
    const plus = canvas.getByTestId(TEST_IDS.fieldStepperPlus);
    const minus = canvas.getByTestId(TEST_IDS.fieldStepperMinus);

    // type=number инпут: toHaveValue сравнивает с числом, не строкой.
    await step('initial value', async () => {
      await expect(input).toBeVisible();
      await expect(input).toHaveValue(5);
    });

    await step('click + → increments', async () => {
      await userEvent.click(plus);
      await userEvent.click(plus);
      await expect(input).toHaveValue(7);
    });

    await step('click − → decrements', async () => {
      await userEvent.click(minus);
      await expect(input).toHaveValue(6);
    });

    await step('+ disables at max', async () => {
      await userEvent.click(plus);
      await userEvent.click(plus);
      await expect(input).toHaveValue(8);
      await expect(plus).toBeDisabled();
    });

    await step('− re-enables + and decrements to min', async () => {
      await expect(minus).toBeEnabled();
      for (let i = 0; i < 8; i += 1) {
        await userEvent.click(minus);
      }
      await expect(input).toHaveValue(0);
      await expect(minus).toBeDisabled();
      await expect(plus).toBeEnabled();
    });

    // Кнопки шага имеют tabIndex={-1}; фокус по Tab принимает сам инпут (контракт анатомии).
    await step('keyboard: Tab focuses the input, not the step buttons', async () => {
      input.blur();
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });

    await step('keyboard: typing a digit updates the value', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, '4');
      await expect(input).toHaveValue(4);
    });

    // Кламп к границам на blur (выше max → max, ниже min → min) + тултип границы, гашение
    // тултипа по фокусу, и промежуточный '-'/пустой ввод — завязаны на React-onBlur и
    // userEvent.clear, ненадёжные в синтетической storybook-test среде (программный blur не
    // триггерит onBlur-кламп, clear оставляет остаток в native number-input). Это поведение
    // покрыто в реальной среде — packages/fields/__test__/FieldStepper/interaction.spec.ts.
  },
};
