import { CHIP_CHOICE_TYPE, ChipChoiceRow, ChipChoiceRowFilter, Size } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import { COLUMN_HEADERS, SIZES } from '../visualMatrix.helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof ChipChoiceRow> = {
  title: 'Components/Chips/ChipChoiceRow',
  component: ChipChoiceRow,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChipChoiceRow>;

const PINNED_FILTERS: ChipChoiceRowFilter[] = [
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Status',
    pinned: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
];

const VISIBLE_FILTERS: ChipChoiceRowFilter[] = [
  {
    id: 'cat',
    type: CHIP_CHOICE_TYPE.Multiple,
    label: 'Category',
    options: [
      { value: 'c1', label: 'Cat 1' },
      { value: 'c2', label: 'Cat 2' },
    ],
  },
  {
    id: 'date',
    type: CHIP_CHOICE_TYPE.Date,
    label: 'Date',
  },
];

const ALL_FILTERS: ChipChoiceRowFilter[] = [...PINNED_FILTERS, ...VISIBLE_FILTERS];

const WRAPPING_FILTERS: ChipChoiceRowFilter[] = VISIBLE_FILTERS.map(filter => ({
  ...filter,
  label: 'Type',
  'data-test-id': TEST_IDS.chipChoiceRow.wrappingFilter,
}));
const CLEAR_BUTTON_WRAPPING_WIDTH = { s: 150, m: 180, l: 200 } as const;

const BOTH_BUTTONS_WRAPPING_WIDTH = { s: 80, m: 100, l: 110 } as const;

const stateRows = [
  {
    key: 'empty (add button only)',
    render: (size: Size) => <ChipChoiceRow key={size} size={size} filters={VISIBLE_FILTERS} visibleFilters={[]} />,
  },
  {
    key: 'pinned + visible + add',
    render: (size: Size) => (
      <ChipChoiceRow
        key={size}
        size={size}
        filters={ALL_FILTERS}
        visibleFilters={['cat', 'date']}
        defaultValue={{ status: 'active' }}
      />
    ),
  },
  {
    key: 'no add button',
    render: (size: Size) => <ChipChoiceRow key={size} size={size} filters={PINNED_FILTERS} showAddButton={false} />,
  },
] as const;

const wrappingRows = [
  ...(['chipWrapping', 'dividerWrapping'] as const).map(scenario => ({
    key: scenario === 'chipWrapping' ? 'chip wraps after divider' : 'divider wraps after pinned chip',
    render: (size: Size) => (
      <div
        style={{
          width: scenario === 'dividerWrapping' ? CLEAR_BUTTON_WRAPPING_WIDTH[size] : BOTH_BUTTONS_WRAPPING_WIDTH[size],
        }}
      >
        <ChipChoiceRow
          size={size}
          filters={[
            ...PINNED_FILTERS.map(filter => ({
              ...filter,
              label: 'Type',
              'data-test-id': TEST_IDS.chipChoiceRow.pinnedWrappingFilter,
            })),
            ...WRAPPING_FILTERS,
          ]}
          visibleFilters={['cat']}
          className={scenario === 'dividerWrapping' ? styles.dividerWrappingRow : undefined}
          data-test-id={`${TEST_IDS.chipChoiceRow[scenario]}-${size}`}
        />
      </div>
    ),
  })),
  {
    key: 'clear button wraps independently',
    render: (size: Size) => (
      <div style={{ width: CLEAR_BUTTON_WRAPPING_WIDTH[size] }}>
        <ChipChoiceRow
          size={size}
          filters={WRAPPING_FILTERS}
          visibleFilters={['cat']}
          data-test-id={`${TEST_IDS.chipChoiceRow.clearButtonWrapping}-${size}`}
        />
      </div>
    ),
  },
  {
    key: 'add and clear buttons wrap onto separate lines',
    render: (size: Size) => (
      <div style={{ width: BOTH_BUTTONS_WRAPPING_WIDTH[size] }}>
        <ChipChoiceRow
          size={size}
          filters={WRAPPING_FILTERS}
          visibleFilters={['cat']}
          data-test-id={`${TEST_IDS.chipChoiceRow.bothButtonsWrapping}-${size}`}
        />
      </div>
    ),
  },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × Size'
        firstColumnHeader='State'
        columnHeaders={COLUMN_HEADERS}
        rows={stateRows.map(({ key, render }) => ({
          variantLabel: key,
          cells: SIZES.map(size => render(size)),
        }))}
      />
      <StoryTable
        sectionTitle='Wrapping × Size'
        firstColumnHeader='Wrapping'
        columnHeaders={COLUMN_HEADERS}
        rows={wrappingRows.map(({ key, render }) => ({
          variantLabel: key,
          cells: SIZES.map(size => render(size)),
        }))}
      />
    </div>
  ),
};
