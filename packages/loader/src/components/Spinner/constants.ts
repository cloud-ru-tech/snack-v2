import { LOADER_SIZE } from '../constants';
import { LoaderSize } from '../types';

type SpinnerGeometry = {
  /** Сторона квадратного кадра — `viewBox` иконки */
  frame: number;
  /** Диаметр кольца по центру обводки */
  ring: number;
};

/**
 * Геометрия кольца по размерам — снята с мастера Figma `loader/loaderSpinner`
 * (страница `loader`, узел `2918:21302`). Толщина обводки — токен `density.icon.strokeWeight` в стилях.
 */
export const SPINNER_GEOMETRY: Record<LoaderSize, SpinnerGeometry> = {
  [LOADER_SIZE['2XS']]: { frame: 8, ring: 6 },
  [LOADER_SIZE.XS]: { frame: 16, ring: 9 },
  [LOADER_SIZE.S]: { frame: 24, ring: 13 },
  [LOADER_SIZE.M]: { frame: 32, ring: 20 },
  [LOADER_SIZE.L]: { frame: 40, ring: 30 },
};

/** Прозрачность трека — кольца под вращающейся дугой */
export const SPINNER_TRACK_OPACITY = 0.24;
