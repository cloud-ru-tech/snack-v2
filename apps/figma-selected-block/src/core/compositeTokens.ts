/**
 * Composite tokens: box-shadow and gradient CSS values that can be expressed
 * as a single SCSS variable (e.g. base.$sn-boxShadow-elevation-level3) instead
 * of multiple layer/stop variables.
 */

const BOX_SHADOW_LEVEL_VAR_SUFFIXES = [
  'layer1-positionX',
  'layer1-positionY',
  'layer1-blur',
  'layer1-speed',
  'layer2-positionX',
  'layer2-positionY',
  'layer2-blur',
  'layer2-speed',
] as const;

const SHARED_SHADOW_VARS = ['sn-theme-effect-shadow-layer1Color', 'sn-theme-effect-shadow-layer2Color'] as const;

function buildBoxShadowVarSet(level: number): Set<string> {
  const set = new Set<string>();
  for (const suffix of BOX_SHADOW_LEVEL_VAR_SUFFIXES) {
    set.add(`sn-theme-effect-shadow-level${level}-${suffix}`);
  }
  for (const v of SHARED_SHADOW_VARS) {
    set.add(v);
  }
  return set;
}

/** Set of CSS var names (without --) per box-shadow level → combined SCSS var name (without base.$). */
export const BOX_SHADOW_COMPOSITE: Array<{ varNames: Set<string>; combinedVar: string }> = [
  { varNames: buildBoxShadowVarSet(1), combinedVar: 'sn-boxShadow-elevation-level1' },
  { varNames: buildBoxShadowVarSet(2), combinedVar: 'sn-boxShadow-elevation-level2' },
  { varNames: buildBoxShadowVarSet(3), combinedVar: 'sn-boxShadow-elevation-level3' },
  { varNames: buildBoxShadowVarSet(4), combinedVar: 'sn-boxShadow-elevation-level4' },
  { varNames: buildBoxShadowVarSet(5), combinedVar: 'sn-boxShadow-elevation-level5' },
];

const GRADIENT_SKELETON_VARS = new Set([
  'sn-theme-color-forGradient-skeleton-a',
  'sn-theme-color-forGradient-skeleton-b',
]);

const GRADIENT_LINEAR_MASK_VARS = new Set([
  'sn-theme-color-forGradient-linear-mask-a',
  'sn-theme-color-forGradient-linear-mask-b',
  'sn-theme-color-forGradient-linear-mask-c',
]);

/** Gradient composite: set of var names → combined var name. Linear-mask angle is detected from value. */
export const GRADIENT_SKELETON_COMBINED = 'sn-color-gradient-skeleton';

export const GRADIENT_LINEAR_MASK_ANGLES = [0, 90, 180, 270] as const;

export function getGradientLinearMaskCombined(angleDeg: number): string {
  return `sn-color-gradient-linear-mask-${angleDeg}deg`;
}

const VAR_IN_VALUE_RE = /var\s*\(\s*(--[^,)]+)/g;

/** Extract CSS variable names from a value string (with or without --). Returns names without leading --. */
export function extractVarNamesFromValue(value: string): Set<string> {
  const names = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = VAR_IN_VALUE_RE.exec(value)) !== null) {
    const raw = m[1].trim();
    const withoutDash = raw.startsWith('--') ? raw.slice(2) : raw;
    names.add(withoutDash);
  }
  return names;
}

/**
 * If the value uses exactly the vars of a box-shadow level, returns the combined SCSS ref (e.g. "base.$sn-boxShadow-elevation-level3").
 * Otherwise returns null.
 */
export function getBoxShadowCompositeRef(value: string): string | null {
  const varNames = extractVarNamesFromValue(value);
  if (varNames.size === 0) return null;
  for (const { varNames: levelSet, combinedVar } of BOX_SHADOW_COMPOSITE) {
    if (levelSet.size !== varNames.size) continue;
    let matches = true;
    for (const v of varNames) {
      if (!levelSet.has(v)) {
        matches = false;
        break;
      }
    }
    if (matches) return 'base.$' + combinedVar;
  }
  return null;
}

/**
 * If the value uses exactly the skeleton gradient vars, or the combined var (e.g. from Figma raw CSS), returns the combined SCSS ref.
 */
export function getGradientSkeletonCompositeRef(value: string): string | null {
  if (/var\s*\(\s*--sn-color-gradient-skeleton\s*[,)]/.test(value)) {
    return 'base.$' + GRADIENT_SKELETON_COMBINED;
  }
  const varNames = extractVarNamesFromValue(value);
  if (varNames.size !== GRADIENT_SKELETON_VARS.size) return null;
  for (const v of GRADIENT_SKELETON_VARS) {
    if (!varNames.has(v)) return null;
  }
  return 'base.$' + GRADIENT_SKELETON_COMBINED;
}

const LINEAR_MASK_COMBINED_RE = /var\s*\(\s*(--sn-color-gradient-linear-mask-(?:0|90|180|270)deg)\s*[,)]/;

/**
 * If the value uses exactly the linear-mask gradient vars, or the combined var from Figma, returns the combined SCSS ref.
 */
export function getGradientLinearMaskCompositeRef(value: string): string | null {
  const combinedMatch = value.match(LINEAR_MASK_COMBINED_RE);
  if (combinedMatch) {
    const varName = combinedMatch[1].replace(/^--/, '');
    return 'base.$' + varName;
  }
  const varNames = extractVarNamesFromValue(value);
  if (varNames.size !== GRADIENT_LINEAR_MASK_VARS.size) return null;
  for (const v of GRADIENT_LINEAR_MASK_VARS) {
    if (!varNames.has(v)) return null;
  }
  const angleMatch = value.match(/linear-gradient\s*\(\s*(\d+)deg/i);
  const angle = angleMatch ? parseInt(angleMatch[1], 10) : 0;
  const normalized = GRADIENT_LINEAR_MASK_ANGLES.includes(angle as 0 | 90 | 180 | 270)
    ? (angle as (typeof GRADIENT_LINEAR_MASK_ANGLES)[number])
    : 0;
  return 'base.$' + getGradientLinearMaskCombined(normalized);
}

/** Properties that may use composite gradient tokens. */
export const GRADIENT_CSS_PROPERTIES = new Set(['background', 'background-image']);

export function getGradientCompositeRef(prop: string, value: string): string | null {
  if (!GRADIENT_CSS_PROPERTIES.has(prop.toLowerCase())) return null;
  return getGradientSkeletonCompositeRef(value) ?? getGradientLinearMaskCompositeRef(value);
}
