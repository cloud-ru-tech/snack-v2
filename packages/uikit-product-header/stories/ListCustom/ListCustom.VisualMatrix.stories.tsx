import { PlaceholderSVG } from '@ds/icons/interface/system';
import { ItemProps as Item, List, MODE, Mode } from '@ds/list';
import { ListItemCustom, renderListItemCustom, renderListItemGroupCustom } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Uikit Product/Layout/Header/ListCustom',
  id: 'uikit-product-header-listcustom',
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

const DEMO_CONTENT = {
  beforeContent: <PlaceholderSVG />,
  afterContent: <PlaceholderSVG />,
  content: { label: 'Content text', caption: 'Caption', description: 'Description text' },
} as const;

const CHECKED_DISABLED_COLUMNS = [
  { label: 'unchecked', checked: false, disabled: false },
  { label: 'checked', checked: true, disabled: false },
  { label: 'unchecked · disabled', checked: false, disabled: true },
  { label: 'checked · disabled', checked: true, disabled: true },
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

function ShellList({ items }: { items: Item[] }) {
  return (
    <div className={styles.listFrame}>
      <List
        size='s'
        marker
        itemRender={renderListItemCustom}
        groupItemRender={renderListItemGroupCustom}
        items={items}
      />
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='ListItemCustom — selectionMode × checked × disabled'
        firstColumnHeader='selectionMode'
        columnHeaders={CHECKED_DISABLED_COLUMNS.map(column => column.label)}
        rows={[MODE.Single, MODE.Multiple].map(selectionMode => ({
          variantLabel: selectionMode,
          cells: CHECKED_DISABLED_COLUMNS.map(column => (
            <ItemPreview
              key={`${selectionMode}-${column.label}`}
              selectionMode={selectionMode}
              checked={column.checked}
              disabled={column.disabled}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='ListItemGroupCustom — варианты'
        firstColumnHeader='Variant'
        columnHeaders={['Preview']}
        rows={[
          {
            variantLabel: 'subtitle',
            cells: [
              <ShellList
                key='subtitle'
                items={[
                  {
                    type: 'group',
                    label: 'Subtitle text',
                    groupVariant: 'subtitle',
                    items: [{ id: 's1', content: { label: 'Child' } }],
                  },
                ]}
              />,
            ],
          },
          {
            variantLabel: 'subtitleTertiary',
            cells: [
              <ShellList
                key='tertiary'
                items={[
                  {
                    type: 'group',
                    label: 'Subtitle text',
                    groupVariant: 'subtitleTertiary',
                    items: [{ id: 't1', content: { label: 'Child' } }],
                  },
                ]}
              />,
            ],
          },
          {
            variantLabel: 'divider',
            cells: [
              <ShellList
                key='divider'
                items={[
                  { id: 'above', content: { label: 'Above' } },
                  { type: 'group', divider: true, items: [] },
                  { id: 'below', content: { label: 'Below' } },
                ]}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
