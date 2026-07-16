import {
  FieldSelect,
  FieldSelectMultipleProps,
  FieldSelectProps,
  Selection,
  SIZE,
  TEST_IDS,
  VALIDATION_STATE,
} from '@ds/fields';
import { SearchSVG } from '@ds/icons/interface/system';
import { ItemId, ItemProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const options: ItemProps[] = [
  { id: 's', content: { label: 'Small (1 vCPU, 2 GB)' } },
  { id: 'm', content: { label: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { label: 'Large (4 vCPU, 8 GB)' } },
  { id: 'xl', content: { label: 'X-Large (8 vCPU, 16 GB)' } },
];

// FieldSelectProps — дискриминированный union по `selection`. Для Playground'а нужен плоский
// superset: берём multiple-вариант (в нём chips/removeByBackspace/formatSelected) и расширяем
// `selection`/`defaultValue` под обе ветки; render кастует обратно к FieldSelectProps.
type StoryProps = Omit<FieldSelectMultipleProps, 'selection' | 'defaultValue'> & {
  selection?: Selection;
  defaultValue?: ItemId | ItemId[];
};

const meta: Meta<StoryProps> = {
  title: 'Components/Fields/FieldSelect',
  component: FieldSelect as Meta<StoryProps>['component'],
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Instance size',
    placeholder: 'Choose…',
    hint: 'Pick a compute size',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    selection: 'single',
    searchable: true,
    autocomplete: false,
    addOptionByEnter: false,
    enableFuzzySearch: true,
    chips: true,
    showClearButton: true,
    showCopyButton: true,
    required: false,
    disabled: false,
    readonly: false,
    defaultValue: 'm',
    items: options,
    iconBefore: 'search',
    'data-test-id': TEST_IDS.fieldSelect,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    // selection — enum из API: значения/options подтягивает docgen, ручаем только radio (2 значения).
    selection: { control: 'radio' },
    // multiple-only оси — прячем, пока selection=single (значения не имеют смысла в single).
    chips: { if: { arg: 'selection', eq: 'multiple' } },
    removeByBackspace: { if: { arg: 'selection', eq: 'multiple' } },
    formatSelected: { if: { arg: 'selection', eq: 'multiple' } },
    // copy-кнопка появляется только в readonly.
    showCopyButton: { if: { arg: 'readonly', eq: true } },
    iconBefore: {
      control: 'select',
      options: ['none', 'search'],
      mapping: { none: undefined, search: <SearchSVG /> },
    },
    // controlled-партнёры и slot/passthrough-пропы скрыты из панели (uncontrolled Playground живёт на defaultValue).
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    items: { table: { disable: true } },
    pinTop: { table: { disable: true } },
    pinBottom: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Select-поле с выпадающим списком (Droplist) и single/multiple selection.</DemoHint>
        <DemoActions block>
          <FieldSelect {...(args as FieldSelectProps)} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSelect)).toBeVisible();
  },
};
