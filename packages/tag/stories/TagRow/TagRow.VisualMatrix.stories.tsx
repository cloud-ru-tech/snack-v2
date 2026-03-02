import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { APPEARANCE, SIZE, TagRow, type TagRowProps } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<TagRowProps> = {
  title: 'Components/Tag/TagRow',
  component: TagRow,
};

export default meta;
type Story = StoryObj<TagRowProps>;

const sampleItems = [
  { label: 'Tag 1', appearance: APPEARANCE.Neutral as const },
  { label: 'Tag 2', appearance: APPEARANCE.Primary as const },
  { label: 'Tag 3', appearance: APPEARANCE.Red as const },
  { label: 'Tag 4', appearance: APPEARANCE.Green as const },
  { label: 'Tag 5', appearance: APPEARANCE.Blue as const },
];

const keySizes = [SIZE.Xs, SIZE.S, SIZE.M];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='TagRow Simple'
        firstColumnHeader='Size'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'Items',
            cells: keySizes.map(size => (
              <div key={size} className={styles.cellWide}>
                <TagRow items={sampleItems} size={size} />
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='TagRow with rowLimit (dropdown)'
        firstColumnHeader='Size'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'rowLimit=1',
            cells: keySizes.map(size => (
              <div key={size} className={styles.cellNarrow}>
                <TagRow items={sampleItems} size={size} rowLimit={1} moreButtonLabel='+' />
              </div>
            )),
          },
        ]}
      />
    </>
  ),
};
