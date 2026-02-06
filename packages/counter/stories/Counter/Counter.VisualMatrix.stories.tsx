import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { APPEARANCE, Counter, CounterProps, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from '../../src';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
};

export default meta;
type Story = StoryObj<CounterProps>;

const keySizes = Object.values(SIZE);
const keyAppearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <Counter key={size} value={5} appearance={appearance} size={size} variant={VARIANT.Count} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Variant × Size'
        firstColumnHeader='Variant'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: VARIANT.Count,
            cells: keySizes.map(size => <Counter key={size} value={42} variant={VARIANT.Count} size={size} />),
          },
          {
            variantLabel: VARIANT.CountPlus,
            cells: keySizes.map(size => (
              <Counter key={size} value={15} variant={VARIANT.CountPlus} plusLimit={DEFAULT_PLUS_LIMIT} size={size} />
            )),
          },
          {
            variantLabel: VARIANT.CountK,
            cells: keySizes.map(size => <Counter key={size} value={2500} variant={VARIANT.CountK} size={size} />),
          },
        ]}
      />
    </>
  ),
};
