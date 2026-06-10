type DurationSegment = { value: string; unit: string };

const DURATION_UNITS: { unit: string; seconds: number }[] = [
  { unit: 'д', seconds: 86400 },
  { unit: 'ч', seconds: 3600 },
  { unit: 'м', seconds: 60 },
  { unit: 'с', seconds: 1 },
];

/**
 * Разбивает длительность в секундах на сегменты «число + единица» (дни / часы /
 * минуты / секунды). Ведущие нулевые единицы опускаются, секунды показываются
 * всегда; у ведущего сегмента число без ведущего нуля, у последующих — с нулём.
 *
 * `9 → [9 с]`, `90 → [1 м, 30 с]`, `31568949 → [365 д, 09 ч, 09 м, 09 с]`.
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
