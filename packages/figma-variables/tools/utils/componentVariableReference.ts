import type { TransformedToken } from 'style-dictionary/types';

import { getCssVarFallback } from './getCssVarFallback.js';
import { pathToVarName } from './tokenVarUtils.js';

function isCrossComponentReference(
  pathToUse: string[],
  componentName: string | undefined,
  componentNames: string[] | undefined,
): boolean {
  if (!componentNames || componentNames.length === 0) return false;
  if (pathToUse.length < 2) return false;
  const refGroup = pathToUse[1];
  if (!refGroup) return false;
  if (componentName && refGroup.toLowerCase() === componentName.toLowerCase()) return false;
  return componentNames.some(name => name.toLowerCase() === refGroup.toLowerCase());
}

function hasSingleReference(originalValue: unknown): boolean {
  const s = typeof originalValue === 'string' ? originalValue.trim() : '';
  return /^\{[^}]+\}$/.test(s);
}

type TokenLike = {
  path?: string[];
  original?: { $value?: unknown };
  $value?: unknown;
  $type?: string;
};

type ResolveResult = { pathToUse: string[]; isReferenceToComponentToken: boolean; isComponentToken: boolean };

export function resolveComponentReference(
  tokenPath: string[],
  token: TokenLike | undefined,
  componentName: string | undefined,
  componentTokens: Array<{ path?: string[] }> | undefined,
): ResolveResult {
  const isComponentToken = tokenPath.length >= 2 && tokenPath[1] === componentName;
  let pathToUse = tokenPath;
  let isReferenceToComponentToken = false;

  const refPath =
    token?.original?.$value && typeof token.original.$value === 'string'
      ? token.original.$value.trim().match(/^\{([^}]+)\}$/)?.[1]
      : null;

  if (refPath) {
    pathToUse = refPath.split('.');
    if (componentName && componentTokens && pathToUse.length >= 2) {
      const refComponent = pathToUse[1];
      if (refComponent?.toLowerCase() === componentName.toLowerCase()) {
        isReferenceToComponentToken = true;
      }
    }
  }

  return { pathToUse, isReferenceToComponentToken, isComponentToken };
}

export function getComponentVariableReferenceCss(
  tokenPath: string[],
  token: TokenLike | undefined,
  componentName: string | undefined,
  componentTokens: Array<{ path?: string[] }> | undefined,
): string {
  const { pathToUse, isReferenceToComponentToken, isComponentToken } = resolveComponentReference(
    tokenPath,
    token,
    componentName,
    componentTokens,
  );
  const varName = pathToVarName(pathToUse);

  if (isComponentToken && !hasSingleReference(token?.original?.$value) && token?.$value !== undefined) {
    const fallback = getCssVarFallback({ token: token as TransformedToken, variableName: pathToVarName(tokenPath) });
    return typeof fallback === 'string' ? fallback : String(fallback);
  }
  if (isReferenceToComponentToken && componentName) return `var(--${varName})`;
  return `var(--${varName})`;
}

export function getComponentVariableReferenceScss(
  tokenPath: string[],
  token: TokenLike | undefined,
  componentName: string | undefined,
  componentTokens: Array<{ path?: string[] }> | undefined,
  forFlatVariable: boolean,
  componentNames?: string[],
): string {
  const { pathToUse, isReferenceToComponentToken, isComponentToken } = resolveComponentReference(
    tokenPath,
    token,
    componentName,
    componentTokens,
  );
  const variableName = pathToVarName(pathToUse);

  if (isComponentToken && !forFlatVariable) return `$${pathToVarName(tokenPath)}`;
  if (isReferenceToComponentToken && componentName) return `$${variableName}`;

  // Reference points to another component's token — that variable does not live in
  // styles.module, so emitting `st.$...` would produce an undefined-variable error.
  // Inline the already-resolved value instead.
  if (isCrossComponentReference(pathToUse, componentName, componentNames) && token?.$value !== undefined) {
    const fallback = getCssVarFallback({ token: token as TransformedToken, variableName: pathToVarName(tokenPath) });
    return typeof fallback === 'string' ? fallback : String(fallback);
  }

  return `st.$${variableName}`;
}
