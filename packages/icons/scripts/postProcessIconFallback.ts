/**
 * Injects fallback logic into Sprite icon .tsx: when the sprite symbol is missing
 * on the page, renders inline SVG (content inlined as const) and logs a console warning.
 * Run after build:icons:sprite. Only processes files with "Sprite" in the component name.
 */
import { Dirent, existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { getIconGroups, getGroupFixedPath, getSpriteGroupId } from './iconGroups';
import { componentNameToSymbolIdPart, filenameToSymbolIdPart } from './symbolId';

const COMPONENTS_ROOT = join('src', 'components');
const FALLBACK_WARN = '[@design-system/icons]';

type CurrentItem = {
  item: Dirent;
  parent: string;
};

function getSvgInnerHTML(raw: string): string {
  const match = raw.match(/<svg[^>]*>([\s\S]*)<\/svg\s*>/i);
  return match ? match[1].trim() : '';
}

function stripFillFromSvgInner(html: string): string {
  return html.replace(/\s+fill\s*=\s*["'][^"']*["']/gi, '').replace(/\s+fill-opacity\s*=\s*["'][^"']*["']/gi, '');
}

function escapeForJSString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n');
}

function walkSpriteTsx(dir: string): string[] {
  const result: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      result.push(...walkSpriteTsx(full));
    } else if (e.isFile() && e.name.endsWith('.tsx') && e.name !== 'index.tsx') {
      const content = readFileSync(full, 'utf-8');
      if (content.includes('Sprite') && content.includes('<use href=')) {
        result.push(full);
      }
    }
  }
  return result;
}

function removeOldFallbackJs(dir: string): void {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      removeOldFallbackJs(full);
    } else if (e.isFile() && e.name.endsWith('.fallback.js')) {
      unlinkSync(full);
    }
  }
}

function getAllSVGPaths(directory: string): string[] {
  const readDirectory = (path: string) =>
    readdirSync(path, {
      withFileTypes: true,
      encoding: 'utf-8',
    }).map(item => ({ item, parent: path }));

  let currentItem: CurrentItem | undefined;
  const paths: string[] = [];
  const queue = readDirectory(directory);

  while ((currentItem = queue.shift())) {
    if (currentItem.item.isFile() && currentItem.item.name.endsWith('.svg')) {
      paths.push(join(currentItem.parent, currentItem.item.name));
    }

    if (currentItem.item.isDirectory()) {
      const parentDirectory = join(currentItem.parent, currentItem.item.name);
      queue.push(...readDirectory(parentDirectory));
    }
  }

  return paths;
}

function buildSpriteSymbolToSvgMap(group: string): Map<string, string> {
  const map = new Map<string, string>();
  const groupId = getSpriteGroupId(group);
  const symbolPrefix = `snack-uikit-${groupId}-`;
  const svgsFixedRoot = getGroupFixedPath(group);

  if (!existsSync(svgsFixedRoot)) return map;

  const allPaths = getAllSVGPaths(svgsFixedRoot);
  for (const filePath of allPaths) {
    const idPart = filenameToSymbolIdPart(basename(filePath));
    map.set(idPart, filePath);
    map.set(`${symbolPrefix}${idPart}`, filePath);
  }

  return map;
}

function extractSymbolId(content: string): string | null {
  const concatMatch = content.match(/const symbolId = "([^"]*)"\s*\+\s*"([^"]*)";/);
  if (concatMatch) return `${concatMatch[1]}${concatMatch[2]}`;

  const simpleMatch = content.match(/const symbolId = "([^"]*)";/);
  if (simpleMatch) return simpleMatch[1];

  return null;
}

function findSvgForTsx(tsxPath: string, content: string, groupMap: Map<string, string>): string | null {
  const symbolId = extractSymbolId(content);
  if (symbolId && groupMap.has(symbolId)) {
    return groupMap.get(symbolId) || null;
  }

  const baseName = basename(tsxPath, '.tsx');
  const symbolIdPart = componentNameToSymbolIdPart(baseName);
  if (groupMap.has(symbolIdPart)) {
    return groupMap.get(symbolIdPart) || null;
  }

  return null;
}

function processFile(tsxPath: string, groupMap: Map<string, string>): boolean {
  let content = readFileSync(tsxPath, 'utf-8');
  const svgPath = findSvgForTsx(tsxPath, content, groupMap);
  if (!svgPath) return false;

  const rawSvg = readFileSync(svgPath, 'utf-8');
  const innerHtml = stripFillFromSvgInner(getSvgInnerHTML(rawSvg));
  const escaped = escapeForJSString(innerHtml);
  const constantLine = `const FALLBACK_SVG_INNER = "${escaped}";`;

  const existingConstantRe = /const FALLBACK_SVG_INNER = "(?:[^"\\]|\\.)*";/;
  if (content.includes('const FALLBACK_SVG_INNER = "')) {
    content = content.replace(existingConstantRe, constantLine);
  } else {
    const typesImportMatch = content.match(/from ['"][^'"]*\/types['"];/);
    if (!typesImportMatch) return false;
    const insertAt = content.indexOf(typesImportMatch[0]) + typesImportMatch[0].length + 1;
    content = content.slice(0, insertAt) + '\n' + constantLine + '\n\n' + content.slice(insertAt);
  }

  if (!content.includes('const [useFallback, setUseFallback]')) {
    const symbolIdMatch = content.match(/const symbolId = [^;]+;/);
    if (!symbolIdMatch) return false;
    const afterSymbolId = content.indexOf(symbolIdMatch[0]) + symbolIdMatch[0].length;
    const injectBlock = `
  const [useFallback, setUseFallback] = useState(false);
  useEffect(() => {
    if (typeof document !== "undefined" && !document.getElementById(symbolId)) {
      setUseFallback(true);
      if (typeof console !== "undefined" && console.warn) {
        console.warn(\`${FALLBACK_WARN} Symbol "#\${symbolId}" not found on page. Rendering inline fallback.\`);
      }
    }
  }, [symbolId]);
`;
    content = content.slice(0, afterSymbolId) + injectBlock + content.slice(afterSymbolId);
    content = content.replace(
      /import \{ forwardRef \} from 'react';/,
      "import { forwardRef, useEffect, useState } from 'react';",
    );
  }
  content = content.replace(/\bReact\.useState\b/g, 'useState').replace(/\bReact\.useEffect\b/g, 'useEffect');
  if (
    content.includes('useState(') &&
    !/import \{[^}]*(?:useState|useEffect)[^}]*\} from ['"]react['"]/.test(content)
  ) {
    content = content.replace(
      /import \{ forwardRef \} from 'react';/,
      "import { forwardRef, useEffect, useState } from 'react';",
    );
  }

  const useTagRe = /<use href=\{[^}]+\} \/>/;
  const conditional =
    "{useFallback ? <g dangerouslySetInnerHTML={{ __html: FALLBACK_SVG_INNER }} /> : <use href={'#' + symbolId} />}";
  if (useTagRe.test(content) && !content.includes('useFallback ?')) {
    content = content.replace(useTagRe, conditional);
  }

  writeFileSync(tsxPath, content, 'utf-8');
  return true;
}

function main(): void {
  const groups = getIconGroups();
  let totalDone = 0;
  let totalFiles = 0;

  for (const group of groups) {
    const spriteDir = join(COMPONENTS_ROOT, group, 'sprite');
    if (!existsSync(spriteDir)) continue;

    const groupMap = buildSpriteSymbolToSvgMap(group);
    removeOldFallbackJs(spriteDir);
    const files = walkSpriteTsx(spriteDir);
    totalFiles += files.length;
    for (const f of files) {
      if (processFile(f, groupMap)) totalDone++;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Post-processed ${totalDone}/${totalFiles} Sprite icon components with fallback.`);
}

main();
