import { SIZE, Size, VALIDATION_STATE, ValidationState } from '@ds/field-decorator';
import { BUTTON_SIZE_MAP, ButtonSize, Size as InputPrivateSize } from '@ds/input-private';
import { copyToClipboard, isBrowser } from '@ds/utils';
import { MouseEvent } from 'react';

/**
 * Копирует текст в буфер обмена (через `copyToClipboard` из `@ds/utils`). Резолвится в `true`
 * при успехе — поля используют это, чтобы показать индикатор «скопировано».
 */
export function copyTextToClipboard(text: string): Promise<boolean> {
  if (!isBrowser() || text.length === 0) {
    return Promise.resolve(false);
  }

  return copyToClipboard(text);
}

/**
 * Курсор в начале строки ввода (нет выделения, обе границы на позиции 0). Используется
 * полями (`FieldCombo`, `FieldSecure`) для перевода ArrowLeft в левый слот, когда дальше
 * влево по тексту двигаться некуда.
 */
export const isCursorAtStart = (el: HTMLInputElement | null): boolean =>
  Boolean(el && el.selectionStart === 0 && el.selectionEnd === 0);

/**
 * Курсор в конце строки ввода (нет выделения, обе границы на длине значения). Используется
 * полями для перевода ArrowRight в правый слот, когда дальше вправо по тексту двигаться некуда.
 */
export const isCursorAtEnd = (el: HTMLInputElement | null): boolean =>
  Boolean(el && el.selectionStart === el.value.length && el.selectionEnd === el.value.length);

type AcrylicLevel = 'default' | '1Level' | '2Level';

type AcrylicAppearance = 'neutral' | 'red' | 'yellow' | 'green';

type AcrylicParams = {
  validationState?: ValidationState;
  disabled?: boolean;
  readonly?: boolean;
  hover?: boolean;
  focusVisible?: boolean;
};

// Состояние валидации → тонировка acrylic-фона (паритет с Figma:
// error=red background, warning=yellow, success=green; valid/default — нейтральный фон).
const VALIDATION_ACRYLIC_APPEARANCE: Partial<Record<ValidationState, AcrylicAppearance>> = {
  [VALIDATION_STATE.Error]: 'red',
  [VALIDATION_STATE.Warning]: 'yellow',
  [VALIDATION_STATE.Success]: 'green',
};

function isColoredValidation(validationState?: ValidationState): boolean {
  return Boolean(validationState && VALIDATION_ACRYLIC_APPEARANCE[validationState]);
}

/**
 * Appearance acrylic-фона поля. Тонируется по состоянию валидации (Figma: error→red,
 * warning→yellow, success→green; valid/default — нейтральный фон). На неактивном поле
 * (disabled/readonly) тонировка снимается — фон нейтральный.
 */
export function getAcrylicAppearance({ validationState, disabled, readonly }: AcrylicParams): AcrylicAppearance {
  if (disabled || readonly) {
    return 'neutral';
  }

  return (validationState && VALIDATION_ACRYLIC_APPEARANCE[validationState]) || 'neutral';
}

/**
 * Уровень acrylic-фона поля. `default` для disabled/readonly и для покоя тонированных
 * (error/warning/success) состояний (red/green/yellow background по Figma); `2Level` на
 * hover/focus; `1Level` для нейтрального поля в покое.
 */
export function getAcrylicLevel({
  validationState,
  disabled,
  readonly,
  hover,
  focusVisible,
}: AcrylicParams): AcrylicLevel {
  if (disabled || readonly) {
    return 'default';
  }

  if (hover || focusVisible) {
    return '2Level';
  }

  return isColoredValidation(validationState) ? 'default' : '1Level';
}

/**
 * data-* атрибуты acrylic-материала поля (appearance + level) одним объектом для spread
 * на materialLayer — единый источник тонировки фона по валидации для всех полей shell.
 */
export function getAcrylicProps(params: AcrylicParams) {
  return {
    'data-acrylic-appearance': getAcrylicAppearance(params),
    'data-acrylic-level': getAcrylicLevel(params),
  };
}

/**
 * Гасит mousedown на слот-обёртке функциональной кнопки (clear/copy): фокус остаётся в input.
 * Статический обработчик, общий для полей со слотами (`FieldDate`, `FieldSelect`).
 */
export const preventSlotMouseDown = (event: MouseEvent<HTMLSpanElement>): void => event.preventDefault();

/**
 * Гасит click на слот-обёртке: не доходит до триггера, чтобы клик по кнопке не
 * тогглил dropdown/calendar. Общий статический обработчик для полей со слотами.
 */
export const stopSlotClickPropagation = (event: MouseEvent<HTMLSpanElement>): void => event.stopPropagation();

/**
 * Размер поля → размер `InputPrivate`. Оси `'s' | 'm' | 'l'` совпадают, маппинг тождественный —
 * хелпер убирает инлайн-касты `size as InputPrivateSize` из реализаций полей.
 */
export function toInputSize(size: Size = SIZE.M): InputPrivateSize {
  return size;
}

/**
 * Размер поля → размер кнопки-слота. У кнопок нет `l`, поэтому `l` сводится к `m`
 * через `BUTTON_SIZE_MAP` (паритет с input-private), а не приводится небезопасным кастом.
 */
export function toButtonSize(size: Size = SIZE.M): ButtonSize {
  return BUTTON_SIZE_MAP[size];
}
