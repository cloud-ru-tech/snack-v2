import { PieChartDataItem, PieChartLegendItem } from '@ds/uikit-product-charts';
import uPlot from 'uplot';

export const PIE_DATA: PieChartDataItem[] = [
  { id: 'compute', label: 'Compute', value: 420 },
  { id: 'storage', label: 'Object Storage', value: 310 },
  { id: 'network', label: 'Network', value: 180 },
  { id: 'kubernetes', label: 'Managed Kubernetes', value: 150 },
  { id: 'databases', label: 'Databases', value: 95 },
  { id: 'other', label: 'Other services', value: 45 },
];

export const PIE_AGGREGATED_LEGEND: PieChartLegendItem[] = [
  { id: 'infrastructure', label: 'Infrastructure', value: 910 },
  { id: 'platform', label: 'Platform', value: 245 },
  { id: 'other', label: 'Other', value: 45 },
];

const HEAT_MAP_ROWS = 5;
const HEAT_MAP_COLUMNS = 8;

// Детерминированные значения: матрица должна быть одинаковой между прогонами visual-регрессии.
export const HEAT_MAP_DATA: number[][] = Array.from({ length: HEAT_MAP_ROWS }, (_, row) =>
  Array.from({ length: HEAT_MAP_COLUMNS }, (_, column) => ((row * 7 + column * 13) % 21) * 5),
);

export const HEAT_MAP_DOMAIN: [number, number] = [0, 100];
export const HEAT_MAP_X_TICKS = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
export const HEAT_MAP_Y_TICKS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const POINTS = 40;
const xValues = Array.from({ length: POINTS }, (_, index) => index);

export const LINE_DATA: uPlot.AlignedData = [
  xValues,
  xValues.map(x => Math.round(50 + 30 * Math.sin(x / 5))),
  xValues.map(x => Math.round(40 + 20 * Math.cos(x / 7))),
];

// Box plot: [x, min, q1, median, q3, max].
export const BOX_PLOT_DATA: uPlot.AlignedData = [
  [1, 2, 3, 4, 5, 6],
  [10, 14, 8, 20, 12, 16],
  [22, 28, 18, 34, 25, 30],
  [30, 36, 26, 42, 33, 38],
  [40, 46, 35, 52, 44, 49],
  [55, 62, 50, 70, 58, 64],
];
