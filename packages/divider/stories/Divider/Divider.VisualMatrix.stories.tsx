import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Divider, type DividerProps, ORIENTATION, VARIANT } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<DividerProps> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<DividerProps>;

const variants = Object.values(VARIANT);
const orientations = Object.values(ORIENTATION);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Variant & Orientation'
      firstColumnHeader='Variant'
      columnHeaders={orientations.map(o => o.charAt(0).toUpperCase() + o.slice(1))}
      rows={variants.map(variant => ({
        variantLabel: variant,
        cells: orientations.map(orientation => (
          <div
            key={orientation}
            className={orientation === ORIENTATION.Vertical ? styles.matrixCellVertical : styles.matrixCellHorizontal}
          >
            <Divider variant={variant} orientation={orientation} />
          </div>
        )),
      }))}
    />
  ),
};
