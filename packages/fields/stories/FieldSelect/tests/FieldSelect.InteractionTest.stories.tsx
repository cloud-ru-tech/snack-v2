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

const collapseOptions: ItemProps[] = [
  {
    type: 'collapse',
    id: 'advanced',
    content: { label: 'Advanced sizes' },
    items: [
      { id: 'xl', content: { label: 'X-Large' } },
      { id: 'xxl', content: { label: 'XX-Large' } },
    ],
  },
];

const onChangeSingle = fn();
const onChangeSingleAllowCustom = fn();
const onChangeMultiple = fn();
const onChangeCreatable = fn();
const onChangeCreatableWithoutChips = fn();
const onChangeEnterOnly = fn();
const onChangeDisabledChip = fn();
const onCopyReadonly = fn();
const onChangeEmptyString = fn();

const EMPTY_STRING_PLACEHOLDER = 'Choose…';

function InteractionScenario() {
  const [single, setSingle] = useState<ItemId | undefined>(undefined);
  const [singleAllowCustom, setSingleAllowCustom] = useState<ItemId | undefined>(undefined);
  const [multiple, setMultiple] = useState<ItemId[]>(['s', 'l']);
  const [creatable, setCreatable] = useState<ItemId[]>([]);
  const [creatableWithoutChips, setCreatableWithoutChips] = useState<ItemId[]>(['custom-first']);
  const [enterOnly, setEnterOnly] = useState<ItemId[]>([]);
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
            data-test-id={STORY_TEST_IDS.fieldSelect.singleAllowCustomRoot}
            label='Size (single, allowCustomOption)'
            items={options}
            selection='single'
            allowCustomOption
            value={singleAllowCustom}
            onChange={value => {
              onChangeSingleAllowCustom(value);
              setSingleAllowCustom(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.collapseRoot}
            label='Instance size (collapse)'
            items={collapseOptions}
            selection='single'
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
            label='Tags (multiple, allowCustomOption)'
            items={options}
            selection='multiple'
            chips
            allowCustomOption
            value={creatable}
            onChange={value => {
              onChangeCreatable(value);
              setCreatable(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.multipleEnterOnlyRoot}
            label='Tags (multiple, enter only)'
            items={options}
            selection='multiple'
            chips
            allowCustomOption
            addCustomOptionTriggers={['enter']}
            value={enterOnly}
            onChange={value => {
              onChangeEnterOnly(value);
              setEnterOnly(value);
            }}
          />
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.multipleCreatableWithoutChipsRoot}
            label='Tags (multiple, allowCustomOption, chips=false)'
            items={options}
            selection='multiple'
            chips={false}
            allowCustomOption
            value={creatableWithoutChips}
            onChange={value => {
              onChangeCreatableWithoutChips(value);
              setCreatableWithoutChips(value);
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
          <FieldSelect
            data-test-id={STORY_TEST_IDS.fieldSelect.emptyStringRoot}
            label='Size (single, empty string value)'
            placeholder={EMPTY_STRING_PLACEHOLDER}
            items={options}
            selection='single'
            value=''
            onChange={onChangeEmptyString}
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
// Подчёркивание в префиксе обязательно: id самого айтема — `<baseItem>_<id>`, а внутренние слоты
// (`<baseItem>-marker`, `-label`, `-checkbox`) идут через дефис и без него попали бы в выборку.
function queryItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`[data-test-id^="${LIST_TEST_IDS.baseItem}_"]`));
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
    const singleAllowCustom = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.singleAllowCustomRoot);
    const collapse = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.collapseRoot);
    const multiple = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.multipleRoot);
    const disabledChip = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.disabledChipRoot);
    const creatable = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.multipleCreatableRoot);
    const creatableWithoutChips = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.multipleCreatableWithoutChipsRoot);
    const enterOnly = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.multipleEnterOnlyRoot);
    const readonly = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.readonlyRoot);
    const emptyString = canvas.getByTestId(STORY_TEST_IDS.fieldSelect.emptyStringRoot);

    onChangeSingle.mockClear();
    onChangeSingleAllowCustom.mockClear();
    onChangeMultiple.mockClear();
    onChangeCreatable.mockClear();
    onChangeCreatableWithoutChips.mockClear();
    onChangeEnterOnly.mockClear();
    onChangeDisabledChip.mockClear();
    onCopyReadonly.mockClear();
    onChangeEmptyString.mockClear();

    await step('renders all fields', async () => {
      await expect(single).toBeVisible();
      await expect(singleAllowCustom).toBeVisible();
      await expect(collapse).toBeVisible();
      await expect(multiple).toBeVisible();
      await expect(disabledChip).toBeVisible();
      await expect(creatable).toBeVisible();
      await expect(creatableWithoutChips).toBeVisible();
      await expect(enterOnly).toBeVisible();
      await expect(readonly).toBeVisible();
      await expect(emptyString).toBeVisible();
    });

    await step('empty string value: treated as no value (placeholder shown, no clear button)', async () => {
      const input = within(emptyString).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;

      await expect(input.value).toBe('');
      await expect(input).toHaveAttribute('placeholder', EMPTY_STRING_PLACEHOLDER);
      expect(within(emptyString).queryByTestId(TEST_IDS.fieldSelectClear)).toBeNull();
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

    await step('collapse: clicking a group header keeps the Droplist open; selecting a child closes it', async () => {
      const input = within(collapse).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      const documentCanvas = within(document.body);

      await userEvent.click(input);
      await waitFor(() => expect(documentCanvas.getByTestId(`${LIST_TEST_IDS.baseItem}_advanced`)).toBeVisible());
      await userEvent.click(documentCanvas.getByTestId(`${LIST_TEST_IDS.baseItem}_advanced`));
      await waitFor(() => expect(documentCanvas.getByTestId(`${LIST_TEST_IDS.baseItem}_xl`)).toBeVisible());

      await userEvent.click(documentCanvas.getByTestId(`${LIST_TEST_IDS.baseItem}_xl`));
      await waitFor(() => expect(documentCanvas.queryByTestId(`${LIST_TEST_IDS.baseItem}_advanced`)).toBeNull());
      await expect(input.value).toBe('X-Large');
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

    await step('search: clearing the input then leaving the field restores the selected label', async () => {
      const selected = singleInput.value;
      const lastChange = onChangeSingle.mock.lastCall?.[0];

      singleInput.focus();
      await userEvent.clear(singleInput);
      await waitFor(() => expect(singleInput.value).toBe(''));
      await userEvent.click(singleInput);
      await waitFor(() => expect(singleInput.value).toBe(selected));
      expect(onChangeSingle).toHaveBeenLastCalledWith(lastChange);
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('clear: clicking clear empties the field (onChange undefined)', async () => {
      const clearButton = within(single).getByTestId(TEST_IDS.fieldSelectClear);
      await userEvent.click(clearButton);
      await waitFor(() => expect(singleInput.value).toBe(''));
      expect(onChangeSingle).toHaveBeenLastCalledWith(undefined);
      // Очистка должна «держаться»: поле controlled, потребитель прислал `undefined` — компонент
      // не имеет права откатиться на прошлый локальный выбор (крестик исчезает вместе со значением).
      await waitFor(() => expect(within(single).queryByTestId(TEST_IDS.fieldSelectClear)).toBeNull());
      // Возврат фокуса на input после clear проверяется в реальной среде (Playwright) —
      // в storybook-test фокус после клика по кнопке ненадёжен.
    });

    await step('search: typing filters the open Droplist (fewer items shown)', async () => {
      singleInput.focus();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(queryItems().length).toBeGreaterThan(0));
      await userEvent.type(singleInput, 'lar');
      // Из трёх опций fuzzy-запрос `lar` оставляет только `Large`.
      await waitFor(() => expect(queryItems()).toHaveLength(1));
      // Закрываем дроплист, чтобы его portal-overlay не перекрывал соседние поля в следующих шагах.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('allowCustomOption (single): Escape discards typed text without committing', async () => {
      const input = within(singleAllowCustom).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      input.focus();
      await userEvent.type(input, 'esc-me');
      expect(onChangeSingleAllowCustom).not.toHaveBeenCalled();
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
      expect(onChangeSingleAllowCustom).not.toHaveBeenCalled();
      await expect(input.value).toBe('');
    });

    await step('allowCustomOption (single): clicking an existing item does not commit the typed query', async () => {
      const input = within(singleAllowCustom).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      await userEvent.click(input);
      await userEvent.type(input, 'med');
      const mediumItemSelector = `[data-test-id="${LIST_TEST_IDS.baseItem}_m"]`;
      await waitFor(() => expect(input.ownerDocument.querySelector(mediumItemSelector)).not.toBeNull());
      await userEvent.click(input.ownerDocument.querySelector(mediumItemSelector) as HTMLElement);
      await waitFor(() => expect(onChangeSingleAllowCustom).toHaveBeenLastCalledWith('m'));
      expect(onChangeSingleAllowCustom.mock.calls.map(call => call[0])).not.toContain('med');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
      await expect(input.value).toBe('Medium');
    });

    await step('allowCustomOption (single): Enter on typed text commits it as the value', async () => {
      const input = within(singleAllowCustom).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      await userEvent.click(within(singleAllowCustom).getByTestId(TEST_IDS.fieldSelectClear));
      onChangeSingleAllowCustom.mockClear();
      await userEvent.type(input, 'custom-single');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(onChangeSingleAllowCustom).toHaveBeenCalledWith('custom-single'));
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('allowCustomOption (single): blur commits the typed value', async () => {
      const input = within(singleAllowCustom).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      await userEvent.type(input, 'from-single-blur', {
        initialSelectionStart: 0,
        initialSelectionEnd: input.value.length,
      });
      await userEvent.click(singleInput);
      await waitFor(() => expect(onChangeSingleAllowCustom).toHaveBeenLastCalledWith('from-single-blur'));
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

    await step('allowCustomOption (multiple, chips=false): blur commits only newly typed text', async () => {
      const input = within(creatableWithoutChips).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      await expect(input.value).toBe('custom-first');

      input.focus();
      await userEvent.click(singleInput);
      expect(onChangeCreatableWithoutChips).not.toHaveBeenCalled();
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());

      await userEvent.type(input, 'custom-second', {
        initialSelectionStart: 0,
        initialSelectionEnd: input.value.length,
      });
      await userEvent.click(singleInput);
      await waitFor(() =>
        expect(onChangeCreatableWithoutChips).toHaveBeenLastCalledWith(['custom-first', 'custom-second']),
      );
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('allowCustomOption (multiple): Enter on typed text creates a new chip', async () => {
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
      await expect(within(creatable).getByTestId(TEST_IDS.fieldSelectInput)).toHaveFocus();
      await waitFor(() =>
        expect(document.querySelector(`[data-test-id="${LIST_TEST_IDS.baseItem}_custom-zone"]`)).not.toBeNull(),
      );
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('allowCustomOption (multiple): Space commits the typed value as a chip', async () => {
      const creatableInput = within(creatable).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      creatableInput.focus();
      await userEvent.type(creatableInput, 'from-space');
      await userEvent.keyboard(' ');
      await waitFor(() => expect(onChangeCreatable).toHaveBeenLastCalledWith(['custom-zone', 'from-space']));
    });

    await step('allowCustomOption (multiple): Comma commits the typed value as a chip', async () => {
      const creatableInput = within(creatable).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      creatableInput.focus();
      await userEvent.type(creatableInput, 'from-comma');
      await userEvent.keyboard(',');
      await waitFor(() =>
        expect(onChangeCreatable).toHaveBeenLastCalledWith(['custom-zone', 'from-space', 'from-comma']),
      );
    });

    await step('allowCustomOption (multiple): blur commits the typed value and adds it to the list', async () => {
      const creatableInput = within(creatable).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      creatableInput.focus();
      await userEvent.type(creatableInput, 'from-blur');
      await userEvent.click(singleInput);
      await waitFor(() =>
        expect(onChangeCreatable).toHaveBeenLastCalledWith(['custom-zone', 'from-space', 'from-comma', 'from-blur']),
      );
      await userEvent.click(creatableInput);
      await waitFor(() =>
        expect(document.querySelector(`[data-test-id="${LIST_TEST_IDS.baseItem}_from-blur"]`)).not.toBeNull(),
      );
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('allowCustomOption (multiple): clicking an existing item does not commit the typed query', async () => {
      const creatableInput = within(creatable).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      creatableInput.focus();
      await userEvent.type(creatableInput, 'sm');
      await waitFor(() =>
        expect(document.querySelector(`[data-test-id="${LIST_TEST_IDS.baseItem}_s"]`)).not.toBeNull(),
      );
      await userEvent.click(document.querySelector(`[data-test-id="${LIST_TEST_IDS.baseItem}_s"]`) as HTMLElement);
      await waitFor(() => {
        const last = onChangeCreatable.mock.lastCall?.[0] as ItemId[] | undefined;
        expect(last?.includes('sm')).toBe(false);
        expect(last).toContain('s');
      });
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('allowCustomOption (multiple): Enter on an already selected value does not duplicate it', async () => {
      const creatableInput = within(creatable).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      const last = onChangeCreatable.mock.lastCall?.[0];
      creatableInput.focus();
      await userEvent.type(creatableInput, 'custom-zone');
      await userEvent.keyboard('{Enter}');
      expect(onChangeCreatable.mock.lastCall?.[0]).toEqual(last);
      await waitFor(() => expect(creatableInput.value).toBe(''));
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
    });

    await step('allowCustomOption (multiple, enter only): blur does not commit, Enter does', async () => {
      const input = within(enterOnly).getByTestId(TEST_IDS.fieldSelectInput) as HTMLInputElement;
      input.focus();
      await userEvent.type(input, 'should-not-blur');
      await userEvent.click(singleInput);
      expect(onChangeEnterOnly).not.toHaveBeenCalled();
      input.focus();
      await userEvent.type(input, 'only-enter');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(onChangeEnterOnly).toHaveBeenCalledWith(['only-enter']));
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryFirstItem()).toBeNull());
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
