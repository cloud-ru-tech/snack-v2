import type { ComponentDoc, PropDef, PropsJson } from './types.mts';

const PROPS_TYPE_RE = /\b([A-Z][A-Za-z0-9]*Props)\b/g;

export type FlatPropDef = PropDef & {
  nested?: boolean;
  nestedFrom?: string;
};

export function buildPropsTypeRegistry(docs: PropsJson): Map<string, Record<string, PropDef>> {
  const registry = new Map<string, Record<string, PropDef>>();

  for (const doc of Object.values(docs)) {
    if (doc.propsTypeName) {
      registry.set(doc.propsTypeName, doc.props);
    }

    for (const [typeName, related] of Object.entries(doc.relatedTypes ?? {})) {
      if (related && typeof related === 'object' && 'kind' in related && related.kind === 'interface' && 'props' in related) {
        registry.set(typeName, related.props as Record<string, PropDef>);
      }
    }
  }

  return registry;
}

export function extractPropsTypeRefs(def: PropDef): string[] {
  const refs = new Set<string>(def.typeRefs ?? []);
  PROPS_TYPE_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = PROPS_TYPE_RE.exec(def.type)) !== null) {
    refs.add(match[1]);
  }
  return [...refs];
}

function resolveNestedProps(
  typeName: string,
  relatedTypes: Record<string, unknown>,
  registry: Map<string, Record<string, PropDef>>,
): Record<string, PropDef> | null {
  const related = relatedTypes[typeName];
  if (related && typeof related === 'object' && 'kind' in related && related.kind === 'interface' && 'props' in related) {
    return related.props as Record<string, PropDef>;
  }
  return registry.get(typeName) ?? null;
}

export function flattenComponentProps(
  doc: ComponentDoc,
  registry: Map<string, Record<string, PropDef>>,
  maxDepth = 2,
): Record<string, FlatPropDef> {
  const result: Record<string, FlatPropDef> = {};

  for (const [name, def] of Object.entries(doc.props)) {
    result[name] = { ...def };
  }

  for (const [propName, def] of Object.entries(doc.props)) {
    const refs = extractPropsTypeRefs(def);
    for (const ref of refs) {
      expandNested(result, propName, ref, doc.relatedTypes ?? {}, registry, maxDepth, 1);
    }
  }

  return result;
}

function expandNested(
  result: Record<string, FlatPropDef>,
  parentPath: string,
  typeName: string,
  relatedTypes: Record<string, unknown>,
  registry: Map<string, Record<string, PropDef>>,
  maxDepth: number,
  depth: number,
): void {
  const nestedProps = resolveNestedProps(typeName, relatedTypes, registry);
  if (!nestedProps) return;

  for (const [nestedName, nestedDef] of Object.entries(nestedProps)) {
    const key = `${parentPath}.${nestedName}`;
    if (result[key]) continue;
    result[key] = { ...nestedDef, nested: true, nestedFrom: parentPath };

    if (depth < maxDepth) {
      for (const ref of extractPropsTypeRefs(nestedDef)) {
        expandNested(result, key, ref, relatedTypes, registry, maxDepth, depth + 1);
      }
    }
  }
}
