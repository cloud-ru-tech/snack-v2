import { VALIDATION_STATE } from '@ds/field-decorator';
import { describe, expect, it } from 'vitest';

// Импорт напрямую из src, минуя entry @ds/fields: entry тянет CSS-модули, ломает test-окружение.
import { getAcrylicAppearance, getAcrylicLevel, getAcrylicProps } from '../src/components/shared/utils';

describe('FieldSecure / getAcrylicAppearance', () => {
  it('maps colored validation states to tints (error→red, warning→yellow, success→green)', () => {
    expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Error })).toBe('red');
    expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Warning })).toBe('yellow');
    expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Success })).toBe('green');
  });

  it('keeps neutral for default and valid (valid is NOT green)', () => {
    expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Default })).toBe('neutral');
    expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Valid })).toBe('neutral');
    expect(getAcrylicAppearance({})).toBe('neutral');
  });

  it('drops the tint on inactive fields (disabled / readonly) even with a colored validation', () => {
    expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Error, disabled: true })).toBe('neutral');
    expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Error, readonly: true })).toBe('neutral');
  });
});

describe('FieldSecure / getAcrylicLevel', () => {
  it('returns default for disabled / readonly regardless of other flags', () => {
    expect(getAcrylicLevel({ disabled: true, hover: true })).toBe('default');
    expect(getAcrylicLevel({ readonly: true, focusVisible: true })).toBe('default');
  });

  it('returns 2Level on hover or focus for an active field', () => {
    expect(getAcrylicLevel({ hover: true })).toBe('2Level');
    expect(getAcrylicLevel({ focusVisible: true })).toBe('2Level');
  });

  it('returns default at rest for colored validation states (tinted background)', () => {
    expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Error })).toBe('default');
    expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Warning })).toBe('default');
    expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Success })).toBe('default');
  });

  it('returns 1Level at rest for a neutral field (default / valid)', () => {
    expect(getAcrylicLevel({})).toBe('1Level');
    expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Default })).toBe('1Level');
    expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Valid })).toBe('1Level');
  });

  it('prefers hover/focus over the colored-validation rest state', () => {
    expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Error, hover: true })).toBe('2Level');
  });
});

describe('FieldSecure / getAcrylicProps', () => {
  it('bundles appearance + level into data-* attributes', () => {
    expect(getAcrylicProps({ validationState: VALIDATION_STATE.Error })).toEqual({
      'data-acrylic-appearance': 'red',
      'data-acrylic-level': 'default',
    });
    expect(getAcrylicProps({ hover: true })).toEqual({
      'data-acrylic-appearance': 'neutral',
      'data-acrylic-level': '2Level',
    });
  });
});
