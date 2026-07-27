import { describe, expect, it } from 'vitest';

import { VALIDATION_STATE } from '@ds/field-decorator';
import {
  copyTextToClipboard,
  getAcrylicAppearance,
  getAcrylicLevel,
  getAcrylicProps,
  isCursorAtEnd,
  isCursorAtStart,
} from '../src/components/shared/utils';

// Курсор-хелперы читают только selectionStart / selectionEnd / value.
function inputStub(value: string, selectionStart: number | null, selectionEnd: number | null): HTMLInputElement {
  return { value, selectionStart, selectionEnd } as HTMLInputElement;
}

describe('FieldText shared utils — cursor helpers', () => {
  describe('isCursorAtStart', () => {
    it('returns false for null element', () => {
      expect(isCursorAtStart(null)).toBe(false);
    });

    it('returns true when both selection bounds sit at index 0', () => {
      expect(isCursorAtStart(inputStub('hello', 0, 0))).toBe(true);
    });

    it('returns false when there is a selection or the caret is not at 0', () => {
      expect(isCursorAtStart(inputStub('hello', 0, 3))).toBe(false);
      expect(isCursorAtStart(inputStub('hello', 2, 2))).toBe(false);
    });
  });

  describe('isCursorAtEnd', () => {
    it('returns false for null element', () => {
      expect(isCursorAtEnd(null)).toBe(false);
    });

    it('returns true when both selection bounds sit at value length', () => {
      expect(isCursorAtEnd(inputStub('hello', 5, 5))).toBe(true);
    });

    it('returns true at length 0 for an empty value', () => {
      expect(isCursorAtEnd(inputStub('', 0, 0))).toBe(true);
    });

    it('returns false when the caret is not at the end', () => {
      expect(isCursorAtEnd(inputStub('hello', 4, 4))).toBe(false);
      expect(isCursorAtEnd(inputStub('hello', 2, 5))).toBe(false);
    });
  });
});

describe('FieldText shared utils — acrylic resolver', () => {
  describe('getAcrylicAppearance', () => {
    it('tints by validation state in the active field', () => {
      expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Error })).toBe('red');
      expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Warning })).toBe('yellow');
      expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Success })).toBe('green');
    });

    it('stays neutral for default / valid (valid is not green)', () => {
      expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Default })).toBe('neutral');
      expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Valid })).toBe('neutral');
      expect(getAcrylicAppearance({})).toBe('neutral');
    });

    it('drops tint on disabled / readonly regardless of validation', () => {
      expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Error, disabled: true })).toBe('neutral');
      expect(getAcrylicAppearance({ validationState: VALIDATION_STATE.Error, readonly: true })).toBe('neutral');
    });
  });

  describe('getAcrylicLevel', () => {
    it('is default for disabled / readonly', () => {
      expect(getAcrylicLevel({ disabled: true })).toBe('default');
      expect(getAcrylicLevel({ readonly: true })).toBe('default');
    });

    it('is 2Level on hover or focus', () => {
      expect(getAcrylicLevel({ hover: true })).toBe('2Level');
      expect(getAcrylicLevel({ focusVisible: true })).toBe('2Level');
    });

    it('is default at rest for colored validation states', () => {
      expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Error })).toBe('default');
      expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Warning })).toBe('default');
      expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Success })).toBe('default');
    });

    it('is 1Level at rest for neutral (default / valid) field', () => {
      expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Default })).toBe('1Level');
      expect(getAcrylicLevel({ validationState: VALIDATION_STATE.Valid })).toBe('1Level');
      expect(getAcrylicLevel({})).toBe('1Level');
    });

    it('prioritizes disabled/readonly over hover/focus', () => {
      expect(getAcrylicLevel({ disabled: true, hover: true, focusVisible: true })).toBe('default');
    });
  });

  describe('getAcrylicProps', () => {
    it('packs appearance and level into data-* attributes', () => {
      expect(getAcrylicProps({ validationState: VALIDATION_STATE.Error, hover: true })).toEqual({
        'data-acrylic-appearance': 'red',
        'data-acrylic-level': '2Level',
      });
      expect(getAcrylicProps({ validationState: VALIDATION_STATE.Valid })).toEqual({
        'data-acrylic-appearance': 'neutral',
        'data-acrylic-level': '1Level',
      });
    });
  });
});

describe('FieldText shared utils — copyTextToClipboard', () => {
  it('returns false for an empty string (nothing to copy)', () => {
    expect(copyTextToClipboard('')).toBe(false);
  });

  it('returns false outside the browser environment (no window)', () => {
    expect(copyTextToClipboard('payload')).toBe(false);
  });
});
