/**
 * Figma REST integration: fetch a node by URL or (fileKey, nodeId),
 * synthesize a CSS string from its auto-layout / corner / fill properties,
 * resolve sn-* variable names, and pipe the result through
 * generateSelectedBlock to produce Block 3 SCSS — without Figma Desktop / MCP.
 *
 * Requires FIGMA_TOKEN (personal access token). Variable-name resolution uses
 * /v1/files/:key/variables/local, which requires a paid Figma plan.
 *
 * CSS synthesis is best-effort and covers the properties that are typically
 * variable-bound in the @ds/figma-variables design system:
 *   paddings, gap (itemSpacing), border-radius, display/flex-direction, solid fills.
 * Properties outside this set (shadows, strokes, typography) are not synthesized;
 * for richer coverage use the Figma MCP / plugin path which calls getCSSAsync().
 */

import {
  generateSelectedBlock,
  type SelectedBlockInput,
  type SelectedBlockOutput,
} from '../generators/generateSelectedBlock';
import { ANATOMY_FULL_LEAF_KEYS_BY_PATH, COMPONENT_MAP } from '../generated/tokenMaps';

export interface FigmaNodeRef {
  fileKey: string;
  /** Figma node id in REST format (colons, e.g. "123:456"). URL-form dashes are normalized. */
  nodeId: string;
}

export interface FetchSelectedBlockOptions {
  /** Figma Personal Access Token. Falls back to process.env.FIGMA_TOKEN. */
  token?: string;
  /** Override `fetch` (for tests). */
  fetchFn?: typeof fetch;
  /** Optional component hint forwarded to generateSelectedBlock. */
  componentHint?: string;
  /** Variant axes for heuristic resolution (e.g. { size: "xs", appearance: "neutral" }). */
  variant?: Record<string, string>;
}

/** Parse a Figma URL or a "fileKey/nodeId" / "fileKey:nodeId" shorthand. */
export function parseFigmaNodeRef(input: string): FigmaNodeRef {
  const s = input.trim();
  if (!s) throw new Error('empty Figma reference');

  // URL form: https://www.figma.com/design/<fileKey>/<slug>?node-id=<id>
  if (/^https?:\/\//i.test(s)) {
    let url: URL;
    try {
      url = new URL(s);
    } catch {
      throw new Error(`invalid Figma URL: ${s}`);
    }
    const m = url.pathname.match(/\/(?:file|design|proto)\/([A-Za-z0-9]+)(?:\/|$)/);
    if (!m) throw new Error(`Figma URL missing file key: ${s}`);
    const fileKey = m[1];
    const nodeIdRaw = url.searchParams.get('node-id');
    if (!nodeIdRaw) throw new Error(`Figma URL missing ?node-id=: ${s}`);
    return { fileKey, nodeId: nodeIdRaw.replace(/-/g, ':') };
  }

  // "fileKey/nodeId" or "fileKey:nodeId"
  const m = s.match(/^([A-Za-z0-9]+)[\/:]([0-9:-]+)$/);
  if (m) return { fileKey: m[1], nodeId: m[2].replace(/-/g, ':') };

  throw new Error(`unrecognized Figma reference: ${s} (use a URL or "fileKey/nodeId")`);
}

/* ---------- REST types (subset we actually read) ---------- */

interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

interface FigmaPaintSolid {
  type: 'SOLID';
  color: { r: number; g: number; b: number; a?: number };
  opacity?: number;
  visible?: boolean;
  boundVariables?: { color?: FigmaVariableAlias };
}

type FigmaPaint = FigmaPaintSolid | { type: string; [k: string]: unknown };

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  cornerRadius?: number;
  rectangleCornerRadii?: [number, number, number, number];
  fills?: FigmaPaint[];
  boundVariables?: Record<string, FigmaVariableAlias | FigmaVariableAlias[] | undefined>;
}

interface NodesResponse {
  nodes: Record<
    string,
    {
      document: FigmaNode;
      components?: Record<string, { name: string; componentSetId?: string }>;
      componentSets?: Record<string, { name: string }>;
    } | null
  >;
}

interface LocalVariable {
  id: string;
  name: string;
  codeSyntax?: { WEB?: string };
}

interface LocalVariablesResponse {
  meta?: { variables?: Record<string, LocalVariable> };
}

/* ---------- REST client ---------- */

const FIGMA_API = 'https://api.figma.com';

async function figmaGet<T>(path: string, token: string, fetchFn: typeof fetch): Promise<T> {
  const res = await fetchFn(FIGMA_API + path, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Figma API ${res.status} ${res.statusText} for ${path}${body ? `\n${body.slice(0, 500)}` : ''}`);
  }
  return (await res.json()) as T;
}

function resolveToken(explicit: string | undefined): string {
  const t = (explicit ?? process.env.FIGMA_TOKEN ?? '').trim();
  if (!t) {
    throw new Error('Figma token not provided (pass --token or set FIGMA_TOKEN env var)');
  }
  return t;
}

/* ---------- variable name resolution ---------- */

function variableIdToCssVarName(v: LocalVariable): string | null {
  const web = v.codeSyntax?.WEB;
  if (web) {
    return web.startsWith('--') ? web.slice(2) : web;
  }
  if (v.name) return v.name.replace(/\//g, '-');
  return null;
}

async function fetchVariableNameMap(
  fileKey: string,
  token: string,
  fetchFn: typeof fetch,
): Promise<{ map: Map<string, string>; error?: string }> {
  try {
    const res = await figmaGet<LocalVariablesResponse>(`/v1/files/${fileKey}/variables/local`, token, fetchFn);
    const out = new Map<string, string>();
    const vars = res.meta?.variables ?? {};
    for (const [id, v] of Object.entries(vars)) {
      const name = variableIdToCssVarName(v);
      if (name) out.set(id, name);
    }
    return { map: out };
  } catch (e) {
    // 403 (missing file_variables:read scope) or any other failure: fall back
    // to heuristic name reconstruction based on component anatomy.
    return { map: new Map(), error: (e as Error).message };
  }
}

/* ---------- CSS synthesis ---------- */

function refOrLiteral(
  alias: FigmaVariableAlias | undefined,
  literal: string,
  nameById: Map<string, string>,
  collected: Set<string>,
): string {
  if (!alias) return literal;
  const name = nameById.get(alias.id);
  if (!name) return literal;
  collected.add(name);
  return `var(--${name})`;
}

function px(n: number | undefined): string | null {
  if (n == null || !isFinite(n)) return null;
  return `${n}px`;
}

function rgbaLiteral(p: FigmaPaintSolid): string {
  const r = Math.round(p.color.r * 255);
  const g = Math.round(p.color.g * 255);
  const b = Math.round(p.color.b * 255);
  const aBase = p.color.a ?? 1;
  const aEff = p.opacity != null ? aBase * p.opacity : aBase;
  if (aEff >= 0.999) return `rgb(${r}, ${g}, ${b})`;
  return `rgba(${r}, ${g}, ${b}, ${+aEff.toFixed(3)})`;
}

function synthesizeCssForNode(node: FigmaNode, nameById: Map<string, string>): { css: string; varNames: string[] } {
  const declarations: string[] = [];
  const collected = new Set<string>();
  const bv = node.boundVariables ?? {};
  const getAlias = (key: string): FigmaVariableAlias | undefined => {
    const v = bv[key];
    if (!v) return undefined;
    return Array.isArray(v) ? v[0] : v;
  };

  // Layout mode → display/flex-direction (not variable-bound)
  if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
    declarations.push('display: flex;');
    declarations.push(`flex-direction: ${node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'};`);
  }

  // Paddings
  const paddingProps: Array<[string, keyof FigmaNode]> = [
    ['padding-top', 'paddingTop'],
    ['padding-right', 'paddingRight'],
    ['padding-bottom', 'paddingBottom'],
    ['padding-left', 'paddingLeft'],
  ];
  for (const [cssProp, nodeKey] of paddingProps) {
    const alias = getAlias(nodeKey as string);
    const literal = px(node[nodeKey] as number | undefined);
    if (alias || literal != null) {
      const value = refOrLiteral(alias, literal ?? '0', nameById, collected);
      declarations.push(`${cssProp}: ${value};`);
    }
  }

  // Gap (itemSpacing) — only meaningful with a layout mode
  if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
    const alias = getAlias('itemSpacing');
    const literal = px(node.itemSpacing);
    if (alias || literal != null) {
      const value = refOrLiteral(alias, literal ?? '0', nameById, collected);
      declarations.push(`gap: ${value};`);
    }
  }

  // Corner radius
  if (node.rectangleCornerRadii && node.rectangleCornerRadii.length === 4) {
    const keys: Array<[string, string]> = [
      ['border-top-left-radius', 'topLeftRadius'],
      ['border-top-right-radius', 'topRightRadius'],
      ['border-bottom-right-radius', 'bottomRightRadius'],
      ['border-bottom-left-radius', 'bottomLeftRadius'],
    ];
    const values = node.rectangleCornerRadii;
    for (let i = 0; i < 4; i++) {
      const alias = getAlias(keys[i][1]);
      const literal = px(values[i]);
      if (alias || literal != null) {
        const value = refOrLiteral(alias, literal ?? '0', nameById, collected);
        declarations.push(`${keys[i][0]}: ${value};`);
      }
    }
  } else {
    const alias = getAlias('cornerRadius');
    const literal = px(node.cornerRadius);
    if (alias || literal != null) {
      const value = refOrLiteral(alias, literal ?? '0', nameById, collected);
      declarations.push(`border-radius: ${value};`);
    }
  }

  // Fills → background-color (for non-text) / color (for TEXT)
  const fillsBv = bv.fills;
  const fillsAliases = Array.isArray(fillsBv) ? fillsBv : fillsBv ? [fillsBv] : [];
  const firstFill = node.fills?.find(p => (p as FigmaPaintSolid).type === 'SOLID' && p.visible !== false) as
    | FigmaPaintSolid
    | undefined;
  const firstFillAlias = fillsAliases[0];
  if (firstFill || firstFillAlias) {
    const literal = firstFill ? rgbaLiteral(firstFill) : 'transparent';
    const bound = firstFill?.boundVariables?.color ?? firstFillAlias;
    const value = refOrLiteral(bound, literal, nameById, collected);
    const prop = node.type === 'TEXT' ? 'color' : 'background-color';
    declarations.push(`${prop}: ${value};`);
  }

  return { css: declarations.join('\n'), varNames: Array.from(collected) };
}

/* ---------- heuristic: reconstruct sn-* names from anatomy without variables scope ---------- */

/** Node name ("T Container" / "container") → CSS class-ish segment. Mirrors plugin logic. */
function nodeNameToAnatomySegment(name: string): string {
  let s = String(name)
    .trim()
    .replace(/^T\s+/i, '')
    .replace(/\s*"[^"]*"$/, '')
    .trim();
  s = s
    .replace(/[/\\]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_]/g, '');
  return s || '';
}

/** "size=xs, appearance=neutral, removable=false" → {size:"xs", appearance:"neutral", removable:"false"} */
function parseVariantName(nodeName: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of nodeName.split(',')) {
    const m = part.trim().match(/^([A-Za-z0-9_-]+)\s*=\s*(.+)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

/** Resolve component name for a node via the response's components/componentSets maps. */
function resolveComponentName(entry: {
  document: FigmaNode;
  components?: Record<string, { name: string; componentSetId?: string }>;
  componentSets?: Record<string, { name: string }>;
}): string | null {
  const doc = entry.document;
  const comps = entry.components ?? {};
  const sets = entry.componentSets ?? {};

  if (doc.type === 'COMPONENT_SET') {
    return (doc.name || '').toLowerCase() || null;
  }
  if (doc.type === 'COMPONENT') {
    const info = comps[doc.id];
    if (info?.componentSetId) {
      const setName = sets[info.componentSetId]?.name;
      if (setName) return setName.toLowerCase();
    }
    // Standalone component — use its own name if it looks like a component name (not "size=xs,...").
    if (!doc.name.includes('=')) return doc.name.toLowerCase();
  }
  if (doc.type === 'INSTANCE') {
    // Instance doesn't expose mainComponent id here; fall back to its own name.
    return doc.name.toLowerCase();
  }
  return null;
}

/** Figma boundVariables key (e.g. paddingLeft, rectangleCornerRadii.RECTANGLE_TOP_LEFT_CORNER_RADIUS) → candidate token leaf keys. */
function figmaPropToLeafCandidates(figmaKey: string, nodeType: string): string[] {
  const direct: Record<string, string[]> = {
    paddingLeft: ['paddingLeft'],
    paddingRight: ['paddingRight'],
    paddingTop: ['paddingTop'],
    paddingBottom: ['paddingBottom'],
    itemSpacing: ['gap'],
    minWidth: ['minWidth'],
    minHeight: ['minHeight'],
    maxWidth: ['maxWidth'],
    maxHeight: ['maxHeight'],
    width: ['width'],
    height: ['height'],
    opacity: ['opacity'],
    cornerRadius: ['borderRadius'],
    'rectangleCornerRadii.RECTANGLE_TOP_LEFT_CORNER_RADIUS': ['borderTopLeftRadius'],
    'rectangleCornerRadii.RECTANGLE_TOP_RIGHT_CORNER_RADIUS': ['borderTopRightRadius'],
    'rectangleCornerRadii.RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS': ['borderBottomRightRadius'],
    'rectangleCornerRadii.RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS': ['borderBottomLeftRadius'],
    'individualStrokeWeights.BORDER_TOP_WEIGHT': ['borderTopWidth'],
    'individualStrokeWeights.BORDER_BOTTOM_WEIGHT': ['borderBottomWidth'],
    'individualStrokeWeights.BORDER_LEFT_WEIGHT': ['borderLeftWidth'],
    'individualStrokeWeights.BORDER_RIGHT_WEIGHT': ['borderRightWidth'],
    strokeWeight: ['borderWidth'],
  };
  if (figmaKey === 'fills') return [nodeType === 'TEXT' ? 'color' : 'background'];
  return direct[figmaKey] ?? [];
}

/** Figma property key → CSS declaration property (one property per Figma key). */
function figmaPropToCssProp(figmaKey: string, nodeType: string): string | null {
  const m: Record<string, string> = {
    paddingLeft: 'padding-left',
    paddingRight: 'padding-right',
    paddingTop: 'padding-top',
    paddingBottom: 'padding-bottom',
    itemSpacing: 'gap',
    minWidth: 'min-width',
    minHeight: 'min-height',
    maxWidth: 'max-width',
    maxHeight: 'max-height',
    width: 'width',
    height: 'height',
    opacity: 'opacity',
    cornerRadius: 'border-radius',
    'rectangleCornerRadii.RECTANGLE_TOP_LEFT_CORNER_RADIUS': 'border-top-left-radius',
    'rectangleCornerRadii.RECTANGLE_TOP_RIGHT_CORNER_RADIUS': 'border-top-right-radius',
    'rectangleCornerRadii.RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS': 'border-bottom-right-radius',
    'rectangleCornerRadii.RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS': 'border-bottom-left-radius',
    'individualStrokeWeights.BORDER_TOP_WEIGHT': 'border-top-width',
    'individualStrokeWeights.BORDER_BOTTOM_WEIGHT': 'border-bottom-width',
    'individualStrokeWeights.BORDER_LEFT_WEIGHT': 'border-left-width',
    'individualStrokeWeights.BORDER_RIGHT_WEIGHT': 'border-right-width',
    strokeWeight: 'border-width',
  };
  if (figmaKey === 'fills') return nodeType === 'TEXT' ? 'color' : 'background-color';
  return m[figmaKey] ?? null;
}

interface HeuristicCtx {
  component: string;
  variant: Record<string, string>;
  declarations: string[];
  /** Cache of (varName → literal fallback) so we don't emit duplicate paddings when same id is reused. */
  emittedPrefixes: Set<string>;
  warnings: string[];
}

/** Flatten nested boundVariables like {rectangleCornerRadii:{...}} → [[dottedKey, alias]...] */
function flattenBoundVariables(bv: Record<string, unknown>): Array<[string, FigmaVariableAlias]> {
  const out: Array<[string, FigmaVariableAlias]> = [];
  for (const [k, v] of Object.entries(bv)) {
    if (!v) continue;
    if (Array.isArray(v)) {
      const first = v[0] as FigmaVariableAlias | undefined;
      if (first?.type === 'VARIABLE_ALIAS') out.push([k, first]);
      continue;
    }
    if (typeof v === 'object' && 'type' in (v as object)) {
      out.push([k, v as FigmaVariableAlias]);
      continue;
    }
    if (typeof v === 'object') {
      for (const [k2, v2] of Object.entries(v as Record<string, unknown>)) {
        if (v2 && typeof v2 === 'object' && 'type' in (v2 as object)) {
          out.push([`${k}.${k2}`, v2 as FigmaVariableAlias]);
        }
      }
    }
  }
  return out;
}

/** Try to build a sn-* variable name by anatomy path and verify it exists in the token maps. */
function tryReconstructVarName(
  ctx: HeuristicCtx,
  pathSegments: string[],
  leafCandidates: string[],
): { varName: string; pathKey: string; leaf: string } | null {
  const axisKeys = Object.keys(ctx.variant).length > 0 ? Object.keys(ctx.variant) : [''];
  for (const axis of axisKeys) {
    const axisValue = ctx.variant[axis];
    const prefixSegments = axis ? ['anatomy', axis, axisValue] : ['anatomy'];
    const prefixKey = [ctx.component, ...prefixSegments].join(':');

    // 1) Exact path with progressive prefix-drops (most specific wins)
    for (let drop = 0; drop <= pathSegments.length; drop++) {
      const segs = pathSegments.slice(drop);
      for (const leaf of leafCandidates) {
        const pathKey = [ctx.component, ...prefixSegments, ...segs].join(':');
        const leaves = ANATOMY_FULL_LEAF_KEYS_BY_PATH[pathKey];
        if (leaves && leaves.includes(leaf)) {
          const varName = `sn-${ctx.component}-${[...prefixSegments, ...segs, leaf].join('-')}`;
          return { varName, pathKey, leaf };
        }
      }
    }

    // 2) Fallback: scan all anatomy keys for this (component, axis, axisValue),
    //    pick the one whose tail best matches pathSegments and that owns the leaf.
    //    Useful when Figma node naming doesn't match token path exactly
    //    (e.g. root COMPONENT / "background" frame binds variables that live under "container").
    const candidates: Array<{ pathKey: string; segs: string[]; leaf: string; score: number }> = [];
    const allKeys = Object.keys(ANATOMY_FULL_LEAF_KEYS_BY_PATH);
    for (const key of allKeys) {
      if (!key.startsWith(prefixKey + ':') && key !== prefixKey) continue;
      const segs = key.slice(prefixKey.length).replace(/^:/, '').split(':').filter(Boolean);
      const leaves = ANATOMY_FULL_LEAF_KEYS_BY_PATH[key];
      for (const leaf of leafCandidates) {
        if (!leaves.includes(leaf)) continue;
        // Score: longer tail suffix match with pathSegments is better;
        // ties broken by shorter path (more general wins for empty pathSegments).
        let suffixMatch = 0;
        const n = Math.min(segs.length, pathSegments.length);
        for (let i = 1; i <= n; i++) {
          if (segs[segs.length - i] === pathSegments[pathSegments.length - i]) suffixMatch = i;
          else break;
        }
        const score = suffixMatch * 100 - segs.length;
        candidates.push({ pathKey: key, segs, leaf, score });
      }
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.score - a.score);
      const best = candidates[0];
      const varName = `sn-${ctx.component}-${[...prefixSegments, ...best.segs, best.leaf].join('-')}`;
      return { varName, pathKey: best.pathKey, leaf: best.leaf };
    }
  }
  return null;
}

function rgba(p: FigmaPaintSolid): string {
  const r = Math.round(p.color.r * 255);
  const g = Math.round(p.color.g * 255);
  const b = Math.round(p.color.b * 255);
  const aBase = p.color.a ?? 1;
  const aEff = p.opacity != null ? aBase * p.opacity : aBase;
  if (aEff >= 0.999) return `rgb(${r}, ${g}, ${b})`;
  return `rgba(${r}, ${g}, ${b}, ${+aEff.toFixed(3)})`;
}

function walkAndSynthesizeHeuristic(node: FigmaNode, pathSegments: string[], ctx: HeuristicCtx): void {
  const bv = node.boundVariables ?? {};
  const entries = flattenBoundVariables(bv as Record<string, unknown>);

  // Group Figma property keys by shared variable ID so we can detect aggregate tokens
  // (paddingLeft + paddingRight → paddingHorizontal when both bound to the same id).
  const idToKeys = new Map<string, string[]>();
  for (const [k, alias] of entries) {
    if (!idToKeys.has(alias.id)) idToKeys.set(alias.id, []);
    idToKeys.get(alias.id)!.push(k);
  }

  const emittedForId = new Set<string>();

  const tryEmitAggregate = (
    aliasId: string,
    keys: string[],
    aggregateLeaf: string,
    cssProps: string[],
    required: string[],
  ): boolean => {
    if (!required.every(r => keys.includes(r))) return false;
    const match = tryReconstructVarName(ctx, pathSegments, [aggregateLeaf]);
    if (!match) return false;
    for (const cssProp of cssProps) {
      ctx.declarations.push(`${cssProp}: var(--${match.varName});`);
    }
    emittedForId.add(aliasId);
    return true;
  };

  // Aggregate patterns
  for (const [aliasId, keys] of idToKeys) {
    if (emittedForId.has(aliasId)) continue;
    if (
      tryEmitAggregate(
        aliasId,
        keys,
        'paddingHorizontal',
        ['padding-left', 'padding-right'],
        ['paddingLeft', 'paddingRight'],
      )
    )
      continue;
    if (
      tryEmitAggregate(
        aliasId,
        keys,
        'paddingVertical',
        ['padding-top', 'padding-bottom'],
        ['paddingTop', 'paddingBottom'],
      )
    )
      continue;
    if (
      tryEmitAggregate(
        aliasId,
        keys,
        'padding',
        ['padding-left', 'padding-right', 'padding-top', 'padding-bottom'],
        ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
      )
    )
      continue;
    // All four rectangle corners same id → borderRadius
    if (
      tryEmitAggregate(
        aliasId,
        keys,
        'borderRadius',
        ['border-radius'],
        [
          'rectangleCornerRadii.RECTANGLE_TOP_LEFT_CORNER_RADIUS',
          'rectangleCornerRadii.RECTANGLE_TOP_RIGHT_CORNER_RADIUS',
          'rectangleCornerRadii.RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS',
          'rectangleCornerRadii.RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS',
        ],
      )
    )
      continue;
    // All four stroke weights same id → borderWidth
    if (
      tryEmitAggregate(
        aliasId,
        keys,
        'borderWidth',
        ['border-width'],
        [
          'individualStrokeWeights.BORDER_TOP_WEIGHT',
          'individualStrokeWeights.BORDER_BOTTOM_WEIGHT',
          'individualStrokeWeights.BORDER_LEFT_WEIGHT',
          'individualStrokeWeights.BORDER_RIGHT_WEIGHT',
        ],
      )
    )
      continue;
    // Vertical-only stroke weights (top+bottom same id) → borderVerticalWidth
    if (
      tryEmitAggregate(
        aliasId,
        keys,
        'borderVerticalWidth',
        ['border-top-width', 'border-bottom-width'],
        ['individualStrokeWeights.BORDER_TOP_WEIGHT', 'individualStrokeWeights.BORDER_BOTTOM_WEIGHT'],
      )
    )
      continue;
  }

  // Individual / direct mappings for anything not emitted as aggregate
  for (const [k, alias] of entries) {
    if (emittedForId.has(alias.id)) continue;
    const cssProp = figmaPropToCssProp(k, node.type);
    const leafCandidates = figmaPropToLeafCandidates(k, node.type);
    if (!cssProp || leafCandidates.length === 0) continue;
    const match = tryReconstructVarName(ctx, pathSegments, leafCandidates);
    if (match) {
      ctx.declarations.push(`${cssProp}: var(--${match.varName});`);
    } else {
      ctx.warnings.push(`could not reconstruct sn-* name for ${ctx.component}/${pathSegments.join('/')}/${k}`);
    }
  }

  // Literal (non-bound) properties for layout / gap / radius that are not bound variables
  if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
    const seen = pathSegments.join('>');
    if (!ctx.emittedPrefixes.has('layout:' + seen)) {
      ctx.emittedPrefixes.add('layout:' + seen);
      if (pathSegments.length === 0) {
        ctx.declarations.push('display: flex;');
        ctx.declarations.push(`flex-direction: ${node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'};`);
      }
    }
  }

  // Recurse into children, accumulating path via nodeName → className
  if (node.children) {
    for (const child of node.children) {
      const seg = nodeNameToAnatomySegment(child.name);
      const nextPath = seg ? [...pathSegments, seg] : pathSegments;
      walkAndSynthesizeHeuristic(child, nextPath, ctx);
    }
  }
}

/* ---------- high-level entry ---------- */

export interface FetchSelectedBlockResult extends SelectedBlockOutput {
  /** Debug: synthesized CSS fed into generateSelectedBlock. */
  synthesizedCss: string;
  ref: FigmaNodeRef;
}

/** Fetch a Figma node and produce Block 3 SCSS. */
export async function fetchSelectedBlockFromFigma(
  ref: FigmaNodeRef | string,
  options: FetchSelectedBlockOptions = {},
): Promise<FetchSelectedBlockResult> {
  const resolvedRef = typeof ref === 'string' ? parseFigmaNodeRef(ref) : ref;
  const token = resolveToken(options.token);
  const fetchFn = options.fetchFn ?? fetch;

  const nodesPath = `/v1/files/${resolvedRef.fileKey}/nodes?ids=${encodeURIComponent(resolvedRef.nodeId)}`;
  const [nodesRes, vars] = await Promise.all([
    figmaGet<NodesResponse>(nodesPath, token, fetchFn),
    fetchVariableNameMap(resolvedRef.fileKey, token, fetchFn),
  ]);
  const nodeEntry = nodesRes.nodes[resolvedRef.nodeId];
  if (!nodeEntry || !nodeEntry.document) {
    throw new Error(`node ${resolvedRef.nodeId} not found in file ${resolvedRef.fileKey}`);
  }
  const node = nodeEntry.document;

  let css: string;
  let varNames: string[];
  const warnings: string[] = [];
  const nameById = vars.map;

  if (nameById.size > 0) {
    // Direct path — we have real variable names from /variables/local
    const out = synthesizeCssForNode(node, nameById);
    css = out.css;
    varNames = out.varNames;
  } else {
    // Heuristic path — reconstruct sn-* names from component/variant/anatomy
    if (vars.error) {
      warnings.push(`/variables/local unavailable (${vars.error.split('\n')[0]}); using heuristic name reconstruction`);
    }
    const componentName = options.componentHint ?? resolveComponentName(nodeEntry) ?? null;
    if (!componentName || !COMPONENT_MAP[componentName]) {
      throw new Error(
        `could not resolve component name for node ${resolvedRef.nodeId}; pass --component <name> or use a URL pointing at a COMPONENT / COMPONENT_SET / INSTANCE root`,
      );
    }
    const nodeVariant = node.type === 'COMPONENT' && node.name.includes('=') ? parseVariantName(node.name) : {};
    const variant = { ...nodeVariant, ...(options.variant ?? {}) };
    if (Object.keys(variant).length === 0) {
      warnings.push(
        `no variant detected on ${node.type} "${node.name}"; heuristic will pick the first matching anatomy path (may pick a wrong size/state). Pass --variant size=xs or use a URL to a specific variant COMPONENT.`,
      );
    }
    const ctx: HeuristicCtx = {
      component: componentName,
      variant,
      declarations: [],
      emittedPrefixes: new Set(),
      warnings: [],
    };
    walkAndSynthesizeHeuristic(node, [], ctx);
    warnings.push(...ctx.warnings);
    css = ctx.declarations.join('\n');
    // varNames derived from declarations — each `var(--X)` ref
    const names = new Set<string>();
    for (const m of css.matchAll(/var\(--([a-zA-Z0-9-]+)\)/g)) names.add(m[1]);
    varNames = [...names];
  }

  const input: SelectedBlockInput = {
    css,
    varNames,
    componentHint: options.componentHint,
  };
  const out = generateSelectedBlock(input);
  out.warnings = [...warnings, ...out.warnings];
  return { ...out, synthesizedCss: css, ref: resolvedRef };
}
