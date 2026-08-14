import { APPEARANCE, Divider, ORIENTATION, VARIANT } from '@ds/divider';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Divider>;

const appearances = Object.values(APPEARANCE);
const variants = Object.values(VARIANT);
const orientations = Object.values(ORIENTATION);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
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

      <StoryTable
        sectionTitle='Appearance × Variant'
        firstColumnHeader='Appearance'
        columnHeaders={variants.map(v => v.charAt(0).toUpperCase() + v.slice(1))}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: variants.map(variant => (
            <div
              key={variant}
              className={cn(styles.matrixCellHorizontal, {
                [styles.matrixCellInverted]: appearance === APPEARANCE.InvertNeutral,
              })}
            >
              <Divider appearance={appearance} variant={variant} />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
