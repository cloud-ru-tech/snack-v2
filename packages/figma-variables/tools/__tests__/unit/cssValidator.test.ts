import { describe, expect, it } from 'vitest';

import { validateCSS, validateCSSVariables } from '../../validators/cssValidator.js';

describe('cssValidator', () => {
  describe('validateCSS', () => {
    it('should not report errors for valid CSS structure', async () => {
      const css = `
        .foo {
          --color-primary: #000;
          color: var(--color-primary);
        }
      `;

      const result = await validateCSS(css, 'strict');
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
    });

    it('should ignore validation when mode is off', async () => {
      const css = `
        .foo {
          color: var(--undefined-color);
        }
      `;

      const result = await validateCSS(css, 'off');
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
    });
  });

  describe('validateCSSVariables', () => {
    it('should not report errors when variables are defined before use', () => {
      const css = `
        :root {
          --color-primary: #000;
        }
        .foo {
          color: var(--color-primary);
        }
      `;

      const result = validateCSSVariables(css, 'strict');
      expect(result.errors).toEqual([]);
    });

    it('should detect undefined CSS variables in strict mode', () => {
      const css = `
        .foo {
          color: var(--undefined-color);
        }
      `;

      const result = validateCSSVariables(css, 'strict');
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('Undefined CSS variable "--undefined-color"');
      expect(result.warnings).toEqual([]);
    });

    it('should detect usage before definition even if variable is defined later', () => {
      const css = `
        .foo {
          color: var(--color-late);
        }

        :root {
          --color-late: #000;
        }
      `;

      const result = validateCSSVariables(css, 'strict');
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('Undefined CSS variable "--color-late"');
    });

    it('should emit warnings instead of errors in warning mode', () => {
      const css = `
        .foo {
          color: var(--undefined-color);
        }
      `;

      const result = validateCSSVariables(css, 'warning');
      expect(result.errors).toEqual([]);
      expect(result.warnings).toHaveLength(1);
    });

    it('should ignore validation when mode is off', () => {
      const css = `
        .foo {
          color: var(--undefined-color);
        }
      `;

      const result = validateCSSVariables(css, 'off');
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
    });
  });
});
