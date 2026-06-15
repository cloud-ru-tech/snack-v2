import { FieldSelect, SIZE, VALIDATION_STATE } from '@ds/fields';
import { SearchSVG } from '@ds/icons';
import { ItemId, ItemProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof FieldSelect> = {
  title: 'Components/Fields/FieldSelect',
  component: FieldSelect,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof FieldSelect>;

const options: ItemProps[] = [
  { id: 's', content: { option: 'Small' } },
  { id: 'm', content: { option: 'Medium' } },
  { id: 'l', content: { option: 'Large' } },
];

const zoneOptions: ItemProps[] = [
  { id: 'a', content: { option: 'ru-central1-a' } },
  { id: 'b', content: { option: 'ru-central1-b' } },
  { id: 'c', content: { option: 'ru-central1-c' } },
  { id: 'd', content: { option: 'kz-central1-a' } },
];

// item.appearance задаёт цвет чипа выбранного значения (extractAppearance → Tag appearance).
// `appearance` — additive-поле: компонент читает его через WithIdContent, но публичный
// тип ItemProps его не объявляет — поэтому расширяем тип литерала здесь.
const coloredOptions: (ItemProps & { appearance: string })[] = [
  { id: 'a', content: { option: 'ru-central1-a' }, appearance: 'green' },
  { id: 'b', content: { option: 'ru-central1-b' }, appearance: 'blue' },
  { id: 'c', content: { option: 'ru-central1-c' }, appearance: 'violet' },
];

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyStates = [
  VALIDATION_STATE.Default,
  VALIDATION_STATE.Error,
  VALIDATION_STATE.Warning,
  VALIDATION_STATE.Success,
  VALIDATION_STATE.Valid,
] as const;

type Variant = { selection?: 'single'; defaultValue?: string } | { selection: 'multiple'; defaultValue: string[] };

const selectionStates: { key: string; props: Variant }[] = [
  { key: 'empty (single)', props: { selection: 'single' } },
  { key: 'single selected', props: { selection: 'single', defaultValue: 'm' } },
  { key: 'empty (multiple)', props: { selection: 'multiple', defaultValue: [] } },
  { key: 'multiple selected', props: { selection: 'multiple', defaultValue: ['s', 'l'] } },
];

const modifiers = [
  { key: 'disabled', extra: { disabled: true } },
  { key: 'readonly', extra: { readonly: true } },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × ValidationState (single, value=m)'
        firstColumnHeader='Size'
        columnHeaders={keyStates.map(s => s.toUpperCase())}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: keyStates.map(state => (
            <div key={state} className={styles.narrow}>
              <FieldSelect
                size={size}
                validationState={state}
                label='Label'
                hint={state === VALIDATION_STATE.Default ? 'Hint' : `${state} hint`}
                showHintIcon
                items={options}
                selection='single'
                defaultValue='m'
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Selection state (size=m)'
        firstColumnHeader='Selection'
        columnHeaders={['Render']}
        rows={selectionStates.map(({ key, props }) => ({
          variantLabel: key,
          cells: [
            <div key={key} className={styles.narrow}>
              <FieldSelect size={SIZE.M} label='Label' placeholder='Choose…' items={options} {...props} />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Modifiers (size=m, single, value=m)'
        firstColumnHeader='Modifier'
        columnHeaders={['Render']}
        rows={modifiers.map(({ key, extra }) => ({
          variantLabel: key,
          cells: [
            <div key={key} className={styles.narrow}>
              <FieldSelect size={SIZE.M} label='Label' items={options} selection='single' defaultValue='m' {...extra} />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Chips & search (size=m)'
        firstColumnHeader='Case'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'many chips (wrap)',
            cells: [
              <div key='many' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Zones'
                  items={zoneOptions}
                  selection='multiple'
                  defaultValue={['a', 'b', 'c', 'd']}
                />
              </div>,
            ],
          },
          {
            variantLabel: 'chips with disabled item',
            cells: [
              <div key='disabled-chip' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Zones'
                  items={[{ ...zoneOptions[0], disabled: true }, ...zoneOptions.slice(1)]}
                  selection='multiple'
                  defaultValue={['a', 'b']}
                />
              </div>,
            ],
          },
          {
            variantLabel: 'colored chips (item.appearance)',
            cells: [
              <div key='colored-chips' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Zones'
                  items={coloredOptions}
                  selection='multiple'
                  defaultValue={['a', 'b', 'c']}
                />
              </div>,
            ],
          },
          {
            variantLabel: 'searchable (default)',
            cells: [
              <div key='searchable' className={styles.narrow}>
                <FieldSelect size={SIZE.M} label='Label' placeholder='Type to search…' items={options} searchable />
              </div>,
            ],
          },
          {
            variantLabel: 'non-searchable',
            cells: [
              <div key='non-searchable' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Label'
                  items={options}
                  selection='single'
                  defaultValue='m'
                  searchable={false}
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Slots & formatters (size=m)'
        firstColumnHeader='Case'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'iconBefore',
            cells: [
              <div key='icon-before' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Search zone'
                  iconBefore={<SearchSVG />}
                  items={zoneOptions}
                  selection='single'
                  defaultValue='a'
                />
              </div>,
            ],
          },
          {
            // prefix/postfix — слоты текста вокруг значения (Figma fieldSelect showPrefix/showPostfix):
            // prefix → value → clear → postfix → chevron.
            variantLabel: 'prefix + postfix (single)',
            cells: [
              <div key='prefix-postfix' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Amount'
                  prefix='$'
                  postfix='USD'
                  items={options}
                  selection='single'
                  defaultValue='m'
                />
              </div>,
            ],
          },
          {
            variantLabel: 'selectedOptionFormatter (single)',
            cells: [
              <div key='single-formatter' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Label'
                  items={options}
                  selection='single'
                  defaultValue='m'
                  selectedOptionFormatter={pair => `★ ${pair.label}`}
                />
              </div>,
            ],
          },
          {
            variantLabel: 'formatSelected (multiple, chips=false)',
            cells: [
              <div key='format-selected' className={styles.narrow}>
                <FieldSelect
                  size={SIZE.M}
                  label='Zones'
                  items={zoneOptions}
                  selection='multiple'
                  chips={false}
                  defaultValue={['a', 'b', 'c'] as ItemId[]}
                  formatSelected={selected => `${selected.length} zones selected`}
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
