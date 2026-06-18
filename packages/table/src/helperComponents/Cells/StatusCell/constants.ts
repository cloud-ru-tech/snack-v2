export const STATUS_APPEARANCE = {
  Primary: 'primary',
  Neutral: 'neutral',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
  Loading: 'loading',
} as const;

// Минимальная ширина indicator-only варианта status-колонки: точка <Status> + горизонтальные
// отступы ячейки. (В легаси была полоска 4px у края — её больше нет, см. StatusCell.)
export const MIN_STATUS_CELL_SIZE = 32;
