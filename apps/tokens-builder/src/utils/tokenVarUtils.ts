import { toKebabCase } from './toKebabCase.js';

const SINGLE_REFERENCE_REGEX = /^\{([^}]+)\}$/;

export function pathToVarName(path: string | string[]): string {
  if (Array.isArray(path)) {
    return path.join('-');
  }
  return path.trim().split('.').join('-');
}

/** Имя CSS/SCSS переменной для токена (kebab-case). */
export function getVariableNameFromToken(token: { path?: string[]; name?: string; key?: string }): string {
  const path = token.path;
  if (path?.length) {
    return pathToVarName(path);
  }
  return toKebabCase(String(token.key ?? token.name ?? ''));
}

export function getTokenReferencePath(originalValue: unknown): string | null {
  const s = typeof originalValue === 'string' ? originalValue.trim() : null;
  const match = s?.match(SINGLE_REFERENCE_REGEX);
  return match ? match[1] : null;
}

export function isNumericString(value: string): boolean {
  return value.trim() !== '' && !Number.isNaN(Number(value));
}

export function replaceInlineReferences(value: string): string {
  return value.replace(/\{([^}]+)\}/g, (_, referencePath: string) => `var(--${pathToVarName(referencePath)})`);
}
