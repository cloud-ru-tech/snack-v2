import { DRAW_STYLES, InteractiveChart, LINE_INTERPOLATIONS, PLOT_TYPES } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { LINE_DATA } from '../mockData';
import { LayeredChart, LayeredChartProps } from './LayeredChart';

const meta: Meta<typeof InteractiveChart> = {
  title: 'Uikit Product/Charts/InteractiveChart',
  component: InteractiveChart,
  parameters: { layout: 'padded', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof InteractiveChart>;

const BASE = { width: 360, height: 220, data: LINE_DATA };

const DRAW_VARIANTS: { label: string; props: Pick<LayeredChartProps, 'drawStyle' | 'lineInterpolation'> }[] = [
  { label: 'line / linear', props: { drawStyle: DRAW_STYLES.Line, lineInterpolation: LINE_INTERPOLATIONS.Linear } },
  { label: 'line / spline', props: { drawStyle: DRAW_STYLES.Line, lineInterpolation: LINE_INTERPOLATIONS.Spline } },
  {
    label: 'line / stepAfter',
    props: { drawStyle: DRAW_STYLES.Line, lineInterpolation: LINE_INTERPOLATIONS.StepAfter },
  },
  {
    label: 'line / stepBefore',
    props: { drawStyle: DRAW_STYLES.Line, lineInterpolation: LINE_INTERPOLATIONS.StepBefore },
  },
  { label: 'bars', props: { drawStyle: DRAW_STYLES.Bars } },
  { label: 'barsLeft', props: { drawStyle: DRAW_STYLES.BarsLeft } },
  { label: 'barsRight', props: { drawStyle: DRAW_STYLES.BarsRight } },
  { label: 'points', props: { drawStyle: DRAW_STYLES.Points } },
];

const TITLES = [
  { label: 'with title', title: 'Запросы к API' },
  { label: 'without title', title: undefined },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='type=default: drawStyle / lineInterpolation'
        firstColumnHeader='drawStyle'
        cellAlign='start'
        columnHeaders={['chart']}
        rows={DRAW_VARIANTS.map(({ label, props }) => ({
          variantLabel: label,
          cells: [<LayeredChart key={label} type={PLOT_TYPES.Default} {...BASE} {...props} />],
        }))}
      />
      <StoryTable
        sectionTitle='type=boxPlot × title'
        firstColumnHeader='type'
        cellAlign='start'
        columnHeaders={TITLES.map(({ label }) => label)}
        rows={[
          {
            variantLabel: PLOT_TYPES.BoxPlot,
            cells: TITLES.map(({ label, title }) => (
              <LayeredChart
                key={label}
                type={PLOT_TYPES.BoxPlot}
                drawStyle={DRAW_STYLES.Line}
                title={title}
                {...BASE}
              />
            )),
          },
        ]}
      />
    </>
  ),
};
