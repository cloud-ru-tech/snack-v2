import { LayoutType } from '../types/layoutTypes';
import { LayoutPresets } from '../types/presets';
import { resolveLayoutType } from './resolveLayoutType';

/**
 * Сливает несколько `LayoutPresets` в один пер-tier: для каждого тира ключи пропов объединяются
 * поверхностным spread'ом, поздний аргумент побеждает (`undefined`-пресет пропускается). Вложенные
 * объекты-значения пропов не мёржатся рекурсивно — поздний целиком перетирает ранний.
 * Накладывает per-instance override (`layoutPresets`) поверх DS-пресетов компонента (`X_LAYOUT_PRESETS`).
 */
export function mergePresets<P>(...presets: (LayoutPresets<P> | undefined)[]): LayoutPresets<P> {
  const result: LayoutPresets<P> = {};

  for (const preset of presets) {
    if (!preset) {
      continue;
    }

    for (const tier of Object.keys(preset) as LayoutType[]) {
      result[tier] = { ...result[tier], ...preset[tier] };
    }
  }

  return result;
}

/** Аргументы {@link resolveByLayout}. */
export type ResolveByLayoutOptions<P extends object> = {
  /** Текущая раскладка (`undefined` → desktop-baseline). */
  layoutType: LayoutType | undefined;
  /** Базовые desktop-дефолты. */
  base: P;
  /** Пресеты пер-tier (instance ⊕ DS, обычно через {@link mergePresets}). */
  presets: LayoutPresets<P>;
  /** Явно переданные пропы (= desktop-значения). */
  explicit: Partial<P>;
};

/**
 * Резолвит итоговые значения пропов по раскладке — desktop-first. Чистая функция.
 *
 * Приоритет ключа: `presets[layoutType]` (пресет раскладки, instance > DS) > `explicit` (явный проп) >
 * `base` (desktop-дефолт). Перетирают только определённые (`!== undefined`) ключи. Пресет выше пропа,
 * потому что перенесённый из desktop-макета проп = desktop-значение и не должен ломать mobile.
 */
export function resolveByLayout<P extends object>({
  layoutType,
  base,
  presets,
  explicit,
}: ResolveByLayoutOptions<P>): P {
  const preset: Partial<P> = presets[resolveLayoutType(layoutType)] ?? {};
  const result = { ...base };

  // explicit поверх base…
  for (const key of Object.keys(explicit) as (keyof P)[]) {
    const value = explicit[key];
    if (value !== undefined) {
      result[key] = value as P[keyof P];
    }
  }

  // …а пресет раскладки поверх explicit (mobile-дефолт защищён от перенесённого desktop-пропа).
  for (const key of Object.keys(preset) as (keyof P)[]) {
    const value = preset[key];
    if (value !== undefined) {
      result[key] = value as P[keyof P];
    }
  }

  return result;
}
