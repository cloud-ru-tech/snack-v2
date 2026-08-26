/**
 * Stable ordering and serialization for gen-props docs/props.json output.
 */

import * as ts from 'typescript';

export type PropDef = {
  type: string;
  values?: string[];
  defaultValue?: string;
  description?: string;
  required: boolean;
  typeRefs?: string[];
};

export type RelatedUnion = {
  kind: 'union';
  values: string[];
  own?: boolean;
};

export type RelatedAlias = {
  kind: 'alias';
  type: string;
  own?: boolean;
};

export type RelatedInterface = {
  kind: 'interface';
  props: Record<string, PropDef>;
  own?: boolean;
};

export type RelatedType = RelatedUnion | RelatedAlias | RelatedInterface;

/** Чем занят ключ в `relatedTypes`. Имена типов в монорепе не уникальны, поэтому занятость решается по объявлению. */
export type RelatedEntry = {
  /** Идентичность объявления: `<файл>:<позиция>`. */
  declId: string;
  /** Исходное имя типа — ключ мог получить пометку `Name (@ds/<pkg>)`. */
  base: string;
  /** Объявлен в документируемом пакете. */
  own: boolean;
  /** Пакет-владелец объявления. */
  pkgName: string;
};

export type RelatedRegistry = Map<string, RelatedEntry>;

/** Ключ типа в `relatedTypes`: имя, а при занятости другим объявлением — с пакетом-владельцем. */
export function relatedKeyFor(
  name: string,
  decl: Pick<RelatedEntry, 'declId' | 'pkgName'>,
  registry: RelatedRegistry,
): string {
  const claimed = registry.get(name);
  if (claimed?.declId === decl.declId) return name;

  // Одно объявление — одна запись: под вторым именем оно приходит через алиас импорта
  // (`import { Segment as SegmentType }`), дублировать незачем.
  for (const [key, entry] of registry) {
    if (entry.declId === decl.declId) return key;
  }

  return claimed ? `${name} (${decl.pkgName})` : name;
}

/**
 * Голое имя достаётся типу самого пакета: при коллизии чужой тип получает пометку
 * `Name (@ds/<pkg>)`, а все `typeRefs` переписываются на новые ключи.
 */
export function preferOwnRelatedNames(
  doc: { props: Record<string, PropDef>; relatedTypes: Record<string, RelatedType> },
  registry: RelatedRegistry,
): void {
  const renames = new Map<string, string>();

  for (const [key, entry] of registry) {
    if (key === entry.base || !entry.own) continue;
    const claimed = registry.get(entry.base);
    if (!claimed || claimed.own) continue;
    renames.set(entry.base, `${entry.base} (${claimed.pkgName})`);
    renames.set(key, entry.base);
  }
  if (renames.size === 0) return;

  const rewriteRefs = (props: Record<string, PropDef>): void => {
    for (const def of Object.values(props)) {
      if (def.typeRefs) def.typeRefs = def.typeRefs.map(ref => renames.get(ref) ?? ref);
    }
  };

  rewriteRefs(doc.props);
  const next: Record<string, RelatedType> = {};
  for (const [key, related] of Object.entries(doc.relatedTypes)) {
    if (related.kind === 'interface') rewriteRefs(related.props);
    next[renames.get(key) ?? key] = related;
  }
  doc.relatedTypes = next;
}

export type ComponentDoc = {
  displayName: string;
  propsTypeName: string | null;
  description?: string;
  props: Record<string, PropDef>;
  relatedTypes: Record<string, RelatedType>;
};

/**
 * Имена, попавшие в файл импортом из другого пакета (bare-specifier).
 *
 * react-docgen-typescript документирует не только компоненты самого файла, но и те,
 * что он лишь упоминает — например, разложенные по экспортируемым константам
 * (`export const RUSSIA_COUNTRY_CODE = { icon: RussiaSVG }`). Такие компоненты
 * приписываются пакету, который их только использует, и появляются в его props.json.
 * Вдобавок это делает вывод недетерминированным: пока пакет-источник не собран,
 * импорт не резолвится и компоненты не документируются вовсе.
 *
 * Относительные импорты не учитываются — это код самого пакета.
 */
export function collectExternallyImportedNames(sourceText: string, fileName = 'source.tsx'): Set<string> {
  const sf = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const names = new Set<string>();

  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (statement.moduleSpecifier.text.startsWith('.')) continue;

    const clause = statement.importClause;
    if (!clause) continue;
    if (clause.name) names.add(clause.name.text);

    const bindings = clause.namedBindings;
    if (!bindings) continue;
    if (ts.isNamespaceImport(bindings)) {
      names.add(bindings.name.text);
      continue;
    }
    for (const element of bindings.elements) names.add(element.name.text);
  }

  return names;
}

export function sortPropDef(p: PropDef): PropDef {
  const out: PropDef = { type: p.type, required: p.required };
  if (p.values) out.values = [...p.values].sort();
  if (p.defaultValue !== undefined) out.defaultValue = p.defaultValue;
  if (p.description) out.description = p.description;
  if (p.typeRefs) out.typeRefs = [...p.typeRefs].sort();
  return out;
}

export function sortRelatedType(r: RelatedType): RelatedType {
  if (r.kind === 'interface') {
    const props: Record<string, PropDef> = {};
    for (const k of Object.keys(r.props).sort()) props[k] = sortPropDef(r.props[k]);
    return { kind: 'interface', props, own: r.own };
  }
  if (r.kind === 'union') {
    return { kind: 'union', values: [...r.values].sort(), own: r.own };
  }
  return r;
}

export function docScore(c: ComponentDoc): number {
  const propsCount = Object.keys(c.props).length;
  const relatedCount = Object.keys(c.relatedTypes).length;
  const typeName = c.propsTypeName ? 1 : 0;
  return propsCount * 1000 + relatedCount * 10 + typeName;
}

export function isRicher(a: ComponentDoc, b: ComponentDoc): boolean {
  return docScore(a) > docScore(b);
}

export function sortOutput(output: Record<string, ComponentDoc>): Record<string, ComponentDoc> {
  const sorted: Record<string, ComponentDoc> = {};
  for (const compName of Object.keys(output).sort()) {
    const c = output[compName];
    const props: Record<string, PropDef> = {};
    for (const k of Object.keys(c.props).sort()) props[k] = sortPropDef(c.props[k]);
    const relatedTypes: Record<string, RelatedType> = {};
    for (const k of Object.keys(c.relatedTypes).sort()) relatedTypes[k] = sortRelatedType(c.relatedTypes[k]);
    sorted[compName] = {
      displayName: c.displayName,
      propsTypeName: c.propsTypeName,
      ...(c.description ? { description: c.description } : {}),
      props,
      relatedTypes,
    };
  }
  return sorted;
}

export function formatPropsJson(output: Record<string, ComponentDoc>): string {
  return `${JSON.stringify(sortOutput(output), null, 2)}\n`;
}
