import uPlot from 'uplot';

import { ColorMap, OTHER_COLORS } from '../../../shared';
import { AXIS_GRID_ALPHA, AXIS_LABEL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../constants';
import { boxPlotPlugin, columnHighlightPlugin, legendAsTooltipPlugin } from '../plugins';
import { getHairlineWidth, withAlpha } from '../utils';

export function getBoxPlotOptions({ computedColors }: { computedColors: ColorMap }): uPlot.Options {
  const axis: uPlot.Axis = {
    labelSize: AXIS_LABEL_SIZE,
    stroke: computedColors[OTHER_COLORS.LabelColor],
    grid: {
      stroke: withAlpha(computedColors[OTHER_COLORS.AxisColor], AXIS_GRID_ALPHA),
      width: getHairlineWidth(),
    },
  };

  return {
    id: 'boxPlot',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    cursor: {
      drag: { x: false, y: false },
    },
    plugins: [
      boxPlotPlugin({ computedColors }),
      columnHighlightPlugin({ computedColors }),
      legendAsTooltipPlugin({ computedColors }),
    ],
    // Порядок серий задаёт формат данных box plot: [x, min, q1, median, q3, max]. Подписи видны в тултипе.
    series: [{ label: 'bin' }, { label: 'X1' }, { label: 'Q1' }, { label: 'Median' }, { label: 'Q3' }, { label: 'X2' }],
    scales: {
      x: {
        distr: 2,
        time: false,
        range: (_, fromMin, fromMax) => [fromMin - 1, fromMax + 1],
      },
      y: { time: false, auto: true },
    },
    axes: [axis, { ...axis }],
  };
}
