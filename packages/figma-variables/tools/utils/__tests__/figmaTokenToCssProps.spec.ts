import { describe, expect, it } from 'vitest';

import { figmaTokenToCssProps } from '../figmaTokenToCssProps.js';

describe('figmaTokenToCssProps', () => {
  describe('Corner Radius (from docs.md)', () => {
    it('should map cornerRadius to border-radius', () => {
      expect(figmaTokenToCssProps('corner-radius')).toEqual(['border-radius']);
    });

    it('should map cornerRadiusLeft to border-top-left-radius and border-bottom-left-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-left')).toEqual([
        'border-top-left-radius',
        'border-bottom-left-radius',
      ]);
    });

    it('should map cornerRadiusRight to border-top-right-radius and border-bottom-right-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-right')).toEqual([
        'border-top-right-radius',
        'border-bottom-right-radius',
      ]);
    });

    it('should map cornerRadiusTop to border-top-left-radius and border-top-right-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-top')).toEqual(['border-top-left-radius', 'border-top-right-radius']);
    });

    it('should map cornerRadiusBottom to border-bottom-left-radius and border-bottom-right-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-bottom')).toEqual([
        'border-bottom-left-radius',
        'border-bottom-right-radius',
      ]);
    });

    it('should map cornerRadiusTopLeft to border-top-left-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-top-left')).toEqual(['border-top-left-radius']);
    });

    it('should map cornerRadiusTopRight to border-top-right-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-top-right')).toEqual(['border-top-right-radius']);
    });

    it('should map cornerRadiusBottomLeft to border-bottom-left-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-bottom-left')).toEqual(['border-bottom-left-radius']);
    });

    it('should map cornerRadiusBottomRight to border-bottom-right-radius', () => {
      expect(figmaTokenToCssProps('corner-radius-bottom-right')).toEqual(['border-bottom-right-radius']);
    });
  });

  describe('Stroke Weight / Border Width (from docs.md)', () => {
    it('should map strokeWeight to border-width', () => {
      expect(figmaTokenToCssProps('stroke-weight')).toEqual(['border-width']);
    });

    it('should map strokeWeigth (typo) to border-width', () => {
      expect(figmaTokenToCssProps('stroke-weigth')).toEqual(['border-width']);
    });

    it('should map strokeWeightHorizontal to border-left-width and border-right-width', () => {
      expect(figmaTokenToCssProps('stroke-weight-horizontal')).toEqual(['border-left-width', 'border-right-width']);
    });

    it('should map strokeWeightVertical to border-top-width and border-bottom-width', () => {
      expect(figmaTokenToCssProps('stroke-weight-vertical')).toEqual(['border-top-width', 'border-bottom-width']);
    });

    it('should map strokeWeightTop to border-top-width', () => {
      expect(figmaTokenToCssProps('stroke-weight-top')).toEqual(['border-top-width']);
    });

    it('should map strokeWeightRight to border-right-width', () => {
      expect(figmaTokenToCssProps('stroke-weight-right')).toEqual(['border-right-width']);
    });

    it('should map strokeWeightBottom to border-bottom-width', () => {
      expect(figmaTokenToCssProps('stroke-weight-bottom')).toEqual(['border-bottom-width']);
    });

    it('should map strokeWeightLeft to border-left-width', () => {
      expect(figmaTokenToCssProps('stroke-weight-left')).toEqual(['border-left-width']);
    });

    // Typo variants
    it('should map strokeWeigthTop (typo) to border-top-width', () => {
      expect(figmaTokenToCssProps('stroke-weigth-top')).toEqual(['border-top-width']);
    });
  });

  describe('Padding (from docs.md)', () => {
    it('should map padding to padding', () => {
      expect(figmaTokenToCssProps('padding')).toEqual(['padding']);
    });

    it('should map paddingLeft to padding-left', () => {
      expect(figmaTokenToCssProps('padding-left')).toEqual(['padding-left']);
    });

    it('should map paddingRight to padding-right', () => {
      expect(figmaTokenToCssProps('padding-right')).toEqual(['padding-right']);
    });

    it('should map paddingTop to padding-top', () => {
      expect(figmaTokenToCssProps('padding-top')).toEqual(['padding-top']);
    });

    it('should map paddingBottom to padding-bottom', () => {
      expect(figmaTokenToCssProps('padding-bottom')).toEqual(['padding-bottom']);
    });

    it('should map paddingHorizontal to padding-left and padding-right', () => {
      expect(figmaTokenToCssProps('padding-horizontal')).toEqual(['padding-left', 'padding-right']);
    });

    it('should map paddingVertical to padding-top and padding-bottom', () => {
      expect(figmaTokenToCssProps('padding-vertical')).toEqual(['padding-top', 'padding-bottom']);
    });
  });

  describe('Size (from docs.md)', () => {
    it('should map square to width and height', () => {
      expect(figmaTokenToCssProps('square')).toEqual(['width', 'height']);
    });

    it('should map width to width', () => {
      expect(figmaTokenToCssProps('width')).toEqual(['width']);
    });

    it('should map height to height', () => {
      expect(figmaTokenToCssProps('height')).toEqual(['height']);
    });

    it('should map minWidth to min-width', () => {
      expect(figmaTokenToCssProps('min-width')).toEqual(['min-width']);
    });

    it('should map maxWidth to max-width', () => {
      expect(figmaTokenToCssProps('max-width')).toEqual(['max-width']);
    });

    it('should map minHeight to min-height', () => {
      expect(figmaTokenToCssProps('min-height')).toEqual(['min-height']);
    });

    it('should map maxHeight to max-height', () => {
      expect(figmaTokenToCssProps('max-height')).toEqual(['max-height']);
    });
  });

  describe('Gap (from docs.md)', () => {
    it('should map gap to gap', () => {
      expect(figmaTokenToCssProps('gap')).toEqual(['gap']);
    });
  });

  describe('Compound properties with prefixes', () => {
    it('should map container-corner-radius to border-radius', () => {
      expect(figmaTokenToCssProps('container-corner-radius')).toEqual(['border-radius']);
    });

    it('should map container-stroke-weight to border-width', () => {
      expect(figmaTokenToCssProps('container-stroke-weight')).toEqual(['border-width']);
    });

    it('should map wrapper-padding-horizontal to padding-left and padding-right', () => {
      expect(figmaTokenToCssProps('wrapper-padding-horizontal')).toEqual(['padding-left', 'padding-right']);
    });

    it('should map button-min-width to min-width', () => {
      expect(figmaTokenToCssProps('button-min-width')).toEqual(['min-width']);
    });
  });

  describe('Edge cases', () => {
    it('should return key as-is for unknown properties', () => {
      expect(figmaTokenToCssProps('unknown-property')).toEqual(['unknown-property']);
    });

    it('should handle font-size correctly', () => {
      expect(figmaTokenToCssProps('font-size')).toEqual(['font-size']);
    });
  });
});
