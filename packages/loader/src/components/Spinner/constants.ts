import { LOADER_SIZE } from '../constants';
import { LoaderSize } from '../types';

type SpinnerGeometry = {
  /** Сторона квадратного кадра — `viewBox` иконки */
  frame: number;
  /** Диаметр кольца по центру обводки */
  ring: number;
  /** Толщина обводки кольца и дуги */
  strokeWidth: number;
};

/**
 * Геометрия кольца по размерам — снята с мастера Figma `loader/loaderSpinner`
 * (страница `loader`, узел `2918:21302`).
 */
export const SPINNER_GEOMETRY: Record<LoaderSize, SpinnerGeometry> = {
  [LOADER_SIZE['2XS']]: { frame: 8, ring: 6, strokeWidth: 0.5 },
  [LOADER_SIZE.XS]: { frame: 16, ring: 9, strokeWidth: 1.25 },
  [LOADER_SIZE.S]: { frame: 24, ring: 13, strokeWidth: 1.5 },
  [LOADER_SIZE.M]: { frame: 32, ring: 20, strokeWidth: 2 },
  [LOADER_SIZE.L]: { frame: 40, ring: 30, strokeWidth: 2.5 },
};

/** Прозрачность трека — кольца под вращающейся дугой */
export const SPINNER_TRACK_OPACITY = 0.24;
