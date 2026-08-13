/** Отношение длины контрольного плеча к радиусу для четверти окружности, заданной кубической кривой Безье */
const QUARTER_ARC_HANDLE_RATIO = 0.5522847498;

function format(value: number): string {
  return String(Number(value.toFixed(5)));
}

/**
 * Путь четверти окружности — от левой точки кольца к верхней, против часовой стрелки.
 * Так дуга спиннера повторяет `ToneAlpha1` из мастера Figma.
 */
export function buildQuarterArcPath(center: number, radius: number): string {
  const handle = radius * QUARTER_ARC_HANDLE_RATIO;

  const start = `${format(center - radius)} ${format(center)}`;
  const firstControl = `${format(center - radius)} ${format(center - handle)}`;
  const secondControl = `${format(center - handle)} ${format(center - radius)}`;
  const end = `${format(center)} ${format(center - radius)}`;

  return `M${start}C${firstControl} ${secondControl} ${end}`;
}
