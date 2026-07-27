import { FieldCombo, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel, DemoResizable } from '#storybook/components';

import { CLEAR_BUTTON_TEST_ID, TEST_IDS as STORY_TEST_IDS } from '../testIds';

const onChange = fn();
const onClearButtonClick = fn();
const onBlur = fn();

function InteractionScenario() {
  const [value, setValue] = useState('hello');
  const [blurGuardValue, setBlurGuardValue] = useState('focus me');
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldCombo
              data-test-id={STORY_TEST_IDS.fieldCombo.editableRoot}
              label='Label'
              value={value}
              onChange={next => {
                onChange(next);
                setValue(next ?? '');
              }}
              onClearButtonClick={onClearButtonClick}
              showClearButton
              showCopyButton
            />
            <FieldCombo
              data-test-id={STORY_TEST_IDS.fieldCombo.readonlyRoot}
              label='Readonly'
              readonly
              defaultValue='copy me'
              showCopyButton
            />
            <FieldCombo
              data-test-id={STORY_TEST_IDS.fieldCombo.prefixedReadonlyRoot}
              label='Readonly prefixed'
              readonly
              prefix='$'
              postfix='USD'
              defaultValue='100'
              showCopyButton
            />
            <FieldCombo
              data-test-id={STORY_TEST_IDS.fieldCombo.disabledRoot}
              label='Disabled'
              disabled
              defaultValue='disabled value'
              showClearButton
            />
            <FieldCombo
              data-test-id={STORY_TEST_IDS.fieldCombo.blurGuardRoot}
              label='Blur guard'
              value={blurGuardValue}
              onChange={setBlurGuardValue}
              onBlur={onBlur}
              showClearButton
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldCombo> = {
  title: 'Components/Fields/FieldCombo/Tests/Interaction',
  component: FieldCombo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldCombo>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    onChange.mockClear();
    onClearButtonClick.mockClear();
    onBlur.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(STORY_TEST_IDS.fieldCombo.editableRoot);
    const input = within(root).getByTestId(TEST_IDS.fieldComboInput);

    await step('renders root and native input', async () => {
      await expect(root).toBeVisible();
      await expect(input).toBeVisible();
    });

    await step('type into input (onChange fires with the typed value, controlled input updates)', async () => {
      await userEvent.click(input);
      await userEvent.type(input, ' world');
      expect(onChange).toHaveBeenLastCalledWith('hello world');
      await expect(input).toHaveValue('hello world');
    });

    await step('clear button is visible for a non-empty editable field', async () => {
      await expect(within(root).getByTestId(CLEAR_BUTTON_TEST_ID)).toBeVisible();
    });

    await step('click clear button resets value, fires onClearButtonClick and refocuses input', async () => {
      await userEvent.click(within(root).getByTestId(CLEAR_BUTTON_TEST_ID));
      expect(onClearButtonClick).toHaveBeenCalledTimes(1);
      await expect(input).toHaveValue('');
      // onClear возвращает фокус в input (localRef.current?.focus()).
      await waitFor(() => expect(input).toHaveFocus());
    });

    await step('clear button hides once the value is empty', async () => {
      await expect(within(root).queryByTestId(CLEAR_BUTTON_TEST_ID)).toBeNull();
    });

    await step('disabled field hides the clear button despite a non-empty value', async () => {
      const disabledRoot = canvas.getByTestId(STORY_TEST_IDS.fieldCombo.disabledRoot);
      await expect(within(disabledRoot).queryByTestId(CLEAR_BUTTON_TEST_ID)).toBeNull();
    });

    await step('readonly fields (plain and prefix/postfix) expose a copy button', async () => {
      // onCopyButtonClick гейтится успешной записью в буфер; в jsdom execCommand('copy') = false,
      // колбэк не вызывается. Реальный copy-путь + точная композиция textToCopy='$100USD' проверяются
      // read-back'ом в __test__/FieldCombo/interaction.spec.ts. Здесь — readonly-контракт: copy показан.
      const readonlyRoot = canvas.getByTestId(STORY_TEST_IDS.fieldCombo.readonlyRoot);
      const prefixedRoot = canvas.getByTestId(STORY_TEST_IDS.fieldCombo.prefixedReadonlyRoot);
      await expect(within(readonlyRoot).getByTestId(TEST_IDS.fieldTextCopyButton)).toBeVisible();
      await expect(within(prefixedRoot).getByTestId(TEST_IDS.fieldTextCopyButton)).toBeVisible();
    });

    await step('onBlur: skipped when focus moves to the field’s own clear button', async () => {
      const blurGuardRoot = canvas.getByTestId(STORY_TEST_IDS.fieldCombo.blurGuardRoot);
      const guardInput = within(blurGuardRoot).getByTestId(TEST_IDS.fieldComboInput);
      onBlur.mockClear();
      await userEvent.click(guardInput);
      await expect(guardInput).toHaveFocus();
      // Клик по собственной clear-кнопке — relatedTarget === clearButtonRef → onBlur НЕ зовём.
      await userEvent.click(within(blurGuardRoot).getByTestId(CLEAR_BUTTON_TEST_ID));
      expect(onBlur).not.toHaveBeenCalled();
    });

    await step('onBlur: fired when focus leaves to an unrelated element', async () => {
      const blurGuardRoot = canvas.getByTestId(STORY_TEST_IDS.fieldCombo.blurGuardRoot);
      const guardInput = within(blurGuardRoot).getByTestId(TEST_IDS.fieldComboInput);
      onBlur.mockClear();
      await userEvent.type(guardInput, 'x');
      await expect(guardInput).toHaveFocus();
      // Фокус уходит на input другого поля — relatedTarget вне собственных кнопок → onBlur зовём.
      await userEvent.click(input);
      await waitFor(() => expect(onBlur).toHaveBeenCalled());
    });
  },
};
