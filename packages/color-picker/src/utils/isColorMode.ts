import { COLOR_MODE } from '../constants';
import { ColorMode } from '../types';

export function isColorMode(value: unknown): value is ColorMode {
  return Object.values(COLOR_MODE).includes(value as ColorMode);
}
