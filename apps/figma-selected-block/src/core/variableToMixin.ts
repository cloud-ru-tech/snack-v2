/**
 * Maps figma-variables CSS var names to SCSS mixin calls (base.composite-var).
 * Component list and segment names from generated tokenMaps (@ds/figma-variables).
 */

import { ANATOMY_SEGMENT_NAMES_BY_COMPONENT, COMPONENT_MAP, CSS_VAR_TO_SCSS_MODULE } from '../generated/tokenMaps';
import type { MixinSuggestion, SimpleVarSuggestion } from './types';

export type { MixinSuggestion, SimpleVarSuggestion } from './types';

export interface ParsedVariable {
  component: string;
  pathSegments: string[];
  leafKey: string;
}

/** Size-like values in path (segment that becomes $size in mixin). */
export const SIZE_VALUES = ['xs', 's', 'm', 'l', '3xl', '6xl', '10xl'] as const;

export function pathHasSizeValue(pathSegments: string[]): boolean {
  return pathSegments.some(seg => (SIZE_VALUES as readonly string[]).includes(seg.toLowerCase()));
}

export function getSizeValueIndex(pathSegments: string[]): number {
  return pathSegments.findIndex(seg => (SIZE_VALUES as readonly string[]).includes(seg.toLowerCase()));
}

/**
 * Merge path segments that were split by "-" into real map keys (e.g. "container", "actionWrapper" → "container-actionWrapper").
 * Uses ANATOMY_SEGMENT_NAMES_BY_COMPONENT to greedily match from the start.
 */
function mergePathSegmentsWithAnatomy(component: string, pathSegments: string[]): string[] {
  const segmentNames = ANATOMY_SEGMENT_NAMES_BY_COMPONENT[component];
  if (!segmentNames || segmentNames.length === 0) return pathSegments;
  const sizeIdx = pathSegments.findIndex(seg => (SIZE_VALUES as readonly string[]).includes(seg.toLowerCase()));
  if (sizeIdx === -1) return pathSegments;
  const beforeSize = pathSegments.slice(0, sizeIdx + 1);
  const pathAfterSize = pathSegments.slice(sizeIdx + 1).join('-');
  if (!pathAfterSize) return pathSegments;
  const merged: string[] = [];
  let remainder = pathAfterSize;
  while (remainder) {
    const found = segmentNames.find(name => remainder.startsWith(name));
    if (found) {
      merged.push(found);
      remainder = remainder.slice(found.length).replace(/^-/, '');
    } else {
      const next = remainder.indexOf('-');
      if (next === -1) {
        merged.push(remainder);
        break;
      }
      merged.push(remainder.slice(0, next));
      remainder = remainder.slice(next + 1);
    }
  }
  return beforeSize.concat(merged);
}

/**
 * Parse variable name into path segments.
 * Accepts: "sn-button-anatomy-size-s-container-min-height" or "sn/button/anatomy/size/s/container/minHeight"
 */
export function parseVariableName(varName: string | null | undefined): ParsedVariable | null {
  if (!varName || typeof varName !== 'string') return null;
  let s = varName.trim();
  if (s.startsWith('--')) s = s.slice(2);
  if (!s.startsWith('sn')) return null;

  const parts = s.includes('/') ? s.split('/').filter(Boolean) : s.split('-').filter(Boolean);
  if (parts.length < 3) return null;
  if (parts[0].toLowerCase() !== 'sn') return null;

  const component = parts[1];
  const rest = parts.slice(2);
  if (rest.length < 2) return null;

  const leafKey = rest[rest.length - 1];
  const pathToBlock = rest.slice(0, -1);
  return { component, pathSegments: pathToBlock, leafKey };
}

function blockKey(component: string, pathSegments: string[]): string {
  return component + ':' + pathSegments.join(':');
}

/**
 * Build mixin string: @include base.composite-var(module.$map, 'anatomy', 'size', $size, 'container-actionWrapper');
 */
export function pathToMixinString(component: string, pathSegments: string[]): string | null {
  const meta = COMPONENT_MAP[component];
  if (!meta) return null;
  const ref = meta.moduleAlias + '.' + meta.mapVariable;
  const args = pathSegments.map(seg => {
    const lower = seg.toLowerCase();
    if ((SIZE_VALUES as readonly string[]).includes(lower)) return '$size';
    return "'" + String(seg).replace(/'/g, "\\'") + "'";
  });
  const sizeHint = pathSegments.find(seg => (SIZE_VALUES as readonly string[]).includes(seg.toLowerCase()));
  let line = '@include base.composite-var(' + ref + ', ' + args.join(', ') + ');';
  if (sizeHint) line += " // $size = '" + sizeHint + "'";
  return line;
}

/**
 * Convert array of sn- variable names to grouped mixins.
 */
export function variableNamesToMixins(varNames: string[]): MixinSuggestion[] {
  const groups = new Map<string, { component: string; pathSegments: string[]; variableNames: string[] }>();

  for (const name of varNames) {
    const parsed = parseVariableName(name);
    if (!parsed) continue;
    if (!COMPONENT_MAP[parsed.component]) continue;

    const key = blockKey(parsed.component, parsed.pathSegments);
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        component: parsed.component,
        pathSegments: parsed.pathSegments,
        variableNames: [name],
      });
    } else {
      existing.variableNames.push(name);
    }
  }

  const result: MixinSuggestion[] = [];
  for (const g of groups.values()) {
    const mergedPath = mergePathSegmentsWithAnatomy(g.component, g.pathSegments);
    const mixinText = pathToMixinString(g.component, mergedPath);
    if (!mixinText) continue;
    result.push({
      path: mergedPath.join(' > '),
      mixinText,
      variableNames: g.variableNames,
    });
  }
  return result;
}

/** CSS var (--sn-...) is component map path var: sn-<component>-<key1>-...-<leaf> (each part = one key in SCSS map). */
export function isComponentAnatomyVar(varName: string): boolean {
  const s = varName.startsWith('--') ? varName.slice(2) : varName;
  if (!s.startsWith('sn-')) return false;
  const parts = s.split('-');
  if (parts.length < 3) return false;
  const component = parts[1];
  return !!COMPONENT_MAP[component];
}

/**
 * Returns SCSS module alias for a CSS variable (e.g. "tooltip" for sn-tooltip-*, "base" for sn-theme-*).
 * Variables not found in CSS_VAR_TO_SCSS_MODULE (e.g. not yet in package) default to "base".
 */
export function getScssModulePrefixForVar(cssVarName: string): string {
  const s = String(cssVarName).trim();
  const withoutDash = s.startsWith('--') ? s.slice(2) : s;
  if (!withoutDash.startsWith('sn-')) return 'base';
  return CSS_VAR_TO_SCSS_MODULE[withoutDash] ?? 'base';
}

/** CSS var name to SCSS ref: --sn-tooltip-xxx → tooltip.$sn-tooltip-xxx, --sn-theme-xxx → base.$sn-theme-xxx */
export function cssVarToScssRef(cssVarName: string): string {
  const s = String(cssVarName).trim();
  const withoutDash = s.startsWith('--') ? s.slice(2) : s;
  const prefix = getScssModulePrefixForVar(withoutDash);
  return prefix + '.$' + withoutDash.replace(/\//g, '-');
}

/**
 * All sn- variables (including anatomy) → SCSS usage. Anatomy vars get their
 * component module prefix (e.g. tooltip.$sn-tooltip-...); theme/global use base.
 */
export function variableNamesToSimpleVarSuggestions(varNames: string[]): SimpleVarSuggestion[] {
  const seen = new Set<string>();
  const result: SimpleVarSuggestion[] = [];
  for (const name of varNames) {
    const normalized = name.startsWith('--') ? name.slice(2) : name;
    if (!normalized.startsWith('sn-')) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    const scssName = normalized.replace(/\//g, '-');
    const prefix = getScssModulePrefixForVar(normalized);
    const scssRef = prefix + '.$' + scssName;
    const prop = normalized.includes('color') ? 'color' : 'value';
    result.push({
      cssVar: '--' + normalized,
      scssRef,
      exampleLine: prop + ': ' + scssRef + ';',
    });
  }
  return result;
}
