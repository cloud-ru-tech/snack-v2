import { APPEARANCE, COLOR, Counter, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from '@ds/counter';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Counter>;

const keySizes = [SIZE.XS, SIZE.S] as const;
const keyAppearances = Object.values(APPEARANCE);
const keyVariants = [
  { label: VARIANT.Count, value: 42 },
  { label: VARIANT.CountPlus, value: 15 },
  { label: VARIANT.CountK, value: 2500 },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => <Counter key={size} value={5} appearance={appearance} size={size} />),
        }))}
      />
      <StoryTable
        sectionTitle='Variant × Size'
        firstColumnHeader='Variant'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={keyVariants.map(({ label, value }) => ({
          variantLabel: label,
          cells: keySizes.map(size => (
            <Counter key={size} value={value} variant={label} size={size} plusLimit={DEFAULT_PLUS_LIMIT} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Color'
        firstColumnHeader='Color'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={Object.values(COLOR).map(color => ({
          variantLabel: color,
          cells: keySizes.map(size => <Counter key={size} value={7} color={color} size={size} />),
        }))}
      />
    </div>
  ),
};
