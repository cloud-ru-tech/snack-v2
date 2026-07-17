import { describe, expect, it } from 'vitest';

import { defaultBaseConfig, defaultBrowserConfig, defaultNodeConfig } from '../../src/config/defaultConfig.js';
import { normalizeBrowserConfig, normalizeNodeConfig } from '../../src/config/normalizeConfig.js';

describe('config', () => {
  describe('defaultConfig', () => {
    it('should export default base config with expected values', () => {
      expect(defaultBaseConfig.formats).toEqual(['css', 'scss', 'ts']);
      expect(defaultBaseConfig.cssClassPrefix).toBe('sn');
      expect(defaultBaseConfig.includeFallbackValues).toBe(true);
    });

    it('should export default node config with input and output paths', () => {
      expect(defaultNodeConfig.input).toBe('./tokens');
      expect(defaultNodeConfig.output).toBe('./build');
      expect(defaultNodeConfig.watch).toBe(false);
    });

    it('should export default browser config with empty tokens', () => {
      expect(defaultBrowserConfig.tokens).toEqual({});
    });
  });

  describe('normalizeNodeConfig', () => {
    it('should use default values when no config provided', () => {
      const config = normalizeNodeConfig();
      expect(config.input).toBe('./tokens');
      expect(config.output).toBe('./build');
      expect(config.formats).toEqual(['css', 'scss', 'ts']);
      expect(config.cssModules).toBe(false);
      expect(config.scssModules).toBe(true);
    });

    it('should merge provided config with defaults', () => {
      const config = normalizeNodeConfig({
        input: './custom-tokens',
        formats: ['css'],
      });
      expect(config.input).toBe('./custom-tokens');
      expect(config.output).toBe('./build');
      expect(config.formats).toEqual(['css']);
    });
  });

  describe('normalizeBrowserConfig', () => {
    it('should use default values when no config provided', () => {
      const config = normalizeBrowserConfig();
      expect(config.tokens).toEqual({});
      expect(config.formats).toEqual(['css', 'scss', 'ts']);
    });

    it('should merge provided config with defaults', () => {
      const config = normalizeBrowserConfig({
        tokens: { '01_primitive/primitive': {} },
        formats: ['css'],
      });
      expect(config.tokens).toEqual({ '01_primitive/primitive': {} });
      expect(config.formats).toEqual(['css']);
    });
  });
});
