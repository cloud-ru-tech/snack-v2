import { FieldSecure, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

const onHiddenChange = fn();
const onChange = fn();

function InteractionScenario() {
  const [value, setValue] = useState('s3cret');
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          «Глаз» переключает маскирование и возвращает фокус с кареткой в конец; readonly показывает копирование;
          ArrowRight/ArrowLeft переключают фокус между полем и кнопками. Controlled-инстанс с зафиксированным `hidden`
          не переключается изнутри.
        </DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.editableRoot}
              label='Password'
              value={value}
              onChange={next => {
                onChange(next);
                setValue(next ?? '');
              }}
              onHiddenChange={onHiddenChange}
              showHideButton
            />
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.readonlyRoot}
              label='API Token'
              readonly
              defaultValue='sk-XXXX-TOKEN'
            />
            {/* Controlled `hidden`: внешний state не обновляется при «глазе» → маскирование заморожено. */}
            <FieldSecure
              data-test-id={STORY_TEST_IDS.fieldSecure.controlledHiddenRoot}
              label='Controlled hidden'
              defaultValue='locked'
              hidden
              onHiddenChange={onHiddenChange}
              showHideButton
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSecure> = {
  title: 'Components/Fields/FieldSecure/Tests/Interaction',
  component: FieldSecure,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldSecure>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    onHiddenChange.mockClear();
    onChange.mockClear();
    const canvas = within(canvasElement);
    const editable = within(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.editableRoot));
    const input = editable.getByTestId(TEST_IDS.fieldSecureInput) as HTMLInputElement;
    const toggle = editable.getByTestId(TEST_IDS.fieldSecureHideButton);

    await step('input is type=password (masked) by default', async () => {
      await expect(input).toHaveAttribute('type', 'password');
    });

    await step('typing fires onChange with the new value and updates the controlled input', async () => {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      await userEvent.type(input, 'x');
      expect(onChange).toHaveBeenLastCalledWith('s3cretx');
      await expect(input).toHaveValue('s3cretx');
    });

    await step('click «глаз» reveals value, fires onHiddenChange(false) and restores focus + caret', async () => {
      await userEvent.click(toggle);
      await expect(input).toHaveAttribute('type', 'text');
      expect(onHiddenChange).toHaveBeenCalledWith(false);
      // Фокус + каретка в конце возвращаются в поле после переключения (паритет с легаси FieldSecure).
      await waitFor(() => expect(input).toHaveFocus());
      expect(input.selectionStart).toBe(input.value.length);
    });

    await step('click «глаз» again masks value and fires onHiddenChange(true)', async () => {
      await userEvent.click(toggle);
      await expect(input).toHaveAttribute('type', 'password');
      expect(onHiddenChange).toHaveBeenCalledWith(true);
    });

    await step('keyboard: ArrowRight at end of input focuses «глаз»', async () => {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      await userEvent.keyboard('{ArrowRight}');
      await expect(toggle).toHaveFocus();
    });

    await step('keyboard: ArrowLeft from «глаз» returns focus to input', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await expect(input).toHaveFocus();
    });

    await step('keyboard: Enter on «глаз» toggles masking', async () => {
      toggle.focus();
      await userEvent.keyboard('{Enter}');
      await expect(input).toHaveAttribute('type', 'text');
    });

    await step('controlled hidden: «глаз» does not reveal when external state stays masked', async () => {
      // hidden=true передан как controlled-проп без onHiddenChange-апдейта state →
      // hiddenInner игнорируется, поле остаётся type=password несмотря на клик.
      const controlled = within(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.controlledHiddenRoot));
      const controlledInput = controlled.getByTestId(TEST_IDS.fieldSecureInput);
      const controlledToggle = controlled.getByTestId(TEST_IDS.fieldSecureHideButton);
      await expect(controlledInput).toHaveAttribute('type', 'password');
      await userEvent.click(controlledToggle);
      await expect(controlledInput).toHaveAttribute('type', 'password');
    });

    await step('readonly exposes a copy button', async () => {
      // onCopyButtonClick гейтится успешной записью в буфер; в jsdom execCommand('copy') = false,
      // колбэк не вызывается. Реальная запись + read-back (весь copy-путь) — browser-only в
      // __test__/FieldSecure/interaction.spec.ts. Здесь — readonly-контракт: copy-кнопка показана.
      const readonly = within(canvas.getByTestId(STORY_TEST_IDS.fieldSecure.readonlyRoot));
      await expect(readonly.getByTestId(TEST_IDS.fieldTextCopyButton)).toBeVisible();
    });

    // Play оставляет фокус на «глазе» controlled-поля — e2e keyboard-спеки на этой стори
    // стартуют с чужого activeElement и ArrowRight уходит не туда.
    await step('cleanup: blur leftover focus', async () => {
      (document.activeElement as HTMLElement | null)?.blur?.();
    });
  },
};
