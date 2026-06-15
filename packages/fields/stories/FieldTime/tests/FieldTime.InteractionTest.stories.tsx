import { TimeValue } from '@ds/calendar';
import { FieldTime, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { CLEAR_BUTTON_TEST_ID, TEST_IDS as STORY_TEST_IDS } from '../testIds';

const onChange = fn();
const onClearButtonClick = fn();
const onRequiredClear = fn();
const onCopyButtonClick = fn();

function InteractionScenario() {
  const [editable, setEditable] = useState<TimeValue | undefined>(undefined);
  const [required, setRequired] = useState<TimeValue | undefined>({ hours: 14, minutes: 25, seconds: 36 });

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Editable (segment mask)</DemoTitle>
        <DemoHint>
          Фокус выделяет первый сегмент, цифры заполняют сегменты с авто-переходом, ←/→ двигают выбор, Backspace очищает
          сегмент, ArrowDown открывает picker, Escape закрывает, очистка сбрасывает значение и закрывает.
        </DemoHint>
        <DemoActions align='center'>
          <FieldTime
            data-test-id={STORY_TEST_IDS.fieldTime.editableRoot}
            label='Время'
            showSeconds
            value={editable}
            onChange={next => {
              onChange(next);
              setEditable(next);
            }}
            onClearButtonClick={onClearButtonClick}
          />
        </DemoActions>
        <DemoTitle>Required (clear refocuses + reopens)</DemoTitle>
        <DemoHint>
          required: очистка возвращает фокус в input и переоткрывает picker (дивергентная ветка onClear).
        </DemoHint>
        <DemoActions align='center'>
          <FieldTime
            data-test-id={STORY_TEST_IDS.fieldTime.requiredRoot}
            label='Время'
            required
            showSeconds
            value={required}
            onChange={setRequired}
            onClearButtonClick={onRequiredClear}
          />
        </DemoActions>
        <DemoTitle>Readonly + copy</DemoTitle>
        <DemoHint>readonly показывает кнопку копирования и скрывает очистку; ←/→ роуют фокус input↔copy.</DemoHint>
        <DemoActions align='center'>
          <FieldTime
            data-test-id={STORY_TEST_IDS.fieldTime.readonlyRoot}
            label='Время'
            readonly
            defaultValue={{ hours: 14, minutes: 25, seconds: 36 }}
            onCopyButtonClick={onCopyButtonClick}
            showCopyButton
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldTime> = {
  title: 'Components/Fields/FieldTime/Tests/Interaction',
  component: FieldTime,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldTime>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    onChange.mockClear();
    onClearButtonClick.mockClear();
    onRequiredClear.mockClear();
    onCopyButtonClick.mockClear();
    const canvas = within(canvasElement);

    const editableRoot = canvas.getByTestId(STORY_TEST_IDS.fieldTime.editableRoot);
    const editable = within(editableRoot);
    const input = editable.getByTestId<HTMLInputElement>(TEST_IDS.fieldTimeInput);
    const icon = editable.getByTestId(TEST_IDS.fieldTimeIcon);

    await step('renders root, input and clock icon (collapsed picker)', async () => {
      await expect(editableRoot).toBeVisible();
      await expect(input).toBeVisible();
      await expect(icon).toBeVisible();
      await expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    await step('focus engages the segment mask (placeholder чч:мм:сс fills)', async () => {
      input.focus();
      await waitFor(() => expect(input.value).toBe('чч:мм:сс'));
      // На фокус выбран первый сегмент (часы, индексы 0..2).
      await expect(input.selectionStart).toBe(0);
      await expect(input.selectionEnd).toBe(2);
    });

    await step('segment ←/→ moves the selection between hours / minutes slots', async () => {
      input.focus();
      await waitFor(() => expect(input.selectionStart).toBe(0));
      await userEvent.keyboard('{ArrowRight}');
      // Минуты — следующий сегмент (индексы 3..5).
      await expect(input.selectionStart).toBe(3);
      await expect(input.selectionEnd).toBe(5);
      await userEvent.keyboard('{ArrowLeft}');
      await expect(input.selectionStart).toBe(0);
      await expect(input.selectionEnd).toBe(2);
    });

    await step('typing digits fills segments and commits a TimeValue (onChange)', async () => {
      input.blur();
      input.focus();
      await waitFor(() => expect(input.value).toBe('чч:мм:сс'));
      onChange.mockClear();
      await userEvent.keyboard('093045');
      await waitFor(() => expect(input.value).toBe('09:30:45'));
      await waitFor(() => expect(onChange).toHaveBeenLastCalledWith({ hours: 9, minutes: 30, seconds: 45 }));
    });

    await step('Backspace clears the focused segment back to its placeholder', async () => {
      // После предыдущего шага курсор не гарантированно сбрасывается на первый сегмент в
      // storybook-test — явно выделяем сегмент часов (индексы 0..2) перед Backspace.
      // Точную позицию курсора синтетический движок не гарантирует (test-environment-pitfalls).
      input.focus();
      input.setSelectionRange(0, 2);
      await userEvent.keyboard('{Backspace}');
      await expect(input.value.slice(0, 2)).toBe('чч');
    });

    // Paste (onPaste → заполнение сегментов) — browser-specific, ненадёжен в storybook-test;
    // проверяется в реальной среде. Ввод цифр уже покрыт шагом выше.

    await step('clear button is visible for a non-empty editable field', async () => {
      await expect(editable.getByTestId(CLEAR_BUTTON_TEST_ID)).toBeVisible();
    });

    await step('keyboard: ArrowRight from the last segment roves focus to clear, ArrowLeft returns', async () => {
      // Движок на последнем сегменте ставит каретку в конец строки, и нав-цепочка в том же
      // keydown роуит фокус на clear (легаси-паритет: clear с tabIndex −1 достижим стрелками).
      input.focus();
      input.setSelectionRange(6, 8); // сегмент секунд — последний
      await userEvent.keyboard('{ArrowRight}');
      await expect(editable.getByTestId(CLEAR_BUTTON_TEST_ID)).toHaveFocus();
      await userEvent.keyboard('{ArrowLeft}');
      await expect(input).toHaveFocus();
    });

    await step('clear resets the value, fires the callback and (non-required) closes the picker', async () => {
      onChange.mockClear();
      await userEvent.click(editable.getByTestId(CLEAR_BUTTON_TEST_ID));
      expect(onClearButtonClick).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(undefined);
      // Без required onClear делает blur + close.
      await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
    });

    await step('ArrowDown opens the time picker (aria-expanded=true)', async () => {
      input.focus();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
    });

    await step('Escape on the input closes the picker', async () => {
      // ArrowDown уводит фокус в picker-барабаны (setTimeout handoff) — возвращаем его на input.
      input.focus();
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
    });

    await step('typing while the picker is open closes it (onEdit)', async () => {
      input.focus();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
      input.focus();
      await userEvent.keyboard('1');
      await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
    });

    await step('required clear refocuses the input and reopens the picker', async () => {
      const requiredRoot = canvas.getByTestId(STORY_TEST_IDS.fieldTime.requiredRoot);
      const requiredField = within(requiredRoot);
      const requiredInput = requiredField.getByTestId<HTMLInputElement>(TEST_IDS.fieldTimeInput);
      await userEvent.click(requiredField.getByTestId(CLEAR_BUTTON_TEST_ID));
      expect(onRequiredClear).toHaveBeenCalledTimes(1);
      // required-ветка onClear: focus + reopen (вместо blur + close у non-required).
      await waitFor(() => expect(requiredInput).toHaveFocus());
      await waitFor(() => expect(requiredInput).toHaveAttribute('aria-expanded', 'true'));
    });

    await step('readonly exposes a clickable copy button and ←/→ roves input↔copy', async () => {
      const readonlyRoot = canvas.getByTestId(STORY_TEST_IDS.fieldTime.readonlyRoot);
      const readonlyField = within(readonlyRoot);
      const readonlyInput = readonlyField.getByTestId<HTMLInputElement>(TEST_IDS.fieldTimeInput);
      const copyBtn = readonlyField.getByTestId(TEST_IDS.fieldTextCopyButton);
      // Очистки в readonly нет.
      await expect(readonlyField.queryByTestId(CLEAR_BUTTON_TEST_ID)).toBeNull();
      await expect(copyBtn).toBeVisible();
      // Readonly роуит ArrowRight на copy (сегментный движок в readonly не перехватывает клавиши).
      readonlyInput.focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect(copyBtn).toHaveFocus();
      // Реальная запись в буфер (swap CopySVG→CheckSVG + onCopyButtonClick) требует clipboard-доступа,
      // которого нет в storybook-test — подтверждаем кликабельность; визуальный swap покрывает VM/readonly.
      await userEvent.click(copyBtn);
      await expect(copyBtn).toBeVisible();
    });
  },
};
