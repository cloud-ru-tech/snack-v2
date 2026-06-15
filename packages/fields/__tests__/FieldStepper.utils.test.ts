// Импорт напрямую из src, минуя entry @ds/fields: entry тянет CSS-модули, ломает node-окружение vitest.
import { describe, expect, it } from 'vitest';

import {
  applyStep,
  clamp,
  defaultClampMaxText,
  defaultClampMinText,
  getDefaultValue,
} from '../src/components/FieldStepper/utils';

describe('FieldStepper / getDefaultValue', () => {
  it('returns 0 when no bounds are given', () => {
    expect(getDefaultValue()).toBe(0);
  });

  it('returns min when min is positive', () => {
    expect(getDefaultValue(5)).toBe(5);
    expect(getDefaultValue(5, 100)).toBe(5);
  });

  it('returns 0 when min is zero or negative and the range spans zero', () => {
    expect(getDefaultValue(0, 10)).toBe(0);
    expect(getDefaultValue(-10, 10)).toBe(0);
  });

  it('returns max when the whole range is below zero', () => {
    expect(getDefaultValue(undefined, -5)).toBe(-5);
    expect(getDefaultValue(-20, -5)).toBe(-5);
  });

  it('prefers positive min over negative max (min branch wins)', () => {
    expect(getDefaultValue(3, -1)).toBe(3);
  });
});

describe('FieldStepper / clamp', () => {
  it('returns the value unchanged when no bounds are given', () => {
    expect(clamp(42)).toBe(42);
  });

  it('clamps to min', () => {
    expect(clamp(-5, 0)).toBe(0);
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(50, 0, 10)).toBe(10);
    expect(clamp(50, undefined, 10)).toBe(10);
  });

  it('keeps values inside the range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('respects the boundaries themselves', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe('FieldStepper / applyStep', () => {
  it('adds an integer step', () => {
    expect(applyStep(5, 1)).toBe(6);
    expect(applyStep(5, -1)).toBe(4);
  });

  it('compensates float precision errors (0.1 + 0.2 round-trip)', () => {
    // Без toFixed(10) 0.1 + 0.2 === 0.30000000000000004.
    expect(applyStep(0.1, 0.2)).toBe(0.3);
    expect(applyStep(1.5, 0.5)).toBe(2);
  });

  it('supports negative fractional steps', () => {
    expect(applyStep(1, -0.3)).toBe(0.7);
  });
});

describe('FieldStepper / default clamp tooltip text', () => {
  it('formats the min message', () => {
    expect(defaultClampMinText(0)).toBe('Значение должно быть больше либо равно 0');
    expect(defaultClampMinText(-3)).toBe('Значение должно быть больше либо равно -3');
  });

  it('formats the max message', () => {
    expect(defaultClampMaxText(99)).toBe('Значение должно быть меньше либо равно 99');
  });
});
