import { CHIP_CHOICE_TYPE, ChipChoiceRow, Size } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { COLUMN_HEADERS, SIZES } from '../visualMatrix.helpers';
import styles from './styles.module.scss';

const meta: Meta<typeof ChipChoiceRow> = {
  title: 'Components/Chips/ChipChoiceRow',
  component: ChipChoiceRow,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ChipChoiceRow>;

const PINNED_FILTERS = [
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
] as const;

const VISIBLE_FILTERS = [
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
    options: [],
  },
] as const;

const ALL_FILTERS = [...PINNED_FILTERS, ...VISIBLE_FILTERS] as never;

const stateRows = [
  {
    key: 'empty (add button only)',
    render: (size: Size) => (
      <ChipChoiceRow key={size} size={size} filters={VISIBLE_FILTERS as never} visibleFilters={[]} />
    ),
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
    render: (size: Size) => (
      <ChipChoiceRow key={size} size={size} filters={PINNED_FILTERS as never} showAddButton={false} />
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
    </div>
  ),
};
