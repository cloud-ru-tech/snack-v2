// APCA (Accessible Perceptual Contrast Algorithm), реализация SA98G (версия 0.0.98G-4g).
// Используется только для выбора читаемого текста на акцентной заливке при генерации палитры.

import { parseHex } from './hex';
import { RGB } from './types';

// Константы SA98G — менять нельзя, иначе разъедется с эталоном контраста APCA.
const MAIN_TRC = 2.4;
const S_RCO = 0.2126729;
const S_GCO = 0.7151522;
const S_BCO = 0.072175;
const NORM_BG = 0.56;
const NORM_TXT = 0.57;
const REV_TXT = 0.62;
const REV_BG = 0.65;
const BLK_THRS = 0.022;
const BLK_CLMP = 1.414;
const SCALE_BOW = 1.14;
const SCALE_WOB = 1.14;
const LO_BOW_OFFSET = 0.027;
const LO_WOB_OFFSET = 0.027;
const DELTA_Y_MIN = 0.0005;
const LO_CLIP = 0.1;

/** sRGB-каналы 0–255 → относительная яркость `Y` для APCA. */
function sRGBtoY([r, g, b]: RGB): number {
  const linearize = (channel: number): number => Math.pow(channel / 255, MAIN_TRC);

  return S_RCO * linearize(r) + S_GCO * linearize(g) + S_BCO * linearize(b);
}

/** Мягкий клэмп яркости у чёрного (soft black clamp). */
function softClampBlack(y: number): number {
  return y > BLK_THRS ? y : y + Math.pow(BLK_THRS - y, BLK_CLMP);
}

/** Сырой APCA-контраст `Lc` между яркостью текста и фона. Полярность важна, не переставлять аргументы. */
function apcaLc(txtY: number, bgY: number): number {
  if (Number.isNaN(txtY) || Number.isNaN(bgY) || Math.min(txtY, bgY) < 0 || Math.max(txtY, bgY) > 1.1) {
    return 0;
  }

  const text = softClampBlack(txtY);
  const bg = softClampBlack(bgY);

  if (Math.abs(bg - text) < DELTA_Y_MIN) {
    return 0;
  }

  if (bg > text) {
    // Тёмный текст на светлом фоне (BoW).
    const sapc = (Math.pow(bg, NORM_BG) - Math.pow(text, NORM_TXT)) * SCALE_BOW;

    return sapc < LO_CLIP ? 0 : (sapc - LO_BOW_OFFSET) * 100;
  }

  // Светлый текст на тёмном фоне (WoB) — отрицательный по контракту APCA.
  const sapc = (Math.pow(bg, REV_BG) - Math.pow(text, REV_TXT)) * SCALE_WOB;

  return sapc > -LO_CLIP ? 0 : (sapc + LO_WOB_OFFSET) * 100;
}

/**
 * Абсолютный APCA-контраст `Lc` текста на фоне (оба — hex). Невалидный hex → `0`.
 */
export function apcaContrast(backgroundHex: string, textHex: string): number {
  const bg = parseHex(backgroundHex);
  const text = parseHex(textHex);
  if (!bg || !text) {
    return 0;
  }

  return Math.round(Math.abs(apcaLc(sRGBtoY(text), sRGBtoY(bg))));
}
