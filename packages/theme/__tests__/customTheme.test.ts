import { describe, expect, it } from 'vitest';

import {
  BASE_BRAND_PALETTE,
  BRAND_PRIMARY_TONES,
  buildBrandPaletteCss,
  buildBrandPaletteVars,
  generateBrandPalette,
  PRIMARY_ACCENT_TONE,
} from '../src';
import { apcaContrast } from '../src/utils/customTheme/color/apca';
import { hex2color } from '../src/utils/customTheme/color/colorSpace';
import { isValidHex, parseHex, srgbToHex } from '../src/utils/customTheme/color/hex';

/** Разворачивает nullable без non-null assertion (`!` запрещён линтером). */
function nn<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error('unexpected nullish value');
  }

  return value;
}

const sum = (channels: number[]): number => channels.reduce((acc, channel) => acc + channel, 0);
const BRAND_LIST = '.sn-brandA,.sn-brandB,.sn-brandC,.sn-brandD';

describe('customTheme / hex', () => {
  it('парсит #rrggbb, #rgb, с alpha и без #', () => {
    expect(parseHex('#ff7a00')).toEqual([255, 122, 0]);
    expect(parseHex('ff7a00')).toEqual([255, 122, 0]);
    expect(parseHex('#f70')).toEqual([255, 119, 0]);
    expect(parseHex('#ff7a00cc')).toEqual([255, 122, 0]); // alpha игнорируется
  });

  it('невалидный hex → null', () => {
    expect(parseHex('nope')).toBeNull();
    expect(parseHex('#zzz')).toBeNull();
    expect(parseHex('#ff7a0')).toBeNull();
    expect(isValidHex('#389f74')).toBe(true);
    expect(isValidHex('rgb(1,2,3)')).toBe(false);
  });

  it('srgbToHex клампит каналы 0–1 → #rrggbb', () => {
    expect(srgbToHex([0, 0, 0])).toBe('#000000');
    expect(srgbToHex([1, 1, 1])).toBe('#ffffff');
    expect(srgbToHex([-1, 2, 0.5])).toBe('#00ff80');
  });
});

describe('customTheme / apcaContrast', () => {
  it('одинаковый цвет → 0', () => {
    expect(apcaContrast('#777777', '#777777')).toBe(0);
  });

  it('чёрный на белом даёт высокий контраст', () => {
    expect(apcaContrast('#ffffff', '#000000')).toBeGreaterThan(100);
  });

  it('невалидный вход → 0', () => {
    expect(apcaContrast('nope', '#000000')).toBe(0);
    expect(apcaContrast('#ffffff', 'zzz')).toBe(0);
  });
});

describe('customTheme / generateBrandPalette', () => {
  it('покрывает все тоны, тон акцента = seed', () => {
    const palette = nn(generateBrandPalette('#ff7a00'));

    for (const tone of BRAND_PRIMARY_TONES) {
      expect(palette[tone]).toMatch(/^#[\da-f]{6}$/);
    }
    // Тон акцента воспроизводит сам seed (в пределах OKLCH-roundtrip).
    expect(palette[PRIMARY_ACCENT_TONE]).toBe('#ff7a00');
  });

  it('поворачивает hue всех тонов к hue seed (iso-hue ramp)', () => {
    const seedHue = nn(hex2color('#ff7a00')).h;
    const palette = nn(generateBrandPalette('#ff7a00'));

    for (const tone of BRAND_PRIMARY_TONES) {
      const color = nn(hex2color(palette[tone]));
      // Near-neutral тоны (низкая chroma, например near-white/near-black) имеют численно
      // нестабильный hue после 8-bit rounding — их пропускаем, проверяем только насыщенные.
      if (color.c < 0.04) {
        continue;
      }
      const hueDiff = Math.abs(((color.h - seedHue + 540) % 360) - 180);
      expect(hueDiff).toBeLessThan(12);
    }
  });

  it('seed = опорный акцент воспроизводит опорную палитру (в пределах rounding)', () => {
    const palette = nn(generateBrandPalette(BASE_BRAND_PALETTE[PRIMARY_ACCENT_TONE]));

    for (const tone of BRAND_PRIMARY_TONES) {
      const got = nn(parseHex(palette[tone]));
      const ref = nn(parseHex(BASE_BRAND_PALETTE[tone]));
      const delta = Math.max(...got.map((channel, index) => Math.abs(channel - ref[index])));
      expect(delta).toBeLessThanOrEqual(10);
    }
  });

  it('невалидный seed → null', () => {
    expect(generateBrandPalette('not-a-color')).toBeNull();
  });
});

describe('customTheme / buildBrandPaletteVars', () => {
  it('строит переменные всех тонов + transparent + onAccent', () => {
    const vars = nn(buildBrandPaletteVars('#389f74'));

    for (const tone of BRAND_PRIMARY_TONES) {
      expect(vars[`--sn-brand-color-primary-${tone}`]).toMatch(/^#[\da-f]{6}$/);
    }
    expect(vars['--sn-brand-color-primary-transparent']).toBe('#389f7424');
    expect(vars['--sn-brand-color-primary-onAccentLight']).toBeDefined();
    expect(vars['--sn-brand-color-primary-onAccentDark']).toBeDefined();
  });

  it('задаёт activated-тинты акцента (default/hovered/pressed)', () => {
    const vars = nn(buildBrandPaletteVars('#389f74'));

    expect(vars['--sn-brand-color-state-activated-default-background']).toBe('#389f7426');
    expect(vars['--sn-brand-color-state-activated-hovered-background']).toBe('#389f7459');
    expect(vars['--sn-brand-color-state-activated-pressed-background']).toBe('#389f7473');
  });

  it('контрастный акцент: светлая схема — near-white, тёмная — near-dark', () => {
    const vars = nn(buildBrandPaletteVars('#389f74'));
    const light = nn(parseHex(vars['--sn-brand-color-primary-onAccentLight']));
    const dark = nn(parseHex(vars['--sn-brand-color-primary-onAccentDark']));

    expect(sum(light)).toBeGreaterThan(sum(dark));
  });

  it('слишком светлый акцент (жёлтый) инвертирует: светлая схема — тёмный текст', () => {
    const vars = nn(buildBrandPaletteVars('#ffe000'));
    const light = nn(parseHex(vars['--sn-brand-color-primary-onAccentLight']));
    const dark = nn(parseHex(vars['--sn-brand-color-primary-onAccentDark']));

    // Инверсия: onAccentLight стал тёмным, onAccentDark — светлым.
    expect(sum(light)).toBeLessThan(sum(dark));
  });

  it('невалидный seed → null', () => {
    expect(buildBrandPaletteVars('#zzz')).toBeNull();
  });
});

describe('customTheme / buildBrandPaletteCss', () => {
  it('без scope — глобальное правило на бренд-классы', () => {
    const css = nn(buildBrandPaletteCss('#ff7a00'));

    expect(css.startsWith(`:is(${BRAND_LIST}){`)).toBe(true);
    expect(css).toContain('--sn-brand-color-primary-55:#ff7a00');
    expect(css).toContain('--sn-brand-color-state-activated-default-background:#ff7a0026');
    expect(css).not.toContain('data-');
  });

  it('со scope — правило ограничено (потомки + сам корень)', () => {
    const css = nn(buildBrandPaletteCss('#ff7a00', '#app'));

    expect(css).toContain(`#app :is(${BRAND_LIST})`);
    expect(css).toContain(`#app:is(${BRAND_LIST})`);
    expect(css).toContain('--sn-brand-color-primary-55:#ff7a00');
  });

  it('невалидный seed → null', () => {
    expect(buildBrandPaletteCss('nope')).toBeNull();
  });
});
