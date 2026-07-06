import { LayoutPresets, mergePresets, useLayoutDefaults } from '@ds/adaptive';

/** Пресеты адаптивных дефолтов поля по раскладке (сейчас — только `autoFocus`). */
export type FieldLayoutPresets = LayoutPresets<{ autoFocus: boolean }>;

// На mobile autoFocus выключен — иначе открывает экранную клавиатуру без действия пользователя.
const DS_AUTOFOCUS_PRESET: FieldLayoutPresets = { mobile: { autoFocus: false } };

/** Резолвит `autoFocus` по раскладке: desktop — проп, mobile — выключен; переопределяемо через `layoutPresets`. */
export function useAdaptiveAutoFocus(autoFocus = false, layoutPresets?: FieldLayoutPresets): boolean {
  return useLayoutDefaults<{ autoFocus: boolean }>(
    { autoFocus: false },
    mergePresets(DS_AUTOFOCUS_PRESET, layoutPresets),
    { autoFocus },
  ).autoFocus;
}
