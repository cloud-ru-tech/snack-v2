/** Цвета серий графиков: 4 оттенка × 4 ступени насыщенности. Порядок значений задаёт порядок автоподбора цвета. */
export const SERIES_COLORS = {
  Green1: 'green1',
  Blue1: 'blue1',
  Violet1: 'violet1',
  Crimson1: 'crimson1',
  Green2: 'green2',
  Blue2: 'blue2',
  Violet2: 'violet2',
  Crimson2: 'crimson2',
  Green3: 'green3',
  Blue3: 'blue3',
  Violet3: 'violet3',
  Crimson3: 'crimson3',
  Green4: 'green4',
  Blue4: 'blue4',
  Violet4: 'violet4',
  Crimson4: 'crimson4',
} as const;

/** Тип графика `InteractiveChart`: базовая конфигурация uPlot, поверх которой сливаются `options`. */
export const PLOT_TYPES = {
  BoxPlot: 'boxPlot',
  Default: 'default',
} as const;

/** Интерполяция линии для `drawStyle='line'` в `useLayer`. */
export const LINE_INTERPOLATIONS = {
  Linear: 'linear',
  StepAfter: 'stepAfter',
  StepBefore: 'stepBefore',
  Spline: 'spline',
} as const;

/** Способ отрисовки серии в `useLayer`. */
export const DRAW_STYLES = {
  Line: 'line',
  Bars: 'bars',
  Points: 'points',
  BarsLeft: 'barsLeft',
  BarsRight: 'barsRight',
} as const;

/** Положение подписей оси X в `HeatMapChart`. */
export const X_AXIS_POSITION = {
  Top: 'top',
  Bottom: 'bottom',
} as const;

export const TEST_IDS = {
  bagelChart: {
    title: 'bagel-chart__title',
    value: 'bagel-chart__value',
    total: 'bagel-chart__total',
  },
  pieChart: {
    title: 'pie-chart__title',
    segment: 'pie-chart__segment',
    legend: 'pie-chart__legend',
    legendItem: 'pie-chart__legend-item',
    legendLink: 'pie-chart__legend-link',
    aggregatedLegend: 'pie-chart__aggregated-legend',
    aggregatedLegendItem: 'pie-chart__aggregated-legend-item',
  },
  heatMapChart: {
    title: 'heat-map-chart__title',
    cell: 'heat-map-chart__cell',
    legend: 'heat-map-chart__legend',
    tick: 'heat-map-chart__tick',
  },
  interactiveChart: {
    plot: 'interactive-chart__plot',
    overlay: 'interactive-chart__overlay',
    tooltip: 'interactive-chart__tooltip',
  },
} as const;
