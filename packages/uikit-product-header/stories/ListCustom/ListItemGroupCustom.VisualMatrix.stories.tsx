import { PlaceholderSVG } from '@ds/icons/interface/system';
import { ListItemGroupCustom } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Uikit Product/Layout/Header/ListCustom/ListItemGroupCustom',
  id: 'uikit-product-header-listitemgroupcustom',
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

/**
 * Три презентации Figma `listItemGroupCustom` (17001:43680):
 * subtitle / subtitleTertiary / divider-only (`divider` без label).
 */
const PRESENTATIONS = [
  {
    variantLabel: 'subtitle',
    node: (
      <ListItemGroupCustom
        label='Subtitle text'
        groupVariant='subtitle'
        beforeContent={<PlaceholderSVG />}
        size='s'
        level={0}
      />
    ),
  },
  {
    variantLabel: 'subtitleTertiary',
    node: (
      <ListItemGroupCustom
        label='Subtitle text'
        groupVariant='subtitleTertiary'
        beforeContent={<PlaceholderSVG />}
        size='s'
        level={0}
      />
    ),
  },
  {
    variantLabel: 'divider',
    node: <ListItemGroupCustom divider size='s' level={0} />,
  },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='ListItemGroupCustom — groupVariant / divider'
        firstColumnHeader='Variant'
        columnHeaders={['Preview']}
        rows={PRESENTATIONS.map(({ variantLabel, node }) => ({
          variantLabel,
          cells: [
            <div key={variantLabel} className={styles.listFrame}>
              {node}
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
