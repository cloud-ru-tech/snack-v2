import * as ts from 'typescript';

// ─── Сбор ссылок на именованные типы (для typeRefs / relatedTypes) ───────────

export const BUILTIN_TYPE_NAMES = new Set([
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

export const PRIMITIVE_TYPES = new Set([
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

export function isFromNodeModulesOrReact(symbol: ts.Symbol): boolean {
  const decls = symbol.getDeclarations();
  if (!decls) return false;
  return decls.some(d => {
    const fn = d.getSourceFile().fileName;
    return fn.includes('/node_modules/') || (fn.endsWith('.d.ts') && fn.includes('typescript/lib'));
  });
}

/** Ссылки на именованные типы: имя → символ объявления. По имени резолвить нельзя — они не уникальны в монорепе. */
export type TypeRefMap = Map<string, ts.Symbol>;

// Walk a syntactic TypeNode and collect identifier-based type names (ignores resolution/inlining).
export function collectNamedRefsFromNode(checker: ts.TypeChecker, node: ts.TypeNode | undefined, out: TypeRefMap): void {
  if (!node) return;
  const visited = new Set<ts.Node>();
  const visit = (n: ts.Node): void => {
    // `X['field']` ссылается на тип поля, а не на весь `X`: разбираем объявление поля
    // (разрешённый тип теряет алиасы — `Appearance | undefined` схлопывается в литералы).
    if (ts.isIndexedAccessTypeNode(n)) {
      const index = checker.getTypeFromTypeNode(n.indexType);
      const field = index.isStringLiteral()
        ? checker.getPropertyOfType(checker.getTypeFromTypeNode(n.objectType), index.value)
        : undefined;
      const fieldDecl = field?.getDeclarations()?.[0];
      if (fieldDecl && ts.isPropertySignature(fieldDecl) && fieldDecl.type && !visited.has(fieldDecl)) {
        visited.add(fieldDecl);
        visit(fieldDecl.type);
      } else {
        collectNamedRefs(checker, checker.getTypeFromTypeNode(n), out);
      }
      return;
    }
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
export function collectNamedRefs(
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

export function isBuiltinName(name: string): boolean {
  return BUILTIN_TYPE_NAMES.has(name) || PRIMITIVE_TYPES.has(name);
}

// Only true for symbols that actually denote a *named, expandable* type (alias / interface / class / enum).
// Type parameters (`T`) are deliberately out — there is no declaration to expand into a related type.
// A function type's `getSymbol()` returns the function/method symbol itself — that's not a type ref,
// it's the property's own name leaking through, and would create bogus typeRefs like
// `typeRefs: ['onExpandedChange']`.
export function isTypeSymbol(sym: ts.Symbol): boolean {
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
