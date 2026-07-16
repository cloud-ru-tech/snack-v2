import { FieldSelect, TEST_IDS } from '@ds/fields';
import { ItemId, ItemProps, TEST_IDS as LIST_TEST_IDS } from '@ds/list';
import { TEST_IDS as TAG_TEST_IDS } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

const options: ItemProps[] = [
  { id: 's', content: { label: 'Small' } },
  { id: 'm', content: { label: 'Medium' } },
  { id: 'l', content: { label: 'Large' } },
];

// Право «Чтение» обязательно (disabled): его чип не получает кнопку удаления и не сбрасывается очисткой.
const permissionOptions: ItemProps[] = [
  { id: 'read', content: { label: 'Read' }, disabled: true },
  { id: 'write', content: { label: 'Write' } },
  { id: 'delete', content: { label: 'Delete' } },
];

const onChangeSingle = fn();
const onChangeSingleCreatable = fn();
const onChangeMultiple = fn();
const onChangeCreatable = fn();
const onChangeDisabledChip = fn();
const onCopyReadonly = fn();

function InteractionScenario() {
  const [single, setSingle] = useState<ItemId | undefined>(undefined);
  const [singleCreatable, setSingleCreatable] = useState<ItemId | undefined>(undefined);
  const [multiple, setMultiple] = useState<ItemId[]>(['s', 'l']);
  const [creatable, setCreatable] = useState<ItemId[]>([]);
  const [disabledChip, setDisabledChip] = useState<ItemId[]>(['read', 'write']);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoActions align='center'>
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.singleRoot}
            label='Size (single)'
            items={options}
            selection='single'
            value={single}
            onChange={value => {
              onChangeSingle(value);
              setSingle(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.singleCreatableRoot}
            label='Size (single, addOptionByEnter)'
            items={options}
            selection='single'
            addOptionByEnter
            value={singleCreatable}
            onChange={value => {
              onChangeSingleCreatable(value);
              setSingleCreatable(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.multipleRoot}
            label='Sizes (multiple)'
            items={options}
            selection='multiple'
            chips
            value={multiple}
            onChange={value => {
              onChangeMultiple(value);
              setMultiple(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.disabledChipRoot}
            label='Permissions (disabled chip)'
            items={permissionOptions}
            selection='multiple'
            chips
            value={disabledChip}
            onChange={value => {
              onChangeDisabledChip(value);
              setDisabledChip(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.multipleCreatableRoot}
            label='Tags (multiple, addOptionByEnter)'
            items={options}
            selection='multiple'
            chips
            addOptionByEnter
            value={creatable}
            onChange={value => {
              onChangeCreatable(value);
              setCreatable(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.readonlyRoot}
            label='Size (readonly)'
            items={options}
            selection='single'
            readonly
            defaultValue='l'
            onCopyButtonClick={onCopyReadonly}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSelect> = {
  title: 'Components/Fields/FieldSelect/Tests/Interaction',
  component: FieldSelect,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldSelect>;

// Droplist рендерит айтемы в portal вне canvasElement — ищем их через document по list-test-id.
function queryItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`[data-test-id^="${LIST_TEST_IDS.baseItem}"]`));
}

function queryFirstItem(): HTMLElement | null {
  return queryItems()[0] ?? null;
}

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const single = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.singleRoot);
    const singleInput = within(single).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
    const singleCreatable = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.singleCreatableRoot);
    const multiple = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.multipleRoot);
    const disabledChip = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.disabledChipRoot);
    const creatable = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.multipleCreatableRoot);
    const readonly = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.readonlyRoot);

    onChangeSingle.mockClear();
    onChangeSingleCreatable.mockClear();
    onChangeMultiple.mockClear();
    onChangeCreatable.mockClear();
    onChangeDisabledChip.mockClear();
    onCopyReadonly.mockClear();

    await step('renders all fields', async () => {
      await expect(single).toBeVisible();
      await expect(singleCreatable).toBeVisible();
      await expect(multiple).toBeVisible();
      await expect(disabledChip).toBeVisible();
      await expect(creatable).toBeVisible();
      await expect(readonly).toBeVisible();
    });

    await step('keyboard: Enter on closed trigger opens the Droplist', async () => {
      singleInput.focus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(queryFirstItem()).not.toBeNull());
      await expect(single).toHaveAttribute('data-focusvisible', 'true');
    });

    await step('keyboard: Escape closes the open Droplist', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('keyboard: ArrowDown re-opens the Droplist and renders items', async () => {
      singleInput.focus();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(queryFirstItem()).not.toBeNull());
    });

    await step('select: click first item fires onChange and sets value', async () => {
      const item = queryFirstItem();
      if (item) {
        await userEvent.click(item);
      }
      await waitFor(() => expect(onChangeSingle).toHaveBeenCalled());
      await waitFor(() => expect(singleInput.value).not.toBe(''));
    });

    await step('clear: clicking clear empties the field (onChange undefined)', async () => {
      const clearButton = within(single).getByTestId(TEST_IDS.fieldSelectClear);
      await userEvent.click(clearButton);
      await waitFor(() => expect(singleInput.value).toBe(''));
      expect(onChangeSingle).toHaveBeenLastCalledWith(undefined);
      // Возврат фокуса на input после clear проверяется в реальной среде (Playwright) —
      // в storybook-test фокус после клика по кнопке ненадёжен.
    });

    await step('search: typing filters the open Droplist (fewer items shown)', async () => {
      singleInput.focus();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(queryItems().length).toBeGreaterThan(0));
      await userEvent.type(singleInput, 'lar');
      await waitFor(() => expect(queryItems().length).toBeLessThan(options.length));
      // Закрываем дроплист, чтобы его portal-overlay не перекрывал соседние поля в следующих шагах.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('addOptionByEnter (single): Enter on typed text commits it as the value', async () => {
      const input = within(singleCreatable).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      input.focus();
      await userEvent.type(input, 'custom-size');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(onChangeSingleCreatable).toHaveBeenCalledWith('custom-size'));
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('chip remove: clicking a chip remove button updates the multiple field', async () => {
      const chipsRow = within(multiple).getByTestId(TEST_IDS.fieldSelectChips);
      const removeButtons = within(chipsRow).getAllByTestId(TAG_TEST_IDS.tag.removeButton);
      const before = removeButtons.length;
      await expect(before).toBeGreaterThan(0);
      await userEvent.click(removeButtons[0]);
      await waitFor(() => expect(onChangeMultiple).toHaveBeenCalled());
      await waitFor(() =>
        expect(
          within(within(multiple).getByTestId(TEST_IDS.fieldSelectChips)).queryAllByTestId(
            TAG_TEST_IDS.tag.removeButton,
          ),
        ).toHaveLength(before - 1),
      );
    });

    await step('Backspace: empty input removes the last chip (multiple)', async () => {
      const multipleInput = within(multiple).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      // Запрос скоупим к полю целиком: при удалении последнего чипа исчезает и сам chips-row.
      const chipsBefore = within(multiple).queryAllByTestId(TAG_TEST_IDS.tag.removeButton).length;
      await expect(chipsBefore).toBeGreaterThan(0);
      multipleInput.focus();
      await userEvent.keyboard('{Backspace}');
      await waitFor(() =>
        expect(within(multiple).queryAllByTestId(TAG_TEST_IDS.tag.removeButton)).toHaveLength(chipsBefore - 1),
      );
    });

    await step('disabled chip: has no remove button and survives clear', async () => {
      const chipsRow = within(disabledChip).getByTestId(TEST_IDS.fieldSelectChips);
      // Два чипа (read disabled + write), но только write получает кнопку удаления.
      await expect(within(chipsRow).getAllByTestId(TAG_TEST_IDS.tag.removeButton)).toHaveLength(1);
      const clearButton = within(disabledChip).getByTestId(TEST_IDS.fieldSelectClear);
      await userEvent.click(clearButton);
      // После очистки остаётся только обязательный disabled-чип «read».
      await waitFor(() => expect(onChangeDisabledChip).toHaveBeenLastCalledWith(['read']));
    });

    await step('addOptionByEnter (multiple): Enter on typed text creates a new chip', async () => {
      const creatableInput = within(creatable).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      creatableInput.focus();
      await userEvent.type(creatableInput, 'custom-zone');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(onChangeCreatable).toHaveBeenCalledWith(['custom-zone']));
      await waitFor(() =>
        expect(
          within(within(creatable).getByTestId(TEST_IDS.fieldSelectChips)).getAllByTestId(
            TAG_TEST_IDS.tag.removeButton,
          ),
        ).toHaveLength(1),
      );
    });

    await step('readonly: copy button is visible and clickable', async () => {
      // onCopyButtonClick привязан к успешной записи в буфер, недоступной в storybook-test
      // (clipboard — browser-only); фактический вызов колбэка проверяется в реальной среде.
      const copyButton = within(readonly).getByTestId(TEST_IDS.fieldSelectCopy);
      await expect(copyButton).toBeVisible();
      await userEvent.click(copyButton);
      await expect(copyButton).toBeVisible();
    });
  },
};
