import { oklabToOklch, oklabToXyz, oklchToOklab, xyzToOklab } from './conversions';
import { LCH, TLchModel, XYZ } from './types';

// L компонента OKLCH хранится наружу в процентах [0–100], внутри модели — в [0–1].
function toDisplayOKLCH([l, c, h]: LCH): LCH {
  return [l * 100, c, h];
}

function fromDisplayOKLCH([l, c, h]: LCH): LCH {
  return [l / 100, c, h];
}

/** Модель OKLCH: перевод LCH↔XYZ через OKLab. `L` наружу — в процентах. */
export const oklch: TLchModel = {
  lch2xyz: (lch: LCH): XYZ => oklabToXyz(oklchToOklab(fromDisplayOKLCH(lch))),
  xyz2lch: (xyz: XYZ): LCH => toDisplayOKLCH(oklabToOklch(xyzToOklab(xyz))),
  ranges: {
    l: { min: 0, max: 100, step: 0.5 },
    c: { min: 0, max: 0.33, step: 0.005 },
    h: { min: 0, max: 360, step: 0.5 },
  },
};
