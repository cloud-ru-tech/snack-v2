import { FILE_EXTENSIONS } from '../constants/index.js';

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function removeExtension(path: string, extension: string = FILE_EXTENSIONS.JSON): string {
  return path.replace(new RegExp(`${escapeRegex(extension)}$`), '');
}

export function ensureExtension(path: string, extension: string): string {
  return path.endsWith(extension) ? path : `${path}${extension}`;
}

export function hasExtension(filename: string, extension: string): boolean {
  return filename.endsWith(extension);
}

export function normalizeTokenPath(path: string): string {
  return removeExtension(path.replace(/^\.\//, ''));
}

export function splitTokenPath(path: string): string[] {
  return normalizeTokenPath(path).split('/');
}

export function joinPath(parts: string[], extension?: string): string {
  const joined = parts.join('/');
  return extension ? ensureExtension(joined, extension) : joined;
}

export function isSpecialFile(filename: string): boolean {
  return filename.startsWith('$');
}

export function getFileNameWithoutExtension(path: string): string {
  const parts = splitTokenPath(path);
  return parts[parts.length - 1] || '';
}
