import { BagelChart } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof BagelChart> = {
  title: 'Uikit Product/Charts/BagelChart',
  component: BagelChart,
  parameters: { layout: 'padded', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof BagelChart>;

const TOTAL = 200;

const LEVELS = [
  { label: 'low (≤50%)', value: 60 },
  { label: 'medium (50–75%)', value: 130 },
  { label: 'high (>75%)', value: 184 },
  { label: 'large numbers', value: 7_500_000, total: 10_000_000 },
] as const;

const TITLES = [
  { label: 'with title', title: 'RAM, GB' },
  { label: 'without title', title: undefined },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <StoryTable
      sectionTitle='Level × title'
      firstColumnHeader='level'
      columnHeaders={TITLES.map(({ label }) => label)}
      rows={LEVELS.map(level => ({
        variantLabel: level.label,
        cells: TITLES.map(({ label, title }) => (
          <div key={label} className={styles.chart}>
            <BagelChart value={level.value} total={'total' in level ? level.total : TOTAL} title={title} />
          </div>
        )),
      }))}
    />
  ),
};
