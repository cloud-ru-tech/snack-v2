import { SnapPoint } from '../../../types';

/** Формат `SnapPoint`-строки, который понимает рантайм (число с опц. дробной частью + юнит). */
const SNAP_STRING_RE = /^(\d+(?:\.\d+)?)(px|%|dvh|svh|lvh)$/;

/**
 * Валиден ли `SnapPoint` для рантайма (формат + диапазон). TS-тип `${number}` шире регэкспа
 * (принимает `'-5px'`, `'1e3px'`, `'.5px'`), а `number` — любое число; этот предикат отсеивает то,
 * на чём `resolveSnapPointPx` бросил бы. Используется движком, чтобы деградировать к single-snap
 * вместо необработанного throw в pointer-обработчике.
 */
export function isValidSnapPoint(snap: SnapPoint): boolean {
  if (snap === 'fit-content') return true;
  if (typeof snap === 'number') return snap > 0 && snap <= 1;
  const match = SNAP_STRING_RE.exec(snap);
  return match !== null && Number(match[1]) > 0;
}

/**
 * Разрешает `SnapPoint` в высоту в пикселях для текущего viewport'а.
 *
 * - `'fit-content'` → `contentHeightPx` (высота контента — измеряется потребителем через ref).
 * - `number` (0..1] → доля от `viewportHeightPx` (`0.5` → 50% viewport'а).
 * - `'<n>px'`       → литеральные `n` пикселей.
 * - `'<n>%'`        → `n%` от viewport'а.
 * - `'<n>dvh'` / `'<n>svh'` / `'<n>lvh'` → `n%` от viewport'а (в JS-расчётах все эти юниты
 *   эквивалентны `vh` — реальное dynamic-поведение применяется CSS'ом, а в JS-снапах
 *   используется текущий `window.innerHeight`).
 *
 * Бросает на невалидной строке, чтобы расхождение spec'а ловилось рано.
 */
export function resolveSnapPointPx(snap: SnapPoint, viewportHeightPx: number, contentHeightPx: number): number {
  if (snap === 'fit-content') return contentHeightPx;
  if (typeof snap === 'number') {
    if (snap <= 0 || snap > 1) {
      throw new Error(`Invalid SnapPoint fraction: ${snap} (expected (0, 1])`);
    }
    return Math.round(snap * viewportHeightPx);
  }

  const match = SNAP_STRING_RE.exec(snap);
  if (!match) {
    throw new Error(`Invalid SnapPoint: ${snap}`);
  }

  const value = Number(match[1]);
  const unit = match[2];
  if (value <= 0) {
    throw new Error(`Invalid SnapPoint: ${snap} (must be positive)`);
  }

  if (unit === 'px') return Math.round(value);
  return Math.round((value / 100) * viewportHeightPx);
}

/**
 * Порог скорости (px/ms) быстрого флик-жеста. Единый источник для обоих сценариев:
 * multi-snap-навигации (`findTargetSnap`) и single-snap-закрытия (`useDragEngine`).
 */
export const VELOCITY_THRESHOLD_PX_PER_MS = 0.5;
const CLOSE_THRESHOLD_RATIO_DEFAULT = 0.3;

/**
 * Определяет целевой snap-индекс по текущей высоте sheet'а и скорости drag'а.
 *
 * - `velocityPxPerMs < 0` — drag вверх (раскрытие): уходим на следующий snap, либо последний.
 * - `velocityPxPerMs > 0` — drag вниз (схлопывание): уходим на предыдущий snap, либо ниже первого → закрытие.
 * - `|velocity| < threshold` — скорость мала → выбираем ближайший snap по расстоянию.
 * - Если текущая высота ниже `closeThresholdRatio * snapHeightsPx[0]` — возвращает `-1` (закрытие).
 *
 * @returns индекс snap'а ∈ `[0, snapHeightsPx.length)` либо `-1` (sheet хочет закрыться).
 */
export function findTargetSnap(
  snapHeightsPx: number[],
  currentHeightPx: number,
  velocityPxPerMs: number,
  closeThresholdRatio = CLOSE_THRESHOLD_RATIO_DEFAULT,
): number {
  if (snapHeightsPx.length === 0) return -1;

  const firstSnap = snapHeightsPx[0];
  if (currentHeightPx < firstSnap * (1 - closeThresholdRatio)) {
    return -1;
  }

  if (velocityPxPerMs < -VELOCITY_THRESHOLD_PX_PER_MS) {
    const nextIdx = snapHeightsPx.findIndex(h => h > currentHeightPx);
    return nextIdx === -1 ? snapHeightsPx.length - 1 : nextIdx;
  }

  if (velocityPxPerMs > VELOCITY_THRESHOLD_PX_PER_MS) {
    let prevIdx = -1;
    for (let i = snapHeightsPx.length - 1; i >= 0; i--) {
      if (snapHeightsPx[i] < currentHeightPx) {
        prevIdx = i;
        break;
      }
    }
    return prevIdx === -1 ? -1 : prevIdx;
  }

  let bestIdx = 0;
  for (let i = 1; i < snapHeightsPx.length; i++) {
    if (Math.abs(snapHeightsPx[i] - currentHeightPx) < Math.abs(snapHeightsPx[bestIdx] - currentHeightPx)) {
      bestIdx = i;
    }
  }
  return bestIdx;
}
