#!/usr/bin/env node
/**
 * Generates src/generated/tokenMaps.ts from @ds/figma-variables:
 * - build/scss: anatomy tails per component, anatomy direct keys (block-style), segment names, typography by size
 * - build/ts: theme CSS var names and CSS_VAR_TO_JS_PATH
 * - COMPONENT_MAP from list of component files in build/scss/components
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { format, resolveConfig } from 'prettier';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pkgRoot = join(root, 'node_modules', '@ds', 'figma-variables');
const pkgScss = join(pkgRoot, 'build', 'scss');
const pkgTs = join(pkgRoot, 'build', 'ts');
const outDir = join(root, 'src', 'generated');
const outFile = join(outDir, 'tokenMaps.ts');

/** Size-like values in paths (for detecting size dimension and building tails). */
const SIZE_VALUES = new Set([
  'xs',
  's',
  'm',
  'l',
  '3xl',
  '6xl',
  '10xl',
  'scroll',
  'regular',
  'left',
  'right',
  'top',
  'bottom',
]);

const PROPERTY_SUFFIXES = [
  'min-height',
  'min-width',
  'max-width',
  'padding-horizontal',
  'padding-vertical',
  'gap',
  'border-radius',
  'border-width',
  'padding',
  'margin',
  'font-size',
  'line-height',
  'letter-spacing',
  'paragraph-spacing',
  'font-weight',
  'font-family',
].sort((a, b) => b.length - a.length);

function pathToTail(pathPart: string): string {
  for (const suf of PROPERTY_SUFFIXES) {
    if (pathPart === suf || pathPart.endsWith('-' + suf)) {
      return pathPart.slice(0, -(suf.length + 1)).trim();
    }
  }
  const segments = pathPart.split('-');
  return segments.length > 1 ? segments.slice(0, -1).join('-') : pathPart;
}

/** Merge tail (e.g. "container-textWrapper") into segments using segment names. */
function mergeTailWithSegmentNames(tail: string, segmentNames: string[]): string[] {
  if (!tail || !segmentNames.length) return tail ? [tail] : [];
  const merged: string[] = [];
  let remainder = tail;
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
  return merged;
}

export interface ComponentMeta {
  moduleAlias: string;
  mapVariable: string;
}

let anatomyTailsByComponent: Record<string, string[][]> = {};
let anatomySegmentNamesByComponent: Record<string, string[]> = {};
let anatomyDirectKeysByComponent: Record<string, string[]> = {};
/** Full set of leaf keys per path. Path key = "component:key1:key2:..." from variable name sn-<component>-<key1>-<key2>-...-<leaf>. */
let anatomyFullLeafKeysByPath: Record<string, string[]> = {};
let componentMap: Record<string, ComponentMeta> = {};
let typographyBySize: Record<string, string> = {};
let themeCssVarNames: string[] = [];
let cssVarToJsPath: Record<string, string> = {};
/** CSS var name (without --) -> SCSS module alias for that variable (e.g. "tooltip", "base"). */
let cssVarToScssModule: Record<string, string> = {};

try {
  const componentsDir = join(pkgScss, 'components');
  const files = readdirSync(componentsDir).filter((f: string) => f.endsWith('.module.scss'));

  for (const file of files) {
    const componentKey = file.replace('.module.scss', '');
    componentMap[componentKey] = {
      moduleAlias: componentKey,
      mapVariable: '$' + componentKey,
    };
  }

  for (const file of files) {
    const component = file.replace('.module.scss', '');
    const content = readFileSync(join(componentsDir, file), 'utf8');

    // Map segment names first (keys from $component: ( "key": ... ) — needed for merging path tails)
    const keyRe = /"([a-zA-Z0-9-]+)"\s*:/g;
    const segmentNamesSet = new Set<string>();
    let km: RegExpExecArray | null;
    while ((km = keyRe.exec(content)) !== null) {
      segmentNamesSet.add(km[1]);
    }
    const segmentNames = segmentNamesSet.size ? Array.from(segmentNamesSet).sort((a, b) => b.length - a.length) : [];
    if (segmentNames.length > 0) {
      anatomySegmentNamesByComponent[component] = segmentNames;
    }

    // Unified: variable name = sn-<component>-<part1>-<part2>-...-<leaf> → path = component:part1:part2:..., leaf = last part (each part = one key in SCSS map)
    const varPathRe = new RegExp('\\$sn-' + component + '-([a-zA-Z0-9]+-[a-zA-Z0-9-]*)', 'gi');
    const leafKeysByPath = new Map<string, Set<string>>();
    const pathKeysForTails = new Set<string>();
    const directKeys = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = varPathRe.exec(content)) !== null) {
      const rest = m[1];
      const parts = rest.split('-');
      if (parts.length < 2) continue;
      const pathSegments = parts.slice(0, -1);
      const leafKey = parts[parts.length - 1];
      const pathKey = component + ':' + pathSegments.join(':');
      if (!leafKeysByPath.has(pathKey)) {
        leafKeysByPath.set(pathKey, new Set<string>());
      }
      leafKeysByPath.get(pathKey)!.add(leafKey);
      pathKeysForTails.add(pathKey);
      if (pathSegments.length === 2) {
        directKeys.add(pathSegments[1]);
      }
    }
    for (const [pathKey, keys] of leafKeysByPath) {
      anatomyFullLeafKeysByPath[pathKey] = Array.from(keys).sort();
    }
    if (directKeys.size > 0) {
      anatomyDirectKeysByComponent[component] = Array.from(directKeys).sort();
    }
    // Tails = path after first size value (for @each $size loops). Merge with segment names.
    const tails = new Set<string>();
    for (const pathKey of pathKeysForTails) {
      const pathSegments = pathKey.split(':').slice(1);
      const sizeIdx = pathSegments.findIndex(seg => SIZE_VALUES.has(seg.toLowerCase()));
      if (sizeIdx < 0 || sizeIdx >= pathSegments.length - 1) continue;
      const tailPart = pathSegments.slice(sizeIdx + 1).join('-');
      const merged = mergeTailWithSegmentNames(tailPart, segmentNames);
      const tailStr = merged.join('-');
      if (tailStr) tails.add(tailStr);
    }
    if (tails.size > 0) {
      anatomyTailsByComponent[component] = Array.from(tails)
        .sort()
        .map(t => [t]);
    }

    // Collect $sn-<component>-* variable names -> this component's module alias (for SCSS ref prefix)
    const varDefRe = new RegExp('\\$sn-' + component + '-([a-zA-Z0-9_-]+)\\s*:', 'g');
    while ((m = varDefRe.exec(content)) !== null) {
      const varName = 'sn-' + component + '-' + m[1];
      cssVarToScssModule[varName] = componentMap[component].moduleAlias;
    }
  }
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  console.warn('generate-token-maps: could not read components:', msg);
  anatomyTailsByComponent = {};
  anatomySegmentNamesByComponent = {};
  anatomyDirectKeysByComponent = {};
  anatomyFullLeafKeysByPath = {};
  componentMap = {};
}

try {
  const stylesPath = join(pkgScss, 'styles', 'styles.module.scss');
  const content = readFileSync(stylesPath, 'utf8');
  const re = /\$sn-regular-(label|title|display|headline|body)-([a-z0-9]+)\s*:/g;
  const bySizeAndRole: Record<string, Record<string, string>> = {};
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const role = m[1];
    const size = m[2];
    if (!bySizeAndRole[size]) bySizeAndRole[size] = {};
    bySizeAndRole[size][role] = 'base.$sn-regular-' + role + '-' + size;
  }
  const roleOrder = ['label', 'title', 'body', 'headline', 'display'];
  for (const [size, roles] of Object.entries(bySizeAndRole)) {
    const preferred = roleOrder.find(r => roles[r]);
    typographyBySize[size] = preferred ? roles[preferred] : (Object.values(roles)[0] as string);
  }
  // All $sn-* variables defined in styles.module.scss use "base" module (don't overwrite component vars)
  const stylesVarRe = /\$sn-([a-zA-Z0-9_-]+)\s*:/g;
  while ((m = stylesVarRe.exec(content)) !== null) {
    const varName = 'sn-' + m[1];
    if (!(varName in cssVarToScssModule)) cssVarToScssModule[varName] = 'base';
  }
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  console.warn('generate-token-maps: could not read styles:', msg);
  typographyBySize = {};
}

try {
  const stylesPath = join(pkgTs, 'styles.js');
  const content = readFileSync(stylesPath, 'utf8');
  const varRe = /var\((--sn-[^,)]+)/g;
  const varNamesSet = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = varRe.exec(content)) !== null) varNamesSet.add(m[1]);
  themeCssVarNames = Array.from(varNamesSet).sort();
  cssVarToJsPath = {};
  for (const cssVar of themeCssVarNames) {
    const key = cssVar.replace(/^--/, '').replace(/-/g, '.');
    cssVarToJsPath[cssVar] = key;
  }
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  console.warn('generate-token-maps: could not read build/ts:', msg);
  themeCssVarNames = [];
  cssVarToJsPath = {};
}

/** Serialize object for TS output: unquote valid identifier keys. */
function jsonStringifyObj(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, '$1:');
}

const tsContent = `/**
 * Generated by scripts/generate-token-maps.ts from @ds/figma-variables (build/scss + build/ts).
 * Do not edit by hand. Regenerate with: pnpm run build or pnpm run generate-maps.
 */

export interface ComponentMeta {
  moduleAlias: string;
  mapVariable: string;
}

/** Component key (filename) -> module alias and map variable. Derived from build/scss/components. */
export const COMPONENT_MAP: Record<string, ComponentMeta> = ${jsonStringifyObj(componentMap as unknown as Record<string, unknown>)};

export const ANATOMY_TAILS_BY_COMPONENT: Record<string, string[][]> = ${jsonStringifyObj(anatomyTailsByComponent as unknown as Record<string, unknown>)};

/** Components with single-level anatomy (e.g. block: s, m, l) instead of anatomy.size.<size>. */
export const ANATOMY_DIRECT_KEYS_BY_COMPONENT: Record<string, string[]> = ${jsonStringifyObj(anatomyDirectKeysByComponent as unknown as Record<string, unknown>)};

export const ANATOMY_SEGMENT_NAMES_BY_COMPONENT: Record<string, string[]> = ${jsonStringifyObj(anatomySegmentNamesByComponent as unknown as Record<string, unknown>)};

/** Full set of leaf keys per path. Path key = "component:key1:key2:..." from variable sn-<component>-<key1>-<key2>-...-<leaf>. Used to detect partial vs full composite-var. */
export const ANATOMY_FULL_LEAF_KEYS_BY_PATH: Record<string, string[]> = ${JSON.stringify(anatomyFullLeafKeysByPath, null, 2)};


export const TYPOGRAPHY_BY_SIZE: Record<string, string> = ${JSON.stringify(typographyBySize, null, 2)};

export const THEME_CSS_VAR_NAMES: string[] = ${JSON.stringify(themeCssVarNames)};

export const CSS_VAR_TO_JS_PATH: Record<string, string> = ${JSON.stringify(cssVarToJsPath, null, 2)};

/** CSS var name (without --) -> SCSS module alias. Used to output correct prefix (e.g. tooltip.\$sn-tooltip-..., base.\$sn-theme-...). */
export const CSS_VAR_TO_SCSS_MODULE: Record<string, string> = ${JSON.stringify(cssVarToScssModule, null, 2)};
`;

// Форматируем вывод конфигом репозитория: иначе prettier (руками или через lint-staged)
// переписывает сгенерированный файл и каждая перегенерация даёт diff из кавычек и переносов.
const prettierConfig = await resolveConfig(outFile);
const formatted = await format(tsContent, { ...prettierConfig, filepath: outFile });

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, formatted, 'utf8');

console.log('Generated', outFile);
console.log('  COMPONENT_MAP:', Object.keys(componentMap).length, 'components');
console.log('  anatomy tails:', Object.keys(anatomyTailsByComponent).length);
console.log('  anatomy direct keys:', Object.keys(anatomyDirectKeysByComponent).length);
console.log('  segment names:', Object.keys(anatomySegmentNamesByComponent).length);
console.log('  anatomy full leaf keys by path:', Object.keys(anatomyFullLeafKeysByPath).length);
console.log('  typography sizes:', Object.keys(typographyBySize).length);
console.log('  theme vars:', themeCssVarNames.length);
console.log('  CSS var -> SCSS module:', Object.keys(cssVarToScssModule).length);
