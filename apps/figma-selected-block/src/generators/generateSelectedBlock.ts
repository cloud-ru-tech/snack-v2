/**
 * Pure Block 3 generator for a single selected layer: builds the SCSS snippet
 * `@include base.composite-var(...)` calls + filtered raw style lines from a
 * CSS string (like one returned by Figma MCP or Figma's getCSSAsync()).
 *
 * No Figma API dependencies — safe to run in Node / CLI / library.
 */

import { ANATOMY_FULL_LEAF_KEYS_BY_PATH, COMPONENT_MAP, CSS_VAR_TO_JS_PATH } from '../generated/tokenMaps';
import { getBoxShadowCompositeRef, getGradientCompositeRef } from '../core/compositeTokens';
import {
  getScssModulePrefixForVar,
  parseVariableName,
  variableNamesToMixins,
  variableNamesToSimpleVarSuggestions,
} from '../core/variableToMixin';
import type { MixinSuggestion, SimpleVarSuggestion } from '../core/types';

export interface SelectedBlockInput {
  /** Raw CSS string for the selected node (e.g. from Figma MCP `get_code`). */
  css: string;
  /** Optional: explicit list of `sn-*` variable names on the node. If omitted, parsed from `css`. */
  varNames?: string[];
  /** Optional: component name hint (e.g. "alert"). If omitted, inferred from variable names. */
  componentHint?: string;
}

export interface SelectedBlockOutput {
  /** Resolved component name (may be "component" fallback when unknown). */
  componentName: string;
  /** Ready-to-paste SCSS text (Block 3). */
  scss: string;
  /** Number of `@include base.composite-var(...)` lines emitted. */
  mixinsCount: number;
  /** Number of raw style lines emitted (after dedup filter). */
  stylesCount: number;
  warnings: string[];
}

/* ---------- variable name helpers ---------- */

function normalizeVarName(name: string): string {
  let s = String(name).trim();
  if (s.startsWith('--')) s = s.slice(2);
  return s;
}

/** Extracts `--sn-*` names from a CSS string (declarations separated by `;`). */
export function extractVarNamesFromCssText(css: string): string[] {
  const names: string[] = [];
  if (!css) return names;
  const re = /var\s*\(\s*(--[^,)]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    names.push(normalizeVarName(m[1]));
  }
  return names;
}

/* ---------- CSS → SCSS conversion ---------- */

const VAR_OPEN_RE = /var\s*\(/gi;

function replaceVarCallsInValue(value: string, cssVarToScssRef: (varName: string) => string): string {
  const result: string[] = [];
  let i = 0;
  VAR_OPEN_RE.lastIndex = 0;
  let varMatch = VAR_OPEN_RE.exec(value);
  while (varMatch !== null) {
    const varStart = varMatch.index;
    const openParen = varStart + varMatch[0].length;
    result.push(value.slice(i, varStart));
    const nameMatch = value.slice(openParen).match(/^\s*(--[^,)]+)(\s*,)?/);
    if (!nameMatch) {
      let depth = 1;
      let j = openParen;
      while (j < value.length && depth > 0) {
        const ch = value[j];
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        j++;
      }
      result.push(value.slice(varStart, j));
      i = j;
      VAR_OPEN_RE.lastIndex = i;
      varMatch = VAR_OPEN_RE.exec(value);
      continue;
    }
    const namePart = nameMatch[0].length;
    const varName = nameMatch[1].trim();
    let depth = 1;
    let j = openParen + namePart;
    while (j < value.length && depth > 0) {
      const ch = value[j];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      j++;
    }
    const varEnd = j;
    result.push(cssVarToScssRef(varName));
    i = varEnd;
    VAR_OPEN_RE.lastIndex = i;
    varMatch = VAR_OPEN_RE.exec(value);
  }
  result.push(value.slice(i));
  return result.join('');
}

function cssVarToScssRef(varName: string, varToScss: Map<string, string>): string {
  const trimmed = varName.trim();
  const withoutDash = trimmed.startsWith('--') ? trimmed.slice(2) : trimmed;
  const ref = varToScss.get(trimmed) ?? varToScss.get(withoutDash);
  if (ref != null) return ref;
  const canonicalKey = CSS_VAR_TO_JS_PATH[trimmed];
  const refName = canonicalKey != null ? canonicalKey.replace(/\./g, '-') : withoutDash.replace(/\//g, '-');
  const prefix = getScssModulePrefixForVar(withoutDash);
  return prefix + '.$' + refName;
}

function fullCSSToScssLines(fullCSS: string, simpleVars: SimpleVarSuggestion[]): string {
  if (!fullCSS || !fullCSS.trim()) return '';
  const varToScss = new Map<string, string>();
  for (const v of simpleVars) {
    const norm = v.cssVar.startsWith('--') ? v.cssVar.slice(2) : v.cssVar;
    varToScss.set(norm, v.scssRef);
    varToScss.set(v.cssVar, v.scssRef);
  }
  const out: string[] = [];
  const declarations = fullCSS
    .split(';')
    .map(s => s.trim())
    .filter(Boolean);
  for (const decl of declarations) {
    const colon = decl.indexOf(':');
    if (colon === -1) continue;
    const prop = decl.slice(0, colon).trim();
    const value = decl.slice(colon + 1).trim();
    const hasVar = /var\s*\(\s*--/.test(value);
    if (hasVar) {
      const propLower = prop.toLowerCase();
      const compositeRef =
        propLower === 'box-shadow' ? getBoxShadowCompositeRef(value) : getGradientCompositeRef(prop, value);
      if (compositeRef != null) {
        out.push(prop + ': ' + compositeRef + ';');
      } else {
        const toRef = (varName: string) => cssVarToScssRef(varName, varToScss);
        const transformedValue = replaceVarCallsInValue(value, toRef);
        out.push(prop + ': ' + transformedValue + ';');
      }
    } else {
      out.push(decl + ';');
    }
  }
  return out.join('\n');
}

/* ---------- typography collapse ---------- */

interface TypographyStyle {
  weight: string;
  variant: string;
  size: string;
}

const TYPOGRAPHY_PROP_NAMES = new Set([
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'line-height',
  'letter-spacing',
  'paragraph-spacing',
]);

function parseTypographyFromCSS(fullCSS: string): TypographyStyle | null {
  if (!fullCSS || !fullCSS.trim()) return null;
  const commentRe = /\/\*\s*sn\s*[\/\s]\s*([a-z]+)\s*[\/\s]\s*([a-z]+)\s*[\/\s]\s*([a-z0-9]+)\s*\*\//i;
  const commentMatch = fullCSS.match(commentRe);
  if (commentMatch) {
    return {
      weight: commentMatch[1].toLowerCase(),
      variant: commentMatch[2].toLowerCase(),
      size: commentMatch[3].toLowerCase(),
    };
  }
  const fontWeightRe =
    /--sn-theme-typography-fontWeight-(regular|thin|mono)-(display|headline|title|label|body)-(s|m|l)\b/gi;
  const fwMatch = fontWeightRe.exec(fullCSS);
  if (fwMatch) {
    return {
      weight: fwMatch[1].toLowerCase(),
      variant: fwMatch[2].toLowerCase(),
      size: fwMatch[3].toLowerCase(),
    };
  }
  const regularRe = /--sn-regular-(display|headline|title|label|body)-(s|m|l)-/i;
  const regMatch = regularRe.exec(fullCSS);
  if (regMatch) {
    return {
      weight: 'regular',
      variant: regMatch[1].toLowerCase(),
      size: regMatch[2].toLowerCase(),
    };
  }
  const roleRe = /--sn-adaptive-typography-role(Display|Headline|Title|Label|Body)-(?:fontSize|lineHeight)(S|M|L)\b/gi;
  const roleMatch = roleRe.exec(fullCSS);
  if (roleMatch) {
    return {
      weight: 'regular',
      variant: roleMatch[1].toLowerCase(),
      size: roleMatch[2].toLowerCase(),
    };
  }
  return null;
}

function collapseTypographyInScss(scssLines: string, fullCSS: string): string {
  const style = parseTypographyFromCSS(fullCSS);
  if (!style) return scssLines;
  const lines = scssLines.split('\n').filter(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('/*') || trimmed.startsWith('@include')) return true;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) return true;
    const prop = trimmed.slice(0, colonIdx).trim().toLowerCase();
    if (TYPOGRAPHY_PROP_NAMES.has(prop)) return false;
    return true;
  });
  const mixinLine =
    "@include base.composite-var(base.$base-styles, 'sn', '" +
    style.weight +
    "', '" +
    style.variant +
    "', '" +
    style.size +
    "');";
  const firstNonComment = lines.findIndex(l => l.trim().length > 0 && !l.trim().startsWith('/*'));
  if (firstNonComment === -1) {
    return mixinLine + '\n' + lines.join('\n');
  }
  lines.splice(firstNonComment, 0, mixinLine);
  return lines.join('\n');
}

/* ---------- component inference ---------- */

function inferComponentFromVarNames(varNames: string[]): string | null {
  for (const v of varNames) {
    const parsed = parseVariableName(v);
    if (parsed && COMPONENT_MAP[parsed.component]) return parsed.component;
  }
  return null;
}

/* ---------- main ---------- */

export function generateSelectedBlock(input: SelectedBlockInput): SelectedBlockOutput {
  const warnings: string[] = [];
  const css = (input.css ?? '').trim();

  const varNamesRaw = (
    input.varNames && input.varNames.length > 0 ? input.varNames : extractVarNamesFromCssText(css)
  ).map(normalizeVarName);
  const snNames = varNamesRaw.filter(n => n.startsWith('sn-') || n.startsWith('sn/'));
  const nonSn = varNamesRaw.filter(n => !n.startsWith('sn-') && !n.startsWith('sn/'));
  if (nonSn.length > 0) {
    warnings.push(
      `Ignored ${nonSn.length} non-sn variable(s): ${nonSn.slice(0, 3).join(', ')}${nonSn.length > 3 ? '…' : ''}`,
    );
  }

  const mixins: MixinSuggestion[] = variableNamesToMixins(snNames);
  const simpleVars: SimpleVarSuggestion[] = variableNamesToSimpleVarSuggestions(snNames);

  const componentName =
    input.componentHint && COMPONENT_MAP[input.componentHint]
      ? input.componentHint
      : (inferComponentFromVarNames(snNames) ?? 'component');
  if (componentName === 'component' && snNames.length > 0) {
    warnings.push('Could not infer component from variable names; output uses generic module prefixes.');
  }

  let selectedLayerStyles = fullCSSToScssLines(css, simpleVars);
  if (selectedLayerStyles) {
    selectedLayerStyles = collapseTypographyInScss(selectedLayerStyles, css);
  }

  const selectedLayerMixins: string[] = [];
  const coveredPrefixes = new Set<string>();
  for (const m of mixins) {
    const pathSegments = m.path.split(' > ').filter(Boolean);
    const firstVar = m.variableNames && m.variableNames[0] ? m.variableNames[0] : '';
    const parsed = firstVar ? parseVariableName(firstVar) : null;
    if (!parsed || pathSegments.length === 0) continue;

    const pathKey = parsed.component + ':' + pathSegments.join(':');
    const fullLeafKeys = ANATOMY_FULL_LEAF_KEYS_BY_PATH[pathKey];
    const appliedLeafKeys = new Set(m.variableNames.map(v => parseVariableName(v)?.leafKey).filter(Boolean));
    const isFullComposite =
      !!fullLeafKeys &&
      fullLeafKeys.length > 0 &&
      appliedLeafKeys.size === fullLeafKeys.length &&
      fullLeafKeys.every(k => appliedLeafKeys.has(k));

    if (isFullComposite) {
      selectedLayerMixins.push(m.mixinText);
      const pathPrefix = 'sn-' + parsed.component + '-' + pathSegments.join('-');
      coveredPrefixes.add(pathPrefix);
    }
  }

  if (selectedLayerStyles && coveredPrefixes.size > 0) {
    selectedLayerStyles = selectedLayerStyles
      .split('\n')
      .filter(line => {
        const match = line.match(/:\s*[\w.]+\.\$([a-zA-Z0-9.-]+)\s*;/);
        if (!match) return true;
        const ref = match[1];
        for (const prefix of coveredPrefixes) {
          if (ref === prefix || ref.startsWith(prefix + '-')) return false;
        }
        return true;
      })
      .join('\n');
  }

  const block3Lines: string[] = [];
  if (selectedLayerMixins.length > 0) {
    block3Lines.push('/* composite-var (токены) */');
    for (const m of selectedLayerMixins) {
      block3Lines.push(m.startsWith('@include') ? m : '@include ' + m);
    }
    block3Lines.push('');
  }
  const stylesTrimmed = selectedLayerStyles ? selectedLayerStyles.trim() : '';
  let stylesCount = 0;
  if (stylesTrimmed) {
    block3Lines.push('/* стили (в т.ч. типографика и обычные свойства) */');
    for (const line of stylesTrimmed.split('\n')) {
      const t = line.trim();
      if (t) stylesCount++;
      block3Lines.push(t);
    }
  }
  if (block3Lines.length === 0) {
    block3Lines.push('/* выделите слой с переменными или стилями */');
  }

  return {
    componentName,
    scss: block3Lines.join('\n'),
    mixinsCount: selectedLayerMixins.length,
    stylesCount,
    warnings,
  };
}

/** Expose for plugin-side integration: returns the Block-3-internal state so
 *  `src/plugin/code.ts` can render it in the existing `generateFullScss` flow. */
export interface SelectedBlockInternals {
  selectedLayerStyles: string;
  selectedLayerMixins: string[];
}

export function computeSelectedBlockInternals(
  css: string,
  simpleVars: SimpleVarSuggestion[],
  mixins: MixinSuggestion[],
): SelectedBlockInternals {
  let selectedLayerStyles = fullCSSToScssLines(css, simpleVars);
  if (selectedLayerStyles) {
    selectedLayerStyles = collapseTypographyInScss(selectedLayerStyles, css);
  }

  const selectedLayerMixins: string[] = [];
  const coveredPrefixes = new Set<string>();
  for (const m of mixins) {
    const pathSegments = m.path.split(' > ').filter(Boolean);
    const firstVar = m.variableNames && m.variableNames[0] ? m.variableNames[0] : '';
    const parsed = firstVar ? parseVariableName(firstVar) : null;
    if (!parsed || pathSegments.length === 0) continue;

    const pathKey = parsed.component + ':' + pathSegments.join(':');
    const fullLeafKeys = ANATOMY_FULL_LEAF_KEYS_BY_PATH[pathKey];
    const appliedLeafKeys = new Set(m.variableNames.map(v => parseVariableName(v)?.leafKey).filter(Boolean));
    const isFullComposite =
      !!fullLeafKeys &&
      fullLeafKeys.length > 0 &&
      appliedLeafKeys.size === fullLeafKeys.length &&
      fullLeafKeys.every(k => appliedLeafKeys.has(k));

    if (isFullComposite) {
      selectedLayerMixins.push(m.mixinText);
      const pathPrefix = 'sn-' + parsed.component + '-' + pathSegments.join('-');
      coveredPrefixes.add(pathPrefix);
    }
  }

  if (selectedLayerStyles && coveredPrefixes.size > 0) {
    selectedLayerStyles = selectedLayerStyles
      .split('\n')
      .filter(line => {
        const match = line.match(/:\s*[\w.]+\.\$([a-zA-Z0-9.-]+)\s*;/);
        if (!match) return true;
        const ref = match[1];
        for (const prefix of coveredPrefixes) {
          if (ref === prefix || ref.startsWith(prefix + '-')) return false;
        }
        return true;
      })
      .join('\n');
  }

  return { selectedLayerStyles, selectedLayerMixins };
}
