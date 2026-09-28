import { InteractiveChart, useLayer } from '@ds/uikit-product-charts';
import { useMemo } from 'react';

type ChartProps = Parameters<typeof InteractiveChart>[0];

const WIDTH = 640;
const HEIGHT = 320;
const POINTS = 40;
const X_VALUES = Array.from({ length: POINTS }, (_, index) => index);

const DATA: ChartProps['data'] = [
  X_VALUES,
  X_VALUES.map(x => Math.round(50 + 30 * Math.sin(x / 5))),
  X_VALUES.map(x => Math.round(40 + 20 * Math.cos(x / 7))),
  X_VALUES.map(x => Math.round(20 + 10 * Math.sin(x / 3))),
];

export function MultiSeries() {
  const cpu = useLayer({ label: 'CPU', color: 'blue1', drawStyle: 'line', lineInterpolation: 'spline' });
  const memory = useLayer({ label: 'RAM', color: 'green1', drawStyle: 'line', lineInterpolation: 'stepAfter' });
  const disk = useLayer({ label: 'Disk', color: 'violet2', drawStyle: 'bars' });

  // Первая серия — ось X, остальные совпадают по порядку с массивами данных.
  const options = useMemo<ChartProps['options']>(
    () => ({ width: WIDTH, height: HEIGHT, series: [{}, cpu, memory, disk] }),
    [cpu, memory, disk],
  );

  return <InteractiveChart data={DATA} options={options} />;
}
