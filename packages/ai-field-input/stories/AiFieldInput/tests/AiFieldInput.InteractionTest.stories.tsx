import { AiFieldInput, AiFieldInputProps, AiFieldInputValue, SEND_STATE } from '@ds/ai-field-input';
import { Button } from '@ds/button';
import { TEST_IDS as LIST_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { FooterLeftActions, useStoryTexts } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const TOGGLE_TEST_ID = 'ai-field-input-toggle-disabled';
const handlePlusSelect = fn();

const meta: Meta<typeof AiFieldInput> = {
  title: 'AI/AiFieldInput/Tests/Interaction',
  component: AiFieldInput,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onSubmit: fn(),
    onChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiFieldInput>;

function Controlled(args: AiFieldInputProps) {
  const { valueTextAndSkill, skills } = useStoryTexts();
  const [value, setValue] = useState<AiFieldInputValue>(valueTextAndSkill);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <AiFieldInput
        {...args}
        value={value}
        skills={skills}
        disabled={disabled}
        onChange={next => {
          setValue(next);
          args.onChange?.(next);
        }}
        footerLeftActions={<FooterLeftActions onPlusSelect={handlePlusSelect} modelSearchable />}
      />
      <Button label='Toggle disabled' data-test-id={TOGGLE_TEST_ID} onClick={() => setDisabled(prev => !prev)} />
    </>
  );
}

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>
          Enter отправляет, Shift+Enter переносит строку, крестик удаляет чип, «/» вставляет скилл с подсказкой
          параметров, Backspace удаляет чип в два нажатия, кнопки футера открывают списки, disabled выключает футер.
        </DemoHint>
        <Controlled {...args} />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const editor = await canvas.findByTestId(TEST_IDS.editor);

    await step('render: chips from value', async () => {
      await expect(canvas.getAllByTestId(TEST_IDS.chip)).toHaveLength(2);
      await expect(canvas.getByTestId(TEST_IDS.send)).toHaveAttribute('data-state', SEND_STATE.Active);
    });

    await step('keyboard: Shift+Enter inserts a line break', async () => {
      await userEvent.click(editor);
      await userEvent.keyboard('{Shift>}{Enter}{/Shift}вторая строка');
      await waitFor(() => expect(args.onChange).toHaveBeenCalled());
      expect(args.onSubmit).not.toHaveBeenCalled();
    });

    await step('keyboard: Enter submits the value', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onSubmit).toHaveBeenCalledTimes(1);
    });

    await step('chip: remove button deletes the chip', async () => {
      const [firstRemove] = canvas.getAllByTestId(TEST_IDS.chipRemove);
      await userEvent.pointer({ keys: '[MouseLeft>]', target: firstRemove });
      await waitFor(() => expect(canvas.getAllByTestId(TEST_IDS.chip)).toHaveLength(1));
    });

    await step('menu: Plus opens the list and reports the selected item', async () => {
      handlePlusSelect.mockClear();
      const plus = canvas.getByTestId(TEST_IDS.plus);

      await userEvent.click(plus);
      await expect(plus).toHaveAttribute('data-pressed', 'true');

      const [firstItem] = await within(document.body).findAllByTestId(TEST_IDS.menuItem);
      await userEvent.click(firstItem);

      expect(handlePlusSelect).toHaveBeenCalledWith('files');
      await waitFor(() => expect(plus).not.toHaveAttribute('data-pressed'));
    });

    await step('menu: Model search filters the list, selection updates the label', async () => {
      const model = canvas.getByTestId(TEST_IDS.model);
      const body = within(document.body);

      await userEvent.click(model);
      const searchItem = await body.findByTestId(LIST_TEST_IDS.searchItem);
      // У поля поиска Droplist нет своего data-test-id, а клик по обёртке не переводит фокус в input.
      const searchInput = searchItem.querySelector('input');
      if (!searchInput) throw new Error('Droplist search input not found');
      await userEvent.type(searchInput, 'Lite');
      await waitFor(() => expect(body.getAllByTestId(TEST_IDS.menuItem)).toHaveLength(2));

      await userEvent.click(body.getAllByTestId(TEST_IDS.menuItem)[1]);
      await waitFor(() => expect(model).toHaveTextContent('GigaChat Lite'));
    });

    await step('keyboard: Enter opens the Effort list, Escape closes it', async () => {
      const effort = canvas.getByTestId(TEST_IDS.effort);

      effort.focus();
      await userEvent.keyboard('{Enter}');
      await expect(await within(document.body).findByTestId(TEST_IDS.menu)).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(within(document.body).queryByTestId(TEST_IDS.menu)).toBeNull());
      await expect(effort).not.toHaveAttribute('data-pressed');
    });

    await step('skill: params hint after the chip disappears on typing', async () => {
      // Каретка в конец поля: без этого клик ставит её в произвольную точку текста.
      editor.focus();
      const selection = editor.ownerDocument.getSelection();
      selection?.selectAllChildren(editor);
      selection?.collapseToEnd();

      await userEvent.keyboard(' /tr');
      await expect(await canvas.findByTestId(TEST_IDS.actionList)).toBeVisible();
      await userEvent.keyboard('{Enter}');

      await expect(await canvas.findByTestId(TEST_IDS.chipHint)).toBeVisible();
      await userEvent.keyboard('en');
      await waitFor(() => expect(canvas.queryByTestId(TEST_IDS.chipHint)).toBeNull());

      await userEvent.keyboard('{Backspace}{Backspace}');
      await expect(await canvas.findByTestId(TEST_IDS.chipHint)).toBeVisible();
    });

    await step('keyboard: Backspace selects the chip first, then deletes it', async () => {
      const chipsBefore = canvas.getAllByTestId(TEST_IDS.chip).length;

      await userEvent.keyboard('{Backspace}');
      await waitFor(() => expect(canvas.getAllByTestId(TEST_IDS.chip).at(-1)).toHaveAttribute('data-pressed', 'true'));
      await expect(canvas.getAllByTestId(TEST_IDS.chip)).toHaveLength(chipsBefore);

      await userEvent.keyboard('{Backspace}');
      await waitFor(() => expect(canvas.getAllByTestId(TEST_IDS.chip)).toHaveLength(chipsBefore - 1));
    });

    await step('search: slash before a word opens the list without the search hint', async () => {
      await userEvent.keyboard(' word{ArrowLeft}{ArrowLeft}{ArrowLeft}{ArrowLeft}/');
      await expect(await canvas.findByTestId(TEST_IDS.actionList)).toBeVisible();
      await expect(canvas.queryByTestId(TEST_IDS.searchHint)).toBeNull();

      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(canvas.queryByTestId(TEST_IDS.actionList)).toBeNull());
    });

    await step('search: slash glued to a word does not open the list', async () => {
      // После Escape каретка стоит за «/»: четыре шага вправо — в конец слова. End в contenteditable тестовая среда не поддерживает.
      await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight} x/');
      await expect(canvas.queryByTestId(TEST_IDS.actionList)).toBeNull();
    });

    await step('disabled: footer buttons follow the field', async () => {
      await userEvent.click(canvas.getByTestId(TOGGLE_TEST_ID));
      await expect(canvas.getByTestId(TEST_IDS.plus)).toBeDisabled();
      await expect(canvas.getByTestId(TEST_IDS.send)).toBeDisabled();
    });
  },
};
