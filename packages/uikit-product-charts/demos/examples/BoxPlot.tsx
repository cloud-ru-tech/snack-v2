import { InteractiveChart } from '@ds/uikit-product-charts';

type ChartProps = Parameters<typeof InteractiveChart>[0];

// Формат данных box plot: [x, min, q1, median, q3, max].
const DATA: ChartProps['data'] = [
  [1, 2, 3, 4, 5, 6],
  [10, 14, 8, 20, 12, 16],
  [22, 28, 18, 34, 25, 30],
  [30, 36, 26, 42, 33, 38],
  [40, 46, 35, 52, 44, 49],
  [55, 62, 50, 70, 58, 64],
];

const HEIGHT = 320;
const OPTIONS: ChartProps['options'] = { width: 640, height: HEIGHT };

export function BoxPlot() {
  return <InteractiveChart type='boxPlot' data={DATA} options={OPTIONS} />;
}
