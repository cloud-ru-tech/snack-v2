import { basename } from 'path';

/**
 * Normalizes icon names to kebab-case symbol id part.
 * Keeps behavior stable for file names with spaces, hyphens and camel/pascal case.
 */
export function normalizeToSymbolIdPart(value: string): string {
  return value
    .replace(/\.[^.]+$/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    // SVGR joins numeric chunks into component names (Smile 2 -> Smile2).
    .replace(/-([0-9]+)/g, '$1')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function filenameToSymbolIdPart(filename: string): string {
  return normalizeToSymbolIdPart(basename(filename, '.svg'));
}

export function componentNameToSymbolIdPart(componentName: string): string {
  return normalizeToSymbolIdPart(componentName.replace(/^Svg/, '').replace(/(SpriteSVG|SVG|Sprite)$/g, ''));
}
