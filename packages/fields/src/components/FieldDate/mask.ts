import { DATE_MODE } from './constants';

/** Маска поддерживает только `date` / `date-time` (range собирается из двух одиночных масок). */
export type MaskMode = typeof DATE_MODE.Date | typeof DATE_MODE.DateTime;

const DATE_LEN = 8;
const DATE_TIME_LEN = 12;
const DATE_TIME_SECONDS_LEN = 14;

// Плейсхолдер по умолчанию — RU (ДД.ММ.ГГГГ), как в легаси @snack-uikit/fields и Figma.
// Структура парсинга остаётся числовой (DD/MM/YYYY[/HH/mm/ss]) — плейсхолдер только визуальный.
const RU_DATE = 'ДД.ММ.ГГГГ';
// Время отделяется запятой (паритет с легаси `ДД.ММ.ГГГГ, чч:мм:сс`).
const TIME_SEPARATOR = ', ';

function totalLen(mode: MaskMode, showSeconds: boolean): number {
  if (mode === DATE_MODE.Date) {
    return DATE_LEN;
  }

  return showSeconds ? DATE_TIME_SECONDS_LEN : DATE_TIME_LEN;
}

export function getMaskString(mode: MaskMode, showSeconds = true): string {
  if (mode === DATE_MODE.Date) {
    return RU_DATE;
  }

  return showSeconds ? `${RU_DATE}${TIME_SEPARATOR}чч:мм:сс` : `${RU_DATE}${TIME_SEPARATOR}чч:мм`;
}

type Segment = { len: number; max: number; separator: string };

function buildSegments(mode: MaskMode, showSeconds: boolean): Segment[] {
  const base: Segment[] = [
    { len: 2, max: 31, separator: '' }, // day
    { len: 2, max: 12, separator: '.' }, // month
    { len: 4, max: 9999, separator: '.' }, // year
  ];
  if (mode === DATE_MODE.DateTime) {
    base.push({ len: 2, max: 23, separator: TIME_SEPARATOR }); // hour
    base.push({ len: 2, max: 59, separator: ':' }); // minute
    if (showSeconds) {
      base.push({ len: 2, max: 59, separator: ':' }); // second
    }
  }
  return base;
}

/**
 * Принимает любую строку, оставляет только цифры и форматирует под `DD.MM.YYYY[, HH:mm[:ss]]`.
 *
 * Две UX-механики, призванные не дать пользователю набрать невалидный сегмент:
 * 1. **Авто-prefix `0`**: если первая цифра 2-цифрового сегмента превышает максимально допустимую
 *    «десятку» (`day` → > 3, `month` → > 1, `hour` → > 2, `minute`/`second` → > 5), цифра трактуется
 *    как «единицы» и в начало сегмента добавляется ноль. Пример: `5` для day → `05.`,
 *    фокус автоматически уезжает на следующий сегмент.
 * 2. **Clamp полной двойки**: если набрано две цифры и значение превышает `max` сегмента —
 *    значение прижимается к верхней границе. Пример: `55` для day → `31`, `99` для month → `12`.
 */
export function formatMask(input: string, mode: MaskMode, showSeconds = true): string {
  const maxLen = totalLen(mode, showSeconds);
  const segments = buildSegments(mode, showSeconds);
  let stream = input.replace(/\D/g, '').slice(0, maxLen);
  let out = '';
  for (const seg of segments) {
    if (stream.length === 0) break;
    out += seg.separator;
    // Auto-zero-prefix: если первая цифра > floor(max/10), сегмент не может начаться этой цифрой —
    // считаем её цифрой «единиц» и дописываем `0` перед ней.
    if (seg.len === 2) {
      const first = Number(stream[0]);
      const firstMax = Math.floor(seg.max / 10);
      if (first > firstMax) {
        out += `0${stream[0]}`;
        stream = stream.slice(1);
        continue;
      }
    }
    const raw = stream.slice(0, seg.len);
    stream = stream.slice(seg.len);
    if (raw.length === seg.len) {
      const n = Number(raw);
      out += n > seg.max ? String(seg.max).padStart(seg.len, '0') : raw;
    } else {
      out += raw;
    }
  }
  return out;
}

/** Парсит `DD.MM.YYYY` или `DD.MM.YYYY, HH:mm[:ss]` в `Date`. Возвращает `undefined` при невалидной/неполной строке. */
export function parseMask(input: string, mode: MaskMode, showSeconds = true): Date | undefined {
  const digits = input.replace(/\D/g, '');
  const expected = totalLen(mode, showSeconds);
  if (digits.length !== expected) return undefined;

  const day = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4)) - 1;
  const year = Number(digits.slice(4, 8));
  const hour = mode === DATE_MODE.DateTime ? Number(digits.slice(8, 10)) : 0;
  const minute = mode === DATE_MODE.DateTime ? Number(digits.slice(10, 12)) : 0;
  const second = mode === DATE_MODE.DateTime && showSeconds ? Number(digits.slice(12, 14)) : 0;

  if (year < 1 || month < 0 || month > 11 || day < 1 || day > 31) return undefined;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) return undefined;

  const d = new Date(year, month, day, hour, minute, second);
  // Отбраковать «перетекание» вроде 30 февраля → 2 марта.
  if (d.getDate() !== day || d.getMonth() !== month || d.getFullYear() !== year) return undefined;
  return d;
}

/** Форматирует `Date` в строку под маску — для синхронизации с input при внешнем onChange. */
export function dateToMaskString(value: Date, mode: MaskMode, showSeconds = true): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const head = `${pad(value.getDate())}.${pad(value.getMonth() + 1)}.${value.getFullYear()}`;
  if (mode !== DATE_MODE.DateTime) {
    return head;
  }
  const time = `${pad(value.getHours())}:${pad(value.getMinutes())}${showSeconds ? `:${pad(value.getSeconds())}` : ''}`;
  return `${head}${TIME_SEPARATOR}${time}`;
}
