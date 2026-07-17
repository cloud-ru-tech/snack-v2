import { BASE_LAYERS_CONFIG, GROUP_PATTERNS, STYLES_PATTERN } from '../constants/index.js';

export function isSystemLayer(group: string): boolean {
  return GROUP_PATTERNS.SYSTEM_LAYER.test(group);
}

export function isStylesGroup(group: string): boolean {
  return STYLES_PATTERN.test(group);
}

export function isComponentGroup(group: string): boolean {
  return !isSystemLayer(group) && !isStylesGroup(group);
}

export function extractLayerNumber(group: string): number | null {
  const match = group.match(GROUP_PATTERNS.LAYER_NUMBER);
  return match?.[1] ? Number.parseInt(match[1], 10) : null;
}

export function compareSystemLayers(groupA: string, groupB: string): number {
  const numA = extractLayerNumber(groupA);
  const numB = extractLayerNumber(groupB);

  if (numA === null && numB === null) {
    return 0;
  }

  if (numA === null) {
    return 1;
  }
  if (numB === null) {
    return -1;
  }

  return numA - numB;
}

export function getDirectoryName(group: string): string {
  return group.replace(GROUP_PATTERNS.LAYER_NUMBER, '').toLowerCase();
}

export function isBaseLayer(group: string, allSystemLayers: string[]): boolean {
  const baseLayerGroups = allSystemLayers.slice(BASE_LAYERS_CONFIG.START_INDEX, BASE_LAYERS_CONFIG.END_INDEX);
  return baseLayerGroups.includes(group);
}

export function getBaseLayers(systemLayers: string[]): string[] {
  return systemLayers.slice(BASE_LAYERS_CONFIG.START_INDEX, BASE_LAYERS_CONFIG.END_INDEX);
}

export function getNonBaseLayers(systemLayers: string[]): string[] {
  return systemLayers.slice(BASE_LAYERS_CONFIG.END_INDEX);
}

export function shouldExcludeFromValidation(
  group: string,
  excludeSystemLayers: boolean = true,
  excludeStylesLayer: boolean = true,
): boolean {
  if (excludeSystemLayers && isSystemLayer(group)) {
    return true;
  }

  if (excludeStylesLayer && isStylesGroup(group)) {
    return true;
  }

  return false;
}
