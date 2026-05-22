export const MODE = {
  Checkbox: 'checkbox',
  Radio: 'radio',
} as const;

export const SIZE = {
  XS: 'xs',
  S: 's',
} as const;

export const FAVOURITE_ICON = {
  Star: 'star',
  Heart: 'heart',
} as const;

export const SELECTION_MODE = {
  Single: 'single',
  Multiple: 'multiple',
} as const;

/**
 * Суффикс `data-test-id` нативного `<input>` внутри Checkbox/Radio/Switch/Favourite.
 * Если потребитель передаёт `data-test-id='foo'` на корень, нативный input получает
 * `data-test-id='foo-native-input'`. Константа публичная — потребитель и e2e helpers
 * берут один и тот же суффикс из API пакета.
 */
export const NATIVE_INPUT_SUFFIX = '-native-input';
