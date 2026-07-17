import { FILE_EXTENSIONS } from '../constants/index.js';
import type { AnyRecord, TokenSet } from '../types.js';
import { compareSystemLayers, isComponentGroup, isStylesGroup, isSystemLayer } from './groupUtils.js';
import { joinPath, normalizeTokenPath, splitTokenPath } from './pathUtils.js';

/**
 * Преобразует путь токена в объект TokenSet
 *
 * @param tokenSetPath - Путь к набору токенов
 * @param basePath - Базовый путь для формирования абсолютного пути к файлу
 * @returns Объект TokenSet или null, если путь некорректен
 *
 * @example
 * toTokenSet('01_base/colors', '/tokens')
 * // { group: '01_base', name: 'colors', path: '01_base/colors', filePath: '/tokens/01_base/colors.json' }
 */
export function toTokenSet(tokenSetPath: string, basePath?: string): TokenSet | null {
  const normalized = normalizeTokenPath(tokenSetPath);
  const parts = splitTokenPath(normalized);

  if (parts.length < 2) {
    return null;
  }

  const group = parts[0];
  if (!group) {
    return null;
  }

  const name = parts.slice(1).join('/');
  const path = `${group}/${name}`;
  const filePath = basePath ? joinPath([basePath, path], FILE_EXTENSIONS.JSON) : undefined;

  return {
    group,
    name,
    path,
    filePath,
  };
}

function uniqueByPath(tokenSets: TokenSet[]): TokenSet[] {
  const seen = new Set<string>();

  return tokenSets.filter(tokenSet => {
    if (seen.has(tokenSet.path)) {
      return false;
    }

    seen.add(tokenSet.path);
    return true;
  });
}

export function discoverTokenSetsFromObject(tokens: Record<string, AnyRecord>): TokenSet[] {
  const tokenSets: TokenSet[] = [];

  for (const [path, content] of Object.entries(tokens)) {
    const tokenSet = toTokenSet(path);
    if (tokenSet) {
      tokenSet.content = content;
      tokenSets.push(tokenSet);
    }
  }

  return tokenSets;
}

export function getTokenSetsByGroup(tokenSets: TokenSet[], group: string): TokenSet[] {
  return tokenSets.filter(tokenSet => tokenSet.group === group);
}

export function getComponentsTokenSets(tokenSets: TokenSet[]): TokenSet[] {
  return tokenSets.filter(tokenSet => isComponentGroup(tokenSet.group));
}

export function getStyleTokenSets(tokenSets: TokenSet[]): TokenSet[] {
  return tokenSets.filter(tokenSet => isStylesGroup(tokenSet.group));
}

export function getFirstTokenSetByGroup(tokenSets: TokenSet[], group: string): TokenSet[] {
  const found = getTokenSetsByGroup(tokenSets, group);
  return found.length && found[0] ? [found[0]] : [];
}

export function dedupeTokenSets(tokenSets: TokenSet[]): TokenSet[] {
  return uniqueByPath(tokenSets);
}

export function toFilePaths(tokenSets: TokenSet[]): string[] {
  return Array.from(new Set(tokenSets.map(tokenSet => tokenSet.filePath).filter(Boolean) as string[]));
}

export function getSystemLayers(tokenSets: TokenSet[]): TokenSet[] {
  return tokenSets.filter(tokenSet => isSystemLayer(tokenSet.group));
}

export function sortSystemLayers(tokenSets: TokenSet[]): TokenSet[] {
  return [...tokenSets].sort((a, b) => compareSystemLayers(a.group, b.group));
}

export function buildFallbackIncludePaths(tokenSets: TokenSet[]): string[] {
  const systemLayers = sortSystemLayers(getSystemLayers(tokenSets));
  const fallback: TokenSet[] = [];

  // Добавляем первые два слоя полностью
  const [firstLayer, secondLayer] = systemLayers;

  if (firstLayer) {
    fallback.push(...getTokenSetsByGroup(tokenSets, firstLayer.group));
  }
  if (secondLayer) {
    fallback.push(...getTokenSetsByGroup(tokenSets, secondLayer.group));
  }

  // Добавляем первые токены из оставшихся системных слоев
  const remainingLayers = systemLayers.slice(2);
  for (const layer of remainingLayers) {
    fallback.push(...getFirstTokenSetByGroup(tokenSets, layer.group));
  }

  // Добавляем токены из тем (группа начинается с цифры и содержит "theme")
  // Это нужно для резолва ссылок, например, box-shadow в 99_styles ссылается на токены из 04_theme
  const themeTokenSets = tokenSets.filter(tokenSet => /^\d+.*theme/i.test(tokenSet.group));
  fallback.push(...themeTokenSets);

  return toFilePaths(dedupeTokenSets(fallback));
}
