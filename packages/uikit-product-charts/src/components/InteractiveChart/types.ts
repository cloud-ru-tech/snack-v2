import uPlot from 'uplot';

import { DrawStyle, LineInterpolation, PlotType, SeriesColor } from '../../types';

export type InteractiveChartProps = {
  /** Данные в формате uPlot: первый массив — значения оси X, остальные — серии */
  data: uPlot.AlignedData;
  /** Опции uPlot, которые глубоко сливаются поверх базовой конфигурации `type` */
  options?: Partial<uPlot.Options>;
  /** Базовая конфигурация графика
   * @default 'default'
   */
  type?: PlotType;
  /** CSS-класс корня */
  className?: string;
};

export type UseLayerProps = {
  /** Подпись серии в легенде */
  label: string;
  /** Цвет серии из палитры */
  color: SeriesColor;
  /** Способ отрисовки */
  drawStyle: DrawStyle;
  /** Интерполяция линии — для `drawStyle='line'` */
  lineInterpolation?: LineInterpolation;
};
