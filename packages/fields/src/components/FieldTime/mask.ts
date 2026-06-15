import { TimeValue } from '@ds/calendar';

function getMaxLen(showSeconds: boolean): number {
  return showSeconds ? 6 : 4;
}

export function parseTimeMask(input: string, showSeconds: boolean): TimeValue | undefined {
  const digits = input.replace(/\D/g, '');
  const expected = getMaxLen(showSeconds);
  if (digits.length !== expected) return undefined;
  const hours = Number(digits.slice(0, 2));
  const minutes = Number(digits.slice(2, 4));
  const seconds = showSeconds ? Number(digits.slice(4, 6)) : 0;
  if (hours > 23 || minutes > 59 || seconds > 59) return undefined;
  return showSeconds ? { hours, minutes, seconds } : { hours, minutes };
}

export function timeToMaskString(value: TimeValue, showSeconds: boolean): string {
  const pad = (n?: number) => String(n ?? 0).padStart(2, '0');
  const head = `${pad(value.hours)}:${pad(value.minutes)}`;
  return showSeconds ? `${head}:${pad(value.seconds)}` : head;
}
