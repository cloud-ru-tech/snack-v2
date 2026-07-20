import type { ScssNestedMap, ScssNestedValue } from '../../utils/buildScssMapString.js';
import {
  figmaTokenToCssProps,
  getComponentVariableReferenceScss,
  isValidCssProperty,
  toKebabCase,
} from '../../utils/index.js';
import { pathToVarName } from '../../utils/tokenVarUtils.js';

export type ScssMap = ScssNestedMap;
export type ScssMapValue = ScssNestedValue;

type ComponentPath = {
  fullPath: string[];
  componentPath: string[];
  token: { path?: string[]; original?: { $value?: unknown }; $value?: unknown };
};

export function buildScssComponentStructure(
  componentTokens: Array<{ path?: string[]; original?: { $value?: unknown } }>,
  componentName: string,
  componentNames: string[] = [],
): { mainMap: ScssMap; separateMaps: Array<{ name: string; map: ScssMap; parentPath: string[] }> } {
  const mainMap: ScssMap = {};
  const separateMaps: Array<{ name: string; map: ScssMap; parentPath: string[] }> = [];
  const componentPaths: ComponentPath[] = [];

  componentTokens.forEach(token => {
    const path = token.path || [];
    if (path.length < 2 || path[1] !== componentName) return;
    const afterComponent = path.slice(2);
    if (afterComponent.length === 0) return;
    componentPaths.push({
      fullPath: path,
      componentPath: afterComponent,
      token: token as ComponentPath['token'],
    });
  });

  function isLeafPath(path: string[]): boolean {
    const hasToken = componentPaths.some(
      ({ componentPath }) => componentPath.length === path.length && componentPath.every((p, i) => p === path[i]),
    );
    if (!hasToken) return false;
    const hasChildren = componentPaths.some(
      ({ componentPath }) =>
        componentPath.length > path.length && componentPath.slice(0, path.length).every((p, i) => p === path[i]),
    );
    return !hasChildren;
  }

  function buildNode(currentPath: string[], maxDepth = 3): { children: Map<string, ScssMapValue> } {
    const children = new Map<string, ScssMapValue>();
    const directChildren = new Map<
      string,
      { path: string[]; token?: { original?: { $value?: unknown }; $value?: unknown } }
    >();

    componentPaths.forEach(({ componentPath, fullPath, token }) => {
      if (componentPath.length <= currentPath.length) return;
      if (!currentPath.every((p, i) => componentPath[i] === p)) return;
      const childName = componentPath[currentPath.length];
      if (!childName) return;
      if (!directChildren.has(childName)) directChildren.set(childName, { path: fullPath, token });
    });

    directChildren.forEach((childToken, childName) => {
      const childPath = [...currentPath, childName];
      const depth = currentPath.length;

      if (isLeafPath(childPath)) {
        const tokenPropName = toKebabCase(childName);
        const cssProps = figmaTokenToCssProps(tokenPropName);
        const propName = cssProps[0] || tokenPropName;
        const ref = getComponentVariableReferenceScss(
          childToken.path ?? [],
          childToken.token,
          componentName,
          componentPaths.map(cp => ({ path: cp.fullPath })),
          false,
          componentNames,
        );
        if (cssProps.length > 1) cssProps.forEach(cssProp => children.set(cssProp, ref));
        else children.set(propName, ref);
      } else {
        const childNode = buildNode(childPath, maxDepth);
        const nestedMap: ScssMap = {};
        childNode.children.forEach((value, key) => {
          nestedMap[key] = value;
        });

        const hasTokenAtPath = componentPaths.some(
          ({ componentPath }) =>
            componentPath.length === childPath.length && componentPath.every((p, i) => p === childPath[i]),
        );
        const childNameIsCssProp = isValidCssProperty(childName);
        const allKeysAreCssProps = Object.keys(nestedMap).every(
          key =>
            isValidCssProperty(key) ||
            (typeof nestedMap[key] === 'string' && (nestedMap[key] as string).startsWith('$')),
        );
        if (!hasTokenAtPath) {
          if (Object.keys(nestedMap).length > 0) children.set(childName, nestedMap);
        } else if (!childNameIsCssProp && Object.keys(nestedMap).length > 0) {
          children.set(childName, nestedMap);
        } else if (allKeysAreCssProps || depth <= 2) {
          if (Object.keys(nestedMap).length > 0) children.set(toKebabCase(childName), nestedMap);
        } else if (Object.keys(nestedMap).length > 0) {
          const mapName = pathToVarName([componentName, ...currentPath, childName]);
          children.set(childName, `$${mapName}`);
          separateMaps.push({ name: mapName, map: nestedMap, parentPath: currentPath });
        }
      }
    });
    return { children };
  }

  const rootNode = buildNode([]);
  rootNode.children.forEach((value, key) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 0) return;
    mainMap[key] = value;
  });

  if (rootNode.children.size === 0 && componentPaths.length > 0) {
    const firstLevelElements = new Set<string>();
    componentPaths.forEach(({ componentPath }) => {
      const first = componentPath[0];
      if (first) firstLevelElements.add(first);
    });
    firstLevelElements.forEach(elementName => {
      const elementNode = buildNode([elementName]);
      const elementMap: ScssMap = {};
      elementNode.children.forEach((value, key) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 0)
          return;
        elementMap[key] = value;
      });
      if (Object.keys(elementMap).length > 0) mainMap[elementName] = elementMap;
    });
  }

  function removeEmptyMaps(map: ScssMap): void {
    Object.keys(map).forEach(key => {
      const value = map[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        removeEmptyMaps(value as ScssMap);
        if (Object.keys(value).length === 0) delete map[key];
      }
    });
  }
  removeEmptyMaps(mainMap);

  return { mainMap, separateMaps: separateMaps.filter(({ map }) => Object.keys(map).length > 0) };
}
