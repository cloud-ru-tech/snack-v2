import { HeatMapChart } from '@ds/uikit-product-charts';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];
const HOURS = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

// Загрузка CPU в процентах: строки — дни, столбцы — часы.
const DATA = DAYS.map((_, day) => HOURS.map((__, hour) => ((day * 11 + hour * 17) % 20) * 5));

function formatPercent(value: number) {
  return `${value}%`;
}

function renderCell(_x: number, _y: number, value: number) {
  return value >= 80 ? <strong>{formatPercent(value)}</strong> : formatPercent(value);
}

export function CustomCell() {
  return (
    <HeatMapChart
      data={DATA}
      options={{
        title: 'Загрузка CPU',
        height: 420,
        domain: [0, 100],
        formatter: formatPercent,
        cellRender: renderCell,
        axes: {
          xAxis: { label: 'Время', ticks: HOURS, position: 'top' },
          yAxis: { label: 'День недели', ticks: DAYS },
        },
      }}
    />
  );
}
