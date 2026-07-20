import { describe, expect, it } from 'vitest';

import { buildScssComponentStructure, ScssMap } from '../../formats/SCSSComponentFormat/buildScssComponentStructure.js';

function tokenWithPath(
  path: string[],
  value = '{sn.adaptive.size.s}',
): {
  path: string[];
  original?: { $value?: unknown };
} {
  return {
    path,
    original: { $value: value },
  };
}

/**
 * Токены в духе button.json: anatomy.size.l.container с вложенными
 * container.textWrapper (paddingHorizontal, gap) и container.iconOnly (minWidth).
 */
function createButtonLikeTokens(componentName: string): Array<{ path: string[]; original?: { $value?: unknown } }> {
  const prefix = ['sn', componentName];
  return [
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'minHeight']),
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'borderRadius']),
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'paddingHorizontal']),
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'minWidth']),
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'borderWidth']),
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'textWrapper', 'paddingHorizontal']),
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'textWrapper', 'gap']),
    tokenWithPath([...prefix, 'anatomy', 'size', 'l', 'container', 'iconOnly', 'minWidth']),
  ];
}

function getNested(map: ScssMap, keys: string[]): ScssMap | unknown {
  let current: unknown = map;
  for (const key of keys) {
    if (current == null || typeof current !== 'object' || Array.isArray(current)) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current as ScssMap;
}

describe('buildScssComponentStructure', () => {
  describe('preservation of source token structure', () => {
    it('keeps container.textWrapper and container.iconOnly nested inside container (no container-* siblings)', () => {
      const tokens = createButtonLikeTokens('button');
      const { mainMap } = buildScssComponentStructure(tokens, 'button');

      const container = getNested(mainMap, ['anatomy', 'size', 'l', 'container']) as ScssMap | undefined;
      expect(container).toBeDefined();
      expect(typeof container).toBe('object');

      // В исходных токенах textWrapper и iconOnly вложены в container — так же и в карте
      expect(container).toHaveProperty('textWrapper');
      expect(container).toHaveProperty('iconOnly');
      expect(typeof (container as Record<string, unknown>).textWrapper).toBe('object');
      expect(typeof (container as Record<string, unknown>).iconOnly).toBe('object');

      // Не должно быть «вытянутых» ключей container-textWrapper / container-iconOnly на том же уровне, что и container
      const sizeL = getNested(mainMap, ['anatomy', 'size', 'l']) as Record<string, unknown> | undefined;
      expect(sizeL).not.toHaveProperty('container-textWrapper');
      expect(sizeL).not.toHaveProperty('container-iconOnly');

      // Вложенное содержимое: textWrapper с padding/gap, iconOnly с min-width
      const textWrapper = (container as Record<string, unknown>).textWrapper as Record<string, unknown>;
      const iconOnly = (container as Record<string, unknown>).iconOnly as Record<string, unknown>;
      expect(textWrapper).toHaveProperty('gap');
      expect(iconOnly).toHaveProperty('min-width');
    });

    it('structure mirrors source paths: anatomy -> size -> l -> container -> textWrapper | iconOnly', () => {
      const tokens = createButtonLikeTokens('button');
      const { mainMap } = buildScssComponentStructure(tokens, 'button');

      expect(mainMap).toHaveProperty('anatomy');
      const anatomy = mainMap.anatomy as ScssMap;
      expect(anatomy).toHaveProperty('size');
      const size = anatomy.size as ScssMap;
      expect(size).toHaveProperty('l');
      const l = size.l as ScssMap;
      expect(l).toHaveProperty('container');
      const container = l.container as ScssMap;
      expect(container).toHaveProperty('textWrapper');
      expect(container).toHaveProperty('iconOnly');

      expect(Object.keys(container)).toContain('textWrapper');
      expect(Object.keys(container)).toContain('iconOnly');
    });
  });
});
