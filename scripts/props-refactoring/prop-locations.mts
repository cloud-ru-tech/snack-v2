import { sync as globSync } from 'glob';
import { readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildPropsTypeRegistry, extractPropsTypeRefs } from './flatten-props.mts';
import { buildComponentPathMap } from './surface.mts';
import type { ComponentDoc, PropDef, PropsJson } from './types.mts';

import * as ts from 'typescript';

export type PropLocation = {
  file: string;
  line: number;
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const propsByPkg = new Map<string, PropsJson>();
const componentByKey = new Map<string, { pkg: string; displayName: string; doc: ComponentDoc; file?: string }>();
const typeByKey = new Map<string, { pkg: string; typeName: string }>();
const propLocationIndex = new Map<string, PropLocation[]>();
const componentFileIndex = new Map<string, PropLocation>();
const typeDefIndex = new Map<string, PropLocation>();
const typeAliasTargets = new Map<string, string[]>();

function indexProperty(typeName: string, name: string, sourceFile: ts.SourceFile, node: ts.Node): void {
  const key = `${typeName}.${name}`;
  const loc = { file: rel(sourceFile.fileName), line: lineOf(sourceFile, node) };
  const list = propLocationIndex.get(key) ?? [];
  if (!list.some(item => item.file === loc.file && item.line === loc.line)) list.push(loc);
  propLocationIndex.set(key, list);
}

function indexTypeAlias(typeName: string, target: string): void {
  const list = typeAliasTargets.get(typeName) ?? [];
  if (!list.includes(target)) list.push(target);
  typeAliasTargets.set(typeName, list);
}

function extractTypeReferenceName(type: ts.TypeNode): string | null {
  if (ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName)) return type.typeName.text;
  if (ts.isTypeReferenceNode(type) && ts.isQualifiedName(type.typeName)) return type.typeName.right.text;
  return null;
}

function extractPropsFromTypeNode(typeName: string, type: ts.TypeNode, sourceFile: ts.SourceFile): void {
  if (ts.isTypeLiteralNode(type)) {
    for (const member of type.members) {
      if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
        indexProperty(typeName, member.name.text, sourceFile, member.name);
      }
    }
    return;
  }

  if (ts.isIntersectionTypeNode(type) || ts.isUnionTypeNode(type)) {
    for (const part of type.types) {
      if (ts.isTypeReferenceNode(part)) {
        const ref = extractTypeReferenceName(part);
        if (ref) indexTypeAlias(typeName, ref);
      }
      extractPropsFromTypeNode(typeName, part, sourceFile);
    }
    return;
  }

  if (ts.isParenthesizedTypeNode(type)) {
    extractPropsFromTypeNode(typeName, type.type, sourceFile);
    return;
  }

  if (ts.isTypeReferenceNode(type)) {
    const ref = extractTypeReferenceName(type);
    if (ref) indexTypeAlias(typeName, ref);
    if (ref === 'Omit' && type.typeArguments?.[0]) {
      const omittedRef = extractTypeReferenceName(type.typeArguments[0]);
      if (omittedRef) indexTypeAlias(typeName, omittedRef);
    }
    if (type.typeArguments) {
      for (const arg of type.typeArguments) extractPropsFromTypeNode(typeName, arg, sourceFile);
    }
    return;
  }

  if (ts.isTypeQueryNode(type) && ts.isIdentifier(type.exprName)) {
    indexTypeAlias(typeName, type.exprName.text);
  }
}

function buildAstIndex(): void {
  const files = globSync('packages/*/src/**/*.{ts,tsx}', {
    cwd: root,
    absolute: true,
    ignore: ['**/node_modules/**', '**/packages/icons/**'],
  });

  for (const file of files) {
    const sourceFile = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);

    const visit = (node: ts.Node): void => {
      if (ts.isInterfaceDeclaration(node)) {
        for (const member of node.members) {
          if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
            indexProperty(node.name.text, member.name.text, sourceFile, member.name);
          }
        }
        if (!typeDefIndex.has(node.name.text)) {
          typeDefIndex.set(node.name.text, { file: rel(sourceFile.fileName), line: lineOf(sourceFile, node.name) });
        }
      }

      if (ts.isTypeAliasDeclaration(node)) {
        extractPropsFromTypeNode(node.name.text, node.type, sourceFile);
        if (ts.isTypeReferenceNode(node.type)) {
          const ref = extractTypeReferenceName(node.type);
          if (ref) indexTypeAlias(node.name.text, ref);
          if (ref === 'Omit' && node.type.typeArguments?.[0]) {
            const omittedRef = extractTypeReferenceName(node.type.typeArguments[0]);
            if (omittedRef) indexTypeAlias(node.name.text, omittedRef);
          }
        }
        if (ts.isTypeQueryNode(node.type) && ts.isIdentifier(node.type.exprName)) {
          indexTypeAlias(node.name.text, node.type.exprName.text);
        }
        if (!typeDefIndex.has(node.name.text)) {
          typeDefIndex.set(node.name.text, { file: rel(sourceFile.fileName), line: lineOf(sourceFile, node.name) });
        }
      }

      if (ts.isFunctionDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
        if (!componentFileIndex.has(node.name.text)) {
          componentFileIndex.set(node.name.text, { file: rel(sourceFile.fileName), line: lineOf(sourceFile, node.name) });
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }
}

function loadPropsCatalog(): void {
  const propsFiles = globSync('packages/*/docs/props.json', { cwd: root, absolute: true });
  for (const propsFile of propsFiles) {
    const pkg = propsFile.split('/packages/')[1]?.split('/')[0];
    if (!pkg) continue;

    const docs = JSON.parse(readFileSync(propsFile, 'utf8')) as PropsJson;
    propsByPkg.set(pkg, docs);

    const pathMap = buildComponentPathMap(resolve(root, 'packages', pkg));
    for (const [displayName, doc] of Object.entries(docs)) {
      const key = `${pkg}.${displayName}`;
      const file = pathMap.get(displayName);
      componentByKey.set(key, { pkg, displayName, doc, file });
      if (file) {
        componentFileIndex.set(`${pkg}.${displayName}`, { file: rel(file), line: 1 });
      }
      if (doc.propsTypeName) {
        typeByKey.set(`${pkg}.${doc.propsTypeName}`, { pkg, typeName: doc.propsTypeName });
      }
      for (const typeName of Object.keys(doc.relatedTypes ?? {})) {
        typeByKey.set(`${pkg}.${typeName}`, { pkg, typeName });
      }
    }
  }
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

function collectTypeChain(typeName: string, seen = new Set<string>()): string[] {
  if (seen.has(typeName)) return [];
  seen.add(typeName);
  const chain = [typeName];
  for (const target of typeAliasTargets.get(typeName) ?? []) {
    chain.push(...collectTypeChain(target, seen));
  }
  if (typeName.endsWith('Props')) {
    chain.push(typeName.replace(/Props$/, ''), `Base${typeName}`, typeName.replace(/^Base/, ''));
  }
  return chain;
}

function scoreLocation(loc: PropLocation, pkg: string, compFile?: string, displayName?: string): number {
  let score = 0;
  if (loc.file.includes(`/packages/${pkg}/`)) score += 5;
  if (compFile && loc.file === rel(compFile)) score += 20;
  if (compFile && loc.file.startsWith(rel(compFile).replace(/[^/]+$/, ''))) score += 10;
  if (displayName && loc.file.includes(`/${displayName}/`)) score += 15;
  if (displayName && loc.file.includes(`/${displayName}.`)) score += 15;
  return score;
}

function lookupProp(typeName: string | null, propName: string, pkg: string, compFile?: string, displayName?: string): PropLocation | null {
  const typeNames = typeName ? collectTypeChain(typeName) : [];
  const candidates: PropLocation[] = [];

  for (const candidate of typeNames) {
    for (const loc of propLocationIndex.get(`${candidate}.${propName}`) ?? []) candidates.push(loc);
  }

  for (const [key, locs] of propLocationIndex) {
    if (!key.endsWith(`.${propName}`)) continue;
    for (const loc of locs) {
      if (loc.file.includes(`/packages/${pkg}/`)) candidates.push(loc);
    }
  }

  // Выбор максимума обычным циклом (а не мутацией из замыкания) — иначе CFA сужает `best`
  // к `null` и `best?.loc` падает ложным TS2339 «does not exist on type never».
  let best: { loc: PropLocation; score: number } | null = null;
  for (const loc of candidates) {
    const score = scoreLocation(loc, pkg, compFile, displayName);
    if (!best || score > best.score) best = { loc, score };
  }

  return best?.loc ?? null;
}

function lookupComponentFile(pkg: string, displayName: string, comp?: { file?: string }): PropLocation | null {
  const keyed = componentFileIndex.get(`${pkg}.${displayName}`);
  if (keyed) return keyed;
  const fnLoc = componentFileIndex.get(displayName);
  if (fnLoc?.file.includes(`/packages/${pkg}/`)) return fnLoc;
  if (comp?.file) return { file: rel(comp.file), line: 1 };
  return fnLoc ?? null;
}

function rel(file: string): string {
  return relative(root, file).replace(/\\/g, '/');
}

function lineOf(sourceFile: ts.SourceFile, node: ts.Node): number {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function resolveContainingTypeName(doc: ComponentDoc, registry: Map<string, Record<string, PropDef>>, propPath: string[]): string | null {
  if (propPath.length === 0) return doc.propsTypeName;

  let props = doc.props;
  let relatedTypes = doc.relatedTypes ?? {};
  let typeName = doc.propsTypeName;

  for (const segment of propPath) {
    const def = props[segment];
    if (!def) return typeName;
    const refs = extractPropsTypeRefs(def);
    const nextType = refs.find(ref => resolveNestedProps(ref, relatedTypes, registry)) ?? refs[0];
    if (!nextType) return typeName;
    typeName = nextType;
    props = resolveNestedProps(nextType, relatedTypes, registry) ?? {};
  }

  return typeName;
}

export function resolveComponentProp(ref: string): PropLocation | null {
  const match = ref.match(/^([a-z0-9-]+)\.([A-Z][A-Za-z0-9]*)(?:\.(.+))?$/);
  if (!match) return null;

  const [, pkg, name, propPathRaw] = match;
  const loc = resolveComponentPropInner(pkg, name, propPathRaw);
  if (loc) return loc;

  // Compound namespace: tabs.Tabs.TabBar.markerPosition → tabs.TabBar.markerPosition
  if (propPathRaw?.includes('.')) {
    const allParts = [name, ...propPathRaw.split('.')];
    const leafProp = allParts.pop()!;
    const component = allParts.pop()!;
    if (component) {
      const nestedPath = allParts.length > 0 ? `${allParts.join('.')}.${leafProp}` : leafProp;
      return resolveComponentPropInner(pkg, component, nestedPath);
    }
  }

  return null;
}

function resolveComponentPropInner(pkg: string, name: string, propPathRaw?: string): PropLocation | null {
  const compKey = `${pkg}.${name}`;
  const comp = componentByKey.get(compKey);

  if (!propPathRaw) {
    return lookupComponentFile(pkg, name, comp);
  }

  const propSegments = propPathRaw.split('.');
  const leafProp = propSegments[propSegments.length - 1]!;
  const parentPath = propSegments.slice(0, -1);

  if (comp) {
    const registry = buildPropsTypeRegistry(propsByPkg.get(pkg) ?? {});
    const typeName = resolveContainingTypeName(comp.doc, registry, parentPath);
    const loc = lookupProp(typeName, leafProp, pkg, comp.file, name);
    if (loc) return loc;
  }

  const typeEntry = typeByKey.get(compKey);
  if (typeEntry && propSegments.length === 1) {
    return lookupProp(typeEntry.typeName, leafProp, pkg, comp?.file, name) ?? typeDefIndex.get(typeEntry.typeName) ?? null;
  }

  return lookupProp(null, leafProp, pkg, comp?.file, name);
}

export function resolveTypeRef(ref: string): PropLocation | null {
  const match = ref.match(/^([a-z0-9-]+)\.([A-Z][A-Za-z0-9]+)$/);
  if (!match) return null;
  const [, pkg, typeName] = match;
  if (componentByKey.has(`${pkg}.${typeName}`)) return resolveComponentProp(ref);
  return typeDefIndex.get(typeName) ?? null;
}

export function resolveRef(ref: string): PropLocation | null {
  return resolveComponentProp(ref) ?? resolveTypeRef(ref);
}

export function toMarkdownLink(label: string, loc: PropLocation): string {
  return `[${label}](${loc.file})`;
}

export function resolveFileLine(filePath: string, line: number): PropLocation | null {
  const normalized = filePath.replace(/^\.\//, '');
  if (normalized.startsWith('packages/')) {
    return { file: normalized, line };
  }

  const hits = globSync(`packages/**/${normalized}`, { cwd: root, absolute: false });
  if (hits.length === 1) return { file: hits[0]!.replace(/\\/g, '/'), line };
  if (hits.length > 1) {
    const preferred = hits.find(h => h.includes('/src/')) ?? hits[0];
    return preferred ? { file: preferred.replace(/\\/g, '/'), line } : null;
  }
  return null;
}

let initialized = false;

export function ensurePropLocationIndex(): void {
  if (initialized) return;
  loadPropsCatalog();
  buildAstIndex();
  initialized = true;
}

export function getIndexStats(): { props: number; types: number; components: number } {
  return {
    props: propLocationIndex.size,
    types: typeDefIndex.size,
    components: componentByKey.size,
  };
}
