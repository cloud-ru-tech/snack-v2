import uPlot from 'uplot';

import { ColorMap, OTHER_COLORS } from '../../../shared';
import { AXIS_GRID_ALPHA, AXIS_LABEL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH, WHEEL_ZOOM_FACTOR } from '../constants';
import { wheelZoomPlugin } from '../plugins';
import { getHairlineWidth, withAlpha } from '../utils';

export function getDefaultPlotOptions({ computedColors }: { computedColors: ColorMap }): uPlot.Options {
  const axis: uPlot.Axis = {
    show: true,
    labelSize: AXIS_LABEL_SIZE,
    stroke: computedColors[OTHER_COLORS.LabelColor],
    grid: {
      stroke: withAlpha(computedColors[OTHER_COLORS.AxisColor], AXIS_GRID_ALPHA),
      width: getHairlineWidth(),
    },
  };

  return {
    id: 'defaultPlot',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    cursor: {
      drag: { x: true, y: true, dist: 10, uni: 10 },
    },
    plugins: [wheelZoomPlugin({ factor: WHEEL_ZOOM_FACTOR })],
    series: [{}],
    scales: {
      x: { time: false, auto: true },
      y: { time: false, auto: true },
    },
    axes: [axis, { ...axis }],
  };
}
