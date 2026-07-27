import { TEST_IDS as FIELD_TEST_IDS } from '@ds/fields';
import { FieldCode } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ZERO_WIDTH_SPACE } from '../../../src/components/FieldCode/constants';
import { TEST_IDS } from '../../../src/constants';

const meta: Meta<typeof FieldCode> = {
  title: 'Uikit Product/FieldsPredefined/FieldCode/Tests/Interaction',
  component: FieldCode,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    codeLength: 4,
    label: 'Код подтверждения',
    onChange: fn(),
    onComplete: fn(),
    resendCode: { onResend: fn(), secondsToNextResend: 0 },
    'data-test-id': TEST_IDS.fieldCode,
  },
};

export default meta;
type Story = StoryObj<typeof FieldCode>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Ввод кода по ячейкам, backspace-навигация, onComplete на полном коде, resend-кнопка.</DemoHint>
        <DemoActions block>
          <FieldCode {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const cells = canvas.getAllByTestId(TEST_IDS.fieldCodeCell);
    const inputs = cells.map(cell => within(cell).getByTestId(FIELD_TEST_IDS.fieldComboInput));

    await step('typing: цифры заполняют ячейки, фокус переходит к следующей', async () => {
      await userEvent.click(inputs[0]);
      await userEvent.keyboard('12');
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      await expect(inputs[2]).toHaveFocus();
    });

    await step('complete: последний символ вызывает onComplete с полным кодом', async () => {
      await userEvent.keyboard('34');
      expect(args.onComplete).toHaveBeenCalledTimes(1);
      expect(args.onComplete).toHaveBeenCalledWith('1234');
    });

    await step('backspace: очищает текущую ячейку', async () => {
      await userEvent.keyboard('{Backspace}');
      expect(inputs[3]).toHaveValue('');
      expect(args.onChange).toHaveBeenCalledWith(`123${ZERO_WIDTH_SPACE}`);
    });

    await step('backspace: на пустой ячейке переносит фокус на предыдущую', async () => {
      await userEvent.keyboard('{Backspace}');
      await expect(inputs[2]).toHaveFocus();
    });

    await step('keyboard: ArrowLeft/ArrowRight двигают фокус между ячейками', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await expect(inputs[1]).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}');
      await expect(inputs[2]).toHaveFocus();
    });

    await step('resend: клик по активной кнопке вызывает onResend', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.fieldCodeResend));
      expect(args.resendCode?.onResend).toHaveBeenCalledTimes(1);
    });
  },
};
