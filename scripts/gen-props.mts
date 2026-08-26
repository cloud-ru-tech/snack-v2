#!/usr/bin/env tsx
/**
 * Extracts React component prop types from TypeScript sources
 * and writes docs/props.json per package.
 *
 * Run: pnpm gen:props
 * Output: packages/<name>/docs/props.json
 */

import { sync as globSync } from 'glob';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withCustomConfig } from 'react-docgen-typescript';
import * as ts from 'typescript';

import {
  collectExternallyImportedNames,
  type ComponentDoc,
  formatPropsJson,
  isRicher,
  preferOwnRelatedNames,
  type PropDef,
  type RelatedEntry,
  relatedKeyFor,
  type RelatedRegistry,
  type RelatedType,
} from './gen-props-output.mts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const tsconfigPath = resolve(root, 'tsconfig.gen-props.json');

const parser = withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter(prop) {
    if (prop.name === 'children') return true;
    if (prop.parent?.fileName.includes('node_modules')) return false;
    return true;
  },
});

const sourceFiles = globSync('packages/*/src/**/*.tsx', {
  cwd: root,
  absolute: true,
  ignore: ['**/packages/icons/**'],
}).sort();

const byPkg = new Map<string, string[]>();
for (const file of sourceFiles) {
  const [before, after] = file.split('/packages/');
  const pkgDir = `${before}/packages/${after.split('/')[0]}`;
  const list = byPkg.get(pkgDir) ?? [];
  list.push(file);
  byPkg.set(pkgDir, list);
}

if (byPkg.size === 0) {
  console.warn('No packages found matching packages/*/src/**/*.tsx');
  process.exit(0);
}

// ─── Build a single TS program for all packages (for type extraction) ───────

const parsedConfig = (() => {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    console.warn('tsconfig.gen-props.json read error:', configFile.error.messageText);
    return null;
  }
  return ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
})();

const program = parsedConfig
  ? ts.createProgram({
      rootNames: parsedConfig.fileNames,
      options: parsedConfig.options,
    })
  : null;

const checker = program?.getTypeChecker() ?? null;

// ─── Type-extraction helpers ─────────────────────────────────────────────────

const BUILTIN_TYPE_NAMES = new Set([
  'ReactNode',
  'ReactElement',
  'ReactChild',
  'ReactChildren',
  'ReactFragment',
  'ReactPortal',
  'JSX.Element',
  'Element',
  'CSSProperties',
  'MouseEvent',
  'KeyboardEvent',
  'ChangeEvent',
  'FocusEvent',
  'SyntheticEvent',
  'FormEvent',
  'PointerEvent',
  'TouchEvent',
  'DragEvent',
  'ClipboardEvent',
  'HTMLAttributes',
  'HTMLProps',
  'AllHTMLAttributes',
  'AnchorHTMLAttributes',
  'ButtonHTMLAttributes',
  'InputHTMLAttributes',
  'ComponentPropsWithoutRef',
  'ComponentPropsWithRef',
  'ComponentProps',
  'Ref',
  'RefObject',
  'MutableRefObject',
  'ForwardedRef',
  'ElementType',
  'ComponentType',
  'FunctionComponent',
  'FC',
  'Dispatch',
  'SetStateAction',
  'Date',
  'RegExp',
  'Array',
  'ReadonlyArray',
  'Promise',
  'Map',
  'Set',
  'Record',
  'Partial',
  'Required',
  'Readonly',
  'Pick',
  'Omit',
  'Exclude',
  'Extract',
  'NonNullable',
  'ValueOf',
]);

const PRIMITIVE_TYPES = new Set([
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
  'undefined',
  'null',
  'any',
  'unknown',
  'never',
  'void',
  'object',
]);

function isFromNodeModulesOrReact(symbol: ts.Symbol): boolean {
  const decls = symbol.getDeclarations();
  if (!decls) return false;
  return decls.some(d => {
    const fn = d.getSourceFile().fileName;
    return fn.includes('/node_modules/') || (fn.endsWith('.d.ts') && fn.includes('typescript/lib'));
  });
}

/** Ссылки на именованные типы: имя → символ объявления. По имени резолвить нельзя — они не уникальны в монорепе. */
type TypeRefMap = Map<string, ts.Symbol>;

const pkgNameCache = new Map<string, string>();

/** Имя пакета (`@ds/<pkg>`) по пути файла — им разводятся одноимённые типы. */
function pkgNameForFile(file: string): string {
  const match = /^(.*\/packages\/[^/]+)\//.exec(file);
  if (!match) return 'external';
  const dir = match[1];
  const cached = pkgNameCache.get(dir);
  if (cached) return cached;
  let name = dir.slice(dir.lastIndexOf('/') + 1);
  try {
    const pkg = JSON.parse(readFileSync(resolve(dir, 'package.json'), 'utf8')) as { name?: string };
    if (pkg.name) name = pkg.name;
  } catch {
    // package.json отсутствует или не читается — остаётся имя папки
  }
  pkgNameCache.set(dir, name);
  return name;
}

function typeToString(checker: ts.TypeChecker, type: ts.Type, node?: ts.Node): string {
  return checker.typeToString(type, node, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias);
}

// Walk a syntactic TypeNode and collect identifier-based type names (ignores resolution/inlining).
function collectNamedRefsFromNode(checker: ts.TypeChecker, node: ts.TypeNode | undefined, out: TypeRefMap): void {
  if (!node) return;
  const visit = (n: ts.Node): void => {
    if (ts.isTypeReferenceNode(n)) {
      const id = ts.isIdentifier(n.typeName) ? n.typeName : ts.isQualifiedName(n.typeName) ? n.typeName.right : null;
      if (id) {
        const name = id.text;
        if (!isBuiltinName(name) && !PRIMITIVE_TYPES.has(name)) {
          const sym = checker.getSymbolAtLocation(id);
          if (sym) {
            const target = sym.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym) : sym;
            // Параметр дженерика (`T` в `ButtonProps<T>`) — не тип, раскрывать нечего.
            if ((target.flags & ts.SymbolFlags.TypeParameter) === 0 && !isFromNodeModulesOrReact(target)) {
              const declFiles = (target.getDeclarations() ?? []).map(d => d.getSourceFile().fileName);
              if (declFiles.some(f => f.includes('/packages/') && !f.includes('/node_modules/'))) {
                out.set(name, target);
              }
            }
          }
        }
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(node);
}

// Collect *named* type references the type mentions, skipping builtins and node_modules origins.
function collectNamedRefs(
  checker: ts.TypeChecker,
  type: ts.Type,
  out: TypeRefMap,
  seen: Set<ts.Type> = new Set(),
): void {
  if (seen.has(type)) return;
  seen.add(type);

  // Unwrap unions/intersections
  if (type.isUnion() || type.isIntersection()) {
    for (const t of (type as ts.UnionOrIntersectionType).types) {
      collectNamedRefs(checker, t, out, seen);
    }
    return;
  }

  // Type alias reference (e.g. Size, ButtonProps)
  const aliasSym = type.aliasSymbol;
  if (aliasSym) {
    const name = aliasSym.getName();
    if (!isBuiltinName(name) && !isFromNodeModulesOrReact(aliasSym)) {
      out.set(name, aliasSym);
    }
    if (type.aliasTypeArguments) {
      for (const t of type.aliasTypeArguments) collectNamedRefs(checker, t, out, seen);
    }
    return;
  }

  const sym = type.getSymbol();
  if (sym && isTypeSymbol(sym)) {
    const name = sym.getName();
    if (
      name &&
      name !== '__type' &&
      !isBuiltinName(name) &&
      !PRIMITIVE_TYPES.has(name) &&
      !isFromNodeModulesOrReact(sym)
    ) {
      // heuristic: only include if it actually has declarations in our packages src
      const declFiles = (sym.getDeclarations() ?? []).map(d => d.getSourceFile().fileName);
      if (declFiles.some(f => f.includes('/packages/') && !f.includes('/node_modules/'))) {
        out.set(name, sym);
      }
    }
  }

  // Type arguments
  const typeArgs = (type as ts.TypeReference).typeArguments;
  if (typeArgs) {
    for (const t of typeArgs) collectNamedRefs(checker, t, out, seen);
  }
}

function isBuiltinName(name: string): boolean {
  return BUILTIN_TYPE_NAMES.has(name) || PRIMITIVE_TYPES.has(name);
}

// Only true for symbols that actually denote a *named, expandable* type (alias / interface / class / enum).
// Type parameters (`T`) are deliberately out — there is no declaration to expand into a related type.
// A function type's `getSymbol()` returns the function/method symbol itself — that's not a type ref,
// it's the property's own name leaking through, and would create bogus typeRefs like
// `typeRefs: ['onExpandedChange']`.
function isTypeSymbol(sym: ts.Symbol): boolean {
  const TYPE_FLAGS =
    ts.SymbolFlags.TypeAlias |
    ts.SymbolFlags.Interface |
    ts.SymbolFlags.Class |
    ts.SymbolFlags.Enum |
    ts.SymbolFlags.EnumMember;
  if ((sym.flags & TYPE_FLAGS) !== 0) return true;
  if (sym.flags & ts.SymbolFlags.Alias) {
    // Aliased import — peek at what it points to.
    return false;
  }
  return false;
}

/**
 * Объявление типа у символа. Не `getDeclarations()[0]`: при слиянии значения и типа
 * (`export const X = {…}` + `export type X = ValueOf<typeof X>`) первым идёт значение.
 */
function typeDeclOf(symbol: ts.Symbol): ts.Declaration | undefined {
  const decls = symbol.getDeclarations() ?? [];
  return decls.find(d => ts.isTypeAliasDeclaration(d) || ts.isInterfaceDeclaration(d)) ?? decls[0];
}

/** Отложенное раскрытие: имя уже зарезервировано, тело раскрывается из очереди. */
type PendingExpansion = { name: string; symbol: ts.Symbol; depth: number };

/** Ключ типа в `relatedTypes` с резервированием имени: нераскрытый тип тоже не отдаёт своё имя чужому. */
function claimRelatedKey(name: string, decl: ts.Declaration, registry: RelatedRegistry, ownPkgDir: string): string {
  const declFile = decl.getSourceFile().fileName;
  const entry: RelatedEntry = {
    declId: `${declFile}:${decl.pos}`,
    base: name,
    own: declFile.startsWith(ownPkgDir + '/'),
    pkgName: pkgNameForFile(declFile),
  };
  const key = relatedKeyFor(name, entry, registry);
  if (!registry.has(key)) registry.set(key, entry);
  return key;
}

// Given a type name, resolve its aliasSymbol declaration from program and expand it.
function findTypeSymbol(
  program: ts.Program,
  checker: ts.TypeChecker,
  name: string,
  preferPkgDir?: string,
): ts.Symbol | null {
  const matches: Array<{ sym: ts.Symbol; file: string }> = [];
  for (const sf of program.getSourceFiles()) {
    if (sf.fileName.includes('/node_modules/')) continue;
    if (!sf.fileName.includes('/packages/')) continue;
    ts.forEachChild(sf, node => {
      if ((ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) && node.name.text === name) {
        const s = checker.getSymbolAtLocation(node.name);
        if (s) matches.push({ sym: s, file: sf.fileName });
      }
    });
  }
  if (matches.length === 0) return null;
  if (preferPkgDir) {
    const inPkg = matches.find(m => m.file.startsWith(preferPkgDir + '/'));
    if (inPkg) return inPkg.sym;
  }
  return matches[0].sym;
}

function describeMemberType(
  checker: ts.TypeChecker,
  memberType: ts.Type,
  declNode: ts.Node | undefined,
  refsOut?: TypeRefMap,
): { type: string; values?: string[]; typeRefs?: string[] } {
  const typeStr = typeToString(checker, memberType, declNode);

  // Literal union values
  const values: string[] = [];
  if (memberType.isUnion()) {
    let allLiteral = true;
    for (const t of (memberType as ts.UnionType).types) {
      if (t.isStringLiteral()) values.push(t.value);
      else if (t.isNumberLiteral()) values.push(String(t.value));
      else if ((t.flags & ts.TypeFlags.BooleanLiteral) !== 0) {
        // boolean literal — skip as "values" (would just be true/false)
        allLiteral = false;
      } else if ((t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) !== 0) {
        // skip
      } else {
        allLiteral = false;
      }
    }
    if (!allLiteral) values.length = 0;
  }

  const refs: TypeRefMap = refsOut ?? new Map();
  collectNamedRefs(checker, memberType, refs);
  const typeRefs = [...refs.keys()];

  const out: { type: string; values?: string[]; typeRefs?: string[] } = { type: typeStr };
  if (values.length > 0) out.values = values;
  if (typeRefs.length > 0) out.typeRefs = typeRefs;
  return out;
}

function expandType(
  program: ts.Program,
  checker: ts.TypeChecker,
  name: string,
  refSymbol: ts.Symbol | undefined,
  depth: number,
  relatedOut: Record<string, RelatedType>,
  registry: RelatedRegistry,
  limits: { maxRelated: number; warned: Set<string> },
  ownPkgDir: string,
  queue: PendingExpansion[],
): string | null {
  // Символ приходит от места ссылки; поиск по имени — только для корневого типа пропсов.
  const symbol = refSymbol ?? findTypeSymbol(program, checker, name, ownPkgDir);
  if (!symbol) return null;
  const decl = typeDeclOf(symbol);
  if (!decl) return null;

  const key = claimRelatedKey(name, decl, registry, ownPkgDir);
  const own = registry.get(key)?.own ?? false;
  if (relatedOut[key]) return key;
  if (Object.keys(relatedOut).length >= limits.maxRelated) {
    if (!limits.warned.has('limit')) {
      console.warn(`   (relatedTypes cap ${limits.maxRelated} reached)`);
      limits.warned.add('limit');
    }
    return key;
  }

  // Get the declared type
  let declaredType: ts.Type;
  if (ts.isTypeAliasDeclaration(decl)) {
    declaredType = checker.getTypeAtLocation(decl.type);
  } else if (ts.isInterfaceDeclaration(decl)) {
    declaredType = checker.getTypeAtLocation(decl);
  } else {
    return null;
  }

  // Union of string/number literals → union
  if (declaredType.isUnion()) {
    const vals: string[] = [];
    let allLit = true;
    for (const t of (declaredType as ts.UnionType).types) {
      if (t.isStringLiteral()) vals.push(t.value);
      else if (t.isNumberLiteral()) vals.push(String(t.value));
      else if ((t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) !== 0) continue;
      else {
        allLit = false;
        break;
      }
    }
    if (allLit && vals.length > 0) {
      relatedOut[key] = { kind: 'union', values: vals, own };
      return key;
    }
  }

  // Object/interface with properties — also handle intersections (e.g. `type X = A & B & C`)
  const props = declaredType.getProperties();
  const isObjectLike =
    (declaredType.flags & ts.TypeFlags.Object) !== 0 ||
    declaredType.isIntersection() ||
    ts.isInterfaceDeclaration(decl);
  if (isObjectLike && props.length > 0 && !isFunctionLike(declaredType)) {
    const out: Record<string, PropDef> = {};
    for (const p of props) {
      const pname = p.getName();
      if (pname.startsWith('__')) continue;
      if (isInheritedNoise(p)) continue;
      const pDecl = p.getDeclarations()?.[0];
      const pType = pDecl ? checker.getTypeOfSymbolAtLocation(p, pDecl) : checker.getDeclaredTypeOfSymbol(p);
      const required = !(p.flags & ts.SymbolFlags.Optional);
      const desc = p
        .getDocumentationComment(checker)
        .map(c => c.text)
        .join('\n')
        .trim();
      const synRefs: TypeRefMap = new Map();
      const described = describeMemberType(checker, pType, pDecl, synRefs);
      // Syntactic collection from the declaration's typeNode
      if (pDecl && ts.isPropertySignature(pDecl) && pDecl.type) {
        collectNamedRefsFromNode(checker, pDecl.type, synRefs);
      }
      const def: PropDef = { type: stripImportPaths(described.type), required };
      if (described.values) def.values = described.values;
      if (desc) def.description = desc;
      out[pname] = def;

      if (synRefs.size > 0) {
        // Имя резервируется сразу, раскрытие уходит в очередь — обход по уровням, чтобы
        // вложенные типы не исчерпали лимит раньше тех, на которые ссылаются пропсы.
        const refKeys = [...synRefs].map(([refName, refSym]) => {
          const refDecl = typeDeclOf(refSym);
          if (!refDecl) return refName;
          if (depth < 2) queue.push({ name: refName, symbol: refSym, depth: depth + 1 });
          return claimRelatedKey(refName, refDecl, registry, ownPkgDir);
        });
        def.typeRefs = [...new Set(refKeys)];
      }
    }
    if (Object.keys(out).length > 0) {
      relatedOut[key] = { kind: 'interface', props: out, own };
      return key;
    }
  }

  // Fallback: alias — strip absolute import() paths so output is usable in docs
  relatedOut[key] = { kind: 'alias', type: stripImportPaths(typeToString(checker, declaredType, decl)), own };
  return key;
}

// Replace `import("/abs/path/to/file").Name` with just `Name`.
function stripImportPaths(s: string): string {
  return s.replace(/import\("[^"]+"\)\./g, '');
}

// Skip properties inherited purely from React DOM / node_modules types (HTMLAttributes, AriaAttributes, etc.).
// Keep a property if any of its declarations lives inside our packages src.
function isInheritedNoise(symbol: ts.Symbol): boolean {
  const decls = symbol.getDeclarations();
  if (!decls || decls.length === 0) return false;
  const hasLocal = decls.some(d => {
    const fn = d.getSourceFile().fileName;
    return fn.includes('/packages/') && !fn.includes('/node_modules/');
  });
  if (hasLocal) return false;
  return decls.every(d => {
    const fn = d.getSourceFile().fileName;
    if (!fn.includes('/node_modules/')) return false;
    let p: ts.Node | undefined = d.parent;
    while (p && !ts.isInterfaceDeclaration(p) && !ts.isTypeAliasDeclaration(p)) p = p.parent;
    if (!p) return true;
    const parentName = (p as ts.InterfaceDeclaration | ts.TypeAliasDeclaration).name.text;
    return (
      BUILTIN_TYPE_NAMES.has(parentName) ||
      /Attributes$/.test(parentName) ||
      /^Aria/.test(parentName) ||
      /^DOM/.test(parentName)
    );
  });
}

function isFunctionLike(type: ts.Type): boolean {
  return type.getCallSignatures().length > 0 && type.getProperties().length === 0;
}

// Resolve the props-type name for a given component exported from package entry.
function resolvePropsTypeName(
  program: ts.Program,
  checker: ts.TypeChecker,
  entryFile: string,
  componentName: string,
): string | null {
  const sf = program.getSourceFile(entryFile);
  if (!sf) return null;
  const moduleSym = checker.getSymbolAtLocation(sf);
  if (!moduleSym) return null;
  const exports = checker.getExportsOfModule(moduleSym);
  const exp = exports.find(e => e.getName() === componentName);
  if (!exp) return null;

  const target = exp.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exp) : exp;
  const decl = target.getDeclarations()?.[0];
  if (!decl) return null;

  // Case 1: function declaration `export function X(props: Props): ...`
  if (ts.isFunctionDeclaration(decl) || ts.isFunctionExpression(decl) || ts.isArrowFunction(decl)) {
    return propsTypeNameFromSignature(checker, decl);
  }

  // Case 2: variable declaration — could be forwardRef, memo, or arrow
  if (ts.isVariableDeclaration(decl)) {
    const init = decl.initializer;
    if (init) {
      // forwardRef<T, P>(...) — take 2nd type argument
      if (ts.isCallExpression(init) && init.typeArguments && init.typeArguments.length >= 2) {
        const typeArg = init.typeArguments[1];
        const name = typeNodeToName(typeArg);
        if (name) return stripGenerics(name);
      }
      if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
        return propsTypeNameFromSignature(checker, init);
      }
    }
    // Fall back: type of symbol
    const t = checker.getTypeOfSymbolAtLocation(target, decl);
    const propType = propsTypeFromComponentType(checker, t);
    if (propType) {
      const alias = propType.aliasSymbol?.getName();
      if (alias) return stripGenerics(alias);
      const sym = propType.getSymbol();
      if (sym) return stripGenerics(sym.getName());
    }
  }

  return null;
}

function propsTypeNameFromSignature(checker: ts.TypeChecker, fn: ts.FunctionLikeDeclaration): string | null {
  const param = fn.parameters[0];
  if (!param) return null;
  if (param.type) {
    const name = typeNodeToName(param.type);
    if (name) return stripGenerics(name);
  }
  const paramType = checker.getTypeAtLocation(param);
  const alias = paramType.aliasSymbol?.getName();
  if (alias) return stripGenerics(alias);
  const sym = paramType.getSymbol();
  if (sym) return stripGenerics(sym.getName());
  return null;
}

function typeNodeToName(node: ts.TypeNode): string | null {
  if (ts.isTypeReferenceNode(node)) {
    const name = node.typeName;
    if (ts.isIdentifier(name)) return name.text;
    if (ts.isQualifiedName(name)) return name.right.text;
  }
  return null;
}

function stripGenerics(name: string): string {
  return name.replace(/<.*/, '');
}

function propsTypeFromComponentType(checker: ts.TypeChecker, type: ts.Type): ts.Type | null {
  // If type looks like (props: P) => ReactElement — take first param type
  for (const sig of type.getCallSignatures()) {
    const p = sig.getParameters()[0];
    if (!p) continue;
    const d = p.getDeclarations()?.[0];
    const pt = d ? checker.getTypeOfSymbolAtLocation(p, d) : null;
    if (pt) return pt;
  }
  return null;
}

// ─── Foreign-component filter ────────────────────────────────────────────────

const externalImportsCache = new Map<string, Set<string>>();

/** Компонент лишь упомянут в файле, а объявлен в другом пакете — документировать его здесь не нужно. */
function isExternallyImported(displayName: string, filePath: string): boolean {
  let names = externalImportsCache.get(filePath);
  if (!names) {
    names = collectExternallyImportedNames(readFileSync(filePath, 'utf8'), filePath);
    externalImportsCache.set(filePath, names);
  }
  return names.has(displayName);
}

// ─── Main loop ───────────────────────────────────────────────────────────────

for (const [pkgDir, files] of byPkg) {
  const pkgName = pkgDir.split(`${root}/packages/`).pop();
  if (!pkgName) continue;
  const docsDir = resolve(pkgDir, 'docs');

  let components;
  try {
    // One shared program for every package: react-docgen-typescript would otherwise build
    // its own program per parse() call (~90 programs per run — the bulk of gen:props runtime).
    components = program ? parser.parseWithProgramProvider(files, () => program) : parser.parse(files);
  } catch (e) {
    console.warn(`⚠  ${pkgName}: parse error — ${e}`);
    continue;
  }

  if (components.length === 0) {
    console.info(`—  ${pkgName}: no components found`);
    continue;
  }

  const entryFile = resolve(pkgDir, 'src/index.ts');
  const hasEntry = existsSync(entryFile);

  const output: Record<string, ComponentDoc> = {};

  for (const comp of components) {
    if (isExternallyImported(comp.displayName, comp.filePath)) continue;

    const props: Record<string, PropDef> = {};

    for (const [name, prop] of Object.entries(comp.props)) {
      const typeStr = prop.type.name;

      let values: string[] | undefined;
      if (Array.isArray(prop.type.value)) {
        const extracted = (prop.type.value as { value: string }[])
          .map(v => String(v.value).replace(/^"|"$/g, ''))
          .filter(Boolean);
        if (extracted.length > 0) values = extracted;
      }

      const def: PropDef = { type: typeStr, required: prop.required };
      if (values) def.values = values;
      if (prop.defaultValue?.value != null) {
        def.defaultValue = String(prop.defaultValue.value).replace(/^"|"$/g, '');
      }
      if (prop.description) def.description = prop.description;

      props[name] = def;
    }

    // ── Enrichment: propsTypeName + typeRefs + relatedTypes ────────────────
    let propsTypeName: string | null = null;
    const relatedTypes: Record<string, RelatedType> = {};
    const relatedSymbols: RelatedRegistry = new Map();
    const expansionQueue: PendingExpansion[] = [];

    if (program && checker && hasEntry) {
      propsTypeName = resolvePropsTypeName(program, checker, entryFile, comp.displayName);

      if (propsTypeName) {
        const limits = { maxRelated: 20, warned: new Set<string>() };
        const rootSym = findTypeSymbol(program, checker, propsTypeName, pkgDir);
        if (rootSym) {
          const rootDecl = typeDeclOf(rootSym);
          if (rootDecl && (ts.isTypeAliasDeclaration(rootDecl) || ts.isInterfaceDeclaration(rootDecl))) {
            const rootType = ts.isTypeAliasDeclaration(rootDecl)
              ? checker.getTypeAtLocation(rootDecl.type)
              : checker.getTypeAtLocation(rootDecl);

            // Walk the resolved root type and (a) add any prop react-docgen missed —
            // PropsWithChildren, WithSupportProps and other generic wrappers tend to
            // be invisible to react-docgen-typescript — (b) attach typeRefs / expand related types.
            for (const p of rootType.getProperties()) {
              const pname = p.getName();
              const pDecl = p.getDeclarations()?.[0];
              const pType = pDecl ? checker.getTypeOfSymbolAtLocation(p, pDecl) : checker.getDeclaredTypeOfSymbol(p);

              if (!props[pname]) {
                // Skip props inherited purely from React DOM / aria types — they pollute the API surface.
                // `children` проверяется наравне с остальными: из `PropsWithChildren` он проходит,
                // из `ComponentPropsWithoutRef` — отсекается, компонент такой слот не рендерит.
                if (isInheritedNoise(p)) continue;
                const required = !(p.flags & ts.SymbolFlags.Optional);
                const desc = p
                  .getDocumentationComment(checker)
                  .map(c => c.text)
                  .join('\n')
                  .trim();
                const described = describeMemberType(checker, pType, pDecl);
                const def: PropDef = { type: stripImportPaths(described.type), required };
                if (described.values) def.values = described.values;
                if (desc) def.description = desc;
                props[pname] = def;
              }

              const refs: TypeRefMap = new Map();
              collectNamedRefs(checker, pType, refs);
              // Also collect syntactically from the declaration type node — catches CounterProps inside Omit<...>
              if (pDecl && ts.isPropertySignature(pDecl) && pDecl.type) {
                collectNamedRefsFromNode(checker, pDecl.type, refs);
              }
              if (refs.size > 0) {
                const refKeys = [...refs].map(([refName, refSym]) => {
                  const refDecl = typeDeclOf(refSym);
                  if (!refDecl) return refName;
                  expansionQueue.push({ name: refName, symbol: refSym, depth: 1 });
                  return claimRelatedKey(refName, refDecl, relatedSymbols, pkgDir);
                });
                props[pname].typeRefs = [...new Set(refKeys)];
              }
            }

            // FIFO: сначала типы, на которые ссылаются пропсы компонента, потом типы с их полей.
            while (expansionQueue.length > 0) {
              const pending = expansionQueue.shift() as PendingExpansion;
              expandType(
                program,
                checker,
                pending.name,
                pending.symbol,
                pending.depth,
                relatedTypes,
                relatedSymbols,
                limits,
                pkgDir,
                expansionQueue,
              );
            }
          }
        }
      }
    }

    const candidate: ComponentDoc = {
      displayName: comp.displayName,
      propsTypeName,
      props,
      relatedTypes,
      ...(comp.description ? { description: comp.description } : {}),
    };
    preferOwnRelatedNames(candidate, relatedSymbols);
    const existing = output[comp.displayName];
    if (!existing || isRicher(candidate, existing)) {
      output[comp.displayName] = candidate;
    }
  }

  mkdirSync(docsDir, { recursive: true });
  writeFileSync(resolve(docsDir, 'props.json'), formatPropsJson(output));

  const names = Object.keys(output).join(', ');
  const count = Object.values(output).reduce((n, c) => n + Object.keys(c.props).length, 0);
  console.info(`✓  ${pkgName} → docs/props.json  (${names}, ${count} props)`);
}
