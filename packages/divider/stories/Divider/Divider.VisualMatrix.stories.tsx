import { Divider, ORIENTATION, VARIANT } from '@ds/divider';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Divider>;

const variants = Object.values(VARIANT);
const orientations = Object.values(ORIENTATION);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Variant × Orientation'
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
