import { describe, expect, it } from 'vitest';

import { BrowserAdapter } from '../../src/adapters/browserAdapter.js';
import { normalizeBrowserConfig } from '../../src/config/normalizeConfig.js';
import { buildTokens } from '../../src/core.js';

describe('builders integration', () => {
  it('should generate CSS files from tokens', async () => {
    const tokens = {
      '01_primitive/primitive': {
        sn: {
          primitive: {
            color: {
              gray: {
                '45': { $type: 'color', $value: '#5e606e' },
              },
            },
            dimension: {
              '8': { $type: 'number', $value: 8 },
            },
          },
        },
      },
    };

    const adapter = new BrowserAdapter(tokens);
    const config = normalizeBrowserConfig({
      tokens,
      formats: ['css'],
    });

    const results: { css: Record<string, string>; scss: Record<string, string>; ts: Record<string, string> } = {
      css: {},
      scss: {},
      ts: {},
    };

    const collectResults = (type: 'css' | 'scss' | 'ts', path: string, content: string) => {
      results[type][path] = content;
    };

    const getFilePath = async (path: string) => {
      const tokenPath = path.replace(/\.json$/, '');
      return tokens[tokenPath as keyof typeof tokens] ? path : null;
    };

    await expect(buildTokens(adapter, config, '/tmp/', getFilePath, collectResults)).resolves.not.toThrow();
  });

  it('should complete build when tokens include opacity (Figma 0-100) without errors', async () => {
    const tokens = {
      '01_primitive/primitive': {
        sn: {
          primitive: {
            dimension: { '8': { $type: 'number', $value: 8 } },
          },
        },
      },
      '06_acrylic/no': {
        sn: {
          acrylic: {
            opacityBackground: { $type: 'number', $value: 100 },
            opacityBackground1Level: { $type: 'number', $value: 80 },
          },
        },
      },
    };

    const adapter = new BrowserAdapter(tokens);
    const config = normalizeBrowserConfig({ tokens, formats: ['css'] });
    const getFilePath = async (path: string) =>
      tokens[path.replace(/\.json$/, '') as keyof typeof tokens] ? path : null;

    await expect(buildTokens(adapter, config, '/tmp/', getFilePath)).resolves.not.toThrow();
  });
});
