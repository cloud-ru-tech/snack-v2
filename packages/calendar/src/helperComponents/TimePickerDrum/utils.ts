import { SIZE } from '../../constants';
import { Size } from '../../types';

/**
 * Допустимые значения колонки: whitelist `allowed` (если после фильтра непустой),
 * иначе диапазон от `min` до конца (`0 .. fullCount - 1`), иначе полный диапазон.
 */
export function buildColumnValues(fullCount: number, allowed?: number[], min?: number): number[] {
  const max = fullCount - 1;
  const fullRange = () => Array.from({ length: fullCount }, (_, i) => i);

  if (allowed != null && allowed.length > 0) {
    const uniq = new Set<number>();
    for (const raw of allowed) {
      if (typeof raw !== 'number' || !Number.isFinite(raw)) {
        continue;
      }
      const v = Math.trunc(raw);
      if (v >= 0 && v <= max) {
        uniq.add(v);
      }
    }
    const list = [...uniq].sort((a, b) => a - b);
    if (list.length > 0) {
      return list;
    }
  }

  if (min !== undefined && typeof min === 'number' && Number.isFinite(min)) {
    const from = Math.min(max, Math.max(0, Math.trunc(min)));
    return Array.from({ length: max - from + 1 }, (_, i) => from + i);
  }

  return fullRange();
}

/** `values` — отсортированный по возрастанию список без дубликатов. */
export function nearestInSortedValues(values: number[], target: number): number {
  if (values.length === 0) {
    return target;
  }

  const t = typeof target === 'number' && Number.isFinite(target) ? target : 0;
  const first = values[0];
  const last = values[values.length - 1];

  if (t <= first) {
    return first;
  }
  if (t >= last) {
    return last;
  }

  let lo = 0;
  let hi = values.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const m = values[mid];
    if (m === t) {
      return t;
    }
    if (m < t) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  const left = values[hi];
  const right = values[lo];
  return Math.abs(t - left) <= Math.abs(right - t) ? left : right;
}

/**
 * Математический остаток `n` по модулю `m`: результат всегда в диапазоне `[0, m - 1]` при `m > 0`,
 * в том числе для отрицательных и дробных `n` (после `%` в JS). Нужен для циклического индекса в колонке барабана.
 *
 * @param n делимое (часто индекс со сдвигом)
 * @param m положительный модуль (длина списка `options`)
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/**
 * Форматирует числовую часть времени для отображения: целое приводится к строке с ведущим нулём до двух знаков (`0` → `"00"`, `9` → `"09"`).
 * Используется для часов, минут и секунд в дисплее и в подписях ячеек барабана.
 *
 * @param value целое в допустимом диапазоне колонки (часы, минуты или секунды)
 */
export function formatDisplayPart(value: number): string {
  return String(value).padStart(2, '0');
}

/** В блоке подписи показываем только календарную часть (время — в `timeRow`). */
export function formatSelectedDateLabelForDisplay(text: string): string {
  const trimmed = text.trim();
  if (trimmed === '') {
    return '';
  }

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(parsed));
  }

  return trimmed;
}

/**
 * Геометрия барабана времени по размеру календаря: высота одной строки (`itemHeight`) и высота окна колонок (`pickerHeight`) в пикселях.
 * Соответствует ступенчатым значениям для `s` / `m` / `l` из дизайн-токенов `TimePickerDrum`.
 *
 * @param size размер по оси Figma (`SIZE.S` | `SIZE.M` | `SIZE.L`)
 * @returns `itemHeight` — шаг строки и дискретизации жеста; `pickerHeight` — высота видимой области колонки
 */
export function getSizeLimits(size: Size) {
  if (size === SIZE.L) {
    return { itemHeight: 56, pickerHeight: 280 };
  }
  if (size === SIZE.M) {
    return { itemHeight: 48, pickerHeight: 240 };
  }
  return { itemHeight: 40, pickerHeight: 200 };
}
