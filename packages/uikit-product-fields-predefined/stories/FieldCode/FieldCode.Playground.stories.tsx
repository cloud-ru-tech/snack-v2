import { FieldCode, FieldCodeProps } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';

const RESEND_COUNTDOWN_SECONDS = 8;

type StoryProps = FieldCodeProps & {
  /** Story-toggle: показать кнопку повторной отправки кода с обратным отсчётом */
  showResendCode: boolean;
};

function PlaygroundRender(args: StoryProps) {
  // resendCode собирается из story-state ниже, значение из args не используется.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { showResendCode, resendCode: _ignoredResendCode, ...rest } = args;
  const [secondsToNextResend, setSecondsToNextResend] = useState(RESEND_COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!showResendCode || secondsToNextResend <= 0) {
      return;
    }

    const timerId = window.setTimeout(() => setSecondsToNextResend(seconds => seconds - 1), 1000);

    return () => window.clearTimeout(timerId);
  }, [showResendCode, secondsToNextResend]);

  const handleResend = () => setSecondsToNextResend(RESEND_COUNTDOWN_SECONDS);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>OTP-поле: ввод кода по ячейкам, автопереход фокуса, вставка кода целиком.</DemoHint>
        <DemoActions block>
          <FieldCode
            {...rest}
            resendCode={showResendCode ? { onResend: handleResend, secondsToNextResend } : undefined}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/FieldsPredefined/FieldCode',
  component: FieldCode,
  parameters: { layout: 'fullscreen' },
  args: {
    codeLength: 6,
    label: 'Код подтверждения',
    size: 'm',
    stretchCells: false,
    showResendCode: false,
    'data-test-id': TEST_IDS.fieldCode,
  },
  argTypes: {
    showResendCode: { name: '[Stories]: showResendCode', control: 'boolean' },
    stretchCells: { control: 'boolean' },
    size: { control: 'radio', options: ['s', 'm', 'l'] },
    // Controlled-режим: контрол `value` блокирует ввод — прячем, uncontrolled работает из коробки.
    value: { table: { disable: true } },
    // Объект resendCode собирается story-toggle'ом showResendCode.
    resendCode: { table: { disable: true } },
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldCode)).toBeVisible();
  },
};
