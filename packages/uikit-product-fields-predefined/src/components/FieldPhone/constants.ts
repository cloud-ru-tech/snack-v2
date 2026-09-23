import { CSSProperties } from 'react';

export const PLACEHOLDER_CHAR = '_';

/**
 * Размер иконки флага страны в селекторе и выпадающем списке. У флагов из `@ds/icons/flags`
 * `size` — высота, ширина следует нативному аспекту 24×18: `18` даёт бокс 24×18.
 */
export const FLAG_ICON_SIZE = 18;

/**
 * Флаг в кнопке страны — 24×18 на всех размерах (Product-макет fieldPhone). Кнопка-слот FieldCombo
 * клампит иконки до 16 на size s, инлайн-стиль снимает кламп.
 */
export const SELECTOR_FLAG_STYLE: CSSProperties = { maxWidth: 'none', maxHeight: 'none' };

/** Задержка перед возвратом фокуса в поле после выбора страны — ждём закрытия дроплиста (desktop). */
export const REFOCUS_AFTER_COUNTRY_DELAY_MS = 500;
