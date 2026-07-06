/**
 * Stable ordering and serialization for gen-props docs/props.json output.
 */

export type PropDef = {
  type: string;
  values?: string[];
  defaultValue?: string;
  description?: string;
  required: boolean;
  typeRefs?: string[];
}

export type RelatedUnion = {
  kind: 'union';
  values: string[];
  own?: boolean;
}

export type RelatedAlias = {
  kind: 'alias';
  type: string;
  own?: boolean;
}

export type RelatedInterface = {
  kind: 'interface';
  props: Record<string, PropDef>;
  own?: boolean;
}

export type RelatedType = RelatedUnion | RelatedAlias | RelatedInterface;

export type ComponentDoc = {
  displayName: string;
  propsTypeName: string | null;
  description?: string;
  props: Record<string, PropDef>;
  relatedTypes: Record<string, RelatedType>;
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
