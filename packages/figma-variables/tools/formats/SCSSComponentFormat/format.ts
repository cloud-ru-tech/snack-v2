import type { Format, TransformedToken } from 'style-dictionary/types';

import { AUTO_GENERATED_COMMENT } from '../../types.js';
import { getComponentVariableReferenceScss, getCssVarFallback } from '../../utils/index.js';
import { pathToVarName } from '../../utils/tokenVarUtils.js';
import { buildScssComponentStructure, type ScssMap } from './buildScssComponentStructure.js';

function buildMapString(map: ScssMap, indent = 0): string {
  const indentPlus1 = '  '.repeat(indent + 1);
  const entries = Object.entries(map)
    .map(([key, value]) => {
      if (typeof value === 'string') return `${indentPlus1}"${key}": ${value}`;
      if (typeof value === 'object' && value !== null) {
        if (Object.keys(value).length === 0) return null;
        const nested = buildMapString(value, indent + 1);
        if (nested.trim() === '') return null;
        return `${indentPlus1}"${key}": (\n${nested}\n${indentPlus1})`;
      }
      return `${indentPlus1}"${key}": ${String(value)}`;
    })
    .filter((entry): entry is string => entry !== null)
    .join(',\n');
  return entries;
}

function sortFlatVarsByDeps(
  flatVarEntries: Array<{ name: string; value: string; declaration: string }>,
): Array<{ name: string; value: string; declaration: string }> {
  const variableNames = new Set(flatVarEntries.map(e => e.name));
  const sorted: Array<{ name: string; value: string; declaration: string }> = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();

  function getDependencies(entry: { name: string; value: string }): string[] {
    const deps: string[] = [];
    for (const varName of variableNames) {
      if (varName !== entry.name && entry.value.includes(`$${varName}`)) deps.push(varName);
    }
    return deps;
  }

  function visit(entry: { name: string; value: string; declaration: string }): void {
    if (visited.has(entry.name)) return;
    if (visiting.has(entry.name)) return;
    visiting.add(entry.name);
    for (const depName of getDependencies(entry)) {
      const dep = flatVarEntries.find(e => e.name === depName);
      if (dep) visit(dep);
    }
    visiting.delete(entry.name);
    visited.add(entry.name);
    sorted.push(entry);
  }

  for (const entry of flatVarEntries) {
    if (!visited.has(entry.name)) visit(entry);
  }
  return sorted;
}

export const format: Format['format'] = ({ dictionary, options }) => {
  const componentName = (options?.componentName as string) || 'component';
  const componentNames = (options?.componentNames as string[] | undefined) ?? [];
  const componentTokens = dictionary.allTokens.filter(token => {
    const path = token.path || [];
    return path.length > 1 && path[1] === componentName;
  });

  if (componentTokens.length === 0) {
    return `${AUTO_GENERATED_COMMENT}
  
@forward '../styles/styles.module';
@use '../styles/styles.module' as st;

$${componentName}: ();
`;
  }

  const { mainMap, separateMaps } = buildScssComponentStructure(componentTokens, componentName, componentNames);
  const tokensWithPath = componentTokens.map(t => ({ path: t.path }));

  const flatVarEntries = componentTokens
    .map(token => {
      const path = token.path || [];
      if (path.length < 2 || path[1] !== componentName) return null;
      const variableName = pathToVarName(path);
      const hasReference =
        token.original?.$value &&
        typeof token.original.$value === 'string' &&
        /^\{[^}]+\}$/.test(token.original.$value);
      const cssVarName = `--${variableName}`;

      let valueRef: string;
      let declaration: string;
      if (hasReference) {
        valueRef = getComponentVariableReferenceScss(path, token, componentName, tokensWithPath, true, componentNames);
        declaration =
          !valueRef.startsWith('$') && !valueRef.includes('st.$')
            ? `$${variableName}: ${valueRef};`
            : `$${variableName}: var(${cssVarName}, #{${valueRef}});`;
      } else {
        const fallbackValue = getCssVarFallback({
          token: token as TransformedToken,
          variableName,
        });
        valueRef = typeof fallbackValue === 'string' ? fallbackValue : String(fallbackValue);
        declaration = `$${variableName}: ${valueRef};`;
      }
      return { name: variableName, value: valueRef, declaration };
    })
    .filter((entry): entry is { name: string; value: string; declaration: string } => entry !== null);

  const sortedFlatVars = sortFlatVarsByDeps(flatVarEntries);
  const flatVars = sortedFlatVars.map(e => e.declaration).join('\n');
  const mainMapStr = buildMapString(mainMap);
  const componentMap = mainMapStr ? `$${componentName}: (\n${mainMapStr}\n);` : `$${componentName}: ();`;
  const separateMapsStr = separateMaps
    .map(({ name, map }) => {
      const mapStr = buildMapString(map);
      return mapStr ? `$${name}: (\n${mapStr}\n);` : `$${name}: ();`;
    })
    .join('\n\n');
  const allMaps = [componentMap, separateMapsStr].filter(Boolean).join('\n\n');
  const allContent = [flatVars, allMaps].filter(Boolean).join('\n\n');

  return `${AUTO_GENERATED_COMMENT}
  
@forward '../styles/styles.module';
@use '../styles/styles.module' as st;

${allContent}
`;
};
