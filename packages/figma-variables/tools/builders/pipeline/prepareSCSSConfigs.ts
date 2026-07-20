import type { ThemeObject } from '@tokens-studio/types';
import type { Config } from 'style-dictionary';

import { getSCSSConfig } from '../../configs/index.js';
import type { BaseConfig, TokenSet } from '../../types.js';
import { getDirectoryName } from '../../utils/groupUtils.js';
import { getComponentsTokenSets, getStyleTokenSets, getTokenSetsByGroup, toFilePaths } from '../../utils/tokenSets.js';

type PreparedTokenData = {
  tokenSets: TokenSet[];
  themes: ThemeObject[];
  systemLayers: TokenSet[];
  fallbackIncludePaths: string[];
};

export async function prepareSCSSConfigs(
  data: PreparedTokenData,
  config: BaseConfig,
  buildPath: string,
  getFilePath: (path: string) => Promise<string | null>,
): Promise<Config[]> {
  const { tokenSets, themes, systemLayers, fallbackIncludePaths } = data;
  const excludeGroups = config.excludeGroups ?? [];
  const systemLayerGroups = systemLayers.map(layer => layer.group);
  const scssBuildPath = `${buildPath}scss/`;
  const configs: Config[] = [];
  const layersToProcess = systemLayerGroups;
  const systemLayersToProcess = systemLayers.filter(layer => layersToProcess.includes(layer.group));

  for (const layer of systemLayersToProcess) {
    const layerTokenSets = getTokenSetsByGroup(tokenSets, layer.group);

    if (layerTokenSets.length === 0) {
      continue;
    }

    const directoryName = getDirectoryName(layer.group);

    for (const tokenSet of layerTokenSets) {
      const layerConfig = await getSCSSConfig({
        tokenSets: [tokenSet],
        fileName: tokenSet.name,
        directory: directoryName,
        includeFunctions: false,
        themes,
        fallbackIncludePaths,
        buildPath: scssBuildPath,
        scssModules: config.scssModules,
        getFilePath,
        excludeGroups,
        filterByGroup: layer.group,
        includeFallbackValues: config.includeFallbackValues ?? true,
      });
      if (layerConfig) {
        configs.push(layerConfig);
      }
    }
  }

  const styleTokenSets = getStyleTokenSets(tokenSets);
  for (const styleTokenSet of styleTokenSets) {
    const styleConfig = await getSCSSConfig({
      tokenSets: [styleTokenSet],
      fileName: styleTokenSet.name,
      directory: 'styles',
      includeFunctions: false,
      themes,
      fallbackIncludePaths,
      buildPath: scssBuildPath,
      scssModules: config.scssModules,
      getFilePath,
      skipThemeIncludes: false, // Include themes to resolve box-shadow references
      filterByGroup: styleTokenSet.group,
      excludeGroups,
      includeFallbackValues: config.includeFallbackValues ?? true,
    });
    if (styleConfig) {
      configs.push(styleConfig);
    }
  }

  const combinedStylesConfig = await getSCSSConfig({
    tokenSets: styleTokenSets,
    fileName: 'styles',
    directory: 'styles',
    includeFunctions: true,
    themes,
    fallbackIncludePaths,
    buildPath: scssBuildPath,
    scssModules: config.scssModules,
    getFilePath,
    excludeGroups,
    includeFallbackValues: config.includeFallbackValues ?? true,
  });
  if (combinedStylesConfig) {
    configs.push(combinedStylesConfig);
  }

  const componentTokenSets = getComponentsTokenSets(tokenSets);
  const componentNames = componentTokenSets.map(ts => ts.name);
  for (const componentTokenSet of componentTokenSets) {
    // Include other components in the resolution paths so that style-dictionary can
    // resolve cross-component references (e.g. attachment → iconPredefined). Without
    // this, `token.$value` would remain the literal reference string.
    const otherComponentPaths = toFilePaths(componentTokenSets.filter(ts => ts !== componentTokenSet));
    const componentConfig = await getSCSSConfig({
      tokenSets: [componentTokenSet],
      fileName: componentTokenSet.name,
      directory: 'components',
      includeFunctions: false,
      isComponent: true,
      themes,
      fallbackIncludePaths: [...fallbackIncludePaths, ...otherComponentPaths],
      buildPath: scssBuildPath,
      scssModules: config.scssModules,
      getFilePath,
      excludeGroups,
      includeFallbackValues: config.includeFallbackValues ?? true,
      componentNames,
    });
    if (componentConfig) {
      configs.push(componentConfig);
    }
  }

  return configs;
}
