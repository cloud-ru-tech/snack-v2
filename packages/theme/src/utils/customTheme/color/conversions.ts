// Матрицы и формулы преобразований цветовых пространств — из CSS Color 4
// (https://drafts.csswg.org/css-color-4/conversions.js) и работы Björn Ottosson по OKLab
// (https://bottosson.github.io/posts/oklab/). Константы менять нельзя; тип-контракт 3×3-матрицы
// фиксирован, чтобы обойтись без `any`/`@ts-ignore` в обобщённом умножении.

import { LAB, LCH, Mat3, RGB, Vec3, XYZ } from './types';

/** Умножение матрицы 3×3 на вектор из трёх компонентов. */
function mulV(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}

const XYZ_TO_LMS: Mat3 = [
  [0.8190224432164319, 0.3619062562801221, -0.12887378261216414],
  [0.0329836671980271, 0.9292868468965546, 0.03614466816999844],
  [0.048177199566046255, 0.26423952494422764, 0.6335478258136937],
];

const LMS_TO_OKLAB: Mat3 = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766],
];

const LMS_TO_XYZ: Mat3 = [
  [1.2268798733741557, -0.5578149965554813, 0.28139105017721583],
  [-0.04057576262431372, 1.1122868293970594, -0.07171106666151701],
  [-0.07637294974672142, -0.4214933239627914, 1.5869240244272418],
];

// prettier-ignore
const OKLAB_TO_LMS: Mat3 = [
  // eslint-disable-next-line no-loss-of-precision
  [0.99999999845051981432, 0.39633779217376785678, 0.21580375806075880339],
  // eslint-disable-next-line no-loss-of-precision
  [1.0000000088817607767, -0.1055613423236563494, -0.063854174771705903402],
  // eslint-disable-next-line no-loss-of-precision
  [1.0000000546724109177, -0.089484182094965759684, -1.2914855378640917399],
];

const LIN_SRGB_TO_XYZ: Mat3 = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
];

const XYZ_TO_LIN_SRGB: Mat3 = [
  [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
  [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
  [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
];

/** XYZ (относительно D65) → OKLab. `L` в диапазоне `[0,1]`. */
export function xyzToOklab(xyz: XYZ): LAB {
  const lms = mulV(XYZ_TO_LMS, xyz);
  const lmsCbrt: Vec3 = [Math.cbrt(lms[0]), Math.cbrt(lms[1]), Math.cbrt(lms[2])];

  return mulV(LMS_TO_OKLAB, lmsCbrt);
}

/** OKLab → XYZ (относительно D65). */
export function oklabToXyz(lab: LAB): XYZ {
  const lms = mulV(OKLAB_TO_LMS, lab);
  const lmsCubed: Vec3 = [lms[0] ** 3, lms[1] ** 3, lms[2] ** 3];

  return mulV(LMS_TO_XYZ, lmsCubed);
}

/** OKLab → OKLCH. Hue возвращается в градусах `[0,360)`. */
export function oklabToOklch(lab: LAB): LCH {
  const hue = (Math.atan2(lab[2], lab[1]) * 180) / Math.PI;

  return [lab[0], Math.sqrt(lab[1] ** 2 + lab[2] ** 2), hue >= 0 ? hue : hue + 360];
}

/** OKLCH → OKLab. */
export function oklchToOklab(lch: LCH): LAB {
  return [lch[0], lch[1] * Math.cos((lch[2] * Math.PI) / 180), lch[1] * Math.sin((lch[2] * Math.PI) / 180)];
}

/** sRGB → linear-light sRGB (обратная gamma-коррекция), расширенная функция для отрицательных значений. */
export function linSRGB(rgb: RGB): RGB {
  return rgb.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    return abs < 0.04045 ? val / 12.92 : sign * Math.pow((abs + 0.055) / 1.055, 2.4);
  }) as RGB;
}

/** linear-light sRGB → sRGB (gamma-коррекция), расширенная функция для отрицательных значений. */
export function gamSRGB(rgb: RGB): RGB {
  return rgb.map(val => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);

    return abs > 0.0031308 ? sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055) : 12.92 * val;
  }) as RGB;
}

/** linear-light sRGB → CIE XYZ (белая точка D65). */
export function linSRGBToXYZ(rgb: RGB): XYZ {
  return mulV(LIN_SRGB_TO_XYZ, rgb);
}

/** CIE XYZ → linear-light sRGB. */
export function xyzToLinSRGB(xyz: XYZ): RGB {
  return mulV(XYZ_TO_LIN_SRGB, xyz);
}
