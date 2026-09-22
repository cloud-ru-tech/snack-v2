import type { TokenAdapter } from '../../adapters/types.js';
import type { BaseConfig } from '../../types.js';
import { buildFallbackIncludePaths, getSystemLayers, sortSystemLayers } from '../../utils/tokenSets.js';

export async function prepareTokenData(adapter: TokenAdapter, config: BaseConfig) {
  let tokenSets = await adapter.readTokens();

  const excludeGroups = config.excludeGroups ?? [];
  if (excludeGroups.length > 0) {
    tokenSets = tokenSets.filter(tokenSet => !excludeGroups.includes(tokenSet.group));
  }

  const excludeTokenSets = config.excludeTokenSets ?? [];
  if (excludeTokenSets.length > 0) {
    tokenSets = tokenSets.filter(tokenSet => !excludeTokenSets.includes(tokenSet.path));
  }

  const themes = await adapter.readThemes();
  const systemLayers = sortSystemLayers(getSystemLayers(tokenSets));
  const fallbackIncludePaths = buildFallbackIncludePaths(tokenSets);

  return {
    tokenSets,
    themes: themes ?? [],
    systemLayers,
    fallbackIncludePaths,
  };
}
