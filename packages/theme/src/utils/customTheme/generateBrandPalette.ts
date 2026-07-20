import { hex2color, lch2color } from './color';
import { BASE_BRAND_PALETTE, BRAND_PRIMARY_TONES, BrandPrimaryTone, PRIMARY_ACCENT_TONE } from './constants';

/** Сгенерированная бренд-палитра: тон → hex. */
export type BrandPalette = Record<BrandPrimaryTone, string>;

/**
 * Строит бренд-палитру из одного seed-цвета: берёт `L`/`C` каждого опорного тона `BASE_BRAND_PALETTE`
 * и поворачивает hue к hue seed-цвета (OKLCH). Тон акцента (`55`) становится самим seed-цветом.
 * Так один цвет потребителя перекрашивает всю шкалу `--sn-brand-color-primary-<tone>`, сохраняя
 * светлоту/насыщенность DS-палитры. Невалидный hex → `null`.
 */
export function generateBrandPalette(seedColor: string): BrandPalette | null {
  const seed = hex2color(seedColor);
  if (!seed) {
    return null;
  }

  const { h: hue } = seed;
  const palette = {} as BrandPalette;

  for (const tone of BRAND_PRIMARY_TONES) {
    const baseHex = tone === PRIMARY_ACCENT_TONE ? seedColor : BASE_BRAND_PALETTE[tone];
    const base = hex2color(baseHex);

    palette[tone] = base ? lch2color([base.l, base.c, hue]).hex : baseHex;
  }

  return palette;
}
