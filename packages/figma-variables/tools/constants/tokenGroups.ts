export const STYLES_PATTERN = /styles/i;

export const GROUP_PATTERNS = {
  SYSTEM_LAYER: /^\d+_/,
  LAYER_NUMBER: /^(\d+)_/,
} as const;

export const BASE_LAYERS_CONFIG = {
  COUNT: 2,
  START_INDEX: 0,
  END_INDEX: 2,
} as const;
