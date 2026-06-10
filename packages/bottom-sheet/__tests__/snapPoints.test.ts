import { describe, expect, it } from 'vitest';

import {
  findTargetSnap,
  isValidSnapPoint,
  resolveSnapPointPx,
} from '../src/components/BottomSheetCustom/utils/snapPoints';

const VIEWPORT = 1000;
const CONTENT = 400;

describe('resolveSnapPointPx', () => {
  it('returns contentHeightPx for "fit-content"', () => {
    expect(resolveSnapPointPx('fit-content', VIEWPORT, CONTENT)).toBe(CONTENT);
  });

  it('resolves a number as a fraction of the viewport', () => {
    expect(resolveSnapPointPx(0.5, VIEWPORT, CONTENT)).toBe(500);
    expect(resolveSnapPointPx(1, VIEWPORT, CONTENT)).toBe(VIEWPORT);
    expect(resolveSnapPointPx(0.25, VIEWPORT, CONTENT)).toBe(250);
  });

  it('rounds fractional viewport math', () => {
    expect(resolveSnapPointPx(0.333, 1000, CONTENT)).toBe(333);
  });

  it('resolves "Npx" literally', () => {
    expect(resolveSnapPointPx('320px', VIEWPORT, CONTENT)).toBe(320);
  });

  it('resolves "%" / "dvh" / "svh" / "lvh" as a fraction of the viewport', () => {
    expect(resolveSnapPointPx('50%', VIEWPORT, CONTENT)).toBe(500);
    expect(resolveSnapPointPx('90dvh', VIEWPORT, CONTENT)).toBe(900);
    expect(resolveSnapPointPx('25svh', VIEWPORT, CONTENT)).toBe(250);
    expect(resolveSnapPointPx('75lvh', VIEWPORT, CONTENT)).toBe(750);
  });

  it('throws on an invalid string', () => {
    expect(() => resolveSnapPointPx('garbage' as never, VIEWPORT, CONTENT)).toThrow(/Invalid SnapPoint/);
  });

  it('throws on a non-positive or out-of-range fraction', () => {
    expect(() => resolveSnapPointPx(0 as never, VIEWPORT, CONTENT)).toThrow(/Invalid SnapPoint fraction/);
    expect(() => resolveSnapPointPx(-0.5 as never, VIEWPORT, CONTENT)).toThrow(/Invalid SnapPoint fraction/);
    expect(() => resolveSnapPointPx(1.5 as never, VIEWPORT, CONTENT)).toThrow(/Invalid SnapPoint fraction/);
  });

  it('throws on a non-positive pixel / unit value', () => {
    expect(() => resolveSnapPointPx('0px' as never, VIEWPORT, CONTENT)).toThrow(/must be positive/);
    expect(() => resolveSnapPointPx('-50px' as never, VIEWPORT, CONTENT)).toThrow(/Invalid SnapPoint/);
  });
});

describe('isValidSnapPoint', () => {
  it('accepts in-range numbers, valid unit strings, and fit-content', () => {
    expect(isValidSnapPoint(0.5)).toBe(true);
    expect(isValidSnapPoint(1)).toBe(true);
    expect(isValidSnapPoint('320px')).toBe(true);
    expect(isValidSnapPoint('50%')).toBe(true);
    expect(isValidSnapPoint('90dvh')).toBe(true);
    expect(isValidSnapPoint('25svh')).toBe(true);
    expect(isValidSnapPoint('fit-content')).toBe(true);
  });

  it('rejects type-valid-but-runtime-invalid values (the inputs that used to throw on first swipe)', () => {
    // `[50]` вместо `[0.5]`, ноль/отрицательные, scientific/leading-dot — TS их пропускает, рантайм нет.
    expect(isValidSnapPoint(50 as never)).toBe(false);
    expect(isValidSnapPoint(0 as never)).toBe(false);
    expect(isValidSnapPoint(-0.5 as never)).toBe(false);
    expect(isValidSnapPoint('-5px' as never)).toBe(false);
    expect(isValidSnapPoint('0px' as never)).toBe(false);
    expect(isValidSnapPoint('1e3px' as never)).toBe(false);
    expect(isValidSnapPoint('.5px' as never)).toBe(false);
    expect(isValidSnapPoint('garbage' as never)).toBe(false);
  });
});

describe('findTargetSnap', () => {
  const snaps = [300, 600, 900];

  it('returns -1 for an empty snap array', () => {
    expect(findTargetSnap([], 500, 0)).toBe(-1);
  });

  it('closes when current height is below firstSnap * (1 - closeThreshold)', () => {
    // 300 * 0.7 = 210 → ниже = закрытие.
    expect(findTargetSnap(snaps, 100, 0)).toBe(-1);
    expect(findTargetSnap(snaps, 209, 0)).toBe(-1);
  });

  it('moves to the next snap on upward velocity', () => {
    expect(findTargetSnap(snaps, 350, -1)).toBe(1);
  });

  it('returns the last snap on strong upward velocity past the last', () => {
    expect(findTargetSnap(snaps, 950, -1)).toBe(2);
  });

  it('moves to the previous snap on downward velocity', () => {
    expect(findTargetSnap(snaps, 700, 1)).toBe(1);
  });

  it('closes on downward velocity below the first snap', () => {
    expect(findTargetSnap(snaps, 290, 1)).toBe(-1);
  });

  it('snaps to the nearest point when velocity is below threshold', () => {
    expect(findTargetSnap(snaps, 320, 0)).toBe(0); // ближе к 300
    expect(findTargetSnap(snaps, 550, 0)).toBe(1); // ближе к 600
    expect(findTargetSnap(snaps, 850, 0)).toBe(2); // ближе к 900
  });

  it('handles a single-snap array (nearest or close)', () => {
    expect(findTargetSnap([500], 480, 0)).toBe(0); // рядом со snap'ом
    expect(findTargetSnap([500], 100, 0)).toBe(-1); // 500*0.7=350 → ниже = закрытие
  });

  it('respects a custom closeThresholdRatio', () => {
    // threshold 0.5 → закрытие если ниже 300 * 0.5 = 150.
    expect(findTargetSnap(snaps, 200, 0, 0.5)).toBe(0);
    expect(findTargetSnap(snaps, 100, 0, 0.5)).toBe(-1);
  });

  it('fast flick from a height exactly on a snap moves to the adjacent snap (no jump-over)', () => {
    // На точной высоте snap'а 600 (index 1): флик вверх → следующий (2), флик вниз → предыдущий (0).
    expect(findTargetSnap(snaps, 600, -1)).toBe(2);
    expect(findTargetSnap(snaps, 600, 1)).toBe(0);
    // На крайних snap'ах флик «за край» остаётся на крайнем / закрывает.
    expect(findTargetSnap(snaps, 900, -1)).toBe(2); // уже наверху → остаёмся
    expect(findTargetSnap(snaps, 300, 1)).toBe(-1); // ниже первого → закрытие
  });

  it('exact-snap nearest selection (velocity below threshold) returns that snap', () => {
    expect(findTargetSnap(snaps, 300, 0)).toBe(0);
    expect(findTargetSnap(snaps, 600, 0)).toBe(1);
    expect(findTargetSnap(snaps, 900, 0)).toBe(2);
  });

  it('single-snap array with a non-zero velocity stays on / closes (no out-of-range index)', () => {
    expect(findTargetSnap([500], 480, -1)).toBe(0); // флик вверх, но дальше snap'а нет → остаёмся
    expect(findTargetSnap([500], 480, 1)).toBe(-1); // флик вниз → ниже единственного → закрытие
  });

  it('velocity exactly at the threshold counts as "slow" → nearest snap (strict comparison)', () => {
    // Порог 0.5 — сравнение строгое (`< -0.5` / `> 0.5`), поэтому ровно ±0.5 → ветка nearest.
    expect(findTargetSnap(snaps, 610, 0.5)).toBe(1); // не «вниз на предыдущий», а ближайший (600)
    expect(findTargetSnap(snaps, 590, -0.5)).toBe(1); // не «вверх на следующий», а ближайший (600)
  });

  it('duplicate resolved heights: the duplicate index is unreachable by swipe (documented limitation)', () => {
    // [500,500,900]: nearest на 500 всегда отдаёт idx0 (строгое `<`), флик вверх перепрыгивает оба
    // 500 → idx2. idx1 свайпом недостижим — поэтому snapPoints должны резолвиться в РАЗНЫЕ высоты.
    expect(findTargetSnap([500, 500, 900], 500, 0)).toBe(0);
    expect(findTargetSnap([500, 500, 900], 500, -1)).toBe(2);
  });

  it('assumes ascending order: unsorted input mis-routes (consumer contract — keep snapPoints ascending)', () => {
    // Документируем контракт: индекс 0 обязан быть самым компактным. На неотсортированном массиве
    // close-порог берётся от snapHeightsPx[0] (здесь 900), поэтому валидная высота 500 читается как
    // «ниже порога» → -1 (закрытие). Движок намеренно не сортирует — это зона ответственности API.
    expect(findTargetSnap([900, 300, 600], 500, 0)).toBe(-1);
    // Тот же набор в правильном порядке ведёт себя корректно.
    expect(findTargetSnap([300, 600, 900], 500, 0)).toBe(1); // ближе к 600
  });
});
