import {
  ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT,
  ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_DEFAULT,
  FieldSelect,
  FieldSelectMultipleAddCustomOptionTrigger,
  FieldSelectMultipleProps,
  FieldSelectProps,
  FieldSelectSingleAddCustomOptionTrigger,
  Selection,
  SELECTION_MODE,
  SIZE,
  TEST_IDS,
  VALIDATION_STATE,
} from '@ds/fields';
import { SearchSVG } from '@ds/icons/interface/system';
import { ItemId, ItemProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const options: ItemProps[] = [
  { id: 's', content: { label: 'Small (1 vCPU, 2 GB)' } },
  { id: 'm', content: { label: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { label: 'Large (4 vCPU, 8 GB)' } },
  { id: 'xl', content: { label: 'X-Large (8 vCPU, 16 GB)' } },
];

// FieldSelectProps — дискриминированный union по `selection`.
// Для Playground'а нужен плоский superset: multiple-ветка (chips/removeByBackspace/formatSelected)
// плюс `selection`/`defaultValue` под обе ветки; render кастует обратно к FieldSelectProps.
type StoryProps = Omit<
  FieldSelectMultipleProps,
  'selection' | 'defaultValue' | 'allowCustomOption' | 'addCustomOptionTriggers'
> & {
  defaultValue?: ItemId | ItemId[];
  selection?: Selection;
  allowCustomOption?: boolean;
  addCustomOptionTriggers: [];
  /** Служебный режим панели: `off`, пока `allowCustomOption` выключен, иначе текущий `selection`. */
  customOptionControls: 'off' | Selection;
  triggersSingle?: FieldSelectSingleAddCustomOptionTrigger[];
  triggersMultiple?: FieldSelectMultipleAddCustomOptionTrigger[];
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
    allowCustomOption: false,
    customOptionControls: 'off',
    triggersSingle: [...ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_DEFAULT],
    triggersMultiple: [...ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT],
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
    footer: 'none',
    footerDivider: true,
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
    allowCustomOption: { control: 'boolean' },
    // if смотрит на один arg. customOptionControls собирает allowCustomOption и selection.
    customOptionControls: { table: { disable: true } },
    triggersSingle: {
      name: 'addCustomOptionTriggers',
      if: { arg: 'customOptionControls', eq: SELECTION_MODE.Single },
      control: 'check',
      options: [...ADD_CUSTOM_OPTION_TRIGGERS_SINGLE_DEFAULT],
    },
    triggersMultiple: {
      name: 'addCustomOptionTriggers',
      if: { arg: 'customOptionControls', eq: SELECTION_MODE.Multiple },
      control: 'check',
      options: [...ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT],
    },
    addCustomOptionTriggers: { table: { disable: true } },
    // copy-кнопка появляется только в readonly.
    showCopyButton: { if: { arg: 'readonly', eq: true } },
    iconBefore: {
      control: 'select',
      options: ['none', 'search'],
      mapping: { none: undefined, search: <SearchSVG /> },
    },
    footer: {
      control: 'select',
      options: ['none', 'text'],
      mapping: { none: undefined, text: 'Показаны все размеры' },
    },
    footerDivider: { if: { arg: 'footer', neq: 'none' } },
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
  render: function PlaygroundRender({
    allowCustomOption,
    triggersSingle,
    triggersMultiple,
    selection,
    customOptionControls,
    ...rest
  }) {
    const [, updateArgs] = useArgs<StoryProps>();
    let nextControls: StoryProps['customOptionControls'] = 'off';

    if (allowCustomOption) {
      nextControls = selection === SELECTION_MODE.Multiple ? SELECTION_MODE.Multiple : SELECTION_MODE.Single;
    }

    useEffect(() => {
      if (customOptionControls !== nextControls) {
        updateArgs({ customOptionControls: nextControls });
      }
    }, [customOptionControls, nextControls, updateArgs]);

    const triggersBySelection = selection === SELECTION_MODE.Multiple ? triggersMultiple : triggersSingle;
    const addCustomOptionTriggers = allowCustomOption ? triggersBySelection : undefined;

    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Select-поле с выпадающим списком (Droplist) и single/multiple selection.</DemoHint>
          <DemoActions block>
            <FieldSelect
              {...({
                ...rest,
                selection,
                allowCustomOption,
                addCustomOptionTriggers,
              } as FieldSelectProps)}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSelect)).toBeVisible();
  },
};
