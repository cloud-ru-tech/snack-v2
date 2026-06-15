export const COLOR_MODE = {
  Hex: 'hex',
  Rgb: 'rgb',
  Hsv: 'hsv',
} as const;

export const COLOR_MODE_LABEL: Record<string, string> = {
  [COLOR_MODE.Hex]: 'HEX',
  [COLOR_MODE.Rgb]: 'RGB',
  [COLOR_MODE.Hsv]: 'HSV',
};

// Порядок сегментов переключателя моделей — как в Figma colorPicker: HEX · HSV · RGB.
export const DEFAULT_AVAILABLE_MODES = [COLOR_MODE.Hex, COLOR_MODE.Hsv, COLOR_MODE.Rgb] as const;

export const DEFAULT_COLOR = '#000000';

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

/** Суффикс test-id нативного `<input>` внутри полей. */
export const NATIVE_INPUT_SUFFIX = '-native-input';

export const TEST_IDS = {
  root: 'color-picker',
  segments: 'color-picker__segments',
  apply: 'color-picker__apply',
  cancel: 'color-picker__cancel',
  fieldHex: 'color-picker__field-hex',
  fieldR: 'color-picker__field-r',
  fieldG: 'color-picker__field-g',
  fieldB: 'color-picker__field-b',
  fieldH: 'color-picker__field-h',
  fieldS: 'color-picker__field-s',
  fieldV: 'color-picker__field-v',
  fieldAlpha: 'color-picker__field-alpha',
  sliderR: 'color-picker__slider-r',
  sliderG: 'color-picker__slider-g',
  sliderB: 'color-picker__slider-b',
  sliderH: 'color-picker__slider-h',
  sliderS: 'color-picker__slider-s',
  sliderV: 'color-picker__slider-v',
  sliderAlpha: 'color-picker__slider-alpha',
} as const;

export const RGBA_REGEX =
  /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;

export const HSVA_REGEX =
  /hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;

export const HSLA_REGEX =
  /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
