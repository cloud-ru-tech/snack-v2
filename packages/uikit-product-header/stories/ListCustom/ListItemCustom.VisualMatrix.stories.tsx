import { PlaceholderSVG } from '@ds/icons/interface/system';
import { MODE, Mode } from '@ds/list';
import { ListItemCustom } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Uikit Product/Layout/Header/ListCustom/ListItemCustom',
  id: 'uikit-product-header-listitemcustom',
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

const DEMO_CONTENT = {
  beforeContent: <PlaceholderSVG />,
  afterContent: <PlaceholderSVG />,
  content: { label: 'Content text', caption: 'Caption', description: 'Description text' },
} as const;

/** Колонки: unchecked | checked. Строки: enabled | disabled. */
const CHECKED_COLUMNS = [
  { label: 'unchecked', checked: false },
  { label: 'checked', checked: true },
] as const;

const DISABLED_ROWS = [
  { label: 'enabled', disabled: false },
  { label: 'disabled', disabled: true },
] as const;

function ItemPreview({
  selectionMode,
  checked,
  disabled,
}: {
  selectionMode: Mode;
  checked: boolean;
  disabled: boolean;
}) {
  return (
    <div className={styles.listFrame}>
      <ListItemCustom
        selectionMode={selectionMode}
        checked={checked}
        disabled={disabled}
        beforeContent={DEMO_CONTENT.beforeContent}
        afterContent={DEMO_CONTENT.afterContent}
        content={DEMO_CONTENT.content}
      />
    </div>
  );
}

function SelectionModeTable({ selectionMode }: { selectionMode: Mode }) {
  return (
    <StoryTable
      sectionTitle={`selectionMode='${selectionMode}'`}
      firstColumnHeader='State'
      columnHeaders={CHECKED_COLUMNS.map(column => column.label)}
      rows={DISABLED_ROWS.map(row => ({
        variantLabel: row.label,
        cells: CHECKED_COLUMNS.map(column => (
          <ItemPreview
            key={`${selectionMode}-${row.label}-${column.label}`}
            selectionMode={selectionMode}
            checked={column.checked}
            disabled={row.disabled}
          />
        )),
      }))}
    />
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <SelectionModeTable selectionMode={MODE.Single} />
      <SelectionModeTable selectionMode={MODE.Multiple} />
    </div>
  ),
};
