import type { ParsedProp, ParsedPropsDoc } from './parse-props-md.mts';
import {
  classifyTypeSignature,
  isCompatibleTextBucket,
  isTextLikePropName,
  TEXT_ROLE_GROUPS,
  type TypeSignatureBucket,
} from './text-props.mts';

export type PropUsage = {
  pkg: string;
  displayName: string;
  propName: string;
  values: string[];
  valueKind: ParsedProp['valueKind'];
  typeSignature: string;
  typeBucket: TypeSignatureBucket;
  nested: boolean;
  surface: 'consumer' | 'exported-helper';
};

export type PropIndex = Map<string, PropUsage[]>;

export type SemanticGroup = {
  id: string;
  category: string;
  names: string[];
  description: string;
};

export type ConflictItem = {
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  kind: string;
  title: string;
  details: string;
  usages?: string[];
};

export type BoundaryRename = {
  pkg: string;
  component: string;
  sourceProp: string;
  targetProp: string;
  file: string;
  line: number;
};

export type ObjectShapeGroup = {
  signature: string;
  entries: string[];
};

export type AnalysisContext = {
  boundaryRenames?: BoundaryRename[];
  objectShapeGroups?: ObjectShapeGroup[];
};

const SEMANTIC_GROUPS: SemanticGroup[] = [
  { id: 'size', category: '1. Размеры и геометрия', names: ['size'], description: 'Размер компонента' },
  { id: 'width', category: '1. Размеры и геометрия', names: ['width', 'fullWidth'], description: 'Ширина' },
  { id: 'height', category: '1. Размеры и геометрия', names: ['height'], description: 'Высота' },
  { id: 'radius', category: '1. Размеры и геометрия', names: ['radius'], description: 'Скругление' },
  { id: 'shape', category: '1. Размеры и геометрия', names: ['shape'], description: 'Форма' },
  { id: 'orientation', category: '1. Размеры и геометрия', names: ['orientation'], description: 'Ориентация' },
  { id: 'direction', category: '1. Размеры и геометрия', names: ['direction', 'placement'], description: 'Направление / размещение' },

  { id: 'appearance', category: '2. Визуальный стиль', names: ['appearance'], description: 'Цветовая/статусная палитра' },
  { id: 'view', category: '2. Визуальный стиль', names: ['view'], description: 'Визуальное оформление (filled, outline, …)' },
  { id: 'variant', category: '2. Визуальный стиль', names: ['variant'], description: 'Component-specific variant' },
  { id: 'color', category: '2. Визуальный стиль', names: ['color'], description: 'Цвет' },
  { id: 'background', category: '2. Визуальный стиль', names: ['backgroundPredefined'], description: 'Фоновый preset' },

  { id: 'disabled', category: '3. Состояния', names: ['disabled', 'readonly'], description: 'Неактивное / read-only состояние' },
  { id: 'loading', category: '3. Состояния', names: ['loading', 'isLoading'], description: 'Состояние загрузки' },
  { id: 'checked', category: '3. Состояния', names: ['checked', 'selected', 'activated'], description: 'Выбранное состояние' },
  { id: 'expanded', category: '3. Состояния', names: ['expanded', 'open', 'defaultOpen'], description: 'Раскрытое состояние' },
  { id: 'error', category: '3. Состояния', names: ['error', 'invalid', 'dataError'], description: 'Ошибка / validation' },
  { id: 'focused', category: '3. Состояния', names: ['focused'], description: 'Фокус' },

  { id: 'mode', category: '4. Поведение и режимы', names: ['mode', 'selectionMode'], description: 'Режим работы' },
  { id: 'multiSelect', category: '4. Поведение и режимы', names: ['multiSelect'], description: 'Множественный выбор' },

  { id: 'icon', category: '5. Контент и композиция', names: ['icon'], description: 'Иконка' },
  { id: 'iconPosition', category: '5. Контент и композиция', names: ['iconPosition'], description: 'Позиция иконки' },
];

const CATEGORY_ORDER = [
  '1. Размеры и геометрия',
  '2. Визуальный стиль',
  '3. Состояния',
  '4. Поведение и режимы',
  '5. Контент и композиция',
  '6. Текстовые и контентные данные',
  '7. Прочие оси',
];

function basePropName(name: string): string {
  return name.includes('.') ? name.split('.').at(-1)! : name;
}

export function buildPropIndex(doc: ParsedPropsDoc): PropIndex {
  const index: PropIndex = new Map();

  for (const component of doc.components) {
    for (const prop of component.props) {
      const usage: PropUsage = {
        pkg: component.pkg,
        displayName: component.displayName,
        propName: prop.name,
        values: prop.values,
        valueKind: prop.valueKind,
        typeSignature: prop.typeSignature,
        typeBucket: prop.typeBucket,
        nested: prop.nested,
        surface: component.surface,
      };
      const list = index.get(prop.name) ?? [];
      list.push(usage);
      index.set(prop.name, list);

      const baseName = basePropName(prop.name);
      if (baseName !== prop.name) {
        const baseList = index.get(baseName) ?? [];
        baseList.push(usage);
        index.set(baseName, baseList);
      }
    }
  }

  return index;
}

function jaccard(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const value of setA) {
    if (setB.has(value)) intersection++;
  }
  const union = new Set([...setA, ...setB]).size;
  return intersection / union;
}

function valuesSignature(values: string[]): string {
  return [...values].sort().join('|');
}

function sortTextExamples(usages: PropUsage[]): PropUsage[] {
  return [...usages].sort((a, b) => {
    const score = (u: PropUsage) => {
      let s = 0;
      if (u.propName === 'option' && u.pkg === 'list' && u.displayName === 'ItemContent') s += 100;
      if (!u.nested) s += 5;
      if (u.surface === 'consumer') s += 3;
      if (u.propName === basePropName(u.propName)) s += 2;
      return s;
    };
    return score(b) - score(a);
  });
}

function formatUsage(u: PropUsage): string {
  return `${u.pkg}.${u.displayName}.${u.propName}`;
}

function formatUsageWithType(u: PropUsage): string {
  if (u.valueKind === 'complex') {
    return `${u.pkg}.${u.displayName}.${u.propName} ([${u.typeSignature}])`;
  }
  return `${u.pkg}.${u.displayName}.${u.propName} (${u.values.join(', ')})`;
}

function analyzeEnumConflicts(index: PropIndex): ConflictItem[] {
  const conflicts: ConflictItem[] = [];

  for (const group of SEMANTIC_GROUPS) {
    const presentNames = group.names.filter(name => index.has(name));
    if (presentNames.length < 2) continue;

    const enumUsages = presentNames.flatMap(name =>
      (index.get(name) ?? []).filter(u => u.valueKind !== 'complex' && u.propName === name),
    );
    if (enumUsages.length === 0) continue;

    const signatures = new Map<string, PropUsage[]>();
    for (const usage of enumUsages) {
      const sig = valuesSignature(usage.values);
      const list = signatures.get(sig) ?? [];
      list.push(usage);
      signatures.set(sig, list);
    }

    const nameCounts = presentNames.map(name => ({
      name,
      count: (index.get(name) ?? []).filter(u => u.propName === name).length,
    }));

    conflicts.push({
      priority: signatures.size === 1 ? 'P0' : 'P1',
      kind: 'alias-names',
      title: `${presentNames.join(' / ')}`,
      details: `${group.description}. Используются разные имена (${nameCounts.map(n => `\`${n.name}\` × ${n.count}`).join(', ')}). ${signatures.size === 1 ? 'Value sets совпадают — механический rename.' : 'Value sets частично расходятся — нужно решение по values.'}`,
      usages: enumUsages.slice(0, 12).map(formatUsageWithType),
    });
  }

  for (const [propName, usages] of index.entries()) {
    const topLevel = usages.filter(u => u.propName === propName);
    const enumUsages = topLevel.filter(u => u.valueKind === 'enum' || u.valueKind === 'boolean');
    if (enumUsages.length < 2) continue;

    const signatures = new Map<string, PropUsage[]>();
    for (const usage of enumUsages) {
      const sig = valuesSignature(usage.values);
      const list = signatures.get(sig) ?? [];
      list.push(usage);
      signatures.set(sig, list);
    }

    if (signatures.size <= 1) continue;

    const sigEntries = [...signatures.entries()].sort((a, b) => b[1].length - a[1].length);
    conflicts.push({
      priority: 'P2',
      kind: 'same-name-diff-values',
      title: propName,
      details: `Одно имя \`${propName}\`, но ${signatures.size} разных value sets — возможно разная семантика под одним именем.`,
      usages: sigEntries.flatMap(([, list]) => list.slice(0, 4)).slice(0, 12).map(formatUsageWithType),
    });
  }

  const coveredNames = new Set(SEMANTIC_GROUPS.flatMap(g => g.names));
  const propNames = [...index.keys()].filter(name => !coveredNames.has(name) && !name.includes('.'));

  for (let i = 0; i < propNames.length; i++) {
    for (let j = i + 1; j < propNames.length; j++) {
      const a = propNames[i];
      const b = propNames[j];
      const usagesA = (index.get(a) ?? []).filter(u => u.valueKind === 'enum' && u.propName === a);
      const usagesB = (index.get(b) ?? []).filter(u => u.valueKind === 'enum' && u.propName === b);
      if (usagesA.length === 0 || usagesB.length === 0) continue;

      const sigA = valuesSignature(usagesA[0].values);
      const sigB = valuesSignature(usagesB[0].values);
      const similarity = jaccard(usagesA[0].values, usagesB[0].values);
      if (similarity < 0.5) continue;
      if (sigA === sigB && similarity === 1) {
        conflicts.push({
          priority: 'P0',
          kind: 'similar-values',
          title: `${a} / ${b}`,
          details: `Разные имена, одинаковые enum values (Jaccard ${similarity.toFixed(2)}).`,
          usages: [...usagesA.slice(0, 3), ...usagesB.slice(0, 3)].map(formatUsage),
        });
      }
    }
  }

  const variantUsages = (index.get('variant') ?? []).filter(u => u.propName === 'variant');
  if (variantUsages.length > 0) {
    const sigs = new Set(variantUsages.filter(u => u.valueKind === 'enum').map(u => valuesSignature(u.values)));
    conflicts.push({
      priority: 'P3',
      kind: 'variant-per-component',
      title: 'variant',
      details: `Component-specific axis: ${variantUsages.length} usages, ${sigs.size} unique value sets. По agreement — допустимо оставить per-component.`,
      usages: variantUsages.slice(0, 10).map(formatUsageWithType),
    });
  }

  return conflicts;
}

function analyzeTextConflicts(index: PropIndex): ConflictItem[] {
  const conflicts: ConflictItem[] = [];

  for (const group of Object.values(TEXT_ROLE_GROUPS)) {
    const presentNames = group.names.filter(name => {
      const usages = index.get(name) ?? [];
      return usages.some(u => isTextLikePropName(u.propName) && u.valueKind === 'complex');
    });
    if (presentNames.length < 2) continue;

    const textUsages = presentNames.flatMap(name =>
      (index.get(name) ?? []).filter(u => u.propName === name || basePropName(u.propName) === name),
    ).filter(u => u.valueKind === 'complex');

    const uniqueUsages = [...new Map(textUsages.map(u => [`${u.pkg}.${u.displayName}.${u.propName}`, u])).values()];
    if (uniqueUsages.length < 2) continue;

    const buckets = new Set(uniqueUsages.map(u => u.typeBucket));
    const bucketList = [...buckets];
    const compatible = bucketList.length <= 1 || bucketList.every(b => isCompatibleTextBucket(b, bucketList[0]!));

    const nameCounts = presentNames.map(name => ({
      name,
      count: (index.get(name) ?? []).filter(u => basePropName(u.propName) === name && u.valueKind === 'complex').length,
    }));

    conflicts.push({
      priority: compatible ? 'P0' : 'P1',
      kind: 'text-alias-names',
      title: `${presentNames.join(' / ')}`,
      details: `${group.description}. Разные имена для одной text-роли (${nameCounts.map(n => `\`${n.name}\` × ${n.count}`).join(', ')}). Type buckets: ${[...buckets].join(', ')}.`,
      usages: sortTextExamples(uniqueUsages).slice(0, 16).map(formatUsageWithType),
    });
  }

  for (const group of Object.values(TEXT_ROLE_GROUPS)) {
    for (const name of group.names) {
      const usages = (index.get(name) ?? []).filter(u => basePropName(u.propName) === name && u.valueKind === 'complex');
      const buckets = new Map<TypeSignatureBucket, PropUsage[]>();
      for (const usage of usages) {
        const list = buckets.get(usage.typeBucket) ?? [];
        list.push(usage);
        buckets.set(usage.typeBucket, list);
      }
      if (buckets.size <= 1) continue;

      const bucketList = [...buckets.keys()];
      const allCompatible = bucketList.every(b => isCompatibleTextBucket(b, bucketList[0]!));
      if (allCompatible) continue;

      conflicts.push({
        priority: 'P1',
        kind: 'text-type-mismatch',
        title: name,
        details: `Проп \`${name}\` с ${buckets.size} несовместимыми type signatures в роли «${group.description}».`,
        usages: [...buckets.entries()].flatMap(([, list]) => list.slice(0, 4)).slice(0, 12).map(formatUsageWithType),
      });
    }
  }

  const valueUsages = (index.get('value') ?? []).filter(u => u.propName === 'value');
  if (valueUsages.length >= 2) {
    const buckets = new Map<TypeSignatureBucket, PropUsage[]>();
    for (const usage of valueUsages) {
      const list = buckets.get(usage.typeBucket) ?? [];
      list.push(usage);
      buckets.set(usage.typeBucket, list);
    }
    if (buckets.size >= 2) {
      conflicts.push({
        priority: 'P2',
        kind: 'same-name-overload',
        title: 'value',
        details: `Overloaded prop \`value\`: ${buckets.size} semantic buckets (${[...buckets.keys()].join(', ')}). Не предлагать blind rename — классифицировать по sub-role.`,
        usages: [...buckets.entries()].flatMap(([bucket, list]) => list.slice(0, 3).map(u => `${formatUsageWithType(u)} [${bucket}]`)).slice(0, 15),
      });
    }
  }

  const nestedExamples = [...index.values()]
    .flat()
    .filter(u => u.nested && isTextLikePropName(u.propName))
    .slice(0, 8);
  if (nestedExamples.length > 0) {
    conflicts.push({
      priority: 'P1',
      kind: 'nested-vs-flat',
      title: 'Nested text props vs flat props',
      details: 'Text-оси доступны через nested flatten (`parent.child`), тогда как соседние компоненты используют flat `label`/`text`/`option`.',
      usages: nestedExamples.map(formatUsageWithType),
    });
  }

  return conflicts;
}

function analyzeBoundaryRenames(renames: BoundaryRename[]): ConflictItem[] {
  if (renames.length === 0) return [];

  const textRelated = renames.filter(item =>
    isTextLikePropName(item.sourceProp) || isTextLikePropName(item.targetProp),
  );
  if (textRelated.length === 0) return [];

  const pairs = new Map<string, BoundaryRename[]>();
  for (const item of textRelated) {
    const key = `${item.sourceProp} → ${item.targetProp}`;
    const list = pairs.get(key) ?? [];
    list.push(item);
    pairs.set(key, list);
  }

  const conflicts: ConflictItem[] = [];
  for (const [pair, group] of [...pairs.entries()].sort((a, b) => b[1].length - a[1].length)) {
    conflicts.push({
      priority: 'P1',
      kind: 'boundary-rename',
      title: pair,
      details: `Text-related prop передаётся в дочерний компонент под другим именем (${group.length} occurrences).`,
      usages: group.slice(0, 12).map(item => `${item.pkg}.${item.component} — ${item.file}:${item.line}`),
    });
  }

  return conflicts;
}

function analyzeObjectShapeDrift(groups: ObjectShapeGroup[]): ConflictItem[] {
  const conflicts: ConflictItem[] = [];

  for (const group of groups) {
    if (group.entries.length < 2) continue;
    conflicts.push({
      priority: 'P0',
      kind: 'object-shape-drift',
      title: group.signature,
      details: `${group.entries.length} типов с одинаковым набором text-полей — кандидаты на унификацию имён полей.`,
      usages: group.entries.slice(0, 15),
    });
  }

  return conflicts;
}

export function analyzeCodeProps(doc: ParsedPropsDoc, context: AnalysisContext = {}): {
  conflicts: ConflictItem[];
  categorySummary: Map<string, string[]>;
  stats: {
    components: number;
    uniqueProps: number;
    enumProps: number;
    textProps: number;
  };
} {
  const index = buildPropIndex(doc);
  const conflicts = [
    ...analyzeEnumConflicts(index),
    ...analyzeTextConflicts(index),
    ...analyzeBoundaryRenames(context.boundaryRenames ?? []),
    ...analyzeObjectShapeDrift(context.objectShapeGroups ?? []),
  ];

  const categorySummary = new Map<string, string[]>();
  for (const category of CATEGORY_ORDER) categorySummary.set(category, []);

  for (const [propName, usages] of index.entries()) {
    if (propName.includes('.')) continue;

    const group = SEMANTIC_GROUPS.find(g => g.names.includes(propName));
    const topLevel = usages.filter(u => u.propName === propName);
    const enumUsages = topLevel.filter(u => u.valueKind === 'enum' || u.valueKind === 'boolean');

    if (enumUsages.length > 0) {
      const category = group?.category ?? '7. Прочие оси';
      const allValues = new Set<string>();
      for (const u of enumUsages) for (const v of u.values) allValues.add(v);
      const line = `\`${propName}\`: ${[...allValues].sort().join(', ')} (${topLevel.length} usages)`;
      categorySummary.get(category)?.push(line);
    }

    if (isTextLikePropName(propName)) {
      const textUsages = topLevel.filter(u => u.valueKind === 'complex');
      if (textUsages.length > 0) {
        const buckets = [...new Set(textUsages.map(u => u.typeBucket))].sort();
        const line = `\`${propName}\`: types ${buckets.join(', ')} (${textUsages.length} usages)`;
        categorySummary.get('6. Текстовые и контентные данные')?.push(line);
      }
    }
  }

  for (const lines of categorySummary.values()) lines.sort();

  const seen = new Set<string>();
  const deduped = conflicts.filter(item => {
    const key = `${item.priority}:${item.kind}:${item.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  deduped.sort((a, b) => {
    const order = { P0: 0, P1: 1, P2: 2, P3: 3 };
    const diff = order[a.priority] - order[b.priority];
    if (diff !== 0) return diff;
    return a.title.localeCompare(b.title);
  });

  return {
    conflicts: deduped,
    categorySummary,
    stats: {
      components: doc.components.length,
      uniqueProps: index.size,
      enumProps: [...index.values()].flat().filter(u => u.valueKind === 'enum' || u.valueKind === 'boolean').length,
      textProps: [...index.values()].flat().filter(u => isTextLikePropName(u.propName) && u.valueKind === 'complex').length,
    },
  };
}

export function renderCodeAnalysisMarkdown(params: {
  generatedAt: string;
  stats: ReturnType<typeof analyzeCodeProps>['stats'];
  categorySummary: Map<string, string[]>;
  conflicts: ConflictItem[];
}): string {
  const lines: string[] = [
    '# ANALYSIS — Code-only (public components)',
    '',
    `- Generated: ${params.generatedAt}`,
    '- Command: `pnpm analyze:props`',
    '- Scope: **2.1** — межкомпонентный анализ Code без Figma (text/content pass)',
    `- Components: ${params.stats.components}`,
    `- Unique prop names: ${params.stats.uniqueProps}`,
    `- Text-like props: ${params.stats.textProps}`,
    '',
    '## 1. Категориальная сводка (Code)',
    '',
  ];

  for (const category of CATEGORY_ORDER) {
    const items = params.categorySummary.get(category) ?? [];
    if (items.length === 0) continue;
    lines.push(`### ${category}`, '');
    for (const item of items) lines.push(`- ${item}`);
    lines.push('');
  }

  lines.push('## 2. Конфликты и кандидаты на унификацию', '');

  for (const priority of ['P0', 'P1', 'P2', 'P3'] as const) {
    const items = params.conflicts.filter(c => c.priority === priority);
    if (items.length === 0) continue;

    const label = {
      P0: 'P0 — механический rename (одна семантика, совместимые types/values)',
      P1: 'P1 — одна семантика, частичные расхождения types / nested / boundary',
      P2: 'P2 — одно имя, разная семантика (опасно)',
      P3: 'P3 — component-specific, оставляем',
    }[priority];

    lines.push(`### ${label}`, '');

    for (const item of items) {
      lines.push(`#### ${item.title} (${item.kind})`, '');
      lines.push(item.details, '');
      if (item.usages?.length) {
        lines.push('Примеры:', '');
        for (const u of item.usages) lines.push(`- ${u}`);
        lines.push('');
      }
    }
  }

  lines.push('## 3. Следующие шаги', '');
  lines.push('- **2.2 / Этап 3** — Code ↔ Figma diff (с matching-слоем) — основной план');
  lines.push('- **Этап 4** — решения по P0/P1 → `agreement.md`');
  lines.push('');

  return lines.join('\n');
}
