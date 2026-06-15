/** Форматирование значения слайдера в строку текстового поля. */
export type TextInputFormatter = (value: number) => string;

/** Значение слайдера: число или диапазон `[min, max]` при `range`. */
export type SliderValue = number | number[];
