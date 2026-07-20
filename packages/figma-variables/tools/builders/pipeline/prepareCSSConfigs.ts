import type { ThemeObject } from '@tokens-studio/types';
import type { Config } from 'style-dictionary';

import { getCSSBaseStylesConfig, getCSSComponentConfig, getCSSFigmaStylesConfig } from '../../configs/index.js';
import type { BaseConfig, TokenSet } from '../../types.js';
import { getBaseLayers, getDirectoryName, getNonBaseLayers } from '../../utils/groupUtils.js';
import {
  dedupeTokenSets,
  getComponentsTokenSets,
  getStyleTokenSets,
  getTokenSetsByGroup,
} from '../../utils/tokenSets.js';

type PreparedTokenData = {
  tokenSets: TokenSet[];
  themes: ThemeObject[];
  systemLayers: TokenSet[];
  fallbackIncludePaths: string[];
};

export async function prepareCSSConfigs(
  data: PreparedTokenData,
  config: BaseConfig,
  buildPath: string,
  getFilePath: (path: string) => Promise<string | null>,
): Promise<Config[]> {
  const { tokenSets, themes, systemLayers, fallbackIncludePaths } = data;
  const excludeGroups = config.excludeGroups ?? [];
  const systemLayerGroups = systemLayers.map(layer => layer.group);
  const baseLayerGroups = getBaseLayers(systemLayerGroups);
  const hasBaseGroup = baseLayerGroups.length > 0;
  const cssBuildPath = `${buildPath}css/`;
  const configs: Config[] = [];

  if (hasBaseGroup) {
    const baseLayerTokenSets = baseLayerGroups.flatMap(group => getTokenSetsByGroup(tokenSets, group));
    const baseConfig = getCSSBaseStylesConfig(
      baseLayerTokenSets,
      cssBuildPath,
      config.cssClassPrefix,
      config.cssModules,
      fallbackIncludePaths,
      excludeGroups,
      baseLayerGroups,
      config.includeFallbackValues ?? true,
    );
    if (baseConfig) {
      configs.push(baseConfig);
    }
  }

  const layersToProcess = hasBaseGroup ? getNonBaseLayers(systemLayerGroups) : systemLayerGroups;
  const systemLayersToProcess = systemLayers.filter(layer => layersToProcess.includes(layer.group));

  for (const layer of systemLayersToProcess) {
    const layerTokenSets = getTokenSetsByGroup(tokenSets, layer.group);

    if (layerTokenSets.length === 0) {
      continue;
    }

    const directoryName = getDirectoryName(layer.group);

    for (const tokenSet of layerTokenSets) {
      const layerConfig = await getCSSFigmaStylesConfig({
        tokenSets: [tokenSet],
        className: tokenSet.name,
        fileName: tokenSet.name,
        directory: directoryName,
        themes,
        fallbackIncludePaths,
        buildPath: cssBuildPath,
        cssClassPrefix: config.cssClassPrefix,
        cssModules: config.cssModules,
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
  const combinedStylesTokenSets = dedupeTokenSets(styleTokenSets);

  if (combinedStylesTokenSets.length > 0) {
    const figmaStylesConfig = await getCSSFigmaStylesConfig({
      tokenSets: combinedStylesTokenSets,
      className: 'figmaStyles',
      fileName: 'styles',
      directory: 'styles',
      themes,
      fallbackIncludePaths,
      buildPath: cssBuildPath,
      cssClassPrefix: config.cssClassPrefix,
      cssModules: config.cssModules,
      getFilePath,
      excludeGroups,
      filterByGroup: combinedStylesTokenSets[0]?.group,
      includeFallbackValues: config.includeFallbackValues ?? true,
    });
    if (figmaStylesConfig) {
      configs.push(figmaStylesConfig);
    }
  }

  const componentTokenSets = getComponentsTokenSets(tokenSets);
  for (const componentTokenSet of componentTokenSets) {
    const componentConfig = await getCSSComponentConfig({
      tokenSets: [componentTokenSet],
      componentName: componentTokenSet.name,
      fileName: componentTokenSet.name,
      themes,
      fallbackIncludePaths,
      buildPath: cssBuildPath,
      cssClassPrefix: config.cssClassPrefix,
      cssModules: config.cssModules,
      getFilePath,
      excludeGroups,
      includeFallbackValues: config.includeFallbackValues ?? true,
    });
    if (componentConfig) {
      configs.push(componentConfig);
    }
  }

  return configs;
}
