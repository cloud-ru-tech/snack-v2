export const SIZE_PROPERTIES = ['square', 'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'] as const;
export const PADDING_PROPERTIES = [
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'paddingHorizontal',
  'paddingVertical',
] as const;

export const GAP_PROPERTIES = ['gap'] as const;
export const CORNER_RADIUS_PROPERTIES = [
  'borderRadius',
  'borderRadiusLeft',
  'borderRadiusRight',
  'borderRadiusTop',
  'borderRadiusBottom',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
] as const;

export const STROKE_PROPERTIES = [
  'borderWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderLeftWidth',
  'borderBottomWidth',
  'strokeWeight',
  'strokeWeightHorizontal',
  'strokeWeightVertical',
  'strokeWeightTop',
  'strokeWeightRight',
  'strokeWeightBottom',
  'strokeWeightLeft',
] as const;

export const OTHER_PROPERTIES = ['border'] as const;
export const VALID_PROPERTY_NAMES = {
  // color: COLOR_PROPERTIES,
  size: SIZE_PROPERTIES,
  padding: PADDING_PROPERTIES,
  gap: GAP_PROPERTIES,
  borderRadius: CORNER_RADIUS_PROPERTIES,
  stroke: STROKE_PROPERTIES,
  other: OTHER_PROPERTIES,
} as const;

export const ALL_VALID_PROPERTIES = [
  // ...COLOR_PROPERTIES,
  ...SIZE_PROPERTIES,
  ...PADDING_PROPERTIES,
  ...GAP_PROPERTIES,
  ...CORNER_RADIUS_PROPERTIES,
  ...STROKE_PROPERTIES,
  ...OTHER_PROPERTIES,
] as const;

export const PROPERTY_PATTERNS = {
  LOOKS_LIKE_PROPERTY: /^(bg|fg|border|padding|corner|stroke|width|height|min|max|gap|square)/i,
  STROKE_TYPO: /^stroke.*weigth/i,
} as const;

export const VALIDATION_CONFIG = {
  EXCLUDE_SYSTEM_LAYERS: true,
  EXCLUDE_STYLES_LAYER: true,
} as const;

export const SIMILARITY_CONFIG = {
  MAX_DISTANCE: 3,
  MIN_LENGTH: 2,
} as const;

// export type ColorProperty = (typeof COLOR_PROPERTIES)[number];
export type SizeProperty = (typeof SIZE_PROPERTIES)[number];
export type PaddingProperty = (typeof PADDING_PROPERTIES)[number];
export type GapProperty = (typeof GAP_PROPERTIES)[number];
export type borderRadiusProperty = (typeof CORNER_RADIUS_PROPERTIES)[number];
export type StrokeProperty = (typeof STROKE_PROPERTIES)[number];
export type OtherProperty = (typeof OTHER_PROPERTIES)[number];

export type ValidProperty =
  // | ColorProperty
  SizeProperty | PaddingProperty | GapProperty | borderRadiusProperty | StrokeProperty | OtherProperty;
