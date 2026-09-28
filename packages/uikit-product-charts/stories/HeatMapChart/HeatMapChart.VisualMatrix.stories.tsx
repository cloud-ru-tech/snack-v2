import { HeatMapChart, HeatMapChartOptions, X_AXIS_POSITION } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { HEAT_MAP_DATA, HEAT_MAP_DOMAIN, HEAT_MAP_X_TICKS, HEAT_MAP_Y_TICKS } from '../mockData';
import styles from './styles.module.scss';

const meta: Meta<typeof HeatMapChart> = {
  title: 'Uikit Product/Charts/HeatMapChart',
  component: HeatMapChart,
  parameters: { layout: 'padded', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof HeatMapChart>;

const POSITIONS = Object.values(X_AXIS_POSITION);

const VARIANTS: { label: string; options: Omit<HeatMapChartOptions, 'domain'> }[] = [
  {
    label: 'axes + legend',
    options: { title: 'Загрузка CPU, %', height: 420 },
  },
  {
    label: 'no axis labels',
    options: { title: 'Загрузка CPU, %', height: 420 },
  },
  {
    label: 'no title, no legend',
    options: { height: 280, legend: { show: false } },
  },
];

function getAxes(variantIndex: number, position: (typeof POSITIONS)[number]): HeatMapChartOptions['axes'] {
  const withLabels = variantIndex !== 1;

  return {
    xAxis: { ticks: HEAT_MAP_X_TICKS, position, label: withLabels ? 'Время' : undefined },
    yAxis: { ticks: HEAT_MAP_Y_TICKS, label: withLabels ? 'День' : undefined },
  };
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <StoryTable
      sectionTitle='Variant × xAxis.position'
      firstColumnHeader='variant'
      cellAlign='start'
      columnHeaders={POSITIONS}
      rows={VARIANTS.map(({ label, options }, variantIndex) => ({
        variantLabel: label,
        cells: POSITIONS.map(position => (
          <div key={position} className={styles.chartCompact}>
            <HeatMapChart
              data={HEAT_MAP_DATA}
              options={{ ...options, domain: HEAT_MAP_DOMAIN, axes: getAxes(variantIndex, position) }}
            />
          </div>
        )),
      }))}
    />
  ),
};
