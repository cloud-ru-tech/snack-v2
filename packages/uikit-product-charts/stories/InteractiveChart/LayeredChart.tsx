import {
  DrawStyle,
  InteractiveChart,
  InteractiveChartProps,
  LineInterpolation,
  SERIES_COLORS,
  useLayer,
} from '@ds/uikit-product-charts';
import { useMemo } from 'react';

import { BOX_PLOT_DATA } from '../mockData';

export type LayeredChartProps = InteractiveChartProps & {
  drawStyle: DrawStyle;
  lineInterpolation?: LineInterpolation;
  title?: string;
  width?: number;
  height?: number;
  'data-test-id'?: string;
};

/**
 * Две серии через `useLayer` — хук нельзя вызвать в args, поэтому демо-обёртка.
 * Для `type='boxPlot'` данные подменяются: у box plot свой формат `[x, min, q1, median, q3, max]`.
 */
export function LayeredChart({
  drawStyle,
  lineInterpolation,
  title,
  width,
  height,
  type,
  options,
  data,
  ...rest
}: LayeredChartProps) {
  const requests = useLayer({ label: 'Запросы', color: SERIES_COLORS.Blue1, drawStyle, lineInterpolation });
  const errors = useLayer({ label: 'Ошибки', color: SERIES_COLORS.Crimson1, drawStyle, lineInterpolation });
  const isBoxPlot = type === 'boxPlot';

  const chartOptions = useMemo(
    () => ({
      title,
      width,
      height,
      ...(isBoxPlot ? {} : { series: [{}, requests, errors] }),
      ...options,
    }),
    [errors, height, isBoxPlot, options, requests, title, width],
  );

  return <InteractiveChart {...rest} type={type} data={isBoxPlot ? BOX_PLOT_DATA : data} options={chartOptions} />;
}
