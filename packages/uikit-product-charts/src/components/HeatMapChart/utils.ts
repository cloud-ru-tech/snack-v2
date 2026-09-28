import { ScaleLinear } from 'd3-scale';

import { CONTRAST_YIQ_THRESHOLD, DEFAULT_LEGEND_TICKS_NUM, HEAT_MAP_COLOR_VARS } from './constants';
import { HeatMapChartOptions, HeatMapChartStyles } from './types';

export type HeatMapColors = Record<keyof typeof HEAT_MAP_COLOR_VARS, string>;

export function readHeatMapColors(element: Element): HeatMapColors {
  const styles = getComputedStyle(element);

  return {
    rangeStart: styles.getPropertyValue(HEAT_MAP_COLOR_VARS.rangeStart).trim(),
    rangeEnd: styles.getPropertyValue(HEAT_MAP_COLOR_VARS.rangeEnd).trim(),
    lightText: styles.getPropertyValue(HEAT_MAP_COLOR_VARS.lightText).trim(),
    darkText: styles.getPropertyValue(HEAT_MAP_COLOR_VARS.darkText).trim(),
  };
}

/** Цвет текста, контрастный фону `rgb(r, g, b)` (формат, который отдаёт d3-интерполятор). */
export function getContrastColor({
  rgb,
  darkColor,
  lightColor,
}: {
  rgb: string;
  lightColor: string;
  darkColor: string;
}) {
  const [r, g, b] = (rgb.match(/\d+(\.\d+)?/g) ?? []).map(Number);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= CONTRAST_YIQ_THRESHOLD ? darkColor : lightColor;
}

export function range(start: number, stop: number, step: number): number[] {
  const length = Math.max(Math.ceil((stop - start) / step), 0);

  return Array.from({ length }, (_, index) => start + index * step);
}

/** «Красивое» число, близкое к `value`: 1, 2, 5 или 10 × 10^n. */
function niceNum(value: number, round: boolean): number {
  const exponent = Math.floor(Math.log10(value));
  const fraction = value / Math.pow(10, exponent);
  let niceFraction: number;

  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }

  return niceFraction * Math.pow(10, exponent);
}

function calculateTicks(maxTicks: number, minPoint: number, maxPoint: number): [number, number, number] {
  const niceRange = niceNum(maxPoint - minPoint, false);
  const tickSpacing = niceNum(niceRange / (maxTicks - 1), true);
  const niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;

  return [tickSpacing, niceMin, niceMax];
}

export function getTickValues(domain: HeatMapChartOptions['domain']): string[] {
  const [min, max] = domain;
  const [tickSpacing, niceMin, niceMax] = calculateTicks(DEFAULT_LEGEND_TICKS_NUM, min, max);
  const rangeValues = range(niceMin, niceMax, tickSpacing).filter(value =>
    value > 1 ? Math.floor(value) > min : value > min,
  );

  return [...new Set([min, ...rangeValues, max])].map(value => {
    if (value === 0) {
      return '0';
    }

    if (value < 1) {
      return value.toFixed(1);
    }

    return String(Math.floor(value));
  });
}

// react-grid-heatmap принимает только inline-стили: значения берутся из custom properties корня.
export function getStyles(colorScale: ScaleLinear<string, string> | undefined, data: number[][]): HeatMapChartStyles {
  return {
    cellStyle: (x, y) => ({
      backgroundColor: colorScale?.(data[x][y]),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--heat-map-cell-padding)',
      borderRadius: 'var(--heat-map-cell-radius)',
      borderColor: 'var(--heat-map-cell-border)',
    }),
    xLabelsStyle: () => ({
      height: 'var(--heat-map-ticks-height)',
      marginTop: 'var(--heat-map-ticks-offset)',
      padding: 0,
      color: 'var(--heat-map-label)',
    }),
    yLabelsStyle: () => ({
      width: 'var(--heat-map-y-ticks-width)',
      marginRight: 'var(--heat-map-y-ticks-offset)',
      padding: 0,
      color: 'var(--heat-map-label)',
    }),
  };
}
