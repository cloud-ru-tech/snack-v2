import { SIZE } from '../constants';

/** Размеры слотов IconElement в Figma; внутри используется существующий AiIconGiga. */
export const ICON_SIZES = {
  [SIZE.Xs]: 16,
  [SIZE.S]: 24,
  [SIZE.M]: 24,
  [SIZE.L]: 24,
} as const;
