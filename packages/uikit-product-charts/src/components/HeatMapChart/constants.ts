export const DEFAULT_CHART_HEIGHT = 700;
export const DEFAULT_LEGEND_TICKS_NUM = 5;

/** Порог яркости YIQ: на более светлой ячейке текст тёмный. */
export const CONTRAST_YIQ_THRESHOLD = 152;

/** Цвета, которые нужны d3-шкале и расчёту контраста готовыми значениями (задаются в styles.module.scss). */
export const HEAT_MAP_COLOR_VARS = {
  rangeStart: '--heat-map-range-start',
  rangeEnd: '--heat-map-range-end',
  lightText: '--heat-map-text-light',
  darkText: '--heat-map-text-dark',
} as const;
