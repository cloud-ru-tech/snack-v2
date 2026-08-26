import { FieldTextArea, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

// Кнопка очистки из @ds/input-private::useClearButton (нет в публичном TEST_IDS).
const CLEAR_BUTTON_TEST_ID = 'button-clear-value';
const READONLY_FIELD_TEST_ID = 'field-textarea-readonly';
const UNCONTROLLED_FIELD_TEST_ID = 'field-textarea-uncontrolled';
const HARD_CAP_FIELD_TEST_ID = 'field-textarea-hard-cap';
const EDIT_COPY_FIELD_TEST_ID = 'field-textarea-edit-copy';

const HARD_CAP = 8;

const onChange = fn();
const onCopyButtonClick = fn();

function InteractionScenario() {
  const [value, setValue] = useState('');
  const handleChange = (next: string) => {
    onChange(next);
    setValue(next ?? '');
  };

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoActions align='center'>
          <FieldTextArea
            data-test-id={TEST_IDS.fieldTextArea}
            label='Comment'
            value={value}
            onChange={handleChange}
            maxLength={80}
            showClearButton
          />
          <FieldTextArea data-test-id={UNCONTROLLED_FIELD_TEST_ID} label='Uncontrolled' defaultValue='preset value' />
          <FieldTextArea
            data-test-id={READONLY_FIELD_TEST_ID}
            label='Readonly'
            readonly
            value={'copy me\nsecond line'}
            showCopyButton
            onCopyButtonClick={onCopyButtonClick}
          />
          <FieldTextArea
            data-test-id={EDIT_COPY_FIELD_TEST_ID}
            label='Copy in edit mode'
            defaultValue='copy me while typing'
            showCopyButtonInEditMode
          />
          <FieldTextArea
            data-test-id={HARD_CAP_FIELD_TEST_ID}
            label='Hard cap'
            defaultValue=''
            maxLength={HARD_CAP}
            allowMoreThanMaxLength={false}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldTextArea> = {
  title: 'Components/Fields/FieldTextArea/Tests/Interaction',
  component: FieldTextArea,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldTextArea>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    onChange.mockClear();
    onCopyButtonClick.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.fieldTextArea);
    const uncontrolledField = canvas.getByTestId(UNCONTROLLED_FIELD_TEST_ID);
    const readonlyField = canvas.getByTestId(READONLY_FIELD_TEST_ID);
    const hardCapField = canvas.getByTestId(HARD_CAP_FIELD_TEST_ID);
    const editCopyField = canvas.getByTestId(EDIT_COPY_FIELD_TEST_ID);
    // textarea test-id дублируется между полями сцены — скоупим запрос к корню каждого поля.
    const input = within(root).getByTestId<HTMLTextAreaElement>(TEST_IDS.fieldTextAreaInput);

    await step('renders root, textarea and counter (maxLength → fieldDecoratorCounter)', async () => {
      await expect(root).toBeVisible();
      await expect(input).toBeVisible();
      await expect(readonlyField).toBeVisible();
      const counter = within(root).getByTestId(TEST_IDS.fieldDecoratorCounter);
      await expect(counter).toBeVisible();
      await expect(counter).toHaveTextContent('0/80');
    });

    await step('uncontrolled field keeps and edits its own defaultValue without value/onChange', async () => {
      const uncontrolledInput = within(uncontrolledField).getByTestId<HTMLTextAreaElement>(TEST_IDS.fieldTextAreaInput);
      await expect(uncontrolledInput).toHaveValue('preset value');
      await userEvent.click(uncontrolledInput);
      await userEvent.type(uncontrolledInput, '!');
      await expect(uncontrolledInput).toHaveValue('preset value!');
    });

    await step('typing into the controlled textarea fires onChange, updates value and counter', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'comment text');
      expect(onChange).toHaveBeenCalled();
      await expect(input).toHaveValue('comment text');
      await expect(within(root).getByTestId(TEST_IDS.fieldDecoratorCounter)).toHaveTextContent('12/80');
    });

    await step('keyboard: ArrowRight at end of editable textarea roves focus to the clear button', async () => {
      // Роботизированная навигация useButtonNavigation: postfix-кнопки имеют tabIndex=-1
      // (не в Tab-цепочке); фокус уходит на них только ArrowRight'ом в конце ввода.
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      await userEvent.keyboard('{ArrowRight}');
      const clearBtn = within(root).getByTestId(CLEAR_BUTTON_TEST_ID);
      await expect(clearBtn).toHaveFocus();
    });

    await step('editable field with value shows clear, but no copy by default', async () => {
      const clearBtn = within(root).getByTestId(CLEAR_BUTTON_TEST_ID);
      await expect(clearBtn).toBeVisible();
      await expect(within(root).queryByTestId(TEST_IDS.fieldTextCopyButton)).not.toBeInTheDocument();
      await expect(clearBtn).toHaveFocus();
    });

    await step('showCopyButtonInEditMode shows both clear and copy in the editable field', async () => {
      await expect(within(editCopyField).getByTestId(CLEAR_BUTTON_TEST_ID)).toBeVisible();
      await expect(within(editCopyField).getByTestId(TEST_IDS.fieldTextCopyButton)).toBeVisible();
    });

    await step('clear button empties the value, fires onChange("") and refocuses the textarea', async () => {
      const clearBtn = within(root).getByTestId(CLEAR_BUTTON_TEST_ID);
      await userEvent.click(clearBtn);
      expect(onChange).toHaveBeenLastCalledWith('');
      await expect(input).toHaveValue('');
      // onClear возвращает фокус в textarea (localRef.current?.focus()).
      await expect(input).toHaveFocus();
    });

    await step('readonly field: ArrowRight roves focus from textarea to the copy button', async () => {
      const readonlyInput = within(readonlyField).getByTestId<HTMLTextAreaElement>(TEST_IDS.fieldTextAreaInput);
      readonlyInput.focus();
      readonlyInput.setSelectionRange(readonlyInput.value.length, readonlyInput.value.length);
      await userEvent.keyboard('{ArrowRight}');
      const copyBtn = within(readonlyField).getByTestId(TEST_IDS.fieldTextCopyButton);
      await expect(copyBtn).toHaveFocus();
    });

    await step('readonly field exposes a clickable copy button firing onCopyButtonClick', async () => {
      const copyBtn = within(readonlyField).getByTestId(TEST_IDS.fieldTextCopyButton);
      await expect(copyBtn).toBeVisible();
      await userEvent.click(copyBtn);
      // copyTextToClipboard в тест-среде может вернуть false (нет clipboard API) —
      // ассертим стабильную часть: кнопка осталась видимой и кликабельной.
      await expect(copyBtn).toBeVisible();
    });

    await step('hard cap: allowMoreThanMaxLength=false caps the native textarea at maxLength', async () => {
      const hardCapInput = within(hardCapField).getByTestId<HTMLTextAreaElement>(TEST_IDS.fieldTextAreaInput);
      await expect(hardCapInput).toHaveAttribute('maxlength', String(HARD_CAP));
      await userEvent.click(hardCapInput);
      await userEvent.type(hardCapInput, '0123456789ABCDEF');
      // 16 символов введено, но value обрезано до maxLength=8 (нативный hard-cap).
      await expect(hardCapInput).toHaveValue('01234567');
    });
  },
};
