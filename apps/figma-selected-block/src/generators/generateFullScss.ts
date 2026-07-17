/**
 * Generates full SCSS: imports, variables, class.
 * Path = variable name parts (sn-<component>-<key1>-...-<leaf>); size dimension detected by SIZE_VALUES.
 */

import {
  ANATOMY_FULL_LEAF_KEYS_BY_PATH,
  ANATOMY_DIRECT_KEYS_BY_COMPONENT,
  ANATOMY_TAILS_BY_COMPONENT,
  COMPONENT_MAP,
  TYPOGRAPHY_BY_SIZE as GENERATED_TYPOGRAPHY_BY_SIZE,
} from '../generated/tokenMaps';
import { getSizeValueIndex, pathHasSizeValue } from '../core/variableToMixin';

export interface ComponentSetupVar {
  name: string;
  values: string[];
}

export interface AggregatedMixins {
  component: string;
  pathSegments: string[];
}

export interface AggregatedSimpleVar {
  scssRef: string;
  prop: string;
}

const BASE_STYLES = `  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;`;

function propToDataAttr(propName: string): string {
  const base = propName.toLowerCase().replace(/\s+/g, '-');
  return 'data-' + base;
}

function propToScssListName(propName: string): string {
  const base = propName.toLowerCase();
  return base.endsWith('s') ? base : base + 's';
}

function propToLoopVar(propName: string): string {
  const base = propName.toLowerCase().replace(/\s+/g, '');
  const singular = base.endsWith('s') && base.length > 1 ? base.slice(0, -1) : base;
  return '$' + singular;
}

function quoteValues(values: string[]): string[] {
  return values.map(function (v) {
    return "'" + String(v).replace(/'/g, "\\'") + "'";
  });
}

/** Props that drive anatomy (size, shape) — nested. Rest are theme — flat. */
const ANATOMY_PROP_NAMES = ['size', 'shape'];

function isAnatomyProp(name: string): boolean {
  return ANATOMY_PROP_NAMES.indexOf(name.toLowerCase()) !== -1;
}

function getAnatomyTails(componentName: string): string[][] {
  return ANATOMY_TAILS_BY_COMPONENT[componentName] ?? [];
}

function getAnatomyDirectKeys(componentName: string): string[] {
  return ANATOMY_DIRECT_KEYS_BY_COMPONENT[componentName] ?? [];
}

/** Path segments before the size value (from any path in the map for this component). */
function getPathBeforeSize(componentName: string): string[] {
  const prefix = componentName + ':';
  for (const pathKey of Object.keys(ANATOMY_FULL_LEAF_KEYS_BY_PATH)) {
    if (!pathKey.startsWith(prefix)) continue;
    const segs = pathKey.slice(prefix.length).split(':');
    const i = getSizeValueIndex(segs);
    if (i > 0) return segs.slice(0, i);
  }
  return [];
}

function getTypographyBySize(): Record<string, string> {
  return GENERATED_TYPOGRAPHY_BY_SIZE;
}

export interface FullScssBlocks {
  block1ImportsAndVars: string;
  block2Loops: string;
  block3SelectedStyles: string;
  fullScss: string;
}

export function generateFullScss(
  componentName: string,
  rootNodeName: string,
  componentSetup: ComponentSetupVar[] | null,
  aggregatedMixins: AggregatedMixins[],
  aggregatedSimpleVars: AggregatedSimpleVar[],
  domPath: string[],
  selectedLayerStyles?: string,
  selectedLayerMixins?: string[],
): FullScssBlocks {
  const meta = COMPONENT_MAP[componentName];
  const className = componentName;
  const componentRef = meta ? meta.moduleAlias + '.' + meta.mapVariable : 'component.$component';

  const block1Lines: string[] = [];
  const block2Lines: string[] = [];
  const block3Lines: string[] = [];

  block1Lines.push('/* Базовые функции и миксины из пакета */');
  block1Lines.push("@use '@ds/figma-variables/build/scss/styles/styles.module' as base;");
  block1Lines.push('');
  block1Lines.push('/* Структуры компонентов (локальные) */');
  block1Lines.push(
    "@use '@ds/figma-variables/build/scss/components/" +
      componentName +
      ".module' as " +
      (meta ? meta.moduleAlias : 'component') +
      ';',
  );
  block1Lines.push('');

  const props =
    componentSetup && componentSetup.length > 0
      ? componentSetup
      : derivePropsFromMixins(aggregatedMixins, componentName);

  const sizeProp: ComponentSetupVar | null = props.find(p => p.name.toLowerCase() === 'size') ?? null;
  const shapeProp: ComponentSetupVar | null = props.find(p => p.name.toLowerCase() === 'shape') ?? null;

  const hasDirectAnatomy = getAnatomyDirectKeys(componentName).length > 0;
  const hasNestedAnatomySize = aggregatedMixins.some(
    m => m.component === componentName && m.pathSegments.length >= 3 && pathHasSizeValue(m.pathSegments),
  );

  if (props.length > 0) {
    const setupVars: string[] = [];
    for (const p of props) {
      const listName = '$' + propToScssListName(p.name);
      setupVars.push(listName + ': ' + quoteValues(p.values).join(', ') + ';');
    }
    block1Lines.push(setupVars.join('\n'));
    block1Lines.push('');
  }

  if (sizeProp !== null && sizeProp.values.length > 0) {
    const typographyEntries: string[] = [];
    const typographyBySize = getTypographyBySize();
    for (const sizeVal of sizeProp.values) {
      const token = typographyBySize[sizeVal];
      if (token) typographyEntries.push("  '" + sizeVal + "': " + token);
    }
    if (typographyEntries.length > 0) {
      block1Lines.push('$typography: (');
      block1Lines.push(typographyEntries.join(',\n'));
      block1Lines.push(');');
      block1Lines.push('');
    }
  }

  const themeProps = props.filter(p => !isAnatomyProp(p.name));
  const hasAnatomySize = hasNestedAnatomySize || (hasDirectAnatomy && sizeProp !== null);

  const lines: string[] = [];
  let block2PlaceholderShown = false;
  const push = (s: string, isSelectedContent = false) => {
    lines.push(s);
    if (!isSelectedContent) block2Lines.push(s);
    else if (!block2PlaceholderShown) {
      block2PlaceholderShown = true;
      block2Lines.push('  /* стили выделенного блока — см. блок 3 */');
    }
  };
  const pushLinesOnly = (s: string) => {
    lines.push(s);
  };

  push('.' + className + ' {');
  push(BASE_STYLES);
  if (domPath.length === 0) {
    if (selectedLayerMixins && selectedLayerMixins.length > 0) {
      for (const m of selectedLayerMixins) {
        push('  ' + (m.startsWith('@include') ? m : '@include ' + m), true);
      }
      push('', false);
    }
    if (selectedLayerStyles && selectedLayerStyles.trim()) {
      pushLinesOnly('  /* стили выбранного слоя (корень) */');
      for (const line of selectedLayerStyles.trim().split('\n')) {
        push('  ' + line.trim(), true);
      }
      push('', false);
    }
  }

  // Direct anatomy (path with single segment before size value, e.g. block: anatomy → $size)
  if (sizeProp && meta && hasDirectAnatomy && !hasNestedAnatomySize && getAnatomyTails(componentName).length === 0) {
    const pathBeforeSize = getPathBeforeSize(componentName);
    const beforeArgs =
      pathBeforeSize.length > 0
        ? pathBeforeSize.map(s => "'" + String(s).replace(/'/g, "\\'") + "'").join(', ') + ', '
        : '';
    push('  @each $size in $' + propToScssListName(sizeProp.name) + ' {');
    push('    &[' + propToDataAttr(sizeProp.name) + "='#{$size}'] {");
    push('      @include base.composite-var(' + componentRef + ', ' + beforeArgs + '$size);');
    push('    }');
    push('  }');
    push('');
  }

  // Nested anatomy (path with size value + tails / shape)
  if (sizeProp && meta && (hasNestedAnatomySize || getAnatomyTails(componentName).length > 0)) {
    const pathBeforeSize = getPathBeforeSize(componentName);
    push('  @each $size in $' + propToScssListName(sizeProp.name) + ' {');
    push('    &[' + propToDataAttr(sizeProp.name) + "='#{$size}'] {");
    if (hasNestedAnatomySize && pathBeforeSize.length > 0) {
      const beforeArgs = pathBeforeSize.map(s => "'" + String(s).replace(/'/g, "\\'") + "'").join(', ');
      push('      @include base.composite-var(' + componentRef + ', ' + beforeArgs + ', $size);');
    }
    const hasTypographyMap = sizeProp.values.some(v => getTypographyBySize()[v]);
    if (hasTypographyMap) {
      push('      @include base.composite-var($typography, $size);');
      push('      .label {');
      push("        @include base.composite-var(base.$base-styles, 'sn', 'regular', 'label', $size);");
      push('      }');
    }
    if (shapeProp && pathBeforeSize.length > 0) {
      const beforeArgs = pathBeforeSize.map(s => "'" + String(s).replace(/'/g, "\\'") + "'").join(', ');
      push('      @each ' + propToLoopVar(shapeProp.name) + ' in $' + propToScssListName(shapeProp.name) + ' {');
      push('        &[' + propToDataAttr(shapeProp.name) + "='#{$shape}'] {");
      push('          @include base.composite-var(' + componentRef + ', ' + beforeArgs + '$size, $shape);');
      push('        }');
      push('      }');
    }
    const tailSeen = new Set<string>();
    const fullTails = getAnatomyTails(componentName);
    const nestedFromMixins = aggregatedMixins.filter(
      m => m.component === componentName && m.pathSegments.length > 3 && pathHasSizeValue(m.pathSegments),
    );
    for (const tail of fullTails) {
      const tailKey = tail.join(':');
      if (tailSeen.has(tailKey)) continue;
      tailSeen.add(tailKey);
      const tailArgs = tail.map(t => "'" + String(t).replace(/'/g, "\\'") + "'").join(', ');
      const selector = '.' + (tail[tail.length - 1] || 'container');
      push('      ' + selector + ' {');
      const beforeArgs =
        pathBeforeSize.length > 0
          ? pathBeforeSize.map(s => "'" + String(s).replace(/'/g, "\\'") + "'").join(', ') + ', '
          : '';
      push('        @include base.composite-var(' + componentRef + ', ' + beforeArgs + '$size, ' + tailArgs + ');');
      push('      }');
    }
    for (const m of nestedFromMixins) {
      const sizeIdx = getSizeValueIndex(m.pathSegments);
      if (sizeIdx < 0) continue;
      const beforeSize = m.pathSegments.slice(0, sizeIdx);
      const tail = m.pathSegments.slice(sizeIdx + 1);
      const tailKey = tail.join(':');
      if (tailSeen.has(tailKey)) continue;
      tailSeen.add(tailKey);
      const selector = '.' + (tail[tail.length - 1] || 'container');
      const beforeArgs = beforeSize.map(t => "'" + String(t).replace(/'/g, "\\'") + "'").join(', ');
      const tailArgs = tail.map(t => "'" + String(t).replace(/'/g, "\\'") + "'").join(', ');
      push('      ' + selector + ' {');
      push('        @include base.composite-var(' + componentRef + ', ' + beforeArgs + ', $size, ' + tailArgs + ');');
      push('      }');
    }
    push('    }');
    push('  }');
    push('');
  }

  // Theme props (color, appearance, etc.)
  for (const p of themeProps) {
    const listName = propToScssListName(p.name);
    const loopVar = propToLoopVar(p.name);
    const dataAttr = propToDataAttr(p.name);
    const lower = p.name.toLowerCase();
    const isColorOrAppearance =
      lower === 'color' || lower === 'appearance' || lower === 'context' || lower === 'contexts';

    push('  @each ' + loopVar + ' in $' + listName + ' {');
    push('    &[' + dataAttr + "='#{" + loopVar + "}'] {");
    if (isColorOrAppearance) {
      push("      background-color: base.simple-var(base.$sn-theme, 'color', " + loopVar + ", 'decor');");
      push('      color: base.$sn-theme-color-available-version-text-secondary;');
      push('      border-color: base.$sn-theme-color-material-state-layer-regular-default-border-color;');
    }
    for (const v of aggregatedSimpleVars) {
      push('      ' + v.prop + ': ' + v.scssRef + ';');
    }
    push('    }');
    push('  }');
    push('');
  }

  if (domPath.length > 0 && (selectedLayerStyles?.trim() || (selectedLayerMixins && selectedLayerMixins.length > 0))) {
    push('  /* структура DOM как в Figma */');
    let indent = '  ';
    for (let i = 0; i < domPath.length; i++) {
      const segment = domPath[i];
      const isLeaf = i === domPath.length - 1;
      push(indent + '.' + segment + ' {');
      indent += '  ';
      if (isLeaf) {
        block2Lines.push(indent + '/* стили выделенного блока — см. блок 3 */');
        if (selectedLayerMixins && selectedLayerMixins.length > 0) {
          for (const m of selectedLayerMixins) {
            lines.push(indent + (m.startsWith('@include') ? m : '@include ' + m));
          }
        }
        if (selectedLayerStyles && selectedLayerStyles.trim()) {
          for (const line of selectedLayerStyles.trim().split('\n')) {
            lines.push(indent + line.trim());
          }
        }
      }
    }
    indent = '  ';
    for (let i = 0; i < domPath.length - 1; i++) indent += '  ';
    for (let i = domPath.length - 1; i >= 0; i--) {
      indent = indent.slice(0, -2);
      push(indent + '}');
    }
    push('');
  }

  push('}');

  // Block 3: selected layer styles only
  if (selectedLayerMixins && selectedLayerMixins.length > 0) {
    block3Lines.push('/* composite-var (токены) */');
    for (const m of selectedLayerMixins) {
      block3Lines.push(m.startsWith('@include') ? m : '@include ' + m);
    }
    block3Lines.push('');
  }
  if (selectedLayerStyles && selectedLayerStyles.trim()) {
    block3Lines.push('/* стили (в т.ч. типографика и обычные свойства) */');
    for (const line of selectedLayerStyles.trim().split('\n')) {
      block3Lines.push(line.trim());
    }
  }
  if (block3Lines.length === 0) {
    block3Lines.push('/* выделите слой с переменными или стилями */');
  }

  const block1 = block1Lines.join('\n');
  const block2 = block2Lines.join('\n');
  const block3 = block3Lines.join('\n');
  const fullScss = block1 + '\n\n' + lines.join('\n');

  return {
    block1ImportsAndVars: block1,
    block2Loops: block2,
    block3SelectedStyles: block3,
    fullScss,
  };
}

function derivePropsFromMixins(aggregatedMixins: AggregatedMixins[], componentName: string): ComponentSetupVar[] {
  const directKeys = getAnatomyDirectKeys(componentName);
  if (directKeys.length > 0) {
    const fromMixins = new Set<string>();
    for (const m of aggregatedMixins) {
      if (m.component !== componentName || m.pathSegments.length !== 2) continue;
      if (pathHasSizeValue(m.pathSegments)) fromMixins.add(m.pathSegments[1]);
    }
    if (fromMixins.size > 0) {
      const values = Array.from(fromMixins).sort();
      return [{ name: 'size', values }];
    }
    return [{ name: 'size', values: directKeys }];
  }

  const sizeValues = new Set<string>();
  for (const m of aggregatedMixins) {
    if (m.component !== componentName || m.pathSegments.length < 3) continue;
    const sizeIdx = getSizeValueIndex(m.pathSegments);
    if (sizeIdx >= 0) sizeValues.add(m.pathSegments[sizeIdx]);
  }
  if (sizeValues.size > 0) {
    return [{ name: 'size', values: Array.from(sizeValues) }];
  }
  return [];
}

export function inferComponentName(rootNodeName: string): string {
  let name = rootNodeName.trim();
  name = name.replace(/^[❖◆•]\s*/, '');
  const lower = name.toLowerCase();
  if (COMPONENT_MAP[lower]) return lower;
  const match = name.match(/^([a-z]+)/i);
  return match ? match[1].toLowerCase() : 'component';
}
