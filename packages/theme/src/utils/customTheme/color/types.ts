/** Вектор из трёх чисел — канал цвета в любом из пространств (RGB/XYZ/LAB/LCH). */
export type Vec3 = [number, number, number];

/** Матрица 3×3 для линейных преобразований цветовых пространств. */
export type Mat3 = [Vec3, Vec3, Vec3];

export type XYZ = Vec3;
export type LAB = Vec3;
export type LCH = Vec3;
export type RGB = Vec3;

/** Разобранный цвет: OKLCH-компоненты (`l`,`c`,`h`), sRGB-каналы 0–255 (`r`,`g`,`b`) и hex. */
export type TColor = {
  l: number;
  c: number;
  h: number;
  r: number;
  g: number;
  b: number;
  hex: string;
};

/** Модель цветового пространства LCH: конвертеры в/из XYZ и диапазоны компонентов. */
export type TLchModel = {
  ranges: {
    l: { min: number; max: number; step: number };
    c: { min: number; max: number; step: number };
    h: { min: number; max: number; step: number };
  };
  xyz2lch(xyz: XYZ): LCH;
  lch2xyz(lch: LCH): XYZ;
};
