import {
  APPEARANCE,
  Counter,
  DEFAULT_KEY_LIMIT,
  DEFAULT_PLUS_LIMIT,
  ROLE_APPEARANCE,
  SIZE,
  VARIANT,
} from '@ds/counter';
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
  parameters: { controls: { disable: true } },
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
        sectionTitle='Edge values (variant per row, plusLimit=10, keyLimit=1000)'
        firstColumnHeader='value'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={[
          { label: '0', value: 0, variant: VARIANT.Count },
          { label: `${DEFAULT_PLUS_LIMIT} (plusLimit)`, value: DEFAULT_PLUS_LIMIT, variant: VARIANT.CountPlus },
          {
            label: `${DEFAULT_PLUS_LIMIT + 1} (plusLimit+1)`,
            value: DEFAULT_PLUS_LIMIT + 1,
            variant: VARIANT.CountPlus,
          },
          { label: `${DEFAULT_KEY_LIMIT} (keyLimit)`, value: DEFAULT_KEY_LIMIT, variant: VARIANT.CountK },
        ].map(({ label, value, variant }) => ({
          variantLabel: label,
          cells: keySizes.map(size => (
            <Counter key={size} value={value} size={size} variant={variant} plusLimit={DEFAULT_PLUS_LIMIT} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Role appearance'
        firstColumnHeader='Role appearance'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={Object.values(ROLE_APPEARANCE).map(roleAppearance => ({
          variantLabel: roleAppearance,
          cells: keySizes.map(size => <Counter key={size} value={7} roleAppearance={roleAppearance} size={size} />),
        }))}
      />
    </div>
  ),
};
