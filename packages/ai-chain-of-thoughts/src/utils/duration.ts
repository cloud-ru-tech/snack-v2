export type DurationUnit = 'days' | 'hours' | 'minutes' | 'seconds';

type DurationSegment = { value: string; unit: DurationUnit };

const DURATION_UNITS: { unit: DurationUnit; seconds: number }[] = [
  { unit: 'days', seconds: 86400 },
  { unit: 'hours', seconds: 3600 },
  { unit: 'minutes', seconds: 60 },
  { unit: 'seconds', seconds: 1 },
];

/**
 * Разбивает длительность в секундах на сегменты «число + единица» (дни / часы /
 * минуты / секунды). Ведущие нулевые единицы опускаются, секунды показываются
 * всегда; у ведущего сегмента число без ведущего нуля, у последующих — с нулём.
 * Единица — семантический ключ (`days`/`hours`/…), подпись локализуется на стороне
 * компонента через словарь пакета.
 *
 * `9 → [9 seconds]`, `90 → [1 minutes, 30 seconds]`, `31568949 → [365 days, 09 hours, 09 minutes, 09 seconds]`.
 */
export function formatDuration(totalSeconds: number): DurationSegment[] {
  let remainder = Math.max(0, Math.floor(totalSeconds));
  const segments: DurationSegment[] = [];

  for (const { unit, seconds } of DURATION_UNITS) {
    const isSeconds = seconds === 1;
    const value = Math.floor(remainder / seconds);
    remainder %= seconds;

    if (segments.length === 0 && value === 0 && !isSeconds) {
      continue;
    }

    const padded = segments.length > 0 ? String(value).padStart(2, '0') : String(value);
    segments.push({ value: padded, unit });
  }

  return segments;
}
